'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE, fade, fadeUp, stagger } from '@/lib/motion';
import type { TimelineEntry } from '@/types/content';

/**
 * Development timeline: horizontal (drag / scroll) on desktop, vertical on mobile.
 * The progress line draws as the visitor scrolls through the section.
 */
export function Timeline({ entries, hint }: { entries: TimelineEntry[]; hint: string }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.85', 'end 0.6'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Mouse drag-to-scroll for the horizontal track.
  const drag = useRef<{ x: number; left: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = () => {
    drag.current = null;
  };

  const marker = reduce
    ? fade
    : {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.4, ease: EASE } },
      };
  const item = reduce ? fade : fadeUp;

  return (
    <div ref={section}>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block">
        <p className="eyebrow mb-6 text-steel-dark">{hint} →</p>
        <div
          ref={track}
          tabIndex={0}
          aria-label={hint}
          role="region"
          data-lenis-prevent-wheel=""
          className="no-scrollbar cursor-grab overflow-x-auto pb-4 select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <motion.ol
            className="relative flex w-max min-w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.12)}
          >
            <span
              aria-hidden="true"
              className="absolute top-[5.5rem] right-0 left-0 h-px bg-ink/15"
            />
            <motion.span
              aria-hidden="true"
              data-reveal=""
              className="absolute top-[5.5rem] right-0 left-0 h-[3px] origin-left -translate-y-px bg-ink"
              style={reduce ? undefined : { scaleX: progress }}
            />
            {entries.map((entry) => (
              <li key={entry.year} className="relative w-[20rem] shrink-0 pr-10 xl:w-[22rem]">
                <motion.span
                  data-reveal=""
                  variants={item}
                  className="block font-display text-7xl leading-none font-extrabold"
                >
                  {entry.year}
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  data-reveal=""
                  variants={marker}
                  className="absolute top-[5.5rem] left-0 size-4 -translate-y-1/2 bg-accent"
                />
                <motion.ul data-reveal="" variants={item} className="mt-14 space-y-2">
                  {entry.items.map((name) => (
                    <li key={name} className="font-display text-xl font-bold uppercase">
                      {name}
                    </li>
                  ))}
                </motion.ul>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>

      {/* Mobile: vertical */}
      <motion.ol
        className="relative space-y-12 pl-10 lg:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger(0.1)}
      >
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-ink/15" />
        <motion.span
          aria-hidden="true"
          data-reveal=""
          className="absolute top-2 bottom-2 left-[6px] w-[3px] origin-top bg-ink"
          style={reduce ? undefined : { scaleY: progress }}
        />
        {entries.map((entry) => (
          <li key={entry.year} className="relative">
            <motion.span
              aria-hidden="true"
              data-reveal=""
              variants={marker}
              className="absolute top-3 -left-10 size-4 bg-accent"
            />
            <motion.div data-reveal="" variants={item}>
              <span className="block font-display text-5xl leading-none font-extrabold">
                {entry.year}
              </span>
              <ul className="mt-3 space-y-1">
                {entry.items.map((name) => (
                  <li key={name} className="font-display text-lg font-bold uppercase">
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </li>
        ))}
      </motion.ol>
    </div>
  );
}
