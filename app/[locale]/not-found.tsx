import { useTranslations } from 'next-intl';
import { CtaLink } from '@/components/ui/cta-link';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="on-dark flex min-h-[80svh] items-end bg-navy text-cream">
      <Container className="pt-[calc(var(--header-height)+4rem)] pb-20">
        <p className="eyebrow text-cream/75">{t('label')}</p>
        <h1 className="mt-4 max-w-5xl font-display text-display font-extrabold uppercase">
          {t('headline')}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/80">{t('body')}</p>
        <CtaLink href="/" variant="inverse" className="mt-10">
          {t('cta')}
        </CtaLink>
      </Container>
    </section>
  );
}
