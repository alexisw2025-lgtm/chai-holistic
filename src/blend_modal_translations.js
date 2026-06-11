/**
 * blend_modal_translations.js
 * Chai Holistic — Main BLENDS array modal content translations
 * 33 blends × 5 languages
 *
 * Usage:
 *   import { getBlendModal } from "./blend_modal_translations";
 *   const t = getBlendModal(blend.id, lang);
 *   if (t) { use t.name, t.tagline, t.benefit, t.desc }
 */

const BLEND_MODAL_TRANS = {

"m1": {
  es: { name:"Amanecer Matutino", tagline:"Saluda el día con intención", benefit:"Energizar · Enfocar · Elevar", desc:"Tulsi, jengibre y piel de limón despiertan tus sentidos y generan claridad para el día que se avecina." },
  fr: { name:"Éveil du Matin", tagline:"Accueillez le jour avec intention", benefit:"Énergiser · Concentrer · Élever", desc:"Le tulsi, le gingembre et le zeste de citron éveillent vos sens et apportent de la clarté pour la journée à venir." },
  pt: { name:"Despertar Matinal", tagline:"Receba o dia com intenção", benefit:"Energizar · Focar · Elevar", desc:"Tulsi, gengibre e casca de limão despertam seus sentidos e geram clareza para o dia que se aproxima." },
  ht: { name:"Leve Maten", tagline:"Akèy jounen an ak entansyon", benefit:"Bay Enèji · Konsantre · Eleve", desc:"Tulsi, jenjann ak po sitwon reveye sans ou yo epi kreye klète pou jounen k ap vini an." },
  jm: { name:"Morning Rise", tagline:"Greet di day wid intention", benefit:"Energise · Focus · Uplift", desc:"Tulsi, ginger and lemon peel awaken yuh senses and spark clarity fi di day ahead." },
},

"cerasee": {
  es: { name:"El Cerasee de la Abuela", tagline:"La hierba más importante del jardín", benefit:"Limpieza de Sangre · Azúcar en Sangre · Hígado", desc:"Esta es la receta que fue transmitida en silencio durante generaciones. Cerasee puro — sin mezclar, sin suavizar — tal como fue concebido." },
  fr: { name:"Le Cerasee de Grand-mère", tagline:"L'herbe la plus importante de la cour", benefit:"Purification Sanguine · Glycémie · Foie", desc:"C'est la recette transmise silencieusement de génération en génération. Du cerasee pur — sans mélange, sans adoucissement — tel qu'il était prévu." },
  pt: { name:"O Cerasee da Avó", tagline:"A erva mais importante do quintal", benefit:"Purificação do Sangue · Açúcar no Sangue · Fígado", desc:"Esta é a receita transmitida em silêncio por gerações. Cerasee puro — sem mistura, sem suavização — exatamente como foi concebido." },
  ht: { name:"Cerasee Grann", tagline:"Zèb ki pi enpòtan nan lakou a", benefit:"Netwayaj San · Sik San · Fwa", desc:"Se resèt ki te transmèt an silans pandan jenerasyon. Cerasee pi — san melanj, san rann dou — jan li te fèt pou ye a." },
  jm: { name:"Grandmother's Cerasee", tagline:"Di most important herb inna di yard", benefit:"Blood Cleanse · Blood Sugar · Liver", desc:"Dis is di recipe weh was passed down in silence through generations. Pure cerasee — unblended, unsoftened — exactly as it was meant to be." },
},

"cerasee-ginger": {
  es: { name:"Mezcla de Cerasee y Jengibre", tagline:"Medicina bush caribeña conoce el jengibre cálido", benefit:"Circulación · Desintoxicación · Azúcar en Sangre", desc:"El amargo del cerasee equilibrado con el jengibre cálido y la miel. La forma más agradable de tomar tu medicina diaria de cerasee." },
  fr: { name:"Mélange Cerasee & Gingembre", tagline:"La médecine bush caribéenne rencontre le gingembre réchauffant", benefit:"Circulation · Détoxification · Glycémie", desc:"L'amertume du cerasee équilibrée avec du gingembre réchauffant et du miel. La façon la plus agréable de prendre votre médecine quotidienne de cerasee." },
  pt: { name:"Mistura de Cerasee e Gengibre", tagline:"Medicina bush caribenha encontra o gengibre aquecente", benefit:"Circulação · Desintoxicação · Açúcar no Sangue", desc:"O amargor do cerasee equilibrado com gengibre aquecente e mel. A maneira mais agradável de tomar sua medicina diária de cerasee." },
  ht: { name:"Melanj Cerasee ak Jenjann", tagline:"Medsin bush karibeyen rankontre jenjann chofe", benefit:"Sikilasyon · Detoksifikasyon · Sik San", desc:"Amè cerasee ekilibre ak jenjann chofe ak myèl. Fason ki pi agreyab pou pran medsin cerasee chak jou ou." },
  jm: { name:"Cerasee & Ginger Blend", tagline:"Caribbean bush medicine meet warming ginger", benefit:"Circulation · Detox · Blood Sugar", desc:"Di bitterness of cerasee balanced wid warming ginger and honey. Di most pleasant way fi take yuh daily cerasee medicine." },
},

"cerasee-cleanse": {
  es: { name:"Limpieza de Sangre con Cerasee", tagline:"El protocolo completo de sangre e hígado", benefit:"Limpieza Completa de Sangre · Hígado · Riñón", desc:"Cerasee con raíz de diente de leña y hoja de ortiga — una mezcla completa de limpieza de sangre, hígado y riñón. Tres de las hierbas de limpieza más respetadas, combinadas con propósito." },
  fr: { name:"Purification Sanguine au Cerasee", tagline:"Le protocole complet sang et foie", benefit:"Purification Sanguine Complète · Foie · Reins", desc:"Cerasee avec racine de pissenlit et feuille d'ortie — un mélange complet de purification du sang, du foie et des reins." },
  pt: { name:"Limpeza do Sangue com Cerasee", tagline:"O protocolo completo de sangue e fígado", benefit:"Limpeza Completa do Sangue · Fígado · Rim", desc:"Cerasee com raiz de dente-de-leão e folha de urtiga — uma mistura completa de limpeza de sangue, fígado e rins." },
  ht: { name:"Netwayaj San Cerasee", tagline:"Pwotokòl konplè san ak fwa", benefit:"Netwayaj San Konplè · Fwa · Renn", desc:"Cerasee ak rasin pisanlit ak fèy zòtye — yon melanj konplè netwayaj san, fwa ak renn." },
  jm: { name:"Cerasee Blood Cleanse", tagline:"Di complete blood and liver protocol", benefit:"Full Blood Cleanse · Liver · Kidney", desc:"Cerasee wid dandelion root and nettle leaf — a comprehensive blood, liver and kidney cleansing blend. Three of di most respected cleansing herbs, combined wid purpose." },
},

"m2": {
  es: { name:"Reinicio 2AM", tagline:"Para noches inquietas y mentes aceleradas", benefit:"Sueño · Sistema Nervioso · Ansioso", desc:"Cuando 2 de la madrugada y tu mente no se apaga. Valeriana, pasiflora y lavanda para calmar el sistema nervioso y devolverte al sueño." },
  fr: { name:"Réinitialisation 2H", tagline:"Pour les nuits agitées et les esprits en course", benefit:"Sommeil · Système Nerveux · Anxiété", desc:"Quand il est 2h du matin et que votre esprit ne s'éteint pas. Valériane, passiflore et lavande pour calmer le système nerveux et vous ramener au sommeil." },
  pt: { name:"Reset das 2AM", tagline:"Para noites inquietas e mentes aceleradas", benefit:"Sono · Sistema Nervoso · Ansiedade", desc:"Quando são 2 da manhã e sua mente não desliga. Valeriana, maracujá e lavanda para acalmar o sistema nervoso e te devolver ao sono." },
  ht: { name:"Reyajisteman 2ZM", tagline:"Pou nuit enkyè ak lespri k ap kouri", benefit:"Dòmi · Sistèm Nève · Ansyete", desc:"Lè se 2 dimaten epi lespri ou pa etenn. Valeryan, pasiflè ak lavann pou kalman sistèm nève epi retounen ou nan dòmi." },
  jm: { name:"2AM Reset", tagline:"Fi restless nights and racing minds", benefit:"Sleep · Nervous System · Anxious", desc:"When is 2AM and yuh mind won't shut off. Valerian, passionflower and lavender fi calm di nervous system and bring yuh back to sleep." },
},

"immunity": {
  es: { name:"Escudo de Inmunidad", tagline:"Protección inmune de espectro completo", benefit:"Inmunidad · Antiviral · Antiinflamatorio", desc:"Saúco, equinácea y astrágalo trabajan juntos para construir y mantener defensas inmunológicas fuertes. Tómalo en la primera señal de enfermedad o diariamente para prevención." },
  fr: { name:"Bouclier Immunitaire", tagline:"Protection immunitaire à spectre complet", benefit:"Immunité · Antiviral · Anti-inflammatoire", desc:"Sureau, échinacée et astragale travaillent ensemble pour construire et maintenir de solides défenses immunitaires." },
  pt: { name:"Escudo de Imunidade", tagline:"Proteção imunológica de espectro completo", benefit:"Imunidade · Antiviral · Anti-inflamatório", desc:"Sabugueiro, equinácea e astrágalo trabalham juntos para construir e manter fortes defesas imunológicas." },
  ht: { name:"Bouclye Iminite", tagline:"Pwoteksyon iminite espèk konplè", benefit:"Iminite · Antiviral · Anti-Enflamatwa", desc:"Siri, ekinase ak astragal travay ansanm pou konstwi epi kenbe fò defans iminite." },
  jm: { name:"Immunity Shield", tagline:"Full-spectrum immune protection", benefit:"Immunity · Antiviral · Anti-inflammatory", desc:"Elderberry, echinacea and astragalus work together to build and maintain strong immune defenses." },
},

"golden": {
  es: { name:"Sanador Dorado", tagline:"Medicina dorada en cada taza", benefit:"Antiinflamatorio · Digestivo · Cúrcuma", desc:"Cúrcuma, jengibre y pimienta negra en su forma más potente. La pimienta negra aumenta la absorción de curcumina hasta en un 2000%." },
  fr: { name:"Guérisseur Doré", tagline:"Médecine dorée dans chaque tasse", benefit:"Anti-inflammatoire · Digestif · Curcuma", desc:"Curcuma, gingembre et poivre noir sous leur forme la plus puissante. Le poivre noir augmente l'absorption de la curcumine jusqu'à 2000%." },
  pt: { name:"Curador Dourado", tagline:"Medicina dourada em cada xícara", benefit:"Anti-inflamatório · Digestivo · Cúrcuma", desc:"Cúrcuma, gengibre e pimenta-preta em sua forma mais potente. A pimenta-preta aumenta a absorção da curcumina em até 2000%." },
  ht: { name:"Gerizon Dore", tagline:"Medsin dore nan chak tas", benefit:"Anti-Enflamatwa · Dijestif · Toumèrik", desc:"Toumèrik, jenjann ak pwèv nwa nan fòm ki pi pwisan yo. Pwèv nwa ogmante absòpsyon kirkumin jouk 2000%." },
  jm: { name:"Golden Healer", tagline:"Golden medicine in every cup", benefit:"Anti-inflammatory · Digestive · Turmeric", desc:"Turmeric, ginger and black pepper in their most potent form. Black pepper increases curcumin absorption by up to 2000%." },
},

"liver-love": {
  es: { name:"Hígado y Amor", tagline:"Para el órgano que hace todo", benefit:"Hígado · Desintoxicación · Digestión", desc:"Tu hígado procesa todo lo que comes, bebes y respiras. El cardo mariano, el diente de leña y la raíz de bardana son tres de los más confiables protectores hepáticos." },
  fr: { name:"Foie & Amour", tagline:"Pour l'organe qui fait tout", benefit:"Foie · Détoxification · Digestion", desc:"Votre foie traite tout ce que vous mangez, buvez et respirez. Le chardon-Marie, le pissenlit et la racine de bardane sont trois des hépatoprotecteurs les plus fiables." },
  pt: { name:"Fígado e Amor", tagline:"Para o órgão que faz tudo", benefit:"Fígado · Desintoxicação · Digestão", desc:"Seu fígado processa tudo que você come, bebe e respira. Cardo-de-leite, dente-de-leão e raiz de bardana são três dos hepatoprotetores mais confiáveis." },
  ht: { name:"Fwa ak Lanmou", tagline:"Pou ògan ki fè tout bagay", benefit:"Fwa · Detoksifikasyon · Dijestion", desc:"Fwa ou trete tout sa ou manje, bwè ak respire. Kadon lèt, pisanlit ak rasin bàdann se twa nan hepatoprotektè yo ki pi fyab." },
  jm: { name:"Liver & Love", tagline:"Fi di organ weh does everything", benefit:"Liver · Detox · Digestion", desc:"Yuh liver processes everything yuh eat, drink and breathe. Milk thistle, dandelion and burdock root are three of di most trusted liver protectors." },
},

"deep-liver": {
  es: { name:"Limpieza Profunda del Hígado", tagline:"Una limpieza exhaustiva para una carga pesada", benefit:"Regeneración Hepática · Desintoxicación Profunda · Bilis", desc:"Para el daño hepático crónico, el consumo de alcohol o el uso prolongado de medicamentos. Esta mezcla regenera activamente las células hepáticas mientras filtra las toxinas." },
  fr: { name:"Nettoyage Profond du Foie", tagline:"Un nettoyage complet pour une charge lourde", benefit:"Régénération Hépatique · Détox Profonde · Bile", desc:"Pour les dommages hépatiques chroniques, la consommation d'alcool ou l'utilisation prolongée de médicaments. Ce mélange régénère activement les cellules hépatiques." },
  pt: { name:"Limpeza Profunda do Fígado", tagline:"Uma limpeza completa para uma carga pesada", benefit:"Regeneração Hepática · Detox Profundo · Bile", desc:"Para dano hepático crônico, consumo de álcool ou uso prolongado de medicamentos. Esta mistura regenera ativamente as células hepáticas enquanto filtra as toxinas." },
  ht: { name:"Netwayaj Fwa Fon", tagline:"Yon netwayaj konplè pou yon chaj lou", benefit:"Rejenèrasyon Fwa · Detoks Fon · Bil", desc:"Pou domaj fwa kwonik, konsòmasyon alkòl oswa itilizasyon pwolonge medikaman. Melanj sa a rejenère aktive selil fwa." },
  jm: { name:"Deep Liver Cleanse", tagline:"A thorough cleanse fi a heavy load", benefit:"Liver Regeneration · Deep Detox · Bile", desc:"Fi chronic liver damage, alcohol consumption or prolonged medication use. Dis blend actively regenerates liver cells while filtering toxins." },
},

"full-detox": {
  es: { name:"Desintoxicación Corporal Completa", tagline:"El reinicio completo", benefit:"Cuerpo Completo · Sangre · Hígado · Riñón · Linfa", desc:"La fórmula de limpieza más completa de la colección. Diseñada para una limpieza de 21 días que abarca hígado, riñones, sangre y sistema linfático." },
  fr: { name:"Détox Corps Entier", tagline:"La réinitialisation complète", benefit:"Corps Entier · Sang · Foie · Reins · Lymphe", desc:"La formule de nettoyage la plus complète de la collection. Conçue pour une cure de 21 jours couvrant le foie, les reins, le sang et le système lymphatique." },
  pt: { name:"Detox Corporal Completo", tagline:"O reset completo", benefit:"Corpo Inteiro · Sangue · Fígado · Rim · Linfa", desc:"A fórmula de limpeza mais abrangente da coleção. Projetada para uma limpeza de 21 dias cobrindo fígado, rins, sangue e sistema linfático." },
  ht: { name:"Detoks Kò Antye", tagline:"Reyajisteman konplè a", benefit:"Kò Antye · San · Fwa · Renn · Lenfatik", desc:"Fòmil netwayaj ki pi konplè nan koleksyon an. Fèt pou yon netwayaj 21 jou ki kouvri fwa, renn, san ak sistèm lenfatik." },
  jm: { name:"Full Body Detox", tagline:"Di complete reset", benefit:"Full Body · Blood · Liver · Kidney · Lymph", desc:"Di most comprehensive cleanse formula in di collection. Designed fi a 21-day cleanse covering liver, kidneys, blood and lymphatic system." },
},

"blood-pure": {
  es: { name:"Purificador de Sangre", tagline:"Limpia y renueva tu sangre", benefit:"Purificación de Sangre · Piel · Linfa", desc:"El trébol rojo, la bardana y la ortiga son tres de las plantas de purificación de sangre más antiguas y respetadas. Esta mezcla trabaja gradualmente para limpiar el flujo sanguíneo." },
  fr: { name:"Purificateur de Sang", tagline:"Nettoyez et renouvelez votre sang", benefit:"Purification Sanguine · Peau · Lymphe", desc:"Le trèfle rouge, la bardane et l'ortie sont trois des plantes de purification sanguine les plus anciennes et respectées." },
  pt: { name:"Purificador do Sangue", tagline:"Limpe e renove seu sangue", benefit:"Purificação do Sangue · Pele · Linfa", desc:"Trevo vermelho, bardana e urtiga são três das plantas de purificação do sangue mais antigas e respeitadas." },
  ht: { name:"Pirifye San", tagline:"Netwaye epi renouvle san ou", benefit:"Pirifye San · Po · Lenfatik", desc:"Trefle wouj, bàdann ak zòtye se twa nan pi ansyen ak respekte plant pirifye san yo." },
  jm: { name:"Blood Purifier", tagline:"Cleanse and renew yuh blood", benefit:"Blood Purification · Skin · Lymph", desc:"Red clover, burdock and nettle are three of di oldest and most respected blood-purifying plants." },
},

"kidney-flush": {
  es: { name:"Limpieza Renal", tagline:"Apoyo suave para tus órganos más trabajadores", benefit:"Riñón · Diurético · Inflamación", desc:"Los riñones filtran alrededor de 200 litros de sangre cada día. Esta mezcla apoya ese trabajo con hierbas diuréticas suaves que aumentan el flujo urinario sin irritar." },
  fr: { name:"Drainage Rénal", tagline:"Soutien doux pour vos organes les plus sollicités", benefit:"Reins · Diurétique · Inflammation", desc:"Les reins filtrent environ 200 litres de sang chaque jour. Ce mélange soutient ce travail avec des herbes diurétiques douces." },
  pt: { name:"Limpeza Renal", tagline:"Suporte suave para seus órgãos mais trabalhadores", benefit:"Rim · Diurético · Inflamação", desc:"Os rins filtram cerca de 200 litros de sangue por dia. Esta mistura apoia esse trabalho com ervas diuréticas suaves." },
  ht: { name:"Netwayaj Renn", tagline:"Sipò dou pou ògan ki travay pi di yo", benefit:"Renn · Dyirètik · Enflamasyon", desc:"Renn yo filtre anviwon 200 lit san chak jou. Melanj sa a sipòte travay sa a ak zèb dyirètik dou." },
  jm: { name:"Kidney Flush", tagline:"Gentle support fi yuh hardest-working organs", benefit:"Kidney · Diuretic · Inflammation", desc:"Di kidneys filter around 200 litres of blood every day. Dis blend supports dat work wid gentle diuretic herbs." },
},

"kidney-stone": {
  es: { name:"Apoyo para Cálculos Renales", tagline:"Disuelve, elimina, protege", benefit:"Cálculos Renales · Riñón · Urinario", desc:"Diseñado para disolver los cálculos de oxalato de calcio — el tipo más común. La raíz de vara de oro y la hoja de uva de oso reducen la inflamación renal mientras apoyan el paso de los cálculos." },
  fr: { name:"Soutien Calculs Rénaux", tagline:"Dissoudre, éliminer, protéger", benefit:"Calculs Rénaux · Reins · Urinaire", desc:"Conçu pour dissoudre les calculs d'oxalate de calcium — le type le plus courant. La racine de verge d'or et la busserole réduisent l'inflammation rénale." },
  pt: { name:"Suporte para Pedras nos Rins", tagline:"Dissolver, eliminar, proteger", benefit:"Pedras nos Rins · Rim · Urinário", desc:"Projetado para dissolver cálculos de oxalato de cálcio — o tipo mais comum. Raiz de solidago e uva-ursina reduzem a inflamação renal." },
  ht: { name:"Sipò Pye Renn", tagline:"Dissolve, elimine, pwoteje", benefit:"Pye Renn · Renn · Inè", desc:"Fèt pou dissolve pye renn oksalat kalsyòm — kalite ki pi komen. Rasin solidago ak fèy uva ursi redui enflamasyon renn." },
  jm: { name:"Kidney Stone Support", tagline:"Dissolve, flush, protect", benefit:"Kidney Stones · Kidney · Urinary", desc:"Designed to dissolve calcium oxalate stones — di most common type. Goldenrod root and uva ursi reduce kidney inflammation while supporting stone passage." },
},

"urinary": {
  es: { name:"Limpieza del Tracto Urinario", tagline:"Calma, limpia y restaura", benefit:"ITU · Tracto Urinario · Antibacteriano", desc:"Las infecciones del tracto urinario afectan a millones cada año. La baya uva de oso y el arándano rojo crean un ambiente ácido que previene que las bacterias se adhieran a las paredes de la vejiga." },
  fr: { name:"Clarté des Voies Urinaires", tagline:"Apaiser, nettoyer et restaurer", benefit:"IVU · Voies Urinaires · Antibactérien", desc:"Les infections urinaires touchent des millions de personnes chaque année. La busserole et la canneberge créent un environnement acide qui empêche les bactéries d'adhérer aux parois de la vessie." },
  pt: { name:"Limpeza do Trato Urinário", tagline:"Acalmar, limpar e restaurar", benefit:"ITU · Trato Urinário · Antibacteriano", desc:"Infecções do trato urinário afetam milhões a cada ano. Uva-ursina e cranberry criam um ambiente ácido que impede bactérias de aderir às paredes da bexiga." },
  ht: { name:"Netwayaj Trak Inè", tagline:"Kalman, netwaye epi restore", benefit:"ITU · Trak Inè · Antibakteryèl", desc:"Enfeksyon trak inè afekte milyon chak ane. Uva ursi ak kanberri kreye yon anviwonman asid ki anpeche bakteri kole sou mi vesi a." },
  jm: { name:"Urinary Tract Clear", tagline:"Soothe, cleanse and restore", benefit:"UTI · Urinary Tract · Antibacterial", desc:"Urinary tract infections affect millions every year. Uva ursi and cranberry create an acidic environment weh prevent bacteria from sticking to bladder walls." },
},

"night-flow": {
  es: { name:"Reinicio de Flujo Nocturno", tagline:"Apoyo urinario nocturno y calma", benefit:"Nocturno · Urinario · Calma", desc:"Para quienes se despiertan frecuentemente por la noche para orinar o experimentan urgencia urinaria. Esta mezcla nocturna combina el apoyo de la vejiga con una profunda relajación del sistema nervioso." },
  fr: { name:"Réinitialisation Flux Nocturne", tagline:"Soutien urinaire nocturne et sérénité", benefit:"Nocturne · Urinaire · Calme", desc:"Pour ceux qui se réveillent fréquemment la nuit pour uriner ou ressentent une urgence urinaire. Ce mélange nocturne combine le soutien vésical avec une relaxation profonde du système nerveux." },
  pt: { name:"Reset do Fluxo Noturno", tagline:"Suporte urinário noturno e calma", benefit:"Noturno · Urinário · Calma", desc:"Para quem acorda frequentemente à noite para urinar ou experimenta urgência urinária. Esta mistura noturna combina suporte da bexiga com relaxamento profundo do sistema nervoso." },
  ht: { name:"Reyajisteman Flou Nuit", tagline:"Sipò inè nuit ak kàlm", benefit:"Nuit · Inè · Kàlm", desc:"Pou moun ki reveye souvan lannuit pou pipi oswa ki gen ijan pipi. Melanj nuit sa a konbine sipò vesi ak rilaks fon sistèm nève." },
  jm: { name:"Night Flow Reset", tagline:"Nighttime urinary and calm support", benefit:"Nighttime · Urinary · Calm", desc:"Fi those who wake frequently at night to urinate or experience urinary urgency. Dis nighttime blend combines bladder support wid deep nervous system relaxation." },
},

"dream": {
  es: { name:"Atrapasueños", tagline:"Deriva hacia un sueño profundo y restaurador", benefit:"Sueño Profundo · Sueños · Calma", desc:"Mugwort amplifica el recuerdo de los sueños y la viveza. Valeriana y pasiflora inducen etapas de sueño más profundas. Para noches de calidad restauradora profunda." },
  fr: { name:"Attrape-Rêves", tagline:"Glissez dans un sommeil profond et réparateur", benefit:"Sommeil Profond · Rêves · Sérénité", desc:"L'armoise amplifie le souvenir et la vivacité des rêves. La valériane et la passiflore induisent des stades de sommeil plus profonds." },
  pt: { name:"Apanhador de Sonhos", tagline:"Derive para um sono profundo e reparador", benefit:"Sono Profundo · Sonhos · Calma", desc:"Mugwort amplifica a lembrança e a vivacidade dos sonhos. Valeriana e maracujá induzem estágios de sono mais profundos." },
  ht: { name:"Trape Rèv", tagline:"Derive nan yon dòmi fon ak repozan", benefit:"Dòmi Fon · Rèv · Kàlm", desc:"Mugwort amplifye rapèl ak klète rèv. Valeryan ak pasiflè endiyi etap dòmi ki pi fon." },
  jm: { name:"Dream Catcher", tagline:"Drift into deep restorative sleep", benefit:"Deep Sleep · Dreams · Calm", desc:"Mugwort amplifies dream recall and vividness. Valerian and passionflower induce deeper sleep stages." },
},

"calm": {
  es: { name:"Calma Interior", tagline:"Silencia el ruido. Encuentra tu centro.", benefit:"Ansiedad · Sistema Nervioso · Calma", desc:"Para la ansiedad crónica, el estrés o la hipervigilancia. Esta mezcla trabaja en los receptores GABA para reducir la respuesta al estrés sin causar somnolencia." },
  fr: { name:"Calme Intérieur", tagline:"Réduisez le bruit. Trouvez votre centre.", benefit:"Anxiété · Système Nerveux · Sérénité", desc:"Pour l'anxiété chronique, le stress ou l'hypervigilance. Ce mélange agit sur les récepteurs GABA pour réduire la réponse au stress sans provoquer de somnolence." },
  pt: { name:"Calma Interior", tagline:"Silencie o ruído. Encontre seu centro.", benefit:"Ansiedade · Sistema Nervoso · Calma", desc:"Para ansiedade crônica, estresse ou hipervigilância. Esta mistura age nos receptores GABA para reduzir a resposta ao estresse sem causar sonolência." },
  ht: { name:"Kàlm Anndan", tagline:"Fè bri a silans. Jwenn sant ou.", benefit:"Anxiete · Sistèm Nève · Kàlm", desc:"Pou anxiete kwonik, stres oswa ipèrvijilans. Melanj sa a aji sou reseptè GABA pou redui repons stres san koze somye." },
  jm: { name:"Calm Within", tagline:"Quiet di noise. Find yuh centre.", benefit:"Anxiety · Nervous System · Calm", desc:"Fi chronic anxiety, stress or hypervigilance. Dis blend works on GABA receptors to reduce di stress response without causing drowsiness." },
},

"heart": {
  es: { name:"Abridor de Corazón", tagline:"Amor, circulación y el corazón que lo sostiene todo", benefit:"Corazón · Circulación · Presión Arterial", desc:"El hibisco está clínicamente estudiado para reducir la presión arterial. El espino reduce la frecuencia cardíaca y apoya la función cardíaca. Para la salud cardiovascular a largo plazo." },
  fr: { name:"Ouverture du Cœur", tagline:"Amour, circulation et le cœur qui soutient tout", benefit:"Cœur · Circulation · Tension Artérielle", desc:"L'hibiscus est cliniquement étudié pour abaisser la tension artérielle. L'aubépine réduit la fréquence cardiaque et soutient la fonction cardiaque." },
  pt: { name:"Abridor do Coração", tagline:"Amor, circulação e o coração que sustenta tudo", benefit:"Coração · Circulação · Pressão Arterial", desc:"O hibisco é clinicamente estudado para reduzir a pressão arterial. O espinheiro reduz a frequência cardíaca e apoia a função cardíaca." },
  ht: { name:"Ouvri Kè", tagline:"Lanmou, sikilasyon ak kè ki kenbe tout bagay", benefit:"Kè · Sikilasyon · Presyon San", desc:"Ibiskis etidye klinikman pou bese presyon san. Hwòn redui vitès kè ak sipòte fonksyon kè." },
  jm: { name:"Heart Opener", tagline:"Love, circulation and di heart weh carries everything", benefit:"Heart · Circulation · Blood Pressure", desc:"Hibiscus is clinically studied fi lowering blood pressure. Hawthorn reduces heart rate and supports heart function." },
},

"stress": {
  es: { name:"Armadura contra el Estrés", tagline:"Construye resistencia real al estrés fisiológico", benefit:"Cortisol · Adaptogénico · Resistencia al Estrés", desc:"El estrés crónico físicamente degrada el cuerpo. Esta mezcla adaptogénica construye resistencia real al estrés fisiológico con el tiempo — no solo enmascara los síntomas." },
  fr: { name:"Bouclier Anti-Stress", tagline:"Construisez une vraie résistance au stress physiologique", benefit:"Cortisol · Adaptogène · Résistance au Stress", desc:"Le stress chronique dégrade physiquement le corps. Ce mélange adaptogène construit une vraie résistance au stress physiologique au fil du temps." },
  pt: { name:"Armadura Anti-Estresse", tagline:"Construa resistência real ao estresse fisiológico", benefit:"Cortisol · Adaptogênico · Resistência ao Estresse", desc:"O estresse crônico degrada fisicamente o corpo. Esta mistura adaptogênica constrói resistência real ao estresse fisiológico ao longo do tempo." },
  ht: { name:"Pwoteksyon kont Stres", tagline:"Konstwi rezistans reyèl kont stres fiziolojik", benefit:"Kòtizòl · Adaptojèn · Rezistans Stres", desc:"Stres kwonik fizikman degradan kò a. Melanj adaptojèn sa a konstwi rezistans reyèl kont stres fiziolojik ak tan." },
  jm: { name:"Stress Armor", tagline:"Build real physiological stress resistance", benefit:"Cortisol · Adaptogenic · Stress Resistance", desc:"Chronic stress physically degrades di body. Dis adaptogenic blend builds real physiological stress resistance over time — not just masking symptoms." },
},

"gut-glow": {
  es: { name:"Intestino y Brillo", tagline:"Sana desde adentro hacia afuera", benefit:"Intestino · Piel · Probiótico · Colágeno", desc:"Tu piel es un reflejo de tu salud intestinal. Esta mezcla trabaja en ambos con hierbas que apoyan la microbiota, reducen la inflamación y nutren el colágeno." },
  fr: { name:"Intestin & Éclat", tagline:"Guérissez de l'intérieur vers l'extérieur", benefit:"Intestin · Peau · Probiotique · Collagène", desc:"Votre peau est le reflet de votre santé intestinale. Ce mélange travaille sur les deux avec des herbes qui soutiennent le microbiote, réduisent l'inflammation et nourrissent le collagène." },
  pt: { name:"Intestino e Brilho", tagline:"Cure de dentro para fora", benefit:"Intestino · Pele · Probiótico · Colágeno", desc:"Sua pele é um reflexo da sua saúde intestinal. Esta mistura trabalha em ambos com ervas que apoiam a microbiota, reduzem a inflamação e nutrem o colágeno." },
  ht: { name:"Trip ak Klere", tagline:"Geri depi anndan", benefit:"Trip · Po · Pwobyotik · Kolajen", desc:"Po ou se yon refleksyon sante trip ou. Melanj sa a travay sou toulede ak zèb ki sipòte mikwòbyòm, redui enflamasyon ak nouri kolajen." },
  jm: { name:"Gut & Glow", tagline:"Heal from di inside out", benefit:"Gut · Skin · Probiotic · Collagen", desc:"Yuh skin is a reflection of yuh gut health. Dis blend works on both wid herbs weh support di microbiome, reduce inflammation and nourish collagen." },
},

"gut-reset": {
  es: { name:"Reinicio Intestinal", tagline:"Restaura tu intestino a su armonía natural", benefit:"Intestino Permeable · SII · Microbioma", desc:"Para intestino permeable, SII o inflamación intestinal. El olmo resbaladizo y la raíz de malvavisco recubren y sanan el revestimiento intestinal mientras la caléndula reduce la inflamación." },
  fr: { name:"Réinitialisation Intestinale", tagline:"Restaurez votre intestin à son harmonie naturelle", benefit:"Intestin Perméable · SCI · Microbiome", desc:"Pour l'intestin perméable, le SCI ou l'inflammation intestinale. L'orme glissant et la racine de guimauve tapissent et guérissent la muqueuse intestinale." },
  pt: { name:"Reset Intestinal", tagline:"Restaure seu intestino à sua harmonia natural", benefit:"Intestino Permeável · SII · Microbioma", desc:"Para intestino permeável, SII ou inflamação intestinal. Olmo escorregadio e raiz de marshmallow revestem e curam o revestimento intestinal." },
  ht: { name:"Reyajisteman Trip", tagline:"Restore trip ou nan amoni natirèl li", benefit:"Intestin Pèmeyab · IBS · Mikwòbyòm", desc:"Pou intestin pèmeyab, IBS oswa enflamasyon trip. Olm glisan ak rasin marshmallow kouvri epi geri revètman trip." },
  jm: { name:"Gut Reset", tagline:"Restore yuh gut to its natural harmony", benefit:"Leaky Gut · IBS · Microbiome", desc:"Fi leaky gut, IBS or gut inflammation. Slippery elm and marshmallow root coat and heal di gut lining while calendula reduce inflammation." },
},

"lymph": {
  es: { name:"Activador Linfático", tagline:"Mantén la corriente fluyendo", benefit:"Sistema Linfático · Hinchazón · Inmunidad", desc:"El sistema linfático elimina los desechos celulares del cuerpo — pero a diferencia del corazón, no tiene su propia bomba. Esta mezcla estimula el flujo linfático." },
  fr: { name:"Stimulant Lymphatique", tagline:"Maintenez le flux en mouvement", benefit:"Système Lymphatique · Gonflements · Immunité", desc:"Le système lymphatique élimine les déchets cellulaires du corps — mais contrairement au cœur, il n'a pas sa propre pompe. Ce mélange stimule le flux lymphatique." },
  pt: { name:"Ativador Linfático", tagline:"Mantenha a corrente fluindo", benefit:"Sistema Linfático · Inchaço · Imunidade", desc:"O sistema linfático remove resíduos celulares do corpo — mas ao contrário do coração, não tem sua própria bomba. Esta mistura estimula o fluxo linfático." },
  ht: { name:"Mouvman Lenfatik", tagline:"Kenbe kouran an k ap koule", benefit:"Sistèm Lenfatik · Anfle · Iminite", desc:"Sistèm lenfatik retire dechè selilè nan kò — men kontrèman ak kè, li pa gen ponp pa li. Melanj sa a stimile flou lenfatik." },
  jm: { name:"Lymph Mover", tagline:"Keep di current flowing", benefit:"Lymphatic System · Swelling · Immunity", desc:"Di lymphatic system removes cellular waste from di body — but unlike di heart, it has no pump of its own. Dis blend stimulates lymphatic flow." },
},

"blood-build": {
  es: { name:"Constructor de Sangre", tagline:"Nutrición rica en hierro para tu sangre", benefit:"Hierro · Sangre · Energía · Anemia", desc:"Para anemia, fatiga o deficiencia de hierro. La ortiga y las hojas de frambuesa roja son dos de las fuentes vegetales de hierro más concentradas disponibles en forma de té." },
  fr: { name:"Constructeur de Sang", tagline:"Nutrition riche en fer pour votre sang", benefit:"Fer · Sang · Énergie · Anémie", desc:"Pour l'anémie, la fatigue ou la carence en fer. L'ortie et les feuilles de framboisier rouge sont deux des sources végétales de fer les plus concentrées disponibles en thé." },
  pt: { name:"Construtor de Sangue", tagline:"Nutrição rica em ferro para seu sangue", benefit:"Ferro · Sangue · Energia · Anemia", desc:"Para anemia, fadiga ou deficiência de ferro. Urtiga e folhas de framboesa vermelha são duas das fontes vegetais de ferro mais concentradas disponíveis como chá." },
  ht: { name:"Konstriktè San", tagline:"Nitrisyon rich nan fè pou san ou", benefit:"Fè · San · Enèji · Anemi", desc:"Pou anemi, fatig oswa defisyans fè. Zòtye ak fèy franbwaz wouj se de nan pi konsantre sous fè vegetal disponib kòm tè." },
  jm: { name:"Blood Builder", tagline:"Iron-rich nourishment fi yuh blood", benefit:"Iron · Blood · Energy · Anaemia", desc:"Fi anaemia, fatigue or iron deficiency. Nettle and red raspberry leaf are two of di most concentrated plant-based iron sources available as tea." },
},

"womb": {
  es: { name:"Útero Sagrado", tagline:"Nutre lo sagrado femenino", benefit:"Útero · Hormonas · Ciclo Menstrual", desc:"Una mezcla de apoyo uterino diseñada para nutrir, toner y curar el útero. La hoja de frambuesa roja es el tónico uterino más confiable en la herbolaria." },
  fr: { name:"Utérus Sacré", tagline:"Nourrissez le sacré féminin", benefit:"Utérus · Hormones · Cycle Menstruel", desc:"Un mélange de soutien utérin conçu pour nourrir, tonifier et guérir l'utérus. La feuille de framboisier rouge est le tonique utérin le plus fiable en phytothérapie." },
  pt: { name:"Útero Sagrado", tagline:"Nutra o sagrado feminino", benefit:"Útero · Hormônios · Ciclo Menstrual", desc:"Uma mistura de suporte uterino projetada para nutrir, tonificar e curar o útero. A folha de framboesa vermelha é o tônico uterino mais confiável na herbologia." },
  ht: { name:"Matris Sakre", tagline:"Nouri sakre fanm nan", benefit:"Matris · Omon · Sik Règ", desc:"Yon melanj sipò matris ki fèt pou nouri, tonifye ak geri matris. Fèy franbwaz wouj se tonik matris ki pi fyab nan fitoteyapi." },
  jm: { name:"Sacred Womb", tagline:"Nourish di sacred feminine", benefit:"Womb · Hormones · Menstrual Cycle", desc:"A uterine support blend designed to nourish, tone and heal di womb. Red raspberry leaf is di most trusted uterine tonic in herbalism." },
},

"fertility": {
  es: { name:"Florecimiento de Fertilidad", tagline:"Florece en tu plenitud", benefit:"Fertilidad · Hormonas · Ovulación", desc:"Una mezcla de apoyo a la fertilidad para quienes están intentando concebir o buscando regular los ciclos hormonales. Las hierbas de esta mezcla apoyan la ovulación, equilibran las hormonas y nutren el útero." },
  fr: { name:"Épanouissement de Fertilité", tagline:"Épanouissez-vous dans votre plénitude", benefit:"Fertilité · Hormones · Ovulation", desc:"Un mélange de soutien à la fertilité pour ceux qui cherchent à concevoir ou à réguler les cycles hormonaux. Les herbes de ce mélange soutiennent l'ovulation, équilibrent les hormones et nourrissent l'utérus." },
  pt: { name:"Florescimento da Fertilidade", tagline:"Floresça na sua plenitude", benefit:"Fertilidade · Hormônios · Ovulação", desc:"Uma mistura de suporte à fertilidade para quem está tentando conceber ou buscando regular os ciclos hormonais." },
  ht: { name:"Fleri Fètilite", tagline:"Fleri nan pleniti ou", benefit:"Fètilite · Omon · Ovulasyon", desc:"Yon melanj sipò fètilite pou moun k ap eseye konsevwa oswa k ap chèche regle sik ormonal." },
  jm: { name:"Fertility Bloom", tagline:"Bloom into yuh fullness", benefit:"Fertility · Hormones · Ovulation", desc:"A fertility support blend fi those trying to conceive or seeking to regulate hormonal cycles. Herbs in dis blend support ovulation, balance hormones and nourish di womb." },
},

"psa": {
  es: { name:"Mezcla de Defensa PSA", tagline:"Salud de la próstata desde adentro hacia afuera", benefit:"PSA · Próstata · Hormonal", desc:"Formulada para hombres que monitorean los niveles de PSA o con antecedentes familiares de problemas de próstata. El palmetto enano y la raíz de ortiga son los más estudiados para la salud de la próstata." },
  fr: { name:"Mélange Défense PSA", tagline:"Santé prostatique de l'intérieur vers l'extérieur", benefit:"PSA · Prostate · Hormonal", desc:"Formulé pour les hommes qui surveillent leurs taux de PSA ou ayant des antécédents familiaux de problèmes de prostate." },
  pt: { name:"Mistura de Defesa PSA", tagline:"Saúde da próstata de dentro para fora", benefit:"PSA · Próstata · Hormonal", desc:"Formulada para homens que monitoram os níveis de PSA ou com histórico familiar de problemas de próstata." },
  ht: { name:"Melanj Defans PSA", tagline:"Sante pwostat depi anndan", benefit:"PSA · Pwostat · Ormonal", desc:"Fòmile pou gason ki surveye nivo PSA oswa ki gen istwa fanmi pwoblèm pwostat." },
  jm: { name:"PSA Defense Blend", tagline:"Prostate health from di inside out", benefit:"PSA · Prostate · Hormonal", desc:"Formulated fi men monitoring PSA levels or wid family history of prostate issues. Saw palmetto and nettle root are di most studied fi prostate health." },
},

"testo-balance": {
  es: { name:"Equilibrio Testosterona y Próstata", tagline:"Equilibrio hormonal y protección de la próstata", benefit:"Testosterona · Próstata · Hormonal", desc:"A medida que los hombres envejecen, la testosterona se convierte en DHT — la hormona que agranda la próstata. Esta mezcla bloquea esa conversión mientras apoya niveles saludables de testosterona." },
  fr: { name:"Équilibre Testostérone & Prostate", tagline:"Équilibre hormonal et protection prostatique", benefit:"Testostérone · Prostate · Hormonal", desc:"En vieillissant, la testostérone se convertit en DHT — l'hormone qui agrandit la prostate. Ce mélange bloque cette conversion tout en soutenant des niveaux sains de testostérone." },
  pt: { name:"Equilíbrio Testosterona e Próstata", tagline:"Equilíbrio hormonal e proteção da próstata", benefit:"Testosterona · Próstata · Hormonal", desc:"À medida que os homens envelhecem, a testosterona se converte em DHT — o hormônio que aumenta a próstata. Esta mistura bloqueia essa conversão." },
  ht: { name:"Ekilibre Testostewòn ak Pwostat", tagline:"Ekilibre ormonal ak pwoteksyon pwostat", benefit:"Testostewòn · Pwostat · Ormonal", desc:"Pandan gason yo veyari, testostewòn vin DHT — omon ki ogmante pwostat. Melanj sa a bloke konvèsyon sa a." },
  jm: { name:"Testosterone & Prostate Balance", tagline:"Hormonal balance and prostate protection", benefit:"Testosterone · Prostate · Hormonal", desc:"As men age, testosterone converts to DHT — di hormone weh enlarges di prostate. Dis blend blocks dat conversion while supporting healthy testosterone levels." },
},

"post50": {
  es: { name:"Base para Hombres Post-50", tagline:"Construido para los años de sabiduría", benefit:"Post-50 · Vitalidad · Longevidad", desc:"Un protocolo completo de bienestar diseñado específicamente para las necesidades de los hombres después de los 50. Apoya la salud cardiovascular, la función cognitiva, los niveles hormonales y la vitalidad general." },
  fr: { name:"Fondation Hommes Post-50", tagline:"Conçu pour les années de sagesse", benefit:"Post-50 · Vitalité · Longévité", desc:"Un protocole de bien-être complet conçu spécifiquement pour les besoins des hommes après 50 ans. Soutient la santé cardiovasculaire, la fonction cognitive, les niveaux hormonaux et la vitalité générale." },
  pt: { name:"Fundação Masculina Pós-50", tagline:"Construída para os anos de sabedoria", benefit:"Pós-50 · Vitalidade · Longevidade", desc:"Um protocolo completo de bem-estar projetado especificamente para as necessidades dos homens após os 50 anos." },
  ht: { name:"Baz Gason Apre-50", tagline:"Konstwi pou ane sajès yo", benefit:"Apre-50 · Vitalite · Lonjevite", desc:"Yon pwotokòl byenèt konplè ki espesyalman fèt pou bezwen gason apre 50 an." },
  jm: { name:"Post-50 Men's Foundation", tagline:"Built fi di wisdom years", benefit:"Post-50 · Vitality · Longevity", desc:"A comprehensive wellness protocol designed specifically fi di needs of men after 50. Supports cardiovascular health, cognitive function, hormonal levels and overall vitality." },
},

"skin": {
  es: { name:"Piel Profunda", tagline:"La piel clara comienza desde adentro", benefit:"Piel · Colágeno · Antioxidante · Acné", desc:"Para acné, eccema, psoriasis o simplemente querer una piel más clara. Esta mezcla trabaja en la raíz de los problemas de piel — inflamación, toxinas en la sangre y deficiencias de nutrientes." },
  fr: { name:"Peau Profonde", tagline:"Une peau nette commence de l'intérieur", benefit:"Peau · Collagène · Antioxydant · Acné", desc:"Pour l'acné, l'eczéma, le psoriasis ou simplement pour une peau plus nette. Ce mélange s'attaque à la racine des problèmes cutanés — inflammation, toxines sanguines et carences nutritionnelles." },
  pt: { name:"Pele Profunda", tagline:"Pele limpa começa por dentro", benefit:"Pele · Colágeno · Antioxidante · Acne", desc:"Para acne, eczema, psoríase ou simplesmente querer uma pele mais limpa. Esta mistura trabalha na raiz dos problemas de pele." },
  ht: { name:"Po Fon", tagline:"Po klè kòmanse depi anndan", benefit:"Po · Kolajen · Antioxidan · Akne", desc:"Pou akne, ekzema, soryazis oswa senpleman vle yon po ki pi klè. Melanj sa a travay nan rasin pwoblèm po." },
  jm: { name:"Skin Deep", tagline:"Clear skin starts within", benefit:"Skin · Collagen · Antioxidant · Acne", desc:"Fi acne, eczema, psoriasis or simply wanting clearer skin. Dis blend works at di root of skin problems — inflammation, blood toxins and nutrient deficiencies." },
},

"bile": {
  es: { name:"Flujo Biliar Hepático", tagline:"Mantén tu bilis fluyendo, mantén tu cuerpo limpio", benefit:"Bilis · Hígado · Digestión de Grasas", desc:"La bilis insuficiente está en la raíz de muchos problemas digestivos. El diente de leña y la raíz de cúrcuma estimulan la producción de bilis para mejorar la digestión de grasas y la desintoxicación hepática." },
  fr: { name:"Flux Biliaire Hépatique", tagline:"Maintenez votre bile en mouvement, maintenez votre corps propre", benefit:"Bile · Foie · Digestion des Graisses", desc:"Une bile insuffisante est à l'origine de nombreux problèmes digestifs. Le pissenlit et la racine de curcuma stimulent la production de bile pour améliorer la digestion des graisses." },
  pt: { name:"Fluxo Biliar Hepático", tagline:"Mantenha sua bile fluindo, mantenha seu corpo limpo", benefit:"Bile · Fígado · Digestão de Gorduras", desc:"Bile insuficiente está na raiz de muitos problemas digestivos. Dente-de-leão e raiz de cúrcuma estimulam a produção de bile para melhorar a digestão de gorduras." },
  ht: { name:"Flou Bil Fwa", tagline:"Kenbe bil ou k ap koule, kenbe kò ou pwòp", benefit:"Bil · Fwa · Dijestion Grès", desc:"Bil ensifizan se nan rasin anpil pwoblèm dijestif. Pisanlit ak rasin toumèrik stimile pwodiksyon bil pou amelyore dijestion grès." },
  jm: { name:"Liver Bile Flow", tagline:"Keep yuh bile flowing, keep yuh body clean", benefit:"Bile · Liver · Fat Digestion", desc:"Insufficient bile is at di root of many digestive problems. Dandelion and turmeric root stimulate bile production fi better fat digestion and liver detoxification." },
},

"ancestral-fire": {
  es: { name:"Fuego Ancestral", tagline:"El calor de la medicina ancestral", benefit:"Circulación · Digestión · Energía Ancestral", desc:"Una mezcla que honra las tradiciones botánicas africanas, caribeñas e indias. Especias y raíces calientes que han calentado cuerpos y curado enfermedades durante generaciones." },
  fr: { name:"Feu Ancestral", tagline:"La chaleur de la médecine ancestrale", benefit:"Circulation · Digestion · Énergie Ancestrale", desc:"Un mélange qui honore les traditions botaniques africaines, caribéennes et indiennes. Des épices et des racines réchauffantes qui ont réchauffé des corps et guéri des maladies pendant des générations." },
  pt: { name:"Fogo Ancestral", tagline:"O calor da medicina ancestral", benefit:"Circulação · Digestão · Energia Ancestral", desc:"Uma mistura que honra as tradições botânicas africanas, caribenhas e indianas. Especiarias e raízes aquecentes que aqueceram corpos e curaram doenças por gerações." },
  ht: { name:"Dife Ansestral", tagline:"Chalè medsin ansestral la", benefit:"Sikilasyon · Dijestion · Enèji Ansestral", desc:"Yon melanj ki onore tradisyon botanik afriken, karibeyen ak endyen. Epis ak rasin chofe ki te chofe kò yo epi geri maladi pandan jenerasyon." },
  jm: { name:"Ancestral Fire", tagline:"Di warmth of ancestral medicine", benefit:"Circulation · Digestion · Ancestral Energy", desc:"A blend weh honours African, Caribbean and Indian botanical traditions. Warming spices and roots weh have warmed bodies and healed illness for generations." },
},

};

export function getBlendModal(id, lang) {
  if (!lang || lang === 'en') return null;
  return BLEND_MODAL_TRANS[id]?.[lang] || null;
}

export default BLEND_MODAL_TRANS;
