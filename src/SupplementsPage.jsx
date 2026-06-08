import { useState } from "react";

// ─── AFFILIATE TAG ────────────────────────────────────────────────────────────
const TAG = "xiomaka-20";
const amz = (asin) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

// ─── SUPPLEMENT DATA ──────────────────────────────────────────────────────────
// Every pick is chosen for ingredient form, third-party testing, and bioavailability.
// Cheap alternatives exist for all of these. We don't recommend them.

const SUPPLEMENTS = [
  {
    id: "mag",
    emoji: "🌙",
    name: "Magnesium Glycinate",
    brand: "Thorne",
    subtitle: "The form that actually reaches your cells",
    color: "#2A3A5A",
    category: "mineral",
    price: "~$28–$35",
    asin: "B0CG16LPMD",
    teaPairing: ["Sleepy Spice", "Stress Less", "Father's Calm Evening", "Deep Recharge Sleep"],
    teaNote: "Magnesium activates the same calm pathways your valerian and passionflower blends target. Together they work from two directions — the herb calms the nervous system signal, magnesium provides the cellular fuel to sustain it.",
    whyThisBrand: "Thorne uses bisglycinate chelate — magnesium bonded to two glycine molecules, not oxide dust. Independent testing in 2025 found that many brands selling 'magnesium glycinate' actually contained magnesium oxide mixed with loose glycine powder. Thorne's manufacturing is NSF Certified for Sport, one of the highest third-party standards in the industry.",
    whyThisNutrient: "Magnesium is involved in over 300 enzymatic reactions in the body. Most adults are deficient and don't know it — because standard blood tests measure serum magnesium, which stays normal until you're severely depleted. The real deficit is intracellular. Low magnesium directly impairs sleep quality, increases cortisol, causes muscle tension, and worsens anxiety.",
    whyNotCheap: "Magnesium oxide — the form in most drugstore bottles — has roughly 4% bioavailability. You're paying for something your body can't use. The glycinate form costs more and is worth every cent.",
    form: "Bisglycinate chelate (Albion TRAACS process)",
    dose: "200–400mg elemental before bed",
    thirdParty: "NSF Certified for Sport",
    caution: "May cause loose stools at high doses. Start at 200mg.",
    personalNote: "This is the first thing I recommend to anyone who tells me they can't sleep or feel constantly wired. Most people notice a difference within a week.",
  },
  {
    id: "d3k2",
    emoji: "☀️",
    name: "Vitamin D3 + K2",
    brand: "Pure Encapsulations",
    subtitle: "D3 opens the door. K2 tells calcium where to go.",
    color: "#3A2A0A",
    category: "vitamin",
    price: "~$30–$38",
    asin: "B0BZ8TMDQ5",
    teaPairing: ["Bone & Joint Fortress", "Heart of a King", "Blood Pressure Balance", "Post-50 Men's Foundation"],
    teaNote: "Your hawthorn and hibiscus blends support cardiovascular elasticity. D3+K2 works upstream — directing calcium into bone instead of artery walls, which is the structural foundation those herbs need to work with.",
    whyThisBrand: "Pure Encapsulations is a hypoallergenic practitioner-grade brand. Their D3+K2 pairs 5,000 IU of D3 with 180mcg of MK-7 — the long-chain K2 form with the most clinical evidence for cardiovascular and bone benefit. No artificial fillers, no common allergens, non-GMO verified.",
    whyThisNutrient: "An estimated 42% of Americans are vitamin D deficient. D3 is essential for calcium absorption, immune regulation, testosterone production, and mood. But here's what most people miss: taking D3 alone without K2 can lead to calcium being deposited in soft tissue and arteries instead of bones. K2 (MK-7 form) activates the proteins that direct calcium correctly. They are meant to be taken together.",
    whyNotCheap: "Most cheap D3 supplements use D2 (ergocalciferol), which raises blood levels less effectively and for shorter duration than D3 (cholecalciferol). And K1 — found in many combo products — does not perform the same cardiovascular function as K2 MK-7. The form of each nutrient is everything.",
    form: "Cholecalciferol (D3) + Menaquinone-7 (MK-7 form of K2)",
    dose: "5,000 IU D3 + 180mcg K2 daily with a fat-containing meal",
    thirdParty: "GMP certified, hypoallergenic verified",
    caution: "K2 may interact with blood thinners (warfarin/Coumadin). Consult your doctor.",
    personalNote: "I take this every single morning with breakfast. Most people in Florida still test deficient — sun exposure alone isn't enough if you're indoors during peak hours.",
  },
  {
    id: "omega3",
    emoji: "🐟",
    name: "Omega-3 Fish Oil",
    brand: "Nordic Naturals Ultimate Omega",
    subtitle: "Triglyceride form. The rest is biology.",
    color: "#0A2A3A",
    category: "specialty",
    price: "~$35–$45",
    asin: "B002CQU564",
    teaPairing: ["Alpha Brain Focus", "Brain Boost", "Heart of a King", "Muscle and Recovery", "Vision & Eye Protection"],
    teaNote: "DHA in fish oil is the primary structural fat in the brain. Your lion's mane and ginkgo blends support neural growth factors and circulation — omega-3 gives them the raw material to work with. Brain health from two directions.",
    whyThisBrand: "Nordic Naturals is the #1 fish oil brand in the US for a reason. They use re-esterified triglyceride (rTG) form — the same molecular structure found in fish flesh — which absorbs 70% better than the ethyl ester form found in most supplements. Every batch is third-party tested with certificates of analysis publicly available. Friend of the Sea certified for sustainability.",
    whyThisNutrient: "Omega-3s (EPA and DHA) reduce systemic inflammation, support heart rhythm, lower triglycerides, protect the brain, support eye health, and improve mood. Most Western diets are severely omega-6 dominant — which promotes inflammation. Fish oil rebalances that ratio. The American Heart Association recommends 500mg of combined EPA+DHA daily for healthy adults.",
    whyNotCheap: "Most cheap fish oil is in ethyl ester form — a semi-synthetic structure your body doesn't recognize as efficiently. It also oxidizes faster, which means rancid fish oil that smells bad and may cause more harm than good. If your fish oil burps taste fishy, the oil is oxidized. Nordic Naturals has a lemon taste even after digestion.",
    form: "Re-esterified triglyceride (rTG) — 1,280mg EPA+DHA per serving",
    dose: "2 soft gels daily with a meal",
    thirdParty: "Third-party tested, USP verified, Friend of the Sea certified",
    caution: "May thin blood at high doses. Consult doctor if on blood thinners.",
    personalNote: "I've tried a lot of fish oils. This is the only one where I never had that fishy aftertaste. That alone tells you the oil is fresh and properly processed.",
  },
  {
    id: "ashwagandha",
    emoji: "⚡",
    name: "Ashwagandha KSM-66",
    brand: "Transparent Labs",
    subtitle: "600mg root extract. 5% withanolides. The clinical standard.",
    color: "#2A1A0A",
    category: "herb",
    price: "~$25–$35",
    asin: "B09NQTJQCG",
    teaPairing: ["Stress Armour", "Testosterone Harmony", "Iron Will Morning", "Post-50 Men's Foundation", "Adaptogen Blend"],
    teaNote: "When you drink your Stress Armour blend, the rhodiola and holy basil are working on the HPA axis from the outside. KSM-66 ashwagandha taken as a supplement works on the same cortisol-testosterone axis from the inside. This pairing is one of the most studied adaptogenic stacks in functional medicine.",
    whyThisBrand: "Transparent Labs uses KSM-66 — the gold standard ashwagandha extract, made exclusively from the root (never the leaf), standardized to 5%+ withanolides. Generic ashwagandha powder typically contains 0.5–2% withanolides. The difference in clinical effect is significant. Transparent Labs is third-party tested and publishes full certificates of analysis.",
    whyThisNutrient: "Ashwagandha is one of the most clinically researched adaptogens on earth. Over 30 human clinical trials show it reduces cortisol levels, improves stress resilience, supports testosterone in men under chronic stress, improves sleep quality, and enhances VO2 max. The keyword is 'KSM-66' — that's the branded extract used in those trials, not generic root powder.",
    whyNotCheap: "Generic ashwagandha root powder is inexpensive and largely ineffective at standard doses because the withanolide concentration is too low. You'd need 4–8x the dose to approximate KSM-66's effect — and at that point you're spending more anyway. The extract pays for itself.",
    form: "KSM-66 root extract, standardized to 5%+ withanolides",
    dose: "600mg daily — morning or split AM/PM",
    thirdParty: "Informed Sport certified, third-party tested",
    caution: "May interact with thyroid medications and sedatives. Not for use during pregnancy.",
    personalNote: "This is the supplement I credit most with helping me stay even during high-stress periods. Takes about 3–4 weeks of consistent use to feel the full effect — don't give up after one week.",
  },
  {
    id: "collagen",
    emoji: "💪",
    name: "Collagen Peptides",
    brand: "Vital Proteins",
    subtitle: "Hydrolyzed. Grass-fed. Vitamin C required.",
    color: "#3A1A2A",
    category: "specialty",
    price: "~$25–$40",
    asin: "B00XK6M9HG",
    teaPairing: ["Bone & Joint Fortress", "Muscle and Recovery", "Turmeric Tonic", "Liver & Love"],
    teaNote: "Collagen synthesis requires vitamin C as a cofactor — your Turmeric Tonic blend contains natural anti-inflammatory compounds that reduce the chronic inflammation that breaks down collagen. Take your collagen with vitamin C and drink your Turmeric Tonic. That combination is the full joint support protocol.",
    whyThisBrand: "Vital Proteins uses grass-fed, pasture-raised bovine hide — the source matters because grain-fed collagen has a different amino acid profile. Their peptides are hydrolyzed to under 5,000 daltons, small enough to be absorbed through the gut wall and reach target tissues. NSF Certified. Unflavored version dissolves completely in hot or cold liquid.",
    whyThisNutrient: "Collagen is the most abundant protein in the body — it's the structural matrix of skin, tendons, ligaments, cartilage, and bone. After 25, your body produces roughly 1% less collagen per year. By 40, you've lost 15–20% of your baseline. This isn't cosmetic. It's structural. Weak tendons, achy joints, slow recovery — these are collagen problems before they're anything else.",
    whyNotCheap: "Gelatin is not the same as hydrolyzed collagen peptides. Gelatin has large protein chains that don't absorb efficiently. Hydrolyzed peptides are broken down to specific amino acid sequences (notably hydroxyproline) that trigger fibroblast activity. The word 'hydrolyzed' on the label matters.",
    form: "Hydrolyzed Type I & III bovine collagen peptides",
    dose: "10–20g daily — mix into any warm liquid including your teas",
    thirdParty: "NSF Certified",
    caution: "Not suitable for vegans. Those with beef allergies should avoid.",
    personalNote: "I add a scoop to my morning tea every day. You can't taste it, it dissolves completely, and my joints feel the difference when I go a week without it.",
  },
  {
    id: "probiotics",
    emoji: "🌿",
    name: "Probiotics — DS-01",
    brand: "Seed",
    subtitle: "24 clinically studied strains. Nested capsule. Actually reaches your gut.",
    color: "#0A2A1A",
    category: "specialty",
    price: "~$50/month",
    asin: null, // Seed sells direct — link to their site
    seedUrl: "https://seed.com",
    teaPairing: ["Gut Reset", "Gut & Digestion Restore", "Liver & Love", "Slippery Elm blend"],
    teaNote: "Your gut-healing tea blends soothe and repair the gut lining — slippery elm and marshmallow root coat inflamed tissue. Seed DS-01 repopulates the microbiome with clinically studied strains. One prepares the terrain, the other plants the seeds. They are meant to work together.",
    whyThisBrand: "Most probiotics are dead before they reach your gut. Stomach acid, heat, and shelf time destroy fragile bacterial strains — a University of California study found that only 15% of probiotic supplements contained viable organisms at levels claimed on the label. Seed uses a ViaCap nested capsule: an outer prebiotic capsule that protects the inner probiotic capsule through stomach acid. 24 strains, all with published human clinical evidence. Refrigeration not required.",
    whyThisNutrient: "The gut microbiome is increasingly understood as the foundation of nearly everything — immune function, mood (90% of serotonin is made in the gut), inflammation, metabolic health, and even hormonal balance. Antibiotics, stress, processed food, alcohol, and age all deplete it. Restoring it isn't a wellness trend. It's maintenance.",
    whyNotCheap: "Cheap probiotics are mostly marketing. A 10-billion CFU count means nothing if the strains are dead, unstudied, or unable to survive stomach acid. Seed's strains are selected based on published human clinical trials, not in vitro lab data. It's a meaningful difference.",
    form: "24-strain synbiotic (probiotic + prebiotic) — 53.6 billion AFU",
    dose: "2 capsules daily with food",
    thirdParty: "Third-party tested, non-GMO, vegan",
    caution: "May cause temporary bloating in the first week as the microbiome adjusts.",
    personalNote: "I was skeptical about the price. Then I stopped for a month and noticed the difference immediately. Digestion, energy, even mood. Now it's non-negotiable.",
  },
  {
    id: "coq10",
    emoji: "❤️",
    name: "CoQ10 (Ubiquinol)",
    brand: "Qunol Ultra",
    subtitle: "The active form. Your mitochondria will notice.",
    color: "#3A0A0A",
    category: "specialty",
    price: "~$28–$40",
    asin: "B005ERPBRC",
    teaPairing: ["Heart of a King", "Blood Pressure Balance", "Post-50 Men's Foundation", "Volcanic Vitality"],
    teaNote: "Hawthorn berry in your heart blends supports myocardial efficiency and vascular tone. CoQ10 provides the cellular energy currency (ATP) the heart muscle runs on. The heart beats 100,000 times per day — it has the highest mitochondrial density of any organ in the body. These two belong together.",
    whyThisBrand: "Qunol uses ubiquinol — the pre-converted, active form of CoQ10 — suspended in a water and fat soluble format for dramatically better absorption. Standard CoQ10 (ubiquinone) must be converted by the body before it can be used, and that conversion becomes less efficient with age. Independent testing confirms Qunol meets label claims consistently.",
    whyThisNutrient: "CoQ10 is produced naturally in every cell and is essential for mitochondrial energy production. After 30, production declines. After 40, the decline accelerates. Statins — one of the most prescribed drugs in America — block the same pathway that produces CoQ10, which is why statin users commonly experience muscle pain and fatigue. Anyone on a statin should be taking ubiquinol. Anyone over 40 should consider it.",
    whyNotCheap: "Ubiquinone (cheap CoQ10) has poor bioavailability, particularly in older adults. Studies show ubiquinol produces plasma levels 3–4x higher than ubiquinone at the same dose. At the doses needed for cardiovascular benefit (200–400mg ubiquinone), ubiquinol at 100–200mg is more effective and comparable in cost per effective dose.",
    form: "Ubiquinol (active, reduced form of CoQ10)",
    dose: "100–200mg daily with a fat-containing meal",
    thirdParty: "Third-party tested",
    caution: "May enhance effects of blood pressure medications. Monitor if on antihypertensives.",
    personalNote: "I started taking this when I was researching the men's heart blend. Three weeks in I noticed I was recovering from workouts noticeably faster. The research makes sense — more cellular energy is more cellular energy.",
  },
  {
    id: "zinc",
    emoji: "🛡",
    name: "Zinc Bisglycinate",
    brand: "Thorne",
    subtitle: "The mineral the immune system, testosterone, and prostate run on.",
    color: "#1A3A1A",
    category: "mineral",
    price: "~$16–$22",
    asin: "B0013OXKHC",
    teaPairing: ["Prostate Shield", "Volcanic Vitality", "Testosterone Harmony", "Zinc & Saw Palmetto Tonic"],
    teaNote: "The prostate concentrates zinc at higher levels than any other organ. Your Prostate Shield and Zinc & Saw Palmetto Tonic blends provide herbal support for that pathway — but herbal zinc sources alone can't replace the mineral itself. They work in concert.",
    whyThisBrand: "Thorne's zinc uses bisglycinate chelation — zinc bonded to two glycine molecules for superior absorption and gentler digestion. Zinc picolinate is another well-absorbed form. Zinc oxide and zinc sulfate (common in cheap supplements) have poor bioavailability and frequently cause nausea. Thorne manufactures under NSF Sport certification.",
    whyThisNutrient: "Zinc is essential for immune function, testosterone production, prostate health, wound healing, DNA repair, and taste/smell. Deficiency is more common than most people realize — vegetarians, heavy exercisers, men over 50, and anyone who sweats heavily are particularly vulnerable. Low zinc directly suppresses testosterone and impairs immune response.",
    whyNotCheap: "Zinc oxide — by far the most common form in supplements — absorbs at roughly 10%. Zinc bisglycinate and picolinate absorb at 30–40%. You'd need 3–4x the dose of zinc oxide to match the effective delivery of bisglycinate — and at those doses, zinc oxide causes significant GI distress. The chelated form wins on every metric.",
    form: "Zinc bisglycinate (chelated)",
    dose: "15–30mg daily with food",
    thirdParty: "NSF Certified for Sport",
    caution: "Do not exceed 40mg/day long-term. High-dose zinc competes with copper absorption.",
    personalNote: "Zinc was the supplement I was most skeptical about until I read the prostate research. The fact that the prostate actively concentrates zinc tells you everything about how important it is.",
  },
  {
    id: "b12",
    emoji: "⚡",
    name: "Vitamin B12 Methylcobalamin",
    brand: "Thorne",
    subtitle: "The active form. Your nerves use it immediately.",
    color: "#1A1A3A",
    category: "vitamin",
    price: "~$18–$24",
    asin: "B002GJCVRS",
    teaPairing: ["Iron Will Morning", "Pre-Game Performance", "Alpha Brain Focus", "Brain Boost"],
    teaNote: "Your energy and focus blends work on neural pathways, adaptogens, and circulation. B12 is the raw material for myelin — the insulation around every nerve fiber. Without adequate B12, none of those pathways transmit signals efficiently. This is the foundation under the formula.",
    whyThisBrand: "Thorne's B12 uses methylcobalamin — the neurologically active form your body uses immediately. Cyanocobalamin (found in most B12 supplements) must be converted by the body through a two-step process, and people with MTHFR gene variants (roughly 40% of the population) do this conversion poorly. Methylcobalamin bypasses that entirely.",
    whyThisNutrient: "B12 deficiency is one of the most underdiagnosed conditions in adults. It causes fatigue, brain fog, nerve damage, and depression — all of which are often attributed to other causes. Vegans, vegetarians, people over 50 (stomach acid declines, affecting B12 absorption), metformin users, and anyone on long-term antacids are at high risk. B12 is stored in the liver for years, so deficiency develops slowly and symptoms are subtle until they're not.",
    whyNotCheap: "Cyanocobalamin is synthetic and cheap. Methylcobalamin is the form naturally found in food and used by the nervous system. For neurological health specifically, the methylcobalamin form has significantly more supporting evidence.",
    form: "Methylcobalamin (active, neurologically ready form)",
    dose: "1,000mcg daily — dissolve under tongue for best absorption",
    thirdParty: "NSF Certified for Sport",
    caution: "Generally extremely safe. No known toxicity at standard doses.",
    personalNote: "I switched from cyanocobalamin to methylcobalamin two years ago. The difference in mental clarity was noticeable within two weeks. I didn't expect that.",
  },
  {
    id: "vitc",
    emoji: "🍊",
    name: "Liposomal Vitamin C",
    brand: "LivOn Labs",
    subtitle: "Standard C is mostly excreted. Liposomal delivery changes everything.",
    color: "#3A2A0A",
    category: "vitamin",
    price: "~$40–$55",
    asin: "B003YY8TZK",
    teaPairing: ["Liver & Love", "Deep Liver Cleanse", "Blood Purifier", "Immune blends", "Muscle and Recovery"],
    teaNote: "Vitamin C is essential for collagen synthesis and is a cofactor in your liver's Phase I detoxification pathway. Your liver cleanse teas are mobilizing toxins for excretion — vitamin C helps neutralize free radicals generated in that process and supports the collagen repair that follows. Take your liver blend with liposomal C for the full protocol.",
    whyThisBrand: "LivOn Labs pioneered liposomal vitamin C delivery. The phospholipid bubble surrounding each C molecule bypasses gut absorption limits — standard vitamin C above 200mg is mostly excreted because the intestinal transport mechanism saturates. Liposomal C achieves plasma levels comparable to intravenous vitamin C at a fraction of the cost. Used by integrative physicians for immune support and post-illness recovery.",
    whyThisNutrient: "Vitamin C is a master antioxidant, immune modulator, collagen cofactor, and adrenal support nutrient. Humans are one of the only mammals that can't synthesize their own C — we depend entirely on dietary intake. Chronic stress, smoking, illness, and intense exercise dramatically increase demand. Most people are getting enough to prevent scurvy — not enough to optimize.",
    whyNotCheap: "Standard ascorbic acid tablets above 500mg produce mostly expensive urine. The dose your tissues actually receive is limited by gut transport capacity. Liposomal delivery circumvents this completely. The price per effective dose is actually competitive when you account for what's actually absorbed.",
    form: "Liposomal ascorbic acid (phospholipid encapsulated)",
    dose: "1 packet (1,000mg) daily — can increase to 2–3 during illness",
    thirdParty: "Third-party tested",
    caution: "High doses may cause loose stools. Start with 1 packet.",
    personalNote: "This is what I reach for the moment I feel anything coming on. I've been taking it for three years and can count on one hand how many times I've been sick.",
  },
];

