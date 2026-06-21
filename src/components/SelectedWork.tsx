import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';
import { SectionReveal } from './SectionReveal';

export function SelectedWork() {
  const t = useTranslations('work');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [lead, ...rest] = BRANDS;

  return (
    <section id="work" className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
        <SectionReveal>
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <h2 className="font-medium text-display-lg max-w-2xl rtl:leading-[1.15]">
              {t('headline')}
            </h2>
            <span className="hidden md:block font-medium text-xs tracking-widest rtl:tracking-normal text-bone/55">
              {t('counter')}
            </span>
          </div>
        </SectionReveal>

        {/* Lead, first brand, full-width */}
        <SectionReveal>
          <BrandCard
            brand={lead}
            isAr={isAr}
            aspect="aspect-[16/10] md:aspect-[21/9]"
            featured
          />
        </SectionReveal>

        {/* Rest, 2-up grid */}
        <ul className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {rest.map((brand, i) => (
            <SectionReveal key={brand.slug} delay={i * 0.06}>
              <li>
                <BrandCard
                  brand={brand}
                  isAr={isAr}
                  aspect="aspect-[4/5] md:aspect-[4/3]"
                />
              </li>
            </SectionReveal>
          ))}
        </ul>

        <SectionReveal delay={0.2}>
          <div className="mt-20 flex">
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-3 text-sm border-b border-bone/40 pb-1 hover:border-bone hover:gap-5 transition-all duration-300"
            >
              {t('viewAll')}
              <span aria-hidden className="inline-block rtl:rotate-180">→</span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function BrandCard({
  brand,
  isAr,
  aspect,
  featured = false,
}: {
  brand: (typeof BRANDS)[number];
  isAr: boolean;
  aspect: string;
  featured?: boolean;
}) {
  const t = useTranslations('work');
  const client = isAr ? brand.clientAr : brand.client;
  const tag = isAr ? brand.tagAr : brand.tagEn;

  return (
    <Link href={`/work/${brand.slug}`} className="group block">
      <div className={`relative ${aspect} overflow-hidden rounded-card bg-surface`}>
        <Image
          src={brand.hero}
          alt={client}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 100vw, 90vw'
              : '(max-width: 768px) 100vw, 45vw'
          }
          priority={featured}
          className="object-contain p-6 md:p-10 transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6 md:mt-8 grid grid-cols-12 gap-4 items-baseline">
        <p
          className={`col-span-8 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal ${
            featured ? 'text-3xl md:text-6xl' : 'text-2xl md:text-4xl'
          }`}
        >
          {client}
        </p>
        <span className="col-span-4 justify-self-end font-medium text-xs uppercase tracking-widest rtl:tracking-normal text-bone/55 inline-flex items-center gap-2 shrink-0">
          {t('caseStudy')}
          <span
            aria-hidden
            className="inline-block rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </span>
        <p className="col-span-12 mt-1 text-sm md:text-base text-bone/85">{tag}</p>
      </div>
    </Link>
  );
}
