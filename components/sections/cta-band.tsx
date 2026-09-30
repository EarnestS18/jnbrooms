import { ScrollText } from '@/components/motion/scroll-text';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import type { WhatsAppEnquiryType } from '@/config/contact';
import { cn } from '@/lib/utils';

/**
 * Full-bleed WhatsApp CTA band with scroll-linked headline. Red by default; pass
 * tone="black" on pages that already spend their one full-bleed red section elsewhere.
 */
export function CtaBand({
  headline,
  button,
  type = 'partnership',
  placement = 'cta-band',
  tone = 'red',
}: {
  headline: string;
  button: string;
  type?: WhatsAppEnquiryType;
  placement?: string;
  tone?: 'red' | 'black';
}) {
  return (
    <section
      className={cn(
        'on-dark overflow-hidden py-24 text-white lg:py-36',
        tone === 'red' ? 'bg-red' : 'bg-black',
      )}
    >
      <ScrollText from="5%" to="-5%">
        <h2 className="px-4 font-display text-display font-extrabold tracking-tight uppercase sm:px-6 lg:px-10">
          {headline}
        </h2>
      </ScrollText>
      <Container>
        <Reveal className="mt-12 lg:mt-16">
          <WhatsAppButton
            type={type}
            placement={placement}
            variant={tone === 'red' ? 'inverse' : 'primary'}
            size="lg"
            icon
          >
            {button}
          </WhatsAppButton>
        </Reveal>
      </Container>
    </section>
  );
}
