import { useRef, useState, useEffect } from "react";

const DAILY_BLENDS = [
  { n:1,  emoji:"🌙", name:"Deep Sleep & Calm Blend",                part:"Part I",   benefit:"Calms the nervous system and guides the body into deep, restorative sleep." },
  { n:2,  emoji:"❤️", name:"Heart & Circulation Tonic",              part:"Part I",   benefit:"Strengthens the heart, improves circulation, and lowers blood pressure naturally." },
  { n:3,  emoji:"🧠", name:"Focus & Mental Clarity Blend",           part:"Part I",   benefit:"Sharpens concentration and memory without caffeine jitters." },
  { n:4,  emoji:"🛡️", name:"Immune Defense Blend",                   part:"Part I",   benefit:"Builds immune resilience and fights inflammation from the inside out." },
  { n:5,  emoji:"🔥", name:"Metabolism & Digestive Fire",            part:"Part I",   benefit:"Stimulates digestion, reduces bloating, and supports liver detoxification." },
  { n:6,  emoji:"💪", name:"Anti-Inflammation & Joint Relief",       part:"Part I",   benefit:"Targets chronic inflammation and joint pain with clinically studied herbs." },
  { n:7,  emoji:"🌸", name:"Hormone Balance & Women's Wellness",     part:"Part I",   benefit:"Eases PMS, regulates cycles, and supports hormonal harmony." },
  { n:8,  emoji:"🌬️", name:"Lung & Respiratory Clarity",            part:"Part I",   benefit:"Opens airways, clears mucus, and soothes irritated lung tissue." },
  { n:9,  emoji:"⚡", name:"Adaptogen Energy & Vitality Blend",      part:"Part I",   benefit:"Combats fatigue and builds stress resilience without stimulants." },
  { n:10, emoji:"🌿", name:"Gut Healing & Microbiome Blend",         part:"Part I",   benefit:"Repairs and soothes the gut lining — ideal for leaky gut and IBS." },
  { n:11, emoji:"🌊", name:"Ocean Mist Detox Blend",                 part:"Part II",  benefit:"Pulls heavy metals and toxins while providing rich iodine for thyroid support." },
  { n:12, emoji:"🔮", name:"Third Eye Clarity Blend",                part:"Part II",  benefit:"Enhances dream clarity, intuition, and inner vision." },
  { n:13, emoji:"🦋", name:"Metamorphosis Mood Lift Blend",          part:"Part II",  benefit:"A gentle natural antidepressant formula studied for lifting mild depression." },
  { n:14, emoji:"🐉", name:"Dragon Fire Longevity Blend",            part:"Part II",  benefit:"Inspired by ancient Chinese longevity traditions — nourishes the blood and kidneys." },
  { n:15, emoji:"🌺", name:"Venus Beauty Blend",                     part:"Part II",  benefit:"Collagen-boosting nutrients for skin, hair, and nails — from the inside out." },
  { n:16, emoji:"🧬", name:"DNA Repair & Cell Renewal Blend",        part:"Part II",  benefit:"Activates telomerase for cellular longevity and deep cellular repair." },
  { n:17, emoji:"🌑", name:"Shadow Work & Nervous System Reset",     part:"Part II",  benefit:"Deeply relaxes the nervous system for trauma release and chronic stress." },
  { n:18, emoji:"🏔️", name:"Alpine Warrior Endurance Blend",         part:"Part II",  benefit:"Increases oxygen uptake, delays fatigue, and boosts physical stamina." },
  { n:19, emoji:"🌍", name:"Ancestral Grounding Blend",              part:"Part II",  benefit:"Rooted in African botanical wisdom — mineral-rich and caffeine-free." },
  { n:20, emoji:"✨", name:"Stardust Pineal Activation Blend",       part:"Part II",  benefit:"Nourishes neural pathways and gently activates dopamine and serotonin." },
  { n:21, emoji:"🌻", name:"Solar Plexus Power Blend",               part:"Part III", benefit:"Activates confidence and vitality aligned with the solar plexus chakra." },
  { n:22, emoji:"🌊", name:"Mermaid Mineral Blend",                  part:"Part III", benefit:"Delivers 92 of the 102 minerals the human body needs in one cup." },
  { n:23, emoji:"🕊️", name:"Inner Peace Trauma Release Blend",      part:"Part III", benefit:"A heart-centred healing blend for emotional wounds and stored tension." },
  { n:24, emoji:"🌠", name:"Cosmic Collagen & Skin Glow Blend",      part:"Part III", benefit:"Tremella mushroom holds 500x its weight in water — nature's best skin hydrator." },
  { n:25, emoji:"🦅", name:"Eagle Vision Eye Health Blend",          part:"Part III", benefit:"Strengthens retinal capillaries and protects the macula from blue light damage." },
  { n:26, emoji:"🌋", name:"Volcanic Vitality Men's Blend",          part:"Part III", benefit:"Supports testosterone balance, prostate health, and sexual vitality." },
  { n:27, emoji:"🍃", name:"Forest Bathing Breathwork Blend",        part:"Part III", benefit:"Floods the lungs with healing phytoncides inspired by Shinrin-yoku." },
  { n:28, emoji:"💎", name:"Crystal Clear Kidney & Bladder Blend",   part:"Part III", benefit:"A targeted formula to cleanse the urinary tract and dissolve kidney deposits." },
  { n:29, emoji:"🌈", name:"Rainbow Children's Calm & Immunity",    part:"Part III", benefit:"A gentle, safe blend formulated specifically for children's sleep and immunity." },
  { n:30, emoji:"🔱", name:"Triquetra Sacred Trinity Blend",         part:"Part III", benefit:"The most sacred blend — drawing from Egyptian, Ayurvedic, and biblical traditions." },
  { n:31, emoji:"🫁", name:"Liver Awakening Morning Cleanse",        part:"Part IV",  benefit:"Activates bile flow and liver detoxification — best on an empty stomach." },
  { n:32, emoji:"🌿", name:"Milk Thistle Deep Liver Repair",         part:"Part IV",  benefit:"The gold standard liver repair formula with silymarin for cellular regeneration." },
  { n:33, emoji:"💛", name:"Golden Liver Flush Blend",               part:"Part IV",  benefit:"A warming golden flush for sluggish livers — stimulates digestive enzymes." },
  { n:34, emoji:"🍋", name:"Citrus Liver & Gallbladder Cleanse",     part:"Part IV",  benefit:"Targets gallbladder sludge and bile stagnation with bright citrus herbs." },
  { n:35, emoji:"🌱", name:"Schisandra Liver Tonic & Protector",     part:"Part IV",  benefit:"Supports all five liver detoxification pathways simultaneously." },
  { n:36, emoji:"💧", name:"Chanca Piedra Stone Breaker Kidney",     part:"Part IV",  benefit:"Named stone breaker — used for centuries to dissolve kidney and gallstones." },
  { n:37, emoji:"🫧", name:"Crystal Kidney Flush & Repair",          part:"Part IV",  benefit:"Increases urine output, flushes mineral deposits, and reduces kidney inflammation." },
  { n:38, emoji:"🌊", name:"Alkaline Kidney Restore Blend",          part:"Part IV",  benefit:"Alkalises urine and restores kidney pH balance to prevent stone formation." },
  { n:39, emoji:"🔴", name:"Red Clover Liver Blood Purifier",        part:"Part IV",  benefit:"A traditional blood purification formula — best as a 30-day spring cleanse." },
  { n:40, emoji:"⚗️", name:"Ultimate Liver & Kidney Master Cleanse", part:"Part IV",  benefit:"The complete liver AND kidney dual cleanse — most comprehensive in the collection." },
];

function getDailyBlend() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return DAILY_BLENDS[day % DAILY_BLENDS.length];
}

