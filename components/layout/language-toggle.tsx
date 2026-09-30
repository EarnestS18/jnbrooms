'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const names = { id: 'Bahasa Indonesia', en: 'English' } as const;

/** ID | EN switch. Real links, so it also works without JavaScript. */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav
      aria-label={t('language')}
      className={cn('flex items-center font-display text-sm font-bold', className)}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-1.5 opacity-50">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={t('switchLanguage', { language: names[l] })}
            className={cn(
              'px-1 py-2 tracking-[0.12em] uppercase transition-opacity',
              l === locale
                ? 'underline decoration-red decoration-2 underline-offset-[6px]'
                : 'opacity-60 hover:opacity-100',
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
