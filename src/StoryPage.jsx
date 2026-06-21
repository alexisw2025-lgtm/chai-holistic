import { useState, useRef } from "react";
import blendStoriesData from "./blendStories.json";
import { useTranslatedContent } from "./useTranslatedContent";

const BLEND_STORIES = blendStoriesData.blends;

// ─── PRAYER AUDIO ENGINE ────────────────────────────────────────────────────────
// Real recording first. Browser speech synthesis fallback if file is missing
// or fails to load (e.g. not recorded yet, or Supabase is briefly unreachable).
// Uses the same VITE_SUPABASE_URL env var already wired in WellnessProfileModal.jsx —
// no separate config needed.
function getPrayerAudioUrl(blendId) {
  const base = import.meta.env.VITE_SUPABASE_URL;
  return `${base}/storage/v1/object/public/prayer-audio/${blendId}-prayer.mp3`;
}

function speakFallback(text, onEnd) {
  const synth = window.speechSynthesis;
  if (!synth) { onEnd?.(); return; }
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.82; utt.pitch = 0.95; utt.volume = 0.9;
  const voices = synth.getVoices();
  const preferred = ["Samantha", "Karen", "Moira", "Fiona", "Victoria", "Google UK English Female", "Microsoft Zira"];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) { utt.voice = v; break; }
  }
  utt.onend = () => onEnd?.();
  synth.speak(utt);
}

// Plays the real recording if it exists; falls back to browser voice using
// the blend's reflection text if the file 404s or fails to load.
function playPrayerAudio({ blendId, fallbackText, onStart, onEnd, onError }) {
  const audio = new Audio(getPrayerAudioUrl(blendId));
  let usedFallback = false;

  audio.addEventListener("canplaythrough", () => {
    if (!usedFallback) onStart?.();
  });
  audio.addEventListener("ended", () => onEnd?.());
  audio.addEventListener("error", () => {
    usedFallback = true;
    onStart?.();
    speakFallback(fallbackText, onEnd);
  });

  audio.play().catch(() => {
    usedFallback = true;
    onStart?.();
    speakFallback(fallbackText, onEnd);
  });

  return audio; // caller keeps reference for pause/stop
}

const textStyle = {
  fontSize: ".88rem", color: "rgba(247,242,234,.78)", lineHeight: 1.75,
  margin: 0, fontWeight: 300,
};

