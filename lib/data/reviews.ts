/*
 * Opiniones reales de compradores en Mercado Libre, transcriptas el 28/09/2026 de
 * las capturas que envió el cliente. El texto va tal cual (errores y emojis
 * incluidos): no se corrige ni se traduce. Mercado Libre no muestra el nombre de
 * quien opina, así que acá tampoco va.
 *
 * Quedaron afuera dos opiniones de la Pasta de maní natural que comparan con otra
 * marca por nombre ("king"): publicarlas en el sitio propio es publicidad
 * comparativa y conviene que marketing lo decida.
 */

export interface MarketplaceReview {
  id: string
  /** id en products.ts */
  productId: string
  rating: 1 | 2 | 3 | 4 | 5
  /** Texto original en español. Los saltos de línea se respetan. */
  text: string
  /** Publicación donde está la opinión, para que se pueda comprobar */
  listingUrl: string
}

const LISTINGS = {
  cocoNeutro: 'https://www.mercadolibre.com.ar/aceite-de-coco-entrenuts-neutro-1000cc-sin-gluten/p/MLA52685173',
  pastaNatural: 'https://www.mercadolibre.com.ar/pasta-de-mani-natural-entrenuts-1kg-sin-gluten/p/MLA62234514',
  proteinSalted: 'https://www.mercadolibre.com.ar/pasta-de-mani-proteica-salted-caramel-entrenuts-370g/p/MLA61321760',
}

export const reviews: MarketplaceReview[] = [
  {
    id: 'coco-1',
    productId: 'aceite-coco-neutro',
    rating: 5,
    text: 'Es muy sano gente, dejen de usar aceites comunes. Lean y mejoren su salud.\nHago todo con este aceite.\nLo saco del frasco de plástico y relleno una botella linda de vidrio.',
    listingUrl: LISTINGS.cocoNeutro,
  },
  {
    id: 'salted-1',
    productId: 'pasta-mani-salted',
    rating: 5,
    text: 'Lo tengo escondido para no cucharearlo cada vez que lo cruzo 🥹 es delicioso, primero compré el de cookies and cream pero éste me gustó muchísimo más.',
    listingUrl: LISTINGS.proteinSalted,
  },
  {
    id: 'natural-1',
    productId: 'pasta-mani-natural',
    rating: 5,
    text: 'Barata y muy buena!.',
    listingUrl: LISTINGS.pastaNatural,
  },
  {
    id: 'salted-2',
    productId: 'pasta-mani-salted',
    rating: 5,
    text: 'Lo mejor que probé en mucho!!! saludable, proteico y riquísimo!! me encantó. Es la 3ra vez que la compro en 2 semana. 😋🫶🏻.',
    listingUrl: LISTINGS.proteinSalted,
  },
  {
    id: 'coco-2',
    productId: 'aceite-coco-neutro',
    rating: 5,
    text: 'Super bueno el aceite de coco lo uso hace muchisimo tiempo y no lo cambio por nada es una inversión usar este aceite por lo sano que es no lo dejo de consumir!!!.',
    listingUrl: LISTINGS.cocoNeutro,
  },
  {
    id: 'salted-3',
    productId: 'pasta-mani-salted',
    rating: 5,
    // En Mercado Libre sigue con "Leer más": es lo que se ve sin expandir
    text: 'Excelente producto.\nProteínas y pocas calorías, sin azúcar. Apenas endulzado con estevia que ni te enteras que la tiene…',
    listingUrl: LISTINGS.proteinSalted,
  },
]
