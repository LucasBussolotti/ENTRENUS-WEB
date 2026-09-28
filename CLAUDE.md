# Entrenuts Web

## Objetivo del proyecto

Entrenuts Web es el sitio público de la marca argentina de alimentos saludables Entrenuts. La aplicación presenta la marca, productos, recetas, información institucional, oportunidades laborales y formularios para distribuidores.

La interfaz debe transmitir una marca cercana, natural y contemporánea. Mantener una experiencia visual cálida, clara y orientada a descubrir productos, sin sacrificar rendimiento, accesibilidad ni legibilidad.

## Stack y comandos

- Next.js `16.2.9` con App Router.
- React `19.2.4` y TypeScript en modo estricto.
- `next-intl` para internacionalización.
- Tailwind CSS `4` y clases utilitarias.
- Radix UI y `lucide-react` para componentes e iconografía.
- `framer-motion` y `gsap` para animaciones existentes.
- Gestor de paquetes oficial: `pnpm`.

Comandos principales:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm start
```

Usar `pnpm lint` después de cambios de código. Ejecutar `pnpm build` antes de considerar terminada una modificación que afecte rutas, configuración, tipos, fuentes, imágenes o renderizado del servidor. No hay una suite de tests automatizados definida actualmente.

## Estructura activa

La implementación que debe modificarse por defecto está en estas rutas:

- `app/`: rutas y layouts de Next.js.
- `app/[locale]/`: páginas localizadas bajo `/es` y `/en`.
- `components/`: componentes compartidos usados por la aplicación activa.
- `context/`: contextos de React compartidos.
- `i18n/`: configuración de `next-intl`.
- `lib/data/`: datos de productos y otras fuentes de contenido estructurado.
- `messages/`: traducciones `es.json` y `en.json`.
- `public/`: imágenes, fuentes, catálogo y otros assets estáticos.

`src/` contiene una implementación React/Vite paralela o anterior, con copias de varios componentes y páginas. No modificarla para resolver un cambio de la aplicación Next.js salvo que el encargo mencione explícitamente esa implementación. Antes de eliminar o migrar código de `src/`, comprobar sus referencias y el historial del repositorio.

`app/page.tsx` conserva la pantalla inicial generada por Next.js. Las páginas de marca están en `app/[locale]/`; cualquier cambio de navegación debe comprobar ambas entradas y el middleware.

## Routing e internacionalización

- Los idiomas soportados son únicamente `es` y `en`.
- La ruta predeterminada es `/es`.
- `middleware.ts` gestiona la detección y redirección de locale para todas las rutas públicas que no sean `api`, `_next`, `_vercel` o archivos con extensión.
- `app/[locale]/layout.tsx` valida el locale, carga los mensajes, registra las fuentes locales y monta `Navbar`, `Footer` y `NutiBot`.
- Para texto visible, usar `useTranslations()` en componentes cliente o las APIs de servidor de `next-intl` en componentes servidor.
- Todo texto nuevo visible debe existir en ambos archivos de `messages/` con la misma estructura de claves.
- No concatenar frases traducibles en JSX ni usar textos hardcodeados cuando puedan formar parte del contenido de la interfaz.
- Al crear una página localizada, usar enlaces con el locale actual, por ejemplo ``/${locale}/productos``. Mantener el cambio de idioma sin perder la ruta actual.
- Validar rutas en los dos idiomas, incluyendo navegación, enlaces externos y estados de error/not-found.
- Mantener `lang={locale}` en el HTML y cuidar formatos, tono y expresiones regionales en cada traducción.

## Convenciones de implementación

- Preferir componentes servidor por defecto. Añadir `"use client"` solo cuando se necesite estado, efectos, eventos del navegador, APIs del DOM o librerías cliente.
- Mantener TypeScript estricto y tipos explícitos para props, datos de productos y respuestas de formularios.
- Usar el alias `@/*` para imports desde la raíz del proyecto.
- Reutilizar componentes y datos existentes antes de crear duplicados.
- Mantener la API pública y la estructura actual de los componentes salvo que el cambio lo requiera.
- Usar `next/link` para navegación interna y `next/image` para imágenes locales cuando sea compatible con el componente existente.
- Para iconos, preferir los iconos disponibles en `lucide-react` frente a SVG dibujados manualmente.
- No introducir dependencias nuevas si la funcionalidad ya está cubierta por React, Next.js, Tailwind, Radix UI o una dependencia instalada.
- Evitar `useMemo` y `useCallback` por defecto; usarlos solo cuando exista una razón de rendimiento demostrable o el patrón ya sea necesario en ese componente.
- Limpiar listeners, observers, timers y recursos de efectos en el retorno de `useEffect`.
- No editar archivos generados como `.next/`, `next-env.d.ts` generado o contenido de `node_modules/`.
- No añadir comentarios que repitan literalmente lo que hace el código. Escribir comentarios solo para decisiones no obvias o integraciones delicadas.

## Diseño y accesibilidad

- Respetar la identidad existente: colores definidos en `app/globals.css`, fuentes locales `Formiga` y `Founders Grotesk`, formas onduladas y paleta cálida de Entrenuts.
- Centralizar nuevos tokens visuales en `app/globals.css` o reutilizar los existentes; no dispersar valores de marca sin necesidad.
- Diseñar primero para móvil y comprobar también desktop. Evitar overflow horizontal, saltos de layout y botones cuyo texto no quepa.
- Mantener estados visibles de hover, focus, active, disabled y loading cuando correspondan.
- Todo control interactivo debe ser usable con teclado, tener nombre accesible y mantener contraste suficiente.
- Las imágenes deben tener `alt` descriptivo; las imágenes decorativas pueden usar `alt=""`.
- No usar color como único indicador de estado. Respetar `prefers-reduced-motion` en animaciones relevantes.
- No colocar texto esencial dentro de imágenes y no depender de recursos externos frágiles para contenido crítico.
- Mantener el header fijo, la navegación móvil, el cambio de idioma y el chatbot funcionales en todas las rutas localizadas.

## Contenido y assets

- Mantener los datos estructurados de productos en `lib/data/products.ts` y evitar duplicarlos en páginas o componentes.
- Buscar primero los assets existentes en `public/images/` y `public/CATALOGOD/` antes de añadir nuevos archivos.
- Verificar mayúsculas, extensiones y rutas de assets: el despliegue puede distinguir entre nombres diferentes.
- Los enlaces a Mercado Libre, Instagram u otros servicios externos deben abrir el destino correcto y usar `target`/`rel` apropiados cuando abran una pestaña nueva.
- No inventar afirmaciones nutricionales, precios, direcciones, disponibilidad o información comercial. Mantener esos datos alineados con el contenido aprobado en el proyecto.

## Variables de entorno y secretos

- Nunca hardcodear API keys, tokens, endpoints privados o credenciales en el código.
- Usar variables de entorno (`.env.local`) para cualquier valor sensible; ese archivo no debe commitearse.
- Si se detecta un secreto expuesto en el código o en el historial del repositorio, avisar antes de tocar nada.

## Cambios de páginas y componentes

Antes de editar:

1. Localizar la ruta o componente que decide el comportamiento solicitado.
2. Comprobar si el componente tiene versión duplicada en `src/` y confirmar cuál está importada desde `app/`.
3. Revisar las claves de traducción y los assets que usa la pantalla.

Al editar:

1. Mantener el cambio acotado al módulo responsable.
2. Actualizar `messages/es.json` y `messages/en.json` juntos si cambia el texto visible.
3. Añadir o actualizar tipos de datos cuando cambie un contrato.
4. Comprobar los estados vacío, error, carga, móvil y desktop si aplican.
5. Evitar refactors no relacionados.

## Validación de entrega

Como mínimo, para cambios de código:

```bash
pnpm lint
```

Para cambios de rutas, configuración, datos compartidos o componentes principales:

```bash
pnpm lint
pnpm build
```

Comprobar manualmente en `/es` y `/en` cuando el cambio sea visible. Revisar especialmente navegación, cambio de idioma, consola del navegador, imágenes, fuentes, responsive y enlaces externos. Si una validación no puede ejecutarse, indicarlo claramente junto con la razón.

## Reglas de Git

- No crear commits ni ramas automáticamente.
- No usar comandos destructivos como `git reset --hard` o `git checkout --` para descartar cambios.
- Preservar cambios existentes del usuario, incluso si están en archivos cercanos.
- Mantener los diffs pequeños y revisar el estado del repositorio antes de atribuir cambios al trabajo actual.