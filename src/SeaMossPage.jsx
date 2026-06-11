/**
 * SeaMossPage.jsx
 * Chai Holistic — Sea Moss Gel Kits & Recipes
 *
 * USAGE in chaiholistic_slim_fixed.jsx:
 *   1. import SeaMossPage from "./SeaMossPage";
 *   2. Add ["seamoss","🌊 Sea Moss"] to nav links array
 *   3. Add {page==="seamoss"&&<SeaMossPage/>} to pages render block
 *   4. Add nav link and footer link
 */

import { useState } from "react";
import { useLang } from "./LangContext";
import { getModalContent } from "./modal_translations_final";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  deep:    "#040f09",
  forest:  "#0a1a0f",
  fern:    "#0f2418",
  sage:    "#1e5c35",
  sageL:   "#2d7a4a",
  teal:    "#0d3d2e",
  tealL:   "#1a5c45",
  gold:    "#c08830",
  goldLt:  "#deb96a",
  goldPal: "#fdf0d8",
  aqua:    "#1a8a6a",
  aquaL:   "#2aaa85",
  moss:    "#3a6a2a",
  mossL:   "#52a03a",
  cream:   "#f5f0e8",
  ink:     "#0a0f0a",
};

// ─── 15 Sea Moss Gel Recipes ──────────────────────────────────────────────────
const RECIPES = [
  {
    id: "sm1",
    name: "Classic Sea Moss Gel",
    tagline: "The foundation. Pure. Powerful. Essential.",
    emoji: "🌿",
    color: "#1a4a2a",
    category: "Foundation",
    flavor: "Neutral",
    difficulty: "Easy",
    time: "20 min + overnight soak",
    servings: 24,
    highlight: "102 minerals",
    description: "This is where everything begins. Pure Irish moss, soaked overnight, blended with spring water into a silky, odorless gel that becomes the base for every recipe in this collection. On its own it is neutral enough to add to anything — smoothies, teas, juices, soups, desserts. This is your daily mineral supplement in its most natural form.",
    ingredients: [
      "1 oz dried Irish sea moss (included in kit)",
      "2–3 cups spring water (for soaking)",
      "½ cup fresh spring water (for blending)",
      "Optional: 1 tsp lime juice to brighten",
    ],
    steps: [
      "Rinse sea moss thoroughly under cold running water — remove any visible debris or salt.",
      "Place sea moss in a glass bowl. Cover completely with spring water — it will expand significantly.",
      "Cover the bowl and refrigerate overnight (8–12 hours). The sea moss will triple in size and become soft.",
      "Drain and rinse the soaked sea moss thoroughly.",
      "Transfer to a high-speed blender with ½ cup fresh spring water.",
      "Blend on high for 1–2 minutes until completely smooth and gel-like.",
      "Pour into a glass jar. Refrigerate — it sets further as it cools.",
      "Use 1–2 tbsp daily in any smoothie, drink, or recipe.",
    ],
    benefits: ["102 minerals & vitamins", "Thyroid support", "Gut health", "Immune system", "Collagen production", "Anti-inflammatory"],
    dailyUse: "Add 1–2 tbsp to your morning smoothie, juice, or tea. Tasteless and odorless — you will not know it is there.",
    tip: "Always use spring water — tap water contains chlorine and fluoride that can interfere with the moss's mineral content.",
    shelfLife: "Refrigerate in a sealed glass jar up to 3 weeks. Freeze in ice cube trays for up to 3 months.",
  },
  {
    id: "sm2",
    name: "Pineapple Paradise Gel",
    tagline: "Tropical · Digestive · Bright & golden",
    emoji: "🍍",
    color: "#6a5a1a",
    category: "Tropical",
    flavor: "Pineapple",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Bromelain + 102 minerals",
    description: "Grandmother's recipe, reimagined. Pineapple was one of the first flavors ever added to sea moss gel — and for good reason. Fresh pineapple brings bromelain, a powerful digestive enzyme that breaks down protein and reduces inflammation. The sweetness balances the sea moss perfectly. This was the flavor that started everything.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup fresh pineapple chunks (or 100% pineapple juice)",
      "½ cup spring water",
      "1 tsp raw honey",
      "Juice of ½ lime",
      "Pinch of sea salt",
    ],
    steps: [
      "Prepare base sea moss gel following the Classic recipe steps.",
      "Add pineapple chunks, lime juice, honey, and sea salt to the blender.",
      "Add the soaked sea moss and spring water.",
      "Blend on high 2 minutes until completely smooth.",
      "Taste — adjust sweetness with honey if needed.",
      "Pour into glass jar and refrigerate at least 2 hours before serving.",
      "The gel will be golden-yellow and beautifully fragrant.",
    ],
    benefits: ["Digestive enzymes", "Anti-inflammatory", "Vitamin C", "Gut healing", "Immune support"],
    dailyUse: "Take 2 tbsp straight or blend into a smoothie. Exceptional with coconut milk and banana.",
    tip: "Use fresh pineapple over canned — the bromelain enzyme is destroyed by heat processing in canned versions.",
    shelfLife: "Refrigerate up to 2 weeks. The fresh pineapple slightly reduces shelf life.",
  },
  {
    id: "sm3",
    name: "Strawberry Fields Gel",
    tagline: "Sweet · Antioxidant-rich · Beautiful",
    emoji: "🍓",
    color: "#6a1a2a",
    category: "Berry",
    flavor: "Strawberry",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Vitamin C + ellagic acid",
    description: "Deep red, naturally sweet, and loaded with ellagic acid — one of the most powerful anti-cancer compounds found in food. Strawberry sea moss gel was a favorite in Caribbean households for generations. The color alone makes it feel like medicine that was designed to be loved. This is the one that children ask for by name.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup fresh or frozen strawberries",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Juice of ½ lemon",
      "Pinch of sea salt",
    ],
    steps: [
      "Prepare and soak sea moss overnight per the Classic recipe.",
      "If using frozen strawberries, thaw completely first.",
      "Combine soaked sea moss, strawberries, honey, lemon juice, salt, and spring water in blender.",
      "Blend on high 2 minutes until completely smooth.",
      "Taste and adjust sweetness.",
      "Pour into glass jar. Refrigerate 2 hours — it turns a beautiful deep rose color as it sets.",
      "Stir before each use as some natural separation may occur.",
    ],
    benefits: ["Ellagic acid", "Vitamin C", "Antioxidant", "Heart health", "Skin brightening"],
    dailyUse: "2 tbsp straight, or mixed into yogurt, oatmeal, or blended into a pink smoothie.",
    tip: "Frozen strawberries actually blend more smoothly than fresh — and they are just as nutritious.",
    shelfLife: "Refrigerate up to 10 days.",
  },
  {
    id: "sm4",
    name: "Spirulina Ocean Gel",
    tagline: "Deep green · Protein-rich · Extraordinary",
    emoji: "🌊",
    color: "#0a3a2a",
    category: "Superfood",
    flavor: "Spirulina",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Complete protein + 102 minerals",
    description: "Two of the most nutritionally complete foods on earth — combined. Irish sea moss and spirulina together provide every essential amino acid, an extraordinary mineral profile, and one of the highest chlorophyll concentrations available in food. This deep green gel is for serious wellness. It will change your baseline if you take it every morning for 30 days. This is not wellness theater — this is real.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 tsp spirulina powder (included)",
      "½ cup spring water",
      "1 tsp raw honey",
      "Juice of ½ lime",
      "Optional: ¼ tsp chlorella for extra detox",
    ],
    steps: [
      "Soak sea moss overnight per the Classic recipe.",
      "Blend soaked sea moss with spring water until completely smooth.",
      "Add spirulina powder and lime juice.",
      "Blend again until fully incorporated — no green streaks.",
      "Add honey and blend briefly.",
      "The gel will be a deep, vivid green.",
      "Refrigerate in glass jar — gel firms up within 2 hours.",
    ],
    benefits: ["Complete amino acids", "Iron & B12", "Detoxifying", "Alkalizing", "Energy", "Thyroid support"],
    dailyUse: "Take 1–2 tbsp in the morning on an empty stomach or blend into a green smoothie.",
    tip: "Start with ½ tsp spirulina and build up — it is potent and can cause detox symptoms if you introduce too much too fast.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
  {
    id: "sm5",
    name: "Blackberry Bliss Gel",
    tagline: "Deep purple · Brain-boosting · Rich",
    emoji: "🫐",
    color: "#2a1a4a",
    category: "Berry",
    flavor: "Blackberry",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Anthocyanins + brain health",
    description: "Blackberries contain some of the highest anthocyanin concentrations of any food — these are the pigments that make them purple, and they are also some of the most powerful brain-protective compounds in nature. Combined with sea moss's 102 minerals, this deep purple gel is as beautiful as it is effective. Grandmother used to say the darker the berry, the deeper the medicine.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup fresh or frozen blackberries",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Juice of ½ lemon",
      "Optional: ½ tsp açaí powder for extra depth",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "If using frozen blackberries, thaw and reserve any juice — add it to the blender.",
      "Blend sea moss, blackberries, spring water, honey, and lemon juice.",
      "Blend 2 full minutes until no seeds remain.",
      "Strain through a fine mesh sieve if you prefer seedless — optional.",
      "Pour into glass jar. The color deepens as it refrigerates.",
      "Refrigerate 2 hours before serving.",
    ],
    benefits: ["Brain health", "Anthocyanins", "Memory support", "Anti-aging", "Heart health"],
    dailyUse: "2 tbsp straight or blend into a purple smoothie bowl with banana and coconut milk.",
    tip: "Do not strain — the blackberry seeds contain fiber and beneficial compounds. Blend long enough and they become part of the gel.",
    shelfLife: "Refrigerate up to 10 days.",
  },
  {
    id: "sm6",
    name: "Mango Glow Gel",
    tagline: "Luminous · Skin-nourishing · Tropical",
    emoji: "🥭",
    color: "#8a4a0a",
    category: "Tropical",
    flavor: "Mango",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Beta-carotene + collagen support",
    description: "Mango is one of the richest food sources of beta-carotene — the precursor to vitamin A that your skin desperately needs. Sea moss provides the silica and minerals that directly support collagen production. Together they create a gel that works on your skin from the inside. Two weeks of daily use and people will start asking what you are doing differently.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup fresh or frozen mango chunks",
      "½ cup spring water",
      "1 tsp raw honey",
      "Juice of ½ lime",
      "Pinch of cardamom",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss with mango chunks, spring water, lime juice, and cardamom.",
      "Blend 2 minutes until completely smooth and golden.",
      "Add honey and blend briefly.",
      "Pour into glass jar. The gel will be a gorgeous amber-gold color.",
      "Refrigerate 2 hours until set.",
    ],
    benefits: ["Beta-carotene", "Collagen support", "Skin health", "Eye health", "Immune system"],
    dailyUse: "2 tbsp in the morning blended into coconut milk with a pinch of turmeric for a skin glow ritual.",
    tip: "Ataulfo (champagne) mangoes blend the smoothest and have the sweetest flavor profile.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
  {
    id: "sm7",
    name: "Coconut Vanilla Dream Gel",
    tagline: "Creamy · Calming · Indulgent",
    emoji: "🥥",
    color: "#4a3a1a",
    category: "Classic",
    flavor: "Coconut Vanilla",
    difficulty: "Easy",
    time: "20 min + overnight soak",
    servings: 20,
    highlight: "MCT fats + 102 minerals",
    description: "The most universally beloved flavor in the collection. Coconut milk adds healthy MCT fats that make the sea moss gel even more bioavailable — fat helps carry the fat-soluble vitamins into your cells. Vanilla adds a warmth that makes this feel like a treat rather than a supplement. Every single person who tries this asks for the recipe.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "½ cup full-fat coconut milk",
      "¼ cup spring water",
      "1 tsp pure vanilla extract",
      "1 tbsp raw honey or maple syrup",
      "Pinch of sea salt",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss, coconut milk, spring water, vanilla, honey, and sea salt.",
      "Blend 2 minutes until completely smooth and creamy.",
      "The gel will be ivory-white and luxuriously silky.",
      "Pour into glass jar and refrigerate 2 hours.",
      "Stir before serving — coconut milk may separate slightly on top.",
    ],
    benefits: ["MCT fats", "Brain energy", "Digestive health", "Skin nourishing", "Hormone support"],
    dailyUse: "2 tbsp stirred into warm oat milk as a morning tonic. Or blend into a smoothie for a creamy, silky texture.",
    tip: "Use full-fat coconut milk — the fat is the point. Light coconut milk defeats the purpose.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
  {
    id: "sm8",
    name: "Soursop Immunity Gel",
    tagline: "Caribbean · Powerful · Legendary",
    emoji: "🌿",
    color: "#1a4a1a",
    category: "Superfood",
    flavor: "Soursop",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Acetogenins + 102 minerals",
    description: "Soursop — graviola — has been used in Caribbean wellness traditions for centuries. Modern research has identified acetogenins, compounds unique to soursop that are among the most studied natural substances in oncology research. Combined with sea moss, this gel is revered in Caribbean communities as a deep immune and cellular wellness tonic. This is ancestral medicine at its most powerful.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "½ cup soursop pulp (fresh or frozen)",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Juice of ½ lime",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "If using frozen soursop, thaw completely.",
      "Remove any seeds from soursop pulp.",
      "Blend sea moss, soursop pulp, spring water, honey, and lime juice.",
      "Blend 2 minutes until smooth — soursop has a fibrous texture, blend thoroughly.",
      "Strain if desired for a smoother gel.",
      "Refrigerate 2 hours. Gel will be cream-colored with a tropical floral aroma.",
    ],
    benefits: ["Immune modulation", "Cellular health", "Anti-inflammatory", "Nervous system", "Antioxidant"],
    dailyUse: "1–2 tbsp daily. A highly respected daily wellness ritual in Caribbean health traditions.",
    tip: "Soursop is available frozen at Caribbean and Latin grocery stores. Fresh is best when in season.",
    shelfLife: "Refrigerate up to 10 days.",
  },
  {
    id: "sm9",
    name: "Blueberry Brain Gel",
    tagline: "Cognitive · Memory · Anti-aging",
    emoji: "🫐",
    color: "#1a1a5a",
    category: "Berry",
    flavor: "Blueberry",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "BDNF support + 102 minerals",
    description: "Blueberries are the most studied brain food in the world. Their anthocyanins cross the blood-brain barrier and directly support BDNF — brain-derived neurotrophic factor — the protein responsible for learning, memory, and neuroplasticity. Sea moss provides the mineral foundation your neurons need to fire. This gel is for anyone who wants their mind to work better. That is everyone.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup wild blueberries (fresh or frozen)",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Juice of ½ lemon",
      "Optional: ½ tsp lion's mane mushroom powder",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss, blueberries, spring water, honey, and lemon juice.",
      "Add lion's mane powder if using — it amplifies the cognitive benefit significantly.",
      "Blend 2 minutes until smooth. The color will be deep blue-purple.",
      "Refrigerate 2 hours in glass jar.",
    ],
    benefits: ["BDNF support", "Memory & focus", "Neuroprotective", "Anti-aging", "Eye health"],
    dailyUse: "2 tbsp in the morning. Best taken consistently for cognitive benefits — 30 days minimum.",
    tip: "Wild blueberries have 2x the antioxidants of cultivated blueberries. Find them frozen in most health food stores.",
    shelfLife: "Refrigerate up to 10 days.",
  },
  {
    id: "sm10",
    name: "Golden Turmeric Sea Moss Gel",
    tagline: "Anti-inflammatory · Healing · Sacred",
    emoji: "✨",
    color: "#6a3a0a",
    category: "Functional",
    flavor: "Turmeric & Ginger",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Curcumin + 102 minerals",
    description: "This is the most functional gel in the collection. Turmeric's curcumin is one of the most studied natural anti-inflammatory compounds in the world. Black pepper increases its absorption by up to 2000%. Combined with ginger's COX-2 inhibiting properties and sea moss's full mineral spectrum, this golden gel addresses chronic inflammation at every level. If you have pain, fatigue, or a body that feels like it is working against you — start here.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 tsp turmeric powder (included)",
      "½ tsp fresh grated ginger or ginger powder",
      "Pinch of black pepper (included — non-negotiable)",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Pinch of cinnamon",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss with spring water until smooth.",
      "Add turmeric, ginger, black pepper, cinnamon, and honey.",
      "Blend 2 minutes until fully incorporated.",
      "The gel will be a deep golden color.",
      "Refrigerate 2 hours. The color deepens as it sets.",
    ],
    benefits: ["Anti-inflammatory", "Pain relief", "Liver support", "Joint health", "Immune modulation"],
    dailyUse: "1–2 tbsp daily. Add to warm golden milk or take straight. Take consistently for 3–4 weeks for full anti-inflammatory effect.",
    tip: "Black pepper is absolutely non-negotiable here — do not skip it. The curcumin absorption difference is dramatic.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
  {
    id: "sm11",
    name: "Hibiscus & Rosehip Gel",
    tagline: "Ruby red · Vitamin C powerhouse · Heart health",
    emoji: "🌺",
    color: "#6a0a2a",
    category: "Floral",
    flavor: "Hibiscus & Rose",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Vitamin C + anthocyanins",
    description: "Hibiscus contains more vitamin C than oranges, and rosehip contains one of the highest natural concentrations of vitamin C of any food on earth. Both support collagen, heart health, and immune function. Combined with sea moss, this ruby-red gel is a complete cardiovascular and immune tonic. It is also the most beautiful gel in the collection — the color alone makes people stop.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "2 tbsp dried hibiscus flowers (included)",
      "1 tbsp rosehip powder",
      "1 cup hot water (for steeping)",
      "¼ cup additional spring water",
      "1 tbsp raw honey",
      "Juice of ½ lemon",
    ],
    steps: [
      "Steep hibiscus flowers in 1 cup hot water for 10 minutes. Strain. Allow to cool.",
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss with cooled hibiscus tea and additional spring water.",
      "Add rosehip powder, honey, and lemon juice.",
      "Blend 2 minutes until completely smooth.",
      "The gel will be a stunning ruby red.",
      "Refrigerate 2 hours until set.",
    ],
    benefits: ["Vitamin C", "Collagen support", "Heart health", "Blood pressure", "Immune system"],
    dailyUse: "2 tbsp daily in water or juice. Exceptional as a shot with a squeeze of fresh lemon.",
    tip: "The hibiscus steeping liquid adds color and nutrients — do not substitute plain water.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
  {
    id: "sm12",
    name: "Watermelon Mint Refresh Gel",
    tagline: "Hydrating · Cooling · Summer ritual",
    emoji: "🍉",
    color: "#3a0a1a",
    category: "Tropical",
    flavor: "Watermelon & Mint",
    difficulty: "Easy",
    time: "20 min + overnight soak",
    servings: 20,
    highlight: "Lycopene + electrolytes",
    description: "Watermelon is 92% water and one of the richest food sources of lycopene — the antioxidant that protects cells from oxidative damage. Mint adds a cooling digestive effect. Sea moss adds the full mineral spectrum. Together they create a gel that hydrates at a cellular level that no sports drink can match. This is the summer wellness ritual everyone deserves.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "1 cup fresh watermelon juice (blend and strain seeds)",
      "8 fresh mint leaves",
      "¼ cup spring water",
      "Juice of ½ lime",
      "1 tsp honey",
      "Pinch of sea salt",
    ],
    steps: [
      "Blend watermelon chunks and strain seeds. Measure 1 cup juice.",
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss, watermelon juice, spring water, mint leaves, lime, honey, and salt.",
      "Blend 2 full minutes — mint must be completely incorporated.",
      "The gel will be a beautiful light pink.",
      "Refrigerate 2 hours. The mint flavor blooms as it chills.",
    ],
    benefits: ["Deep hydration", "Lycopene", "Electrolyte-rich", "Digestive cooling", "Skin health"],
    dailyUse: "2 tbsp in cold sparkling water as a morning hydration ritual. Or take straight from the jar.",
    tip: "Use seedless watermelon and blend the flesh — the rind contains citrulline, a cardiovascular amino acid.",
    shelfLife: "Refrigerate up to 7 days.",
  },
  {
    id: "sm13",
    name: "Banana Cinnamon Power Gel",
    tagline: "Energy · Prebiotic · Grounding",
    emoji: "🍌",
    color: "#5a4a0a",
    category: "Classic",
    flavor: "Banana & Cinnamon",
    difficulty: "Easy",
    time: "20 min + overnight soak",
    servings: 20,
    highlight: "Resistant starch + 102 minerals",
    description: "Slightly green bananas contain resistant starch — one of the most powerful prebiotic fibers for gut microbiome health. Ceylon cinnamon stabilizes blood sugar. Sea moss completes the mineral profile. This gel is for anyone who wants more energy, better digestion, and a steadier mood throughout the day. It tastes like banana bread in a jar.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "2 ripe bananas",
      "½ tsp Ceylon cinnamon (included)",
      "½ cup spring water",
      "1 tsp raw honey",
      "Pinch of nutmeg",
      "Pinch of sea salt",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Peel and break bananas into chunks.",
      "Blend soaked sea moss, bananas, spring water, cinnamon, nutmeg, honey, and salt.",
      "Blend 2 minutes until completely smooth.",
      "The gel will be cream-colored with warm spice aroma.",
      "Refrigerate 2 hours. Banana thickens the gel beautifully.",
    ],
    benefits: ["Prebiotic fiber", "Blood sugar balance", "Energy", "Potassium-rich", "Digestive health"],
    dailyUse: "2 tbsp in the morning with oat milk. Or straight from the jar as a pre-workout gel.",
    tip: "Use spotty, very ripe bananas for sweetness. Use slightly green bananas for maximum resistant starch.",
    shelfLife: "Refrigerate up to 7 days.",
  },
  {
    id: "sm14",
    name: "Passionfruit Calm Gel",
    tagline: "Exotic · Stress-relieving · Stunning",
    emoji: "🌸",
    color: "#4a1a4a",
    category: "Floral",
    flavor: "Passionfruit",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Harmine alkaloids + 102 minerals",
    description: "Passionfruit contains harmine — a natural beta-carboline alkaloid with documented anxiolytic properties. This exotic, perfumed gel has a complex tropical flavor that feels like a luxury product. It is also deeply calming to the nervous system. The color is a beautiful golden-orange. The aroma is extraordinary. This is the one people will not believe you made at home.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "½ cup fresh passionfruit pulp (about 6 passionfruits)",
      "½ cup spring water",
      "1 tbsp raw honey",
      "Juice of ½ lime",
      "Optional: 1 tsp passionflower tincture for deeper calm",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Scoop pulp from passionfruits — seeds and all.",
      "Blend soaked sea moss, passionfruit pulp, spring water, honey, and lime juice.",
      "Blend 2 full minutes.",
      "Strain through fine mesh if you want a smooth gel — or leave seeds for texture.",
      "The gel will be golden-orange with a floral, tropical aroma.",
      "Refrigerate 2 hours until set.",
    ],
    benefits: ["Anxiety relief", "Nervous system", "Vitamin C", "Potassium", "Sleep support"],
    dailyUse: "2 tbsp in the evening with sparkling water as a calming ritual.",
    tip: "Passionfruit pulp with seeds tastes more complex and authentic. The black seeds are edible and add beautiful visual texture.",
    shelfLife: "Refrigerate up to 10 days.",
  },
  {
    id: "sm15",
    name: "Cacao Ashwagandha Power Gel",
    tagline: "Adaptogenic · Mood-lifting · Ceremonial",
    emoji: "🍫",
    color: "#2a1a0a",
    category: "Superfood",
    flavor: "Cacao & Ashwagandha",
    difficulty: "Easy",
    time: "25 min + overnight soak",
    servings: 20,
    highlight: "Adaptogenic + anandamide",
    description: "Raw cacao contains anandamide — known as the bliss molecule — and is one of the highest food sources of magnesium. Ashwagandha reduces cortisol and builds long-term stress resilience. Sea moss provides the complete mineral foundation. This deep, chocolatey, slightly earthy gel is the most powerful mood and energy formula in the collection. Take it every morning for 30 days and report back. You will not recognize yourself.",
    ingredients: [
      "1 oz dried Irish sea moss (included)",
      "2 tbsp raw cacao powder (not cocoa)",
      "½ tsp ashwagandha powder (included)",
      "½ cup spring water",
      "1 tbsp raw honey or maple syrup",
      "Pinch of sea salt",
      "Optional: ¼ tsp maca powder",
    ],
    steps: [
      "Soak sea moss overnight per Classic recipe.",
      "Blend soaked sea moss with spring water until smooth.",
      "Add raw cacao, ashwagandha, maca (if using), honey, and sea salt.",
      "Blend 2 minutes until completely smooth.",
      "The gel will be dark brown — almost chocolate-colored.",
      "Refrigerate 2 hours until set.",
      "This gel is thicker and firmer than fruit-based versions.",
    ],
    benefits: ["Cortisol reduction", "Magnesium-rich", "Mood elevation", "Stress resilience", "Sustained energy"],
    dailyUse: "1–2 tbsp in the morning blended into oat milk. Or take straight — it tastes like concentrated dark chocolate.",
    tip: "Raw cacao is not the same as cocoa powder — it is cold-processed and retains its anandamide and flavonoid content.",
    shelfLife: "Refrigerate up to 2 weeks.",
  },
];