const INTENTIONS = [
  { lines:["You are here at the right moment.", "Something in you already knows.", "Begin."],                                         voice:"You are here at the right moment. Something in you already knows. Begin." },
  { lines:["Take one breath before this cup.", "You are nourishing yourself today.", "That is enough."],                              voice:"Take one breath before this cup. You are nourishing yourself today. That is enough." },
  { lines:["Stillness is not empty.", "It is full of everything you need.", "Receive it now."],                                       voice:"Stillness is not empty. It is full of everything you need. Receive it now." },
  { lines:["What your body is asking for,", "this blend already knows.", "Trust the ritual."],                                        voice:"What your body is asking for, this blend already knows. Trust the ritual." },
  { lines:["This moment belongs to you.", "No one else. Just you.", "Breathe in."],                                                   voice:"This moment belongs to you. No one else. Just you. Breathe in." },
  { lines:["The healing has already begun.", "You chose to show up.", "That is the practice."],                                       voice:"The healing has already begun. You chose to show up. That is the practice." },
  { lines:["You came to the right place.", "Everything you need is here.", "Let it in."],                                             voice:"You came to the right place. Everything you need is here. Let it in." },
  { lines:["Your body is not broken.", "It is asking to be heard.", "This cup is you listening."],                                    voice:"Your body is not broken. It is asking to be heard. This cup is you listening." },
  { lines:["Rest is not weakness.", "It is the soil where healing grows.", "Let yourself rest today."],                               voice:"Rest is not weakness. It is the soil where healing grows. Let yourself rest today." },
  { lines:["You have carried enough.", "For this moment, put it down.", "The tea will hold you."],                                    voice:"You have carried enough. For this moment, put it down. The tea will hold you." },
  { lines:["What you tend to, grows.", "What you sip with intention, heals.", "Tend to yourself today."],                             voice:"What you tend to, grows. What you sip with intention, heals. Tend to yourself today." },
  { lines:["Healing is not a destination.", "It is the decision you made", "when you filled the kettle."],                            voice:"Healing is not a destination. It is the decision you made when you filled the kettle." },
  { lines:["You are good enough.", "Exactly as you are.", "Right now. In this moment."],                                              voice:"You are good enough. Exactly as you are. Right now. In this moment." },
  { lines:["Something ancient is in this cup.", "Generations of healers", "put it here for you."],                                   voice:"Something ancient is in this cup. Generations of healers put it here for you." },
  { lines:["The intention is already set.", "Your body already knows what to do.", "Trust what is growing."],                         voice:"The intention is already set. Your body already knows what to do. Trust what is growing." },
  { lines:["You are not behind.", "You are right on time.", "The ritual begins now."],                                                voice:"You are not behind. You are right on time. The ritual begins now." },
  { lines:["Breathe in what you need.", "Breathe out what no longer serves.", "This cup carries both."],                              voice:"Breathe in what you need. Breathe out what no longer serves. This cup carries both." },
  { lines:["Your ancestors knew something", "that science is still catching up to.", "You are the living proof."],                    voice:"Your ancestors knew something that science is still catching up to. You are the living proof." },
  { lines:["Small rituals build strong lives.", "This cup is not small.", "It is everything."],                                       voice:"Small rituals build strong lives. This cup is not small. It is everything." },
  { lines:["The body speaks before the mind does.", "Your craving for this cup", "was already a prayer."],                           voice:"The body speaks before the mind does. Your craving for this cup was already a prayer." },
  { lines:["You chose wellness today.", "In a world that makes it hard,", "that is an act of love."],                                 voice:"You chose wellness today. In a world that makes it hard, that is an act of love." },
  { lines:["There is medicine in the pause.", "Before the first sip,", "breathe and receive."],                                       voice:"There is medicine in the pause. Before the first sip, breathe and receive." },
  { lines:["What you put in your body", "becomes the energy you walk with.", "Choose it with care."],                                 voice:"What you put in your body becomes the energy you walk with. Choose it with care." },
  { lines:["Healing is not linear.", "But showing up every day", "is how it happens."],                                               voice:"Healing is not linear. But showing up every day is how it happens." },
  { lines:["This is your medicine.", "Not prescribed by anyone else.", "You knew what you needed."],                                  voice:"This is your medicine. Not prescribed by anyone else. You knew what you needed." },
  { lines:["The world will keep moving.", "This cup will not.", "For this moment, neither will you."],                                voice:"The world will keep moving. This cup will not. For this moment, neither will you." },
  { lines:["Let the warmth reach the tight places.", "The held-in places.", "The places still healing."],                             voice:"Let the warmth reach the tight places. The held-in places. The places still healing." },
  { lines:["You are someone worth caring for.", "Start with this cup.", "Then keep going."],                                          voice:"You are someone worth caring for. Start with this cup. Then keep going." },
  { lines:["Something in you said yes today.", "To nourishment. To ritual. To yourself.", "Honor that yes."],                         voice:"Something in you said yes today. To nourishment. To ritual. To yourself. Honor that yes." },
  { lines:["The herbs remember.", "What the body forgets,", "the plants have kept safe."],                                            voice:"The herbs remember. What the body forgets, the plants have kept safe." },
  { lines:["Today's intention is simple:", "show up for yourself", "the way you show up for everyone else."],                         voice:"Today's intention is simple: show up for yourself the way you show up for everyone else." },
];

// ── Daily rotation: same intention for everyone on the same calendar day ──────

