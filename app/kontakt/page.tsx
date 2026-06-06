import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';
import { getSEOTags } from '@/src/lib/seo';

export const metadata: Metadata = getSEOTags(
  "Kontakt | Stavebná firma Apex Builders",
  "Kontaktujte našu stavebnú firmu. Zabezpečujeme kompletné stavebné služby, od rodinných domov až po priemyselné stavby. Máme pobočky v rôznych mestách a sme tu pre vás."
);

export default function Page() {
  return <ContactPageContent />;
}
