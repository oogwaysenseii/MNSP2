import { Container } from '../ui/Container';

export function Testimonials() {
  return (
    <section className="py-16 border-b border-gray-200 bg-gray-50" aria-label="Referencie">
      <Container>
        <h2 className="text-3xl font-bold mb-8 text-black">Čo hovoria naši klienti</h2>
        {/* Dynamic testimonials will be loaded here from a CMS */}
      </Container>
    </section>
  );
}
