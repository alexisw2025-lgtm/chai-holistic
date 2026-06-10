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
import { useLang } from "./LangContext";

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
  {
    id: "m13",
    name: "Blue Butterfly Fizz",
    tagline: "Color-changing · Magical · Antioxidant",
    category: "Social",
    occasion: "Celebrations · Anytime",
    emoji: "🦋",
    color: "#4A2A8A",
    difficulty: "Easy",
    time: "8 min",
    servings: 2,
    description: "The most show-stopping drink you will ever serve. Butterfly pea flower tea is naturally deep indigo blue — add a squeeze of lemon and watch it turn purple right in the glass. Zero alcohol, maximum drama. Every guest will ask what it is.",
    ingredients: [
      "2 cups brewed butterfly pea flower tea (strong, chilled)",
      "Juice of 1 lemon (served separately — for the color change effect)",
      "1 tbsp honey or agave syrup",
      "1 cup sparkling water",
      "Ice",
      "Lemon slices and edible flowers to garnish",
    ],
    steps: [
      "Brew butterfly pea flower tea strong — 2 tbsp dried flowers per 2 cups water, steep 10 minutes.",
      "Strain and allow to cool completely. It will be a deep, vivid indigo.",
      "Stir honey into the cooled tea until dissolved.",
      "Fill glasses with ice and pour the blue tea about ¾ full.",
      "Top with sparkling water.",
      "At the table, squeeze fresh lemon juice in — watch it turn purple-pink instantly.",
      "Garnish with lemon slice and edible flowers.",
    ],
    benefits: ["Antioxidant-rich", "Anti-inflammatory", "Cognitive support", "Mood-lifting"],
    pairsWith: "Rose & Hibiscus blend",
    tip: "Keep the lemon separate and let guests add it themselves — the color change reaction is the whole experience.",
  },
  {
    id: "m14",
    name: "Coconut Tulsi Cooler",
    tagline: "Adaptogenic · Tropical · Grounding",
    category: "Wellness",
    occasion: "Morning · Afternoon",
    emoji: "🥥",
    color: "#2A6A4A",
    difficulty: "Easy",
    time: "8 min",
    servings: 2,
    description: "Tulsi meets coconut water in the most refreshing adaptogenic drink imaginable. Coconut water is nature's electrolyte — tulsi is nature's stress reset. Together they create a drink that hydrates, grounds, and energizes without a single crash. Beach ritual in a glass.",
    ingredients: [
      "1 cup brewed tulsi tea (chilled)",
      "1 cup pure coconut water",
      "Juice of ½ lime",
      "1 tsp raw honey",
      "4 fresh mint leaves",
      "Pinch of sea salt",
      "Ice",
      "Lime wheel and mint sprig to garnish",
    ],
    steps: [
      "Brew tulsi tea and allow to cool completely in the fridge.",
      "In a glass, muddle the mint leaves with honey and lime juice.",
      "Add the pinch of sea salt — this amplifies every flavour.",
      "Pour chilled tulsi tea and coconut water over the mint mixture.",
      "Fill with ice and stir gently from the bottom.",
      "Garnish with a lime wheel and fresh mint sprig.",
    ],
    benefits: ["Adaptogenic", "Electrolyte-rich", "Stress relief", "Natural energy"],
    pairsWith: "Tulsi Awakening blend",
    tip: "Use fresh young coconut water if available — the flavor difference over carton coconut water is remarkable.",
  },
  {
    id: "m15",
    name: "Reishi Hot Chocolate",
    tagline: "Immune-boosting · Deeply nourishing · Ceremonial",
    category: "Wellness",
    occasion: "Evening · Anytime",
    emoji: "🍄",
    color: "#5A2A1A",
    difficulty: "Easy",
    time: "10 min",
    servings: 1,
    description: "This is not your average hot chocolate. Reishi mushroom is one of the most revered medicinal fungi in the world — immune modulating, deeply calming, and subtly bitter in the most complex, beautiful way. Paired with dark cacao and oat milk, this drink is pure ceremony in a mug.",
    ingredients: [
      "1 cup oat milk",
      "2 tbsp raw cacao powder",
      "½ tsp reishi mushroom powder",
      "1 tsp raw honey or maple syrup",
      "Pinch of cinnamon",
      "Pinch of sea salt",
      "Optional: ¼ tsp maca powder for extra earthiness",
    ],
    steps: [
      "Warm the oat milk over medium-low heat until steaming.",
      "Add cacao powder and whisk until completely smooth — no lumps.",
      "Add reishi powder, cinnamon, and sea salt. Whisk again.",
      "Remove from heat. Stir in honey.",
      "Froth with a milk frother if you have one.",
      "Pour into a wide mug. Dust with extra cinnamon.",
      "Sit down. Both hands on the cup. This one deserves your full attention.",
    ],
    benefits: ["Immune modulation", "Adaptogenic", "Anti-inflammatory", "Stress reduction"],
    pairsWith: "Adaptogen Blend",
    tip: "Reishi has a naturally bitter edge — start with ¼ tsp and build up as your palate adjusts. The bitterness is where the medicine lives.",
  },
  {
    id: "m16",
    name: "Watermelon Mint Aqua Fresca",
    tagline: "Hydrating · Cooling · Summer-ready",
    category: "Social",
    occasion: "Celebrations · Anytime",
    emoji: "🍉",
    color: "#C42A4A",
    difficulty: "Easy",
    time: "10 min",
    servings: 4,
    description: "The ultimate summer crowd-pleaser — and it could not be simpler. Fresh watermelon blended with mint, lime, and a whisper of honey. Naturally pink, naturally sweet, naturally stunning in a pitcher. This is the drink that disappears first at every gathering.",
    ingredients: [
      "4 cups fresh watermelon cubes (seedless)",
      "10 fresh mint leaves",
      "Juice of 1 lime",
      "1 tsp honey (optional — watermelon is already sweet)",
      "2 cups cold sparkling water",
      "Pinch of chili-lime salt for the rim (optional)",
      "Ice",
      "Watermelon wedges and mint to garnish",
    ],
    steps: [
      "Blend watermelon cubes until completely smooth.",
      "Strain through a fine mesh sieve into a pitcher — press to extract all juice.",
      "Add mint leaves and muddle gently in the pitcher.",
      "Stir in lime juice and honey if using.",
      "Refrigerate for at least 30 minutes to let the mint infuse.",
      "When serving, strain out the mint and top with sparkling water.",
      "Serve over ice with watermelon wedge and fresh mint garnish.",
    ],
    benefits: ["Deep hydration", "Lycopene-rich", "Electrolytes", "Cooling & anti-inflammatory"],
    pairsWith: "Rose & Hibiscus blend",
    tip: "Freeze watermelon juice into ice cubes so the drink stays cold and gets more flavorful as the ice melts.",
  },
];

