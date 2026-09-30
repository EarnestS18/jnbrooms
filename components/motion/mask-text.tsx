'use client';

import { motion } from 'framer-motion';
import { maskReveal, stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface MaskTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Delay before the first word starts. */
  delay?: number;
  /** Stagger between words (brief: 0.08s). */
  gap?: number;
  onMount?: boolean;
  id?: string;
}

/**
 * Headline reveal: each word slides up from behind an overflow mask.
 * Screen readers get the plain sentence; the split words are aria-hidden.
 * Only transforms are animated, so there is no layout shift.
 */
export function MaskText({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  gap = 0.08,
  onMount = false,
  id,
}: MaskTextProps) {
  const words = text.split(' ');
  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        {...(onMount
          ? { animate: 'visible' }
          : { whileInView: 'visible', viewport: { once: true, amount: 0.5 } })}
        variants={stagger(gap, delay)}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn('-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top')}
          >
            <motion.span
              data-reveal=""
              className="inline-block will-change-transform"
              variants={maskReveal}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
