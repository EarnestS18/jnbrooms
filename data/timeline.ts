import type { TimelineEntry } from '@/types/content';

/**
 * DEVELOPMENT TIMELINE — shown on /portfolio#timeline.
 * Add a year (or a name to an existing year) and the timeline updates automatically.
 */
export const timeline: TimelineEntry[] = [
  { year: 2019, items: ['J&B Rooms Pramuka'] },
  { year: 2020, items: ['J&B Rooms Utan Kayu'] },
  // TODO(content): Stariez by J&B Rooms is in the timeline but not the portfolio — still active?
  { year: 2021, items: ['Stariez by J&B Rooms'] },
  { year: 2022, items: ['J&B Rooms Bekasi', 'J&B Rooms Tomang'] },
  { year: 2023, items: ['J&B Rooms Sentul'] },
  { year: 2024, items: ['J&B Rooms Gunung Sahari', 'J&B Smart Jatinegara'] },
  { year: 2026, items: ['J&B Rooms Ende', 'J&B Rooms Cikarang', 'J&B Rooms Senen'] },
];
