'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SectionReveal } from './SectionReveal';

const KEYS = ['packaging', 'branding', 'production', 'cnc', 'events'] as const;

const ease = [0.6, 0.05, 0.05, 1] as const;

/**
 * Capabilities — an accordion of disciplines.
 *
 * Each row is just the name until it is opened; the description lives inside
 * and is hidden while collapsed. One row is open at a time, because at this
 * type size several open at once would run past a screen.
 */
export function Capabilities() {
  const t = useTranslations('capabilities');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10">
        <SectionReveal>
          <div className="text-center mb-14 md:mb-20">
            <h2 className="font-condensed font-black uppercase text-display-section">
              {t('headline')}
            </h2>
            <p className="mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-bone/75 leading-relaxed">
              {t('lede')}
            </p>
          </div>
        </SectionReveal>

        <ul>
          {KEYS.map((key, i) => (
            <CapabilityRow
              key={key}
              index={i}
              k={key}
              t={t}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CapabilityRow({
  index,
  k,
  t,
  open,
  onToggle,
}: {
  index: number;
  k: (typeof KEYS)[number];
  t: (key: string) => string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `capability-panel-${k}`;
  const title = t(`items.${k}.title`);
  const body = t(`items.${k}.body`);

  return (
    <SectionReveal delay={Math.min(index, 4) * 0.05}>
      <li className="group border-b hairline first:border-t">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="focus-ring flex w-full items-center gap-5 md:gap-8 py-7 md:py-9 text-start"
        >
          <span className="font-medium text-xs md:text-sm text-bone/40 tabular-nums shrink-0">
            {index + 1}
          </span>

          <h3
            className={`flex-1 font-condensed font-black uppercase text-display-lg transition-colors duration-500 ease-smooth ${
              open ? 'text-bone' : 'text-bone/50 group-hover:text-bone'
            }`}
          >
            {title}
          </h3>

          {/* Plus that becomes a minus. Two bars, one rotates away. */}
          <span
            aria-hidden
            className="relative shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-bone/25 group-hover:border-bone/60 transition-colors duration-500"
          >
            <span className="absolute inset-0 m-auto block h-px w-3.5 md:w-4 bg-bone" />
            <span
              className={`absolute inset-0 m-auto block h-px w-3.5 md:w-4 bg-bone transition-transform duration-500 ease-smooth ${
                open ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <p className="ps-9 md:ps-14 pb-8 md:pb-10 max-w-2xl text-base md:text-lg text-bone/75 leading-relaxed">
                {body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    </SectionReveal>
  );
}
