import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Design tokens (mirror parent app palette) ─────────────────────────────
const T = {
  forest:    "#0d1a11",
  fern:      "#173322",
  sage:      "#275c3e",
  sageLt:    "#3a7a55",
  mint:      "#52b882",
  pale:      "#b2dfc4",
  cream:     "#fef9ef",
  parchment: "#f5edda",
  warmWhite: "#fffdf7",
  gold:      "#c08830",
  goldLt:    "#deb96a",
  goldPale:  "#fdf5e4",
  ink:       "#1c1c1a",
  mist:      "#ebf5ef",
  mistDark:  "#d4eadd",
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const FDA = {
  1:{level:"moderate",warnings:["Valerian may cause drowsiness — do not drive after use.","Passionflower may enhance effects of sedatives and anti-anxiety medications.","Not recommended during pregnancy or breastfeeding.","Discontinue 2 weeks before surgery."]},
  2:{level:"low",warnings:["Hawthorn may interact with digoxin and blood pressure medications.","Not recommended during pregnancy without medical guidance."]},
  3:{level:"moderate",warnings:["Ginkgo biloba may increase bleeding risk — discontinue 2 weeks before surgery.","May interact with blood thinners and antidepressants.","Rosemary should be avoided in therapeutic doses during pregnancy."]},
  4:{level:"low",warnings:["Echinacea not recommended for autoimmune conditions.","May interact with immunosuppressant medications.","Licorice root may raise blood pressure."]},
  5:{level:"low",warnings:["Licorice root may raise blood pressure — limit use to 4–6 weeks.","Dandelion root may interact with diuretic medications."]},
  6:{level:"low",warnings:["Turmeric/curcumin may interact with blood thinners.","Discontinue 2 weeks before surgery.","Devil's claw not recommended during pregnancy."]},
  7:{level:"high",warnings:["Dong quai contains coumarin — AVOID with warfarin.","Chasteberry (Vitex) may interact with hormonal birth control and HRT.","NOT recommended during pregnancy — may stimulate uterine contractions."]},
  8:{level:"low",warnings:["Lobelia can be toxic in large doses — do not exceed recommended amounts.","Eucalyptus is for tea only — never ingest the essential oil."]},
  9:{level:"moderate",warnings:["Ashwagandha may interact with thyroid medications and sedatives.","Rhodiola may interact with antidepressants and blood pressure medications.","Not recommended during pregnancy or breastfeeding."]},
  10:{level:"low",warnings:["Slippery elm may slow medication absorption — take meds 2 hours apart.","Aloe vera may lower blood sugar — monitor if diabetic."]},
  11:{level:"low",warnings:["Bladderwrack contains iodine — avoid with thyroid conditions.","Spirulina may interact with immunosuppressants."]},
  12:{level:"high",warnings:["Mugwort CONTRAINDICATED during pregnancy — risk of miscarriage.","Blue lotus not FDA-approved as a food additive.","Do not combine with alcohol or sedatives."]},
  13:{level:"high",warnings:["St. John's Wort INTERACTS with SSRIs, birth control, warfarin, HIV meds.","AVOID during pregnancy and breastfeeding.","May cause photosensitivity."]},
  14:{level:"high",warnings:["He shou wu (Fo-ti) has been linked to liver toxicity.","Discontinue if you experience jaundice or abdominal pain.","NOT recommended during pregnancy."]},
  15:{level:"moderate",warnings:["Red clover contains phytoestrogens — NOT for hormone-sensitive conditions.","May interact with blood thinners and tamoxifen."]},
  16:{level:"moderate",warnings:["Black seed may lower blood pressure and blood sugar.","Cat's claw may interact with blood pressure meds and immunosuppressants."]},
  17:{level:"high",warnings:["Kava kava has been linked to serious liver damage.","DO NOT combine with alcohol, benzodiazepines, or sedatives.","Do not drive after consuming this blend."]},
  18:{level:"moderate",warnings:["Cordyceps may interact with blood thinners.","Rhodiola may interact with antidepressants.","Discontinue 2 weeks before surgery."]},
  19:{level:"low",warnings:["Rooibos generally safe for most people.","Consult doctor if pregnant before consuming medicinal amounts of ginger."]},
  20:{level:"high",warnings:["Blue lotus not FDA-approved — use with caution.","Mucuna pruriens contains L-DOPA — may interact with MAO inhibitors and Parkinson's medications.","NOT recommended during pregnancy."]},
  21:{level:"low",warnings:["Turmeric may interact with blood thinners.","Discontinue 2 weeks before surgery."]},
  22:{level:"low",warnings:["Bladderwrack and Irish moss contain high iodine — NOT for hyperthyroidism.","Juniper berry CONTRAINDICATED in kidney disease or pregnancy."]},
  23:{level:"moderate",warnings:["Motherwort CONTRAINDICATED during pregnancy.","Hawthorn may interact with digoxin and cardiac medications."]},
  24:{level:"low",warnings:["Pearl powder not FDA-approved as a dietary supplement.","Hibiscus may lower blood pressure."]},
  25:{level:"low",warnings:["Ginkgo biloba increases bleeding risk — discontinue 2 weeks before surgery.","May interact with blood thinners."]},
  26:{level:"high",warnings:["Tongkat ali may affect hormone levels — NOT for hormone-sensitive prostate cancer.","NOT recommended for anyone under 18 years of age."]},
  27:{level:"moderate",warnings:["Lobelia has a narrow therapeutic window — do not exceed recommended amounts.","Cedar and juniper should be avoided during pregnancy."]},
  28:{level:"moderate",warnings:["Uva ursi: do not use more than 5 days continuously.","Juniper berry CONTRAINDICATED in kidney disease and pregnancy."]},
  29:{level:"low",warnings:["Formulated for children — consult pediatrician for children under 2.","Do NOT give honey to children under 1 year old."]},
  30:{level:"moderate",warnings:["Frankincense and myrrh may interact with blood-thinning medications.","Spikenard not recommended during pregnancy."]},
  31:{level:"moderate",warnings:["Yellow dock is a stimulant laxative — do not use long-term.","Milk thistle may reduce concentrations of warfarin, phenytoin, and diazepam."]},
  32:{level:"moderate",warnings:["Milk thistle may interact with warfarin, phenytoin, and oral contraceptives.","Artichoke leaf may cause reactions in ragweed-sensitive individuals."]},
  33:{level:"moderate",warnings:["Cayenne may interact with warfarin and ACE inhibitors.","Turmeric may interact with blood thinners."]},
  34:{level:"moderate",warnings:["Grapefruit peel may interact with medications via CYP3A4 inhibition.","Fennel should be avoided in large amounts during pregnancy."]},
  35:{level:"moderate",warnings:["Schisandra may interact with CYP3A4-metabolized medications.","Consult physician if you have liver disease."]},
  36:{level:"moderate",warnings:["Uva ursi: do not use more than 5 days at a time.","Juniper berry CONTRAINDICATED in kidney disease and pregnancy."]},
  37:{level:"low",warnings:["Juniper berry CONTRAINDICATED in kidney disease or pregnancy.","Horsetail: do not use more than 6 weeks continuously."]},
  38:{level:"low",warnings:["Burdock root is a mild diuretic.","Not recommended during pregnancy."]},
  39:{level:"moderate",warnings:["Red clover contains phytoestrogens — NOT for hormone-sensitive conditions.","Yellow dock is a stimulant laxative — do not use long-term."]},
  40:{level:"high",warnings:["Start slowly — this is a strong dual cleanse.","Milk thistle may reduce warfarin, phenytoin, and diazepam concentrations.","Do NOT use with active liver or kidney disease without physician approval.","Limit each protocol to 21 days maximum."]},
};

const BLENDS = [
  {n:1,emoji:"🌙",name:"Deep Sleep & Calm Blend",part:"I",ingredients:[["2 tsp","Valerian root"],["1.5 tsp","Passionflower"],["2 tsp","Chamomile flowers"],["1.5 tsp","Lemon balm"],["1 tsp","Lavender buds"]],yield:"Makes ~8 tsp dry blend (4 cups)",benefits:"Promotes deep, restful sleep and eases anxiety. Valerian and passionflower calm the nervous system, while lavender and lemon balm reduce mental chatter before bed.",brew:"Steep 1–2 tsp per cup for 7–10 min in near-boiling water. Drink 30 min before bed.",tip:"Add a drop of raw honey for extra relaxation."},
  {n:2,emoji:"❤️",name:"Heart & Circulation Tonic",part:"I",ingredients:[["2 tsp","Hawthorn berry (dried)"],["2 tsp","Hibiscus flowers"],["1.5 tsp","Rose hips"],["1 tsp","Ginger root (dried)"],["0.5 tsp","Cinnamon chips"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Supports cardiovascular health by strengthening the heart muscle, improving circulation, and naturally lowering blood pressure. Rich in antioxidants and vitamin C.",brew:"Steep 1–2 tsp per cup for 8–10 min. Enjoy morning or afternoon.",tip:"Add a slice of orange for extra vitamin C."},
  {n:3,emoji:"🧠",name:"Focus & Mental Clarity Blend",part:"I",ingredients:[["1.5 tsp","Ginkgo biloba leaf"],["1.5 tsp","Gotu kola"],["2 tsp","Peppermint leaf"],["1 tsp","Rosemary leaf"],["1 tsp","Lion's mane powder"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Sharpens concentration and memory. Ginkgo and gotu kola increase blood flow to the brain, while peppermint and rosemary stimulate alertness without caffeine jitters.",brew:"Steep 1–2 tsp per cup for 5–7 min. Ideal mid-morning.",tip:"Inhale the steam before drinking for an aromatherapy boost."},
  {n:4,emoji:"🛡️",name:"Immune Defense Blend",part:"I",ingredients:[["2 tsp","Elderberries (dried)"],["1.5 tsp","Echinacea root"],["1.5 tsp","Astragalus root"],["1 tsp","Turmeric powder"],["0.25 tsp","Black pepper"],["0.5 tsp","Licorice root"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"A powerful immune booster. Elderberry and echinacea fight viruses, astragalus builds long-term immune resilience, and turmeric with black pepper delivers potent anti-inflammatory support.",brew:"Simmer roots 10 min, steep berries 5 min. Use 2 tsp per cup.",tip:"Add fresh lemon juice to activate the elderberry compounds."},
  {n:5,emoji:"🔥",name:"Metabolism & Digestive Fire",part:"I",ingredients:[["2 tsp","Dandelion root (roasted)"],["1.5 tsp","Fennel seed"],["1.5 tsp","Ginger root (dried)"],["1 tsp","Peppermint leaf"],["0.5 tsp","Cardamom (crushed)"],["0.5 tsp","Licorice root"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Stimulates digestion, reduces bloating, and supports liver detoxification. Dandelion root is a gentle liver tonic while fennel and cardamom ease cramping and gas.",brew:"Steep 2 tsp per cup for 7–10 min after meals.",tip:"Excellent after heavy meals to prevent bloating."},
  {n:6,emoji:"💪",name:"Anti-Inflammation & Joint Relief",part:"I",ingredients:[["2 tsp","Turmeric root (dried)"],["1.5 tsp","Ginger root (dried)"],["1 tsp","Boswellia resin powder"],["1 tsp","Devil's claw root"],["0.5 tsp","Cinnamon"],["0.25 tsp","Black pepper"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"Targets chronic inflammation and joint pain. Turmeric and boswellia are clinically studied for reducing inflammatory markers, while ginger adds warming pain relief.",brew:"Steep 2 tsp per cup for 10 min. Add coconut milk to enhance curcumin absorption.",tip:"Combine with a healthy fat like coconut oil for best results."},
  {n:7,emoji:"🌸",name:"Hormone Balance & Women's Wellness",part:"I",ingredients:[["2 tsp","Raspberry leaf"],["1.5 tsp","Dong quai root"],["1.5 tsp","Chasteberry (Vitex)"],["1 tsp","Spearmint leaf"],["1 tsp","Ashwagandha root powder"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Supports hormonal balance, eases PMS symptoms, and regulates cycles. Chasteberry acts on the pituitary gland and ashwagandha helps manage cortisol and stress hormones.",brew:"Steep 2 tsp per cup for 7 min. Drink consistently for at least 3 cycles.",tip:"Avoid dong quai during menstruation; use in the follicular phase."},
  {n:8,emoji:"🌬️",name:"Lung & Respiratory Clarity",part:"I",ingredients:[["2 tsp","Mullein leaf"],["1 tsp","Thyme leaf"],["1 tsp","Elecampane root"],["0.5 tsp","Licorice root"],["0.5 tsp","Eucalyptus leaf"],["1 tsp","Peppermint leaf"]],yield:"Makes ~6 tsp dry blend (3 cups)",benefits:"Opens airways, clears mucus, and soothes irritated lung tissue. Mullein is one of the most trusted herbs for respiratory health, and thyme acts as a natural antimicrobial.",brew:"Steep 2 tsp per cup for 8 min. Inhale steam before drinking.",tip:"Add raw manuka honey for added antimicrobial action."},
  {n:9,emoji:"⚡",name:"Adaptogen Energy & Vitality Blend",part:"I",ingredients:[["2 tsp","Ashwagandha root"],["1.5 tsp","Rhodiola root"],["1.5 tsp","Eleuthero root"],["1 tsp","Schisandra berry"],["1 tsp","Holy basil (Tulsi)"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Combats fatigue and builds stress resilience without stimulants. These adaptogens balance cortisol, support adrenal health, and provide sustained energy throughout the day.",brew:"Simmer 2 tsp per cup for 10–15 min. Drink in the morning.",tip:"Take consistently for 4–6 weeks to feel full adaptogenic benefits."},
  {n:10,emoji:"🌿",name:"Gut Healing & Microbiome Blend",part:"I",ingredients:[["2 tsp","Slippery elm bark (powder)"],["2 tsp","Marshmallow root"],["1.5 tsp","Chamomile flowers"],["0.5 tsp","Licorice root"],["0.5 tsp","Aloe vera powder"],["1 tsp","Calendula petals"]],yield:"Makes ~7.5 tsp dry blend (3–4 cups)",benefits:"Repairs and soothes the gut lining, ideal for leaky gut, IBS, or inflammation. Slippery elm and marshmallow root coat and heal the intestinal wall while calendula reduces gut inflammation.",brew:"Cold-steep 2 tsp per cup overnight for maximum mucilage extraction.",tip:"Do not take within 2 hours of medications as it may slow absorption."},
  {n:11,emoji:"🌊",name:"Ocean Mist Detox Blend",part:"II",ingredients:[["1.5 tsp","Bladderwrack seaweed (dried)"],["0.5 tsp","Spirulina powder"],["1.5 tsp","Nettle leaf"],["1 tsp","Cilantro leaf (dried)"],["1 tsp","Lemon verbena"],["1 tsp","Dandelion leaf"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"A rare ocean-meets-earth detox formula. Bladderwrack and spirulina pull heavy metals and toxins from the body while providing rich iodine for thyroid support.",brew:"Steep 2 tsp per cup for 6–8 min. Drink first thing in the morning.",tip:"Best taken as a 7-day cleanse program, twice daily."},
  {n:12,emoji:"🔮",name:"Third Eye Clarity Blend",part:"II",ingredients:[["1.5 tsp","Mugwort leaf"],["1.5 tsp","Blue lotus flower"],["1 tsp","Gotu kola leaf"],["1 tsp","Bacopa monnieri"],["0.5 tsp","Star anise"],["1 tsp","Lavender buds"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"An ancient visionary blend used across Egyptian, Ayurvedic, and indigenous traditions. Mugwort and blue lotus enhance dream clarity and intuition.",brew:"Steep 2 tsp per cup for 7 min just below boiling. Drink before meditation.",tip:"Keep a dream journal nearby — this blend may intensify dream recall."},
  {n:13,emoji:"🦋",name:"Metamorphosis Mood Lift Blend",part:"II",ingredients:[["2 tsp","St. John's Wort"],["0.25 tsp","Saffron threads"],["1.5 tsp","Lemon balm"],["1 tsp","Mimosa bark (He huan pi)"],["1 tsp","Rose petals"],["0.5 tsp","Orange peel (dried)"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"A gentle yet powerful natural antidepressant formula. St. John's Wort and saffron are clinically studied for lifting mild to moderate depression.",brew:"Steep 2 tsp per cup for 6–8 min. Drink consistently each morning.",tip:"St. John's Wort interacts with many medications — consult your doctor first."},
  {n:14,emoji:"🐉",name:"Dragon Fire Longevity Blend",part:"II",ingredients:[["1.5 tsp","He shou wu (Fo-ti) root"],["1.5 tsp","Reishi mushroom (sliced)"],["1 tsp","Astragalus root"],["1 tsp","Goji berries (dried)"],["1 tsp","Schisandra berry"],["0.5 tsp","Cinnamon chips"],["0.25 tsp","Clove (whole)"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"Inspired by ancient Chinese longevity traditions. He shou wu nourishes the blood and kidneys, reishi supports immune intelligence and longevity genes.",brew:"Simmer 2 tsp per cup for 15–20 min for a rich decoction.",tip:"This blend improves with consistent use over 3+ months."},
  {n:15,emoji:"🌺",name:"Venus Beauty Blend",part:"II",ingredients:[["0.5 tsp","Pearl powder"],["1.5 tsp","Rose hip (dried)"],["1.5 tsp","Hibiscus flowers"],["1 tsp","Red clover blossoms"],["1 tsp","Horsetail herb"],["1 tsp","Nettle leaf"],["0.25 tsp","Aloe vera powder"],["0.5 tsp","Jasmine flowers"]],yield:"Makes ~7.25 tsp dry blend (3–4 cups)",benefits:"A beauty blend that works from the inside out. Pearl powder and rose hip deliver collagen-boosting nutrients, red clover supports skin elasticity.",brew:"Steep 2 tsp per cup for 7 min. Add a splash of rosewater.",tip:"Drink daily for 30 days for visible skin, hair, and nail improvements."},
  {n:16,emoji:"🧬",name:"DNA Repair & Cell Renewal Blend",part:"II",ingredients:[["1.5 tsp","Astragalus root"],["1 tsp","Cat's claw bark"],["1 tsp","Green tea (decaf)"],["1 tsp","Amla berry powder"],["0.75 tsp","Turmeric powder"],["0.25 tsp","Black seed (Nigella sativa)"],["0.5 tsp","Moringa leaf powder"]],yield:"Makes ~6 tsp dry blend (3 cups)",benefits:"A cutting-edge cellular repair formula. Astragalus activates telomerase for cellular longevity, cat's claw repairs DNA strand breaks, amla is one of the most antioxidant-rich plants on earth.",brew:"Steep 2 tsp per cup for 8 min. Best consumed in the morning.",tip:"Black seed is very potent — start with a small pinch and increase gradually."},
  {n:17,emoji:"🌑",name:"Shadow Work & Nervous System Reset",part:"II",ingredients:[["1.5 tsp","Kava kava root"],["1.5 tsp","Skullcap leaf"],["1 tsp","Blue vervain"],["1 tsp","Passionflower"],["1 tsp","California poppy (aerial parts)"],["0.5 tsp","Valerian root"],["0.5 tsp","Ashwagandha root"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"A deeply therapeutic blend for trauma, hypervigilance, or chronic stress. Kava kava and California poppy deeply relax the nervous system.",brew:"Steep 2 tsp per cup for 8 min in the evening.",tip:"Do not drive after drinking. Avoid with alcohol."},
  {n:18,emoji:"🏔️",name:"Alpine Warrior Endurance Blend",part:"II",ingredients:[["1.5 tsp","Cordyceps mushroom powder"],["1.5 tsp","Rhodiola root"],["1 tsp","Eleuthero root"],["0.5 tsp","Pine pollen powder"],["1 tsp","Nettle seed"],["1 tsp","Maca root powder"],["0.5 tsp","Licorice root"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"Built for physical performance and stamina. Cordyceps increases oxygen uptake, rhodiola delays fatigue, pine pollen provides natural phyto-androgens, and maca boosts endurance.",brew:"Simmer 2 tsp per cup for 12–15 min. Drink 45 min before activity.",tip:"Cycle this blend — 5 days on, 2 days off for sustained effect."},
  {n:19,emoji:"🌍",name:"Ancestral Grounding Blend",part:"II",ingredients:[["2 tsp","Rooibos (red bush tea)"],["0.5 tsp","Moringa leaf powder"],["0.5 tsp","Baobab fruit powder"],["1 tsp","African ginger root (dried)"],["1 tsp","Hibiscus flowers"],["0.5 tsp","Cinnamon chips"],["0.5 tsp","Cardamom (crushed)"]],yield:"Makes ~6 tsp dry blend (3 cups)",benefits:"Rooted in African botanical wisdom. Rooibos is rich in unique antioxidants, baobab delivers prebiotic fiber and vitamin C, moringa provides complete plant-based protein and iron.",brew:"Steep 2 tsp per cup for 8–10 min. Naturally caffeine-free.",tip:"Wonderful as an iced tea — cold brew overnight in the refrigerator."},
  {n:20,emoji:"✨",name:"Stardust Pineal Activation Blend",part:"II",ingredients:[["1.5 tsp","Blue lotus flower"],["1 tsp","Lion's mane mushroom powder"],["1 tsp","Turkey tail mushroom powder"],["1 tsp","Ginkgo biloba leaf"],["1 tsp","Raw cacao powder"],["0.5 tsp","Mucuna pruriens powder"],["0.25 tsp","Vanilla bean powder"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"A neuro-nourishing formula. Blue lotus and mucuna pruriens gently stimulate dopamine and serotonin pathways, lion's mane promotes nerve growth factor for brain regeneration.",brew:"Steep 2 tsp per cup for 8 min, then whisk in cacao. Drink mindfully.",tip:"The cacao makes this a beautiful morning ritual tea."},
  {n:21,emoji:"🌻",name:"Solar Plexus Power Blend",part:"III",ingredients:[["1.5 tsp","Calendula petals"],["1 tsp","Sunflower petals (dried)"],["1 tsp","Turmeric root (dried)"],["1 tsp","Ginger root (dried)"],["0.5 tsp","Lemon peel (dried)"],["0.25 tsp","Black pepper"],["1 tsp","Dandelion root (roasted)"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"A confidence and vitality blend aligned with the solar plexus chakra. Calendula and sunflower petals carry warm solar energy while supporting lymphatic health.",brew:"Steep 2 tsp per cup for 8 min. Drink in the morning.",tip:"Visualize warm, golden light filling your abdomen while drinking."},
  {n:22,emoji:"🌊",name:"Mermaid Mineral Blend",part:"III",ingredients:[["1.5 tsp","Irish moss (dried, flaked)"],["1 tsp","Bladderwrack seaweed"],["1.5 tsp","Burdock root"],["1 tsp","Nettle leaf"],["0.5 tsp","Spearmint leaf"],["0.5 tsp","Lemongrass"],["0.25 tsp","Sea buckthorn berry powder"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"A mineral-dense oceanic blend delivering 92 of the 102 minerals the human body needs. Irish moss and bladderwrack feed the thyroid and remineralize bones and joints.",brew:"Cold-steep 2 tsp per cup overnight. Warm before drinking.",tip:"Blend this tea smooth for a mineral-rich sea moss tonic drink."},
  {n:23,emoji:"🕊️",name:"Inner Peace Trauma Release Blend",part:"III",ingredients:[["1.5 tsp","Holy basil (Tulsi) leaf"],["1.5 tsp","Rose petals"],["1 tsp","Hawthorn berry"],["1 tsp","Motherwort herb"],["1 tsp","Linden flower"],["1 tsp","Chamomile flowers"],["0.25 tsp","Frankincense resin (ground)"]],yield:"Makes ~7.25 tsp dry blend (3–4 cups)",benefits:"A heart-centered healing blend for emotional wounds. Motherwort calms heart palpitations, linden flower melts tension held in the chest, frankincense carries centuries of sacred healing energy.",brew:"Steep 2 tsp per cup for 8 min. Use as part of a journaling practice.",tip:"Place your hands on your heart while drinking and breathe deeply."},
  {n:24,emoji:"🌠",name:"Cosmic Collagen & Skin Glow Blend",part:"III",ingredients:[["1 tsp","Tremella mushroom powder"],["1.5 tsp","Rose hip (dried)"],["1 tsp","Hibiscus flowers"],["0.5 tsp","Amla berry powder"],["1 tsp","Calendula petals"],["0.25 tsp","Pearl powder"],["0.25 tsp","Vanilla bean powder"],["0.5 tsp","Cinnamon chips"]],yield:"Makes ~6 tsp dry blend (3 cups)",benefits:"Tremella holds 500× its weight in water — nature's most powerful skin hydrator. Combined with rose hip and amla for vitamin C-driven collagen synthesis.",brew:"Steep 2 tsp per cup for 7–8 min. Drink daily.",tip:"Add a teaspoon of aloe vera juice for a supercharged skin boost."},
  {n:25,emoji:"🦅",name:"Eagle Vision Eye Health Blend",part:"III",ingredients:[["1.5 tsp","Bilberry (dried)"],["1.5 tsp","Eyebright herb"],["1 tsp","Goji berries (dried)"],["1 tsp","Marigold petals (lutein-rich)"],["0.5 tsp","Green tea (decaf)"],["0.5 tsp","Grape seed (crushed)"],["0.25 tsp","Carrot seed"]],yield:"Makes ~6.25 tsp dry blend (3 cups)",benefits:"Formulated for eye health and vision protection. Bilberry strengthens capillaries in the retina, lutein-rich marigold protects the macula against blue light and UV damage.",brew:"Steep 2 tsp per cup for 6–8 min. Drink daily.",tip:"Combine with regular screen breaks and palming exercises."},
  {n:26,emoji:"🌋",name:"Volcanic Vitality Men's Blend",part:"III",ingredients:[["1.5 tsp","Tongkat ali root"],["0.5 tsp","Pine pollen powder"],["1 tsp","Tribulus terrestris"],["1 tsp","Ashwagandha root"],["1 tsp","Saw palmetto berry"],["1 tsp","Nettle root"],["0.5 tsp","Cinnamon chips"],["0.25 tsp","Clove (whole)"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"A potent men's health formula supporting testosterone balance, prostate health, and sexual vitality. Tongkat ali is clinically studied for boosting free testosterone.",brew:"Simmer 2 tsp per cup for 15 min. Drink in the morning on an empty stomach.",tip:"Cycle for 8 weeks on, 2 weeks off. Pair with zinc-rich foods."},
  {n:27,emoji:"🍃",name:"Forest Bathing Breathwork Blend",part:"III",ingredients:[["1.5 tsp","Pine needle (dried)"],["1 tsp","Spruce tips (dried)"],["0.5 tsp","Cedar leaf (dried)"],["0.5 tsp","Eucalyptus leaf"],["1 tsp","Thyme leaf"],["1 tsp","Mullein leaf"],["0.25 tsp","Lobelia herb"],["0.75 tsp","Peppermint leaf"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"Inspired by Shinrin-yoku (forest bathing), this blend floods the lungs with healing phytoncides. Pine needle delivers vitamin C, lobelia acts as a bronchodilator for deep breathing.",brew:"Steep 2 tsp per cup for 6–7 min. Inhale the steam deeply before each sip.",tip:"Drink outdoors or near an open window for the full forest bathing effect."},
  {n:28,emoji:"💎",name:"Crystal Clear Kidney & Bladder Blend",part:"III",ingredients:[["1.5 tsp","Chanca piedra herb"],["1 tsp","Uva ursi leaf"],["1 tsp","Corn silk (dried)"],["0.5 tsp","Juniper berry (crushed)"],["1 tsp","Parsley root"],["0.5 tsp","Horsetail herb"],["1 tsp","Marshmallow root"],["0.5 tsp","Cranberry powder"]],yield:"Makes ~7 tsp dry blend (3–4 cups)",benefits:"A targeted urinary tract and kidney cleansing formula. Chanca piedra has been used for centuries to dissolve kidney stones. Marshmallow root reduces inflammation throughout the urinary system.",brew:"Steep 2 tsp per cup for 8–10 min. Drink with 2 large glasses of water.",tip:"Use as a 10-day cleanse protocol. Increase daily water intake significantly."},
  {n:29,emoji:"🌈",name:"Rainbow Children's Calm & Immunity",part:"III",ingredients:[["2 tsp","Chamomile flowers"],["1.5 tsp","Lemon balm leaf"],["1 tsp","Elderberry (dried)"],["0.5 tsp","Echinacea (aerial parts)"],["0.5 tsp","Rose hip"],["0.5 tsp","Spearmint leaf"],["0.25 tsp","Licorice root"],["0.25 tsp","Cinnamon chips"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"A gentle, safe blend formulated for children. Chamomile and lemon balm calm hyperactivity and support restful sleep, elderberry and echinacea provide gentle immune defense.",brew:"Steep 1 tsp per cup for 4–5 min. Cool to warm before serving.",tip:"Serve as a bedtime ritual to help children wind down naturally."},
  {n:30,emoji:"🔱",name:"Triquetra Sacred Trinity Blend",part:"III",ingredients:[["0.5 tsp","Frankincense resin (ground)"],["0.5 tsp","Myrrh resin (ground)"],["1.5 tsp","Holy basil (Tulsi) leaf"],["1.5 tsp","Blue lotus flower"],["0.5 tsp","Spikenard root"],["0.5 tsp","White sandalwood powder"],["1 tsp","Calendula petals"],["0.5 tsp","Ginger root (dried)"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"The most sacred blend in the collection, drawing from Egyptian, Ayurvedic, and biblical healing traditions. Frankincense and myrrh carry thousands of years of medicinal and spiritual use.",brew:"Simmer resin pieces 10 min, steep flowers 5 min. Use ceremonially.",tip:"Light incense and set an intention before drinking this sacred blend."},
  {n:31,emoji:"🫁",name:"Liver Awakening Morning Cleanse",part:"IV",ingredients:[["2 tsp","Dandelion root (roasted)"],["1.5 tsp","Milk thistle seed (crushed)"],["1 tsp","Burdock root"],["1 tsp","Yellow dock root"],["0.5 tsp","Ginger root (dried)"],["0.5 tsp","Lemon peel (dried)"],["0.25 tsp","Black pepper"]],yield:"Makes ~7.75 tsp dry blend (3–4 cups)",benefits:"A powerful morning liver activator. Dandelion root stimulates bile flow, milk thistle contains silymarin — the most researched liver-protective compound on earth.",brew:"Simmer roots in 2 cups water for 12 min, steep 5 min. Drink warm first thing on an empty stomach.",tip:"Squeeze fresh lemon juice into the finished tea to amplify liver enzyme activation."},
  {n:32,emoji:"🌿",name:"Milk Thistle Deep Liver Repair",part:"IV",ingredients:[["3 tsp","Milk thistle seed (freshly crushed)"],["1.5 tsp","Artichoke leaf"],["1 tsp","Turmeric root (dried)"],["0.5 tsp","Licorice root"],["0.5 tsp","Peppermint leaf"],["0.25 tsp","Black pepper"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"The gold standard liver repair formula. Milk thistle's silymarin compound regenerates liver cells, protects against toxins and alcohol damage, and reduces liver inflammation.",brew:"Crush milk thistle seeds fresh. Simmer 15 min. Drink 2–3 cups daily for a 21-day protocol.",tip:"Crush the milk thistle seeds in a mortar and pestle just before brewing — pre-ground seeds lose potency quickly."},
  {n:33,emoji:"💛",name:"Golden Liver Flush Blend",part:"IV",ingredients:[["2 tsp","Turmeric root (dried)"],["1 tsp","Dandelion root"],["1 tsp","Chicory root (roasted)"],["1 tsp","Calendula petals"],["0.5 tsp","Ginger root (dried)"],["0.5 tsp","Orange peel (dried)"],["0.25 tsp","Cayenne pepper"],["0.25 tsp","Black pepper"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"A warming golden flush for sluggish livers. Chicory root is one of the richest sources of inulin, a prebiotic that feeds the gut microbiome and reduces liver stress.",brew:"Simmer roots 10 min, steep flowers 5 min. Drink before meals to stimulate digestive enzymes.",tip:"Add a teaspoon of raw apple cider vinegar to enhance bile stimulation."},
  {n:34,emoji:"🍋",name:"Citrus Liver & Gallbladder Cleanse",part:"IV",ingredients:[["1.5 tsp","Dandelion leaf (not root)"],["1.5 tsp","Artichoke leaf"],["1 tsp","Lemon balm"],["1 tsp","Lemon peel (dried)"],["0.5 tsp","Grapefruit peel (dried)"],["0.5 tsp","Fennel seed"],["0.5 tsp","Peppermint leaf"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"A bright, citrus-forward formula targeting gallbladder sludge and bile stagnation. Artichoke leaf increases bile production and flow, helping to break down fats and prevent gallstone formation.",brew:"Steep 2 tsp per cup for 8 min. Drink 20 min before a meal containing fats.",tip:"Best paired with a diet rich in bitter greens during the cleanse."},
  {n:35,emoji:"🌱",name:"Schisandra Liver Tonic & Protector",part:"IV",ingredients:[["2 tsp","Schisandra berry (crushed)"],["1.5 tsp","Milk thistle seed (crushed)"],["1 tsp","Reishi mushroom powder"],["1 tsp","Astragalus root"],["0.5 tsp","Licorice root"],["0.5 tsp","Ginger root (dried)"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"Schisandra berry supports all five liver detoxification pathways simultaneously. Clinically studied for reducing liver enzymes ALT and AST.",brew:"Simmer 2 tsp per cup for 15 min. Drink twice daily as a long-term liver tonic.",tip:"Schisandra tastes sour, sweet, salty, bitter, and pungent — all five tastes in traditional Chinese medicine."},
  {n:36,emoji:"💧",name:"Chanca Piedra Stone Breaker Kidney",part:"IV",ingredients:[["2 tsp","Chanca piedra herb (whole)"],["1.5 tsp","Marshmallow root"],["1 tsp","Corn silk (dried)"],["1 tsp","Hydrangea root"],["0.5 tsp","Gravel root (Joe Pye weed)"],["0.5 tsp","Uva ursi leaf"],["0.25 tsp","Lemon peel (dried)"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"Named 'stone breaker' in South America, chanca piedra has been used for centuries to dissolve both kidney and gallstones. Marshmallow root soothes and coats the urinary tract lining.",brew:"Steep 2 tsp per cup for 10 min. Drink 3 cups daily with at least 3 litres of water.",tip:"This blend works best with consistent daily use for 4–6 weeks."},
  {n:37,emoji:"🫧",name:"Crystal Kidney Flush & Repair",part:"IV",ingredients:[["1.5 tsp","Nettle leaf"],["1.5 tsp","Dandelion leaf"],["1 tsp","Horsetail herb"],["1 tsp","Parsley root (dried)"],["1 tsp","Corn silk (dried)"],["0.5 tsp","Goldenrod herb"],["0.25 tsp","Juniper berry (crushed)"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"A thorough kidney flush that increases urine output, flushes waste and mineral deposits, and reduces kidney inflammation. Goldenrod is clinically studied for reducing kidney inflammation.",brew:"Steep 2 tsp per cup for 8 min. Drink 2–3 cups daily throughout the day.",tip:"Drink an extra large glass of warm water with each cup."},
  {n:38,emoji:"🌊",name:"Alkaline Kidney Restore Blend",part:"IV",ingredients:[["1.5 tsp","Burdock root"],["1.5 tsp","Nettle leaf"],["1 tsp","Moringa leaf powder"],["1 tsp","Cucumber extract powder"],["0.5 tsp","Watermelon seed powder"],["0.5 tsp","Spearmint leaf"],["0.5 tsp","Lemon peel (dried)"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"Formulated to alkalise the urine and restore kidney pH balance. Watermelon seed powder is a powerful traditional kidney tonic that increases kidney filtration.",brew:"Steep 2 tsp per cup for 6–8 min. Drink cool or at room temperature.",tip:"Combine with a low-oxalate, low-sodium diet during the 2-week protocol."},
  {n:39,emoji:"🔴",name:"Red Clover Liver Blood Purifier",part:"IV",ingredients:[["2 tsp","Red clover blossoms"],["1.5 tsp","Burdock root"],["1 tsp","Yellow dock root"],["1 tsp","Cleavers herb"],["0.5 tsp","Nettle leaf"],["0.5 tsp","Calendula petals"],["0.25 tsp","Ginger root (dried)"]],yield:"Makes ~6.75 tsp dry blend (3 cups)",benefits:"A traditional blood and liver purification formula. Red clover contains isoflavones supporting liver enzyme detoxification. Yellow dock stimulates liver bile production.",brew:"Steep 2 tsp per cup for 8–10 min. Best taken as a 30-day spring cleanse.",tip:"Use every spring to reset your liver after winter."},
  {n:40,emoji:"⚗️",name:"Ultimate Liver & Kidney Master Cleanse",part:"IV",ingredients:[["1.5 tsp","Dandelion root (roasted)"],["1 tsp","Milk thistle seed (crushed)"],["1 tsp","Chanca piedra herb"],["1 tsp","Nettle leaf"],["0.5 tsp","Burdock root"],["0.5 tsp","Turmeric powder"],["0.5 tsp","Marshmallow root"],["0.25 tsp","Ginger root (dried)"],["0.25 tsp","Black pepper"]],yield:"Makes ~6.5 tsp dry blend (3 cups)",benefits:"The most comprehensive detox formula — a complete liver AND kidney dual cleanse. Milk thistle protects the liver while chanca piedra dissolves kidney deposits.",brew:"Simmer roots 12 min, steep leaves 5 min. Use 2 tsp per cup. Drink 3 cups daily.",tip:"During the 21-day protocol, avoid alcohol, processed foods, and refined sugar completely."},
];

const PART_ACCENT = { I:"#52b882", II:"#4878cc", III:"#a850c8", IV:"#c87020" };
const PART_ACCENT_BG = {
  I:"linear-gradient(90deg,#1a5c38,#52b882,#1a5c38)",
  II:"linear-gradient(90deg,#1a3068,#4878cc,#1a3068)",
  III:"linear-gradient(90deg,#521870,#a850c8,#521870)",
  IV:"linear-gradient(90deg,#6a2808,#c87020,#6a2808)",
};
const RISK_COLORS = { low:"#3aa86a", moderate:"#d4880a", high:"#c83030" };
const RISK_LABELS = { low:"Low risk", moderate:"Moderate caution", high:"High caution" };
const FDA_BG = { low:"#173322", moderate:"#5a2c00", high:"#5a0000" };
const FDA_LABELS = { low:"LOW INTERACTION RISK", moderate:"MODERATE — CONSULT YOUR DOCTOR", high:"HIGH — IMPORTANT WARNINGS" };

// ─── Sub-components ────────────────────────────────────────────────────────

function HerbPill({ text, overflow }) {
  return (
    <span style={{
      display:"inline-block",
      fontFamily:"'DM Sans',sans-serif", fontSize:10,
      color: overflow ? T.gold : T.sage,
      background: overflow ? T.goldPale : T.mist,
      border: `1px solid ${overflow ? "rgba(192,136,48,.2)" : T.mistDark}`,
      borderRadius:20, padding:"3px 9px", whiteSpace:"nowrap",
      fontStyle: overflow ? "italic" : "normal",
    }}>{text}</span>
  );
}

function RiskDot({ level }) {
  return (
    <span style={{
      display:"inline-block", width:7, height:7, borderRadius:"50%",
      background: RISK_COLORS[level],
      boxShadow:`0 0 5px ${RISK_COLORS[level]}66`,
      flexShrink:0, marginRight:5,
    }}/>
  );
}

function BlendCard({ blend, onClick }) {
  const fda = FDA[blend.n] || { level:"low" };
  const visibleHerbs = blend.ingredients.slice(0, 4);
  const extra = blend.ingredients.length - 4;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.cream,
        borderRadius: 22,
        overflow:"hidden",
        cursor:"pointer",
        border:"1px solid rgba(255,255,255,.06)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,.28), 0 20px 56px rgba(0,0,0,.22)"
          : "0 2px 12px rgba(0,0,0,.18), 0 8px 32px rgba(0,0,0,.14)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:"transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease",
      }}
    >
      {/* accent bar */}
      <div style={{ height:4, background: PART_ACCENT_BG[blend.part] }} />

      <div style={{ padding:"18px 20px 20px" }}>
        {/* top row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:9.5, fontWeight:600, letterSpacing:".22em", color: T.sageLt }}>
            No. {String(blend.n).padStart(2,"0")}
          </span>
          <span style={{
            fontFamily:"'Cinzel',serif", fontSize:8, fontWeight:600, letterSpacing:".14em",
            padding:"3px 9px", borderRadius:20, textTransform:"uppercase",
            background:`rgba(${blend.part==="I"?"26,92,56":blend.part==="II"?"26,48,104":blend.part==="III"?"82,24,112":"170,92,24"},.09)`,
            color: blend.part==="I"?"#1a5c38":blend.part==="II"?"#1a3068":blend.part==="III"?"#521870":"#aa5c18",
            border:`1px solid rgba(${blend.part==="I"?"26,92,56":blend.part==="II"?"26,48,104":blend.part==="III"?"82,24,112":"170,92,24"},.15)`,
          }}>Part {blend.part}</span>
        </div>

        {/* emoji + name */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <span style={{ fontSize:34, lineHeight:1, flexShrink:0 }}>{blend.emoji}</span>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:600, color:T.forest, lineHeight:1.25 }}>{blend.name}</div>
        </div>

        {/* excerpt */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:13.5, fontStyle:"italic",
          color:"#656056", lineHeight:1.65, marginBottom:14,
          display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>{blend.benefits}</p>

        {/* herb pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
          {visibleHerbs.map(([,h],i) => <HerbPill key={i} text={h}/>)}
          {extra > 0 && <HerbPill text={`+${extra} more`} overflow />}
        </div>

        {/* footer */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:"1px solid rgba(0,0,0,.07)", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#aaa" }}>
            <RiskDot level={fda.level}/>
            {RISK_LABELS[fda.level]}
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:500, letterSpacing:".16em", color:T.sage, textTransform:"uppercase", display:"flex", alignItems:"center", gap: hovered?7:5, transition:"gap .15s" }}>
            View Recipe <span style={{ transform: hovered?"translateX(3px)":"translateX(0)", transition:"transform .15s", display:"inline-block" }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailCapture({ blendName, signupType, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) { setError("Please enter your name."); return; }
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) { setError("Please enter a valid email."); return; }
    setSubmitting(true);
    setError(null);
    const { error: dbErr } = await supabase.from("waitlist_signups").insert({ name: trimmedName, email: trimmedEmail, blend_name: blendName, signup_type: signupType });
    setSubmitting(false);
    if (dbErr) { setError("Something went wrong. Please try again."); return; }
    onDone();
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7, width:"100%", marginTop:4 }}>
      <input
        type="text"
        value={name}
        onChange={e => { setName(e.target.value); setError(null); }}
        onKeyDown={e => e.key === "Enter" && submit()}
        placeholder="Your name"
        style={{ width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,.08)", border:`1px solid rgba(82,184,130,.35)`, borderRadius:20, padding:"7px 13px", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#fff", outline:"none", marginBottom:2 }}
      />
      <div style={{ display:"flex", gap:6 }}>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(null); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="your@email.com"
          style={{ flex:1, minWidth:0, background:"rgba(255,255,255,.08)", border:`1px solid rgba(82,184,130,.35)`, borderRadius:20, padding:"7px 13px", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#fff", outline:"none" }}
        />
        <button
          onClick={submit}
          disabled={submitting}
          style={{ flexShrink:0, fontFamily:"'Cinzel',serif", fontSize:8.5, fontWeight:500, letterSpacing:".14em", textTransform:"uppercase", color:"#0d1a11", background: submitting?"#7dd9a8":"#52b882", border:"none", borderRadius:20, padding:"7px 14px", cursor: submitting?"default":"pointer", transition:"background .15s", whiteSpace:"nowrap" }}
          onMouseEnter={e => { if (!submitting) e.currentTarget.style.background="#7dd9a8"; }}
          onMouseLeave={e => { if (!submitting) e.currentTarget.style.background="#52b882"; }}>
          {submitting ? "…" : "Submit"}
        </button>
      </div>
      {error && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10.5, color:"#e07070" }}>{error}</div>}
    </div>
  );
}

function OrderSection({ blendName, onAddToCart }) {
  const [teaState,   setTeaState]   = useState("idle");   // idle | added
  const [herbsState, setHerbsState] = useState("idle");
  const [notifyState, setNotifyState] = useState("idle"); // idle | capturing | done

  // Find the blend price from the blend name
  const BLEND_PRICES = {
    default: 18.99,
  };

  const card = (state, setState, icon, label, desc, price) => (
    <div style={{ flex:1, minWidth:0, background:"rgba(255,255,255,.05)", border:`1px solid ${state==="added"?"rgba(82,184,130,.5)":"rgba(82,184,130,.18)"}`, borderRadius:14, padding:"18px 16px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, textAlign:"center", transition:"border-color .2s" }}>
      <span style={{ fontSize:28 }}>{icon}</span>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:600, color:"#fff", lineHeight:1.25 }}>{label}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,.45)", lineHeight:1.5, textAlign:"center" }}>{desc}</div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, fontWeight:600, color:"rgba(192,136,48,.9)" }}>${price.toFixed(2)}</div>
      {state === "added" ? (
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#52b882", lineHeight:1.5, display:"flex", alignItems:"center", gap:6 }}>
          <span>✓</span> Added to cart
        </div>
      ) : (
        <button
          onClick={() => { setState("added"); onAddToCart && onAddToCart({ id: `tl-${blendName}-${label}`, name: `${blendName} — ${label}`, price, emoji: icon }); }}
          style={{ marginTop:2, fontFamily:"'Cinzel',serif", fontSize:8.5, fontWeight:500, letterSpacing:".15em", textTransform:"uppercase", color:"#0d1a11", background:"#52b882", border:"none", borderRadius:20, padding:"9px 16px", cursor:"pointer", transition:"all .18s", whiteSpace:"nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.background="#7dd9a8"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#52b882"; }}>
          🛒 Add to Cart
        </button>
      )}
    </div>
  );

  return (
    <div style={{ borderRadius:14, overflow:"hidden", marginBottom:20, background:"#0d1a11", border:"1px solid rgba(82,184,130,.15)" }}>
      {/* header */}
      <div style={{ padding:"12px 18px 10px", borderBottom:"1px solid rgba(82,184,130,.12)" }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600, letterSpacing:".3em", textTransform:"uppercase", color:"#52b882", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ display:"inline-block", width:16, height:1, background:"#52b882", flexShrink:0 }}/>
          Order from Chai Holistic
        </div>
      </div>

      {/* two option cards */}
      <div style={{ padding:"16px 16px 0", display:"flex", gap:12 }}>
        {card(teaState, setTeaState, "🍵", "Pre-Blended Tea", "Ready to steep. We blend it for you.", 18.99)}
        {card(herbsState, setHerbsState, "🌿", "Individual Herbs", "Raw bulk herbs. Blend your own.", 14.99)}
      </div>

      {/* personalization / notify strip */}
      <div style={{ margin:"14px 16px 16px", background:"rgba(82,184,130,.06)", border:"1px solid rgba(82,184,130,.18)", borderRadius:10, padding:"12px 16px" }}>
        {notifyState === "done" ? (
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#52b882", lineHeight:1.55 }}>
            ✓ We have your details. Your custom blend profile is saved — we'll be in touch as we expand customization options.
          </div>
        ) : notifyState === "capturing" ? (
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:13, color:"rgba(255,255,255,.55)", lineHeight:1.45, marginBottom:10 }}>
              Want a <strong style={{color:"#52b882"}}>personalized blend</strong> crafted specifically for you? Leave your details and we'll reach out.
            </div>
            <EmailCapture blendName={blendName} signupType="custom" onDone={() => setNotifyState("done")} />
          </div>
        ) : (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:13, color:"rgba(255,255,255,.55)", lineHeight:1.45 }}>
              Want this blend <span style={{ color:"#52b882" }}>personalized just for you</span>? We can customize the blend to your specific wellness profile.
            </span>
            <button
              onClick={() => setNotifyState("capturing")}
              style={{ flexShrink:0, fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:500, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(192,136,48,.9)", background:"rgba(192,136,48,.1)", border:"1px solid rgba(192,136,48,.35)", borderRadius:20, padding:"9px 18px", cursor:"pointer", transition:"all .18s", whiteSpace:"nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(192,136,48,.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(192,136,48,.1)"; }}>
              ✦ Personalize My Blend →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlendModal({ blend, onClose, onPrev, onNext, current, total, onAddToCart }) {
  const fda = FDA[blend.n] || { level:"low", warnings:[] };
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position:"fixed", inset:0,
        background:"rgba(6,14,9,.88)",
        backdropFilter:"blur(18px) saturate(140%)",
        zIndex:900,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:18,
      }}
    >
      <div style={{
        background:T.cream, borderRadius:28,
        width:"100%", maxWidth:660,
        maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 24px 80px rgba(0,0,0,.6), 0 4px 24px rgba(0,0,0,.3)",
        border:"1px solid rgba(255,255,255,.06)",
      }}>
        {/* accent bar */}
        <div style={{ height:5, background: PART_ACCENT_BG[blend.part], borderRadius:"28px 28px 0 0" }} />

        {/* header */}
        <div style={{ padding:"22px 26px 16px", position:"sticky", top:0, background:T.cream, zIndex:10, borderBottom:"1px solid rgba(0,0,0,.07)" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".24em", color:T.sageLt, marginBottom:4 }}>
                No. {String(blend.n).padStart(2,"0")} · Part {blend.part}
              </div>
              <div style={{ fontSize:42, lineHeight:1, display:"block", marginBottom:8 }}>{blend.emoji}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:T.forest, lineHeight:1.2 }}>{blend.name}</div>
            </div>
            <button onClick={onClose} style={{
              background:"rgba(0,0,0,.07)", border:"none", borderRadius:"50%",
              width:32, height:32, fontSize:14, cursor:"pointer", color:"#999",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2,
            }}>✕</button>
          </div>
        </div>

        {/* content */}
        <div style={{ padding:"22px 26px 26px" }}>
          {/* ingredients */}
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600, letterSpacing:".3em", color:T.sageLt, textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"inline-block", width:16, height:1, background:T.gold, flexShrink:0 }}/>
            Ingredients
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", borderRadius:10, overflow:"hidden", marginBottom:6 }}>
            <thead>
              <tr style={{ background:T.fern }}>
                <th style={{ fontFamily:"'Cinzel',serif", fontSize:8, fontWeight:600, letterSpacing:".22em", color:T.goldLt, padding:"8px 12px", textAlign:"left", textTransform:"uppercase" }}>Amount</th>
                <th style={{ fontFamily:"'Cinzel',serif", fontSize:8, fontWeight:600, letterSpacing:".22em", color:T.goldLt, padding:"8px 12px", textAlign:"left", textTransform:"uppercase" }}>Ingredient</th>
              </tr>
            </thead>
            <tbody>
              {blend.ingredients.map(([amt, herb], i) => (
                <tr key={i} style={{ background: i%2===0 ? T.warmWhite : T.mist }}>
                  <td style={{ padding:"7px 12px", borderBottom:"1px solid rgba(82,184,130,.1)", fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:600, color:T.sage, whiteSpace:"nowrap", width:72 }}>{amt}</td>
                  <td style={{ padding:"7px 12px", borderBottom:"1px solid rgba(82,184,130,.1)", fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontStyle:"italic", color:"#3a3530" }}>{herb}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.sageLt, fontStyle:"italic", margin:"8px 0 20px", paddingLeft:2 }}>{blend.yield}</p>

          {/* benefits */}
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600, letterSpacing:".3em", color:T.sageLt, textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"inline-block", width:16, height:1, background:T.gold, flexShrink:0 }}/>
            Healing Benefits
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, lineHeight:1.75, color:"#454035", marginBottom:20 }}>{blend.benefits}</p>

          {/* brew + tip */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div style={{ borderRadius:10, padding:"14px 16px", background:T.mist, borderLeft:`3px solid ${T.mint}` }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:8.5, fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", color:T.sage, marginBottom:6 }}>☕ Brewing</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13.5, fontStyle:"italic", color:"#555", lineHeight:1.65 }}>{blend.brew}</p>
            </div>
            <div style={{ borderRadius:10, padding:"14px 16px", background:T.goldPale, borderLeft:`3px solid ${T.gold}` }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:8.5, fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", color:T.gold, marginBottom:6 }}>✦ Pro Tip</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13.5, fontStyle:"italic", color:"#555", lineHeight:1.65 }}>{blend.tip}</p>
            </div>
          </div>

          {/* FDA */}
          <div style={{ borderRadius:10, overflow:"hidden", border:"1.5px solid rgba(212,136,10,.35)", marginBottom:20 }}>
            <div style={{ padding:"8px 14px", display:"flex", alignItems:"center", gap:7, background: FDA_BG[fda.level] }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:8.5, fontWeight:600, letterSpacing:".22em", textTransform:"uppercase", color:"#f5d8a0" }}>
                ⚕ FDA Safety · {FDA_LABELS[fda.level]}
              </span>
            </div>
            <div style={{ padding:"12px 16px", background:"#fffcf4" }}>
              {fda.warnings.map((w,i) => (
                <p key={i} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic", color:"#5a3200", lineHeight:1.65, marginBottom:6 }}>⚠ {w}</p>
              ))}
              <div style={{ marginTop:10, padding:"9px 12px", background:"#eff7f2", borderRadius:7, borderLeft:`3px solid ${T.mint}`, fontFamily:"'DM Sans',sans-serif", fontSize:10, color:T.sage, lineHeight:1.55 }}>
                ✦ This statement has not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare provider before beginning any herbal protocol.
              </div>
            </div>
          </div>

          <OrderSection blendName={blend.name} onAddToCart={onAddToCart} />
        </div>

        {/* nav bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 26px 20px", background:T.parchment, borderTop:"1px solid rgba(0,0,0,.07)", borderRadius:"0 0 28px 28px" }}>
          <NavBtn onClick={onPrev} disabled={current===0}>← Prev</NavBtn>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#bbb", fontStyle:"italic" }}>{current+1} of {total}</span>
          <NavBtn onClick={onNext} disabled={current===total-1}>Next →</NavBtn>
        </div>
      </div>
    </div>
  );
}

function NavBtn({ onClick, disabled, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".18em", textTransform:"uppercase",
        color: hov && !disabled ? T.goldLt : T.sage,
        background: hov && !disabled ? T.fern : "transparent",
        border:`1px solid ${hov && !disabled ? T.fern : "rgba(39,92,62,.25)"}`,
        borderRadius:20, padding:"8px 18px", cursor: disabled ? "default" : "pointer",
        display:"flex", alignItems:"center", gap:6,
        opacity: disabled ? 0.22 : 1,
        transition:"all .15s",
      }}
    >{children}</button>
  );
}

// ─── Main TeaLibrary component ─────────────────────────────────────────────


export default function TeaLibrary({ deepBlend, onDeepBlendConsumed, onAddToCart }) {
  const { T: TL, lang } = useLang();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalIdx, setModalIdx] = useState(null);

  const filtered = BLENDS.filter(b => {
    const matchPart = filter === "all" || b.part === filter || FDA[b.n]?.level === filter;
    const q = search.toLowerCase();
    const matchQ = !q || b.name.toLowerCase().includes(q) || b.benefits.toLowerCase().includes(q) || b.ingredients.some(([,h]) => h.toLowerCase().includes(q));
    return matchPart && matchQ;
  });

  // Auto-open modal when navigated from Tea Finder (name string) or homepage teaser (blend number)
  useEffect(() => {
    if (deepBlend === null || deepBlend === undefined) return;
    let idx = -1;
    if (typeof deepBlend === "number") {
      // Blend number passed from teaser cards — match against b.n in the full BLENDS list
      const blendN = deepBlend;
      idx = filtered.findIndex(b => b.n === blendN);
      if (idx === -1) {
        // Blend may be filtered out — reset filter to "all" and search again
        const globalIdx = BLENDS.findIndex(b => b.n === blendN);
        if (globalIdx !== -1) idx = globalIdx;
      }
    } else {
      // Name string passed from Tea Finder — fuzzy match
      const q = String(deepBlend).toLowerCase();
      idx = filtered.findIndex(b => b.name.toLowerCase() === q);
      if (idx === -1) {
        const words = q.split(/\s+/).filter(w => w.length > 3);
        idx = filtered.findIndex(b => words.some(w => b.name.toLowerCase().includes(w) || (b.benefit||b.benefits||"").toLowerCase().includes(w)));
      }
    }
    if (idx !== -1) openModal(idx);
    onDeepBlendConsumed?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepBlend]);

  const openModal = (idx) => { setModalIdx(idx); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setModalIdx(null); document.body.style.overflow = ""; };
  const prevModal = () => { if (modalIdx > 0) setModalIdx(modalIdx - 1); };
  const nextModal = () => { if (modalIdx < filtered.length - 1) setModalIdx(modalIdx + 1); };

  const filterChips = [
    { v:"all", l:`All 40` },
    { v:"I",   l:"Part I · Foundational" },
    { v:"II",  l:"Part II · Advanced" },
    { v:"III", l:"Part III · Sacred" },
    { v:"IV",  l:"Part IV · Cleanse", amber: true },
    { v:"low",      l:"🟢 Low Risk" },
    { v:"moderate", l:"🟡 Moderate" },
    { v:"high",     l:"🔴 High Caution" },
  ];

  return (
    <div style={{ background:T.forest, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Atmospheric gradient */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 90% 60% at 8% -5%, rgba(82,184,130,.08) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 92% 105%, rgba(192,136,48,.07) 0%, transparent 55%)" }}/>

      <div style={{ position:"relative", zIndex:1 }}>
        {/* ── Hero ── */}
        <div id="sec-tl-top" style={{ maxWidth:1440, margin:"0 auto", padding:"48px 36px 0", textAlign:"center" }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:9.5, fontWeight:500, letterSpacing:".38em", textTransform:"uppercase", color:T.mint, display:"block", marginBottom:14 }}>
            Chai Holistic
          </span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:700, lineHeight:1.1, color:"#fff", marginBottom:10 }}>
            Tea Library
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontStyle:"italic", color:"rgba(255,255,255,.42)", lineHeight:1.6, marginBottom:0 }}>
            40 therapeutic blends — from foundational wellness to sacred ceremony
          </p>
          <div style={{ width:48, height:1, background:`linear-gradient(90deg, transparent, ${T.gold}, transparent)`, margin:"18px auto 0" }}/>
        </div>

        {/* ── Controls ── */}
        <div id="sec-tl-search" style={{ maxWidth:1440, margin:"0 auto", padding:"24px 36px 0" }}>
          <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:22, padding:"18px 22px", backdropFilter:"blur(8px)" }}>
            {/* search row */}
            <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", marginBottom:14 }}>
              <div style={{ position:"relative", flex:1, minWidth:220, maxWidth:400 }}>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,.28)", fontSize:14, pointerEvents:"none" }}>⌕</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search blends, herbs, benefits…"
                  style={{
                    width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(82,184,130,.18)",
                    borderRadius:30, padding:"9px 16px 9px 38px",
                    fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#fff",
                    outline:"none",
                  }}
                />
              </div>
            </div>
            {/* filter chips */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:".08em", color:"rgba(255,255,255,.25)", marginRight:2 }}>Filter</span>
              {filterChips.map(chip => {
                const active = filter === chip.v;
                return (
                  <button key={chip.v} onClick={() => setFilter(chip.v)} style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:400,
                    color: active ? "#fff" : "rgba(255,255,255,.45)",
                    background: active
                      ? (chip.amber ? "rgba(170,92,24,.18)" : "rgba(82,184,130,.18)")
                      : "rgba(255,255,255,.04)",
                    border: `1px solid ${active ? (chip.amber ? "rgba(170,92,24,.5)" : "rgba(82,184,130,.5)") : "rgba(255,255,255,.09)"}`,
                    borderRadius:20, padding:"5px 13px", cursor:"pointer", whiteSpace:"nowrap",
                    transition:"all .15s",
                  }}>{chip.l}</button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Count bar ── */}
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"10px 36px 6px" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,.26)", letterSpacing:".05em" }}>
            <strong style={{ color:"rgba(255,255,255,.55)" }}>{filtered.length}</strong> blends shown
          </span>
        </div>

        {/* ── Grid ── */}
        <div id="sec-tl-grid" style={{ maxWidth:1440, margin:"0 auto", padding:"8px 36px 80px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 20px" }}>
              <span style={{ fontSize:48, display:"block", marginBottom:12 }}>🍵</span>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"rgba(255,255,255,.5)", marginBottom:6 }}>No blends found</h3>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontStyle:"italic", color:"rgba(255,255,255,.28)" }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(310px, 1fr))", gap:18 }}>
              {filtered.map((blend, i) => (
                <BlendCard key={blend.n} blend={blend} onClick={() => openModal(i)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {modalIdx !== null && (
        <BlendModal
          blend={filtered[modalIdx]}
          onClose={closeModal}
          onPrev={prevModal}
          onNext={nextModal}
          current={modalIdx}
          total={filtered.length}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
