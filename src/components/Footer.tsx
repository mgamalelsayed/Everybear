import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Logo } from './Logo';
import { Arrow } from './icons/Arrow';

export function Footer() {
  const t = useTranslations('footer');
  const offices = t.raw('officesList') as string[];

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-6">
          <div className="col-span-2 md:col-span-5">
            <Logo variant="full" className="h-36 md:h-48 w-auto mb-12" />
            <Link
              href="/connect"
              className="focus-ring inline-block text-display-md font-medium group"
            >
              info@everybear.net
              <span className="ms-2 inline-block rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                <Arrow className="w-5 h-5 md:w-6 md:h-6" />
              </span>
            </Link>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-4">
              {t('offices')}
            </p>
            <ul className="space-y-1 text-sm">
              {offices.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-4">
              {t('contact')}
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="tel:+201229094992" dir="ltr" className="inline-block hover:opacity-90 transition-opacity">
                  +20 122 909 4992
                </a>
              </li>
              <li className="text-bone/85">St. 206, Villa 8</li>
              <li className="text-bone/85">Maadi, Cairo</li>
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-4">
              {t('social')}
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://instagram.com/everybearagency"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t hairline flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-medium text-[11px] rtl:text-sm text-bone/55 uppercase tracking-widest rtl:tracking-normal">
          <p>{t('rights')}</p>
          <p>{t('builtIn')}</p>
        </div>
      </div>
    </footer>
  );
}
