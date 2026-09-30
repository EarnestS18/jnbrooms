'use client';

import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE, fade, fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { TimelineEntry } from '@/types/content';

type Point = { x: number; y: number };

/**
 * S-curve through the markers: vertical tangents at every marker, so each hop between
 * two years bends like an "S". Runs from the top edge to the bottom edge of the list.
 */
function sCurve(points: Point[], height: number) {
  const first = points[0];
  const last = points[points.length - 1];
  let d = `M ${first.x} 0 L ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const bend = (b.y - a.y) / 2;
    d += ` C ${a.x} ${a.y + bend} ${b.x} ${b.y - bend} ${b.x} ${b.y}`;
  }
  return `${d} L ${last.x} ${height}`;
}

/**
 * Development timeline: a vertical line that snakes like an "S" between the years, which
 * alternate sides on desktop. The red line draws along the curve as the visitor scrolls.
 * The markers are laid out with CSS; the curve is measured from them, so it follows the
 * layout at every screen size.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const list = useRef<HTMLOListElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);
  const [curve, setCurve] = useState<{ d: string; width: number; height: number } | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.75', 'end 0.75'] });

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const points = markers.current
        .filter((m): m is HTMLSpanElement => m !== null)
        .map((m) => {
          const r = m.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        });
      if (points.length === 0) return;
      setCurve({ d: sCurve(points, box.height), width: box.width, height: box.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [entries.length]);

  const item = reduce ? fade : fadeUp;
  const marker = reduce
    ? fade
    : {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.4, ease: EASE } },
      };

  return (
    <ol ref={list} className="relative">
      {curve ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={curve.width}
          height={curve.height}
          viewBox={`0 0 ${curve.width} ${curve.height}`}
          fill="none"
        >
          <path d={curve.d} className="stroke-black/15" strokeWidth={1} />
          <motion.path
            d={curve.d}
            className="stroke-red"
            strokeWidth={3}
            style={{ pathLength: reduce ? 1 : scrollYProgress }}
          />
        </svg>
      ) : null}

      {entries.map((entry, i) => {
        const left = i % 2 === 0;
        return (
          <motion.li
            key={entry.year}
            className="relative py-10 lg:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Mobile: a gentle S near the left edge. Desktop: swings between 42% and 58%. */}
            <motion.span
              ref={(node) => {
                markers.current[i] = node;
              }}
              aria-hidden="true"
              data-reveal=""
              variants={marker}
              className={cn(
                'absolute top-16 z-10 size-4 -translate-x-1/2 -translate-y-1/2 bg-black lg:top-[4.75rem]',
                left ? 'left-3 lg:left-[42%]' : 'left-11 lg:left-[58%]',
              )}
            />
            <motion.div
              data-reveal=""
              variants={item}
              className={cn(
                'pl-20 lg:pl-0',
                left ? 'lg:w-[calc(42%-2.5rem)] lg:text-right' : 'lg:ml-[calc(58%+2.5rem)]',
              )}
            >
              <span className="block font-display text-5xl leading-none font-extrabold lg:text-7xl">
                {entry.year}
              </span>
              <ul className="mt-3 space-y-1 lg:mt-5 lg:space-y-2">
                {entry.items.map((name) => (
                  <li key={name} className="font-display text-lg font-bold uppercase lg:text-xl">
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.li>
        );
      })}
    </ol>
  );
}
