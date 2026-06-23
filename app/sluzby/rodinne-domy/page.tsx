import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import RodinneDomyClient from './RodinneDomyClient';

const title = 'Výstavba a rekonštrukcie rodinných domov';
const description = 'Od výstavby nových domov až po kompletné rekonštrukcie poskytujeme kvalitné remeselné spracovanie a riešenia na mieru.';

export const metadata: Metadata = getSEOTags(title, description, '/sluzby/rodinne-domy');

export default function Page() {
  return <RodinneDomyClient />;
}
