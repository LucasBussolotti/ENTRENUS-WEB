/*
 * Preguntas y respuestas aprobadas para AEO, transcriptas sin cambios de
 * docs/seo/plantillas-marketing/02-aeo-preguntas v2 (Catálogo 2026).xlsx.
 *
 * Solo se publican las que tienen `status: 'approved'`. Las pendientes quedan
 * cargadas con la validación que pidió marketing en `validation`: cuando el área
 * correspondiente la apruebe, alcanza con cambiar el estado (y el texto, si lo
 * corrigen).
 *
 * `page` es el slug del catálogo donde se muestra la pregunta, o una página del
 * sitio ('acerca_de', 'productos'). 'donde-comprar' y 'chile' todavía no existen.
 */

export type FaqPage = string

export interface FaqText {
  question: string
  answer: string
}

export interface Faq {
  id: string
  page: FaqPage
  status: 'approved' | 'pending'
  validation?: string
  es: FaqText
  en: FaqText
}

export const faqs: Faq[] = [
  {
    id: 'que-es-entrenuts',
    page: 'acerca_de',
    status: 'approved',
    es: {
      question: '¿Qué es Entrenuts?',
      answer:
        'Entrenuts es una empresa argentina de alimentos nacida en Colón, Entre Ríos, que empezó a producir en marzo de 2020. Elabora pasta de maní, aceite de coco, miel, ghee, MCT, barras, puffs y premezclas proteicas. Su misión: democratizar lo saludable.',
    },
    en: {
      question: 'What is Entrenuts?',
      answer:
        'Entrenuts is an Argentine food company from Colón, Entre Ríos, that started production in March 2020. It makes peanut butter, coconut oil, honey, ghee, MCT oil, protein bars, puffs and pancake mixes. Its mission: making healthy eating accessible to everyone.',
    },
  },
  {
    id: 'donde-se-elaboran',
    page: 'acerca_de',
    status: 'approved',
    es: {
      question: '¿Dónde se elaboran los productos Entrenuts?',
      answer:
        'En Colón, Entre Ríos, en dos plantas propias, con un equipo de casi 100 personas. Los productos llegan a todas las provincias de Argentina.',
    },
    en: {
      question: 'Where are Entrenuts products made?',
      answer:
        'In Colón, Entre Ríos, Argentina, at two company-owned plants with a team of nearly 100 people. Products reach every Argentine province.',
    },
  },
  {
    id: 'donde-comprar',
    page: 'donde-comprar',
    status: 'pending',
    validation: 'Comercial: nombres de cadenas, dietéticas y autoservicios vigentes y link de la tienda de Mercado Libre',
    es: {
      question: '¿Dónde puedo comprar productos Entrenuts?',
      answer:
        'En dietéticas y tiendas naturales de todas las provincias, en cadenas de supermercados seleccionadas y en la tienda oficial de Entrenuts en Mercado Libre.',
    },
    en: {
      question: 'Where can I buy Entrenuts products?',
      answer:
        'In health food stores across every Argentine province, in selected supermarket chains and at the official Entrenuts store on Mercado Libre.',
    },
  },
  {
    id: 'exporta-chile',
    page: 'chile',
    status: 'pending',
    // Marketing (28/09): la marca Entrenuts no se exporta por ahora; sí se produce para otros
    // países. La respuesta de abajo quedó desactualizada y hay que reescribirla o descartarla.
    validation: 'Reescribir: la marca no se exporta por ahora',
    es: {
      question: '¿Entrenuts exporta? ¿Se consigue en Chile?',
      answer: 'Sí. Entrenuts exporta a 10 países. En Chile se vende online a través de su tienda oficial.',
    },
    en: {
      question: 'Does Entrenuts export? Is it available in Chile?',
      answer: 'Yes. Entrenuts exports to 10 countries. In Chile it is sold online through its official store.',
    },
  },
  {
    // Marketing (28/09): toda la línea es sin gluten, todos los SKU. No dice "apto celíacos".
    id: 'sin-gluten',
    page: 'productos',
    status: 'approved',
    es: {
      question: '¿Los productos Entrenuts tienen gluten?',
      answer: 'No. Toda la línea Entrenuts es sin gluten.',
    },
    en: {
      question: 'Do Entrenuts products contain gluten?',
      answer: 'No. The entire Entrenuts range is gluten-free.',
    },
  },
  {
    id: 'pasta-azucar',
    page: 'pasta-de-mani-natural',
    status: 'approved',
    es: {
      question: '¿La pasta de maní Entrenuts tiene azúcar?',
      answer:
        'Ninguna pasta de maní Entrenuts tiene azúcar agregada. La Natural y la Crocante se hacen con maní seleccionado, sin aceites hidrogenados. Las variedades con Stevia o Cacao llevan edulcorantes permitidos.',
    },
    en: {
      question: 'Does Entrenuts peanut butter contain sugar?',
      answer:
        'No Entrenuts peanut butter has added sugar. Natural and Crunchy are made with selected peanuts and no hydrogenated oils. The Stevia and Cocoa varieties contain approved sweeteners.',
    },
  },
  {
    id: 'pasta-vs-mantequilla',
    page: 'pastas-de-mani',
    status: 'approved',
    es: {
      question: '¿Cuál es la diferencia entre pasta de maní y mantequilla de maní?',
      answer:
        'Ninguna: es el mismo producto. En Argentina se dice pasta de maní, en otros países mantequilla de maní o peanut butter. La pasta de maní Natural de Entrenuts se hace con maní seleccionado.',
    },
    en: {
      question: 'What is the difference between peanut paste and peanut butter?',
      answer:
        "None: it is the same product. In Argentina it is called 'pasta de maní'; elsewhere, peanut butter. Entrenuts Natural Peanut Butter is made with selected peanuts.",
    },
  },
  {
    id: 'pasta-aceite-separa',
    page: 'pasta-de-mani-natural',
    status: 'approved',
    es: {
      question: '¿Por qué se separa el aceite en la pasta de maní?',
      answer:
        'Es normal: es el aceite natural del maní, porque la pasta no lleva aceites hidrogenados. Solo tenés que mezclar antes de consumir.',
    },
    en: {
      question: 'Why does oil separate in peanut butter?',
      answer:
        "It is normal: it is the peanuts' natural oil, because the spread contains no hydrogenated oils. Just stir before eating.",
    },
  },
  {
    id: 'pasta-heladera',
    page: 'pastas-de-mani',
    status: 'approved',
    es: {
      question: '¿Hay que guardar la pasta de maní en la heladera?',
      answer: 'No necesita refrigeración. Guardala en un lugar fresco y seco, al resguardo de la luz solar.',
    },
    en: {
      question: 'Should peanut butter be refrigerated?',
      answer: 'It does not need refrigeration. Store it in a cool, dry place away from direct sunlight.',
    },
  },
  {
    id: 'pasta-ninos',
    page: 'pastas-de-mani',
    status: 'approved',
    es: {
      question: '¿Pueden los niños comer pasta de maní Entrenuts?',
      answer:
        'Sí, siempre que no tengan alergia al maní. Las variedades con edulcorantes, como Stevia o Cacao, indican en la etiqueta que no se recomiendan para niños, según la normativa vigente.',
    },
    en: {
      question: 'Can children eat Entrenuts peanut butter?',
      answer:
        'Yes, as long as they are not allergic to peanuts. Sweetened varieties, such as Stevia or Cocoa, state on the label that they are not recommended for children, as required by regulations.',
    },
  },
  {
    id: 'natural-vs-crocante',
    page: 'pasta-de-mani-crocante',
    status: 'approved',
    es: {
      question: '¿Qué diferencia hay entre la pasta de maní Natural y la Crocante?',
      answer:
        'Las dos se hacen con maní seleccionado. La Natural es lisa y cremosa; la Crocante suma trozos de maní para una textura con mordida.',
    },
    en: {
      question: 'What is the difference between Natural and Crunchy peanut butter?',
      answer: 'Both are made with selected peanuts. Natural is smooth and creamy; Crunchy adds peanut pieces for extra bite.',
    },
  },
  {
    id: 'pasta-usos',
    page: 'pastas-de-mani',
    status: 'approved',
    es: {
      question: '¿Cómo se usa la pasta de maní?',
      answer:
        'En tostadas, frutas, licuados, yogures y bowls. También en repostería, trufas, chía pudding, dátiles rellenos y en preparaciones saladas como dips, salsas y aderezos para ensaladas.',
    },
    en: {
      question: 'How can I use peanut butter?',
      answer:
        'On toast, fruit, smoothies, yogurt and bowls. Also in baking, truffles, chia pudding, stuffed dates and savory recipes like dips, sauces and salad dressings.',
    },
  },
  {
    id: 'pasta-nutrientes',
    page: 'pasta-de-mani-natural',
    status: 'pending',
    validation:
      "Valen (nutrición): validar vs. tabla nutricional. NO usar 'estabiliza el azúcar en sangre' ni 'salud cardiovascular'",
    es: {
      question: '¿Qué nutrientes aporta la pasta de maní?',
      answer:
        'Aporta proteínas y fibra, y contiene vitaminas A, B3, B9 y E, biotina, zinc y omega 3. Consultá los valores exactos en la tabla nutricional del rótulo.',
    },
    en: {
      question: 'What nutrients does peanut butter provide?',
      answer:
        'It provides protein and fiber, and contains vitamins A, B3, B9 and E, biotin, zinc and omega-3. See the nutrition facts table on the label for exact values.',
    },
  },
  {
    // Marketing la asignó a /productos/pasta-de-mani-1kg-4kg, que no se creó: el
    // formato es de la Natural, no un producto aparte. Va en la categoría.
    id: 'pasta-tamanos',
    page: 'pastas-de-mani',
    status: 'approved',
    es: {
      question: '¿En qué tamaños viene la pasta de maní Entrenuts?',
      answer:
        'La Natural viene en frasco de 370 g, en 1 kg y en balde de 4 kg. Las variedades Crocante, Cacao, Stevia y Coco vienen en 370 g.',
    },
    en: {
      question: 'What sizes does Entrenuts peanut butter come in?',
      answer: 'Natural comes in a 370 g jar, a 1 kg format and a 4 kg tub. Crunchy, Cocoa, Stevia and Coconut come in 370 g.',
    },
  },
  {
    id: 'untable-proteico',
    page: 'untable-de-mani-proteico-cookies-and-cream',
    status: 'pending',
    validation:
      'Gabi (regulatorio): el claim comparativo debe citar el producto de referencia (ej. vs. Pasta de Maní Natural Entrenuts)',
    es: {
      question: '¿Qué es el Untable de maní proteico de Entrenuts?',
      answer:
        'Es un untable de maní con proteína agregada, en sabores Cookies & Cream y Salted Caramel. Tiene 40% más proteína y 26% menos grasas que la pasta de maní tradicional, y 0% azúcares agregados.',
    },
    en: {
      question: 'What is Entrenuts protein peanut spread?',
      answer:
        'It is a peanut spread with added protein, in Cookies & Cream and Salted Caramel flavors. It has 40% more protein and 26% less fat than traditional peanut butter, and 0% added sugars.',
    },
  },
  {
    id: 'barritas-proteina-fibra',
    page: 'barritas-proteicas',
    status: 'approved',
    es: {
      question: '¿Cuánta proteína y fibra tienen las barritas Entrenuts?',
      answer:
        'Cada barrita de 45 g aporta 15 g de proteína vegetal. La fibra varía por sabor: Lemon Pie 7 g, Frutilla Deli y ChocoManí 8 g, NaranChoc 9 g por porción.',
    },
    en: {
      question: 'How much protein and fiber are in Entrenuts protein bars?',
      answer:
        'Each 45 g bar provides 15 g of plant protein. Fiber varies by flavor: Lemon Pie 7 g, Frutilla Deli and ChocoManí 8 g, NaranChoc 9 g per serving.',
    },
  },
  {
    id: 'barritas-azucar',
    page: 'barritas-proteicas',
    status: 'approved',
    es: {
      question: '¿Las barritas proteicas Entrenuts tienen azúcar?',
      answer:
        'Tienen los azúcares propios de sus ingredientes, como pasas de uva, arándanos y el baño de repostería. Su contenido de azúcares agregados es bajo, por eso no llevan sello.',
    },
    en: {
      question: 'Do Entrenuts protein bars contain sugar?',
      answer:
        'They contain sugars naturally present in their ingredients, such as raisins, cranberries and the coating. Their added sugar content is low, so they carry no warning label.',
    },
  },
  {
    id: 'barritas-veganas',
    page: 'barritas-proteicas',
    status: 'pending',
    validation: "Gabi (regulatorio): 'apto vegano' solo con certificación. Si no hay, usar 'sin ingredientes de origen animal'",
    es: {
      question: '¿Las barritas Entrenuts son veganas?',
      answer:
        'ChocoManí y NaranChoc no contienen ingredientes de origen animal. Frutilla Deli y Lemon Pie no son aptas para veganos porque tienen baño de chocolate blanco.',
    },
    en: {
      question: 'Are Entrenuts protein bars vegan?',
      answer:
        'ChocoManí and NaranChoc contain no animal-derived ingredients. Frutilla Deli and Lemon Pie are not vegan because of their white chocolate coating.',
    },
  },
  {
    id: 'barritas-suplemento',
    page: 'barritas-proteicas',
    status: 'approved',
    es: {
      question: '¿Las barritas Entrenuts son un suplemento? ¿Pueden comerlas los niños?',
      answer:
        'No son suplemento: están registradas como alimento. Están pensadas para adultos por su alto contenido de proteína y fibra.',
    },
    en: {
      question: 'Are Entrenuts bars a supplement? Can children eat them?',
      answer:
        'They are not a supplement: they are registered as a food. They are designed for adults because of their high protein and fiber content.',
    },
  },
  {
    id: 'puffs',
    page: 'puffs-proteicos',
    status: 'approved',
    es: {
      question: '¿Qué son los Puffs Protein de Entrenuts?',
      answer:
        'Son un snack salado horneado, no frito, con más de 15 g de proteína por paquete de 50 g. Sin sellos, sin gluten y de base vegetal. Sabores: Cebolla a la Crema, Queso, Mostaza y Miel, y Barbacoa.',
    },
    en: {
      question: 'What are Entrenuts Protein Puffs?',
      answer:
        'They are a baked, not fried, savory snack with over 15 g of protein per 50 g bag. No warning labels, gluten-free and plant-based. Flavors: Sour Cream & Onion, Cheese, Honey Mustard and Barbecue.',
    },
  },
  {
    id: 'pancakes-preparacion',
    page: 'pancakes-proteicos',
    status: 'pending',
    validation: "Gabi (regulatorio): confirmar respaldo de 'sin lactosa' en rótulo",
    es: {
      question: '¿Cómo se preparan los Pancakes Protein Entrenuts?',
      answer:
        'Solo necesitás agua: mezclá, cociná en sartén caliente y dorá de ambos lados. Cada porción aporta 15 g de proteína. Son sin gluten, sin lactosa, sin azúcar agregada y sin edulcorantes.',
    },
    en: {
      question: 'How do you make Entrenuts Protein Pancakes?',
      answer:
        'Just add water: mix, cook in a hot pan and brown on both sides. Each serving provides 15 g of protein. Gluten-free, lactose-free, no added sugar and no sweeteners.',
    },
  },
  {
    id: 'coco-neutro-vs-virgen',
    page: 'aceite-de-coco',
    status: 'approved',
    es: {
      question: '¿Qué diferencia hay entre aceite de coco neutro y virgen?',
      answer:
        'El neutro no tiene aroma ni sabor: ideal para salteados, frituras y reemplazar otras grasas. El virgen es sin refinar y conserva todo el sabor a coco: ideal para repostería, batidos y bowls.',
    },
    en: {
      question: 'What is the difference between refined and virgin coconut oil?',
      answer:
        'Refined (neutral) has no aroma or flavor: ideal for sautéing, frying and replacing other fats. Virgin is unrefined and keeps the full coconut flavor: ideal for baking, smoothies and bowls.',
    },
  },
  {
    id: 'coco-cambia-estado',
    page: 'aceite-de-coco',
    status: 'approved',
    es: {
      question: '¿Por qué el aceite de coco cambia de estado?',
      answer:
        'Por debajo de los 25 °C se solidifica y se vuelve blanco. Por encima, es líquido y de color ámbar. Es un cambio natural que no afecta su calidad. No necesita refrigeración.',
    },
    en: {
      question: 'Why does coconut oil change from solid to liquid?',
      answer:
        'Below 25 °C (77 °F) it solidifies and turns white. Above that, it is liquid and amber. This is natural and does not affect quality. No refrigeration needed.',
    },
  },
  {
    id: 'coco-altas-temperaturas',
    page: 'aceite-de-coco-neutro',
    status: 'approved',
    es: {
      question: '¿Se puede cocinar a altas temperaturas con aceite de coco?',
      answer:
        'Sí. Es una grasa naturalmente estable que no se degrada a altas temperaturas. Sirve para salteados de carnes y vegetales, frituras y como reemplazo de manteca en repostería.',
    },
    en: {
      question: 'Can you cook with coconut oil at high heat?',
      answer:
        'Yes. It is a naturally stable fat that does not break down at high temperatures. Use it for sautéing meat and vegetables, frying and as a butter substitute in baking.',
    },
  },
  {
    id: 'coco-tamanos',
    page: 'aceite-de-coco',
    status: 'pending',
    validation: 'Comercial: confirmar formatos del virgen',
    es: {
      question: '¿En qué tamaños viene el aceite de coco Entrenuts?',
      answer: 'Neutro y virgen vienen en 200 cc, 360 cc, 500 cc y 1 litro.',
    },
    en: {
      question: 'What sizes does Entrenuts coconut oil come in?',
      answer: 'Refined and virgin come in 200 ml, 360 ml, 500 ml and 1 liter.',
    },
  },
  {
    id: 'mct-que-es',
    page: 'aceite-mct',
    status: 'pending',
    validation: "Gabi (regulatorio): NO usar 'maximiza cetonas' ni 'energía rápida'",
    es: {
      question: '¿Qué es el aceite MCT?',
      answer:
        'Es un aceite de triglicéridos de cadena media obtenido del coco. No tiene aroma ni sabor y se suma fácilmente al café, smoothies y batidos. Se usa en recetas keto y low carb.',
    },
    en: {
      question: 'What is MCT oil?',
      answer:
        'It is a medium-chain triglyceride oil derived from coconut. It has no aroma or flavor and blends easily into coffee, smoothies and shakes. It is used in keto and low-carb recipes.',
    },
  },
  {
    id: 'mct-cocinar',
    page: 'aceite-mct',
    status: 'approved',
    es: {
      question: '¿Se puede cocinar con aceite MCT?',
      answer:
        'No se recomienda para altas temperaturas, como frituras o salteados. Usalo en frío: en café, batidos o aderezos. Se sugiere incorporarlo de forma gradual.',
    },
    en: {
      question: 'Can you cook with MCT oil?',
      answer:
        'It is not recommended for high heat, such as frying or sautéing. Use it cold: in coffee, shakes or dressings. Introduce it gradually into your routine.',
    },
  },
  {
    id: 'ghee-que-es',
    page: 'ghee',
    status: 'approved',
    es: {
      question: '¿Qué es el ghee?',
      answer:
        'El ghee es manteca clarificada, un ingrediente tradicional de la cocina india. Tiene punto de humo alto, sabor intenso y no necesita refrigeración. Entrenuts lo ofrece en 150 g y 300 g.',
    },
    en: {
      question: 'What is ghee?',
      answer:
        'Ghee is clarified butter, a traditional ingredient in Indian cuisine. It has a high smoke point, rich flavor and needs no refrigeration. Entrenuts offers it in 150 g and 300 g.',
    },
  },
  {
    id: 'ghee-lactosa',
    page: 'ghee',
    status: 'pending',
    validation:
      "Gabi (regulatorio): el Catálogo dice 'sin caseína y sin lactosa'. Solo usarlo si hay análisis y está en el rótulo aprobado",
    es: {
      question: '¿El ghee tiene lactosa?',
      answer:
        'El clarificado elimina la mayor parte de los sólidos lácteos, pero el ghee es un derivado de la leche. No es apto para personas alérgicas a la proteína de leche. Consultá el rótulo.',
    },
    en: {
      question: 'Does ghee contain lactose?',
      answer:
        'Clarifying removes most milk solids, but ghee is a dairy product. It is not suitable for people allergic to milk protein. Check the label.',
    },
  },
  {
    id: 'ghee-usos',
    page: 'ghee',
    status: 'approved',
    es: {
      question: '¿Cómo se usa el ghee en la cocina?',
      answer:
        'Para saltear carnes, vegetales y salsas, y en repostería y pastelería. Reemplaza a la manteca o al aceite y no se quema fácilmente.',
    },
    en: {
      question: 'How do you use ghee in cooking?',
      answer: 'For sautéing meat, vegetables and sauces, and in baking and pastry. It replaces butter or oil and does not burn easily.',
    },
  },
  {
    id: 'miel-origen',
    page: 'miel',
    status: 'approved',
    es: {
      question: '¿De dónde proviene la miel Entrenuts?',
      answer:
        'Del campo entrerriano. Se elabora cuidando la temperatura para conservar lo mejor de la miel, con altos estándares de calidad e inocuidad.',
    },
    en: {
      question: 'Where does Entrenuts honey come from?',
      answer:
        "From the countryside of Entre Ríos, Argentina. It is processed with careful temperature control to preserve the honey's best qualities, under high quality and food safety standards.",
    },
  },
  {
    id: 'miel-liquida-vs-untable',
    page: 'miel-untable',
    status: 'approved',
    es: {
      question: '¿Qué diferencia hay entre miel líquida y miel untable?',
      answer:
        'Es la misma miel con distinta textura. La líquida sirve para mezclar y endulzar. La untable se unta y no chorrea. Textura, aroma y color pueden variar según el origen floral y la temperatura.',
    },
    en: {
      question: 'What is the difference between liquid and creamed honey?',
      answer:
        'It is the same honey with a different texture. Liquid honey is for mixing and sweetening. Creamed honey spreads without dripping. Texture, aroma and color may vary with floral source and temperature.',
    },
  },
  {
    id: 'miel-cristaliza',
    page: 'miel-liquida',
    status: 'approved',
    es: {
      question: '¿Por qué se cristaliza la miel?',
      answer:
        'La cristalización es un proceso natural de la miel pura y no indica que esté adulterada. Para volverla líquida, calentala a baño María suave.',
    },
    en: {
      question: 'Why does honey crystallize?',
      answer:
        'Crystallization is a natural process in pure honey and does not mean it is adulterated. To liquefy it, warm it gently in a water bath.',
    },
  },
  {
    id: 'miel-bebes',
    page: 'miel',
    status: 'pending',
    validation: 'Gabi (regulatorio): alinear con leyenda del rótulo',
    es: {
      question: '¿Pueden los bebés comer miel?',
      answer: 'No se recomienda dar miel a menores de 1 año. Consultá con el pediatra.',
    },
    en: {
      question: 'Can babies eat honey?',
      answer: 'Honey is not recommended for children under 1 year old. Consult your pediatrician.',
    },
  },
]

export function getPublishedFaqs(page: FaqPage): Faq[] {
  return faqs.filter((faq) => faq.page === page && faq.status === 'approved')
}
