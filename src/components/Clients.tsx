import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CLIENTS } from '@/lib/clients';
import { SectionReveal } from './SectionReveal';

export function Clients() {
  const t = useTranslations('clients');
  // Duplicate the list so the translate(-50%) loop reads seamless.
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section
      id="studio"
      className="clients-section relative overflow-hidden border-b hairline"
    >
      {/* Backdrop EVERYBEAR wordmark. Fades in only when a tile is hovered
          (handled in globals.css via :has(.client-tile:hover)). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center select-none"
      >
        <span
          className="clients-backdrop font-condensed font-black uppercase leading-none tracking-[-0.04em] text-bone opacity-0 transition-opacity duration-700 ease-smooth whitespace-nowrap"
          style={{ fontSize: 'clamp(3rem, 16vw, 22rem)' }}
        >
          Everybear
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 pt-24 md:pt-40 pb-12 md:pb-20">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
            <h2 className="md:col-span-7 font-medium text-display-lg">
              {t('headline')}
            </h2>
            <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {t('lede')}
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Single marquee row — edge to edge. Only pauses when a tile is hovered. */}
      <div className="relative z-10 pb-24 md:pb-40">
        <div className="overflow-hidden">
          <div
            className="flex gap-3 md:gap-5 w-max marquee-track"
            style={{ animationDuration: '70s' }}
          >
            {items.map((c, i) => (
              <div
                key={`${c.slug}-${i}`}
                className="client-tile group/tile relative w-40 h-24 md:w-56 md:h-32 shrink-0 bg-bone rounded-md overflow-hidden transition-transform duration-500 ease-smooth hover:scale-[1.08] hover:z-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
              >
                <Image
                  src={`/clients/${c.slug}.png`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-contain p-4 md:p-6 transition-transform duration-500 ease-smooth group-hover/tile:scale-[1.08]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
