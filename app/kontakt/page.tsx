import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';
import { getSEOTags } from '@/src/lib/seo';
import { generateOrganizationSchema, generateBranchSchema } from '@/src/lib/schema';

export const metadata: Metadata = getSEOTags(
  "Kontakt",
  "Kontaktujte nás. Zabezpečujeme kompletné stavebné služby, od rodinných domov až po priemyselné stavby.",
  "/kontakt"
);

export default function Page() {
  const jsonLd = [
    generateOrganizationSchema(),
    generateBranchSchema('zvolen'),
    generateBranchSchema('hrinova'),
    generateBranchSchema('banska-bystrica'),
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
