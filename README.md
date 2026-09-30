# J&B Rooms — Company Profile Website

Bilingual (Indonesian / English) company profile for **J&B Rooms**, a Jakarta-based hotel
management company. The main goal of the site is getting property owners to **start a WhatsApp
conversation** with the team.

- **Stack:** Next.js 15 (App Router, SSG) · TypeScript · Tailwind CSS 4 · shadcn/ui (restyled) ·
  Framer Motion · Lenis · next-intl · Vercel Analytics (+ optional GA4)
- **Routes:** `/id` (default) and `/en`; `/` redirects to `/id`
- **Pages:** Home, About, Services, Portfolio, Partner With Us, Contact

---

## 1. Setup

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script                        | What it does                                                       |
| ----------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                 | Local dev server                                                   |
| `npm run build` / `npm start` | Production build (all pages statically generated) / serve it       |
| `npm run lint`                | ESLint                                                             |
| `npm run typecheck`           | TypeScript                                                         |
| `npm run format`              | Prettier (with Tailwind class sorting)                             |
| `npm run images:blur`         | Regenerate image blur placeholders (runs automatically on build)   |
| `npm run images:placeholders` | Regenerate the labelled placeholder photos (overwrites them all)   |
| `npm run brand:assets`        | Regenerate `apple-icon.png` and the Open Graph image from the SVGs |

## 2. Environment variables

| Variable                        | Required   | Example                     | Notes                                                                      |
| ------------------------------- | ---------- | --------------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | No         | `628159495520`              | Overrides the primary WhatsApp contact (default: Yenny Kristina)           |
| `NEXT_PUBLIC_WHATSAPP_NUMBER_2` | No         | `6289620500333`             | Overrides the second WhatsApp contact (default: Aidil Putra)               |
| `NEXT_PUBLIC_SITE_URL`          | Yes (prod) | `https://www.jbrooms.co.id` | Canonical URLs, sitemap, Open Graph, JSON-LD. Falls back to the Vercel URL |
| `NEXT_PUBLIC_GA_ID`             | No         | `G-XXXXXXXXXX`              | Enables GA4 in addition to Vercel Analytics                                |

WhatsApp numbers use international format: no `+`, no leading `0`, no spaces.

## 3. Changing the WhatsApp numbers or messages

- **Numbers:** the two WhatsApp contacts are listed in `whatsappContacts` in `config/contact.ts`:
  **Yenny Kristina** (`+62 815-9495-520`) and **Aidil Putra** (`+62 896-2050-0333`). The first
  contact is the primary one: every WhatsApp button on the site (floating button, CTA bands,
  quick-start buttons, model buttons, QR code) opens a chat with that number. The contact page and
  the footer show both. Edit the list to change names or numbers, or override them without a code
  change via the environment variables above.
- **Pre-filled messages:** edit `whatsapp.messages` in `messages/id.json` and `messages/en.json`.
  The keys are the enquiry types: `general`, `partnership`, `booking`, `careers`, `other`,
  `model-fixed-net-income`, `model-fixed-gross-percentage`, `model-profit-share` and `project-bnr`.
  Visitors get the message in the language they are browsing in.
- **Other contact details** (email, phone, social links, office address, map) are in
  `config/contact.ts`, the single source of truth. Every WhatsApp CTA uses its
  `getWhatsAppLink(type, locale, contact?)` helper.

Every WhatsApp click is tracked as a `whatsapp_click` event with `type` (enquiry type), `page`,
`placement` (e.g. `hero`, `floating`, `cta-band`), `locale` and `contact` (`yenny` or `aidil`).

## 4. Editing content

All content lives in typed data files. Nothing is hardcoded in the page components.

| What                              | File                    |
| --------------------------------- | ----------------------- |
| Properties (portfolio, stats)     | `data/properties.ts`    |
| Development timeline              | `data/timeline.ts`      |
| Leadership team                   | `data/team.ts`          |
| Services                          | `data/services.ts`      |
| Management models + comparison    | `data/models.ts`        |
| "Why J&B Rooms" cards             | `data/values.ts`        |
| BNR current project               | `data/projects.ts`      |
| UI copy (headings, buttons, meta) | `messages/{id,en}.json` |

Text that needs translating is written as `{ en: '…', id: '…' }` in the data files.

