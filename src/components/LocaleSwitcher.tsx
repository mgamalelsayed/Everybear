'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = locale === 'en' ? 'ar' : 'en';
  const label = locale === 'en' ? 'AR' : 'EN';

  return (
    <button
      onClick={() => {
        startTransition(() => {
          router.replace(pathname, { locale: next });
        });
      }}
      disabled={isPending}
      className="focus-ring text-xs tracking-[0.2em] uppercase opacity-90 hover:opacity-100 transition-opacity"
      aria-label={`Switch language to ${next === 'ar' ? 'Arabic' : 'English'}`}
    >
      {label}
    </button>
  );
}
