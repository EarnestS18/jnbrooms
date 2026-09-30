import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { SectionHeading } from '@/components/sections/section-heading';
import { Container } from '@/components/ui/container';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import { managementModels } from '@/data/models';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';
import type { Level } from '@/types/content';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'partner', '/partner');
}

const cardTheme = [
  'bg-white text-black border-t border-black',
  'on-muted bg-grey-light text-black',
  'on-dark bg-black text-white',
] as const;

const levelValue: Record<Level, number> = { low: 1, medium: 2, high: 3 };

export default async function PartnerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('partner');
  const tc = await getTranslations('common');

  const criteria = ['incomeStability', 'upsidePotential', 'riskToOwner'] as const;

  return (
    <>
      <PageHero
        label={t('hero.label')}
        headline={t('hero.headline')}
        image="/images/hero/partner-hero.jpg"
        imageAlt={t('hero.imageAlt')}
      />

      {/* #management-models — overview */}
      <section id="management-models" className="py-24 lg:py-32">
        <Container>
          <SectionHeading label={t('models.label')} headline={t('models.headline')} />
          <Reveal as="p" className="mt-8 max-w-2xl text-lg text-black/70">
            {t('models.intro')}
          </Reveal>
          <Stagger as="ol" gap={0.1} className="mt-16 grid gap-6 md:grid-cols-3">
            {managementModels.map((m) => (
              <StaggerItem as="li" key={m.id}>
                <Link
                  href={`#${m.id}`}
                  aria-label={`${t('models.readMore', { number: m.number })}: ${pick(m.name, locale)}`}
                  className="group flex h-full min-h-[22rem] flex-col justify-between border border-black p-6 transition-colors duration-300 hover:bg-black hover:text-white lg:p-10"
                >
                  <span className="font-display text-[7rem] leading-none font-extrabold lg:text-[10rem]">
                    {m.number}
                  </span>
                  <span>
                    <span className="block font-display text-3xl leading-none font-bold uppercase lg:text-4xl">
                      {pick(m.name, locale)}
                    </span>
                    <span className="mt-3 block text-black/70 transition-colors group-hover:text-white/80">
                      {pick(m.summary, locale)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-6 block font-display text-3xl transition-transform duration-300 group-hover:translate-y-1"
                    >
                      ↓
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Model sections — sticky stacking cards: each card slides over the previous one. */}
      <div className="relative">
        {managementModels.map((m, i) => (
          <section
            key={m.id}
            id={m.id}
            aria-labelledby={`${m.id}-title`}
            className={cn(
              'sticky min-h-[85svh] motion-reduce:static',
              cardTheme[i % cardTheme.length],
            )}
            style={{ top: `calc(var(--header-height) + ${i * 1.25}rem)` }}
          >
            <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
              <div className="lg:col-span-5">
                <span
                  aria-hidden="true"
                  className="font-display text-[8rem] leading-[0.8] font-extrabold sm:text-[12rem] lg:text-[16rem]"
                >
                  {m.number}
                </span>
              </div>
              <div className="flex flex-col justify-end lg:col-span-7">
                <p className="eyebrow opacity-75">
                  {t('models.label')} {m.number}
                </p>
                <h2
                  id={`${m.id}-title`}
                  className="mt-4 font-display text-display font-extrabold tracking-tight uppercase"
                >
                  {pick(m.name, locale)}
                </h2>
                <p className="mt-6 max-w-2xl text-lg opacity-85 lg:text-xl">
                  {pick(m.description, locale)}
                </p>
                {m.bestFor ? (
                  <p className="mt-6 max-w-2xl border-l-4 border-red pl-4 text-lg">
                    <strong className="font-display font-bold tracking-[0.08em] uppercase">
                      {t('models.bestFor')}:
                    </strong>{' '}
                    {pick(m.bestFor, locale)}
                  </p>
                ) : null}
                <div className="mt-10">
                  <WhatsAppButton
                    type={`model-${m.id}`}
                    placement={`model-card-${m.number}`}
                    variant="primary"
                  >
                    {t('models.ask')}
                  </WhatsAppButton>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      {/* Comparison table */}
      <section aria-labelledby="comparison-title" className="relative z-10 bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading
            label={t('comparison.label')}
            headline={t('comparison.headline')}
            id="comparison-title"
          />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="caption-bottom pt-4 text-left text-sm text-black/70">
                {t('comparison.caption')}
              </caption>
              <thead>
                <tr className="border-b-2 border-black">
                  <th scope="col" className="eyebrow py-4 pr-6">
                    {t('comparison.model')}
                  </th>
                  {criteria.map((c) => (
                    <th key={c} scope="col" className="eyebrow px-6 py-4">
                      {t(`comparison.${c}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {managementModels.map((m) => (
                  <tr key={m.id} className="border-b border-black/15">
                    <th scope="row" className="py-6 pr-6 align-top">
                      <span className="block font-display text-sm font-bold text-black/70">
                        {m.number}
                      </span>
                      <span className="font-display text-2xl leading-none font-bold uppercase">
                        {pick(m.name, locale)}
                      </span>
                    </th>
                    {criteria.map((c) => {
                      const level = m.comparison[c];
                      return (
                        <td key={c} className="px-6 py-6 align-top">
                          <LevelMeter value={levelValue[level]} />
                          <span className="mt-2 block font-display text-lg font-bold uppercase">
                            {tc(`levels.${level}`)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      <CtaBand headline={t('ctaBand.headline')} button={t('ctaBand.button')} type="partnership" />
    </>
  );
}

function LevelMeter({ value }: { value: number }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <span key={n} className={cn('h-2 w-10', n <= value ? 'bg-black' : 'bg-grey-light')} />
      ))}
    </span>
  );
}