### Add a property

1. Copy an entry in `data/properties.ts` and edit it:
   ```ts
   {
     slug: 'kemang',
     name: 'J&B Rooms Kemang',
     rooms: 35,
     area: 'Jakarta Selatan',
     region: 'jakarta',            // 'jakarta' | 'greater-jakarta' | 'outside-jakarta'
     status: 'upcoming',           // 'live' | 'upcoming'
     launchYear: 2027,             // or null if unknown
     image: '/images/properties/kemang-hero.jpg',
   },
   ```
2. Add the photo at `public/images/properties/kemang-hero.jpg` (portrait 4:5, around 1200×1500).
3. If it should appear in the timeline, add it to `data/timeline.ts`.

The cards, region filters, stats (property count, total rooms, live rooms) and JSON-LD all update
automatically.

### Add a team member

Copy an entry in `data/team.ts` (name, `role`, `bio` in both languages) and add a portrait at
`public/images/team/<slug>.jpg` (3:4, around 900×1200).

### Replace placeholder photos

Every image in `public/images` is a generated placeholder labelled with its own file name.
Overwrite it with a real photo **using the same file name**. Blur placeholders are regenerated on
the next build. You don't need to touch any code.

## 5. Brand: logo and colour

### Logo files

The six official SVGs live in `public/brand/` and are used **unmodified** (never redraw or recolour
them). They are rendered through `components/icons/logo.tsx` (`<Logo variant tone />`, which uses
`next/image` with `alt="J&B Rooms"`).

| File                                 | Where it is used                                                 |
| ------------------------------------ | ---------------------------------------------------------------- |
| `jb-rooms-logo-horizontal-white.svg` | Header over the black hero (default state), mobile menu          |
| `jb-rooms-logo-horizontal-black.svg` | Header once it turns white on scroll or when the mega menu opens |
| `jb-rooms-logo-white.svg`            | Footer (stacked logo on black)                                   |
| `jb-rooms-logo-black.svg`            | About page story section; default Open Graph image               |
| `jb-rooms-monogram-black.svg`        | Favicon (`app/icon.svg` is a copy) and `app/apple-icon.png`      |
| `jb-rooms-monogram-white.svg`        | Page loader (inlined in `components/layout/page-loader.tsx`)     |

- Header logo height is 32px on mobile and 40px on desktop (`h-8 lg:h-10`); it links to `/`.
- **Only place the logo on black or white, never on red.** Keep clear space around it of at least
  4× the gap between the monogram's stripes.
- `app/apple-icon.png` (180×180) and `app/[locale]/opengraph-image.png` (1200×630, alt text in
  `opengraph-image.alt.txt`) are generated from the SVGs by `npm run brand:assets`. Rerun it if the
  logo files change.

### Page loader

On the first page view of a browser session, a black screen shows the white monogram. Its four
stripes draw in one after another (~1.2s, CSS `stroke-dashoffset` animation in `app/globals.css`),
then the screen fades out.

- `components/layout/page-loader.tsx` renders it. The SVG is split into one `<path>` per stripe so
  they can animate separately; the geometry is identical to `jb-rooms-monogram-white.svg`.
- `lib/page-loader.ts` holds a tiny script that runs in `<head>` before paint. It adds `no-loader`
  to `<html>` when the loader already played this session (`sessionStorage`) or the visitor prefers
  reduced motion, so the loader never flashes. Without JavaScript it is hidden by the `<noscript>`
  style.

### Colour palette: "Bold Red"

Defined once as tokens in the `@theme` block of `app/globals.css` (Tailwind 4 has no
`tailwind.config`; `@theme` both creates the utilities and exposes the CSS variables on `:root`).
Tailwind's default colours are cleared (`--color-*: initial`), so only these exist:

| Token                | Hex       | Tailwind     | Use                                                   |
| -------------------- | --------- | ------------ | ----------------------------------------------------- |
| `--color-black`      | `#0A0A0A` | `black`      | Header, hero, dark sections, footer, headlines, text  |
| `--color-white`      | `#FFFFFF` | `white`      | Light sections, text on black and red                 |
| `--color-red`        | `#E4002B` | `red`        | Accent: CTAs, stat numbers, labels, highlights        |
| `--color-red-dark`   | `#B8001F` | `red-dark`   | Red button hover/active; small red text on grey-light |
| `--color-grey`       | `#BDBDBD` | `grey`       | Secondary text on black                               |
| `--color-grey-light` | `#F2F2F2` | `grey-light` | Subtle alternate light section background             |

