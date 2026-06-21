import { useState, useEffect, useMemo, useRef } from "react";
import { FDA, BLENDS, RITUALS } from "./teaLibraryData";

/* ════════════════════════════════════════
   DESIGN TOKENS (ported from chai-holistic-rolodex.html)
════════════════════════════════════════ */
const C = {
  forest: "#0d1a11",
  fern: "#173322",
  sage: "#275c3e",
  sageLt: "#3a7a55",
  mint: "#52b882",
  mintGlow: "rgba(82,184,130,.15)",
  pale: "#b2dfc4",
  cream: "#fef9ef",
  parchment: "#f5edda",
  warmWhite: "#fffdf7",
  gold: "#c08830",
  goldLt: "#deb96a",
  goldPale: "#fdf5e4",
  goldGlow: "rgba(192,136,48,.12)",
  amber: "#aa5c18",
  rust: "#8a3a10",
  ink: "#1c1c1a",
  inkSoft: "#3a3830",
  mist: "#ebf5ef",
  mistDark: "#d4eadd",
};

const PART_ACCENT_BG = {
  I: "linear-gradient(90deg,#1a5c38 0%,#52b882 50%,#1a5c38 100%)",
  II: "linear-gradient(90deg,#1a3068 0%,#4878cc 50%,#1a3068 100%)",
  III: "linear-gradient(90deg,#521870 0%,#a850c8 50%,#521870 100%)",
  IV: "linear-gradient(90deg,#6a2808 0%,#c87020 50%,#6a2808 100%)",
  Ritual: "linear-gradient(90deg,#5a1a4a 0%,#a850c8 50%,#5a1a4a 100%)",
};
const PART_BADGE = {
  I: { bg: "rgba(26,92,56,.09)", color: "#1a5c38", border: "rgba(26,92,56,.15)" },
  II: { bg: "rgba(26,48,104,.09)", color: "#1a3068", border: "rgba(26,48,104,.15)" },
  III: { bg: "rgba(82,24,112,.09)", color: "#521870", border: "rgba(82,24,112,.15)" },
  IV: { bg: "rgba(170,92,24,.1)", color: "#aa5c18", border: "rgba(170,92,24,.18)" },
  Ritual: { bg: "rgba(90,26,74,.1)", color: "#8a3a6a", border: "rgba(90,26,74,.2)" },
};
const RISK_DOT = {
  low: { bg: "#3aa86a", glow: "rgba(58,168,106,.4)" },
  moderate: { bg: "#d4880a", glow: "rgba(212,136,10,.4)" },
  high: { bg: "#c83030", glow: "rgba(200,48,48,.4)" },
};
const RISK_LABEL = { low: "Low risk", moderate: "Moderate caution", high: "High caution" };
const FDA_BAR_COLOR = { low: "#173322", moderate: "#5a2c00", high: "#5a0000" };
const FDA_BAR_LABEL = {
  low: "LOW INTERACTION RISK",
  moderate: "MODERATE — CONSULT YOUR DOCTOR",
  high: "HIGH — IMPORTANT WARNINGS",
};

const PART_LABEL = {
  all: "All 40",
  I: "Part I · Foundational",
  II: "Part II · Advanced",
  III: "Part III · Sacred",
  IV: "Part IV · Cleanse",
};

const NEED_MAP = {
  "tired & depleted|anxious & scattered|rest & restore": 0,
  "tired & depleted|low mood|rest & restore": 0,
  "tired & depleted|peaceful|rest & restore": 0,
  "tired & depleted|energized & focused|focus & create": 2,
  "tired & depleted|foggy & unfocused|focus & create": 2,
  "tired & depleted|foggy & unfocused|nourish & heal": 8,
  "tired & depleted|seeking clarity|focus & create": 2,
  "tired & depleted|anxious & scattered|nourish & heal": 8,
  "tense & in pain|anxious & scattered|rest & restore": 16,
  "tense & in pain|peaceful|rest & restore": 0,
  "tense & in pain|low mood|rest & restore": 12,
  "tense & in pain|seeking clarity|connect spiritually": 22,
  "tense & in pain|peaceful|nourish & heal": 5,
  "tense & in pain|anxious & scattered|nourish & heal": 5,
  "sluggish & bloated|foggy & unfocused|cleanse & detox": 4,
  "sluggish & bloated|peaceful|cleanse & detox": 30,
  "sluggish & bloated|low mood|cleanse & detox": 32,
  "sluggish & bloated|seeking clarity|cleanse & detox": 10,
  "under the weather|peaceful|protect & strengthen": 3,
  "under the weather|anxious & scattered|protect & strengthen": 3,
  "under the weather|peaceful|nourish & heal": 9,
  "under the weather|foggy & unfocused|nourish & heal": 7,
  "physically strong|energized & focused|focus & create": 17,
  "physically strong|energized & focused|protect & strengthen": 17,
  "physically strong|seeking clarity|connect spiritually": 19,
  "physically strong|peaceful|connect spiritually": 29,
  "neutral|seeking clarity|connect spiritually": 11,
  "neutral|seeking clarity|focus & create": 2,
  "neutral|peaceful|connect spiritually": 29,
  "neutral|peaceful|rest & restore": 0,
  "neutral|low mood|nourish & heal": 12,
  "neutral|foggy & unfocused|cleanse & detox": 10,
};
const NEED_FALLBACK = {
  "rest & restore": 0,
  "cleanse & detox": 10,
  "nourish & heal": 5,
  "focus & create": 2,
  "connect spiritually": 11,
  "protect & strengthen": 3,
};
const INTENT_REASONS = {
  "rest & restore": "This blend will gently quiet your system and guide you into deep restoration.",
  "cleanse & detox": "Your body is ready to release. This blend supports your organs in clearing what no longer serves.",
  "nourish & heal": "Chosen to deeply nourish and support repair from the inside out.",
  "focus & create": "This blend will sharpen your mental edge and help you enter a clear, productive flow state.",
  "connect spiritually": "This sacred blend supports your intention to go inward and touch the deeper layers of yourself.",
  "protect & strengthen": "This blend will fortify your defenses and build the resilience your body needs right now.",
};

const HERBS = [
  "Chamomile", "Lavender", "Ashwagandha", "Ginger", "Turmeric", "Peppermint",
  "Rose petals", "Valerian", "Elderberry", "Reishi", "Lion's mane", "Holy basil",
  "Nettle", "Dandelion", "Milk thistle", "Hibiscus", "Cinnamon", "Lemon balm",
];

