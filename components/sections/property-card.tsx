import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { blurFor } from '@/lib/images';
import { cn } from '@/lib/utils';
import type { Property } from '@/types/content';

export function PropertyStatusBadge({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const t = useTranslations('common');
  if (property.status === 'live') {
    return (
      <Badge variant="yellow" className={className}>
        {t('status.live')}
      </Badge>
    );
  }
  if (property.tbc) {
    return (
      <Badge variant="cream" className={className}>
        {t('status.upcoming')} · {t('status.tbc')}
      </Badge>
    );
  }
  return (
    <Badge variant={property.currentProject ? 'orange' : 'navy'} className={className}>
      {property.currentProject ? t('status.current') : t('status.upcoming')}
      {property.launchYear ? ` · ${property.launchYear}` : ''}
    </Badge>
  );
}

/**
 * Property card: image zoom + dark overlay on hover, room count slides up.
 * Room count is also always present in the text below for touch and screen readers.
 */
export function PropertyCard({
  property,
  className,
  sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 85vw',
  headingLevel: H = 'h3',
  tone = 'cream',
}: {
  property: Property;
  className?: string;
  sizes?: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
  /** Background the card sits on — secondary text must be solid navy on orange. */
  tone?: 'cream' | 'orange';
}) {
  const t = useTranslations('common');
  return (
    <article className={cn('group relative', className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-navy/15">
        <Image
          src={property.image}
          alt={t('placeholderImage', { name: property.name })}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-athletic group-focus-within:scale-105 group-hover:scale-105"
          {...blurFor(property.image)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-focus-within:bg-navy/70 group-hover:bg-navy/70"
        />
        <PropertyStatusBadge property={property} className="absolute top-3 left-3" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 translate-y-full p-5 text-cream transition-transform duration-500 ease-athletic group-focus-within:translate-y-0 group-hover:translate-y-0"
        >
          <span className="block font-display text-7xl leading-none font-extrabold text-orange">
            {property.rooms}
          </span>
          <span className="eyebrow">{t('roomsLabel')}</span>
        </div>
      </div>
      <div className="pt-4">
        <H className="font-display text-2xl leading-tight font-bold uppercase">{property.name}</H>
        <p className={cn('mt-1 text-sm', tone === 'orange' ? 'text-navy' : 'text-muted')}>
          {property.area} · {t('rooms', { count: property.rooms })}
        </p>
      </div>
    </article>
  );
}
