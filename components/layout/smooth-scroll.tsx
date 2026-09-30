'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/** Lenis smooth scrolling — desktop pointer devices only, never with reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!desktop || reduce) return;

    const headerOffset =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) *
        16 || 80;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: { offset: -(headerOffset + 16) },
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
