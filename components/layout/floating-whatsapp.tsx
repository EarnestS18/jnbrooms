'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { WhatsAppIcon } from '@/components/icons/brand-icons';
import { WhatsAppLink } from '@/components/whatsapp/whatsapp-link';
import { EASE } from '@/lib/motion';

/** Floating WhatsApp button on every page except /contact. */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const t = useTranslations('whatsapp');
  if (pathname === '/contact') return null;

  return (
    <motion.div
      data-reveal=""
      className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
    >
      <WhatsAppLink
        type="general"
        placement="floating"
        aria-label={t('floatingLabel')}
        title={t('floatingLabel')}
        className="btn-offset group/btn flex size-14 items-center justify-center bg-red text-white ring-1 ring-white/25 transition-colors [--offset-color:var(--color-red)] hover:bg-red-dark sm:size-16"
      >
        <WhatsAppIcon className="size-7" />
      </WhatsAppLink>
    </motion.div>
  );
}
