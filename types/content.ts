import type { Locale } from '@/i18n/routing';

/** A piece of content written in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export type Region = 'jakarta' | 'greater-jakarta' | 'outside-jakarta';
export type PropertyStatus = 'live' | 'upcoming';

export interface Property {
  /** URL-safe unique id, also used to name image files. */
  slug: string;
  name: string;
  rooms: number;
  /** Human-readable area / city shown on the card. */
  area: string;
  /** Used by the portfolio filter tabs. */
  region: Region;
  status: PropertyStatus;
  /** Opening year (live) or planned launch year (upcoming). `null` = to be confirmed. */
  launchYear: number | null;
  /** Mark launch status/year as "to be confirmed" (shows a TBC badge). */
  tbc?: boolean;
  /** Highlighted as the current development project on /portfolio#upcoming-projects. */
  currentProject?: boolean;
  /** Path under /public, e.g. /images/properties/pramuka-hero.jpg */
  image: string;
  /** Street address, used for JSON-LD when known. */
  address?: string;
}

export interface TimelineEntry {
  year: number;
  items: string[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: Localized;
  bio: Localized;
  image: string;
}

export interface Service {
  /** Anchor id on /services */
  id: string;
  label: Localized;
  headline: Localized;
  body: Localized;
  image: string;
}

export type Level = 'low' | 'medium' | 'high';

export type ManagementModelId = 'fixed-net-income' | 'fixed-gross-percentage' | 'profit-share';

export interface ManagementModel {
  /** Anchor id on /partner, also the WhatsApp enquiry type suffix. */
  id: ManagementModelId;
  number: string;
  name: Localized;
  summary: Localized;
  description: Localized;
  bestFor?: Localized;
  comparison: {
    incomeStability: Level;
    upsidePotential: Level;
    riskToOwner: Level;
  };
}

export interface ValueCard {
  number: string;
  title: Localized;
  body: Localized;
}
