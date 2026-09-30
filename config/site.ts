/** Canonical site URL (no trailing slash). Used for sitemap, canonical URLs, OG and JSON-LD. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const siteName = 'J&B Rooms';
export const foundingYear = 2019;
export const founder = 'Hie Yenny Kristina';
