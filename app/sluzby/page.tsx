import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, generateServiceSchema, DOMAIN } from '@/src/lib/schema';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, Layers, Hammer, DraftingCompass, Grid, Brush, Shield, CheckCircle,
} from 'lucide-react';
import { TRADE_SERVICES } from '@/src/data/services';
import { ServicesGrid } from '@/src/components/sections/ServicesGrid';
import { CTA } from '@/src/components/sections/CTA';
import { FadeInCard } from './FadeInCard';

export const metadata: Metadata = getSEOTags(
  'Naše služby',
  'Staviame rodinné domy, bytovky, haly aj verejné budovy — a robíme aj jednotlivé remeslá: murovanie, omietky, potery, fasády, jadrové vŕtanie.',
  '/sluzby',
);

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case 'zakladanie-stavieb':
    case 'monoliticke-konstrukcie':
    case 'vykopove-zemne-prace':
      return <Layers className="w-5 h-5 text-amber-600" />;
    case 'murarske-prace':
    case 'buracie-prace':
      return <Hammer className="w-5 h-5 text-amber-600" />;
    case 'tesarske-prace':
    case 'jadrove-vrtanie':
      return <DraftingCompass className="w-5 h-5 text-amber-600" />;
    case 'omietky':
    case 'potery':
      return <Brush className="w-5 h-5 text-amber-600" />;
    case 'obkladacske-prace':
    case 'rezanie-otvorov':
      return <Grid className="w-5 h-5 text-amber-600" />;
    case 'fasady':
      return <Shield className="w-5 h-5 text-amber-600" />;
    default:
      return <CheckCircle className="w-5 h-5 text-amber-600" />;
  }
};

export default function Page() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
    ]),
    generateServiceSchema(
      'Stavebné a remeselné práce',
      'Výstavba a rekonštrukcie budov, hrubé stavby a jednotlivé stavebné remeslá.',
      `${DOMAIN}/sluzby`,
    ),
  ];

  return (
    <div className="bg-white min-h-screen text-zinc-900 pt-15">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SECTION 1 — BUILDING TYPES */}
      <div className="bg-white border-y border-zinc-200 pt-10 mb-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-5 space-y-3">
            <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
              Naše služby
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-950 tracking-tight">
              Čo pre vás postavíme
            </h1>
            <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
              Staviame rodinné domy, bytovky, haly aj verejné budovy. Vyberte si,
              čo plánujete — nájdete tam rozsah prác aj to, čo od nás môžete čakať.
            </p>
          </div>
        </div>
        <ServicesGrid hideAllLink />
      </div>

      {/* SECTION 2 — TRADES */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-14 space-y-3">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
            Odborné práce a remeslá
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-950 tracking-tight">
            Aj jednotlivé remeslá
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
            Nepotrebujete celú stavbu, ale konkrétnu prácu? Vymurovať priečku,
            vyomietať dom, spraviť potery alebo prerezať otvor do betónu vieme aj
            samostatne — nielen ako súčasť väčšej zákazky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {TRADE_SERVICES.map((sub, sIdx) => {
            const tag = (sIdx + 1).toString().padStart(2, '0');
            return (
              <Link href={`/sluzby/${sub.slug}`} key={sub.slug} className="block group h-full">
                <FadeInCard index={sIdx}>
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 bg-white border border-zinc-200/60 shadow-sm flex items-center justify-center group-hover:bg-zinc-950 group-hover:border-zinc-950 transition-colors duration-300">
                        <div className="group-hover:text-white transition-colors">
                          {getServiceIcon(sub.slug)}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-zinc-400">
                        Služba // {tag}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">
                        {sub.name}
                      </h3>
                      <div className="w-6 group-hover:w-12 h-[1px] bg-amber-500 transition-all duration-300" />
                      <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    <div className="mt-5 space-y-1.5 pt-4 border-t border-zinc-200">
                      {sub.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                          <CheckCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-600">
                    <span className="text-[10px] font-mono tracking-tight text-zinc-400 uppercase">
                      Podrobná špecifikácia
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 group-hover:text-amber-600 transition-colors flex items-center gap-1">
                      Otvoriť
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </FadeInCard>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 pt-8 border-t border-zinc-200 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
          <Link href="/lokality" className="inline-flex items-center gap-2 text-zinc-900 hover:text-amber-600 transition-colors group">
            Kde pôsobíme
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-900 hover:text-amber-600 transition-colors group">
            Naše realizácie
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link href="/kalkulacka" className="inline-flex items-center gap-2 text-zinc-900 hover:text-amber-600 transition-colors group">
            Orientačná cena stavby
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <CTA pageName="Služby - prehľad" />
      </div>
    </div>
  );
}
