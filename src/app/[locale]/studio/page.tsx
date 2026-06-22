import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionReveal } from '@/components/SectionReveal';
import { CtaButton } from '@/components/CtaButton';
import { CLIENTS } from '@/lib/clients';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Everybear is a full-service advertising agency. Founded by Amr Safwat. Strategy, design, and production under one workshop. Cairo, Doha, Toronto.',
};

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StudioContent />;
}

function StudioContent() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <>
      {/* Hero */}
      <section className="pt-40 md:pt-56 pb-24 md:pb-40 border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-6">
              {isAr ? 'الاستوديو' : 'Studio'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h1 className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.02em] rtl:leading-[1.1] rtl:tracking-normal text-display-xl max-w-[16ch]">
              {isAr
                ? 'علاماتٌ تُصنع باليد.'
                : 'Brands made by hand.'}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="mt-10 md:mt-14 max-w-2xl text-base md:text-xl text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {isAr
                ? 'إيفري بير ليس وكالة فحسب. إنّه قبيلة من المفكّرين والصنّاع والحالمين. فريقنا يجمع بين العقول المبدعة والأيادي الماهرة، تحت مهمّةٍ واحدة: بناء علامات تترك أثرًا.'
                : 'Everybear is more than an agency. It is a tribe of thinkers, makers, doers, and dreamers. Our team brings together a rare blend of creative minds and skilled hands, all united by one mission: to build brands that leave a mark.'}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <SectionReveal>
              <div className="md:col-span-5">
                <div
                  aria-hidden
                  className="relative aspect-[4/5] rounded-card bg-surface overflow-hidden flex items-end justify-start p-8 md:p-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-bone/8 via-transparent to-transparent" />
                  <div className="relative">
                    <p className="font-condensed font-black uppercase text-bone/15 text-[200px] leading-none">
                      AS
                    </p>
                    <p className="absolute bottom-2 left-0 right-0 font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55">
                      {isAr ? 'صورة عمرو صفوت ستُضاف هنا' : 'Photo of Amr Safwat goes here'}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <div className="md:col-span-6 md:col-start-7">
              <SectionReveal>
                <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-4">
                  {isAr ? 'المؤسّس' : 'Founder'}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.05}>
                <h2 className="font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-display-md md:text-display-lg mb-8">
                  {isAr ? 'عمرو صفوت' : 'Amr Safwat'}
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="space-y-5 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
                  <p>
                    {isAr
                      ? 'في قلب إيفري بير، عمرو صفوت. حِرفي شغوف ورجل أعمال بصير، وضع أساس الوكالة بيديه. حرفيًّا.'
                      : 'At the core of Everybear is Amr Safwat, a passionate craftsman and a visionary businessman who laid the foundation of the agency with his bare hands. Quite literally.'}
                  </p>
                  <p>
                    {isAr
                      ? 'من الأيّام الأولى، حوّل عمرو ورشةً متواضعة إلى مركز إبداعٍ ودقّة. قيادته العمليّة، إلى جانب فريقٍ يُشاركه إصراره وهَوسه بالتفاصيل، حوّلت المواد الخام إلى أفكارٍ تخطف الأنظار.'
                      : 'From the early days, Amr transformed a modest workshop into a powerhouse of creativity and precision. His hands-on leadership, coupled with a team that shares his grit and obsession with detail, turned raw materials into showstopping ideas.'}
                  </p>
                  <p>
                    {isAr
                      ? 'سواء بتنعيم نموذجٍ خشبي أو إتقان منصّة خارجيّة ضخمة، يؤمن عمرو وفريقه أنّ الهويّة الحقيقيّة تعيش في الصُّنع. مصنعنا ليس مجرّد مساحة إنتاج. إنّه مختبرٌ حيٌّ للتجربة والابتكار وساعاتٍ طويلة من العمل.'
                      : 'Whether sanding a wooden prototype or perfecting a massive outdoor stand, Amr and his crew have always believed that real branding lives in the making. The factory is not just a production space. It is a living lab of experimentation, invention, and many quiet hours of hard work.'}
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
          <SectionReveal>
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-6">
              {isAr ? 'كيف نعمل' : 'How we work'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h2 className="font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-display-lg max-w-4xl mb-16 md:mb-24">
              {isAr
                ? 'أربعة مبادئ، تظهر في كل تسليم.'
                : 'Four principles. They show up in every delivery.'}
            </h2>
          </SectionReveal>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            {[
              { en: ['Craft first', 'We design what we can build. The idea on the deck is the idea on the shelf, with no hand-offs lost in translation.'], ar: ['الحِرفة أوّلاً', 'نُصمّم ما نقدر على صنعه. الفكرة في العرض هي الفكرة على الرفّ، دون فقدان في التسليم.'] },
              { en: ['One workshop', 'Strategy, design, and production sit at the same table. Decisions move faster, mistakes get caught earlier.'], ar: ['ورشة واحدة', 'الاستراتيجيّة والتصميم والإنتاج تحت سقفٍ واحد. القرارات تسير أسرع، والأخطاء تُكتشف أبكر.'] },
              { en: ['Ownership', 'Everyone here treats each project as if their own brand is on the line. That tension is what raises the work.'], ar: ['مسؤوليّة', 'كلٌّ منّا يتعامل مع كل مشروع كأنّ علامته الخاصّة على المحكّ. هذا التوتّر يرفع مستوى العمل.'] },
              { en: ['Always more', 'We hustle, we laugh, we problem-solve. And we always deliver more than expected.'], ar: ['دائمًا أكثر', 'نعمل بجدّ، ونضحك، ونحلّ المشاكل. ونُسلّم دائمًا أكثر ممّا هو متوقَّع.'] },
            ].map((p, i) => {
              const [title, body] = isAr ? p.ar : p.en;
              return (
                <SectionReveal key={title} delay={i * 0.05}>
                  <li>
                    <p className="font-medium text-xs text-bone/55 tabular-nums mb-3">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-condensed font-black uppercase text-2xl md:text-3xl leading-tight rtl:leading-snug mb-4">{title}</h3>
                    <p className="text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85] max-w-md">{body}</p>
                  </li>
                </SectionReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <SectionReveal>
              <h2 className="md:col-span-7 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-display-lg">
                {isAr ? 'إيفري بير، في كلّ مكان.' : 'Everybear, everywhere.'}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
                {isAr
                  ? 'مقرّنا في القاهرة، بفريقَين متعاوِنَين في الدوحة وتورنتو. نعمل بمنطقة توقيت الشرق الأوسط، ونُسلّم في كلّ مكان.'
                  : 'Headquartered in Cairo, with collaborator teams in Doha and Toronto. We run on MENA time, deliver everywhere.'}
              </p>
            </SectionReveal>
          </div>

          <ul className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-line border hairline">
            {[
              { en: 'Cairo', ar: 'القاهرة', addr1: 'St. 206, Villa 8, Maadi', addr2: 'Manufacturing: 444 Haram St, Nasr El-Din' },
              { en: 'Doha', ar: 'الدوحة', addr1: 'Qatar regional office', addr2: '' },
              { en: 'Toronto', ar: 'تورنتو', addr1: 'Canada regional office', addr2: '' },
            ].map((o, i) => (
              <SectionReveal key={o.en} delay={i * 0.05}>
                <li className="bg-ink p-8 md:p-10">
                  <p className="font-condensed font-black uppercase text-3xl md:text-4xl mb-4">{isAr ? o.ar : o.en}</p>
                  <p className="text-sm md:text-base text-bone/85">{o.addr1}</p>
                  {o.addr2 && <p className="mt-1 text-sm md:text-base text-bone/55">{o.addr2}</p>}
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients teaser */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <SectionReveal>
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-8">
              {isAr ? 'موثوقون من قِبَل' : 'Trusted by'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <ul className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-x-6 gap-y-8 items-center">
              {CLIENTS.slice(0, 16).map((c) => (
                <li key={c.slug} className="relative aspect-[3/2] flex items-center justify-center">
                  <Image
                    src={`/clients/${c.slug}.png`}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 30vw, 12vw"
                    className="object-contain opacity-85 hover:opacity-100 transition-opacity"
                  />
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-wide px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <h2 className="md:col-span-7 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-display-lg">
              {t('ctaBlock.headline')}
            </h2>
            <div className="md:col-span-5 md:justify-self-end">
              <CtaButton href="/connect">{t('ctaBlock.ctaPrimary')}</CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
