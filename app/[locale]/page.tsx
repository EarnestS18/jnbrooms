import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CountUp } from '@/components/motion/count-up';
import { MaskText } from '@/components/motion/mask-text';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { Carousel } from '@/components/sections/carousel';
import { CtaBand } from '@/components/sections/cta-band';
import { PropertyCard } from '@/components/sections/property-card';
import { SectionHeading } from '@/components/sections/section-heading';
import { CaseStudyCard, KpiBasis, KpiItem } from '@/components/sections/performance';
import { ArrowLink, CtaLink } from '@/components/ui/cta-link';
import { Container } from '@/components/ui/container';
import { managementModels } from '@/data/models';
import { floorToStep, portfolioStats, properties } from '@/data/properties';
import { visibleCaseStudies, visibleKpis } from '@/data/performance';
import { services } from '@/data/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { blurFor } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'home', '/');
}

const HERO_IMAGE = '/images/hero/home-hero.jpg';

/** Service areas shown under "How we deliver" (the umbrella hotel-management entry is left out). */
const levers = services.filter((s) => s.id !== 'hotel-management');

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  const yearsActive = new Date().getFullYear() - portfolioStats.foundedYear;
  const featured = [...properties].sort(
    (a, b) => Number(b.status === 'live') - Number(a.status === 'live'),
  );

  return (
    <>
      {/* 1. HERO */}
      <section className="on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-black text-white">
        <Image
          src={HERO_IMAGE}
          alt={t('hero.imageAlt')}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover motion-safe:animate-ken-burns"
          {...blurFor(HERO_IMAGE)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/45"
        />
        <Container className="pt-[calc(var(--header-height)+3rem)] pb-24 lg:pb-28">
          <Reveal onMount as="p" className="eyebrow mb-6 text-white/85">
            {t('hero.label')}
          </Reveal>
          <MaskText
            as="h1"
            onMount
            delay={0.15}
            text={t('hero.headline')}
            className="max-w-[16ch] font-display text-hero font-extrabold tracking-tight uppercase"
          />
          <Reveal
            onMount
            delay={0.9}
            as="p"
            className="mt-8 max-w-2xl text-lg text-white/85 lg:text-xl"
          >
            {t('hero.subtext')}
          </Reveal>
          <Reveal onMount delay={1.05} className="mt-10 flex flex-col gap-5 sm:flex-row sm:gap-6">
            <CtaLink href="/partner" variant="primary" size="lg">
              {t('hero.primaryCta')}
            </CtaLink>
            <CtaLink href="/portfolio" variant="outline-inverse" size="lg">
              {t('hero.secondaryCta')}
            </CtaLink>
          </Reveal>
        </Container>
        <a
          href="#stats"
          aria-label={tc('scrollDown')}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 hover:text-white md:flex"
        >
          <span className="eyebrow text-xs">{tc('scrollDown')}</span>
          <span
            aria-hidden="true"
            className="block h-10 w-px bg-current motion-safe:animate-scroll-cue"
          />
        </a>
      </section>

      {/* 2. STATS BAR */}
      <section id="stats" aria-label={t('stats.label')} className="on-dark bg-red text-white">
        <Container>
          <Stagger as="ul" className="grid grid-cols-2 lg:grid-cols-4">
            <StatItem
              value={<CountUp value={portfolioStats.foundedYear} />}
              label={t('stats.established')}
            />
            <StatItem
              value={<CountUp value={floorToStep(portfolioStats.propertyCount, 10)} suffix="+" />}
              label={t('stats.properties')}
            />
            <StatItem
              value={<CountUp value={floorToStep(portfolioStats.totalRooms, 100)} suffix="+" />}
              label={t('stats.rooms')}
              note={t('stats.liveRooms', { count: portfolioStats.liveRooms })}
            />
            <StatItem
              value={<CountUp value={yearsActive} suffix="+" />}
              label={t('stats.years', { year: portfolioStats.foundedYear })}
            />
          </Stagger>
        </Container>
      </section>

      {/* 3. PERFORMANCE KPIs: figures live in data/performance.ts */}
      {visibleKpis.length > 0 ? (
        <section id="performance" className="py-24 lg:py-36">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <SectionHeading
                className="lg:col-span-8"
                label={t('performance.label')}
                headline={t('performance.headline')}
              />
              <Reveal as="p" className="max-w-md text-lg text-black/70 lg:col-span-4">
                {t('performance.intro')}
              </Reveal>
            </div>
            <Stagger as="ul" gap={0.12} className="mt-16 grid md:grid-cols-3 lg:mt-24">
              {visibleKpis.map((kpi) => (
                <KpiItem key={kpi.metric} kpi={kpi} />
              ))}
            </Stagger>
            <KpiBasis className="mt-4 border-t border-black/15 pt-4" />
          </Container>
        </section>
      ) : null}

      {/* 4. CASE STUDIES: before -> J&B Rooms management -> after */}
      {visibleCaseStudies.length > 0 ? (
        <section id="case-studies" className="on-muted bg-grey-light py-24 lg:py-36">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <SectionHeading
                className="lg:col-span-8"
                label={t('caseStudies.label')}
                headline={t('caseStudies.headline')}
              />
              <Reveal as="p" className="max-w-md text-lg text-black/70 lg:col-span-4">
                {t('caseStudies.intro')}
              </Reveal>
            </div>
            <div className="mt-16 space-y-8 lg:mt-20 lg:space-y-10">
              {visibleCaseStudies.map((study) => (
                <CaseStudyCard key={study.property} study={study} />
              ))}
            </div>
            <Reveal as="p" className="mt-8 max-w-3xl text-sm text-black/70">
              {t('caseStudies.disclaimer')}
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* 5. HOW WE DELIVER: the service areas behind the numbers */}
      <section className="py-24 lg:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading label={t('how.label')} headline={t('how.headline')} />
            <Reveal>
              <ArrowLink href="/services">{t('how.cta')}</ArrowLink>
            </Reveal>
          </div>
          <Stagger as="ol" gap={0.08} className="mt-16 border-t border-black lg:mt-20">
            {levers.map((s, i) => (
              <StaggerItem as="li" key={s.id} className="border-b border-black">
                <Link
                  href={`/services#${s.id}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-3 py-8 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-x-10 lg:py-10"
                >
                  <span className="font-display text-lg font-bold text-black/70 transition-colors duration-300 group-hover:text-red lg:text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl leading-none font-extrabold uppercase transition-colors duration-300 group-hover:text-red lg:text-5xl">
                    {pick(s.label, locale)}
                  </span>
                  <span className="col-start-2 row-start-2 text-black/70 lg:col-start-3 lg:row-start-1 lg:text-lg">
                    <span className="block font-display font-bold text-black uppercase">
                      {pick(s.headline, locale)}
                    </span>
                    {pick(s.body, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-3 row-start-1 font-display text-3xl transition-transform duration-300 group-hover:translate-x-2 lg:col-start-4"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 6. FEATURED PROPERTIES */}
      <section className="on-muted bg-grey-light py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading label={t('featured.label')} headline={t('featured.headline')} />
            <Reveal>
              <ArrowLink href="/portfolio">{t('featured.cta')}</ArrowLink>
            </Reveal>
          </div>
          <Carousel label={t('featured.carouselLabel')} className="mt-10">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href="/portfolio#current-properties"
                className="block focus-visible:outline-offset-4"
              >
                <PropertyCard property={p} />
              </Link>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* 7. MANAGEMENT MODELS TEASER */}
      <section className="py-24 lg:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading label={t('models.label')} headline={t('models.headline')} />
            <Reveal>
              <ArrowLink href="/partner">{t('models.cta')}</ArrowLink>
            </Reveal>
          </div>
          <Stagger as="ol" gap={0.1} className="mt-16 grid border-t border-black md:grid-cols-3">
            {managementModels.map((m) => (
              <StaggerItem
                as="li"
                key={m.id}
                className="border-b border-black md:border-r md:last:border-r-0"
              >
                <Link
                  href={`/partner#${m.id}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-black hover:text-white lg:p-10"
                >
                  <span className="font-display text-8xl leading-none font-extrabold lg:text-[9rem]">
                    {m.number}
                  </span>
                  <span className="mt-10 font-display text-3xl leading-none font-bold uppercase lg:text-4xl">
                    {pick(m.name, locale)}
                  </span>
                  <span className="mt-4 text-black/70 transition-colors group-hover:text-white/80">
                    {pick(m.summary, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-8 font-display text-3xl transition-transform duration-300 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 8. CTA BAND */}
      <CtaBand
        headline={t('ctaBand.headline')}
        button={t('ctaBand.cta')}
        type="partnership"
        tone="black"
      />
    </>
  );
}

function StatItem({
  value,
  label,
  note,
}: {
  value: React.ReactNode;
  label: string;
  note?: string;
}) {
  return (
    <StaggerItem
      as="li"
      className="border-white/25 py-10 odd:border-r even:pl-6 lg:border-r lg:px-8 lg:py-14 lg:first:pl-0 lg:last:border-r-0 lg:even:pl-8 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
    >
      <p className="font-display text-6xl leading-none font-extrabold lg:text-8xl">{value}</p>
      <p className="eyebrow mt-3">{label}</p>
      {note ? <p className="mt-1 text-sm">{note}</p> : null}
    </StaggerItem>
  );
}
