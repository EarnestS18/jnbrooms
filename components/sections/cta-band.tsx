import { ScrollText } from '@/components/motion/scroll-text';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import type { WhatsAppEnquiryType } from '@/config/contact';

/** Full-bleed black CTA band with scroll-linked headline and a WhatsApp CTA. */
export function CtaBand({
  headline,
  button,
  type = 'partnership',
  placement = 'cta-band',
}: {
  headline: string;
  button: string;
  type?: WhatsAppEnquiryType;
  placement?: string;
}) {
  return (
    <section className="on-dark overflow-hidden bg-ink py-24 text-paper lg:py-36">
      <ScrollText from="5%" to="-5%">
        <h2 className="px-4 font-display text-display font-extrabold tracking-tight uppercase sm:px-6 lg:px-10">
          {headline}
        </h2>
      </ScrollText>
      <Container>
        <Reveal className="mt-12 lg:mt-16">
          <WhatsAppButton type={type} placement={placement} variant="inverse" size="lg" icon>
            {button}
          </WhatsAppButton>
        </Reveal>
      </Container>
    </section>
  );
}
