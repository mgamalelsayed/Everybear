import { useTranslations } from 'next-intl';
import { BOOK_A_CALL_URL } from '@/lib/links';

export function FounderCard() {
  const t = useTranslations('connect.founder');

  return (
    <div className="rounded-card bg-surface border hairline p-5 md:p-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 md:gap-5">
        <div
          aria-hidden
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-bone/90 to-bone/40 text-ink grid place-items-center text-sm font-semibold shrink-0"
        >
          AS
        </div>
        <div className="min-w-0">
          <p className="text-[11px] rtl:text-sm font-medium uppercase tracking-widest rtl:tracking-normal text-bone/55">
            {t('name')}
          </p>
          <p className="text-base md:text-lg font-medium truncate">
            {t('caption')}
          </p>
        </div>
      </div>

      <a
        href={BOOK_A_CALL_URL}
        target="_blank"
        rel="noreferrer"
        className="focus-ring shrink-0 inline-flex items-center justify-center rounded-full bg-bone text-ink text-xs md:text-sm px-4 md:px-5 py-2.5 hover:bg-white transition-colors"
      >
        {t('cta')}
      </a>
    </div>
  );
}
