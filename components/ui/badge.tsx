import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-xs font-bold tracking-[0.12em] uppercase',
  {
    variants: {
      variant: {
        red: 'bg-red text-white',
        black: 'bg-black text-white',
        white: 'bg-white text-black',
        outline: 'border border-current',
      },
    },
    defaultVariants: { variant: 'black' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
