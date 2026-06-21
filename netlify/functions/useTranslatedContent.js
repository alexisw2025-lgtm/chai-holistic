import { useState, useEffect, useRef } from "react";

/**
 * useTranslatedContent.js
 * ───────────────────────────────────────────────────────────────────────────
 * Translates long-form content (blend stories, future blog/affiliate
 * content) at runtime, backed by the /translate Railway endpoint, which
 * caches results in Supabase so repeat visitors never re-pay the AI cost.
 *
 * This is SEPARATE from the existing LANGS/T system in chaiholistic417.jsx —
 * that system still handles short, fixed UI labels and is untouched.
 * Use this hook only for longer per-content strings (a story paragraph, a
 * blog body, etc.) that would be wasteful to hand-translate into 6
 * languages every time you add or edit one.
 *
 * USAGE:
 *   const { text, loading } = useTranslatedContent(
 *     `story:${blendId}:origin`,   // stable content_id
 *     blend.origin,                 // English source text
 *     lang                          // current language code, e.g. "es"
 *   );
 *
 * If lang is "en" (or unsupported), it returns the source text immediately —
 * no API call, no delay. English never round-trips through translation.
 */

const RAILWAY_URL = "https://chai-api-production.up.railway.app";
const SUPPORTED_LANGS = new Set(["es", "fr", "pt", "ht", "jm"]);

// Simple in-memory cache so navigating between pages in the same session
// doesn't re-fetch a translation that was already pulled this visit.
const sessionCache = new Map();

export function useTranslatedContent(contentId, sourceText, lang) {
  const [text, setText] = useState(sourceText);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    // English (or no source) — show immediately, no translation needed.
    if (!sourceText || lang === "en" || !SUPPORTED_LANGS.has(lang)) {
      setText(sourceText);
      setLoading(false);
      return;
    }

    const cacheKey = `${contentId}::${lang}`;
    if (sessionCache.has(cacheKey)) {
      setText(sessionCache.get(cacheKey));
      setLoading(false);
      return;
    }

    // Show English immediately while translation loads, rather than a
    // blank/loading flash — better UX for a faith-rooted, calm-feeling site.
    setText(sourceText);
    setLoading(true);

    const requestId = ++requestIdRef.current;

    fetch(`${RAILWAY_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content_id: contentId, source_text: sourceText, lang }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Translation request failed");
        return res.json();
      })
      .then((data) => {
        // Ignore stale responses if contentId/lang changed mid-flight
        if (requestId !== requestIdRef.current) return;
        sessionCache.set(cacheKey, data.translated_text);
        setText(data.translated_text);
        setLoading(false);
      })
      .catch(() => {
        // Graceful fallback: keep showing English rather than breaking the page
        if (requestId !== requestIdRef.current) return;
        setLoading(false);
      });
  }, [contentId, sourceText, lang]);

  return { text, loading };
}
