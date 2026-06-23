import { Container } from '@/src/components/ui/Container';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  "O nás",
  "Spoznajte našu stavebnú firmu. Ponúkame profesionálne stavebné služby na vysokej úrovni.",
  "/o-nas"
);

export default function Page() {
  return (
    <Container className="py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8 capitalize">O nás</h1>
      <p>Obsah pre o nás</p>
    </Container>
  );
}
