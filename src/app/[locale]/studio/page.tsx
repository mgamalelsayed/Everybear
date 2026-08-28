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
      <section className="relative pt-40 md:pt-52 pb-12 md:pb-16 overflow-hidden">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <h1 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-xl max-w-[14ch]">
              {isAr ? 'علاماتٌ تُصنع باليد.' : 'Brands made by hand.'}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="mt-10 md:mt-14 max-w-2xl text-lg md:text-2xl text-bone/85 leading-relaxed">
              {isAr
                ? 'إيفري بير ليس وكالة فحسب. إنّه قبيلة من المفكّرين والصنّاع والحالمين. فريقنا يجمع بين العقول المبدعة والأيادي الماهرة، تحت مهمّةٍ واحدة: بناء علامات تترك أثرًا.'
                : 'Everybear is more than an agency. It is a tribe of thinkers, makers, doers, and dreamers. Our team brings together a rare blend of creative minds and skilled hands, all united by one mission: to build brands that leave a mark.'}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <SectionReveal className="md:col-span-5">
              <div>
                <div
                  aria-hidden
                  className="relative aspect-[4/5] rounded-xl bg-bone/5 border border-bone/10 backdrop-blur-sm overflow-hidden flex items-end p-8 md:p-10 shadow-[0_50px_100px_-50px_rgba(0,0,0,0.9)]"
                >
                  <div className="relative">
                    <p className="font-condensed font-black uppercase text-bone/10 text-[180px] leading-none">
                      AS
                    </p>
                    <p className="absolute bottom-2 left-0 right-0 font-medium text-[11px] uppercase tracking-widest text-bone/45">
                      {isAr ? 'صورة عمرو صفوت ستُضاف هنا' : 'Photo of Amr Safwat goes here'}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <div className="md:col-span-6 md:col-start-7">
              <SectionReveal>
                <h2 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg mb-10">
                  {isAr ? 'عمرو صفوت' : 'Amr Safwat'}
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="space-y-6 text-base md:text-lg text-bone/85 leading-relaxed">
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

      {/* Principles — giant words */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <h2 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg max-w-4xl mb-10 md:mb-16">
              {isAr ? 'أربعة مبادئ، تظهر في كل تسليم.' : 'Four principles. They show up in every delivery.'}
            </h2>
          </SectionReveal>

          <ul>
            {[
              { en: ['Craft first', 'We design what we can build. The idea on the deck is the idea on the shelf, with no hand-offs lost in translation.'], ar: ['الحِرفة أوّلاً', 'نُصمّم ما نقدر على صنعه. الفكرة في العرض هي الفكرة على الرفّ، دون فقدان في التسليم.'] },
              { en: ['One workshop', 'Strategy, design, and production sit at the same table. Decisions move faster, mistakes get caught earlier.'], ar: ['ورشة واحدة', 'الاستراتيجيّة والتصميم والإنتاج تحت سقفٍ واحد. القرارات تسير أسرع، والأخطاء تُكتشف أبكر.'] },
              { en: ['Ownership', 'Everyone here treats each project as if their own brand is on the line. That tension is what raises the work.'], ar: ['مسؤوليّة', 'كلٌّ منّا يتعامل مع كل مشروع كأنّ علامته الخاصّة على المحكّ. هذا التوتّر يرفع مستوى العمل.'] },
              { en: ['Always more', 'We hustle, we laugh, we problem-solve. And we always deliver more than expected.'], ar: ['دائمًا أكثر', 'نعمل بجدّ، ونضحك، ونحلّ المشاكل. ونُسلّم دائمًا أكثر ممّا هو متوقَّع.'] },
            ].map((p, i) => {
              const [title, body] = isAr ? p.ar : p.en;
              return (
                <SectionReveal key={title} delay={i * 0.05}>
                  <li className="group border-b hairline first:border-t">
                    <div className="grid grid-cols-12 gap-4 py-10 md:py-14 items-end">
                      <span className="col-span-1 font-medium text-xs text-bone/40 tabular-nums pt-2">
                        {i + 1}
                      </span>
                      <h3 className="col-span-11 md:col-span-7 font-condensed font-black uppercase leading-[0.85] tracking-[-0.035em] text-[clamp(2.25rem,7vw,6rem)] text-bone/40 group-hover:text-bone transition-colors duration-700 group-hover:translate-x-2 ease-smooth">
                        {title}
                      </h3>
                      <p className="col-span-12 md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/75 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </li>
                </SectionReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 md:mb-14">
            <SectionReveal className="md:col-span-7">
              <div>
                <h2 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg">
                  {isAr ? 'إيفري بير، في كلّ مكان.' : 'Everybear, everywhere.'}
                </h2>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1} className="md:col-span-4 md:col-start-9 self-end">
              <p className="text-base md:text-lg text-bone/75 leading-relaxed">
                {isAr
                  ? 'مقرّنا في القاهرة، بفريقَين متعاوِنَين في الدوحة وتورنتو. نعمل بمنطقة توقيت الشرق الأوسط، ونُسلّم في كلّ مكان.'
                  : 'Headquartered in Cairo, with collaborator teams in Doha and Toronto. We run on MENA time, deliver everywhere.'}
              </p>
            </SectionReveal>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { en: 'Cairo', ar: 'القاهرة', addr1: 'St. 206, Villa 8, Maadi', addr2: 'Manufacturing: 444 Haram St, Nasr El-Din' },
              { en: 'Doha', ar: 'الدوحة', addr1: 'Qatar regional office', addr2: '' },
              { en: 'Toronto', ar: 'تورنتو', addr1: 'Canada regional office', addr2: '' },
            ].map((o, i) => (
              <SectionReveal key={o.en} delay={i * 0.06}>
                <li className="group rounded-xl bg-bone/5 border border-bone/10 backdrop-blur-sm p-8 md:p-10 transition-all duration-500 hover:bg-bone/10 hover:-translate-y-1">
                  <p className="font-condensed font-black uppercase text-4xl md:text-5xl mb-5 leading-none">
                    {isAr ? o.ar : o.en}
                  </p>
                  <p className="text-sm md:text-base text-bone/85">{o.addr1}</p>
                  {o.addr2 && <p className="mt-1.5 text-sm md:text-base text-bone/55">{o.addr2}</p>}
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients teaser */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            {/* Promoted from an eyebrow to a real heading: this grid has no
                other label, unlike the home page where the h2 already says it. */}
            <h2 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg mb-10">
              {isAr ? 'موثوقون من قِبَل' : 'Trusted by'}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <ul className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
              {CLIENTS.slice(0, 16).map((c) => (
                <li
                  key={c.slug}
                  className="relative aspect-[3/2] bg-white/85 rounded-md overflow-hidden hover:bg-white transition-colors duration-300"
                >
                  <Image
                    src={`/clients/${c.slug}.${c.ext ?? 'png'}`}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 30vw, 12vw"
                    className="object-contain p-3"
                  />
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <h2 className="md:col-span-7 font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg">
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
