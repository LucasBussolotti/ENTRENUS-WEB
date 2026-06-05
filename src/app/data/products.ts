export type ProductCategory = 'pastas' | 'granola' | 'barras' | 'frutos'

export interface Product {
  id: string
  nameEs: string
  nameEn: string
  variantEs?: string // <- Agregado para el subtítulo de la tarjeta
  variantEn?: string // <- Agregado para el subtítulo de la tarjeta
  descEs: string
  descEn: string
  category: ProductCategory
  image: string
  tags: string[]
  isNew: boolean
  mlUrl: string
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  color: string
}

export const products: Product[] = [
  {
    id: 'pasta-mani-natural',
    nameEs: 'Pasta de maní',
    nameEn: 'Peanut Butter',
    variantEs: 'Natural',
    variantEn: 'Natural',
    descEs: 'Solo maní. Sin azúcar agregada, sin aceite de palma, sin conservantes.',
    descEn: 'Just peanuts. No added sugar, no palm oil, no preservatives.',
    category: 'pastas',
    image: './PNG_NATURAL.png',
    tags: ['SIN GLUTEN', 'VEGANO', 'KETO'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 598, protein: 25, carbs: 20, fat: 50, fiber: 6 },
    color: '#C8935A',
  },
  {
    id: 'pasta-mani-crocante',
    nameEs: 'Pasta de maní',
    nameEn: 'Peanut Butter',
    variantEs: 'Crocante',
    variantEn: 'Crunchy',
    descEs: 'Con trocitos de maní entero para esa textura que tanto te gusta.',
    descEn: 'With chunks of whole peanut for that texture you love so much.',
    category: 'pastas',
    image: './PNG_CROCANTE.png',
    tags: ['SIN GLUTEN', 'VEGANO'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 610, protein: 24, carbs: 19, fat: 52, fiber: 5 },
    color: '#A67C4E',
  },
  {
    id: 'aceite-coco-virgen',
    nameEs: 'Aceite de coco',
    nameEn: 'Coconut Oil',
    variantEs: 'Virgen',
    variantEn: 'Virgin',
    descEs: 'La combinación perfecta: maní real + cacao puro. Sin culpa.',
    descEn: 'The perfect combination: real peanut + pure cacao. Guilt-free.',
    category: 'pastas',
    image: './PNG_ACV500.png',
    tags: ['SIN GLUTEN', 'VEGANO', 'SIN AZÚCAR AGREGADA'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 580, protein: 22, carbs: 24, fat: 48, fiber: 7 },
    color: '#5C3D2E',
  },
  {
    id: 'aceite-coco-neutro',
    nameEs: 'Aceite de coco',
    nameEn: 'Coconut Oil',
    variantEs: 'Neutro',
    variantEn: 'Neutral',
    descEs: 'Avena, miel, semillas y frutos secos. El desayuno que mereces.',
    descEn: 'Oats, honey, seeds and nuts. The breakfast you deserve.',
    category: 'granola',
    image: './PNG_ACNEUTRO360.png',
    tags: ['SIN GLUTEN', 'VEGANO'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 420, protein: 10, carbs: 65, fat: 14, fiber: 8 },
    color: '#D4A843',
  },
  {
    id: 'ghee',
    nameEs: 'Ghee',
    nameEn: 'Ghee',
    // Ghee no lleva variante en tu diseño, queda el campo omitido
    descEs: 'Con coco, piña y mango deshidratado. Un viaje en cada cucharada.',
    descEn: 'With coconut, pineapple and dehydrated mango. A trip in every spoonful.',
    category: 'granola',
    image: './PNG_GHEE300.png',
    tags: ['SIN GLUTEN', 'VEGANO'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 400, protein: 8, carbs: 68, fat: 12, fiber: 7 },
    color: '#E8833A',
  },
  {
    id: 'barras-proteicas-frutilla',
    nameEs: 'Barritas proteicas',
    nameEn: 'Protein Bars',
    variantEs: 'Frutilla deli',
    variantEn: 'Strawberry deli',
    descEs: '14g de proteína por porción. Ingredientes reales, sin rellenos artificiales.',
    descEn: '14g of protein per serving. Real ingredients, no artificial fillers.',
    category: 'barras',
    image: './DISPLAY FRUTIDELI.png',
    tags: ['SIN GLUTEN', 'KETO', 'SIN AZÚCAR AGREGADA'],
    isNew: true,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 220, protein: 14, carbs: 22, fat: 8, fiber: 4 },
    color: '#4A7C59',
  },
  {
    id: 'barras-proteicas-choco',
    nameEs: 'Barritas proteicas',
    nameEn: 'Protein Bars',
    variantEs: 'Choco maní',
    variantEn: 'Choco peanut',
    descEs: '14g de proteína por porción. Ingredientes reales, sin rellenos artificiales.',
    descEn: '14g of protein per serving. Real ingredients, no artificial fillers.',
    category: 'barras',
    image: './DISPLAY CHOCOMANI.png',
    tags: ['SIN GLUTEN', 'VEGANO', 'KETO'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 580, protein: 18, carbs: 20, fat: 50, fiber: 7 },
    color: '#8B6914',
  },
  {
    id: 'miel',
    nameEs: 'Miel',
    nameEn: 'Honey',
    variantEs: 'Líquida',
    variantEn: 'Liquid',
    descEs: 'La dulzura natural de la miel, sin aditivos ni conservantes.',
    descEn: 'The natural sweetness of honey, without additives or preservatives.',
    category: 'frutos',
    image: './PNG_MIEL LIQUIDA_500G.png',
    tags: ['SIN GLUTEN', 'VEGANO', 'KETO', 'SIN AZÚCAR AGREGADA'],
    isNew: false,
    mlUrl: 'https://www.mercadolibre.com.ar',
    nutrition: { calories: 576, protein: 21, carbs: 22, fat: 49, fiber: 13 },
    color: '#B8860B',
  },
]