function Section({ label, children, accent, className }) {
  return (
    <div className={className} style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: ".56rem", letterSpacing: ".2em", textTransform: "uppercase",
        color: accent ? "#C4893A" : "rgba(196,137,58,.6)",
        marginBottom: 10, fontWeight: 600,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function StoryPage({ blendId, T }) {
  const t = (key, fallback) => (T && T[key]) ? T[key] : fallback;
  const lang = (T && T.code) ? T.code : "en";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const blend = blendId ? BLEND_STORIES[blendId] : null;

  // Long-form content gets runtime-translated + cached (see useTranslatedContent.js).
  // Falls back to English instantly if not yet cached or if lang is "en" — never
  // breaks the page, never blocks render.
  const origin = useTranslatedContent(
    blend ? `story:${blendId}:origin` : null, blend?.origin, lang
  );
  const whyICreatedThis = useTranslatedContent(
    blend ? `story:${blendId}:why` : null, blend?.whyICreatedThis, lang
  );
  const ritualNote = useTranslatedContent(
    blend ? `story:${blendId}:ritual` : null, blend?.ritualNote, lang
  );
  const scriptureOrReflection = useTranslatedContent(
    blend ? `story:${blendId}:reflection` : null, blend?.scriptureOrReflection, lang
  );

  if (!blendId) {
    return <div style={{ minHeight: "100vh", background: "#0A0F0B" }} />;
  }

  if (!blend) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0A0F0B", display: "flex",
        alignItems: "center", justifyContent: "center", padding: 24,
        fontFamily: "Jost,sans-serif", color: "#F7F2EA", textAlign: "center",
      }}>
        <div>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>🍵</div>
          <p style={{ fontSize: "1rem", opacity: .7 }}>{t("story_not_found", "This story hasn't been written yet.")}</p>
          <a href="/" style={{ color: "#C4893A", fontSize: ".85rem", textDecoration: "underline" }}>
            {t("story_back_home", "Back to Chai Holistic")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at top, ${blend.color}33 0%, #0A0F0B 60%)`,
      fontFamily: "Jost,sans-serif",
      padding: "32px 18px 60px",
    }}>
      <style>{`
        @keyframes storyFadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .story-block { animation: storyFadeIn .7s ease-out both; }
        .story-block:nth-child(1) { animation-delay: .05s; }
        .story-block:nth-child(2) { animation-delay: .15s; }
        .story-block:nth-child(3) { animation-delay: .25s; }
        .story-block:nth-child(4) { animation-delay: .35s; }
        .story-block:nth-child(5) { animation-delay: .45s; }
        @media (prefers-reduced-motion: reduce) {
          .story-block { animation: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        <div className="story-block" style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>{blend.emoji}</div>
          <div style={{
            fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase",
            color: "#C4893A", marginBottom: 10, fontWeight: 600,
          }}>
            {t("story_eyebrow", "The Story Behind")}
          </div>
          <h1 style={{
            fontFamily: "Playfair Display,serif", fontSize: "2rem", color: "#F7F2EA",
            margin: 0, lineHeight: 1.2, fontWeight: 600,
          }}>
            {blend.name}
          </h1>
        </div>

        <Section className="story-block" label={t("story_origin_label", "Where It Comes From")}>
          <p style={textStyle}>{origin.text}</p>
        </Section>

        <Section className="story-block" label={t("story_alex_label", "Alex's Story")} accent>
          <p style={{ ...textStyle, fontStyle: "italic", fontSize: ".92rem", color: "#F7F2EA" }}>
            "{whyICreatedThis.text}"
          </p>
        </Section>

        <Section className="story-block" label={t("story_ritual_label", "How to Hold This Ritual")}>
          <p style={textStyle}>{ritualNote.text}</p>
        </Section>

        <div className="story-block" style={{
          background: "rgba(196,137,58,.08)", border: "1px solid rgba(196,137,58,.22)",
          borderRadius: 16, padding: "20px 18px", marginBottom: 20, textAlign: "center",
        }}>
          <div style={{
            fontSize: ".56rem", letterSpacing: ".2em", textTransform: "uppercase",
            color: "rgba(196,137,58,.8)", marginBottom: 10, fontWeight: 600,
          }}>
            {t("story_prayer_eyebrow", "✦ Paired Prayer")}
          </div>
          <p style={{ ...textStyle, marginBottom: 14 }}>{blend.pairedPrayer.title}</p>
          <button
            onClick={() => {
              if (isPlaying) {
                if (audioRef.current?.pause) audioRef.current.pause();
                window.speechSynthesis?.cancel();
                setIsPlaying(false);
                return;
              }
              const audio = playPrayerAudio({
                blendId: blend.pairedPrayer.audioId,
                fallbackText: scriptureOrReflection.text,
                onStart: () => setIsPlaying(true),
                onEnd: () => setIsPlaying(false),
              });
              audioRef.current = audio;
            }}
            style={{
              background: isPlaying ? "rgba(196,137,58,.3)" : "rgba(196,137,58,.15)",
              border: "1px solid rgba(196,137,58,.4)", borderRadius: 999,
              padding: "10px 22px", color: "#F7F2EA", fontSize: ".8rem",
              cursor: "pointer", fontFamily: "Jost,sans-serif", letterSpacing: ".04em",
            }}
          >
            {isPlaying ? t("story_pause", "⏸ Pause") : t("story_listen", "▶ Listen")}
          </button>
        </div>

        <Section className="story-block" label={t("story_reflection_label", "A Moment of Reflection")}>
          <p style={{ ...textStyle, fontSize: ".82rem", opacity: .75 }}>
            {scriptureOrReflection.text}
          </p>
        </Section>

        <div className="story-block" style={{ textAlign: "center", marginTop: 32 }}>
          <a href="/tea-library" style={{
            color: "#C4893A", fontSize: ".78rem", letterSpacing: ".05em",
            textDecoration: "none", borderBottom: "1px solid rgba(196,137,58,.4)",
            paddingBottom: 2,
          }}>
            {t("story_explore_library", "Explore the full Tea Library →")}
          </a>
        </div>

      </div>
    </div>
  );
}
