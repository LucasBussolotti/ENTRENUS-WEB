# Pendientes de la auditoría SEO: octubre 2026

**Fecha:** 6 de octubre de 2026
**Alcance:** auditoría SEO completa de Entrenuts Web (`/es` y `/en`), hecha sobre el build de producción local.
**Puntaje de salud SEO:** 72/100

Los arreglos técnicos que no necesitaban aprobación ya están hechos:

- etiquetas de los formularios;
- campo de CV accesible con teclado;
- FAQ de gluten en `/productos`;
- schema de producto;
- breadcrumbs;
- banderas alojadas en el sitio;
- páginas de sabores fuera del índice de Google.

Este documento reúne **lo que falta**. Casi todo necesita una decisión, un dato aprobado o un texto de Marketing, Regulatorio o Comercial. Para cada punto se indica qué pasa, por qué importa, qué hay que decidir o enviar, y quién.

> Regla para todos los puntos: la web solo publica información aprobada. No se agregan afirmaciones nutricionales, precios, sellos, certificaciones ni datos comerciales sin validación (ver `docs/seo/plantillas-marketing/03-seo-reglas.csv`).

---

## Resumen

| # | Pendiente | Prioridad | Responsable | Estado (6/10) |
|---|---|---|---|---|
| 1 | Afirmación "Libre de lactosa y caseína" en el ghee | **Urgente** | Regulatorio | Pendiente |
| 2 | H1 de la home: "1er snack proteico salado" | Alta | Marketing + Legal | Por confirmar: ¿se mantiene o se cambia? |
| 3 | Enlaces de Mercado Libre por producto | Alta | Comercial / E-commerce | En espera |
| 4 | Textos de introducción de las categorías | Alta | Marketing | **Hecho** con las descripciones aprobadas |
| 5 | Ingredientes e información nutricional por producto | Alta | Regulatorio / Calidad | Resuelto: la tabla está en la galería; quedan mejoras opcionales |
| 6 | Página de Distribuidores | Alta | Comercial | En espera: el portal se está terminando |
| 7 | Contenido de Recetas | Media | Marketing / Contenido | Se mantiene como reels |
| 8 | 10 preguntas frecuentes pendientes de aprobación | Media | Regulatorio / Comercial | En consulta |
| 9 | Texto de proteína de los Puffs | Media | Marketing + Regulatorio |
| 10 | Presentaciones del aceite de coco | Media | Comercial |
| 11 | Descripción de la página de Empleos | Media | Marketing / RR. HH. |
| 12 | Descripciones demasiado largas para Google | Baja | Marketing |
| 13 | Datos de la empresa y redes oficiales | Baja | Marketing |
| 14–19 | Pendientes antes del lanzamiento | Alta | Desarrollo / IT / Dirección |

---

## Decisiones de contenido

### 1. Ghee: "Libre de lactosa y caseína" (URGENTE)

**Qué pasa:** la ficha del ghee (`/es/productos/ghee` y `/en/productos/ghee`) muestra como beneficio **"Libre de lactosa y caseína"** ("Lactose- and casein-free"). La pregunta frecuente sobre lactosa del ghee está **pendiente**, con esta observación de Regulatorio:

> "El Catálogo dice 'sin caseína y sin lactosa'. Solo usarlo si hay análisis y está en el rótulo aprobado."

**Por qué importa:** es una afirmación con implicancias de salud que no está validada. Buscadores y asistentes de IA la pueden repetir. **El chat Nuti también puede repetirla**, porque responde con los beneficios publicados en las fichas.

**Qué hay que decidir:**
- **Opción A (recomendada):** ocultarla de la web y del chat hasta tener el análisis y el rótulo aprobado.
- **Opción B:** Regulatorio confirma que hay análisis y que figura en el rótulo aprobado. Se mantiene y se aprueba la FAQ.

**Responsable:** Regulatorio.

### 2. H1 de la home: "1er snack proteico salado"

**Qué pasa:** el título principal (H1) de la home es el título del primer slide del carrusel: "1er snack proteico salado" ("1st savoury protein snack").

**Por qué importa:**
- El H1 es la señal más fuerte de qué trata la página, y hoy no nombra la marca ni las categorías principales.
- "1er" es una afirmación comparativa. Las reglas de marketing (`03-seo-reglas.csv`) piden evitar las comparaciones que no se pueden demostrar.

