import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { FounderCard } from '@/components/connect/FounderCard';
import { ConnectForm } from '@/components/connect/ConnectForm';

export const metadata: Metadata = {
  title: 'Connect',
  description:
    'Tell us what you are building. We reply within one business day. Or book a call with the founder.',
};

export default async function ConnectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ConnectPageContent />;
}

function ConnectPageContent() {
  const t = useTranslations('connect');
  return (
    <section className="pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <header className="mb-10 md:mb-12">
          <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-6">
            {t('eyebrow')}
          </p>
          <h1 className="font-medium text-display-lg max-w-2xl">
            {t('headline')}
          </h1>
        </header>

        <div className="space-y-5 md:space-y-6">
          <FounderCard />
          <ConnectForm />
        </div>
      </div>
    </section>
  );
}
