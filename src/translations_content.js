/**
 * translations_content.js
 * Chai Holistic — AI-translated content for all 5 languages
 * 
 * Usage in any component:
 *   import { getContent } from "./translations_content";
 *   const c = getContent(lang);
 *   // c.seamoss.sm1.name, c.seamoss.sm1.tagline, etc.
 * 
 * English is always the source of truth in the component data arrays.
 * This file provides overrides for es, fr, pt, ht, jm.
 */

const CONTENT = {

// ═══════════════════════════════════════════════════════════════════════════
// SEA MOSS RECIPES
// ═══════════════════════════════════════════════════════════════════════════
seamoss: {
  sm1: {
    en: { name:"Classic Sea Moss Gel", tagline:"The foundation. Pure. Powerful. Essential.", tip:"Always use spring water — tap water contains chlorine and fluoride that can interfere with the moss's mineral content.", shelfLife:"Refrigerate in a sealed glass jar up to 3 weeks. Freeze in ice cube trays for up to 3 months.", dailyUse:"Add 1–2 tbsp to your morning smoothie, juice, or tea. Tasteless and odorless — you will not know it is there." },
    es: { name:"Gel de Musgo Marino Clásico", tagline:"La base. Puro. Poderoso. Esencial.", tip:"Siempre usa agua de manantial — el agua del grifo contiene cloro y flúor que pueden interferir con el contenido mineral del musgo.", shelfLife:"Refrigera en un frasco de vidrio sellado hasta 3 semanas. Congela en bandejas de hielo hasta 3 meses.", dailyUse:"Añade 1–2 cucharadas a tu batido, jugo o té de la mañana. Sin sabor ni olor — no notarás que está ahí." },
    fr: { name:"Gel de Mousse Marine Classique", tagline:"La base. Pur. Puissant. Essentiel.", tip:"Utilisez toujours de l'eau de source — l'eau du robinet contient du chlore et du fluor qui peuvent interférer avec la teneur en minéraux de la mousse.", shelfLife:"Réfrigérer dans un bocal en verre hermétique jusqu'à 3 semaines. Congeler dans des bacs à glaçons jusqu'à 3 mois.", dailyUse:"Ajoutez 1–2 c. à soupe à votre smoothie, jus ou thé du matin. Sans goût ni odeur — vous ne saurez pas qu'il est là." },
    pt: { name:"Gel de Musgo Marinho Clássico", tagline:"A base. Puro. Poderoso. Essencial.", tip:"Sempre use água de nascente — a água da torneira contém cloro e flúor que podem interferir no conteúdo mineral do musgo.", shelfLife:"Refrigere em vidro lacrado por até 3 semanas. Congele em forminhas de gelo por até 3 meses.", dailyUse:"Adicione 1–2 colheres de sopa ao seu smoothie, suco ou chá da manhã. Sem gosto nem cheiro — você nem vai notar." },
    ht: { name:"Jèl Mous Lanmè Klasik", tagline:"Baz la. Pi. Pwisan. Esansyèl.", tip:"Toujou itilize dlo sous — dlo robinè gen klò ak fliyò ki ka entèfere ak kontni minéral mous la.", shelfLife:"Mete nan frijidè nan yon veso vè fèmen jouk 3 semèn. Konjele nan bac glas jouk 3 mwa.", dailyUse:"Ajoute 1–2 kiyè nan smoothie, ji, oswa tè maten ou. San gou, san odè — ou p'ap konnen li la." },
    jm: { name:"Classic Sea Moss Gel", tagline:"Di foundation. Pure. Powerful. Essential.", tip:"Always use spring water — tap water have chlorine an fluoride weh can mess up di mineral content.", shelfLife:"Keep inna sealed glass jar inna fridge up to 3 weeks. Freeze inna ice cube tray fi up to 3 months.", dailyUse:"Add 1–2 tablespoon to yuh morning smoothie, juice, or tea. No taste, no smell — yuh won't even know it deh deh." },
  },
  sm2: {
    en: { name:"Pineapple Paradise Gel", tagline:"Tropical · Digestive · Bright & golden" },
    es: { name:"Gel Paraíso de Piña", tagline:"Tropical · Digestivo · Brillante y dorado" },
    fr: { name:"Gel Paradis Ananas", tagline:"Tropical · Digestif · Lumineux et doré" },
    pt: { name:"Gel Paraíso de Abacaxi", tagline:"Tropical · Digestivo · Brilhante e dourado" },
    ht: { name:"Jèl Paradis Zannanna", tagline:"Tropikal · Dijestif · Klè ak dore" },
    jm: { name:"Pineapple Paradise Gel", tagline:"Tropical · Digestive · Bright an golden" },
  },
  sm3: {
    en: { name:"Strawberry Fields Gel", tagline:"Sweet · Antioxidant-rich · Beautiful" },
    es: { name:"Gel Campos de Fresa", tagline:"Dulce · Rico en antioxidantes · Hermoso" },
    fr: { name:"Gel Champs de Fraises", tagline:"Doux · Riche en antioxydants · Magnifique" },
    pt: { name:"Gel Campos de Morango", tagline:"Doce · Rico em antioxidantes · Lindo" },
    ht: { name:"Jèl Jaden Frèz", tagline:"Dous · Rich nan antioxidant · Bèl" },
    jm: { name:"Strawberry Fields Gel", tagline:"Sweet · Rich in antioxidants · Beautiful" },
  },
  sm4: {
    en: { name:"Spirulina Ocean Gel", tagline:"Deep green · Protein-rich · Extraordinary" },
    es: { name:"Gel Océano de Espirulina", tagline:"Verde profundo · Rico en proteínas · Extraordinario" },
    fr: { name:"Gel Océan Spiruline", tagline:"Vert profond · Riche en protéines · Extraordinaire" },
    pt: { name:"Gel Oceano de Espirulina", tagline:"Verde profundo · Rico em proteínas · Extraordinário" },
    ht: { name:"Jèl Osean Spirulin", tagline:"Vèt fon · Rich nan pwoteyin · Ekstraòdinè" },
    jm: { name:"Spirulina Ocean Gel", tagline:"Deep green · Protein-rich · Extraordinary" },
  },
  sm5: {
    en: { name:"Blackberry Bliss Gel", tagline:"Dark · Antioxidant · Luxurious" },
    es: { name:"Gel Beatitud de Mora", tagline:"Oscuro · Antioxidante · Lujoso" },
    fr: { name:"Gel Félicité de Mûre", tagline:"Sombre · Antioxydant · Luxueux" },
    pt: { name:"Gel Felicidade de Amora", tagline:"Escuro · Antioxidante · Luxuoso" },
    ht: { name:"Jèl Bonè Myrtil Nwa", tagline:"Fon · Antioxidan · Lwiks" },
    jm: { name:"Blackberry Bliss Gel", tagline:"Dark · Antioxidant · Luxurious" },
  },
  sm6: {
    en: { name:"Mango Glow Gel", tagline:"Tropical · Vitamin-rich · Skin-loving" },
    es: { name:"Gel Resplandor de Mango", tagline:"Tropical · Rico en vitaminas · Amigable con la piel" },
    fr: { name:"Gel Éclat de Mangue", tagline:"Tropical · Riche en vitamines · Bon pour la peau" },
    pt: { name:"Gel Brilho de Manga", tagline:"Tropical · Rico em vitaminas · Amigável para a pele" },
    ht: { name:"Jèl Klere Mango", tagline:"Tropikal · Rich nan vitamin · Bon pou po" },
    jm: { name:"Mango Glow Gel", tagline:"Tropical · Vitamin-rich · Good fi di skin" },
  },
  sm7: {
    en: { name:"Coconut Vanilla Dream Gel", tagline:"Creamy · Comforting · Indulgent" },
    es: { name:"Gel Sueño de Coco y Vainilla", tagline:"Cremoso · Reconfortante · Indulgente" },
    fr: { name:"Gel Rêve Coco Vanille", tagline:"Crémeux · Réconfortant · Gourmand" },
    pt: { name:"Gel Sonho de Coco e Baunilha", tagline:"Cremoso · Reconfortante · Indulgente" },
    ht: { name:"Jèl Rèv Kokoye Vanilin", tagline:"Krèmeux · Rekonfortan · Gou" },
    jm: { name:"Coconut Vanilla Dream Gel", tagline:"Creamy · Comforting · Rich an indulgent" },
  },
  sm8: {
    en: { name:"Soursop Immunity Gel", tagline:"Caribbean · Immune-boosting · Ancestral" },
    es: { name:"Gel Inmunidad de Guanábana", tagline:"Caribeño · Refuerzo inmunológico · Ancestral" },
    fr: { name:"Gel Immunité Corossol", tagline:"Caribéen · Renforcement immunitaire · Ancestral" },
    pt: { name:"Gel Imunidade de Graviola", tagline:"Caribenho · Fortalece a imunidade · Ancestral" },
    ht: { name:"Jèl Iminite Kòwòsòl", tagline:"Karibeyen · Ranfòse iminite · Ansestral" },
    jm: { name:"Soursop Immunity Gel", tagline:"Caribbean · Immune-boosting · From wi roots" },
  },
  sm9: {
    en: { name:"Blueberry Brain Gel", tagline:"Cognitive · Memory · Deep purple" },
    es: { name:"Gel Cerebro de Arándano", tagline:"Cognitivo · Memoria · Morado profundo" },
    fr: { name:"Gel Cerveau Myrtille", tagline:"Cognitif · Mémoire · Violet profond" },
    pt: { name:"Gel Cérebro de Mirtilo", tagline:"Cognitivo · Memória · Roxo profundo" },
    ht: { name:"Jèl Sèvo Myrtil Ble", tagline:"Kognitif · Memwa · Vyolèt fon" },
    jm: { name:"Blueberry Brain Gel", tagline:"Brain food · Memory · Deep purple" },
  },
  sm10: {
    en: { name:"Golden Turmeric Sea Moss Gel", tagline:"Anti-inflammatory · Golden · Healing" },
    es: { name:"Gel de Musgo Marino Cúrcuma Dorada", tagline:"Antiinflamatorio · Dorado · Sanador" },
    fr: { name:"Gel de Mousse Marine au Curcuma Doré", tagline:"Anti-inflammatoire · Doré · Guérisseur" },
    pt: { name:"Gel de Musgo Marinho com Cúrcuma Dourada", tagline:"Anti-inflamatório · Dourado · Curativo" },
    ht: { name:"Jèl Mous Lanmè Toumèrik Dore", tagline:"Anti-enflamatwa · Dore · Gerizon" },
    jm: { name:"Golden Turmeric Sea Moss Gel", tagline:"Anti-inflammatory · Golden · Healing" },
  },
  sm11: {
    en: { name:"Hibiscus & Rosehip Gel", tagline:"Floral · Vitamin C · Heart health" },
    es: { name:"Gel de Hibisco y Escaramujo", tagline:"Floral · Vitamina C · Salud del corazón" },
    fr: { name:"Gel Hibiscus & Cynorrhodon", tagline:"Floral · Vitamine C · Santé cardiaque" },
    pt: { name:"Gel de Hibisco e Rosa Mosqueta", tagline:"Floral · Vitamina C · Saúde do coração" },
    ht: { name:"Jèl Ibiskis ak Kwit Woz", tagline:"Floral · Vitamin C · Sante kè" },
    jm: { name:"Hibiscus & Rosehip Gel", tagline:"Floral · Vitamin C · Heart health" },
  },
  sm12: {
    en: { name:"Watermelon Mint Refresh Gel", tagline:"Cooling · Hydrating · Summer vitality" },
    es: { name:"Gel Refrescante de Sandía y Menta", tagline:"Refrescante · Hidratante · Vitalidad de verano" },
    fr: { name:"Gel Rafraîchissant Pastèque Menthe", tagline:"Rafraîchissant · Hydratant · Vitalité estivale" },
    pt: { name:"Gel Refrescante de Melancia e Hortelã", tagline:"Refrescante · Hidratante · Vitalidade de verão" },
    ht: { name:"Jèl Fresko Melon Dlo ak Mint", tagline:"Fre · Idrate · Vitalite lete" },
    jm: { name:"Watermelon Mint Refresh Gel", tagline:"Cooling · Hydrating · Summer vibes" },
  },
  sm13: {
    en: { name:"Banana Cinnamon Power Gel", tagline:"Energizing · Warming · Potassium-rich" },
    es: { name:"Gel Potencia de Plátano y Canela", tagline:"Energizante · Cálido · Rico en potasio" },
    fr: { name:"Gel Énergie Banane Cannelle", tagline:"Énergisant · Réchauffant · Riche en potassium" },
    pt: { name:"Gel Potência de Banana e Canela", tagline:"Energizante · Aquecente · Rico em potássio" },
    ht: { name:"Jèl Fòs Bannann Kanèl", tagline:"Bay enèji · Chofe · Rich nan potasiòm" },
    jm: { name:"Banana Cinnamon Power Gel", tagline:"Energy boost · Warming · Rich in potassium" },
  },
  sm14: {
    en: { name:"Passionfruit Calm Gel", tagline:"Relaxing · Tropical · Anxiety support" },
    es: { name:"Gel Calma de Maracuyá", tagline:"Relajante · Tropical · Apoyo para la ansiedad" },
    fr: { name:"Gel Calme de Fruit de la Passion", tagline:"Relaxant · Tropical · Soutien anxiété" },
    pt: { name:"Gel Calma de Maracujá", tagline:"Relaxante · Tropical · Suporte para ansiedade" },
    ht: { name:"Jèl Kàlm Fwi Pasyon", tagline:"Rilaks · Tropikal · Sipò pou anxiete" },
    jm: { name:"Passionfruit Calm Gel", tagline:"Relaxing · Tropical · Good fi di nerves" },
  },
  sm15: {
    en: { name:"Cacao Ashwagandha Power Gel", tagline:"Adaptogenic · Chocolate · Stress armor" },
    es: { name:"Gel Potencia de Cacao y Ashwagandha", tagline:"Adaptógeno · Chocolate · Armadura contra el estrés" },
    fr: { name:"Gel Puissance Cacao Ashwagandha", tagline:"Adaptogène · Chocolat · Bouclier anti-stress" },
    pt: { name:"Gel Potência de Cacau e Ashwagandha", tagline:"Adaptogênico · Chocolate · Armadura contra estresse" },
    ht: { name:"Jèl Fòs Kakao Ashwagandha", tagline:"Adaptojèn · Chokola · Pwoteksyon kont stres" },
    jm: { name:"Cacao Ashwagandha Power Gel", tagline:"Adaptogenic · Chocolate · Stress shield" },
  },
},

// ═══════════════════════════════════════════════════════════════════════════
// JELLY RECIPES
// ═══════════════════════════════════════════════════════════════════════════
jelly: {
  sj1: {
    en: { name:"Classic Grass Jelly", tagline:"Cooling · Detoxifying · Traditional" },
    es: { name:"Jalea de Hierba Clásica", tagline:"Refrescante · Desintoxicante · Tradicional" },
    fr: { name:"Gelée d'Herbe Classique", tagline:"Rafraîchissante · Détoxifiante · Traditionnelle" },
    pt: { name:"Gelatina de Ervas Clássica", tagline:"Refrescante · Desintoxicante · Tradicional" },
    ht: { name:"Jelè Zèb Klasik", tagline:"Fre · Detoksifye · Tradisyonèl" },
    jm: { name:"Classic Grass Jelly", tagline:"Cooling · Detox · Traditional" },
  },
  sj2: {
    en: { name:"Rose Agar Jelly", tagline:"Floral · Romantic · Skin-nourishing" },
    es: { name:"Jalea Agar de Rosa", tagline:"Floral · Romántica · Nutritiva para la piel" },
    fr: { name:"Gelée Agar à la Rose", tagline:"Florale · Romantique · Nourrissante pour la peau" },
    pt: { name:"Gelatina Agar de Rosa", tagline:"Floral · Romântica · Nutritiva para a pele" },
    ht: { name:"Jelè Agar Woz", tagline:"Floral · Romanntik · Nouri po" },
    jm: { name:"Rose Agar Jelly", tagline:"Floral · Romantic · Good fi di skin" },
  },
  sj3: {
    en: { name:"Matcha Coconut Layer Jelly", tagline:"Energizing · Creamy · Two-tone beauty" },
    es: { name:"Jalea de Capas de Matcha y Coco", tagline:"Energizante · Cremosa · Belleza bicolor" },
    fr: { name:"Gelée en Couches Matcha Coco", tagline:"Énergisante · Crémeuse · Beauté bicolore" },
    pt: { name:"Gelatina em Camadas de Matcha e Coco", tagline:"Energizante · Cremosa · Beleza bicolor" },
    ht: { name:"Jelè Kouch Matcha Kokoye", tagline:"Bay enèji · Krèmeux · Bote de koulè" },
    jm: { name:"Matcha Coconut Layer Jelly", tagline:"Energy · Creamy · Beautiful two-tone" },
  },
  sj4: {
    en: { name:"Lychee Elderflower Jelly", tagline:"Delicate · Floral · Celebratory" },
    es: { name:"Jalea de Lichi y Flor de Saúco", tagline:"Delicada · Floral · Para celebrar" },
    fr: { name:"Gelée Litchi Fleur de Sureau", tagline:"Délicate · Florale · Festive" },
    pt: { name:"Gelatina de Lichia e Flor de Sabugueiro", tagline:"Delicada · Floral · Para celebrar" },
    ht: { name:"Jelè Letchi Fle Siri", tagline:"Delikat · Floral · Fèt" },
    jm: { name:"Lychee Elderflower Jelly", tagline:"Delicate · Floral · Celebration vibes" },
  },
  sj5: {
    en: { name:"Turmeric Mango Jelly", tagline:"Anti-inflammatory · Tropical · Vibrant" },
    es: { name:"Jalea de Cúrcuma y Mango", tagline:"Antiinflamatoria · Tropical · Vibrante" },
    fr: { name:"Gelée Curcuma Mangue", tagline:"Anti-inflammatoire · Tropicale · Vibrante" },
    pt: { name:"Gelatina de Cúrcuma e Manga", tagline:"Anti-inflamatória · Tropical · Vibrante" },
    ht: { name:"Jelè Toumèrik Mango", tagline:"Anti-enflamatwa · Tropikal · Vibran" },
    jm: { name:"Turmeric Mango Jelly", tagline:"Anti-inflammatory · Tropical · Vibrant" },
  },
  sj6: {
    en: { name:"Blueberry Lavender Jelly", tagline:"Calming · Antioxidant · Purple magic" },
    es: { name:"Jalea de Arándano y Lavanda", tagline:"Calmante · Antioxidante · Magia morada" },
    fr: { name:"Gelée Myrtille Lavande", tagline:"Apaisante · Antioxydante · Magie violette" },
    pt: { name:"Gelatina de Mirtilo e Lavanda", tagline:"Calmante · Antioxidante · Magia roxa" },
    ht: { name:"Jelè Myrtil Lavann", tagline:"Kalman · Antioxidan · Maji vyolèt" },
    jm: { name:"Blueberry Lavender Jelly", tagline:"Calming · Antioxidant · Purple magic" },
  },
  sj7: {
    en: { name:"Ginger Lemon Detox Jelly", tagline:"Warming · Cleansing · Sharp & bright" },
    es: { name:"Jalea Desintoxicante de Jengibre y Limón", tagline:"Cálida · Limpiadora · Aguda y brillante" },
    fr: { name:"Gelée Détox Gingembre Citron", tagline:"Réchauffante · Purifiante · Vive et lumineuse" },
    pt: { name:"Gelatina Detox de Gengibre e Limão", tagline:"Aquecente · Purificante · Afiada e brilhante" },
    ht: { name:"Jelè Detoks Jenjann Sitwon", tagline:"Chofe · Netwaye · Pikan ak klè" },
    jm: { name:"Ginger Lemon Detox Jelly", tagline:"Warming · Cleansing · Sharp an bright" },
  },
  sj8: {
    en: { name:"Passion Fruit Chia Jelly", tagline:"Tropical · Omega-rich · Textured" },
    es: { name:"Jalea de Maracuyá y Chía", tagline:"Tropical · Rica en omega · Texturizada" },
    fr: { name:"Gelée Fruit de la Passion Chia", tagline:"Tropicale · Riche en oméga · Texturée" },
    pt: { name:"Gelatina de Maracujá e Chia", tagline:"Tropical · Rica em ômega · Com textura" },
    ht: { name:"Jelè Fwi Pasyon Chia", tagline:"Tropikal · Rich nan omega · Tekstire" },
    jm: { name:"Passion Fruit Chia Jelly", tagline:"Tropical · Omega-rich · Nice texture" },
  },
  sj9: {
    en: { name:"Mint Cucumber Cooling Jelly", tagline:"Refreshing · Hydrating · Summer tonic" },
    es: { name:"Jalea Refrescante de Menta y Pepino", tagline:"Refrescante · Hidratante · Tónico de verano" },
    fr: { name:"Gelée Rafraîchissante Menthe Concombre", tagline:"Rafraîchissante · Hydratante · Tonique estival" },
    pt: { name:"Gelatina Refrescante de Hortelã e Pepino", tagline:"Refrescante · Hidratante · Tônico de verão" },
    ht: { name:"Jelè Fresko Mint Konkonm", tagline:"Refre · Idrate · Tonik lete" },
    jm: { name:"Mint Cucumber Cooling Jelly", tagline:"Refreshing · Hydrating · Summer tonic" },
  },
  sj10: {
    en: { name:"Cinnamon Spice Jelly", tagline:"Warming · Blood sugar support · Aromatic" },
    es: { name:"Jalea de Canela y Especias", tagline:"Cálida · Apoyo al azúcar en sangre · Aromática" },
    fr: { name:"Gelée Cannelle et Épices", tagline:"Réchauffante · Soutien glycémique · Aromatique" },
    pt: { name:"Gelatina de Canela e Especiarias", tagline:"Aquecente · Suporte ao açúcar no sangue · Aromática" },
    ht: { name:"Jelè Kanèl Epis", tagline:"Chofe · Sipò sik san · Aromatik" },
    jm: { name:"Cinnamon Spice Jelly", tagline:"Warming · Blood sugar support · Aromatic" },
  },
  sj11: {
    en: { name:"Soursop Coconut Jelly", tagline:"Caribbean · Creamy · Immune-boosting" },
    es: { name:"Jalea de Guanábana y Coco", tagline:"Caribeña · Cremosa · Refuerzo inmunológico" },
    fr: { name:"Gelée Corossol Coco", tagline:"Caribéenne · Crémeuse · Renforcement immunitaire" },
    pt: { name:"Gelatina de Graviola e Coco", tagline:"Caribenha · Cremosa · Fortalece a imunidade" },
    ht: { name:"Jelè Kòwòsòl Kokoye", tagline:"Karibeyen · Krèmeux · Ranfòse iminite" },
    jm: { name:"Soursop Coconut Jelly", tagline:"Caribbean · Creamy · Immune boost" },
  },
  sj12: {
    en: { name:"Hibiscus Berry Jelly", tagline:"Ruby red · Heart health · Antioxidant" },
    es: { name:"Jalea de Hibisco y Bayas", tagline:"Rubí rojo · Salud del corazón · Antioxidante" },
    fr: { name:"Gelée Hibiscus Baies", tagline:"Rouge rubis · Santé cardiaque · Antioxydante" },
    pt: { name:"Gelatina de Hibisco e Frutas Vermelhas", tagline:"Vermelho rubi · Saúde do coração · Antioxidante" },
    ht: { name:"Jelè Ibiskis Bayi", tagline:"Wouj riben · Sante kè · Antioxidan" },
    jm: { name:"Hibiscus Berry Jelly", tagline:"Ruby red · Heart health · Antioxidant" },
  },
  sj13: {
    en: { name:"Peppermint Aloe Jelly", tagline:"Cooling · Gut healing · Clear & clean" },
    es: { name:"Jalea de Menta Piperita y Aloe", tagline:"Refrescante · Curación intestinal · Clara y limpia" },
    fr: { name:"Gelée Menthe Poivrée Aloe", tagline:"Rafraîchissante · Guérison intestinale · Claire et nette" },
    pt: { name:"Gelatina de Hortelã-Pimenta e Aloe", tagline:"Refrescante · Cura intestinal · Clara e limpa" },
    ht: { name:"Jelè Mant Pwèvr Aloe", tagline:"Fre · Geri trip · Klè ak pwòp" },
    jm: { name:"Peppermint Aloe Jelly", tagline:"Cooling · Gut healing · Clear an clean" },
  },
},

// ═══════════════════════════════════════════════════════════════════════════
// MOCKTAILS
// ═══════════════════════════════════════════════════════════════════════════
mocktails: {
  m1: {
    en: { name:"Golden Hour Tonic", tagline:"Anti-inflammatory · Warming · Grounding" },
    es: { name:"Tónico Hora Dorada", tagline:"Antiinflamatorio · Cálido · Enraizante" },
    fr: { name:"Tonique Heure Dorée", tagline:"Anti-inflammatoire · Réchauffant · Ancrant" },
    pt: { name:"Tônico Hora Dourada", tagline:"Anti-inflamatório · Aquecente · Enraizante" },
    ht: { name:"Tonik Lè Dore", tagline:"Anti-enflamatwa · Chofe · Anrasinen" },
    jm: { name:"Golden Hour Tonic", tagline:"Anti-inflammatory · Warming · Grounding" },
  },
  m2: {
    en: { name:"Hibiscus Rose Spritzer", tagline:"Antioxidant · Heart-opening · Beautiful" },
    es: { name:"Spritzer de Hibisco y Rosa", tagline:"Antioxidante · Abre el corazón · Hermoso" },
    fr: { name:"Spritzer Hibiscus Rose", tagline:"Antioxydant · Ouvre le cœur · Magnifique" },
    pt: { name:"Spritzer de Hibisco e Rosa", tagline:"Antioxidante · Abre o coração · Lindo" },
    ht: { name:"Spritzer Ibiskis Woz", tagline:"Antioxidan · Ouvri kè · Bèl" },
    jm: { name:"Hibiscus Rose Spritzer", tagline:"Antioxidant · Heart-opening · Beautiful" },
  },
  m3: {
    en: { name:"Cerasee Lemonade", tagline:"Bitter-sweet · Detox · Jamaican tradition" },
    es: { name:"Limonada de Cerasee", tagline:"Agridulce · Desintoxicante · Tradición jamaicana" },
    fr: { name:"Limonade au Cerasee", tagline:"Aigre-doux · Détox · Tradition jamaïcaine" },
    pt: { name:"Limonada de Cerasee", tagline:"Agridoce · Detox · Tradição jamaicana" },
    ht: { name:"Limonad Cerasee", tagline:"Amè-dous · Detoks · Tradisyon Jamayik" },
    jm: { name:"Cerasee Lemonade", tagline:"Bitter-sweet · Detox · Di real ting" },
  },
  m4: {
    en: { name:"Blue Butterfly Lemonade", tagline:"Stunning · Calming · Color-changing" },
    es: { name:"Limonada Mariposa Azul", tagline:"Impresionante · Calmante · Cambia de color" },
    fr: { name:"Limonade Papillon Bleu", tagline:"Époustouflante · Apaisante · Change de couleur" },
    pt: { name:"Limonada Borboleta Azul", tagline:"Deslumbrante · Calmante · Muda de cor" },
    ht: { name:"Limonad Papiyon Ble", tagline:"Epateman · Kalman · Chanje koulè" },
    jm: { name:"Blue Butterfly Lemonade", tagline:"Stunning · Calming · Color-changing" },
  },
  m5: {
    en: { name:"Adaptogen Cacao Latte", tagline:"Stress armor · Rich · Nourishing" },
    es: { name:"Latte de Cacao Adaptógeno", tagline:"Armadura contra el estrés · Intenso · Nutritivo" },
    fr: { name:"Latte Cacao Adaptogène", tagline:"Bouclier anti-stress · Riche · Nourrissant" },
    pt: { name:"Latte de Cacau Adaptogênico", tagline:"Armadura anti-estresse · Rico · Nutritivo" },
    ht: { name:"Late Kakao Adaptojèn", tagline:"Pwoteksyon kont stres · Rich · Nouri" },
    jm: { name:"Adaptogen Cacao Latte", tagline:"Stress shield · Rich · Nourishing" },
  },
  m6: {
    en: { name:"Turmeric Mango Lassi", tagline:"Probiotic · Golden · Digestive" },
    es: { name:"Lassi de Cúrcuma y Mango", tagline:"Probiótico · Dorado · Digestivo" },
    fr: { name:"Lassi Curcuma Mangue", tagline:"Probiotique · Doré · Digestif" },
    pt: { name:"Lassi de Cúrcuma e Manga", tagline:"Probiótico · Dourado · Digestivo" },
    ht: { name:"Lasi Toumèrik Mango", tagline:"Pwobyotik · Dore · Dijestif" },
    jm: { name:"Turmeric Mango Lassi", tagline:"Probiotic · Golden · Good fi digestion" },
  },
  m7: {
    en: { name:"Elderflower Mint Fizz", tagline:"Floral · Refreshing · Elegant" },
    es: { name:"Efervescente de Flor de Saúco y Menta", tagline:"Floral · Refrescante · Elegante" },
    fr: { name:"Pétillant Fleur de Sureau Menthe", tagline:"Floral · Rafraîchissant · Élégant" },
    pt: { name:"Frizante de Flor de Sabugueiro e Hortelã", tagline:"Floral · Refrescante · Elegante" },
    ht: { name:"Fizz Fle Siri Mint", tagline:"Floral · Refre · Elejant" },
    jm: { name:"Elderflower Mint Fizz", tagline:"Floral · Refreshing · Elegant" },
  },
  m8: {
    en: { name:"Lion's Mane Focus Latte", tagline:"Cognitive · Creamy · Brain fuel" },
    es: { name:"Latte Enfoque de Melena de León", tagline:"Cognitivo · Cremoso · Combustible cerebral" },
    fr: { name:"Latte Concentration Crinière de Lion", tagline:"Cognitif · Crémeux · Carburant cérébral" },
    pt: { name:"Latte Foco de Juba de Leão", tagline:"Cognitivo · Cremoso · Combustível cerebral" },
    ht: { name:"Late Konsantrasyon Lyon Mèn", tagline:"Kognitif · Krèmeux · Gaz sèvo" },
    jm: { name:"Lion's Mane Focus Latte", tagline:"Cognitive · Creamy · Brain fuel" },
  },
  m9: {
    en: { name:"Ashwagandha Moon Milk", tagline:"Calming · Sleep-inducing · Sacred" },
    es: { name:"Leche de Luna con Ashwagandha", tagline:"Calmante · Induce el sueño · Sagrado" },
    fr: { name:"Lait de Lune à l'Ashwagandha", tagline:"Apaisant · Favorise le sommeil · Sacré" },
    pt: { name:"Leite da Lua com Ashwagandha", tagline:"Calmante · Induz o sono · Sagrado" },
    ht: { name:"Lèt Lalin Ashwagandha", tagline:"Kalman · Pote dòmi · Sakre" },
    jm: { name:"Ashwagandha Moon Milk", tagline:"Calming · Sleep · Sacred ritual" },
  },
  m10: {
    en: { name:"Soursop Sea Moss Smoothie", tagline:"Caribbean · Mineral-rich · Creamy" },
    es: { name:"Batido de Guanábana y Musgo Marino", tagline:"Caribeño · Rico en minerales · Cremoso" },
    fr: { name:"Smoothie Corossol Mousse Marine", tagline:"Caribéen · Riche en minéraux · Crémeux" },
    pt: { name:"Smoothie de Graviola e Musgo Marinho", tagline:"Caribenho · Rico em minerais · Cremoso" },
    ht: { name:"Smoothie Kòwòsòl Mous Lanmè", tagline:"Karibeyen · Rich nan minéral · Krèmeux" },
    jm: { name:"Soursop Sea Moss Smoothie", tagline:"Caribbean · Mineral-rich · Creamy" },
  },
  m11: {
    en: { name:"Spiced Tamarind Cooler", tagline:"Tangy · Digestive · Roots medicine" },
    es: { name:"Refresco de Tamarindo Especiado", tagline:"Ácido · Digestivo · Medicina de raíces" },
    fr: { name:"Rafraîchissement au Tamarin Épicé", tagline:"Acidulé · Digestif · Médecine des racines" },
    pt: { name:"Refresco de Tamarindo Temperado", tagline:"Azedo · Digestivo · Medicina das raízes" },
    ht: { name:"Refre Tamaren Epise", tagline:"Akid · Dijestif · Medsin rasin" },
    jm: { name:"Spiced Tamarind Cooler", tagline:"Tangy · Digestive · Roots medicine" },
  },
  m12: {
    en: { name:"Moringa Power Shake", tagline:"Superfood · Green · Powerhouse nutrition" },
    es: { name:"Batido de Poder de Moringa", tagline:"Superalimento · Verde · Nutrición potente" },
    fr: { name:"Shake Puissance Moringa", tagline:"Superaliment · Vert · Nutrition puissante" },
    pt: { name:"Shake de Poder de Moringa", tagline:"Superalimento · Verde · Nutrição poderosa" },
    ht: { name:"Shake Fòs Moringa", tagline:"Sipèaliman · Vèt · Nitrisyon pwisan" },
    jm: { name:"Moringa Power Shake", tagline:"Superfood · Green · Powerhouse nutrition" },
  },
  m13: {
    en: { name:"Ginger Beer Mocktail", tagline:"Fiery · Probiotic · Party-ready" },
    es: { name:"Mocktail de Cerveza de Jengibre", tagline:"Picante · Probiótico · Listo para la fiesta" },
    fr: { name:"Mocktail Bière de Gingembre", tagline:"Piquant · Probiotique · Prêt pour la fête" },
    pt: { name:"Mocktail de Cerveja de Gengibre", tagline:"Picante · Probiótico · Pronto para a festa" },
    ht: { name:"Mokteyl Byè Jenjann", tagline:"Pike · Pwobyotik · Pare pou fèt" },
    jm: { name:"Ginger Beer Mocktail", tagline:"Fiery · Probiotic · Party-ready" },
  },
  m14: {
    en: { name:"Ceremonial Cacao Ritual", tagline:"Heart-opening · Sacred · Deeply nourishing" },
    es: { name:"Ritual de Cacao Ceremonial", tagline:"Abre el corazón · Sagrado · Profundamente nutritivo" },
    fr: { name:"Rituel au Cacao Cérémoniel", tagline:"Ouvre le cœur · Sacré · Profondément nourrissant" },
    pt: { name:"Ritual de Cacau Cerimonial", tagline:"Abre o coração · Sagrado · Profundamente nutritivo" },
    ht: { name:"Ritiyèl Kakao Seremonyèl", tagline:"Ouvri kè · Sakre · Nouri fon" },
    jm: { name:"Ceremonial Cacao Ritual", tagline:"Heart-opening · Sacred · Deep nourishment" },
  },
  m15: {
    en: { name:"Lavender Honey Lemonade", tagline:"Calming · Floral · Sweet relief" },
    es: { name:"Limonada de Lavanda y Miel", tagline:"Calmante · Floral · Alivio dulce" },
    fr: { name:"Limonade Lavande Miel", tagline:"Apaisante · Florale · Douce détente" },
    pt: { name:"Limonada de Lavanda e Mel", tagline:"Calmante · Floral · Alívio doce" },
    ht: { name:"Limonad Lavann Myèl", tagline:"Kalman · Floral · Soulajman dou" },
    jm: { name:"Lavender Honey Lemonade", tagline:"Calming · Floral · Sweet relief" },
  },
  m16: {
    en: { name:"Coconut Kefir Probiotic Float", tagline:"Probiotic · Creamy · Gut healing" },
    es: { name:"Float Probiótico de Kéfir de Coco", tagline:"Probiótico · Cremoso · Curación intestinal" },
    fr: { name:"Float Probiotique Kéfir de Coco", tagline:"Probiotique · Crémeux · Guérison intestinale" },
    pt: { name:"Float Probiótico de Kefir de Coco", tagline:"Probiótico · Cremoso · Cura intestinal" },
    ht: { name:"Flote Pwobyotik Kefi Kokoye", tagline:"Pwobyotik · Krèmeux · Geri trip" },
    jm: { name:"Coconut Kefir Probiotic Float", tagline:"Probiotic · Creamy · Gut healing" },
  },
},

// ═══════════════════════════════════════════════════════════════════════════
// MAIN BLENDS (chaiholistic417 BLENDS array)
// ═══════════════════════════════════════════════════════════════════════════
blends: {
  "Morning Rise":           { es:"Amanecer Matutino", fr:"Éveil du Matin", pt:"Despertar Matinal", ht:"Leve Maten", jm:"Morning Rise" },
  "2AM Reset":              { es:"Reinicio 2AM", fr:"Réinitialisation 2H", pt:"Reset das 2AM", ht:"Reyajisteman 2ZM", jm:"2AM Reset" },
  "Cerasee & Ginger Blend": { es:"Mezcla de Cerasee y Jengibre", fr:"Mélange Cerasee & Gingembre", pt:"Mistura de Cerasee e Gengibre", ht:"Melanj Cerasee ak Jenjann", jm:"Cerasee & Ginger Blend" },
  "Cerasee Blood Cleanse":  { es:"Limpieza de Sangre con Cerasee", fr:"Purification Sanguine au Cerasee", pt:"Limpeza do Sangue com Cerasee", ht:"Netwayaj San Cerasee", jm:"Cerasee Blood Cleanse" },
  "Grandmother's Cerasee":  { es:"El Cerasee de la Abuela", fr:"Le Cerasee de Grand-mère", pt:"O Cerasee da Avó", ht:"Cerasee Grann", jm:"Grandmother's Cerasee" },
  "Immunity Shield":        { es:"Escudo de Inmunidad", fr:"Bouclier Immunitaire", pt:"Escudo de Imunidade", ht:"Bouclye Iminite", jm:"Immunity Shield" },
  "Golden Healer":          { es:"Sanador Dorado", fr:"Guérisseur Doré", pt:"Curador Dourado", ht:"Gerizon Dore", jm:"Golden Healer" },
  "Liver & Love":           { es:"Hígado y Amor", fr:"Foie & Amour", pt:"Fígado e Amor", ht:"Fwa ak Lanmou", jm:"Liver & Love" },
  "Deep Liver Cleanse":     { es:"Limpieza Profunda del Hígado", fr:"Nettoyage Profond du Foie", pt:"Limpeza Profunda do Fígado", ht:"Netwayaj Fwa Fon", jm:"Deep Liver Cleanse" },
  "Full Body Detox":        { es:"Desintoxicación Corporal Completa", fr:"Détox Corps Entier", pt:"Detox Corporal Completo", ht:"Detoks Kò Antye", jm:"Full Body Detox" },
  "Blood Purifier":         { es:"Purificador de Sangre", fr:"Purificateur de Sang", pt:"Purificador do Sangue", ht:"Pirifye San", jm:"Blood Purifier" },
  "Kidney Flush":           { es:"Limpieza Renal", fr:"Drainage Rénal", pt:"Limpeza Renal", ht:"Netwayaj Renn", jm:"Kidney Flush" },
  "Kidney Stone Support":   { es:"Apoyo para Cálculos Renales", fr:"Soutien Calculs Rénaux", pt:"Suporte para Pedras nos Rins", ht:"Sipò Pye Renn", jm:"Kidney Stone Support" },
  "Urinary Tract Clear":    { es:"Limpieza del Tracto Urinario", fr:"Clarté des Voies Urinaires", pt:"Limpeza do Trato Urinário", ht:"Netwayaj Trak Inè", jm:"Urinary Tract Clear" },
  "Night Flow Reset":       { es:"Reinicio de Flujo Nocturno", fr:"Réinitialisation Flux Nocturne", pt:"Reset do Fluxo Noturno", ht:"Reyajisteman Flou Nuit", jm:"Night Flow Reset" },
  "Dream Catcher":          { es:"Atrapasueños", fr:"Attrape-Rêves", pt:"Apanhador de Sonhos", ht:"Trape Rèv", jm:"Dream Catcher" },
  "Calm Within":            { es:"Calma Interior", fr:"Calme Intérieur", pt:"Calma Interior", ht:"Kàlm Anndan", jm:"Calm Within" },
  "Heart Opener":           { es:"Abridor de Corazón", fr:"Ouverture du Cœur", pt:"Abridor do Coração", ht:"Ouvri Kè", jm:"Heart Opener" },
  "Stress Armor":           { es:"Armadura contra el Estrés", fr:"Bouclier Anti-Stress", pt:"Armadura Anti-Estresse", ht:"Pwoteksyon kont Stres", jm:"Stress Armor" },
  "Gut & Glow":             { es:"Intestino y Brillo", fr:"Intestin & Éclat", pt:"Intestino e Brilho", ht:"Trip ak Klere", jm:"Gut & Glow" },
  "Gut Reset":              { es:"Reinicio Intestinal", fr:"Réinitialisation Intestinale", pt:"Reset Intestinal", ht:"Reyajisteman Trip", jm:"Gut Reset" },
  "Lymph Mover":            { es:"Activador Linfático", fr:"Stimulant Lymphatique", pt:"Ativador Linfático", ht:"Mouvman Lenfatik", jm:"Lymph Mover" },
  "Blood Builder":          { es:"Constructor de Sangre", fr:"Constructeur de Sang", pt:"Construtor de Sangue", ht:"Konstriktè San", jm:"Blood Builder" },
  "Sacred Womb":            { es:"Útero Sagrado", fr:"Utérus Sacré", pt:"Útero Sagrado", ht:"Matris Sakre", jm:"Sacred Womb" },
  "Fertility Bloom":        { es:"Florecimiento de Fertilidad", fr:"Épanouissement de Fertilité", pt:"Florescimento da Fertilidade", ht:"Fleri Fètilite", jm:"Fertility Bloom" },
  "PSA Defense Blend":      { es:"Mezcla de Defensa PSA", fr:"Mélange Défense PSA", pt:"Mistura de Defesa PSA", ht:"Melanj Defans PSA", jm:"PSA Defense Blend" },
  "Testosterone & Prostate Balance": { es:"Equilibrio Testosterona y Próstata", fr:"Équilibre Testostérone & Prostate", pt:"Equilíbrio Testosterona e Próstata", ht:"Ekilibre Testostewòn ak Pwostat", jm:"Testosterone & Prostate Balance" },
  "Post-50 Men's Foundation": { es:"Base para Hombres Post-50", fr:"Fondation Hommes Post-50", pt:"Fundação Masculina Pós-50", ht:"Baz Gason Apre-50", jm:"Post-50 Men's Foundation" },
  "Skin Deep":              { es:"Piel Profunda", fr:"Peau Profonde", pt:"Pele Profunda", ht:"Po Fon", jm:"Skin Deep" },
  "Liver Bile Flow":        { es:"Flujo Biliar Hepático", fr:"Flux Biliaire Hépatique", pt:"Fluxo Biliar Hepático", ht:"Flou Bil Fwa", jm:"Liver Bile Flow" },
  "Ancestral Fire":         { es:"Fuego Ancestral", fr:"Feu Ancestral", pt:"Fogo Ancestral", ht:"Dife Ansestral", jm:"Ancestral Fire" },
},

// ═══════════════════════════════════════════════════════════════════════════
// MEN'S BLENDS
// ═══════════════════════════════════════════════════════════════════════════
men_blends: {
  "Volcanic Vitality":      { es:"Vitalidad Volcánica", fr:"Vitalité Volcanique", pt:"Vitalidade Vulcânica", ht:"Vitalite Volkantik", jm:"Volcanic Vitality" },
  "Iron Will":              { es:"Voluntad de Hierro", fr:"Volonté de Fer", pt:"Vontade de Ferro", ht:"Volonte Fè", jm:"Iron Will" },
  "Warrior's Rest":         { es:"Descanso del Guerrero", fr:"Repos du Guerrier", pt:"Descanso do Guerreiro", ht:"Repo Gèrye", jm:"Warrior's Rest" },
  "Deep Roots":             { es:"Raíces Profundas", fr:"Racines Profondes", pt:"Raízes Profundas", ht:"Rasin Fon", jm:"Deep Roots" },
  "Phoenix Rising":         { es:"Fénix en Ascenso", fr:"Phénix en Élévation", pt:"Fênix em Ascensão", ht:"Feniks ap Monte", jm:"Phoenix Rising" },
  "The Protector":          { es:"El Protector", fr:"Le Protecteur", pt:"O Protetor", ht:"Pwotektè a", jm:"The Protector" },
  "King's Glow":            { es:"Brillo del Rey", fr:"Éclat du Roi", pt:"Brilho do Rei", ht:"Klere Wa", jm:"King's Glow" },
  "Ancestral Strength":     { es:"Fuerza Ancestral", fr:"Force Ancestrale", pt:"Força Ancestral", ht:"Fòs Ansestral", jm:"Ancestral Strength" },
  "Flow State":             { es:"Estado de Flujo", fr:"État de Flux", pt:"Estado de Fluxo", ht:"Eta Flou", jm:"Flow State" },
  "The Provider":           { es:"El Proveedor", fr:"Le Pourvoyeur", pt:"O Provedor", ht:"Pourvwayè a", jm:"The Provider" },
  "Mind of Steel":          { es:"Mente de Acero", fr:"Esprit d'Acier", pt:"Mente de Aço", ht:"Lespri Asye", jm:"Mind of Steel" },
  "Elder Wisdom":           { es:"Sabiduría del Anciano", fr:"Sagesse de l'Aîné", pt:"Sabedoria do Ancião", ht:"Sajès Ansyen", jm:"Elder Wisdom" },
  "Sacred Union":           { es:"Unión Sagrada", fr:"Union Sacrée", pt:"União Sagrada", ht:"Inyon Sakre", jm:"Sacred Union" },
  "The Grind":              { es:"La Rutina", fr:"Le Labeur", pt:"A Luta Diária", ht:"Travay La", jm:"Di Grind" },
  "Night Warrior":          { es:"Guerrero Nocturno", fr:"Guerrier de Nuit", pt:"Guerreiro Noturno", ht:"Gèrye Nuit", jm:"Night Warrior" },
  "Foundation":             { es:"Fundación", fr:"Fondation", pt:"Fundação", ht:"Fondasyon", jm:"Foundation" },
  "The Awakening":          { es:"El Despertar", fr:"L'Éveil", pt:"O Despertar", ht:"Evèy La", jm:"The Awakening" },
  "Inner Fortress":         { es:"Fortaleza Interior", fr:"Forteresse Intérieure", pt:"Fortaleza Interior", ht:"Fortrès Anndan", jm:"Inner Fortress" },
  "The Journey":            { es:"El Viaje", fr:"Le Voyage", pt:"A Jornada", ht:"Vwayaj La", jm:"Di Journey" },
  "Legacy":                 { es:"Legado", fr:"Héritage", pt:"Legado", ht:"Eritaj", jm:"Legacy" },
},

// ═══════════════════════════════════════════════════════════════════════════
// ANCESTRAL COLLECTIONS
// ═══════════════════════════════════════════════════════════════════════════
ancestral_collections: {
  yard: {
    es: { title:"Del Jardín", subtitle:"Tradiciones de Té Bush Jamaicano", intro:"El té bush en Jamaica no es una tendencia. Es una tradición de supervivencia — conocimiento transmitido de generación en generación por mujeres que cultivaban medicina en sus jardines, a lo largo de sus cercas y en sus árboles de mango." },
    fr: { title:"De la Cour", subtitle:"Traditions du Thé Bush Jamaïcain", intro:"Le thé bush en Jamaïque n'est pas une tendance. C'est une tradition de survie — un savoir transmis de génération en génération par des femmes qui cultivaient la médecine dans leurs cours, le long de leurs clôtures et dans leurs manguiers." },
    pt: { title:"Do Quintal", subtitle:"Tradições do Chá Bush Jamaicano", intro:"O chá bush na Jamaica não é uma tendência. É uma tradição de sobrevivência — conhecimento transmitido de geração em geração por mulheres que cultivavam medicina em seus quintais, ao longo de suas cercas e em suas mangueiras." },
    ht: { title:"Nan Lakou", subtitle:"Tradisyon Tè Bush Jamayik", intro:"Tè bush ann Jamayik pa yon tandans. Se yon tradisyon siviv — konesans pote pandan jenerasyon pa fanm ki te grandi medsin nan lakou yo, bò kloti yo, ak nan pyebwa mango yo." },
    jm: { title:"From di Yard", subtitle:"Jamaican Bush Tea Traditions", intro:"Bush tea inna Jamaica nuh trend. A survival tradition — knowledge carry dung through generations by women who grow medicine inna dem yards, along dem fence, an up dem mango tree." },
  },
  kitchen: {
    es: { title:"De la Cocina", subtitle:"Remedios Ayurvédicos de la Cocina India" },
    fr: { title:"De la Cuisine", subtitle:"Remèdes Ayurvédiques de la Cuisine Indienne" },
    pt: { title:"Da Cozinha", subtitle:"Remédios Ayurvédicos da Cozinha Indiana" },
    ht: { title:"Nan Kwizin", subtitle:"Remèd Ayirvédik nan Kwizin Endyen" },
    jm: { title:"From di Kitchen", subtitle:"Ayurvedic Remedies from di Indian Kitchen" },
  },
  bridge: {
    es: { title:"Donde se Unen las Tradiciones", subtitle:"Botánica Caribeña e India Compartida" },
    fr: { title:"Où les Traditions Se Rencontrent", subtitle:"Botanique Partagée des Caraïbes et de l'Inde" },
    pt: { title:"Onde as Tradições se Encontram", subtitle:"Botânica Compartilhada do Caribe e Índia" },
    ht: { title:"Kote Tradisyon yo Rankontre", subtitle:"Botanik Pataje Karayib ak End" },
    jm: { title:"Where di Traditions Meet", subtitle:"Shared Caribbean and Indian Botany" },
  },
},

// ═══════════════════════════════════════════════════════════════════════════
// ANCESTRAL TEA NAMES
// ═══════════════════════════════════════════════════════════════════════════
ancestral_teas: {
  "Grandmother's Cerasee":  { es:"El Cerasee de la Abuela", fr:"Le Cerasee de Grand-mère", pt:"O Cerasee da Avó", ht:"Cerasee Grann", jm:"Grandmother's Cerasee" },
  "Fever Grass Tea":        { es:"Té de Hierba de Fiebre", fr:"Thé de Citronnelle", pt:"Chá de Capim-Limão", ht:"Tè Zèb Fyèv", jm:"Fever Grass Tea" },
  "Lemongrass Lift":        { es:"Elevación de Limoncillo", fr:"Élévation de Citronnelle", pt:"Elevação de Capim-Limão", ht:"Monte Lemonn Gra", jm:"Lemongrass Lift" },
  "Soursop Leaf Tea":       { es:"Té de Hoja de Guanábana", fr:"Thé de Feuille de Corossol", pt:"Chá de Folha de Graviola", ht:"Tè Fèy Kòwòsòl", jm:"Soursop Leaf Tea" },
  "Bissy Tea":              { es:"Té de Bissy", fr:"Thé de Bissy", pt:"Chá de Bissy", ht:"Tè Bisi", jm:"Bissy Tea" },
  "Moringa Sunrise":        { es:"Amanecer de Moringa", fr:"Lever du Soleil Moringa", pt:"Nascer do Sol de Moringa", ht:"Solèy Leve Moringa", jm:"Moringa Sunrise" },
  "Clove Tea":              { es:"Té de Clavo", fr:"Thé aux Clous de Girofle", pt:"Chá de Cravo", ht:"Tè Jiwòf", jm:"Clove Tea" },
  "Kadha":                  { es:"Kadha (Tónico Ayurvédico)", fr:"Kadha (Tonique Ayurvédique)", pt:"Kadha (Tônico Ayurvédico)", ht:"Kadha (Tonik Ayivédik)", jm:"Kadha (Ayurvedic Tonic)" },
  "Tulsi Tea":              { es:"Té de Tulsi (Albahaca Sagrada)", fr:"Thé de Tulsi (Basilic Sacré)", pt:"Chá de Tulsi (Manjericão Sagrado)", ht:"Tè Tulsi (Bazilik Sakre)", jm:"Tulsi Tea (Holy Basil)" },
  "Haldi Doodh":            { es:"Haldi Doodh (Leche de Oro)", fr:"Haldi Doodh (Lait Doré)", pt:"Haldi Doodh (Leite Dourado)", ht:"Haldi Doodh (Lèt Dore)", jm:"Haldi Doodh (Golden Milk)" },
  "Neem Tea":               { es:"Té de Neem", fr:"Thé de Neem", pt:"Chá de Neem", ht:"Tè Nim", jm:"Neem Tea" },
  "Ginger Root Tea":        { es:"Té de Raíz de Jengibre", fr:"Thé de Racine de Gingembre", pt:"Chá de Raiz de Gengibre", ht:"Tè Rasin Jenjann", jm:"Ginger Root Tea" },
  "Clove & Cinnamon Spice Tea": { es:"Té de Clavo y Canela", fr:"Thé aux Épices Clou de Girofle et Cannelle", pt:"Chá de Cravo e Canela", ht:"Tè Epis Jiwòf ak Kanèl", jm:"Clove & Cinnamon Spice Tea" },
},

// ═══════════════════════════════════════════════════════════════════════════
// HERB NAMES (HerbApothecary)
// ═══════════════════════════════════════════════════════════════════════════
herbs: {
  "Ceylon Cinnamon":    { es:"Canela de Ceilán", fr:"Cannelle de Ceylan", pt:"Canela do Ceilão", ht:"Kanèl Seylan", jm:"Ceylon Cinnamon" },
  "Turmeric":           { es:"Cúrcuma", fr:"Curcuma", pt:"Cúrcuma", ht:"Toumèrik", jm:"Turmeric" },
  "Chamomile":          { es:"Manzanilla", fr:"Camomille", pt:"Camomila", ht:"Kamomil", jm:"Chamomile" },
  "Cardamom":           { es:"Cardamomo", fr:"Cardamome", pt:"Cardamomo", ht:"Kardamòm", jm:"Cardamom" },
  "Milk Thistle":       { es:"Cardo Mariano", fr:"Chardon-Marie", pt:"Cardo-de-Leite", ht:"Kadon Lèt", jm:"Milk Thistle" },
  "Stinging Nettle":    { es:"Ortiga", fr:"Ortie", pt:"Urtiga", ht:"Zòtye", jm:"Stinging Nettle" },
  "Ashwagandha":        { es:"Ashwagandha", fr:"Ashwagandha", pt:"Ashwagandha", ht:"Ashwagandha", jm:"Ashwagandha" },
  "Lemon Balm":         { es:"Melisa / Toronjil", fr:"Mélisse", pt:"Melissa / Erva-Cidreira", ht:"Meliz / Bom-Sitron", jm:"Lemon Balm" },
  "Passionflower":      { es:"Flor de la Pasión", fr:"Fleur de la Passion", pt:"Flor do Maracujá", ht:"Fle Pasyon", jm:"Passionflower" },
  "Holy Basil (Tulsi)": { es:"Albahaca Sagrada (Tulsi)", fr:"Basilic Sacré (Tulsi)", pt:"Manjericão Sagrado (Tulsi)", ht:"Bazilik Sakre (Tulsi)", jm:"Holy Basil (Tulsi)" },
  "Valerian Root":      { es:"Raíz de Valeriana", fr:"Racine de Valériane", pt:"Raiz de Valeriana", ht:"Rasin Valeryan", jm:"Valerian Root" },
  "Elderberry":         { es:"Saúco (Bayas)", fr:"Sureau (Baies)", pt:"Sabugueiro (Bagas)", ht:"Siri (Fwi)", jm:"Elderberry" },
  "Echinacea":          { es:"Equinácea", fr:"Échinacée", pt:"Equinácea", ht:"Ekinase", jm:"Echinacea" },
  "Corn Silk":          { es:"Estigmas de Maíz", fr:"Stigmates de Maïs", pt:"Estigmas de Milho", ht:"Cheve Mayi", jm:"Corn Silk" },
  "Cerasee":            { es:"Cerasee (Melón Amargo)", fr:"Cerasee (Melon Amer)", pt:"Cerasee (Melão Amargo)", ht:"Cerasee (Melon Amè)", jm:"Cerasee" },
  "Ginger":             { es:"Jengibre", fr:"Gingembre", pt:"Gengibre", ht:"Jenjann", jm:"Ginger" },
  "Moringa":            { es:"Moringa", fr:"Moringa", pt:"Moringa", ht:"Moringa", jm:"Moringa" },
  "Soursop Leaf":       { es:"Hoja de Guanábana", fr:"Feuille de Corossol", pt:"Folha de Graviola", ht:"Fèy Kòwòsòl", jm:"Soursop Leaf" },
  "Lion's Mane":        { es:"Melena de León", fr:"Crinière de Lion", pt:"Juba de Leão", ht:"Krin Lyon", jm:"Lion's Mane" },
  "Reishi Mushroom":    { es:"Hongo Reishi", fr:"Champignon Reishi", pt:"Cogumelo Reishi", ht:"Chanpiyon Reishi", jm:"Reishi Mushroom" },
  "Hibiscus":           { es:"Hibisco", fr:"Hibiscus", pt:"Hibisco", ht:"Ibiskis", jm:"Hibiscus" },
  "Feverfew":           { es:"Matricaria", fr:"Grande Camomille", pt:"Feverfew", ht:"Fèvèfyou", jm:"Feverfew" },
  "Peppermint":         { es:"Menta Piperita", fr:"Menthe Poivrée", pt:"Hortelã-Pimenta", ht:"Mant Pwèvr", jm:"Peppermint" },
  "Lavender":           { es:"Lavanda", fr:"Lavande", pt:"Lavanda", ht:"Lavann", jm:"Lavender" },
},

};

