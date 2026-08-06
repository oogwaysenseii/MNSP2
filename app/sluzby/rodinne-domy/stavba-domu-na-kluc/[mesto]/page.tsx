import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES, capitalize } from '@/src/data/cities';
import { getConditions } from '@/src/data/city-conditions';
import { rodinneDomyLocalAngle } from '@/src/data/service-local-angles';
import { TURNKEY_RATE_PER_M2, STANDARD_OPTIONS } from '@/src/data/pricing';
import {
  WHY_US,
  TURNKEY_SELLING_POINTS,
  EQUIPMENT,
} from '@/src/data/rodinne-domy-content';
import { getSEOTags } from '@/src/lib/seo';
import { RodinneDomyServiceDetail } from '@/src/components/sections/RodinneDomyServiceDetail';
import { Metadata } from 'next';
import { CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
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

  // The root layout appends " | MNSP | Stavby a rekonštrukcie" (~30 chars),
  // so the title itself has to stay short.
  const title = `Stavba domu na kľúč ${city.name}`;
  const description = `Staviame moderné rodinné domy na kľúč ${city.locative} a okolí — od základov cez rozvody až po odovzdanie hotového diela. Nezáväzná cenová ponuka po obhliadke.`;

  return getSEOTags(title, description, `/sluzby/rodinne-domy/stavba-domu-na-kluc/${citySlug}`);
}

export default async function StavbaLocationPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const conditions = getConditions(city.slug);
  if (!conditions) notFound();

  const angle = rodinneDomyLocalAngle(conditions, city.locative, city.genitive);

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: 'Rodinné domy', path: '/sluzby/rodinne-domy' },
      { name: 'Stavba domu na kľúč', path: '/sluzby/rodinne-domy/stavba-domu-na-kluc' },
      { name: city.name, path: `/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}` },
    ]),
    ...generateServicePageSchema(
      `Stavba domu na kľúč ${city.locative}`,
      `Výstavba rodinných domov na kľúč ${city.locative} a okolí.`,
      `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}`,
      city.name,
    ),
    generateFaqSchema(angle.faq),
  ];

  const LocationSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          {`Stavebné špecifiká pre región ${city.name}`}
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        {/* Generated from src/data/city-conditions.ts — terrain, subsoil,
            altitude, access and heritage. Genuinely differs per city. */}
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
          {angle.body}
        </p>

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
              Logistika a doprava
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {conditions.access === 'difficult'
                ? 'Prístup overený vopred'
                : 'Plynulé zásobovanie stavby'}
            </strong>
            <p className="text-xs text-zinc-500">
              {conditions.access === 'difficult'
                ? `Prístupovú cestu k pozemku prejdeme ešte pred cenovou ponukou a podľa nej volíme veľkosť techniky aj spôsob dopravy betónu.`
                : `Z našej centrály je to sem ${city.distanceFromOffice} km, čo zvládame v rámci bežného výjazdu. Materiál zvážame priebežne, bez prestojov na stavbe.`}
            </p>
          </div>

          <div className="bg-white p-4 border border-zinc-200">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Územné plánovanie
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {conditions.heritage ? 'Pamiatkovo chránené zóny' : 'Súčinnosť pri povolení'}
            </strong>
            <p className="text-xs text-zinc-500">
              {conditions.heritage
                ? `Časť zástavby spadá pod pamiatkovú ochranu — postup pri obnove konzultujeme s pamiatkovým úradom ešte pred podaním ohlásenia.`
                : `Pomôžeme vám s podkladmi pre stavebný úrad aj s vyjadreniami k napojeniu na inžinierske siete v ${city.accusative} a okolí.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationFaq = (
    <div className="max-w-[1500px] mx-auto px-6 mt-16 mb-10 space-y-8">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
          Časté otázky
        </span>
        <h2 className="text-3xl font-display font-extrabold text-zinc-900">
          Otázky a odpovede — {city.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {angle.faq.map((item) => (
          <div key={item.q} className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">{item.q}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const whyUsSection = (
    <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
      <div className="text-center space-y-2 mb-6">
        <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
        <h2 className="text-2xl font-display font-extrabold text-zinc-900">
          Prečo si vybrať nás?
        </h2>
        <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
          Stavba rodinného domu si vyžaduje skúsenosti, odborný prístup a zodpovednosť.
          V okrese {city.name} a okolí postavíme váš dom spoľahlivo a bez starostí.
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
        title={`Stavba domu na kľúč ${city.locative}`}
        breadcrumbTitle={city.name}
        parentBreadcrumbTitle="Stavba domu na kľúč"
        parentBreadcrumbUrl="/sluzby/rodinne-domy/stavba-domu-na-kluc"
        subtitle1={`Aj ${city.locative} vám postavíme váš vysnívaný dom bez starostí.`}
        subtitle2="Projekt vám vypracujeme, dom vám postavíme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
        fullDesc={`Staviame rodinné domy podľa požiadaviek a potrieb našich klientov v regióne ${city.name}. Spolupracujeme s architektmi a inžiniermi, aby výsledok zodpovedal vašim predstavám aj vysokým nárokom na kvalitu.\n\nPri výstavbe používame výhradne kvalitné a overené materiály, dbáme na dostatočnú hydroizoláciu, poctivú tepelnú izoláciu a integráciu moderných technológií.`}
        imageUrl="/rodinne-domy/stavba-domu-na-kluc.webp"
        features={[...TURNKEY_SELLING_POINTS]}
        stages={[
          {
            step: '01',
            title: 'Konzultácia a cenová ponuka',
            desc: 'Na základe vašich požiadaviek pripravíme nezáväznú konzultáciu a cenovú ponuku na mieru.',
          },
          {
            step: '02',
            title: 'Projekt a povolenia',
            desc: `Plánovanie priestoru, geologické posúdenie, architektonický návrh a súčinnosť pri vybavovaní stavebného povolenia pre ${city.accusative} a okolie.`,
          },
          {
            step: '03',
            title: 'Výstavba na kľúč',
            desc: 'Zabezpečíme profesionálnu realizáciu stavby s dôrazom na kvalitu, presnosť a dodržiavanie termínov.',
          },
          {
            step: '04',
            title: 'Dokončenie a odovzdanie',
            desc: 'Po ukončení prác vám odovzdáme hotové dielo pripravené na kolaudáciu a bezproblémové užívanie.',
          },
        ]}
        equipment={[...EQUIPMENT]}
        options={STANDARD_OPTIONS}
        category="Rodinné domy"
        serviceSlug="stavba-domu-na-kluc"
        citySlug={city.slug}
        whyChooseUs={whyUsSection}
        ctaTitle={`Plánujete výstavbu rodinného domu na kľúč ${city.locative}?`}
        ctaSubtitle="Nechajte nám na seba kontakt a naši inžinieri sa s vami spoja s návrhom realizácie."
        blogFilterCategory="Stavba domu"
        minSize={80}
        maxSize={400}
        stepSize={5}
        defaultSize={140}
        baseRate={TURNKEY_RATE_PER_M2}
        customLocationTop={LocationSpecificTop}
        locationFilter={city.name}
      />
      {LocationFaq}
    </>
  );
}
