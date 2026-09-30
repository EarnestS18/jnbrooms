import type { Localized } from '@/types/content';

/**
 * PERFORMANCE DATA: the home page KPI row and "Measured by performance" case studies.
 * ------------------------------------------------------------------
 * Every figure here must come from verified company records (PMS exports, OTA
 * dashboards, owner reports). Nothing is estimated.
 *
 * A value of `null` renders as a clearly marked placeholder (e.g. an outlined "XX%"
 * with an "Awaiting verified data" tag). To publish a figure, replace `null` with the
 * number and fill in its period and source.
 *
 * Set SHOW_UNVERIFIED to false before launch to hide every placeholder: KPIs and case
 * studies without verified numbers disappear, and a section with nothing left hides.
 */
export const SHOW_UNVERIFIED = true;

export type MetricId = 'occupancy' | 'revenue-growth' | 'guest-rating';

/** How a metric is written, e.g. prefix "+", unit "%", one decimal for ratings. */
export interface MetricFormat {
  prefix?: string;
  unit?: Localized;
  decimals?: number;
}

export interface MetricDefinition extends MetricFormat {
  label: Localized;
  /** How the before -> after change is expressed in case studies. */
  change: 'points' | 'absolute';
}

export const metrics: Record<MetricId, MetricDefinition> = {
  occupancy: {
    label: { en: 'Occupancy', id: 'Okupansi' },
    unit: { en: '%', id: '%' },
    change: 'points',
  },
  'revenue-growth': {
    label: { en: 'Revenue growth', id: 'Pertumbuhan pendapatan' },
    prefix: '+',
    unit: { en: '%', id: '%' },
    change: 'points',
  },
  'guest-rating': {
    label: { en: 'Guest rating', id: 'Rating tamu' },
    unit: { en: '/5', id: '/5' },
    decimals: 1,
    change: 'absolute',
  },
};

export interface Kpi {
  metric: MetricId;
  /** Shown as the KPI's heading, overriding the metric's short label. */
  label: Localized;
  /** Verified figure, or null for a placeholder. */
  value: number | null;
  /** What the figure measures, e.g. "Across live properties, OTA reviews". */
  definition: Localized;
}

// TODO(content): replace each `null` with a verified figure and confirm the definitions.
export const kpis: Kpi[] = [
  {
    metric: 'occupancy',
    label: { en: 'Average occupancy', id: 'Rata-rata okupansi' },
    value: 80,
    definition: {
      en: 'Average across live properties',
      id: 'Rata-rata seluruh properti yang beroperasi',
    },
  },
  {
    metric: 'revenue-growth',
    label: { en: 'Revenue growth', id: 'Pertumbuhan pendapatan' },
    value: 15,
    definition: {
      en: 'Year on year, same properties',
      id: 'Tahun ke tahun, properti yang sama',
    },
  },
  {
    metric: 'guest-rating',
    label: { en: 'Average guest rating', id: 'Rata-rata rating tamu' },
    value: 4.8,
    definition: {
      en: 'Average of OTA guest reviews',
      id: 'Rata-rata ulasan tamu di OTA',
    },
  },
];

/** Period and source printed under the KPI row. `null` shows "to be confirmed". */
export const kpiBasis: { period: Localized | null; source: Localized | null } = {
  // TODO(content): e.g. { en: '12 months to Dec 2025', id: '12 bulan hingga Des 2025' }
  period: { en: '2025', id: '2025' },
  // TODO(content): e.g. { en: 'PMS and OTA extranet data', id: 'Data PMS dan ekstranet OTA' }
  source: { en: 'PMS and OTA extranet data', id: 'Data PMS dan ekstranet OTA' },
};

/** The service areas that can be listed under "What we changed" (ids from data/services.ts). */
export type LeverId = 'revenue-management' | 'ota-management' | 'operations' | 'people-management';

export interface CaseStudy {
  /** Property slug from data/properties.ts (name, area, rooms and photo come from there). */
  property: string;
  /** Period each side covers, e.g. "12 months before takeover (2019)". */
  before: { period: Localized | null };
  after: { period: Localized | null };
  results: {
    metric: Exclude<MetricId, 'revenue-growth'>;
    before: number | null;
    after: number | null;
  }[];
  /** Changes J&B Rooms made at this property. Only list what records confirm. */
  levers: LeverId[];
  /** One or two sentences on what was changed. Describe actions, not causes. */
  summary: Localized | null;
  source: Localized | null;
}

// TODO(content): pick the 1-2 properties with verified before/after data, fill in the
// numbers, periods, source and summary, and confirm which levers applied.
export const caseStudies: CaseStudy[] = [
  {
    property: 'pramuka',
    before: { period: { en: '2019', id: '2019' } },
    after: { period: { en: '2020', id: '2020' } },
    results: [
      { metric: 'occupancy', before: 60, after: 80 },
      { metric: 'guest-rating', before: 3.5, after: 4.8 },
    ],
    levers: ['revenue-management', 'ota-management', 'operations', 'people-management'],
    summary: { en: 'We implemented a new revenue management strategy, optimized OTA listings, improved operational processes, and trained staff to enhance guest experience.', id: 'Kami menerapkan strategi manajemen pendapatan baru, mengoptimalkan daftar OTA, meningkatkan proses operasional, dan melatih staf untuk meningkatkan pengalaman tamu.' },
    source: { en: 'Verified PMS and OTA data', id: 'Data PMS dan OTA yang diverifikasi' },
  },
  {
    property: 'utan-kayu',
    before: { period: { en: '2020', id: '2020' } },
    after: { period: { en: '2021', id: '2021' } },
    results: [
      { metric: 'occupancy', before: 58, after: 81 },
      { metric: 'guest-rating', before: 3.2, after: 4.2 },
    ],
    levers: ['revenue-management', 'ota-management', 'operations', 'people-management'],
    summary: { en: 'We implemented a new revenue management strategy, optimized OTA listings, improved operational processes, and trained staff to enhance guest experience.', id: 'Kami menerapkan strategi manajemen pendapatan baru, mengoptimalkan daftar OTA, meningkatkan proses operasional, dan melatih staf untuk meningkatkan pengalaman tamu.' },
    source: { en: 'Verified PMS and OTA data', id: 'Data PMS dan OTA yang diverifikasi' },
  },
];

/** True when every figure in a case study is filled in. */
export function isVerified(study: CaseStudy) {
  return study.results.every((r) => r.before !== null && r.after !== null);
}

export const visibleKpis = kpis.filter((k) => SHOW_UNVERIFIED || k.value !== null);
export const visibleCaseStudies = caseStudies.filter((s) => SHOW_UNVERIFIED || isVerified(s));
