import type { Metadata } from 'next';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import QRCode from 'qrcode';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons/brand-icons';
import { MaskText } from '@/components/motion/mask-text';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { CopyNumber } from '@/components/sections/copy-number';
import { SectionHeading } from '@/components/sections/section-heading';
import { ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { WhatsAppButton, WhatsAppLink } from '@/components/whatsapp/whatsapp-link';
import { contact, getWhatsAppLink, type WhatsAppEnquiryType } from '@/config/contact';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'contact', '/contact');
}

const quickStart = [
  'partnership',
  'booking',
  'careers',
  'other',
] as const satisfies readonly WhatsAppEnquiryType[];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  // QR code is generated at build time (static page) as inline SVG.
  const qrSvg = await QRCode.toString(getWhatsAppLink('general', locale), {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#ffffff' },
  });

  return (
    <>
      {/* HERO + WHATSAPP */}
      <section id="whatsapp" className="on-dark bg-ink text-paper">
        <Container className="pt-[calc(var(--header-height)+4rem)] pb-20 lg:pb-28">
          <Reveal onMount as="p" className="eyebrow text-paper/75">
            {t('hero.label')}
          </Reveal>
          <MaskText
            as="h1"
            onMount
            delay={0.1}
            text={t('hero.headline')}
            className="mt-4 font-display text-hero font-extrabold tracking-tight uppercase"
          />
          <Reveal
            onMount
            delay={0.5}
            as="p"
            className="mt-8 max-w-2xl text-lg text-paper/80 lg:text-xl"
          >
            {t('hero.copy')}
          </Reveal>

          {/* TODO(launch): replace the placeholder WhatsApp number via NEXT_PUBLIC_WHATSAPP_NUMBER. */}
          <div className="mt-14 grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow flex items-center gap-2 text-paper/75">
                <WhatsAppIcon className="size-4" /> {t('whatsappLabel')}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <MaskText
                  as="p"
                  onMount
                  delay={0.6}
                  text={contact.whatsapp.display}
                  className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none font-extrabold tracking-tight"
                />
                <CopyNumber value={contact.whatsapp.display} />
              </div>

              <Reveal onMount delay={0.8} className="relative mt-10 inline-block">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border-2 border-paper opacity-0 motion-safe:animate-pulse-ring"
                />
                <WhatsAppButton
                  type="general"
                  placement="contact-main"
                  variant="inverse"
                  size="lg"
                  icon
                >
                  {t('mainCta')}
                </WhatsAppButton>
              </Reveal>

              <p className="mt-10 flex items-center gap-2 text-paper/80">
                <Clock className="size-4" aria-hidden="true" />
                <span className="font-display font-bold tracking-[0.08em] uppercase">
                  {t('hours.label')}:
                </span>
                {/* TODO(content): confirm WhatsApp operating hours. */}
                {t('hours.value')}
              </p>
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <figure className="ml-auto w-full max-w-[18rem] bg-paper p-5 text-ink">
                <div
                  role="img"
                  aria-label={t('qrAlt')}
                  className="aspect-square w-full [&_svg]:h-full [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <figcaption className="mt-4">
                  <span className="block font-display text-xl font-bold uppercase">
                    {t('qrTitle')}
                  </span>
                  <span className="mt-1 block text-sm text-steel-dark">{t('qrHint')}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* QUICK START */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading label={t('quickStart.label')} headline={t('quickStart.headline')} />
          <Stagger
            as="ul"
            gap={0.08}
            className="mt-12 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickStart.map((type, i) => (
              <StaggerItem as="li" key={type} className="bg-paper">
                <WhatsAppLink
                  type={type}
                  placement="contact-quick-start"
                  className="group/btn flex h-full min-h-48 flex-col justify-between p-6 transition-colors duration-300 hover:bg-ink hover:text-paper lg:p-8"
                >
                  <span className="font-display text-sm font-bold text-steel-dark transition-colors group-hover/btn:text-paper/70">
                    0{i + 1}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-display text-3xl leading-none font-extrabold uppercase">
                      {t(`quickStart.${type}`)}
                    </span>
                    <ButtonArrow className="size-7" />
                  </span>
                </WhatsAppLink>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* OFFICE + SECONDARY CONTACTS */}
      <section id="office" className="bg-mist py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading label={t('office.label')} headline={contact.office.name} />
            <Reveal className="mt-8">
              <address className="flex gap-3 text-lg not-italic">
                <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <span>
                  {contact.office.street}
                  <br />
                  {contact.office.city}
                </span>
              </address>
              <a
                href={contact.office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-display text-lg font-bold tracking-[0.08em] uppercase hover:text-steel-dark"
              >
                {t('office.directions')}
                <ButtonArrow className="size-4" />
              </a>
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="eyebrow text-steel-dark">{t('secondary.label')}</h2>
              {/* TODO(content): confirm email, phone, Instagram and LinkedIn. */}
              <ul className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
                <SecondaryItem
                  href={`mailto:${contact.email}`}
                  icon={<Mail className="size-4" />}
                  label={t('secondary.email')}
                  value={contact.email}
                />
                <SecondaryItem
                  href={contact.phone.href}
                  icon={<Phone className="size-4" />}
                  label={t('secondary.phone')}
                  value={contact.phone.display}
                />
                <SecondaryItem
                  href={contact.social.instagram}
                  external
                  icon={<InstagramIcon className="size-4" />}
                  label={t('secondary.instagram')}
                  value="Instagram"
                />
                <SecondaryItem
                  href={contact.social.linkedin}
                  external
                  icon={<LinkedInIcon className="size-4" />}
                  label={t('secondary.linkedin')}
                  value="LinkedIn"
                />
              </ul>
            </Reveal>
          </div>

          <Reveal className="relative min-h-[24rem] overflow-hidden bg-paper lg:col-span-7">
            <iframe
              src={contact.office.mapEmbedUrl}
              title={t('office.mapTitle')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale"
              allowFullScreen
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function SecondaryItem({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center justify-between gap-4 py-4 hover:text-steel-dark"
      >
        <span className="flex items-center gap-3">
          <span aria-hidden="true">{icon}</span>
          <span className="sr-only">{label}: </span>
          <span>{value}</span>
        </span>
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
