import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, DOMAIN } from '@/src/lib/schema';
import { CITIES, KRAJE } from '@/src/data/cities';
import { LocationsSection } from '@/src/components/sections/LocationsSection';
import { CTA } from '@/src/components/sections/CTA';

export const metadata: Metadata = getSEOTags(
  'Kde pôsobíme',
  'Staviame a rekonštruujeme vo Zvolene, Banskej Bystrici, Detve, Hriňovej, Lučenci, Brezne a v ďalších okresoch Banskobystrického kraja.',
  '/lokality',
);

export default function Page() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Lokality', path: '/lokality' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Lokality pôsobnosti',
      numberOfItems: CITIES.length,
      itemListElement: CITIES.map((city, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Stavebná firma ${city.name}`,
        url: `${DOMAIN}/lokality/${city.slug}`,
      })),
    },
  ];

  return (
    <div className="bg-white pt-24 pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1500px] mx-auto px-6 mb-12">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block mb-3">
          Lokality
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-900 mb-6">
          Kde pôsobíme
        </h1>
        <p className="text-zinc-600 text-lg max-w-3xl leading-relaxed">
          Staviame rodinné domy na kľúč, realizujeme hrubé stavby a kompletné rekonštrukcie
          v okresoch Banskobystrického kraja. V každej lokalite robíme celý rozsah prác —
          líšia sa len podmienky, na ktoré si treba dať pozor. Pri väčších projektoch sme
          ochotní vycestovať aj mimo tieto regióny.
        </p>
      </div>

      {/* Region filter — one kraj today, ready for expansion. */}
      <div className="max-w-[1500px] mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-widest mr-2">
            Kraje
          </span>
          {KRAJE.map((kraj) => (
            <span
              key={kraj.slug}
              className="inline-flex items-center px-3 py-1.5 bg-amber-500 border border-amber-500 text-zinc-950 text-xs font-bold"
            >
              {kraj.name}
            </span>
          ))}
        </div>
      </div>

      {/* City cards — content comes from src/data/cities.ts, so adding a town
          here is a data change, not a template change. */}
      <div className="max-w-[1500px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/lokality/${city.slug}`}
              className="group bg-zinc-50 border border-zinc-200 p-6 sm:p-7 flex flex-col hover:border-amber-500 hover:bg-white transition-all duration-300"
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <h2 className="text-xl font-display font-extrabold text-zinc-950 group-hover:text-amber-600 transition-colors">
                  {city.name}
                </h2>
                <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider shrink-0">
                  {city.distanceFromOffice === 0
                    ? 'Naša centrála'
                    : `${city.distanceFromOffice} km`}
                </span>
              </div>

              <div className="w-6 group-hover:w-12 h-[1px] bg-amber-500 transition-all duration-300 mb-4" />

              <p className="text-sm text-zinc-600 leading-relaxed mb-5 flex-1">
                {city.shortIntro}
              </p>

              <div className="pt-4 border-t border-zinc-200">
                <span className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{city.surrounding.join(', ')}</span>
                </span>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  Stavebná firma {city.name}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border border-zinc-200 p-8 sm:p-10 text-center h-full flex flex-col justify-center space-y-6">
            <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
            <h2 className="text-2xl font-display font-extrabold text-zinc-900">
              Sme tam, kde nás potrebujete
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
              Naše stavebné tímy a technika sú rozmiestnené tak, aby sme dokázali rýchlo
              reagovať na dopyty v našich hlavných oblastiach pôsobenia. Pre väčšie projekty
              sme ochotní cestovať aj mimo týchto regiónov.
            </p>
          </div>

          <LocationsSection />
        </div>
      </div>

      <CTA pageName="Lokality - prehľad" />
    </div>
  );
}
