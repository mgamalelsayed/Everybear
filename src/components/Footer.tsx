import { useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { Arrow } from './icons/Arrow';
import { BOOK_A_CALL_URL, SOCIAL } from '@/lib/links';

export function Footer() {
  const t = useTranslations('footer');
  const offices = t.raw('officesList') as string[];

  return (
    <footer className="relative bg-ink text-bone border-t hairline overflow-hidden">
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-24">
        {/* Big email CTA */}
        <div className="mb-16 md:mb-24">
          <a
            href="mailto:info@everybear.net"
            className="focus-ring group inline-flex items-center gap-4 md:gap-6"
          >
            <span className="font-condensed font-black uppercase leading-none tracking-[-0.03em] text-[clamp(2rem,6.5vw,6rem)]">
              info@everybear.net
            </span>
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-bone text-ink shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-x-2 group-hover:-rotate-45">
              <Arrow className="w-5 h-5 md:w-7 md:h-7" />
            </span>
          </a>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 pb-16 md:pb-20 border-b hairline">
          <div className="col-span-2 md:col-span-4">
            <Logo variant="full" className="h-12 md:h-16 w-auto" />
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <p className="font-medium text-[11px] uppercase tracking-widest text-bone/45 mb-4">
              {t('offices')}
            </p>
            <ul className="space-y-1.5 text-sm md:text-base">
              {offices.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-[11px] uppercase tracking-widest text-bone/45 mb-4">
              {t('contact')}
            </p>
            <ul className="space-y-1.5 text-sm md:text-base">
              <li>
                <a href="tel:+201229094992" dir="ltr" className="inline-block hover:opacity-70 transition-opacity">
                  +20 122 909 4992
                </a>
              </li>
              <li className="text-bone/60">St. 206, Villa 8</li>
              <li className="text-bone/60">Maadi, Cairo</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-[11px] uppercase tracking-widest text-bone/45 mb-4">
              {t('social')}
            </p>
            <ul className="space-y-1.5 text-sm md:text-base">
              <li>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={BOOK_A_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rights bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-medium text-[11px] text-bone/45 uppercase tracking-widest">
          <p>{t('rights')}</p>
          <p>{t('builtIn')}</p>
        </div>
      </div>

      {/* Giant cropped wordmark bleeding off the bottom edge */}
      <div
        aria-hidden
        className="relative overflow-hidden select-none pointer-events-none"
      >
        <p
          lang="en"
          className="font-condensed font-black uppercase leading-none tracking-[-0.03em] text-bone/[0.06] whitespace-nowrap text-center"
          style={{ fontSize: 'clamp(4rem, 14vw, 18rem)', transform: 'translateY(24%)' }}
        >
          Everybear Everywhere
        </p>
      </div>
    </footer>
  );
}
