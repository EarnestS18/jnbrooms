import type { Localized } from '@/types/content';

/**
 * CURRENT PROJECT — J&B Rooms BNR (Bogor), featured on /portfolio#upcoming-projects.
 * Projected financial figures are intentionally not published on the site.
 */
export const bnrProject = {
  slug: 'bnr',
  name: 'J&B Rooms BNR',
  location: 'Bogor',
  image: '/images/properties/bnr-hero.jpg',
  description: {
    en: 'Located in Bogor’s business centre, surrounded by entertainment venues, residential areas and star-rated hotels. Positioned for business travellers and local tourists.',
    id: 'Berlokasi di pusat bisnis Bogor, dikelilingi area hiburan, kawasan hunian, dan hotel berbintang. Diposisikan untuk pelancong bisnis dan wisatawan lokal.',
  } satisfies Localized,
  rooms: 30,
};
