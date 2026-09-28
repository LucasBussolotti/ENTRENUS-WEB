# ADR-001: Arquitectura base para SEO y AEO

- **Estado:** Aceptada
- **Fecha:** 2026-09-17
- **Ámbito:** `app/[locale]/`, `lib/seo/`, `lib/data/products.ts`, `messages/`
- **Documentos relacionados:** planillas de marketing en [plantillas-marketing/](./plantillas-marketing/) (keywords, preguntas AEO y reglas), [revision-textos-reglas.md](./revision-textos-reglas.md)

## Contexto

El sitio de Entrenuts (Next.js App Router, `next-intl`, locales `es` y `en`) no tiene una base técnica para que buscadores y motores de respuesta lo indexen y lo entiendan:

- Ninguna ruta exporta `metadata` ni `generateMetadata`. Tampoco hay `metadataBase`, canonical ni `alternates.languages` (hreflang).
- No existen `app/sitemap.ts` ni `app/robots.ts`.
- No hay datos estructurados (JSON-LD).
- Las páginas `productos`, `recetas`, `empleos` y `distribuidor` declaran `"use client"` en `page.tsx`. Un módulo cliente no puede exportar `generateMetadata`.
- El catálogo (`/productos`) guarda el producto seleccionado en estado local (`useState`). Los productos no tienen URL propia: no se pueden indexar, enlazar ni citar uno por uno.
- No hay una estrategia de keywords documentada ni una forma de conectarla con el código.

El contenido se renderiza en el servidor (los componentes cliente también se prerenderizan), así que el problema no es el HTML en sí, sino los metadatos, la estructura de URLs y la semántica.

## Decisión

### 1. Server Components en la raíz de cada página

Cada `app/[locale]/**/page.tsx` es un Server Component. Es responsable de:

- Exportar `generateMetadata` (título, descripción, canonical, `alternates.languages`, Open Graph) usando `getTranslations` del namespace `Metadata`.
- Obtener los datos que necesita la página (por ejemplo, desde `lib/data/products.ts`) y pasarlos como props serializables.
- Insertar el JSON-LD de la página cuando corresponda.

`app/[locale]/layout.tsx` define `metadataBase`, la plantilla de título y los valores por defecto de toda la aplicación.

### 2. Interactividad aislada en Client Components

La directiva `"use client"` se usa solo en los componentes que necesitan estado, efectos o eventos del navegador. Se ubican junto a la ruta (`app/[locale]/productos/ProductosClient.tsx`) o en `components/` si se reutilizan.

- Un `page.tsx` nunca declara `"use client"`.
- Los Client Components reciben datos por props y no deciden metadatos ni URLs canónicas.

### 3. Catálogo con rutas dinámicas por producto

Cada producto tiene una URL indexable:

```
/{locale}/productos                  → listado y categorías
/{locale}/productos/{slug}           → ficha de producto
```

- El slug es `Product.id` de `lib/data/products.ts` (ya está en kebab-case y es único). Se comparte entre idiomas.
- `generateStaticParams` genera todas las combinaciones de `locale × slug` en el build.
- Un slug desconocido llama a `notFound()`.
- Cada ficha tendrá su propio `generateMetadata` y, en una fase posterior, JSON-LD de tipo `Product`.
- La navegación del catálogo pasa de estado local a enlaces (`next/link`). Así la selección de producto queda reflejada en la URL y el cambio de idioma conserva la ruta.

### 4. `lib/seo/keywords.ts` como puente tipado

La estrategia aprobada en `docs/seo/keyword-strategy.md` se traslada a una configuración tipada por ruta e idioma:

```ts
type Locale = 'es' | 'en'
type Intent = 'informational' | 'commercial' | 'transactional' | 'b2b'

interface RouteSeo {
  path: string
  intent: Intent
  priority: 'high' | 'medium' | 'low'
  indexable: boolean
  keywords: Record<Locale, { primary: string; secondary: string[] }>
  questions?: Record<Locale, string[]>
  schema: Array<'Organization' | 'Product' | 'Recipe' | 'FAQPage' | 'BreadcrumbList'>
}
```

