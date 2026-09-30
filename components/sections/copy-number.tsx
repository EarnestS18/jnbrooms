'use client';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

/** Copy-to-clipboard icon button with a "Copied" toast. */
export function CopyNumber({ value, label }: { value: string; label?: string }) {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(t('copied'), { description: t('copiedDescription') });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('copyFailed'));
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label ?? t('copyNumber')}
      title={label ?? t('copyNumber')}
      className="flex size-12 shrink-0 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-black"
    >
      {copied ? (
        <Check className="size-5" aria-hidden="true" />
      ) : (
        <Copy className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
