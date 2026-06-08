import { useState } from "react";

// ─── ANCESTRAL TEA COLLECTION ─────────────────────────────────────────────────
// These recipes come from two lineages: Jamaican bush medicine and Indian
// Ayurvedic tradition. They were preserved not in books but in kitchens,
// in yards, in the hands of grandmothers who knew plants the way we know
// phone numbers. We are writing them down before they travel any further
// from memory.
//
// A note on sourcing: Many of these herbs — especially the Jamaican bush
// varieties — are not available in mainstream stores. We list where to find
// them honestly. Some can only be found fresh in Caribbean or South Asian
// communities. That difficulty is part of their story.

// ─── SAFETY LEVELS ───────────────────────────────────────────────────────────
// GREEN  — generally safe for most healthy adults
// AMBER  — use with awareness; some populations should avoid
// RED    — consult your doctor before using; real drug interactions exist

const COLLECTIONS = [
  {
    id: "yard",
    title: "From the Yard",
    subtitle: "Jamaican Bush Tea Traditions",
    emoji: "🌿",
    color: "#0A2A0A",
    accentColor: "#4A8A4A",
    intro: `Bush tea in Jamaica is not a trend. It is a survival tradition — knowledge carried through generations by women who grew medicine in their yards, along their fences, and up their mango trees. This collection begins with my grandmother's cerasee, made exactly as she taught. The rest follows the same philosophy she lived by: the earth provides what the body needs. You just have to know how to ask.`,
    credit: "— Alex, Chai Holistic",
    teas: [
      {
        id: "cerasee",
        name: "Grandmother's Cerasee",
        botanicalName: "Momordica charantia",
        localNames: ["Cerasee", "Cerassee", "Bitter Melon Vine", "Carilla"],
        origin: "Jamaica — the vine growing along the fence and up the mango tree",
        emoji: "🌿",
        safety: "RED",
        safetyLabel: "⚠ Consult Your Doctor First",
        tagline: "The blood cleanser. The sugar balancer. The most important warning on this site.",
        story: `My grandmother grew cerasee along the back fence and up the mango tree. She picked the fresh vine — stems and leaves both — and boiled them in a half pot of water down to a deep, bitter green concentrate. That concentrate was everything. She drank it for her blood and her sugar. She added it to bath water to wash us. She made soap from it to bathe the babies. She knew what she was doing. The science has spent decades catching up to her.`,
        whyItWorks: `Cerasee contains over 228 identified bioactive compounds including charantin, polypeptide-p, and vicine — three substances that mimic insulin activity and improve cellular glucose uptake. A meta-analysis in the Journal of Ethnopharmacology confirmed significant fasting blood glucose reduction across nine controlled trials. Your grandmother was prescribing insulin-mimicking medicine. She just grew it in the yard.`,
        ingredients: [
          "1 good handful of fresh cerasee vine — stems and leaves both",
          "Half pot of water (approximately 4–5 cups)",
          "Honey or maple syrup to taste (optional — the bitterness is the medicine)",
        ],
        method: [
          "Rinse the fresh vine and leaves thoroughly under cold water.",
          "Place the whole handful — stems and leaves — into half a pot of cold water.",
          "Bring to a full boil, then reduce heat and simmer uncovered for 20–25 minutes.",
          "The water will turn a deep greenish-brown. This is the concentrate.",
          "Strain well. Press the vine against the strainer to extract everything.",
          "For drinking: pour a small cup of concentrate (about 4oz). This is potent. Do not drink the full pot.",
          "Sweeten with honey if needed. Drink slowly.",
          "For bath use: dilute 1 part concentrate to 3–5 parts warm bath water.",
        ],
        when: "Weekly for blood cleansing. Not daily unless under medical supervision.",
        steepNote: "This is a decoction — boiled, not steeped. The boiling extracts compounds that hot water alone cannot reach.",
        sensory: "Intensely bitter, dark green-brown, earthy. The bitterness does not mean something is wrong. It means the medicine is working.",
        sourceNote: "Fresh cerasee vine is available at Caribbean grocery stores, Jamaican markets, and some South Asian grocers (sold as bitter melon vine or karela vine). Dried cerasee tea bags are available online — the fresh vine is more potent.",

        // THE WARNING ALEX SPECIFICALLY REQUESTED — displayed prominently
        criticalWarning: {
          headline: "⚠ IMPORTANT SAFETY WARNING — Please Read Before Using",
          points: [
            "Cerasee can lower blood glucose levels very rapidly — this is not a gentle herb. It contains compounds that act like insulin in the body.",
            "If you are taking ANY diabetes medication — metformin, insulin, glipizide, or any other blood sugar-lowering drug — cerasee can cause your blood sugar to drop dangerously low. This is a real medical risk, not a precaution.",
            "Dangerously low blood sugar (hypoglycemia) can cause dizziness, sweating, confusion, shaking, loss of consciousness, and in severe cases can be life-threatening.",
            "Do not use cerasee if you are pregnant. It contains compounds that can cause uterine contractions and has been associated with miscarriage.",
            "Do not give cerasee tea to young children or infants internally. The topical bath use your grandmother used is different from drinking it.",
            "Even without diabetes medication, the dose matters. A small cup of concentrate is very different from drinking a full pot.",
            "Tell your doctor you are using cerasee before any blood sugar test — it will affect your results.",
          ],
          closing: "My grandmother used cerasee safely for decades because she understood the dose. She made a concentrate and used it carefully — not because she was being cautious, but because she respected the plant. Please do the same. Consult your doctor before adding cerasee to your routine, especially if you manage any blood sugar condition.",
          closingCredit: "— Alex",
        },

        additionalUses: [
          { use: "Herbal Bath", note: "Dilute concentrate 3:1 or 5:1 in warm bath water. Antimicrobial and anti-inflammatory for skin conditions, rashes, and general cleansing. Traditional Jamaican practice for all ages including infants (topical only)." },
          { use: "Skin Compress", note: "Soak a cloth in diluted concentrate and apply to skin irritations, rashes, or fungal conditions. Antimicrobial properties are well-documented." },
        ],

        notForSale: true,
        notForSaleNote: "We do not sell fresh cerasee vine. This recipe is shared to preserve and honor the tradition. Find fresh vine at Caribbean or South Asian grocers.",
        supplementPairing: null,
        tags: ["Jamaican", "Bush Tea", "Blood Sugar", "Detox", "Ancestral", "External Use"],
      },

      {
        id: "fever-grass",
        name: "Fever Grass Tea",
        botanicalName: "Cymbopogon citratus",
        localNames: ["Fever Grass", "Lemongrass", "Cymbopogon"],
        origin: "Jamaica — grows wild in rural yards, harvested fresh",
        emoji: "🌾",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "For fever, stress, sleep, and the specific kind of tired that comes from carrying too much.",
        story: `Everybody in Jamaica knows fever grass. It grows wild along the roads and in every yard. You break a stalk and the citrus smell tells you everything — bright, clean, alive. Jamaican grandmothers reached for it at the first sign of fever in a child, the first cough of the season, the night when sleep wouldn't come. It is one of the most approachable herbs in the tradition — bitter enough to be medicine, pleasant enough that children didn't fight it.`,
        whyItWorks: `Lemongrass contains citral — a compound with documented antimicrobial, antifungal, and anti-inflammatory activity. The volatile oils act as mild sedatives that reduce nervous system arousal without pharmaceutical-grade sedation. Research confirms traditional use for fever reduction, anxiety, and sleep quality. The citrus aroma alone has measurable effects on cortisol.`,
        ingredients: [
          "3–4 fresh fever grass stalks (or 2 tbsp dried lemongrass)",
          "2 cups water",
          "Honey and fresh lime to taste",
          "Optional: a small piece of fresh ginger for added warmth",
        ],
        method: [
          "Crush or bruise the fever grass stalks — bend them, twist them, release the oil.",
          "Bring water to a boil and add the stalks.",
          "Reduce heat and simmer 10 minutes.",
          "Strain into a cup. The liquid should be pale gold.",
          "Add honey and a squeeze of lime while still warm.",
          "Drink hot for fever. Drink cooled for everyday calm.",
        ],
        when: "Morning for gentle energy. Evening for sleep. Any time fever or cold symptoms appear.",
        steepNote: "Bruising the stalks before boiling is essential — it releases the essential oils that make this tea work.",
        sensory: "Bright lemon-citrus aroma, light golden color, refreshing with underlying warmth. Children generally accept this without complaint.",
        sourceNote: "Fresh lemongrass stalks are widely available at Asian and Caribbean grocery stores and many supermarkets. Dried lemongrass works but loses some volatile oil potency.",
        criticalWarning: null,
        additionalUses: [
          { use: "Steam Inhalation", note: "Add stalks to a pot of boiling water, drape a towel over your head, and inhale the steam for sinus congestion and respiratory support." },
        ],
        notForSale: false,
        supplementPairing: { name: "Magnesium Glycinate", why: "Magnesium works on the same nervous system pathways fever grass soothes. Together they address sleep and anxiety from two directions." },
        tags: ["Jamaican", "Bush Tea", "Fever", "Sleep", "Immune", "Child-Safe"],
      },

      {
        id: "soursop-leaf",
        name: "Soursop Leaf Tea",
        botanicalName: "Annona muricata",
        localNames: ["Soursop Leaf Tea", "Guanabana Leaf", "Graviola"],
        origin: "Jamaica and throughout the Caribbean",
        emoji: "🍃",
        safety: "AMBER",
        safetyLabel: "Use With Awareness",
        tagline: "For blood pressure, pain, and the deep sleep that eludes the worried mind.",
        story: `The soursop tree gives twice — first the fruit, sweet and tart and cooling on a hot day, and then the leaves, which do something entirely different. Jamaican grandmothers brewed the leaves for blood pressure, for pain in the joints, for the nights when a person couldn't find rest. There is more research behind soursop leaf than most people realize, and some of it is significant enough to have attracted pharmaceutical interest. The grandmothers were ahead of that interest by generations.`,
        whyItWorks: `Soursop leaves contain acetogenins — compounds with demonstrated anti-inflammatory, antispasmodic, and vasodilatory activity. Studies show significant blood pressure-lowering effects. Annonacin and other alkaloids contribute to analgesic (pain-reducing) properties. Population studies in Jamaica show consistent use for hypertension management alongside conventional medication. Note: the same alkaloids that create therapeutic benefit at tea doses have attracted cancer research interest, though no clinical trials have confirmed anti-cancer efficacy in humans.`,
        ingredients: [
          "3–5 fresh soursop leaves (or 2 tbsp dried)",
          "2 cups water",
          "Honey to taste",
        ],
        method: [
          "Rinse leaves thoroughly.",
          "Bring water to a boil and add leaves.",
          "Simmer 15 minutes on medium-low heat.",
          "Strain and sweeten with honey.",
          "Drink one cup, not more than once daily.",
        ],
        when: "Evening, for blood pressure and sleep. Not on an empty stomach.",
        steepNote: "This is a gentle simmer, not a hard boil — soursop leaves release their compounds slowly.",
        sensory: "Mild, slightly grassy, with a faint floral quality. More approachable than cerasee. Honey makes it pleasant.",
        sourceNote: "Fresh soursop leaves are available at Caribbean grocery stores. Dried leaves available online from Caribbean herb suppliers.",
        criticalWarning: {
          headline: "⚠ Use With Awareness",
          points: [
            "May lower blood pressure — do not use if already on antihypertensive medication without medical supervision.",
            "High-dose or very long-term use (months) of concentrated soursop preparations has been associated with nervous system effects in some research. As a tea at normal doses, this risk is low — but moderation matters.",
            "Not for use during pregnancy.",
            "If you have Parkinson's disease or a history of neurological conditions, consult your doctor before use.",
          ],
          closing: "Use as the tradition intended — occasionally, thoughtfully, one cup at a time.",
          closingCredit: "— Alex",
        },
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Omega-3 (Nordic Naturals)", why: "Omega-3s work on cardiovascular inflammation that soursop leaf's vasodilatory compounds address from the nervous system side." },
        tags: ["Jamaican", "Bush Tea", "Blood Pressure", "Pain", "Sleep", "Ancestral"],
      },

      {
        id: "bissy",
        name: "Bissy Tea",
        botanicalName: "Cola acuminata",
        localNames: ["Bissy", "Kola Nut Tea", "Cola Nut"],
        origin: "Jamaica via West Africa — arrived with the African diaspora",
        emoji: "🌰",
        safety: "AMBER",
        safetyLabel: "Use With Awareness — Contains Natural Caffeine",
        tagline: "The antidote. For food poisoning, toxins, and the body asking for help.",
        story: `Bissy is the emergency tea of Jamaican bush medicine. When someone ate something wrong, when the stomach turned, when the body signaled poison — the bissy nut went into the pot. It came to Jamaica from West Africa, carried by enslaved people who knew exactly what it could do. That knowledge survived the Middle Passage and took root in Jamaican yards. Bissy is one of the clearest examples of African medicinal knowledge preserved in Caribbean bush tradition — and it works.`,
        whyItWorks: `Kola nut contains caffeine and theobromine — two alkaloids with documented stimulant and vasodilatory properties — plus tannins with astringent and antimicrobial activity. Traditional use for food poisoning is supported by its tannin content, which can bind to bacterial toxins in the digestive tract. Jamaican bush medicine specifically reserves bissy for toxic ingestion and post-illness recovery, which aligns with its documented pharmacological activity.`,
        ingredients: [
          "1 tbsp grated fresh bissy nut (or 1 tbsp powdered kola nut)",
          "2 cups water",
          "Honey to taste",
        ],
        method: [
          "Grate or powder the bissy nut finely.",
          "Add to cold water and bring to a simmer.",
          "Simmer 10 minutes. Do not boil hard — it becomes too bitter.",
          "Strain well through a fine cloth.",
          "Sweeten with honey.",
          "Drink one cup slowly. Wait and see how the body responds.",
        ],
        when: "Specifically when the body shows signs of toxic exposure or food poisoning. Not a daily tea — reserved for when it's needed.",
        steepNote: "Traditional Jamaican use is specific and purposeful. Bissy is not a daily wellness tea. It is called upon for a reason.",
        sensory: "Bitter, astringent, slightly woody. Not pleasant — but then, it is not meant to be pleasant. It is meant to work.",
        sourceNote: "Fresh bissy nut available at Jamaican specialty stores. Powdered kola nut available from African and Caribbean herb suppliers online.",
        criticalWarning: {
          headline: "⚠ Use With Awareness",
          points: [
            "Contains natural caffeine — avoid in the evening and if caffeine-sensitive.",
            "Not for use during pregnancy.",
            "If symptoms of food poisoning are severe — high fever, blood, inability to keep fluids down — seek medical attention immediately. Bissy is supportive, not a substitute for emergency care.",
          ],
          closing: "Use as the tradition intended — purposefully and occasionally.",
          closingCredit: "— Alex",
        },
        additionalUses: [],
        notForSale: false,
        supplementPairing: null,
        tags: ["Jamaican", "Bush Tea", "African Heritage", "Digestive", "Detox", "Ancestral"],
      },

      {
        id: "moringa",
        name: "Moringa Leaf Tea",
        botanicalName: "Moringa oleifera",
        localNames: ["Moringa", "Drumstick Tree", "Miracle Tree", "Malunggay"],
        origin: "Jamaica and India — one herb, two traditions",
        emoji: "🌱",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "The tree that fed two continents. The bridge between your grandmothers.",
        story: `This is the herb where Jamaica and India meet on your family tree. Moringa grows in Jamaican yards and in Indian villages. It is called the miracle tree on both sides of the world — not by marketing, but by the communities who have eaten and brewed it for survival. In Jamaica it grows tall and fast and the leaves are stripped and boiled. In India the drumstick pods go into dal and the dried leaf powder goes into everything. The plant is the same. The wisdom is the same. The grandmothers just spoke different languages.`,
        whyItWorks: `Moringa leaves contain 7x the vitamin C of oranges, 4x the calcium of milk, 4x the vitamin A of carrots, and 2x the protein of yogurt by weight. This is not marketing — these are documented nutritional values. It also contains quercetin (anti-inflammatory), chlorogenic acid (blood sugar modulation), and isothiocyanates with documented anti-inflammatory activity. Both Jamaican and Ayurvedic traditions reached the same plant for the same reasons — because the body told them it worked.`,
        ingredients: [
          "1 tbsp fresh moringa leaves (or 1 tsp dried moringa leaf powder)",
          "2 cups water",
          "Fresh ginger slice optional",
          "Honey and lime to taste",
        ],
        method: [
          "If using fresh leaves: rinse and add directly to boiling water.",
          "If using powder: whisk into hot (not boiling) water to preserve nutrients.",
          "Steep or simmer 5–7 minutes.",
          "Strain and add honey and lime.",
          "Can be drunk daily — this is a nutritional tea as much as a medicinal one.",
        ],
        when: "Morning, as a nutritional foundation. Can be combined with other herbs.",
        steepNote: "Do not boil moringa powder — heat destroys some of its delicate nutrients. Add to hot water just off the boil.",
        sensory: "Earthy, mildly grassy, vegetal — like drinking a garden in the best way. Honey and lime make it genuinely pleasant.",
        sourceNote: "Fresh moringa leaves available at Caribbean, South Asian, and some African grocery stores. Dried leaf powder widely available online.",
        criticalWarning: null,
        additionalUses: [
          { use: "Nutritional Addition", note: "Moringa powder can be added to smoothies, soups, and other teas as a nutritional booster without changing the flavor significantly." },
        ],
        notForSale: false,
        supplementPairing: { name: "Vitamin D3+K2", why: "Moringa provides exceptional plant-based nutrition. Vitamin D3+K2 adds what plants cannot provide — the fat-soluble vitamins that govern calcium and immune regulation." },
        tags: ["Jamaican", "Indian", "Bush Tea", "Ayurvedic", "Nutritional", "Daily", "Bridge"],
      },

      {
        id: "clove-jm",
        name: "Jamaican Clove Tea",
        botanicalName: "Syzygium aromaticum",
        localNames: ["Clove Tea", "Clove Bush Tea"],
        origin: "Jamaica — a spice that became medicine in every grandmother's kitchen",
        emoji: "🌸",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "For cold, toothache, digestion, and the chest congestion that won't let go.",
        story: `Cloves arrived in Jamaica through trade and stayed through necessity. Every grandmother's kitchen had them — in the spice drawer and in the remedy box, which were really the same drawer. When cold season came, when a tooth ached in the night, when the chest tightened with congestion — the cloves went into a pot of water. Simple. Direct. Effective. The Jamaican tradition used cloves alone or with ginger and honey, and the resulting tea was both medicine and comfort in a single cup.`,
        whyItWorks: `Cloves contain eugenol — one of the most potent natural antimicrobials known to science. Eugenol concentration in quality cloves ranges from 72–90%. It acts as an analgesic (pain reliever), antifungal, antiviral, and anti-inflammatory. The warmth you feel drinking clove tea is not imagined — cloves genuinely increase circulation and body temperature slightly, which supports immune response. Jamaican and Indian grandmothers both understood this. They arrived at the same herb through different routes.`,
        ingredients: [
          "8–10 whole cloves",
          "2 cups water",
          "1 small piece fresh ginger (optional but traditional)",
          "Honey to taste",
          "Squeeze of lime (optional)",
        ],
        method: [
          "Lightly crush the cloves with the back of a spoon — just enough to crack them open.",
          "Add cloves and ginger to cold water and bring to a boil.",
          "Reduce heat and simmer 10 minutes.",
          "The water will deepen to a warm amber.",
          "Strain carefully — clove pieces are sharp.",
          "Sweeten with honey. Add lime if desired.",
          "Drink warm. Inhale the steam before each sip.",
        ],
        when: "At the first sign of cold or chest congestion. For toothache, hold the liquid at the affected area briefly. For digestion, drink after meals.",
        steepNote: "Crushing the cloves releases eugenol into the water. Whole uncrushed cloves produce a much weaker tea.",
        sensory: "Intensely warm, spiced, deeply aromatic. The smell fills the room. This is the tea you know someone is sick by when you walk into the house.",
        sourceNote: "Whole cloves are available everywhere. Use the freshest cloves you can find — older spices have less eugenol. Store in airtight containers away from heat.",
        criticalWarning: null,
        additionalUses: [
          { use: "Toothache Relief", note: "Clove tea held against an aching tooth delivers eugenol's analgesic properties directly. This is what clove oil in dentistry is based on." },
          { use: "Steam Inhalation", note: "Add extra cloves to a pot of boiling water and inhale steam under a towel for chest congestion and sinus pressure." },
        ],
        notForSale: false,
        supplementPairing: { name: "Liposomal Vitamin C", why: "Cloves support immune response from within. Liposomal C provides the antioxidant capacity at the cellular level that immune herbs cannot match on their own." },
        tags: ["Jamaican", "Bush Tea", "Cold & Flu", "Immune", "Pain", "Digestive", "Both Traditions"],
      },
    ],
  },

  {
    id: "kitchen",
    title: "From the Kitchen",
    subtitle: "Indian Ancestral Brews — Ayurvedic Tradition",
    emoji: "🪔",
    color: "#2A1A0A",
    accentColor: "#C8893A",
    intro: `Ayurveda is 5,000 years old. It is the oldest continuously practiced medical system on earth, and it was never alternative medicine — it was the medicine. Every recipe in this collection comes from that tradition, passed through an Indian family line that crossed the ocean but kept the knowledge. These are not recipes from a wellness blog. They are prescriptions from grandmothers who knew the body as a system that needed to be kept in balance every single day.`,
    credit: "— Alex, Chai Holistic",
    teas: [
      {
        id: "kadha",
        name: "The Original Kadha",
        botanicalName: "Tulsi · Ginger · Clove · Black Pepper · Cinnamon",
        localNames: ["Kadha", "Kaadha", "Kwath", "Ayurvedic Decoction"],
        origin: "India — the immunity protocol that survived every epidemic",
        emoji: "🪔",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "The immune protocol your Indian great-grandmother made every cold season. Still unmatched.",
        story: `When COVID arrived, India reached for kadha — and the world noticed. What the world didn't realize was that Indian families had been making this exact preparation for thousands of years, not just for pandemic response but as a regular seasonal ritual. Your Indian grandmothers made kadha the way your Jamaican grandmothers made bush tea: without a recipe, without measuring, from memory. The spices from the kitchen shelf, the tulsi from the pot by the door, the ginger from the root box. Assembled by feel. The result was a decoction that has survived 5,000 years of recorded use — and counting.`,
        whyItWorks: `Tulsi (holy basil) is an adaptogen with antiviral properties and cortisol-modulating effects. Ginger contains gingerols — potent anti-inflammatories and antimicrobials with documented activity against respiratory pathogens. Black pepper's piperine increases the bioavailability of curcumin by 2,000% and enhances absorption of every other compound in the cup. Cloves add eugenol — the same antimicrobial compound in your Jamaican clove tea. Cinnamon regulates blood sugar and adds antimicrobial activity. Together, these five ingredients create synergistic effects that no single ingredient achieves alone. Ayurveda understood synergy before pharmacology named it.`,
        ingredients: [
          "8–10 fresh tulsi (holy basil) leaves — or 1 tsp dried",
          "1 inch fresh ginger root, grated or sliced",
          "5 whole cloves, lightly crushed",
          "8–10 black peppercorns, lightly crushed",
          "1 small cinnamon stick",
          "2.5 cups water",
          "Raw honey and lemon to taste",
          "Optional: 1 cardamom pod, cracked",
        ],
        method: [
          "Add all spices and herbs to cold water in a small pot.",
          "Bring to a full boil, then reduce to a steady simmer.",
          "Simmer uncovered for 10–15 minutes until liquid reduces by about a third.",
          "The liquid should be deep amber and intensely aromatic.",
          "Strain through a fine mesh strainer.",
          "Add honey only after the liquid cools slightly — never boil honey.",
          "Add fresh lemon juice. Drink hot.",
        ],
        when: "Morning during cold and flu season. Evening before bed during illness. Up to 2–3 times per day during active symptoms.",
        steepNote: "The reduction is important — you want concentration, not dilution. Kadha is not a subtle tea. It is intentionally strong.",
        sensory: "Warm, spiced, complex, with a peppery heat that builds slowly. The tulsi gives it a slightly clove-like herbal note. It smells like medicine and comfort simultaneously.",
        sourceNote: "Fresh tulsi is available at South Asian grocery stores and can be grown easily in a pot. Dried tulsi widely available online. All other ingredients are pantry staples.",
        criticalWarning: null,
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Vitamin D3+K2", why: "Kadha activates the immune system from within. Vitamin D3 is the master regulator of immune response — deficiency blunts the effect of everything else." },
        tags: ["Indian", "Ayurvedic", "Immune", "Cold & Flu", "Ancestral", "Daily"],
      },

      {
        id: "tulsi-alone",
        name: "Tulsi — The Sacred Herb",
        botanicalName: "Ocimum tenuiflorum",
        localNames: ["Tulsi", "Holy Basil", "Sacred Basil", "Vrinda"],
        origin: "India — grown in every Hindu household, placed at the door",
        emoji: "🌿",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "The herb that lives by the door. For stress, immunity, and the clarity that comes from stillness.",
        story: `In India, the tulsi plant lives outside the front door. Not as decoration — as protection. Every morning, the household acknowledges it. Children are taught its name before many others. When someone is sick, the leaves go into the pot. When someone is stressed, the leaves go into the pot. When someone needs clarity before an important decision, the leaves go into the pot. Tulsi is the most consistently used herb in 5,000 years of Ayurvedic practice — not because of tradition alone, but because it keeps working.`,
        whyItWorks: `Tulsi is an adaptogen — a plant that helps the body regulate its stress response by modulating the hypothalamic-pituitary-adrenal (HPA) axis, the same system targeted by ashwagandha and rhodiola. It contains eugenol, rosmarinic acid, and various flavonoids with antiviral, antibacterial, and anti-inflammatory activity. Research shows consistent cortisol-lowering effects with regular use, plus immune modulation that increases natural killer cell activity. It is safe for daily use in a way that stronger adaptogens are not.`,
        ingredients: [
          "10–15 fresh tulsi leaves (or 1.5 tsp dried)",
          "2 cups water",
          "Fresh ginger slice optional",
          "Honey and lemon to taste",
        ],
        method: [
          "Rinse fresh tulsi leaves thoroughly.",
          "Bring water to a boil and add tulsi leaves.",
          "Simmer gently for 5 minutes — do not boil hard, it drives off volatile oils.",
          "Steep an additional 5 minutes off heat, covered.",
          "Strain and add honey and lemon.",
          "Drink slowly and quietly if possible. Tulsi rewards stillness.",
        ],
        when: "Daily, as a morning ritual. During stress. Before meditation or prayer. Anytime the mind needs to slow down.",
        steepNote: "The gentle approach matters here — tulsi's volatile oils, which carry much of its adaptogenic activity, evaporate in aggressive boiling. Simmer then steep.",
        sensory: "Clove-like, slightly peppery, deeply herbal with a warmth that is both physical and calming. Unlike most herbs, tulsi changes flavor slightly with each sip as you drink it.",
        sourceNote: "Fresh tulsi is the most effective form and can be grown in any pot in a sunny window. Look for it at South Asian grocery stores. Dried tulsi available widely.",
        criticalWarning: null,
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Ashwagandha KSM-66", why: "Tulsi and ashwagandha are the two most studied Ayurvedic adaptogens. Tulsi in the cup, ashwagandha as a supplement — the HPA axis addressed from two angles simultaneously." },
        tags: ["Indian", "Ayurvedic", "Stress", "Immune", "Adaptogen", "Daily", "Spiritual"],
      },

      {
        id: "haldi-doodh",
        name: "Haldi Doodh — Golden Milk",
        botanicalName: "Curcuma longa · Piper nigrum",
        localNames: ["Haldi Doodh", "Golden Milk", "Turmeric Milk", "Haldi Wala Doodh"],
        origin: "India — the bedtime preparation that Ayurveda prescribed before Western medicine discovered curcumin",
        emoji: "✨",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "Not a trend. A 3,000-year-old prescription that Western medicine finally caught up to.",
        story: `Long before golden milk appeared on café menus and Instagram feeds, Indian grandmothers were warming milk with turmeric and handing it to children at bedtime. They didn't know what curcumin was. They didn't need to. They knew that haldi in warm milk reduced the swelling in a sore joint, calmed a fevered child, helped a person sleep when pain was keeping them awake. The science took 3,000 years to catch up. The grandmothers were right the whole time.`,
        whyItWorks: `Turmeric's curcumin is one of the most studied natural anti-inflammatory compounds in existence. The critical detail — which Ayurveda encoded into this recipe before chemistry explained why — is black pepper. Piperine in black pepper increases curcumin absorption by up to 2,000%. Without it, most curcumin passes through unabsorbed. The fat in milk (or coconut milk) further enhances absorption, as curcumin is fat-soluble. This recipe has three bioavailability enhancers built in. Your grandmother understood drug delivery.`,
        ingredients: [
          "2 cups whole milk (or full-fat coconut milk for non-dairy)",
          "1 tsp turmeric powder (or 1 inch fresh turmeric, grated)",
          "1/4 tsp black pepper — freshly ground, non-negotiable",
          "1/2 tsp cinnamon",
          "Small knob of fresh ginger, grated (optional)",
          "1 tsp raw honey or jaggery (add after warming)",
          "Pinch of cardamom (optional)",
        ],
        method: [
          "Combine milk, turmeric, pepper, cinnamon, and ginger in a small pot.",
          "Warm over low-medium heat, whisking constantly to prevent settling.",
          "Do not boil — bring to a gentle steam, about 5 minutes.",
          "Remove from heat and strain if using fresh turmeric.",
          "Add honey or jaggery after it cools slightly.",
          "Drink immediately, warm.",
        ],
        when: "Evening, 30–60 minutes before sleep. After injury or surgery for inflammation. During any period of chronic pain or joint stiffness.",
        steepNote: "The black pepper is not optional. Neither is the fat. Both are required for curcumin to reach your bloodstream. If you skip either, you are drinking warm yellow milk.",
        sensory: "Warm, golden, gently spiced. The pepper gives a faint heat that builds as you drink. Deeply comforting. This tastes like being cared for.",
        sourceNote: "All ingredients are pantry staples. Use high-quality turmeric — the color should be vivid orange-gold. Old pale turmeric has lost its curcumin content.",
        criticalWarning: null,
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Collagen Peptides", why: "Collagen requires vitamin C and anti-inflammatory conditions to synthesize properly. Haldi doodh reduces the inflammation that breaks down collagen. Add collagen powder directly to your golden milk." },
        tags: ["Indian", "Ayurvedic", "Anti-Inflammatory", "Sleep", "Joint Health", "Daily", "Child-Safe"],
      },

      {
        id: "neem-tea",
        name: "Neem Leaf Tea",
        botanicalName: "Azadirachta indica",
        localNames: ["Neem Tea", "Nimba", "Village Pharmacy"],
        origin: "India — called the village pharmacy for 5,000 years",
        emoji: "🌳",
        safety: "AMBER",
        safetyLabel: "Use With Awareness",
        tagline: "One tree. 5,000 years of documented use. The most complete herbal medicine in the Ayurvedic pharmacopeia.",
        story: `In India, neem is called the village pharmacy — because a single neem tree could address almost any common ailment a village might face. Skin conditions, blood sugar, dental health, infections, liver support, parasite clearing. Every part of the tree was used. The leaves were brewed into tea, the twigs became toothbrushes, the oil treated skin conditions, the bark addressed fever. In Jamaica, neem was brought and took hold in the same way — a tree that does too many things to ignore. It grows in both your grandmothers' traditions. It belongs on this site.`,
        whyItWorks: `Neem contains nimbin, nimbidin, and azadirachtin — compounds with documented antibacterial, antifungal, anti-inflammatory, and blood-sugar modulating activity. Research confirms traditional use for skin conditions, dental health (Streptococcus mutans inhibition), and liver support. The bitterness signals the medicine — neem is one of the most bitter plants in Ayurveda, and Ayurveda considers bitterness itself a therapeutic quality that cools and detoxifies.`,
        ingredients: [
          "5–7 fresh neem leaves (or 1 tsp dried)",
          "2 cups water",
          "Raw honey and lemon — essential to make this drinkable",
          "Optional: small piece of ginger to temper the bitterness",
        ],
        method: [
          "Rinse leaves thoroughly.",
          "Add to boiling water and simmer 5–7 minutes.",
          "Strain immediately — longer steeping increases bitterness significantly.",
          "Add generous honey and lemon.",
          "Drink quickly rather than sipping slowly. Its virtue is not its taste.",
        ],
        when: "Occasionally — 1–2 times per week maximum for general wellness. Not a daily tea.",
        steepNote: "Time the steep carefully. Neem becomes aggressively bitter fast. 5 minutes is a threshold most people can manage. 10 minutes is challenging.",
        sensory: "Intensely bitter, astringent, medicinal. There is no pleasant way to describe it. It is one of the most challenging teas in either tradition. The honey and lemon are not optional.",
        sourceNote: "Fresh neem leaves available at South Asian grocery stores. Dried neem widely available from Ayurvedic herb suppliers online.",
        criticalWarning: {
          headline: "⚠ Use With Awareness",
          points: [
            "Do not use during pregnancy — neem has documented abortifacient properties at higher doses.",
            "Not for children under 12 in tea form.",
            "May lower blood sugar — use caution if on diabetes medication.",
            "Do not use long-term without breaks. Neem is a powerful herb and is not meant for daily indefinite use.",
            "If you have liver conditions, consult your doctor — neem is traditionally used for liver support but has complex hepatic interactions at high doses.",
          ],
          closing: "Neem is powerful medicine. The village pharmacy analogy is accurate — and you would not take every medicine in a pharmacy every day. Use it purposefully.",
          closingCredit: "— Alex",
        },
        additionalUses: [
          { use: "Dental Rinse", note: "Let cooled neem tea serve as a mouth rinse for gum health and oral bacteria reduction. The traditional practice of chewing neem twigs is based on the same antimicrobial activity." },
          { use: "Topical Skin Wash", note: "Cooled neem tea applied to skin conditions, rashes, or fungal issues delivers its antifungal properties topically." },
        ],
        notForSale: false,
        supplementPairing: { name: "Probiotics (Seed DS-01)", why: "Neem's antimicrobial activity clears harmful bacteria broadly. Probiotics repopulate beneficial bacteria afterward. Use neem tea, then follow with probiotics to restore balance." },
        tags: ["Indian", "Ayurvedic", "Blood Sugar", "Skin", "Detox", "Dental", "Ancestral"],
      },
    ],
  },

  {
    id: "bridge",
    title: "Where the Traditions Meet",
    subtitle: "The herbs your two grandmothers shared across an ocean",
    emoji: "🌍",
    color: "#1A1A2A",
    accentColor: "#8A7ACA",
    intro: `Some herbs traveled the world before you did. Ginger appears in both traditions. Turmeric appears in both. Moringa grows in Jamaican yards and Indian villages. Cloves are central to both. These herbs didn't care about borders — they grew where they were needed and were found by the people who needed them. This collection explores the overlap: the same herb, two traditions, two preparations, and what happens when you know both.`,
    credit: "— Alex, Chai Holistic",
    teas: [
      {
        id: "ginger-both",
        name: "Ginger — Two Ways",
        botanicalName: "Zingiber officinale",
        localNames: ["Ginger Root", "Adrak (India)", "Ginger Bush Tea (Jamaica)"],
        origin: "Both traditions — independently arrived at the same root",
        emoji: "🫚",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "The one herb that needed no translation between your grandmothers.",
        story: `If you could sit your two grandmothers at the same table and show them a piece of ginger root, they would both reach for it. No translation needed. In Jamaica it went into the cold and flu teas, the stomach teas, the warming teas when someone was chilled to the bone. In India it went into every kadha, every chai, every morning preparation for digestion and circulation. Two separate traditions, thousands of miles apart, making the same decision about the same root. That unanimity is evidence.`,
        whyItWorks: `Gingerols and shogaols — ginger's primary bioactive compounds — are among the most studied natural anti-inflammatories in existence. Ginger inhibits prostaglandin and leukotriene synthesis (the same pathway targeted by ibuprofen, minus the stomach lining damage). It is among the most effective natural antiemetics (nausea reducers) studied in clinical trials, including for chemotherapy-induced nausea and morning sickness. It stimulates digestive enzyme production, increases bile secretion, and is genuinely warming — it raises core temperature slightly, which supports immune response.`,
        ingredients: [
          "JAMAICAN WAY: 2 inch piece fresh ginger, roughly chopped (no need to peel) · 2 cups water · honey and lime",
          "INDIAN WAY: 1 inch fresh ginger, grated fine · 2 cups water or milk · pinch of black pepper · honey or jaggery",
        ],
        method: [
          "JAMAICAN WAY: Chop ginger roughly and add to cold water. Bring to a boil and simmer 10 minutes. Strain, add honey and lime. Drink hot.",
          "INDIAN WAY: Grate ginger fine into water or milk. Simmer with black pepper 7–8 minutes. Strain and add honey. The pepper adds heat and increases gingerol absorption.",
        ],
        when: "Morning for digestion and circulation. At the first sign of nausea. During cold season. Before meals for digestive preparation.",
        steepNote: "The Jamaican way keeps ginger whole — more rustic, more direct. The Indian way grates it fine — more surface area, more extraction. Both work. The choice is a matter of tradition and how much ginger you want in the cup.",
        sensory: "Sharp, warming, spicy with a heat that builds and then clears. The Jamaican version with lime is brighter. The Indian version with pepper and honey is deeper and more complex.",
        sourceNote: "Fresh ginger root is universally available. Use the freshest you can find — the skin should be thin and the flesh should be firm. Old dried-out ginger has lost much of its gingerol content.",
        criticalWarning: null,
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Omega-3 (Nordic Naturals)", why: "Ginger and omega-3s both inhibit inflammatory pathways — ginger from the cyclooxygenase pathway, omega-3s from the lipoxygenase pathway. Together they address systemic inflammation more completely than either alone." },
        tags: ["Both Traditions", "Jamaican", "Indian", "Ayurvedic", "Anti-Inflammatory", "Digestive", "Daily", "Bridge"],
      },

      {
        id: "clove-both",
        name: "Clove — The Herb of Two Grandmothers",
        botanicalName: "Syzygium aromaticum",
        localNames: ["Clove Tea", "Laung Tea (India)", "Clove Bush Tea (Jamaica)"],
        origin: "Both traditions — arrived at the same spice for different reasons and found the same results",
        emoji: "🌸",
        safety: "GREEN",
        safetyLabel: "Generally Safe",
        tagline: "Your Jamaican grandmother used it for cold. Your Indian grandmother used it for immunity. They were both right.",
        story: `Cloves appear in your Jamaican grandmother's remedy cabinet and in your Indian grandmother's kitchen spice drawer. In Jamaica, cloves went into the cold tea — boiled with ginger and honey for chest congestion and fever. In India, cloves went into every kadha — one of the five essential spices of the immunity decoction — and into chai, and into rice dishes, and into whatever the body needed warming. The same flower bud. Two grandmothers. The same understanding that eugenol is powerful medicine.`,
        whyItWorks: `The recipe for this crossing-traditions clove preparation combines the Jamaican boiling method (which extracts more eugenol) with Indian spice companions (cardamom, black pepper) that enhance bioavailability and add their own medicinal activity. It is a tea that neither grandmother made exactly — but that honors both.`,
        ingredients: [
          "10 whole cloves, lightly crushed",
          "1 cardamom pod, cracked open (Indian addition)",
          "1 inch fresh ginger",
          "5 black peppercorns (Indian addition)",
          "2 cups water",
          "Honey and lime",
        ],
        method: [
          "Crush cloves, crack cardamom, slice ginger.",
          "Add all to cold water and bring to a boil.",
          "Simmer 12 minutes — longer than the Jamaican-only preparation.",
          "Strain carefully.",
          "Add honey and lime.",
          "This is the tea that would have been made if your two grandmothers had sat in the same kitchen.",
        ],
        when: "Cold and flu season. Whenever the chest feels tight. As a warming tea on cold days.",
        steepNote: "This crossing-traditions version simmers longer than either tradition alone — because the combination of spices can sustain longer extraction without becoming unpleasant.",
        sensory: "Warm, complex, spiced. More layered than the Jamaican-only version, warmer than the Indian-only version. Something new that belongs to your specific story.",
        sourceNote: "All pantry staples. Quality cloves are essential — fresh cloves smell intensely of eugenol. Old cloves that barely smell are not worth brewing.",
        criticalWarning: null,
        additionalUses: [],
        notForSale: false,
        supplementPairing: { name: "Liposomal Vitamin C", why: "Cloves activate the immune system directly with eugenol. Liposomal C provides the antioxidant infrastructure the immune system runs on. Both grandmothers would approve." },
        tags: ["Both Traditions", "Jamaican", "Indian", "Bridge", "Immune", "Cold & Flu", "Heritage"],
      },
    ],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AncestralTeas({ onNav }) {
  const [activeCollection, setActiveCollection] = useState("yard");
  const [selectedTea, setSelectedTea] = useState(null);

  const collection = COLLECTIONS.find(c => c.id === activeCollection);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#0A0D0A 0%,#0D140A 40%,#14100A 100%)",
      paddingBottom: 80,
      fontFamily: "Jost, sans-serif",
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div id="sec-anc-top" style={{
        textAlign: "center", padding: "64px 24px 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center top, rgba(74,114,80,.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>
        <div style={{fontSize:".58rem",letterSpacing:".3em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:12}}>
          ✦ Chai Holistic · Ancestral Tea Collection
        </div>
        <h1 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem,6vw,3rem)",
          fontWeight: 700, color: "#F7F2EA",
          margin: "0 0 10px", lineHeight: 1.15,
        }}>
          From the Yard &amp; From the Kitchen
        </h1>
        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,3vw,1.4rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "rgba(196,137,58,.85)", margin: "0 0 22px",
        }}>
          Jamaican &amp; Indian Ancestral Brews
        </h2>
        <p style={{
          fontSize: ".88rem", color: "rgba(247,242,234,.55)",
          maxWidth: 580, margin: "0 auto 28px",
          lineHeight: 1.85, fontWeight: 300,
        }}>
          These recipes were not written down. They were carried — in hands that knew what to pick, 
          in kitchens that knew what to boil, across generations that knew the body needed tending 
          long before modern medicine agreed. We are writing them down now, before they travel any 
          further from memory.
        </p>
        <div style={{
          maxWidth: 560, margin: "0 auto",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(196,137,58,.2)",
          borderRadius: 16, padding: "16px 20px",
          fontSize: ".8rem", color: "rgba(247,242,234,.5)",
          lineHeight: 1.75, fontStyle: "italic",
        }}>
          My grandmother grew cerasee along the fence and up the mango tree. My Indian grandparents 
          kept the spices that became the kadha. Both grandmothers are gone now. These teas are how 
          they stay.
          <div style={{marginTop: 8, fontSize: ".7rem", color: "rgba(196,137,58,.6)", fontStyle: "normal", letterSpacing: ".06em"}}>
            — Alex, Chai Holistic
          </div>
        </div>
      </div>

      {/* ── COLLECTION TABS ──────────────────────────────────────────────────── */}
      <div id="sec-anc-collections" style={{padding: "0 16px 28px", maxWidth: 900, margin: "0 auto"}}>
        <div style={{display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center"}}>
          {COLLECTIONS.map(c => (
            <button key={c.id} onClick={() => setActiveCollection(c.id)} style={{
              background: activeCollection === c.id ? c.accentColor : "rgba(255,255,255,.04)",
              border: `1px solid ${activeCollection === c.id ? c.accentColor : "rgba(255,255,255,.12)"}`,
              color: activeCollection === c.id ? (c.id === "yard" ? "white" : "#0A0A0A") : "rgba(247,242,234,.7)",
              borderRadius: 50, padding: "10px 22px",
              fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase",
              cursor: "pointer", fontWeight: activeCollection === c.id ? 700 : 400,
              transition: "all .25s", whiteSpace: "nowrap",
            }}>
              {c.emoji} {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── COLLECTION INTRO ─────────────────────────────────────────────────── */}
      {collection && (
        <div style={{maxWidth: 700, margin: "0 auto 36px", padding: "0 20px"}}>
          <div style={{
            background: `${collection.color}88`,
            border: `1px solid ${collection.accentColor}44`,
            borderRadius: 18, padding: "22px 24px",
          }}>
            <div style={{
              fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase",
              color: collection.accentColor, marginBottom: 10, fontWeight: 600,
            }}>
              {collection.emoji} {collection.subtitle}
            </div>
            <p style={{
              fontSize: ".84rem", color: "rgba(247,242,234,.65)",
              lineHeight: 1.85, margin: "0 0 10px", fontWeight: 300,
            }}>
              {collection.intro}
            </p>
            <div style={{fontSize: ".7rem", color: collection.accentColor, fontStyle: "italic"}}>
              {collection.credit}
            </div>
          </div>
        </div>
      )}

      {/* ── TEA CARDS ────────────────────────────────────────────────────────── */}
      <div id="sec-anc-grid" style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%), 1fr))",
        gap: 18,
      }}>
        {collection && collection.teas.map(tea => (
          <TeaCard
            key={tea.id}
            tea={tea}
            accentColor={collection.accentColor}
            onSelect={() => setSelectedTea(tea)}
          />
        ))}
      </div>

      {/* ── PRESERVATION NOTE ────────────────────────────────────────────────── */}
      <div style={{maxWidth: 680, margin: "52px auto 0", padding: "0 20px"}}>
        <div style={{
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.06)",
          paddingTop: 28,
        }}>
          <div style={{fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(196,137,58,.6)", marginBottom: 12}}>
            ✦ A Note on Preservation
          </div>
          <p style={{fontSize: ".8rem", color: "rgba(247,242,234,.35)", lineHeight: 1.85, fontWeight: 300}}>
            These recipes are shared to preserve and honor traditions that are genuinely at risk of being lost. 
            Some herbs listed here are not available through Chai Holistic as products — we share them because 
            the knowledge matters more than the transaction. Where we can source herbs to the standard these 
            recipes deserve, we will offer them. Where we cannot, we point you honestly toward where to find them.
          </p>
          <p style={{fontSize: ".75rem", color: "rgba(247,242,234,.2)", lineHeight: 1.75, marginTop: 12, fontWeight: 300}}>
            These statements have not been evaluated by the FDA. These are historical and traditional preparations 
            shared for educational purposes. Consult your healthcare provider before using any herbal preparation, 
            especially if you take prescription medications.
          </p>
        </div>
      </div>

      {/* ── TEA DETAIL MODAL ─────────────────────────────────────────────────── */}
      {selectedTea && (
        <TeaDetailModal
          tea={selectedTea}
          collection={collection}
          onClose={() => setSelectedTea(null)}
          onNav={onNav}
        />
      )}
    </div>
  );
}

// ─── TEA CARD ─────────────────────────────────────────────────────────────────
function TeaCard({ tea, accentColor, onSelect }) {
  const safetyColors = {
    GREEN: { bg: "rgba(74,114,80,.1)", border: "rgba(74,114,80,.25)", text: "rgba(74,114,80,.9)" },
    AMBER: { bg: "rgba(196,137,58,.1)", border: "rgba(196,137,58,.25)", text: "rgba(196,137,58,.9)" },
    RED:   { bg: "rgba(180,60,40,.12)", border: "rgba(180,60,40,.3)", text: "rgba(220,100,80,.9)" },
  };
  const sc = safetyColors[tea.safety] || safetyColors.GREEN;

  return (
    <div
      onClick={onSelect}
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 18, overflow: "hidden",
        cursor: "pointer", transition: "transform .2s, box-shadow .2s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,.4)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
    >
      {/* Color band */}
      <div style={{height: 5, background: `linear-gradient(90deg,${accentColor},${accentColor}66)`}}/>

      <div style={{padding: "18px 20px 16px"}}>
        {/* Safety badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: sc.bg, border: `1px solid ${sc.border}`,
          borderRadius: 20, padding: "3px 10px", marginBottom: 12,
          fontSize: ".58rem", color: sc.text, letterSpacing: ".1em", textTransform: "uppercase",
        }}>
          {tea.safetyLabel}
        </div>

        {/* Header */}
        <div style={{display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10}}>
          <span style={{fontSize: "1.5rem", flexShrink: 0}}>{tea.emoji}</span>
          <div>
            <div style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.05rem", fontWeight: 600,
              color: "#F7F2EA", marginBottom: 2, lineHeight: 1.2,
            }}>
              {tea.name}
            </div>
            <div style={{
              fontSize: ".65rem", color: accentColor,
              fontStyle: "italic", fontWeight: 300,
            }}>
              {tea.botanicalName}
            </div>
          </div>
        </div>

        {/* Origin */}
        <div style={{
          fontSize: ".64rem", color: "rgba(247,242,234,.35)",
          marginBottom: 10, letterSpacing: ".04em",
        }}>
          📍 {tea.origin}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: ".78rem", fontStyle: "italic",
          color: "rgba(247,242,234,.55)", marginBottom: 12,
          lineHeight: 1.5,
        }}>
          "{tea.tagline}"
        </div>

        {/* Story preview */}
        <p style={{
          fontSize: ".76rem", color: "rgba(247,242,234,.6)",
          lineHeight: 1.7, marginBottom: 14, fontWeight: 300,
        }}>
          {tea.story.slice(0, 140)}…
        </p>

        {/* Tags */}
        <div style={{display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14}}>
          {tea.tags.slice(0, 4).map(tag => (
            <span key={tag} style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 20, padding: "2px 9px",
              fontSize: ".58rem", color: "rgba(247,242,234,.5)",
            }}>{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          width: "100%",
          background: `${accentColor}22`,
          border: `1px solid ${accentColor}55`,
          color: accentColor,
          borderRadius: 12, padding: "10px",
          fontSize: ".65rem", letterSpacing: ".12em",
          textTransform: "uppercase", cursor: "pointer",
          fontFamily: "Jost, sans-serif",
          transition: "all .2s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=`${accentColor}44`;}}
        onMouseLeave={e=>{e.currentTarget.style.background=`${accentColor}22`;}}>
          Full Recipe &amp; Story →
        </button>
      </div>
    </div>
  );
}

