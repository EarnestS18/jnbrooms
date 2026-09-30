import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CountUp } from '@/components/motion/count-up';
import { Reveal, StaggerItem } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/properties';
import {
  isVerified,
  kpiBasis,
  metrics,
  type CaseStudy,
  type Kpi,
  type MetricDefinition,
  type MetricId,
} from '@/data/performance';
import { services } from '@/data/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { t as pick } from '@/lib/content';
import { formatSigned } from '@/lib/format';
import { blurFor } from '@/lib/images';
import { drawLine } from '@/lib/motion';
import { cn } from '@/lib/utils';

function placeholderDigits(def: MetricDefinition) {
  return def.decimals ? 'X.X' : 'XX';
}

/**
 * A metric figure. Verified values count up (from `from`, default 0) when scrolled into
 * view; `null` renders an "XX" placeholder so missing data is obvious on the page: outlined
 * at display sizes, solid grey in the table (a thin outline blurs at small sizes).
 * The unit ("%", "/5") is set smaller than the number.
 */
function MetricValue({
  metric,
  value,
  from,
  unitClassName = 'text-[0.5em]',
  placeholder = 'outline',
}: {
  metric: MetricId;
  value: number | null;
  from?: number;
  unitClassName?: string;
  placeholder?: 'outline' | 'muted';
}) {
  const t = useTranslations('home.performance');
  const locale = useLocale() as Locale;
  const def = metrics[metric];
  const unit = def.unit ? <span className={unitClassName}>{pick(def.unit, locale)}</span> : null;

  if (value === null) {
    return (
      <>
        <span
          aria-hidden="true"
          className={placeholder === 'outline' ? 'text-outline' : 'text-black/30'}
        >
          {def.prefix}
          {placeholderDigits(def)}
          {unit}
        </span>
        <span className="sr-only">{t('pendingSr')}</span>
      </>
    );
  }
  return (
    <>
      <CountUp value={value} from={from} prefix={def.prefix} decimals={def.decimals} />
      {unit}
    </>
  );
}

/** One headline KPI: label, large figure, what it measures. A red rule draws in on hover. */
export function KpiItem({ kpi }: { kpi: Kpi }) {
  const t = useTranslations('home.performance');
  const locale = useLocale() as Locale;
  return (
    <StaggerItem
      as="li"
      className="group relative border-t border-black pt-6 pb-12 md:border-l md:border-l-black/15 md:px-8 md:first:border-l-0 md:first:pl-0 lg:px-12 lg:pt-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-1 origin-left scale-x-0 bg-red transition-transform duration-500 ease-athletic group-hover:scale-x-100"
      />
      <h3 className="eyebrow">{pick(kpi.label, locale)}</h3>
      <p className="mt-8 font-display text-[clamp(4.5rem,8vw,8rem)] leading-[0.85] font-extrabold tracking-tight lg:mt-12">
        <MetricValue metric={kpi.metric} value={kpi.value} />
      </p>
      <p className="mt-6 max-w-[28ch] text-black/70">{pick(kpi.definition, locale)}</p>
      {kpi.value === null ? (
        <Badge variant="outline" className="mt-5 border-dashed text-black/70">
          {t('pending')}
        </Badge>
      ) : null}
    </StaggerItem>
  );
}

/** "Period: … Source: …" line under the KPI row. */
export function KpiBasis({ className }: { className?: string }) {
  const t = useTranslations('home.performance');
  const locale = useLocale() as Locale;
  return (
    <Reveal as="p" className={cn('text-sm text-black/70', className)}>
      {t('basis', {
        period: kpiBasis.period ? pick(kpiBasis.period, locale) : t('tbc'),
        source: kpiBasis.source ? pick(kpiBasis.source, locale) : t('tbc'),
      })}
    </Reveal>
  );
}

/** Before -> after change, written the way owners read it: points or rating steps. */
function Change({ metric, before, after }: { metric: MetricId; before: number; after: number }) {
  const t = useTranslations('home.caseStudies');
  const locale = useLocale() as Locale;
  const def = metrics[metric];
  const diff = formatSigned(after - before, locale, def.decimals);
  return <>{def.change === 'points' ? t('points', { value: diff }) : diff}</>;
}

function changePlaceholder(metric: MetricId, points: (value: string) => string) {
  const def = metrics[metric];
  if (def.change === 'points') return points('+XX');
  return `+${placeholderDigits(def)}`;
}