Secondary text on white uses `text-black/70`.

**Rules**

- Roughly 60% black, 30% white, 10% red. **Red is an accent only.**
- Red is used for: primary buttons (`variant="primary"`, white label, arrow, `red-dark` hover with
  the offset border), section labels, the 4px line under the header, active and hover nav states,
  the timeline progress line, "Live" status badges, the floating WhatsApp button and the WhatsApp
  CTA band.
- **At most one full-bleed red section per page.** On Home that is the stats bar, so its CTA band
  uses `tone="black"`. On About, Services and Partner the red section is the CTA band (the default).
- Secondary buttons: `secondary` (1px black border on light) and `outline-inverse` (1px white
  border on dark). `inverse` (white button) is only for actions on a red band.
- Section labels use the `.section-label` class (see `SectionHeading`). It is red on white and
  switches automatically inside sections marked `on-muted` (grey-light, uses `red-dark`) or
  `on-dark` (black/red, uses `grey`). Mark new sections with those classes.

**Contrast (WCAG AA, 4.5:1 for normal text)**

| Pair                        | Ratio  | Verdict                                         |
| --------------------------- | ------ | ----------------------------------------------- |
| White on red / red on white | 4.85:1 | Passes                                          |
| Red on grey-light           | 4.33:1 | Fails for small text, so use `red-dark` (6.1:1) |
| Red on black                | 4.09:1 | Only for text 18px+; otherwise use white/grey   |
| Grey on black               | 10.5:1 | Passes                                          |
| `black/70` on white         | 7.6:1  | Passes                                          |
| `#FFE5E9` on red            | 4.07:1 | Fails at label size, so stats labels are white  |

## 6. Deploying (GitHub → Vercel)

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. The framework
   (Next.js) is detected automatically.
2. Add the environment variables from section 2.
3. Deploy. From then on, every push to the default branch deploys to production and every pull
   request gets its own preview URL.
4. Add the custom domain under _Project → Settings → Domains_ and set `NEXT_PUBLIC_SITE_URL` to it.

## 7. Project structure

```
app/
  [locale]/            pages (home, about, services, portfolio, partner, contact), layout,
                       opengraph-image.png (+ .alt.txt)
  sitemap.ts robots.ts icon.svg apple-icon.png globals.css (design tokens, loader CSS)
components/
  icons/               Logo (official SVGs via next/image), brand icons (WhatsApp, Instagram, LinkedIn)
  layout/              header (mega menu + mobile menu), footer, language toggle, floating WhatsApp,
                       page loader, Lenis
  motion/              reveal/stagger, mask text, count-up, parallax, wipe, scroll-linked text
  sections/            page hero, CTA band, property card/filter, carousel, timeline, …
  ui/                  shadcn-style primitives (button, badge, toaster, …)
  whatsapp/            WhatsAppLink / WhatsAppButton (tracking + wa.me links)
config/                contact.ts (single source of truth), navigation.ts, site.ts
data/                  typed content files
i18n/ messages/        next-intl routing + ID/EN copy
lib/                   motion variants, analytics, SEO/JSON-LD helpers, blur data, loader gate script
public/brand/          the six official logo SVGs (unmodified)
public/images/         photos (currently generated placeholders)
scripts/               placeholder, blur-data and brand-asset generators
```

**How a page is put together:** `middleware.ts` (next-intl) sends `/` to `/id`. Every page lives
under `app/[locale]/` and is statically generated for both locales. `app/[locale]/layout.tsx` loads
the fonts (Barlow / Barlow Condensed), the loader, header, footer, floating WhatsApp button,
toaster, Vercel Analytics and optional GA4. Pages pull copy from `messages/{id,en}.json` and content
from `data/`, and build their sections from `components/sections/`.

## 8. Accessibility and motion

- One set of motion variants lives in `lib/motion.ts` (`fadeUp`, `stagger`, `maskReveal`, `wipe`,
  `fillUp`). They use sharp easing `[0.22, 1, 0.36, 1]` and trigger once in view.
