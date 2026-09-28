import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * CSP del sitio. Es un sitio de marca sin login ni datos de sesión, así que la
 * política puede ser estricta salvo en dos puntos:
 *  - 'unsafe-inline' en style-src: Next inyecta estilos en línea y las fuentes
 *    locales se registran por variables CSS en el propio documento.
 *  - 'unsafe-inline' en script-src: el runtime de App Router usa scripts inline
 *    para la hidratación. Para eliminarlo haría falta nonce por request desde
 *    el middleware, que obliga a renderizar todo dinámicamente.
 *
 * 'unsafe-eval' sólo en desarrollo: lo usa el recargado en caliente de Next y en
 * producción no hace falta.
 */
const isDev = process.env.NODE_ENV === 'development';

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://flagcdn.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  // Los reels de recetas se embeben desde Instagram.
  "frame-src 'self' https://www.instagram.com",
  "form-action 'self'",
  "base-uri 'self'",
  // Equivalente moderno de X-Frame-Options: nadie puede embeber el sitio.
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // lucide-react exporta miles de iconos: sin esto el barrel entra entero al bundle.
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
