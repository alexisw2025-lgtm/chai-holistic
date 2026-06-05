/**
 * ComingSoon.jsx
 * Chai Holistic — Pre-Launch Landing Page
 *
 * Routing logic (add to main.tsx or App.tsx):
 *
 *   const PREVIEW_KEY = "chai_preview_2026";
 *   const isPreview =
 *     window.location.search.includes("preview=sipheal") ||
 *     localStorage.getItem(PREVIEW_KEY) === "true";
 *   if (isPreview) localStorage.setItem(PREVIEW_KEY, "true");
 *
 *   root.render(isPreview ? <ChaiHolistic /> : <ComingSoon />);
 *
 * To access the full site: chaiholistic.com?preview=sipheal
 * Once visited once, localStorage remembers it.
 *
 * TO GO LIVE: Remove the ComingSoon render entirely — render only <ChaiHolistic />
 */

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Particle system ──────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.18,
      dy: -Math.random() * 0.22 - 0.08,
      opacity: Math.random() * 0.45 + 0.1,
      color: Math.random() > 0.6 ? "#c08830" : "#3a7a55",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", opacity: 0.7,
    }}/>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.max(0, Math.floor(diff / 1000));
  return {
    days:    Math.floor(s / 86400),
    hours:   Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [email, setEmail]         = useState("");
  const [name, setName]           = useState("");
  const [status, setStatus]       = useState("idle"); // idle | loading | done | error
  const [entered, setEntered]     = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Launch date — 30 days from now as placeholder; update as needed
  const LAUNCH = new Date("2026-09-01T00:00:00Z").getTime();
  const countdown = useCountdown(LAUNCH);

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Rotate feature preview
  useEffect(() => {
    const t = setInterval(() => setActiveFeature(i => (i + 1) % FEATURES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const submit = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("waitlist_signups").insert([{
        name: name.trim() || null,
        email: email.trim(),
        signup_type: "launch_waitlist",
      }]);
      if (error) throw error;
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const pad = n => String(n).padStart(2, "0");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080f09",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      color: "white",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 24px rgba(192,136,48,.3); }
          50%      { box-shadow: 0 0 48px rgba(192,136,48,.6); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .cs-enter { opacity: 0; transform: translateY(28px); }
        .cs-entered { animation: fadeUp .9s cubic-bezier(.4,0,.2,1) forwards; }

        .cs-cta {
          background: linear-gradient(135deg, #275c3e, #1e4d34);
          border: 1.5px solid rgba(192,136,48,.6);
          color: white;
          padding: 14px 36px;
          border-radius: 50px;
          font-family: 'Cinzel', serif;
          font-size: .72rem;
          letter-spacing: .18em;
          cursor: pointer;
          transition: all .25s;
          text-transform: uppercase;
        }
        .cs-cta:hover {
          background: linear-gradient(135deg, #3a7a55, #275c3e);
          border-color: #c08830;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(39,92,62,.4);
        }
        .cs-cta:disabled {
          opacity: .5; cursor: default; transform: none;
        }

        .cs-input {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(192,136,48,.3);
          border-radius: 12px;
          padding: 14px 20px;
          font-family: 'Jost', sans-serif;
          font-size: .9rem;
          color: white;
          width: 100%;
          outline: none;
          transition: border-color .2s;
        }
        .cs-input::placeholder { color: rgba(255,255,255,.3); }
        .cs-input:focus { border-color: #c08830; }

        .cs-count-box {
          text-align: center;
          min-width: 72px;
        }
        .cs-count-num {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 400;
          color: #deb96a;
          line-height: 1;
          display: block;
        }
        .cs-count-lbl {
          font-family: 'Jost', sans-serif;
          font-size: .58rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-top: 6px;
          display: block;
        }
        .cs-count-sep {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: rgba(192,136,48,.4);
          align-self: flex-start;
          padding-top: 4px;
        }

        .feat-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(192,136,48,.2);
          border-radius: 50px;
          padding: 7px 16px;
          font-family: 'Jost', sans-serif;
          font-size: .7rem;
          color: rgba(255,255,255,.6);
          cursor: default;
          transition: all .3s;
          white-space: nowrap;
        }
        .feat-pill.active {
          background: rgba(39,92,62,.3);
          border-color: rgba(192,136,48,.5);
          color: #deb96a;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(192,136,48,.6), transparent);
          margin: 0 auto;
          animation: fadeIn 1.5s 2s both;
        }

        @media (max-width: 600px) {
          .cs-hero-h { font-size: clamp(2.4rem, 10vw, 3.2rem) !important; }
          .cs-count-num { font-size: 1.8rem !important; }
          .cs-grid { grid-template-columns: 1fr !important; }
          .cs-count-row { gap: 16px !important; }
        }
      `}</style>

      <Particles />

      {/* ── Ambient background glows ── */}
      <div style={{
        position: "fixed", top: "10%", left: "5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(39,92,62,.12), transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      <div style={{
        position: "fixed", bottom: "5%", right: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,136,48,.08), transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 960,
        margin: "0 auto",
        padding: "clamp(60px,10vh,100px) 2rem clamp(60px,8vh,80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}>

        {/* Logo mark */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: "0s", marginBottom: 40 }}
        >
          <div style={{
            width: 72, height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #173322, #0d1a11)",
            border: "1.5px solid rgba(192,136,48,.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem",
            animation: "floatY 5s ease-in-out infinite, pulseGlow 4s ease-in-out infinite",
            boxShadow: "0 0 24px rgba(192,136,48,.3)",
          }}>
            🌿
          </div>
        </div>

        {/* Eyebrow */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".12s", marginBottom: 20 }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c08830)" }}/>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: ".6rem", letterSpacing: ".28em",
              textTransform: "uppercase", color: "rgba(192,136,48,.75)",
            }}>Chai Holistic · Sip &amp; Heal</span>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c08830, transparent)" }}/>
          </div>
        </div>

        {/* Main headline */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".22s", textAlign: "center", marginBottom: 24 }}
        >
          <h1 className="cs-hero-h" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-.01em",
          }}>
            Something{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #deb96a, #c08830, #8ab89a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>extraordinary</em>
            <br/>
            is almost ready.
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".34s", marginBottom: 48, textAlign: "center", maxWidth: 620 }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,.55)",
            lineHeight: 1.75,
            fontWeight: 300,
          }}>
            A holistic wellness brand rooted in plant medicine, ritual, and the
            belief that healing starts in the cup.
            Herbal blends. Sea moss kits. Jelly kits. Vibe Shift rings.
            A world built to help you feel extraordinary every single day.
          </p>
        </div>

        {/* Countdown */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".44s", marginBottom: 56, width: "100%" }}
        >
          <div style={{
            background: "linear-gradient(135deg, rgba(23,51,34,.6), rgba(13,26,17,.8))",
            border: "1px solid rgba(192,136,48,.25)",
            borderRadius: 24,
            padding: "32px 40px",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: ".55rem", letterSpacing: ".24em",
              textTransform: "uppercase", color: "rgba(192,136,48,.6)",
              marginBottom: 24,
            }}>Launching</div>

            <div className="cs-count-row" style={{
              display: "flex", justifyContent: "center",
              alignItems: "flex-start", gap: 24, flexWrap: "wrap",
            }}>
              {[
                [countdown.days,    "Days"],
                [countdown.hours,   "Hours"],
                [countdown.minutes, "Minutes"],
                [countdown.seconds, "Seconds"],
              ].map(([n, l], i) => (
                <>
                  {i > 0 && <span className="cs-count-sep" key={`sep-${i}`}>:</span>}
                  <div className="cs-count-box" key={l}>
                    <span className="cs-count-num">{pad(n)}</span>
                    <span className="cs-count-lbl">{l}</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Feature preview pills */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".54s", marginBottom: 56, width: "100%" }}
        >
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: ".55rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "rgba(255,255,255,.3)",
            textAlign: "center", marginBottom: 18,
          }}>
            What we're building for you
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: 8,
          }}>
            {FEATURES.map((f, i) => (
              <div key={f.label} className={`feat-pill ${i === activeFeature ? "active" : ""}`}>
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Active feature description */}
          <div style={{
            marginTop: 24, textAlign: "center", minHeight: 56,
            animation: "fadeIn .4s ease",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(.9rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,.45)",
              lineHeight: 1.7,
              maxWidth: 500, margin: "0 auto",
            }}>
              {FEATURES[activeFeature].desc}
            </p>
          </div>
        </div>

        {/* Waitlist form */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".64s", width: "100%", maxWidth: 520 }}
        >
          <div style={{
            background: "linear-gradient(135deg, rgba(23,51,34,.5), rgba(13,26,17,.7))",
            border: "1px solid rgba(192,136,48,.3)",
            borderRadius: 24,
            padding: "clamp(28px,5vw,44px)",
          }}>
            {status === "done" ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🌿</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  color: "white", marginBottom: 12,
                }}>
                  You're on the list.
                </div>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".85rem", fontWeight: 300,
                  color: "rgba(255,255,255,.5)", lineHeight: 1.75,
                }}>
                  We'll reach out before launch day with early access,
                  a personalized Sip &amp; Heal Report, and something special
                  just for our founding members.
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: ".58rem", letterSpacing: ".22em",
                  textTransform: "uppercase", color: "rgba(192,136,48,.7)",
                  marginBottom: 10, textAlign: "center",
                }}>Be First. Get More.</div>

                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
                  fontWeight: 400, color: "white",
                  marginBottom: 8, textAlign: "center", lineHeight: 1.2,
                }}>
                  Join the founding waitlist
                </h2>

                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".8rem", fontWeight: 300,
                  color: "rgba(255,255,255,.4)", lineHeight: 1.7,
                  textAlign: "center", marginBottom: 28,
                }}>
                  Founding members get early access, exclusive pricing,
                  and a free personalized Sip &amp; Heal Report on launch day.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    className="cs-input"
                    placeholder="Your first name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && submit()}
                  />
                  <input
                    className="cs-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && submit()}
                  />
                  <button
                    className="cs-cta"
                    onClick={submit}
                    disabled={status === "loading" || !email.trim()}
                    style={{ marginTop: 4, width: "100%", padding: "16px" }}
                  >
                    {status === "loading" ? "Saving your spot…" : "✦ Reserve My Spot"}
                  </button>

                  {status === "error" && (
                    <p style={{
                      textAlign: "center", fontSize: ".72rem",
                      color: "#e07070", fontFamily: "'Jost', sans-serif",
                    }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>

                {/* Trust signals */}
                <div style={{
                  display: "flex", justifyContent: "center",
                  gap: 20, marginTop: 22, flexWrap: "wrap",
                }}>
                  {["No spam. Ever.", "Unsubscribe anytime.", "Free Sip & Heal Report"].map(t => (
                    <span key={t} style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: ".63rem", color: "rgba(255,255,255,.3)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{ color: "#3a7a55" }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Brand links */}
        <div
          className={entered ? "cs-entered" : "cs-enter"}
          style={{ animationDelay: ".74s", marginTop: 56, textAlign: "center" }}
        >
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: ".55rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "rgba(255,255,255,.2)",
            marginBottom: 16,
          }}>Part of the Chai Holistic universe</div>

          <div style={{
            display: "flex", gap: 28, flexWrap: "wrap",
            justifyContent: "center", alignItems: "center",
          }}>
            {[
              { name: "chaiholistic.com",    desc: "Herbal teas & kits" },
              { name: "spiralinterrupt.com", desc: "Vibe Shift rings" },
              { name: "2amcompanion.com",    desc: "Prayer & reflection" },
            ].map(b => (
              <div key={b.name} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: ".85rem", color: "rgba(255,255,255,.4)",
                }}>
                  {b.name}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".6rem", color: "rgba(255,255,255,.22)",
                  marginTop: 2,
                }}>
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll line / bottom ornament */}
        <div style={{ marginTop: 64 }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: ".5rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "rgba(255,255,255,.18)",
            textAlign: "center", marginBottom: 14,
          }}>
            © 2026 Chai Holistic LLC
          </div>
          <div className="scroll-line"/>
        </div>

      </div>
    </div>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "🍵", label: "40+ Herbal Blends",      desc: "Small-batch herbal tea blends for sleep, stress, digestion, immunity, and whole-body healing." },
  { icon: "🌿", label: "Sea Moss Gel Kits",       desc: "15 flavored sea moss gel kits. 92 of 102 minerals. A Caribbean wellness tradition, bottled for your kitchen." },
  { icon: "🌊", label: "Herb Jelly Kits",         desc: "13 all-natural agar jelly recipes. Shaker bottle included. Beautiful, healing, and impossibly easy to make." },
  { icon: "💫", label: "Vibe Shift Rings",        desc: "Precision-engineered fidget rings, infused with nine sacred frequencies through our Meridian Infusion process." },
  { icon: "✦",  label: "Sip & Heal Report",      desc: "A free personalized wellness report matched to your body, your goals, and your daily ritual." },
  { icon: "🌙", label: "2AM Companion",           desc: "A prayer and reflection companion — available the moment you need it, no app required." },
  { icon: "⚡", label: "Men's Wellness Blends",  desc: "20 blends built specifically for the male body. Testosterone. Focus. Heart. Recovery. Longevity." },
  { icon: "🍹", label: "Natural Mocktails",       desc: "16 all-natural mocktail recipes. Wellness-forward and celebration-ready — zero alcohol, maximum flavor." },
];
