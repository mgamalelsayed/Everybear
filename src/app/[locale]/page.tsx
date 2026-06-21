import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { SelectedWork } from '@/components/SelectedWork';
import { Capabilities } from '@/components/Capabilities';
import { Clients } from '@/components/Clients';
import { CtaBlock } from '@/components/CtaBlock';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SelectedWork />
      <Capabilities />
      <Clients />
      <CtaBlock />
    </>
  );
}