// ── Intention Translations (30 intentions × 5 languages) ─────────────────────
const INTENTION_TRANS = {
  es: [
    {lines:["Estás aquí en el momento correcto.","Algo en ti ya lo sabe.","Comienza."], voice:"Estás aquí en el momento correcto. Algo en ti ya lo sabe. Comienza."},
    {lines:["Toma un respiro antes de esta taza.","Hoy te estás nutriendo.","Eso es suficiente."], voice:"Toma un respiro antes de esta taza. Hoy te estás nutriendo. Eso es suficiente."},
    {lines:["El silencio no está vacío.","Está lleno de todo lo que necesitas.","Recíbelo ahora."], voice:"El silencio no está vacío. Está lleno de todo lo que necesitas. Recíbelo ahora."},
    {lines:["Lo que tu cuerpo pide,","esta mezcla ya lo sabe.","Confía en el ritual."], voice:"Lo que tu cuerpo pide, esta mezcla ya lo sabe. Confía en el ritual."},
    {lines:["Este momento te pertenece.","A nadie más. Solo a ti.","Respira."], voice:"Este momento te pertenece. A nadie más. Solo a ti. Respira."},
    {lines:["La sanación ya ha comenzado.","Elegiste estar aquí.","Esa es la práctica."], voice:"La sanación ya ha comenzado. Elegiste estar aquí. Esa es la práctica."},
    {lines:["Viniste al lugar correcto.","Todo lo que necesitas está aquí.","Déjalo entrar."], voice:"Viniste al lugar correcto. Todo lo que necesitas está aquí. Déjalo entrar."},
    {lines:["Tu cuerpo no está roto.","Está pidiendo ser escuchado.","Esta taza eres tú escuchando."], voice:"Tu cuerpo no está roto. Está pidiendo ser escuchado. Esta taza eres tú escuchando."},
    {lines:["El descanso no es debilidad.","Es el suelo donde crece la sanación.","Permítete descansar hoy."], voice:"El descanso no es debilidad. Es el suelo donde crece la sanación. Permítete descansar hoy."},
    {lines:["Ya has cargado suficiente.","Por este momento, suéltalo.","El té te sostendrá."], voice:"Ya has cargado suficiente. Por este momento, suéltalo. El té te sostendrá."},
    {lines:["Lo que cuidas, crece.","Lo que bebes con intención, sana.","Cuídate hoy."], voice:"Lo que cuidas, crece. Lo que bebes con intención, sana. Cuídate hoy."},
    {lines:["La sanación no es un destino.","Es la decisión que tomaste","cuando llenaste la tetera."], voice:"La sanación no es un destino. Es la decisión que tomaste cuando llenaste la tetera."},
    {lines:["Eres suficiente.","Exactamente como eres.","Ahora mismo. En este momento."], voice:"Eres suficiente. Exactamente como eres. Ahora mismo. En este momento."},
    {lines:["Algo antiguo está en esta taza.","Generaciones de sanadores","lo pusieron aquí para ti."], voice:"Algo antiguo está en esta taza. Generaciones de sanadores lo pusieron aquí para ti."},
    {lines:["La intención ya está establecida.","Tu cuerpo ya sabe qué hacer.","Confía en lo que está creciendo."], voice:"La intención ya está establecida. Tu cuerpo ya sabe qué hacer. Confía en lo que está creciendo."},
    {lines:["No estás atrasado.","Estás justo a tiempo.","El ritual comienza ahora."], voice:"No estás atrasado. Estás justo a tiempo. El ritual comienza ahora."},
    {lines:["Inhala lo que necesitas.","Exhala lo que ya no sirve.","Esta taza lleva ambos."], voice:"Inhala lo que necesitas. Exhala lo que ya no sirve. Esta taza lleva ambos."},
    {lines:["Tus ancestros sabían algo","que la ciencia todavía está alcanzando.","Tú eres la prueba viviente."], voice:"Tus ancestros sabían algo que la ciencia todavía está alcanzando. Tú eres la prueba viviente."},
    {lines:["Los pequeños rituales construyen vidas fuertes.","Esta taza no es pequeña.","Es todo."], voice:"Los pequeños rituales construyen vidas fuertes. Esta taza no es pequeña. Es todo."},
    {lines:["El cuerpo habla antes que la mente.","Tu anhelo por esta taza","ya era una oración."], voice:"El cuerpo habla antes que la mente. Tu anhelo por esta taza ya era una oración."},
    {lines:["Elegiste el bienestar hoy.","En un mundo que lo hace difícil,","eso es un acto de amor."], voice:"Elegiste el bienestar hoy. En un mundo que lo hace difícil, eso es un acto de amor."},
    {lines:["Hay medicina en la pausa.","Antes del primer sorbo,","respira y recibe."], voice:"Hay medicina en la pausa. Antes del primer sorbo, respira y recibe."},
    {lines:["Lo que pones en tu cuerpo","se convierte en la energía con la que caminas.","Elige con cuidado."], voice:"Lo que pones en tu cuerpo se convierte en la energía con la que caminas. Elige con cuidado."},
    {lines:["La sanación no es lineal.","Pero aparecer cada día","es como sucede."], voice:"La sanación no es lineal. Pero aparecer cada día es como sucede."},
    {lines:["Esta es tu medicina.","No recetada por nadie más.","Sabías lo que necesitabas."], voice:"Esta es tu medicina. No recetada por nadie más. Sabías lo que necesitabas."},
    {lines:["El mundo seguirá moviéndose.","Esta taza no.","Por este momento, tú tampoco."], voice:"El mundo seguirá moviéndose. Esta taza no. Por este momento, tú tampoco."},
    {lines:["Deja que el calor llegue a los lugares tensos.","Los lugares retenidos.","Los lugares que aún sanan."], voice:"Deja que el calor llegue a los lugares tensos. Los lugares retenidos. Los lugares que aún sanan."},
    {lines:["Hoy, este es tu momento.","No se requiere ningún otro logro.","Solo esta taza. Solo tú."], voice:"Hoy, este es tu momento. No se requiere ningún otro logro. Solo esta taza. Solo tú."},
    {lines:["Algo se está asentando en ti ahora mismo.","No lo fuerces.","Deja que la taza haga su trabajo."], voice:"Algo se está asentando en ti ahora mismo. No lo fuerces. Deja que la taza haga su trabajo."},
    {lines:["La intención de hoy es simple:","preséntate por ti mismo","como te presentas por todos los demás."], voice:"La intención de hoy es simple: preséntate por ti mismo como te presentas por todos los demás."},
  ],
  fr: [
    {lines:["Vous êtes ici au bon moment.","Quelque chose en vous le sait déjà.","Commencez."], voice:"Vous êtes ici au bon moment. Quelque chose en vous le sait déjà. Commencez."},
    {lines:["Prenez un souffle avant cette tasse.","Vous vous nourrissez aujourd'hui.","C'est suffisant."], voice:"Prenez un souffle avant cette tasse. Vous vous nourrissez aujourd'hui. C'est suffisant."},
    {lines:["Le silence n'est pas vide.","Il est plein de tout ce dont vous avez besoin.","Recevez-le maintenant."], voice:"Le silence n'est pas vide. Il est plein de tout ce dont vous avez besoin. Recevez-le maintenant."},
    {lines:["Ce que votre corps demande,","ce mélange le sait déjà.","Faites confiance au rituel."], voice:"Ce que votre corps demande, ce mélange le sait déjà. Faites confiance au rituel."},
    {lines:["Ce moment vous appartient.","À personne d'autre. Juste vous.","Respirez."], voice:"Ce moment vous appartient. À personne d'autre. Juste vous. Respirez."},
    {lines:["La guérison a déjà commencé.","Vous avez choisi d'être présent.","C'est la pratique."], voice:"La guérison a déjà commencé. Vous avez choisi d'être présent. C'est la pratique."},
    {lines:["Vous êtes venu au bon endroit.","Tout ce dont vous avez besoin est ici.","Laissez-le entrer."], voice:"Vous êtes venu au bon endroit. Tout ce dont vous avez besoin est ici. Laissez-le entrer."},
    {lines:["Votre corps n'est pas brisé.","Il demande à être entendu.","Cette tasse c'est vous qui écoutez."], voice:"Votre corps n'est pas brisé. Il demande à être entendu. Cette tasse c'est vous qui écoutez."},
    {lines:["Le repos n'est pas une faiblesse.","C'est le sol où la guérison grandit.","Laissez-vous reposer aujourd'hui."], voice:"Le repos n'est pas une faiblesse. C'est le sol où la guérison grandit. Laissez-vous reposer aujourd'hui."},
    {lines:["Vous avez assez porté.","Pour ce moment, posez-le.","Le thé vous soutiendra."], voice:"Vous avez assez porté. Pour ce moment, posez-le. Le thé vous soutiendra."},
    {lines:["Ce que vous cultivez, pousse.","Ce que vous buvez avec intention, guérit.","Prenez soin de vous aujourd'hui."], voice:"Ce que vous cultivez, pousse. Ce que vous buvez avec intention, guérit. Prenez soin de vous aujourd'hui."},
    {lines:["La guérison n'est pas une destination.","C'est la décision que vous avez prise","quand vous avez rempli la bouilloire."], voice:"La guérison n'est pas une destination. C'est la décision que vous avez prise quand vous avez rempli la bouilloire."},
    {lines:["Vous êtes assez.","Exactement comme vous êtes.","Maintenant. En ce moment."], voice:"Vous êtes assez. Exactement comme vous êtes. Maintenant. En ce moment."},
    {lines:["Quelque chose d'ancien est dans cette tasse.","Des générations de guérisseurs","l'ont mis là pour vous."], voice:"Quelque chose d'ancien est dans cette tasse. Des générations de guérisseurs l'ont mis là pour vous."},
    {lines:["L'intention est déjà posée.","Votre corps sait déjà quoi faire.","Faites confiance à ce qui grandit."], voice:"L'intention est déjà posée. Votre corps sait déjà quoi faire. Faites confiance à ce qui grandit."},
    {lines:["Vous n'êtes pas en retard.","Vous êtes exactement à l'heure.","Le rituel commence maintenant."], voice:"Vous n'êtes pas en retard. Vous êtes exactement à l'heure. Le rituel commence maintenant."},
    {lines:["Inspirez ce dont vous avez besoin.","Expirez ce qui ne vous sert plus.","Cette tasse porte les deux."], voice:"Inspirez ce dont vous avez besoin. Expirez ce qui ne vous sert plus. Cette tasse porte les deux."},
    {lines:["Vos ancêtres savaient quelque chose","que la science est encore en train de rattraper.","Vous en êtes la preuve vivante."], voice:"Vos ancêtres savaient quelque chose que la science est encore en train de rattraper. Vous en êtes la preuve vivante."},
    {lines:["Les petits rituels construisent de grandes vies.","Cette tasse n'est pas petite.","C'est tout."], voice:"Les petits rituels construisent de grandes vies. Cette tasse n'est pas petite. C'est tout."},
    {lines:["Le corps parle avant l'esprit.","Votre envie de cette tasse","était déjà une prière."], voice:"Le corps parle avant l'esprit. Votre envie de cette tasse était déjà une prière."},
    {lines:["Vous avez choisi le bien-être aujourd'hui.","Dans un monde qui le rend difficile,","c'est un acte d'amour."], voice:"Vous avez choisi le bien-être aujourd'hui. Dans un monde qui le rend difficile, c'est un acte d'amour."},
    {lines:["Il y a de la médecine dans la pause.","Avant la première gorgée,","respirez et recevez."], voice:"Il y a de la médecine dans la pause. Avant la première gorgée, respirez et recevez."},
    {lines:["Ce que vous mettez dans votre corps","devient l'énergie avec laquelle vous marchez.","Choisissez avec soin."], voice:"Ce que vous mettez dans votre corps devient l'énergie avec laquelle vous marchez. Choisissez avec soin."},
    {lines:["La guérison n'est pas linéaire.","Mais se présenter chaque jour","c'est comment elle se produit."], voice:"La guérison n'est pas linéaire. Mais se présenter chaque jour c'est comment elle se produit."},
    {lines:["C'est votre médecine.","Pas prescrite par quelqu'un d'autre.","Vous saviez ce dont vous aviez besoin."], voice:"C'est votre médecine. Pas prescrite par quelqu'un d'autre. Vous saviez ce dont vous aviez besoin."},
    {lines:["Le monde continuera de bouger.","Cette tasse non.","Pour ce moment, vous non plus."], voice:"Le monde continuera de bouger. Cette tasse non. Pour ce moment, vous non plus."},
    {lines:["Laissez la chaleur atteindre les endroits tendus.","Les endroits retenus.","Les endroits qui guérissent encore."], voice:"Laissez la chaleur atteindre les endroits tendus. Les endroits retenus. Les endroits qui guérissent encore."},
    {lines:["Aujourd'hui, c'est votre moment.","Aucune autre réalisation n'est requise.","Juste cette tasse. Juste vous."], voice:"Aujourd'hui, c'est votre moment. Aucune autre réalisation n'est requise. Juste cette tasse. Juste vous."},
    {lines:["Quelque chose se stabilise en vous maintenant.","Ne le forcez pas.","Laissez la tasse faire son travail."], voice:"Quelque chose se stabilise en vous maintenant. Ne le forcez pas. Laissez la tasse faire son travail."},
    {lines:["L'intention d'aujourd'hui est simple:","soyez présent pour vous-même","comme vous l'êtes pour les autres."], voice:"L'intention d'aujourd'hui est simple: soyez présent pour vous-même comme vous l'êtes pour les autres."},
  ],
};

