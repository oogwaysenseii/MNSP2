import Link from 'next/link';
import { Container } from '@/src/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Stránka nenájdená</h1>
      <p className="mb-8">Stránka, ktorú hľadáte, neexistuje.</p>
      <Link href="/" className="text-black font-bold hover:underline">Návrat na domovskú stránku</Link>
    </Container>
  );
}
