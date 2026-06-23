import { Container } from '@/src/components/ui/Container';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  "Lokality pôsobnosti",
  "Pôsobíme vo Zvolene, Banskej Bystrici, Hriňovej a ich širokom okolí.",
  "/lokality"
);

export default function Page() {
  return (
    <Container className="py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8 capitalize">Naše lokality</h1>
      <p>Pôsobíme v rôznych lokalitách a sme pripravení prísť aj k vám.</p>
    </Container>
  );
}
