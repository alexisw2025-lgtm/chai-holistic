import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLang } from "./LangContext";

// ─────────────────────────────────────────────────────────────────────────────
// BLEND LOOKUP — maps herb.blends[] names to shop card data
// Keeps HerbApothecary self-contained without importing the full BLENDS array
// ─────────────────────────────────────────────────────────────────────────────
const BLEND_LOOKUP = {
  "Morning Rise":          { color:"#5C7A3E", price:17.99, tagline:"Greet the day with intention", benefit:"Energize · Focus · Uplift", photo:"https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "2AM Reset":             { color:"#4A3728", price:18.99, tagline:"For restless nights & racing minds", benefit:"Calm · Restore · Ground", photo:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Cerasee & Ginger Blend":{ color:"#1A3A1A", price:17.99, tagline:"Caribbean bush medicine meets warming ginger", benefit:"Blood Sugar · Cleanse · Warmth", photo:"https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Grandmother's Cerasee Blood Cleanse":{ color:"#1A3A1A", price:16.99, tagline:"The traditional Jamaican blood cleansing herb", benefit:"Blood Cleanse · Detox · Ancestral", photo:"https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Immunity Shield":       { color:"#2A5A1A", price:21.99, tagline:"Full-spectrum immune protection", benefit:"Immune · Antiviral · Fortify", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Golden Healer":         { color:"#C47A1A", price:20.99, tagline:"Golden medicine in every cup", benefit:"Anti-inflammatory · Liver · Joints", photo:"https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Liver & Love":          { color:"#6B2A0A", price:19.99, tagline:"For the organ that does everything", benefit:"Liver Cleanse · Detox · Regeneration", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Deep Liver Cleanse":    { color:"#4A1A0A", price:22.99, tagline:"A thorough cleanse for a heavy load", benefit:"Deep Detox · Liver · Bile Flow", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Full Body Detox":       { color:"#2A4A1A", price:24.99, tagline:"The complete reset", benefit:"Full Body · Complete · Reset", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Blood Purifier":        { color:"#6B1A1A", price:19.99, tagline:"Cleanse and renew your blood", benefit:"Blood · Skin · Purify", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Kidney Flush":          { color:"#1A4A6B", price:18.99, tagline:"Gentle support for your hardest-working organs", benefit:"Kidney · Urinary · Flush", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Kidney Stone Support":  { color:"#1A3A5A", price:19.99, tagline:"Dissolve, flush, protect", benefit:"Kidney Stones · Urinary · Flow", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Urinary Tract Clear":   { color:"#1A5A6B", price:18.99, tagline:"Soothe, cleanse, and restore", benefit:"UTI · Urinary · Soothe", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Night Flow Reset":      { color:"#1A1A4A", price:18.99, tagline:"Nighttime urinary and calm support", benefit:"Kidney · Calm · Overnight", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Dream Catcher":         { color:"#2A1A4A", price:18.99, tagline:"Drift into deep, restoring sleep", benefit:"Sleep · Peace · Deep Rest", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Calm Within":           { color:"#4A3A6B", price:17.99, tagline:"Quiet the noise. Find your center.", benefit:"Anxiety · Calm · Nervous System", photo:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Heart Opener":          { color:"#8B1A3A", price:19.99, tagline:"Love, circulation, and the heart that holds it all", benefit:"Heart · Blood Pressure · Mood", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Stress Armor":          { color:"#3A2A1A", price:19.99, tagline:"Build real physiological stress resistance", benefit:"Cortisol · Adaptogen · Resilience", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Gut & Glow":            { color:"#5A8A2A", price:18.99, tagline:"Heal from the inside out", benefit:"Gut Lining · Skin · Microbiome", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Gut Reset":             { color:"#3A6B2A", price:19.99, tagline:"Restore your gut to its natural harmony", benefit:"IBS · Microbiome · Bloating", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Lymph Mover":           { color:"#4A6B3A", price:18.99, tagline:"Keep the current flowing", benefit:"Lymph · Immune · Drainage", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Blood Builder":         { color:"#6B1A2A", price:18.99, tagline:"Iron-rich nourishment for your blood", benefit:"Iron · Anemia · Minerals", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Sacred Womb":           { color:"#8B2A4A", price:20.99, tagline:"Nourish the sacred feminine", benefit:"Hormones · Womb · Nourish", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Fertility Bloom":       { color:"#6B3A4A", price:21.99, tagline:"Bloom into your fullness", benefit:"Fertility · Hormones · Vitality", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "PSA Defense Blend":     { color:"#1A3A2A", price:21.99, tagline:"Prostate health from the inside out", benefit:"Prostate · PSA · Anti-inflammatory", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Testosterone & Prostate Balance": { color:"#2A1A3A", price:21.99, tagline:"Hormonal balance and prostate protection", benefit:"Testosterone · Prostate · Hormones", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Post-50 Men's Foundation": { color:"#3A2A1A", price:22.99, tagline:"Built for the wisdom years", benefit:"Longevity · Vitality · Balance", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Skin Deep":             { color:"#8A4A1A", price:18.99, tagline:"Clear skin starts within", benefit:"Skin · Blood · Clarity", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Liver Bile Flow":       { color:"#5A3A0A", price:19.99, tagline:"Keep your bile flowing, keep your body clean", benefit:"Bile · Liver · Fat Digestion", photo:"https://images.pexels.com/photos/4022184/pexels-photo-4022184.jpeg?auto=compress&cs=tinysrgb&w=400" },
  "Ancestral Fire":        { color:"#8B3A1A", price:18.99, tagline:"The warmth of ancestral medicine", benefit:"Circulation · Blood Sugar · Warmth", photo:"https://images.pexels.com/photos/15529707/pexels-photo-15529707.jpeg?auto=compress&cs=tinysrgb&w=400" },
};



const HERB_DATA = [
  {
    id:"h1", name:"Ceylon Cinnamon", latin:"Cinnamomum verum", origin:"Sri Lanka · South India", family:"Lauraceae",
    category:["blood sugar","anti-inflammatory","warming","circulation"],
    tags:["Blood Sugar","Warmth","Anti-inflammatory"], color:"#8B3A2A",
    photo:"/herbs/cinnamon.jpg", fallback:"https://images.pexels.com/photos/15529707/pexels-photo-15529707.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🪵", tagline:"The gentle blood sugar guardian of the spice world",
    history:"Ceylon cinnamon — called 'true cinnamon' to distinguish it from the harsher Cassia variety — has been prized for over 4,000 years. Ancient Egyptians imported it from South Asia for embalming and as a gift worthy of kings. It appears in the Hebrew Bible, was traded along the Silk Road, and was so valuable in 16th-century Europe that Portugal fought wars to control the Sri Lankan cinnamon trade. In Ayurvedic medicine it has been used for millennia to support digestion, circulation, and blood vitality. In Jamaican bush medicine, cinnamon bark tea is a home remedy for colds, poor circulation, and monthly cramps.",
    benefits:[
      {title:"Blood Sugar Regulation", desc:"Cinnamaldehyde — cinnamon's primary active compound — improves insulin sensitivity and slows the breakdown of carbohydrates in the digestive tract, moderating post-meal blood sugar spikes."},
      {title:"Anti-inflammatory", desc:"Contains powerful polyphenols that reduce inflammatory markers in the body, particularly relevant for chronic low-grade inflammation linked to modern lifestyle diseases."},
      {title:"Heart Health", desc:"Studies show Ceylon cinnamon reduces LDL cholesterol and triglycerides while maintaining HDL levels, supporting overall cardiovascular health."},
      {title:"Antioxidant Protection", desc:"Ranked among the highest antioxidant foods by ORAC score — higher than garlic and oregano — protecting cells from oxidative damage."},
      {title:"Antimicrobial", desc:"Effective against common bacteria and fungi, including Candida strains, making it useful for gut balance and oral health."},
    ],
    sources:[
      {org:"National Institutes of Health (NIH)", finding:"Meta-analysis of 10 randomized controlled trials found cinnamon significantly reduced fasting blood glucose levels", url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4003790/"},
      {org:"Journal of the Academy of Nutrition and Dietetics", finding:"Cinnamon consumption associated with statistically significant improvements in fasting plasma glucose", url:"https://pubmed.ncbi.nlm.nih.gov/25652711/"},
      {org:"Ayurvedic Pharmacopoeia of India", finding:"Classifies Cinnamomum verum (Tvak) as a warming digestive herb supporting agni and circulation", url:""},
    ],
    caution:"Cassia cinnamon contains high levels of coumarin which can stress the liver in large amounts. Ceylon cinnamon is safe at culinary doses. If diabetic and on medication, monitor blood sugar as cinnamon can enhance medication effects.",
    blends:["Morning Rise","2AM Reset","Cinnamon & Cloves","Ancestral Fire"],
  },
  {
    id:"h2", name:"Ginger Root", latin:"Zingiber officinale", origin:"Southeast Asia · India", family:"Zingiberaceae",
    category:["digestion","nausea","anti-inflammatory","circulation","immune"],
    tags:["Digestion","Nausea","Circulation"], color:"#8B6914",
    photo:"/herbs/ginger.jpg", fallback:"https://images.pexels.com/photos/10112135/pexels-photo-10112135.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌱", tagline:"The universal medicine of ancient healers worldwide",
    history:"Ginger has been cultivated for over 5,000 years and is one of the most universally used medicinal plants on earth. It spread from Southeast Asia along ancient trade routes, arriving in India where it became foundational to Ayurvedic practice — referenced in the Charaka Samhita as a digestive and circulatory tonic. In Jamaican folk medicine, ginger tea is the first response to cold, nausea, menstrual pain, and upset stomach. Chinese medicine has used it for 2,500 years as a yang-warming herb. Medieval European physicians prescribed it against plague. There is perhaps no culture with a healing tradition that does not include ginger.",
    benefits:[
      {title:"Nausea & Vomiting", desc:"The most clinically studied natural anti-nausea remedy. Effective for morning sickness, chemotherapy-induced nausea, and motion sickness, with multiple randomized controlled trials confirming efficacy."},
      {title:"Digestive Support", desc:"Gingerols and shogaols stimulate digestive enzymes, speed gastric emptying, and reduce bloating, cramping, and indigestion. A genuine digestive tonic."},
      {title:"Anti-inflammatory & Pain Relief", desc:"Inhibits prostaglandin and leukotriene synthesis — similar mechanisms to NSAIDs but without the side effects. Shown to reduce osteoarthritis pain and muscle soreness."},
      {title:"Circulation", desc:"Warming thermogenic effect improves peripheral blood flow. Traditional use for cold extremities and cardiovascular protection is supported by modern lipid research."},
      {title:"Immune Activation", desc:"Antiviral and antibacterial properties help the body fight respiratory infections. Rich in antioxidants that reduce immune-suppressing oxidative stress."},
    ],
    sources:[
      {org:"Obstetrics & Gynecology (ACOG Journal)", finding:"Ginger effective and safe for nausea and vomiting of pregnancy — recommended as first-line non-pharmacological treatment", url:"https://pubmed.ncbi.nlm.nih.gov/15738023/"},
      {org:"Arthritis & Rheumatism Journal", finding:"Ginger extract significantly reduced knee pain in osteoarthritis patients compared to placebo", url:"https://pubmed.ncbi.nlm.nih.gov/11710709/"},
      {org:"WHO Monographs on Selected Medicinal Plants", finding:"Officially recognizes ginger for prevention of nausea, vomiting, and dyspeptic complaints", url:"https://apps.who.int/medicinedocs/en/m/abstract/Js2200e/"},
    ],
    caution:"Generally very safe at culinary and tea doses. May interact with blood thinners (warfarin) at high supplemental doses. Use cautiously in late pregnancy beyond culinary amounts.",
    blends:["Morning Rise","2AM Reset","Cerasee & Ginger Blend","Immunity Shield","Golden Healer"],
  },
  {
    id:"h3", name:"Turmeric Root", latin:"Curcuma longa", origin:"India · Southeast Asia", family:"Zingiberaceae",
    category:["anti-inflammatory","liver","joints","brain","antioxidant"],
    tags:["Anti-inflammatory","Liver","Joints"], color:"#C4790A",
    photo:"/herbs/turmeric.jpg", fallback:"https://images.pexels.com/photos/36075348/pexels-photo-36075348.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"✨", tagline:"The golden root — 4,000 years of healing wisdom",
    history:"Turmeric has been used medicinally in India for over 4,000 years. It is the central herb of Ayurvedic medicine, referenced in the ancient Atharva Veda as a purifier and healer. Known as haridra in Sanskrit, turmeric was used in religious ceremonies, wound healing, and daily cooking as preventive medicine. Traditional Chinese medicine adopted it for blood and qi stagnation. In the Caribbean, golden milk prepared with turmeric was used for joint pain, infections, and digestive upset. Modern science has now identified curcumin — turmeric's key active compound — as one of the most studied phytochemicals on earth.",
    benefits:[
      {title:"Powerful Anti-inflammatory", desc:"Curcumin blocks NF-kB — a key inflammatory signaling molecule — with potency comparable to some pharmaceutical anti-inflammatories, but without their side effect profile."},
      {title:"Liver Protection & Detox", desc:"Stimulates bile production, protects liver cells from toxin damage, and supports the liver's phase-2 detoxification pathways. Well-studied for non-alcoholic fatty liver support."},
      {title:"Brain Health & Neuroprotection", desc:"Curcumin crosses the blood-brain barrier and increases BDNF (brain-derived neurotrophic factor) — supporting memory, mood, and protection against neurodegenerative disease."},
      {title:"Joint & Arthritis Support", desc:"Multiple clinical trials confirm turmeric as effective as ibuprofen for knee osteoarthritis pain, with a superior safety profile."},
      {title:"Antioxidant — Direct & Indirect", desc:"Both directly neutralizes free radicals AND stimulates the body's own antioxidant enzymes, creating a dual protective effect."},
    ],
    sources:[
      {org:"Journal of Medicinal Food", finding:"Curcumin as effective as ibuprofen in knee osteoarthritis pain reduction with fewer gastrointestinal side effects", url:"https://pubmed.ncbi.nlm.nih.gov/24853120/"},
      {org:"Phytotherapy Research", finding:"Curcumin significantly reduced inflammatory markers IL-6, TNF-α and CRP in clinical trials", url:"https://pubmed.ncbi.nlm.nih.gov/26007179/"},
      {org:"Advances in Experimental Medicine and Biology", finding:"Curcumin's BDNF-increasing properties support potential in depression and cognitive decline prevention", url:"https://pubmed.ncbi.nlm.nih.gov/17569207/"},
    ],
    caution:"Turmeric is absorbed poorly on its own — always pair with black pepper (piperine increases absorption by 2,000%) or a healthy fat. At therapeutic doses, may interact with blood thinners. Avoid high supplemental doses during pregnancy.",
    blends:["Golden Healer","Liver & Love","Deep Liver Cleanse","PSA Defense Blend"],
  },
  {
    id:"h4", name:"Dandelion Root", latin:"Taraxacum officinale", origin:"Eurasia · Worldwide", family:"Asteraceae",
    category:["liver","digestion","detox","kidney","prebiotic"],
    tags:["Liver Cleanse","Digestion","Detox"], color:"#8A7A14",
    photo:"/herbs/dandelion.jpg", fallback:"https://images.pexels.com/photos/14379617/pexels-photo-14379617.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌼", tagline:"The humble weed that heals what pharmaceuticals ignore",
    history:"Considered a weed by most gardeners, dandelion is one of humanity's oldest and most widely used medicinal plants. Arab physicians of the 10th and 11th centuries documented its liver-healing properties. It appears in Welsh folk medicine records from the 13th century. Traditional Chinese medicine used it for digestive complaints and breast health. Native American healers used dandelion root as a kidney tonic and blood cleanser. In European herbalism it was called officinale — meaning 'of the pharmacy' — the designation given only to plants considered medicinally essential. Every part of the dandelion is medicinal and edible.",
    benefits:[
      {title:"Liver Tonic & Detoxifier", desc:"Dandelion root stimulates bile production and flow, supporting the liver's ability to process fats and eliminate toxins. Particularly valuable for sluggish liver and fatty liver support."},
      {title:"Digestive Bitter", desc:"The bitter compounds (taraxacin and taraxacerin) stimulate digestive enzyme production and gastric acid, improving breakdown of food and nutrient absorption."},
      {title:"Prebiotic Fiber (Inulin)", desc:"Rich in inulin — a prebiotic fiber that feeds beneficial gut bacteria, supporting microbiome health and immune function."},
      {title:"Natural Diuretic", desc:"Clinically shown to increase urinary frequency and volume while uniquely replenishing the potassium lost through urination, unlike pharmaceutical diuretics."},
      {title:"Anti-inflammatory & Antioxidant", desc:"Contains luteolin, beta-carotene, and polyphenols that reduce oxidative stress and systemic inflammation."},
    ],
    sources:[
      {org:"Journal of Alternative and Complementary Medicine", finding:"Dandelion leaf extract significantly increased urinary frequency and volume — confirmed natural diuretic with potassium-sparing properties", url:"https://pubmed.ncbi.nlm.nih.gov/21292431/"},
      {org:"Evidence-Based Complementary and Alternative Medicine", finding:"Dandelion root extract showed significant liver-protective and anti-inflammatory effects", url:"https://pubmed.ncbi.nlm.nih.gov/22701640/"},
      {org:"European Medicines Agency (EMA)", finding:"Officially recognizes dandelion root for relief of digestive complaints including loss of appetite and mild biliary complaints", url:"https://www.ema.europa.eu/en/medicines/herbal/taraxaci-radix-herba"},
    ],
    caution:"Generally very safe. May interact with certain antibiotics and diuretic medications. Avoid if allergic to ragweed or other Asteraceae plants. Those with gallstones or bile duct obstruction should consult a doctor first.",
    blends:["Liver & Love","Deep Liver Cleanse","Blood Purifier","Full Body Detox"],
  },
  {
    id:"h5", name:"Chamomile Flowers", latin:"Matricaria chamomilla", origin:"Europe · Western Asia", family:"Asteraceae",
    category:["sleep","anxiety","digestion","calming"],
    tags:["Sleep","Calm","Anxiety"], color:"#C4A020",
    photo:"/herbs/chamomile.jpg", fallback:"https://images.pexels.com/photos/33076903/pexels-photo-33076903.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌼", tagline:"The oldest bedtime companion in recorded history",
    history:"Chamomile is one of the most ancient and widely used medicinal herbs in the world. The Egyptians dedicated it to Ra, their sun god, and used it to treat ague (malarial fever). The Romans drank it as tea and burned it as incense. The Anglo-Saxon Nine Herbs Charm — one of the oldest recorded medicinal texts in English — names chamomile (maythen) as one of the nine most sacred herbs. It has been used continuously for over 5,000 years across European, Middle Eastern, and North African healing traditions as a sleep aid, digestive soother, and anti-anxiety remedy.",
    benefits:[
      {title:"Sleep Improvement", desc:"Apigenin — chamomile's primary flavonoid — binds to GABA-A receptors in the brain, producing a sedative and anxiolytic effect. Clinical trials show chamomile significantly improves sleep quality, particularly in new mothers and elderly individuals."},
      {title:"Anxiety & Nervous System Calming", desc:"Multiple clinical trials confirm meaningful reduction in anxiety scores (GAD-7 scale). Long-term chamomile use reduced relapse rate of generalized anxiety disorder in a University of Pennsylvania study."},
      {title:"Digestive Antispasmodic", desc:"Relaxes smooth muscle of the gastrointestinal tract, relieving cramping, IBS symptoms, and functional dyspepsia."},
      {title:"Anti-inflammatory", desc:"Alpha-bisabolol and chamazulene have significant anti-inflammatory and wound-healing properties, both internally and topically."},
      {title:"Blood Sugar Support", desc:"Emerging research shows chamomile tea consumed with meals reduces post-meal blood glucose elevation — potentially useful for pre-diabetic support."},
    ],
    sources:[
      {org:"Phytomedicine Journal", finding:"Long-term chamomile extract significantly reduced GAD relapse rates versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/27912875/"},
      {org:"Journal of Advanced Nursing", finding:"Chamomile tea significantly improved sleep quality scores in postnatal women experiencing sleep difficulty", url:"https://pubmed.ncbi.nlm.nih.gov/26483209/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes chamomile flower for GI spasms, inflammatory conditions, and minor inflammatory skin conditions", url:"https://www.ema.europa.eu/en/medicines/herbal/matricariae-flos"},
    ],
    caution:"Rare allergic reactions in people sensitive to ragweed, chrysanthemums, or daisies. Generally extremely safe. High doses may interact with warfarin. Avoid medicinal amounts during pregnancy.",
    blends:["Dream Catcher","Calm Within","2AM Reset"],
  },
  {
    id:"h6", name:"Cardamom Pods", latin:"Elettaria cardamomum", origin:"India · Guatemala", family:"Zingiberaceae",
    category:["digestion","warming","blood pressure"],
    tags:["Digestion","Breath","Energy"], color:"#3A6B35",
    photo:"/herbs/cardamom.jpg", fallback:"https://images.pexels.com/photos/735719/pexels-photo-735719.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌿", tagline:"The Queen of Spices — from ancient India to your morning cup",
    history:"Called the Queen of Spices in India, cardamom has been cultivated in the Western Ghats for at least 4,000 years. The ancient Egyptians chewed it to clean their teeth and freshen breath. Greeks and Romans imported it for perfume, digestive remedies, and ceremonial use. In Ayurveda it is tridoshic — balancing all three constitutional types — and used to support respiratory health, digestion, and mental clarity. Arab traders spread it across the Middle East where it became the defining flavor of traditional coffee and hospitality.",
    benefits:[
      {title:"Digestive Relief", desc:"Volatile oils (cineole, terpinene) stimulate digestive enzymes, relieve gas, bloating, and nausea. The Ayurvedic concept of cardamom enhancing digestive fire is supported by modern enzyme research."},
      {title:"Oral Health & Breath", desc:"Strongly antimicrobial against common oral bacteria including Streptococcus mutans. Ancient Egyptian use for oral hygiene is vindicated by modern microbiology."},
      {title:"Blood Pressure Reduction", desc:"A 12-week randomized trial showed significant reduction in blood pressure in newly diagnosed hypertensive patients given cardamom powder."},
      {title:"Antioxidant & Anti-inflammatory", desc:"Rich in phytochemicals that reduce oxidative stress markers and inhibit inflammatory pathways relevant to metabolic syndrome."},
      {title:"Respiratory Support", desc:"Traditional use for asthma and bronchitis has some support — cardamom relaxes airway smooth muscle and acts as an expectorant."},
    ],
    sources:[
      {org:"Indian Journal of Biochemistry & Biophysics", finding:"Cardamom supplementation significantly reduced blood pressure and improved antioxidant status in hypertensive patients", url:"https://pubmed.ncbi.nlm.nih.gov/19051347/"},
      {org:"Journal of Ethnopharmacology", finding:"Cardamom extracts showed significant inhibitory activity against multiple oral pathogenic bacteria", url:"https://pubmed.ncbi.nlm.nih.gov/20083120/"},
    ],
    caution:"Extremely safe at culinary and tea amounts. May enhance the effects of anticoagulants at very high supplemental doses. No significant adverse effects documented.",
    blends:["Morning Rise","2AM Reset"],
  },
  {
    id:"h7", name:"Milk Thistle", latin:"Silybum marianum", origin:"Mediterranean Europe", family:"Asteraceae",
    category:["liver","detox","antioxidant","blood sugar"],
    tags:["Liver Protection","Detox","Regeneration"], color:"#6B3A8A",
    photo:"/herbs/milk-thistle.jpg", fallback:"https://images.pexels.com/photos/18026461/pexels-photo-18026461.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"💜", tagline:"The liver's most powerful herbal protector and regenerator",
    history:"Milk thistle has been used as a liver remedy for over 2,000 years. The ancient Greek physician Dioscorides, in his first-century text De Materia Medica, recommended it for treating serpent bites — the liver being the organ most affected by toxic exposure. Medieval European herbalists prescribed it specifically for liver and spleen ailments. In 1968, German researchers isolated silymarin — the complex of active flavonolignans responsible for milk thistle's effects — beginning decades of clinical research that has since validated its traditional use more thoroughly than almost any other medicinal herb.",
    benefits:[
      {title:"Liver Cell Protection", desc:"Silymarin prevents toxins (including alcohol, acetaminophen, and environmental pollutants) from entering liver cells by blocking membrane receptor sites. This is one of the most well-established mechanisms in herbal medicine."},
      {title:"Liver Cell Regeneration", desc:"Stimulates protein synthesis in liver cells, actively promoting regeneration of damaged tissue. Particularly studied in hepatitis, cirrhosis, and toxic liver injury."},
      {title:"Antioxidant Concentrated in Liver", desc:"Silymarin concentrates in liver tissue and increases glutathione levels by up to 50% — glutathione being the body's master antioxidant and primary detoxification molecule."},
      {title:"Anti-inflammatory in Liver", desc:"Inhibits inflammatory signaling specifically in hepatic tissue, reducing liver inflammation associated with fatty liver disease and hepatitis."},
      {title:"Blood Sugar & Insulin Resistance", desc:"Emerging research shows silymarin improves insulin sensitivity and reduces fasting blood glucose in type 2 diabetes."},
    ],
    sources:[
      {org:"American Journal of Gastroenterology", finding:"Silymarin significantly improved liver enzyme levels (ALT, AST) in patients with non-alcoholic fatty liver disease", url:"https://pubmed.ncbi.nlm.nih.gov/16374420/"},
      {org:"Phytotherapy Research", finding:"Milk thistle extract significantly reduced fasting blood glucose and HbA1c in type 2 diabetic patients", url:"https://pubmed.ncbi.nlm.nih.gov/16634839/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes standardized milk thistle extract for supportive treatment of chronic inflammatory liver conditions", url:"https://www.ema.europa.eu/en/medicines/herbal/silybi-mariani-fructus"},
    ],
    caution:"Very well-tolerated. Occasional GI upset at high doses. May interact with drugs metabolized by CYP450 liver enzymes. Belongs to the ragweed family — those with Asteraceae allergies should use with awareness.",
    blends:["Liver & Love","Deep Liver Cleanse","Full Body Detox","Liver Bile Flow"],
  },
  {
    id:"h8", name:"Peppermint Leaf", latin:"Mentha × piperita", origin:"Europe", family:"Lamiaceae",
    category:["digestion","IBS","headache","energy","cooling"],
    tags:["Digestion","IBS","Energy"], color:"#2A6B3A",
    photo:"/herbs/peppermint.jpg", fallback:"https://images.pexels.com/photos/2056856/pexels-photo-2056856.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌿", tagline:"The world's most recognized digestive remedy — for good reason",
    history:"Peppermint is a natural hybrid discovered growing wild in England in the 17th century. However, other mints have been used medicinally since antiquity. Dried peppermint leaves were found in Egyptian pyramids dated to 1,000 BCE. The Romans used mint at feasts for digestion. In the 18th century, peppermint became recognized as a distinct species and rapidly became one of the most commercially cultivated medicinal herbs in the world. Today its essential oil form is used in hospitals for post-operative nausea.",
    benefits:[
      {title:"IBS & Digestive Spasm Relief", desc:"Enteric-coated peppermint oil is the most evidence-based natural treatment for IBS — rated as effective as antispasmodic drugs in multiple meta-analyses. Menthol relaxes smooth muscle of the GI tract."},
      {title:"Headache Relief", desc:"Topical peppermint oil is as effective as paracetamol for tension headaches in randomized trials."},
      {title:"Nausea", desc:"Used in clinical settings for post-operative nausea. Inhaling peppermint aroma reduces nausea severity in multiple hospital trials."},
      {title:"Energy & Mental Alertness", desc:"Menthol activates the trigeminal nerve and cold receptors, producing measurable increases in alertness and memory performance."},
      {title:"Antimicrobial", desc:"Strong antimicrobial properties against bacteria and fungi, including H. pylori strains associated with gastric ulcers."},
    ],
    sources:[
      {org:"Journal of Clinical Gastroenterology", finding:"Meta-analysis of 9 randomized trials: peppermint oil significantly superior to placebo for global IBS symptom relief", url:"https://pubmed.ncbi.nlm.nih.gov/24100754/"},
      {org:"Cephalalgia (International Headache Journal)", finding:"10% peppermint oil solution as effective as paracetamol 1000mg for tension-type headache relief", url:"https://pubmed.ncbi.nlm.nih.gov/9542627/"},
      {org:"WHO Monographs on Selected Medicinal Plants", finding:"Officially recognizes peppermint for symptomatic treatment of digestive disorders, nausea, and as an antispasmodic", url:""},
    ],
    caution:"Generally very safe. Large amounts of menthol are unsafe for infants and young children. May worsen heartburn/GERD by relaxing the lower esophageal sphincter.",
    blends:["Gut & Glow","Gut Reset"],
  },
  {
    id:"h9", name:"Nettle Leaf", latin:"Urtica dioica", origin:"Europe · Asia · North Africa", family:"Urticaceae",
    category:["kidney","iron","allergy","minerals","anti-inflammatory"],
    tags:["Kidney","Iron","Allergy"], color:"#3A6B20",
    photo:"/herbs/nettle.jpg", fallback:"https://images.pexels.com/photos/14379617/pexels-photo-14379617.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌿", tagline:"The most mineral-rich plant in European traditional medicine",
    history:"Stinging nettle has been used as food, fiber, and medicine since the Bronze Age. The ancient Egyptians used it for arthritis. Roman soldiers rubbed nettle on their skin to stay warm during cold campaigns. Medieval herbalists used it extensively for iron deficiency and kidney complaints. Native American peoples used it as food, medicine, and cordage. It is one of the most nutrient-dense plants available — higher in iron, calcium, and vitamin K than almost any cultivated vegetable.",
    benefits:[
      {title:"Iron & Mineral Replenishment", desc:"Exceptionally rich in bioavailable iron, calcium, magnesium, potassium, and vitamin K. One of the best plant sources for iron deficiency anemia."},
      {title:"Allergy & Hay Fever Relief", desc:"Freeze-dried nettle leaf reduces allergic rhinitis symptoms in clinical trials, likely by inhibiting histamine release and pro-inflammatory enzyme pathways."},
      {title:"Kidney & Urinary Support", desc:"A mild diuretic that supports kidney function and urinary flow. Used in German Commission E-approved protocols for irrigation therapy."},
      {title:"Prostate Health (Nettle Root)", desc:"Nettle root is one of the most clinically studied herbs for BPH — shown to reduce urinary symptoms in multiple European trials."},
      {title:"Anti-inflammatory for Joints", desc:"Both topical and oral nettle preparations reduce inflammatory markers and pain in osteoarthritis and gout."},
    ],
    sources:[
      {org:"Planta Medica Journal", finding:"Nettle root extract significantly improved urinary flow and reduced symptoms of BPH versus placebo in a multicenter trial", url:"https://pubmed.ncbi.nlm.nih.gov/16807907/"},
      {org:"Phytotherapy Research", finding:"Freeze-dried Urtica dioica rated moderately to highly effective for allergic rhinitis relief in 57% of participants", url:"https://pubmed.ncbi.nlm.nih.gov/2192379/"},
      {org:"German Commission E", finding:"Approves nettle herb for irrigation therapy in inflammatory diseases of the lower urinary tract and kidney gravel", url:""},
    ],
    caution:"Safe at culinary and tea doses. May interact with diuretics, lithium, and blood thinners at therapeutic doses. Nettle root and leaf have different actions — not interchangeable.",
    blends:["Kidney Flush","Blood Builder","Full Body Detox","Lymph Mover"],
  },
  {
    id:"h10", name:"Hibiscus Flower", latin:"Hibiscus sabdariffa", origin:"West Africa · Sudan", family:"Malvaceae",
    category:["blood pressure","heart","antioxidant","vitamin C"],
    tags:["Blood Pressure","Vitamin C","Heart"], color:"#8B1A3A",
    photo:"/herbs/hibiscus.jpg", fallback:"https://images.pexels.com/photos/36327618/pexels-photo-36327618.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌺", tagline:"The ruby-red heart tonic beloved from Africa to the Caribbean",
    history:"Hibiscus sabdariffa is native to West Africa and has been used medicinally for centuries across Africa, the Middle East, and the Caribbean. Called bissap in Senegal, karkadé in Egypt, and sorrel in Jamaica and Trinidad — where it is the traditional Christmas drink. In Egypt it has been drunk since ancient times for heart health. In Ayurveda it is used as a cooling herb to pacify pitta constitution. The diaspora carried this plant and its medicine traditions across the world.",
    benefits:[
      {title:"Blood Pressure Reduction", desc:"The most evidence-backed herbal intervention for blood pressure. A 2010 AHA Journal study showed hibiscus tea reduced systolic blood pressure significantly in pre-hypertensive adults — comparable to some ACE inhibitors."},
      {title:"Exceptional Vitamin C Content", desc:"One of the richest plant sources of vitamin C, supporting immune function, collagen synthesis, iron absorption, and antioxidant defence."},
      {title:"Heart & Lipid Health", desc:"Multiple studies show hibiscus reduces LDL cholesterol and total cholesterol while supporting HDL — addressing multiple cardiovascular risk factors."},
      {title:"Liver Protection", desc:"Animal and human studies show hibiscus extract reduces liver damage markers and prevents fatty liver accumulation."},
      {title:"Antioxidant — Among the Highest Measured", desc:"The anthocyanins responsible for hibiscus's deep ruby color are among the most potent antioxidant pigments in the plant kingdom."},
    ],
    sources:[
      {org:"Journal of Nutrition (American Society for Nutrition)", finding:"Hibiscus tea consumption significantly lowered systolic blood pressure in pre- and mildly hypertensive adults — 7.2 mmHg reduction vs placebo", url:"https://pubmed.ncbi.nlm.nih.gov/20032468/"},
      {org:"Journal of Human Hypertension", finding:"Hibiscus extract as effective as captopril (ACE inhibitor) for mild to moderate hypertension in randomized trial", url:"https://pubmed.ncbi.nlm.nih.gov/18830945/"},
    ],
    caution:"May enhance the effect of blood pressure medications — monitor BP if already on antihypertensives. May affect estrogen metabolism at very high doses. Avoid medicinal amounts during pregnancy.",
    blends:["Heart Opener","Immunity Shield"],
  },
  {
    id:"h11", name:"Ashwagandha Root", latin:"Withania somnifera", origin:"India · North Africa", family:"Solanaceae",
    category:["stress","adaptogen","hormones","energy","testosterone"],
    tags:["Stress","Adaptogen","Testosterone"], color:"#8B4A14",
    photo:"/herbs/ashwagandha.jpg", fallback:"https://images.pexels.com/photos/4871159/pexels-photo-4871159.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"⚡", tagline:"Ayurveda's supreme adaptogen — 3,000 years of stress mastery",
    history:"Ashwagandha is perhaps the most important herb in Ayurvedic medicine. Its Sanskrit name means 'smell of horse' — referring both to its unique aroma and to the belief that consuming it would give one the strength and vitality of a horse. It is classified as a rasayana in Ayurveda — a category of rejuvenating tonics meant for daily use across a lifetime. The Charaka Samhita (circa 700 BCE) describes it as a premier adaptogen for stress, debility, and aging. Modern research over the past 20 years has validated its cortisol-lowering, testosterone-supporting, and neuroprotective properties with remarkable consistency.",
    benefits:[
      {title:"Cortisol & Stress Reduction", desc:"Multiple double-blind trials show ashwagandha significantly reduces serum cortisol, perceived stress scores, and anxiety symptoms — with effects appearing within 60 days."},
      {title:"Testosterone & Male Fertility", desc:"Randomized trials show significant increases in testosterone (15–17%), luteinizing hormone, and sperm quality in men with reproductive issues."},
      {title:"Thyroid Support", desc:"Stimulates thyroid hormone synthesis (T3 and T4) — clinically studied for subclinical hypothyroidism with significant improvements in thyroid function markers."},
      {title:"Physical Performance & Recovery", desc:"Increases VO2 max, muscle strength, and recovery time in athletes. A 2015 study showed significant improvements in bench press and leg press strength vs placebo over 8 weeks."},
      {title:"Neuroprotection & Cognitive Function", desc:"Withanolides promote nerve regeneration, reduce beta-amyloid plaques, and improve memory and reaction time in clinical studies."},
    ],
    sources:[
      {org:"Indian Journal of Psychological Medicine", finding:"Ashwagandha root extract significantly reduced stress assessment scores and serum cortisol versus placebo in chronically stressed adults", url:"https://pubmed.ncbi.nlm.nih.gov/23439798/"},
      {org:"Evidence-Based Complementary and Alternative Medicine", finding:"Ashwagandha significantly improved testosterone, LH, FSH, and sperm quality in infertile men under stress", url:"https://pubmed.ncbi.nlm.nih.gov/22048671/"},
      {org:"Journal of the International Society of Sports Nutrition", finding:"Ashwagandha associated with significant increases in muscle mass and strength vs placebo in resistance-training men", url:"https://pubmed.ncbi.nlm.nih.gov/26609282/"},
    ],
    caution:"May interact with thyroid medications, immunosuppressants, and sedatives. Avoid during pregnancy. Cycle off after 3 months — take a 1-week break to prevent adaptogenic tolerance. Autoimmune conditions require medical guidance.",
    blends:["Stress Armor","Golden Healer","Testosterone & Prostate Balance","Post-50 Men's Foundation"],
  },
  {
    id:"h12", name:"Rose Petals", latin:"Rosa damascena", origin:"Persia (Iran) · Middle East", family:"Rosaceae",
    category:["mood","skin","heart","antioxidant","hormones"],
    tags:["Mood","Skin","Antioxidant"], color:"#8B2A4A",
    photo:"/herbs/rose-petals.jpg", fallback:"https://images.pexels.com/photos/31717520/pexels-photo-31717520.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌹", tagline:"The heart herb — beauty, grief, and healing in one petal",
    history:"The rose has been the queen of flowers and a medicinal herb for over 5,000 years. Persia cultivated Rosa damascena for its extraordinary aromatic and healing properties. The ancient Greeks associated it with Aphrodite and used rose petals for grief and depression. Islamic medicine's Ibn Sina documented rose's effects on cardiac palpitations and grief-induced illness. In Ayurveda, rose is a primary herb for pitta imbalance — cooling excess heat in the emotions, skin, and liver. In Jamaican folk medicine, rose petal tea is given for emotional upset and female hormonal support.",
    benefits:[
      {title:"Mood & Emotional Wellbeing", desc:"Rose aroma reduces cortisol and blood pressure in clinical studies. Rose petal extracts contain compounds that modulate serotonin and dopamine systems."},
      {title:"Rich Antioxidant Profile", desc:"High in vitamin C, quercetin, kaempferol, and anthocyanins — protecting cells from oxidative damage and supporting cardiovascular health."},
      {title:"Skin Health from Within", desc:"Vitamin C is essential for collagen synthesis. Rose's anti-inflammatory and antioxidant compounds reduce skin inflammation and support the skin's moisture barrier."},
      {title:"Female Hormonal Support", desc:"Traditionally used for menstrual irregularity and pain. Rose compounds have mild phytoestrogenic activity and anti-inflammatory effects on the reproductive system."},
      {title:"Antimicrobial & Antiviral", desc:"Rose extract shows activity against multiple bacterial strains and some viral pathogens — supporting immune defence and gut microbiome balance."},
    ],
    sources:[
      {org:"Iranian Journal of Basic Medical Sciences", finding:"Rosa damascena extract reduced anxiety and depression scores significantly in menopausal women versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/25628776/"},
      {org:"Complementary Therapies in Clinical Practice", finding:"Rose aromatherapy significantly reduced cortisol and blood pressure in stressed individuals", url:"https://pubmed.ncbi.nlm.nih.gov/29433790/"},
    ],
    caution:"Exceptionally safe. Ensure petals are culinary-grade and pesticide-free — most commercially grown roses are heavily sprayed.",
    blends:["Heart Opener","Sacred Womb","Fertility Bloom"],
  },
  {
    id:"h13", name:"Lavender", latin:"Lavandula angustifolia", origin:"Mediterranean", family:"Lamiaceae",
    category:["anxiety","sleep","nervous system","headache","calming"],
    tags:["Anxiety","Sleep","Headaches"], color:"#6B4A8B",
    photo:"/herbs/lavender.jpg", fallback:"https://images.pexels.com/photos/949585/pexels-photo-949585.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"💜", tagline:"The most studied aroma in the science of calm",
    history:"Lavender's name derives from the Latin lavare — to wash — because Romans used it in their baths. The ancient Egyptians used lavender oil in mummification and perfumery. It has been grown in European monastery gardens for over a thousand years. René-Maurice Gattefossé, who coined the term aromatherapy in the 1930s, famously plunged his burned hand into lavender oil and documented rapid healing. Today lavender essential oil (Silexan) is a licensed pharmaceutical medicine for anxiety in Germany.",
    benefits:[
      {title:"Anxiety Reduction", desc:"Silexan (oral lavender oil) is licensed as an anti-anxiety medication in Germany (Lasea), having demonstrated efficacy equivalent to lorazepam for generalized anxiety disorder without sedation or dependency risk."},
      {title:"Sleep Quality Improvement", desc:"Both inhaled and oral lavender preparations improve sleep quality, sleep duration, and morning alertness in multiple randomized trials."},
      {title:"Headache & Migraine Relief", desc:"Inhaling lavender essential oil during migraine onset significantly reduced headache severity and nausea in a 2012 randomized trial."},
      {title:"Nervous System Toning", desc:"Linalool and linalyl acetate modulate GABA-A receptors — similar to benzodiazepine drugs but without dependency — producing genuine nervous system calming."},
      {title:"Antimicrobial & Wound Healing", desc:"Effective against multiple bacterial and fungal strains. Topical lavender accelerates wound healing through anti-inflammatory mechanisms."},
    ],
    sources:[
      {org:"Phytomedicine Journal", finding:"Silexan (oral lavender oil) as effective as lorazepam 0.5mg for generalized anxiety disorder — without sedation or abuse potential", url:"https://pubmed.ncbi.nlm.nih.gov/20471185/"},
      {org:"European Neurology Journal", finding:"Lavender oil aromatherapy significantly reduced frequency and severity of migraine headaches versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/22517298/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes lavender flower for temporary relief of stress and anxiety and for sleep disturbances", url:""},
    ],
    caution:"Very safe for adults. The dried flower tea form is gentle and appropriate for regular use. Avoid undiluted essential oil internally without medical guidance.",
    blends:["Dream Catcher","Calm Within"],
  },
  {
    id:"h14", name:"Lemon Balm", latin:"Melissa officinalis", origin:"Southern Europe · Central Asia", family:"Lamiaceae",
    category:["anxiety","sleep","digestion","antiviral","mood"],
    tags:["Anxiety","Sleep","Antiviral"], color:"#5A8A2A",
    photo:"/herbs/lemon-balm.jpg", fallback:"https://images.pexels.com/photos/16757214/pexels-photo-16757214.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🍋", tagline:"The gentle nerve tonic of European monastery gardens",
    history:"Lemon balm has been cultivated in monastery gardens across Europe for over a thousand years, prized for its calming, uplifting, and antiviral properties. Its genus name Melissa is Greek for 'honeybee.' The 11th-century Arab physician Avicenna wrote that lemon balm 'maketh the heart merry and joyful.' Carmelite nuns in Paris produced a famous lemon balm spirit called Eau de Mélisse in 1611, sold for centuries as a treatment for nervous headaches. It is one of the few herbs with strong research supporting both calming effects and antiviral activity against herpes simplex.",
    benefits:[
      {title:"Anxiety & Stress Relief", desc:"Rosmarinic acid inhibits the enzyme that breaks down GABA — effectively increasing calming GABA activity in the nervous system. Clinical trials show significant reduction in anxiety."},
      {title:"Sleep Quality", desc:"Combined with valerian, lemon balm significantly improves sleep quality, sleep onset, and sleep duration in multiple clinical trials, without morning grogginess."},
      {title:"Cognitive Function & Mood", desc:"Improves memory, reaction time, and mood in healthy adults within 1–4 hours of a single dose — attributed to cholinesterase inhibition and GABA modulation."},
      {title:"Antiviral — Herpes Simplex", desc:"One of the most clinically validated herbal antivirals for cold sores. Topical lemon balm cream significantly reduced healing time and recurrence in multiple trials."},
      {title:"Digestive Support", desc:"Antispasmodic action on GI smooth muscle relieves bloating, cramping, and functional dyspepsia."},
    ],
    sources:[
      {org:"Psychosomatic Medicine Journal", finding:"Single dose of lemon balm extract significantly improved mood and cognitive performance in healthy young adults", url:"https://pubmed.ncbi.nlm.nih.gov/14693013/"},
      {org:"Phytomedicine Journal", finding:"Valerian/lemon balm combination significantly improved sleep quality in children with insomnia", url:"https://pubmed.ncbi.nlm.nih.gov/24837472/"},
    ],
    caution:"Extremely safe. May interact with thyroid medications at high doses. May enhance sedatives — beneficial in small amounts, may over-sedate when combined with multiple sleep herbs at high doses.",
    blends:["Calm Within","Dream Catcher","Morning Rise"],
  },
  {
    id:"h15", name:"Passionflower", latin:"Passiflora incarnata", origin:"Eastern North America", family:"Passifloraceae",
    category:["anxiety","sleep","nervous system"],
    tags:["Anxiety","Insomnia","Racing Mind"], color:"#6B3A8A",
    photo:"/herbs/passionflower.jpg", fallback:"https://images.pexels.com/photos/14981842/pexels-photo-14981842.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"💜", tagline:"Native American wisdom for the mind that won't stop",
    history:"Passionflower was used medicinally by multiple Native American peoples — including the Cherokee and Houma. Spanish colonizers in the 16th century brought it to Europe, where the elaborate flower structure was interpreted as representing the Passion of Christ. European herbalists adopted it as a nervine. By the late 19th century it appeared in the U.S. Pharmacopeia as an official sleep remedy. Modern research has identified chrysin and other flavonoids as responsible for its GABA-A agonist activity.",
    benefits:[
      {title:"Anxiety & Nervous System Calming", desc:"Clinical trial published in Phytotherapy Research showed passionflower as effective as oxazepam (a prescription benzodiazepine) for generalized anxiety disorder — with significantly better occupational performance."},
      {title:"Insomnia & Sleep Quality", desc:"A randomized trial showed passionflower tea significantly improved total sleep time, sleep efficiency, and waking after sleep onset."},
      {title:"GABA Enhancement", desc:"Chrysin and other flavonoids bind GABA-A receptors — the same mechanism as benzodiazepine drugs — producing calming without dependency."},
      {title:"Menopausal Symptom Relief", desc:"A 2011 study showed significant reduction in hot flashes, insomnia, depression, and anger in menopausal women."},
    ],
    sources:[
      {org:"Phytotherapy Research", finding:"Passionflower extract as effective as oxazepam 30mg for generalized anxiety disorder with superior occupational functioning", url:"https://pubmed.ncbi.nlm.nih.gov/11679026/"},
      {org:"Phytotherapy Research", finding:"Passionflower tea significantly improved sleep quality versus placebo in healthy adults", url:"https://pubmed.ncbi.nlm.nih.gov/21294203/"},
    ],
    caution:"Generally safe at tea doses. May enhance the effect of sedatives and anti-anxiety medications. Avoid during pregnancy. Do not drive immediately after large doses.",
    blends:["Dream Catcher","Calm Within","Night Flow Reset"],
  },
  {
    id:"h16", name:"Tulsi (Holy Basil)", latin:"Ocimum tenuiflorum", origin:"India", family:"Lamiaceae",
    category:["adaptogen","cortisol","immunity","blood sugar"],
    tags:["Adaptogen","Cortisol","Clarity"], color:"#2A6B3A",
    photo:"/herbs/tulsi.jpg", fallback:"https://images.pexels.com/photos/29657646/pexels-photo-29657646.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌿", tagline:"The most sacred plant in India — medicine, spirit, and daily ritual in one",
    history:"Tulsi is the most revered plant in the Hindu religious tradition. For over 3,000 years, virtually every Hindu household has grown a tulsi plant in their courtyard, tended it daily, and used it for prayer and medicine. In Sanskrit texts it is called 'The Queen of Herbs.' Ayurvedic texts describe it as a rasayana — a rejuvenating tonic for lifelong use — with particular power over stress, the respiratory system, and the immune system. Modern research has validated its remarkable adaptogenic properties, placing it alongside ashwagandha as one of the two premier Ayurvedic adaptogens supported by clinical evidence.",
    benefits:[
      {title:"Adaptogenic Stress Relief", desc:"Multiple clinical trials confirm tulsi reduces cortisol, cognitive stress, physical stress, and immunological stress simultaneously — acting on all three axes of the stress response."},
      {title:"Blood Sugar Regulation", desc:"Randomized trials in Type 2 diabetics show significant reductions in fasting blood glucose and post-meal glucose from tulsi leaf supplementation."},
      {title:"Immune Enhancement", desc:"Enhances both innate and adaptive immunity — natural killer cell activity, T-helper cell function, and antibody production are all improved in clinical studies."},
      {title:"Anti-inflammatory", desc:"Ursolic acid and other compounds inhibit COX-1 and COX-2 enzymes — the same enzymes targeted by aspirin and ibuprofen."},
      {title:"Mental Clarity & Cognitive Function", desc:"Clinical trials show improvements in reaction time, error rates, and cognitive function scores."},
    ],
    sources:[
      {org:"Journal of Ayurveda and Integrative Medicine", finding:"Comprehensive review of 24 clinical studies confirms tulsi as an effective adaptogen for metabolic, physiological, and psychological stress", url:"https://pubmed.ncbi.nlm.nih.gov/24812543/"},
      {org:"International Journal of Clinical Pharmacology and Therapeutics", finding:"Tulsi leaf significantly reduced fasting blood glucose and post-meal glucose in Type 2 diabetics", url:"https://pubmed.ncbi.nlm.nih.gov/8880292/"},
    ],
    caution:"Very safe. May mildly thin blood — use cautiously if on anticoagulants. May lower blood sugar — monitor if diabetic and on medication. Avoid therapeutic doses during pregnancy.",
    blends:["Morning Rise","Stress Armor","Immunity Shield"],
  },
  {
    id:"h17", name:"Valerian Root", latin:"Valeriana officinalis", origin:"Europe · Asia", family:"Caprifoliaceae",
    category:["sleep","anxiety","nervous system"],
    tags:["Insomnia","Deep Sleep","Muscle"], color:"#5A3A8A",
    photo:"/herbs/valerian.jpg", fallback:"https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌙", tagline:"Europe's most important sleep herb — 2,000 years of validated use",
    history:"Valerian has been prescribed as a sleep and nerve remedy since ancient Greek and Roman times. Hippocrates described its properties; Galen prescribed it for insomnia. In medieval Europe it was called 'all-heal.' It was distributed by the British government to civilians during the bombing of London in World War II. It remains one of the most widely sold herbal supplements in Europe, approved by Germany's Commission E and the EMA for sleep disorders.",
    benefits:[
      {title:"Sleep Onset & Quality", desc:"The most clinically studied herbal sleep remedy. Meta-analyses of multiple randomized trials confirm valerian reduces time to fall asleep and improves subjective sleep quality — particularly effective after 2–4 weeks of consistent use."},
      {title:"Anxiety Without Daytime Sedation", desc:"Unlike pharmaceutical sedatives, valerian does not impair daytime performance at sleep doses. Clinical trials show anxiolytic effects that improve over 4 weeks."},
      {title:"Muscle Relaxation", desc:"Relaxes smooth and skeletal muscle — traditionally used for menstrual cramps, intestinal spasm, and tension headaches."},
      {title:"GABA Enhancement", desc:"Valerenic acid inhibits GABA breakdown and also modulates serotonin receptors — addressing both the anxiety and mood components of sleep disturbance."},
    ],
    sources:[
      {org:"American Journal of Medicine", finding:"Meta-analysis of 16 randomized trials: valerian may improve sleep quality without producing side effects", url:"https://pubmed.ncbi.nlm.nih.gov/16461951/"},
      {org:"Phytotherapy Research", finding:"Valerian root extract significantly reduced anxiety severity scores in outpatients with generalized anxiety disorder", url:"https://pubmed.ncbi.nlm.nih.gov/11895046/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes valerian root for relief of mild nervous tension and temporary sleep disturbances", url:""},
    ],
    caution:"Do not drive or operate machinery immediately after taking valerian. Do not combine with pharmaceutical sedatives, anxiolytics, or alcohol. Avoid during pregnancy. Effects build over consistent use — not always immediately effective on first use.",
    blends:["Dream Catcher","Night Flow Reset"],
  },
  {
    id:"h18", name:"Burdock Root", latin:"Arctium lappa", origin:"Europe · Asia", family:"Asteraceae",
    category:["liver","blood","skin","prebiotic","detox"],
    tags:["Blood Purifier","Skin","Prebiotic"], color:"#6B4A14",
    photo:"/herbs/burdock.jpg", fallback:"https://images.pexels.com/photos/30009876/pexels-photo-30009876.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🪨", tagline:"The great blood and skin cleanser of folk medicine worldwide",
    history:"In Japan, the root is eaten as a vegetable called gobo. In Chinese medicine it has been used for 2,000 years for respiratory infections and skin conditions. Native American healers used burdock for skin diseases and blood purification. In European herbalism it became known as one of the great 'alteratives' — herbs that gradually improve and cleanse the blood. Its value for skin conditions was so recognized that it was included in the British Pharmacopoeia.",
    benefits:[
      {title:"Blood & Liver Purification", desc:"Contains arctigenin and inulin that support liver detoxification pathways and have been shown to reduce liver enzyme levels in studies on fatty liver."},
      {title:"Prebiotic Fiber (Inulin)", desc:"One of the richest plant sources of inulin — the prebiotic fiber that selectively feeds beneficial gut bacteria, dramatically improving microbiome diversity."},
      {title:"Skin Clarity", desc:"Reduces skin inflammation via inhibition of inflammatory pathways. Studies show improvement in acne, eczema, and psoriasis with regular burdock use."},
      {title:"Antioxidant", desc:"Quercetin, luteolin, and phenolic acids provide significant antioxidant protection, reducing oxidative stress associated with skin aging and chronic disease."},
      {title:"Anti-inflammatory for Joints", desc:"Traditional use for arthritis and joint inflammation has biological support from animal and in vitro studies."},
    ],
    sources:[
      {org:"International Journal of Molecular Sciences", finding:"Burdock root extract significantly reduced markers of oxidative stress and liver enzyme levels in patients with non-alcoholic fatty liver", url:"https://pubmed.ncbi.nlm.nih.gov/21647827/"},
      {org:"Journal of Ethnopharmacology", finding:"Arctium lappa demonstrated significant anti-inflammatory activity via inhibition of NF-kB and pro-inflammatory cytokines", url:"https://pubmed.ncbi.nlm.nih.gov/20599603/"},
    ],
    caution:"Member of the ragweed family — those with Asteraceae allergies should use cautiously. May mildly lower blood sugar. Avoid during pregnancy in therapeutic amounts.",
    blends:["Blood Purifier","Full Body Detox","Skin Deep"],
  },
  {
    id:"h19", name:"Elderberry", latin:"Sambucus nigra", origin:"Europe · North America", family:"Adoxaceae",
    category:["immune","antiviral","cold","flu","respiratory"],
    tags:["Immune","Antiviral","Cold & Flu"], color:"#3A1A6B",
    photo:"/herbs/elderberry.jpg", fallback:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🫐", tagline:"The medicine chest of country folk — a complete immune pharmacy",
    history:"Elder has been called the 'medicine chest of country folk' by herbalists for centuries. The elder tree features prominently in the folk medicine of virtually every European culture. Hippocrates called it his 'medicine chest.' In the 1995 Panama flu epidemic, elderberry was used by locals with reportedly good outcomes. This prompted Israeli researcher Madeleine Mumcuoglu to conduct the first modern clinical trials, which have since been replicated multiple times.",
    benefits:[
      {title:"Influenza Duration & Severity", desc:"A 2016 randomized trial found elderberry significantly reduced flu duration (4 days shorter) and severity in air travelers. Meta-analyses confirm meaningful antiviral effects."},
      {title:"Immune Stimulation", desc:"Stimulates cytokine production in immune cells — activating the innate immune response. Particularly valuable as a preventive during cold and flu season."},
      {title:"Antioxidant Protection", desc:"Anthocyanins give elderberries one of the highest antioxidant ratings of any fruit — significantly higher than blueberries by ORAC score."},
      {title:"Respiratory Support", desc:"Anti-inflammatory and expectorant properties support recovery from respiratory infections, reducing congestion and soothing inflamed airways."},
    ],
    sources:[
      {org:"Nutrients Journal (MDPI)", finding:"Meta-analysis of randomized controlled trials: elderberry supplementation substantially reduced upper respiratory symptoms in duration and severity", url:"https://pubmed.ncbi.nlm.nih.gov/27023596/"},
      {org:"Journal of International Medical Research", finding:"Elderberry extract reduced influenza A and B duration from 6 to 2 days in a double-blind placebo-controlled trial", url:"https://pubmed.ncbi.nlm.nih.gov/15080016/"},
    ],
    caution:"Only ripe, properly cooked or dried berries should be used — raw elderberries can cause nausea. Commercial dried elderberries for tea are safe. Those with autoimmune conditions should use cautiously.",
    blends:["Immunity Shield"],
  },
  {
    id:"h20", name:"Echinacea Root", latin:"Echinacea purpurea", origin:"North America (Great Plains)", family:"Asteraceae",
    category:["immune","antiviral","infection","respiratory"],
    tags:["Immune Stimulant","Antiviral","Infection"], color:"#8A3A6B",
    photo:"/herbs/echinacea.jpg", fallback:"https://images.pexels.com/photos/9160278/pexels-photo-9160278.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌸", tagline:"The most used herbal medicine in North America — and deservedly so",
    history:"Echinacea was the most important medicinal plant of the Great Plains Native American peoples. The Lakota, Cheyenne, Comanche, and over a dozen other peoples used it for infections, snake bites, and wounds. European settlers adopted it from Native healers, and by 1900 it was the best-selling herbal medicine in America. German researchers in the 1970s–80s began modern scientific investigation, and today echinacea is the single most studied herbal medicine in the world, with over 300 published clinical studies.",
    benefits:[
      {title:"Cold Duration Reduction", desc:"A meta-analysis of 24 randomized trials found consistent reduction in cold incidence and duration across multiple preparations."},
      {title:"Immune System Activation", desc:"Stimulates phagocytosis, natural killer cell activity, and T-lymphocyte proliferation — measurable increases documented within hours of ingestion."},
      {title:"Antiviral Activity", desc:"Demonstrated antiviral activity against influenza, herpes simplex, and rhinovirus strains."},
      {title:"Anti-inflammatory", desc:"Caffeic acid derivatives have significant anti-inflammatory properties relevant to upper respiratory recovery."},
    ],
    sources:[
      {org:"The Lancet Infectious Diseases", finding:"Meta-analysis: echinacea preparations reduced risk of recurrent colds by 35% and significantly reduced cold duration", url:"https://pubmed.ncbi.nlm.nih.gov/25266321/"},
      {org:"German Commission E", finding:"Approves Echinacea purpurea for supportive therapy of cold and flu and for supportive treatment of recurrent respiratory infections", url:""},
    ],
    caution:"Not for use in autoimmune conditions. Not for use with immunosuppressant medications. Use in short cycles (8–10 days on, then a break). Belongs to ragweed family — those with Asteraceae allergies should avoid.",
    blends:["Immunity Shield","Lymph Mover"],
  },
  {
    id:"h21", name:"Fennel Seed", latin:"Foeniculum vulgare", origin:"Mediterranean", family:"Apiaceae",
    category:["digestion","gas","IBS","hormones"],
    tags:["Digestion","Gas","Bloating"], color:"#3A6B4A",
    photo:"/herbs/fennel.jpg", fallback:"https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌿", tagline:"The ancient digestive tonic that stands in every Italian kitchen",
    history:"The ancient Greeks called it marathon — the battle of Marathon was fought on a field of fennel. In ancient Rome it was eaten to aid digestion after feasts. The ancient Egyptians used fennel medicinally. In India, roasted fennel seeds are offered at the end of restaurant meals as a digestive aid — a practice rooted in both Ayurveda and practical tradition. Fennel water (gripe water) has been used for infant colic for over a century.",
    benefits:[
      {title:"Gas & Bloating Relief", desc:"Anethole and other volatile oils relax intestinal smooth muscle, releasing trapped gas and reducing bloating. Clinical trials in infants show fennel tea effective for colic."},
      {title:"IBS Symptom Relief", desc:"Randomized trials show fennel combined with other carminative herbs significantly reduces IBS symptoms, particularly gas, cramping, and urgency."},
      {title:"Antispasmodic", desc:"Relaxes smooth muscle throughout the GI tract, relieving cramping associated with IBS, gastritis, and digestive hypermotility."},
      {title:"Mild Estrogenic Effect", desc:"Anethole has mild phytoestrogenic activity — traditional use for menstrual regulation and milk production in nursing mothers has biological basis."},
    ],
    sources:[
      {org:"Journal of Pediatric Gastroenterology and Nutrition", finding:"Fennel seed oil emulsion eliminated colic in 65% of infants versus 23.7% placebo — significantly effective for infantile colic", url:"https://pubmed.ncbi.nlm.nih.gov/12827005/"},
    ],
    caution:"High amounts may cause photosensitivity. Avoid therapeutic amounts during pregnancy due to mild estrogenic and uterine effects. Fennel seed tea at normal amounts is safe for most adults.",
    blends:["Gut Reset","Gut & Glow"],
  },
  {
    id:"h22", name:"Corn Silk", latin:"Zea mays (stigma et styli)", origin:"Central America (Mexico)", family:"Poaceae",
    category:["kidney","urinary","fluid balance","blood pressure"],
    tags:["Kidney","Urinary Tract","Fluid Balance"], color:"#C4A020",
    photo:"/herbs/corn-silk.jpg", fallback:"https://images.pexels.com/photos/34564981/pexels-photo-34564981.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌽", tagline:"The silky threads of the corn plant — a gentle kidney and bladder ally",
    history:"Corn silk has been used medicinally by indigenous peoples of the Americas for centuries. Aztec healers used it for bladder inflammation and kidney stones. European botanists brought it back from the New World in the 16th century and by the 19th century it had entered formal pharmacopoeias as a diuretic and urinary soothing agent. In Jamaica, corn silk tea for kidney and urinary support is widely known in folk medicine tradition.",
    benefits:[
      {title:"Urinary Tract Soothing", desc:"Mucilaginous compounds coat and soothe inflamed urinary tract tissues, reducing burning and urgency associated with UTI and interstitial cystitis."},
      {title:"Diuretic for Fluid Balance", desc:"Clinically confirmed mild diuretic effect, useful for edema and fluid retention, without the harsh electrolyte depletion of pharmaceutical diuretics."},
      {title:"Blood Pressure Support", desc:"The diuretic and vasodilatory effects contribute to modest blood pressure reduction, particularly in hypertension associated with fluid retention."},
      {title:"Blood Sugar Support", desc:"Emerging research shows corn silk extract reduces blood glucose by inhibiting alpha-glucosidase and improving insulin secretion."},
    ],
    sources:[
      {org:"Journal of Ethnopharmacology", finding:"Review confirms significant diuretic, anti-inflammatory, and blood pressure-lowering activity of corn silk across multiple studies", url:"https://pubmed.ncbi.nlm.nih.gov/19524019/"},
    ],
    caution:"Extremely safe. May interact with diuretics and blood pressure medications. Avoid if allergic to corn. Those with kidney disease should consult a doctor before using any diuretic herb regularly.",
    blends:["Kidney Flush","Kidney Stone Support","Urinary Tract Clear","Night Flow Reset"],
  },
  {
    id:"h23", name:"Marshmallow Root", latin:"Althaea officinalis", origin:"Western Europe · Central Asia", family:"Malvaceae",
    category:["gut","throat","urinary","soothe"],
    tags:["Gut Lining","Throat","Urinary"], color:"#8A7A6A",
    photo:"/herbs/marshmallow.jpg", fallback:"https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🌸", tagline:"The original marshmallow — a mucous membrane healer from root to throat",
    history:"The marshmallow candy is named after this plant. Ancient Egyptians made a sweet confection from the roots mixed with honey. Marshmallow root appears in ancient Greek, Roman, and Arab medical texts as a remedy for inflammation of the digestive tract, urinary tract, and respiratory passages. By the medieval period it was one of the most widely used healing herbs in Europe, found in virtually every monastery herbal garden. The sweet confection we know today replaced the root extract with gelatin in the 1800s.",
    benefits:[
      {title:"Gut Lining Repair", desc:"Rich in mucilage — a gel-like polysaccharide — that coats and soothes the lining of the esophagus, stomach, and intestines. Particularly valuable for leaky gut, gastritis, GERD, and IBS."},
      {title:"Sore Throat & Respiratory", desc:"The mucilage coats inflamed throat and airway tissues, reducing pain and irritation. Traditional use for sore throat and dry cough is among the most clinically supported applications."},
      {title:"Urinary Tract Soothing", desc:"Soothes inflamed urinary tract tissue from the inside, reducing the burning and discomfort of UTI and interstitial cystitis."},
      {title:"Dry Skin from Within", desc:"Internal hydration of mucous membranes extends to skin hydration through mucilage's systemic hydrating effects."},
    ],
    sources:[
      {org:"Complementary Medicine Research", finding:"Marshmallow root syrup significantly reduced throat irritation and dry cough versus control — rated effective by 86% of participants", url:"https://pubmed.ncbi.nlm.nih.gov/23038204/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes marshmallow root for symptomatic relief of irritation of oral and pharyngeal mucosa and associated dry cough", url:""},
    ],
    caution:"Extremely safe — one of the gentlest herbs in the apothecary. The mucilage may slow absorption of medications taken at the same time — take medications 1 hour before or 2 hours after marshmallow root.",
    blends:["Gut Reset","Gut & Glow","Kidney Stone Support","Urinary Tract Clear"],
  },
  {
    id:"h24", name:"Skullcap", latin:"Scutellaria lateriflora", origin:"North America", family:"Lamiaceae",
    category:["nervous system","anxiety","sleep"],
    tags:["Nervous System","Anxiety","Sleep"], color:"#2A3A8A",
    photo:"/herbs/skullcap.jpg", fallback:"https://images.pexels.com/photos/16708869/pexels-photo-16708869.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji:"🔵", tagline:"The great American nervine — native wisdom for a frayed nervous system",
    history:"Skullcap is native to North America and was used extensively by multiple Native American peoples. The Cherokee used it as a ceremonial herb for nervous conditions. The Iroquois used it to promote menstruation. Early American settlers adopted it, and by the 19th century it was one of the most widely prescribed remedies of the American Eclectic physicians — prescribed specifically for nervous exhaustion and anxiety. It appeared in the U.S. Pharmacopeia and National Formulary for decades.",
    benefits:[
      {title:"Nervous System Toning", desc:"Considered a nervine trophorestorative — it doesn't just sedate but actively rebuilds and nourishes exhausted nervous tissue. Baicalin and scutellarein support GABA activity and reduce neuronal excitability."},
      {title:"Anxiety Without Sedation", desc:"A 2014 randomized crossover trial showed skullcap significantly enhanced global mood and reduced anxiety without reducing energy or cognition — a genuinely unique profile."},
      {title:"Sleep Support", desc:"Particularly useful for sleep disrupted by an overactive nervous system or chronic stress-induced insomnia."},
      {title:"Neuroprotection", desc:"Baicalin crosses the blood-brain barrier and shows neuroprotective effects against excitotoxicity — relevant to anxiety and recovery from nervous system depletion."},
    ],
    sources:[
      {org:"Alternative Therapies in Health and Medicine", finding:"American skullcap significantly enhanced global mood and reduced anxiety in a randomized crossover trial without sedation", url:"https://pubmed.ncbi.nlm.nih.gov/24316680/"},
    ],
    caution:"American skullcap is safe when properly sourced. Historical liver toxicity reports were linked to adulteration with germander, not true skullcap. Source from reputable suppliers. Avoid during pregnancy.",
    blends:["Dream Catcher","Calm Within"],
  },
  // ── COMING SOON HERBS ────────────────────────────────────────────────────────
  {
    id:"cs1", name:"Cerasee", latin:"Momordica charantia", origin:"Jamaica · Caribbean · South Asia", family:"Cucurbitaceae",
    category:["blood sugar","detox","anti-inflammatory","immune","liver"],
    tags:["Blood Sugar","Detox","Caribbean Bush Medicine"], color:"#3A6B1A",
    photo:"/herbs/cerasee.jpg", fallback:"https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"Jamaica's most sacred bush herb — bitter medicine for a reason",
    comingSoon:true,
    history:"Cerasee is perhaps the most deeply embedded herb in Jamaican bush medicine. The vine — a wild variety of the bitter melon plant — grows freely across Jamaica and throughout the Caribbean, and has been used by Jamaican healers, grandmothers, and families for generations as a fundamental cleansing and blood-purifying tonic. In Jamaica it is typically boiled as a strong bush tea, drunk for 'cleaning out the system,' treating fever, skin conditions, and diabetes, and as a parasite cleanse. Its use spans West Africa and South Asia as well — where the bitter melon fruit is a dietary staple — reflecting the herb's deep roots across the African diaspora and the Indian subcontinent. Scientists have identified more than 200 bioactive compounds in the plant, making it one of the most biochemically complex medicinal herbs in tropical folk medicine.",
    benefits:[
      {title:"Blood Sugar Regulation", desc:"Momordica charantia contains polypeptide-p (a plant insulin), charantin, and vicine — compounds that lower blood glucose through multiple mechanisms. Multiple clinical trials show significant reductions in fasting and post-meal blood sugar in Type 2 diabetics."},
      {title:"Deep System Cleanse & Detox", desc:"The bitter principles (cucurbitacins and momordicosides) stimulate liver bile production, increase intestinal motility, and act as a natural purgative — supporting the traditional Jamaican use of cerasee as a full-body cleansing tea."},
      {title:"Antiparasitic & Antimicrobial", desc:"Demonstrated activity against intestinal worms, parasites, and multiple bacterial and fungal strains. Traditional use for clearing the gut of parasites is well-supported by in vitro and animal studies."},
      {title:"Antioxidant & Anti-inflammatory", desc:"Leaf extracts show powerful antioxidant activity — protecting cells from oxidative damage. Anti-inflammatory mechanisms relevant to skin conditions, arthritis, and systemic inflammation."},
      {title:"Immune Support", desc:"Antimicrobial and antiviral properties support the immune system's ability to respond to infection. Traditional use for fever and viral illness has plausible biological mechanisms."},
    ],
    sources:[
      {org:"Journal of Ethnopharmacology", finding:"Momordica charantia demonstrated significant hypoglycemic activity in human clinical trials with Type 2 diabetic patients", url:"https://pubmed.ncbi.nlm.nih.gov/3899464/"},
      {org:"Asian Pacific Journal of Tropical Disease", finding:"Bitter melon leaf extracts showed significant antimicrobial activity against clinically relevant bacterial and fungal strains", url:""},
      {org:"MedicineNet / PubMed", finding:"Cerasee (bitter melon) phytochemicals including saponins confirmed to have antioxidant, antimicrobial, and anti-inflammatory properties", url:"https://www.medicinenet.com/does_cerasee_tea_have_health_benefits/article.htm"},
    ],
    caution:"Strong herb — should be taken in cycles, not daily indefinitely. Can cause low blood sugar if combined with diabetes medications — monitor carefully. Avoid during pregnancy (uterotonic effects documented). The bitter intensity is a signal of potency — respect the dose.",
    blends:["Cerasee & Ginger Blend","Grandmother's Cerasee Blood Cleanse"],
  },
  {
    id:"cs2", name:"Moringa", latin:"Moringa oleifera", origin:"India · Sub-Saharan Africa · Caribbean",
    family:"Moringaceae",
    category:["nutrients","anti-inflammatory","blood sugar","energy","immune"],
    tags:["Superfood","Anti-inflammatory","Nutrients"], color:"#2A7A1A",
    photo:"/herbs/moringa.jpg", fallback:"https://images.pexels.com/photos/4198928/pexels-photo-4198928.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The tree of life — ancient Africa's most complete nutritional medicine",
    comingSoon:true,
    history:"Moringa oleifera is called the 'miracle tree,' 'drumstick tree,' and 'tree of life' across the cultures that have used it for thousands of years. Ancient Ayurvedic texts from 2,000 years ago list moringa as capable of preventing 300 diseases. Egyptian and Roman writings mention moringa oil for skin care and cooking. In sub-Saharan Africa it has been used for centuries to treat malnutrition, anemia, and inflammatory conditions. During times of famine, moringa leaves have sustained communities because of their exceptional nutrient density. In the Caribbean — including Jamaica — moringa (known locally as 'drumstick') is used as food and medicine, added to soups and teas for strength and health. The WHO has recommended moringa leaf powder as a nutritional supplement for malnourished children and nursing mothers.",
    benefits:[
      {title:"Exceptional Nutrient Density", desc:"Gram for gram, moringa leaves contain more protein than eggs, more calcium than milk, more vitamin A than carrots, more potassium than bananas, and more iron than spinach. Possibly the most nutrient-dense leaf in the plant kingdom."},
      {title:"Anti-inflammatory", desc:"Isothiocyanates and quercetin inhibit NF-kB and other inflammatory pathways. Multiple studies confirm moringa's anti-inflammatory activity is comparable to pharmaceutical NSAIDs at high doses."},
      {title:"Blood Sugar Regulation", desc:"Chlorogenic acid and isothiocyanates slow glucose absorption and improve insulin sensitivity. A 2012 clinical study showed moringa leaf powder significantly reduced post-meal blood sugar spikes."},
      {title:"Antioxidant — Exceptionally High", desc:"Moringa contains quercetin, beta-carotene, vitamin C, and chlorogenic acid — giving it ORAC antioxidant values among the highest measured for any food or herb."},
      {title:"Liver Protection", desc:"Moringa leaf extracts protect the liver from toxic damage, reduce liver fibrosis markers, and support liver enzyme normalization — studied in alcohol-induced and drug-induced liver injury models."},
    ],
    sources:[
      {org:"Asian Pacific Journal of Cancer Prevention", finding:"Moringa leaf extract demonstrated significant anti-inflammatory and antitumor activity through NF-kB inhibition", url:"https://pubmed.ncbi.nlm.nih.gov/22827002/"},
      {org:"Journal of Food Science and Technology", finding:"Moringa oleifera leaves significantly reduced post-meal blood glucose in clinical study — confirming traditional use for diabetes management", url:"https://pubmed.ncbi.nlm.nih.gov/25829567/"},
      {org:"WHO / FAO Nutrition Reports", finding:"Moringa recognized as a high-value nutritional supplement for addressing deficiencies in developing regions — particularly for iron, vitamin A, and protein", url:""},
    ],
    caution:"Generally very safe as a food and tea. Very high doses may have uterotonic effects — avoid therapeutic doses during pregnancy (culinary food amounts are safe). May interact with thyroid and blood pressure medications at therapeutic doses.",
    blends:[],
  },
  {
    id:"cs3", name:"Ginkgo Biloba", latin:"Ginkgo biloba", origin:"China", family:"Ginkgoaceae",
    category:["brain","circulation","antioxidant","memory"],
    tags:["Brain","Memory","Circulation"], color:"#8A8A1A",
    photo:"/herbs/ginkgo.jpg", fallback:"https://images.pexels.com/photos/5961899/pexels-photo-5961899.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🧠", tagline:"The living fossil — 270 million years old and still healing minds",
    comingSoon:true,
    history:"Ginkgo biloba is the world's oldest living tree species — a 'living fossil' that has remained genetically unchanged for 270 million years. Individual ginkgo trees can live over 1,000 years. It survived the atomic bomb in Hiroshima — six ginkgo trees were among the first living things to regrow near ground zero, which the Japanese consider a symbol of hope and resilience. In Traditional Chinese Medicine, ginkgo seeds (bai guo) have been used for over 2,000 years for asthma and urinary complaints. The leaves — now the basis of modern ginkgo extract — were not widely used in TCM but were studied by Western researchers in the 1960s, leading to EGb 761, one of the most studied herbal extracts in the world with over 400 published clinical trials.",
    benefits:[
      {title:"Cognitive Function & Memory", desc:"The most clinically studied herb for cognitive support. EGb 761 (standardized ginkgo extract) improves memory, processing speed, and cognitive function in older adults — with particular evidence in mild cognitive impairment and early dementia."},
      {title:"Cerebral Blood Flow", desc:"Ginkgo dilates blood vessels and reduces blood viscosity, measurably increasing cerebral blood flow. This underlies its benefits for memory, tinnitus, vertigo, and peripheral circulation."},
      {title:"Antioxidant Brain Protection", desc:"Flavonoids (quercetin, kaempferol) and terpene lactones (ginkgolides) are highly potent antioxidants that cross the blood-brain barrier, protecting neurons from oxidative damage and inflammation."},
      {title:"Anxiety & Depression", desc:"Multiple trials show ginkgo extract reduces anxiety scores and depressive symptoms — particularly in elderly patients with cognitive decline and anxiety comorbidity."},
      {title:"Tinnitus & Vertigo", desc:"Used as a standard treatment for tinnitus and vertigo in Germany. Improves inner ear circulation, reducing ringing, dizziness, and balance issues associated with poor cerebrovascular circulation."},
    ],
    sources:[
      {org:"Human Psychopharmacology Journal", finding:"EGb 761 significantly improved memory and cognitive speed in healthy older adults in a double-blind placebo-controlled trial", url:"https://pubmed.ncbi.nlm.nih.gov/12404671/"},
      {org:"Journal of Psychiatric Research", finding:"Ginkgo extract significantly reduced anxiety scores in generalized anxiety disorder patients", url:"https://pubmed.ncbi.nlm.nih.gov/17383372/"},
      {org:"German Commission E / European Medicines Agency", finding:"Recognizes standardized ginkgo leaf extract for treatment of dementia syndromes and peripheral arterial occlusive disease", url:""},
    ],
    caution:"Interacts significantly with blood thinners (warfarin, aspirin) — do not use without medical supervision if on anticoagulants. May lower seizure threshold in epilepsy. Stop 2 weeks before surgery. Raw ginkgo seeds are toxic — only use standardized leaf extracts or tea from reputable sources.",
    blends:[],
  },
  {
    id:"cs4", name:"St. John's Wort", latin:"Hypericum perforatum", origin:"Europe · Western Asia", family:"Hypericaceae",
    category:["mood","depression","anxiety","nervous system","antiviral"],
    tags:["Mood","Depression","Nervous System"], color:"#C4A010",
    photo:"/herbs/st-johns-wort.jpg", fallback:"https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌻", tagline:"Europe's most prescribed antidepressant — natural, ancient, and validated",
    comingSoon:true,
    history:"St. John's Wort has been used in European medicine for over 2,400 years. Its name comes from its traditional harvesting on St. John's Day (June 24th) — the summer solstice — when the flowers bloom. Hippocrates and Dioscorides both recorded its medicinal use. In medieval Europe it was believed to ward off evil spirits (a metaphor, healers say, for its power to lift darkness from the mind). By the 16th century Paracelsus was prescribing it for nerve injuries and wound healing. In Germany today it is the most widely prescribed antidepressant — prescribed more often than Prozac for mild to moderate depression — and carries full pharmaceutical approval. Its antidepressant properties are among the most clinically replicated findings in herbal medicine.",
    benefits:[
      {title:"Mild to Moderate Depression", desc:"The most evidence-based herbal antidepressant. A 2008 Cochrane Review of 29 clinical trials (5,489 patients) found St. John's Wort significantly superior to placebo and equivalent to standard antidepressants for mild to moderate depression — with fewer side effects."},
      {title:"Anxiety & Nervous System Support", desc:"Hypericin and hyperforin modulate serotonin, dopamine, norepinephrine, and GABA simultaneously — a broader receptor profile than most pharmaceutical antidepressants, explaining both mood and anxiety benefits."},
      {title:"Seasonal Affective Disorder (SAD)", desc:"Particularly effective for depression associated with reduced light exposure. Used across Northern Europe for winter depression where the sun disappears for months."},
      {title:"Nerve Pain & Wound Healing", desc:"Anti-inflammatory and analgesic properties relevant to neuropathic pain. Topical preparations have clinical evidence for wound healing, minor burns, and bruising."},
      {title:"Antiviral Activity", desc:"Hypericin has demonstrated antiviral activity against enveloped viruses including HIV and hepatitis C in laboratory studies — though clinical evidence is limited."},
    ],
    sources:[
      {org:"Cochrane Database of Systematic Reviews", finding:"Meta-analysis of 29 trials (5,489 patients): St. John's Wort significantly superior to placebo and similarly effective to antidepressants for mild-moderate depression with fewer side effects", url:"https://pubmed.ncbi.nlm.nih.gov/18843608/"},
      {org:"BMJ (British Medical Journal)", finding:"St. John's Wort extract (WS 5570) as effective as paroxetine for moderate to severe depression in randomized controlled trial", url:"https://pubmed.ncbi.nlm.nih.gov/15791889/"},
    ],
    caution:"IMPORTANT INTERACTIONS: St. John's Wort is a potent inducer of liver enzymes (CYP3A4) and significantly reduces blood levels of many medications — including birth control pills, HIV medications, cyclosporine, digoxin, warfarin, and some antidepressants. Do not combine with SSRIs (serotonin syndrome risk). Always disclose to your doctor. Should not be used for severe depression without medical supervision.",
    blends:[],
  },
  {
    id:"cs5", name:"Rhodiola Rosea", latin:"Rhodiola rosea", origin:"Siberia · Arctic regions · Scandinavia", family:"Crassulaceae",
    category:["adaptogen","stress","energy","fatigue","brain"],
    tags:["Adaptogen","Energy","Mental Fatigue"], color:"#8A3A6A",
    photo:"/herbs/rhodiola.jpg", fallback:"https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"❄️", tagline:"The Arctic adaptogen — Viking endurance in herbal form",
    comingSoon:true,
    history:"Rhodiola rosea grows in cold, harsh environments — the rocky cliffs of Siberia, the Arctic regions of Europe and Asia, and the mountains of Scandinavia. It was used by Viking warriors before battle to enhance endurance and mental sharpness. Siberian hunters and herders used it for strength and stamina in extreme cold. In Traditional Chinese Medicine it was used for altitude sickness, fatigue, and aging. Soviet scientists beginning in the 1960s conducted extensive classified research on rhodiola as a performance enhancer for military personnel, cosmonauts, and athletes — research that became public after the fall of the USSR and sparked a surge of Western clinical trials. It is now recognized alongside ashwagandha and tulsi as one of the three most important herbal adaptogens with robust clinical evidence.",
    benefits:[
      {title:"Mental & Physical Fatigue", desc:"The most clinically studied herb for stress-related burnout and fatigue. Multiple randomized trials show significant improvements in fatigue, burnout scores, and cognitive performance after just one week of use."},
      {title:"Cortisol Modulation", desc:"Rosavins and salidroside modulate the HPA axis (the stress hormone system), reducing stress-induced cortisol spikes while maintaining healthy baseline cortisol levels — the hallmark of true adaptogenic activity."},
      {title:"Physical Performance", desc:"Improves VO2 max, time to exhaustion, and recovery from physical exertion. Studied in athletes, military personnel, and shift workers with consistent evidence of improved endurance."},
      {title:"Depression & Mood", desc:"A 2015 randomized trial at UCLA compared rhodiola to sertraline (Zoloft) for major depressive disorder — rhodiola showed fewer side effects with meaningful (though smaller) antidepressant effects."},
      {title:"Cognitive Function", desc:"Improves memory, attention, and processing speed under stress conditions. Particularly valuable for high-stress occupational environments — studied in night-shift physicians and military cadets."},
    ],
    sources:[
      {org:"Phytomedicine Journal", finding:"Rhodiola rosea extract SHR-5 significantly reduced burnout, fatigue, and cognitive impairment in randomized trial versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/19500070/"},
      {org:"Phytotherapy Research", finding:"Rhodiola associated with significant improvements in work performance, sleep, stability, and motivation in a study of physicians during night duty", url:"https://pubmed.ncbi.nlm.nih.gov/12725561/"},
      {org:"Journal of Psychopharmacology (UCLA)", finding:"Rhodiola rosea produced significant antidepressant effect versus placebo, with fewer side effects than sertraline in mild-to-moderate major depressive disorder", url:"https://pubmed.ncbi.nlm.nih.gov/25837277/"},
    ],
    caution:"Generally well-tolerated. Can be stimulating — best taken in the morning or early afternoon, not before bed. May interact with antidepressants (additive effects). Start with lower doses and titrate up. Those with bipolar disorder should use with caution due to stimulating properties.",
    blends:[],
  },
  {
    id:"cs6", name:"Licorice Root", latin:"Glycyrrhiza glabra", origin:"Mediterranean · Central Asia · China", family:"Fabaceae",
    category:["gut","adrenal","respiratory","anti-inflammatory","liver"],
    tags:["Gut Healing","Adrenal","Respiratory"], color:"#6B3A1A",
    photo:"/herbs/licorice-root.jpg", fallback:"https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🪵", tagline:"The great harmonizer of ancient medicine — sweet, powerful, and deeply healing",
    comingSoon:true,
    history:"Licorice is one of the oldest and most universally used medicinal plants in the world. It appears in the ancient Ebers Papyrus of Egypt (1550 BCE), in the records of ancient Assyrian herbalists (1000 BCE), in Greek medicine (Dioscorides), and in Traditional Chinese Medicine where it is called Gan Cao — the 'sweet herb' — and is added to more TCM formulas than any other single herb, not for its own effects but to harmonize and balance all the other herbs in the blend. Alexander the Great's soldiers carried licorice root to sustain themselves on long marches. Napoleon Bonaparte was said to consume so much licorice his teeth were permanently stained black. Ayurveda uses it as a primary tonic for the voice, lungs, and digestive system.",
    benefits:[
      {title:"Gut Lining & Ulcer Healing", desc:"DGL (deglycyrrhizinated licorice) is one of the most evidence-based natural treatments for gastric and duodenal ulcers. Promotes mucus secretion, inhibits H. pylori, and accelerates healing of the gastric mucosa."},
      {title:"Adrenal Support & Cortisol Balance", desc:"Glycyrrhizin inhibits the enzyme that breaks down cortisol, extending cortisol's action in the body. Useful for adrenal fatigue and HPA axis dysregulation — the burnout state where cortisol is chronically low."},
      {title:"Respiratory & Throat", desc:"Expectorant and anti-inflammatory effects on the respiratory tract. One of the premier herbs for sore throat, dry cough, and bronchitis. Used in hospitals in Europe and Japan as a post-operative cough remedy."},
      {title:"Anti-inflammatory", desc:"Glycyrrhizin has potent anti-inflammatory activity similar to cortisone — without the immunosuppressive effects. Studied for hepatitis, autoimmune conditions, and allergic inflammation."},
      {title:"Antiviral", desc:"Glycyrrhizin has demonstrated antiviral activity against SARS-CoV, influenza, and hepatitis C in laboratory studies. Used intravenously in Japanese hospitals for hepatitis B and C treatment."},
    ],
    sources:[
      {org:"Alimentary Pharmacology & Therapeutics", finding:"DGL licorice extract significantly accelerated healing of gastric and duodenal ulcers compared to placebo, comparable in efficacy to antacid medications", url:"https://pubmed.ncbi.nlm.nih.gov/4027916/"},
      {org:"Phytomedicine Journal", finding:"Licorice root extract showed significant anti-inflammatory activity and cortisol-sparing effects in clinical models of adrenal insufficiency", url:""},
      {org:"Journal of Molecular Medicine", finding:"Glycyrrhizin demonstrated significant antiviral activity against SARS coronavirus and hepatitis C virus", url:"https://pubmed.ncbi.nlm.nih.gov/12730754/"},
    ],
    caution:"IMPORTANT: Whole licorice root consumed in excess raises blood pressure and causes potassium loss through aldosterone-like effects. DGL (deglycyrrhizinated) form is safe for gut use. Avoid high-dose whole licorice if hypertensive, pregnant, or on diuretics or corticosteroids. Safe at culinary amounts in blends.",
    blends:[],
  },
  {
    id:"cs7", name:"Hawthorn Berry", latin:"Crataegus monogyna / C. laevigata", origin:"Europe · North America · Asia", family:"Rosaceae",
    category:["heart","blood pressure","circulation","antioxidant"],
    tags:["Heart","Blood Pressure","Circulation"], color:"#8B1A1A",
    photo:"/herbs/hawthorn.jpg", fallback:"https://images.pexels.com/photos/1437263/pexels-photo-1437263.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"❤️", tagline:"The heart's herbal guardian — used for cardiac health for 2,000 years",
    comingSoon:true,
    history:"Hawthorn has been sacred in European cultures for millennia — the Celts considered it a fairy tree and a threshold between worlds. In European herbalism from the Middle Ages onward, hawthorn was recognized as a heart tonic. By the 19th century it was one of the primary treatments prescribed by doctors in Ireland, Germany, and France for heart failure and cardiac weakness. In Traditional Chinese Medicine, hawthorn berries (Shan Zha) are used for digestion and heart health. The modern German Commission E and European Medicines Agency have both approved standardized hawthorn extract for cardiac insufficiency, making it one of the few herbs with pharmaceutical approval for a major cardiovascular condition.",
    benefits:[
      {title:"Cardiac Muscle Strengthening", desc:"Hawthorn oligomeric procyanidins and flavonoids directly strengthen cardiac muscle contractions, improve coronary blood flow, and reduce cardiac oxygen demand — mechanisms validated in multiple clinical trials for heart failure."},
      {title:"Blood Pressure Reduction", desc:"Acts through multiple mechanisms — vasodilation, diuresis, and reduced peripheral resistance — producing significant blood pressure reductions in clinical trials, particularly for stage 1 hypertension."},
      {title:"Heart Failure Support", desc:"A major 2008 European trial (SPICE, 2,681 patients) confirmed hawthorn extract significantly delayed time to first cardiac event in patients with heart failure. The herb is prescribed alongside cardiac medications in Germany."},
      {title:"Antioxidant Heart Protection", desc:"The flavonoids and oligomeric procyanidins are among the most potent cardiovascular antioxidants known — protecting the heart and vessel walls from oxidative damage and LDL oxidation."},
      {title:"Cholesterol & Lipids", desc:"Reduces LDL cholesterol absorption in the gut and increases its elimination via bile. Multiple studies confirm lipid-lowering effects with regular use."},
    ],
    sources:[
      {org:"European Journal of Heart Failure (SPICE Trial)", finding:"Hawthorn extract WS 1442 significantly delayed time to first cardiac event in heart failure patients in a major 2,681-patient European trial", url:"https://pubmed.ncbi.nlm.nih.gov/18380410/"},
      {org:"Cochrane Database of Systematic Reviews", finding:"Hawthorn extract significantly improved exercise tolerance and reduced symptoms of breathlessness and fatigue in heart failure patients across 14 randomized trials", url:"https://pubmed.ncbi.nlm.nih.gov/18425879/"},
      {org:"European Medicines Agency (EMA)", finding:"Approves hawthorn leaf and flower extract for relief of symptoms of cardiac insufficiency NYHA functional Class II", url:""},
    ],
    caution:"Generally safe long-term. May interact with cardiac glycosides (digoxin) and other heart medications — if on cardiac medications, consult your doctor before use. Effects build over 6–8 weeks of consistent use. Do not use as a replacement for prescribed heart failure treatment.",
    blends:[],
  },
  {
    id:"cs8", name:"Black Seed (Nigella)", latin:"Nigella sativa", origin:"Southwest Asia · North Africa · Mediterranean", family:"Ranunculaceae",
    category:["immune","anti-inflammatory","respiratory","blood sugar","antioxidant"],
    tags:["Immune","Anti-inflammatory","Black Seed"], color:"#1A1A1A",
    photo:"/herbs/black-seed.jpg", fallback:"https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🖤", tagline:"'A cure for everything except death' — the Prophet Muhammad",
    comingSoon:true,
    history:"Black seed (Nigella sativa) is one of the most revered medicinal plants in Islamic medicine. The hadith of the Prophet Muhammad states it is 'a cure for everything except death,' and this saying has driven 1,400 years of its use across the Islamic world from North Africa to Central Asia. Archaeological evidence shows it was used in ancient Egypt — black seeds were found in the tomb of Tutankhamun. Ancient Greek physicians including Dioscorides used it as a diuretic and to treat digestive complaints. In Ayurveda it is called krishna jiraka. Today thymoquinone — the primary active compound in black seed oil — is one of the most intensely studied phytochemicals in cancer and immunology research worldwide.",
    benefits:[
      {title:"Immune Modulation", desc:"Thymoquinone enhances natural killer cell activity, macrophage function, and lymphocyte proliferation — acting as an immunostimulant in deficiency states and as an immunomodulator in inflammatory excess."},
      {title:"Respiratory & Asthma Support", desc:"Multiple clinical trials show black seed oil significantly improves lung function, reduces asthma attack frequency, and lowers inflammatory markers in the airways. One trial showed effects comparable to conventional bronchodilators."},
      {title:"Anti-inflammatory", desc:"Thymoquinone inhibits COX-1, COX-2, and 5-LOX enzymes simultaneously — a broader anti-inflammatory profile than most pharmaceutical NSAIDs. Studied for rheumatoid arthritis with meaningful clinical results."},
      {title:"Blood Sugar & Metabolic Health", desc:"Clinical trials in Type 2 diabetics show significant reductions in fasting blood glucose, HbA1c, and insulin resistance with black seed supplementation."},
      {title:"Liver & Kidney Protection", desc:"Strongly protective against toxic damage to the liver and kidneys — studied in chemotherapy-induced, drug-induced, and alcohol-induced injury models with consistent protective findings."},
    ],
    sources:[
      {org:"Phytotherapy Research", finding:"Nigella sativa significantly improved asthma symptoms, lung function, and reduced inflammatory markers compared to placebo in randomized trial", url:"https://pubmed.ncbi.nlm.nih.gov/19140159/"},
      {org:"Journal of Endocrinology & Metabolism", finding:"Black seed extract significantly reduced fasting glucose, HbA1c, and insulin resistance in Type 2 diabetic patients versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/20100884/"},
      {org:"Journal of Autoimmunity", finding:"Thymoquinone from Nigella sativa demonstrated significant anti-inflammatory and immunomodulatory effects across multiple autoimmune disease models", url:""},
    ],
    caution:"Generally safe at culinary and supplemental doses. May interact with blood thinners and blood pressure medications. Avoid therapeutic doses during pregnancy (uterine stimulant at high doses — culinary amounts in cooking are safe). Some people experience GI discomfort — take with food.",
    blends:[],
  },
  {
    id:"cs9", name:"Sarsaparilla Root", latin:"Smilax ornata / Smilax regelii", origin:"Central America · Jamaica · Caribbean", family:"Smilacaceae",
    category:["blood","liver","detox","skin","anti-inflammatory"],
    tags:["Blood Purifier","Skin","Jamaican"], color:"#6B2A0A",
    photo:"/herbs/sarsaparilla.jpg", fallback:"https://images.pexels.com/photos/4040696/pexels-photo-4040696.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The Caribbean blood tonic — ancestral skin and vitality medicine",
    comingSoon:true,
    history:"Sarsaparilla is native to Central America and the Caribbean and holds a particularly important place in Jamaican herbal tradition. Indigenous peoples of Central America used it for joint pain, skin conditions, and as a blood purifier centuries before European contact. Spanish explorers in the 16th century brought it to Europe, where it became enormously popular as a treatment for syphilis — the 'great pox' that swept Europe after contact with the Americas. It was listed in the U.S. Pharmacopeia from 1820 to 1910. In Jamaican folk medicine, sarsaparilla is used as a tonic for strength, sexual vitality, skin clarity, and blood cleansing. It also gave root beer its original flavor before being replaced by artificial flavorings.",
    benefits:[
      {title:"Blood Purification & Detox", desc:"Saponins bind to toxins and endotoxins in the gut and bloodstream, facilitating their elimination. Traditional use as a blood purifier has plausible mechanisms through endotoxin binding and liver support."},
      {title:"Skin Conditions", desc:"Anti-inflammatory and detoxifying properties have clinical support for psoriasis specifically — a 1942 study in the New England Journal of Medicine found sarsaparilla significantly improved psoriasis symptoms. More recent in vitro studies confirm anti-inflammatory activity relevant to inflammatory skin conditions."},
      {title:"Anti-inflammatory for Joints", desc:"Phytosterols and saponins reduce inflammatory markers. Traditional use for rheumatism, arthritis, and gout is supported by anti-inflammatory mechanisms."},
      {title:"Hormone Precursor Activity", desc:"Contains steroidal saponins (sarsasapogenin, smilagenin) that serve as precursors in the biosynthesis of steroid hormones. Traditional use as a male vitality tonic and testosterone supporter has historical and emerging biochemical support."},
      {title:"Antimicrobial", desc:"Demonstrated activity against a range of bacteria and fungi. Historical use for syphilis, while not validated by modern trials, reflects broad antimicrobial properties."},
    ],
    sources:[
      {org:"New England Journal of Medicine (historical)", finding:"Sarsaparilla extract produced marked improvement in psoriasis symptoms in the majority of treated patients versus control — one of the earliest controlled herbal trials", url:""},
      {org:"Journal of Ethnopharmacology", finding:"Smilax ornata demonstrated significant anti-inflammatory and antioxidant activity relevant to skin and joint conditions", url:"https://pubmed.ncbi.nlm.nih.gov/12849611/"},
    ],
    caution:"Generally safe. High doses may cause GI irritation. The saponins can reduce absorption of some medications if taken simultaneously — space by 2 hours. Avoid during pregnancy in therapeutic amounts.",
    blends:[],
  },
  {
    id:"cs10", name:"Guinea Hen Weed", latin:"Petiveria alliacea", origin:"Jamaica · Caribbean · Central & South America", family:"Phytolaccaceae",
    category:["immune","anti-inflammatory","pain","jamaican"],
    tags:["Jamaican Bush Medicine","Immune","Pain Relief"], color:"#4A6B1A",
    photo:"/herbs/guinea-hen-weed.jpg", fallback:"https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"Jamaica's powerful immune herb — bush medicine that science is catching up to",
    comingSoon:true,
    history:"Guinea hen weed is one of the most important medicinal plants in Jamaican and Caribbean folk medicine. Known also as 'garlic weed' (for its powerful sulfurous scent), it is used across Jamaica, Trinidad, Barbados, and throughout Central and South America as a broad-spectrum healing herb. In Jamaican tradition it is used for colds, flu, fever, joint pain, diabetes, and as a powerful immune booster — typically boiled as a bush tea or made into a potent root tincture. Indigenous peoples across Central and South America use it for pain relief, fever reduction, and spiritual protection. Brazilian folk medicine calls it mucura or tipi. Modern pharmacological research is actively investigating its remarkable range of biological activities.",
    benefits:[
      {title:"Immune System Activation", desc:"Compounds in guinea hen weed stimulate natural killer cell activity, lymphocyte proliferation, and macrophage function — supporting the traditional use as an immune tonic and infection fighter."},
      {title:"Anti-inflammatory & Pain Relief", desc:"Analgesic and anti-inflammatory properties documented in multiple animal studies — compounds inhibit prostaglandin synthesis and cyclooxygenase enzymes, providing a mechanism for traditional use in joint pain and muscle aches."},
      {title:"Antiviral & Antimicrobial", desc:"Extracts show significant antiviral activity against influenza and herpes viruses in laboratory studies. Broad antimicrobial activity against bacterial and fungal pathogens supports traditional use for infection."},
      {title:"Blood Sugar Support", desc:"Preliminary evidence shows guinea hen weed may lower blood glucose through insulin-sensitizing and alpha-glucosidase inhibiting mechanisms — supporting traditional use for diabetes in the Caribbean."},
      {title:"Antiparasitic", desc:"Traditionally used for intestinal worms and parasites. Laboratory evidence confirms antiprotozoal activity against common parasitic organisms."},
    ],
    sources:[
      {org:"Journal of Ethnopharmacology", finding:"Petiveria alliacea extracts demonstrated significant immunostimulatory, anti-inflammatory, and antiviral activity across multiple laboratory studies", url:"https://pubmed.ncbi.nlm.nih.gov/11801364/"},
      {org:"Phytotherapy Research", finding:"Guinea hen weed extracts showed significant analgesic and anti-inflammatory activity in controlled models, supporting traditional use for pain", url:""},
    ],
    caution:"Potent herb — should be used in cycles, not continuously. Has uterotonic properties — avoid during pregnancy. The strong sulfur compounds give it a garlic-like smell. Use under guidance of a knowledgeable herbalist, particularly for therapeutic doses beyond culinary use.",
    blends:[],
  },
  {
    id:"cs11", name:"Rosemary", latin:"Salvia rosmarinus", origin:"Mediterranean", family:"Lamiaceae",
    category:["brain","circulation","antioxidant","anti-inflammatory","digestion"],
    tags:["Brain","Circulation","Memory"], color:"#3A5A1A",
    photo:"/herbs/rosemary.jpg", fallback:"https://images.pexels.com/photos/2802253/pexels-photo-2802253.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The herb of remembrance — ancient Greece's brain and circulation tonic",
    comingSoon:true,
    history:"Rosemary has been called the herb of remembrance since antiquity. Ancient Greek students wore rosemary garlands while studying for exams, believing it strengthened memory. The ancient Egyptians used it in burial ceremonies. In medieval Europe it was the defining herb of weddings (for remembrance and fidelity) and funerals (for memory of the deceased). Shakespeare's Ophelia says 'There's rosemary, that's for remembrance.' Hungarian water — one of the first recorded perfumes, created for Queen Elizabeth of Hungary in the 14th century — was made from rosemary steeped in wine. Modern neuroscience has actually vindicated the Greek students: rosmarinic acid and carnosic acid measurably improve memory performance.",
    benefits:[
      {title:"Memory & Cognitive Enhancement", desc:"Rosemary aroma (1,8-cineole absorbed through inhalation) measurably improves memory speed and accuracy in controlled trials. Rosmarinic acid inhibits acetylcholinesterase — the same mechanism as Alzheimer's medications — maintaining higher levels of acetylcholine in the brain."},
      {title:"Scalp & Hair Growth", desc:"A 2015 randomized trial found rosemary oil as effective as minoxidil (Rogaine) for androgenetic alopecia (male pattern baldness) — with fewer scalp itching side effects."},
      {title:"Antioxidant", desc:"Rosmarinic acid and carnosic acid are among the most potent natural antioxidants known, providing exceptional protection for fats and oils from oxidation — reflecting rosemary's ancient use as a food preservative."},
      {title:"Circulation", desc:"Improves peripheral blood flow and reduces platelet aggregation. Traditional use for poor circulation, cold hands and feet, and low blood pressure is supported by vasodilatory mechanisms."},
      {title:"Anti-inflammatory & Antimicrobial", desc:"Inhibits NF-kB inflammatory pathways and demonstrates broad antimicrobial activity — relevant to gut health, skin health, and systemic inflammation."},
    ],
    sources:[
      {org:"Therapeutic Advances in Psychopharmacology", finding:"Exposure to rosemary aroma (1,8-cineole) significantly improved speed and accuracy of mental arithmetic and quality of memory in healthy adults", url:"https://pubmed.ncbi.nlm.nih.gov/26491634/"},
      {org:"Skinmed Journal", finding:"Rosemary oil applied topically was as effective as 2% minoxidil for hair regrowth in androgenetic alopecia — with fewer side effects", url:"https://pubmed.ncbi.nlm.nih.gov/25842469/"},
    ],
    caution:"Extremely safe at culinary and tea doses. High doses of rosemary essential oil can cause seizures and should never be taken internally. The dried herb for tea is completely safe. Avoid high supplemental doses during pregnancy.",
    blends:[],
  },
  {
    id:"cs12", name:"Slippery Elm Bark", latin:"Ulmus rubra", origin:"Eastern North America", family:"Ulmaceae",
    category:["gut","throat","soothe","inflammation"],
    tags:["Gut Healing","Throat","Soothing"], color:"#8A6A3A",
    photo:"/herbs/slippery-elm.jpg", fallback:"https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🪵", tagline:"Native America's great soother — medicine from the inner bark of the elm",
    comingSoon:true,
    history:"Slippery elm's inner bark is one of the most widely used medicinal plants in North American herbal medicine. Multiple Native American peoples used it extensively — the Ojibwe for sore throats and coughs, the Cherokee for fever and sore throat, the Iroquois for wounds and skin conditions. Early European settlers learned its uses from Native healers and it quickly became a staple of frontier medicine. During the American Civil War, slippery elm porridge was used to feed wounded soldiers when other food was unavailable, as it was highly digestible and soothing to the gut. It appeared in the U.S. Pharmacopeia for decades and remains FDA-approved as a demulcent (soothing agent) for throat conditions.",
    benefits:[
      {title:"Gut Lining & Leaky Gut", desc:"Inner bark mucilage creates a protective, gel-like coating on the entire gastrointestinal lining — from esophagus to colon. One of the most effective natural demulcents for leaky gut, GERD, gastritis, and IBS."},
      {title:"Sore Throat & Esophageal Soothing", desc:"FDA-approved demulcent for sore throat. The mucilage physically coats inflamed throat tissue, reducing pain and irritation on contact. Traditional use for whooping cough and croup is supported by this mechanism."},
      {title:"Inflammatory Bowel Conditions", desc:"Pilot studies show slippery elm reduced IBD symptom scores and improved stool consistency in ulcerative colitis patients. The mucilage may act as a prebiotic and physical barrier protecting inflamed intestinal tissue."},
      {title:"Nutrient Dense Sustenance", desc:"Inner bark powder is a complete food — high in calories, protein, and complex carbohydrates, highly digestible. Used historically as survival food for the sick and injured."},
    ],
    sources:[
      {org:"Complementary Therapies in Medicine", finding:"Slippery elm inner bark formulation significantly improved bowel habit and IBS symptoms in a pilot clinical study", url:"https://pubmed.ncbi.nlm.nih.gov/12238096/"},
      {org:"U.S. Food and Drug Administration (FDA)", finding:"Recognizes slippery elm bark as a safe and effective demulcent active ingredient for sore throat and minor throat irritations", url:""},
    ],
    caution:"Extremely safe — one of the most gentle and food-like herbs. Like marshmallow root, the mucilage may slow absorption of other medications — space by 2 hours. Sustainably source slippery elm as the wild elm population has been significantly reduced by Dutch elm disease.",
    blends:[],
  },
  {
    id:"cs13", name:"Maca Root", latin:"Lepidium meyenii", origin:"Peruvian Andes", family:"Brassicaceae",
    category:["energy","hormones","adaptogen","fertility","stress"],
    tags:["Energy","Hormones","Fertility"], color:"#8A6A1A",
    photo:"/herbs/maca.jpg", fallback:"https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"⚡", tagline:"The Incan superfood — altitude medicine that powered an empire",
    comingSoon:true,
    history:"Maca grows only in the high Andes of Peru, at altitudes between 13,000–15,000 feet — some of the harshest growing conditions on earth. It has been cultivated by indigenous Andean peoples for over 2,000 years. Incan warriors were given maca before battle for strength and endurance, and then denied it upon reaching conquered cities to protect the local women. Maca was so valued that it was used as currency and offered as tribute to the Incan emperor. When Spanish conquistadors arrived in Peru in the 16th century, their livestock failed to reproduce in the high altitude — until local Peruvians recommended feeding them maca, after which fertility was restored. The plant remains a staple of Andean diet and medicine today.",
    benefits:[
      {title:"Energy & Endurance", desc:"Multiple clinical trials confirm maca significantly reduces fatigue and improves physical endurance. Athletes and active individuals show improved VO2 max and exercise performance. The mechanism is not stimulant-based but related to nutrient density and adaptogenic effects on the HPA axis."},
      {title:"Hormonal Balance — Men & Women", desc:"Unlike phytoestrogenic herbs, maca does not contain plant hormones but appears to normalize hormone production through the hypothalamus-pituitary axis. Studied for menopausal symptoms, sexual dysfunction, and male fertility with consistent positive results."},
      {title:"Sexual Function & Libido", desc:"The most clinically studied natural libido enhancer. Multiple randomized trials show significant improvements in sexual desire in both men and women, with effects independent of testosterone or estrogen changes."},
      {title:"Fertility", desc:"A systematic review of clinical evidence found maca improved sperm count, sperm motility, and semen volume in healthy men. Traditional use for fertility in both livestock and humans is supported by modern research."},
      {title:"Mood & Menopause", desc:"A 2006 randomized trial found maca significantly reduced psychological symptoms of menopause including anxiety, depression, and sexual dysfunction — without affecting estrogen or FSH levels."},
    ],
    sources:[
      {org:"Andrologia Journal", finding:"Maca supplementation significantly increased sexual desire in men — independent of changes in testosterone, estradiol, or depression scores", url:"https://pubmed.ncbi.nlm.nih.gov/12472620/"},
      {org:"Menopause Journal", finding:"Maca significantly reduced number and severity of menopausal symptoms including anxiety and depression versus placebo without affecting estrogen levels", url:"https://pubmed.ncbi.nlm.nih.gov/16735896/"},
      {org:"Asian Journal of Andrology", finding:"Systematic review confirms maca improves sperm count, motility, and volume in clinical studies of healthy men", url:"https://pubmed.ncbi.nlm.nih.gov/20090980/"},
    ],
    caution:"Generally very safe as a food and supplement. Very high doses may cause GI upset — start with smaller amounts. Those with thyroid conditions should use cautiously as raw maca contains goitrogens (heat processing neutralizes these). Generally safer than hormonal interventions as it does not directly supply plant hormones.",
    blends:[],
  },
  {
    id:"cs14", name:"Yarrow", latin:"Achillea millefolium", origin:"Europe · Asia · North America", family:"Asteraceae",
    category:["wound healing","anti-inflammatory","digestion","fever","circulation"],
    tags:["Wound Healing","Fever","Digestion"], color:"#8A8A3A",
    photo:"/herbs/yarrow.jpg", fallback:"https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌼", tagline:"Achilles' herb — the warrior's wound healer since ancient Troy",
    comingSoon:true,
    history:"Yarrow's botanical name Achillea comes from Achilles — legend says the Greek hero used it to staunch the wounds of his soldiers on the battlefield at Troy. Archaeological evidence of yarrow has been found in Neanderthal burial sites dating to 60,000 BCE, making it potentially the oldest known medicinal plant use in human history. The ancient Chinese used it for divination (I Ching) and medicine. Every major European healing tradition from Anglo-Saxon through Renaissance herbalism featured yarrow prominently. Native American peoples across the continent used it for wound healing, fever, and pain. It is one of the most geographically widespread medicinal herbs on earth — found and used on every inhabited continent.",
    benefits:[
      {title:"Wound Healing & Styptic", desc:"Achillin and other compounds promote blood clotting and wound closure — the traditional battlefield use has biological basis. Achillea significantly reduces bleeding time and promotes wound healing in controlled studies."},
      {title:"Fever Reduction", desc:"A diaphoretic — promotes sweating to reduce fever through the body's natural cooling mechanism. Traditional use across many cultures for breaking fevers is one of the most consistent applications of yarrow worldwide."},
      {title:"Digestive Bitter Tonic", desc:"Bitter sesquiterpene lactones stimulate digestive enzymes, bile production, and appetite — making yarrow a classical bitter digestive tonic used before meals to improve digestion."},
      {title:"Anti-inflammatory", desc:"Flavonoids and sesquiterpene lactones inhibit multiple inflammatory enzymes. Studied for arthritis and inflammatory conditions with meaningful anti-inflammatory activity."},
      {title:"Female Reproductive Support", desc:"Traditionally used for menstrual irregularity, cramping, and excessive bleeding. Antispasmodic effects on uterine smooth muscle and anti-inflammatory properties support this traditional use."},
    ],
    sources:[
      {org:"Journal of Ethnopharmacology", finding:"Achillea millefolium extracts demonstrated significant anti-inflammatory, antispasmodic, and wound-healing activity across multiple controlled studies", url:"https://pubmed.ncbi.nlm.nih.gov/21094856/"},
      {org:"Phytomedicine Journal", finding:"Yarrow demonstrated significant hepatoprotective and anti-inflammatory effects in controlled models — supporting traditional use as a digestive and liver herb", url:""},
    ],
    caution:"Generally safe. Belongs to ragweed family — those with Asteraceae allergies should use cautiously. May increase skin photosensitivity. Avoid therapeutic doses during pregnancy (uterine stimulant). Can cause contact dermatitis in some sensitive individuals.",
    blends:[],
  },
  {
    id:"cs15", name:"Schisandra Berry", latin:"Schisandra chinensis", origin:"China · Russia · Korea", family:"Schisandraceae",
    category:["adaptogen","liver","brain","stress","anti-aging"],
    tags:["Adaptogen","Liver","Anti-aging"], color:"#8B1A3A",
    photo:"/herbs/schisandra.jpg", fallback:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🍇", tagline:"The five-flavor berry — TCM's complete adaptogen and longevity fruit",
    comingSoon:true,
    history:"Schisandra is unique among medicinal berries in that it contains all five flavors recognized in Traditional Chinese Medicine — sweet, sour, salty, bitter, and pungent — earning it the name Wu Wei Zi ('five flavor fruit'). Possession of all five flavors indicates, in TCM theory, a correspondingly broad effect on all five organ systems. It has been used in TCM for over 2,000 years as a primary tonic for longevity, kidney and liver support, and mental performance. Russian pharmacologist Nikolai Lazarev — who coined the term 'adaptogen' — listed schisandra as one of the original three adaptogens alongside ginseng and Eleutherococcus. Soviet Olympic athletes used it extensively in the 1960s–80s.",
    benefits:[
      {title:"Liver Protection & Regeneration", desc:"Schisandrin B and other lignans from schisandra are among the most potent natural liver-protective compounds known. Studied extensively in hepatitis, drug-induced liver injury, and fatty liver — used as a pharmaceutical agent for hepatitis in China."},
      {title:"Adaptogenic Stress Response", desc:"Regulates the HPA axis and sympathoadrenal system simultaneously — reducing stress hormones while maintaining physical and mental performance under stress. Classified alongside ashwagandha and rhodiola as a Tier 1 adaptogen."},
      {title:"Cognitive Function & Mental Performance", desc:"Improves working memory, attention, and mental accuracy under stress conditions. Russian studies showed schisandra improved error rates and work quality in factory workers and soldiers."},
      {title:"Anti-aging & Longevity", desc:"Among the most antioxidant-rich berries measured. Lignans protect DNA, cellular membranes, and mitochondria from oxidative damage. Used in China as a longevity tonic consumed daily by emperors."},
      {title:"Endurance & Physical Performance", desc:"Improves cardiovascular efficiency and reduces lactic acid accumulation during exercise. Soviet sports medicine studies showed meaningful improvements in athletic endurance."},
    ],
    sources:[
      {org:"Liver International Journal", finding:"Schisandrin B significantly protected against drug-induced liver injury and accelerated liver cell regeneration in controlled clinical models", url:""},
      {org:"Phytomedicine Journal", finding:"Schisandra chinensis extract significantly improved cognitive performance, reaction time, and error rate in mentally fatigued subjects", url:"https://pubmed.ncbi.nlm.nih.gov/14741189/"},
    ],
    caution:"Generally well-tolerated. May cause GI upset in some people. May interact with cytochrome P450 metabolized drugs (similar to grapefruit). Avoid during pregnancy. The liver-protective effects are a reason to source high-quality, standardized preparations.",
    blends:[],
  },
  {
    id:"cs16", name:"Reishi Mushroom", latin:"Ganoderma lucidum", origin:"China · Japan · Korea", family:"Ganodermataceae",
    category:["immune","adaptogen","anti-aging","liver","nervous system"],
    tags:["Immune","Adaptogen","Longevity"], color:"#6B2A0A",
    photo:"/herbs/reishi.jpg", fallback:"https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🍄", tagline:"The mushroom of immortality — 4,000 years of Eastern longevity medicine",
    comingSoon:true,
    history:"Reishi has been called the 'mushroom of immortality' in China for over 4,000 years. So rare and prized in antiquity that it could only be obtained by royalty and the very wealthy — Emperor Qin Shi Huang sent expeditions to search for it as part of his quest for immortality. It appears in the oldest known Chinese medical text, the Shennong Bencao Jing (circa 29 BCE), listed in the highest category of tonics — those safe for daily use across a lifetime without side effects. In Japanese culture (where it is called Lingzhi), it features in art, architecture, and religious imagery as a symbol of longevity and divine power. It is also central to Korean and Vietnamese traditional medicine.",
    benefits:[
      {title:"Immune Modulation", desc:"Beta-glucans and triterpenoids are among the most potent natural immune modulators known — enhancing natural killer cell activity, T-lymphocyte function, and macrophage activity. Used in cancer integrative medicine in Japan and China to support immune function during chemotherapy."},
      {title:"Adaptogenic Stress & Nervous System Support", desc:"Triterpenoids modulate the HPA axis and have demonstrated anxiolytic effects in clinical trials. Reishi is increasingly used for burnout, chronic stress, and nervous system exhaustion — the 'tired but wired' state."},
      {title:"Liver Protection", desc:"Ganoderic acids protect liver cells from toxic damage, reduce liver enzyme levels, and support fatty liver resolution. Among the most studied functional mushrooms for liver health."},
      {title:"Anti-cancer Support (Integrative)", desc:"In Japan and China, reishi polysaccharide extracts are licensed as adjunct cancer treatments — not as primary therapy but as immune-supporting agents alongside conventional treatment. Multiple clinical trials support improved quality of life and immune markers in cancer patients."},
      {title:"Sleep & Anxiety", desc:"Clinical trials show reishi significantly improves sleep quality, reduces anxiety, and improves fatigue in cancer patients and healthy adults with sleep disturbance."},
    ],
    sources:[
      {org:"Immunology Letters Journal", finding:"Ganoderma lucidum polysaccharides significantly enhanced natural killer cell and lymphocyte activity in cancer patients — supporting use as an immunostimulant in oncology", url:"https://pubmed.ncbi.nlm.nih.gov/16137775/"},
      {org:"Journal of Medicinal Food", finding:"Reishi mushroom extract significantly improved fatigue, anxiety, and quality of life scores in breast cancer patients versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/22203551/"},
      {org:"Cochrane Database of Systematic Reviews", finding:"Ganoderma lucidum may have potential as an adjunct cancer therapy but insufficient evidence to recommend as primary treatment — immune-stimulating effects well-documented", url:"https://pubmed.ncbi.nlm.nih.gov/26919393/"},
    ],
    caution:"Generally very safe long-term. May interact with anticoagulants (mild blood-thinning effect). High doses may cause digestive upset, dizziness, or dry mouth in some individuals. Those with autoimmune conditions or on immunosuppressants should consult their doctor. Avoid raw reishi — it must be properly extracted or prepared as tea.",
    blends:[],
  },
  {
    id:"cs17", name:"Cat's Claw", latin:"Uncaria tomentosa", origin:"Peruvian Amazon", family:"Rubiaceae",
    category:["immune","anti-inflammatory","joints","antiviral","digestive"],
    tags:["Immune","Anti-inflammatory","Joints"], color:"#6B4A0A",
    photo:"/herbs/cats-claw.jpg", fallback:"https://images.pexels.com/photos/2382929/pexels-photo-2382929.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The Amazonian immune powerhouse — sacred vine of the rainforest",
    comingSoon:true,
    history:"Cat's claw (Una de Gato) is a large woody vine native to the Amazon rainforest and gets its name from the curved thorns that resemble a cat's claw. It has been used medicinally by indigenous Amazonian peoples — particularly the Ashaninka of Peru — for over 2,000 years for inflammation, infection, stomach complaints, and as a general immune tonic. The Ashaninka consider it one of their most sacred plants. Western researchers became aware of it in the 1970s when Austrian scientist Klaus Keplinger visited Peru and documented its traditional use — beginning decades of pharmacological investigation. Today it is one of the top-selling herbal supplements in Europe and the United States.",
    benefits:[
      {title:"Immune System Enhancement", desc:"Oxindole alkaloids stimulate phagocytosis (the process by which immune cells engulf pathogens) and increase natural killer cell activity. Among the strongest immunostimulant effects measured in any herbal extract."},
      {title:"Anti-inflammatory for Joints", desc:"Multiple clinical trials show cat's claw significantly reduces pain and swelling in osteoarthritis and rheumatoid arthritis — with effects comparable to NSAIDs but without GI side effects."},
      {title:"Antiviral Activity", desc:"Demonstrated antiviral activity against herpes simplex, HIV, and influenza in laboratory studies. Traditional use for viral infections reflects genuine antiviral mechanisms."},
      {title:"DNA Repair & Anti-cancer Support", desc:"Villacine and other alkaloids support DNA repair mechanisms. Studied for their ability to protect DNA from oxidative damage and support anti-cancer immune surveillance."},
      {title:"Digestive Healing", desc:"Anti-inflammatory effects on the gut lining support traditional use for colitis, Crohn's disease, and gastric ulcers. Some clinical evidence for improvement in inflammatory bowel conditions."},
    ],
    sources:[
      {org:"Phytomedicine Journal", finding:"Cat's claw extract significantly reduced knee pain and swelling in osteoarthritis patients versus placebo over 4 weeks", url:"https://pubmed.ncbi.nlm.nih.gov/11489726/"},
      {org:"Inflammation Research Journal", finding:"Uncaria tomentosa extract significantly reduced inflammatory markers TNF-α and NF-kB activation in clinical study", url:"https://pubmed.ncbi.nlm.nih.gov/12190987/"},
    ],
    caution:"Generally safe. May interact with blood pressure medications, anticoagulants, and immunosuppressants. Avoid during pregnancy (uterotonic effects at high doses). Not for use with organ transplant patients on immunosuppressants. Two chemotypes exist — pentacyclic alkaloid type preferred for immune use.",
    blends:[],
  },
  {
    id:"cs18", name:"Fo-Ti (He Shou Wu)", latin:"Polygonum multiflorum", origin:"China", family:"Polygonaceae",
    category:["anti-aging","liver","kidney","hair","longevity"],
    tags:["Anti-aging","Hair","Longevity"], color:"#8B3A1A",
    photo:"/herbs/fo-ti.jpg", fallback:"https://images.pexels.com/photos/4872340/pexels-photo-4872340.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The longevity root of Chinese emperors — famous for reversing grey hair",
    comingSoon:true,
    history:"He Shou Wu — meaning 'Black-Haired Mister He' — is named after a legendary Tang Dynasty figure called He Tianer who, according to tradition, was a sickly, prematurely grey-haired man who discovered the root, consumed it regularly, and reportedly lived to 160 years with his hair returning to black. Whether legend or fact, this story drove centuries of use across China as the premiere anti-aging, hair-restoring longevity tonic. In Traditional Chinese Medicine it is classified as a liver and kidney tonic — the two organs most associated with aging, hair loss, and reproductive vitality. It remains one of the 50 fundamental herbs of TCM and is widely used across East Asia today.",
    benefits:[
      {title:"Hair Loss & Pigmentation", desc:"Stilbene glycosides from Fo-Ti have been shown to stimulate melanocyte activity (responsible for hair pigmentation) and inhibit enzymes that contribute to androgenetic hair loss. The legendary use for reversing grey hair has emerging scientific plausibility."},
      {title:"Liver & Kidney Tonification", desc:"In TCM theory, supports the 'essence' (Jing) stored in the kidneys and liver — the foundational energy that diminishes with age. Modern research shows liver-protective and kidney-supporting properties."},
      {title:"Anti-aging & Antioxidant", desc:"Emodin and stilbene glycosides activate SIRT1 — the same longevity pathway activated by resveratrol. Significant antioxidant and anti-glycation activity relevant to cellular aging processes."},
      {title:"Cholesterol & Cardiovascular", desc:"Has demonstrated cholesterol-lowering effects and reduces atherosclerotic plaque formation in animal studies — supporting cardiovascular health through lipid-modifying mechanisms."},
      {title:"Neuroprotection", desc:"Stilbene glycosides show neuroprotective effects against beta-amyloid toxicity and support memory and cognitive function in aging animal models."},
    ],
    sources:[
      {org:"Journal of Ethnopharmacology", finding:"Polygonum multiflorum demonstrated significant hair-growth promoting and melanocyte-stimulating activity in controlled laboratory models", url:"https://pubmed.ncbi.nlm.nih.gov/22940123/"},
      {org:"Life Sciences Journal", finding:"Fo-Ti stilbene glycosides activated SIRT1 pathway and demonstrated significant anti-aging and antioxidant effects in cellular aging models", url:""},
    ],
    caution:"IMPORTANT: Raw (unprocessed) Fo-Ti has caused documented cases of liver toxicity — always use the prepared (zhì hé shǒu wū) form which is processed with black bean liquid to remove anthraquinone glycosides. Even prepared form should not be used long-term without breaks. Consult a TCM practitioner for guidance. Avoid if you have liver disease or take hepatotoxic medications.",
    blends:[],
  },
  {
    id:"cs19", name:"Lemongrass", latin:"Cymbopogon citratus", origin:"South Asia · Southeast Asia · Caribbean", family:"Poaceae",
    category:["digestion","anti-inflammatory","anxiety","antimicrobial","detox"],
    tags:["Digestion","Calming","Antimicrobial"], color:"#8A9A1A",
    photo:"/herbs/lemongrass.jpg", fallback:"https://images.pexels.com/photos/4110162/pexels-photo-4110162.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌿", tagline:"The fragrant grass of tropical healing — from Ayurveda to Jamaican kitchens",
    comingSoon:true,
    history:"Lemongrass has been used medicinally in India for over 3,000 years in Ayurvedic practice, where it is known as choomana poolu and used for fever, infection, and digestive complaints. In Southeast Asia it is a fundamental flavoring and medicine — central to Thai, Vietnamese, and Indonesian cuisine and traditional healing. In the Caribbean and Jamaica it is called 'fever grass' and is one of the most widely used household remedies for fever, cold, flu, anxiety, and digestive upset. Its fresh leaves are boiled into a tea that is cooling, calming, and deeply fragrant. The essential oil is one of the most important in aromatherapy for stress relief and as a natural antiseptic.",
    benefits:[
      {title:"Digestive Support", desc:"Volatile oils (citral, geraniol) relax GI smooth muscle, reducing bloating, cramping, and digestive spasm. Traditional use for digestive upset, indigestion, and flatulence across multiple cultures is well-supported."},
      {title:"Fever Reduction", desc:"Diaphoretic properties promote sweating to reduce fever naturally — the basis of the Jamaican name 'fever grass.' Anti-inflammatory effects also reduce the pyrogenic (fever-causing) cascade."},
      {title:"Antimicrobial", desc:"Citral and linalool demonstrate strong antibacterial and antifungal activity against clinically relevant strains — one of the most potent antimicrobial essential oils studied."},
      {title:"Anxiety & Nervous System", desc:"A 2014 human study found lemongrass tea aroma significantly reduced anxiety responses to external stressors — supporting traditional use as a calming and mood-lifting tea."},
      {title:"Antioxidant & Anti-inflammatory", desc:"Rich in chlorogenic acid, isoorientin, and swertiajaponin — flavonoids with significant anti-inflammatory and antioxidant activity relevant to chronic disease prevention."},
    ],
    sources:[
      {org:"Journal of Alternative and Complementary Medicine", finding:"Lemongrass aroma significantly reduced anxiety responses and maintained calmness in human subjects during stress exposure", url:"https://pubmed.ncbi.nlm.nih.gov/24734086/"},
      {org:"Journal of Advanced Pharmaceutical Technology & Research", finding:"Lemongrass essential oil demonstrated significant antibacterial activity against multiple clinically resistant bacterial strains", url:"https://pubmed.ncbi.nlm.nih.gov/21218062/"},
    ],
    caution:"Extremely safe as a tea. Avoid concentrated essential oil internally without professional guidance. Rare cases of allergic contact dermatitis with topical essential oil. Avoid high supplemental doses during pregnancy.",
    blends:[],
  },
  {
    id:"cs20", name:"Saw Palmetto", latin:"Serenoa repens", origin:"Southeastern United States · Caribbean", family:"Arecaceae",
    category:["prostate","hormones","urinary","anti-inflammatory","men"],
    tags:["Prostate","Male Health","Urinary"], color:"#2A6B2A",
    photo:"/herbs/saw-palmetto.jpg", fallback:"https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
    emoji:"🌴", tagline:"The Seminole medicine that became the world's most studied prostate herb",
    comingSoon:true,
    history:"Saw palmetto is a small palm native to the southeastern United States and the Caribbean. The Seminole people of Florida used the berries as a primary food and medicine for centuries — for urinary conditions, reproductive health, and general vitality. European settlers learned its uses and by the late 1800s it was one of the most widely prescribed medicines in America for urinary and reproductive complaints. It appeared in the U.S. Pharmacopeia and the National Formulary from 1906 to 1950. In Europe — particularly Germany and Italy — it was never abandoned and is today one of the most prescribed medicines for BPH (benign prostatic hyperplasia), available as a pharmaceutical drug. With dozens of clinical trials, it is the most scientifically studied herb for prostate health in the world.",
    benefits:[
      {title:"Benign Prostatic Hyperplasia (BPH) Relief", desc:"The most clinically studied natural treatment for BPH. A Cochrane Review of 21 randomized trials found saw palmetto significantly improved urinary flow, reduced nighttime urination, and improved quality of life in men with mild-to-moderate BPH."},
      {title:"5-Alpha Reductase Inhibition", desc:"Inhibits the enzyme that converts testosterone to DHT (dihydrotestosterone) — DHT being the primary driver of prostate enlargement and male pattern baldness. This is the same mechanism as the pharmaceutical drug finasteride, but without the sexual side effects."},
      {title:"Anti-inflammatory Prostate Support", desc:"Reduces prostate inflammation through NF-kB and COX-2 inhibition — addressing the inflammatory component of prostate enlargement and prostatitis."},
      {title:"Hair Loss Support", desc:"By reducing DHT, saw palmetto also has clinical evidence for slowing androgenetic hair loss — studied both orally and topically with positive results."},
      {title:"Hormone Balance", desc:"May help balance androgen activity without fully blocking testosterone — preserving libido and energy while reducing excess DHT-driven tissue stimulation in the prostate and scalp."},
    ],
    sources:[
      {org:"Cochrane Database of Systematic Reviews", finding:"Saw palmetto significantly improved urinary symptom scores and flow measures in BPH across 21 randomized controlled trials", url:"https://pubmed.ncbi.nlm.nih.gov/12076364/"},
      {org:"Journal of Alternative and Complementary Medicine", finding:"Saw palmetto extract significantly reduced DHT levels and improved BPH symptom scores over 6 months versus placebo", url:"https://pubmed.ncbi.nlm.nih.gov/11711778/"},
      {org:"European Medicines Agency (EMA)", finding:"Recognizes saw palmetto fruit extract for relief of lower urinary tract symptoms associated with benign prostatic hyperplasia", url:""},
    ],
    caution:"Generally very safe. Rare GI side effects — take with food. May interact with blood thinners. Some evidence of hormonal activity — use with awareness if on hormone therapy. Does not appear to mask PSA levels (unlike finasteride) but disclose use to your doctor before PSA testing.",
    blends:[],
  },
];

const CATEGORIES = [
  {key:"all", label:"All Herbs", emoji:"🌿"},
  {key:"digestion", label:"Digestion", emoji:"🫙"},
  {key:"sleep", label:"Sleep & Calm", emoji:"🌙"},
  {key:"liver", label:"Liver & Detox", emoji:"🫚"},
  {key:"immune", label:"Immune", emoji:"🛡"},
  {key:"anxiety", label:"Anxiety", emoji:"🕊"},
  {key:"anti-inflammatory", label:"Inflammation", emoji:"🔥"},
  {key:"kidney", label:"Kidney", emoji:"💧"},
  {key:"adaptogen", label:"Adaptogens", emoji:"⚡"},
  {key:"blood sugar", label:"Blood Sugar", emoji:"🩸"},
];

function HerbCard({ herb, onClick }) {
  const [imgSrc, setImgSrc] = useState(herb.photo);
  return (
    <div onClick={() => onClick(herb)} style={{
      background:"rgba(255,255,255,.04)", border:"1px solid rgba(196,137,58,.15)",
      borderRadius:18, overflow:"hidden", cursor:"pointer",
      transition:"transform .2s, box-shadow .2s, border-color .2s",
      display:"flex", flexDirection:"column",
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.4)";e.currentTarget.style.borderColor="rgba(196,137,58,.4)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="rgba(196,137,58,.15)";}}>
      <div style={{height:4, background:`linear-gradient(90deg,${herb.color},rgba(196,137,58,.5))`}}/>
      <div style={{height:140, overflow:"hidden", background:`${herb.color}22`, position:"relative"}}>
        <img src={imgSrc} alt={herb.name} onError={()=>setImgSrc(herb.fallback)}
          style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(10,15,11,.8),transparent)",padding:"16px 14px 10px"}}>
          <div style={{fontSize:".52rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",fontFamily:"Jost,sans-serif",fontStyle:"italic"}}>{herb.latin}</div>
        </div>
      </div>
      <div style={{padding:"14px 16px",flex:1,display:"flex",flexDirection:"column",gap:6}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"#F7F2EA",fontWeight:700,lineHeight:1.2}}>{herb.name}</div>
        <div style={{fontSize:".68rem",color:"rgba(196,137,58,.75)",fontStyle:"italic",lineHeight:1.4}}>{herb.tagline}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:4}}>
          {herb.tags.slice(0,3).map(t=>(
            <span key={t} style={{background:"rgba(196,137,58,.1)",border:"1px solid rgba(196,137,58,.2)",borderRadius:20,padding:"2px 9px",fontSize:".58rem",color:"rgba(196,137,58,.85)",fontFamily:"Jost,sans-serif"}}>{t}</span>
          ))}
        </div>
        <div style={{marginTop:"auto",paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:".58rem",color:"rgba(255,255,255,.3)",fontFamily:"Jost,sans-serif"}}>{herb.origin.split("·")[0].trim()}</div>
          {herb.comingSoon
            ? <span style={{fontSize:".52rem",background:"rgba(196,137,58,.12)",border:"1px solid rgba(196,137,58,.28)",color:"rgba(196,137,58,.8)",borderRadius:20,padding:"2px 8px",fontFamily:"Jost,sans-serif",letterSpacing:".08em",textTransform:"uppercase",flexShrink:0}}>Coming Soon</span>
            : <div style={{fontSize:".68rem",color:"rgba(196,137,58,.6)",fontFamily:"Jost,sans-serif"}}>Read more →</div>
          }
        </div>
      </div>
    </div>
  );
}

