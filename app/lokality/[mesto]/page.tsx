import { Container } from '@/src/components/ui/Container';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { getCityBySlug } from '@/src/data/cities';
import { LocationsSection } from '@/src/components/sections/LocationsSection';
import Link from 'next/link';
import { ChevronRight, MapPin, Building, Home, Hammer } from 'lucide-react';
import { CTA } from '@/src/components/sections/CTA';

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
  const city = getCityBySlug(resolvedParams.mesto);

  if (!city) {
    return (
      <Container className="py-24 mt-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Lokalita sa nenašla</h1>
        <Link href="/lokality" className="text-amber-600 hover:underline">Späť na zoznam lokalít</Link>
      </Container>
    );
  }

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-500 font-mono font-bold tracking-wider mb-6">
          <Link href="/" className="hover:underline hover:text-zinc-900 transition-colors">DOMOV</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <Link href="/lokality" className="hover:underline hover:text-zinc-900 transition-colors uppercase">LOKALITY</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-zinc-900 uppercase line-clamp-1">{city.name}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-900 mb-6">
          Stavebné práce <span className="text-amber-600">{city.name}</span>
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl">
          Poskytujeme komplexné stavebné služby od základov až po strechu v meste {city.name} a v blízkom okolí ({city.surrounding.join(', ')}).
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href={`/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}`} className="bg-zinc-50 border border-zinc-200 p-8 hover:border-amber-500 transition-all group">
            <Home className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">Stavba domu na kľúč</h3>
            <p className="text-sm text-zinc-600">Výstavba rodinných domov od základov až po kolaudáciu v lokalite {city.name}.</p>
          </Link>
          <Link href={`/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`} className="bg-zinc-50 border border-zinc-200 p-8 hover:border-amber-500 transition-all group">
            <Building className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">Rekonštrukcia domov</h3>
            <p className="text-sm text-zinc-600">Kompletné aj čiastočné rekonštrukcie starších domov a bytov v okolí {city.locative}.</p>
          </Link>
          <Link href="/sluzby" className="bg-zinc-50 border border-zinc-200 p-8 hover:border-amber-500 transition-all group">
            <Hammer className="w-10 h-10 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">Stavebné remeslá</h3>
            <p className="text-sm text-zinc-600">Murárske, tesárske, obkladačské a iné odborné práce dostupné v meste {city.name}.</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-16">
          <div className="bg-white border border-zinc-200 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            <MapPin className="w-10 h-10 text-amber-600" />
            <h2 className="text-2xl font-display font-extrabold text-zinc-900">Pôsobíme priamo u vás</h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Či už plánujete stavať v meste {city.name} alebo v okolitých obciach ako {city.surrounding.join(', ')}, naši majstri a technika sú pripravení zabezpečiť hladký priebeh vašej stavby.
            </p>
          </div>
          
          <LocationsSection citySlug={city.slug} />
        </div>
      </div>

      <CTA 
        title={`Potrebujete stavebné práce v lokalite ${city.name}?`}
        subtitle="Kontaktujte nás a radi si obhliadneme vaše stavenisko."
        pageName={`Lokalita ${city.name}`}
      />
    </div>
  );
}