- `prefers-reduced-motion` turns animations into simple fades and disables Lenis, parallax, sticky
  card pinning, count-ups, Ken Burns and the pulse ring.
- Animated content stays readable without JavaScript (a `<noscript>` style overrides the initial
  animation states).
- Includes a skip link, visible focus states, labelled icon-only buttons, an accessible
  disclosure-pattern mega menu (Esc closes it) and a focus-trapped mobile menu.
- The page loader is skipped entirely under `prefers-reduced-motion` and is `aria-hidden`.
- Focus outlines are red on light sections and white inside `on-dark` sections (black and red).
- Lighthouse accessibility (production build): **100** on Home, Services, Portfolio, Partner and
  Contact; **96** on About. Known findings, all older than the rebrand:
  - About: the scroll-linked word reveal starts at 18% opacity, which Lighthouse measures before
    the visitor scrolls.
  - The language toggle's `aria-label` doesn't contain its visible text ("ID"/"EN") (not scored).
  - Footer sitemap links can be flagged as small tap targets.

## 9. What has been done (history)

| Commit    | Change                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| `6dd3e53` | Initial build: bilingual Next.js 15 site, all six pages, WhatsApp funnel, SEO                               |
| `75dbe00` | Ignore local handoff artifacts                                                                              |
| `4a1bacd` | Portfolio updated (properties removed/opened, BNR as the only upcoming project); two real WhatsApp contacts |
| `1f536e7` | Real contact email (`otajnb@gmail.com`) and phone (`+62 815 949 5520`)                                      |
| `2b7be4a` | "Ocean Sunset" palette (navy/orange/yellow/cream). **Superseded** by the next change                        |
| `a920f0f` | Official logo files, favicon, OG image, page loader, and the "Bold Red" palette                             |

---

## Open items (TODO before launch)

Search the code for `TODO` to find each one.

- [ ] Pramuka opened with 9 rooms and is now listed at 43: confirm the expansion story
- [ ] Stariez by J&B Rooms (2021) is in the timeline but not the portfolio: is it still active?
- [ ] Total rooms now compute to 393 (shown as "300+", including BNR); live rooms are shown separately
- [ ] Service scope to be confirmed by management (`data/services.ts`)
- [ ] WhatsApp operating hours (`contact.hours.value` in messages)
- [ ] Real photography (only `team/hie-yenny-kristina.jpg` is real so far; the rest are labelled placeholders)
- [ ] Instagram/LinkedIn URLs in `config/contact.ts`
- [ ] Earnest Surya (CTO): confirm bio

## Assumptions

- **Portfolio updates (on request):** Townhouse J&B Rooms Gunung Sahari and J&B Rooms Benhill were
  removed. Ende, Senen and Cikarang are now operating. J&B Rooms BNR is the only upcoming project,
  and it is shown **without** projected financial figures.
- **Areas and regions:** Area names (e.g. Jakarta Timur, Sentul, Bogor) were inferred from the
  property names. BNR (Bogor) is filtered under _Greater Jakarta / West Java_ and Ende under
  _Outside Jakarta_.
- **Launch years:** These come from the timeline. BNR has no confirmed year (`null`).
- **Stats bar:** Every figure is computed from `data/properties.ts`. Property count and rooms are
  rounded down to the nearest 10 and 100 (currently 10+ and 300+). The fourth stat shows years since 2019.
- **JSON-LD:** `LodgingBusiness` markup is emitted only for **live** properties, so hotels that
  don't exist yet aren't advertised to search engines.
- **Model comparison table:** Levels (Low/Medium/High) are indicative and labelled as such. Only
  Fixed Net Income has a "Best for" line, because it is the only one the brief specifies.
- **Leadership:** Dyfan Pramudya (CMO) was replaced by **Earnest Surya (CTO)** on request. The bio
  is a neutral placeholder.
- **Placeholder contact details:** the Instagram and LinkedIn URLs in `config/contact.ts` are
  placeholders.
- **Images:** The build environment couldn't reach stock-photo hosts, so labelled placeholder
  images are generated locally (`scripts/generate-placeholders.mjs`).
- **shadcn/ui:** The components follow shadcn conventions (`components.json`, `cva`, Radix, Sonner)
  but are restyled to sharp, shadow-free, uppercase components.
