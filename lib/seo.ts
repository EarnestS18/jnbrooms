import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteName, siteUrl } from '@/config/site';
import { routing, type Locale } from '@/i18n/routing';

type PageKey = 'home' | 'about' | 'services' | 'portfolio' | 'partner' | 'contact';

export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}

/** Per-page metadata with canonical + hreflang alternates. */
export async function pageMetadata(locale: Locale, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, path)]),
  ) as Record<string, string>;
  languages['x-default'] = localizedPath(routing.defaultLocale, path);

  return {
    title: page === 'home' ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: `${siteUrl}${localizedPath(locale, path)}`,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? ['en_US'] : ['id_ID'],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
