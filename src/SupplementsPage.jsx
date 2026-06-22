import { useState } from "react";
import { useLang } from "./LangContext";

// Merge English base supplement data with its own inline translations block.
// To add a new language to a supplement, just add a key under that
// supplement's `translations` object — no separate files to keep in sync.
// Falls back to English for any field a translation doesn't include.
function localizeSupplements(supplements, lang) {
  if (lang === "en") return supplements;
  return supplements.map((s) => {
    const overlay = s.translations?.[lang];
    if (!overlay) return s;
    return { ...s, ...overlay };
  });
}

const T_SUPP = {
  en: {
    eyebrow: "Chai Holistic · Supplements",
    title: "Supplements",
    subtitle: "The ones worth spending money on",
    noteLabel: "✦ A note from Alex",
    noteP1: "I use teas, vitamins, and minerals every single day to stay healthy. People spend thousands on cars, vacations, and things that wear out — but resist spending $30 on a supplement that supports every organ in their body. That never made sense to me.",
    noteP2: "Every supplement on this page is something I actually take or have researched deeply. I chose each one for a specific reason — the form, the testing standard, the ingredient source. There are cheaper versions of all of these. I don't recommend them. Your body deserves what actually works.",
    disclosureLabel: "Affiliate Disclosure:",
    disclosureText: "Chai Holistic is a participant in the Amazon Services LLC Associates Program. We may earn a commission if you purchase through this link, at no extra cost to you.",
    badgeForm: "🔬 Form matters", badgeFormSub: "Bioavailability first",
    badgeTested: "🧪 Third-party tested", badgeTestedSub: "Not just label claims",
    badgeFillers: "🚫 No fillers", badgeFillersSub: "Clean ingredients only",
    badgeTea: "🫖 Tea-paired", badgeTeaSub: "Every pick matched to a blend",
    catVitamin: "Supplements", catMineral: "Supplements", catSpecialty: "Specialty", catHerb: "Herbal Extracts",
    pairsWith: "🫖 Pairs with",
    moreLabel: "more",
    form: "Form",
    tested: "Tested",
    whyThis: "Why This →",
    whyYouNeedThis: "Why You Need This",
    whyThisBrandSpecifically: "Why This Brand Specifically",
    teaPairingLabel: "🫖 Tea Pairing",
    thirdPartyLabel: "Third-Party",
    priceLabel: "Price",
    alexsNote: "✦ Alex's Note",
    alexsPick: "Alex's Pick",
    endorsement: "This is the specific brand and form I'd use myself — and the one I'd hand to someone I care about.",
    typicalPrice: "Typical Price",
    soldBy: "Sold by",
    trustLine: "Opens Amazon in a new tab · Sourced & vetted by Chai Holistic",
    fdaShort: "These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.",
    whyFormMattersLabel: "✦ Why form matters more than brand",
    whyFormP1: "The supplement industry is largely unregulated. A bottle can say \"Magnesium\" on the front and contain magnesium oxide — a form with roughly 4% bioavailability that mostly passes through your digestive system without doing anything. Same price. Completely different outcome.",
    whyFormP2Pre: "Every pick on this page was chosen first for ",
    whyFormP2Em: "form",
    whyFormP2Post: " — the specific molecular structure your body can actually use — and second for third-party testing, which means an independent lab confirmed the product contains what the label claims. Most supplements on store shelves meet neither standard.",
    whyFormP3: "The price difference between a good supplement and a great one is usually $10–$20 per month. We spend that on coffee in two days. Your cells are working 24 hours a day. They deserve the real thing.",
    fdaLong: "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before beginning any supplement regimen, especially if you take prescription medications or have an existing health condition. Links on this page are affiliate links — we may earn a commission if you purchase through them at no additional cost to you.",
    notifyTitle: "✦ Notify Me When Back In Stock",
    notifyBody: "This item may be temporarily unavailable on Amazon. Leave your email and we'll reach out the moment it's back — no spam, just one notification.",
    notifyPlaceholder: "your@email.com",
    notifyBtn: "Notify Me ✦",
    notifyBtnSaving: "Saving…",
    notifySentTitle: "We'll let you know",
    notifySentBodyPre: "As soon as ",
    notifySentBodyPost: " is back in stock on Amazon, we'll send you a note.",
    close: "Close",
    confirmFallback: (name) => `Could not reach the Amazon listing for ${name}.\n\nWould you like us to notify you when it's back in stock?`,
  },
  es: {
    eyebrow: "Chai Holistic · Suplementos",
    title: "Suplementos",
    subtitle: "Los que valen la pena",
    noteLabel: "✦ Una nota de Alex",
    noteP1: "Uso tés, vitaminas y minerales todos los días para mantenerme saludable. La gente gasta miles en autos, vacaciones y cosas que se desgastan — pero se resiste a gastar $30 en un suplemento que apoya cada órgano de su cuerpo. Eso nunca tuvo sentido para mí.",
    noteP2: "Cada suplemento en esta página es algo que realmente tomo o he investigado a fondo. Elegí cada uno por una razón específica — la forma, el estándar de pruebas, la fuente del ingrediente. Hay versiones más baratas de todos estos. No las recomiendo. Tu cuerpo merece lo que realmente funciona.",
    disclosureLabel: "Divulgación de Afiliados:",
    disclosureText: "Chai Holistic participa en el Programa de Afiliados de Amazon Services LLC. Podemos ganar una comisión si compras a través de este enlace, sin costo adicional para ti.",
    badgeForm: "🔬 La forma importa", badgeFormSub: "Biodisponibilidad primero",
    badgeTested: "🧪 Probado por terceros", badgeTestedSub: "No solo afirmaciones de etiqueta",
    badgeFillers: "🚫 Sin rellenos", badgeFillersSub: "Solo ingredientes limpios",
    badgeTea: "🫖 Combinado con té", badgeTeaSub: "Cada elección emparejada con una mezcla",
    catVitamin: "Suplementos", catMineral: "Suplementos", catSpecialty: "Especialidad", catHerb: "Extractos Herbales",
    pairsWith: "🫖 Combina con",
    moreLabel: "más",
    form: "Forma",
    tested: "Probado",
    whyThis: "Por Qué Esto →",
    whyYouNeedThis: "Por Qué Lo Necesitas",
    whyThisBrandSpecifically: "Por Qué Esta Marca Específicamente",
    teaPairingLabel: "🫖 Combinación de Té",
    thirdPartyLabel: "Terceros",
    priceLabel: "Precio",
    alexsNote: "✦ Nota de Alex",
    alexsPick: "Elección de Alex",
    endorsement: "Esta es la marca y forma específica que yo mismo usaría — y la que le daría a alguien que me importa.",
    typicalPrice: "Precio Típico",
    soldBy: "Vendido por",
    trustLine: "Abre Amazon en una pestaña nueva · Buscado y verificado por Chai Holistic",
    fdaShort: "Estas declaraciones no han sido evaluadas por la FDA. No están destinadas a diagnosticar, tratar, curar o prevenir ninguna enfermedad.",
    whyFormMattersLabel: "✦ Por qué la forma importa más que la marca",
    whyFormP1: "La industria de suplementos está en gran medida sin regular. Un frasco puede decir \"Magnesio\" en el frente y contener óxido de magnesio — una forma con apenas 4% de biodisponibilidad que en su mayoría pasa por tu sistema digestivo sin hacer nada. Mismo precio. Resultado completamente diferente.",
    whyFormP2Pre: "Cada elección en esta página fue seleccionada primero por la ",
    whyFormP2Em: "forma",
    whyFormP2Post: " — la estructura molecular específica que tu cuerpo realmente puede usar — y en segundo lugar por pruebas de terceros, lo que significa que un laboratorio independiente confirmó que el producto contiene lo que indica la etiqueta. La mayoría de los suplementos en los estantes de las tiendas no cumplen ninguno de los dos estándares.",
    whyFormP3: "La diferencia de precio entre un buen suplemento y uno excelente suele ser de $10–$20 al mes. Gastamos eso en café en dos días. Tus células trabajan 24 horas al día. Merecen lo auténtico.",
    fdaLong: "Estas declaraciones no han sido evaluadas por la Administración de Alimentos y Medicamentos (FDA). Estos productos no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. Consulta a tu proveedor de salud antes de comenzar cualquier régimen de suplementos, especialmente si tomas medicamentos recetados o tienes una condición de salud existente. Los enlaces en esta página son enlaces de afiliados — podemos ganar una comisión si compras a través de ellos sin costo adicional para ti.",
    notifyTitle: "✦ Avísame Cuando Esté Disponible",
    notifyBody: "Este artículo puede estar temporalmente no disponible en Amazon. Deja tu correo y te avisaremos en cuanto esté de vuelta — sin spam, solo una notificación.",
    notifyPlaceholder: "tu@correo.com",
    notifyBtn: "Avísame ✦",
    notifyBtnSaving: "Guardando…",
    notifySentTitle: "Te avisaremos",
    notifySentBodyPre: "Tan pronto como ",
    notifySentBodyPost: " esté de vuelta en Amazon, te enviaremos una nota.",
    close: "Cerrar",
    confirmFallback: (name) => `No se pudo acceder al listado de Amazon para ${name}.\n\n¿Quieres que te avisemos cuando esté disponible nuevamente?`,
  },
  fr: {
    eyebrow: "Chai Holistic · Compléments",
    title: "Compléments",
    subtitle: "Ceux qui valent la peine d'investir",
    noteLabel: "✦ Un mot d'Alex",
    noteP1: "J'utilise des thés, des vitamines et des minéraux tous les jours pour rester en bonne santé. Les gens dépensent des milliers d'euros en voitures, en vacances et en objets qui s'usent — mais hésitent à dépenser 30$ pour un complément qui soutient chaque organe de leur corps. Ça n'a jamais eu de sens pour moi.",
    noteP2: "Chaque complément sur cette page est quelque chose que je prends réellement ou que j'ai étudié en profondeur. J'ai choisi chacun pour une raison précise — la forme, la norme de test, la source de l'ingrédient. Il existe des versions moins chères de tous ceux-ci. Je ne les recommande pas. Votre corps mérite ce qui fonctionne vraiment.",
    disclosureLabel: "Divulgation d'Affiliation :",
    disclosureText: "Chai Holistic participe au programme d'affiliation Amazon Services LLC Associates. Nous pouvons gagner une commission si vous achetez via ce lien, sans frais supplémentaires pour vous.",
    badgeForm: "🔬 La forme compte", badgeFormSub: "Biodisponibilité d'abord",
    badgeTested: "🧪 Testé par un tiers", badgeTestedSub: "Pas seulement des allégations d'étiquette",
    badgeFillers: "🚫 Sans charges", badgeFillersSub: "Ingrédients propres uniquement",
    badgeTea: "🫖 Associé au thé", badgeTeaSub: "Chaque choix associé à un mélange",
    catVitamin: "Compléments", catMineral: "Compléments", catSpecialty: "Spécialité", catHerb: "Extraits de Plantes",
    pairsWith: "🫖 Se marie avec",
    moreLabel: "de plus",
    form: "Forme",
    tested: "Testé",
    whyThis: "Pourquoi Celui-ci →",
    whyYouNeedThis: "Pourquoi Vous En Avez Besoin",
    whyThisBrandSpecifically: "Pourquoi Cette Marque Spécifiquement",
    teaPairingLabel: "🫖 Association de Thé",
    thirdPartyLabel: "Tiers",
    priceLabel: "Prix",
    alexsNote: "✦ Note d'Alex",
    alexsPick: "Le Choix d'Alex",
    endorsement: "C'est la marque et la forme spécifiques que j'utiliserais moi-même — et celle que je donnerais à quelqu'un qui compte pour moi.",
    typicalPrice: "Prix Typique",
    soldBy: "Vendu par",
    trustLine: "Ouvre Amazon dans un nouvel onglet · Sourcé et vérifié par Chai Holistic",
    fdaShort: "Ces déclarations n'ont pas été évaluées par la FDA. Non destiné à diagnostiquer, traiter, guérir ou prévenir une quelconque maladie.",
    whyFormMattersLabel: "✦ Pourquoi la forme compte plus que la marque",
    whyFormP1: "L'industrie des compléments alimentaires est largement non réglementée. Un flacon peut indiquer \"Magnésium\" sur le devant et contenir de l'oxyde de magnésium — une forme avec environ 4% de biodisponibilité qui traverse en grande partie le système digestif sans rien faire. Même prix. Résultat complètement différent.",
    whyFormP2Pre: "Chaque choix sur cette page a d'abord été sélectionné pour sa ",
    whyFormP2Em: "forme",
    whyFormP2Post: " — la structure moléculaire spécifique que votre corps peut réellement utiliser — puis pour les tests par un tiers, ce qui signifie qu'un laboratoire indépendant a confirmé que le produit contient ce que l'étiquette indique. La plupart des compléments en rayon ne répondent à aucune de ces deux normes.",
    whyFormP3: "La différence de prix entre un bon complément et un excellent complément est généralement de 10 à 20$ par mois. On dépense ça en café en deux jours. Vos cellules travaillent 24 heures sur 24. Elles méritent l'authentique.",
    fdaLong: "Ces déclarations n'ont pas été évaluées par la Food and Drug Administration (FDA). Ces produits ne sont pas destinés à diagnostiquer, traiter, guérir ou prévenir une quelconque maladie. Consultez votre professionnel de santé avant de commencer tout régime de compléments, surtout si vous prenez des médicaments sur ordonnance ou souffrez d'une condition médicale existante. Les liens sur cette page sont des liens d'affiliation — nous pouvons gagner une commission si vous achetez via ceux-ci, sans frais supplémentaires pour vous.",
    notifyTitle: "✦ Me Prévenir Quand Disponible",
    notifyBody: "Cet article peut être temporairement indisponible sur Amazon. Laissez votre e-mail et nous vous contacterons dès qu'il sera de retour — pas de spam, juste une notification.",
    notifyPlaceholder: "votre@email.com",
    notifyBtn: "Me Prévenir ✦",
    notifyBtnSaving: "Enregistrement…",
    notifySentTitle: "Nous vous tiendrons informé",
    notifySentBodyPre: "Dès que ",
    notifySentBodyPost: " sera de nouveau disponible sur Amazon, nous vous enverrons un message.",
    close: "Fermer",
    confirmFallback: (name) => `Impossible d'accéder à la fiche Amazon pour ${name}.\n\nVoulez-vous que nous vous avertissions quand il sera de nouveau disponible ?`,
  },
  pt: {
    eyebrow: "Chai Holistic · Suplementos",
    title: "Suplementos",
    subtitle: "Os que valem o investimento",
    noteLabel: "✦ Uma nota de Alex",
    noteP1: "Uso chás, vitaminas e minerais todos os dias para me manter saudável. As pessoas gastam milhares em carros, férias e coisas que se desgastam — mas resistem a gastar $30 em um suplemento que apoia todos os órgãos do corpo. Isso nunca fez sentido para mim.",
    noteP2: "Cada suplemento nesta página é algo que eu realmente tomo ou pesquisei profundamente. Escolhi cada um por uma razão específica — a forma, o padrão de testes, a fonte do ingrediente. Existem versões mais baratas de todos esses. Eu não as recomendo. Seu corpo merece o que realmente funciona.",
    disclosureLabel: "Divulgação de Afiliados:",
    disclosureText: "A Chai Holistic participa do Programa de Associados da Amazon Services LLC. Podemos ganhar uma comissão se você comprar através deste link, sem custo adicional para você.",
    badgeForm: "🔬 A forma importa", badgeFormSub: "Biodisponibilidade primeiro",
    badgeTested: "🧪 Testado por terceiros", badgeTestedSub: "Não apenas alegações do rótulo",
    badgeFillers: "🚫 Sem cargas", badgeFillersSub: "Apenas ingredientes limpos",
    badgeTea: "🫖 Combinado com chá", badgeTeaSub: "Cada escolha combinada com uma mistura",
    catVitamin: "Suplementos", catMineral: "Suplementos", catSpecialty: "Especialidade", catHerb: "Extratos de Ervas",
    pairsWith: "🫖 Combina com",
    moreLabel: "mais",
    form: "Forma",
    tested: "Testado",
    whyThis: "Por Que Este →",
    whyYouNeedThis: "Por Que Você Precisa Disso",
    whyThisBrandSpecifically: "Por Que Esta Marca Especificamente",
    teaPairingLabel: "🫖 Combinação de Chá",
    thirdPartyLabel: "Terceiros",
    priceLabel: "Preço",
    alexsNote: "✦ Nota de Alex",
    alexsPick: "Escolha de Alex",
    endorsement: "Esta é a marca e forma específica que eu mesmo usaria — e a que eu daria a alguém que me importa.",
    typicalPrice: "Preço Típico",
    soldBy: "Vendido por",
    trustLine: "Abre a Amazon em uma nova aba · Pesquisado e verificado pela Chai Holistic",
    fdaShort: "Estas declarações não foram avaliadas pela FDA. Não destinado a diagnosticar, tratar, curar ou prevenir qualquer doença.",
    whyFormMattersLabel: "✦ Por que a forma importa mais que a marca",
    whyFormP1: "A indústria de suplementos é amplamente não regulamentada. Um frasco pode dizer \"Magnésio\" na frente e conter óxido de magnésio — uma forma com cerca de 4% de biodisponibilidade que em grande parte passa pelo sistema digestivo sem fazer nada. Mesmo preço. Resultado completamente diferente.",
    whyFormP2Pre: "Cada escolha nesta página foi selecionada primeiro pela ",
    whyFormP2Em: "forma",
    whyFormP2Post: " — a estrutura molecular específica que seu corpo realmente pode usar — e em segundo lugar por testes de terceiros, o que significa que um laboratório independente confirmou que o produto contém o que o rótulo afirma. A maioria dos suplementos nas prateleiras das lojas não atende a nenhum dos dois padrões.",
    whyFormP3: "A diferença de preço entre um bom suplemento e um excelente costuma ser de $10–$20 por mês. Gastamos isso em café em dois dias. Suas células trabalham 24 horas por dia. Elas merecem o verdadeiro.",
    fdaLong: "Estas declarações não foram avaliadas pela Food and Drug Administration (FDA). Estes produtos não se destinam a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte seu profissional de saúde antes de iniciar qualquer regime de suplementos, especialmente se você toma medicamentos prescritos ou tem uma condição de saúde existente. Os links nesta página são links de afiliados — podemos ganhar uma comissão se você comprar através deles, sem custo adicional para você.",
    notifyTitle: "✦ Avise-me Quando Estiver Disponível",
    notifyBody: "Este item pode estar temporariamente indisponível na Amazon. Deixe seu e-mail e entraremos em contato assim que estiver de volta — sem spam, apenas uma notificação.",
    notifyPlaceholder: "seu@email.com",
    notifyBtn: "Avise-me ✦",
    notifyBtnSaving: "Salvando…",
    notifySentTitle: "Avisaremos você",
    notifySentBodyPre: "Assim que ",
    notifySentBodyPost: " estiver de volta na Amazon, enviaremos uma nota.",
    close: "Fechar",
    confirmFallback: (name) => `Não foi possível acessar a listagem da Amazon para ${name}.\n\nGostaria que avisássemos quando estiver disponível novamente?`,
  },
  ht: {
    eyebrow: "Chai Holistic · Sipleman",
    title: "Sipleman",
    subtitle: "Sa yo ki vo lajan w depanse a",
    noteLabel: "✦ Yon nòt nan men Alex",
    noteP1: "Mwen itilize te, vitamin, ak mineral chak jou pou m rete an sante. Moun depanse plizyè milye dola nan machin, vakans, ak bagay ki itilize — men yo reziste pou depanse $30 nan yon sipleman ki soutni chak ògàn nan kò yo. Sa pa janm fè sans pou mwen.",
    noteP2: "Chak sipleman sou paj sa a se yon bagay mwen aktyèlman pran oswa mwen fè rechèch sou li an pwofondè. Mwen chwazi chak youn pou yon rezon espesifik — fòm lan, estanda tès la, sous engredyan an. Gen vèsyon pi bon mache pou tout sa yo. Mwen pa rekòmande yo. Kò ou merite sa ki aktyèlman fonksyone.",
    disclosureLabel: "Divilgasyon Afilye:",
    disclosureText: "Chai Holistic se yon patisipan nan Pwogram Asosye Amazon Services LLC. Nou ka touche yon komisyon si w achte atravè lyen sa a, san okenn frè siplemantè pou ou.",
    badgeForm: "🔬 Fòm nan enpòtan", badgeFormSub: "Byodisponibilite an premye",
    badgeTested: "🧪 Teste pa tyès pati", badgeTestedSub: "Pa sèlman afimasyon etikèt",
    badgeFillers: "🚫 Pa gen ranbouraj", badgeFillersSub: "Sèlman engredyan pwòp",
    badgeTea: "🫖 Asosye ak te", badgeTeaSub: "Chak chwa matche ak yon melanj",
    catVitamin: "Sipleman", catMineral: "Sipleman", catSpecialty: "Espesyalite", catHerb: "Ekstrè Plant",
    pairsWith: "🫖 Ale byen ak",
    moreLabel: "plis",
    form: "Fòm",
    tested: "Teste",
    whyThis: "Poukisa Sa a →",
    whyYouNeedThis: "Poukisa Ou Bezwen Sa",
    whyThisBrandSpecifically: "Poukisa Mak Sa a Espesyalman",
    teaPairingLabel: "🫖 Asosyasyon Te",
    thirdPartyLabel: "Tyès Pati",
    priceLabel: "Pri",
    alexsNote: "✦ Nòt Alex",
    alexsPick: "Chwa Alex",
    endorsement: "Sa a se mak ak fòm espesifik mwen ta itilize pou tèt mwen — e sa a se sa m ta bay yon moun ki enpòtan pou mwen.",
    typicalPrice: "Pri Tipik",
    soldBy: "Vann pa",
    trustLine: "Louvri Amazon nan yon nouvo onglè · Soti e verifye pa Chai Holistic",
    fdaShort: "Deklarasyon sa yo pa evalye pa FDA. Yo pa fèt pou dyagnostike, trete, geri, oswa anpeche okenn maladi.",
    whyFormMattersLabel: "✦ Poukisa fòm nan enpòtan plis pase mak la",
    whyFormP1: "Endistri sipleman an se lajman san règleman. Yon boutèy ka di \"Manyezyòm\" sou devan li e genyen oksid manyezyòm — yon fòm ak apeprè 4% byodisponibilite ki sitou pase nan sistèm dijestif ou san fè anyen. Menm pri. Rezilta konplètman diferan.",
    whyFormP2Pre: "Chak chwa sou paj sa a te seleksyone an premye pou ",
    whyFormP2Em: "fòm",
    whyFormP2Post: " — estrikti molekilè espesifik kò ou aktyèlman ka itilize — e an dezyèm pou tès tyès pati, sa vle di yon laboratwa endepandan konfime pwodwi a genyen sa etikèt la di. Pifò sipleman sou etajè magazen yo pa rankontre okenn nan de estanda yo.",
    whyFormP3: "Diferans pri ant yon bon sipleman ak yon ekselan anjeneral se $10–$20 pa mwa. Nou depanse sa nan kafe nan de jou. Selil ou yo ap travay 24 èdtan pa jou. Yo merite bagay vre a.",
    fdaLong: "Deklarasyon sa yo pa evalye pa Food and Drug Administration (FDA) la. Pwodwi sa yo pa fèt pou dyagnostike, trete, geri, oswa anpeche okenn maladi. Konsilte founisè swen sante ou anvan w kòmanse nenpòt rejim sipleman, espesyalman si w pran medikaman preskripsyon oswa w gen yon kondisyon sante egzistan. Lyen sou paj sa a se lyen afilye — nou ka touche yon komisyon si w achte atravè yo san okenn frè siplemantè pou ou.",
    notifyTitle: "✦ Avize M Lè Li Disponib Ankò",
    notifyBody: "Atik sa a ka pa disponib tanporèman sou Amazon. Kite imel ou e n ap kontakte w moman li retounen — pa gen spam, jis yon notifikasyon.",
    notifyPlaceholder: "imel@ou.com",
    notifyBtn: "Avize M ✦",
    notifyBtnSaving: "Anrejistre…",
    notifySentTitle: "Nou pral fè w konnen",
    notifySentBodyPre: "Depi ",
    notifySentBodyPost: " retounen disponib sou Amazon, n ap voye yon nòt ba ou.",
    close: "Fèmen",
    confirmFallback: (name) => `Pa t kapab rive nan lis Amazon pou ${name}.\n\nÈske w ta renmen nou avize w lè li disponib ankò?`,
  },
};
function getTSupp(lang) {
  return T_SUPP[lang] || T_SUPP.en;
}

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
    asin: "B0797HBLL3",
    teaPairing: ["Sleepy Spice", "Stress Less", "Father's Calm Evening", "Deep Recharge Sleep"],
    teaNote: "Magnesium activates the same calm pathways your valerian and passionflower blends target. Together they work from two directions — the herb calms the nervous system signal, magnesium provides the cellular fuel to sustain it.",
    whyThisBrand: "Thorne uses bisglycinate chelate — magnesium bonded to two glycine molecules, not oxide dust. Independent testing in 2025 found that many brands selling 'magnesium glycinate' actually contained magnesium oxide mixed with loose glycine powder. Thorne's manufacturing is NSF Certified for Sport, one of the highest third-party standards in the industry.",
    whyThisNutrient: "Magnesium is involved in over 300 enzymatic reactions in the body. Standard blood tests measure serum magnesium, which can look normal even when intracellular levels are low — one reason it's an easy nutrient to overlook in a typical diet.",
    whyNotCheap: "Magnesium oxide — the form in most drugstore bottles — has roughly 4% bioavailability. You're paying for something your body can't use. The glycinate form costs more and is worth every cent.",
    form: "Bisglycinate chelate (Albion TRAACS process)",
    thirdParty: "NSF Certified for Sport",
    personalNote: "This is the one I personally reach for during stressful stretches. I noticed a difference within about a week of consistent use.",
    translations: {
      es: {
        name: "Glicinato de Magnesio",
        subtitle: "La forma que realmente llega a tus células",
        teaNote: "El magnesio activa las mismas vías de calma que buscan tus mezclas de valeriana y pasiflora. Juntos trabajan desde dos direcciones — la hierba calma la señal del sistema nervioso, el magnesio aporta el combustible celular para sostenerla.",
        whyThisBrand: "Thorne usa quelato de bisglicinato — magnesio unido a dos moléculas de glicina, no polvo de óxido. Pruebas independientes en 2025 encontraron que muchas marcas que vendían 'glicinato de magnesio' en realidad contenían óxido de magnesio mezclado con glicina suelta. La fabricación de Thorne cuenta con certificación NSF Certified for Sport, uno de los estándares de terceros más altos de la industria.",
        whyThisNutrient: "El magnesio participa en más de 300 reacciones enzimáticas en el cuerpo. Las pruebas de sangre estándar miden el magnesio sérico, que puede verse normal incluso cuando los niveles intracelulares son bajos — una razón por la que es un nutriente fácil de pasar por alto en una dieta típica.",
        whyNotCheap: "El óxido de magnesio — la forma en la mayoría de los frascos de farmacia — tiene apenas un 4% de biodisponibilidad. Estás pagando por algo que tu cuerpo no puede usar. La forma glicinato cuesta más y vale cada centavo.",
        form: "Quelato de bisglicinato (proceso Albion TRAACS)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "Este es el que tomo personalmente en períodos de mucho estrés. Noté una diferencia después de aproximadamente una semana de uso constante.",
      },
      fr: {
        name: "Glycinate de Magnésium",
        subtitle: "La forme qui atteint vraiment vos cellules",
        teaNote: "Le magnésium active les mêmes voies de calme que ciblent vos mélanges de valériane et de passiflore. Ensemble, ils agissent dans deux directions — la plante calme le signal du système nerveux, le magnésium fournit le carburant cellulaire pour le soutenir.",
        whyThisBrand: "Thorne utilise un chélate de bisglycinate — du magnésium lié à deux molécules de glycine, pas de la poudre d'oxyde. Des tests indépendants en 2025 ont révélé que de nombreuses marques vendant du 'glycinate de magnésium' contenaient en réalité de l'oxyde de magnésium mélangé à de la glycine libre. La fabrication de Thorne est certifiée NSF Certified for Sport, l'une des normes tierces les plus élevées de l'industrie.",
        whyThisNutrient: "Le magnésium intervient dans plus de 300 réactions enzymatiques dans le corps. Les analyses de sang standard mesurent le magnésium sérique, qui peut sembler normal même lorsque les niveaux intracellulaires sont bas — une raison pour laquelle c'est un nutriment facile à négliger dans une alimentation typique.",
        whyNotCheap: "L'oxyde de magnésium — la forme présente dans la plupart des flacons en pharmacie — a une biodisponibilité d'environ 4%. Vous payez pour quelque chose que votre corps ne peut pas utiliser. La forme glycinate coûte plus cher et en vaut chaque centime.",
        form: "Chélate de bisglycinate (procédé Albion TRAACS)",
        thirdParty: "Certifié NSF Certified for Sport",
        personalNote: "C'est celui que je prends personnellement pendant les périodes stressantes. J'ai remarqué une différence après environ une semaine d'utilisation régulière.",
      },
      pt: {
        name: "Glicinato de Magnésio",
        subtitle: "A forma que realmente chega às suas células",
        teaNote: "O magnésio ativa as mesmas vias de calma que suas misturas de valeriana e maracujá buscam. Juntos, eles trabalham em duas direções — a erva acalma o sinal do sistema nervoso, o magnésio fornece o combustível celular para sustentá-lo.",
        whyThisBrand: "A Thorne usa quelato de bisglicinato — magnésio ligado a duas moléculas de glicina, não pó de óxido. Testes independentes em 2025 descobriram que muitas marcas vendendo 'glicinato de magnésio' na verdade continham óxido de magnésio misturado com glicina solta. A fabricação da Thorne é certificada NSF Certified for Sport, um dos padrões de terceiros mais altos do setor.",
        whyThisNutrient: "O magnésio participa de mais de 300 reações enzimáticas no corpo. Os exames de sangue padrão medem o magnésio sérico, que pode parecer normal mesmo quando os níveis intracelulares estão baixos — uma razão pela qual é um nutriente fácil de negligenciar em uma dieta típica.",
        whyNotCheap: "O óxido de magnésio — a forma encontrada na maioria dos frascos de farmácia — tem cerca de 4% de biodisponibilidade. Você está pagando por algo que seu corpo não consegue usar. A forma glicinato custa mais e vale cada centavo.",
        form: "Quelato de bisglicinato (processo Albion TRAACS)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "Este é o que eu pessoalmente uso em períodos de muito estresse. Notei diferença depois de cerca de uma semana de uso constante.",
      },
      ht: {
        name: "Glisinat Manyezyòm",
        subtitle: "Fòm ki rive vrèman nan selil ou yo",
        teaNote: "Manyezyòm aktive menm chemen kalm valeriàn ak fasiflè melanj ou yo vize. Ansanm yo travay nan de direksyon — plant la kalme siyal sistèm nève a, manyezyòm bay enèji selilè pou kenbe sa.",
        whyThisBrand: "Thorne itilize chelat bisglisinat — manyezyòm tache ak de molekil glisin, se pa poud oksid. Tès endepandan an 2025 te jwenn anpil mak ki t ap vann 'glisinat manyezyòm' te aktyèlman gen oksid manyezyòm melanje ak glisin lib. Fabrikasyon Thorne sètifye NSF Certified for Sport, youn nan estanda tyès pati ki pi wo nan endistri a.",
        whyThisNutrient: "Manyezyòm enplike nan plis pase 300 reyaksyon anzimatik nan kò a. Tès san estanda mezire manyezyòm seriom, ki ka parèt nòmal menm lè nivo intrasèlilè yo ba — youn nan rezon ki fè li yon nitriman ki fasil pou neglije nan yon rejim alimantè tipik.",
        whyNotCheap: "Oksid manyezyòm — fòm ki nan pifò boutèy famasi — gen apeprè 4% byodisponibilite. W ap peye pou yon bagay kò w pa ka itilize. Fòm glisinat la koute plis e li vo chak santim.",
        form: "Chelat bisglisinat (pwosesis Albion TRAACS)",
        thirdParty: "Sètifye NSF Certified for Sport",
        personalNote: "Sa a se sa m pèsonèlman pran lè gen anpil estrès. Mwen remake yon diferans apre apeprè yon semèn itilizasyon konstan.",
      },
    },
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
    whyThisNutrient: "D3 plays a role in calcium absorption and immune regulation. Less widely known: taking D3 alone without K2 means calcium has no clear instruction on where to go. K2 (MK-7 form) is one of the proteins involved in directing calcium toward bone. The two nutrients are commonly paired for that reason.",
    whyNotCheap: "Most cheap D3 supplements use D2 (ergocalciferol), which raises blood levels less effectively and for shorter duration than D3 (cholecalciferol). And K1 — found in many combo products — does not perform the same cardiovascular function as K2 MK-7. The form of each nutrient is everything.",
    form: "Cholecalciferol (D3) + Menaquinone-7 (MK-7 form of K2)",
    thirdParty: "GMP certified, hypoallergenic verified",
    personalNote: "I take this every single morning with breakfast. Most people in Florida still test deficient — sun exposure alone isn't enough if you're indoors during peak hours.",
    translations: {
      es: {
        name: "Vitamina D3 + K2",
        subtitle: "La D3 abre la puerta. La K2 le dice al calcio adónde ir.",
        teaNote: "Tus mezclas de espino blanco e hibisco apoyan la elasticidad cardiovascular. D3+K2 trabaja desde arriba — dirigiendo el calcio hacia los huesos en vez de las paredes arteriales, que es la base estructural que esas hierbas necesitan.",
        whyThisBrand: "Pure Encapsulations es una marca hipoalergénica de grado profesional. Su D3+K2 combina 5,000 UI de D3 con 180mcg de MK-7 — la forma de cadena larga de K2 con más evidencia clínica para beneficio cardiovascular y óseo. Sin rellenos artificiales, sin alérgenos comunes, verificado como no transgénico.",
        whyThisNutrient: "La D3 desempeña un papel en la absorción de calcio y la regulación inmunitaria. Algo menos conocido: tomar D3 sola sin K2 significa que el calcio no tiene una instrucción clara de adónde dirigirse. La K2 (forma MK-7) es una de las proteínas implicadas en dirigir el calcio hacia el hueso. Por eso suelen combinarse ambos nutrientes.",
        whyNotCheap: "La mayoría de los suplementos baratos de D3 usan D2 (ergocalciferol), que eleva los niveles en sangre con menos eficacia y por menos tiempo que la D3 (colecalciferol). Y la K1 — presente en muchos productos combinados — no cumple la misma función cardiovascular que la K2 MK-7. La forma de cada nutriente lo es todo.",
        form: "Colecalciferol (D3) + Menaquinona-7 (forma MK-7 de K2)",
        thirdParty: "Certificado GMP, verificado hipoalergénico",
        personalNote: "Tomo esto todas las mañanas con el desayuno. La mayoría de la gente en Florida sigue dando niveles bajos en pruebas — la exposición al sol sola no basta si pasas el día de pico solar bajo techo.",
      },
      fr: {
        name: "Vitamine D3 + K2",
        subtitle: "La D3 ouvre la porte. La K2 indique au calcium où aller.",
        teaNote: "Vos mélanges à l'aubépine et à l'hibiscus soutiennent l'élasticité cardiovasculaire. La D3+K2 agit en amont — en dirigeant le calcium vers les os plutôt que vers les parois artérielles, ce qui constitue la base structurelle dont ces plantes ont besoin.",
        whyThisBrand: "Pure Encapsulations est une marque hypoallergénique de qualité professionnelle. Leur D3+K2 associe 5 000 UI de D3 à 180mcg de MK-7 — la forme à chaîne longue de la K2 disposant des preuves cliniques les plus solides pour la santé cardiovasculaire et osseuse. Sans charges artificielles, sans allergènes courants, vérifié non-OGM.",
        whyThisNutrient: "La D3 joue un rôle dans l'absorption du calcium et la régulation immunitaire. Moins connu : prendre de la D3 seule sans K2 signifie que le calcium n'a pas d'indication claire sur où aller. La K2 (forme MK-7) est l'une des protéines impliquées dans l'orientation du calcium vers les os. Les deux nutriments sont souvent associés pour cette raison.",
        whyNotCheap: "La plupart des suppléments de D3 bon marché utilisent la D2 (ergocalciférol), qui élève les taux sanguins moins efficacement et moins longtemps que la D3 (cholécalciférol). Et la K1 — présente dans de nombreux produits combinés — n'assure pas la même fonction cardiovasculaire que la K2 MK-7. La forme de chaque nutriment change tout.",
        form: "Cholécalciférol (D3) + Ménaquinone-7 (forme MK-7 de la K2)",
        thirdParty: "Certifié GMP, vérifié hypoallergénique",
        personalNote: "Je le prends tous les matins avec le petit-déjeuner. La plupart des gens en Floride sont encore carencés selon les tests — l'exposition au soleil seule ne suffit pas si vous êtes à l'intérieur aux heures de pointe.",
      },
      pt: {
        name: "Vitamina D3 + K2",
        subtitle: "A D3 abre a porta. A K2 diz ao cálcio para onde ir.",
        teaNote: "Suas misturas de espinheiro e hibisco apoiam a elasticidade cardiovascular. D3+K2 atua a montante — direcionando o cálcio para os ossos em vez das paredes arteriais, que é a base estrutural de que essas ervas precisam para funcionar.",
        whyThisBrand: "A Pure Encapsulations é uma marca hipoalergênica de grau profissional. Sua D3+K2 combina 5.000 UI de D3 com 180mcg de MK-7 — a forma de cadeia longa da K2 com mais evidência clínica para benefício cardiovascular e ósseo. Sem cargas artificiais, sem alérgenos comuns, verificado como não-OGM.",
        whyThisNutrient: "A D3 desempenha um papel na absorção de cálcio e na regulação imunológica. O que poucos sabem: tomar D3 sozinha sem K2 significa que o cálcio não tem uma instrução clara sobre para onde ir. A K2 (forma MK-7) é uma das proteínas envolvidas em direcionar o cálcio para os ossos. Os dois nutrientes costumam ser combinados por esse motivo.",
        whyNotCheap: "A maioria dos suplementos baratos de D3 usa D2 (ergocalciferol), que eleva os níveis sanguíneos de forma menos eficaz e por menos tempo do que a D3 (colecalciferol). E a K1 — encontrada em muitos produtos combinados — não desempenha a mesma função cardiovascular que a K2 MK-7. A forma de cada nutriente faz toda a diferença.",
        form: "Colecalciferol (D3) + Menaquinona-7 (forma MK-7 da K2)",
        thirdParty: "Certificado GMP, verificado hipoalergênico",
        personalNote: "Tomo isso todas as manhãs com o café da manhã. A maioria das pessoas na Flórida ainda testa deficiente — a exposição ao sol sozinha não basta se você fica em ambientes fechados nos horários de pico.",
      },
      ht: {
        name: "Vitamin D3 + K2",
        subtitle: "D3 louvri pòt la. K2 di kalsyòm kote pou l ale.",
        teaNote: "Melanj obepin ak ibiskis ou yo soutni elastisite kadyovaskilè. D3+K2 travay anlè — li dirije kalsyòm nan zo olye de pawo atè yo, ki se baz estriktirèl plant sa yo bezwen pou travay.",
        whyThisBrand: "Pure Encapsulations se yon mak ipoalèjenik nivo pwofesyonèl. D3+K2 yo a konbine 5,000 UI D3 ak 180mcg MK-7 — fòm K2 chèn long ki gen plis prèv klinik pou benefis kadyovaskilè ak zo. Pa gen ranbouraj atifisyèl, pa gen alèjèn komen, verifye san OGM.",
        whyThisNutrient: "D3 jwe yon wòl nan absòpsyon kalsyòm ak regilasyon iminitè. Bagay ki mwens koni: pran D3 poukont li san K2 vle di kalsyòm pa gen yon enstriksyon klè sou kote pou l ale. K2 (fòm MK-7) se youn nan pwoteyin ki enplike nan dirije kalsyòm nan zo. De nitriman yo souvan konbine pou rezon sa a.",
        whyNotCheap: "Pifò sipleman D3 bon mache itilize D2 (ergokalsifewòl), ki ogmante nivo san an mwens efikasman e pou pi kout tan pase D3 (kolekalsifewòl). E K1 — yo jwenn nan anpil pwodwi konbine — pa fè menm fonksyon kadyovaskilè ak K2 MK-7. Fòm chak nitriman fè tout diferans.",
        form: "Kolekalsifewòl (D3) + Menakinòn-7 (fòm MK-7 K2 a)",
        thirdParty: "Sètifye GMP, verifye ipoalèjenik",
        personalNote: "Mwen pran sa chak maten ak dejene. Pifò moun nan Florid toujou teste defisyan — ekspozisyon solèy poukont li pa ase si w anndan pandan lè pik yo.",
      },
    },
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
    whyThisNutrient: "Omega-3s (EPA and DHA) are studied for their role in cardiovascular and brain health. Most Western diets lean heavily toward omega-6 fats relative to omega-3s; fish oil is one of the more common ways people adjust that ratio.",
    whyNotCheap: "Most cheap fish oil is in ethyl ester form — a semi-synthetic structure your body doesn't recognize as efficiently. It also oxidizes faster, which means rancid fish oil that smells bad and may cause more harm than good. If your fish oil burps taste fishy, the oil is oxidized. Nordic Naturals has a lemon taste even after digestion.",
    form: "Re-esterified triglyceride (rTG) — 1,280mg EPA+DHA per serving",
    thirdParty: "Third-party tested, USP verified, Friend of the Sea certified",
    personalNote: "I've tried a lot of fish oils. This is the only one where I never had that fishy aftertaste. That alone tells you the oil is fresh and properly processed.",
    translations: {
      es: {
        name: "Aceite de Pescado Omega-3",
        subtitle: "Forma de triglicérido. El resto es biología.",
        teaNote: "El DHA del aceite de pescado es la grasa estructural principal del cerebro. Tus mezclas de melena de león y ginkgo apoyan los factores de crecimiento neuronal y la circulación — el omega-3 les da la materia prima con la que trabajar. Salud cerebral desde dos direcciones.",
        whyThisBrand: "Nordic Naturals es la marca de aceite de pescado número 1 en EE.UU. por una razón. Usan la forma de triglicérido re-esterificado (rTG) — la misma estructura molecular que se encuentra en la carne del pescado — que se absorbe un 70% mejor que la forma de éster etílico de la mayoría de los suplementos. Cada lote se prueba con terceros con certificados de análisis disponibles públicamente. Certificado Friend of the Sea por sostenibilidad.",
        whyThisNutrient: "Los omega-3 (EPA y DHA) se estudian por su papel en la salud cardiovascular y cerebral. La mayoría de las dietas occidentales se inclinan fuertemente hacia las grasas omega-6 en relación con los omega-3; el aceite de pescado es una de las formas más comunes en que la gente ajusta esa proporción.",
        whyNotCheap: "La mayoría del aceite de pescado barato está en forma de éster etílico — una estructura semisintética que el cuerpo reconoce con menos eficacia. También se oxida más rápido, lo que significa aceite rancio con mal olor que puede hacer más daño que bien. Si tus eructos de aceite de pescado saben a pescado, el aceite está oxidado. Nordic Naturals tiene sabor a limón incluso después de la digestión.",
        form: "Triglicérido re-esterificado (rTG) — 1,280mg de EPA+DHA por porción",
        thirdParty: "Probado por terceros, verificado USP, certificado Friend of the Sea",
        personalNote: "He probado muchos aceites de pescado. Este es el único con el que nunca tuve ese regusto a pescado. Eso solo te dice que el aceite está fresco y bien procesado.",
      },
      fr: {
        name: "Huile de Poisson Oméga-3",
        subtitle: "Forme triglycéride. Le reste, c'est de la biologie.",
        teaNote: "Le DHA de l'huile de poisson est la principale graisse structurelle du cerveau. Vos mélanges à la crinière de lion et au ginkgo soutiennent les facteurs de croissance neuronale et la circulation — l'oméga-3 leur fournit la matière première nécessaire. Santé cérébrale sur deux fronts.",
        whyThisBrand: "Nordic Naturals est la marque d'huile de poisson numéro 1 aux États-Unis, et pour de bonnes raisons. Ils utilisent la forme triglycéride ré-estérifiée (rTG) — la même structure moléculaire trouvée dans la chair du poisson — qui s'absorbe 70% mieux que la forme ester éthylique présente dans la plupart des suppléments. Chaque lot est testé par un tiers avec des certificats d'analyse accessibles au public. Certifié Friend of the Sea pour la durabilité.",
        whyThisNutrient: "Les oméga-3 (EPA et DHA) sont étudiés pour leur rôle dans la santé cardiovasculaire et cérébrale. La plupart des régimes occidentaux penchent fortement vers les graisses oméga-6 par rapport aux oméga-3 ; l'huile de poisson est l'un des moyens les plus courants d'ajuster ce ratio.",
        whyNotCheap: "La plupart des huiles de poisson bon marché sont sous forme ester éthylique — une structure semi-synthétique que le corps reconnaît moins efficacement. Elle s'oxyde aussi plus vite, ce qui donne une huile rance, malodorante, pouvant faire plus de mal que de bien. Si vos rots à l'huile de poisson ont un goût de poisson, l'huile est oxydée. Nordic Naturals laisse un goût de citron même après digestion.",
        form: "Triglycéride ré-estérifié (rTG) — 1 280mg d'EPA+DHA par portion",
        thirdParty: "Testé par un tiers, vérifié USP, certifié Friend of the Sea",
        personalNote: "J'ai essayé beaucoup d'huiles de poisson. C'est la seule avec laquelle je n'ai jamais eu ce goût de poisson persistant. Cela seul indique que l'huile est fraîche et bien transformée.",
      },
      pt: {
        name: "Óleo de Peixe Ômega-3",
        subtitle: "Forma de triglicerídeo. O resto é biologia.",
        teaNote: "O DHA no óleo de peixe é a principal gordura estrutural do cérebro. Suas misturas de juba-de-leão e ginkgo apoiam os fatores de crescimento neural e a circulação — o ômega-3 fornece a matéria-prima para isso. Saúde cerebral em duas frentes.",
        whyThisBrand: "A Nordic Naturals é a marca de óleo de peixe número 1 nos EUA por um bom motivo. Eles usam a forma de triglicerídeo re-esterificado (rTG) — a mesma estrutura molecular encontrada na carne do peixe — que absorve 70% melhor do que a forma de éster etílico encontrada na maioria dos suplementos. Todo lote é testado por terceiros com certificados de análise disponíveis publicamente. Certificado Friend of the Sea pela sustentabilidade.",
        whyThisNutrient: "Os ômega-3 (EPA e DHA) são estudados por seu papel na saúde cardiovascular e cerebral. A maioria das dietas ocidentais é fortemente inclinada para gorduras ômega-6 em relação aos ômega-3; o óleo de peixe é uma das formas mais comuns de ajustar essa proporção.",
        whyNotCheap: "A maioria dos óleos de peixe baratos está na forma de éster etílico — uma estrutura semissintética que o corpo reconhece com menos eficiência. Também oxida mais rápido, o que significa óleo rançoso com mau cheiro que pode causar mais mal do que bem. Se o arroto do seu óleo de peixe tem gosto de peixe, o óleo está oxidado. A Nordic Naturals tem gosto de limão mesmo após a digestão.",
        form: "Triglicerídeo re-esterificado (rTG) — 1.280mg de EPA+DHA por porção",
        thirdParty: "Testado por terceiros, verificado USP, certificado Friend of the Sea",
        personalNote: "Já experimentei muitos óleos de peixe. Este é o único com o qual nunca tive aquele gosto residual de peixe. Só isso já diz que o óleo é fresco e bem processado.",
      },
      ht: {
        name: "Lwil Pwason Omega-3",
        subtitle: "Fòm trigliserid. Rès la se byoloji.",
        teaNote: "DHA nan lwil pwason se prensipal grès estriktirèl nan sèvo a. Melanj krinyè lyon ak ginkgo ou yo soutni faktè kwasans newonal ak sikilasyon — omega-3 ba yo materyo brit pou travay avè l. Sante sèvo nan de direksyon.",
        whyThisBrand: "Nordic Naturals se mak lwil pwason nimewo 1 nan Etazini pou yon bon rezon. Yo itilize fòm trigliserid re-esterifye (rTG) — menm estrikti molekilè yo jwenn nan chè pwason — ki absòbe 70% pi byen pase fòm ester etilik ki nan pifò sipleman. Chak lo teste pa yon tyès pati ak sètifika analiz disponib piblikman. Sètifye Friend of the Sea pou dirabilite.",
        whyThisNutrient: "Omega-3 (EPA ak DHA) yo etidye pou wòl yo nan sante kadyovaskilè ak sèvo. Pifò rejim alimantè Oksidantal panche anpil sou grès omega-6 konpare ak omega-3; lwil pwason se youn nan fason ki pi komen moun ajiste rapò sa a.",
        whyNotCheap: "Pifò lwil pwason bon mache nan fòm ester etilik — yon estrikti semi-sentetik kò a rekonèt mwens efikasman. Li tou oksid pi vit, sa vle di lwil rans ki santi move e ki ka fè plis mal pase byen. Si gou pwason rete nan bouch ou apre w pran lwil pwason, lwil la oksid. Nordic Naturals gen gou sitwon menm apre dijesyon.",
        form: "Trigliserid re-esterifye (rTG) — 1,280mg EPA+DHA pa pòsyon",
        thirdParty: "Teste pa tyès pati, verifye USP, sètifye Friend of the Sea",
        personalNote: "Mwen eseye anpil lwil pwason. Sa a se sèl la kote m pa janm gen gou pwason rete nan bouch mwen. Sa sèlman di w lwil la fre e byen trete.",
      },
    },
  },
  {
    id: "ashwagandha",
    emoji: "⚡",
    name: "Ashwagandha KSM-66",
    brand: "Transparent Labs",
    subtitle: "Standardized root extract. The clinical standard.",
    color: "#2A1A0A",
    category: "herb",
    price: "~$25–$35",
    asin: "B09NQTJQCG",
    teaPairing: ["Stress Armour", "Testosterone Harmony", "Iron Will Morning", "Post-50 Men's Foundation", "Adaptogen Blend"],
    teaNote: "When you drink your Stress Armour blend, the rhodiola and holy basil are working on the HPA axis from the outside. KSM-66 ashwagandha taken as a supplement works on the same cortisol-testosterone axis from the inside. This pairing is one of the most studied adaptogenic stacks in functional medicine.",
    whyThisBrand: "Transparent Labs uses KSM-66 — the gold standard ashwagandha extract, made exclusively from the root (never the leaf), standardized to 5%+ withanolides. Generic ashwagandha powder typically contains 0.5–2% withanolides. The difference in clinical effect is significant. Transparent Labs is third-party tested and publishes full certificates of analysis.",
    whyThisNutrient: "Ashwagandha is one of the more clinically researched adaptogens, with a meaningful body of human trials behind it. The keyword to look for is 'KSM-66' — that's the standardized branded extract used in most of that research, not generic root powder.",
    whyNotCheap: "Generic ashwagandha root powder is inexpensive and largely ineffective at standard doses because the withanolide concentration is too low. You'd need 4–8x the dose to approximate KSM-66's effect — and at that point you're spending more anyway. The extract pays for itself.",
    form: "KSM-66 root extract, standardized to 5%+ withanolides",
    thirdParty: "Informed Sport certified, third-party tested",
    personalNote: "This is the supplement I credit most with helping me stay even during high-stress periods. Takes about 3–4 weeks of consistent use to feel the full effect — don't give up after one week.",
    translations: {
      es: {
        name: "Ashwagandha KSM-66",
        subtitle: "Extracto de raíz estandarizado. El estándar clínico.",
        teaNote: "Cuando bebes tu mezcla Stress Armour, la rodiola y la albahaca sagrada trabajan sobre el eje HPA desde afuera. La ashwagandha KSM-66 tomada como suplemento trabaja sobre el mismo eje cortisol-testosterona desde adentro. Esta combinación es una de las más estudiadas en medicina funcional adaptogénica.",
        whyThisBrand: "Transparent Labs usa KSM-66 — el extracto de ashwagandha estándar de oro, hecho exclusivamente de la raíz (nunca de la hoja), estandarizado a 5%+ de withanólidos. El polvo genérico de ashwagandha típicamente contiene 0.5–2% de withanólidos. La diferencia en efecto clínico es significativa. Transparent Labs se prueba con terceros y publica certificados de análisis completos.",
        whyThisNutrient: "La ashwagandha es uno de los adaptógenos más estudiados clínicamente, respaldado por una cantidad significativa de ensayos en humanos. La palabra clave a buscar es 'KSM-66' — ese es el extracto de marca estandarizado usado en la mayoría de esos estudios, no el polvo de raíz genérico.",
        whyNotCheap: "El polvo genérico de raíz de ashwagandha es económico y en gran medida ineficaz a dosis estándar porque la concentración de withanólidos es demasiado baja. Necesitarías de 4 a 8 veces la dosis para aproximarte al efecto de KSM-66 — y en ese punto terminas gastando más de todos modos. El extracto se paga solo.",
        form: "Extracto de raíz KSM-66, estandarizado a 5%+ withanólidos",
        thirdParty: "Certificado Informed Sport, probado por terceros",
        personalNote: "Este es el suplemento al que más le atribuyo mantenerme estable durante períodos de mucho estrés. Toma entre 3 y 4 semanas de uso constante para sentir el efecto completo — no te rindas después de una semana.",
      },
      fr: {
        name: "Ashwagandha KSM-66",
        subtitle: "Extrait de racine standardisé. La référence clinique.",
        teaNote: "Lorsque vous buvez votre mélange Stress Armour, la rhodiole et le basilic sacré agissent sur l'axe HPA de l'extérieur. L'ashwagandha KSM-66 prise en supplément agit sur le même axe cortisol-testostérone de l'intérieur. Cette association est l'une des plus étudiées en médecine fonctionnelle adaptogène.",
        whyThisBrand: "Transparent Labs utilise le KSM-66 — l'extrait d'ashwagandha de référence, fabriqué exclusivement à partir de la racine (jamais de la feuille), standardisé à plus de 5% de withanolides. La poudre d'ashwagandha générique contient généralement 0,5 à 2% de withanolides. La différence d'effet clinique est significative. Transparent Labs est testé par un tiers et publie des certificats d'analyse complets.",
        whyThisNutrient: "L'ashwagandha est l'un des adaptogènes les plus étudiés cliniquement, soutenu par un nombre significatif d'essais sur l'humain. Le mot-clé à rechercher est « KSM-66 » — c'est l'extrait de marque standardisé utilisé dans la plupart de ces études, et non la poudre de racine générique.",
        whyNotCheap: "La poudre de racine d'ashwagandha générique est peu coûteuse et largement inefficace aux doses standard car la concentration en withanolides est trop faible. Il faudrait 4 à 8 fois la dose pour approcher l'effet du KSM-66 — et à ce stade, vous dépensez de toute façon davantage. L'extrait se rentabilise de lui-même.",
        form: "Extrait de racine KSM-66, standardisé à plus de 5% de withanolides",
        thirdParty: "Certifié Informed Sport, testé par un tiers",
        personalNote: "C'est le supplément auquel j'attribue le plus le fait de rester stable pendant les périodes de fort stress. Il faut environ 3 à 4 semaines d'utilisation régulière pour ressentir l'effet complet — n'abandonnez pas après une semaine.",
      },
      pt: {
        name: "Ashwagandha KSM-66",
        subtitle: "Extrato de raiz padronizado. O padrão clínico.",
        teaNote: "Quando você bebe sua mistura Stress Armour, a rodíola e o manjericão sagrado atuam no eixo HPA de fora para dentro. A ashwagandha KSM-66 tomada como suplemento atua no mesmo eixo cortisol-testosterona de dentro para fora. Essa combinação é uma das mais estudadas em medicina funcional adaptogênica.",
        whyThisBrand: "A Transparent Labs usa KSM-66 — o extrato padrão-ouro de ashwagandha, feito exclusivamente da raiz (nunca da folha), padronizado para 5%+ de withanolídeos. O pó genérico de ashwagandha normalmente contém 0,5–2% de withanolídeos. A diferença no efeito clínico é significativa. A Transparent Labs é testada por terceiros e publica certificados de análise completos.",
        whyThisNutrient: "A ashwagandha é um dos adaptógenos mais estudados clinicamente, com um número significativo de ensaios em humanos. A palavra-chave a procurar é 'KSM-66' — esse é o extrato de marca padronizado usado na maioria desses estudos, não o pó de raiz genérico.",
        whyNotCheap: "O pó genérico de raiz de ashwagandha é barato e, em grande parte, ineficaz em doses padrão porque a concentração de withanolídeos é muito baixa. Você precisaria de 4 a 8 vezes a dose para se aproximar do efeito do KSM-66 — e nesse ponto, você acaba gastando mais de qualquer forma. O extrato se paga sozinho.",
        form: "Extrato de raiz KSM-66, padronizado para 5%+ withanolídeos",
        thirdParty: "Certificado Informed Sport, testado por terceiros",
        personalNote: "Este é o suplemento ao qual mais credito me manter equilibrado durante períodos de muito estresse. Leva cerca de 3 a 4 semanas de uso constante para sentir o efeito completo — não desista depois de uma semana.",
      },
      ht: {
        name: "Ashwagandha KSM-66",
        subtitle: "Ekstrè rasin estandadize. Estanda klinik la.",
        teaNote: "Lè w bwè melanj Stress Armour ou a, rodyola ak bazilik sakre a travay sou aks HPA a depi deyò. Ashwagandha KSM-66 pran kòm sipleman travay sou menm aks kortizòl-testosteròn an depi anndan. Konbinezon sa a se youn nan pi etidye nan medsin fonksyonèl adaptojenik.",
        whyThisBrand: "Transparent Labs itilize KSM-66 — ekstrè ashwagandha referans lò a, fèt eksklizivman ak rasin lan (pa janm fèy la), estandadize a 5%+ withanolid. Poud ashwagandha jenerik anjeneral gen 0.5–2% withanolid. Diferans nan efè klinik la enpòtan. Transparent Labs teste pa tyès pati e li pibliye sètifika analiz konplè.",
        whyThisNutrient: "Ashwagandha se youn nan adaptojèn ki pi etidye klinikman, ki sipòte pa yon kantite enpòtan esè sou imen. Mo kle pou chèche se 'KSM-66' — se ekstrè mak estandadize ki itilize nan pifò etid sa yo, pa poud rasin jenerik.",
        whyNotCheap: "Poud rasin ashwagandha jenerik pa koute chè e li lajman pa efikas nan dòz estanda paske konsantrasyon withanolid la twò ba. W ta bezwen 4 a 8 fwa dòz la pou pwoche bò efè KSM-66 a — e nan moman sa a, w ap depanse plis kanmenm. Ekstrè a peye tèt li.",
        form: "Ekstrè rasin KSM-66, estandadize a 5%+ withanolid",
        thirdParty: "Sètifye Informed Sport, teste pa tyès pati",
        personalNote: "Sa a se sipleman mwen kwè ki ede m rete estab pandan peryòd gwo estrès. Pran apeprè 3 a 4 semèn itilizasyon konstan pou santi efè konplè a — pa abandone apre yon semèn.",
      },
    },
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
    whyThisNutrient: "Collagen is the most abundant protein in the body — it's the structural matrix of skin, tendons, ligaments, cartilage, and bone. Natural production gradually slows with age, which is the basic premise behind collagen supplementation.",
    whyNotCheap: "Gelatin is not the same as hydrolyzed collagen peptides. Gelatin has large protein chains that don't absorb efficiently. Hydrolyzed peptides are broken down to specific amino acid sequences (notably hydroxyproline) that trigger fibroblast activity. The word 'hydrolyzed' on the label matters.",
    form: "Hydrolyzed Type I & III bovine collagen peptides",
    thirdParty: "NSF Certified",
    personalNote: "I add a scoop to my morning tea every day. You can't taste it, it dissolves completely, and my joints feel the difference when I go a week without it.",
    translations: {
      es: {
        name: "Péptidos de Colágeno",
        subtitle: "Hidrolizado. De pastoreo. Requiere vitamina C.",
        teaNote: "La síntesis de colágeno requiere vitamina C como cofactor — tu mezcla Turmeric Tonic contiene compuestos antiinflamatorios naturales que reducen la inflamación crónica que descompone el colágeno. Toma tu colágeno con vitamina C y bebe tu Turmeric Tonic. Esa combinación es el protocolo completo de soporte articular.",
        whyThisBrand: "Vital Proteins usa piel bovina de pastoreo — la fuente importa porque el colágeno de animales alimentados con grano tiene un perfil de aminoácidos distinto. Sus péptidos están hidrolizados a menos de 5,000 daltons, lo suficientemente pequeños para absorberse a través de la pared intestinal y llegar a los tejidos objetivo. Certificado NSF. La versión sin sabor se disuelve completamente en líquido caliente o frío.",
        whyThisNutrient: "El colágeno es la proteína más abundante del cuerpo — es la matriz estructural de la piel, los tendones, los ligamentos, el cartílago y el hueso. La producción natural disminuye gradualmente con la edad, lo cual es la premisa básica detrás de la suplementación con colágeno.",
        whyNotCheap: "La gelatina no es lo mismo que los péptidos de colágeno hidrolizado. La gelatina tiene cadenas de proteína grandes que no se absorben con eficacia. Los péptidos hidrolizados se descomponen en secuencias específicas de aminoácidos (en particular hidroxiprolina) que activan la actividad de los fibroblastos. La palabra 'hidrolizado' en la etiqueta importa.",
        form: "Péptidos de colágeno bovino hidrolizado Tipo I y III",
        thirdParty: "Certificado NSF",
        personalNote: "Agrego una cucharada a mi té de la mañana todos los días. No se siente el sabor, se disuelve por completo, y mis articulaciones notan la diferencia cuando paso una semana sin tomarlo.",
      },
      fr: {
        name: "Peptides de Collagène",
        subtitle: "Hydrolysé. Issu de bétail nourri à l'herbe. Vitamine C requise.",
        teaNote: "La synthèse du collagène nécessite la vitamine C comme cofacteur — votre mélange Turmeric Tonic contient des composés anti-inflammatoires naturels qui réduisent l'inflammation chronique responsable de la dégradation du collagène. Prenez votre collagène avec de la vitamine C et buvez votre Turmeric Tonic. Cette combinaison constitue le protocole complet de soutien articulaire.",
        whyThisBrand: "Vital Proteins utilise de la peau bovine issue d'animaux élevés en pâturage — la source compte car le collagène d'animaux nourris aux céréales a un profil d'acides aminés différent. Leurs peptides sont hydrolysés à moins de 5 000 daltons, assez petits pour traverser la paroi intestinale et atteindre les tissus cibles. Certifié NSF. La version sans saveur se dissout complètement dans un liquide chaud ou froid.",
        whyThisNutrient: "Le collagène est la protéine la plus abondante du corps — c'est la matrice structurelle de la peau, des tendons, des ligaments, du cartilage et des os. La production naturelle ralentit progressivement avec l'âge, ce qui constitue le principe de base de la supplémentation en collagène.",
        whyNotCheap: "La gélatine n'est pas la même chose que les peptides de collagène hydrolysé. La gélatine a de longues chaînes protéiques qui s'absorbent mal. Les peptides hydrolysés sont décomposés en séquences spécifiques d'acides aminés (notamment l'hydroxyproline) qui déclenchent l'activité des fibroblastes. Le mot 'hydrolysé' sur l'étiquette a son importance.",
        form: "Peptides de collagène bovin hydrolysé Type I et III",
        thirdParty: "Certifié NSF",
        personalNote: "J'ajoute une cuillère à mon thé du matin chaque jour. On ne sent pas le goût, ça se dissout complètement, et mes articulations ressentent la différence quand j'en saute une semaine.",
      },
      pt: {
        name: "Peptídeos de Colágeno",
        subtitle: "Hidrolisado. De pasto. Vitamina C necessária.",
        teaNote: "A síntese de colágeno requer vitamina C como cofator — sua mistura Turmeric Tonic contém compostos anti-inflamatórios naturais que reduzem a inflamação crônica que degrada o colágeno. Tome seu colágeno com vitamina C e beba seu Turmeric Tonic. Essa combinação é o protocolo completo de suporte às articulações.",
        whyThisBrand: "A Vital Proteins usa pele bovina de animais criados a pasto — a origem importa porque o colágeno de animais alimentados com grãos tem um perfil de aminoácidos diferente. Seus peptídeos são hidrolisados a menos de 5.000 daltons, pequenos o suficiente para serem absorvidos pela parede intestinal e atingir os tecidos-alvo. Certificado NSF. A versão sem sabor se dissolve completamente em líquido quente ou frio.",
        whyThisNutrient: "O colágeno é a proteína mais abundante do corpo — é a matriz estrutural da pele, tendões, ligamentos, cartilagem e ossos. A produção natural diminui gradualmente com a idade, o que é a premissa básica por trás da suplementação de colágeno.",
        whyNotCheap: "Gelatina não é a mesma coisa que peptídeos de colágeno hidrolisado. A gelatina tem cadeias proteicas grandes que não se absorvem com eficiência. Os peptídeos hidrolisados são quebrados em sequências específicas de aminoácidos (notadamente hidroxiprolina) que ativam a atividade dos fibroblastos. A palavra 'hidrolisado' no rótulo importa.",
        form: "Peptídeos de colágeno bovino hidrolisado Tipo I e III",
        thirdParty: "Certificado NSF",
        personalNote: "Adiciono uma colher ao meu chá da manhã todos os dias. Não dá pra sentir o gosto, dissolve completamente, e minhas articulações sentem a diferença quando passo uma semana sem tomar.",
      },
      ht: {
        name: "Peptid Kolajèn",
        subtitle: "Idwolize. Bèf manje zèb. Vitamin C nesesè.",
        teaNote: "Sentèz kolajèn mande vitamin C kòm yon kofaktè — melanj Turmeric Tonic ou a gen konpoze anti-enflamatwa natirèl ki redui enflamasyon kwonik ki kraze kolajèn. Pran kolajèn ou a ak vitamin C epi bwè Turmeric Tonic ou a. Konbinezon sa a se pwotokòl konplè pou sipò atikilasyon.",
        whyThisBrand: "Vital Proteins itilize po bèf ki manje zèb, ki elve nan patiraj — sous la enpòtan paske kolajèn bèf ki manje grenn gen yon pwofil asid amine diferan. Peptid yo idwolize a mwens pase 5,000 dalton, ase piti pou yo absòbe nan paw entestinal la pou rive nan tisi sib yo. Sètifye NSF. Vèsyon san gou a fonn konplètman nan likid cho oswa fwèt.",
        whyThisNutrient: "Kolagèn se pwoteyin ki pi abondan nan kò a — se matris striktirèl po, tandon, ligaman, katilaj, ak zo. Pwodiksyon natirèl diminye gradyèlman ak laj, ki se premis debaz dèyè siplemantasyon kolagèn.",
        whyNotCheap: "Jelatin se pa menm bagay ak peptid kolajèn idwolize. Jelatin gen gwo chèn pwoteyin ki pa absòbe efikasman. Peptid idwolize yo kase an sekans asid amine espesifik (sitou idroksipwolin) ki deklanche aktivite fibwoblas. Mo 'idwolize' sou etikèt la enpòtan.",
        form: "Peptid kolajèn bèf idwolize Tip I & III",
        thirdParty: "Sètifye NSF",
        personalNote: "Mwen ajoute yon kiyè nan te maten m chak jou. Ou pa ka santi gou l, li fonn konplètman, e atikilasyon m santi diferans lan lè m pase yon semèn san l.",
      },
    },
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
    whyThisNutrient: "The gut microbiome is an active area of research connected to immune function, digestion, and overall wellness. Diet, antibiotics, and stress are commonly cited factors that can affect its balance over time.",
    whyNotCheap: "Cheap probiotics are mostly marketing. A 10-billion CFU count means nothing if the strains are dead, unstudied, or unable to survive stomach acid. Seed's strains are selected based on published human clinical trials, not in vitro lab data. It's a meaningful difference.",
    form: "24-strain synbiotic (probiotic + prebiotic) — 53.6 billion AFU",
    thirdParty: "Third-party tested, non-GMO, vegan",
    personalNote: "I was skeptical about the price. Then I stopped for a month and noticed the difference immediately. Digestion, energy, even mood. Now it's non-negotiable.",
    translations: {
      es: {
        name: "Probióticos — DS-01",
        subtitle: "24 cepas estudiadas clínicamente. Cápsula anidada. Realmente llega a tu intestino.",
        teaNote: "Tus mezclas de té para sanar el intestino calman y reparan el revestimiento intestinal — el olmo resbaladizo y la raíz de malvavisco cubren el tejido inflamado. Seed DS-01 repuebla el microbioma con cepas estudiadas clínicamente. Uno prepara el terreno, el otro planta las semillas. Están hechos para trabajar juntos.",
        whyThisBrand: "La mayoría de los probióticos están muertos antes de llegar a tu intestino. El ácido estomacal, el calor y el tiempo en el estante destruyen las cepas bacterianas frágiles — un estudio de la Universidad de California encontró que solo el 15% de los suplementos probióticos contenían organismos viables en los niveles indicados en la etiqueta. Seed usa una cápsula anidada ViaCap: una cápsula prebiótica externa que protege la cápsula probiótica interna del ácido estomacal. 24 cepas, todas con evidencia clínica humana publicada. No requiere refrigeración.",
        whyThisNutrient: "El microbioma intestinal es un área activa de investigación relacionada con la función inmunitaria, la digestión y el bienestar general. La dieta, los antibióticos y el estrés son factores comúnmente citados que pueden afectar su equilibrio con el tiempo.",
        whyNotCheap: "Los probióticos baratos son en su mayoría marketing. Un conteo de 10 mil millones de UFC no significa nada si las cepas están muertas, no han sido estudiadas, o no sobreviven el ácido estomacal. Las cepas de Seed se seleccionan según ensayos clínicos humanos publicados, no datos de laboratorio in vitro. Es una diferencia significativa.",
        form: "Sinbiótico de 24 cepas (probiótico + prebiótico) — 53.6 mil millones de AFU",
        thirdParty: "Probado por terceros, no transgénico, vegano",
        personalNote: "Tenía dudas sobre el precio. Luego dejé de tomarlo por un mes y noté la diferencia de inmediato. Digestión, energía, hasta el ánimo. Ahora no es negociable.",
      },
      fr: {
        name: "Probiotiques — DS-01",
        subtitle: "24 souches étudiées cliniquement. Capsule imbriquée. Atteint vraiment votre intestin.",
        teaNote: "Vos mélanges de thé pour la guérison intestinale apaisent et réparent la paroi intestinale — l'orme rouge et la racine de guimauve recouvrent les tissus enflammés. Seed DS-01 repeuple le microbiome avec des souches étudiées cliniquement. L'un prépare le terrain, l'autre plante les graines. Ils sont conçus pour fonctionner ensemble.",
        whyThisBrand: "La plupart des probiotiques sont morts avant d'atteindre votre intestin. L'acide gastrique, la chaleur et le temps en rayon détruisent les souches bactériennes fragiles — une étude de l'Université de Californie a révélé que seulement 15% des compléments probiotiques contenaient des organismes viables aux niveaux indiqués sur l'étiquette. Seed utilise une capsule imbriquée ViaCap : une capsule prébiotique externe qui protège la capsule probiotique interne de l'acide gastrique. 24 souches, toutes avec des preuves cliniques humaines publiées. Réfrigération non requise.",
        whyThisNutrient: "Le microbiome intestinal est un domaine de recherche actif lié à la fonction immunitaire, à la digestion et au bien-être général. L'alimentation, les antibiotiques et le stress sont des facteurs souvent cités comme pouvant affecter son équilibre au fil du temps.",
        whyNotCheap: "Les probiotiques bon marché relèvent surtout du marketing. Un nombre de 10 milliards d'UFC ne signifie rien si les souches sont mortes, non étudiées, ou incapables de survivre à l'acide gastrique. Les souches de Seed sont sélectionnées sur la base d'essais cliniques humains publiés, pas de données de laboratoire in vitro. C'est une différence significative.",
        form: "Synbiotique à 24 souches (probiotique + prébiotique) — 53,6 milliards d'AFU",
        thirdParty: "Testé par un tiers, non-OGM, végan",
        personalNote: "J'étais sceptique quant au prix. Puis j'ai arrêté pendant un mois et j'ai immédiatement remarqué la différence. Digestion, énergie, même l'humeur. Maintenant, ce n'est plus négociable.",
      },
      pt: {
        name: "Probióticos — DS-01",
        subtitle: "24 cepas estudadas clinicamente. Cápsula aninhada. Realmente chega ao seu intestino.",
        teaNote: "Suas misturas de chá para cicatrização intestinal acalmam e reparam o revestimento intestinal — o olmo-escorregadio e a raiz de malva cobrem o tecido inflamado. O Seed DS-01 repovoa o microbioma com cepas estudadas clinicamente. Um prepara o terreno, o outro planta as sementes. Foram feitos para trabalhar juntos.",
        whyThisBrand: "A maioria dos probióticos está morta antes de chegar ao seu intestino. O ácido estomacal, o calor e o tempo de prateleira destroem cepas bacterianas frágeis — um estudo da Universidade da Califórnia descobriu que apenas 15% dos suplementos probióticos continham organismos viáveis nos níveis indicados no rótulo. A Seed usa uma cápsula aninhada ViaCap: uma cápsula prebiótica externa que protege a cápsula probiótica interna do ácido estomacal. 24 cepas, todas com evidência clínica humana publicada. Não requer refrigeração.",
        whyThisNutrient: "O microbioma intestinal é uma área ativa de pesquisa ligada à função imunológica, digestão e bem-estar geral. Dieta, antibióticos e estresse são fatores comumente citados que podem afetar seu equilíbrio ao longo do tempo.",
        whyNotCheap: "Probióticos baratos são, em sua maioria, marketing. Uma contagem de 10 bilhões de UFC não significa nada se as cepas estiverem mortas, não estudadas ou incapazes de sobreviver ao ácido estomacal. As cepas da Seed são selecionadas com base em ensaios clínicos humanos publicados, não dados de laboratório in vitro. É uma diferença significativa.",
        form: "Sinbiótico de 24 cepas (probiótico + prebiótico) — 53,6 bilhões de AFU",
        thirdParty: "Testado por terceiros, não-OGM, vegano",
        personalNote: "Eu estava cético quanto ao preço. Depois parei por um mês e notei a diferença imediatamente. Digestão, energia, até o humor. Agora não é negociável.",
      },
      ht: {
        name: "Pwobyotik — DS-01",
        subtitle: "24 souch etidye klinikman. Kapsil ankase. Vrèman rive nan trip ou.",
        teaNote: "Melanj te gerizon trip ou yo kalme epi repare paw entestinal la — om gliban ak rasin gimov kouvri tisi enflame. Seed DS-01 repeple mikwobyom nan ak souch etidye klinikman. Youn prepare tè a, lòt la plante grenn yo. Yo fèt pou travay ansanm.",
        whyThisBrand: "Pifò pwobyotik mouri anvan yo rive nan trip ou. Asid lestomak, chalè, ak tan sou etajè detwi souch bakteri frajil yo — yon etid Inivèsite Kalifòni te jwenn sèlman 15% sipleman pwobyotik te gen òganis vivan nan nivo ki make sou etikèt la. Seed itilize yon kapsil ankase ViaCap: yon kapsil prebyotik deyò ki pwoteje kapsil pwobyotik anndan an kont asid lestomak. 24 souch, tout ak prèv klinik imen pibliye. Pa bezwen refrijerasyon.",
        whyThisNutrient: "Mikwobyòm trip la se yon domèn rechèch aktif ki konekte ak fonksyon iminitè, dijesyon, ak byennèt jeneral. Rejim alimantè, antibyotik, ak estrès se faktè yo souvan site ki ka afekte balans li avèk tan.",
        whyNotCheap: "Pwobyotik bon mache se majorite maketing. Yon kont 10 milya CFU pa vle di anyen si souch yo mouri, pa etidye, oswa pa ka siviv asid lestomak. Souch Seed yo seleksyone baze sou esè klinik imen pibliye, pa done laboratwa in vitro. Se yon diferans enpòtan.",
        form: "Sinbyotik 24 souch (pwobyotik + prebyotik) — 53.6 milya AFU",
        thirdParty: "Teste pa tyès pati, san OGM, vejetal",
        personalNote: "Mwen te skeptik sou pri a. Apre sa, mwen sispann pandan yon mwa epi mwen remake diferans lan imedyatman. Dijesyon, enèji, menm imè. Kounye a li pa negosyab.",
      },
    },
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
    whyThisNutrient: "CoQ10 is produced naturally in every cell and supports mitochondrial energy production. Natural production tends to decline with age. It's also worth knowing that statin medications affect the same pathway the body uses to produce CoQ10 — something to discuss with a doctor if that applies to you.",
    whyNotCheap: "Ubiquinone (cheap CoQ10) has poor bioavailability, particularly in older adults. Studies show ubiquinol produces meaningfully higher plasma levels than ubiquinone at an equivalent intake, making it more effective per dollar spent despite the higher sticker price.",
    form: "Ubiquinol (active, reduced form of CoQ10)",
    thirdParty: "Third-party tested",
    personalNote: "I started taking this when I was researching the men's heart blend. Three weeks in I noticed I was recovering from workouts noticeably faster. The research makes sense — more cellular energy is more cellular energy.",
    translations: {
      es: {
        name: "CoQ10 (Ubiquinol)",
        subtitle: "La forma activa. Tus mitocondrias lo notarán.",
        teaNote: "La baya de espino blanco en tus mezclas para el corazón apoya la eficiencia miocárdica y el tono vascular. El CoQ10 aporta la moneda de energía celular (ATP) con la que funciona el músculo cardíaco. El corazón late 100,000 veces al día — tiene la mayor densidad mitocondrial de cualquier órgano del cuerpo. Estos dos van juntos.",
        whyThisBrand: "Qunol usa ubiquinol — la forma activa y ya convertida del CoQ10 — suspendida en un formato soluble en agua y grasa para una absorción notablemente mejor. El CoQ10 estándar (ubiquinona) debe ser convertido por el cuerpo antes de poder usarse, y esa conversión se vuelve menos eficiente con la edad. Pruebas independientes confirman que Qunol cumple consistentemente lo que indica en la etiqueta.",
        whyThisNutrient: "El CoQ10 se produce naturalmente en cada célula y favorece la producción de energía mitocondrial. La producción natural tiende a disminuir con la edad. También vale la pena saber que las estatinas afectan la misma vía que el cuerpo usa para producir CoQ10 — algo a conversar con un médico si te aplica.",
        whyNotCheap: "La ubiquinona (CoQ10 barato) tiene poca biodisponibilidad, particularmente en adultos mayores. Los estudios muestran que el ubiquinol produce niveles plasmáticos notablemente más altos que la ubiquinona con una ingesta equivalente, haciéndolo más efectivo por cada dólar gastado a pesar de su precio más alto.",
        form: "Ubiquinol (forma activa y reducida del CoQ10)",
        thirdParty: "Probado por terceros",
        personalNote: "Empecé a tomar esto cuando investigaba la mezcla para el corazón masculino. A las tres semanas noté que me recuperaba de los entrenamientos notablemente más rápido. La investigación tiene sentido — más energía celular es más energía celular.",
      },
      fr: {
        name: "CoQ10 (Ubiquinol)",
        subtitle: "La forme active. Vos mitochondries le remarqueront.",
        teaNote: "La baie d'aubépine dans vos mélanges pour le cœur soutient l'efficacité myocardique et le tonus vasculaire. Le CoQ10 fournit la monnaie énergétique cellulaire (ATP) sur laquelle fonctionne le muscle cardiaque. Le cœur bat 100 000 fois par jour — il possède la plus haute densité mitochondriale de tous les organes du corps. Ces deux-là vont de pair.",
        whyThisBrand: "Qunol utilise l'ubiquinol — la forme active et pré-convertie du CoQ10 — en suspension dans un format soluble dans l'eau et les graisses pour une absorption nettement meilleure. Le CoQ10 standard (ubiquinone) doit être converti par le corps avant de pouvoir être utilisé, et cette conversion devient moins efficace avec l'âge. Des tests indépendants confirment que Qunol respecte systématiquement les indications de son étiquette.",
        whyThisNutrient: "La CoQ10 est produite naturellement dans chaque cellule et favorise la production d'énergie mitochondriale. La production naturelle a tendance à diminuer avec l'âge. Il est également utile de savoir que les statines affectent la même voie que le corps utilise pour produire de la CoQ10 — un sujet à aborder avec un médecin si cela vous concerne.",
        whyNotCheap: "L'ubiquinone (CoQ10 bon marché) a une faible biodisponibilité, particulièrement chez les personnes âgées. Les études montrent que l'ubiquinol produit des taux plasmatiques nettement plus élevés que l'ubiquinone à apport équivalent, le rendant plus efficace par dollar dépensé malgré son prix d'affichage plus élevé.",
        form: "Ubiquinol (forme active et réduite du CoQ10)",
        thirdParty: "Testé par un tiers",
        personalNote: "J'ai commencé à en prendre en faisant des recherches sur le mélange pour le cœur masculin. Au bout de trois semaines, j'ai remarqué que je récupérais nettement plus vite après l'entraînement. La recherche tient la route — plus d'énergie cellulaire, c'est plus d'énergie cellulaire.",
      },
      pt: {
        name: "CoQ10 (Ubiquinol)",
        subtitle: "A forma ativa. Suas mitocôndrias vão notar.",
        teaNote: "A baga de espinheiro em suas misturas para o coração apoia a eficiência miocárdica e o tônus vascular. O CoQ10 fornece a moeda de energia celular (ATP) com a qual o músculo cardíaco funciona. O coração bate 100.000 vezes por dia — tem a maior densidade mitocondrial de qualquer órgão do corpo. Esses dois andam juntos.",
        whyThisBrand: "A Qunol usa ubiquinol — a forma ativa e já convertida do CoQ10 — suspensa em um formato solúvel em água e gordura para uma absorção drasticamente melhor. O CoQ10 padrão (ubiquinona) precisa ser convertido pelo corpo antes de poder ser usado, e essa conversão se torna menos eficiente com a idade. Testes independentes confirmam que a Qunol atende consistentemente ao que indica no rótulo.",
        whyThisNutrient: "A CoQ10 é produzida naturalmente em cada célula e favorece a produção de energia mitocondrial. A produção natural tende a diminuir com a idade. Também vale saber que as estatinas afetam a mesma via que o corpo usa para produzir CoQ10 — algo a conversar com um médico, se for o seu caso.",
        whyNotCheap: "A ubiquinona (CoQ10 barato) tem baixa biodisponibilidade, particularmente em idosos. Estudos mostram que o ubiquinol produz níveis plasmáticos significativamente mais altos do que a ubiquinona com uma ingestão equivalente, tornando-o mais eficaz por dólar gasto apesar do preço de tabela mais alto.",
        form: "Ubiquinol (forma ativa e reduzida do CoQ10)",
        thirdParty: "Testado por terceiros",
        personalNote: "Comecei a tomar isso enquanto pesquisava a mistura para o coração masculino. Em três semanas, notei que estava me recuperando dos treinos visivelmente mais rápido. A pesquisa faz sentido — mais energia celular é mais energia celular.",
      },
      ht: {
        name: "CoQ10 (Ubikinòl)",
        subtitle: "Fòm aktif la. Mitokondri ou yo ap remake l.",
        teaNote: "Bè obepin nan melanj kè ou yo soutni efikasite myokadyal ak ton vaskilè. CoQ10 bay lajan enèji selilè (ATP) misk kè a fonksyone avè l. Kè a bat 100,000 fwa pa jou — li gen pi gwo dansite mitokondri nan nenpòt ògàn nan kò a. De sa yo ale ansanm.",
        whyThisBrand: "Qunol itilize ubikinòl — fòm aktif, deja konvèti CoQ10 — sispann nan yon fòma ki soluble nan dlo ak grès pou yon absòpsyon pi bon anpil. CoQ10 estanda (ubikinòn) dwe konvèti pa kò a anvan li ka itilize, e konvèsyon sa a vin mwens efikas ak laj. Tès endepandan konfime Qunol respekte sa ki make sou etikèt la tout tan.",
        whyThisNutrient: "CoQ10 pwodui natirèlman nan chak selil epi li sipòte pwodiksyon enèji mitokondriyal. Pwodiksyon natirèl gen tandans diminye ak laj. Li vo lapenn konnen tou ke medikaman statin afekte menm chemen kò a itilize pou pwodui CoQ10 — yon bagay pou diskite ak yon doktè si sa aplike pou ou.",
        whyNotCheap: "Ubikinòn (CoQ10 bon mache) gen byodisponibilite fèb, patikilyèman nan moun aje. Etid montre ubikinòl pwodui nivo plasmatik pi wo pase ubikinòn ak yon konsomasyon ekivalan, sa fè l pi efikas pou chak dola depanse malgre pri etikèt li pi wo.",
        form: "Ubikinòl (fòm aktif, redui nan CoQ10)",
        thirdParty: "Teste pa tyès pati",
        personalNote: "Mwen te kòmanse pran sa lè m t ap fè rechèch sou melanj kè gason an. Twa semèn apre, mwen remake m t ap rekipere pi vit apre egzèsis. Rechèch la fè sans — plis enèji selilè se plis enèji selilè.",
      },
    },
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
    whyThisNutrient: "Zinc plays a role in immune function, wound healing, and a number of other everyday processes. Vegetarians and heavy exercisers are among the groups sometimes mentioned in research as having higher zinc needs.",
    whyNotCheap: "Zinc oxide — by far the most common form in supplements — absorbs poorly compared to zinc bisglycinate and picolinate. Matching the effective delivery of a chelated form with zinc oxide means a much larger amount, which tends to come with more GI discomfort. The chelated form wins on every metric.",
    form: "Zinc bisglycinate (chelated)",
    thirdParty: "NSF Certified for Sport",
    personalNote: "Zinc was the supplement I was most skeptical about until I read the prostate research. The fact that the prostate actively concentrates zinc tells you everything about how important it is.",
    translations: {
      es: {
        name: "Bisglicinato de Zinc",
        subtitle: "El mineral del que dependen el sistema inmune, la testosterona y la próstata.",
        teaNote: "La próstata concentra zinc en niveles más altos que cualquier otro órgano. Tus mezclas Prostate Shield y Zinc & Saw Palmetto Tonic ofrecen apoyo herbal para esa vía — pero las fuentes herbales de zinc por sí solas no pueden reemplazar al mineral en sí. Trabajan en conjunto.",
        whyThisBrand: "El zinc de Thorne usa quelación de bisglicinato — zinc unido a dos moléculas de glicina para una absorción superior y una digestión más suave. El picolinato de zinc es otra forma bien absorbida. El óxido de zinc y el sulfato de zinc (comunes en suplementos baratos) tienen poca biodisponibilidad y con frecuencia causan náuseas. Thorne fabrica bajo certificación NSF Sport.",
        whyThisNutrient: "El zinc desempeña un papel en la función inmunitaria, la cicatrización de heridas y otros procesos cotidianos. Los vegetarianos y quienes hacen ejercicio intenso están entre los grupos a veces mencionados en investigaciones como con mayores necesidades de zinc.",
        whyNotCheap: "El óxido de zinc — por mucho la forma más común en suplementos — se absorbe mal en comparación con el bisglicinato y el picolinato de zinc. Igualar la entrega efectiva de una forma quelada con óxido de zinc requiere una cantidad mucho mayor, lo que tiende a venir con más molestias gastrointestinales. La forma quelada gana en todos los aspectos.",
        form: "Bisglicinato de zinc (quelado)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "El zinc fue el suplemento del que más dudé hasta que leí la investigación sobre la próstata. El hecho de que la próstata concentre activamente el zinc te dice todo sobre lo importante que es.",
      },
      fr: {
        name: "Bisglycinate de Zinc",
        subtitle: "Le minéral dont dépendent le système immunitaire, la testostérone et la prostate.",
        teaNote: "La prostate concentre le zinc à des niveaux plus élevés que tout autre organe. Vos mélanges Prostate Shield et Zinc & Saw Palmetto Tonic offrent un soutien à base de plantes pour cette voie — mais les sources végétales de zinc seules ne peuvent pas remplacer le minéral lui-même. Ils agissent de concert.",
        whyThisBrand: "Le zinc de Thorne utilise une chélation au bisglycinate — du zinc lié à deux molécules de glycine pour une absorption supérieure et une digestion plus douce. Le picolinate de zinc est une autre forme bien absorbée. L'oxyde de zinc et le sulfate de zinc (courants dans les suppléments bon marché) ont une faible biodisponibilité et provoquent fréquemment des nausées. Thorne fabrique sous certification NSF Sport.",
        whyThisNutrient: "Le zinc joue un rôle dans la fonction immunitaire, la cicatrisation des plaies et d'autres processus quotidiens. Les végétariens et les personnes pratiquant un exercice intense font partie des groupes parfois mentionnés dans la recherche comme ayant des besoins en zinc plus élevés.",
        whyNotCheap: "L'oxyde de zinc — de loin la forme la plus courante dans les suppléments — s'absorbe mal comparé au bisglycinate et au picolinate de zinc. Égaler l'apport efficace d'une forme chélatée avec de l'oxyde de zinc nécessite une quantité bien plus grande, ce qui s'accompagne souvent de plus d'inconfort digestif. La forme chélatée l'emporte sur tous les plans.",
        form: "Bisglycinate de zinc (chélaté)",
        thirdParty: "Certifié NSF Certified for Sport",
        personalNote: "Le zinc était le supplément dont j'étais le plus sceptique jusqu'à ce que je lise les recherches sur la prostate. Le fait que la prostate concentre activement le zinc en dit long sur son importance.",
      },
      pt: {
        name: "Bisglicinato de Zinco",
        subtitle: "O mineral do qual dependem o sistema imunológico, a testosterona e a próstata.",
        teaNote: "A próstata concentra zinco em níveis mais altos do que qualquer outro órgão. Suas misturas Prostate Shield e Zinc & Saw Palmetto Tonic oferecem suporte fitoterápico para essa via — mas fontes herbais de zinco sozinhas não conseguem substituir o mineral em si. Eles atuam em conjunto.",
        whyThisBrand: "O zinco da Thorne usa quelação por bisglicinato — zinco ligado a duas moléculas de glicina para absorção superior e digestão mais suave. O picolinato de zinco é outra forma bem absorvida. O óxido de zinco e o sulfato de zinco (comuns em suplementos baratos) têm baixa biodisponibilidade e frequentemente causam náusea. A Thorne fabrica sob certificação NSF Sport.",
        whyThisNutrient: "O zinco desempenha um papel na função imunológica, cicatrização de feridas e em vários outros processos cotidianos. Vegetarianos e praticantes de exercícios intensos estão entre os grupos às vezes mencionados em pesquisas como tendo maiores necessidades de zinco.",
        whyNotCheap: "O óxido de zinco — de longe a forma mais comum em suplementos — absorve mal em comparação com o bisglicinato e o picolinato de zinco. Igualar a entrega eficaz de uma forma quelada com óxido de zinco exige uma quantidade muito maior, o que costuma vir com mais desconforto gastrointestinal. A forma quelada vence em todos os critérios.",
        form: "Bisglicinato de zinco (quelado)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "O zinco foi o suplemento sobre o qual eu tinha mais dúvidas até ler a pesquisa sobre a próstata. O fato de a próstata concentrar ativamente o zinco diz tudo sobre sua importância.",
      },
      ht: {
        name: "Bisglisinat Zenk",
        subtitle: "Mineral sistèm imin, testosteròn, ak pwostat la depann sou li.",
        teaNote: "Pwostat la konsantre zenk nan nivo pi wo pase nenpòt lòt ògàn. Melanj Prostate Shield ak Zinc & Saw Palmetto Tonic ou yo bay sipò plant pou chemen sa a — men sous zenk plant poukont yo pa ka ranplase mineral la limenm. Yo travay ansanm.",
        whyThisBrand: "Zenk Thorne a itilize chelasyon bisglisinat — zenk tache ak de molekil glisin pou yon absòpsyon siperyè ak dijesyon pi dou. Pikolinat zenk se yon lòt fòm ki byen absòbe. Oksid zenk ak silfat zenk (komen nan sipleman bon mache) gen fèb byodisponibilite e yo souvan lakòz nozeya. Thorne fabrike anba sètifikasyon NSF Sport.",
        whyThisNutrient: "Zenk jwe yon wòl nan fonksyon iminitè, gerizon blesi, ak yon kantite lòt pwosesis chak jou. Vejetaryen ak moun ki fè egzèsis entans yo pami gwoup yo pafwa mansyone nan rechèch kòm gen plis bezwen zenk.",
        whyNotCheap: "Oksid zenk — byen lwen fòm ki pi komen nan sipleman — absòbe mal konpare ak bisglisinat ak pikolinat zenk. Pou matche delivrans efikas yon fòm chelate ak oksid zenk mande yon kantite pi gwo anpil, ki anjeneral vin ak plis enkonfò GI. Fòm chelate a genyen sou tout kritè.",
        form: "Bisglisinat zenk (chelate)",
        thirdParty: "Sètifye NSF Certified for Sport",
        personalNote: "Zenk se sipleman mwen te pi skeptik sou li jiskaske m li rechèch sou pwostat la. Fè pwostat la konsantre zenk aktivman di w tout sa ou bezwen konnen sou enpòtans li.",
      },
    },
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
    whyThisNutrient: "B12 supports nerve function and energy metabolism. Vegans, vegetarians, and older adults are commonly noted as groups with higher B12 needs, since absorption and dietary sources can both play a role.",
    whyNotCheap: "Cyanocobalamin is synthetic and cheap. Methylcobalamin is the form naturally found in food and used by the nervous system. For neurological health specifically, the methylcobalamin form has significantly more supporting evidence.",
    form: "Methylcobalamin (active, neurologically ready form)",
    thirdParty: "NSF Certified for Sport",
    personalNote: "I switched from cyanocobalamin to methylcobalamin two years ago. The difference in mental clarity was noticeable within two weeks. I didn't expect that.",
    translations: {
      es: {
        name: "Vitamina B12 Metilcobalamina",
        subtitle: "La forma activa. Tus nervios la usan de inmediato.",
        teaNote: "Tus mezclas de energía y enfoque trabajan en las vías neuronales, los adaptógenos y la circulación. La B12 es la materia prima para la mielina — el aislamiento alrededor de cada fibra nerviosa. Sin suficiente B12, ninguna de esas vías transmite señales con eficacia. Esta es la base bajo la fórmula.",
        whyThisBrand: "La B12 de Thorne usa metilcobalamina — la forma neurológicamente activa que tu cuerpo usa de inmediato. La cianocobalamina (presente en la mayoría de los suplementos de B12) debe ser convertida por el cuerpo mediante un proceso de dos pasos, y las personas con variantes del gen MTHFR (aproximadamente el 40% de la población) hacen esta conversión con dificultad. La metilcobalamina evita ese paso por completo.",
        whyThisNutrient: "La B12 favorece la función nerviosa y el metabolismo energético. Los veganos, los vegetarianos y los adultos mayores suelen mencionarse como grupos con mayores necesidades de B12, ya que tanto la absorción como las fuentes dietéticas pueden influir.",
        whyNotCheap: "La cianocobalamina es sintética y económica. La metilcobalamina es la forma que se encuentra naturalmente en los alimentos y que usa el sistema nervioso. Para la salud neurológica específicamente, la forma metilcobalamina cuenta con mucha más evidencia de respaldo.",
        form: "Metilcobalamina (forma activa, neurológicamente lista)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "Cambié de cianocobalamina a metilcobalamina hace dos años. La diferencia en claridad mental fue notable en dos semanas. No me lo esperaba.",
      },
      fr: {
        name: "Vitamine B12 Méthylcobalamine",
        subtitle: "La forme active. Vos nerfs l'utilisent immédiatement.",
        teaNote: "Vos mélanges énergie et concentration agissent sur les voies neuronales, les adaptogènes et la circulation. La B12 est la matière première de la myéline — l'isolant autour de chaque fibre nerveuse. Sans B12 suffisante, aucune de ces voies ne transmet efficacement les signaux. C'est le socle sous la formule.",
        whyThisBrand: "La B12 de Thorne utilise la méthylcobalamine — la forme neurologiquement active que votre corps utilise immédiatement. La cyanocobalamine (présente dans la plupart des suppléments de B12) doit être convertie par le corps via un processus en deux étapes, et les personnes porteuses de variantes du gène MTHFR (environ 40% de la population) effectuent mal cette conversion. La méthylcobalamine évite complètement cette étape.",
        whyThisNutrient: "La B12 soutient la fonction nerveuse et le métabolisme énergétique. Les végans, les végétariens et les personnes âgées sont souvent cités comme des groupes ayant des besoins en B12 plus élevés, car l'absorption et les sources alimentaires peuvent toutes deux jouer un rôle.",
        whyNotCheap: "La cyanocobalamine est synthétique et peu coûteuse. La méthylcobalamine est la forme naturellement présente dans les aliments et utilisée par le système nerveux. Pour la santé neurologique spécifiquement, la forme méthylcobalamine dispose de beaucoup plus de preuves à l'appui.",
        form: "Méthylcobalamine (forme active, prête neurologiquement)",
        thirdParty: "Certifié NSF Certified for Sport",
        personalNote: "Je suis passé de la cyanocobalamine à la méthylcobalamine il y a deux ans. La différence en clarté mentale était perceptible en deux semaines. Je ne m'y attendais pas.",
      },
      pt: {
        name: "Vitamina B12 Metilcobalamina",
        subtitle: "A forma ativa. Seus nervos a usam imediatamente.",
        teaNote: "Suas misturas de energia e foco atuam nas vias neurais, adaptógenos e circulação. A B12 é a matéria-prima da mielina — o isolamento ao redor de cada fibra nervosa. Sem B12 suficiente, nenhuma dessas vias transmite sinais com eficiência. Esta é a base sob a fórmula.",
        whyThisBrand: "A B12 da Thorne usa metilcobalamina — a forma neurologicamente ativa que seu corpo usa imediatamente. A cianocobalamina (encontrada na maioria dos suplementos de B12) precisa ser convertida pelo corpo por um processo de duas etapas, e pessoas com variantes do gene MTHFR (cerca de 40% da população) fazem essa conversão de forma deficiente. A metilcobalamina evita essa etapa por completo.",
        whyThisNutrient: "A B12 apoia a função nervosa e o metabolismo energético. Veganos, vegetarianos e idosos são comumente citados como grupos com maiores necessidades de B12, já que tanto a absorção quanto as fontes alimentares podem influenciar.",
        whyNotCheap: "A cianocobalamina é sintética e barata. A metilcobalamina é a forma naturalmente encontrada nos alimentos e usada pelo sistema nervoso. Para a saúde neurológica especificamente, a forma metilcobalamina tem significativamente mais evidências de apoio.",
        form: "Metilcobalamina (forma ativa, pronta neurologicamente)",
        thirdParty: "Certificado NSF Certified for Sport",
        personalNote: "Mudei da cianocobalamina para a metilcobalamina há dois anos. A diferença na clareza mental foi perceptível em duas semanas. Eu não esperava por isso.",
      },
      ht: {
        name: "Vitamin B12 Metilkobalamin",
        subtitle: "Fòm aktif la. Nè ou yo itilize l imedyatman.",
        teaNote: "Melanj enèji ak konsantrasyon ou yo travay sou chemen newonal, adaptojèn, ak sikilasyon. B12 se materyo brit pou myelin — izolasyon ki antoure chak fib nève. San ase B12, okenn nan chemen sa yo pa transmèt siyal efikasman. Sa a se fondasyon anba fòmil la.",
        whyThisBrand: "B12 Thorne a itilize metilkobalamin — fòm aktif newolojikman kò ou itilize imedyatman. Syanokobalamin (yo jwenn nan pifò sipleman B12) dwe konvèti pa kò a atravè yon pwosesis de etap, e moun ki gen varyant jèn MTHFR (apeprè 40% popilasyon an) fè konvèsyon sa a mal. Metilkobalamin evite etap sa a nèt.",
        whyThisNutrient: "B12 sipòte fonksyon nè ak metabolis enèji. Vegan, vejetaryen, ak granmoun aje yo souvan site kòm gwoup ki gen plis bezwen B12, paske ni absòpsyon ni sous alimantè ka jwe yon wòl.",
        whyNotCheap: "Syanokobalamin se sentetik e li bon mache. Metilkobalamin se fòm yo jwenn natirèlman nan manje e sistèm nève a itilize. Pou sante newolojik espesyalman, fòm metilkobalamin gen plis prèv sipò anpil.",
        form: "Metilkobalamin (fòm aktif, pare newolojikman)",
        thirdParty: "Sètifye NSF Certified for Sport",
        personalNote: "Mwen chanje soti nan syanokobalamin pou ale nan metilkobalamin de zan pase. Diferans nan klète mantal la te remakab nan de semèn. Mwen pa t atann sa.",
      },
    },
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
    whyThisNutrient: "Vitamin C is an antioxidant and a cofactor in collagen production. Humans don't synthesize their own vitamin C, so it comes entirely from diet or supplementation.",
    whyNotCheap: "Standard ascorbic acid tablets above 500mg produce mostly expensive urine. The dose your tissues actually receive is limited by gut transport capacity. Liposomal delivery circumvents this completely. The price per effective dose is actually competitive when you account for what's actually absorbed.",
    form: "Liposomal ascorbic acid (phospholipid encapsulated)",
    thirdParty: "Third-party tested",
    personalNote: "This is what I reach for at the first sign of feeling run down. I've taken it consistently for three years and it's part of my regular routine.",
    translations: {
      es: {
        name: "Vitamina C Liposomal",
        subtitle: "La C estándar se elimina en su mayoría. La entrega liposomal lo cambia todo.",
        teaNote: "La vitamina C es esencial para la síntesis de colágeno y es un cofactor en la vía de desintoxicación de Fase I de tu hígado. Tus tés de limpieza hepática movilizan toxinas para su excreción — la vitamina C ayuda a neutralizar los radicales libres generados en ese proceso y apoya la reparación del colágeno que sigue. Toma tu mezcla hepática con vitamina C liposomal para el protocolo completo.",
        whyThisBrand: "LivOn Labs fue pionero en la entrega de vitamina C liposomal. La burbuja de fosfolípidos que rodea cada molécula de C evita los límites de absorción intestinal — la vitamina C estándar por encima de 200mg se excreta en su mayoría porque el mecanismo de transporte intestinal se satura. La C liposomal alcanza niveles plasmáticos comparables a la vitamina C intravenosa a una fracción del costo. Usada por médicos integrativos para apoyo inmune y recuperación post-enfermedad.",
        whyThisNutrient: "La vitamina C es un antioxidante y un cofactor en la producción de colágeno. Los humanos no sintetizan su propia vitamina C, por lo que proviene completamente de la dieta o la suplementación.",
        whyNotCheap: "Las tabletas estándar de ácido ascórbico por encima de 500mg producen en su mayoría orina costosa. La dosis que tus tejidos realmente reciben está limitada por la capacidad de transporte intestinal. La entrega liposomal evita esto por completo. El precio por dosis efectiva es en realidad competitivo si se considera lo que realmente se absorbe.",
        form: "Ácido ascórbico liposomal (encapsulado en fosfolípidos)",
        thirdParty: "Probado por terceros",
        personalNote: "Esto es lo que tomo ante el primer indicio de sentirme decaído. Lo he tomado de manera constante durante tres años y es parte de mi rutina regular.",
      },
      fr: {
        name: "Vitamine C Liposomale",
        subtitle: "La vitamine C standard est en grande partie éliminée. La délivrance liposomale change tout.",
        teaNote: "La vitamine C est essentielle à la synthèse du collagène et constitue un cofacteur dans la voie de détoxification de Phase I de votre foie. Vos thés de nettoyage hépatique mobilisent les toxines pour leur élimination — la vitamine C aide à neutraliser les radicaux libres générés dans ce processus et soutient la réparation du collagène qui suit. Prenez votre mélange hépatique avec de la vitamine C liposomale pour le protocole complet.",
        whyThisBrand: "LivOn Labs a été le pionnier de la délivrance de vitamine C liposomale. La bulle de phospholipides entourant chaque molécule de C contourne les limites d'absorption intestinale — la vitamine C standard au-delà de 200mg est principalement éliminée car le mécanisme de transport intestinal sature. La vitamine C liposomale atteint des taux plasmatiques comparables à la vitamine C intraveineuse pour une fraction du coût. Utilisée par les médecins en médecine intégrative pour le soutien immunitaire et la récupération post-maladie.",
        whyThisNutrient: "La vitamine C est un antioxydant et un cofacteur dans la production de collagène. Les humains ne synthétisent pas leur propre vitamine C, elle provient donc entièrement de l'alimentation ou de la supplémentation.",
        whyNotCheap: "Les comprimés d'acide ascorbique standard au-delà de 500mg produisent surtout une urine coûteuse. La dose que vos tissus reçoivent réellement est limitée par la capacité de transport intestinal. La délivrance liposomale contourne complètement ce problème. Le prix par dose efficace est en réalité compétitif si l'on tient compte de ce qui est réellement absorbé.",
        form: "Acide ascorbique liposomal (encapsulé en phospholipides)",
        thirdParty: "Testé par un tiers",
        personalNote: "C'est ce que je prends au premier signe de fatigue. Je le prends régulièrement depuis trois ans et cela fait partie de ma routine habituelle.",
      },
      pt: {
        name: "Vitamina C Lipossomal",
        subtitle: "A vitamina C padrão é, em sua maioria, excretada. A entrega lipossomal muda tudo.",
        teaNote: "A vitamina C é essencial para a síntese de colágeno e é um cofator na via de desintoxicação de Fase I do seu fígado. Seus chás de limpeza hepática mobilizam toxinas para excreção — a vitamina C ajuda a neutralizar os radicais livres gerados nesse processo e apoia o reparo de colágeno que se segue. Tome sua mistura hepática com vitamina C lipossomal para o protocolo completo.",
        whyThisBrand: "A LivOn Labs foi pioneira na entrega de vitamina C lipossomal. A bolha de fosfolipídios ao redor de cada molécula de C contorna os limites de absorção intestinal — a vitamina C padrão acima de 200mg é em sua maioria excretada porque o mecanismo de transporte intestinal satura. A vitamina C lipossomal atinge níveis plasmáticos comparáveis à vitamina C intravenosa por uma fração do custo. Usada por médicos da medicina integrativa para suporte imunológico e recuperação pós-doença.",
        whyThisNutrient: "A vitamina C é um antioxidante e um cofator na produção de colágeno. Os humanos não sintetizam sua própria vitamina C, portanto ela vem inteiramente da dieta ou da suplementação.",
        whyNotCheap: "Comprimidos padrão de ácido ascórbico acima de 500mg produzem principalmente urina cara. A dose que seus tecidos realmente recebem é limitada pela capacidade de transporte intestinal. A entrega lipossomal contorna isso completamente. O preço por dose efetiva é, na verdade, competitivo quando se considera o que é realmente absorvido.",
        form: "Ácido ascórbico lipossomal (encapsulado em fosfolipídios)",
        thirdParty: "Testado por terceiros",
        personalNote: "É o que eu uso ao primeiro sinal de estar me sentindo esgotado. Tenho tomado de forma consistente há três anos e é parte da minha rotina regular.",
      },
      ht: {
        name: "Vitamin C Liposomal",
        subtitle: "Vitamin C estanda majorite ekskrete. Delivrans liposomal chanje tout bagay.",
        teaNote: "Vitamin C esansyèl pou sentèz kolajèn e li se yon kofaktè nan chemen detoksifikasyon Faz I fwa ou. Te netwayaj fwa ou yo ap mobilize toksin pou ekskresyon — vitamin C ede netralize radikal lib ki jenere nan pwosesis sa a e li soutni repare kolajèn ki swiv. Pran melanj fwa ou a ak vitamin C liposomal pou pwotokòl konplè a.",
        whyThisBrand: "LivOn Labs te pyonye nan delivrans vitamin C liposomal. Boul fosfolipid ki antoure chak molekil C kontoune limit absòpsyon entestinal — vitamin C estanda anwo 200mg majorite ekskrete paske mekanis transpò entestinal la sature. C liposomal rive nivo plasmatik konparab ak vitamin C entravenez pou yon fraksyon pri a. Itilize pa medsen entegratif pou sipò imin ak rekiperasyon apre maladi.",
        whyThisNutrient: "Vitamin C se yon antioksidan ak yon kofaktè nan pwodiksyon kolagèn. Imen pa sentetize pwòp vitamin C yo, kidonk li soti antyèman nan rejim alimantè oswa siplemantasyon.",
        whyNotCheap: "Tablèt asid askòbik estanda anwo 500mg majorite pwodui pipi ki chè. Dòz tisi ou yo aktyèlman resevwa limite pa kapasite transpò entestinal la. Delivrans liposomal kontoune sa nèt. Pri pa dòz efikas la aktyèlman konpetitif lè w konsidere sa ki aktyèlman absòbe.",
        form: "Asid askòbik liposomal (ankapsile nan fosfolipid)",
        thirdParty: "Teste pa tyès pati",
        personalNote: "Sa a se sa m pran nan premye siy mwen santi m fatige. Mwen pran l konstamman pandan twazan e li fè pati woutin regilye m.",
      },
    },
  },
];

