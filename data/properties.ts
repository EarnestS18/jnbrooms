import type { Property, Region } from '@/types/content';

/**
 * PORTFOLIO DATA
 * ------------------------------------------------------------------
 * To add a property: copy one entry, change the values, and drop a photo into
 * /public/images/properties/<slug>-hero.jpg. Everything else (cards, filters,
 * stats, sitemap JSON-LD) updates automatically.
 *
 * TODO(content): confirm `area` values and replace placeholder photos with real photography.
 */
export const properties: Property[] = [
  {
    slug: 'pramuka',
    name: 'J&B Rooms Pramuka',
    // TODO(content): opened with 9 rooms in 2019, now listed at 43 — confirm the expansion story.
    rooms: 43,
    area: 'Jakarta Timur',
    region: 'jakarta',
    status: 'live',
    launchYear: 2019,
    image: '/images/properties/pramuka-hero.jpg',
    address: 'Jl. Pramuka No. 2, Jakarta Timur',
  },
  {
    slug: 'utan-kayu',
    name: 'J&B Rooms Utan Kayu',
    rooms: 48,
    area: 'Jakarta Timur',
    region: 'jakarta',
    status: 'live',
    launchYear: 2020,
    image: '/images/properties/utan-kayu-hero.jpg',
  },
  {
    slug: 'tomang',
    name: 'J&B Rooms Tomang',
    rooms: 30,
    area: 'Jakarta Barat',
    region: 'jakarta',
    status: 'live',
    launchYear: 2022,
    image: '/images/properties/tomang-hero.jpg',
  },
  {
    slug: 'gunung-sahari',
    name: 'Townhouse J&B Rooms Gunung Sahari',
    rooms: 141,
    area: 'Jakarta Pusat',
    region: 'jakarta',
    status: 'live',
    launchYear: 2024,
    image: '/images/properties/gunung-sahari-hero.jpg',
  },
  {
    slug: 'jatinegara',
    name: 'J&B Smart Jatinegara',
    rooms: 30,
    area: 'Jakarta Timur',
    region: 'jakarta',
    status: 'live',
    launchYear: 2024,
    image: '/images/properties/jatinegara-hero.jpg',
  },
  {
    slug: 'senen',
    name: 'J&B Rooms Senen',
    rooms: 30,
    area: 'Jakarta Pusat',
    region: 'jakarta',
    // TODO(content): launch status/year to be confirmed (timeline lists 2026).
    status: 'upcoming',
    launchYear: 2026,
    tbc: true,
    image: '/images/properties/senen-hero.jpg',
  },
  {
    slug: 'benhill',
    name: 'J&B Rooms Benhill',
    rooms: 30,
    area: 'Jakarta Pusat',
    region: 'jakarta',
    status: 'upcoming',
    launchYear: 2027,
    image: '/images/properties/benhill-hero.jpg',
  },
  {
    slug: 'bekasi',
    name: 'J&B Rooms Bekasi',
    rooms: 40,
    area: 'Bekasi',
    region: 'greater-jakarta',
    status: 'live',
    launchYear: 2022,
    image: '/images/properties/bekasi-hero.jpg',
  },
  {
    slug: 'sentul',
    name: 'J&B Rooms Sentul',
    rooms: 39,
    area: 'Sentul, Bogor',
    region: 'greater-jakarta',
    status: 'live',
    launchYear: 2023,
    image: '/images/properties/sentul-hero.jpg',
  },
  {
    slug: 'cikarang',
    name: 'J&B Rooms Cikarang',
    rooms: 27,
    area: 'Cikarang, Bekasi',
    region: 'greater-jakarta',
    status: 'upcoming',
    launchYear: 2026,
    image: '/images/properties/cikarang-hero.jpg',
  },
  {
    slug: 'ende',
    name: 'J&B Rooms Ende',
    rooms: 76,
    area: 'Ende, Nusa Tenggara Timur',
    region: 'outside-jakarta',
    status: 'upcoming',
    launchYear: 2026,
    image: '/images/properties/ende-hero.jpg',
  },
  {
    slug: 'bnr',
    name: 'J&B Rooms BNR',
    rooms: 30,
    area: 'Bogor',
    region: 'greater-jakarta',
    status: 'upcoming',
    launchYear: null,
    currentProject: true,
    image: '/images/properties/bnr-hero.jpg',
  },
];

export const regions: Region[] = ['jakarta', 'greater-jakarta', 'outside-jakarta'];

export const liveProperties = properties.filter((p) => p.status === 'live');
export const upcomingProperties = properties.filter((p) => p.status !== 'live');
export const currentProject = properties.find((p) => p.currentProject);

/** Stats are always computed from the data above — never hardcode them in the UI. */
export const portfolioStats = {
  foundedYear: 2019,
  propertyCount: properties.length,
  liveCount: liveProperties.length,
  totalRooms: properties.reduce((sum, p) => sum + p.rooms, 0),
  liveRooms: liveProperties.reduce((sum, p) => sum + p.rooms, 0),
};

/** Round down to a "marketing" figure, e.g. 564 -> 500, 12 -> 10. */
export function floorToStep(value: number, step: number) {
  return Math.max(step, Math.floor(value / step) * step);
}
