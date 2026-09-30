'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fade, VIEWPORT, wipe, wipeFromRight } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Horizontal clip-path wipe reveal (services images). */
export function WipeReveal({
  children,
  className,
  direction = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
}) {
  const reduce = useReducedMotion();
  const variants = direction === 'left' ? wipe : wipeFromRight;
  // The outer element observes the viewport (a fully clipped element never intersects);
  // the inner one carries the clip-path animation.
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div data-reveal="" className="absolute inset-0" variants={reduce ? fade : variants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
