import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import '../globals.css';

/**
 * Helvetica Neue, split out of the brand-supplied TTC.
 * Single family for everything, Latin only; Arabic falls back to system stack.
 */
const helvetica = localFont({
  src: [
    { path: '../../../public/fonts/helvetica-neue-thin.ttf', weight: '100', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-thin-italic.ttf', weight: '100', style: 'italic' },
    { path: '../../../public/fonts/helvetica-neue-ultralight.ttf', weight: '200', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-ultralight-italic.ttf', weight: '200', style: 'italic' },
    { path: '../../../public/fonts/helvetica-neue-light.ttf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-light-italic.ttf', weight: '300', style: 'italic' },
    { path: '../../../public/fonts/helvetica-neue-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-italic.ttf', weight: '400', style: 'italic' },
    { path: '../../../public/fonts/helvetica-neue-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-medium-italic.ttf', weight: '500', style: 'italic' },
    { path: '../../../public/fonts/helvetica-neue-bold.ttf', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-bold-italic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

/** Condensed cuts, used for the slogan and very heavy display moments. */
const helveticaCondensed = localFont({
  src: [
    { path: '../../../public/fonts/helvetica-neue-condensed-bold.ttf', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/helvetica-neue-condensed-black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Everybear · Brand, packaging, signage, events.',
  description:
    'A full-service advertising agency. We design and build brand work that earns a second look.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${helvetica.variable} ${helveticaCondensed.variable}`}
    >
      <body className="bg-ink text-bone min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
