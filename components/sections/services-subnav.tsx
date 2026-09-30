'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/** Sticky desktop sub-nav that highlights the service currently in view. */
export function ServicesSubnav({
  items,
  label,
}: {
  items: { id: string; label: string }[];
  label: string;
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-[calc(var(--header-height)+2.5rem)]">
      <ol className="space-y-1 border-l border-navy/15">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  '-ml-px flex items-baseline gap-3 border-l-2 py-2.5 pl-5 font-display text-lg font-bold tracking-[0.06em] uppercase transition-colors duration-300',
                  isActive
                    ? 'border-orange text-navy'
                    : 'border-transparent text-muted hover:text-navy',
                )}
              >
                <span className="text-sm tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
