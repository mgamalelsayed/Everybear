'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';

const ease = [0.65, 0.02, 0.05, 1] as const;

export function MobileMenu() {
  const t = useTranslations('nav');
  const tWork = useTranslations('work');
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={isAr ? 'فتح القائمة' : 'Open menu'}
        aria-expanded={open}
        className="focus-ring inline-flex flex-col gap-1.5 p-2 -mr-2 rtl:-ml-2 rtl:mr-0"
      >
        <span className="block w-6 h-px bg-bone" />
        <span className="block w-6 h-px bg-bone" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col h-full">
              {/* Top bar with close */}
              <div className="flex items-center justify-end px-6 h-24">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={isAr ? 'إغلاق القائمة' : 'Close menu'}
                  className="focus-ring relative w-10 h-10 -mr-2 rtl:-ml-2 rtl:mr-0"
                >
                  <span className="absolute inset-0 m-auto block w-6 h-px bg-bone rotate-45" />
                  <span className="absolute inset-0 m-auto block w-6 h-px bg-bone -rotate-45" />
                </button>
              </div>

              {/* Primary nav */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
                className="flex-1 overflow-y-auto px-6 pt-4 pb-10"
              >
                <ul className="space-y-2">
                  {[
                    { href: '/work', label: t('work') },
                    { href: '/#capabilities', label: t('capabilities') },
                    { href: '/studio', label: t('studio') },
                    { href: '/connect', label: t('connect') },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="focus-ring block font-condensed font-black uppercase text-[12vw] leading-[1.05] tracking-[-0.02em] rtl:leading-[1.1] rtl:tracking-normal py-2 hover:opacity-70 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Work shortcut list */}
                <div className="mt-12 pt-8 border-t hairline">
                  <p className="font-medium text-[11px] uppercase tracking-[0.25em] rtl:tracking-normal text-bone/55 mb-5">
                    {tWork('selected')}
                  </p>
                  <ul className="space-y-3">
                    {BRANDS.map((brand) => (
                      <li key={brand.slug}>
                        <Link
                          href={`/work/${brand.slug}`}
                          className="focus-ring inline-flex items-center justify-between w-full py-1 text-lg text-bone/85 hover:text-bone transition-colors"
                        >
                          <span>{isAr ? brand.clientAr : brand.client}</span>
                          <span aria-hidden className="text-bone/40 ms-3 inline-block rtl:rotate-180">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.nav>

              {/* Footer in menu */}
              <div className="px-6 pb-10 border-t hairline pt-6 text-sm text-bone/55 space-y-1">
                <a href="mailto:info@everybear.net" className="block hover:text-bone transition-colors">
                  info@everybear.net
                </a>
                <a href="tel:+201229094992" dir="ltr" className="block hover:text-bone transition-colors">
                  +20 122 909 4992
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
