'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/lib/format';
import { EASE } from '@/lib/motion';

/**
 * Counts from `from` up to `value` when scrolled into view. The final value is rendered
 * on the server (readable without JS); width is reserved with tabular numbers to avoid CLS.
 */
export function CountUp({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    if (!inView) {
      setDisplay(from);
      return;
    }
    started.current = true;
    const controls = animate(from, value, { duration, ease: EASE, onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, reduce, value, from, duration]);

  const final = `${prefix}${formatNumber(value, locale, decimals)}${suffix}`;
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="relative inline-block">
        {/* invisible final value reserves the width */}
        <span className="invisible">{final}</span>
        <span className="absolute inset-0">
          {prefix}
          {formatNumber(display, locale, decimals)}
          {suffix}
        </span>
      </span>
    </span>
  );
}
