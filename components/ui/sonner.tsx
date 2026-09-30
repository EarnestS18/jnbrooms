'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

/** shadcn/ui Sonner toaster, restyled square and monochrome. */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            '!rounded-none !border-0 !bg-black !text-white !shadow-none font-sans !gap-3 !px-5 !py-4',
          title: 'font-display !text-base font-bold uppercase tracking-[0.08em]',
          description: '!text-white/75',
        },
      }}
      {...props}
    />
  );
}
