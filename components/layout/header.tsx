'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/icons/logo';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { CtaLink } from '@/components/ui/cta-link';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import { navigation, type NavKey } from '@/config/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openKey, setOpenKey] = useState<NavKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Partial<Record<NavKey, HTMLButtonElement | null>>>({});

  // Desktop: slide the header away while scrolling down, bring it back on any scroll up.
  // Small movements are ignored so trackpad jitter doesn't make it flicker.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y <= 120) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (Math.abs(y - lastY) < 8) return;
      setHidden(y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  };
  const open = (key: NavKey) => {
    cancelClose();
    setOpenKey(key);
  };

  const closeAndFocus = useCallback(() => {
    if (!openKey) return;
    const trigger = triggerRefs.current[openKey];
    setOpenKey(null);
    trigger?.focus();
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAndFocus();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openKey, closeAndFocus]);

  const solid = scrolled || openKey !== null;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,color,translate] duration-300 ease-athletic motion-reduce:transition-none',
        solid
          ? 'bg-white text-black'
          : 'on-dark bg-gradient-to-b from-black/60 to-transparent text-white',
        // Stays put while a mega menu is open or keyboard focus is inside it.
        hidden && openKey === null && 'lg:-translate-y-full lg:focus-within:translate-y-0',
      )}
      onMouseLeave={scheduleClose}
    >
      {/* Brand rule: 4px red line along the bottom of the header. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-red" />
      <a
        href="#main"
        className="sr-only z-[60] bg-black px-4 py-3 font-display font-bold text-white uppercase focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        {t('skipToContent')}
      </a>

      <div className="mx-auto grid h-[var(--header-height)] max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        {/* White logo over the black hero, black once the header turns white. */}
        <Link href="/" aria-label={t('homeLink')} className="justify-self-start py-2">
          <Logo tone="white" priority className={cn('h-8 lg:h-10', solid && 'hidden')} />
          <Logo tone="black" className={cn('h-8 lg:h-10', !solid && 'hidden')} />
        </Link>

        {/* Desktop navigation + mega menu */}
        <nav aria-label={t('mainNavigation')} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {navigation.map((item) => {
              const panelId = `mega-${item.key}`;
              const expanded = openKey === item.key;
              return (
                <li
                  key={item.key}
                  className="flex items-center"
                  onMouseEnter={() => open(item.key)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'relative py-2 pl-2 font-display text-[1.05rem] font-bold tracking-[0.08em] uppercase',
                      'after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-red after:transition-transform after:duration-300 after:ease-athletic hover:after:scale-x-100',
                      isActive(item.href) && 'after:scale-x-100',
                    )}
                  >
                    {t(item.key)}
                  </Link>
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[item.key] = el;
                    }}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    aria-label={t('submenu', { page: t(item.key) })}
                    onClick={() => (expanded ? setOpenKey(null) : open(item.key))}
                    className="p-2"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'size-4 transition-transform duration-300',
                        expanded && 'rotate-180',
                      )}
                    />
                  </button>

                  <div
                    id={panelId}
                    hidden={!expanded}
                    onMouseEnter={cancelClose}
                    className="absolute inset-x-0 top-full border-y border-black/10 bg-white text-black"
                  >
                    <MegaPanel item={item} />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end sm:gap-5">
          <LanguageToggle className="hidden sm:flex" />
          <CtaLink href="/partner" size="sm" variant="primary" className="hidden md:inline-flex">
            {t('partnerCta')}
          </CtaLink>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="-mr-2 flex size-11 items-center justify-center lg:hidden"
                aria-label={t('openMenu')}
              >
                <Menu className="size-7" aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {mobileOpen ? (
                <Dialog.Portal forceMount>
                  <Dialog.Content forceMount asChild aria-describedby={undefined}>
                    <motion.div
                      className="on-dark fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-black text-white"
                      initial={{ opacity: 0, y: '-4%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '-4%' }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Dialog.Title className="sr-only">{t('mainNavigation')}</Dialog.Title>
                      <MobileMenu onNavigate={() => setMobileOpen(false)} />
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              ) : null}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function MegaPanel({ item }: { item: (typeof navigation)[number] }) {
  const t = useTranslations('nav');
  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-10 py-12">
      <div className="col-span-4">
        <p className="eyebrow text-black/70">{t(item.key)}</p>
        <p className="mt-4 max-w-sm font-display text-4xl leading-[0.95] font-bold uppercase">
          {t(`megaIntro.${item.key}`)}
        </p>
        <Link
          href={item.href}
          className="group/btn mt-6 inline-flex items-center gap-2 border-b-2 border-black pb-1 font-display font-bold tracking-[0.08em] uppercase hover:text-black/70"
        >
          {t('goToPage', { page: t(item.key) })}
          <span aria-hidden="true" className="transition-transform group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
      <ul className="col-span-8 grid grid-cols-2 content-start gap-x-10 border-l border-black/10 pl-10">
        {item.sections.map((section) => (
          <li key={section} className="border-b border-black/10">
            <Link
              href={`${item.href}#${section}`}
              className="group flex items-center justify-between py-4 font-display text-2xl font-bold uppercase transition-colors hover:text-red"
            >
              {t(`sections.${section}`)}
              <span
                aria-hidden="true"
                className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations('nav');
  const tc = useTranslations('contact');
  return (
    <>
      <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label={t('homeLink')} onClick={onNavigate}>
          <Logo tone="white" className="h-8" />
        </Link>
        <Dialog.Close
          className="-mr-2 flex size-11 items-center justify-center"
          aria-label={t('closeMenu')}
        >
          <X className="size-7" aria-hidden="true" />
        </Dialog.Close>
      </div>

      <nav aria-label={t('mainNavigation')} className="flex-1 px-4 pt-6 pb-10 sm:px-6">
        <ul className="space-y-8">
          {navigation.map((item, i) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.06 }}
            >
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block font-display text-5xl leading-none font-extrabold uppercase"
              >
                {t(item.key)}
              </Link>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {item.sections.map((section) => (
                  <li key={section}>
                    <Link
                      href={`${item.href}#${section}`}
                      onClick={onNavigate}
                      className="inline-block py-1 text-sm font-medium tracking-wide text-white/75 uppercase hover:text-white"
                    >
                      {t(`sections.${section}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="space-y-6 border-t border-white/15 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <CtaLink
            href="/partner"
            variant="primary"
            onClick={onNavigate}
            className="w-full sm:w-auto"
          >
            {t('partnerCta')}
          </CtaLink>
          <WhatsAppButton
            type="general"
            placement="mobile-menu"
            variant="outline-inverse"
            icon
            className="w-full sm:w-auto"
          >
            {tc('mainCta')}
          </WhatsAppButton>
        </div>
        <LanguageToggle />
      </div>
    </>
  );
}
