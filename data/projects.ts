import type { Localized } from '@/types/content';

/**
 * CURRENT PROJECT — J&B Rooms BNR (Bogor), featured on /portfolio#upcoming-projects.
 * These are ILLUSTRATIVE / PROJECTED figures supplied by management, not guaranteed returns.
 *
 * TODO(content): confirm the period of the revenue/profit figures with management.
 * 30 rooms × 80% × Rp180,000 × 30 days = Rp129.6 million, i.e. the figure matches a
 * *monthly* average in Year 1 rather than a full-year total.
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
  figures: {
    rooms: 30,
    occupancyYear1: 0.8,
    averageSellingPrice: 180_000,
    grossRevenueYear1: 129_600_000,
    ownerNetProfitYear1: 67_240_000,
  },
};