// ─── Seaweed Jelly data ───────────────────────────────────────────────────────
const SEAWEED_JELLIES = [
  {
    id: "sj1",
    name: "Classic Grass Jelly",
    tagline: "Cooling · Detoxifying · Traditional",
    emoji: "🌿",
    color: "#1A2A1A",
    difficulty: "Easy",
    time: "20 min + 2 hr set",
    servings: 6,
    description: "Grass jelly is one of Asia's most beloved wellness desserts — cooling, slightly bitter, and deeply detoxifying. Made from dried grass herb (Platostoma palustre), it has been consumed for centuries to cool the body, support digestion, and lower internal heat. Silky, beautiful, and genuinely good for you.",
    benefits: ["Cooling & detox", "Digestive support", "Antioxidant", "Blood pressure support"],
    kitContents: ["Dried grass herb (Platostoma palustre) — 1 oz", "Tapioca starch — 2 tbsp", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: [
      "1 oz dried grass herb (included in kit)",
      "4 cups water",
      "2 tbsp tapioca starch (included)",
      "2 tbsp raw coconut sugar (included)",
      "Pinch of sea salt",
    ],
    steps: [
      "Rinse dried grass herb briefly under cold water.",
      "Combine herb and 4 cups water in a pot. Bring to boil then simmer 15 minutes.",
      "Strain liquid through fine mesh — press herbs to extract all liquid. Discard herb.",
      "Mix tapioca starch with ¼ cup cold water until completely smooth.",
      "Return herbal liquid to medium heat. Stir in coconut sugar and salt.",
      "Add tapioca mixture while stirring constantly — cook 3–4 minutes until slightly thickened.",
      "Pour into a flat container or individual molds. Allow to cool.",
      "Refrigerate 2 hours until fully set. Cut into cubes and serve with coconut milk and honey.",
    ],
    serving: "Serve chilled in a bowl with coconut milk, raw honey, and fresh fruit. Or cube and add to iced drinks.",
    tip: "The slight bitterness is intentional — it's where the cooling medicine lives. Coconut milk and honey balance it perfectly.",
    shelfLife: "Refrigerate up to 5 days. Do not freeze.",
  },
  {
    id: "sj2",
    name: "Rose Agar Jelly",
    tagline: "Floral · Romantic · Skin-nourishing",
    emoji: "🌸",
    color: "#8A2A5A",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "Agar-agar is a plant-based gelatin derived from red algae — rich in fiber, prebiotic, and completely vegan. Infused with rose water and hibiscus, this jelly is as beautiful as it is nourishing. Delicate pink, lightly floral, and extraordinarily good for skin and gut health. This is wellness that looks like a dessert.",
    benefits: ["Prebiotic fiber", "Skin health", "Gut health", "Antioxidant-rich"],
    kitContents: ["Agar-agar powder — 10g", "Dried hibiscus — 1 tbsp", "Rose water — 1 small bottle", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: [
      "10g agar-agar powder (included in kit)",
      "3 cups water",
      "1 tbsp dried hibiscus (included)",
      "2 tsp rose water (included)",
      "2 tbsp raw coconut sugar",
      "Pinch of sea salt",
    ],
    steps: [
      "Brew hibiscus in 3 cups water for 8 minutes. Strain and discard hibiscus.",
      "Return hibiscus liquid to saucepan over medium heat.",
      "Whisk in agar-agar powder until fully dissolved — about 3 minutes.",
      "Add coconut sugar and sea salt. Stir until dissolved.",
      "Remove from heat. Add rose water and stir gently.",
      "Pour immediately into molds or a flat container — agar sets quickly.",
      "Allow to cool at room temperature 20 minutes then refrigerate 1 hour.",
      "Unmold or cut into shapes and serve.",
    ],
    serving: "Serve chilled as a standalone dessert, cube into sparkling water, or layer in a parfait glass with coconut cream and fresh berries.",
    tip: "Agar sets much firmer than gelatin — use less for a soft wobbly texture, more for firm cubes you can handle.",
    shelfLife: "Refrigerate up to 7 days. Unlike gelatin, agar jelly can be left at room temperature for a few hours without melting.",
  },
  {
    id: "sj3",
    name: "Matcha Coconut Jelly",
    tagline: "Energizing · Creamy · Antioxidant",
    emoji: "🍵",
    color: "#2A5A2A",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Two layers of pure wellness — a vibrant green matcha agar layer and a creamy coconut milk layer — set together into the most stunning jelly you have ever seen. Matcha provides clean, sustained energy. Coconut adds healthy fats and richness. Together they are both a dessert and a ritual.",
    benefits: ["Clean energy", "L-theanine calm", "Healthy fats", "Antioxidant"],
    kitContents: ["Agar-agar powder — 14g (for two layers)", "Ceremonial grade matcha — 2 tsp", "Raw coconut sugar — 3 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: [
      "14g agar-agar powder total (included — split in half)",
      "2 cups water",
      "1 cup full-fat coconut milk",
      "2 tsp ceremonial matcha powder (included)",
      "3 tbsp raw coconut sugar (split between layers)",
      "Pinch of sea salt",
    ],
    steps: [
      "MATCHA LAYER: Whisk matcha into 2 cups water until smooth. Heat to medium.",
      "Add 7g agar powder and 1.5 tbsp coconut sugar. Whisk constantly 3–4 minutes until dissolved.",
      "Pour into mold to ½ depth. Let sit at room temperature until just set — about 15 minutes.",
      "COCONUT LAYER: Heat coconut milk and remaining 1.5 tbsp sugar until warm.",
      "Add remaining 7g agar powder. Whisk 3 minutes until dissolved. Add pinch of salt.",
      "Let cool 5 minutes — it must not be hot or it will melt the matcha layer.",
      "Gently pour coconut layer over the set matcha layer.",
      "Refrigerate 1 hour until fully set. Unmold and slice to reveal the two layers.",
    ],
    serving: "Slice into rectangles to show off the two-tone layers. Serve with a drizzle of honey or alongside fresh mango.",
    tip: "The coconut layer must cool slightly before pouring — if it's too hot it will dissolve the matcha layer beneath.",
    shelfLife: "Refrigerate up to 5 days.",
  },
  {
    id: "sj4",
    name: "Lychee Elderflower Jelly",
    tagline: "Delicate · Floral · Celebratory",
    emoji: "🌼",
    color: "#6A4A8A",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 8,
    description: "The most elegant jelly in the collection. Lychee juice and elderflower create a flavor so delicate and refined it barely seems real. Crystal-clear, lightly perfumed, and absolutely magical at a dinner table or celebration. This is what dessert looks like when it is also medicine.",
    benefits: ["Vitamin C", "Anti-inflammatory", "Antioxidant", "Digestive support"],
    kitContents: ["Agar-agar powder — 10g", "Dried elderflower — 1 tbsp", "Raw honey packet", "Instruction card", "Recipe variations booklet"],
    ingredients: [
      "10g agar-agar powder (included in kit)",
      "1 cup lychee juice (from canned lychees)",
      "1.5 cups water",
      "1 tbsp dried elderflower (included)",
      "1 tbsp raw honey (included)",
      "Juice of ½ lemon",
      "Whole lychees for garnish",
    ],
    steps: [
      "Brew elderflower in 1.5 cups hot water for 8 minutes. Strain.",
      "Combine elderflower tea and lychee juice in a saucepan over medium heat.",
      "Whisk in agar-agar powder until fully dissolved — 3 minutes.",
      "Remove from heat. Stir in honey and lemon juice.",
      "Place a whole lychee in the bottom of each mold for a beautiful surprise inside.",
      "Pour the liquid over the lychees. Let cool 10 minutes.",
      "Refrigerate 1 hour until set. Unmold onto a beautiful plate.",
    ],
    serving: "Serve unmolded on a white plate for maximum visual impact. The whole lychee inside each jelly is the reveal moment.",
    tip: "Use a silicone mold for easy unmolding. Dip the bottom briefly in warm water for 5 seconds to release cleanly.",
    shelfLife: "Refrigerate up to 6 days.",
  },
  {
    id: "sj5",
    name: "Turmeric Mango Jelly",
    tagline: "Anti-inflammatory · Tropical · Vibrant",
    emoji: "🥭",
    color: "#C47A1A",
    difficulty: "Easy",
    time: "15 min + 1 hr set",
    servings: 6,
    description: "Sunshine in a mold. Fresh mango and turmeric create a gloriously golden jelly that is as anti-inflammatory as it is delicious. Turmeric's curcumin absorbs better with fat — the coconut milk in this recipe handles that perfectly. Beautiful, bright, and genuinely powerful.",
    benefits: ["Anti-inflammatory", "Vitamin C", "Digestive support", "Skin-nourishing"],
    kitContents: ["Agar-agar powder — 10g", "Turmeric powder — 1 tsp", "Black pepper — pinch", "Raw coconut sugar — 2 tbsp", "Instruction card", "Recipe variations booklet"],
    ingredients: [
      "10g agar-agar powder (included)",
      "1 cup fresh or frozen mango puree",
      "1.5 cups coconut milk",
      "1 tsp turmeric powder (included)",
      "Pinch of black pepper (included — activates curcumin)",
      "2 tbsp raw coconut sugar",
      "Pinch of sea salt",
    ],
    steps: [
      "Blend mango until completely smooth. Set aside.",
      "Warm coconut milk in a saucepan over medium heat — do not boil.",
      "Whisk in agar-agar powder, turmeric, black pepper, sugar, and salt.",
      "Stir constantly for 4 minutes until fully dissolved and smooth.",
      "Remove from heat. Whisk in mango puree.",
      "Pour into molds immediately — agar sets fast.",
      "Cool at room temperature 15 minutes then refrigerate 1 hour.",
      "Unmold and serve with a dusting of cinnamon and fresh mango slices.",
    ],
    serving: "Serve with fresh mango, toasted coconut flakes, and a drizzle of honey. Spectacular at brunch.",
    tip: "The black pepper is non-negotiable — it increases curcumin absorption by up to 2000%. You won't taste it at this quantity.",
    shelfLife: "Refrigerate up to 5 days.",
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
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: ".6rem", letterSpacing: ".1em",
                    textTransform: "uppercase", color: C.sageD,
                    marginBottom: 2,
                  }}>Pairs perfectly with</div>
                  <div style={{
                    fontSize: ".85rem", color: C.bark,
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 6,
                  }}>{m.pairsWith}</div>
                  <button
                    onClick={() => { if (typeof window._chaiNav === 'function') window._chaiNav('shop'); onClose(); }}
                    style={{ background: C.sageD, color: "white", border: "none", borderRadius: 50, padding: "6px 16px", fontSize: ".65rem", letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", cursor: "pointer", fontWeight: 500 }}>
                    🛍 Shop this Tea →
                  </button>
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
  const { T, lang } = useLang();
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


  <style>{`
    @media(max-width:600px){
      .mkt-hero{padding:40px 1.2rem 36px !important;}
      .mkt-grid{grid-template-columns:1fr !important;}
      .mkt-filter{flex-wrap:wrap !important;gap:8px !important;}
      .mkt-modal{border-radius:20px 20px 0 0 !important;position:fixed !important;bottom:0 !important;left:0 !important;right:0 !important;max-width:100% !important;max-height:92vh !important;}
    }
  `}</style>
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
            placeholder={T.mocktail_search_placeholder || "Search recipes or benefits..."}
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
              {T.mocktail_no_results || "No recipes found"}
            </div>
            <div style={{ fontSize: ".85rem" }}>
              {T.mocktail_no_results_sub || "Try clearing your filters or search a different term."}
            </div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(m => (
              <MocktailCard key={m.id} m={tr(m)} onOpen={setActive} />
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
          }}>— Chai Holistic · Sip &amp; Heal</div>
        </div>
      </div>

      {/* ── Recipe modal ──────────────────────────────────────────────────── */}
      {active && <MocktailModal m={tr(active)} onClose={() => setActive(null)} />}

      {/* ══════════════════════════════════════════════════════════════════════
          SEAWEED JELLY SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <SeaweedJellySection />
    </div>
  );
}

// ─── Seaweed Jelly Section ────────────────────────────────────────────────────
function SeaweedJellySection() {
  const [activeJelly, setActiveJelly] = useState(null);

  return (
    <>
      {/* Hero banner */}
      <section style={{
        background: `linear-gradient(140deg, #0d1a11 0%, #1a3522 60%, #0d2018 100%)`,
        padding: "70px 2.5rem 60px",
        borderTop: `4px solid #c08830`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orb */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,136,48,.1), transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: "#c08830" }}/>
            <span style={{
              fontSize: ".62rem", letterSpacing: ".22em",
              textTransform: "uppercase", color: "#c08830",
            }}>Chai Holistic · Coming Soon</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                color: "white", fontWeight: 400,
                lineHeight: 1.15, marginBottom: 16,
              }}>
                Seaweed &amp; Herb Jelly<br/>
                <em style={{ color: "#deb96a", fontStyle: "italic" }}>Kits.</em>
              </h2>
              <p style={{
                fontSize: ".95rem", color: "rgba(255,255,255,.65)",
                lineHeight: 1.85, fontWeight: 300, maxWidth: 520, marginBottom: 24,
              }}>
                Everything you need to make stunning, all-natural wellness jellies at home —
                agar-agar, dried herbs, coconut sugar, and full instructions. Beautiful enough
                for a dinner table. Healing enough to call medicine. Easy enough for anyone.
              </p>

              {/* Feature badges */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {["Plant-based", "No artificial anything", "Ready-to-go kit", "5 recipes included"].map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(192,136,48,.1)",
                    border: "1px solid rgba(192,136,48,.25)",
                    borderRadius: 50, padding: "5px 14px",
                    fontSize: ".68rem", color: "#deb96a",
                    fontFamily: "'Jost', sans-serif",
                  }}>
                    <span style={{ color: "#c08830" }}>✦</span> {f}
                  </div>
                ))}
              </div>

              {/* Coming soon badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                background: "rgba(39,92,62,.4)",
                border: "1px solid rgba(192,136,48,.3)",
                borderRadius: 16, padding: "14px 22px",
              }}>
                <span style={{ fontSize: "1.4rem" }}>🌊</span>
                <div>
                  <div style={{
                    fontSize: ".7rem", color: "#deb96a",
                    fontWeight: 600, letterSpacing: ".06em",
                    fontFamily: "'Jost', sans-serif",
                  }}>Launching Soon</div>
                  <div style={{
                    fontSize: ".65rem", color: "rgba(255,255,255,.5)",
                    marginTop: 2,
                  }}>Join the waitlist to be first to know</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              flex: "0 1 260px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
              alignSelf: "center",
            }}>
              {[
                ["5", "Jelly Recipes"],
                ["100%", "Plant-based"],
                ["~15", "Min to make"],
                ["7", "Days shelf life"],
              ].map(([num, label]) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(192,136,48,.18)",
                  borderRadius: 16, padding: "18px 16px", textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem", color: "#deb96a", lineHeight: 1,
                  }}>{num}</div>
                  <div style={{
                    fontSize: ".6rem", color: "rgba(255,255,255,.45)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    marginTop: 6, fontFamily: "'Jost', sans-serif",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jelly cards grid */}
      <section style={{
        background: `linear-gradient(180deg, #111f16 0%, #0d1a11 100%)`,
        padding: "50px 2.5rem 70px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 16 }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem", color: "white", fontWeight: 400, margin: 0,
            }}>The Jelly Collection</h3>
            <span style={{
              fontSize: ".65rem", color: "rgba(192,136,48,.6)",
              letterSpacing: ".1em", textTransform: "uppercase",
            }}>5 recipes · click any to preview</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18,
          }}>
            {SEAWEED_JELLIES.map(j => (
              <JellyCard key={j.id} j={j} onOpen={setActiveJelly} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: 50, textAlign: "center",
            borderTop: "1px solid rgba(192,136,48,.15)",
            paddingTop: 36,
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.05rem", fontStyle: "italic",
              color: "rgba(255,255,255,.6)", marginBottom: 8,
            }}>
              "Wellness that looks like a dessert. Tastes like a treat. Works like medicine."
            </div>
            <div style={{
              fontSize: ".6rem", color: "rgba(192,136,48,.5)",
              letterSpacing: ".14em", textTransform: "uppercase",
            }}>— Chai Holistic · Sip &amp; Heal</div>
          </div>
        </div>
      </section>

      {activeJelly && <JellyModal j={activeJelly} onClose={() => setActiveJelly(null)} />}
    </>
  );
}

