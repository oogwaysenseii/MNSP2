import { Container } from '@/src/components/ui/Container';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { getCityBySlug } from '@/src/data/cities';

export async function generateMetadata({ params }: { params: Promise<{ mesto: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.mesto);

  if (!city) return {};

  return getSEOTags(
    `Stavebné práce ${city.name}`,
    `Poskytujeme komplexné stavebné práce a služby v meste ${city.name} a jeho okolí.`,
    `/lokality/${resolvedParams.mesto}`
  );
}

export default async function DynamicPage({ params }: { params: Promise<{ mesto: string }> }) {
  const resolvedParams = await params;
  return (
    <Container className="py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">Lokalita: {resolvedParams.mesto}</h1>
      <p>Obsah pre lokalitu: {resolvedParams.mesto}.</p>
    </Container>
  );
}