'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  getWhatsAppLink,
  whatsapp,
  type WhatsAppContactId,
  type WhatsAppEnquiryType,
} from '@/config/contact';
import { usePathname } from '@/i18n/navigation';
import { trackWhatsAppClick } from '@/lib/analytics';
import { buttonVariants, ButtonArrow, type ButtonVariantProps } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/brand-icons';
import { cn } from '@/lib/utils';

export interface WhatsAppLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'type'
> {
  /** Enquiry type — decides the pre-filled message and the analytics label. */
  type: WhatsAppEnquiryType;
  /** Where on the page this CTA lives, for analytics (e.g. "hero", "cta-band"). */
  placement: string;
  /** Which WhatsApp contact to open. Defaults to the primary contact. */
  contact?: WhatsAppContactId;
}

/**
 * Click-to-chat link. Opens wa.me in a new tab (the app on mobile, WhatsApp Web/Desktop
 * on desktop) and records a `whatsapp_click` analytics event.
 */
export function WhatsAppLink({
  type,
  placement,
  contact = whatsapp.id,
  onClick,
  children,
  ...props
}: WhatsAppLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('whatsapp');

  return (
    <a
      href={getWhatsAppLink(type, locale, contact)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackWhatsAppClick({ type, page: pathname, placement, locale, contact });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
      <span className="sr-only"> {t('opensInNewTab')}</span>
    </a>
  );
}

/** WhatsApp CTA styled as the signature offset button. */
export function WhatsAppButton({
  variant,
  size,
  className,
  children,
  icon = false,
  ...props
}: WhatsAppLinkProps & ButtonVariantProps & { icon?: boolean }) {
  return (
    <WhatsAppLink className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {icon ? <WhatsAppIcon className="size-5" /> : null}
      <span>{children}</span>
      <ButtonArrow />
    </WhatsAppLink>
  );
}