const fontDisplay = { fontFamily: "'Playfair Display', serif" };
const fontBody = { fontFamily: "'Cormorant Garamond', serif" };
const fontEyebrow = { fontFamily: "'Cinzel', serif" };
const fontUtility = { fontFamily: "'DM Sans', sans-serif" };

function pad2(n) {
  return String(n).padStart(2, "0");
}

/* ════════════════════════════════════════
   TEA CARD
════════════════════════════════════════ */
function TeaCard({ blend, index, listView, onOpen, locked }) {
  const fda = FDA[blend.n] || { level: "low" };
  const herbs = blend.ingredients.slice(0, 4);
  const more = blend.ingredients.length - 4;
  const risk = RISK_DOT[fda.level];

  return (
    <div
      onClick={() => onOpen(index)}
      className="tea-card-anim"
      style={{
        background: C.cream,
        borderRadius: 22,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,.18), 0 8px 32px rgba(0,0,0,.14)",
        border: "1px solid rgba(255,255,255,.06)",
        display: listView ? "grid" : "block",
        gridTemplateColumns: listView ? "4px 1fr" : undefined,
        transition: "transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.28), 0 20px 56px rgba(0,0,0,.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.18), 0 8px 32px rgba(0,0,0,.14)";
      }}
    >
      <div
        style={{
          height: listView ? "auto" : 4,
          width: listView ? undefined : "100%",
          background: PART_ACCENT_BG[blend.part],
          borderRadius: listView ? 0 : undefined,
        }}
      />
      <div
        style={{
          padding: listView ? "12px 18px" : "18px 20px 20px",
          display: listView ? "flex" : "block",
          alignItems: listView ? "center" : undefined,
          gap: listView ? 14 : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: listView ? undefined : "flex-start",
            flexDirection: listView ? "column" : "row",
            justifyContent: listView ? undefined : "space-between",
            gap: listView ? 2 : undefined,
            marginBottom: listView ? 0 : 14,
          }}
        >
          <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", color: C.sageLt }}>
            No. {pad2(blend.n)}
          </div>
          {!listView && (
            <span
              style={{
                ...fontEyebrow,
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: ".14em",
                padding: "3px 9px",
                borderRadius: 20,
                textTransform: "uppercase",
                background: PART_BADGE[blend.part].bg,
                color: PART_BADGE[blend.part].color,
                border: `1px solid ${PART_BADGE[blend.part].border}`,
              }}
            >
              Part {blend.part}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: listView ? 0 : 10 }}>
          <span style={{ fontSize: listView ? 24 : 34, lineHeight: 1, flexShrink: 0 }}>{blend.emoji}</span>
          <div style={{ ...fontDisplay, fontSize: listView ? 14 : 17, fontWeight: 600, color: C.forest, lineHeight: 1.25 }}>
            {blend.name}
          </div>
        </div>

        {!listView && (
          <>
            <div
              style={{
                ...fontBody,
                fontSize: 15,
                fontStyle: "italic",
                color: "#656056",
                lineHeight: 1.65,
                marginBottom: 14,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blend.benefits}
            </div>

            {locked ? (
              <div
                style={{
                  ...fontUtility,
                  fontSize: 12,
                  color: C.gold,
                  background: C.goldPale,
                  border: `1px solid rgba(192,136,48,.25)`,
                  borderRadius: 10,
                  padding: "8px 12px",
                  marginBottom: 16,
                  fontStyle: "italic",
                  ...fontBody,
                }}
              >
                ✦ A Ritual Moments tea — full recipe lives in the Tea Library
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                {herbs.map(([, h], i) => (
                  <span
                    key={i}
                    style={{
                      ...fontUtility,
                      fontSize: 10,
                      color: C.sage,
                      background: C.mist,
                      border: `1px solid ${C.mistDark}`,
                      borderRadius: 20,
                      padding: "3px 9px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </span>
                ))}
                {more > 0 && (
                  <span
                    style={{
                      ...fontUtility,
                      fontSize: 10,
                      background: C.parchment,
                      color: C.gold,
                      border: "1px solid rgba(192,136,48,.2)",
                      fontStyle: "italic",
                      borderRadius: 20,
                      padding: "3px 9px",
                    }}
                  >
                    +{more} more
                  </span>
                )}
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: "flex",
            alignItems: listView ? "flex-end" : "center",
            flexDirection: listView ? "column" : "row",
            justifyContent: "space-between",
            paddingTop: listView ? 0 : 14,
            borderTop: listView ? "none" : "1px solid rgba(0,0,0,.07)",
            gap: 10,
            flex: listView ? 1 : undefined,
          }}
        >
          {blend.ritualMoment ? (
            <div style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: C.forest }}>
              ${blend.price?.toFixed(2)}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 5, ...fontUtility, fontSize: 10, color: "#aaa" }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: risk.bg,
                  boxShadow: `0 0 5px ${risk.glow}`,
                }}
              />
              {RISK_LABEL[fda.level]}
            </div>
          )}
          <div style={{ ...fontEyebrow, fontSize: 9, fontWeight: 500, letterSpacing: ".16em", color: C.sage, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
            {locked ? "Visit Tea Library" : "View Recipe"} <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MODAL
════════════════════════════════════════ */
function BlendModal({ blend, idx, total, onClose, onNav, onNotify, onAddToCart }) {
  if (!blend) return null;
  const fda = FDA[blend.n] || { level: "low", warnings: [] };
  const accentBg = PART_ACCENT_BG[blend.part] || "linear-gradient(90deg,#8a3a6a 0%,#c87fae 50%,#8a3a6a 100%)";

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [blend, onClose, onNav]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,14,9,.88)",
        backdropFilter: "blur(18px) saturate(140%)",
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
      }}
    >
      <div
        style={{
          background: C.cream,
          borderRadius: 28,
          width: "100%",
          maxWidth: 660,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,.6), 0 4px 24px rgba(0,0,0,.3)",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div style={{ height: 5, width: "100%", borderRadius: "28px 28px 0 0", background: accentBg }} />
        <div
          style={{
            padding: "22px 26px 16px",
            position: "sticky",
            top: 0,
            background: C.cream,
            zIndex: 10,
            borderBottom: "1px solid rgba(0,0,0,.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ ...fontEyebrow, fontSize: 10, fontWeight: 600, letterSpacing: ".18em", color: C.sageLt, marginBottom: 4 }}>
                {blend.ritualMoment ? "Ritual Moments" : `No. ${pad2(blend.n)} · Part ${blend.part}`}
              </div>
              <span style={{ fontSize: 30, marginRight: 8 }}>{blend.emoji}</span>
              <div style={{ ...fontDisplay, fontSize: 24, fontWeight: 700, color: C.forest, display: "inline" }}>
                {blend.name}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(0,0,0,.07)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                fontSize: 14,
                cursor: "pointer",
                color: "#999",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ padding: "20px 26px" }}>
          {blend.tagline && (
            <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#888", marginTop: -4, marginBottom: 16 }}>{blend.tagline}</p>
          )}
          <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", color: C.sage, textTransform: "uppercase", marginBottom: 10 }}>
            Ingredients
          </div>
          <div style={{ marginBottom: 6 }}>
            {blend.ingredients.map(([, herb], i) => (
              <div key={i} style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "#333", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>{herb}</div>
            ))}
          </div>
          {blend.yield && <div style={{ ...fontBody, fontSize: 12.5, fontStyle: "italic", color: "#999", marginBottom: 22 }}>{blend.yield}</div>}

          <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", color: C.sage, textTransform: "uppercase", marginBottom: 10, marginTop: blend.yield ? 0 : 18 }}>
            {blend.ritualMoment ? "About This Ritual" : "Healing Benefits"}
          </div>
          <p style={{ ...fontBody, fontSize: 16, fontStyle: "italic", color: "#444", lineHeight: 1.75, marginBottom: 22 }}>{blend.benefits}</p>

          {!blend.ritualMoment && (
            <div style={{ background: "linear-gradient(135deg,#1a1a1a,#2a2418)", borderRadius: 14, padding: 18, marginBottom: 22 }}>
              <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".22em", color: "#FFD700", textTransform: "uppercase", marginBottom: 10 }}>
                🙏 Paired Prayer
              </div>
              <p style={{ ...fontBody, fontSize: 18, fontStyle: "italic", color: "#fff", lineHeight: 1.7, marginBottom: 12 }}>
                "Lord, meet me in this moment. Let this cup be a reminder that You hold the night watch. Amen."
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && window.speechSynthesis) {
                    const u = new SpeechSynthesisUtterance("Lord, meet me in this moment. Let this cup be a reminder that You hold the night watch. Amen.");
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(u);
                  }
                }}
                style={{ ...fontUtility, fontSize: 14, fontWeight: 600, color: "#1a1a1a", background: "#FFD700", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer" }}
              >
                ▶️ Play Audio
              </button>
            </div>
          )}

          {!blend.ritualMoment && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
              <div style={{ background: C.mist, borderLeft: `3px solid ${C.mint}`, borderRadius: 10, padding: 14 }}>
                <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: C.sage }}>☕ Brewing</div>
                <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.65 }}>{blend.brew}</p>
              </div>
              <div style={{ background: C.goldPale, borderLeft: `3px solid ${C.gold}`, borderRadius: 10, padding: 14 }}>
                <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: C.gold }}>✦ Pro Tip</div>
                <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.65 }}>{blend.tip}</p>
              </div>
            </div>
          )}

          {blend.ritualMoment && (
            <div style={{ background: "linear-gradient(135deg,#2a1a3a,#4a2a5a)", borderRadius: 16, padding: 22, marginBottom: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: "rgba(255,255,255,.5)" }}>🙏 Paired Prayer</div>
                  <p style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>{blend.prayerTitle}</p>
                </div>
                <div>
                  <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: "rgba(255,255,255,.5)" }}>✦ Meridian Frequency</div>
                  <p style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>{blend.frequencyHz} Hz · {blend.frequencyName}</p>
                </div>
              </div>
              <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 8, color: "rgba(255,255,255,.5)" }}>The Intention</div>
              <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "rgba(255,255,255,.85)", lineHeight: 1.75 }}>{blend.intention}</p>
            </div>
          )}

          {!blend.ritualMoment && (
            <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 0 }}>
              <div style={{ background: FDA_BAR_COLOR[fda.level], padding: "10px 16px", ...fontEyebrow, fontSize: 10, letterSpacing: ".14em", color: "#fff" }}>
                ⚕ FDA Safety · {FDA_BAR_LABEL[fda.level]}
              </div>
              <div style={{ background: "rgba(0,0,0,.03)", padding: "14px 16px" }}>
                {fda.warnings.map((w, i) => (
                  <p key={i} style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#665", lineHeight: 1.6, marginBottom: 6 }}>
                    ⚠ {w}
                  </p>
                ))}
                <div style={{ ...fontUtility, fontSize: 10.5, color: "#998", lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,.06)" }}>
                  ✦ This statement has not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare provider before beginning any herbal protocol, especially if pregnant, nursing, or taking prescription medications.
                </div>
              </div>
            </div>
          )}

          {blend.ritualMoment && fda.warnings && fda.warnings.length > 0 && (
            <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 0 }}>
              <div style={{ background: FDA_BAR_COLOR[fda.level], padding: "10px 16px", ...fontEyebrow, fontSize: 10, letterSpacing: ".14em", color: "#fff" }}>
                ⚕ Safety Note
              </div>
              <div style={{ background: "rgba(0,0,0,.03)", padding: "14px 16px" }}>
                {fda.warnings.map((w, i) => (
                  <p key={i} style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#665", lineHeight: 1.6, marginBottom: 6 }}>
                    ⚠ {w}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "0 26px 20px" }}>
          {blend.ritualMoment ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ ...fontDisplay, fontSize: 22, fontWeight: 700, color: C.forest }}>${blend.price?.toFixed(2)}</div>
                <div style={{ ...fontUtility, fontSize: 10.5, color: "#999" }}>Ritual Moments · Tea Library exclusive</div>
              </div>
              <button
                onClick={() => onAddToCart && onAddToCart(blend)}
                style={{ ...fontUtility, fontSize: 12, padding: "12px 26px", borderRadius: 12, border: "none", background: C.sage, color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Add to Basket
              </button>
            </div>
          ) : (
            <div>
              <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".18em", color: "#777", textTransform: "uppercase", marginBottom: 12 }}>
                Order from Chai Holistic
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { icon: "🫖", title: "Pre-Blended Tea", desc: "Expertly blended, ready to brew. Premium loose-leaf in a resealable kraft pouch.", price: "2oz · ~30 cups" },
                  { icon: "🌿", title: "Individual Herbs", desc: "Source each herb individually. Blend it yourself at home for maximum freshness.", price: "per ingredient" },
                ].map((opt, i) => (
                  <div key={i} style={{ background: "rgba(0,0,0,.02)", border: "1px solid rgba(0,0,0,.06)", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: 22, display: "block", marginBottom: 6 }}>{opt.icon}</span>
                      <div style={{ ...fontDisplay, fontSize: 14, fontWeight: 600, color: C.forest, marginBottom: 4 }}>{opt.title}</div>
                      <div style={{ ...fontBody, fontSize: 12.5, fontStyle: "italic", color: "#888", lineHeight: 1.5, marginBottom: 10 }}>{opt.desc}</div>
                    </div>
                    <div>
                      <div style={{ ...fontUtility, fontSize: 11, color: "#aaa", marginBottom: 8 }}>
                        Coming Soon <span style={{ display: "block", fontSize: 10 }}>{opt.price}</span>
                      </div>
                      <button onClick={onNotify} style={{ ...fontUtility, fontSize: 11, width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${C.sage}`, background: "transparent", color: C.sage, cursor: "pointer" }}>
                        ✉ Notify Me When Available
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 26px 18px" }}>
          <button onClick={() => onNav(-1)} disabled={idx === 0} style={navBtnStyle(idx === 0)}>← Prev</button>
          <div style={{ ...fontUtility, fontSize: 11, color: "#999" }}>{idx + 1} of {total}</div>
          <button onClick={() => onNav(1)} disabled={idx === total - 1} style={navBtnStyle(idx === total - 1)}>Next →</button>
        </div>
      </div>
    </div>
  );
}
function navBtnStyle(disabled) {
  return {
    ...fontUtility,
    fontSize: 11,
    padding: "8px 16px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,.1)",
    background: disabled ? "rgba(0,0,0,.02)" : "#fff",
    color: disabled ? "#ccc" : "#555",
    cursor: disabled ? "default" : "pointer",
  };
}

/* ════════════════════════════════════════
   ROLODEX PAGE (search, filter, grid)
════════════════════════════════════════ */
function RolodexPage({ blends, onOpenBlend, headerOffset }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return blends.filter((b) => {
      const fda = FDA[b.n] || { level: "low" };
      const matchPart = filter === "all" || b.part === filter || fda.level === filter;
      const q = search.toLowerCase();
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.benefits.toLowerCase().includes(q) ||
        b.ingredients.some(([, h]) => h.toLowerCase().includes(q));
      return matchPart && matchQuery;
    });
  }, [blends, search, filter]);

  const chips = ["all", "I", "II", "III", "IV", "Ritual", "low", "moderate", "high"];
  const chipLabel = {
    all: "All 46", I: "Part I · Foundational", II: "Part II · Advanced",
    III: "Part III · Sacred", IV: "Part IV · Cleanse", Ritual: "✦ Ritual Moments",
    low: "🟢 Low Risk", moderate: "🟡 Moderate", high: "🔴 High Caution",
  };

  return (
    <div>
      <div style={{ position: "sticky", top: headerOffset + 62, zIndex: 200, maxWidth: 1440, margin: "0 auto", padding: "24px 36px 0", background: C.forest }}>
        <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14, backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220, maxWidth: 400 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.28)", fontSize: 14 }}>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blends, herbs, benefits…"
                style={{
                  width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(82,184,130,.18)",
                  borderRadius: 30, padding: "9px 16px 9px 38px", ...fontBody, fontSize: 15, color: "#fff", outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 2, background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, padding: 3 }}>
              <button onClick={() => setView("grid")} title="Grid" style={viewBtnStyle(view === "grid")}>⊞</button>
              <button onClick={() => setView("list")} title="List" style={viewBtnStyle(view === "list")}>≡</button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            <span style={{ ...fontUtility, fontSize: 10, letterSpacing: ".08em", color: "rgba(255,255,255,.25)", marginRight: 2 }}>Filter</span>
            {chips.map((c) => (
              <button key={c} onClick={() => setFilter(c)} style={chipStyle(filter === c, c === "IV")}>
                {chipLabel[c]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "10px 36px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ ...fontUtility, fontSize: 11, color: "rgba(255,255,255,.26)", letterSpacing: ".05em" }}>
          <strong style={{ color: "rgba(255,255,255,.55)" }}>{filtered.length}</strong> blends shown
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "8px 36px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>🍵</span>
            <h3 style={{ ...fontDisplay, fontSize: 22, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>No blends found</h3>
            <p style={{ ...fontBody, fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,.28)" }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: view === "list" ? "1fr" : "repeat(auto-fill, minmax(310px, 1fr))",
              gap: view === "list" ? 8 : 18,
            }}
          >
            {filtered.map((b, i) => (
              <TeaCard key={b.n} blend={b} index={i} listView={view === "list"} onOpen={(idx) => onOpenBlend(filtered, idx)} locked={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function viewBtnStyle(active) {
  return {
    background: active ? "rgba(82,184,130,.2)" : "transparent",
    border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer",
    fontSize: 13, color: active ? C.mint : "rgba(255,255,255,.32)",
  };
}
function chipStyle(active, isPartIV) {
  return {
    ...fontUtility, fontSize: 11, fontWeight: 400,
    color: active ? "#fff" : "rgba(255,255,255,.45)",
    background: active ? (isPartIV ? "rgba(170,92,24,.18)" : "rgba(82,184,130,.18)") : "rgba(255,255,255,.04)",
    border: `1px solid ${active ? (isPartIV ? "rgba(170,92,24,.5)" : "rgba(82,184,130,.5)") : "rgba(255,255,255,.09)"}`,
    borderRadius: 20, padding: "5px 13px", cursor: "pointer", whiteSpace: "nowrap",
  };
}

/* ════════════════════════════════════════
   SHARED PAGE HERO
════════════════════════════════════════ */
function PageHero({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <span style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 500, letterSpacing: ".38em", textTransform: "uppercase", color: C.mint }}>
        {eyebrow}
      </span>
      <h2 style={{ ...fontDisplay, fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, lineHeight: 1.1, color: "#fff", margin: "10px 0" }}>
        {title}
      </h2>
      <p style={{ ...fontBody, fontSize: 17, fontStyle: "italic", color: "rgba(255,255,255,.42)", lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "18px auto" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   WHAT DO I NEED — guided quiz
════════════════════════════════════════ */
const Q1_OPTS = ["tired & depleted", "tense & in pain", "sluggish & bloated", "under the weather", "physically strong", "neutral"];
const Q1_LABELS = { "tired & depleted": "Tired & depleted", "tense & in pain": "Tense & in pain", "sluggish & bloated": "Sluggish & bloated", "under the weather": "Under the weather", "physically strong": "Physically strong", "neutral": "Neutral / okay" };
const Q2_OPTS = ["anxious & scattered", "foggy & unfocused", "low mood", "seeking clarity", "peaceful", "energized & focused"];
const Q2_LABELS = { "anxious & scattered": "Anxious & scattered", "foggy & unfocused": "Foggy & unfocused", "low mood": "Low mood", "seeking clarity": "Seeking clarity", "peaceful": "Peaceful", "energized & focused": "Energized & focused" };
const Q3_OPTS = ["rest & restore", "cleanse & detox", "nourish & heal", "focus & create", "connect spiritually", "protect & strengthen"];
const Q3_LABELS = { "rest & restore": "Rest & restore", "cleanse & detox": "Cleanse & detox", "nourish & heal": "Nourish & heal", "focus & create": "Focus & create", "connect spiritually": "Connect spiritually", "protect & strengthen": "Protect & strengthen" };

function NeedPage({ onOpenBlend }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const select = (q, v) => setAnswers((a) => ({ ...a, [q]: v }));
  const ready = answers.q1 && answers.q2 && answers.q3;

  const findBlend = () => {
    const key = `${answers.q1}|${answers.q2}|${answers.q3}`;
    let idx = NEED_MAP[key];
    if (idx === undefined) idx = NEED_FALLBACK[answers.q3] || 0;
    setResult({ blend: BLENDS[idx], idx });
  };
  const reset = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 100px" }}>
      <PageHero eyebrow="Guided Discovery" title="What Do I Need Today?" subtitle="Answer three questions. Receive your perfect blend." />
      {!result ? (
        <div>
          <QuizStep n={1} q="How is your body feeling?" opts={Q1_OPTS} labels={Q1_LABELS} sel={answers.q1} onSel={(v) => select("q1", v)} />
          <QuizStep n={2} q="How is your mind & spirit?" opts={Q2_OPTS} labels={Q2_LABELS} sel={answers.q2} onSel={(v) => select("q2", v)} />
          <QuizStep n={3} q="What is your intention?" opts={Q3_OPTS} labels={Q3_LABELS} sel={answers.q3} onSel={(v) => select("q3", v)} />
          <button
            onClick={findBlend}
            disabled={!ready}
            style={{
              width: "100%", ...fontEyebrow, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
              background: ready ? `linear-gradient(135deg, ${C.fern}, ${C.sageLt})` : "rgba(255,255,255,.06)",
              color: ready ? C.goldLt : "rgba(255,255,255,.25)", border: "none", borderRadius: 16,
              padding: "16px 24px", cursor: ready ? "pointer" : "default", marginTop: 8,
            }}
          >
            ✦ Find My Blend
          </button>
        </div>
      ) : (
        <div style={{ background: C.cream, borderRadius: 28, padding: 28, boxShadow: "0 8px 24px rgba(0,0,0,.28)" }}>
          <span style={{ fontSize: 40, display: "block", marginBottom: 8 }}>{result.blend.emoji}</span>
          <div style={{ ...fontUtility, fontSize: 11, color: "#999", marginBottom: 4 }}>Your Blend · No. {pad2(result.blend.n)}</div>
          <div style={{ ...fontDisplay, fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 10 }}>{result.blend.name}</div>
          <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
            {INTENT_REASONS[answers.q3] || ""} {result.blend.benefits}
          </p>
          <div style={{ ...fontEyebrow, fontSize: 9, letterSpacing: ".2em", color: C.sage, textTransform: "uppercase", marginBottom: 6 }}>Brewing</div>
          <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.7, marginBottom: 16 }}>{result.blend.brew}</p>
          <div style={{ ...fontEyebrow, fontSize: 9, letterSpacing: ".2em", color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>Pro Tip</div>
          <p style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "#888", lineHeight: 1.65, marginBottom: 20 }}>{result.blend.tip}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onOpenBlend([...BLENDS], result.idx)} style={{ ...fontUtility, fontSize: 12, padding: "10px 18px", borderRadius: 12, border: "none", background: C.sage, color: "#fff", cursor: "pointer" }}>✦ Full Recipe</button>
            <button onClick={reset} style={{ ...fontUtility, fontSize: 12, padding: "10px 18px", borderRadius: 12, border: `1px solid ${C.sage}`, background: "transparent", color: C.sage, cursor: "pointer" }}>Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}
function QuizStep({ n, q, opts, labels, sel, onSel }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ ...fontUtility, fontSize: 10, letterSpacing: ".1em", color: "rgba(255,255,255,.3)", marginBottom: 6 }}>Step {n} of 3</div>
      <h3 style={{ ...fontDisplay, fontSize: 19, color: "#fff", fontWeight: 600, marginBottom: 14 }}>{q}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => onSel(o)}
            style={{
              ...fontBody, fontSize: 14, fontStyle: "italic", padding: "9px 16px", borderRadius: 14, cursor: "pointer",
              background: sel === o ? "rgba(82,184,130,.18)" : "rgba(255,255,255,.04)",
              border: `1px solid ${sel === o ? "rgba(82,184,130,.5)" : "rgba(255,255,255,.09)"}`,
              color: sel === o ? "#fff" : "rgba(255,255,255,.6)",
            }}
          >
            {labels[o]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   BLEND BUILDER — AI custom blend
════════════════════════════════════════ */
const BUILDER_STYLES = ["grounding & earthy", "light & floral", "warming & spiced", "cooling & minty", "sacred & ceremonial", "bold & medicinal"];

function BuilderPage() {
  const [intention, setIntention] = useState("");
  const [style, setStyle] = useState(BUILDER_STYLES[0]);
  const [avoid, setAvoid] = useState("");
  const [selectedHerbs, setSelectedHerbs] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const toggleHerb = (h) => {
    setSelectedHerbs((prev) => {
      const next = new Set(prev);
      next.has(h) ? next.delete(h) : next.add(h);
      return next;
    });
  };

  const buildBlend = async () => {
    setLoading(true);
    setError(false);
    setResult(null);
    const prompt = `You are a master herbalist for Chai Holistic, a premium holistic wellness brand. Create a personalized herbal tea blend.
Intention: ${intention || "general wellness"}
Style: ${style}
Preferred herbs: ${[...selectedHerbs].join(", ") || "no preference"}
Avoid: ${avoid || "none"}
Respond ONLY with valid JSON (no markdown):
{"name":"Creative poetic blend name","tagline":"One evocative sentence","ingredients":[{"amount":"2 tsp","herb":"Herb name"},{"amount":"1 tsp","herb":"Herb name"},{"amount":"0.5 tsp","herb":"Herb name"}],"brew":"Specific brewing instructions","intention":"A mindful intention phrase to say while preparing","notes":"Why these herbs work together (2 sentences)"}
Use 4-6 herbs. Be creative and poetic.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const raw = data.content.map((i) => i.text || "").join("").replace(/```json|```/g, "").trim();
      setResult(JSON.parse(raw));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 100px" }}>
      <PageHero eyebrow="AI-Powered" title="Custom Blend Builder" subtitle="Describe what you need. Receive a bespoke blend crafted for you alone." />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <BuilderBox label="Your Intention" hint="What do you want this blend to do?">
          <textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            rows={3}
            placeholder="e.g. I want to sleep deeply and quiet my racing mind…"
            style={textAreaStyle}
          />
        </BuilderBox>
        <BuilderBox label="Blend Style" hint="Choose the character of your blend">
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={selectStyle}>
            {BUILDER_STYLES.map((s) => (
              <option key={s} value={s} style={{ background: "#173322" }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </BuilderBox>
        <BuilderBox label="Herbs to Feature" hint="Select any you want included">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {HERBS.map((h) => (
              <button
                key={h}
                onClick={() => toggleHerb(h)}
                style={{
                  ...fontUtility, fontSize: 10.5, padding: "4px 12px", borderRadius: 16, cursor: "pointer",
                  background: selectedHerbs.has(h) ? "rgba(82,184,130,.2)" : "rgba(255,255,255,.04)",
                  border: `1px solid ${selectedHerbs.has(h) ? "rgba(82,184,130,.5)" : "rgba(255,255,255,.1)"}`,
                  color: selectedHerbs.has(h) ? "#fff" : "rgba(255,255,255,.5)",
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </BuilderBox>
        <BuilderBox label="Sensitivities / Avoid" hint="Anything to steer clear of?">
          <input value={avoid} onChange={(e) => setAvoid(e.target.value)} placeholder="e.g. pregnant, no kava, avoid licorice…" style={inputStyle} />
        </BuilderBox>
      </div>
      <button
        onClick={buildBlend}
        disabled={loading}
        style={{
          width: "100%", ...fontEyebrow, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase",
          background: `linear-gradient(135deg, ${C.fern}, ${C.sageLt})`, color: C.goldLt, border: "none",
          borderRadius: 16, padding: "16px 24px", cursor: loading ? "default" : "pointer", marginTop: 22,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Crafting your blend…" : "✦ Create My Custom Blend"}
      </button>

      {result && (
        <div style={{ background: C.cream, borderRadius: 28, padding: 28, marginTop: 24, boxShadow: "0 8px 24px rgba(0,0,0,.28)" }}>
          <div style={{ ...fontDisplay, fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 5 }}>{result.name}</div>
          <div style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#888", marginBottom: 22 }}>{result.tagline}</div>
          <div style={{ ...fontEyebrow, fontSize: 9, letterSpacing: ".2em", color: C.sage, textTransform: "uppercase", marginBottom: 12 }}>Ingredients</div>
          <div style={{ marginBottom: 18 }}>
            {result.ingredients.map((ing, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
                <span style={{ ...fontEyebrow, fontSize: 10, fontWeight: 600, color: C.sage, width: 60, flexShrink: 0 }}>{ing.amount}</span>
                <span style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "#333" }}>{ing.herb}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.mist, borderLeft: `3px solid ${C.mint}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: C.sage }}>☕ Brewing</div>
            <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.65 }}>{result.brew}</p>
          </div>
          <div style={{ background: C.goldPale, borderLeft: `3px solid ${C.gold}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ ...fontEyebrow, fontSize: 8.5, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 5, color: C.gold }}>✦ Intention</div>
            <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.65 }}>{result.intention}</p>
          </div>
          {result.notes && <p style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#888", lineHeight: 1.65 }}>{result.notes}</p>}
        </div>
      )}
      {error && (
        <div style={{ ...fontBody, fontSize: 15, fontStyle: "italic", color: "#c06060", textAlign: "center", padding: 20, marginTop: 16 }}>
          ✦ The herbs are still speaking… please try again in a moment.
        </div>
      )}
    </div>
  );
}
function BuilderBox({ label, hint, children }) {
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, padding: 18 }}>
      <div style={{ ...fontEyebrow, fontSize: 9, letterSpacing: ".18em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ ...fontBody, fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,.32)", marginBottom: 10 }}>{hint}</div>
      {children}
    </div>
  );
}
const textAreaStyle = {
  width: "100%", background: "rgba(0,0,0,.2)", border: "1px solid rgba(82,184,130,.18)", borderRadius: 10,
  padding: "10px 14px", ...fontBody, fontSize: 15, color: "#fff", outline: "none", resize: "vertical",
};
const inputStyle = {
  width: "100%", background: "rgba(0,0,0,.2)", border: "1px solid rgba(82,184,130,.18)", borderRadius: 10,
  padding: "10px 14px", ...fontBody, fontSize: 15, color: "#fff", outline: "none",
};
const selectStyle = { ...inputStyle, cursor: "pointer" };

/* ════════════════════════════════════════
   SEASONAL RITUAL
════════════════════════════════════════ */
const SEASONS = [
  { key: "spring", label: "🌸 Spring" },
  { key: "summer", label: "☀️ Summer" },
  { key: "autumn", label: "🍂 Autumn" },
  { key: "winter", label: "❄️ Winter" },
];
const LUNAR = [
  { key: "new", label: "🌑 New Moon" },
  { key: "waxing", label: "🌒 Waxing" },
  { key: "full", label: "🌕 Full Moon" },
  { key: "waning", label: "🌘 Waning" },
];

function RitualPage({ onOpenBlend }) {
  const [season, setSeason] = useState("spring");
  const [lunar, setLunar] = useState("new");
  const data = RITUALS[season][lunar];

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 24px 100px" }}>
      <PageHero eyebrow="Seasonal Wisdom" title="Ritual Planner" subtitle="The right blend, the right phase, the right moment." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
        {SEASONS.map((s) => (
          <button key={s.key} onClick={() => setSeason(s.key)} style={tabStyle(season === s.key)}>{s.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        {LUNAR.map((l) => (
          <button key={l.key} onClick={() => setLunar(l.key)} style={lunarTabStyle(lunar === l.key)}>{l.label}</button>
        ))}
      </div>

      <div style={{ borderRadius: 28, padding: "34px 38px", marginBottom: 28, position: "relative", overflow: "hidden", background: data.bg }}>
        <div style={{ ...fontEyebrow, fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: 10 }}>{data.label}</div>
        <div style={{ ...fontDisplay, fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{data.title}</div>
        <div style={{ ...fontBody, fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>{data.desc}</div>
      </div>

      <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".3em", color: "rgba(255,255,255,.35)", textTransform: "uppercase", marginBottom: 14 }}>
        Ritual Blends for This Phase
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12, marginBottom: 26 }}>
        {data.blends.map((rb, i) => {
          const b = BLENDS.find((x) => x.n === rb.n);
          if (!b) return null;
          return (
            <div
              key={i}
              onClick={() => onOpenBlend([...BLENDS], rb.n - 1)}
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 16, padding: 18, cursor: "pointer", transition: "all .28s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{b.emoji}</span>
              <div style={{ ...fontDisplay, fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{b.name}</div>
              <div style={{ ...fontUtility, fontSize: 10.5, color: "rgba(255,255,255,.38)", marginBottom: 8, letterSpacing: ".04em" }}>⏱ {rb.when}</div>
              <div style={{ ...fontBody, fontSize: 13, color: "rgba(255,255,255,.62)", lineHeight: 1.6 }}>{rb.reason}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "rgba(192,136,48,.07)", border: "1px solid rgba(192,136,48,.2)", borderRadius: 16, padding: "24px 26px" }}>
        <div style={{ ...fontEyebrow, fontSize: 9.5, fontWeight: 600, letterSpacing: ".28em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>✦ Intention for This Phase</div>
        <p style={{ ...fontBody, fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,.72)", lineHeight: 1.8 }}>{data.intention}</p>
      </div>
    </div>
  );
}
function tabStyle(active) {
  return {
    ...fontEyebrow, fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase",
    color: active ? C.goldLt : "rgba(255,255,255,.42)",
    background: active ? C.goldGlow : "rgba(255,255,255,.04)",
    border: `1px solid ${active ? "rgba(192,136,48,.4)" : "rgba(255,255,255,.09)"}`,
    borderRadius: 24, padding: "9px 22px", cursor: "pointer",
  };
}
function lunarTabStyle(active) {
  return {
    ...fontBody, fontSize: 14, fontStyle: "italic",
    color: active ? "#fff" : "rgba(255,255,255,.38)",
    background: active ? "rgba(255,255,255,.06)" : "transparent",
    border: `1px solid ${active ? "rgba(255,255,255,.38)" : "rgba(255,255,255,.07)"}`,
    borderRadius: 20, padding: "6px 17px", cursor: "pointer",
  };
}

/* ════════════════════════════════════════
   TEA JOURNAL
════════════════════════════════════════ */
const MOODS = ["😌", "😴", "⚡", "🧘", "💪", "🌟", "😐", "🤔"];

function JournalPage() {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chaiJ") || "[]");
    } catch {
      return [];
    }
  });
  const [blendId, setBlendId] = useState(BLENDS[0].n);
  const [date, setDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [mood, setMood] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const save = () => {
    const b = BLENDS.find((x) => x.n === Number(blendId));
    if (!b || !date) return;
    const entry = { id: Date.now(), n: b.n, name: b.name, emoji: b.emoji, date, mood, rating, notes: notes.trim() };
    const next = [entry, ...entries];
    setEntries(next);
    localStorage.setItem("chaiJ", JSON.stringify(next));
    setNotes("");
    setMood("");
    setRating(0);
  };
  const del = (id) => {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    localStorage.setItem("chaiJ", JSON.stringify(next));
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 100px" }}>
      <PageHero eyebrow="Personal Wellness Record" title="My Tea Journal" subtitle="Track how each blend makes you feel. Build your personal wellness map." />

      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 28, padding: 26, marginBottom: 32 }}>
        <div style={{ ...fontDisplay, fontSize: 18, color: "#fff", marginBottom: 20, fontWeight: 600 }}>Log Today's Brew ☕</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <div style={fieldLabelStyle}>Blend</div>
            <select value={blendId} onChange={(e) => setBlendId(e.target.value)} style={selectStyle}>
              {BLENDS.map((b) => (
                <option key={b.n} value={b.n} style={{ background: "#173322" }}>{b.emoji} {b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div style={fieldLabelStyle}>Date & Time</div>
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
          </div>
        </div>
        <div style={{ ...fieldLabelStyle, marginBottom: 8 }}>How did it make you feel?</div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
          {MOODS.map((m) => (
            <button key={m} onClick={() => setMood(m)} style={emojiBtnStyle(mood === m)}>{m}</button>
          ))}
        </div>
        <div style={{ ...fieldLabelStyle, marginBottom: 8 }}>Rating</div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
          {[1, 2, 3, 4, 5].map((r) => (
            <button key={r} onClick={() => setRating(r)} style={emojiBtnStyle(rating === r)}>{"⭐".repeat(r)}</button>
          ))}
        </div>
        <div style={{ ...fieldLabelStyle, marginBottom: 8 }}>Notes</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did you feel before and after? Any observations, dreams, physical changes…"
          style={{ ...textAreaStyle, minHeight: 80 }}
        />
        <button
          onClick={save}
          style={{
            ...fontEyebrow, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase",
            background: `linear-gradient(135deg, ${C.fern}, ${C.sage})`, color: C.goldLt,
            border: "none", borderRadius: 12, padding: "12px 28px", cursor: "pointer", marginTop: 16,
          }}
        >
          ✦ Save Entry
        </button>
      </div>

      <div>
        <div style={{ ...fontDisplay, fontSize: 20, color: "#fff", marginBottom: 16 }}>Past Entries</div>
        {entries.length === 0 ? (
          <div style={{ ...fontBody, fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,.28)", textAlign: "center", padding: "44px 20px" }}>
            Your tea journey begins with the first cup. Log your first brew above. 🍵
          </div>
        ) : (
          entries.map((e) => {
            const d = new Date(e.date);
            const ds = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const ts = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
            return (
              <div key={e.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "18px 20px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ ...fontDisplay, fontSize: 16, color: "#fff", fontWeight: 600 }}>{e.emoji} {e.name}</div>
                    <div style={{ ...fontUtility, fontSize: 10, color: "rgba(255,255,255,.28)", letterSpacing: ".06em", marginTop: 2 }}>{ds} · {ts}</div>
                  </div>
                  <button onClick={() => del(e.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.18)", fontSize: 13, borderRadius: 6, padding: "3px 7px" }}>✕</button>
                </div>
                {e.mood && <div style={{ fontSize: 22, marginBottom: 5 }}>{e.mood}</div>}
                {e.rating > 0 && <div style={{ color: C.gold, fontSize: 13, letterSpacing: 1, marginBottom: 6 }}>{"⭐".repeat(e.rating)}</div>}
                {e.notes && <div style={{ ...fontBody, fontSize: 14, fontStyle: "italic", color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>{e.notes}</div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
const fieldLabelStyle = { ...fontEyebrow, fontSize: 8.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.38)" };
function emojiBtnStyle(on) {
  return {
    fontSize: 16, background: on ? "rgba(82,184,130,.18)" : "rgba(255,255,255,.05)",
    border: `1.5px solid ${on ? C.mint : "rgba(255,255,255,.09)"}`, borderRadius: 12,
    padding: "7px 13px", cursor: "pointer",
  };
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
const NAV_ITEMS = [
  { key: "rolodex", label: "Tea Cards", icon: "📖" },
  { key: "need", label: "What Do I Need?", icon: "🧭" },
  { key: "builder", label: "Blend Builder", icon: "🧪" },
  { key: "ritual", label: "Seasonal Ritual", icon: "🌙" },
  { key: "journal", label: "Tea Journal", icon: "📝" },
];

export default function TeaLibrary({ deepBlend, onDeepBlendConsumed, onAddToCart, stickyHeaderH }) {
  const headerOffset = stickyHeaderH || 150;
  const [page, setPage] = useState("rolodex");
  const [modalList, setModalList] = useState(null); // array of blends currently being browsed in modal
  const [modalIdx, setModalIdx] = useState(0);

  const openBlend = (list, idx) => {
    setModalList(list);
    setModalIdx(idx);
  };
  const closeModal = () => setModalList(null);
  const navModal = (d) => {
    setModalIdx((i) => {
      const next = i + d;
      if (next < 0 || next >= modalList.length) return i;
      return next;
    });
  };
  const notify = (e) => {
    e.target.textContent = "✓ You'll be notified!";
    e.target.style.opacity = "0.6";
    e.target.disabled = true;
  };

  // Deep-link support: the parent app navigates here with deepBlend set to a
  // blend NAME (see chaiholistic417.jsx's nav("tea-library",{blend:b.name})
  // call sites — prayers, Amara, the Tea Finder, and the 6 gated Ritual
  // Moments tea cards all use this). Open straight to that blend's modal,
  // then tell the parent we've consumed it so it doesn't re-fire.
  useEffect(() => {
    if (!deepBlend) return;
    const idx = BLENDS.findIndex((b) => b.name === deepBlend);
    if (idx >= 0) {
      setPage("rolodex");
      openBlend([...BLENDS], idx);
    }
    if (onDeepBlendConsumed) onDeepBlendConsumed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepBlend]);

  const activeBlend = modalList ? modalList[modalIdx] : null;

  const handleAddToCart = (blend) => {
    if (onAddToCart) {
      onAddToCart({ ...blend, id: blend.id || `tl-${blend.n}`, price: blend.price });
    }
  };

  return (
    <div
      style={{
        background: C.forest,
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        color: C.ink,
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .tea-card-anim { animation: cardIn .5s ease both; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.25); }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 60% at 8% -5%, rgba(82,184,130,.08) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 92% 105%, rgba(192,136,48,.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(39,92,62,.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "sticky", top: headerOffset, zIndex: 400 }}>
      <header
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 16px", height: 62, gap: 8,
          background: "rgba(13,26,17,.96)", backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(82,184,130,.1)", overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, minWidth: 0 }}>
          <div style={{ width: 30, height: 30, flexShrink: 0, background: `linear-gradient(135deg, ${C.fern}, ${C.sage})`, borderRadius: 9, border: "1px solid rgba(82,184,130,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
            🌿
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0, overflow: "hidden" }}>
            <span style={{ ...fontEyebrow, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", color: C.goldLt, lineHeight: 1, whiteSpace: "nowrap" }}>CHAI HOLISTIC</span>
            <span style={{ ...fontBody, fontSize: 9.5, fontWeight: 300, fontStyle: "italic", letterSpacing: ".04em", color: "rgba(255,255,255,.28)", lineHeight: 1, whiteSpace: "nowrap" }}>Tea Library</span>
          </div>
        </div>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            style={{
              ...fontUtility, fontSize: 12.5, fontWeight: 500, letterSpacing: ".01em",
              color: "#fff", background: "rgba(255,255,255,.08)",
              border: "1.5px solid rgba(192,136,48,.45)", borderRadius: 10,
              padding: "8px 30px 8px 12px", cursor: "pointer", appearance: "none",
              WebkitAppearance: "none", MozAppearance: "none",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <option key={item.key} value={item.key} style={{ background: "#173322", color: "#fff" }}>
                {item.icon} {item.label}
              </option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: C.goldLt, fontSize: 11, pointerEvents: "none" }}>▾</span>
        </div>
      </header>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {page === "rolodex" && <RolodexPage blends={BLENDS} onOpenBlend={openBlend} headerOffset={headerOffset} />}
        {page === "need" && <NeedPage onOpenBlend={openBlend} />}
        {page === "builder" && <BuilderPage />}
        {page === "ritual" && <RitualPage onOpenBlend={openBlend} />}
        {page === "journal" && <JournalPage />}
      </div>

      {activeBlend && (
        <BlendModal
          blend={activeBlend}
          idx={modalIdx}
          total={modalList.length}
          onClose={closeModal}
          onNav={navModal}
          onNotify={notify}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
