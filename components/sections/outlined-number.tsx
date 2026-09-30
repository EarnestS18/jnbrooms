'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fade, fillUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Large outlined number that fills with colour when it enters the viewport. */
export function OutlinedNumber({
  value,
  className,
  fillClassName = 'text-orange',
}: {
  value: string;
  className?: string;
  /** Fill colour once revealed — orange on cream/navy, navy on orange. */
  fillClassName?: string;
}) {
  const reduce = useReducedMotion();
  // The observer sits on the unclipped wrapper: a fully clipped element never "intersects".
  return (
    <motion.span
      aria-hidden="true"
      className={cn('relative inline-block font-display leading-none font-extrabold', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <span className="text-outline">{value}</span>
      <motion.span
        data-reveal=""
        className={cn('absolute inset-0', fillClassName)}
        variants={reduce ? fade : fillUp}
      >
        {value}
      </motion.span>
    </motion.span>
  );
}
