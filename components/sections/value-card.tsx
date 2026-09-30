import { OutlinedNumber } from '@/components/sections/outlined-number';
import { cn } from '@/lib/utils';

export function ValueCardView({
  number,
  title,
  body,
  className,
}: {
  number: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article className={cn('flex h-full flex-col border-t-4 border-ink pt-6', className)}>
      <OutlinedNumber value={number} className="text-8xl text-ink lg:text-9xl" />
      <h3 className="mt-8 font-display text-3xl leading-none font-bold uppercase">{title}</h3>
      <p className="mt-4 max-w-sm text-steel-dark">{body}</p>
    </article>
  );
}
