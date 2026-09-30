import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/motion/reveal';
import { WipeReveal } from '@/components/motion/wipe-reveal';
import { MaskText } from '@/components/motion/mask-text';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { ServicesSubnav } from '@/components/sections/services-subnav';
import { Container } from '@/components/ui/container';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { blurFor } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'services', '/services');
}

// TODO: confirm exact service scope with management before launch
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  const subnav = services.map((s) => ({ id: s.id, label: pick(s.label, locale) }));

  return (
    <>
      <PageHero
        label={t('hero.label')}
        headline={t('hero.headline')}
        image="/images/services/services-hero.jpg"
        imageAlt={t('hero.imageAlt')}
      />

      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:py-32">
        <aside className="hidden lg:col-span-3 lg:block">
          <ServicesSubnav items={subnav} label={t('subnavLabel')} />
        </aside>

        <div className="space-y-24 lg:col-span-9 lg:space-y-36">
          {services.map((service, i) => {
            const label = pick(service.label, locale);
            const flip = i % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-title`}
                className="grid items-center gap-8 md:grid-cols-2 lg:gap-12"
              >
                <WipeReveal
                  direction={flip ? 'right' : 'left'}
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden bg-mist',
                    flip && 'md:order-2',
                  )}
                >
                  <Image
                    src={service.image}
                    alt={t('imageAlt', { service: label })}
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    {...blurFor(service.image)}
                  />
                </WipeReveal>
                <div>
                  <Reveal>
                    <h2
                      id={`${service.id}-title`}
                      className="eyebrow flex items-center gap-3 text-steel-dark"
                    >
                      <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span aria-hidden="true" className="h-px w-8 bg-current" />
                      {label}
                    </h2>
                  </Reveal>
                  <MaskText
                    as="p"
                    text={pick(service.headline, locale)}
                    className="mt-4 font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase lg:text-6xl"
                  />
                  <Reveal as="p" delay={0.15} className="mt-6 max-w-md text-lg text-steel-dark">
                    {pick(service.body, locale)}
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <CtaBand headline={t('cta.headline')} button={t('cta.button')} type="partnership" />
    </>
  );
}