// ─── Jelly Card ───────────────────────────────────────────────────────────────
function JellyCard({ j, onOpen }) {
  return (
    <div
      onClick={() => onOpen(j)}
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(192,136,48,.2)",
        borderRadius: 20, overflow: "hidden",
        cursor: "pointer",
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,.3)";
        e.currentTarget.style.borderColor = "#c08830";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(192,136,48,.2)";
      }}
    >
      {/* Color header */}
      <div style={{
        height: 80,
        background: `linear-gradient(135deg, ${j.color}cc, ${j.color}66)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2.5rem", position: "relative",
      }}>
        {j.emoji}
        <div style={{
          position: "absolute", top: 10, right: 12,
          background: "rgba(192,136,48,.85)",
          color: "white", fontSize: ".55rem", letterSpacing: ".08em",
          padding: "3px 10px", borderRadius: 50,
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
        }}>Kit</div>
      </div>

      <div style={{ padding: "16px 18px" }}>
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
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{j.description}</p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Pill label={`⏱ ${j.time}`} small
            color="rgba(192,136,48,.12)" textColor="#deb96a" />
          <Pill label={`👤 Serves ${j.servings}`} small
            color="rgba(192,136,48,.12)" textColor="#deb96a" />
          <Pill label={j.difficulty} small
            color="rgba(39,92,62,.4)" textColor="#8ab89a" />
        </div>

        <div style={{
          fontSize: ".62rem", color: "rgba(192,136,48,.6)",
          letterSpacing: ".08em", textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif", textAlign: "right",
        }}>Preview Recipe →</div>
      </div>
    </div>
  );
}

// ─── Jelly Modal ──────────────────────────────────────────────────────────────
function JellyModal({ j, onClose }) {
  if (!j) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9100,
        background: "rgba(13,26,17,.9)",
        backdropFilter: "blur(12px)",
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
          boxShadow: "0 32px 80px rgba(0,0,0,.6)",
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${j.color}cc, ${j.color}88)`,
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
          }}>Chai Holistic · Jelly Kit</div>
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
            <Pill label={`⏱ ${j.time}`} color="rgba(192,136,48,.12)" textColor="#deb96a" />
            <Pill label={`👤 Serves ${j.servings}`} color="rgba(192,136,48,.12)" textColor="#deb96a" />
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
              textTransform: "uppercase", color: "#8ab89a",
              marginBottom: 8,
            }}>Benefits</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {j.benefits.map(b => (
                <Pill key={b} label={b}
                  color="rgba(39,92,62,.3)" textColor="#8ab89a" />
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
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "5px 0",
                  borderBottom: i < j.kitContents.length - 1
                    ? "1px solid rgba(192,136,48,.1)" : "none",
                }}>
                  <span style={{ color: "#c08830", fontSize: ".7rem", flexShrink: 0 }}>✦</span>
                  <span style={{
                    fontSize: ".78rem", color: "rgba(255,255,255,.65)",
                    fontWeight: 300,
                  }}>{item}</span>
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
                borderBottom: i < j.ingredients.length - 1
                  ? "1px solid rgba(255,255,255,.05)" : "none",
              }}>
                <span style={{ color: "#c08830", fontSize: ".7rem", flexShrink: 0, marginTop: 2 }}>✦</span>
                <span style={{
                  fontSize: ".8rem", color: "rgba(255,255,255,.6)",
                  lineHeight: 1.5, fontWeight: 300,
                }}>{ing}</span>
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
              <div key={i} style={{
                display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "#275c3e", color: "white",
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
              textTransform: "uppercase", color: "#8ab89a",
              marginBottom: 6,
            }}>Serving Suggestion</div>
            <p style={{
              fontSize: ".8rem", color: "rgba(255,255,255,.6)",
              lineHeight: 1.65, margin: 0, fontWeight: 300,
            }}>{j.serving}</p>
          </div>

          {/* Tip */}
          <div style={{
            background: "rgba(192,136,48,.08)",
            borderLeft: "4px solid #c08830",
            borderRadius: "0 12px 12px 0",
            padding: "12px 16px", marginBottom: 14,
          }}>
            <div style={{
              fontSize: ".58rem", letterSpacing: ".12em",
              textTransform: "uppercase", color: "#c08830", marginBottom: 4,
            }}>Pro Tip</div>
            <p style={{
              fontSize: ".8rem", color: "rgba(255,255,255,.6)",
              lineHeight: 1.65, margin: 0, fontWeight: 300,
            }}>{j.tip}</p>
          </div>

          {/* Shelf life */}
          <div style={{
            fontSize: ".7rem", color: "rgba(255,255,255,.35)",
            fontFamily: "'Jost', sans-serif", textAlign: "center",
          }}>
            🧊 {j.shelfLife}
          </div>
        </div>
      </div>
    </div>
  );
}
