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
        /** Primary CTA on cream: orange with navy text (cream text on orange fails contrast). */
        primary: 'bg-orange text-navy hover:bg-yellow [--offset-color:var(--color-navy)]',
        /** Secondary action on cream: cream with navy border. */
        secondary:
          'border border-navy bg-cream text-navy hover:bg-yellow [--offset-color:var(--color-navy)]',
        /** Primary CTA on navy sections/photos: orange with a cream offset outline. */
        inverse: 'bg-orange text-navy hover:bg-yellow [--offset-color:var(--color-cream)]',
        /** Secondary action on navy sections/photos. */
        'outline-inverse':
          'border border-cream bg-transparent text-cream hover:bg-cream hover:text-navy [--offset-color:var(--color-cream)]',
        /** CTA on orange sections: navy with cream text. */
        navy: 'bg-navy text-cream hover:text-yellow [--offset-color:var(--color-navy)]',
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
