import { MaskText } from '@/components/motion/mask-text';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

/** Uppercase section label followed by a direct, bold headline. */
export function SectionHeading({
  label,
  headline,
  className,
  headlineClassName,
  as = 'h2',
  id,
  tone = 'cream',
}: {
  label: string;
  headline: string;
  className?: string;
  headlineClassName?: string;
  as?: 'h2' | 'h3';
  id?: string;
  /** Section background: sets a label colour that stays readable on it. */
  tone?: 'cream' | 'orange' | 'navy';
}) {
  return (
    <div className={cn('max-w-5xl', className)}>
      <Reveal
        as="p"
        className={cn(
          'eyebrow mb-4',
          tone === 'cream' && 'text-orange-dark',
          tone === 'orange' && 'text-navy',
          tone === 'navy' && 'text-yellow',
        )}
      >
        {label}
      </Reveal>
      <MaskText
        as={as}
        id={id}
        text={headline}
        className={cn(
          'font-display text-headline font-extrabold tracking-tight uppercase',
          headlineClassName,
        )}
      />
    </div>
  );
}
