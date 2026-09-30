import { OutlinedNumber } from '@/components/sections/outlined-number';
import { cn } from '@/lib/utils';

export function ValueCardView({
  number,
  title,
  body,
  className,
  tone = 'cream',
}: {
  number: string;
  title: string;
  body: string;
  className?: string;
  /** Background the card sits on. */
  tone?: 'cream' | 'orange';
}) {
  return (
    <article className={cn('flex h-full flex-col border-t-4 border-navy pt-6', className)}>
      <OutlinedNumber
        value={number}
        className="text-8xl text-navy lg:text-9xl"
        fillClassName={tone === 'orange' ? 'text-navy' : 'text-orange'}
      />
      <h3 className="mt-8 font-display text-3xl leading-none font-bold uppercase">{title}</h3>
      <p className={cn('mt-4 max-w-sm', tone === 'orange' ? 'text-navy' : 'text-muted')}>{body}</p>
    </article>
  );
}
