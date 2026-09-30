import type { Locale } from '@/i18n/routing';
import type { Localized } from '@/types/content';

/** Pick the right language from a bilingual content field. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.id;
}
