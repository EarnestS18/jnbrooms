'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Horizontal-scroll carousel: native swipe/scroll-snap on touch, arrow controls on desktop.
 */
export function Carousel({
  label,
  children,
  className,
  itemClassName = 'w-[82%] sm:w-[46%] lg:w-[31%] xl:w-[24%]',
  dark = false,
}: {
  label: string;
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  dark?: boolean;
}) {
  const t = useTranslations('common');
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const btn = cn(
    'flex size-12 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-30',
    dark
      ? 'border-white text-white enabled:hover:bg-white enabled:hover:text-black'
      : 'border-black text-black enabled:hover:bg-black enabled:hover:text-white',
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div className="mb-6 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          className={btn}
          onClick={() => scroll(-1)}
          disabled={atStart}
          aria-label={t('previous')}
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => scroll(1)}
          disabled={atEnd}
          aria-label={t('next')}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        data-lenis-prevent-wheel=""
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-10 lg:scroll-px-10 lg:gap-6 lg:px-10"
      >
        {children.map((child, i) => (
          <li key={i} className={cn('shrink-0 snap-start', itemClassName)}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
