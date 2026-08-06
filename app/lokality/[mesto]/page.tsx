import { getSEOTags } from '@/src/lib/seo';
import {
  generateServicePageSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  DOMAIN,
} from '@/src/lib/schema';
import { Metadata } from 'next';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { LocationsSection } from '@/src/components/sections/LocationsSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MapPin, Building, Home, Hammer } from 'lucide-react';
import { CTA } from '@/src/components/sections/CTA';

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    mesto: city.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ mesto: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.mesto);
  if (!city) {
    notFound();
  }
  return getSEOTags(
      `Stavebná firma ${city.name}`,
      city.metaDescription || `Stavebná firma pre ${city.name} a okolie. Poskytujeme komplexné stavebné práce a služby.`,
      `/lokality/${resolvedParams.mesto}`
  );
}

export default async function DynamicPage({ params }: { params: Promise<{ mesto: string }> }) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.mesto);
  if (!city) {
    notFound();
  }

  /**
   * These pages are not physical offices — only the three branch pages are.
   *
   * This previously emitted a GeneralContractor per city, each with the Zvolen
   * street address but a different `name` ("MNSP - Stavebná firma Detva",
   * "... Lučenec", ...). That's 11 businesses at one address with 11 names,
   * none matching a Google Business Profile — a NAP-consistency problem.
   * Now: one Organization, with the town as areaServed.
   */
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Lokality', path: '/lokality' },
      { name: city.name, path: `/lokality/${city.slug}` },
    ]),
    ...generateServicePageSchema(
      `Stavebná firma ${city.name}`,
      city.metaDescription,
      `${DOMAIN}/lokality/${city.slug}`,
      city.name,
    ),
    generateFaqSchema(city.faq),
  ];

  const SERVICES_MAP: Record<string, { icon: any; title: string; desc: string; link: string }> = {
    'rodinne-domy': { icon: Home, title: 'Rodinné domy', desc: `Výstavba na kľúč aj rekonštrukcie rodinných domov ${city.locative}.`, link: `/sluzby/rodinne-domy/${city.slug}` },
    'zakladanie-stavieb': { icon: Hammer, title: 'Zakladanie stavieb', desc: `Základové pásy a dosky prispôsobené podložiu v okolí ${city.genitive}.`, link: `/sluzby/zakladanie-stavieb/${city.slug}` },
    'monoliticke-konstrukcie': { icon: Hammer, title: 'Monolitické konštrukcie', desc: `Debnenie, armovanie a betonáž železobetónových konštrukcií.`, link: `/sluzby/monoliticke-konstrukcie/${city.slug}` },
    'murarske-prace': { icon: Hammer, title: 'Murárske práce', desc: `Nosné murivo, priečky a hrubé stavby ${city.locative}.`, link: `/sluzby/murarske-prace/${city.slug}` },
    'tesarske-prace': { icon: Home, title: 'Tesárske práce', desc: `Krovy a strešné konštrukcie dimenzované na miestne podmienky.`, link: `/sluzby/tesarske-prace/${city.slug}` },
    'fasady': { icon: Building, title: 'Fasády a zateplenie', desc: `ETICS aj prevetrávané fasády pre domy ${city.locative}.`, link: `/sluzby/fasady/${city.slug}` },
    'omietky': { icon: Building, title: 'Omietky', desc: `Vnútorné aj vonkajšie omietky, strojové aj ručné.`, link: `/sluzby/omietky/${city.slug}` },
    'potery': { icon: Hammer, title: 'Potery', desc: `Anhydritové a cementové potery ako podklad pre podlahy.`, link: `/sluzby/potery/${city.slug}` },
    'obkladacske-prace': { icon: Building, title: 'Obklady a dlažby', desc: `Pokládka obkladov a dlažieb s dôrazom na detail.`, link: `/sluzby/obkladacske-prace/${city.slug}` },
    'vykopove-zemne-prace': { icon: Hammer, title: 'Výkopové a zemné práce', desc: `Zemné práce, inžinierske siete a terénne úpravy.`, link: `/sluzby/vykopove-zemne-prace/${city.slug}` },
    'buracie-prace': { icon: Hammer, title: 'Búracie práce', desc: `Bezpečné búranie vrátane odvozu a likvidácie odpadu.`, link: `/sluzby/buracie-prace/${city.slug}` },
    'rezidencne-budovy': { icon: Building, title: 'Rezidenčné budovy', desc: `Bytové domy a polyfunkčné objekty.`, link: `/sluzby/rezidencne-budovy/${city.slug}` },
    'komercna-vystavba': { icon: Building, title: 'Komerčná výstavba', desc: `Administratívne budovy, prevádzky a predajne.`, link: `/sluzby/komercna-vystavba/${city.slug}` },
    'priemyselne-objekty': { icon: Building, title: 'Priemyselné objekty', desc: `Skladové haly, logistické centrá a výrobné závody.`, link: `/sluzby/priemyselne-objekty/${city.slug}` },
    'obcianske-stavby': { icon: Building, title: 'Občianske stavby', desc: `Školy, zariadenia sociálnych služieb a úrady.`, link: `/sluzby/obcianske-stavby/${city.slug}` },
    'jadrove-vrtanie': { icon: Hammer, title: 'Jadrové vŕtanie', desc: `Presné vŕtanie otvorov do betónu a muriva.`, link: `/sluzby/jadrove-vrtanie/${city.slug}` },
    'rezanie-otvorov': { icon: Hammer, title: 'Rezanie otvorov', desc: `Diamantové rezanie v betóne, železobetóne aj murive.`, link: `/sluzby/rezanie-otvorov/${city.slug}` },
  };

  const renderedServices = city.priorityServices
      .slice(0, 3)
      .map(key => SERVICES_MAP[key])
      .filter(Boolean);

  return (
      <>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              Stavebná firma <span className="text-amber-600">{city.name}</span>
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl mb-6">
              Poskytujeme komplexné stavebné služby od základov až po strechu v meste {city.name} a v okolí {city.genitive} ({city.surrounding.join(', ')}).
            </p>

            <div className="prose prose-zinc max-w-3xl text-zinc-600 mb-12">
              {city.intro.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 mb-16 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderedServices.map((srv, idx) => (
                  <Link key={idx} href={srv.link} className="bg-zinc-50 border border-zinc-200 p-8 hover:border-amber-500 transition-all group">
                    <srv.icon className="w-10 h-10 text-amber-600 mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">{srv.title}</h3>
                    <p className="text-sm text-zinc-600">{srv.desc}</p>
                  </Link>
              ))}
            </div>

            {city.faq && city.faq.length > 0 && (
                <div className="mt-16 max-w-3xl">
                  <h2 className="text-2xl font-display font-extrabold text-zinc-900 mb-6">Najčastejšie otázky pre {city.name}</h2>
                  <div className="space-y-4">
                    {city.faq.map((item, idx) => (
                        <details key={idx} className="group bg-zinc-50 border border-zinc-200 open:bg-white open:border-amber-500 transition-colors">
                          <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-zinc-900">
                            {item.q}
                            <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                        <ChevronRight className="w-5 h-5 text-amber-600 transform rotate-90" />
                      </span>
                          </summary>
                          <div className="px-6 pb-6 text-zinc-600">
                            {item.a}
                          </div>
                        </details>
                    ))}
                  </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-16">
              <div className="bg-white border border-zinc-200 p-8 sm:p-10 flex flex-col justify-center space-y-6">
                <MapPin className="w-10 h-10 text-amber-600" />
                <h2 className="text-2xl font-display font-extrabold text-zinc-900">Pôsobíme priamo u vás</h2>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Či už plánujete stavať v meste {city.name} alebo v okolitých obciach ako {city.surrounding.join(', ')}, naši majstri a technika sú pripravení zabezpečiť hladký priebeh vašej stavby.{' '}
                {city.distanceFromOffice === 0
                  ? 'Naša centrála sídli priamo tu v meste.'
                  : `Z našej centrály to k vám máme približne ${city.distanceFromOffice} km.`}
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
      </>
  );
}
