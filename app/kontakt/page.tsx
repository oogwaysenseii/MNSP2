import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';
import { getSEOTags } from '@/src/lib/seo';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/src/lib/schema';

export const metadata: Metadata = getSEOTags(
  "Kontakt",
  "Kontaktujte nás. Zabezpečujeme kompletné stavebné služby, od rodinných domov až po priemyselné stavby.",
  "/kontakt"
);

export default function Page() {
  const jsonLd = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema('Zvolen'),
    generateLocalBusinessSchema('Hrinova'),
    generateLocalBusinessSchema('BanskaBystrica'),
  ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactPageContent />
        </>
    );
}
