import { notFound, redirect } from 'next/navigation';
import { getServiceBySlug, SERVICES, ServiceSlug } from '@/src/data/services';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { SubServiceDetail, SubServiceKey } from '@/src/components/sections/SubServiceDetail';
import { ShieldCheck, HardHat, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return SERVICES
    .filter(s => s.slug !== 'stavba-domu-na-kluc' && s.slug !== 'rekonstrukcia-rodinneho-domu' && s.slug !== 'rodinne-domy')
    .map((service) => ({
      service: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) return {};

  return getSEOTags(
    `${service.name} | Kvalitne a profesionálne`,
    service.description
  );
}

export default async function GenericServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;

  if (serviceSlug === 'stavba-domu-na-kluc' || serviceSlug === 'rekonstrukcia-rodinneho-domu' || serviceSlug === 'rodinne-domy') {
    redirect(`/sluzby/rodinne-domy`);
  }

  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

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
  else serviceIdForComponent = 'zakladanie'; // Fallback for unspecified

  const GenericSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <HardHat className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          Naša odbornosť
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-medium">
          Sme stabilným partnerom pre {service.name.toLowerCase()}. Naše kapacity nám umožňujú plnohodnotne obslúžiť klientov na celom území SR. S dôrazom na bezpečnosť práce a najvyššie štandardy dodávame služby, ktoré spĺňajú najnáročnejšie požiadavky.
        </p>

        <div className="pt-4 border-t border-zinc-200/60">
          <strong className="text-sm text-zinc-900 block mb-2">
            Vybrané garancie z nášho portfólia:
          </strong>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Certifikované stavebné postupy",
              "Skúsený a kvalifikovaný personál",
              "Vlastné strojové vybavenie",
              "Dodržiavanie termínov a noriem",
            ].map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs bg-white p-3 rounded-lg border border-zinc-200 shadow-sm text-zinc-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const GenericFaq = (
    <div className="max-w-7xl mx-auto px-6 mt-16 space-y-8">
      <div className="bg-zinc-950 text-white p-8 rounded-xl relative overflow-hidden border border-zinc-800 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            Často kladené otázky k službe
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-amber-500 mb-2">
                Koľko stojí {service.name.toLowerCase()}?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Každý projekt vyhodnocujeme individuálne a cena závisí od viacerých faktorov vrátane náročnosti, veľkosti aj použitého materiálu. Radi vám vypracujeme nezáväznú cenovú ponuku. Použite náš orientačný kalkulátor vyššie pre rýchly prehľad.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-amber-500 mb-2">
                Poskytujete záruky na vaše práce?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Áno, samozrejmosťou je plná certifikačná a legislatívna garancia v rámci SR. Na {service.name.toLowerCase()} a celkovú integritu diela poskytujeme predĺženú záruku podľa konkrétnej zmluvy o dielo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
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
      customLocationTop={GenericSpecificTop}
      customFaq={GenericFaq}
    />
  );
}
