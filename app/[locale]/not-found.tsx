import { useTranslations } from 'next-intl';
import { CtaLink } from '@/components/ui/cta-link';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="on-dark flex min-h-[80svh] items-end bg-black text-white">
      <Container className="pt-[calc(var(--header-height)+4rem)] pb-20">
        <p className="eyebrow text-white/75">{t('label')}</p>
        <h1 className="mt-4 max-w-5xl font-display text-display font-extrabold uppercase">
          {t('headline')}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">{t('body')}</p>
        <CtaLink href="/" variant="primary" className="mt-10">
          {t('cta')}
        </CtaLink>
      </Container>
    </section>
  );
}
