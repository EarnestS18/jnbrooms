import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Official J&B Rooms logo, rendered from the untouched SVGs in /public/brand.
 * Only ever place it on black or white — never on red.
 *
 * - `horizontal`: monogram + wordmark side by side (header, mobile menu).
 * - `stacked`: monogram above wordmark (footer, About page).
 *
 * `tone` is the logo colour: "white" on black backgrounds, "black" on white.
 * Size it with a height class (e.g. `h-8 lg:h-10`); width follows the aspect ratio.
 */
const files = {
  horizontal: {
    black: 'jb-rooms-logo-horizontal-black.svg',
    white: 'jb-rooms-logo-horizontal-white.svg',
    width: 569,
    height: 144,
  },
  stacked: {
    black: 'jb-rooms-logo-black.svg',
    white: 'jb-rooms-logo-white.svg',
    width: 1305,
    height: 1030,
  },
} as const;

export function Logo({
  variant = 'horizontal',
  tone,
  priority,
  className,
}: {
  variant?: keyof typeof files;
  tone: 'black' | 'white';
  priority?: boolean;
  className?: string;
}) {
  const file = files[variant];
  return (
    <Image
      src={`/brand/${file[tone]}`}
      alt="J&B Rooms"
      width={file.width}
      height={file.height}
      priority={priority}
      className={cn('w-auto', className)}
    />
  );
}
