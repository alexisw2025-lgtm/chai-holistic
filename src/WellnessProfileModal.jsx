/**
 * WellnessProfileModal.jsx
 * Chai Holistic — Wellness Profile & Journey Onboarding Flow
 *
 * USAGE in chaiholistic_slim_fixed.jsx:
 *   1. import WellnessProfileModal from "./WellnessProfileModal";
 *   2. Add state: const [profileOpen, setProfileOpen] = useState(false);
 *   3. Render: <WellnessProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
 *   4. Trigger it from anywhere (nav CTA, hero button, footer link, etc.):
 *      <button onClick={() => setProfileOpen(true)}>✦ Get My Sip &amp; Heal Report</button>
 *
 * SUPABASE TABLE — run this SQL in your Supabase project:
 *   create table wellness_profiles (
 *     id uuid default gen_random_uuid() primary key,
 *     created_at timestamptz default now(),
 *     name text,
 *     email text,
 *     goal text,
 *     energy_pattern text,
 *     stress_level text,
 *     sleep_quality text,
 *     focus text,
 *     digestion text,
 *     caffeine_pref text,
 *     time_of_day text[],
 *     top_concerns text[],
 *     rx_blends text[],
 *     rx_ritual text
 *   );
 *
 * ENV vars needed (same as TeaLibrary):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Design tokens (mirrors parent palette) ──────────────────────────────────
const C = {
  forest:    "#0d1a11",
  fern:      "#173322",
  sage:      "#275c3e",
  gold:      "#c08830",
  goldLt:    "#deb96a",
  cream:     "#fef9ef",
  parchment: "#f5edda",
  ink:       "#1c1c1a",
};

// ─── Sip & Heal Report logic ───────────────────────────────────────────────────
const BLEND_MAP = {
  // goal-based
  sleep:      ["Chamomile & Calm", "Valerian Rest", "Lavender Moon", "Sleepy Spice"],
  stress:     ["Stress Less", "Tulsi Awakening", "Adaptogen Blend", "Skullcap Serenity"],
  energy:     ["Morning Rise", "Ginger Lemon Sunrise", "Black Pepper Chai", "Lemongrass Lift"],
  focus:      ["Brain Boost", "Tulsi Awakening", "Ashwagandha Morning"],
  digestion:  ["Digestive Peace", "Peppermint Night", "Gut Reset"],
  immunity:   ["Elderberry Shield", "Turmeric Tonic", "Immune Defense Blend"],
  hormone:    ["Hormone Harmony", "Rose & Hibiscus"],
  joints:     ["Turmeric Tonic", "Bone & Joint"],
  skin:       ["Skin Glow", "Rose & Hibiscus", "Blood Purifier"],
  cleanse:    ["Full Body Detox", "Liver & Love", "Spring Cleanse"],
  anxiety:    ["Chamomile & Calm", "Lemon Balm Dreams", "Stress Less", "Skullcap Serenity"],
  heart:      ["Heart's Ease", "Rose & Hibiscus"],
};

const RITUAL_MAP = {
  morning: "Start every morning before caffeine with 1 cup steeped for your curated blend. Hold the cup with both hands, breathe in the steam for 30 seconds, and set one intention for the day.",
  evening: "Close your day with a slow evening cup 30–60 min before bed. Dim the lights, add raw honey if desired, and let each sip be a signal to your nervous system that it's time to unwind.",
  anytime: "Drink 2 cups daily — one mid-morning, one mid-afternoon. Keep a travel tin at your desk and treat each steep as a 5-minute pause. You deserve those 5 minutes.",
  both:    "Build a morning and evening ritual. Morning cup: energizing or focusing blend. Evening cup: your calming or sleep blend. Bookend your day with intention and watch your baseline shift.",
};

function prescribeTea(answers) {
  const { goal, energy, stress, sleep, focus, time } = answers;
  let blends = new Set();

  // Primary goal drives first 2 picks
  if (goal && BLEND_MAP[goal]) {
    BLEND_MAP[goal].slice(0, 2).forEach(b => blends.add(b));
  }

  // Secondary signals
  if (stress === "high" || stress === "very_high") {
    BLEND_MAP.stress.slice(0, 1).forEach(b => blends.add(b));
  }
  if (sleep === "poor" || sleep === "very_poor") {
    BLEND_MAP.sleep.slice(0, 1).forEach(b => blends.add(b));
  }
  if (focus === "low") {
    BLEND_MAP.focus.slice(0, 1).forEach(b => blends.add(b));
  }
  if (energy === "low" || energy === "very_low") {
    BLEND_MAP.energy.slice(0, 1).forEach(b => blends.add(b));
  }

  const rxBlends = [...blends].slice(0, 3);
  const ritual = RITUAL_MAP[time] || RITUAL_MAP.anytime;
  return { rxBlends, ritual };
}

// ─── Steps config ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: "intro",    title: null },
  { id: "name",     title: "Let's start with you." },
  { id: "goal",     title: "What's your primary wellness goal?" },
  { id: "energy",   title: "How's your energy these days?" },
  { id: "stress",   title: "How would you rate your stress level?" },
  { id: "sleep",    title: "How well are you sleeping?" },
  { id: "focus",    title: "How's your mental focus & clarity?" },
  { id: "time",     title: "When do you drink tea?" },
  { id: "concerns", title: "Any other areas of focus?" },
  { id: "email",    title: "Where should we send your Sip & Heal Report?" },
  { id: "result",   title: null },
];

const GOAL_OPTIONS = [
  { value: "sleep",     emoji: "🌙", label: "Better Sleep",         sub: "Fall asleep faster, stay asleep" },
  { value: "stress",    emoji: "🍃", label: "Stress & Anxiety",      sub: "Calm the nervous system" },
  { value: "energy",    emoji: "☀️",  label: "Natural Energy",        sub: "Without caffeine crashes" },
  { value: "focus",     emoji: "🧠", label: "Focus & Clarity",       sub: "Sharp mind, clear thinking" },
  { value: "digestion", emoji: "🔥", label: "Digestion & Gut",       sub: "Soothe, heal, restore" },
  { value: "immunity",  emoji: "🛡️", label: "Immune Support",        sub: "Build your defenses" },
  { value: "hormone",   emoji: "🌸", label: "Hormone Balance",       sub: "Cycle & mood support" },
  { value: "skin",      emoji: "✨", label: "Skin & Beauty",          sub: "Glow from the inside out" },
  { value: "cleanse",   emoji: "💧", label: "Detox & Cleanse",       sub: "Full body reset" },
  { value: "anxiety",   emoji: "💚", label: "Anxiety & Calm",        sub: "Quiet the mind" },
  { value: "heart",     emoji: "❤️", label: "Heart & Emotion",       sub: "Emotional & physical heart" },
  { value: "joints",    emoji: "💪", label: "Joints & Inflammation", sub: "Move with ease" },
];

const SCALE_OPTIONS = {
  energy:  [
    { value: "very_low", label: "Very Low",   emoji: "😔" },
    { value: "low",      label: "Low",        emoji: "😕" },
    { value: "medium",   label: "Moderate",   emoji: "😐" },
    { value: "high",     label: "Good",       emoji: "🙂" },
    { value: "very_high",label: "Excellent",  emoji: "⚡" },
  ],
  stress:  [
    { value: "very_high",label: "Overwhelmed",emoji: "😰" },
    { value: "high",     label: "High",       emoji: "😤" },
    { value: "medium",   label: "Moderate",   emoji: "😐" },
    { value: "low",      label: "Manageable", emoji: "🙂" },
    { value: "very_low", label: "Minimal",    emoji: "😌" },
  ],
  sleep:   [
    { value: "very_poor",label: "Terrible",   emoji: "😩" },
    { value: "poor",     label: "Restless",   emoji: "😪" },
    { value: "medium",   label: "Okay",       emoji: "😐" },
    { value: "good",     label: "Good",       emoji: "😴" },
    { value: "great",    label: "Excellent",  emoji: "🌟" },
  ],
  focus:   [
    { value: "low",      label: "Brain Fog",  emoji: "🌫️" },
    { value: "scattered",label: "Scattered",  emoji: "💭" },
    { value: "medium",   label: "Moderate",   emoji: "😐" },
    { value: "good",     label: "Good",       emoji: "🎯" },
    { value: "sharp",    label: "Sharp",      emoji: "🧠" },
  ],
};

const TIME_OPTIONS = [
  { value: "morning", emoji: "🌅", label: "Morning person",        sub: "I want a morning ritual" },
  { value: "evening", emoji: "🌙", label: "Evening wind-down",     sub: "End-of-day is my time" },
  { value: "both",    emoji: "☀️🌙", label: "Morning & Evening",   sub: "I want a full daily ritual" },
  { value: "anytime", emoji: "🍵", label: "Throughout the day",   sub: "Tea is always welcome" },
];

const CONCERN_OPTIONS = [
  "Inflammation", "Hormones", "Liver health", "Weight management",
  "Mood support", "Nervous system", "Seasonal allergies", "Respiratory",
  "Blood sugar", "Longevity", "Spiritual wellness", "Nothing specific",
];

// ── Wellness Modal Translations ──────────────────────────────────────────────
const WM_TRANS = {
  es:{
    step_name:"Primero, ¿cómo te llamas?",step_goal:"¿Cuál es tu principal objetivo?",
    step_energy:"¿Cómo está tu energía?",step_stress:"¿Cuál es tu nivel de estrés?",
    step_sleep:"¿Cómo es tu sueño?",step_focus:"¿Cómo está tu claridad mental?",
    step_time:"¿Cuándo prefieres tu té?",step_concerns:"¿Qué más quieres trabajar?",
    report_sub:"¿A dónde enviamos tu Informe Sip & Heal?",
    btn_next:"Siguiente",btn_back:"Atrás",btn_generate:"Obtener Mi Informe",
    generating:"Creando tu informe personalizado...",
    energy:["Muy Bajo","Bajo","Moderado","Bueno","Excelente"],
    stress:["Abrumado","Alto","Moderado","Manejable","Mínimo"],
    sleep:["Terrible","Inquieto","Aceptable","Bueno","Excelente"],
    focus:["Niebla Mental","Disperso","Moderado","Bueno","Agudo"],
    concerns:{"Inflammation":"Inflamación","Hormones":"Hormonas","Liver health":"Salud del hígado","Weight management":"Control de peso","Mood support":"Apoyo emocional","Nervous system":"Sistema nervioso","Seasonal allergies":"Alergias estacionales","Respiratory":"Respiratorio","Blood sugar":"Azúcar en sangre","Longevity":"Longevidad","Spiritual wellness":"Bienestar espiritual","Nothing specific":"Nada específico"},
    select_all:"Selecciona todo lo que aplique",
  },
  fr:{
    step_name:"D'abord, comment vous appelez-vous?",step_goal:"Quel est votre principal objectif?",
    step_energy:"Quel est votre niveau d'énergie?",step_stress:"Quel est votre niveau de stress?",
    step_sleep:"Quelle est la qualité de votre sommeil?",step_focus:"Comment est votre clarté mentale?",
    step_time:"Quand préférez-vous votre thé?",step_concerns:"Sur quoi d'autre souhaitez-vous travailler?",
    report_sub:"Où envoyons-nous votre Rapport Sip & Heal?",
    btn_next:"Suivant",btn_back:"Retour",btn_generate:"Obtenir Mon Rapport",
    generating:"Création de votre rapport personnalisé...",
    energy:["Très Faible","Faible","Modéré","Bon","Excellent"],
    stress:["Débordé","Élevé","Modéré","Gérable","Minimal"],
    sleep:["Terrible","Agité","Passable","Bon","Excellent"],
    focus:["Brouillard","Dispersé","Modéré","Bon","Vif"],
    concerns:{"Inflammation":"Inflammation","Hormones":"Hormones","Liver health":"Santé du foie","Weight management":"Gestion du poids","Mood support":"Soutien émotionnel","Nervous system":"Système nerveux","Seasonal allergies":"Allergies saisonnières","Respiratory":"Respiratoire","Blood sugar":"Glycémie","Longevity":"Longévité","Spiritual wellness":"Bien-être spirituel","Nothing specific":"Rien de spécifique"},
    select_all:"Sélectionnez tout ce qui s'applique",
  },
  pt:{
    step_name:"Primeiro, qual é o seu nome?",step_goal:"Qual é o seu principal objetivo?",
    step_energy:"Como está sua energia?",step_stress:"Qual é o seu nível de estresse?",
    step_sleep:"Como é a qualidade do seu sono?",step_focus:"Como está sua clareza mental?",
    step_time:"Quando prefere seu chá?",step_concerns:"Há mais alguma coisa que deseja trabalhar?",
    report_sub:"Para onde enviamos seu Relatório Sip & Heal?",
    btn_next:"Próximo",btn_back:"Voltar",btn_generate:"Obter Meu Relatório",
    generating:"Criando seu relatório personalizado...",
    energy:["Muito Baixa","Baixa","Moderada","Boa","Excelente"],
    stress:["Sobrecarregado","Alto","Moderado","Gerenciável","Mínimo"],
    sleep:["Terrível","Agitado","Aceitável","Bom","Excelente"],
    focus:["Névoa Mental","Disperso","Moderado","Bom","Aguçado"],
    concerns:{"Inflammation":"Inflamação","Hormones":"Hormônios","Liver health":"Saúde do fígado","Weight management":"Controle de peso","Mood support":"Suporte emocional","Nervous system":"Sistema nervoso","Seasonal allergies":"Alergias sazonais","Respiratory":"Respiratório","Blood sugar":"Açúcar no sangue","Longevity":"Longevidade","Spiritual wellness":"Bem-estar espiritual","Nothing specific":"Nada específico"},
    select_all:"Selecione tudo que se aplica",
  },
  ht:{
    step_name:"Premyèman, ki jan ou rele?",step_goal:"Ki objektif prensipal ou?",
    step_energy:"Kijan nivo enèji ou ye?",step_stress:"Ki nivo stres ou kounye a?",
    step_sleep:"Kijan kalite dòmi ou ye?",step_focus:"Kijan klète mantal ou ye?",
    step_time:"Ki lè ou prefere tè ou?",step_concerns:"Eske gen lòt bagay ou vle travay sou li?",
    report_sub:"Ki kote nou voye Rapò Sip & Heal ou?",
    btn_next:"Kontinye",btn_back:"Retounen",btn_generate:"Jwenn Rapò Mwen",
    generating:"Ap kreye rapò pèsonalize ou...",
    energy:["Trè Ba","Ba","Modere","Bon","Ekselan"],
    stress:["Depase","Wo","Modere","Jerable","Minimòm"],
    sleep:["Terib","Enkyè","Akseptab","Bon","Ekselan"],
    focus:["Bwouya","Dispers","Modere","Bon","Kout"],
    concerns:{"Inflammation":"Enflamasyon","Hormones":"Omon","Liver health":"Sante Fwa","Weight management":"Kontwòl Pwa","Mood support":"Sipò Emosyon","Nervous system":"Sistèm Nève","Seasonal allergies":"Alèji Sezonye","Respiratory":"Respiratwa","Blood sugar":"Sik San","Longevity":"Lonjevite","Spiritual wellness":"Byenèt Espiritèl","Nothing specific":"Anyen Espesifik"},
    select_all:"Chwazi tout sa ki aplike",
  },
  jm:{
    step_name:"First, what's yuh name?",step_goal:"What's yuh main wellness goal?",
    step_energy:"How is yuh energy right now?",step_stress:"What is yuh stress level?",
    step_sleep:"How is yuh sleep quality?",step_focus:"How is yuh mental clarity?",
    step_time:"When yuh prefer fi drink yuh tea?",step_concerns:"Anything else yuh want to work on?",
    report_sub:"Weh wi send yuh Sip & Heal Report?",
    btn_next:"Continue",btn_back:"Back",btn_generate:"Get Mi Report",
    generating:"Creating yuh personalised report...",
    energy:["Very Low","Low","Moderate","Good","Excellent"],
    stress:["Overwhelmed","High","Moderate","Manageable","Minimal"],
    sleep:["Terrible","Restless","Okay","Good","Excellent"],
    focus:["Brain Fog","Scattered","Moderate","Good","Sharp"],
    concerns:{"Inflammation":"Inflammation","Hormones":"Hormones","Liver health":"Liver health","Weight management":"Weight management","Mood support":"Mood support","Nervous system":"Nervous system","Seasonal allergies":"Seasonal allergies","Respiratory":"Respiratory","Blood sugar":"Blood sugar","Longevity":"Longevity","Spiritual wellness":"Spiritual wellness","Nothing specific":"Nothing specific"},
    select_all:"Select all weh apply",
  },
};
const getWM = (lang) => WM_TRANS[lang] || null;

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }) {
  const pct = Math.round((step / (total - 1)) * 100);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        height: 3, background: "rgba(192,136,48,.15)", borderRadius: 4,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${C.sage}, ${C.gold})`,
          borderRadius: 4,
          transition: "width .5s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase",
        color: "rgba(192,136,48,.55)", marginTop: 6, textAlign: "right"
      }}>
        Step {step} of {total - 2}
      </div>
    </div>
  );
}

function OptionCard({ emoji, label, sub, selected, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      background: selected
        ? `linear-gradient(135deg, rgba(39,92,62,.5), rgba(192,136,48,.12))`
        : "rgba(255,255,255,.04)",
      border: selected
        ? `1.5px solid ${C.gold}`
        : "1.5px solid rgba(255,255,255,.1)",
      borderRadius: 14,
      padding: small ? "10px 14px" : "14px 16px",
      cursor: "pointer",
      textAlign: "left",
      transition: "all .22s ease",
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      outline: "none",
      transform: selected ? "translateY(-1px)" : "none",
      boxShadow: selected ? `0 4px 20px rgba(192,136,48,.18)` : "none",
    }}>
      {emoji && (
        <span style={{ fontSize: small ? "1.2rem" : "1.5rem", flexShrink: 0 }}>{emoji}</span>
      )}
      <div>
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: small ? ".78rem" : ".85rem",
          fontWeight: selected ? 600 : 400,
          color: selected ? C.goldLt : "rgba(255,255,255,.85)",
          letterSpacing: ".02em",
        }}>{label}</div>
        {sub && (
          <div style={{
            fontSize: ".68rem", color: "rgba(255,255,255,.42)",
            marginTop: 2, fontWeight: 300
          }}>{sub}</div>
        )}
      </div>
      {selected && (
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: C.gold, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: ".65rem", color: C.forest, fontWeight: 700
          }}>✓</div>
        </div>
      )}
    </button>
  );
}

function ScaleRow({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map(opt => {
        const sel = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{
            flex: "1 1 80px",
            background: sel ? `rgba(39,92,62,.5)` : "rgba(255,255,255,.04)",
            border: sel ? `1.5px solid ${C.gold}` : "1.5px solid rgba(255,255,255,.1)",
            borderRadius: 12,
            padding: "12px 8px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all .2s",
            outline: "none",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: 4 }}>{opt.emoji}</div>
            <div style={{
              fontSize: ".68rem", fontFamily: "'Jost', sans-serif",
              color: sel ? C.goldLt : "rgba(255,255,255,.6)",
              fontWeight: sel ? 600 : 400, letterSpacing: ".02em"
            }}>{opt.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, autoFocus }) {
  return (
    <div>
      {label && (
        <label style={{
          display: "block", fontSize: ".7rem", letterSpacing: ".1em",
          textTransform: "uppercase", color: "rgba(192,136,48,.7)",
          marginBottom: 8, fontFamily: "'Jost', sans-serif"
        }}>{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "rgba(255,255,255,.06)",
          border: "1.5px solid rgba(192,136,48,.25)",
          borderRadius: 12, padding: "14px 18px",
          fontSize: "1rem", color: "white",
          fontFamily: "'Jost', sans-serif", fontWeight: 300,
          outline: "none",
          transition: "border-color .2s",
        }}
        onFocus={e => e.target.style.borderColor = C.gold}
        onBlur={e => e.target.style.borderColor = "rgba(192,136,48,.25)"}
      />
    </div>
  );
}

function NavButton({ label, onClick, disabled, variant = "primary" }) {
  const isPrimary = variant === "primary";
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: isPrimary
        ? (disabled ? "rgba(192,136,48,.25)" : `linear-gradient(135deg, ${C.sage}, #1e4d34)`)
        : "transparent",
      border: isPrimary
        ? `1px solid ${disabled ? "rgba(192,136,48,.2)" : C.gold}`
        : "1px solid rgba(255,255,255,.15)",
      color: isPrimary
        ? (disabled ? "rgba(255,255,255,.3)" : "white")
        : "rgba(255,255,255,.5)",
      padding: "13px 28px",
      borderRadius: 50,
      fontSize: ".8rem", letterSpacing: ".08em",
      textTransform: "uppercase",
      fontFamily: "'Jost', sans-serif",
      fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
      transition: "all .2s",
      boxShadow: (isPrimary && !disabled) ? `0 4px 20px rgba(39,92,62,.35)` : "none",
    }}>
      {label}
    </button>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────
function SipReportCard({ name, rxBlends, ritual, goal, onClose }) {
  const goalObj = GOAL_OPTIONS.find(g => g.value === goal) || {};
  return (
    <div style={{ animation: "fadeSlideUp .5s ease" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.fern}, ${C.sage})`,
          border: `2px solid ${C.gold}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.8rem", margin: "0 auto 16px"
        }}>🌿</div>
        <div style={{
          fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase",
          color: `rgba(192,136,48,.7)`, marginBottom: 8
        }}>Your Personal Sip Report</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
          color: "white", fontWeight: 400, margin: "0 0 8px"
        }}>
          {name ? `${name.split(" ")[0]}'s` : "Your"} Wellness Ritual
        </h2>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(192,136,48,.1)", border: `1px solid rgba(192,136,48,.25)`,
          borderRadius: 50, padding: "5px 14px"
        }}>
          <span style={{ fontSize: ".9rem" }}>{goalObj.emoji}</span>
          <span style={{ fontSize: ".7rem", color: C.goldLt, letterSpacing: ".06em" }}>
            {goalObj.label}
          </span>
        </div>
      </div>

      {/* Blends */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase",
          color: "rgba(255,255,255,.4)", marginBottom: 12
        }}>Your Blends</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rxBlends.map((blend, i) => (
            <div key={blend} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(192,136,48,.2)",
              borderRadius: 12, padding: "12px 16px"
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.sage}, ${C.gold})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: ".7rem", color: "white", fontWeight: 700, flexShrink: 0
              }}>{i + 1}</div>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: ".95rem", color: "white", fontWeight: 400
                }}>{blend}</div>
                <div style={{ fontSize: ".66rem", color: "rgba(192,136,48,.6)", marginTop: 2 }}>
                  Available at chaiholistic.com
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ritual */}
      <div style={{
        background: `linear-gradient(135deg, rgba(39,92,62,.25), rgba(23,51,34,.4))`,
        border: `1px solid rgba(192,136,48,.25)`,
        borderRadius: 16, padding: "18px 20px", marginBottom: 28
      }}>
        <div style={{
          fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase",
          color: "rgba(192,136,48,.6)", marginBottom: 8
        }}>Your Daily Ritual</div>
        <p style={{
          fontSize: ".85rem", color: "rgba(255,255,255,.75)",
          lineHeight: 1.8, fontWeight: 300, margin: 0,
          fontFamily: "'Jost', sans-serif"
        }}>{ritual}</p>
      </div>

      {/* Gift badge */}
      <div style={{
        background: "rgba(192,136,48,.08)",
        border: "1px dashed rgba(192,136,48,.35)",
        borderRadius: 12, padding: "14px 18px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 12
      }}>
        <span style={{ fontSize: "1.4rem" }}>🎁</span>
        <div>
          <div style={{
            fontSize: ".75rem", fontWeight: 600,
            color: C.goldLt, fontFamily: "'Jost', sans-serif"
          }}>Your Sip &amp; Heal Report is on its way to your inbox</div>
          <div style={{
            fontSize: ".66rem", color: "rgba(255,255,255,.4)", marginTop: 2
          }}>Check your email for your personalized Sip &amp; Heal Report — a free gift from Chai Holistic</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, background: `linear-gradient(135deg, ${C.sage}, #1e4d34)`,
            border: `1px solid ${C.gold}`, color: "white",
            padding: "13px 20px", borderRadius: 50,
            fontSize: ".8rem", letterSpacing: ".08em", textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif", fontWeight: 500,
            cursor: "pointer", boxShadow: `0 4px 20px rgba(39,92,62,.35)`
          }}>
          🌿 Shop My Blends
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1, background: "transparent",
            border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.6)",
            padding: "13px 20px", borderRadius: 50,
            fontSize: ".8rem", letterSpacing: ".08em", textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif", fontWeight: 400, cursor: "pointer"
          }}>
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function WellnessProfileModal({ open, onClose, lang }) {
  const wm = getWM(lang);
  const wmT = (key, fallback) => wm?.[key] || fallback;
  const stepTitle = (s) => {
    if (!wm) return s.title;
    const keys = {name:"step_name",goal:"step_goal",energy:"step_energy",stress:"step_stress",sleep:"step_sleep",focus:"step_focus",time:"step_time",concerns:"step_concerns",email:"report_sub"};
    return wm[keys[s.id]] || s.title;
  };
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({
    name: "", email: "", goal: "", energy: "", stress: "",
    sleep: "", focus: "", time: "", concerns: [],
  });
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const overlayRef = useRef();

  // Reset on re-open
  useEffect(() => {
    if (open) {
      setStepIdx(0);
      setAnswers({ name: "", email: "", goal: "", energy: "", stress: "", sleep: "", focus: "", time: "", concerns: [] });
      setResult(null);
      setError("");
      setSaving(false);
    }
  }, [open]);

  // Trap scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const currentStep = STEPS[stepIdx];
  const isIntro  = currentStep.id === "intro";
  const isResult = currentStep.id === "result";
  const CONTENT_STEPS = STEPS.length - 2; // exclude intro + result

  function set(field, val) {
    setAnswers(prev => ({ ...prev, [field]: val }));
  }

  function toggleConcern(c) {
    setAnswers(prev => {
      const arr = prev.concerns.includes(c)
        ? prev.concerns.filter(x => x !== c)
        : [...prev.concerns, c];
      return { ...prev, concerns: arr };
    });
  }

  function canAdvance() {
    const s = currentStep.id;
    if (s === "intro")    return true;
    if (s === "name")     return answers.name.trim().length > 0;
    if (s === "goal")     return !!answers.goal;
    if (s === "energy")   return !!answers.energy;
    if (s === "stress")   return !!answers.stress;
    if (s === "sleep")    return !!answers.sleep;
    if (s === "focus")    return !!answers.focus;
    if (s === "time")     return !!answers.time;
    if (s === "concerns") return true; // optional
    if (s === "email")    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email);
    return false;
  }

  async function handleNext() {
    if (!canAdvance()) return;

    if (currentStep.id === "email") {
      setSaving(true);
      setError("");
      try {
        const rx = prescribeTea(answers);
        setResult(rx);

        const { error: dbErr } = await supabase.from("wellness_profiles").insert([{
          name:         answers.name,
          email:        answers.email,
          goal:         answers.goal,
          energy_pattern: answers.energy,
          stress_level: answers.stress,
          sleep_quality: answers.sleep,
          focus:        answers.focus,
          caffeine_pref: answers.caffeine || null,
          time_of_day:  [answers.time],
          top_concerns: answers.concerns,
          rx_blends:    rx.rxBlends,
          rx_ritual:    rx.ritual,
        }]);
        if (dbErr) console.error("Supabase insert error:", dbErr);

        // Send Sip & Heal Report email
        try {
          const apiUrl = import.meta.env.VITE_API_URL || "https://chai-api.up.railway.app";
          await fetch(`${apiUrl}/api/send-report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name:       answers.name,
              email:      answers.email,
              goal:       answers.goal,
              energy:     answers.energy,
              stress:     answers.stress,
              sleep:      answers.sleep,
              focus:      answers.focus,
              time:       answers.time,
              concerns:   answers.concerns,
              rx_blends:  rx.rxBlends || [],
              rx_ritual:  rx.ritual   || "",
            }),
          });
        } catch (emailErr) {
          console.error("Email send error:", emailErr);
          // Don't block the UI if email fails
        }

      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
        setSaving(false);
        return;
      }
      setSaving(false);
    }

    setStepIdx(i => i + 1);
  }

  function handleBack() {
    if (stepIdx > 0) setStepIdx(i => i - 1);
  }

  // ── Step content renderer ──────────────────────────────────────────────────
  function renderStep() {
    const s = currentStep.id;

    if (s === "intro") return (
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.fern}, ${C.sage})`,
          border: `2px solid rgba(192,136,48,.5)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.2rem", margin: "0 auto 20px",
          boxShadow: `0 0 40px rgba(39,92,62,.4)`
        }}>🌿</div>
        <div style={{
          fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase",
          color: "rgba(192,136,48,.7)", marginBottom: 10
        }}>Chai Holistic · Wellness Profile</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          color: "white", fontWeight: 400, lineHeight: 1.2, margin: "0 0 16px"
        }}>
          Get Your Free<br />
          <em style={{ color: C.goldLt, fontStyle: "italic" }}>Sip Report</em>
        </h2>
        <p style={{
          fontSize: ".9rem", color: "rgba(255,255,255,.6)",
          lineHeight: 1.8, fontWeight: 300,
          maxWidth: 380, margin: "0 auto 24px"
        }}>
          Answer 8 quick questions and we'll prescribe your personalized blend ritual — matched to your body, your energy, and your goals.
        </p>
        <div style={{
          display: "flex", justifyContent: "center", gap: 20,
          flexWrap: "wrap", marginBottom: 28
        }}>
          {["Takes 2 minutes", "100% free", "Personalized Report"].map(f => (
            <div key={f} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: ".7rem", color: "rgba(255,255,255,.45)"
            }}>
              <span style={{ color: C.gold }}>✦</span> {f}
            </div>
          ))}
        </div>
        <button onClick={handleNext} style={{
          background: `linear-gradient(135deg, ${C.sage}, #1e4d34)`,
          border: `1px solid ${C.gold}`,
          color: "white", padding: "15px 40px",
          borderRadius: 50, fontSize: ".85rem",
          letterSpacing: ".1em", textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
          cursor: "pointer",
          boxShadow: `0 8px 30px rgba(39,92,62,.4)`,
          transition: "all .2s"
        }}>
          Begin My Profile →
        </button>
      </div>
    );

    if (s === "result") return (
      <SipReportCard
        name={answers.name}
        rxBlends={result?.rxBlends || []}
        ritual={result?.ritual || ""}
        goal={answers.goal}
        onClose={onClose}
      />
    );

    if (s === "name") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <InputField
          label="First name"
          value={answers.name}
          onChange={v => set("name", v)}
          placeholder="e.g. Alex"
          autoFocus
        />
        <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)", margin: 0, lineHeight: 1.6 }}>
          We'll personalize your Sip &amp; Heal Report with your name.
        </p>
      </div>
    );

    if (s === "goal") return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 8,
        maxHeight: "360px", overflowY: "auto",
        paddingRight: 4
      }}>
        {GOAL_OPTIONS.map(opt => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            label={opt.label}
            sub={opt.sub}
            selected={answers.goal === opt.value}
            onClick={() => set("goal", opt.value)}
            small
          />
        ))}
      </div>
    );

    if (s === "energy") return <ScaleRow options={SCALE_OPTIONS.energy} value={answers.energy} onChange={v => set("energy", v)} />;
    if (s === "stress") return <ScaleRow options={SCALE_OPTIONS.stress} value={answers.stress} onChange={v => set("stress", v)} />;
    if (s === "sleep")  return <ScaleRow options={SCALE_OPTIONS.sleep}  value={answers.sleep}  onChange={v => set("sleep", v)} />;
    if (s === "focus")  return <ScaleRow options={SCALE_OPTIONS.focus}  value={answers.focus}  onChange={v => set("focus", v)} />;

    if (s === "time") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TIME_OPTIONS.map(opt => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            label={opt.label}
            sub={opt.sub}
            selected={answers.time === opt.value}
            onClick={() => set("time", opt.value)}
          />
        ))}
      </div>
    );

    if (s === "concerns") return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {CONCERN_OPTIONS.map(c => {
          const sel = answers.concerns.includes(c);
          return (
            <button key={c} onClick={() => toggleConcern(c)} style={{
              background: sel ? `rgba(39,92,62,.5)` : "rgba(255,255,255,.04)",
              border: sel ? `1.5px solid ${C.gold}` : "1.5px solid rgba(255,255,255,.1)",
              borderRadius: 50, padding: "8px 16px",
              fontSize: ".75rem", color: sel ? C.goldLt : "rgba(255,255,255,.7)",
              fontFamily: "'Jost', sans-serif",
              cursor: "pointer", outline: "none",
              transition: "all .18s", fontWeight: sel ? 600 : 400
            }}>{wm?.concerns?.[c] || c}</button>
          );
        })}
        <p style={{ width: "100%", fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginTop: 8 }}>
          Select all that apply — or skip and tap Continue.
        </p>
      </div>
    );

    if (s === "email") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <InputField
          label="Email address"
          type="email"
          value={answers.email}
          onChange={v => set("email", v)}
          placeholder="you@example.com"
          autoFocus
        />
        <div style={{
          background: "rgba(192,136,48,.07)",
          border: "1px dashed rgba(192,136,48,.25)",
          borderRadius: 10, padding: "10px 14px",
          display: "flex", alignItems: "flex-start", gap: 10
        }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>🎁</span>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", margin: 0, lineHeight: 1.7 }}>
            We'll email you a personalized <strong style={{ color: C.goldLt }}>Sip &amp; Heal Report</strong> — your custom blend guide, daily intention, and wellness ritual. Free, always.
          </p>
        </div>
        {error && (
          <p style={{ fontSize: ".75rem", color: "#e86060", margin: 0 }}>{error}</p>
        )}
      </div>
    );

    return null;
  }

  const showNav   = !isIntro && !isResult;
  const showBack  = showNav && stepIdx > 1;
  const stepNum   = stepIdx; // intro = 0, step 1 = 1, ...

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ch-prof-step {
          animation: fadeSlideUp .35s ease;
        }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={e => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(5,12,8,.88)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
          overflowY: "auto",
        }}
      >
        {/* Modal card */}
        <div style={{
          background: `linear-gradient(160deg, ${C.forest} 0%, #111f16 60%, #0d1a11 100%)`,
          border: "1px solid rgba(192,136,48,.25)",
          borderRadius: 24,
          width: "100%", maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "clamp(24px, 5vw, 40px)",
          boxShadow: "0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(192,136,48,.08)",
          position: "relative",
          animation: "modalIn .38s cubic-bezier(.4,0,.2,1)",
        }}>
          {/* Close */}
          {!saving && (
            <button onClick={onClose} style={{
              position: "absolute", top: 16, right: 18,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: "50%", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,.45)", fontSize: "1rem",
              cursor: "pointer", zIndex: 1,
            }}>✕</button>
          )}

          {/* Progress (not on intro/result) */}
          {showNav && (
            <ProgressBar step={stepNum} total={STEPS.length} />
          )}

          {/* Step title */}
          {currentStep.title && (
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "white", fontWeight: 400,
              marginBottom: 20, marginTop: 0, lineHeight: 1.3
            }}>{stepTitle(currentStep)}</h3>
          )}

          {/* Step content */}
          <div key={currentStep.id} className="ch-prof-step">
            {renderStep()}
          </div>

          {/* Navigation */}
          {showNav && (
            <div style={{
              display: "flex", justifyContent: showBack ? "space-between" : "flex-end",
              marginTop: 28, gap: 10
            }}>
              {showBack && (
                <NavButton label="← Back" onClick={handleBack} variant="secondary" />
              )}
              <NavButton
                label={
                  saving ? "Saving…"
                  : currentStep.id === "email" ? "Get My Sip & Heal Report ✦"
                  : "Continue →"
                }
                onClick={handleNext}
                disabled={!canAdvance() || saving}
                variant="primary"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
