'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PropertyCard } from '@/components/sections/property-card';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Property, Region } from '@/types/content';

type Filter = 'all' | Region;
const filters: Filter[] = ['all', 'jakarta', 'greater-jakarta', 'outside-jakarta'];

/** Region filter tabs + animated property grid (Framer Motion layout + AnimatePresence). */
export function PropertyFilter({ properties }: { properties: Property[] }) {
  const t = useTranslations('common');
  const tp = useTranslations('portfolio.current');
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? properties : properties.filter((p) => p.region === filter);

  return (
    <div>
      <div
        role="group"
        aria-label={tp('filterLabel')}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                'h-12 shrink-0 border px-5 font-display text-base font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300',
                active
                  ? 'border-black bg-black text-white'
                  : 'border-black/25 bg-white text-black hover:border-black',
              )}
            >
              {t(`regions.${f}`)}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-black/70">
        {tp('results', { count: visible.length })}
      </p>

      <motion.ul
        layout
        className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((property) => (
            <motion.li
              key={property.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <PropertyCard
                property={property}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 ? <p className="mt-6 text-black/70">{tp('empty')}</p> : null}
    </div>
  );
}