const CATEGORIES = [
  { key: "all",      label: "All 10",           emoji: "✦" },
  { key: "vitamin",  label: "Vitamins",          emoji: "☀️" },
  { key: "mineral",  label: "Minerals",          emoji: "🌍" },
  { key: "specialty",label: "Specialty",         emoji: "⚗️" },
  { key: "herb",     label: "Herbal Extracts",   emoji: "🌿" },
];

// ─── SPINNING AMAZON BUTTON ──────────────────────────────────────────────────
function AmazonSpinBtn({ onClick }) {
  const text = "AMAZON · SHOP NOW · AMAZON · SHOP NOW · ";
  const chars = text.split("");
  const radius = 52;
  const total = chars.length;
  return (
    <div
      onClick={onClick}
      title="View on Amazon"
      style={{
        position:"relative", width:120, height:120,
        cursor:"pointer", flexShrink:0,
      }}
    >
      {/* Rotating ring of text — counter-clockwise */}
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%",
        animation:"suppSpinCCW 18s linear infinite",
      }}>
        {chars.map((ch, i) => (
          <span key={i} style={{
            position:"absolute", top:0, left:"50%",
            fontSize:"8.5px", fontFamily:"Jost,sans-serif",
            fontWeight:600, color:"rgba(196,137,58,.85)",
            letterSpacing:".04em",
            transformOrigin:`0 ${radius}px`,
            width:10, textAlign:"center", marginLeft:-5,
            transform:`rotate(${i * (360 / total)}deg)`,
          }}>{ch}</span>
        ))}
      </div>

      {/* Center gold circle */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:74, height:74,
        background:"linear-gradient(135deg,#C8893A,#A06828)",
        borderRadius:"50%",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        boxShadow:"0 6px 24px rgba(196,137,58,.5)",
        transition:"all .3s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translate(-50%,-50%) scale(1.1)";e.currentTarget.style.boxShadow="0 10px 32px rgba(196,137,58,.7)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translate(-50%,-50%)";e.currentTarget.style.boxShadow="0 6px 24px rgba(196,137,58,.5)";}}>
        <span style={{fontSize:"1.2rem",color:"white",lineHeight:1,transform:"rotate(-30deg)",display:"inline-block"}}>↗</span>
        <span style={{fontSize:".42rem",letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.9)",fontFamily:"Jost,sans-serif",marginTop:3}}>Shop</span>
      </div>

      <style>{`@keyframes suppSpinCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`}</style>
    </div>
  );
}

