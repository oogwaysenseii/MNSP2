import { notFound, redirect } from 'next/navigation';
import { getCityBySlug, CITIES, capitalize } from '@/src/data/cities';
import { getServiceBySlug, SERVICES } from '@/src/data/services';
import { SERVICE_DETAILS } from '@/src/data/service-details';
import { REDIRECTED, componentKeyFor } from '@/src/data/service-component-keys';
import { getConditions } from '@/src/data/city-conditions';
import { getServiceLocalAngle, SERVICE_DIFFERENTIATES } from '@/src/data/service-local-angles';
import type { ServiceSlug } from '@/src/data/services-slugs';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { SubServiceDetail } from '@/src/components/sections/SubServiceDetail';
import { MapPin } from 'lucide-react';
import {
  generateServicePageSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  DOMAIN,
} from '@/src/lib/schema';

interface PageProps {
  params: Promise<{ service: string; mesto: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; mesto: string }[] = [];
  for (const service of SERVICES) {
    if ((REDIRECTED as readonly string[]).includes(service.slug)) continue;
    for (const city of CITIES) {
      params.push({ service: service.slug, mesto: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  // Nominative in the title — that's how the query gets typed.
  // The root layout appends " | MNSP | Stavby a rekonštrukcie" (~30 chars).
  const title = `${service.name} ${city.name}`;
  const description = `${service.description} Realizujeme ${city.locative} a v okolí (${city.surrounding
    .slice(0, 3)
    .join(', ')}). Nezáväzná cenová ponuka po obhliadke.`;

  return getSEOTags(title, description, `/sluzby/${serviceSlug}/${citySlug}`);
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service: serviceSlug, mesto: citySlug } = await params;

  if (serviceSlug === 'stavba-domu-na-kluc' || serviceSlug === 'rekonstrukcia-rodinneho-domu') {
    redirect(`/sluzby/rodinne-domy/${serviceSlug}/${citySlug}`);
  }
  if (serviceSlug === 'rodinne-domy') {
    redirect(`/sluzby/rodinne-domy/stavba-domu-na-kluc/${citySlug}`);
  }

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const conditions = getConditions(city.slug);
  if (!conditions) notFound();

  // Real per-service content — the same source the parent /sluzby/[service]
  // page uses. This route previously hardcoded one generic fallback for all
  // 176 combinations.
  const extra = SERVICE_DETAILS[serviceSlug];

  const angle = getServiceLocalAngle(
    serviceSlug,
    service.name,
    conditions,
    city.locative,
    city.distanceFromOffice,
  );

  const differentiates = SERVICE_DIFFERENTIATES[serviceSlug as ServiceSlug] ?? false;

  const faq = [
    ...angle.faq,
    {
      q: `Koľko stojí ${service.name.toLowerCase()} ${city.locative}?`,
      a: `Cena závisí od rozsahu prác, prístupu na stavbu a použitého materiálu. Z centrály vo Zvolene je to sem ${
        city.distanceFromOffice === 0 ? 'pár minút' : `${city.distanceFromOffice} km`
      }, takže doprava rozpočet výrazne nenavýši. Záväznú ponuku vypracujeme po obhliadke a s položkovým rozpisom.`,
    },
    {
      q: `Kedy viete začať s realizáciou ${city.locative}?`,
      a: 'Závisí to od aktuálnej vyťaženosti a rozsahu prác. Po obhliadke vám povieme konkrétny najbližší možný termín — a ak ho nedokážeme dodržať, povieme to hneď, nie až v priebehu stavby.',
    },
    {
      q: `Realizujete ${service.name.toLowerCase()} aj v obciach v okolí?`,
      a: `Áno, pokrývame ${city.name} aj priľahlé obce — ${city.surrounding.join(
        ', ',
      )}. Pri menších zákazkách vieme spojiť viacero výjazdov v rámci jednej lokality.`,
    },
    {
      q: 'Akú záruku na dielo poskytujete?',
      a: 'Záruka je vždy uvedená v zmluve o dielo a jej rozsah zodpovedá typu prác. Minimálne však vždy v rozsahu, ktorý stanovujú právne predpisy Slovenskej republiky.',
    },
  ];

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: service.name, path: `/sluzby/${service.slug}` },
      { name: city.name, path: `/sluzby/${service.slug}/${city.slug}` },
    ]),
    ...generateServicePageSchema(
      `${service.name} ${city.locative}`,
      `${service.description} Realizujeme ${city.locative} a v okolí.`,
      `${DOMAIN}/sluzby/${service.slug}/${city.slug}`,
      city.name,
    ),
    generateFaqSchema(faq),
  ];

  const LocationSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          {differentiates
            ? `${service.name} ${city.locative} — na čo si dať pozor`
            : `${service.name} ${city.locative}`}
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        {/* Generated from src/data/city-conditions.ts. For trades whose method
            genuinely varies by ground, climate or access, this branches on the
            actual conditions; for the rest it stays honest about logistics. */}
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
              Dostupnosť
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {city.distanceFromOffice === 0
                ? 'Sídlime priamo tu'
                : `${city.distanceFromOffice} km z centrály`}
            </strong>
            <p className="text-xs text-zinc-500">
              {city.distanceFromOffice === 0
                ? 'Na obhliadku sa vieme dostaviť prakticky okamžite a techniku presunúť v rámci dňa.'
                : `Z centrály vo Zvolene to zvládame v rámci bežného výjazdu, takže doprava rozpočet výrazne nenavýši.`}
            </p>
          </div>

          <div className="bg-white p-4 border border-zinc-200">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              {conditions.access === 'difficult' ? 'Prístup na stavbu' : 'Príprava a povolenia'}
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              {conditions.access === 'difficult'
                ? 'Trasu overujeme vopred'
                : conditions.heritage
                  ? 'Pamiatkovo chránené územie'
                  : 'Súčinnosť pri dokumentácii'}
            </strong>
            <p className="text-xs text-zinc-500">
              {conditions.access === 'difficult'
                ? 'Prístupovú cestu prejdeme ešte pred cenovou ponukou a podľa nej zvolíme veľkosť techniky.'
                : conditions.heritage
                  ? `Časť zástavby ${city.locative} spadá pod pamiatkovú ochranu — postup konzultujeme s pamiatkovým úradom.`
                  : `Pomôžeme s podkladmi pre stavebný úrad aj s vyjadreniami k napojeniu na inžinierske siete v ${city.accusative}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationFaq = (
    <div className="max-w-[1500px] mx-auto px-6 mb-10 space-y-8">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
          Časté otázky
        </span>
        <h2 className="text-3xl font-display font-extrabold text-zinc-900">
          Otázky a odpovede — {city.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {faq.map((item) => (
          <div key={item.q} className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">{item.q}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubServiceDetail
        serviceId={componentKeyFor(serviceSlug)}
        serviceSlug={service.slug}
        title={`${service.name} ${city.locative}`}
        description={extra?.longDescription ?? service.description}
        features={extra?.features ?? []}
        materials={extra?.materials ?? []}
        equipment={extra?.equipment ?? []}
        cityName={city.name}
        cityLocative={city.locative}
        cityAccusative={city.accusative}
        citySlug={city.slug}
        customLocationTop={LocationSpecificTop}
      />
      {LocationFaq}
    </>
  );
}
