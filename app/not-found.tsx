'use client';

import NextError from 'next/error';

// Fallback for requests outside the [locale] segment.
export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
