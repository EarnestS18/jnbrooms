import { contact, whatsappContacts } from '@/config/contact';
import { founder, foundingYear, siteName, siteUrl } from '@/config/site';
import type { Locale } from '@/i18n/routing';
import type { Property } from '@/types/content';

export function organizationJsonLd(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/icon.svg`,
    description,
    foundingDate: String(foundingYear),
    founder: { '@type': 'Person', name: founder },
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.office.street,
      addressLocality: contact.office.city,
      addressRegion: contact.office.region,
      addressCountry: contact.office.country,
    },
    contactPoint: whatsappContacts.map((c) => ({
      '@type': 'ContactPoint',
      contactType: 'customer service',
      name: c.name,
      telephone: `+${c.number}`,
      availableLanguage: ['Indonesian', 'English'],
    })),
    sameAs: [contact.social.instagram, contact.social.linkedin],
  };
}

export function lodgingJsonLd(property: Property, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    url: `${siteUrl}/${locale}/portfolio#current-properties`,
    image: `${siteUrl}${property.image}`,
    numberOfRooms: property.rooms,
    address: {
      '@type': 'PostalAddress',
      ...(property.address ? { streetAddress: property.address } : {}),
      addressLocality: property.area,
      addressCountry: 'ID',
    },
    parentOrganization: { '@id': `${siteUrl}/#organization` },
  };
}

/** Safely serialise JSON-LD for a <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