**Qué hay que decidir:**
- Si "1er snack proteico salado" tiene respaldo, enviar la evidencia a Legal. El texto puede seguir en el slide, pero sin ser el H1.
- Aprobar un H1 nuevo que nombre la marca y lo que hace. Por ejemplo: *"Entrenuts: pasta de maní, aceite de coco, miel y línea Protein"*, o el lema *"Hacemos rico lo saludable"* acompañado de las categorías.

**Responsable:** Marketing + Legal.

### 3. Enlaces de Mercado Libre por producto

> **Estado: en espera (6/10).**

**Qué pasa:** 23 de los 24 productos llevan a la **tienda general** de Entrenuts en Mercado Libre, no a su publicación. Las tarjetas de las categorías no tienen botón de compra.

**Por qué importa:**
- En las búsquedas de productos ("pasta de maní", "aceite de coco") ganan páginas donde se puede comprar directo.
- Hoy quien quiere comprar tiene que volver a buscar el producto dentro de Mercado Libre.

**Qué hay que enviar:** la URL de la publicación de cada producto, idealmente una por presentación. Ya conocemos tres:

| Producto | Publicación conocida |
|---|---|
| Pasta de maní Natural 1 kg | `mercadolibre.com.ar/pasta-de-mani-natural-entrenuts-1kg-sin-gluten/p/MLA62234514` |
| Aceite de coco Neutro 1000 cc | `mercadolibre.com.ar/aceite-de-coco-entrenuts-neutro-1000cc-sin-gluten/p/MLA52685173` |
| Untable PROTEIN Salted Caramel 370 g | `mercadolibre.com.ar/pasta-de-mani-proteica-salted-caramel-entrenuts-370g/p/MLA61321760` |

Faltan:
- **Pastas de maní:** Natural (otros tamaños), Crocante, Stevia, Cacao, Coco.
- **Untable PROTEIN:** Cookies & Cream.
- **Aceites:** de coco Virgen, de coco Neutro (otros tamaños), MCT.
- **Ghee.**
- **Miel:** Líquida, Untable.
- **Barritas proteicas:** Frutilla Deli, ChocoManí, Lemon Pie, NaranChoc.
- **Puffs proteicos:** Queso, Cebolla a la crema, Mostaza y miel, Barbacoa.
- **Pancakes proteicos:** Vainilla, Queso, Chocolate.

Con esa lista, desarrollo conecta cada botón "Comprar" a su publicación y suma el botón a las tarjetas de las categorías.

**Responsable:** Comercial / E-commerce.

### 4. Textos de introducción de las categorías

> **Estado: hecho (6/10).** Cada categoría muestra, debajo del título, la descripción ya aprobada en el plan de SEO (`seo.catalog.<slug>.description`): Pastas de maní, Aceite de coco, Miel, Barritas proteicas y Línea Protein. Queda como mejora opcional ampliarlas a 60–120 palabras y sumar la tabla comparativa de aceites.

**Qué pasaba:** las páginas de categoría muestran solo la grilla de productos y casi no tienen texto. Por ejemplo, Miel tiene unas 58 palabras y Aceite de coco unas 89. La Línea Protein tampoco tiene preguntas frecuentes.

**Por qué importa:** Google necesita texto para entender de qué trata la página. Con tan poco contenido cuesta posicionar búsquedas como "aceite de coco" o "snacks proteicos".

**Qué hay que enviar:** un párrafo de 60 a 120 palabras para cada página:

| Página | Búsqueda principal (plan de keywords) |
|---|---|
| `/productos` | — |
| `/productos/pastas-de-mani` | pasta de maní |
| `/productos/aceite-de-coco` | aceite de coco |
| `/productos/miel` | miel entrerriana |
| `/productos/barritas-proteicas` | barritas proteicas sin gluten |
| `/productos/protein` | snacks proteicos |

Se puede partir de las descripciones de cada página que ya están en el plan de SEO (`messages/es.json`, sección `seo.catalog`).

En Aceite de coco suma mucho una **tabla comparativa** Neutro / Virgen / MCT armada con textos ya aprobados.

**Responsable:** Marketing (con revisión de Regulatorio si el texto incluye beneficios).