function getIntention(idx, lang) {
  if (!lang || lang === 'en') return INTENTIONS[idx % INTENTIONS.length];
  const trans = INTENTION_TRANS[lang];
  if (!trans) return INTENTIONS[idx % INTENTIONS.length];
  return trans[idx % trans.length];
}

function getDailyIntention(lang) {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return getIntention(day, lang);
}

let audioCtx = null;

function playBowl(soft = false) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    const tone = (freq, amp, dur, start = 0) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 3200;
      o.type = "sine";
      o.frequency.setValueAtTime(freq, now + start);
      g.gain.setValueAtTime(0, now + start);
      g.gain.linearRampToValueAtTime(amp * (soft ? 0.55 : 1), now + start + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      o.connect(f); f.connect(g); g.connect(ctx.destination);
      o.start(now + start); o.stop(now + start + dur + 0.1);
    };
    tone(432, 0.26, 5.5); tone(864, 0.09, 4.5, 0.03);
    tone(1296, 0.045, 3.5, 0.06); tone(648, 0.08, 4.8, 0.09);
    tone(528, 0.04, 3.0, 0.3);
    if (!soft) { tone(432, 0.11, 4.0, 2.4); tone(864, 0.045, 3.2, 2.5); }
  } catch (_) {}
}

const RAILWAY_URL = "https://web-production-4c84.up.railway.app";

async function speakIntention(text) {
  try {
    const res = await fetch(`${RAILWAY_URL}/speak-intention`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: "alloy" }),
    });
    if (!res.ok) throw new Error("TTS fetch failed");
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    // iOS requires play() inside a user gesture — we're inside onRingTap so this is safe
    await audio.play();
  } catch (err) {
    // Graceful fallback to browser TTS if Railway is unavailable
    console.warn("OpenAI TTS unavailable, falling back to browser voice:", err);
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.78; utt.pitch = 0.92; utt.volume = 0.88;
    const voices = synth.getVoices();
    const preferred = ["Samantha","Karen","Moira","Fiona","Victoria","Google UK English Female","Microsoft Zira"];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name));
      if (v) { utt.voice = v; break; }
    }
    synth.speak(utt);
  }
}

