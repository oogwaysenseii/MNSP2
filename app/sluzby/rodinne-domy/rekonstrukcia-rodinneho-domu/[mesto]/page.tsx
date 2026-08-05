import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getConditions } from '@/src/data/city-conditions';
import { rekonstrukciaLocalAngle } from '@/src/data/service-local-angles';
import { RENOVATION_RATE_PER_M2, RENOVATION_OPTIONS } from '@/src/data/pricing';
import {
  WHY_US,
  RENOVATION_SCOPE,
  RENOVATION_STAGES,
  RENOVATION_EQUIPMENT,
} from '@/src/data/rodinne-domy-content';
import { getSEOTags } from '@/src/lib/seo';
import { RodinneDomyServiceDetail } from '@/src/components/sections/RodinneDomyServiceDetail';
import { Metadata } from 'next';
import { CheckCircle2, ShieldCheck, MapPin, HelpCircle } from 'lucide-react';
import {
  generateServicePageSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  DOMAIN,
} from '@/src/lib/schema';

interface PageProps {
  params: Promise<{ mesto: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({ mesto: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // Nominative in the title — that's how the query gets typed.
  // The root layout appends " | MNSP | Stavby a rekonštrukcie".
  const title = `Rekonštrukcia domu ${city.name}`;
  const description = `Kompletné aj čiastočné rekonštrukcie rodinných domov ${city.locative} a okolí — sanácia vlhkosti, statika, nové rozvody, zateplenie a fasáda.`;

  return getSEOTags(
    title,
    description,
    `/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${citySlug}`,
  );
}

export default async function RekonstrukciaLocationPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const conditions = getConditions(city.slug);
  if (!conditions) notFound();

  const angle = rekonstrukciaLocalAngle(conditions, city.locative, city.genitive);

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: 'Rodinné domy', path: '/sluzby/rodinne-domy' },
      {
        name: 'Rekonštrukcia domu',
        path: '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu',
      },
      {
        name: city.name,
        path: `/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`,
      },
    ]),
    ...generateServicePageSchema(
      `Rekonštrukcia rodinného domu ${city.locative}`,
      `Kompletné aj čiastočné rekonštrukcie rodinných domov ${city.locative} a okolí.`,
      `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`,
      city.name,
    ),
    generateFaqSchema(angle.faq),
  ];

  const LocationSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          {`Špecifiká rekonštrukcií pre región ${city.name}`}
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        {/* Generated from src/data/city-conditions.ts — housing stock, climate,
            heritage status and access. Genuinely differs per city. */}
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">{angle.body}</p>

        {city.surrounding.length > 0 && (
          <div className="pt-4 mt-4 border-t border-zinc-200/60">
            <strong className="text-sm text-zinc-900 block mb-2">
              {`Pôsobíme v celej oblasti ${city.name} a okolí:`}
            </strong>
            <ul className="flex flex-wrap gap-2">
              {city.surrounding.map((mun) => (
                <li
                  key={mun}
                  className="text-xs bg-zinc-100 px-3 py-1.5 text-zinc-700 border border-zinc-200"
                >
                  {mun}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200/60">
          <div className="bg-white p-4 border border-zinc-200">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Odpad a logistika
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {conditions.access === 'difficult'
                ? 'Odvoz sutiny podľa prístupu'
                : 'Kontajner priamo pri dome'}
            </strong>
            <p className="text-xs text-zinc-500">
              {conditions.access === 'difficult'
                ? 'Pri úzkych alebo strmých prístupových cestách volíme menšie kontajnery s častejším odvozom, aby sa sutina nehromadila na pozemku.'
                : `Kontajner pristavíme priamo k objektu a odvoz riešime priebežne. Z centrály je to sem ${city.distanceFromOffice} km.`}
            </p>
          </div>

          <div className="bg-white p-4 border border-zinc-200">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Povolenia
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {conditions.heritage ? 'Pamiatkovo chránené územie' : 'Ohláška alebo povolenie'}
            </strong>
            <p className="text-xs text-zinc-500">
              {conditions.heritage
                ? 'Pri obnove v pamiatkovej zóne konzultujeme postup a materiály s pamiatkovým úradom ešte pred ohlásením.'
                : `Poradíme, či vaša rekonštrukcia potrebuje ohlášku alebo stavebné povolenie, a pomôžeme s podkladmi pre stavebný úrad.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationFaq = (
    <section className="bg-zinc-50 border-t border-zinc-200 py-20">
      <div className="max-w-[1500px] mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 mb-3 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-600" />
          Časté otázky — {city.name}
        </h2>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          Ak medzi nimi nenájdete tú svoju, zavolajte nám.
        </p>
        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {angle.faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="cursor-pointer py-5 font-bold text-zinc-900 text-sm sm:text-base list-none flex items-start justify-between gap-4 hover:text-amber-600 transition-colors">
                <span>{item.q}</span>
                <span className="text-amber-600 shrink-0 mt-0.5 transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="pb-5 pr-8 text-zinc-600 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );

  const whyUsSection = (
    <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
      <div className="text-center space-y-2 mb-6">
        <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
        <h2 className="text-2xl font-display font-extrabold text-zinc-900">
          Prečo si vybrať nás?
        </h2>
        <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
          Poznáme materiály používané v minulosti a vieme ich správne nakombinovať
          s modernými technológiami. V okrese {city.name} a okolí zrekonštruujeme váš dom
          spoľahlivo a bez starostí.
        </p>
      </div>
      <ul className="text-zinc-700 text-sm font-medium leading-relaxed max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full text-left">
        {WHY_US.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RodinneDomyServiceDetail
        title={`Rekonštrukcia domu ${city.locative}`}
        breadcrumbTitle={city.name}
        parentBreadcrumbTitle="Rekonštrukcia domu"
        parentBreadcrumbUrl="/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu"
        subtitle1={`Aj ${city.locative} vám zrekonštruujeme váš dom bez starostí.`}
        subtitle2="Projekt vám vypracujeme, dom vám zrekonštruujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
        fullDesc={`Realizujeme kompletné alebo čiastočné rekonštrukcie rodinných domov v meste ${city.name} a okolí. Pracujeme s ohľadom na aktuálne normy, statiku a historickú hodnotu budov.\n\nSme pripravení na riadenie komplikovaných búracích prác pri starých objektoch, vstavby podkroví, sanácie muriva aj nadstavby.`}
        imageUrl="/rodinne-domy/rekonstrukcia-rodinneho-domu.webp"
        features={[...RENOVATION_SCOPE]}
        stages={[...RENOVATION_STAGES]}
        equipment={[...RENOVATION_EQUIPMENT]}
        options={RENOVATION_OPTIONS}
        category="Rodinné domy"
        serviceSlug="rekonstrukcia-rodinneho-domu"
        citySlug={city.slug}
        whyChooseUs={whyUsSection}
        ctaTitle={`Máte záujem o rekonštrukciu domu ${city.locative}?`}
        ctaSubtitle="Spojte sa s našim tímom a dohodnite si termín technickej obhliadky na mieste."
        blogFilterCategory="Rekonštrukcia domu"
        minSize={50}
        maxSize={300}
        stepSize={5}
        defaultSize={120}
        baseRate={RENOVATION_RATE_PER_M2}
        customLocationTop={LocationSpecificTop}
        locationFilter={city.name}
      />
      {LocationFaq}
    </>
  );
}
