import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getServiceBySlug, SERVICES } from '@/src/data/services';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { SubServiceDetail, SubServiceKey } from '@/src/components/sections/SubServiceDetail';
import { MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { generateServiceAndLocalBusinessSchema, DOMAIN } from '@/src/lib/schema';

interface PageProps {
  params: Promise<{ service: string; mesto: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; mesto: string }[] = [];
  
  for (const service of SERVICES) {
    if (service.slug === 'stavba-domu-na-kluc' || service.slug === 'rekonstrukcia-rodinneho-domu' || service.slug === 'rodinne-domy') {
      continue;
    }
    for (const city of CITIES) {
      params.push({
        service: service.slug,
        mesto: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, mesto: citySlug } = await params;
  
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  
  if (!city || !service) {
    return {};
  }

  const title = `${service.name} v ${city.locative} | MNSP`;
  const description = `${service.description} Profesionálna realizácia služby ${service.name.toLowerCase()} priamo pre obyvateľov v oblasti ${city.name} a okolí. Kontaktujte nás pre nezáväznú cenovú ponuku.`;

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

  if (!city || !service) {
    notFound();
  }

  const jsonLd = generateServiceAndLocalBusinessSchema(
    `${service.name} v ${city.locative}`,
    `${service.description} Profesionálna realizácia služby ${service.name.toLowerCase()} priamo pre obyvateľov v oblasti ${city.name} a okolí.`,
    `${DOMAIN}/sluzby/${service.slug}/${city.slug}`,
    city.slug
  );

  let serviceIdForComponent: SubServiceKey;
  if (serviceSlug === 'zakladanie-stavieb') serviceIdForComponent = 'zakladanie';
  else if (serviceSlug === 'monoliticke-konstrukcie') serviceIdForComponent = 'monoliticke';
  else if (serviceSlug === 'murarske-prace') serviceIdForComponent = 'murarske';
  else if (serviceSlug === 'tesarske-prace') serviceIdForComponent = 'tesarske';
  else if (serviceSlug === 'omietky') serviceIdForComponent = 'omietky';
  else if (serviceSlug === 'potery') serviceIdForComponent = 'potery';
  else if (serviceSlug === 'obkladacske-prace') serviceIdForComponent = 'obkladacske';
  else if (serviceSlug === 'fasady') serviceIdForComponent = 'fasady';
  else if (serviceSlug === 'vykopove-zemne-prace') serviceIdForComponent = 'vykopove';
  else if (serviceSlug === 'buracie-prace') serviceIdForComponent = 'buracie';
  else if (serviceSlug === 'jadrove-vrtanie') serviceIdForComponent = 'jadrove';
  else if (serviceSlug === 'rezanie-otvorov') serviceIdForComponent = 'rezanie';
  else serviceIdForComponent = 'zakladanie';

  const LocationSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          {`Špecifiká pre región ${city.name}`}
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-medium">
          V {city.locative} realizujeme odborné práce zamerané na {service.name.toLowerCase()}. Naše stavebné kapacity pokrývajú celé mesto a priľahlé oblasti. Zabezpečujeme plynulý chod prác a profesionálne riešenia.
        </p>

        {city.surrounding && city.surrounding.length > 0 && (
          <div className="pt-4 mt-4 border-t border-zinc-200/60">
            <strong className="text-sm text-zinc-900 block mb-2">
              {`Pôsobíme v celej oblasti ${city.name} a okolí:`}
            </strong>
            <ul className="flex flex-wrap gap-2">
              {city.surrounding.map((mun, idx) => (
                <li key={idx} className="text-xs bg-zinc-150 px-3 py-1.5 text-zinc-700 border border-zinc-200">
                  {mun}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200/60">
          <div className="bg-white p-4 border border-zinc-150">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Logistika a sieť
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              Plné regionálne pokrytie
            </strong>
            <p className="text-xs text-zinc-500">
              V úzkej spolupráci s lokálnymi dodávateľmi zaručujeme plynulý transport materiálov priamo na vašu stavbu v lokalite {city.name}.
            </p>
          </div>

          <div className="bg-white p-4 border border-zinc-150">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Územné plánovanie
            </span>
            <strong className="text-sm text-zinc-900 block mb-1">
              Súlad so smernicami
            </strong>
            <p className="text-xs text-zinc-500">
              Poznáme a dbáme na všetky územné nariadenia a stavebné zákony špecifické pre {city.accusative}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationFaq = (
    <div className="max-w-7xl mx-auto px-6 mt-16 space-y-8">
      <div className="bg-zinc-950 text-white p-8 rounded-xl relative overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            Často kladené otázky pre oblasť {city.name}
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h3 className="font-bold text-amber-500 mb-2">
                Koľko stojí {service.name.toLowerCase()} v {city.locative}?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Celková cena závisí od veľkosti a špecifikácií projektu. Sme k dispozícii pre osobné obhliadky a nacenenie na mieru priamo u vás v lokalite {city.name}. Využívame optimalizovanú logistiku aby sme zamedzili navýšeným režijným nákladom.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h3 className="font-bold text-amber-500 mb-2">
                Kedy viete začať realizáciu v oblasti {city.name}?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Závisí to od našich aktuálnych voľných kapacít vo vašom regióne. Neváhajte nás kontaktovať a obratom vám upresníme najbližší možný začiatok prác pre okolie mesta {city.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
        />
      <SubServiceDetail
        serviceId={serviceIdForComponent}
        serviceSlug={service.slug}
        title={service.name}
        description={service.description + "\n\nSpoliehame sa na naše odborné skúsenosti a kvalitné stavebné postupy na zabezpečenie tých najlepších výsledkov."}
        features={[
          "Dôkladná príprava a obhliadka staveniska",
          "Zabezpečenie potrebného materiálu a techniky",
          "Odborná realizácia podľa platných technických noriem",
          "Priebežná kontrola kvality a stavebný dozor",
          "Odovzdanie kompletne ukončených prác bez nedostatkov"
        ]}
        materials={[
          "Materiály prémiovej triedy",
          "Certifikované izolácie a zmesi",
          "Eko-priateľské certifikácie"
        ]}
        equipment={[
          "Moderná ťažká technika",
          "Špičkové nivelačné systémy",
          "Certifikované náradie Hilti a Bosch"
        ]}
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
