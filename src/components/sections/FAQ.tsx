import { Container } from '../ui/Container';

export function FAQ() {
  return (
    <section className="py-16 border-b border-gray-200 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8 text-black">Často kladené otázky</h2>
        <div className="space-y-6 max-w-[1500px]">
          <div>
            <h3 className="text-xl font-bold text-black">Aké lokality obsluhujete?</h3>
            <p className="text-gray-700 mt-2">Pôsobíme predovšetkým v Banskobystrickom kraji.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black">Poskytujete cenovú ponuku zdarma?</h3>
            <p className="text-gray-700 mt-2">Áno, po obhliadke vám vypracujeme nezáväznú cenovú ponuku.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
