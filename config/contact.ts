import type { Locale } from '@/i18n/routing';
import type { Localized, ManagementModelId } from '@/types/content';
import en from '@/messages/en.json';
import id from '@/messages/id.json';

/**
 * CONTACT CONFIG — single source of truth for every contact detail on the site.
 * ------------------------------------------------------------------------------
 * WhatsApp contacts are listed below. The FIRST contact is the primary number used by
 * every WhatsApp CTA (floating button, CTA bands, quick-start buttons, QR code).
 * Either number can be overridden with NEXT_PUBLIC_WHATSAPP_NUMBER / NEXT_PUBLIC_WHATSAPP_NUMBER_2.
 * Pre-filled WhatsApp messages live in /messages/{id,en}.json under `whatsapp.messages`.
 */

function normaliseNumber(raw: string | undefined, fallback: string): string {
  const digits = (raw ?? '').replace(/\D/g, '');
  if (!digits) return fallback;
  // Accept local formats too: 0812... -> 62812...
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

/** +62 812-3456-7890 style display format. */
export function formatWhatsAppDisplay(number: string): string {
  if (!number.startsWith('62')) return `+${number}`;
  const local = number.slice(2);
  const groups = [local.slice(0, 3), local.slice(3, 7), local.slice(7)].filter(Boolean);
  return `+62 ${groups.join('-')}`;
}

export type WhatsAppContactId = 'yenny' | 'aidil';

export interface WhatsAppContact {
  id: WhatsAppContactId;
  name: string;
  role: Localized;
  /** International format, no "+", no leading 0, no spaces — e.g. 628159495520 */
  number: string;
  display: string;
  baseUrl: string;
}

function makeContact(c: Omit<WhatsAppContact, 'display' | 'baseUrl'>): WhatsAppContact {
  return { ...c, display: formatWhatsAppDisplay(c.number), baseUrl: `https://wa.me/${c.number}` };
}

export const whatsappContacts: WhatsAppContact[] = [
  makeContact({
    id: 'yenny',
    name: 'Yenny Kristina',
    role: { en: 'CEO / Founder', id: 'CEO / Pendiri' },
    number: normaliseNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, '628159495520'),
  }),
  makeContact({
    id: 'aidil',
    name: 'Aidil Putra',
    role: { en: 'COO', id: 'COO' },
    number: normaliseNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2, '6289620500333'),
  }),
];

/** Primary WhatsApp contact — used by every CTA unless a specific contact is passed. */
export const whatsapp = whatsappContacts[0];

export function getWhatsAppContact(id: WhatsAppContactId = whatsapp.id): WhatsAppContact {
  return whatsappContacts.find((c) => c.id === id) ?? whatsapp;
}

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
export function getWhatsAppLink(
  type: WhatsAppEnquiryType,
  locale: Locale,
  contactId: WhatsAppContactId = whatsapp.id,
): string {
  const { baseUrl } = getWhatsAppContact(contactId);
  const text = getWhatsAppMessage(type, locale);
  return text ? `${baseUrl}?text=${encodeURIComponent(text)}` : baseUrl;
}

export const contact = {
  whatsapp,
  // TODO(content): confirm WhatsApp operating hours (copy lives in messages: contact.hours.value).
  // TODO(content): real email, phone and social URLs.
  email: 'otajnb@gmail.com',
  phone: { href: 'tel:+628159495520', display: '+62 815 949 5520' },
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