/**
 * Case study card: property, the "Before -> J&B Rooms management -> After" line, a results
 * table and the changes made. Unverified studies carry a visible placeholder tag.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const t = useTranslations('home.caseStudies');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const property = properties.find((p) => p.slug === study.property);
  if (!property) return null;
  const verified = isVerified(study);
  const period = (p: CaseStudy['before']['period']) => (p ? pick(p, locale) : t('periodTbc'));

  return (
    <Reveal as="article" className="group grid overflow-hidden bg-white lg:grid-cols-12">
      <div className="relative aspect-[16/10] overflow-hidden bg-grey-light lg:col-span-5 lg:aspect-auto">
        <Image
          src={property.image}
          alt={tc('placeholderImage', { name: property.name })}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-athletic group-hover:scale-[1.03]"
          {...blurFor(property.image)}
        />
      </div>

      <div className="p-5 sm:p-8 lg:col-span-7 lg:p-12 xl:p-14">
        {!verified ? (
          <Badge variant="outline" className="mb-6 border-dashed text-black/70">
            {t('placeholder')}
          </Badge>
        ) : null}
        <h3 className="font-display text-4xl leading-none font-extrabold uppercase lg:text-5xl">
          {property.name}
        </h3>
        <p className="mt-2 text-black/70">
          {property.area} · {tc('rooms', { count: property.rooms })}
          {property.launchYear ? ` · ${tc('opened', { year: property.launchYear })}` : ''}
        </p>

        {/* Before -> J&B Rooms management -> After */}
        <div className="mt-10 grid grid-cols-[auto_1fr_auto] items-end gap-4 lg:mt-12 lg:gap-6">
          <div>
            <p className="eyebrow">{t('before')}</p>
            <p className="mt-1 text-xs text-black/70">{period(study.before.period)}</p>
          </div>
          <div className="relative mb-2 text-center">
            <p className="eyebrow mb-2 text-xs text-red-dark">{t('management')}</p>
            <div className="relative h-0.5 bg-black/10">
              <Reveal
                variants={drawLine}
                aria-hidden="true"
                className="absolute inset-0 origin-left bg-red"
              />
              <span
                aria-hidden="true"
                className="absolute -top-[5px] right-0 size-3 rotate-45 border-t-2 border-r-2 border-red"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="eyebrow">{t('after')}</p>
            <p className="mt-1 text-xs text-black/70">{period(study.after.period)}</p>
          </div>
        </div>

        <table className="mt-8 w-full border-collapse text-left">
          <caption className="sr-only">{t('caption', { name: property.name })}</caption>
          <thead>
            <tr className="border-b border-black">
              <th scope="col" className="eyebrow pb-3 text-xs">
                {t('metric')}
              </th>
              <th scope="col" className="eyebrow pb-3 text-right text-xs">
                {t('before')}
              </th>
              <th scope="col" className="eyebrow pb-3 text-right text-xs">
                {t('after')}
              </th>
              <th scope="col" className="eyebrow pb-3 text-right text-xs">
                {t('change')}
              </th>
            </tr>
          </thead>
          <tbody>
            {study.results.map((r) => (
              <tr key={r.metric} className="border-b border-black/10">
                <th
                  scope="row"
                  className="py-4 pr-2 font-display text-sm leading-tight font-bold uppercase sm:text-lg"
                >
                  {pick(metrics[r.metric].label, locale)}
                </th>
                <td className="py-4 pl-2 text-right font-display text-xl font-bold whitespace-nowrap text-black/70 sm:text-3xl">
                  <MetricValue metric={r.metric} value={r.before} placeholder="muted" />
                </td>
                <td className="py-4 pl-2 text-right font-display text-2xl font-extrabold whitespace-nowrap sm:text-4xl lg:text-5xl">
                  <MetricValue
                    metric={r.metric}
                    value={r.after}
                    from={r.before ?? undefined}
                    placeholder="muted"
                  />
                </td>
                <td className="py-4 pl-3 text-right">
                  {r.before !== null && r.after !== null ? (
                    <span className="inline-block bg-black px-2 py-1 font-display text-sm font-bold whitespace-nowrap text-white sm:text-base">
                      <Change metric={r.metric} before={r.before} after={r.after} />
                    </span>
                  ) : (
                    <span className="inline-block border border-dashed border-black/40 px-2 py-1 font-display text-sm font-bold whitespace-nowrap text-black/70 sm:text-base">
                      {changePlaceholder(r.metric, (value) => t('points', { value }))}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10">
          <div>
            <p className="eyebrow">{t('changed')}</p>
            <ul className="mt-4 space-y-1">
              {study.levers.map((id) => {
                const service = services.find((s) => s.id === id);
                if (!service) return null;
                return (
                  <li key={id}>
                    <Link
                      href={`/services#${id}`}
                      className="group/lever flex items-center gap-3 py-1 font-display text-lg font-bold uppercase transition-colors hover:text-red"
                    >
                      <span aria-hidden="true" className="size-1.5 shrink-0 bg-red" />
                      {pick(service.label, locale)}
                      <span
                        aria-hidden="true"
                        className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/lever:translate-x-0 group-hover/lever:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-6">
            {study.summary ? <p className="text-black/80">{pick(study.summary, locale)}</p> : null}
            <p className="text-sm text-black/70">
              {study.source ? t('source', { source: pick(study.source, locale) }) : t('sourceTbc')}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
