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

| Script                        | What it does                                                     |
| ----------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                 | Local dev server                                                 |
| `npm run build` / `npm start` | Production build (all pages statically generated) / serve it     |
| `npm run lint`                | ESLint                                                           |
| `npm run typecheck`           | TypeScript                                                       |
| `npm run format`              | Prettier (with Tailwind class sorting)                           |
| `npm run images:blur`         | Regenerate image blur placeholders (runs automatically on build) |
| `npm run images:placeholders` | Regenerate the labelled placeholder photos                       |

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

### Brand colour and logo

- Accent colour: change `--brand-accent` in `app/globals.css`.
- Logo: replace the text wordmark in `components/icons/logo.tsx` and `app/icon.svg`.

## 5. Deploying (GitHub → Vercel)

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. The framework
   (Next.js) is detected automatically.
2. Add the environment variables from section 2.
3. Deploy. From then on, every push to the default branch deploys to production and every pull
   request gets its own preview URL.
4. Add the custom domain under _Project → Settings → Domains_ and set `NEXT_PUBLIC_SITE_URL` to it.

## 6. Project structure

```
app/
  [locale]/            pages (home, about, services, portfolio, partner, contact), layout, OG image
  sitemap.ts robots.ts icon.svg globals.css
components/
  layout/              header (mega menu + mobile menu), footer, language toggle, floating WhatsApp, Lenis
  motion/              reveal/stagger, mask text, count-up, parallax, wipe, scroll-linked text
  sections/            page hero, CTA band, property card/filter, carousel, timeline, …
  ui/                  shadcn-style primitives (button, badge, toaster, …)
  whatsapp/            WhatsAppLink / WhatsAppButton (tracking + wa.me links)
config/                contact.ts (single source of truth), navigation.ts, site.ts
data/                  typed content files
i18n/ messages/        next-intl routing + ID/EN copy
lib/                   motion variants, analytics, SEO/JSON-LD helpers, blur data
scripts/               placeholder + blur-data generators
```

## 7. Accessibility and motion

- One set of motion variants lives in `lib/motion.ts` (`fadeUp`, `stagger`, `maskReveal`, `wipe`,
  `fillUp`). They use sharp easing `[0.22, 1, 0.36, 1]` and trigger once in view.
- `prefers-reduced-motion` turns animations into simple fades and disables Lenis, parallax, sticky
  card pinning, count-ups, Ken Burns and the pulse ring.
- Animated content stays readable without JavaScript (a `<noscript>` style overrides the initial
  animation states).
- Includes a skip link, visible focus states, labelled icon-only buttons, an accessible
  disclosure-pattern mega menu (Esc closes it) and a focus-trapped mobile menu.

---

## Open items (TODO before launch)

Search the code for `TODO` to find each one.

- [ ] Pramuka opened with 9 rooms and is now listed at 43: confirm the expansion story
- [ ] Stariez by J&B Rooms (2021) is in the timeline but not the portfolio: is it still active?
- [ ] Total rooms now compute to 393 (shown as "300+", including BNR); live rooms are shown separately
- [ ] Service scope to be confirmed by management (`data/services.ts`)
- [ ] WhatsApp operating hours (`contact.hours.value` in messages)
- [ ] Brand colour, logo files, real photography, email, phone, Instagram/LinkedIn URLs
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
- **Placeholder contact details:** email, phone and social URLs in `config/contact.ts` are
  placeholders.
- **Images:** The build environment couldn't reach stock-photo hosts, so labelled placeholder
  images are generated locally (`scripts/generate-placeholders.mjs`).
- **shadcn/ui:** The components follow shadcn conventions (`components.json`, `cva`, Radix, Sonner)
  but are restyled to sharp, shadow-free, uppercase components.
