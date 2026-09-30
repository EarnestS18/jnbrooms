import { cn } from '@/lib/utils';

/**
 * Placeholder wordmark. TODO(brand): replace with the official J&B Rooms logo files
 * (drop an SVG into /public/brand and render it here).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1 font-display text-2xl leading-none font-extrabold tracking-tight uppercase lg:text-[1.75rem]',
        className,
      )}
    >
      <span>J&amp;B</span>
      <span className="font-semibold tracking-[0.12em]">Rooms</span>
    </span>
  );
}
