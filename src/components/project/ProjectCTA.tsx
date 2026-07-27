import Link from 'next/link';
import { Container } from '@/src/components/ui/Container';

export function ProjectCTA() {
  return (
    <section className="pt-10 bg-white border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className="bg-zinc-50  p-10 md:p-16 text-center border border-zinc-200 shadow-sm  mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 mb-6">
            Máte podobný projekt?
          </h2>
          <p className="text-zinc-600 mb-10 max-w-2xl mx-auto">
            Zrealizujeme vaše predstavy. Poskytujeme komplexné stavebné služby od návrhu až po odovzdanie hotového diela.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase tracking-widest text-sm  transition-all shadow-lg hover:shadow-amber-500/25"
          >
            Nezáväzná cenová ponuka
          </Link>
        </div>
      </Container>
    </section>
  );
}