### 5. Ingredientes e información nutricional

> **Estado: resuelto en lo principal (6/10).** Cada ficha ya incluye en su galería la imagen con la tabla nutricional del rótulo. Por ejemplo, Pasta de maní Natural: imagen 2, presentación 370 g. Quedan dos mejoras opcionales:
> - **Texto alternativo de esas imágenes:** hoy es genérico ("Pasta de maní Natural - Vista 2"). Algo como "Información nutricional de Pasta de maní Natural, 370 g" ayuda a buscadores y lectores de pantalla, que no leen el texto dentro de la imagen.
> - **Valores nutricionales cargados en `lib/data/products.ts`:** no coinciden con el rótulo. En la Natural, cada 100 g, dicen carbohidratos 20 g / proteínas 25 g / fibra 6 g, y el rótulo dice 10 g / 27 g / 7,5 g. No se publican en ningún lado, pero conviene borrarlos o corregirlos para que no se usen por error.

**Qué pasaba:** las fichas de producto no muestran ingredientes ni tabla nutricional.

En los datos del sitio hay valores nutricionales cargados, pero **no se publican porque no están aprobados**, y al menos uno contradice una FAQ aprobada:

| Dato | En los datos del sitio | En la FAQ aprobada |
|---|---|---|
| Fibra de la barrita ChocoManí | 5 g | 8 g |

**Por qué importa:** es la información que más buscan quienes comparan productos saludables, y es lo que más confianza genera en la ficha.

**Qué hay que enviar:** por cada producto, la lista de ingredientes y la tabla nutricional **tal como figuran en el rótulo aprobado**, con su porción de referencia.

**Responsable:** Regulatorio / Calidad.

### 6. Página de Distribuidores

> **Estado: en espera (6/10).** El portal ya está hecho y se está terminando de ajustar. Cuando esté listo se carga su URL y se revisa el contenido de la página.

**Qué pasa:** la página tiene unas 44 palabras y el formulario. El bloque del portal muestra "El portal no está disponible en este momento / Próximamente", porque todavía no hay URL del portal.

**Por qué importa:** quien busca ser distribuidor encuentra una página sin información sobre cómo se trabaja, y el aviso de "no disponible" resta confianza.

**Qué hay que decidir y enviar:**
- **Portal:** pasar la URL del portal o **ocultar el bloque** hasta que exista (recomendado).
- **Contenido aprobado:**
  - qué líneas de productos se ofrecen a distribuidores;
  - "Cómo trabajamos": pasos y tiempo de respuesta;
  - zonas de cobertura;
  - un canal de contacto comercial además del formulario.

**Responsable:** Comercial.

### 7. Contenido de Recetas

> **Estado: se mantiene como reels (6/10).** Mostrar las recetas como reels es la idea original de la sección y no es obligatorio cambiarlo. La consecuencia es que la web no compite en búsquedas de recetas. Mejora mínima opcional, sin cambiar la idea: mostrar el nombre de cada receta como texto debajo del reel.

**Qué pasa:** `/recetas` son 12 videos de Instagram, con unas 33 palabras de texto. Ninguna receta tiene ingredientes ni pasos escritos en la web.

**Por qué importa:** búsquedas como "receta con pasta de maní" premian páginas con la receta escrita. Hoy esas visitas van a otros sitios.

**Qué hay que enviar:** para empezar, de 3 a 5 recetas ya publicadas por la marca, con:
- nombre;
- ingredientes;
- pasos;
- producto Entrenuts que usa;
- foto o video.

**Responsable:** Marketing / Contenido.

### 8. Preguntas frecuentes pendientes de aprobación

> **Estado: en consulta (6/10).**

Estas FAQs están cargadas pero **no se publican** hasta que se aprueben. Cada una aparece en la página indicada y la usa el chat Nuti.

