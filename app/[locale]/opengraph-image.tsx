import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export const alt = 'J&B Rooms — Hotel Management';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0E2A47',
        color: '#FFF1E0',
        padding: '72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
        J&amp;B ROOMS
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 0.95,
          textTransform: 'uppercase',
          letterSpacing: -2,
          maxWidth: 1000,
        }}
      >
        {t('headline')}
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#FFC93C' }}
      >
        <div style={{ width: 56, height: 6, background: '#FF6B2C' }} />
        {t('label').toUpperCase()}
      </div>
    </div>,
    size,
  );
}
