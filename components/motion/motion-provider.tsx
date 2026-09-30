'use client';

import { MotionConfig } from 'framer-motion';

/** `reducedMotion="user"` turns transform/layout animations into simple fades
 * for visitors with prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
