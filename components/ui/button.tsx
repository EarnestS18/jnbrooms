import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * shadcn/ui Button, restyled: sharp corners, no shadows, uppercase condensed label,
 * and the signature offset outline (see `.btn-offset` in globals.css).
 */
export const buttonVariants = cva(
  'btn-offset group/btn inline-flex shrink-0 items-center justify-center gap-3 font-display font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /** Red button, white label — the primary action on black or white backgrounds. */
        primary: 'bg-red text-white hover:bg-red-dark [--offset-color:var(--color-red)]',
        /** Transparent with 1px black border — secondary action on light backgrounds. */
        secondary:
          'border border-black bg-transparent text-black hover:bg-black/5 [--offset-color:var(--color-black)]',
        /** White button — the action on a red band, where a red button would disappear. */
        inverse: 'bg-white text-black hover:text-black/70 [--offset-color:var(--color-white)]',
        /** Transparent with 1px white border — secondary action on dark backgrounds/photos. */
        'outline-inverse':
          'border border-white bg-transparent text-white hover:bg-white/10 [--offset-color:var(--color-white)]',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        default: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'size-12',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Trailing arrow that nudges right on hover. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        'size-5 transition-transform duration-300 ease-athletic group-hover/btn:translate-x-1',
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="square"
    >
      <path d="M3 12h17M14 5l7 7-7 7" />
    </svg>
  );
}