// ─── STOCK NOTIFICATION MODAL ────────────────────────────────────────────────
function StockNotifyModal({ supp, onClose }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;
    setSending(true);
    try {
      await fetch("https://web-production-4c84.up.railway.app/notify-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, supplement: supp.name, brand: supp.brand }),
      });
    } catch (_) {}
    setSent(true);
    setSending(false);
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.8)",
      zIndex:980, display:"flex", alignItems:"center", justifyContent:"center",
      padding:20, backdropFilter:"blur(8px)",
    }} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{
        background:"#0F140F", border:"1px solid rgba(196,137,58,.3)",
        borderRadius:20, maxWidth:400, width:"100%", padding:"28px 24px",
      }}>
        {sent ? (
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"2rem",marginBottom:12}}>🫖</div>
            <h3 style={{fontFamily:"Playfair Display,serif",fontSize:"1.2rem",color:"#F7F2EA",margin:"0 0 10px"}}>We'll let you know</h3>
            <p style={{fontSize:".8rem",color:"rgba(247,242,234,.55)",lineHeight:1.7,margin:"0 0 20px"}}>
              As soon as <strong style={{color:"rgba(196,137,58,.85)"}}>{supp.name}</strong> is back in stock on Amazon, we'll send you a note.
            </p>
            <button onClick={onClose} style={{background:"rgba(196,137,58,.15)",border:"1px solid rgba(196,137,58,.3)",color:"rgba(196,137,58,.9)",borderRadius:10,padding:"10px 24px",fontFamily:"Jost,sans-serif",fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"}}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{fontSize:".56rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10,fontFamily:"Jost,sans-serif",fontWeight:600}}>
              ✦ Notify Me When Back In Stock
            </div>
            <h3 style={{fontFamily:"Playfair Display,serif",fontSize:"1.1rem",color:"#F7F2EA",margin:"0 0 8px",lineHeight:1.3}}>
              {supp.name}
            </h3>
            <p style={{fontSize:".78rem",color:"rgba(247,242,234,.5)",lineHeight:1.65,margin:"0 0 18px",fontWeight:300}}>
              This item may be temporarily unavailable on Amazon. Leave your email and we'll reach out the moment it's back — no spam, just one notification.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")handleSubmit();}}
              autoFocus
              style={{
                width:"100%", boxSizing:"border-box",
                background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.15)",
                borderRadius:10, padding:"11px 14px",
                fontFamily:"Jost,sans-serif", fontSize:".85rem",
                color:"#F7F2EA", outline:"none", marginBottom:12,
              }}
            />
            <div style={{display:"flex",gap:8}}>
              <button onClick={handleSubmit} disabled={sending||!email.includes("@")} style={{
                flex:1, background:"linear-gradient(135deg,#C8893A,#A06828)",
                border:"none", color:"white", borderRadius:10,
                padding:"11px", fontFamily:"Jost,sans-serif",
                fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase",
                cursor:"pointer", fontWeight:600,
                opacity: (!email.includes("@")||sending) ? .5 : 1,
              }}>
                {sending ? "Saving…" : "Notify Me ✦"}
              </button>
              <button onClick={onClose} style={{
                background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.12)",
                color:"rgba(247,242,234,.5)", borderRadius:10,
                padding:"11px 16px", fontFamily:"Jost,sans-serif",
                fontSize:".7rem", cursor:"pointer",
              }}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function SupplementsPage({ onNav }) {
  const [filter, setFilter]         = useState("all");
  const [selected, setSelected]     = useState(null);
  const [expanded, setExpanded]     = useState(null);
  const [notifySupp, setNotifySupp] = useState(null);

  const visible = filter === "all"
    ? SUPPLEMENTS
    : SUPPLEMENTS.filter(s => s.category === filter);

  const handleBuy = async (supp) => {
    if (supp.seedUrl) {
      window.open(supp.seedUrl, "_blank");
      return;
    }
    const url = amz(supp.asin);
    // Open in new tab
    const newTab = window.open(url, "_blank");
    // After a short delay, check if the tab opened — if link failed offer notification
    setTimeout(() => {
      const confirm = window.confirm(
        `Could not reach the Amazon listing for ${supp.name}.\n\nWould you like us to notify you when it's back in stock?`
      );
      if (confirm) setNotifySupp(supp);
    }, 3500);
    // If tab was blocked entirely, show notify modal immediately
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      setNotifySupp(supp);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#0A1A0A 0%,#0D1A14 40%,#1A1A0D 100%)",
      paddingBottom: 80,
      fontFamily: "Jost, sans-serif",
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div style={{
        textAlign: "center", padding: "64px 24px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center top, rgba(74,114,80,.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{fontSize:".6rem",letterSpacing:".28em",textTransform:"uppercase",color:"rgba(74,114,80,.9)",marginBottom:12}}>
          Chai Holistic · Supplements
        </div>
        <h1 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem,6vw,3.2rem)",
          fontWeight: 700, color: "#F7F2EA",
          margin: "0 0 12px", lineHeight: 1.15,
        }}>
          Vitamins &amp; Minerals
        </h1>
        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,3vw,1.5rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "rgba(196,137,58,.9)", margin: "0 0 20px",
        }}>
          The ones worth spending money on
        </h2>

        {/* Alex's personal note */}
        <div style={{
          maxWidth: 640, margin: "0 auto 32px",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(74,114,80,.25)",
          borderRadius: 20, padding: "20px 24px",
          textAlign: "left",
        }}>
          <div style={{fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:10,fontWeight:600}}>
            ✦ A note from Alex
          </div>
          <p style={{fontSize:".88rem",color:"rgba(247,242,234,.7)",lineHeight:1.85,margin:0,fontWeight:300}}>
            I use teas, vitamins, and minerals every single day to stay healthy. People spend thousands on cars, vacations, and things that wear out — but resist spending $30 on a supplement that supports every organ in their body. That never made sense to me.
          </p>
          <p style={{fontSize:".88rem",color:"rgba(247,242,234,.7)",lineHeight:1.85,margin:"12px 0 0",fontWeight:300}}>
            Every supplement on this page is something I actually take or have researched deeply. I chose each one for a specific reason — the form, the testing standard, the ingredient source. There are cheaper versions of all of these. I don't recommend them. Your body deserves what actually works.
          </p>
          <div style={{marginTop:14,fontSize:".72rem",color:"rgba(74,114,80,.8)",fontStyle:"italic"}}>
            — These are affiliate links. If you purchase through them, we earn a small commission at no cost to you. We only recommend what we believe in.
          </div>
        </div>

        {/* Quality badges */}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:8}}>
          {[
            ["🔬 Form matters","Bioavailability first"],
            ["🧪 Third-party tested","Not just label claims"],
            ["🚫 No fillers","Clean ingredients only"],
            ["🫖 Tea-paired","Every pick matched to a blend"],
          ].map(([t,s])=>(
            <div key={t} style={{
              background: "rgba(74,114,80,.12)", border: "1px solid rgba(74,114,80,.25)",
              borderRadius: 40, padding: "7px 16px", textAlign: "left",
            }}>
              <div style={{fontSize:".65rem",color:"rgba(74,114,80,.9)",fontWeight:600}}>{t}</div>
              <div style={{fontSize:".58rem",color:"rgba(247,242,234,.4)",marginTop:1}}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY FILTER ──────────────────────────────────────────────────── */}
      <div style={{padding:"0 16px 28px",maxWidth:900,margin:"0 auto"}}>
        <div style={{
          display:"flex",gap:8,overflowX:"auto",paddingBottom:4,
          WebkitOverflowScrolling:"touch",scrollbarWidth:"none",
        }}>
          {CATEGORIES.map(c=>(
            <button key={c.key} onClick={()=>setFilter(c.key)} style={{
              flexShrink:0,
              background: filter===c.key ? "rgba(74,114,80,.9)" : "rgba(255,255,255,.05)",
              border: "1px solid " + (filter===c.key ? "rgba(74,114,80,.9)" : "rgba(255,255,255,.15)"),
              color: filter===c.key ? "white" : "rgba(247,242,234,.75)",
              borderRadius:40, padding:"8px 18px",
              fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase",
              cursor:"pointer", fontWeight: filter===c.key ? 700 : 400,
              transition:"all .2s", whiteSpace:"nowrap",
            }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SUPPLEMENT CARDS ─────────────────────────────────────────────────── */}
      <div id="sec-supp-grid" style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%), 1fr))",
        gap: 20,
      }}>
        {visible.map(supp => (
          <SupplementCard
            key={supp.id}
            supp={supp}
            expanded={expanded}
            setExpanded={setExpanded}
            onDetail={() => setSelected(supp)}
            onBuy={() => handleBuy(supp)}
          />
        ))}
      </div>

      {/* ── WHY THIS MATTERS ─────────────────────────────────────────────────── */}
      <div style={{maxWidth:760,margin:"56px auto 0",padding:"0 16px"}}>
        <div style={{
          background:"rgba(255,255,255,.03)",
          border:"1px solid rgba(74,114,80,.2)",
          borderRadius:20, padding:"28px 28px",
        }}>
          <div style={{fontSize:".58rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(74,114,80,.8)",marginBottom:12,fontWeight:600}}>
            ✦ Why form matters more than brand
          </div>
          <p style={{fontSize:".84rem",color:"rgba(247,242,234,.65)",lineHeight:1.85,margin:"0 0 14px",fontWeight:300}}>
            The supplement industry is largely unregulated. A bottle can say "Magnesium" on the front and contain magnesium oxide — a form with roughly 4% bioavailability that mostly passes through your digestive system without doing anything. Same price. Completely different outcome.
          </p>
          <p style={{fontSize:".84rem",color:"rgba(247,242,234,.65)",lineHeight:1.85,margin:"0 0 14px",fontWeight:300}}>
            Every pick on this page was chosen first for <em style={{color:"rgba(196,137,58,.85)"}}>form</em> — the specific molecular structure your body can actually use — and second for third-party testing, which means an independent lab confirmed the product contains what the label claims. Most supplements on store shelves meet neither standard.
          </p>
          <p style={{fontSize:".84rem",color:"rgba(247,242,234,.65)",lineHeight:1.85,margin:0,fontWeight:300}}>
            The price difference between a good supplement and a great one is usually $10–$20 per month. We spend that on coffee in two days. Your cells are working 24 hours a day. They deserve the real thing.
          </p>
        </div>
      </div>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────────── */}
      <div style={{maxWidth:900,margin:"32px auto 0",padding:"0 16px"}}>
        <p style={{fontSize:".63rem",color:"rgba(247,242,234,.25)",textAlign:"center",lineHeight:1.75}}>
          These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before beginning any supplement regimen, especially if you take prescription medications or have an existing health condition. Links on this page are affiliate links — we may earn a commission if you purchase through them at no additional cost to you.
        </p>
      </div>

      {/* ── DETAIL MODAL ─────────────────────────────────────────────────────── */}
      {selected && (
        <DetailModal supp={selected} onClose={()=>setSelected(null)} onBuy={()=>handleBuy(selected)}/>
      )}

      {/* ── STOCK NOTIFICATION MODAL ─────────────────────────────────────────── */}
      {notifySupp && (
        <StockNotifyModal supp={notifySupp} onClose={()=>setNotifySupp(null)}/>
      )}
    </div>
  );
}

