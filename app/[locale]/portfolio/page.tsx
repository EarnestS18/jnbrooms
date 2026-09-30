import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { WipeReveal } from '@/components/motion/wipe-reveal';
import { PageHero } from '@/components/sections/page-hero';
import { PropertyCard } from '@/components/sections/property-card';
import { PropertyFilter } from '@/components/sections/property-filter';
import { SectionHeading } from '@/components/sections/section-heading';
import { Timeline } from '@/components/sections/timeline';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import { bnrProject } from '@/data/projects';
import { liveProperties, portfolioStats, properties, upcomingProperties } from '@/data/properties';
import { timeline } from '@/data/timeline';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { blurFor } from '@/lib/images';
import { jsonLdString, lodgingJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'portfolio', '/portfolio');
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('portfolio');
  const tc = await getTranslations('common');

  const pipeline = upcomingProperties.filter((p) => !p.currentProject);

  return (
    <>
      {/* JSON-LD: one LodgingBusiness per operating property. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(liveProperties.map((p) => lodgingJsonLd(p, locale))),
        }}
      />

      <PageHero
        label={t('hero.label')}
        headline={t('hero.headline')}
        image="/images/hero/portfolio-hero.jpg"
        imageAlt={t('hero.imageAlt')}
      />

      {/* #current-properties */}
      <section id="current-properties" className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            label={t('current.label')}
            headline={t('current.headline', {
              count: portfolioStats.propertyCount,
              rooms: portfolioStats.totalRooms,
            })}
          />
          <div className="mt-12">
            <PropertyFilter properties={properties} />
          </div>
        </Container>
      </section>

      {/* #timeline */}
      <section id="timeline" className="on-muted overflow-hidden bg-grey-light py-24 lg:py-32">
        <Container>
          <SectionHeading label={t('timeline.label')} headline={t('timeline.headline')} />
          <div className="mt-14">
            <Timeline entries={timeline} />
          </div>
        </Container>
      </section>

      {/* #upcoming-projects */}
      <section id="upcoming-projects" className="py-24 lg:py-32">
        <Container>
          <SectionHeading label={t('upcoming.label')} headline={t('upcoming.headline')} />

          {/* Featured current project: J&B Rooms BNR */}
          <article className="mt-14 grid gap-0 lg:grid-cols-2" aria-labelledby="bnr-title">
            <WipeReveal className="relative aspect-[4/3] overflow-hidden bg-grey-light lg:aspect-auto lg:min-h-[36rem]">
              <Image
                src={bnrProject.image}
                alt={`${bnrProject.name}, ${bnrProject.location}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                {...blurFor(bnrProject.image)}
              />
              <Badge variant="red" className="absolute top-4 left-4">
                {t('upcoming.featureLabel')}
              </Badge>
            </WipeReveal>

            <div className="on-dark bg-black p-6 text-white sm:p-10 lg:p-14">
              <Reveal>
                <p className="eyebrow text-white/75">{bnrProject.location}</p>
                <h3
                  id="bnr-title"
                  className="mt-3 font-display text-5xl leading-none font-extrabold uppercase lg:text-6xl"
                >
                  {bnrProject.name}
                </h3>
                <p className="mt-5 max-w-xl text-white/80">
                  {pick(bnrProject.description, locale)}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-10 border-t border-white/30 pt-6">
                <p className="font-display text-5xl leading-none font-extrabold">
                  {bnrProject.rooms}
                </p>
                <p className="eyebrow mt-2 text-white/75">{tc('roomsLabel')}</p>
              </Reveal>

              <Reveal delay={0.2} className="mt-10">
                <WhatsAppButton type="project-bnr" placement="bnr-feature" variant="primary">
                  {t('upcoming.cta')}
                </WhatsAppButton>
              </Reveal>
            </div>
          </article>

          {/* Pipeline: every property with status ≠ live */}
          {pipeline.length > 0 ? (
            <>
              <h3 className="mt-24 font-display text-4xl font-extrabold uppercase">
                {t('upcoming.pipelineTitle')}
              </h3>
              <Stagger
                as="ul"
                gap={0.1}
                className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
              >
                {pipeline.map((p) => (
                  <StaggerItem as="li" key={p.slug}>
                    <PropertyCard property={p} headingLevel="h4" />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          ) : null}
        </Container>
      </section>
    </>
  );
}
