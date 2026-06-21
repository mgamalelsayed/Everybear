import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CLIENTS } from '@/lib/clients';
import { SectionReveal } from './SectionReveal';

export function Clients() {
  const t = useTranslations('clients');

  return (
    <section id="studio" className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-20">
            <h2 className="md:col-span-7 font-medium text-display-lg">
              {t('headline')}
            </h2>
            <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {t('lede')}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-line border hairline">
            {CLIENTS.map((client) => (
              <li
                key={client.slug}
                className="group relative aspect-[5/3] bg-ink flex items-center justify-center p-6 md:p-7 transition-colors hover:bg-surface"
              >
                <Image
                  src={`/clients/${client.slug}.png`}
                  alt={client.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-contain p-6 md:p-7 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-smooth"
                />
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
