'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE } from '@/lib/motion';

/**
 * Counts up to `value` when scrolled into view. The final value is rendered on the
 * server (readable without JS); width is reserved with tabular numbers to avoid CLS.
 */
export function CountUp({
  value,
  suffix = '',
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    if (!inView) {
      setDisplay(0);
      return;
    }
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="relative inline-block">
        {/* invisible final value reserves the width */}
        <span className="invisible">
          {value}
          {suffix}
        </span>
        <span className="absolute inset-0">
          {display}
          {suffix}
        </span>
      </span>
    </span>
  );
}
