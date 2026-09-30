import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-xs font-bold tracking-[0.12em] uppercase',
  {
    variants: {
      variant: {
        accent: 'bg-accent text-accent-foreground',
        ink: 'bg-ink text-paper',
        paper: 'bg-paper text-ink',
        outline: 'border border-current',
      },
    },
    defaultVariants: { variant: 'ink' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
