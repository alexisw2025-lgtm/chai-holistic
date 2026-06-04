/**
 * MocktailsPage.jsx
 * Chai Holistic — All Natural Mocktail Recipes
 *
 * USAGE in chaiholistic_slim_fixed.jsx:
 *   1. import MocktailsPage from "./MocktailsPage";
 *   2. Add "mocktails" to nav links array
 *   3. Add {page==="mocktails"&&<MocktailsPage/>} to pages block
 *   4. Add "mocktails" to PAGE_SECTIONS if desired
 */

import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bark:    "#3D2B1F",
  sage:    "#7A9E7E",
  sageD:   "#4A7250",
  sageDk:  "#275c3e",
  sagePal: "#EBF2EC",
  gold:    "#C4893A",
  goldPal: "#F5E6CE",
  parch:   "#F7F2EA",
  linen:   "#EDE7DC",
  dust:    "#D4C9B8",
  ink:     "#1C1A17",
  mist:    "#ebf5ef",
};

// ─── Mocktail data ────────────────────────────────────────────────────────────
const MOCKTAILS = [
  // ── Wellness-forward ──────────────────────────────────────────────────────
  {
    id: "m1",
    name: "Golden Hour Tonic",
    tagline: "Anti-inflammatory · Warming · Grounding",
    category: "Wellness",
    occasion: "Morning · Afternoon",
    emoji: "✨",
    color: "#C47A1A",
    difficulty: "Easy",
    time: "5 min",
    servings: 1,
    description: "Turmeric, ginger, and honey come together in a golden elixir that warms from the inside out. Black pepper activates the curcumin for maximum benefit. This is your daily medicine, made beautiful.",
    ingredients: [
      "1 cup warm water or coconut milk",
      "½ tsp turmeric powder",
      "¼ tsp fresh grated ginger (or ¼ tsp powder)",
      "Pinch of black pepper",
      "1 tsp raw honey",
      "Squeeze of lemon juice",
      "Optional: pinch of cinnamon",
    ],
    steps: [
      "Warm your water or coconut milk — do not boil.",
      "Add turmeric, ginger, and black pepper. Whisk until smooth.",
      "Stir in honey and lemon juice.",
      "Pour over ice for an iced version, or sip warm.",
      "Garnish with a cinnamon stick or lemon wheel.",
    ],
    benefits: ["Anti-inflammatory", "Liver support", "Digestive aid", "Immune boost"],
    pairsWith: "Turmeric Tonic blend",
    tip: "Add a splash of sparkling water and serve over crushed ice for a golden fizz.",
  },
  {
    id: "m2",
    name: "Hibiscus Rose Spritzer",
    tagline: "Antioxidant · Heart-opening · Beautiful",
    category: "Social",
    occasion: "Anytime · Celebrations",
    emoji: "🌺",
    color: "#C42A5A",
    difficulty: "Easy",
    time: "10 min",
    servings: 2,
    description: "Ruby-red and absolutely stunning in a glass. Hibiscus and rose hip are loaded with vitamin C and anthocyanins. Naturally tart, sweetened with honey, topped with sparkling water — this is what healthy looks like at a party.",
    ingredients: [
      "2 cups brewed hibiscus tea (strong, chilled)",
      "2 tbsp rose hip syrup or honey",
      "Juice of 1 lime",
      "1 cup sparkling water",
      "Fresh mint leaves",
      "Edible rose petals (optional garnish)",
      "Ice",
    ],
    steps: [
      "Brew hibiscus tea double-strength (2 tsp per cup). Cool completely.",
      "Make a simple syrup: warm 2 tbsp honey with 2 tbsp water until dissolved. Cool.",
      "Combine chilled hibiscus tea, honey syrup, and lime juice in a pitcher.",
      "Fill glasses with ice. Pour the hibiscus base ¾ full.",
      "Top with sparkling water. Do not stir — let it bloom naturally.",
      "Garnish with fresh mint and rose petals.",
    ],
    benefits: ["Vitamin C", "Blood pressure support", "Antioxidant-rich", "Mood-lifting"],
    pairsWith: "Rose & Hibiscus blend",
    tip: "Freeze hibiscus tea into ice cubes so the drink never gets watered down.",
  },
  {
    id: "m3",
    name: "2AM Reset Elixir",
    tagline: "Calming · Warming · Sleep-supportive",
    category: "Wellness",
    occasion: "Evening · Late Night",
    emoji: "🌙",
    color: "#3A2A5A",
    difficulty: "Easy",
    time: "8 min",
    servings: 1,
    description: "Everything your nervous system needs when it's 2am and you can't slow down. Cinnamon, cardamom, and oat milk create a warming base. Ashwagandha settles cortisol. A touch of honey seals it with sweetness. This is the hug in a cup you've been looking for.",
    ingredients: [
      "1 cup oat milk or almond milk",
      "½ tsp Ceylon cinnamon",
      "¼ tsp cardamom",
      "¼ tsp ashwagandha powder",
      "1 tsp raw honey",
      "Pinch of nutmeg",
      "Optional: ¼ tsp vanilla extract",
    ],
    steps: [
      "Warm the oat milk in a small saucepan over medium-low heat. Do not boil.",
      "Whisk in cinnamon, cardamom, and ashwagandha until smooth.",
      "Remove from heat. Stir in honey and vanilla.",
      "Pour into your favourite mug. Dust with nutmeg.",
      "Hold with both hands. Breathe in the steam. Sip slowly.",
    ],
    benefits: ["Cortisol reduction", "Nervous system calm", "Sleep support", "Adaptogenic"],
    pairsWith: "2AM Reset blend",
    tip: "Use a milk frother for a café-style foam on top.",
  },
  {
    id: "m4",
    name: "Elderberry Immunity Shot",
    tagline: "Antiviral · Immune armor · Powerful",
    category: "Wellness",
    occasion: "Morning · Anytime",
    emoji: "🛡️",
    color: "#4A1A6A",
    difficulty: "Medium",
    time: "15 min",
    servings: 4,
    description: "A small but mighty shot that punches way above its size. Elderberry is one of the most studied natural antivirals. Ginger and echinacea amplify the effect. Take one every morning during cold season — your immune system will thank you.",
    ingredients: [
      "½ cup dried elderberries",
      "2 cups water",
      "1 tsp fresh ginger (grated)",
      "½ tsp cinnamon",
      "¼ tsp cloves",
      "2 tbsp raw honey (added after cooling)",
      "Juice of ½ lemon",
    ],
    steps: [
      "Combine elderberries, water, ginger, cinnamon, and cloves in a saucepan.",
      "Bring to a boil, then reduce heat and simmer uncovered for 45 minutes until reduced by about half.",
      "Remove from heat. Cool for 10 minutes.",
      "Mash the berries and strain through a fine mesh sieve — press the berries to extract all liquid.",
      "Once cooled to room temperature, stir in honey and lemon juice.",
      "Store in a glass jar in the fridge for up to 2 weeks.",
      "Take 1–2 tbsp as a daily shot, or dilute in sparkling water for a mocktail.",
    ],
    benefits: ["Antiviral", "Immune system", "Anti-inflammatory", "Rich in antioxidants"],
    pairsWith: "Elderberry Shield blend",
    tip: "Never add honey to hot liquid — heat destroys its medicinal properties. Always wait until cooled.",
  },
  {
    id: "m5",
    name: "Lavender Lemonade",
    tagline: "Stress-melting · Floral · Refreshing",
    category: "Social",
    occasion: "Afternoon · Celebrations",
    emoji: "💜",
    color: "#6A4A8A",
    difficulty: "Easy",
    time: "12 min",
    servings: 4,
    description: "Lavender lemonade has a way of slowing everything down. The lavender is gently calming without sedating — you'll feel present, relaxed, and alive. Naturally sweetened, stunningly purple, and the most requested recipe at any gathering.",
    ingredients: [
      "4 cups cold water",
      "Juice of 4 lemons (about ¾ cup)",
      "2 tbsp dried culinary lavender",
      "3 tbsp raw honey or maple syrup",
      "Sparkling water to top",
      "Lemon slices and lavender sprigs for garnish",
      "Ice",
    ],
    steps: [
      "Make lavender syrup: combine ½ cup water, honey, and dried lavender in a saucepan.",
      "Heat gently until honey dissolves — about 3 minutes. Do not boil.",
      "Remove from heat, steep for 10 minutes, then strain out lavender.",
      "Combine lemon juice, lavender syrup, and cold water in a pitcher. Stir well.",
      "Taste and adjust sweetness with more honey if needed.",
      "Serve over ice, top with a splash of sparkling water.",
      "Garnish with lemon slices and a lavender sprig.",
    ],
    benefits: ["Anxiety relief", "Mood support", "Nervous system", "Anti-inflammatory"],
    pairsWith: "Lavender Moon blend",
    tip: "Use culinary-grade lavender only — not all lavender is safe for consumption.",
  },
  {
    id: "m6",
    name: "Adaptogen Cacao Elixir",
    tagline: "Mood-lifting · Nourishing · Ceremonial",
    category: "Wellness",
    occasion: "Morning · Afternoon",
    emoji: "🍫",
    color: "#4A2A1A",
    difficulty: "Medium",
    time: "10 min",
    servings: 1,
    description: "Raw cacao is one of the highest natural sources of magnesium, and it pairs beautifully with adaptogens. This is a ceremonial-style drink — not a dessert. Rich, earthy, grounding. Mushroom adaptogens extend the energy cleanly, no crash.",
    ingredients: [
      "1 cup oat milk or coconut milk",
      "2 tbsp raw cacao powder (not cocoa)",
      "¼ tsp ashwagandha powder",
      "¼ tsp reishi mushroom powder",
      "1 tsp raw honey or maple syrup",
      "Pinch of sea salt",
      "Pinch of cayenne (optional)",
      "½ tsp vanilla extract",
    ],
    steps: [
      "Warm the milk over medium heat until steaming — do not boil.",
      "Add cacao powder and whisk vigorously until smooth.",
      "Add ashwagandha, reishi, and sea salt. Whisk again.",
      "Remove from heat. Stir in honey, vanilla, and cayenne if using.",
      "Use a frother for a velvety foam on top.",
      "Serve in a wide mug. Sit with it. This is ceremony.",
    ],
    benefits: ["Magnesium-rich", "Stress adaptation", "Immune modulation", "Mood elevation"],
    pairsWith: "Adaptogen Blend",
    tip: "Raw cacao ≠ cocoa powder. Raw cacao is cold-processed and retains its medicinal compounds.",
  },
  {
    id: "m7",
    name: "Ginger Mint Smash",
    tagline: "Digestive · Refreshing · Alive",
    category: "Social",
    occasion: "Anytime · After meals",
    emoji: "🌿",
    color: "#2A6A3A",
    difficulty: "Easy",
    time: "5 min",
    servings: 1,
    description: "The ultimate digestive mocktail. Muddled fresh mint, fiery ginger juice, lime, and sparkling water — this is what happens when a mojito decides to actually be good for you. Ready in five minutes. Impossible to put down.",
    ingredients: [
      "8–10 fresh mint leaves",
      "1 inch fresh ginger (pressed or grated for juice)",
      "Juice of 1 lime",
      "1 tsp honey or agave",
      "Sparkling water",
      "Ice",
      "Mint sprig and lime wheel for garnish",
    ],
    steps: [
      "In the bottom of a glass, muddle the mint leaves gently — press don't shred.",
      "Grate fresh ginger onto a clean cloth, squeeze hard to extract the juice. You want about 1 tsp.",
      "Add ginger juice, lime juice, and honey to the glass. Stir until honey dissolves.",
      "Fill glass with ice.",
      "Top with sparkling water. Stir once from the bottom.",
      "Garnish with fresh mint and a lime wheel.",
    ],
    benefits: ["Digestion", "Nausea relief", "Anti-inflammatory", "Circulation"],
    pairsWith: "Digestive Peace blend",
    tip: "Press ginger through a garlic press for the cleanest juice extraction without a juicer.",
  },
  {
    id: "m8",
    name: "Rose Lychee Bliss",
    tagline: "Floral · Romantic · Celebratory",
    category: "Social",
    occasion: "Celebrations · Date night",
    emoji: "🌸",
    color: "#C42A5A",
    difficulty: "Easy",
    time: "5 min",
    servings: 2,
    description: "This is the mocktail that makes people ask if you're sure there's no alcohol in it. Rose water and lychee juice create a delicate, floral sweetness that feels indulgent without compromise. Beautiful for celebrations, romantic evenings, or any time you deserve something special.",
    ingredients: [
      "1 cup lychee juice (from canned lychees is fine)",
      "1 tsp rose water",
      "Juice of ½ lemon",
      "½ cup sparkling water",
      "Edible rose petals for garnish",
      "3–4 fresh lychees if available",
      "Ice",
    ],
    steps: [
      "Combine lychee juice, rose water, and lemon juice in a shaker with ice.",
      "Shake gently — rose water is strong, don't over-mix.",
      "Strain into coupe or wine glasses.",
      "Top carefully with sparkling water.",
      "Garnish with rose petals and a whole lychee on the rim.",
    ],
    benefits: ["Vitamin C", "Skin-nourishing", "Antioxidant", "Mood-lifting"],
    pairsWith: "Rose & Hibiscus blend",
    tip: "Start with ½ tsp rose water and adjust — it can overpower quickly. Quality rose water makes all the difference.",
  },
  {
    id: "m9",
    name: "Chamomile Honey Moon",
    tagline: "Sleep-inducing · Gentle · Sacred",
    category: "Wellness",
    occasion: "Evening · Before bed",
    emoji: "🌕",
    color: "#8A7A2A",
    difficulty: "Easy",
    time: "10 min",
    servings: 1,
    description: "Your evening ritual in a glass. Chamomile is the most gentle sleep herb that exists — not sedating, just deeply calming. Combined with warm honey and a whisper of vanilla, this is a drink you'll look forward to every single night.",
    ingredients: [
      "1 strong cup chamomile tea (2 tsp steeped 8 min)",
      "1 tsp raw honey",
      "¼ tsp vanilla extract",
      "2 tbsp warm oat milk",
      "Pinch of cinnamon",
    ],
    steps: [
      "Brew chamomile tea strong — use 2 tsp per cup, steep for 8 full minutes.",
      "While still hot, stir in honey until dissolved.",
      "Add vanilla extract.",
      "Warm oat milk separately and froth if possible.",
      "Pour the chamomile into your cup, add the frothed oat milk on top.",
      "Dust with cinnamon. Drink 30 minutes before bed.",
    ],
    benefits: ["Sleep onset", "Anxiety relief", "Nervous system", "Digestive calm"],
    pairsWith: "Chamomile & Calm blend",
    tip: "Use a chamomile sleep blend instead of plain chamomile for a deeper effect.",
  },
  {
    id: "m10",
    name: "Sunrise Citrus Boost",
    tagline: "Energizing · Vitamin-rich · Alive",
    category: "Social",
    occasion: "Morning · Brunch",
    emoji: "☀️",
    color: "#C47A1A",
    difficulty: "Easy",
    time: "5 min",
    servings: 2,
    description: "The non-alcoholic brunch drink everyone actually wants. Fresh orange, grapefruit, and ginger create a sunshine-in-a-glass effect. No sugar added, no artificial anything — just pure citrus energy that makes morning feel like a celebration.",
    ingredients: [
      "1 cup fresh orange juice",
      "½ cup fresh grapefruit juice",
      "½ tsp fresh grated ginger",
      "1 tbsp apple cider vinegar (raw, with mother)",
      "1 cup sparkling water",
      "Orange slices and rosemary for garnish",
      "Ice",
    ],
    steps: [
      "Juice the oranges and grapefruit fresh if possible.",
      "Combine juices, grated ginger, and apple cider vinegar in a pitcher. Stir.",
      "Taste — it should be bright, slightly tart, with a ginger kick.",
      "Fill glasses with ice. Pour citrus base ¾ full.",
      "Top with sparkling water. Garnish with orange slice and rosemary.",
    ],
    benefits: ["Vitamin C", "Gut health (ACV)", "Circulation", "Natural energy"],
    pairsWith: "Ginger Lemon Sunrise blend",
    tip: "The apple cider vinegar balances blood sugar and adds a probiotic punch — don't skip it.",
  },
  {
    id: "m11",
    name: "Nettle & Mint Green Tonic",
    tagline: "Mineral-rich · Detox · Nourishing",
    category: "Wellness",
    occasion: "Morning · Spring cleanse",
    emoji: "🌱",
    color: "#3A6A2A",
    difficulty: "Easy",
    time: "10 min",
    servings: 1,
    description: "Nettle is one of the most nutritionally dense plants on earth — iron, calcium, magnesium, silica. Paired with cooling mint and lemon, this becomes a green tonic that actually tastes good. Your body knows what this is. Give it more.",
    ingredients: [
      "1 cup brewed nettle tea (1 tbsp dried nettle, steeped 10 min)",
      "4–5 fresh mint leaves",
      "Juice of ½ lemon",
      "½ tsp honey",
      "½ cup cold sparkling water",
      "Ice",
      "Lemon slice to garnish",
    ],
    steps: [
      "Brew nettle tea strong and allow to cool completely.",
      "In a glass, muddle the mint leaves with the honey.",
      "Add lemon juice and stir.",
      "Pour the cooled nettle tea over the mint mixture.",
      "Add ice and top with sparkling water.",
      "Garnish with a lemon slice and a mint sprig.",
    ],
    benefits: ["Iron-rich", "Anti-inflammatory", "Allergy support", "Hormone balance"],
    pairsWith: "Spring Cleanse blend",
    tip: "Nettle tea is mild and grassy — don't over-steep or it becomes bitter. 10 minutes max.",
  },
  {
    id: "m12",
    name: "Spiced Apple Warmer",
    tagline: "Cozy · Festive · Grounding",
    category: "Social",
    occasion: "Fall · Winter · Celebrations",
    emoji: "🍎",
    color: "#8B3A1A",
    difficulty: "Easy",
    time: "15 min",
    servings: 4,
    description: "This is the drink that makes a house feel like a home. Spiced apple cider simmered with cinnamon, cloves, star anise, and cardamom — your whole space will smell like heaven. All natural, zero alcohol, completely warming. Make a big pot and keep it on the stove.",
    ingredients: [
      "4 cups fresh apple juice or unfiltered cider",
      "2 cinnamon sticks",
      "4 whole cloves",
      "2 star anise",
      "4 cardamom pods (lightly crushed)",
      "1 orange, sliced into rounds",
      "1 inch fresh ginger, sliced",
      "1–2 tsp honey (to taste)",
    ],
    steps: [
      "Combine all ingredients in a medium saucepan.",
      "Heat over medium until it just begins to simmer.",
      "Reduce heat to low and let simmer for 10–15 minutes. Do not boil.",
      "Your kitchen will smell incredible right about now.",
      "Strain into mugs through a fine mesh sieve.",
      "Adjust sweetness with honey.",
      "Serve with a cinnamon stick and orange slice.",
    ],
    benefits: ["Digestive warmth", "Circulation", "Antioxidant", "Immune support"],
    pairsWith: "Autumn Harvest blend",
    tip: "Make a big batch and store in the fridge for 3 days. Reheat one cup at a time as needed.",
  },
];