| Pregunta | Página | Qué falta (observación cargada) |
|---|---|---|
| ¿Dónde puedo comprar productos Entrenuts? | Dónde comprar | Comercial: cadenas, dietéticas y autoservicios vigentes, y link de la tienda de Mercado Libre |
| ¿Entrenuts exporta? ¿Se consigue en Chile? | Chile | Reescribir: la marca no se exporta por ahora |
| ¿Qué nutrientes aporta la pasta de maní? | Pasta de maní Natural | Nutrición (Valen): validar contra la tabla nutricional. No usar "estabiliza el azúcar en sangre" ni "salud cardiovascular" |
| ¿Qué es el Untable de maní proteico? | Untable Cookies & Cream | Regulatorio (Gabi): el claim comparativo debe citar el producto de referencia |
| ¿Las barritas Entrenuts son veganas? | Barritas proteicas | Regulatorio (Gabi): "apto vegano" solo con certificación; si no hay, "sin ingredientes de origen animal" |
| ¿Cómo se preparan los Pancakes Protein? | Pancakes proteicos | Regulatorio (Gabi): confirmar respaldo de "sin lactosa" en el rótulo |
| ¿En qué tamaños viene el aceite de coco? | Aceite de coco | Comercial: confirmar formatos del virgen |
| ¿Qué es el aceite MCT? | Aceite MCT | Regulatorio (Gabi): no usar "maximiza cetonas" ni "energía rápida" |
| ¿El ghee tiene lactosa? | Ghee | Ver punto 1 |
| ¿Pueden los bebés comer miel? | Miel | Regulatorio (Gabi): alinear con la leyenda del rótulo |

Dos de estas desbloquean búsquedas del plan de keywords que hoy no se pueden usar:
- **"sin gluten"** en Pancakes, que depende de la FAQ de preparación;
- **"veganas"** en Barritas, que depende de la FAQ de barritas veganas.

**Responsable:** Regulatorio, Nutrición y Comercial, según la fila.

### 9. Texto de proteína de los Puffs

**Qué pasa:** la misma información aparece escrita de dos formas:

| Dónde | Texto |
|---|---|
| Beneficios de la ficha | "15g de proteína por paquete" |
| FAQ aprobada y descripción para Google | "más de 15 g de proteína por paquete de 50 g" |

**Qué hay que decidir:** cuál es la redacción correcta según el rótulo. Desarrollo la unifica en toda la web, con el formato "15 g" (con espacio).

**Responsable:** Marketing + Regulatorio.

### 10. Presentaciones del aceite de coco

**Qué pasa:** la ficha dice que el aceite de coco Neutro y el Virgen vienen en **360 ml y 500 ml**. En Mercado Libre hay una publicación del **Neutro de 1000 cc**, y la FAQ de tamaños está pendiente porque Comercial tiene que confirmar los formatos del Virgen.

**Qué hay que enviar:** las presentaciones vigentes de cada aceite: Neutro, Virgen y MCT.

**Responsable:** Comercial.

### 11. Descripción de la página de Empleos

**Qué pasa:** la descripción que muestra Google dice *"Conocé las búsquedas laborales abiertas en Entrenuts y postulate para sumarte al equipo"*. La página no lista búsquedas abiertas: solo recibe CVs.

**Propuesta:**
- **ES:** *"Enviá tu CV y sumate al equipo de Entrenuts en Colón, Entre Ríos. Contanos en qué área te gustaría trabajar."*
- **EN:** *"Send us your CV and join the Entrenuts team in Colón, Entre Ríos. Tell us which area you'd like to work in."*

**Responsable:** Marketing / RR. HH. (aprobar o ajustar).

### 12. Descripciones demasiado largas para Google

Google corta las descripciones de más de unos 155–160 caracteres. Hay dos que se pasan:

| Página | Largo | Texto actual |
|---|---|---|
| Home (ES) | 168 | "Entrenuts nació en Colón, Entre Ríos. Elaboramos pasta de maní, aceite de coco, miel, ghee, aceite MCT, barritas, puffs y pancakes proteicos. Hacemos rico lo saludable." |
| Puffs proteicos (ES) | 169 | "Puffs Protein Entrenuts: snack salado horneado, no frito, con más de 15 g de proteína por paquete de 50 g. Sabores Cebolla a la Crema, Queso, Mostaza y Miel, y Barbacoa." |

**Qué hay que enviar:** versiones de 155 caracteres o menos. Para la de Puffs, conviene resolver antes el punto 9.

El título de `/productos` también es largo (74 caracteres), pero se decidió mantenerlo así por las palabras clave.

**Responsable:** Marketing.

### 13. Datos de la empresa y redes oficiales

