import { Container } from '@/src/components/ui/Container';

export default async function DynamicPage({ params }: { params: Promise<{ mesto: string }> }) {
  const resolvedParams = await params;
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-bold mb-8">Detail: {resolvedParams.mesto}</h1>
      <p>Obsah pre parameter: {resolvedParams.mesto}.</p>
    </Container>
  );
}