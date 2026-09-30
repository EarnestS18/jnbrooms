import { Link } from '@/i18n/navigation';
import { buttonVariants, ButtonArrow, type ButtonVariantProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Internal link styled as the signature offset button with trailing arrow. */
export function CtaLink({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string } & ButtonVariantProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <span>{children}</span>
      <ButtonArrow />
    </Link>
  );
}

/** Understated text link with arrow — for "view all" style links. */
export function ArrowLink({
  href,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'group/btn inline-flex items-center gap-2 border-b-2 border-current pb-1 font-display text-base font-bold tracking-[0.08em] uppercase transition-colors',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ButtonArrow className="size-4" />
    </Link>
  );
}
