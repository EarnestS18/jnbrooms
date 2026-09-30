import Image from 'next/image';
import { MaskText } from '@/components/motion/mask-text';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { blurFor } from '@/lib/images';
import { cn } from '@/lib/utils';

/** Full-bleed photo hero with dark overlay used at the top of every inner page. */
export function PageHero({
  label,
  headline,
  image,
  imageAlt,
  children,
  className,
}: {
  label: string;
  headline: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink text-paper',
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover motion-safe:animate-ken-burns"
        {...blurFor(image)}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/40"
      />
      <Container className="pt-[calc(var(--header-height)+4rem)] pb-14 lg:pb-20">
        <Reveal onMount as="p" className="eyebrow mb-5 text-paper/85">
          {label}
        </Reveal>
        <MaskText
          as="h1"
          onMount
          delay={0.1}
          text={headline}
          className="max-w-6xl font-display text-display font-extrabold tracking-tight uppercase"
        />
        {children}
      </Container>
    </section>
  );
}
