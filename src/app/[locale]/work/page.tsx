import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { WorkIndex } from '@/components/WorkIndex';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected case studies from Everybear: packaging, branding, signage, and event production for Americana, Break, So Fresh, Chicka, and 22 Avenue.',
};

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkIndex />;
}
