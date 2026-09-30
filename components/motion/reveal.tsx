'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { fade, fadeUp, stagger, VIEWPORT } from '@/lib/motion';

type Tag = 'div' | 'section' | 'ul' | 'li' | 'p' | 'span' | 'article' | 'header' | 'ol';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  variants?: Variants;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
  amount?: number;
}

/**
 * Scroll-triggered reveal (fade up by default). Content is marked with
 * `data-reveal` so it stays visible when JavaScript is disabled (see layout <noscript>).
 */
export function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  onMount = false,
  amount = VIEWPORT.amount,
  children,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const v = reduce ? fade : variants;
  return (
    <Comp
      data-reveal=""
      initial="hidden"
      {...(onMount
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount } })}
      variants={v}
      transition={delay ? { delay } : undefined}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  gap?: number;
  delay?: number;
  onMount?: boolean;
  amount?: number;
}

/** Parent that staggers any <StaggerItem> children. */
export function Stagger({
  as = 'div',
  gap = 0.08,
  delay = 0,
  onMount = false,
  amount = 0.2,
  children,
  ...props
}: StaggerProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      {...(onMount
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount } })}
      variants={stagger(gap, delay)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  as = 'div',
  variants = fadeUp,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: Tag; variants?: Variants }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-reveal=""
      variants={reduce ? fade : variants}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Comp>
  );
}