const CATEGORIES = [
  { key: "all",      label: "All 10",           emoji: "✦" },
  { key: "vitamin",  label: "Supplements",          emoji: "☀️" },
  { key: "mineral",  label: "Supplements",          emoji: "🌍" },
  { key: "specialty",label: "Specialty",         emoji: "⚗️" },
  { key: "herb",     label: "Herbal Extracts",   emoji: "🌿" },
];

// ─── SPINNING AMAZON BUTTON ──────────────────────────────────────────────────
function AmazonSpinBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      title="View on Amazon"
      style={{
        position:"relative", width:120, height:120,
        cursor:"pointer", flexShrink:0,
      }}
    >
      {/* SVG rotating text ring — perfectly centred via textPath */}
      <svg
        viewBox="0 0 120 120"
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          animation:"suppSpinCCW 18s linear infinite",
          overflow:"visible",
        }}
      >
        <defs>
          <path
            id="suppSpinPath"
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>
        <text style={{
          fontSize:"8.5px", fontFamily:"Jost,sans-serif",
          fontWeight:600, letterSpacing:"3.5px",
          fill:"rgba(196,137,58,.85)",
        }}>
          <textPath href="#suppSpinPath" startOffset="0%">
            AMAZON · VIEW ON AMAZON · AMAZON · VIEW ON AMAZON ·
          </textPath>
        </text>
      </svg>

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
        <span style={{fontSize:"1.4rem",color:"white",lineHeight:1,transform:"rotate(-30deg)",display:"inline-block"}}>↗</span>
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
  const { T, lang } = useLang();
  const Ts = getTSupp(lang);
  const LOCALIZED_SUPPLEMENTS = localizeSupplements(SUPPLEMENTS, lang);
  const [filter, setFilter]         = useState("all");
  const [selected, setSelected]     = useState(null);
  const [expanded, setExpanded]     = useState(null);
  const [notifySupp, setNotifySupp] = useState(null);

  const visible = filter === "all"
    ? LOCALIZED_SUPPLEMENTS
    : LOCALIZED_SUPPLEMENTS.filter(s => s.category === filter);

  const handleBuy = async (supp) => {
    if (supp.seedUrl) {
      window.open(supp.seedUrl, "_blank");
      return;
    }
    const url = amz(supp.asin);
    const newTab = window.open(url, "_blank");
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      setNotifySupp(supp);
    }
  };

  // Re-paint page when returning from Amazon/external tab — prevents blank page
  React.useEffect(() => {
    const repaint = () => {
      if (!document.hidden) {
        // Tiny no-op state tick forces React to re-render if page went blank
        setFilter(f => f);
      }
    };
    document.addEventListener("visibilitychange", repaint);
    window.addEventListener("focus", repaint);
    return () => {
      document.removeEventListener("visibilitychange", repaint);
      window.removeEventListener("focus", repaint);
    };
  }, []);

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
          {Ts.eyebrow}
        </div>
        <h1 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem,6vw,3.2rem)",
          fontWeight: 700, color: "#F7F2EA",
          margin: "0 0 12px", lineHeight: 1.15,
        }}>
          {Ts.title}
        </h1>
        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,3vw,1.5rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "rgba(196,137,58,.9)", margin: "0 0 20px",
        }}>
          {Ts.subtitle}
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
            {Ts.noteLabel}
          </div>
          <p style={{fontSize:".88rem",color:"rgba(247,242,234,.7)",lineHeight:1.85,margin:0,fontWeight:300}}>
            {Ts.noteP1}
          </p>
          <p style={{fontSize:".88rem",color:"rgba(247,242,234,.7)",lineHeight:1.85,margin:"12px 0 0",fontWeight:300}}>
            {Ts.noteP2}
          </p>
          <div style={{marginTop:16,padding:"12px 14px",background:"rgba(196,137,58,.08)",border:"1px solid rgba(196,137,58,.25)",borderRadius:12,fontSize:".74rem",color:"rgba(247,242,234,.75)",lineHeight:1.6}}>
            <strong style={{color:"rgba(196,137,58,.9)"}}>{Ts.disclosureLabel}</strong> {Ts.disclosureText}
          </div>
        </div>

        {/* Quality badges */}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:8}}>
          {[
            [Ts.badgeForm,Ts.badgeFormSub],
            [Ts.badgeTested,Ts.badgeTestedSub],
            [Ts.badgeFillers,Ts.badgeFillersSub],
            [Ts.badgeTea,Ts.badgeTeaSub],
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
        {/* Trust line */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,padding:"6px 10px",background:"rgba(196,137,58,.05)",borderRadius:8,border:"1px solid rgba(196,137,58,.1)"}}>
          <span style={{fontSize:".65rem",color:"rgba(196,137,58,.5)"}}>↗</span>
          <span style={{fontSize:".6rem",color:"rgba(247,242,234,.3)",fontFamily:"Jost,sans-serif",lineHeight:1.5}}>
            Opens Amazon in a new tab · Sourced &amp; vetted by Chai Holistic
          </span>
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

          {/* CTA — personal endorsement + spinning Amazon button */}
          <div style={{background:"linear-gradient(135deg,rgba(196,137,58,.1),rgba(196,137,58,.05))",border:"1px solid rgba(196,137,58,.2)",borderRadius:16,padding:"16px 18px",marginBottom:16}}>
            {/* Endorsement line */}
            <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,rgba(196,137,58,.3),rgba(196,137,58,.1))",border:"1px solid rgba(196,137,58,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>🌿</div>
              <div>
                <div style={{fontSize:".6rem",letterSpacing:".15em",textTransform:"uppercase",color:"rgba(196,137,58,.7)",marginBottom:4,fontWeight:600}}>Alex's Pick</div>
                <div style={{fontSize:".78rem",color:"rgba(247,242,234,.8)",lineHeight:1.65,fontStyle:"italic",fontWeight:300}}>
                  "This is the specific brand and form I'd use myself — and the one I'd hand to someone I care about."
                </div>
              </div>
            </div>
            {/* Price context */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:"rgba(0,0,0,.2)",borderRadius:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:".55rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(196,137,58,.6)",marginBottom:2}}>Typical Price</div>
                <div style={{fontSize:"1rem",fontFamily:"Playfair Display,serif",color:"rgba(196,137,58,.95)",fontWeight:600}}>{supp.price}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:".55rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:2}}>Sold by</div>
                <div style={{fontSize:".75rem",color:"rgba(255,255,255,.6)",fontWeight:500}}>{supp.brand}</div>
              </div>
            </div>
            {/* Spinning button */}
            <div style={{display:"flex",justifyContent:"center"}}>
              <AmazonSpinBtn onClick={onBuy}/>
            </div>
            {/* Trust line */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12}}>
              <span style={{fontSize:".6rem",color:"rgba(196,137,58,.4)"}}>↗</span>
              <span style={{fontSize:".6rem",color:"rgba(247,242,234,.25)",fontFamily:"Jost,sans-serif",lineHeight:1.5,textAlign:"center"}}>
                Opens Amazon in a new tab · Sourced &amp; vetted by Chai Holistic
              </span>
            </div>
          </div>
          <p style={{fontSize:".58rem",color:"rgba(247,242,234,.2)",textAlign:"center",margin:"0 0 4px",lineHeight:1.6}}>
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