const CATEGORIES_SM = ["All", "Foundation", "Berry", "Tropical", "Superfood", "Floral", "Functional", "Classic"];

// ─── Pill ─────────────────────────────────────────────────────────────────────
function Pill({ label, color, textColor, small }) {
  return (
    <span style={{
      background: color || "rgba(192,136,48,.15)",
      color: textColor || C.goldLt,
      fontSize: small ? ".58rem" : ".65rem",
      padding: small ? "2px 9px" : "3px 12px",
      borderRadius: 50,
      fontFamily: "'Jost', sans-serif",
      fontWeight: 500, letterSpacing: ".04em",
      whiteSpace: "nowrap", display: "inline-block",
    }}>{label}</span>
  );
}

// ─── Recipe Card ──────────────────────────────────────────────────────────────
function RecipeCard({ r, onOpen }) {
  return (
    <div
      onClick={() => onOpen(r)}
      style={{
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(26,138,106,.25)",
        borderRadius: 20, overflow: "hidden",
        cursor: "pointer",
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,.4)";
        e.currentTarget.style.borderColor = "rgba(26,138,106,.6)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(26,138,106,.25)";
      }}
    >
      {/* Color swatch */}
      <div style={{
        height: 88, flexShrink: 0,
        background: `linear-gradient(135deg, ${r.color}ee, ${r.color}66)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "3rem", position: "relative",
      }}>
        {r.emoji}
        <div style={{
          position: "absolute", top: 10, left: 12,
          background: "rgba(0,0,0,.35)",
          color: "rgba(255,255,255,.8)", fontSize: ".55rem",
          letterSpacing: ".08em", padding: "3px 10px",
          borderRadius: 50, fontFamily: "'Jost', sans-serif",
        }}>{r.category}</div>
        <div style={{
          position: "absolute", top: 10, right: 12,
          background: "rgba(26,138,106,.8)",
          color: "white", fontSize: ".55rem",
          letterSpacing: ".06em", padding: "3px 10px",
          borderRadius: 50, fontFamily: "'Jost', sans-serif",
          fontWeight: 600,
        }}>{r.flavor}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem", color: "white", marginBottom: 4,
        }}>{r.name}</div>
        <div style={{
          fontSize: ".68rem", color: "#2aaa85",
          fontStyle: "italic", marginBottom: 10,
        }}>{r.tagline}</div>
        <p style={{
          fontSize: ".73rem", color: "rgba(255,255,255,.5)",
          lineHeight: 1.65, fontWeight: 300, marginBottom: 12,
          flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{r.description}</p>

        {/* Highlight badge */}
        <div style={{
          background: "rgba(26,138,106,.15)",
          border: "1px solid rgba(26,138,106,.3)",
          borderRadius: 8, padding: "5px 10px",
          marginBottom: 12,
          fontSize: ".65rem", color: "#2aaa85",
          fontFamily: "'Jost', sans-serif",
        }}>
          ✦ {r.highlight}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Pill label={`⏱ ${r.time.split("+")[0].trim()}`} small
            color="rgba(26,138,106,.15)" textColor="#2aaa85" />
          <Pill label={`👤 ${r.servings} servings`} small
            color="rgba(26,138,106,.15)" textColor="#2aaa85" />
          <Pill label={r.difficulty} small
            color="rgba(39,92,62,.35)" textColor="#8ab89a" />
        </div>

        <div style={{
          fontSize: ".62rem", color: "rgba(192,136,48,.55)",
          letterSpacing: ".08em", textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif", textAlign: "right",
        }}>View Recipe →</div>
        <div style={{ marginTop: 8, background: "rgba(26,138,106,.15)", borderRadius: 8, padding: "6px 10px", fontSize: ".61rem", color: "#2aaa85", lineHeight: 1.5 }}>🧴 6 packs · 🥤 Shaker bottle included · 🍯 Honey · <strong style={{color:'#deb96a'}}>${SEAMOSS_KIT_PRICE}</strong></div>
      </div>
    </div>
  );
}

// ─── Recipe Modal ─────────────────────────────────────────────────────────────
function RecipeModal({ r, onClose, onAddToCart }) {
  if (!r) return null;
  return (
    <>
      <style>{`@keyframes smIn{from{opacity:0;transform:scale(.95) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9300,
          background: "rgba(4,15,9,.94)",
          backdropFilter: "blur(16px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, overflowY: "auto",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "#0a1a0f",
            border: "1px solid rgba(26,138,106,.35)",
            borderRadius: 24,
            width: "100%", maxWidth: 580,
            maxHeight: "92vh", overflowY: "auto",
            boxShadow: "0 40px 100px rgba(0,0,0,.8)",
            animation: "smIn .38s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${r.color}ee, ${r.color}99)`,
            padding: "30px 28px 24px",
            borderRadius: "24px 24px 0 0",
            position: "relative",
          }}>
            <button onClick={onClose} style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,.35)", border: "none",
              borderRadius: "50%", width: 34, height: 34,
              color: "white", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
            <div style={{ fontSize: "3rem", marginBottom: 10 }}>{r.emoji}</div>
            <div style={{
              fontSize: ".55rem", letterSpacing: ".2em",
              textTransform: "uppercase", color: "rgba(255,255,255,.6)",
              marginBottom: 6,
            }}>Chai Holistic · Sea Moss Gel · {r.category}</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              color: "white", fontWeight: 400, margin: "0 0 6px",
            }}>{r.name}</h2>
            <p style={{
              fontSize: ".8rem", color: "rgba(255,255,255,.75)",
              fontStyle: "italic", margin: "0 0 14px",
            }}>{r.tagline}</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(26,138,106,.3)",
              border: "1px solid rgba(26,138,106,.5)",
              borderRadius: 50, padding: "5px 14px",
            }}>
              <span style={{ fontSize: ".75rem" }}>✦</span>
              <span style={{ fontSize: ".68rem", color: "#2aaa85", letterSpacing: ".04em" }}>{r.highlight}</span>
            </div>
          </div>

          <div style={{ padding: "24px 28px" }}>
            {/* Meta */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <Pill label={`⏱ ${r.time}`} color="rgba(26,138,106,.15)" textColor="#2aaa85" />
              <Pill label={`👤 ${r.servings} servings`} color="rgba(26,138,106,.15)" textColor="#2aaa85" />
              <Pill label={r.difficulty} color="rgba(39,92,62,.35)" textColor="#8ab89a" />
            </div>

            <p style={{
              fontSize: ".88rem", color: "rgba(255,255,255,.7)",
              lineHeight: 1.85, marginBottom: 20, fontWeight: 300,
            }}>{r.description}</p>

            {/* Benefits */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: ".58rem", letterSpacing: ".14em",
                textTransform: "uppercase", color: "#2aaa85", marginBottom: 10,
              }}>Health Benefits</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.benefits.map(b => (
                  <Pill key={b} label={b}
                    color="rgba(26,138,106,.18)" textColor="#2aaa85" />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(26,138,106,.15)", margin: "20px 0" }}/>

            {/* Ingredients */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem", color: "white", marginBottom: 12,
              }}>Ingredients</div>
              {r.ingredients.map((ing, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "7px 0",
                  borderBottom: i < r.ingredients.length - 1
                    ? "1px solid rgba(255,255,255,.05)" : "none",
                }}>
                  <span style={{ color: "#2aaa85", fontSize: ".75rem", flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{
                    fontSize: ".82rem", color: "rgba(255,255,255,.65)",
                    lineHeight: 1.5, fontWeight: 300,
                  }}>{ing}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: "rgba(26,138,106,.15)", margin: "20px 0" }}/>

            {/* Steps */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem", color: "white", marginBottom: 12,
              }}>Method</div>
              {r.steps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, marginBottom: 12, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: C.aqua,
                    color: "white", fontSize: ".68rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</div>
                  <p style={{
                    fontSize: ".82rem", color: "rgba(255,255,255,.65)",
                    lineHeight: 1.75, margin: 0, fontWeight: 300,
                  }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Daily use */}
            <div style={{
              background: "rgba(26,138,106,.12)",
              border: "1px solid rgba(26,138,106,.3)",
              borderRadius: 12, padding: "14px 18px", marginBottom: 14,
            }}>
              <div style={{
                fontSize: ".58rem", letterSpacing: ".14em",
                textTransform: "uppercase", color: "#2aaa85", marginBottom: 6,
              }}>Daily Use</div>
              <p style={{
                fontSize: ".82rem", color: "rgba(255,255,255,.65)",
                lineHeight: 1.7, margin: 0, fontWeight: 300,
              }}>{r.dailyUse}</p>
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
              <p style={{
                fontSize: ".82rem", color: "rgba(255,255,255,.65)",
                lineHeight: 1.7, margin: 0, fontWeight: 300,
              }}>{r.tip}</p>
            </div>

            {/* Shelf life */}
            <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.3)", textAlign: "center", fontFamily: "'Jost',sans-serif", marginBottom: 20 }}>
              🧊 {r.shelfLife}
            </div>

            {/* Kit ingredient split */}
            <div style={{ background: "rgba(26,138,106,.12)", border: "1px solid rgba(26,138,106,.3)", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#2aaa85", marginBottom: 10 }}>✦ Included in Your Kit (6 packs)</div>
              {r.ingredients.filter(ing => !isSmKitchen(ing)).map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: ".75rem", color: "rgba(255,255,255,.7)" }}>
                  <span style={{ color: "#2aaa85", fontSize: ".6rem" }}>✓</span>{ing}
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(26,138,106,.15)", fontSize: ".6rem", color: "rgba(255,255,255,.35)" }}>
                Included in every kit: shaker bottle · raw honey packet · instruction card
              </div>
            </div>

            {r.ingredients.filter(ing => isSmKitchen(ing)).length > 0 && (
              <div style={{ background: "rgba(192,136,48,.07)", border: "1px solid rgba(192,136,48,.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(192,136,48,.7)", marginBottom: 8 }}>From Your Kitchen</div>
                {r.ingredients.filter(ing => isSmKitchen(ing)).map((ing, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0", fontSize: ".74rem", color: "rgba(255,255,255,.5)" }}>
                    <span style={{ color: "rgba(192,136,48,.5)", fontSize: ".6rem" }}>◇</span>{ing}
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            {onAddToCart && (
              <div style={{ background: "linear-gradient(135deg,rgba(26,138,106,.2),rgba(10,58,42,.4))", border: "1px solid rgba(26,138,106,.4)", borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "white" }}>{r.name} Kit</div>
                    <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.45)", marginTop: 2 }}>6 packs · shaker bottle · raw honey packet · instruction card · everything included</div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#2aaa85", fontWeight: 600 }}>${SEAMOSS_KIT_PRICE}</div>
                </div>
                <button
                  onClick={() => { onAddToCart({ id: r.id + "_kit", name: r.name + " Sea Moss Kit", price: SEAMOSS_KIT_PRICE, emoji: "🌿", qty: 1 }); onClose(); }}
                  style={{ width: "100%", background: "linear-gradient(135deg,#1a8a6a,#0d5a45)", border: "1px solid #2aaa85", color: "white", padding: "13px 20px", borderRadius: 50, fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", fontWeight: 500, cursor: "pointer" }}>
                  🛒 Add Kit to Cart — ${SEAMOSS_KIT_PRICE}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const SEAMOSS_KIT_PRICE = 32;
const SEAMOSS_BUNDLE_PRICE = 52;

const SM_KITCHEN = ["spring water","water","ice","lemon juice","lime juice","coconut milk","oat milk","almond milk","fresh mango","fresh strawberries","fresh lychees","fresh mint","fresh ginger","whole lychees"];

function isSmKitchen(ing) {
  const lower = ing.toLowerCase();
  return SM_KITCHEN.some(k => lower.includes(k)) ||
    lower.startsWith("fresh ") || lower.startsWith("ice") ||
    lower.includes("optional") || lower.includes("to garnish");
}

export default function SeaMossPage({ onAddToCart }) {
  const { T, lang } = useLang();
  // Overlay translated content onto recipe objects
  const tr = (item) => {
    if (!lang || lang === "en") return item;
    const t = getModalContent("seamoss", item.id, lang);
    return t ? { ...item, ...t } : item;
  };
  const [category, setCategory] = useState("All");
  const [search, setSearch]     = useState("");
  const [active, setActive]     = useState(null);
  const [whyOpen, setWhyOpen]   = useState(false);

  const filtered = RECIPES.filter(r => {
    const catOk  = category === "All" || r.category === category;
    const srchOk = !search
      || r.name.toLowerCase().includes(search.toLowerCase())
      || r.flavor.toLowerCase().includes(search.toLowerCase())
      || r.tagline.toLowerCase().includes(search.toLowerCase())
      || r.benefits.some(b => b.toLowerCase().includes(search.toLowerCase()));
    return catOk && srchOk;
  });

  <style>{`
    @media(max-width:600px){
      section{padding-left:1.2rem !important;padding-right:1.2rem !important;}
      [style*="maxWidth: 1200"]{padding-left:1.2rem !important;padding-right:1.2rem !important;}
      [style*="maxWidth: 960"]{padding-left:1.2rem !important;padding-right:1.2rem !important;}
      [style*="flex: 1 1 480px"]{flex:1 1 100% !important;}
      [style*="flex: 0 1 280px"]{flex:1 1 100% !important;}
      [style*="gap: 60"]{gap:32px !important;}
      [style*="fontSize: clamp(2.4rem"]{font-size:clamp(1.8rem,7vw,2.8rem) !important;}
      [style*="maxWidth: 1280"]{padding-left:1.2rem !important;padding-right:1.2rem !important;}
    }
  `}</style>
  return (
    <div id="sec-seamoss-top" style={{ background: C.deep, minHeight: "100vh" }}>
      <style>{`
        @keyframes floatUp {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}
        }
        @keyframes glowPulse {
          0%,100%{opacity:.4} 50%{opacity:.8}
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO — THE ORIGIN STORY
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(160deg, #040f09 0%, #0a2418 40%, #051209 100%)`,
        padding: "72px 2.5rem 64px",
        borderBottom: `3px solid ${C.aqua}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,138,106,.12), transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,136,48,.08), transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.aqua }}/>
            <span style={{
              fontSize: ".6rem", letterSpacing: ".25em",
              textTransform: "uppercase", color: C.aquaL,
            }}>Chai Holistic · Sea Moss Gel Kits</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 60, alignItems: "flex-start" }}>

            {/* Left — headline + story */}
            <div style={{ flex: "1 1 480px" }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                color: "white", fontWeight: 400,
                lineHeight: 1.1, marginBottom: 20,
              }}>
                From Grandmother's<br/>
                Kitchen to<br/>
                <em style={{
                  color: C.aquaL,
                  fontStyle: "italic",
                }}>Your Extraordinary</em><br/>
                Health.
              </h1>

              <div style={{
                width: 60, height: 3,
                background: `linear-gradient(90deg, ${C.aqua}, ${C.gold})`,
                marginBottom: 24, borderRadius: 2,
              }}/>

              {/* The origin story */}
              <div style={{
                background: "rgba(26,138,106,.06)",
                border: "1px solid rgba(26,138,106,.2)",
                borderLeft: `4px solid ${C.aqua}`,
                borderRadius: "0 16px 16px 0",
                padding: "20px 22px",
                marginBottom: 28,
              }}>
                <div style={{
                  fontSize: ".6rem", letterSpacing: ".18em",
                  textTransform: "uppercase", color: C.aquaL,
                  marginBottom: 10,
                }}>The Story Behind the Gel</div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.05rem", fontStyle: "italic",
                  color: "rgba(255,255,255,.85)",
                  lineHeight: 1.85, margin: "0 0 14px",
                }}>
                  "My grandmother made sea moss gel for our entire family. Pineapple. Strawberry. Blackberry. She would prepare it every week without fail — and we never questioned it, we just knew it made us feel different. Stronger. Clearer. Alive in a way that was hard to explain."
                </p>
                <p style={{
                  fontSize: ".82rem", color: "rgba(255,255,255,.55)",
                  lineHeight: 1.8, margin: "0 0 10px", fontWeight: 300,
                }}>
                  What she knew intuitively, science has since confirmed. Irish sea moss contains 92 of the 102 minerals the human body needs to function at its highest level. Every amino acid. Every essential mineral. A complete nutritional foundation that no supplement capsule has ever replicated.
                </p>
                <p style={{
                  fontSize: ".82rem", color: "rgba(255,255,255,.55)",
                  lineHeight: 1.8, margin: 0, fontWeight: 300,
                }}>
                  The Chai Holistic Sea Moss Gel Kits are our way of bringing that tradition to everyone — in 15 flavors, with everything you need included, and the full story of why this ancient Caribbean wellness practice is one of the most powerful things you can do for your body.
                </p>
                <div style={{
                  marginTop: 14,
                  fontSize: ".7rem", color: C.aquaL,
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: ".06em",
                }}>— Alex, Founder of Chai Holistic</div>
              </div>

              {/* Feature badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  "15 Gel Recipes",
                  "92 of 102 minerals",
                  "All flavors included",
                  "Vegan & plant-based",
                  "No additives",
                ].map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(26,138,106,.1)",
                    border: "1px solid rgba(26,138,106,.25)",
                    borderRadius: 50, padding: "5px 14px",
                    fontSize: ".67rem", color: C.aquaL,
                    fontFamily: "'Jost', sans-serif",
                  }}>
                    <span style={{ color: C.aqua }}>✦</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — mineral stats */}
            <div style={{ flex: "0 1 280px" }}>
              <div style={{
                background: "rgba(26,138,106,.08)",
                border: "1px solid rgba(26,138,106,.2)",
                borderRadius: 20, padding: "28px 24px",
                marginBottom: 16,
              }}>
                <div style={{
                  fontSize: ".6rem", letterSpacing: ".2em",
                  textTransform: "uppercase", color: C.aquaL,
                  marginBottom: 20, textAlign: "center",
                }}>What's Inside Sea Moss</div>
                {[
                  ["92", "of 102 minerals your body needs"],
                  ["All 9", "essential amino acids"],
                  ["Iodine", "thyroid & metabolism"],
                  ["Iron", "blood & oxygen"],
                  ["Silica", "collagen & skin"],
                  ["Zinc", "immunity & hormones"],
                  ["Magnesium", "nervous system & sleep"],
                  ["Potassium", "heart & muscle"],
                ].map(([num, label]) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(26,138,106,.1)",
                  }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: ".9rem", color: C.aquaL,
                      fontWeight: 500, flexShrink: 0, minWidth: 70,
                    }}>{num}</div>
                    <div style={{
                      fontSize: ".72rem", color: "rgba(255,255,255,.5)",
                      fontWeight: 300,
                    }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Why Sea Moss button */}
              <button
                onClick={() => setWhyOpen(!whyOpen)}
                style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${C.teal}, ${C.sage})`,
                  border: `1px solid ${C.aqua}`,
                  color: "white", padding: "14px 20px",
                  borderRadius: 50, fontSize: ".75rem",
                  letterSpacing: ".1em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif", fontWeight: 500,
                  cursor: "pointer", transition: "all .22s",
                  boxShadow: "0 6px 24px rgba(26,138,106,.3)",
                }}
              >
                {whyOpen ? "✕ Close" : "✦ Why Sea Moss Changes Everything"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY SEA MOSS — THE SCIENCE (expandable)
      ══════════════════════════════════════════════════════════════ */}
      {whyOpen && (
        <section id="sec-seamoss-why" style={{
          background: `linear-gradient(135deg, #051209, #0a2418)`,
          borderBottom: `1px solid rgba(26,138,106,.2)`,
          padding: "48px 2.5rem",
        }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 30, height: 1, background: C.aqua }}/>
              <span style={{
                fontSize: ".6rem", letterSpacing: ".22em",
                textTransform: "uppercase", color: C.aquaL,
              }}>The Science</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              color: "white", fontWeight: 400,
              lineHeight: 1.2, marginBottom: 28,
            }}>
              Why Sea Moss Turns Normal Health<br/>
              Into <em style={{ color: C.aquaL }}>Extraordinary Health.</em>
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20, marginBottom: 32,
            }}>
              {[
                {
                  icon: "🧬",
                  title: "92 of 102 Minerals",
                  body: "The human body requires 102 minerals to function optimally. Irish sea moss contains 92 of them in bioavailable form — meaning your body can actually absorb and use them, unlike synthetic mineral supplements. No other single food comes close to this mineral density.",
                },
                {
                  icon: "🦋",
                  title: "Complete Amino Acid Profile",
                  body: "Sea moss contains all 9 essential amino acids your body cannot produce on its own. These are the building blocks of protein, neurotransmitters, enzymes, and tissue repair. A single daily serving contributes meaningfully to your body's entire repair and maintenance system.",
                },
                {
                  icon: "🛡️",
                  title: "Thyroid & Metabolism Support",
                  body: "Sea moss is one of the richest natural sources of iodine — the mineral your thyroid depends on to regulate metabolism, energy, mood, and body weight. Iodine deficiency is more common than most people realize, and sea moss addresses it naturally.",
                },
                {
                  icon: "🌱",
                  title: "Gut Health & Prebiotics",
                  body: "The carrageenan and mucilage compounds in sea moss act as powerful prebiotics — feeding beneficial gut bacteria and soothing the intestinal lining. A healthy gut microbiome affects everything from immunity to mental health. Sea moss feeds it directly.",
                },
                {
                  icon: "✨",
                  title: "Collagen & Skin",
                  body: "Sea moss is rich in silica, vitamin C precursors, and sulfur compounds that directly support collagen production. Regular daily use shows visible skin improvements within 2–4 weeks — improved elasticity, reduced inflammation, and a natural glow that comes from the inside.",
                },
                {
                  icon: "💪",
                  title: "Immune System Modulation",
                  body: "The polysaccharides in Irish sea moss have been shown in research to modulate the immune system — not just stimulate it, but intelligently regulate it. This means it supports the immune response when needed and calms it when it is overactive. Exceptional for autoimmune conditions.",
                },
                {
                  icon: "🧠",
                  title: "Brain & Nervous System",
                  body: "Magnesium, potassium, and B vitamins in sea moss directly support nervous system function, neurotransmitter production, and cognitive performance. Many people report improved mental clarity, better sleep, and reduced anxiety within 2–3 weeks of daily use.",
                },
                {
                  icon: "❤️",
                  title: "Heart & Cardiovascular Health",
                  body: "Sea moss's potassium and omega-3 fatty acid content supports healthy blood pressure, reduces triglycerides, and supports arterial elasticity. The fiber content also helps manage cholesterol. It is one of the few foods that addresses cardiovascular health from multiple angles simultaneously.",
                },
              ].map(item => (
                <div key={item.title} style={{
                  background: "rgba(26,138,106,.06)",
                  border: "1px solid rgba(26,138,106,.2)",
                  borderRadius: 16, padding: "20px 18px",
                }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{item.icon}</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: ".95rem", color: "white",
                    marginBottom: 8,
                  }}>{item.title}</div>
                  <p style={{
                    fontSize: ".78rem", color: "rgba(255,255,255,.5)",
                    lineHeight: 1.75, margin: 0, fontWeight: 300,
                  }}>{item.body}</p>
                </div>
              ))}
            </div>

            {/* The bottom line */}
            <div style={{
              background: `linear-gradient(135deg, rgba(26,138,106,.15), rgba(192,136,48,.08))`,
              border: `1px solid rgba(26,138,106,.3)`,
              borderRadius: 20, padding: "28px 32px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "white", fontStyle: "italic",
                lineHeight: 1.6, marginBottom: 12,
              }}>
                "Sea moss does not target one system.<br/>
                It nourishes every system simultaneously.<br/>
                That is why one tablespoon daily feels like<br/>
                the whole body waking up."
              </div>
              <div style={{
                fontSize: ".65rem", color: C.aquaL,
                letterSpacing: ".14em", textTransform: "uppercase",
              }}>— Chai Holistic · Sip &amp; Heal</div>
            </div>
          </div>
        </section>
      )}

      {/* ── Shaker Bottle Section ─────────────────────────────────────────── */}
      <section style={{ background: "rgba(26,138,106,.06)", borderBottom: "1px solid rgba(26,138,106,.15)", padding: "28px 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(26,138,106,.3)", flexShrink: 0 }}><img src="/shaker-bottle.jpg" alt="Chai Holistic Shaker Bottle" style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "white", marginBottom: 2 }}>Includes a Shaker Bottle</div>
                <div style={{ fontSize: ".65rem", color: "#2aaa85", letterSpacing: ".08em" }}>Included in every kit — no blender, no electricity, works anywhere</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}>
              {[
                { icon: "🚫💧", title: "No-Leak Lid", desc: "Secure screw-on lid + flip-top spout. Gym bag, commute, or jog — no messes." },
                { icon: "⚡", title: "Smooth Mix", desc: "Stainless steel shaker ball. No clumps, removable for easy rinsing in seconds." },
                { icon: "📏", title: "20 oz Capacity", desc: "Clear cup with measurement marks to 16 oz. See exactly what you're blending." },
                { icon: "🧼", title: "Dishwasher Safe", desc: "Easy cleanup. Hand-wash tip: rinse right after use and air-dry with lid open." },
              ].map(f => (
                <div key={f.title} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(26,138,106,.15)", borderRadius: 12, padding: "10px 14px", flex: "1 1 160px", minWidth: 140 }}>
                  <div style={{ fontSize: ".6rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#2aaa85", marginBottom: 4 }}>{f.icon} {f.title}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.45)", lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.35)", marginBottom: 6 }}>{T.sm_want_spare || "Want a spare?"}</div>
              <button
                onClick={() => onAddToCart && onAddToCart({ id: "shaker_extra", name: "Extra Shaker Bottle", price: 8, emoji: "🥤" })}
                style={{ background: "rgba(26,138,106,.15)", border: "1px solid rgba(26,138,106,.4)", color: "#2aaa85", padding: "8px 18px", borderRadius: 50, fontSize: ".68rem", letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                {T.sm_add_shaker || "+ Add a Spare Shaker Bottle — $8"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FILTERS
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: C.forest,
        borderBottom: "1px solid rgba(26,138,106,.15)",
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
            placeholder={T.sm_search_placeholder || "Search by flavor, benefit..."}
            style={{
              flex: "1 1 180px", minWidth: 160,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(26,138,106,.25)",
              borderRadius: 50, padding: "8px 16px",
              fontSize: ".78rem", color: "white",
              fontFamily: "'Jost', sans-serif", outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = C.aqua}
            onBlur={e => e.target.style.borderColor = "rgba(26,138,106,.25)"}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES_SM.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                background: category === c ? C.aqua : "transparent",
                color: category === c ? "white" : "rgba(255,255,255,.55)",
                border: `1.5px solid ${category === c ? C.aqua : "rgba(26,138,106,.2)"}`,
                borderRadius: 50, padding: "5px 14px",
                fontSize: ".68rem", letterSpacing: ".05em",
                fontFamily: "'Jost', sans-serif",
                cursor: "pointer", transition: "all .18s",
              }}>{c}</button>
            ))}
          </div>
          <span style={{
            marginLeft: "auto", fontSize: ".68rem",
            color: "rgba(26,138,106,.5)", flexShrink: 0,
          }}>{filtered.length} recipe{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RECIPE GRID
      ══════════════════════════════════════════════════════════════ */}
      <div id="sec-seamoss-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 2.5rem 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.4)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🌊</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem", color: "white", marginBottom: 8,
            }>{T.sm_no_results || "No recipes found"}</div>
            <div style={{ fontSize: ".85rem" }}>{T.sm_no_results_sub || "Try clearing your search or filters."}</div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: 18,
          }}>
            {filtered.map(r => (
              <RecipeCard key={r.id} r={tr(r)} onOpen={setActive} />
            ))}
          </div>
        )}

        {/* Bottom section */}
        <div style={{
          marginTop: 70,
          borderTop: "1px solid rgba(26,138,106,.15)",
          paddingTop: 40,
        }}>
          {/* How to use section */}
          <div style={{
            background: "rgba(26,138,106,.06)",
            border: "1px solid rgba(26,138,106,.2)",
            borderRadius: 20, padding: "32px",
            marginBottom: 32,
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem", color: "white",
              fontWeight: 400, marginBottom: 20,
            }>{T.sm_how_to_use || "How to Use Sea Moss Gel Daily"}</h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}>
              {[
                ["🥤", "Smoothies", "Add 1–2 tbsp to any smoothie. It dissolves completely and adds silky texture without changing the flavor."],
                ["☕", "Tea & Coffee", "Stir 1 tbsp into your morning tea or coffee. It melts right in — your cup becomes a mineral supplement."],
                ["🥣", "Oatmeal & Porridge", "Stir into warm oatmeal or overnight oats. The gel thickens beautifully and adds complete nutrition."],
                ["🧁", "Baking", "Replace eggs or gelatin in recipes — sea moss gel binds and sets beautifully in both sweet and savory baking."],
                ["🍵", "Straight", "Take 1–2 tbsp directly from the jar each morning as your daily wellness ritual. The flavored gels are designed for this."],
                ["🍲", "Soups & Stews", "Stir the neutral base gel into soups or stews as a thickener and mineral boost. No one will know it is there."],
              ].map(([emoji, title, desc]) => (
                <div key={title} style={{
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{emoji}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: ".78rem", color: C.aquaL,
                    fontWeight: 600, marginBottom: 6,
                  }}>{title}</div>
                  <p style={{
                    fontSize: ".72rem", color: "rgba(255,255,255,.45)",
                    lineHeight: 1.65, margin: 0, fontWeight: 300,
                  }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing quote */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontStyle: "italic",
              color: "rgba(255,255,255,.5)", marginBottom: 10, lineHeight: 1.7,
            }}>
              {T.sm_quote || "She made it every week without fail. Now you can too."}
            </div>
            <div style={{
              fontSize: ".6rem", color: C.aquaL,
              letterSpacing: ".18em", textTransform: "uppercase",
            }}>— Chai Holistic · Sea Moss Gel Kits</div>
          </div>
        </div>
      </div>

      {active && <RecipeModal r={tr(active)} onClose={() => setActive(null)} onAddToCart={onAddToCart} />}
    </div>
  );
}
