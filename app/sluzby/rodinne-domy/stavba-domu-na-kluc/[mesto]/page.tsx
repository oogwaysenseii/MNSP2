import { notFound, redirect } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getSEOTags } from '@/src/lib/seo';
import { RodinneDomyServiceDetail } from '@/src/components/sections/RodinneDomyServiceDetail';
import { Metadata } from 'next';
import { CheckCircle2, ShieldCheck, MapPin, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ mesto: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    mesto: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mesto: citySlug } = await params;
  
  const city = getCityBySlug(citySlug);
  
  if (!city) {
    return {};
  }

  const title = `Stavba domu na kľúč v ${city.locative} | Kvalitne a profesionálne`;
  const description = `Staviame moderné rodinné domy na kľúč. Profesionálna realizácia priamo pre obyvateľov v oblasti ${city.name} a okolí. Kontaktujte nás pre nezáväznú cenovú ponuku.`;

  return getSEOTags(title, description);
}

export default async function StavbaLocationPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Stavba domu na kľúč ${city.name}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "MNSP",
      "image": "https://www.mnsp.sk/logo.png"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "description": `Profesionálna výstavba rodinných domov na kľúč v oblasti ${city.name}.`
  };

  const LocationSpecificTop = (
    <div className="mt-8 border border-zinc-200  overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          {`Stavebné špecifiká pre región ${city.name}`}
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-medium">
          V {city.locative} realizujeme výstavbu rodinných domov, základové dosky, hrubé stavby a domy na kľúč. Naše stavebné kapacity pokrývajú celé mesto a priľahlé svahovité pozemky, kde zúročujeme naše inžinierske skúsenosti.
        </p>
        
        {city.slug === 'banska-bystrica' && (
          <div className="pt-4 mt-4 border-t border-zinc-200/60">
            <strong className="text-sm text-zinc-900 block mb-2">
              {`Pôsobíme v celej oblasti ${city.name} a okolí:`}
            </strong>
            <ul className="flex flex-wrap gap-2">
              {["Badín", "Selce", "Slovenská Ľupča", "Harmanec", "Tajov", "Kynceľová"].map((mun, idx) => (
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
    <div className="max-w-3xl mx-auto px-6 mt-16 sm:mt-24 mb-16 space-y-6">
      <h2 className="text-2xl font-display font-bold text-zinc-900 mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-amber-600" />
        Často kladené otázky pre oblasť {city.name}
      </h2>
      <div className="space-y-4">
        <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-xl">
          <h3 className="font-bold text-zinc-900 mb-2">
            Koľko stojí stavba domu na kľúč v {city.locative}?
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Celková cena závisí od veľkosti a špecifikácií projektu. Sme k dispozícii pre osobné obhliadky a nacenenie na mieru priamo u vás v lokalite {city.name}. Využívame optimalizovanú logistiku aby sme zamedzili navýšeným režijným nákladom.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-xl">
          <h3 className="font-bold text-zinc-900 mb-2">
            Kedy viete začať realizáciu v oblasti {city.name}?
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Závisí to od našich aktuálnych voľných kapacít vo vašom regióne. Neváhajte nás kontaktovať a obratom vám upresníme najbližší možný začiatok prác pre okolie mesta {city.name}.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <RodinneDomyServiceDetail
        title={`Stavba domu na kľúč v ${city.locative}`}
        breadcrumbTitle={city.name}
        parentBreadcrumbTitle="Stavba domu na kľúč"
        parentBreadcrumbUrl="/sluzby/rodinne-domy/stavba-domu-na-kluc"
        subtitle1={`Aj v ${city.locative} vám postavíme váš vysnívaný dom bez námahy.`}
        subtitle2="Projekt vám vypracujeme, dom vám postavíme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
        fullDesc={`Staviame rodinné domy podľa požiadaviek a potrieb našich klientov v regióne ${city.name}. Spolupracujeme s architektmi a inžiniermi, aby výsledok zodpovedal vašim predstavám aj vysokým nárokom na kvalitu.\n\nPri výstavbe používame výhradne kvalitné a overené materiály, dbáme na dostatočnú hydroizoláciu, poctivú tepelnú izoláciu a integráciu moderných technológií.`}
        imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
        features={[
          "Kompletné inžinierske projektovanie a zakázková architektúra",
          "Stavba obvodových stien s vysokým tepelným odporom",
          "Integrácia fotovoltických systémov a rekuperácie",
          "Certifikované zakladanie stavby s plnou zárukou",
          "Prémiové interiérové práce a finálne dispozičné úpravy",
        ]}
        stages={[
          {
            step: "01",
            title: "Konzultácia a cenová ponuka",
            desc: "Na základe vašich požiadaviek pripravíme nezáväznú konzultáciu a cenovú ponuku na mieru.",
          },
          {
            step: "02",
            title: "Projekt a povolenia",
            desc: "Plánovanie priestoru, geologické posúdenie, architektonický návrh a vybavenie stavebného povolenia v rámci úradov pre Banskú Bystricu a okolie.",
          },
          {
            step: "03",
            title: "Výstavba na kľúč",
            desc: "Zabezpečíme profesionálnu realizáciu stavby s dôrazom na kvalitu, presnosť a dodržiavanie termínov.",
          },
          {
            step: "04",
            title: "Dokončenie a odovzdanie",
            desc: "Po ukončení prác vám odovzdáme hotové dielo pripravené na kolaudáciu a bezproblémové užívanie.",
          },
        ]}
        equipment={[
          "Rýpadlá a bagre",
          "Systémové lešenia",
          "Vysokopresné stavebné lasery",
          "Vibračné dosky",
          "Priemyselné miešačky zmesí",
        ]}
        options={[
          {
            label: "Ekonomický variant",
            premiumModifier: 1.0,
          },
          {
            label: "Zlatá stredná cesta",
            premiumModifier: 1.25,
          },
          {
            label: "Prémiový variant",
            premiumModifier: 1.45,
          },
        ]}
        category="residential"
        serviceSlug="stavba-domu-na-kluc"
        ctaTitle={`Plánujete výstavbu rodinného domu na kľúč v ${city.locative}?`}
        ctaSubtitle="Nechajte nám na seba kontakt a naši inžinieri sa s vami spoja s návrhom realizácie."
        minSize={80}
        maxSize={400}
        stepSize={5}
        defaultSize={140}
        baseRate={1350}
        customLocationTop={LocationSpecificTop}
        customFaq={LocationFaq}
      />
    </>
  );
}