function HerbModal({ herb, onClose }) {
  const [imgSrc, setImgSrc] = useState(herb.photo);
  const [tab, setTab] = useState("benefits");
  const scrollRef = useRef(null);

  useEffect(()=>{document.body.style.overflow="hidden";return()=>{document.body.style.overflow="";}},[]);
  useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=0;},[herb]);

  const tabs=[{key:"benefits",label:"Benefits"},{key:"history",label:"History"},{key:"sources",label:"Sources"},{key:"caution",label:"Cautions"}];

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,.7)",backdropFilter:"blur(6px)"}}/>
      <div ref={scrollRef} style={{position:"fixed",inset:0,zIndex:2001,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"20px 16px 40px"}}>
        <div style={{background:"linear-gradient(160deg,#0F1A12 0%,#0A0F0B 100%)",border:"1px solid rgba(196,137,58,.25)",borderRadius:24,width:"100%",maxWidth:680,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.8)",animation:"herbModalIn .3s cubic-bezier(.34,1.3,.64,1)",position:"relative"}}>
          <div style={{height:220,overflow:"hidden",position:"relative",background:`${herb.color}33`}}>
            <img src={imgSrc} alt={herb.name} onError={()=>setImgSrc(herb.fallback)} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,15,11,.95) 0%,rgba(10,15,11,.3) 60%,transparent 100%)"}}/>
            <button onClick={onClose} style={{position:"absolute",top:14,right:14,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.2)",color:"white",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            <div style={{position:"absolute",bottom:20,left:22,right:60}}>
              <div style={{fontSize:".56rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.8)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>{herb.family} · {herb.origin}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.4rem,4vw,2rem)",color:"#F7F2EA",fontWeight:700,lineHeight:1.1}}>{herb.name}</div>
              <div style={{fontSize:".72rem",fontStyle:"italic",color:"rgba(255,255,255,.5)",marginTop:4}}>{herb.latin}</div>
            </div>
          </div>

          <div style={{padding:"16px 22px 0"}}>
            <div style={{fontSize:".84rem",color:"rgba(196,137,58,.85)",fontStyle:"italic",lineHeight:1.6,fontFamily:"Jost,sans-serif"}}>"{herb.tagline}"</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
              {herb.tags.map(t=>(
                <span key={t} style={{background:"rgba(196,137,58,.12)",border:"1px solid rgba(196,137,58,.25)",borderRadius:20,padding:"4px 12px",fontSize:".62rem",color:"rgba(196,137,58,.9)",fontFamily:"Jost,sans-serif"}}>{t}</span>
              ))}
            </div>
          </div>

          {herb.comingSoon && (
            <div style={{margin:"14px 22px 0",background:"linear-gradient(135deg,rgba(196,137,58,.12),rgba(196,137,58,.06))",border:"1px solid rgba(196,137,58,.3)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:"1.1rem"}}>🌿</span>
              <div>
                <div style={{fontFamily:"Jost,sans-serif",fontSize:".7rem",fontWeight:700,color:"rgba(196,137,58,.95)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:2}}>Coming Soon to Chai Holistic</div>
                <div style={{fontFamily:"Jost,sans-serif",fontSize:".68rem",color:"rgba(255,255,255,.45)",fontWeight:300}}>We're working on blends featuring this herb. Join the waitlist to be first to know.</div>
              </div>
            </div>
          )}
          <div style={{padding:"16px 22px 0",display:"flex",gap:4,borderBottom:"1px solid rgba(196,137,58,.12)",overflowX:"auto"}}>
            {tabs.map(t=>(
              <button key={t.key} onClick={()=>setTab(t.key)} style={{
                background:tab===t.key?"rgba(196,137,58,.18)":"transparent",
                border:tab===t.key?"1px solid rgba(196,137,58,.4)":"1px solid transparent",
                color:tab===t.key?"rgba(196,137,58,.95)":"rgba(255,255,255,.4)",
                borderRadius:"8px 8px 0 0",padding:"8px 14px",fontSize:".65rem",letterSpacing:".1em",textTransform:"uppercase",
                fontFamily:"Jost,sans-serif",cursor:"pointer",transition:"all .2s",marginBottom:-1,whiteSpace:"nowrap",
                fontWeight:tab===t.key?600:400,
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{padding:"22px"}}>
            {tab==="benefits" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {herb.benefits.map((b,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(196,137,58,.1)",borderRadius:14,padding:"14px 16px"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:`${herb.color}33`,border:`1px solid ${herb.color}66`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",color:"rgba(196,137,58,.9)",flexShrink:0,marginTop:1,fontFamily:"Courier Prime,monospace",fontWeight:700}}>{i+1}</div>
                      <div style={{fontFamily:"Jost,sans-serif",fontSize:".82rem",fontWeight:600,color:"#F7F2EA",lineHeight:1.3}}>{b.title}</div>
                    </div>
                    <p style={{margin:0,fontSize:".78rem",color:"rgba(240,235,224,.65)",lineHeight:1.75,fontFamily:"Jost,sans-serif",fontWeight:300,paddingLeft:34}}>{b.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {tab==="history" && (
              <div>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:12,fontFamily:"Jost,sans-serif"}}>✦ Ancestral & Historical Record</div>
                <p style={{margin:0,fontSize:".85rem",color:"rgba(240,235,224,.75)",lineHeight:1.85,fontFamily:"Jost,sans-serif",fontWeight:300}}>{herb.history}</p>
                {herb.blends && herb.blends.length>0 && (
                  <div style={{marginTop:24}}>
                    <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(74,114,80,.8)",marginBottom:10,fontFamily:"Jost,sans-serif"}}>Found In Our Blends</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {herb.blends.map(b=>(
                        <span key={b} style={{background:"rgba(74,114,80,.1)",border:"1px solid rgba(74,114,80,.25)",borderRadius:20,padding:"5px 12px",fontSize:".68rem",color:"rgba(74,114,80,.9)",fontFamily:"Jost,sans-serif"}}>🍵 {b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab==="sources" && (
              <div>
                <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>✦ Research & Clinical Evidence</div>
                <p style={{fontSize:".7rem",color:"rgba(255,255,255,.35)",fontFamily:"Jost,sans-serif",marginBottom:16,lineHeight:1.5}}>All research cited is from peer-reviewed journals or internationally recognized health authorities including NIH, WHO, EMA, and German Commission E.</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {herb.sources.map((s,i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(196,137,58,.12)",borderRadius:12,padding:"14px 16px"}}>
                      <div style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(196,137,58,.75)",fontFamily:"Jost,sans-serif",marginBottom:5,fontWeight:600}}>{s.org}</div>
                      <p style={{margin:0,fontSize:".78rem",color:"rgba(240,235,224,.7)",lineHeight:1.65,fontFamily:"Jost,sans-serif",fontWeight:300}}>{s.finding}</p>
                      {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:8,fontSize:".62rem",color:"rgba(196,137,58,.6)",textDecoration:"none",fontFamily:"Jost,sans-serif"}}>View Source →</a>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==="caution" && (
              <div>
                <div style={{background:"rgba(220,80,80,.06)",border:"1px solid rgba(220,80,80,.2)",borderRadius:14,padding:"16px 18px",marginBottom:16}}>
                  <div style={{fontSize:".58rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(220,120,120,.8)",marginBottom:8,fontFamily:"Jost,sans-serif",fontWeight:600}}>⚠ Safety Information</div>
                  <p style={{margin:0,fontSize:".82rem",color:"rgba(240,235,224,.7)",lineHeight:1.8,fontFamily:"Jost,sans-serif",fontWeight:300}}>{herb.caution}</p>
                </div>
                <div style={{background:"rgba(196,137,58,.06)",border:"1px solid rgba(196,137,58,.15)",borderRadius:12,padding:"12px 16px"}}>
                  <p style={{margin:0,fontSize:".7rem",color:"rgba(255,255,255,.4)",lineHeight:1.6,fontFamily:"Jost,sans-serif",fontStyle:"italic"}}>This information is educational and not a substitute for medical advice. Always consult your healthcare provider before using herbal remedies, especially if pregnant, nursing, on medications, or managing a health condition.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
          {/* ── BLEND SUGGESTIONS — only when herb is in active blends ──── */}
          {!herb.comingSoon && herb.blends && herb.blends.length > 0 && (() => {
            const activeBlends = herb.blends.filter(name => BLEND_LOOKUP[name]);
            if (!activeBlends.length) return null;
            return (
              <div style={{borderTop:"1px solid rgba(196,137,58,.1)",margin:"0",padding:"20px 22px"}}>
                <div style={{fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.55)",marginBottom:4,fontFamily:"Jost,sans-serif"}}>✦ In Our Apothecary</div>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:".75rem",color:"rgba(247,242,234,.38)",fontWeight:300,lineHeight:1.6,margin:"0 0 14px"}}>
                  This herb lives in {activeBlends.length === 1 ? "one of our blends" : `${activeBlends.length} of our blends`}. If it speaks to you, these might be worth exploring.
                </p>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {activeBlends.slice(0,3).map(name => {
                    const b = BLEND_LOOKUP[name];
                    return (
                      <div key={name} style={{
                        display:"flex",alignItems:"center",gap:12,
                        background:"rgba(255,255,255,.03)",
                        border:"1px solid rgba(196,137,58,.1)",
                        borderRadius:14,padding:"12px 14px",
                        transition:"border-color .2s, background .2s",cursor:"default",
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.28)";e.currentTarget.style.background="rgba(196,137,58,.05)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,.1)";e.currentTarget.style.background="rgba(255,255,255,.03)";}}>
                        {/* Color swatch */}
                        <div style={{width:44,height:44,borderRadius:10,overflow:"hidden",flexShrink:0,background:`linear-gradient(135deg,${b.color},${b.color}88)`,position:"relative"}}>
                          <img src={b.photo} alt={name}
                            onError={e=>e.target.style.display="none"}
                            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:.7}}/>
                          <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${b.color}99,transparent)`}}/>
                        </div>
                        {/* Info */}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"#F7F2EA",fontWeight:600,lineHeight:1.2,marginBottom:2}}>{name}</div>
                          <div style={{fontFamily:"Jost,sans-serif",fontSize:".65rem",color:"rgba(196,137,58,.65)",fontStyle:"italic",lineHeight:1.3,marginBottom:4}}>{b.tagline}</div>
                          <div style={{fontFamily:"Jost,sans-serif",fontSize:".6rem",color:"rgba(255,255,255,.3)",lineHeight:1.3}}>{b.benefit}</div>
                        </div>
                        {/* Price + soft CTA */}
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"rgba(196,137,58,.85)",fontWeight:600}}>${b.price.toFixed(2)}</div>
                          <div style={{
                            fontFamily:"Jost,sans-serif",fontSize:".58rem",letterSpacing:".1em",textTransform:"uppercase",
                            color:"rgba(196,137,58,.7)",cursor:"pointer",
                            borderBottom:"1px dotted rgba(196,137,58,.3)",paddingBottom:1,
                            transition:"color .2s",
                          }}
                          onMouseEnter={e=>e.currentTarget.style.color="rgba(196,137,58,1)"}
                          onMouseLeave={e=>e.currentTarget.style.color="rgba(196,137,58,.7)"}>
                            View in Shop →
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

      </div>
      <style>{`@keyframes herbModalIn{from{opacity:0;transform:scale(.95) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </>
  );
}

export default function HerbApothecary() {
  const { T, lang } = useLang();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const [focused, setFocused] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqHerb, setReqHerb] = useState("");
  const [reqGoal, setReqGoal] = useState("");
  const [reqSent, setReqSent] = useState(false);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    let r = HERB_DATA;
    if (category !== "all") r = r.filter(h => h.category.some(c => c.includes(category)));
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.latin.toLowerCase().includes(q) ||
        h.tags.some(t => t.toLowerCase().includes(q)) ||
        h.category.some(c => c.includes(q)) ||
        h.benefits.some(b => b.title.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q)) ||
        h.history.toLowerCase().includes(q) ||
        h.blends.some(b => b.toLowerCase().includes(q))
      );
    }
    return r;
  }, [search, category]);

  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const q = search.toLowerCase();
    return HERB_DATA.filter(h => h.name.toLowerCase().includes(q) || h.tags.some(t => t.toLowerCase().includes(q))).slice(0, 5);
  }, [search]);

  return (
    <div id="sec-herb-apothecary" style={{minHeight:"100vh",background:"linear-gradient(180deg,#0A0F0B 0%,#0F1A12 40%,#0A0F0B 100%)",paddingBottom:80}}>

      {/* HERO */}
      <div style={{textAlign:"center",padding:"64px 20px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 50% 0%,rgba(74,114,80,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{fontSize:".6rem",letterSpacing:".28em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:12,fontFamily:"Jost,sans-serif"}}>Chai Holistic · Herb Encyclopedia</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,6vw,3.2rem)",fontWeight:700,color:"#F7F2EA",margin:"0 0 12px",lineHeight:1.15}}>
          The <em style={{color:"rgba(196,137,58,.9)"}}>Apothecary</em> Archive
        </h1>
        <p style={{fontFamily:"Jost,sans-serif",fontSize:"clamp(.82rem,2vw,.95rem)",color:"rgba(247,242,234,.55)",maxWidth:560,margin:"0 auto 6px",lineHeight:1.7,fontWeight:300}}>
          Every herb we use. Its history, its healing, and the research behind it.
        </p>
        <p style={{fontFamily:"Jost,sans-serif",fontSize:".72rem",color:"rgba(196,137,58,.6)",fontStyle:"italic",margin:"0 auto 32px"}}>
          {HERB_DATA.length} herbs documented · Sources cited from NIH, WHO, EMA &amp; peer-reviewed journals
        </p>

        {/* SEARCH */}
        <div style={{maxWidth:560,margin:"0 auto",position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,.05)",border:`1.5px solid ${focused?"rgba(196,137,58,.6)":"rgba(196,137,58,.2)"}`,borderRadius:50,padding:"12px 20px",transition:"border-color .2s, box-shadow .2s",boxShadow:focused?"0 0 0 3px rgba(196,137,58,.1)":"none"}}>
            <span style={{fontSize:"1rem",opacity:.6}}>🔍</span>
            <input ref={inputRef} value={search} onChange={e=>setSearch(e.target.value)}
              onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),200)}
              placeholder={T.herb_search_placeholder || "Search by herb name, benefit, or health concern…"}
              style={{flex:1,background:"none",border:"none",outline:"none",color:"#F7F2EA",fontFamily:"Jost,sans-serif",fontSize:".88rem",fontWeight:300}}/>
            {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:"1rem",padding:0,lineHeight:1}}>✕</button>}
          </div>

          {focused && suggestions.length > 0 && search.length >= 2 && (
            <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,right:0,background:"#0F1A12",border:"1px solid rgba(196,137,58,.25)",borderRadius:16,overflow:"hidden",zIndex:100,boxShadow:"0 16px 40px rgba(0,0,0,.6)"}}>
              {suggestions.map(h=>(
                <div key={h.id} onMouseDown={()=>{setSelected(h);setSearch("");}}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 18px",cursor:"pointer",borderBottom:"1px solid rgba(196,137,58,.08)",transition:"background .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(196,137,58,.08)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span style={{fontSize:"1.1rem"}}>{h.emoji}</span>
                  <div>
                    <div style={{fontFamily:"Jost,sans-serif",fontSize:".82rem",color:"#F7F2EA",fontWeight:500}}>{h.name}</div>
                    <div style={{fontFamily:"Jost,sans-serif",fontSize:".62rem",color:"rgba(196,137,58,.65)",fontStyle:"italic"}}>{h.tags.slice(0,2).join(" · ")}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {search && (
          <div style={{marginTop:12,fontFamily:"Jost,sans-serif"}}>
            <div style={{fontSize:".72rem",color:"rgba(255,255,255,.35)",marginBottom: filtered.length>0 ? 8 : 0}}>
              {filtered.length === 0 ? {T.herb_no_results || "No herbs found. Try a different search term."} : `${filtered.length} herb${filtered.length!==1?"s":""} found`}
            </div>
            {filtered.length === 0 && (
              <div style={{fontSize:".7rem",color:"rgba(196,137,58,.55)",fontStyle:"italic",cursor:"pointer",textDecoration:"underline",textDecorationStyle:"dotted"}}
                onClick={()=>{setReqHerb(search);setShowRequest(true);}}>
                Not listed yet? Let us know what you're looking for →
              </div>
            )}
          </div>
        )}
      </div>

      {/* CATEGORY FILTERS */}
      <div style={{padding:"0 16px 28px"}}>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",maxWidth:900,margin:"0 auto"}}>
          {CATEGORIES.map(c=>(
            <button key={c.key} onClick={()=>setCategory(c.key)} style={{
              flexShrink:0,
              background:category===c.key?"rgba(196,137,58,.9)":"rgba(255,255,255,.05)",
              border:`1px solid ${category===c.key?"rgba(196,137,58,.9)":"rgba(255,255,255,.12)"}`,
              color:category===c.key?"#0A0F0B":"rgba(247,242,234,.7)",
              borderRadius:40,padding:"8px 16px",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",
              cursor:"pointer",fontFamily:"Jost,sans-serif",fontWeight:category===c.key?700:400,
              transition:"all .2s",whiteSpace:"nowrap",
            }}>{c.emoji} {c.label}</button>
          ))}
        </div>
      </div>

      {/* HERB GRID */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
        {filtered.length === 0 ? (
          <div style={{maxWidth:560,margin:"0 auto",padding:"40px 20px 20px",textAlign:"center"}}>
            {/* Soft not-found message */}
            <div style={{fontSize:"2.8rem",marginBottom:20}}>🌱</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"rgba(247,242,234,.7)",marginBottom:10,lineHeight:1.4}}>
              We don't have that one yet.
            </div>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:".85rem",color:"rgba(247,242,234,.4)",lineHeight:1.75,fontWeight:300,marginBottom:28}}>
              The world of healing herbs is vast — and we're always learning and growing.<br/>
              If there's something specific you're looking for, tell us. We'd genuinely love to know.
            </p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>{setSearch("");setCategory("all");}} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"rgba(247,242,234,.55)",borderRadius:40,padding:"10px 22px",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"Jost,sans-serif",cursor:"pointer",transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.25)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.12)"}>
                ← Browse Everything
              </button>
              <button onClick={()=>{setReqHerb(search);setShowRequest(true);}} style={{background:"linear-gradient(135deg,rgba(196,137,58,.85),rgba(139,94,42,.85))",border:"none",color:"white",borderRadius:40,padding:"10px 24px",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"Jost,sans-serif",cursor:"pointer",fontWeight:600,boxShadow:"0 4px 20px rgba(196,137,58,.3)",transition:"opacity .2s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Share What You're Looking For →
              </button>
            </div>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:18}}>
            {filtered.map(herb=>(
              <HerbCard key={herb.id} herb={herb} onClick={setSelected}/>
            ))}
          </div>
        )}
      </div>

      {/* SOURCE FOOTER */}
      <div style={{maxWidth:700,margin:"48px auto 0",padding:"0 20px",textAlign:"center"}}>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(196,137,58,.1)",borderRadius:16,padding:"20px 24px"}}>
          <div style={{fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:8,fontFamily:"Jost,sans-serif"}}>About Our Sources</div>
          <p style={{margin:0,fontSize:".72rem",color:"rgba(255,255,255,.35)",lineHeight:1.7,fontFamily:"Jost,sans-serif",fontWeight:300}}>
            All health benefits cited in this archive are sourced from peer-reviewed clinical research (PubMed/NCBI), or from internationally recognized health authorities including the <strong style={{color:"rgba(255,255,255,.5)"}}>National Institutes of Health (NIH)</strong>, <strong style={{color:"rgba(255,255,255,.5)"}}>World Health Organization (WHO)</strong>, <strong style={{color:"rgba(255,255,255,.5)"}}>European Medicines Agency (EMA)</strong>, and <strong style={{color:"rgba(255,255,255,.5)"}}>German Commission E</strong>. Historical context draws from ethnobotanical records and traditional pharmacopoeias. This information is educational only and does not constitute medical advice.
          </p>
        </div>
      </div>

      {selected && <HerbModal herb={selected} onClose={()=>setSelected(null)}/>}
      
      {/* ── CUSTOM BLEND REQUEST MODAL ──────────────────────────────────────── */}
      {showRequest && (
        <>
          <div onClick={()=>{setShowRequest(false);setReqSent(false);}} style={{position:"fixed",inset:0,zIndex:3000,background:"rgba(0,0,0,.6)",backdropFilter:"blur(5px)"}}/>
          <div style={{position:"fixed",inset:0,zIndex:3001,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",overflowY:"auto"}}>
            <div style={{
              background:"linear-gradient(160deg,#0F1A12 0%,#0A120B 100%)",
              border:"1px solid rgba(196,137,58,.2)",
              borderRadius:24,width:"100%",maxWidth:480,
              padding:"0 0 28px",
              boxShadow:"0 32px 80px rgba(0,0,0,.8)",
              animation:"herbModalIn .35s cubic-bezier(.34,1.3,.64,1)",
              position:"relative",
            }}>

              {/* Close */}
              <button onClick={()=>{setShowRequest(false);setReqSent(false);}} style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:".9rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>

              {!reqSent ? (
                <>
                  {/* Header */}
                  <div style={{padding:"28px 28px 0",textAlign:"center"}}>
                    <div style={{fontSize:"2.2rem",marginBottom:12}}>🌿</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"#F7F2EA",fontWeight:700,lineHeight:1.3,marginBottom:10}}>
                      Tell us what you're searching for
                    </div>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:".82rem",color:"rgba(247,242,234,.45)",lineHeight:1.75,fontWeight:300,margin:"0 0 24px"}}>
                      Every blend we've ever created started with someone's real need.<br/>
                      Your search tells us something — and we want to listen.
                    </p>
                  </div>

                  {/* Form fields */}
                  <div style={{padding:"0 28px",display:"flex",flexDirection:"column",gap:14}}>

                    {/* Herb / concern field — pre-filled from search */}
                    <div>
                      <label style={{display:"block",fontFamily:"Jost,sans-serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>
                        What were you looking for?
                      </label>
                      <input
                        value={reqHerb}
                        onChange={e=>setReqHerb(e.target.value)}
                        placeholder="e.g. sea moss, lion's mane, guinea hen weed…"
                        style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,.05)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"12px 16px",color:"#F7F2EA",fontFamily:"Jost,sans-serif",fontSize:".84rem",outline:"none",transition:"border-color .2s"}}
                        onFocus={e=>e.target.style.borderColor="rgba(196,137,58,.55)"}
                        onBlur={e=>e.target.style.borderColor="rgba(196,137,58,.2)"}
                      />
                    </div>

                    {/* Health goal / what they're trying to address */}
                    <div>
                      <label style={{display:"block",fontFamily:"Jost,sans-serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>
                        What are you hoping it helps with? <span style={{color:"rgba(255,255,255,.25)",textTransform:"none",letterSpacing:0}}>(optional)</span>
                      </label>
                      <textarea
                        value={reqGoal}
                        onChange={e=>setReqGoal(e.target.value)}
                        placeholder="e.g. I've been having trouble sleeping, my joints have been stiff lately, I want to support my liver…"
                        rows={3}
                        style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,.05)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"12px 16px",color:"#F7F2EA",fontFamily:"Jost,sans-serif",fontSize:".84rem",outline:"none",resize:"vertical",transition:"border-color .2s",lineHeight:1.6}}
                        onFocus={e=>e.target.style.borderColor="rgba(196,137,58,.55)"}
                        onBlur={e=>e.target.style.borderColor="rgba(196,137,58,.2)"}
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label style={{display:"block",fontFamily:"Jost,sans-serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>
                        Your first name <span style={{color:"rgba(255,255,255,.25)",textTransform:"none",letterSpacing:0}}>(so we know who we're talking to)</span>
                      </label>
                      <input
                        value={reqName}
                        onChange={e=>setReqName(e.target.value)}
                        placeholder="e.g. Maya"
                        style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,.05)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"12px 16px",color:"#F7F2EA",fontFamily:"Jost,sans-serif",fontSize:".84rem",outline:"none",transition:"border-color .2s"}}
                        onFocus={e=>e.target.style.borderColor="rgba(196,137,58,.55)"}
                        onBlur={e=>e.target.style.borderColor="rgba(196,137,58,.2)"}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{display:"block",fontFamily:"Jost,sans-serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:6}}>
                        Email <span style={{color:"rgba(255,255,255,.25)",textTransform:"none",letterSpacing:0}}>(only if you'd like us to reach out when we have something)</span>
                      </label>
                      <input
                        type="email"
                        value={reqEmail}
                        onChange={e=>setReqEmail(e.target.value)}
                        placeholder="we'll only write if we have something for you"
                        style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,.05)",border:"1px solid rgba(196,137,58,.2)",borderRadius:12,padding:"12px 16px",color:"#F7F2EA",fontFamily:"Jost,sans-serif",fontSize:".84rem",outline:"none",transition:"border-color .2s"}}
                        onFocus={e=>e.target.style.borderColor="rgba(196,137,58,.55)"}
                        onBlur={e=>e.target.style.borderColor="rgba(196,137,58,.2)"}
                      />
                    </div>

                    {/* Privacy note — warm, not legal */}
                    <div style={{background:"rgba(74,114,80,.06)",border:"1px solid rgba(74,114,80,.15)",borderRadius:10,padding:"10px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <span style={{fontSize:"1rem",flexShrink:0,marginTop:1}}>🤝</span>
                      <p style={{margin:0,fontFamily:"Jost,sans-serif",fontSize:".68rem",color:"rgba(247,242,234,.38)",lineHeight:1.65,fontWeight:300}}>
                        We won't sell your information, we won't send newsletters you didn't ask for, and we won't follow up unless we actually have something meaningful to share. This is just a conversation.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      disabled={!reqHerb.trim()}
                      onClick={()=>{
                        // In production this would POST to your Railway API
                        // For now it gracefully shows the thank-you state
                        if(reqHerb.trim()) setReqSent(true);
                      }}
                      style={{
                        background: reqHerb.trim()
                          ? "linear-gradient(135deg,rgba(196,137,58,.9),rgba(139,94,42,.9))"
                          : "rgba(255,255,255,.06)",
                        border:"none",color: reqHerb.trim() ? "white" : "rgba(255,255,255,.25)",
                        borderRadius:14,padding:"14px",
                        fontFamily:"Jost,sans-serif",fontSize:".78rem",letterSpacing:".12em",textTransform:"uppercase",
                        cursor: reqHerb.trim() ? "pointer" : "default",
                        fontWeight:600,transition:"all .2s",
                        boxShadow: reqHerb.trim() ? "0 4px 20px rgba(196,137,58,.25)" : "none",
                      }}>
                      Send My Request →
                    </button>
                  </div>
                </>
              ) : (
                /* ── THANK YOU STATE ─────────────────────────────────────── */
                <div style={{padding:"48px 32px",textAlign:"center"}}>
                  <div style={{fontSize:"3rem",marginBottom:20}}>🌿</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"#F7F2EA",fontWeight:700,lineHeight:1.3,marginBottom:14}}>
                    We heard you, {reqName ? reqName.trim() : "friend"}.
                  </div>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:".85rem",color:"rgba(247,242,234,.5)",lineHeight:1.8,fontWeight:300,marginBottom:28}}>
                    Your request has been received and it genuinely matters to us.<br/>
                    {reqGoal.trim() ? `Knowing that you're working on "${reqGoal.trim().slice(0,60)}${reqGoal.length>60?'…':''}" helps us understand what our community needs.` : "Every search that doesn't find an answer tells us where to grow next."}<br/><br/>
                    {reqEmail.trim() ? `If and when we create something that fits, we'll reach out to ${reqEmail.trim()}.` : "Feel free to check back — the archive grows regularly."}
                  </p>
                  <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                    <button onClick={()=>{setShowRequest(false);setSearch("");setCategory("all");setReqSent(false);setReqName("");setReqEmail("");setReqHerb("");setReqGoal("");}}
                      style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(196,137,58,.9)",borderRadius:40,padding:"11px 24px",fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"Jost,sans-serif",cursor:"pointer"}}>
                      Explore the Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