Reparto de responsabilidades:

| Pieza | Responsabilidad |
|---|---|
| `docs/seo/keyword-strategy.md` | Fuente de verdad para personas. Se revisa y aprueba por PR. |
| `lib/seo/keywords.ts` | Traducción tipada de la estrategia. Alimenta a `sitemap.ts`, `robots.ts` y los helpers de JSON-LD. |
| `messages/{es,en}.json` → `Metadata` | Textos finales de título, descripción y respuestas visibles. |
| `lib/seo/jsonld.ts` | Construye los objetos schema.org a partir de los datos existentes. |

Las keywords no se emiten en `<meta name="keywords">` porque Google no usa esa etiqueta. Guían la redacción de títulos, descripciones, encabezados y contenido.

## Consecuencias

**Positivas**

- Metadatos, hreflang y canonical por página e idioma, generados en el servidor.
- Cada producto se puede indexar, compartir y citar desde motores de respuesta.
- La estrategia se puede revisar sin leer código, y el código no se desvía de lo aprobado.
- Límite claro entre servidor (datos y SEO) y cliente (interacción), con menos JavaScript enviado al navegador.

**Negativas y riesgos**

- Refactor de las páginas con `"use client"`: hay que mover la lógica y revisar imports.
- La migración del catálogo cambia el flujo de navegación. Hay que verificar el comportamiento en móvil, el cambio de idioma y los enlaces existentes a `/productos`.
- Mantener sincronizados los tres lugares (documento, `keywords.ts` y `messages/`). Esto se mitiga con la revisión por PR.
- Las fichas de producto necesitan datos fiables. Hoy varios `mlUrl` apuntan a la home de Mercado Libre y no sirven como `offers` en el JSON-LD.

## Fases

> **Estado (2026-09-27):** fases 1 y 2 implementadas y parte de la 3 (`Organization`, `WebSite`, `Product`/`ProductGroup`, `BreadcrumbList`, `FAQPage`). Falta `Recipe` y la validación con Rich Results Test en producción. La fuente de verdad de keywords son las planillas de `plantillas-marketing/` en lugar de `keyword-strategy.md`.
>
> Cambios respecto de la decisión original:
> - Los slugs siguen la planilla 01 de marketing (`/productos/pasta-de-mani-natural`), no `Product.id`. El mapeo está en `lib/data/catalog.ts`.
> - Hay páginas de categoría (`pastas-de-mani`, `protein`, `barritas-proteicas`, `aceite-de-coco`, `miel`) con grilla de productos, y fichas que agrupan sabores en una sola URL (`puffs-proteicos`, `pancakes-proteicos`).
> - Las preguntas AEO viven en `lib/data/faqs.ts` (bilingües, como `products.ts`) y solo se publican las aprobadas.

1. **Fundaciones (esta fase):** este ADR, la plantilla de la estrategia, `metadataBase` y valores por defecto en el layout, `sitemap.ts`, `robots.ts`, la separación server/client de las páginas y las rutas `/productos/[slug]`.
2. **Contenido:** marketing completa `keyword-strategy.md`, se completa `lib/seo/keywords.ts` y los textos de `Metadata` en ambos idiomas.
3. **Datos estructurados:** JSON-LD completo (`Organization`, `Product`, `Recipe`, `BreadcrumbList`, `FAQPage`) y validación con Rich Results Test.
4. **Medición:** Search Console por idioma y revisión periódica de la estrategia.

## Alternativas descartadas

- **Mantener `"use client"` y definir metadatos en un `layout.tsx` por segmento:** resuelve el título de la sección, pero no permite metadatos por producto y deja mezcladas las responsabilidades.
- **Producto seleccionado por query string (`/productos?p=slug`):** es más simple de migrar, pero da URLs más débiles para el canonical y el sitemap, y no genera páginas estáticas por producto.
- **Estrategia solo en un documento externo (Drive o Notion):** es fácil de editar, pero no tiene trazabilidad con el código y se desactualiza.
