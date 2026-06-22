'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LocaleSwitcher } from './LocaleSwitcher';
import { WorkMenu } from './WorkMenu';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Arrow } from './icons/Arrow';
import { useEffect, useState } from 'react';

export function Nav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-wide flex items-center justify-between px-6 md:px-10 h-20 md:h-36">
        <Link href="/" className="focus-ring inline-flex items-center" aria-label="Everybear, home">
          <Logo variant="icon" className="h-12 md:h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-wide">
          <WorkMenu />
          <Link href="/#capabilities" className="opacity-90 hover:opacity-100 transition-opacity">
            {t('capabilities')}
          </Link>
          <Link href="/studio" className="opacity-90 hover:opacity-100 transition-opacity">
            {t('studio')}
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <LocaleSwitcher />
          <Link
            href="/connect"
            className="focus-ring hidden md:inline-flex items-center text-[13px] tracking-wide group"
          >
            {t('connect')}
            <span className="ms-2 inline-block rtl:rotate-180 transition-transform duration-300 ease-smooth group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <Arrow className="w-3.5 h-3.5" />
            </span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
