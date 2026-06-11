/**
 * Translate.jsx
 * Chai Holistic — Universal Translation Component
 *
 * Wraps any text and translates it automatically when a non-English
 * language is active. Uses MyMemory free API with localStorage caching
 * so each unique string is only ever translated ONCE per device.
 *
 * USAGE:
 *   import Translate from "./Translate";
 *
 *   // Wrap any string:
 *   <Translate>Morning Rise — Greet the day with intention</Translate>
 *
 *   // Or pass as prop:
 *   <Translate text="Some string to translate" />
 *
 *   // Shows English instantly, swaps to translation silently
 *   // Once cached in localStorage, shows translated instantly forever
 *
 * COST: Free. MyMemory API, no key needed.
 *   10,000 characters/day with email parameter.
 *   Cached forever in localStorage — repeat strings = zero API calls.
 *
 * LANGUAGE CODES SUPPORTED:
 *   en (English — no translation, renders as-is)
 *   es (Spanish)
 *   fr (French)
 *   pt (Portuguese)
 *   ht (Haitian Creole)
 *   jm (Jamaican Patois — MyMemory doesn't support, falls back to English)
 */

import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";

// ── MyMemory language code map ────────────────────────────
// MyMemory uses different codes than our internal ones
const LANG_MAP = {
  es: "es",
  fr: "fr",
  pt: "pt",
  ht: "ht",  // Haitian Creole — partial support
  jm: null,  // Jamaican Patois — not supported, shows English
};

// ── Cache helpers ─────────────────────────────────────────
const CACHE_KEY = "chai_trans_cache";
const MAX_CACHE = 500; // max entries before pruning oldest

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setCache(cache) {
  try {
    // Prune if too large — keep newest 400
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE) {
      const pruned = {};
      keys.slice(-400).forEach(k => { pruned[k] = cache[k]; });
      localStorage.setItem(CACHE_KEY, JSON.stringify(pruned));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch {
    // localStorage full — clear and start fresh
    try { localStorage.removeItem(CACHE_KEY); } catch {}
  }
}

function cacheKey(text, lang) {
  // Short hash-like key: lang + first 40 chars cleaned
  return `${lang}:${text.trim().slice(0, 40).replace(/\s+/g, "_")}`;
}

// ── In-flight deduplication ───────────────────────────────
// Prevents 10 instances of the same string making 10 API calls
const inFlight = {};

// ── Translation function ──────────────────────────────────
async function translateText(text, langCode) {
  const mmLang = LANG_MAP[langCode];

  // Jamaican Patois not supported — return English
  if (!mmLang) return text;

  const key = cacheKey(text, langCode);
  const cache = getCache();

  // Cache hit
  if (cache[key]) return cache[key];

  // Deduplicate in-flight requests
  if (inFlight[key]) return inFlight[key];

  const promise = (async () => {
    try {
      const url = new URL("https://api.mymemory.translated.net/get");
      url.searchParams.set("q", text.trim());
      url.searchParams.set("langpair", `en|${mmLang}`);
      url.searchParams.set("de", "alexisw2025@gmail.com");

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`MyMemory ${res.status}`);

      const data = await res.json();

      // MyMemory returns responseStatus 200 on success
      if (data.responseStatus !== 200) {
        console.warn("[Translate] MyMemory:", data.responseMessage);
        return text; // fallback to English
      }

      const translated = data.responseData?.translatedText;
      if (!translated || translated === text) return text;

      // Save to cache
      const freshCache = getCache();
      freshCache[key] = translated;
      setCache(freshCache);

      return translated;
    } catch (e) {
      console.warn("[Translate] fetch error:", e.message);
      return text; // always fallback gracefully
    } finally {
      delete inFlight[key];
    }
  })();

  inFlight[key] = promise;
  return promise;
}

// ── Pre-warm cache for a batch of strings ─────────────────
// Call this on page load to translate common strings before they render
export async function prewarmTranslations(strings, lang) {
  if (!lang || lang === "en") return;
  const mmLang = LANG_MAP[lang];
  if (!mmLang) return;

  const cache = getCache();
  const uncached = strings.filter(s => !cache[cacheKey(s, lang)]);

  // Translate in small batches to avoid rate limits
  for (const text of uncached) {
    await translateText(text, lang);
    await new Promise(r => setTimeout(r, 80)); // small delay between calls
  }
}

// ── Main component ────────────────────────────────────────
export default function Translate({ children, text, fallback }) {
  const { lang } = useLang();
  const original = text || (typeof children === "string" ? children : null);

  // For non-string children or English, render as-is immediately
  const [translated, setTranslated] = useState(original);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!original) return;

    // English or no language — show original
    if (!lang || lang === "en") {
      setTranslated(original);
      return;
    }

    // Jamaican Patois — show English (not supported by MyMemory)
    if (lang === "jm") {
      setTranslated(original);
      return;
    }

    const key = cacheKey(original, lang);
    const cache = getCache();

    // Instant cache hit — no loading state needed
    if (cache[key]) {
      setTranslated(cache[key]);
      return;
    }

    // Not cached — show English while translating
    setTranslated(original);
    setLoading(true);

    translateText(original, lang).then(result => {
      if (mountedRef.current) {
        setTranslated(result);
        setLoading(false);
      }
    });
  }, [original, lang]);

  // If children is not a string (it's a React element), just render it
  if (!original) {
    return children || null;
  }

  // Render translated text with a subtle shimmer while loading
  return (
    <span
      style={loading ? {
        opacity: 0.6,
        transition: "opacity 0.3s",
      } : {
        opacity: 1,
        transition: "opacity 0.3s",
      }}
    >
      {translated || original}
    </span>
  );
}

/**
 * Hook version — use when you need the translated string
 * rather than a wrapped component.
 *
 * const title = useTranslation("Morning Rise");
 * <input placeholder={title} />
 */
export function useTranslation(text) {
  const { lang } = useLang();
  const [translated, setTranslated] = useState(text);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!text || !lang || lang === "en" || lang === "jm") {
      setTranslated(text);
      return;
    }

    const key = cacheKey(text, lang);
    const cache = getCache();

    if (cache[key]) {
      setTranslated(cache[key]);
      return;
    }

    setTranslated(text);
    translateText(text, lang).then(result => {
      if (mountedRef.current) setTranslated(result);
    });
  }, [text, lang]);

  return translated;
}

/**
 * Utility — clear the translation cache.
 * Call from browser console: window.__clearTransCache()
 */
if (typeof window !== "undefined") {
  window.__clearTransCache = () => {
    localStorage.removeItem(CACHE_KEY);
    console.log("[Translate] Cache cleared.");
  };
  window.__transCache = () => {
    const c = getCache();
    console.log(`[Translate] ${Object.keys(c).length} cached strings:`, c);
  };
}
