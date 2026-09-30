'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

/** Large text that slides horizontally, linked to scroll position. */
export function ScrollText({
  children,
  className,
  from = '12%',
  to = '-12%',
}: {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div data-reveal="" style={reduce ? undefined : { x }}>
        {children}
      </motion.div>
    </div>
  );
}
