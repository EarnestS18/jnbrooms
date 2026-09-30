import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language. Sharp, athletic easing — no bouncy springs.
 * Use these variants everywhere so the whole site moves the same way.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = { fast: 0.4, base: 0.6, slow: 0.8 } as const;

export const transition: Transition = { duration: DURATION.base, ease: EASE };

/** Trigger scroll animations once, when 30% of the element is visible. */
export const VIEWPORT = { once: true, amount: 0.3 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Container variant — staggers its children's `hidden -> visible`. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Child of an overflow-hidden mask: slides up from below the mask. */
export const maskReveal: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: DURATION.slow, ease: EASE } },
};

/** Horizontal clip-path wipe for images. */
export const wipe: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1, ease: EASE } },
};

/** Vertical fill (used by the outlined numbers on the "Why J&B Rooms" cards). */
export const fillUp: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: DURATION.slow, ease: EASE } },
};

export const wipeFromRight: Variants = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: { clipPath: 'inset(0 0 0 0%)', transition: { duration: 1, ease: EASE } },
};