**Qué pasa:** el sitio identifica a la empresa para Google solo desde la home, con Instagram, TikTok y Facebook. La página "¿Quiénes somos?" no lleva esa información estructurada.

**Qué hay que confirmar:**
- La lista de **cuentas oficiales**: ¿sumamos la tienda de Mercado Libre, YouTube o LinkedIn?
- Que los datos ya publicados en "¿Quiénes somos?" se puedan usar también como datos estructurados para buscadores:
  - inicio de producción en marzo de 2020;
  - Colón, Entre Ríos;
  - plantas, personal y exportaciones.

**Responsable:** Marketing.

---

## Antes del lanzamiento (técnico e infraestructura)

### 14. Dominio `entrenuts.com.ar`

Los enlaces canónicos y el sitemap de la web nueva ya apuntan a `https://entrenuts.com.ar`, pero hoy ese dominio sirve **otro sitio**, que tiene un `sitemap_index.xml` de estilo WordPress.

**Antes del cambio hay que:**
- listar las URLs del sitio actual;
- preparar redirecciones 301 a las páginas nuevas equivalentes, para no perder el posicionamiento que ya existe;
- dar de alta el sitio nuevo en Google Search Console.

**Responsable:** Desarrollo + quien administre el dominio.

### 15. HSTS con `preload` e `includeSubDomains`

La web envía `Strict-Transport-Security` con `preload` e `includeSubDomains`. Si el dominio entra en la lista de precarga de los navegadores, **todos los subdominios** van a quedar obligados a usar HTTPS (por ejemplo, el del mail o algún sistema interno), y salir de esa lista tarda meses.

**Qué hay que decidir:** confirmar con IT que todos los subdominios funcionan con HTTPS, o quitar `preload` hasta confirmarlo.

**Responsable:** IT / Desarrollo.

### 16. Repetir la auditoría sobre la URL pública

Algunas partes no se pudieron medir sobre la copia local:
- capturas en móvil y desktop;
- Lighthouse;
- velocidad real (Core Web Vitals).

Hay que repetirlas sobre la URL de Vercel. Si está activa la protección de acceso de Vercel, hay que desactivarla durante la auditoría o generar un link de acceso.

**Responsable:** Desarrollo.

### 17. Variables de entorno y límite de gasto

En Vercel, y después en el hosting definitivo, hay que cargar:
- `ANTHROPIC_API_KEY`, para el chat Nuti;
- `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`, para los límites de uso de formularios y chat.

Además, fijar un **límite de gasto mensual** en console.anthropic.com.

**Responsable:** Desarrollo / quien administre las cuentas.

### 18. Política de privacidad (Ley 25.326)

La web recibe datos personales:
- **Distribuidores:** nombre, teléfono, email y zona.
- **Empleos:** nombre, DNI, teléfono, email y CV.
- **Chat:** lo que el visitante escribe se procesa con Anthropic, en EE. UU.
- **Límites de uso:** se guardan las IP de forma temporal en Upstash.

Hace falta una página de política de privacidad, la casilla de aceptación en los formularios y la leyenda de la Disposición 10/2008. Para redactarla se necesita:
- razón social y CUIT;
- domicilio legal;
- email para que las personas ejerzan sus derechos de acceso, rectificación y supresión;
- plazo de conservación de los CV y de los contactos;
- si la base de datos está inscripta en la AAIP.

**Responsable:** Dirección / Legal.

### 19. Mejoras técnicas menores (las puede hacer Desarrollo sin aprobación)

- **`<main>` duplicado:** "¿Quiénes somos?" y Recetas tienen un `<main>` dentro del `<main>` general. Hay que cambiarlo por un contenedor común.
- **Imagen del hero:** `PUFFS_NUEVO.webp` mide 8000 px de ancho. Conviene reducirla a 2400 px.
- **Fecha de actualización en el sitemap (`lastmod`):** sumarla solo cuando exista una fecha real de actualización por página.
- **Portal de distribuidores:** si se decide ocultar el bloque (punto 6), es un cambio chico.

---

## Cómo responder

Por cada punto alcanza con:
1. **la decisión** (opción A o B, o "aprobado / ajustar");
2. **el texto o dato aprobado** cuando corresponde: URLs, rótulos, párrafos.

Con eso, Desarrollo hace los cambios en la web y en el chat Nuti en ambos idiomas.
