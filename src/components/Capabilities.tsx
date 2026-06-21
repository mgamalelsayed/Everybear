import { useTranslations } from 'next-intl';
import { SectionReveal } from './SectionReveal';

const KEYS = ['packaging', 'branding', 'production', 'cnc', 'events'] as const;

export function Capabilities() {
  const t = useTranslations('capabilities');

  return (
    <section id="capabilities" className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
            <h2 className="md:col-span-7 font-medium text-display-lg">
              {t('headline')}
            </h2>
            <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {t('lede')}
            </p>
          </div>
        </SectionReveal>

        <ul className="border-y hairline">
          {KEYS.map((key, i) => (
            <SectionReveal key={key} delay={i * 0.04}>
              <li className="group border-b hairline last:border-b-0">
                <div className="grid grid-cols-12 gap-6 py-8 md:py-10 items-baseline">
                  <span className="col-span-2 md:col-span-1 font-medium text-xs text-bone/55 tabular-nums pt-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-10 md:col-span-5 text-display-md font-medium transition-colors">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="col-span-12 md:col-span-5 md:col-start-8 text-base md:text-lg text-bone/80 leading-relaxed rtl:leading-[1.85]">
                    {t(`items.${key}.body`)}
                  </p>
                </div>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
