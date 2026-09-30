'use client';

import { track } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface WhatsAppClickEvent {
  /** Enquiry type, e.g. partnership, booking, model-profit-share */
  type: string;
  /** Page path the click came from (without locale), e.g. /partner */
  page: string;
  /** Where on the page, e.g. header, hero, floating, cta-band */
  placement: string;
  locale: string;
  /** Which WhatsApp contact was opened, e.g. yenny, aidil */
  contact: string;
}

/** Every WhatsApp click is tracked in Vercel Analytics and (if configured) GA4. */
export function trackWhatsAppClick(event: WhatsAppClickEvent) {
  const payload = { ...event, page: event.page || '/' };
  try {
    track('whatsapp_click', payload);
  } catch {
    // analytics must never break the CTA
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', {
      enquiry_type: payload.type,
      page_path: payload.page,
      placement: payload.placement,
      language: payload.locale,
      contact: payload.contact,
    });
  }
}
