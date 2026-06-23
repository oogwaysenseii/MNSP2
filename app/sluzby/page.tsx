import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import SluzbyPageClient from './SluzbyPageClient';

export const metadata: Metadata = getSEOTags(
  "Naše služby",
  "Prehľad stavebných služieb a realizácií od základov až po detaily.",
  "/sluzby"
);

export default function Page() {
  return <SluzbyPageClient />;
}
