// The real root layout lives in app/[locale]/layout.tsx (it renders <html lang>).
// This passthrough exists so that app/not-found.tsx can render for non-localized URLs.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
