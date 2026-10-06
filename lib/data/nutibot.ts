import { CATALOG_TABS, OVERVIEW_TABS, PRODUCT_PAGES, type CatalogTabId } from '@/lib/data/catalog'
import { faqs, type Faq } from '@/lib/data/faqs'

/*
 * Nuti solo responde con las preguntas frecuentes aprobadas por marketing
 * (faqs.ts). Cuando una pendiente se aprueba, aparece sola en su tema.
 */

export type BotTopic = CatalogTabId | 'company'

export const BOT_PRODUCT_TOPICS: CatalogTabId[] = OVERVIEW_TABS

function topicPages(topic: BotTopic): string[] {
  if (topic === 'company') return ['acerca_de', 'productos']
  const tab = CATALOG_TABS.find((item) => item.id === topic)
  const productSlugs = PRODUCT_PAGES.filter((page) => page.tab === topic).map((page) => page.slug)
  return tab ? [tab.slug, ...productSlugs] : productSlugs
}

export function topicFaqs(topic: BotTopic): Faq[] {
  const pages = topicPages(topic)
  return faqs.filter((faq) => faq.status === 'approved' && pages.includes(faq.page))
}

export function findFaq(id: string): Faq | undefined {
  return faqs.find((faq) => faq.id === id && faq.status === 'approved')
}
