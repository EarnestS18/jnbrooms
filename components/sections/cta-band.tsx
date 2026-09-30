import { ScrollText } from '@/components/motion/scroll-text';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { WhatsAppButton } from '@/components/whatsapp/whatsapp-link';
import type { WhatsAppEnquiryType } from '@/config/contact';
import { cn } from '@/lib/utils';

/**
 * Full-bleed CTA band with scroll-linked headline and a WhatsApp CTA.
 * `tone` lets pages keep the navy → cream → orange → cream section rhythm.
 */
export function CtaBand({
  headline,
  button,
  type = 'partnership',
  placement = 'cta-band',
  tone = 'orange',
}: {
  headline: string;
  button: string;
  type?: WhatsAppEnquiryType;
  placement?: string;
  tone?: 'orange' | 'navy';
}) {
  return (
    <section
      className={cn(
        'overflow-hidden py-24 lg:py-36',
        tone === 'orange' ? 'on-orange bg-orange text-navy' : 'on-dark bg-navy text-cream',
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
            variant={tone === 'orange' ? 'navy' : 'inverse'}
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
