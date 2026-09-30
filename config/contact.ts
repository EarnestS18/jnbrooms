import type { Locale } from '@/i18n/routing';
import type { ManagementModelId } from '@/types/content';
import en from '@/messages/en.json';
import id from '@/messages/id.json';

/**
 * CONTACT CONFIG — single source of truth for every contact detail on the site.
 * ------------------------------------------------------------------------------
 * WhatsApp number: set NEXT_PUBLIC_WHATSAPP_NUMBER (see .env.example).
 * Pre-filled WhatsApp messages live in /messages/{id,en}.json under `whatsapp.messages`.
 */

// TODO(launch): HIGHEST PRIORITY — set NEXT_PUBLIC_WHATSAPP_NUMBER to the real number before launch.
// The fallback below is a deliberately invalid placeholder so no real person is messaged by mistake.
const PLACEHOLDER_NUMBER = '6280000000000';

function normaliseNumber(raw: string | undefined): string {
  const digits = (raw ?? '').replace(/\D/g, '');
  if (!digits) return PLACEHOLDER_NUMBER;
  // Accept local formats too: 0812... -> 62812...
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

const whatsappNumber = normaliseNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

/** +62 812-3456-7890 style display format. */
export function formatWhatsAppDisplay(number: string): string {
  if (!number.startsWith('62')) return `+${number}`;
  const local = number.slice(2);
  const groups = [local.slice(0, 3), local.slice(3, 7), local.slice(7)].filter(Boolean);
  return `+62 ${groups.join('-')}`;
}

export const whatsapp = {
  /** International format, no "+", no leading 0, no spaces — e.g. 6281234567890 */
  number: whatsappNumber,
  display: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? formatWhatsAppDisplay(whatsappNumber),
  isPlaceholder: whatsappNumber === PLACEHOLDER_NUMBER,
  baseUrl: `https://wa.me/${whatsappNumber}`,
};

export type ModelEnquiryType = `model-${ManagementModelId}`;
export type WhatsAppEnquiryType =
  'general' | 'partnership' | 'booking' | 'careers' | 'other' | 'project-bnr' | ModelEnquiryType;

const whatsappMessages: Record<Locale, Record<WhatsAppEnquiryType, string>> = {
  en: en.whatsapp.messages,
  id: id.whatsapp.messages,
};

/** Returns the pre-filled message for an enquiry type in the given language. */
export function getWhatsAppMessage(type: WhatsAppEnquiryType, locale: Locale): string {
  return whatsappMessages[locale]?.[type] ?? whatsappMessages.id[type];
}

/**
 * Build a click-to-chat link. Every WhatsApp CTA on the site uses this helper.
 * wa.me opens the app on mobile and WhatsApp Web/Desktop on desktop.
 */
export function getWhatsAppLink(type: WhatsAppEnquiryType, locale: Locale): string {
  const text = getWhatsAppMessage(type, locale);
  return text ? `${whatsapp.baseUrl}?text=${encodeURIComponent(text)}` : whatsapp.baseUrl;
}

export const contact = {
  whatsapp,
  // TODO(content): confirm WhatsApp operating hours (copy lives in messages: contact.hours.value).
  // TODO(content): real email, phone and social URLs.
  email: 'hello@jbrooms.co.id',
  phone: { href: 'tel:+62210000000', display: '+62 21 0000 000' },
  social: {
    instagram: 'https://www.instagram.com/jbrooms',
    linkedin: 'https://www.linkedin.com/company/jbrooms',
  },
  office: {
    name: 'J&B Rooms',
    street: 'Jl. Pramuka No. 2',
    city: 'Jakarta Timur',
    region: 'DKI Jakarta',
    country: 'ID',
    get full() {
      return `${this.street}, ${this.city}`;
    },
    mapEmbedUrl:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('Jl. Pramuka No. 2, Jakarta Timur') +
      '&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Jl. Pramuka No. 2, Jakarta Timur'),
  },
} as const;
