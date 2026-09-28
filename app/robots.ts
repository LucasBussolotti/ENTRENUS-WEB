import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo/site'

/*
 * Los rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…)
 * quedan permitidos a propósito: citar a Entrenuts en sus respuestas es el
 * objetivo del trabajo de AEO.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