// ─── TEA DETAIL MODAL ─────────────────────────────────────────────────────────
function TeaDetailModal({ tea, collection, onClose, onNav }) {
  const safetyColors = {
    GREEN: { bg: "rgba(74,114,80,.08)", border: "rgba(74,114,80,.2)", text: "rgba(74,114,80,.9)", label: "GREEN" },
    AMBER: { bg: "rgba(196,137,58,.08)", border: "rgba(196,137,58,.25)", text: "rgba(196,137,58,.9)", label: "AMBER" },
    RED:   { bg: "rgba(180,60,40,.1)", border: "rgba(180,60,40,.3)", text: "rgba(220,100,80,.9)", label: "RED" },
  };
  const sc = safetyColors[tea.safety] || safetyColors.GREEN;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,.9)", zIndex: 960,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, backdropFilter: "blur(12px)",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#0F140F",
        border: `1px solid ${collection.accentColor}33`,
        borderRadius: 22, maxWidth: 580, width: "100%",
        maxHeight: "92vh", overflowY: "auto",
      }}>
        {/* Band */}
        <div style={{height: 6, background: `linear-gradient(90deg,${collection.accentColor},${collection.accentColor}55)`, borderRadius: "22px 22px 0 0"}}/>

        <div style={{padding: "22px 24px 28px"}}>
          {/* Header */}
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16}}>
            <div style={{flex: 1}}>
              <div style={{fontSize: ".56rem", letterSpacing: ".22em", textTransform: "uppercase", color: collection.accentColor, marginBottom: 6, fontWeight: 600}}>
                {collection.emoji} {collection.subtitle}
              </div>
              <h3 style={{fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 700, color: "#F7F2EA", margin: "0 0 4px"}}>
                {tea.emoji} {tea.name}
              </h3>
              <div style={{fontSize: ".72rem", color: `${collection.accentColor}99`, fontStyle: "italic"}}>
                {tea.botanicalName}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,.08)", border: "none",
              color: "rgba(247,242,234,.5)", borderRadius: "50%",
              width: 34, height: 34, fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginLeft: 12,
            }}>✕</button>
          </div>

          {/* CRITICAL WARNING — displayed FIRST if RED */}
          {tea.criticalWarning && (
            <div style={{
              background: tea.safety === "RED" ? "rgba(180,40,20,.12)" : "rgba(196,137,58,.08)",
              border: `2px solid ${tea.safety === "RED" ? "rgba(220,80,60,.5)" : "rgba(196,137,58,.3)"}`,
              borderRadius: 14, padding: "16px 18px", marginBottom: 20,
            }}>
              <div style={{
                fontSize: ".72rem", fontWeight: 700,
                color: tea.safety === "RED" ? "rgba(255,120,100,.9)" : "rgba(196,137,58,.9)",
                marginBottom: 12, letterSpacing: ".04em",
              }}>
                {tea.criticalWarning.headline}
              </div>
              {tea.criticalWarning.points.map((point, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  marginBottom: 8, fontSize: ".76rem",
                  color: tea.safety === "RED" ? "rgba(255,200,180,.8)" : "rgba(247,242,234,.7)",
                  lineHeight: 1.65,
                }}>
                  <span style={{flexShrink: 0, marginTop: 2}}>•</span>
                  <span>{point}</span>
                </div>
              ))}
              {tea.criticalWarning.closing && (
                <div style={{
                  marginTop: 12, paddingTop: 10,
                  borderTop: `1px solid ${tea.safety === "RED" ? "rgba(220,80,60,.2)" : "rgba(196,137,58,.2)"}`,
                  fontSize: ".76rem",
                  color: tea.safety === "RED" ? "rgba(255,200,180,.7)" : "rgba(247,242,234,.55)",
                  fontStyle: "italic", lineHeight: 1.7,
                }}>
                  {tea.criticalWarning.closing}
                  <div style={{marginTop: 6, fontSize: ".68rem", color: collection.accentColor, fontStyle: "normal"}}>
                    {tea.criticalWarning.closingCredit}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Origin */}
          <div style={{fontSize: ".65rem", color: "rgba(247,242,234,.35)", marginBottom: 16, letterSpacing: ".04em"}}>
            📍 {tea.origin}
          </div>

          {/* Story */}
          <Section label="The Story" color={collection.accentColor}>
            <p style={{fontSize: ".82rem", color: "rgba(247,242,234,.7)", lineHeight: 1.85, margin: 0, fontWeight: 300}}>
              {tea.story}
            </p>
          </Section>

          {/* Why it works */}
          <Section label="Why It Works — The Science Behind the Tradition" color={collection.accentColor}>
            <p style={{fontSize: ".8rem", color: "rgba(247,242,234,.65)", lineHeight: 1.8, margin: 0, fontWeight: 300}}>
              {tea.whyItWorks}
            </p>
          </Section>

          {/* Ingredients */}
          <Section label="Ingredients" color={collection.accentColor}>
            {tea.ingredients.map((ing, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.05)",
                fontSize: ".8rem", color: "rgba(247,242,234,.8)", lineHeight: 1.5,
              }}>
                <span style={{color: collection.accentColor, flexShrink: 0, marginTop: 2}}>·</span>
                {ing}
              </div>
            ))}
          </Section>

          {/* Method */}
          <Section label="How to Prepare" color={collection.accentColor}>
            {tea.method.map((step, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                marginBottom: 10, fontSize: ".8rem", lineHeight: 1.65,
              }}>
                <div style={{
                  background: `${collection.accentColor}22`,
                  border: `1px solid ${collection.accentColor}44`,
                  borderRadius: "50%", width: 22, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: ".62rem", color: collection.accentColor,
                  fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                <span style={{color: "rgba(247,242,234,.75)", fontWeight: 300}}>{step}</span>
              </div>
            ))}
          </Section>

          {/* Brew notes */}
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16}}>
            {[
              ["When to Drink", tea.when],
              ["A Note on Preparation", tea.steepNote],
              ["What It Tastes Like", tea.sensory],
              ["Where to Source", tea.sourceNote],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 10, padding: "11px 13px",
                gridColumn: label === "A Note on Preparation" || label === "Where to Source" ? "span 2" : "auto",
              }}>
                <div style={{fontSize: ".52rem", letterSpacing: ".18em", textTransform: "uppercase", color: collection.accentColor, marginBottom: 5, fontWeight: 600}}>{label}</div>
                <div style={{fontSize: ".75rem", color: "rgba(247,242,234,.7)", lineHeight: 1.6, fontWeight: 300}}>{val}</div>
              </div>
            ))}
          </div>

          {/* Additional uses */}
          {tea.additionalUses && tea.additionalUses.length > 0 && (
            <Section label="Additional Traditional Uses" color={collection.accentColor}>
              {tea.additionalUses.map(u => (
                <div key={u.use} style={{marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontSize: ".7rem", color: collection.accentColor, fontWeight: 600, marginBottom: 4}}>{u.use}</div>
                  <div style={{fontSize: ".76rem", color: "rgba(247,242,234,.6)", lineHeight: 1.65, fontWeight: 300}}>{u.note}</div>
                </div>
              ))}
            </Section>
          )}

          {/* Supplement pairing */}
          {tea.supplementPairing && (
            <div style={{
              background: "rgba(74,114,80,.07)",
              border: "1px solid rgba(74,114,80,.2)",
              borderRadius: 12, padding: "13px 15px", marginBottom: 16,
            }}>
              <div style={{fontSize: ".55rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(74,114,80,.85)", marginBottom: 8, fontWeight: 600}}>
                💊 Complete Your Protocol
              </div>
              <div style={{display: "flex", alignItems: "flex-start", gap: 10}}>
                <div style={{flex: 1}}>
                  <div style={{fontSize: ".72rem", color: "rgba(74,114,80,.9)", fontWeight: 600, marginBottom: 3}}>
                    {tea.supplementPairing.name}
                  </div>
                  <div style={{fontSize: ".7rem", color: "rgba(247,242,234,.5)", lineHeight: 1.6, fontWeight: 300}}>
                    {tea.supplementPairing.why}
                  </div>
                </div>
                <button
                  onClick={() => { onNav("supplements"); onClose(); }}
                  style={{
                    flexShrink: 0, background: "rgba(74,114,80,.12)",
                    border: "1px solid rgba(74,114,80,.3)",
                    color: "rgba(74,114,80,.9)", borderRadius: 20,
                    padding: "5px 12px", fontSize: ".62rem",
                    letterSpacing: ".08em", textTransform: "uppercase",
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}>
                  See →
                </button>
              </div>
            </div>
          )}

          {/* Safety reminder if AMBER or RED */}
          {tea.safety !== "GREEN" && !tea.criticalWarning && (
            <div style={{
              background: sc.bg, border: `1px solid ${sc.border}`,
              borderRadius: 10, padding: "11px 13px", marginBottom: 16,
              fontSize: ".74rem", color: sc.text, lineHeight: 1.65,
            }}>
              ⚠ {tea.safetyLabel} — consult your healthcare provider before use, especially if on any medications.
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background: `${collection.accentColor}18`,
              border: `1px solid ${collection.accentColor}44`,
              color: collection.accentColor,
              borderRadius: 12, padding: "13px",
              fontFamily: "Jost, sans-serif",
              fontSize: ".7rem", letterSpacing: ".12em",
              textTransform: "uppercase", cursor: "pointer",
            }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION HELPER ──────────────────────────────────────────────────────────
function Section({ label, color, children }) {
  return (
    <div style={{marginBottom: 18}}>
      <div style={{
        fontSize: ".55rem", letterSpacing: ".2em", textTransform: "uppercase",
        color: color || "rgba(196,137,58,.7)", marginBottom: 9, fontWeight: 600,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}
