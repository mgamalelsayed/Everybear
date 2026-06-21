import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';
import { SectionReveal } from '@/components/SectionReveal';

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkIndexContent />;
}

function WorkIndexContent() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <>
      {/* Header */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-24 border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <p className="font-medium text-[11px] uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-6">
              {isAr ? 'كل الأعمال' : 'All work'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h1 className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.02em] rtl:leading-[1.1] rtl:tracking-normal text-display-xl">
              {isAr ? 'الغرف التي تركنا فيها صدى.' : 'Rooms we made noise in.'}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="mt-10 md:mt-14 max-w-2xl text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {isAr
                ? 'مجموعة مختارة من المشاريع التي تعكس كيف نُطلق العلامات ونُجدّدها ونُنقذها. لكل مشروع قصته الخاصّة، ولكنّها جميعًا تشترك في الحِرفة.'
                : 'A curated set of projects across packaging, branding, signage, and events. Every project is its own story, all of them share one thing: craft.'}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {BRANDS.map((brand, i) => {
              const client = isAr ? brand.clientAr : brand.client;
              const tag = isAr ? brand.tagAr : brand.tagEn;
              return (
                <SectionReveal key={brand.slug} delay={(i % 2) * 0.06}>
                  <li>
                    <Link href={`/work/${brand.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
                        <Image
                          src={brand.hero}
                          alt={client}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-6 md:p-10 transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-6 md:mt-8 grid grid-cols-12 gap-4 items-baseline">
                        <p className="col-span-8 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-2xl md:text-4xl">
                          {client}
                        </p>
                        <span className="col-span-4 justify-self-end font-medium text-xs uppercase tracking-widest rtl:tracking-normal text-bone/55 inline-flex items-center gap-2 shrink-0">
                          {isAr ? 'دراسة الحالة' : 'Case study'}
                          <span
                            aria-hidden
                            className="inline-block rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                          >
                            →
                          </span>
                        </span>
                        <p className="col-span-12 mt-1 text-sm md:text-base text-bone/85">
                          {tag}
                        </p>
                      </div>
                    </Link>
                  </li>
                </SectionReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <h2 className="md:col-span-7 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-display-lg">
              {t('ctaBlock.headline')}
            </h2>
            <div className="md:col-span-5 md:justify-self-end">
              <Link
                href="/connect"
                className="focus-ring group inline-flex items-center gap-4 bg-bone text-ink rounded-full ps-7 pe-3 py-3 text-base md:text-lg font-medium hover:scale-[1.02] transition-all duration-300 ease-smooth"
              >
                {t('ctaBlock.ctaPrimary')}
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-ink text-bone rtl:rotate-180 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-[18px] md:h-[18px]">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
