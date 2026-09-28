import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Los hreflang los define cada página (lib/seo/site.ts → pageAlternates). La
  // cabecera Link que agrega next-intl los contradecía: apuntaba x-default a la
  // URL sin idioma (/productos) y con el host del request.
  alternateLinks: false
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