const CATEGORIES = ["All", "Wellness", "Social"];
const OCCASIONS  = ["All", "Morning", "Evening", "Celebrations", "Anytime"];

// ─── Pill badge ───────────────────────────────────────────────────────────────
function Pill({ label, color = C.sagePal, textColor = C.sageD, small }) {
  return (
    <span style={{
      background: color, color: textColor,
      fontSize: small ? ".58rem" : ".65rem",
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 50, fontFamily: "'Jost', sans-serif",
      fontWeight: 500, letterSpacing: ".04em",
      whiteSpace: "nowrap", display: "inline-block",
    }}>{label}</span>
  );
}

// ─── Recipe card ─────────────────────────────────────────────────────────────
function MocktailCard({ m, onOpen }) {
  return (
    <div
      onClick={() => onOpen(m)}
      style={{
        background: "white",
        border: `1px solid ${C.dust}`,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(28,26,23,.12)";
        e.currentTarget.style.borderColor = C.sage;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = C.dust;
      }}
    >
      {/* Color swatch header */}
      <div style={{
        height: 90,
        background: `linear-gradient(135deg, ${m.color}cc, ${m.color}88)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2.8rem", position: "relative", flexShrink: 0,
      }}>
        {m.emoji}
        <div style={{
          position: "absolute", top: 10, right: 12,
          background: m.category === "Wellness"
            ? "rgba(74,114,80,.85)"
            : "rgba(196,137,58,.85)",
          color: "white", fontSize: ".58rem", letterSpacing: ".08em",
          padding: "3px 10px", borderRadius: 50,
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
        }}>{m.category}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem", color: C.bark,
          marginBottom: 4, lineHeight: 1.25,
        }}>{m.name}</div>
        <div style={{
          fontSize: ".7rem", color: C.sageD,
          fontStyle: "italic", marginBottom: 10, lineHeight: 1.4,
        }}>{m.tagline}</div>
        <p style={{
          fontSize: ".74rem", color: "#6A5F50",
          lineHeight: 1.65, fontWeight: 300,
          marginBottom: 14, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{m.description}</p>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          <Pill label={`⏱ ${m.time}`} small />
          <Pill label={`👤 Serves ${m.servings}`} small />
          <Pill label={m.difficulty} small
            color={m.difficulty === "Easy" ? C.sagePal : C.goldPal}
            textColor={m.difficulty === "Easy" ? C.sageD : C.bark} />
        </div>

        {/* Pairs with */}
        {m.pairsWith && (
          <div style={{
            fontSize: ".63rem", color: C.gold,
            background: C.goldPal,
            border: `1px solid rgba(196,137,58,.2)`,
            borderRadius: 8, padding: "5px 10px",
            fontFamily: "'Jost', sans-serif",
          }}>
            🍵 Pairs with: <strong>{m.pairsWith}</strong>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{
        padding: "0 18px 16px",
        display: "flex", justifyContent: "flex-end",
      }}>
        <span style={{
          fontSize: ".68rem", color: C.sageD,
          letterSpacing: ".08em", textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
        }}>View Recipe →</span>
      </div>
    </div>
  );
}

// ─── Recipe modal ─────────────────────────────────────────────────────────────
function MocktailModal({ m, onClose }) {
  if (!m) return null;
  return (
    <>
      <style>{`
        @keyframes mktModalIn {
          from { opacity:0; transform:scale(.96) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(28,26,23,.75)",
          backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, overflowY: "auto",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: C.parch,
            borderRadius: 24,
            width: "100%", maxWidth: 580,
            maxHeight: "90vh", overflowY: "auto",
            animation: "mktModalIn .35s cubic-bezier(.4,0,.2,1)",
            boxShadow: "0 32px 80px rgba(0,0,0,.35)",
            border: `1px solid ${C.dust}`,
          }}
        >
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${m.color}dd, ${m.color}99)`,
            padding: "32px 28px 24px",
            borderRadius: "24px 24px 0 0",
            position: "relative",
          }}>
            <button onClick={onClose} style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,.2)", border: "none",
              borderRadius: "50%", width: 32, height: 32,
              color: "white", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
            <div style={{ fontSize: "3rem", marginBottom: 10 }}>{m.emoji}</div>
            <div style={{
              fontSize: ".6rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "rgba(255,255,255,.75)",
              marginBottom: 6,
            }}>{m.category} · {m.occasion}</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              color: "white", fontWeight: 400, margin: "0 0 8px",
            }}>{m.name}</h2>
            <p style={{
              fontSize: ".8rem", color: "rgba(255,255,255,.85)",
              fontStyle: "italic", margin: 0,
            }}>{m.tagline}</p>
          </div>

          {/* Content */}
          <div style={{ padding: "24px 28px" }}>
            {/* Meta pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              <Pill label={`⏱ ${m.time}`} />
              <Pill label={`👤 Serves ${m.servings}`} />
              <Pill label={m.difficulty}
                color={m.difficulty === "Easy" ? C.sagePal : C.goldPal}
                textColor={m.difficulty === "Easy" ? C.sageD : C.bark} />
            </div>

            {/* Description */}
            <p style={{
              fontSize: ".88rem", color: "#4A3F30",
              lineHeight: 1.8, marginBottom: 20,
              fontWeight: 300,
            }}>{m.description}</p>

            {/* Benefits */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: ".6rem", letterSpacing: ".14em",
                textTransform: "uppercase", color: C.sageD,
                marginBottom: 8, fontWeight: 600,
              }}>Benefits</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {m.benefits.map(b => (
                  <Pill key={b} label={b}
                    color="rgba(74,114,80,.1)"
                    textColor={C.sageD} />
                ))}
              </div>
            </div>

            <div style={{
              height: 1, background: C.dust, margin: "20px 0"
            }} />

            {/* Ingredients */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem", color: C.bark,
                marginBottom: 12,
              }}>Ingredients</div>
              {m.ingredients.map((ing, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "7px 0",
                  borderBottom: i < m.ingredients.length - 1
                    ? `1px solid ${C.linen}` : "none",
                }}>
                  <span style={{
                    color: C.gold, fontSize: ".75rem",
                    flexShrink: 0, marginTop: 2,
                  }}>✦</span>
                  <span style={{
                    fontSize: ".82rem", color: "#4A3F30",
                    lineHeight: 1.5, fontWeight: 300,
                  }}>{ing}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: C.dust, margin: "20px 0" }} />

            {/* Steps */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem", color: C.bark,
                marginBottom: 12,
              }}>Method</div>
              {m.steps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14,
                  marginBottom: 12, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: C.sageD,
                    color: "white", fontSize: ".7rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</div>
                  <p style={{
                    fontSize: ".83rem", color: "#4A3F30",
                    lineHeight: 1.7, margin: 0, fontWeight: 300,
                  }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Pro tip */}
            <div style={{
              background: C.goldPal,
              border: `1px solid rgba(196,137,58,.3)`,
              borderLeft: `4px solid ${C.gold}`,
              borderRadius: "0 12px 12px 0",
              padding: "12px 16px", marginBottom: 20,
            }}>
              <div style={{
                fontSize: ".6rem", letterSpacing: ".12em",
                textTransform: "uppercase", color: C.gold,
                marginBottom: 4, fontWeight: 600,
              }}>Pro Tip</div>
              <p style={{
                fontSize: ".8rem", color: C.bark,
                lineHeight: 1.65, margin: 0, fontWeight: 300,
              }}>{m.tip}</p>
            </div>

            {/* Pairs with */}
            {m.pairsWith && (
              <div style={{
                background: C.sagePal,
                border: `1px solid rgba(74,114,80,.2)`,
                borderRadius: 12, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: "1.4rem" }}>🍵</span>
                <div>
                  <div style={{
                    fontSize: ".6rem", letterSpacing: ".1em",
                    textTransform: "uppercase", color: C.sageD,
                    marginBottom: 2,
                  }}>Pairs perfectly with</div>
                  <div style={{
                    fontSize: ".85rem", color: C.bark,
                    fontFamily: "'Playfair Display', serif",
                  }}>{m.pairsWith}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function MocktailsPage() {
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [search, setSearch]     = useState("");
  const [active, setActive]     = useState(null);

  const filtered = MOCKTAILS.filter(m => {
    const catOk  = category === "All" || m.category === category;
    const occOk  = occasion === "All" || m.occasion.toLowerCase().includes(occasion.toLowerCase());
    const srchOk = !search
      || m.name.toLowerCase().includes(search.toLowerCase())
      || m.tagline.toLowerCase().includes(search.toLowerCase())
      || m.description.toLowerCase().includes(search.toLowerCase())
      || m.benefits.some(b => b.toLowerCase().includes(search.toLowerCase()));
    return catOk && occOk && srchOk;
  });

  return (
    <div style={{ background: C.parch, minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(140deg, #e8f2eb 0%, #deeae1 50%, #d4e4d8 100%)`,
        padding: "60px 2.5rem 52px",
        borderBottom: `1px solid ${C.dust}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orb */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,137,58,.12), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
          }}>
            <div style={{ width: 32, height: 1, background: C.gold }} />
            <span style={{
              fontSize: ".62rem", letterSpacing: ".22em",
              textTransform: "uppercase", color: C.gold,
            }}>Chai Holistic · Natural Mocktails</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            color: C.bark, fontWeight: 400,
            lineHeight: 1.15, marginBottom: 16,
          }}>
            Sip Something <em style={{ color: C.sageD, fontStyle: "italic" }}>Beautiful.</em><br />
            All natural. Zero compromise.
          </h1>
          <p style={{
            fontSize: "1rem", color: "#5A5040",
            fontWeight: 300, lineHeight: 1.8,
            maxWidth: 560, marginBottom: 28,
          }}>
            12 handcrafted mocktail recipes using the same healing herbs from our blends.
            Wellness-forward and social — from ceremonial elixirs to celebration-ready spritzers.
            Every ingredient earns its place.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              ["12", "Recipes"],
              ["100%", "All Natural"],
              ["0", "Alcohol"],
              ["∞", "Good for you"],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", color: C.sageD,
                }}>{num}</div>
                <div style={{
                  fontSize: ".65rem", color: "#8A7A6A",
                  letterSpacing: ".1em", textTransform: "uppercase",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${C.dust}`,
        padding: "16px 2.5rem",
        position: "sticky", top: 74, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
        }}>
          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search recipes or benefits..."
            style={{
              flex: "1 1 200px", minWidth: 180,
              background: C.parch, border: `1px solid ${C.dust}`,
              borderRadius: 50, padding: "8px 16px",
              fontSize: ".78rem", color: C.ink,
              fontFamily: "'Jost', sans-serif",
              outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = C.sage}
            onBlur={e => e.target.style.borderColor = C.dust}
          />

          {/* Category */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                background: category === c ? C.sageD : "transparent",
                color: category === c ? "white" : C.bark,
                border: `1.5px solid ${category === c ? C.sageD : C.dust}`,
                borderRadius: 50, padding: "6px 16px",
                fontSize: ".7rem", letterSpacing: ".06em",
                fontFamily: "'Jost', sans-serif",
                cursor: "pointer", transition: "all .18s",
              }}>{c}</button>
            ))}
          </div>

          {/* Occasion */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {OCCASIONS.map(o => (
              <button key={o} onClick={() => setOccasion(o)} style={{
                background: occasion === o ? C.gold : "transparent",
                color: occasion === o ? "white" : C.bark,
                border: `1.5px solid ${occasion === o ? C.gold : C.dust}`,
                borderRadius: 50, padding: "6px 16px",
                fontSize: ".7rem", letterSpacing: ".06em",
                fontFamily: "'Jost', sans-serif",
                cursor: "pointer", transition: "all .18s",
              }}>{o}</button>
            ))}
          </div>

          {/* Count */}
          <span style={{
            marginLeft: "auto", fontSize: ".7rem",
            color: "#8A7A6A", flexShrink: 0,
          }}>{filtered.length} recipe{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 2.5rem 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8A7A6A" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🍵</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: 8 }}>
              No recipes found
            </div>
            <div style={{ fontSize: ".85rem" }}>
              Try clearing your filters or search a different term.
            </div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(m => (
              <MocktailCard key={m.id} m={m} onOpen={setActive} />
            ))}
          </div>
        )}

        {/* Bottom note */}
        <div style={{
          marginTop: 60, textAlign: "center",
          borderTop: `1px solid ${C.dust}`,
          paddingTop: 32,
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem", fontStyle: "italic",
            color: C.bark, marginBottom: 8,
          }}>
            "Every ingredient in these recipes exists in our blends for a reason."
          </div>
          <div style={{
            fontSize: ".65rem", color: "#8A7A6A",
            letterSpacing: ".12em", textTransform: "uppercase",
          }}>— Chai Holistic · Sip & Heal</div>
        </div>
      </div>

      {/* ── Recipe modal ──────────────────────────────────────────────────── */}
      {active && <MocktailModal m={active} onClose={() => setActive(null)} />}
    </div>
  );
}
