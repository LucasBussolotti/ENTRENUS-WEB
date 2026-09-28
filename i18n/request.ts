import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from '@/lib/seo/site';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(LOCALES, requested) ? requested : 'es';
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