export default function PrayerSection({ onNavigate, T: TT, lang }) {
  // Use passed T or fallback to English strings
  const t = (key, fallback) => (TT && TT[key]) ? TT[key] : fallback;
  // phase: 0=idle, 1=hands tapped, 1.5=ring moment visible, 2=ring tapped
  const [phase, setPhase]           = useState(0);
  const [chosen, setChosen]         = useState(null);
  const [firing, setFiring]         = useState(false);
  const [ringFired, setRingFired]   = useState(false);
  const [showBlend, setShowBlend]   = useState(false);
  const [showTone, setShowTone]     = useState(false);
  const [showReset, setShowReset]   = useState(false);
  const [todayBlend, setTodayBlend] = useState(null);
  const [activated, setActivated]   = useState(false);
  const particlesRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.getVoices();
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => synth.getVoices();
    }
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function after(ms, fn) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }

  function spawnParticles(colors, count = 22, spread = 90) {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "rp";
      const ang = Math.random() * Math.PI * 2;
      const r   = spread * 0.5 + Math.random() * spread;
      const ex  = Math.cos(ang) * r;
      const ey  = Math.sin(ang) * r - Math.random() * 30;
      const sz  = 2 + Math.random() * 3.5;
      const dl  = Math.random() * 0.35;
      const d   = 0.7 + Math.random() * 0.7;
      const col = colors[Math.floor(Math.random() * colors.length)];
      el.style.cssText = `position:absolute;top:50%;left:50%;border-radius:50%;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 ${sz*2}px ${col};--sx:0px;--sy:0px;--ex:${ex}px;--ey:${ey}px;--d:${d}s;--dl:${dl}s;`;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dl + d + 0.1) * 1000 + 200);
    }
  }

  const [speakLoading, setSpeakLoading] = useState(false);

  // Speak immediately on first tap — bowl + particles + voice all at once
  function onHandsTap() {
    if (phase !== 0) return;
    const pick = getDailyIntention(lang);
    setChosen(pick);
    setFiring(true);
    setActivated(true);
    setSpeakLoading(true);
    playBowl(false);
    spawnParticles(["#c08830","#deb96a","#52b882","#a8e0c0","#fff8e8"], 24, 95);
    after(80, () => setPhase(1));
    after(600, () => setPhase(1.5)); // show ring faster — no long wait
    // Speak immediately — iOS audio policy is satisfied by this user gesture
    speakIntention(pick.voice).finally(() => {
      setSpeakLoading(false);
      // After voice finishes, show blend and reset
      setTodayBlend(getDailyBlend());
      after(200, () => setShowBlend(true));
      after(1800, () => setShowReset(true));
    });
  }

  // Ring press = replay the affirmation
  function onRingTap() {
    if (phase < 1.5) return;
    if (speakLoading) return; // already speaking
    setRingFired(true);
    setSpeakLoading(true);
    spawnParticles(["#f5d080","#c08830","#deb96a","#fff8e0"], 18, 70);
    playBowl(true);
    if (chosen) {
      speakIntention(chosen.voice).finally(() => {
        setSpeakLoading(false);
        setShowTone(true);
        after(400, () => { setTodayBlend(getDailyBlend()); setShowBlend(true); });
        after(2000, () => setShowReset(true));
      });
    }
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setPhase(0); setChosen(null); setFiring(false); setRingFired(false);
    setShowBlend(false); setShowTone(false); setShowReset(false); setTodayBlend(null);
    setActivated(false); setSpeakLoading(false);
    if (particlesRef.current) particlesRef.current.innerHTML = "";
  }

  const idleHidden      = phase >= 1;
  const intentionShow   = phase >= 1;
  const showRingMoment  = phase >= 1.5;
  const voiceShow       = phase === 2;

  const todayBlendPreview = getDailyBlend();
  const SIDE_LEFT = [
    { emoji:"🌙", name:"Deep Sleep & Calm", benefit:"Calms the nervous system for deep, restorative sleep" },
    { emoji:"⚡", name:"Adaptogen Energy", benefit:"Builds stress resilience without stimulants" },
    { emoji:"🌿", name:"Gut Healing Blend", benefit:"Repairs the gut lining — ideal for IBS" },
  ];
  const SIDE_RIGHT = [
    { emoji:"❤️", name:"Heart & Circulation", benefit:"Strengthens the heart, lowers blood pressure naturally" },
    { emoji:"🧠", name:"Focus & Clarity", benefit:"Sharpens concentration without caffeine jitters" },
    { emoji:"🛡️", name:"Immune Defense", benefit:"Builds immune resilience from the inside out" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');

        .rs-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #0a1e14 0%, #0f2418 40%, #0d1c10 100%);
          border-top: 1px solid rgba(82,184,130,.1);
          border-bottom: 1px solid rgba(82,184,130,.1);
          margin: 0;
          padding: 80px 0 72px;
        }
        .rs-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(82,184,130,.09) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 15% 50%, rgba(192,136,48,.06) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 85% 50%, rgba(192,136,48,.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(192,136,48,.04) 0%, transparent 60%);
          pointer-events: none;
          animation: rs-ambientShift 8s ease-in-out infinite alternate;
        }
        @keyframes rs-ambientShift {
          from { opacity:.7; transform:scale(1); }
          to   { opacity:1;  transform:scale(1.06); }
        }

        /* ── SECTION HEADER ── */
        .rs-header {
          text-align: center;
          padding: 0 24px 48px;
          position: relative; z-index: 1;
        }
        .rs-header-eye {
          font-family: 'Cinzel', serif;
          font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
          color: rgba(82,184,130,.7); margin-bottom: 12px;
        }
        .rs-header-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 300; color: #fff;
          line-height: 1.25; margin: 0 0 10px;
        }
        .rs-header-sub {
          font-size: 14px; color: rgba(255,255,255,.38);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; line-height: 1.6;
          max-width: 420px; margin: 0 auto;
        }

        /* ── DAILY BLEND TEASER — visible always ── */
        .rs-daily-teaser {
          display: flex; align-items: center; gap: 10px;
          background: rgba(192,136,48,.08);
          border: 1px solid rgba(192,136,48,.2);
          border-radius: 40px; padding: 8px 16px;
          max-width: 360px; margin: 16px auto 0;
          cursor: default;
        }
        .rs-daily-teaser-emoji { font-size: 1.1rem; }
        .rs-daily-teaser-text {
          font-size: 11px; color: rgba(192,136,48,.8);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; line-height: 1.4;
        }
        .rs-daily-teaser-text strong { color: rgba(192,136,48,.95); font-style: normal; font-size: 12px; }

        /* ── FULL WIDTH INTERACTION AREA ── */
        .rs-content-wrap {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 0 28px;
          display: grid;
          grid-template-columns: 1fr minmax(0,700px) 1fr;
          gap: 24px;
          align-items: center;
        }

        /* ── AMBIENT SIDE CARDS ── */
        .rs-side-cards {
          display: flex; flex-direction: column; gap: 10px;
        }
        .rs-side-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px; padding: 12px 14px;
          transition: all .3s;
        }
        .rs-side-card:hover { background: rgba(255,255,255,.06); border-color: rgba(192,136,48,.2); }
        .rs-side-card-emoji { font-size: 1.2rem; margin-bottom: 5px; }
        .rs-side-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; color: rgba(255,255,255,.65);
          line-height: 1.3; margin-bottom: 4px;
        }
        .rs-side-card-benefit {
          font-size: 10px; color: rgba(255,255,255,.3);
          line-height: 1.4;
        }
        .rs-side-right { text-align: right; }
        .rs-side-right .rs-side-card { text-align: right; }

        @media (max-width: 900px) {
          .rs-side-cards { display: none; }
          .rs-content-wrap { grid-template-columns: 1fr; }
        }

        /* ── PARTICLES ── */
        .rs-particles {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden; z-index: 3;
        }
        .rp { position: absolute; border-radius: 50%; opacity: 0; animation: rs-pFly var(--d,.9s) ease-out var(--dl,0s) both; }
        @keyframes rs-pFly {
          0%   { opacity:.9;  transform:translate(0,0) scale(1.3); }
          100% { opacity:0;   transform:translate(var(--ex,0),var(--ey,0)) scale(0); }
        }

        /* ── WAVE ── */
        .rs-wave {
          position: absolute; top: 10px; right: 10px;
          display: flex; align-items: center; gap: 3px;
          opacity: 0; z-index: 5;
          transition: opacity .5s ease;
        }
        .rs-wave.show { opacity: 1; }
        .rs-wbar { width:3px; border-radius:2px; background:rgba(192,136,48,.55); }
        .rs-wbar:nth-child(1) { height:7px;  animation:rs-wv .75s .00s ease-in-out infinite alternate; }
        .rs-wbar:nth-child(2) { height:13px; animation:rs-wv .75s .12s ease-in-out infinite alternate; }
        .rs-wbar:nth-child(3) { height:19px; animation:rs-wv .75s .24s ease-in-out infinite alternate; }
        .rs-wbar:nth-child(4) { height:13px; animation:rs-wv .75s .36s ease-in-out infinite alternate; }
        .rs-wbar:nth-child(5) { height:7px;  animation:rs-wv .75s .48s ease-in-out infinite alternate; }
        @keyframes rs-wv {
          from { transform:scaleY(.3); opacity:.3; }
          to   { transform:scaleY(1);  opacity:.9; }
        }

        /* ══ LEFT SIDE: HANDS (idle) ══ */
        .rs-orbit-stage {
          position: relative;
          width: 140px; height: 140px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: opacity .5s ease, transform .5s ease;
        }
        .rs-orbit-stage.hide { opacity:0; transform:scale(.85); pointer-events:none; }

        .rs-orbit {
          position: absolute; top:50%; left:50%;
          transform: translate(-50%,-50%);
          border-radius: 50%; pointer-events: none;
        }
        .rs-or1 { width:86px;  height:86px;  border:1.5px solid rgba(74,160,120,.4);  animation:rs-orb 4.2s ease-in-out 0s   infinite; }
        .rs-or2 { width:110px; height:110px; border:1px solid rgba(74,160,120,.25);  animation:rs-orb 4.2s ease-in-out .75s infinite; }
        .rs-or3 { width:134px; height:134px; border:1px solid rgba(74,160,120,.12);  animation:rs-orb 4.2s ease-in-out 1.5s infinite; }
        @keyframes rs-orb {
          0%   { transform:translate(-50%,-50%) scale(1);    opacity:0; }
          20%  { opacity:.8; }
          100% { transform:translate(-50%,-50%) scale(1.22); opacity:0; }
        }

        .rs-gold-dot {
          position: absolute; top:50%; left:50%;
          transform: translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:radial-gradient(circle,rgba(74,160,120,.9),rgba(40,120,80,.8));
          box-shadow:0 0 10px 4px rgba(74,160,120,.45);
          animation:rs-dotPulse 3.2s ease-in-out infinite;
          pointer-events:none; z-index:2;
          opacity:0; /* hidden — lotus is the centrepiece, dot was for hands */
        }
        @keyframes rs-dotPulse {
          0%,100% { box-shadow:0 0 8px 3px rgba(192,136,48,.35); opacity:.7; }
          50%     { box-shadow:0 0 16px 7px rgba(192,136,48,.6);  opacity:1; }
        }

        .rs-hands {
          position: absolute; top:50%; left:50%;
          transform: translate(-50%,-50%);
          font-size: 52px; line-height:1; display:block; user-select:none;
          filter:drop-shadow(0 2px 8px rgba(0,0,0,.45)) drop-shadow(0 0 16px rgba(192,136,48,.2));
          animation:rs-handsFloat 5s ease-in-out infinite;
          transition:filter .3s ease; z-index:1;
        }
        @keyframes rs-handsFloat {
          0%,100% { transform:translate(-50%,-50%) translateY(0); }
          50%     { transform:translate(-50%,-50%) translateY(-6px); }
        }
        .rs-orbit-stage:hover .rs-hands {
          filter:drop-shadow(0 3px 12px rgba(0,0,0,.5)) drop-shadow(0 0 28px rgba(192,136,48,.45));
          animation-play-state:paused;
        }

        /* ── TAP HINT ── */
        .rs-tap-hint {
          position: absolute;
          bottom: -26px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 11.5px;
          font-style: italic;
          font-weight: 300;
          letter-spacing: .12em;
          color: rgba(192,136,48,.7);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity .35s ease;
          z-index: 5;
        }
        /* Show on hover — desktop */
        .rs-orbit-stage:hover .rs-tap-hint { opacity: 1; }
        /* Hide permanently after first tap */
        .rs-orbit-stage.activated .rs-tap-hint { opacity: 0 !important; pointer-events: none; }

        /* Mobile — show briefly on load as a one-time nudge */
        @media (hover: none) {
          .rs-tap-hint { animation: rs-hintNudge 3s ease 1.5s both; }
          @keyframes rs-hintNudge {
            0%   { opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { opacity: 0; }
          }
        }

        .rs-burst {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          border-radius:50%; pointer-events:none; opacity:0;
        }
        .rs-br1 { width:70px;  height:70px;  border:2px solid rgba(192,136,48,.7); }
        .rs-br2 { width:70px;  height:70px;  border:2px solid rgba(82,184,130,.55); }
        .rs-br3 { width:100px; height:100px; border:1.5px solid rgba(192,136,48,.4); }
        .rs-br4 { width:130px; height:130px; border:1px solid rgba(255,255,255,.18); }
        .rs-orbit-stage.firing .rs-br1 { animation:rs-bRing .85s ease-out .00s both; }
        .rs-orbit-stage.firing .rs-br2 { animation:rs-bRing .85s ease-out .13s both; }
        .rs-orbit-stage.firing .rs-br3 { animation:rs-bRing .85s ease-out .26s both; }
        .rs-orbit-stage.firing .rs-br4 { animation:rs-bRing .85s ease-out .40s both; }
        @keyframes rs-bRing {
          0%   { opacity:.9; transform:translate(-50%,-50%) scale(.45); }
          100% { opacity:0;  transform:translate(-50%,-50%) scale(2.6); }
        }
        .rs-orbit-stage.firing .rs-hands {
          animation:rs-handsPop .55s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes rs-handsPop {
          0%  { transform:translate(-50%,-50%) scale(1); }
          38% { transform:translate(-50%,-50%) scale(.87); }
          68% { transform:translate(-50%,-50%) scale(1.12); filter:drop-shadow(0 4px 14px rgba(0,0,0,.5)) drop-shadow(0 0 40px rgba(192,136,48,.75)); }
          100%{ transform:translate(-50%,-50%) scale(1); }
        }

        /* ══ LEFT SIDE: RING (phase 1.5+) ══ */
        .rs-ring-wrap {
          position: absolute; top:0; left:0;
          width:140px; height:140px;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:scale(.8);
          pointer-events:none;
          transition:opacity .7s ease, transform .7s cubic-bezier(.34,1.2,.64,1);
        }
        .rs-ring-wrap.show { opacity:1; transform:scale(1); pointer-events:all; }

        .rs-ring-icon {
          position:relative; width:80px; height:80px;
          cursor:pointer; -webkit-tap-highlight-color:transparent;
        }
        .rs-ring-glow {
          position:absolute; inset:-8px; border-radius:50%;
          background:radial-gradient(circle,rgba(192,136,48,.15),transparent 70%);
          animation:rs-ringGlow 2.5s ease-in-out infinite;
        }
        @keyframes rs-ringGlow {
          0%,100% { transform:scale(1);    opacity:.6; }
          50%     { transform:scale(1.15); opacity:1; }
        }
        .rs-ring-svg {
          width:80px; height:80px;
          animation:rs-ringFloat 4s ease-in-out infinite;
          filter:drop-shadow(0 2px 8px rgba(0,0,0,.4)) drop-shadow(0 0 18px rgba(192,136,48,.35));
          transition:filter .3s ease;
        }
        @keyframes rs-ringFloat {
          0%,100% { transform:translateY(0) rotate(-6deg); }
          50%     { transform:translateY(-5px) rotate(6deg); }
        }
        .rs-ring-icon:hover .rs-ring-svg {
          filter:drop-shadow(0 3px 12px rgba(0,0,0,.5)) drop-shadow(0 0 28px rgba(192,136,48,.6));
          animation-play-state:paused;
        }
        .rs-rburst {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          border-radius:50%; pointer-events:none; opacity:0;
        }
        .rs-rb1 { width:70px;  height:70px;  border:2px solid rgba(192,136,48,.8); }
        .rs-rb2 { width:100px; height:100px; border:1.5px solid rgba(192,136,48,.5); }
        .rs-rb3 { width:140px; height:140px; border:1px solid rgba(192,136,48,.3); }
        .rs-ring-wrap.fired .rs-rb1 { animation:rs-bRing .7s ease-out .00s both; }
        .rs-ring-wrap.fired .rs-rb2 { animation:rs-bRing .7s ease-out .12s both; }
        .rs-ring-wrap.fired .rs-rb3 { animation:rs-bRing .7s ease-out .24s both; }

        /* ══ RIGHT SIDE ══ */

        .rs-right-panels {
          position: relative;
          width: 100%;
        }

        .rs-panel {
          width: 100%;
          display: flex; flex-direction: column; align-items: flex-start;
          transition: opacity .45s ease, transform .45s ease;
        }
        .rs-panel.hidden {
          position: absolute; top: 0; left: 0;
          opacity: 0; pointer-events: none;
          transform: translateY(-8px);
        }

        .rs-eyebrow {
          font-family:'Cinzel',serif;
          font-size:9px; letter-spacing:.42em;
          color:rgba(192,136,48,.4); text-transform:uppercase;
          margin-bottom:8px;
          animation:rs-fadeDown .9s ease both;
        }
        .rs-invite {
          font-family:'Cormorant Garamond',serif;
          font-size:14.5px; font-style:italic;
          color:rgba(255,255,255,.28); letter-spacing:.05em; line-height:1.6;
          animation:rs-fadeUp 1s ease .5s both;
        }

        /* Intention lines */
        .rs-ic-rule {
          width:0; height:1px;
          background:linear-gradient(90deg,transparent,#c08830,transparent);
          margin-bottom:12px;
          transition:width 1s ease .3s;
        }
        .rs-panel-intention:not(.hidden) .rs-ic-rule { width:80px; }

        .rs-ic-line {
          font-family:'Cormorant Garamond',serif;
          font-size:16px; font-style:italic; font-weight:300;
          color:rgba(255,255,255,0); line-height:1.7; display:block;
          transition:color .7s ease;
        }
        .rs-panel-intention:not(.hidden) .rs-ic-l1 { color:rgba(255,255,255,.85); transition-delay:.5s; }
        .rs-panel-intention:not(.hidden) .rs-ic-l2 { color:rgba(255,255,255,.68); transition-delay:.75s; }
        .rs-panel-intention:not(.hidden) .rs-ic-l3 { color:rgba(255,255,255,.55); transition-delay:1.0s; }

        .rs-ic-rule-2 {
          width:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
          margin-top:12px;
          transition:width .8s ease 1.3s;
        }
        .rs-panel-intention:not(.hidden) .rs-ic-rule-2 { width:44px; }

        .rs-ring-cue {
          font-family:'Cinzel',serif;
          font-size:8px; letter-spacing:.35em; text-transform:uppercase;
          color:rgba(192,136,48,.5); margin-bottom:7px;
        }
        .rs-ring-headline {
          font-family:'Cormorant Garamond',serif;
          font-size:17px; font-weight:300; font-style:italic;
          color:rgba(255,255,255,.78); line-height:1.5; margin-bottom:4px;
        }
        .rs-ring-sub {
          font-family:'Cormorant Garamond',serif;
          font-size:13px; font-style:italic;
          color:rgba(255,255,255,.3); line-height:1.55;
        }

        /* Voice line */
        .rs-voice {
          margin-top:10px;
          font-family:'Cormorant Garamond',serif;
          font-size:14px; font-style:italic; font-weight:300;
          color:transparent; line-height:1.65;
          transition:color .8s ease;
        }
        .rs-voice.show { color:rgba(255,255,255,.65); }

        /* Daily blend card */
        .rs-blend-card {
          margin-top:14px;
          width:100%;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(192,136,48,.2);
          border-radius:12px;
          overflow:hidden;
          opacity:0; transform:translateY(10px); pointer-events:none;
          transition:opacity .8s ease, transform .8s cubic-bezier(.34,1.2,.64,1);
        }
        .rs-blend-card.show { opacity:1; transform:translateY(0); pointer-events:all; }

        .rs-dbc-accent {
          height:2px; width:100%;
          background:linear-gradient(90deg,transparent,#c08830,transparent);
        }
        .rs-dbc-inner {
          padding:14px 16px 16px;
          display:flex; flex-direction:column; align-items:flex-start; gap:0;
        }
        .rs-dbc-eyebrow {
          font-family:'Cinzel',serif; font-size:7.5px;
          letter-spacing:.35em; text-transform:uppercase;
          color:rgba(192,136,48,.5); margin-bottom:10px;
          align-self:center;
        }
        .rs-dbc-top {
          display:flex; align-items:center; gap:10px; margin-bottom:8px; width:100%;
        }
        .rs-dbc-emoji { font-size:28px; line-height:1; flex-shrink:0; filter:drop-shadow(0 2px 6px rgba(0,0,0,.3)); }
        .rs-dbc-text { flex:1; }
        .rs-dbc-part {
          font-family:'Cinzel',serif; font-size:7px;
          letter-spacing:.18em; color:rgba(255,255,255,.28);
          text-transform:uppercase; margin-bottom:3px;
        }
        .rs-dbc-name {
          font-family:'Cormorant Garamond',serif;
          font-size:14px; font-weight:600;
          color:rgba(255,255,255,.88); line-height:1.2;
        }
        .rs-dbc-rule { width:100%; height:1px; background:rgba(255,255,255,.06); margin:8px 0; }
        .rs-dbc-benefit {
          font-family:'Cormorant Garamond',serif;
          font-size:12.5px; font-style:italic;
          color:rgba(255,255,255,.4); line-height:1.55;
          margin-bottom:12px; text-align:center; align-self:center;
        }
        .rs-dbc-btn {
          font-family:'Cinzel',serif; font-size:8px; font-weight:600;
          letter-spacing:.2em; text-transform:uppercase;
          color:#deb96a;
          background:rgba(192,136,48,.1);
          border:1px solid rgba(192,136,48,.25);
          border-radius:16px; padding:8px 18px;
          cursor:pointer; text-decoration:none; display:inline-block;
          transition:all .2s ease; align-self:center;
        }
        .rs-dbc-btn:hover { background:rgba(192,136,48,.2); border-color:rgba(192,136,48,.48); transform:translateY(-1px); }

        /* Closing tone dot */
        .rs-closing-tone {
          width:5px; height:5px; border-radius:50%;
          background:rgba(192,136,48,.5);
          margin-top:8px; align-self:center;
          opacity:0; box-shadow:0 0 7px 3px rgba(192,136,48,.3);
          transition:opacity .4s ease;
          animation:rs-tonePulse 2s ease-in-out infinite;
        }
        .rs-closing-tone.show { opacity:1; }
        @keyframes rs-tonePulse {
          0%,100% { transform:scale(1);   opacity:.5; }
          50%     { transform:scale(1.4); opacity:.9; }
        }

        /* Reset */
        .rs-reset {
          font-family:'Cinzel',serif; font-size:8px;
          letter-spacing:.26em; text-transform:uppercase;
          color:rgba(255,255,255,.14); background:none; border:none;
          cursor:pointer; padding:8px 0; margin-top:8px;
          opacity:0; pointer-events:none;
          transition:opacity .4s ease, color .2s ease;
          align-self:flex-start;
        }
        .rs-reset.show { opacity:1; pointer-events:all; }
        .rs-reset:hover { color:rgba(255,255,255,.4); }

        @keyframes rs-fadeDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rs-fadeUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @keyframes rs-orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rs-hands-breathe {
          0%,100% { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(192,136,48,.5)); }
          50%     { transform: scale(1.08); filter: drop-shadow(0 0 14px rgba(192,136,48,.85)); }
        }
        @keyframes rs-lotus-breathe {
          0%,100% { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(74,160,120,.5)); }
          50%     { transform: scale(1.08); filter: drop-shadow(0 0 14px rgba(74,160,120,.9)); }
        }
        @keyframes rs-ring-pulse {
          0%   { transform: scale(1);    opacity: .7; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @media (max-width: 480px) {
          .rs-row { gap:18px; padding:0 16px; }
          .rs-orbit-stage, .rs-ring-wrap { width:110px; height:110px; }
          .rs-or1 { width:56px; height:56px; }
          .rs-or2 { width:76px; height:76px; }
          .rs-or3 { width:96px; height:96px; }
          .rs-hands { font-size:42px; }
          .rs-ring-svg { width:64px; height:64px; }
          .rs-ring-icon { width:64px; height:64px; }
        }
      `}</style>

      <section className="rs-section">
        <div className="rs-particles" ref={particlesRef} />

        <div className={`rs-wave${phase >= 1 ? " show" : ""}`}>
          <div className="rs-wbar"/><div className="rs-wbar"/><div className="rs-wbar"/>
          <div className="rs-wbar"/><div className="rs-wbar"/>
        </div>

        {/* ── SECTION HEADER ── */}
        <div className="rs-header">
          <div className="rs-header-eye">✦ &nbsp; Chai Holistic · Daily Ritual &nbsp; ✦</div>
          <h2 className="rs-header-h">A moment before you begin.<br/><em>Your affirmation. Your blend.</em></h2>
          <p className="rs-header-sub">Touch the praying hands to receive today's affirmation. Then touch your Vibe Shift Ring — and press the floating icon on screen — to hear your intention spoken to you.</p>
          <div className="rs-daily-teaser">
            <span className="rs-daily-teaser-emoji">{todayBlendPreview.emoji}</span>
            <span className="rs-daily-teaser-text">
              Today's blend — <strong>{todayBlendPreview.name}</strong>
            </span>
          </div>
        </div>

        {/* ── FULL CONTENT AREA ── */}
        <div className="rs-content-wrap">

          {/* Left ambient cards */}
          <div className="rs-side-cards">
            {SIDE_LEFT.map(c=>(
              <div key={c.name} className="rs-side-card"
                onClick={() => onNavigate && onNavigate(c.name)}
                style={{cursor:"pointer"}}>
                <div className="rs-side-card-emoji">{c.emoji}</div>
                <div className="rs-side-card-name">{c.name}</div>
                <div className="rs-side-card-benefit">{c.benefit}</div>
                <div style={{marginTop:8,fontSize:"9px",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(192,136,48,.5)",fontFamily:"'Cinzel',serif"}}>See Recipe →</div>
              </div>
            ))}
          </div>

          {/* Centre interaction */}
          <div className="rs-row">

          {/* ── LEFT COLUMN ── */}
          <div className="rs-left">

            {/* Hands orbit (idle) */}
            <div
              className={`rs-orbit-stage${firing ? " firing" : ""}${idleHidden ? " hide" : ""}${activated ? " activated" : ""}`}
              role="button" tabIndex={0}
              aria-label="Tap to receive your affirmation"
              aria-pressed={phase > 0}
              onClick={onHandsTap}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onHandsTap(); } }}
            >
              <div className="rs-orbit rs-or1" style={{borderColor:"rgba(74,160,120,.35)"}}/>
              <div className="rs-orbit rs-or2" style={{borderColor:"rgba(74,160,120,.2)"}}/>
              <div className="rs-orbit rs-or3" style={{borderColor:"rgba(74,160,120,.15)"}}/>
              <div className="rs-burst rs-br1"/>
              <div className="rs-burst rs-br2"/>
              <div className="rs-burst rs-br3"/>
              <div className="rs-burst rs-br4"/>

              <span className="rs-hands" style={{filter:"drop-shadow(0 0 12px rgba(74,160,120,.7))",animation:"rs-lotus-breathe 3.5s ease-in-out infinite"}}>🪷</span>
              <span className="rs-tap-hint">✦ tap the lotus to receive your affirmation</span>
            </div>

            {/* Ring (phase 1.5+) */}
            <div className={`rs-ring-wrap${showRingMoment ? " show" : ""}${ringFired ? " fired" : ""}`}>
              <div
                className="rs-ring-icon"
                role="button" tabIndex={0}
                aria-label="Tap to replay your affirmation"
                aria-pressed={phase === 2}
                onClick={onRingTap}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRingTap(); } }}
              >
                <div className="rs-ring-glow"/>
                <div className="rs-rburst rs-rb1"/>
                <div className="rs-rburst rs-rb2"/>
                <div className="rs-rburst rs-rb3"/>
                {/* Prayer hands inside gold rotating ring */}
                <div style={{position:"relative",width:80,height:80,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {/* Outer gold rotating orbit */}
                  <div style={{position:"absolute",inset:-8,borderRadius:"50%",border:"2.5px solid transparent",borderTopColor:"rgba(74,160,120,.9)",borderRightColor:"rgba(74,160,120,.3)",animation:"rs-orbit-spin 3s linear infinite"}}/>
                  <div style={{position:"absolute",inset:-15,borderRadius:"50%",border:"1.5px solid transparent",borderBottomColor:"rgba(74,160,120,.4)",borderLeftColor:"rgba(74,160,120,.15)",animation:"rs-orbit-spin 6s linear infinite reverse"}}/>
                  {/* Gold pulse rings */}
                  <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid rgba(74,160,120,.4)",animation:"rs-ring-pulse 2s ease-out infinite"}}/>
                  <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid rgba(74,160,120,.2)",animation:"rs-ring-pulse 2s ease-out infinite .65s"}}/>
                  {/* Gold circle background */}
                  <div style={{position:"relative",zIndex:1,width:72,height:72,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%, rgba(120,220,180,.18) 0%, rgba(74,160,120,.14) 50%, rgba(4,20,12,.75) 100%)",border:"2px solid rgba(74,160,120,.65)",boxShadow:"0 0 20px rgba(74,160,120,.4), 0 0 40px rgba(74,160,120,.18)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:32,filter:"drop-shadow(0 0 10px rgba(74,160,120,.7))",animation:"rs-lotus-breathe 3.5s ease-in-out infinite"}}>🪷</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="rs-right">
            <div className="rs-right-panels">

              {/* Panel 0: Idle */}
              <div className={`rs-panel rs-panel-idle${idleHidden ? " hidden" : ""}`}>
                <div className="rs-eyebrow">A moment before you begin</div>
                <div className="rs-invite">
                  Touch your hands together.<br/>
                  Breathe. Receive your intention.
                </div>
              </div>

              {/* Panel 1: Intention */}
              <div className={`rs-panel rs-panel-intention${intentionShow && !showRingMoment ? "" : " hidden"}`}>
                <div className="rs-ic-rule"/>
                <span className="rs-ic-line rs-ic-l1">{chosen?.lines[0]}</span>
                <span className="rs-ic-line rs-ic-l2">{chosen?.lines[1]}</span>
                <span className="rs-ic-line rs-ic-l3">{chosen?.lines[2]}</span>
                <div className="rs-ic-rule-2"/>
              </div>

              {/* Panel 2: Ring moment */}
              <div className={`rs-panel rs-panel-ring${showRingMoment ? "" : " hidden"}`}>
                <div className="rs-ring-cue">✦ &nbsp; Now carry it with you &nbsp; ✦</div>
                <div className="rs-ring-headline">
                  Your affirmation is being spoken.<br/>
                  <span style={{fontSize:"14px",color:"rgba(255,255,255,.45)"}}>Press the ring icon to hear it again.</span>
                </div>
                <div className="rs-ring-sub">
                  Your affirmation, spoken and sealed.<br/>
                  Carry it with you today.
                </div>

                <div className={`rs-voice${voiceShow ? " show" : ""}`}>
                  {chosen && voiceShow ? (
                    speakLoading
                      ? <span style={{fontSize:"12px",color:"rgba(255,255,255,.35)",fontStyle:"normal",letterSpacing:".08em"}}>✦ &nbsp; Preparing your affirmation…</span>
                      : `"${chosen.voice}"`
                  ) : ""}
                </div>

                {todayBlend && (
                  <div className={`rs-blend-card${showBlend ? " show" : ""}`}>
                    <div className="rs-dbc-accent"/>
                    <div className="rs-dbc-inner">
                      <div className="rs-dbc-eyebrow">✦ &nbsp; Today's blend for you &nbsp; ✦</div>
                      <div className="rs-dbc-top">
                        <span className="rs-dbc-emoji">{todayBlend.emoji}</span>
                        <div className="rs-dbc-text">
                          <div className="rs-dbc-part">{todayBlend.part}</div>
                          <div className="rs-dbc-name">{todayBlend.name}</div>
                        </div>
                      </div>
                      <div className="rs-dbc-rule"/>
                      <div className="rs-dbc-benefit">{todayBlend.benefit}</div>
                      <button
                        className="rs-dbc-btn"
                        onClick={() => onNavigate && onNavigate(todayBlend.name)}
                      >
                        See Full Recipe &rarr;
                      </button>
                    </div>
                  </div>
                )}

                <div className={`rs-closing-tone${showTone ? " show" : ""}`}/>

                <button className={`rs-reset${showReset ? " show" : ""}`} onClick={reset}>
                  Begin again →
                </button>
              </div>

            </div>
          </div>
        </div>

          {/* Right ambient cards */}
          <div className="rs-side-cards rs-side-right">
            {SIDE_RIGHT.map(c=>(
              <div key={c.name} className="rs-side-card"
                onClick={() => onNavigate && onNavigate(c.name)}
                style={{cursor:"pointer"}}>
                <div className="rs-side-card-emoji">{c.emoji}</div>
                <div className="rs-side-card-name">{c.name}</div>
                <div className="rs-side-card-benefit">{c.benefit}</div>
                <div style={{marginTop:8,fontSize:"9px",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(192,136,48,.5)",fontFamily:"'Cinzel',serif"}}>See Recipe →</div>
              </div>
            ))}
          </div>

        </div>{/* end rs-content-wrap */}
      </section>
    </>
  );
}
