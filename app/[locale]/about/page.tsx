import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParallaxImage } from '@/components/motion/parallax-image';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { WordReveal } from '@/components/motion/word-reveal';
import { Carousel } from '@/components/sections/carousel';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { SectionHeading } from '@/components/sections/section-heading';
import { ValueCardView } from '@/components/sections/value-card';
import { Container } from '@/components/ui/container';
import { team } from '@/data/team';
import { values } from '@/data/values';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { blurFor } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'about', '/about');
}

const pillars = ['owner', 'guest', 'people'] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const th = await getTranslations('home');

  return (
    <>
      <PageHero
        label={t('hero.label')}
        headline={t('hero.headline')}
        image="/images/about/about-hero.jpg"
        imageAlt={t('hero.imageAlt')}
      />

      {/* #about — story */}
      <section id="about" className="py-24 lg:py-36">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ParallaxImage
            src="/images/about/story.jpg"
            alt={t('story.imageAlt')}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] bg-navy/15 lg:col-span-6"
            {...blurFor('/images/about/story.jpg')}
          />
          <div className="lg:col-span-6 lg:pl-6">
            <SectionHeading label={t('story.label')} headline={t('story.headline')} />
            <Reveal className="mt-8 space-y-5 text-lg text-muted">
              <p>{t('story.p1')}</p>
              {/* TODO(content): Pramuka opened with 9 rooms and is now listed at 43 — confirm the expansion story. */}
              <p>{t('story.p2')}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* #vision-mission */}
      <section id="vision-mission" className="on-dark bg-navy py-24 text-cream lg:py-36">
        <Container>
          <p className="eyebrow text-yellow">{t('vision.label')}</p>
          <h2 className="mt-10 font-display text-2xl font-bold tracking-[0.12em] text-cream/75 uppercase">
            {t('vision.visionTitle')}
          </h2>
          <WordReveal
            text={t('vision.vision')}
            className="mt-4 max-w-6xl font-display text-headline font-extrabold tracking-tight uppercase"
          />

          <h2 className="mt-24 font-display text-2xl font-bold tracking-[0.12em] text-cream/75 uppercase">
            {t('vision.missionTitle')}
          </h2>
          <Stagger as="ol" gap={0.12} className="mt-8 grid gap-px bg-cream/20 md:grid-cols-3">
            {pillars.map((key, i) => (
              <StaggerItem as="li" key={key} className="bg-navy p-8 lg:p-10">
                <span className="font-display text-xl font-bold text-orange">0{i + 1}</span>
                <h3 className="mt-10 font-display text-4xl leading-none font-extrabold uppercase">
                  {t(`vision.pillars.${key}.title`)}
                </h3>
                <p className="mt-4 text-cream/80">{t(`vision.pillars.${key}.body`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* #leadership */}
      <section id="leadership" className="on-orange bg-orange py-24 text-navy lg:py-36">
        <Container>
          <SectionHeading
            label={t('leadership.label')}
            headline={t('leadership.headline')}
            tone="orange"
          />
          <Stagger gap={0.12} className="mt-6">
            <Carousel
              label={t('leadership.carouselLabel')}
              itemClassName="w-[82%] sm:w-[46%] lg:w-[31.5%]"
            >
              {team.map((member) => {
                const role = pick(member.role, locale);
                return (
                  <StaggerItem as="article" key={member.slug} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-navy/15">
                      <Image
                        src={member.image}
                        alt={t('leadership.photoAlt', { name: member.name, role })}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 82vw"
                        className="object-cover grayscale transition-[filter,transform] duration-700 ease-athletic group-hover:scale-[1.03] group-hover:grayscale-0"
                        {...blurFor(member.image)}
                      />
                    </div>
                    <h3 className="mt-5 font-display text-3xl leading-none font-bold uppercase">
                      {member.name}
                    </h3>
                    <p className="eyebrow mt-2 text-navy">{role}</p>
                    <p className="mt-3 max-w-md text-navy">{pick(member.bio, locale)}</p>
                  </StaggerItem>
                );
              })}
            </Carousel>
          </Stagger>
        </Container>
      </section>

      {/* #why-jb-rooms */}
      <section id="why-jb-rooms" className="py-24 lg:py-36">
        <Container>
          <SectionHeading label={t('why.label')} headline={t('why.headline')} />
          <Stagger
            gap={0.1}
            className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          >
            {values.map((v) => (
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

      <CtaBand headline={th('ctaBand.headline')} button={th('ctaBand.cta')} type="partnership" />
    </>
  );
}
