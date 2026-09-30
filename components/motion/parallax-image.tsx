'use client';

import Image, { type ImageProps } from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

/** Image that drifts slightly slower than the page. Disabled for reduced motion. */
export function ParallaxImage({
  className,
  strength = 60,
  ...image
}: ImageProps & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute"
        style={reduce ? { inset: 0 } : { y, top: -strength, bottom: -strength, left: 0, right: 0 }}
      >
        <Image {...image} alt={image.alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}
