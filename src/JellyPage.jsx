/**
 * JellyPage.jsx
 * Chai Holistic — Seaweed & Herb Jelly Kits
 *
 * USAGE in chaiholistic_slim_fixed.jsx:
 *   1. import JellyPage from "./JellyPage";
 *   2. Add "jelly" to nav: ["jelly","🌊 Jelly Kits"]
 *   3. Add {page==="jelly"&&<JellyPage/>} to pages render block
 */

import { useState } from "react";
import { useLang } from "./LangContext";

const C = {
  forest:  "#0d1a11",
  fern:    "#173322",
  sage:    "#275c3e",
  sageL:   "#3a7a55",
  sagePal: "#e8f2eb",
  gold:    "#c08830",
  goldLt:  "#deb96a",
  goldPal: "#fdf0d8",
  cream:   "#fef9ef",
  bark:    "#3d2b1f",
  dust:    "#d4c9b8",
  ink:     "#1c1a17",
  teal:    "#1a4a4a",
};

// ─── All 13 jelly recipes ─────────────────────────────────────────────────────
const JELLIES = [
  {
    id: "sj1",
    name: "Classic Grass Jelly",
    tagline: "Cooling · Detoxifying · Traditional",
    emoji: "🌿",
    color: "#1A3A1A",
    category: "Traditional",
    difficulty: "Easy",
    time: "20 min + 2 hr set",
    servings: 6,
    description: "One of Asia's most beloved wellness desserts — silky, cooling, and deeply detoxifying. Made from dried grass herb (Platostoma palustre), consumed for centuries to cool the body, support digestion, and reduce internal heat. Slightly bitter, beautifully balanced with coconut milk and honey.",
    benefits: ["Cooling & detox", "Digestive support", "Antioxidant", "Blood pressure support"],
    kitContents: ["Dried grass herb (Platostoma palustre) — 1 oz", "Tapioca starch — 2 tbsp", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["1 oz dried grass herb (included)", "4 cups water", "2 tbsp tapioca starch (included)", "2 tbsp raw coconut sugar (included)", "Pinch of sea salt"],
    steps: ["Rinse dried grass herb briefly under cold water.", "Combine herb and 4 cups water in a pot. Bring to boil then simmer 15 minutes.", "Strain through fine mesh, pressing herbs to extract all liquid.", "Mix tapioca starch with ¼ cup cold water until smooth.", "Return liquid to medium heat. Stir in coconut sugar and salt.", "Add tapioca mixture stirring constantly — cook 3–4 minutes until slightly thickened.", "Pour into molds. Cool then refrigerate 2 hours until set.", "Cut into cubes and serve with coconut milk and honey."],
    serving: "Serve chilled in a bowl with coconut milk, raw honey, and fresh fruit. Or cube into iced drinks.",
    tip: "The slight bitterness is intentional — coconut milk and honey balance it perfectly.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj2",
    name: "Rose Agar Jelly",
    tagline: "Floral · Romantic · Skin-nourishing",
    emoji: "🌸",
    color: "#6A1A4A",
    category: "Floral",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "Agar-agar from red algae — rich in fiber, prebiotic, and completely vegan — infused with rose water and hibiscus. Delicate pink, lightly floral, and extraordinary for skin and gut health. This is wellness that looks like a dessert and tastes like a dream.",
    benefits: ["Prebiotic fiber", "Skin health", "Gut health", "Antioxidant-rich"],
    kitContents: ["Agar-agar powder — 10g", "Dried hibiscus — 1 tbsp", "Rose water — small bottle", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "1 tbsp dried hibiscus (included)", "2 tsp rose water (included)", "2 tbsp raw coconut sugar", "Pinch of sea salt"],
    steps: ["Brew hibiscus in 3 cups water for 8 minutes. Strain.", "Return hibiscus liquid to saucepan over medium heat.", "Whisk in agar-agar powder until fully dissolved — about 3 minutes.", "Add coconut sugar and sea salt. Stir until dissolved.", "Remove from heat. Add rose water and stir gently.", "Pour immediately into molds — agar sets quickly.", "Cool at room temperature 20 minutes then refrigerate 1 hour.", "Unmold or cut into shapes and serve."],
    serving: "Serve chilled as a standalone dessert, cube into sparkling water, or layer in a parfait with coconut cream and fresh berries.",
    tip: "Agar sets firmer than gelatin — use less for a soft wobbly texture, more for firm cubes.",
    shelfLife: "Refrigerate up to 7 days. Unlike gelatin, agar holds at room temperature for a few hours.",
  },
  {
    id: "sj3",
    name: "Matcha Coconut Layer Jelly",
    tagline: "Energizing · Creamy · Two-tone beauty",
    emoji: "🍵",
    color: "#1A4A1A",
    category: "Layered",
    difficulty: "Medium",
    time: "20 min + 1.5 hr set",
    servings: 6,
    description: "Two stunning layers — vibrant green matcha and creamy coconut — set together into one of the most beautiful jellies you will ever make. Matcha provides clean sustained energy through L-theanine. Coconut adds healthy fats and richness. Slice it to reveal the layers and watch everyone reach for their phones.",
    benefits: ["Clean energy", "L-theanine calm", "Healthy fats", "Antioxidant"],
    kitContents: ["Agar-agar powder — 14g (two layers)", "Ceremonial grade matcha — 2 tsp", "Raw coconut sugar — 3 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["14g agar-agar powder total (split in half)", "2 cups water", "1 cup full-fat coconut milk", "2 tsp ceremonial matcha (included)", "3 tbsp raw coconut sugar (split)", "Pinch of sea salt"],
    steps: ["MATCHA LAYER: Whisk matcha into 2 cups water until smooth. Heat to medium.", "Add 7g agar powder and 1.5 tbsp sugar. Whisk constantly 3–4 minutes.", "Pour into mold to ½ depth. Let set at room temperature — about 15 minutes.", "COCONUT LAYER: Heat coconut milk and remaining sugar until warm.", "Add remaining 7g agar. Whisk 3 minutes. Add pinch of salt.", "Let cool 5 minutes — must not be hot or it melts the matcha layer.", "Gently pour coconut layer over set matcha layer.", "Refrigerate 1 hour. Unmold and slice to reveal the two layers."],
    serving: "Slice into rectangles to show the two-tone layers. Serve with a drizzle of honey or alongside fresh mango.",
    tip: "The coconut layer must cool slightly before pouring — if it is too hot it will dissolve the matcha layer beneath.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj4",
    name: "Lychee Elderflower Jelly",
    tagline: "Delicate · Floral · Celebratory",
    emoji: "🌼",
    color: "#4A2A6A",
    category: "Floral",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "Crystal-clear, lightly perfumed, and absolutely magical at a dinner table. Lychee and elderflower create a flavor so delicate it barely seems real. Place a whole lychee inside each mold before pouring — the reveal when you unmold it is a moment. This is what dessert looks like when it is also medicine.",
    benefits: ["Vitamin C", "Anti-inflammatory", "Antioxidant", "Digestive support"],
    kitContents: ["Agar-agar powder — 10g", "Dried elderflower — 1 tbsp", "Raw honey packet", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "1 cup lychee juice", "1.5 cups water", "1 tbsp dried elderflower (included)", "1 tbsp raw honey (included)", "Juice of ½ lemon", "Whole lychees for garnish"],
    steps: ["Brew elderflower in 1.5 cups hot water for 8 minutes. Strain.", "Combine elderflower tea and lychee juice in a saucepan over medium heat.", "Whisk in agar-agar powder until fully dissolved — 3 minutes.", "Remove from heat. Stir in honey and lemon juice.", "Place a whole lychee in the bottom of each mold.", "Pour liquid over the lychees. Cool 10 minutes.", "Refrigerate 1 hour until set. Unmold onto a beautiful plate."],
    serving: "Unmold on a white plate for maximum visual impact. The whole lychee inside each jelly is the reveal moment.",
    tip: "Use silicone molds for easy unmolding. Dip the bottom in warm water for 5 seconds to release cleanly.",
    shelfLife: "Refrigerate up to 6 days.",
  },
  {
    id: "sj5",
    name: "Turmeric Mango Jelly",
    tagline: "Anti-inflammatory · Tropical · Vibrant",
    emoji: "🥭",
    color: "#8A4A1A",
    category: "Functional",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Gloriously golden and deeply anti-inflammatory. Fresh mango and turmeric create a sunshine-colored jelly that is as powerful as it is beautiful. Turmeric's curcumin absorbs better with fat — the coconut milk in this recipe handles that perfectly. Bright, tropical, and genuinely healing.",
    benefits: ["Anti-inflammatory", "Vitamin C", "Digestive support", "Skin-nourishing"],
    kitContents: ["Agar-agar powder — 10g", "Turmeric powder — 1 tsp", "Black pepper — pinch", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "1 cup fresh or frozen mango puree", "1.5 cups coconut milk", "1 tsp turmeric (included)", "Pinch black pepper (included)", "2 tbsp raw coconut sugar", "Pinch of sea salt"],
    steps: ["Blend mango until completely smooth.", "Warm coconut milk in a saucepan over medium heat.", "Whisk in agar-agar, turmeric, black pepper, sugar, and salt.", "Stir constantly 4 minutes until fully dissolved.", "Remove from heat. Whisk in mango puree.", "Pour into molds immediately.", "Cool 15 minutes then refrigerate 1 hour.", "Unmold and serve with cinnamon and fresh mango slices."],
    serving: "Serve with fresh mango, toasted coconut flakes, and a drizzle of honey. Spectacular at brunch.",
    tip: "The black pepper is non-negotiable — it increases curcumin absorption up to 2000%. You will not taste it at this quantity.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj6",
    name: "Butterfly Pea & Mint Jelly",
    tagline: "Color-changing · Magical · Antioxidant",
    emoji: "🦋",
    color: "#2A1A6A",
    category: "Showstopper",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Deep indigo blue from butterfly pea flower — add a drop of lemon juice to the surface after setting and watch it bloom into purple right before your eyes. The most visually dramatic jelly in the collection. Serve with a small wedge of lemon so guests can trigger the color change themselves.",
    benefits: ["Antioxidant", "Cognitive support", "Anti-inflammatory", "Mood-lifting"],
    kitContents: ["Agar-agar powder — 10g", "Dried butterfly pea flowers — 2 tbsp", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "2 tbsp dried butterfly pea flowers (included)", "2 tbsp raw coconut sugar", "1 tsp lemon juice (for serving — triggers color change)", "Pinch sea salt"],
    steps: ["Steep butterfly pea flowers in 3 cups hot water 10 minutes. Strain — it should be deep indigo.", "Heat the indigo liquid over medium heat.", "Whisk in agar-agar powder until dissolved — 3 minutes.", "Add sugar and salt. Stir until dissolved.", "Pour into molds. Cool then refrigerate 1 hour.", "Once set, serve with a small wedge of lemon on the side.", "Squeeze lemon on the jelly at the table and watch it turn purple."],
    serving: "Serve with fresh mint and a lemon wedge. Let guests add the lemon themselves for maximum magic.",
    tip: "The indigo color is most vivid when the tea is fresh. Don't wait too long after steeping to pour.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj7",
    name: "Lavender Honey Jelly",
    tagline: "Calming · Floral · Dreamy",
    emoji: "💜",
    color: "#4A2A6A",
    category: "Wellness",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Everything lavender does for your nervous system — in a jelly you can eat. Lightly purple, delicately floral, sweetened only with raw honey. The perfect sleep-supporting dessert. Serve after dinner, 30 minutes before bed, and feel your whole evening soften.",
    benefits: ["Nervous system calm", "Sleep support", "Anxiety relief", "Anti-inflammatory"],
    kitContents: ["Agar-agar powder — 10g", "Dried culinary lavender — 2 tbsp", "Raw honey packet", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "2 tbsp dried culinary lavender (included)", "2 tbsp raw honey (included)", "1 tsp lemon juice", "Pinch sea salt"],
    steps: ["Steep lavender in 3 cups hot water — not boiling — for 8 minutes. Strain.", "Heat lavender liquid over medium heat.", "Whisk in agar-agar powder until dissolved — 3 minutes.", "Remove from heat. Stir in honey, lemon juice, and salt.", "Honey must go in off heat — never boil honey.", "Pour into molds. Cool at room temperature 15 minutes.", "Refrigerate 1 hour until fully set.", "Serve chilled, dusted with a few dried lavender buds."],
    serving: "Serve chilled as a gentle evening dessert. Pair with chamomile tea for a full pre-sleep ritual.",
    tip: "Use culinary-grade lavender only — not all lavender is food-safe. Do not over-steep or it turns soapy.",
    shelfLife: "Refrigerate up to 6 days.",
  },
  {
    id: "sj8",
    name: "Ginger Lemon Detox Jelly",
    tagline: "Cleansing · Energizing · Zingy",
    emoji: "🍋",
    color: "#6A5A1A",
    category: "Functional",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Bright, clean, and cleansing. Fresh ginger and lemon are two of the most effective digestive and detoxification herbs in the world. Set into a jelly and sweetened with raw honey, they become a morning wellness ritual you will actually look forward to. Sharp, alive, and absolutely good for you.",
    benefits: ["Digestive support", "Liver detox", "Immune boost", "Anti-inflammatory"],
    kitContents: ["Agar-agar powder — 10g", "Dried ginger root — 2 tbsp", "Raw honey packet", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "2 tbsp dried ginger (included)", "Juice of 2 lemons", "2 tbsp raw honey (included)", "Pinch turmeric", "Pinch sea salt"],
    steps: ["Simmer dried ginger in 3 cups water for 10 minutes. Strain.", "Return ginger liquid to medium heat.", "Whisk in agar-agar powder until dissolved.", "Add turmeric and salt. Stir 3 minutes.", "Remove from heat. Add lemon juice and honey off heat.", "Pour into molds. Cool then refrigerate 1 hour.", "Serve chilled in the morning as a detox shot-style portion."],
    serving: "Cut into small cubes and serve as a morning detox bite with warm lemon water. Or slice and serve on a plate with fresh ginger.",
    tip: "Serve in small shot-glass-sized portions in the morning for a daily detox ritual without the effort of making a drink.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj9",
    name: "Strawberry Hibiscus Jelly",
    tagline: "Ruby red · Joyful · Vitamin-rich",
    emoji: "🍓",
    color: "#8A1A2A",
    category: "Social",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "The most crowd-pleasing jelly in the collection. Ruby red, naturally sweet, and stunning in any shape you choose. Hibiscus deepens the color and adds antioxidants; fresh strawberry puree gives it body and a flavor everyone loves. Make it for any occasion — there will be none left.",
    benefits: ["Vitamin C", "Antioxidant-rich", "Heart health", "Immune support"],
    kitContents: ["Agar-agar powder — 10g", "Dried hibiscus — 2 tbsp", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "2 cups water", "2 tbsp dried hibiscus (included)", "1 cup fresh strawberry puree", "2 tbsp raw coconut sugar", "Juice of ½ lemon"],
    steps: ["Brew hibiscus in 2 cups hot water 8 minutes. Strain.", "Heat hibiscus liquid over medium heat.", "Whisk in agar-agar until dissolved — 3 minutes.", "Add sugar and lemon juice. Stir until dissolved.", "Remove from heat. Whisk in fresh strawberry puree.", "Pour into molds immediately.", "Cool then refrigerate 1 hour.", "Unmold and dust with freeze-dried strawberry powder if available."],
    serving: "Serve on a white plate with fresh mint and whole strawberries. Beautiful for brunches, gatherings, or children's parties.",
    tip: "Add a few whole strawberry slices to the mold before pouring — they will be suspended inside the jelly when set.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj10",
    name: "Chamomile Vanilla Dream Jelly",
    tagline: "Sleep-supporting · Warm · Comforting",
    emoji: "🌕",
    color: "#6A5A1A",
    category: "Wellness",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Your favorite bedtime tea — set into a gentle, honey-gold jelly that is as comforting as it is effective. Chamomile's apigenin works whether you drink it or eat it. Vanilla and honey make it feel like a hug. Eat one 30 minutes before bed and feel your whole body exhale.",
    benefits: ["Sleep support", "Anxiety relief", "Digestive calm", "Nervous system"],
    kitContents: ["Agar-agar powder — 10g", "Dried chamomile flowers — 3 tbsp", "Raw honey packet", "Vanilla extract — small bottle", "Instruction card"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "3 tbsp dried chamomile (included)", "2 tbsp raw honey (included)", "½ tsp vanilla extract (included)", "Pinch cinnamon", "Pinch sea salt"],
    steps: ["Steep chamomile in 3 cups hot water — not boiling — 10 minutes. Strain.", "Return liquid to medium heat.", "Whisk in agar-agar powder until dissolved.", "Add cinnamon and salt. Stir 3 minutes.", "Remove from heat. Stir in honey and vanilla — never add to boiling liquid.", "Pour into molds. Cool then refrigerate 1 hour.", "Serve chilled or at room temperature."],
    serving: "Serve as a gentle evening dessert with a cup of chamomile tea. Or eat straight from the fridge as a pre-sleep ritual.",
    tip: "Steep chamomile at 190°F — not full boiling — to preserve its delicate apigenin compounds.",
    shelfLife: "Refrigerate up to 6 days.",
  },
  {
    id: "sj11",
    name: "Spirulina Mint Detox Jelly",
    tagline: "Deep green · Mineral-rich · Powerful",
    emoji: "🌱",
    color: "#1A4A3A",
    category: "Functional",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "The most nutritionally dense jelly in the collection. Spirulina is one of the highest protein, mineral, and chlorophyll foods on earth. Paired with cooling peppermint, this deep green jelly is for the serious wellness devotee. It tastes cleaner than it looks. It works better than anything.",
    benefits: ["Protein-rich", "Detoxifying", "Iron & B12", "Alkalizing"],
    kitContents: ["Agar-agar powder — 10g", "Spirulina powder — 1 tsp", "Dried peppermint — 2 tbsp", "Raw coconut sugar — 1 tbsp", "Instruction card"],
    ingredients: ["10g agar-agar powder (included)", "3 cups water", "2 tbsp dried peppermint (included)", "1 tsp spirulina powder (included)", "1 tbsp raw coconut sugar", "Juice of ½ lime", "Pinch sea salt"],
    steps: ["Steep peppermint in 3 cups hot water 8 minutes. Strain.", "Heat mint liquid over medium heat.", "Whisk in agar-agar powder until dissolved.", "Add sugar and salt. Stir 3 minutes.", "Remove from heat. Whisk in spirulina until fully incorporated — no lumps.", "Add lime juice. Stir.", "Pour immediately into molds.", "Refrigerate 1 hour. Serve chilled with a lime wedge."],
    serving: "Serve chilled with fresh mint leaves and a squeeze of lime. Best eaten in the morning on an empty stomach.",
    tip: "Whisk spirulina vigorously — it can clump. A small hand frother makes this effortless.",
    shelfLife: "Refrigerate up to 4 days. Spirulina oxidizes faster than other ingredients.",
  },
  {
    id: "sj12",
    name: "Cinnamon Apple Spice Jelly",
    tagline: "Warming · Festive · Blood sugar support",
    emoji: "🍎",
    color: "#6A2A1A",
    category: "Social",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "Everything cozy about autumn set into a jelly. Fresh apple juice, Ceylon cinnamon, cardamom, and cloves create a spiced jelly that smells as good as it tastes. Ceylon cinnamon supports healthy blood sugar and insulin sensitivity — making this the most functional festive dessert you have ever served.",
    benefits: ["Blood sugar support", "Digestive warmth", "Antioxidant", "Circulation"],
    kitContents: ["Agar-agar powder — 10g", "Ceylon cinnamon — 1 tsp", "Cardamom — ¼ tsp", "Cloves — 3 whole", "Raw coconut sugar — 2 tbsp", "Instruction card"],
    ingredients: ["10g agar-agar powder (included)", "2 cups fresh apple juice", "1 cup water", "1 tsp Ceylon cinnamon (included)", "¼ tsp cardamom (included)", "3 whole cloves (included)", "2 tbsp raw coconut sugar", "Pinch sea salt"],
    steps: ["Simmer water, cinnamon, cardamom, and cloves 8 minutes. Strain.", "Combine spiced water with apple juice in saucepan over medium heat.", "Whisk in agar-agar powder until dissolved.", "Add sugar and salt. Stir 3 minutes.", "Remove from heat and pour into molds.", "Cool then refrigerate 1 hour.", "Serve chilled or at room temperature with a cinnamon stick garnish."],
    serving: "Serve at room temperature for full spice flavor. Cut into cubes and serve with cream or coconut whip for a festive dessert.",
    tip: "Use Ceylon cinnamon — not cassia. Ceylon has a softer, more complex flavor and is safer for regular consumption.",
    shelfLife: "Refrigerate up to 6 days.",
  },
  {
    id: "sj13",
    name: "Triple Citrus Agar Jelly",
    tagline: "Bright · Vitamin-rich · Sunshine",
    emoji: "☀️",
    color: "#8A6A1A",
    category: "Social",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "Orange, lemon, and grapefruit layered with lemongrass into the most refreshing, vitamin-packed jelly you can make. Each citrus brings different antioxidants and phytonutrients. Together they create a bright, complex flavor that makes people think you spent all day on it. You did not.",
    benefits: ["Vitamin C", "Immune support", "Skin brightening", "Liver support"],
    kitContents: ["Agar-agar powder — 10g", "Dried lemongrass — 1 tbsp", "Raw honey packet", "Instruction card", "Recipe variations booklet"],
    ingredients: ["10g agar-agar powder (included)", "1 cup fresh orange juice", "½ cup fresh lemon juice", "½ cup fresh grapefruit juice", "1 cup water", "1 tbsp dried lemongrass (included)", "2 tbsp raw honey (included)"],
    steps: ["Steep lemongrass in 1 cup hot water 8 minutes. Strain.", "Combine lemongrass tea with all citrus juices in a saucepan over medium heat.", "Whisk in agar-agar powder until dissolved — 3 minutes.", "Remove from heat. Stir in honey off heat.", "Pour into molds. Cool then refrigerate 1 hour.", "Unmold and serve with citrus slices and fresh mint."],
    serving: "Serve chilled with thin citrus slices fanned on top. Stunning for breakfast, brunch, or as a palate cleanser between courses.",
    tip: "Use freshly squeezed juice only — bottled juice has been heat-processed and loses much of its vitamin C content.",
    shelfLife: "Refrigerate up to 5 days.",
  },
];

const CATEGORIES_J = ["All", "Traditional", "Floral", "Layered", "Functional", "Showstopper", "Wellness", "Social"];

// ─── Pill ────────────────────────────────────────────────────────────────────
function Pill({ label, color, textColor, small }) {
  return (
    <span style={{
      background: color || "rgba(192,136,48,.12)",
      color: textColor || C.goldLt,
      fontSize: small ? ".58rem" : ".65rem",
      padding: small ? "2px 9px" : "3px 11px",
      borderRadius: 50,
      fontFamily: "'Jost', sans-serif",
      fontWeight: 500,
      letterSpacing: ".04em",
      whiteSpace: "nowrap",
      display: "inline-block",
    }}>{label}</span>
  );
}

// ─── Jelly Card ──────────────────────────────────────────────────────────────
function JellyCard({ j, onOpen }) {
  return (
    <div
      onClick={() => onOpen(j)}
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(192,136,48,.2)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 14px 45px rgba(0,0,0,.35)";
        e.currentTarget.style.borderColor = C.gold;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(192,136,48,.2)";
      }}
    >
      {/* Color header */}
      <div style={{
        height: 90,
        background: `linear-gradient(135deg, ${j.color}ee, ${j.color}88)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "3rem", position: "relative", flexShrink: 0,
      }}>
        {j.emoji}
        <div style={{
          position: "absolute", top: 10, right: 12,
          background: "rgba(192,136,48,.85)",
          color: "white", fontSize: ".55rem", letterSpacing: ".08em",
          padding: "3px 10px", borderRadius: 50,
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
        }}>{j.category}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem", color: "white",
          marginBottom: 4, lineHeight: 1.25,
        }}>{j.name}</div>
        <div style={{
          fontSize: ".68rem", color: "#8ab89a",
          fontStyle: "italic", marginBottom: 10,
        }}>{j.tagline}</div>
        <p style={{
          fontSize: ".73rem", color: "rgba(255,255,255,.5)",
          lineHeight: 1.65, fontWeight: 300, marginBottom: 14,
          flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{j.description}</p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Pill label={`⏱ ${j.time}`} small />
          <Pill label={`👤 Serves ${j.servings}`} small />
          <Pill label={j.difficulty} small
            color="rgba(39,92,62,.4)" textColor="#8ab89a" />
        </div>

        <div style={{
          fontSize: ".62rem", color: "rgba(192,136,48,.6)",
          letterSpacing: ".08em", textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif", textAlign: "right",
        }}>View Kit →</div>
        <div style={{ marginTop: 8, background: "rgba(39,92,62,.2)", borderRadius: 8, padding: "6px 10px", fontSize: ".61rem", color: "#8ab89a", lineHeight: 1.5 }}>
          🧴 6 packs · 🥤 Shaker bottle included · 🍯 Honey · <strong style={{color:"#deb96a"}}>${JELLY_KIT_PRICE}</strong>
        </div>
      </div>
    </div>
  );
}

// ─── Jelly Modal ─────────────────────────────────────────────────────────────
function JellyModal({ j, onClose, onAddToCart }) {
  if (!j) return null;
  return (
    <>
      <style>{`@keyframes jmIn{from{opacity:0;transform:scale(.96) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9200,
          background: "rgba(13,26,17,.92)",
          backdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, overflowY: "auto",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "#111f16",
            border: "1px solid rgba(192,136,48,.3)",
            borderRadius: 24,
            width: "100%", maxWidth: 560,
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 32px 80px rgba(0,0,0,.7)",
            animation: "jmIn .35s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${j.color}dd, ${j.color}88)`,
            padding: "28px 26px 22px",
            borderRadius: "24px 24px 0 0",
            position: "relative",
          }}>
            <button onClick={onClose} style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,.3)", border: "none",
              borderRadius: "50%", width: 32, height: 32,
              color: "white", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
            <div style={{ fontSize: "2.8rem", marginBottom: 10 }}>{j.emoji}</div>
            <div style={{
              fontSize: ".55rem", letterSpacing: ".2em",
              textTransform: "uppercase", color: "rgba(255,255,255,.6)",
              marginBottom: 6,
            }}>Chai Holistic · Jelly Kit · {j.category}</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
              color: "white", fontWeight: 400, margin: "0 0 6px",
            }}>{j.name}</h2>
            <p style={{
              fontSize: ".78rem", color: "rgba(255,255,255,.75)",
              fontStyle: "italic", margin: 0,
            }}>{j.tagline}</p>
          </div>

          <div style={{ padding: "22px 26px" }}>
            {/* Meta */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              <Pill label={`⏱ ${j.time}`} />
              <Pill label={`👤 Serves ${j.servings}`} />
              <Pill label={j.difficulty} color="rgba(39,92,62,.4)" textColor="#8ab89a" />
            </div>

            <p style={{
              fontSize: ".86rem", color: "rgba(255,255,255,.65)",
              lineHeight: 1.8, marginBottom: 18, fontWeight: 300,
            }}>{j.description}</p>

            {/* Benefits */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: ".58rem", letterSpacing: ".14em",
                textTransform: "uppercase", color: "#8ab89a", marginBottom: 8,
              }}>Benefits</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {j.benefits.map(b => (
                  <Pill key={b} label={b} color="rgba(39,92,62,.3)" textColor="#8ab89a" />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(192,136,48,.15)", margin: "18px 0" }}/>

            {/* Kit contents */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: ".95rem", color: "white", marginBottom: 10,
              }}>What's in the Kit</div>
              <div style={{
                background: "rgba(192,136,48,.06)",
                border: "1px solid rgba(192,136,48,.2)",
                borderRadius: 12, padding: "12px 16px",
              }}>
                {j.kitContents.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "5px 0",
                    borderBottom: i < j.kitContents.length - 1 ? "1px solid rgba(192,136,48,.1)" : "none",
                  }}>
                    <span style={{ color: C.gold, fontSize: ".7rem", flexShrink: 0, marginTop: 2 }}>✦</span>
                    <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.65)", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(192,136,48,.15)", margin: "18px 0" }}/>

            {/* Ingredients */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: ".95rem", color: "white", marginBottom: 10,
              }}>Ingredients</div>
              {j.ingredients.map((ing, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, padding: "6px 0",
                  borderBottom: i < j.ingredients.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                }}>
                  <span style={{ color: C.gold, fontSize: ".7rem", flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)", lineHeight: 1.5, fontWeight: 300 }}>{ing}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: "rgba(192,136,48,.15)", margin: "18px 0" }}/>

            {/* Steps */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: ".95rem", color: "white", marginBottom: 10,
              }}>Method</div>
              {j.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: C.sage, color: "white",
                    fontSize: ".65rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</div>
                  <p style={{
                    fontSize: ".8rem", color: "rgba(255,255,255,.6)",
                    lineHeight: 1.7, margin: 0, fontWeight: 300,
                  }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Serving */}
            <div style={{
              background: "rgba(39,92,62,.2)",
              border: "1px solid rgba(39,92,62,.4)",
              borderRadius: 12, padding: "12px 16px", marginBottom: 14,
            }}>
              <div style={{
                fontSize: ".58rem", letterSpacing: ".12em",
                textTransform: "uppercase", color: "#8ab89a", marginBottom: 6,
              }}>Serving Suggestion</div>
              <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)", lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                {j.serving}
              </p>
            </div>

            {/* Tip */}
            <div style={{
              background: "rgba(192,136,48,.08)",
              borderLeft: `4px solid ${C.gold}`,
              borderRadius: "0 12px 12px 0",
              padding: "12px 16px", marginBottom: 14,
            }}>
              <div style={{
                fontSize: ".58rem", letterSpacing: ".12em",
                textTransform: "uppercase", color: C.gold, marginBottom: 4,
              }}>Pro Tip</div>
              <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.6)", lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                {j.tip}
              </p>
            </div>

            {/* Shelf life */}
            <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.35)", textAlign: "center", marginBottom: 20 }}>
              🧊 {j.shelfLife}
            </div>

            {/* Kit contents split */}
            <div style={{ background: "rgba(39,92,62,.15)", border: "1px solid rgba(39,92,62,.4)", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#8ab89a", marginBottom: 10 }}>✦ Included in Your Kit (6 packs)</div>
              {j.ingredients.filter(ing => !isKitchenIngredient(ing)).map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: ".75rem", color: "rgba(255,255,255,.7)" }}>
                  <span style={{ color: "#8ab89a", fontSize: ".6rem" }}>✓</span>{ing}
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.35)", marginBottom: 6 }}>Included in every kit: shaker bottle · raw honey packet · instruction card</div>
              </div>
            </div>

            {j.ingredients.filter(ing => isKitchenIngredient(ing)).length > 0 && (
              <div style={{ background: "rgba(192,136,48,.07)", border: "1px solid rgba(192,136,48,.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(192,136,48,.7)", marginBottom: 8 }}>From Your Kitchen</div>
                {j.ingredients.filter(ing => isKitchenIngredient(ing)).map((ing, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0", fontSize: ".74rem", color: "rgba(255,255,255,.5)" }}>
                    <span style={{ color: "rgba(192,136,48,.6)", fontSize: ".6rem" }}>◇</span>{ing}
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            {onAddToCart && (
              <div style={{ background: "linear-gradient(135deg,rgba(39,92,62,.3),rgba(23,51,34,.5))", border: "1px solid rgba(192,136,48,.35)", borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "white" }}>{j.name} Kit</div>
                    <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.5)", marginTop: 2 }}>6 packs · shaker bottle · raw honey packet · instruction card · everything included</div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "#deb96a", fontWeight: 600 }}>${JELLY_KIT_PRICE}</div>
                </div>
                <button
                  onClick={() => { onAddToCart({ id: j.id + "_kit", name: j.name + " Jelly Kit", price: JELLY_KIT_PRICE, emoji: "🌊", qty: 1 }); onClose(); }}
                  style={{ width: "100%", background: "linear-gradient(135deg,#275c3e,#1e4d34)", border: "1px solid #c08830", color: "white", padding: "13px 20px", borderRadius: 50, fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", fontWeight: 500, cursor: "pointer" }}>
                  🛒 Add Kit to Cart — ${JELLY_KIT_PRICE}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const JELLY_KIT_PRICE = 28;
const JELLY_BUNDLE_PRICE = 52;

// Ingredients that come from the kitchen (not included in kit)
const KITCHEN_INGREDIENTS = ["sparkling water","water","ice","fresh lemon","lemon juice","lime juice","fresh lime","fresh orange juice","fresh grapefruit juice","fresh apple juice","fresh watermelon","fresh strawberries","fresh mango","fresh lychees","fresh mint","fresh ginger","whole lychees","mango slices","lemon slices","orange slices","fresh fruit","edible rose petals"];

function isKitchenIngredient(ing) {
  const lower = ing.toLowerCase();
  return KITCHEN_INGREDIENTS.some(k => lower.includes(k)) || 
    lower.startsWith("fresh ") || lower.includes("to garnish") || 
    lower.includes("for garnish") || lower.includes("optional garnish") ||
    lower.startsWith("ice");
}

export default function JellyPage({ onAddToCart }) {
  const { T, lang } = useLang();
  const [category, setCategory] = useState("All");
  const [search, setSearch]     = useState("");
  const [active, setActive]     = useState(null);

  const filtered = JELLIES.filter(j => {
    const catOk  = category === "All" || j.category === category;
    const srchOk = !search
      || j.name.toLowerCase().includes(search.toLowerCase())
      || j.tagline.toLowerCase().includes(search.toLowerCase())
      || j.category.toLowerCase().includes(search.toLowerCase())
      || j.benefits.some(b => b.toLowerCase().includes(search.toLowerCase()));
    return catOk && srchOk;
  });

  <style>{`
    @media(max-width:600px){
      section{padding-left:1.2rem !important;padding-right:1.2rem !important;padding-top:44px !important;}
      [style*="gridTemplateColumns"]{grid-template-columns:1fr !important;}
      [style*="maxWidth: 1280"]{padding-left:1.2rem !important;padding-right:1.2rem !important;}
      [style*="padding: 14px 2.5rem"]{padding:10px 1rem !important;}
      [style*="gap: 18"]{gap:12px !important;}
      [style*="borderRadius: 24"]{border-radius:16px !important;}
    }
  `}</style>
  return (
    <div id="sec-jelly-top" style={{ background: C.forest, minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(140deg, #0d1a11 0%, #1a3522 60%, #0d2018 100%)`,
        padding: "64px 2.5rem 56px",
        borderBottom: `3px solid ${C.gold}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,136,48,.1), transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: C.gold }}/>
            <span style={{
              fontSize: ".62rem", letterSpacing: ".22em",
              textTransform: "uppercase", color: C.gold,
            }}>Chai Holistic · Jelly Kits</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            color: "white", fontWeight: 400,
            lineHeight: 1.15, marginBottom: 16,
          }}>
            Seaweed &amp; Herb<br/>
            <em style={{ color: C.goldLt, fontStyle: "italic" }}>Jelly Kits.</em>
          </h1>
          <p style={{
            fontSize: ".95rem", color: "rgba(255,255,255,.6)",
            lineHeight: 1.85, fontWeight: 300, maxWidth: 560, marginBottom: 28,
          }}>
            13 all-natural jelly recipes — from ancient grass jelly to two-tone matcha coconut to color-changing butterfly pea flower.
            Every kit includes everything you need: agar-agar, dried herbs, natural sweetener, and full instructions.
            Beautiful enough for a dinner table. Healing enough to call medicine.
          </p>

          {/* Feature badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {["13 Recipes", "Plant-based & vegan", "Ready-to-go kit", "All natural ingredients", "~15 min to make"].map(f => (
              <div key={f} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(192,136,48,.1)",
                border: "1px solid rgba(192,136,48,.25)",
                borderRadius: 50, padding: "5px 14px",
                fontSize: ".68rem", color: C.goldLt,
                fontFamily: "'Jost', sans-serif",
              }}>
                <span style={{ color: C.gold }}>✦</span> {f}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["13","Recipes"],["100%","Plant-based"],["~15","Min to make"],["7","Day shelf life"]].map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem", color: C.goldLt,
                }}>{n}</div>
                <div style={{
                  fontSize: ".6rem", color: "rgba(255,255,255,.4)",
                  letterSpacing: ".1em", textTransform: "uppercase",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shaker Bottle Feature Section ─────────────────────────────────── */}
      <section style={{ background: "rgba(192,136,48,.06)", borderBottom: "1px solid rgba(192,136,48,.15)", padding: "28px 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            {/* Icon + headline */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(192,136,48,.3)", flexShrink: 0 }}><img src="/shaker-bottle.jpg" alt="Chai Holistic Shaker Bottle" style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "white", marginBottom: 2 }}>Includes a Shaker Bottle</div>
                <div style={{ fontSize: ".65rem", color: "rgba(192,136,48,.7)", letterSpacing: ".08em" }}>Included in every kit — no blender, no electricity, works anywhere</div>
              </div>
            </div>
            {/* Features row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}>
              {[
                { icon: "🚫💧", title: "No-Leak Lid", desc: "Secure screw-on lid + flip-top spout. Toss it in your gym bag, commute, or jog with confidence." },
                { icon: "⚡", title: "Smooth Mix", desc: "Stainless steel shaker ball breaks up powder fast — no clumps. Removable for easy rinsing in seconds." },
                { icon: "📏", title: "20 oz / 16 oz Marks", desc: "Clear cup with measurement scale up to 16 oz. See exactly what you're mixing every time." },
                { icon: "🧼", title: "Dishwasher Safe", desc: "Dishwasher safe for low-effort cleanup. Hand-wash tip: rinse right after, air-dry with lid open." },
              ].map(f => (
                <div key={f.title} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(192,136,48,.15)", borderRadius: 12, padding: "10px 14px", flex: "1 1 160px", minWidth: 140 }}>
                  <div style={{ fontSize: ".6rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(192,136,48,.7)", marginBottom: 4 }}>{f.icon} {f.title}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
                </div>
              ))}
            </div>
            {/* Add extra shaker button */}
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.4)", marginBottom: 4 }}>{T.jelly_shaker_note || "One shaker bottle comes with every kit."}</div>
              <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.3)", marginBottom: 6 }}>{T.jelly_shaker_note2 || "Need an extra for the gym, desk, or a friend?"}</div>
              <button
                onClick={() => onAddToCart && onAddToCart({ id: "shaker_extra", name: "Extra Shaker Bottle", price: 8, emoji: "🥤" })}
                style={{ background: "rgba(192,136,48,.15)", border: "1px solid rgba(192,136,48,.4)", color: "#deb96a", padding: "8px 18px", borderRadius: 50, fontSize: ".68rem", letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                + Add a Spare Shaker Bottle — $8
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div style={{
        background: "#0d1a11",
        borderBottom: "1px solid rgba(192,136,48,.15)",
        padding: "14px 2.5rem",
        position: "sticky", top: 74, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap",
        }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={T.jelly_search_placeholder || "Search recipes or benefits..."}
            style={{
              flex: "1 1 180px", minWidth: 160,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(192,136,48,.25)",
              borderRadius: 50, padding: "8px 16px",
              fontSize: ".78rem", color: "white",
              fontFamily: "'Jost', sans-serif", outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = C.gold}
            onBlur={e => e.target.style.borderColor = "rgba(192,136,48,.25)"}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES_J.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                background: category === c ? C.sage : "transparent",
                color: category === c ? "white" : "rgba(255,255,255,.6)",
                border: `1.5px solid ${category === c ? C.sage : "rgba(192,136,48,.2)"}`,
                borderRadius: 50, padding: "5px 14px",
                fontSize: ".68rem", letterSpacing: ".06em",
                fontFamily: "'Jost', sans-serif",
                cursor: "pointer", transition: "all .18s",
              }}>{c}</button>
            ))}
          </div>
          <span style={{
            marginLeft: "auto", fontSize: ".68rem",
            color: "rgba(192,136,48,.5)", flexShrink: 0,
          }}>{filtered.length} kit{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div id="sec-jelly-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 2.5rem 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.4)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🌊</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "white", marginBottom: 8 }}>
              {T.jelly_no_results || "No kits found"}
            </div>
            <div style={{ fontSize: ".85rem" }}>{T.jelly_no_results_sub || "Try clearing your filters."}</div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: 18,
          }}>
            {filtered.map(j => (
              <JellyCard key={j.id} j={j} onOpen={setActive} />
            ))}
          </div>
        )}

        {/* Bottom quote */}
        <div style={{
          marginTop: 60, textAlign: "center",
          borderTop: "1px solid rgba(192,136,48,.15)",
          paddingTop: 32,
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem", fontStyle: "italic",
            color: "rgba(255,255,255,.5)", marginBottom: 8,
          }}>
            {T.jelly_quote || "Wellness that looks like a dessert. Tastes like a treat. Works like medicine."}
          </div>
          <div style={{
            fontSize: ".6rem", color: "rgba(192,136,48,.45)",
            letterSpacing: ".14em", textTransform: "uppercase",
          }}>— Chai Holistic · Sip &amp; Heal</div>
        </div>
      </div>

      {active && <JellyModal j={active} onClose={() => setActive(null)} onAddToCart={onAddToCart} />}
    </div>
  );
}
