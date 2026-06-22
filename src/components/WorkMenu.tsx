'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';

const ease = [0.6, 0.05, 0.05, 1] as const;

export function WorkMenu() {
  const t = useTranslations('nav');
  const tWork = useTranslations('work');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      <button
        type="button"
        className="focus-ring text-[13px] tracking-wide opacity-90 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {t('work')}
        <span
          aria-hidden
          className={`text-[10px] rtl:text-sm transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop blur extender for breathing room, non-blocking */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-20 md:top-36 z-40 h-px bg-line"
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              role="menu"
              className="fixed inset-x-0 top-20 md:top-36 z-40 bg-ink/95 backdrop-blur-md border-b hairline"
            >
              <div className="mx-auto max-w-wide px-6 md:px-10 py-10 md:py-12">
                <div className="flex items-baseline justify-between mb-6 md:mb-8">
                  <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.25em] rtl:tracking-normal text-bone/55">
                    {tWork('selected')}
                  </p>
                  <Link
                    href="/work"
                    onClick={() => setOpen(false)}
                    className="focus-ring text-[11px] rtl:text-sm font-medium uppercase tracking-[0.25em] rtl:tracking-normal text-bone/55 hover:text-bone transition-colors inline-flex items-center gap-2"
                  >
                    {tWork('allWork')}
                    <span aria-hidden className="inline-block rtl:rotate-180">→</span>
                  </Link>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {BRANDS.map((brand) => (
                    <li key={brand.slug}>
                      <Link
                        href={`/work/${brand.slug}`}
                        onClick={() => setOpen(false)}
                        className="focus-ring group block"
                        role="menuitem"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface">
                          <Image
                            src={brand.hero}
                            alt={brand.client}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="mt-4">
                          <p className="text-base md:text-lg font-medium group-hover:text-bone transition-colors">
                            {isAr ? brand.clientAr : brand.client}
                          </p>
                          <p className="mt-1 text-xs md:text-sm text-bone/85">
                            {isAr ? brand.tagAr : brand.tagEn}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
