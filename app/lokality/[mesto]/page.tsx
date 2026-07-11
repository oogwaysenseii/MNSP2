import { Container } from '@/src/components/ui/Container';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { LocationsSection } from '@/src/components/sections/LocationsSection';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = getSEOTags(
    "Lokality pôsobnosti",
    "Pôsobíme vo Zvolene, Banskej Bystrici, Hriňovej a ich širokom okolí.",
    "/lokality"
);

export default function Page() {
  return (
      <div className="bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-900 mb-6">
            Kde pôsobíme
          </h1>
          <p className="text-zinc-600 text-lg max-w-2xl">
            Poskytujeme komplexné stavebné služby, výstavbu rodinných domov na kľúč a rekonštrukcie vo viacerých regiónoch Slovenska. Vyberte si váš región alebo okresné mesto pre viac informácií.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white border border-zinc-200 p-8 sm:p-10 text-center h-full flex flex-col justify-center space-y-6">
              <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-display font-extrabold text-zinc-900">Sme tam, kde nás potrebujete</h2>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
                Naše stavebné tímy a technika sú strategicky rozmiestnené tak, aby sme dokázali efektívne a rýchlo reagovať na dopyty v našich hlavných oblastiach pôsobenia. Pre väčšie projekty sme ochotní cestovať aj mimo týchto regiónov.
              </p>
            </div>

            <LocationsSection />
          </div>
        </div>
      </div>
  );
}
