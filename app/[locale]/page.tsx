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
import { ValueCardView } from '@/components/sections/value-card';
import { ArrowLink, CtaLink } from '@/components/ui/cta-link';
import { Container } from '@/components/ui/container';
import { managementModels } from '@/data/models';
import { floorToStep, portfolioStats, properties } from '@/data/properties';
import { values } from '@/data/values';
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

      {/* 3. WHY J&B ROOMS TEASER */}
      <section className="py-24 lg:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading label={t('why.label')} headline={t('why.headline')} />
            <Reveal>
              <ArrowLink href="/about#why-jb-rooms">{t('why.cta')}</ArrowLink>
            </Reveal>
          </div>
          <Stagger gap={0.12} className="mt-16 grid gap-12 md:grid-cols-3 lg:mt-20 lg:gap-10">
            {values.slice(0, 3).map((v) => (
              <StaggerItem key={v.number}>
                <ValueCardView
                  number={v.number}
                  title={pick(v.title, locale)}
                  body={pick(v.body, locale)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 4. FEATURED PROPERTIES */}
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

      {/* 5. MANAGEMENT MODELS TEASER */}
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

      {/* 6. CTA BAND */}
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
