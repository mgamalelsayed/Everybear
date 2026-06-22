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
  // Pre-fetch translations on the server for the client child
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
      {/* Hero */}
      <section className="relative pt-40 md:pt-56 pb-16 md:pb-24 border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] rtl:tracking-normal text-bone/55 hover:text-bone transition-colors mb-10"
            >
              <span className="inline-block rotate-180 rtl:rotate-0">
                <Arrow className="w-4 h-4" />
              </span>
              {t('allWork')}
            </Link>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-6">
              {tag}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.02em] rtl:leading-[1.1] rtl:tracking-normal text-display-xl">
              {client}
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <ul className="mt-12 md:mt-16 flex flex-wrap gap-2 max-w-3xl">
              {scope.map((s) => (
                <li
                  key={s}
                  className="rounded-full border hairline px-4 py-2 text-xs md:text-sm text-bone/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Cover image */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-10 md:py-16">
          <SectionReveal>
            <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-card bg-surface">
              <Image
                src={brand.hero}
                alt={client}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-contain p-8 md:p-16"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <SectionReveal>
              <p className="md:col-span-4 font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55">
                {t('overview')}
              </p>
            </SectionReveal>
            <div className="md:col-span-7 md:col-start-6 space-y-6">
              {overview.map((para, i) => (
                <SectionReveal key={i} delay={0.05 + i * 0.05}>
                  <p className="text-base md:text-xl leading-relaxed text-bone/90">
                    {para}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote / tagline */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-32 md:py-44">
          <SectionReveal>
            <p className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.025em] rtl:leading-[1.15] rtl:tracking-normal text-display-lg max-w-4xl">
              {tagline}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24">
          <SectionReveal>
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-10 md:mb-14">
              {t('fromStudio')}
            </p>
          </SectionReveal>
          <Gallery items={brand.gallery} alt={client} />
        </div>
      </section>

      {/* Next project */}
      <section>
        <Link
          href={`/work/${next.slug}`}
          className="group block bg-surface hover:bg-surface-2 transition-colors"
        >
          <div className="mx-auto max-w-wide px-6 md:px-10 py-20 md:py-28 flex items-center justify-between gap-8">
            <div className="min-w-0">
              <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-4">
                {t('nextProject')}
              </p>
              <p className="font-condensed font-black uppercase leading-none tracking-[-0.025em] rtl:leading-[1.1] rtl:tracking-normal text-display-lg truncate">
                {nextClient}
              </p>
            </div>
            <span
              aria-hidden
              className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-bone text-ink rtl:rotate-180 transition-transform duration-500 ease-smooth group-hover:translate-x-2 rtl:group-hover:-translate-x-2 shrink-0"
            >
              <Arrow className="w-5 h-5 md:w-6 md:h-6" />
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
            <div className={`relative overflow-hidden rounded-card bg-surface ${span} h-full`}>
              <Image
                src={item.src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-4 md:p-6"
              />
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
