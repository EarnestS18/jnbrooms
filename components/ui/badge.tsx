import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-xs font-bold tracking-[0.12em] uppercase',
  {
    variants: {
      variant: {
        /** Status badges, e.g. "Live" — always navy text on yellow. */
        yellow: 'bg-yellow text-navy',
        orange: 'bg-orange text-navy',
        navy: 'bg-navy text-cream',
        cream: 'bg-cream text-navy',
        outline: 'border border-current',
      },
    },
    defaultVariants: { variant: 'navy' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
