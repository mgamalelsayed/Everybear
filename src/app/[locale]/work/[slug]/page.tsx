import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BRANDS, findBrand, nextBrand, type Brand, type GalleryItem } from '@/lib/work';
import { SectionReveal } from '@/components/SectionReveal';
import { Arrow } from '@/components/icons/Arrow';

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = findBrand(slug);
  if (!brand) return {};
  return {
    title: `${brand.client} · Everybear case study`,
    description: brand.overviewEn[0],
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const brand = findBrand(slug);
  if (!brand) notFound();
  await getTranslations('work');
  return <WorkPageContent brand={brand} />;
}

function WorkPageContent({ brand }: { brand: Brand }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('work');
  const next = nextBrand(brand.slug);

  const client = isAr ? brand.clientAr : brand.client;
  const tag = isAr ? brand.tagAr : brand.tagEn;
  const scope = isAr ? brand.scopeAr : brand.scopeEn;
  const overview = isAr ? brand.overviewAr : brand.overviewEn;
  const tagline = isAr ? brand.taglineAr : brand.taglineEn;
  const nextClient = isAr ? next.clientAr : next.client;

  return (
    <>
      {/* Hero: giant backplate name behind a floating hero card */}
      <section className="relative pt-36 md:pt-48 pb-12 md:pb-16 overflow-hidden">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-bone/55 hover:text-bone transition-colors mb-12"
            >
              <span className="inline-block rotate-180">
                <Arrow className="w-4 h-4" />
              </span>
              {t('allWork')}
            </Link>
          </SectionReveal>

          <div className="relative">
            {/* Backplate name */}
            <SectionReveal>
              <p
                aria-hidden
                className="pointer-events-none select-none absolute -top-8 md:-top-16 left-1/2 -translate-x-1/2 font-condensed font-black uppercase leading-none tracking-[-0.04em] whitespace-nowrap text-bone/[0.07]"
                style={{ fontSize: 'clamp(5rem, 20vw, 20rem)' }}
              >
                {client}
              </p>
            </SectionReveal>

            {/* Floating hero card */}
            <SectionReveal delay={0.1}>
              <div className="relative max-w-4xl mx-auto mt-12 md:mt-20">
                <div className="relative aspect-[16/10] md:aspect-[16/9] bg-white/90 rounded-xl overflow-hidden shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
                  <Image
                    src={brand.hero}
                    alt={client}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain p-8 md:p-14"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Title + scope chips */}
          <SectionReveal delay={0.2}>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="font-medium text-[11px] uppercase tracking-[0.3em] text-bone/55 mb-4">
                  {tag}
                </p>
                <h1 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg">
                  {client}
                </h1>
              </div>
              <ul className="flex flex-wrap gap-2 md:justify-end max-w-md">
                {scope.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-bone/15 bg-bone/5 backdrop-blur-sm px-4 py-2 text-xs md:text-sm text-bone/85"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal className="md:col-span-3">
              <p className="font-medium text-[11px] uppercase tracking-[0.3em] text-bone/55">
                {t('overview')}
              </p>
            </SectionReveal>
            <div className="md:col-span-8 md:col-start-5 space-y-8">
              {overview.map((para, i) => (
                <SectionReveal key={i} delay={0.05 + i * 0.05}>
                  <p className="text-lg md:text-2xl leading-relaxed text-bone/90">
                    {para}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote tagline */}
      <section className="py-14 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <p className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.03em] text-display-lg max-w-5xl">
              {tagline}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-12 md:pb-20">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <p className="font-medium text-[11px] uppercase tracking-[0.3em] text-bone/55 mb-10 md:mb-14">
              {t('fromStudio')}
            </p>
          </SectionReveal>
          <Gallery items={brand.gallery} alt={client} />
        </div>
      </section>

      {/* Next project */}
      <section className="border-t hairline">
        <Link
          href={`/work/${next.slug}`}
          className="group block overflow-hidden"
        >
          <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24 flex items-center justify-between gap-8">
            <div className="min-w-0">
              <p className="font-medium text-[11px] uppercase tracking-[0.3em] text-bone/55 mb-4">
                {t('nextProject')}
              </p>
              <p className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,10vw,10rem)] truncate text-bone/40 group-hover:text-bone transition-colors duration-700 group-hover:translate-x-3 ease-smooth">
                {nextClient}
              </p>
            </div>
            <span className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-bone text-ink shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-x-2 group-hover:-rotate-45">
              <Arrow className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}

function Gallery({ items, alt }: { items: GalleryItem[]; alt: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[minmax(180px,_24vw)] md:auto-rows-[minmax(220px,_18vw)]">
      {items.map((item, i) => {
        const span =
          item.layout === 'wide'
            ? 'col-span-2'
            : item.layout === 'tall'
              ? 'row-span-2'
              : '';
        return (
          <SectionReveal key={item.src} delay={Math.min(i, 6) * 0.04}>
            <div
              className={`group relative overflow-hidden rounded-xl bg-white/90 ${span} h-full shadow-[0_30px_60px_-35px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-smooth hover:scale-[1.02]`}
            >
              <Image
                src={item.src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-4 md:p-6 transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
              />
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
