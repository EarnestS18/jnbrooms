import { useTranslations } from 'next-intl';
import { Logo } from '@/components/icons/logo';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons/brand-icons';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { WhatsAppLink } from '@/components/whatsapp/whatsapp-link';
import { contact, whatsappContacts } from '@/config/contact';
import { navigation } from '@/config/navigation';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-4 pt-20 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={tn('homeLink')} className="inline-block">
              <Logo variant="stacked" tone="white" className="h-28 lg:h-32" />
            </Link>
            <p className="mt-5 max-w-sm text-white/75">{t('tagline')}</p>

            <div className="mt-10 space-y-5">
              <ul className="space-y-4">
                {whatsappContacts.map((c) => (
                  <li key={c.id}>
                    <WhatsAppLink
                      type="general"
                      placement="footer"
                      contact={c.id}
                      className="group inline-flex items-center gap-3 hover:text-white/75"
                    >
                      <WhatsAppIcon className="size-6 shrink-0" />
                      <span>
                        <span className="block font-display text-2xl leading-none font-bold tracking-wide">
                          {c.display}
                        </span>
                        <span className="mt-1 block text-sm text-white/70">{c.name}</span>
                      </span>
                    </WhatsAppLink>
                  </li>
                ))}
              </ul>
              <address className="text-white/75 not-italic">
                {contact.office.name}
                <br />
                {contact.office.full}
              </address>
            </div>
          </div>

          <nav aria-label={t('sitemap')} className="lg:col-span-8">
            <h2 className="sr-only">{t('sitemap')}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="font-display text-lg font-bold tracking-[0.08em] uppercase hover:text-white/75"
                  >
                    {tn(item.key)}
                  </Link>
                  <ul className="mt-4 space-y-2.5">
                    {item.sections.map((section) => (
                      <li key={section}>
                        <Link
                          href={`${item.href}#${section}`}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {tn(`sections.${section}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="sr-only">{t('follow')}</span>
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <LanguageToggle />
            <p className="text-sm text-white/70">{t('rights', { year })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