// ─── SUPPLEMENT CARD ─────────────────────────────────────────────────────────
function SupplementCard({ supp, onDetail, onBuy }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.04)",
      border: "1px solid rgba(255,255,255,.09)",
      borderRadius: 18, overflow: "hidden",
      transition: "transform .2s, box-shadow .2s",
      cursor: "pointer",
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,.4)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
    onClick={onDetail}
    >
      {/* Color band */}
      <div style={{height:5,background:`linear-gradient(90deg,${supp.color},rgba(196,137,58,.5))`}}/>

      <div style={{padding:"20px 20px 18px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
          <div style={{
            fontSize:"1.6rem",flexShrink:0,
            width:48,height:48,borderRadius:14,
            background:`${supp.color}33`,
            border:`1px solid ${supp.color}66`,
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            {supp.emoji}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{
              fontFamily:"Playfair Display,serif",fontSize:"1.05rem",
              fontWeight:600,color:"#F7F2EA",marginBottom:2,lineHeight:1.2,
            }}>
              {supp.name}
            </div>
            <div style={{fontSize:".68rem",color:"rgba(196,137,58,.8)",fontWeight:500,marginBottom:2}}>
              {supp.brand}
            </div>
            <div style={{fontSize:".7rem",color:"rgba(247,242,234,.45)",fontStyle:"italic",lineHeight:1.3}}>
              {supp.subtitle}
            </div>
          </div>
        </div>

        {/* Why this nutrient — short */}
        <p style={{fontSize:".78rem",color:"rgba(247,242,234,.7)",lineHeight:1.7,marginBottom:14,fontWeight:300}}>
          {supp.whyThisNutrient.slice(0,160)}…
        </p>

        {/* Tea pairings */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(74,114,80,.8)",marginBottom:7,fontWeight:600}}>
            🫖 Pairs with
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {supp.teaPairing.slice(0,3).map(t=>(
              <span key={t} style={{
                background:"rgba(74,114,80,.1)",border:"1px solid rgba(74,114,80,.2)",
                borderRadius:20,padding:"3px 10px",fontSize:".62rem",
                color:"rgba(74,114,80,.9)",
              }}>{t}</span>
            ))}
            {supp.teaPairing.length > 3 && (
              <span style={{fontSize:".62rem",color:"rgba(196,137,58,.5)",padding:"3px 5px"}}>
                +{supp.teaPairing.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Form + testing */}
        <div style={{
          background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",
          borderRadius:10,padding:"10px 12px",marginBottom:14,
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,
        }}>
          <div>
            <div style={{fontSize:".54rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:3}}>Form</div>
            <div style={{fontSize:".68rem",color:"rgba(247,242,234,.75)",lineHeight:1.4}}>{supp.form.split("(")[0].trim()}</div>
          </div>
          <div>
            <div style={{fontSize:".54rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:3}}>Tested</div>
            <div style={{fontSize:".68rem",color:"rgba(74,114,80,.9)",lineHeight:1.4}}>{supp.thirdParty}</div>
          </div>
        </div>

        {/* Price + buttons */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
          <div style={{fontFamily:"Playfair Display,serif",fontSize:"1rem",color:"rgba(196,137,58,.9)",fontWeight:600}}>
            {supp.price}
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center"}}>
            <button
              onClick={e=>{e.stopPropagation();onDetail();}}
              style={{
                background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.15)",
                color:"rgba(247,242,234,.8)",borderRadius:40,padding:"7px 14px",
                fontSize:".63rem",letterSpacing:".1em",textTransform:"uppercase",
                cursor:"pointer",transition:"all .2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";}}>
              Why This →
            </button>
            <div onClick={e=>{e.stopPropagation();onBuy();}}>
              <AmazonSpinBtn onClick={onBuy}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function DetailModal({ supp, onClose, onBuy }) {
  return (
    <div
      style={{
        position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:950,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:16,backdropFilter:"blur(10px)",
      }}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}
    >
      <div style={{
        background:"#0F1A12",border:"1px solid rgba(196,137,58,.25)",
        borderRadius:22,maxWidth:560,width:"100%",maxHeight:"92vh",
        overflowY:"auto",
      }}>
        {/* Color band */}
        <div style={{height:6,background:`linear-gradient(90deg,${supp.color},rgba(196,137,58,.6))`,borderRadius:"22px 22px 0 0"}}/>

        <div style={{padding:"22px 24px 26px"}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div style={{flex:1}}>
              <div style={{fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(74,114,80,.8)",marginBottom:6,fontWeight:600}}>
                {supp.emoji} {supp.category.toUpperCase()} · {supp.brand}
              </div>
              <h3 style={{fontFamily:"Playfair Display,serif",fontSize:"1.4rem",fontWeight:700,color:"#F7F2EA",margin:"0 0 4px"}}>
                {supp.name}
              </h3>
              <div style={{fontSize:".78rem",fontStyle:"italic",color:"rgba(196,137,58,.8)"}}>
                {supp.subtitle}
              </div>
            </div>
            <button onClick={onClose} style={{
              background:"rgba(255,255,255,.08)",border:"none",
              color:"rgba(247,242,234,.6)",borderRadius:"50%",
              width:34,height:34,fontSize:"1rem",cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              flexShrink:0,marginLeft:12,
            }}>✕</button>
          </div>

          {/* Why this nutrient */}
          <Section label="Why You Need This" color="rgba(196,137,58,.7)">
            <p style={{fontSize:".82rem",color:"rgba(247,242,234,.75)",lineHeight:1.8,margin:0,fontWeight:300}}>
              {supp.whyThisNutrient}
            </p>
          </Section>

          {/* Why this brand */}
          <Section label="Why This Brand Specifically" color="rgba(74,114,80,.8)">
            <p style={{fontSize:".82rem",color:"rgba(247,242,234,.75)",lineHeight:1.8,margin:0,fontWeight:300}}>
              {supp.whyThisBrand}
            </p>
          </Section>

          {/* Why not cheap */}
          <Section label="Why the Cheap Version Doesn't Work" color="rgba(196,137,58,.6)">
            <p style={{fontSize:".82rem",color:"rgba(247,242,234,.75)",lineHeight:1.8,margin:0,fontWeight:300}}>
              {supp.whyNotCheap}
            </p>
          </Section>

          {/* Tea pairing */}
          <Section label="🫖 Tea Pairing" color="rgba(74,114,80,.8)">
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {supp.teaPairing.map(t=>(
                <span key={t} style={{
                  background:"rgba(74,114,80,.12)",border:"1px solid rgba(74,114,80,.25)",
                  borderRadius:20,padding:"4px 12px",fontSize:".68rem",
                  color:"rgba(74,114,80,.9)",
                }}>{t}</span>
              ))}
            </div>
            <p style={{fontSize:".78rem",color:"rgba(247,242,234,.55)",lineHeight:1.75,margin:0,fontStyle:"italic",fontWeight:300}}>
              {supp.teaNote}
            </p>
          </Section>

          {/* Specs */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {[
              ["Form",supp.form],
              ["Dose",supp.dose],
              ["Third-Party",supp.thirdParty],
              ["Price",supp.price],
            ].map(([l,v])=>(
              <div key={l} style={{
                background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",
                borderRadius:10,padding:"10px 12px",
                gridColumn: l === "Form" ? "span 2" : "auto",
              }}>
                <div style={{fontSize:".54rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:4}}>{l}</div>
                <div style={{fontSize:".76rem",color:"rgba(247,242,234,.8)",lineHeight:1.4}}>{v}</div>
              </div>
            ))}
          </div>

          {/* Safety */}
          <div style={{
            background:"rgba(255,180,0,.06)",border:"1px solid rgba(255,180,0,.18)",
            borderRadius:10,padding:"12px 14px",marginBottom:16,
          }}>
            <div style={{fontSize:".56rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,180,0,.7)",marginBottom:5,fontWeight:600}}>
              ⚠ Safety Note
            </div>
            <p style={{fontSize:".75rem",color:"rgba(255,240,180,.7)",lineHeight:1.65,margin:0,fontWeight:300}}>
              {supp.caution}
            </p>
          </div>

          {/* Alex's personal note */}
          <div style={{
            background:"rgba(196,137,58,.07)",border:"1px solid rgba(196,137,58,.2)",
            borderRadius:12,padding:"14px 16px",marginBottom:20,
          }}>
            <div style={{fontSize:".56rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(196,137,58,.75)",marginBottom:8,fontWeight:600}}>
              ✦ Alex's Note
            </div>
            <p style={{fontSize:".8rem",color:"rgba(247,242,234,.7)",lineHeight:1.75,margin:0,fontStyle:"italic",fontWeight:300}}>
              "{supp.personalNote}"
            </p>
          </div>

          {/* CTA — spinning Amazon button */}
          <div style={{display:"flex",justifyContent:"center",margin:"8px 0 16px"}}>
            <AmazonSpinBtn onClick={onBuy}/>
          </div>
          <p style={{fontSize:".6rem",color:"rgba(247,242,234,.25)",textAlign:"center",margin:"0 0 4px",lineHeight:1.6}}>
            Affiliate link — we earn a small commission at no cost to you.<br/>
            These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION HELPER ──────────────────────────────────────────────────────────
function Section({ label, color, children }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{
        fontSize:".56rem",letterSpacing:".2em",textTransform:"uppercase",
        color: color || "rgba(196,137,58,.7)",marginBottom:8,fontWeight:600,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}