/**
 * Get translated content for a specific language.
 * Falls back to English if translation not available.
 * 
 * @param {string} lang - Language code: 'en','es','fr','pt','ht','jm'
 * @returns {object} - Content object with seamoss, jelly, mocktails, blends, herbs etc.
 */
export function getContent(lang) {
  if (!lang || lang === 'en') return buildEnglish();
  
  return {
    seamoss: buildSection(CONTENT.seamoss, lang),
    jelly: buildSection(CONTENT.jelly, lang),
    mocktails: buildSection(CONTENT.mocktails, lang),
    blends: CONTENT.blends,
    men_blends: CONTENT.men_blends,
    ancestral_collections: buildSection(CONTENT.ancestral_collections, lang),
    ancestral_teas: CONTENT.ancestral_teas,
    herbs: CONTENT.herbs,
    lang,
  };
}

function buildSection(section, lang) {
  const result = {};
  for (const [id, versions] of Object.entries(section)) {
    result[id] = versions[lang] || versions['en'] || {};
  }
  return result;
}

function buildEnglish() {
  const result = { lang: 'en' };
  for (const [section, data] of Object.entries(CONTENT)) {
    result[section] = {};
    for (const [id, versions] of Object.entries(data)) {
      result[section][id] = versions['en'] || versions;
    }
  }
  return result;
}

/**
 * Get a translated blend name.
 * Usage: getBlendName("Morning Rise", lang)
 */
export function getBlendName(englishName, lang) {
  if (!lang || lang === 'en') return englishName;
  const entry = CONTENT.blends[englishName] || CONTENT.men_blends[englishName];
  if (!entry) return englishName;
  return entry[lang] || englishName;
}

/**
 * Get a translated herb name.
 */
export function getHerbName(englishName, lang) {
  if (!lang || lang === 'en') return englishName;
  const entry = CONTENT.herbs[englishName];
  if (!entry) return englishName;
  return entry[lang] || englishName;
}

/**
 * Get translated recipe content by section and id.
 * Usage: getRecipe('seamoss', 'sm1', lang)
 */
export function getRecipe(section, id, lang) {
  if (!lang || lang === 'en') return CONTENT[section]?.[id]?.en || {};
  return CONTENT[section]?.[id]?.[lang] || CONTENT[section]?.[id]?.en || {};
}

export default CONTENT;
