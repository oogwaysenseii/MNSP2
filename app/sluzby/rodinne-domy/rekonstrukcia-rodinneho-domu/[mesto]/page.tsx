import { notFound, redirect } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getSEOTags } from '@/src/lib/seo';
import { RodinneDomyServiceDetail } from '@/src/components/sections/RodinneDomyServiceDetail';
import { Metadata } from 'next';
import { CheckCircle2, ShieldCheck, MapPin, HelpCircle } from 'lucide-react';
import { generateServiceAndLocalBusinessSchema, DOMAIN } from '@/src/lib/schema';

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

  const title = `Rekonštrukcia rodinného domu v ${city.locative} | MNSP`;
  const description = `Komplexné rekonštrukcie rodinných domov na kľúč. Profesionálna realizácia priamo pre obyvateľov v oblasti ${city.name} a okolí. Kontaktujte nás pre nezáväznú cenovú ponuku.`;

  return getSEOTags(title, description, `/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${citySlug}`);
}

export default async function RekonstrukciaLocationPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const jsonLd = generateServiceAndLocalBusinessSchema(
      `Rekonštrukcia rodinného domu v ${city.locative}`,
      `Profesionálna rekonštrukcia rodinných domov v oblasti ${city.name}.`,
      `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`,
      city.slug
  );

  const LocationSpecificTop = (
      <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
        <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-amber-500" />
          <h3 className="text-white font-display font-medium text-lg">
            {`Špecifiká rekonštrukcií pre región ${city.name}`}
          </h3>
        </div>
        <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
          <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-medium">
            V {city.locative} realizujeme kompletné alebo čiastočné rekonštrukcie rodinných domov, nadstavby, prístavby a modernizácie. Naše stavebné kapacity pokrývajú celé mesto a priľahlé oblasti. Zabezpečujeme plynulý chod prác a odborné riešenia pre všetky typy domov.
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
                Odvoz a nakladanie s materiálom
              </strong>
              <p className="text-xs text-zinc-500">
                V spolupráci s lokálnymi dodávateľmi zaručujeme plynulý chod prerábky s minimálnym dopadom na vaše okolie v meste {city.name}.
              </p>
            </div>

            <div className="bg-white p-4 border border-zinc-150">
            <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
              Územné plánovanie
            </span>
              <strong className="text-sm text-zinc-900 block mb-1">
                Stavebné povolenia a ohlášky
              </strong>
              <p className="text-xs text-zinc-500">
                Zastrešujeme komunikáciu s miestnymi úradmi pre bezproblémové povolenia v území {city.accusative}.
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
              Zabezpečujete aj odvoz a likvidáciu sute pre {city.accusative}?
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Áno, v rámci rekonštrukčných prác zabezpečujeme kompletné nakladanie so stavebným odpadom a jeho triedenie i legálnu likvidáciu na skládkach dostupných pre oblasť {city.name}.
            </p>
          </div>
          <div className="bg-white border border-zinc-200 p-6 shadow-sm rounded-xl">
            <h3 className="font-bold text-zinc-900 mb-2">
              Kedy viete začať realizáciu v oblasti {city.name}?
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Závisí to od našich aktuálnych voľných kapacít vo vašom regióne. V prípade rekonštrukcií vieme často začať aj skôr. Neváhajte nás kontaktovať pre presný termín v rámci mesta {city.name}.
            </p>
          </div>
        </div>
      </div>
  );

  const whyUsSection = (
      <div className="bg-white border border-zinc-200 p-8 sm:p-10 text-center h-full flex flex-col justify-center space-y-6">
        <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
        <h2 className="text-2xl font-display font-extrabold text-zinc-900">Prečo zveriť rekonštrukciu nám?</h2>
        <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
          Rekonštrukcia starého domu v oblasti {city.name} si vyžaduje špecifické odborné znalosti a skúsený prístup. Sme priamo zhotoviteľmi stavieb, disponujeme vlastnou technikou aj na náročné búracie a zemné práce. Staráme sa o správnu statiku, izolácie a celkovú modernizáciu vášho domova so zárukou na vykonané práce a ohľadom na váš rozpočet.
        </p>
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
        <RodinneDomyServiceDetail
            title={`Rekonštrukcia domu ${city.name}`}
            breadcrumbTitle={city.name}
            parentBreadcrumbTitle="Rekonštrukcia domu"
            parentBreadcrumbUrl="/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu"
            subtitle1={`Aj v ${city.locative} vám zrekonštruujeme váš dom bez starostí.`}
            subtitle2="Projekt vám vypracujeme, dom vám zrekonštruujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
            fullDesc={`Realizujeme kompletné alebo čiastočné rekonštrukcie rodinných domov v meste ${city.name} a okolí. Spolupracujeme s tými najlepšími v obore s ohľadom na aktuálne normy, statiku a historickú hodnotu budov.\n\nSme prispôsobený na riadenie komplikovaných búracich prác u starých objektov, vstavby podkroví, sanácií muriva, nadstavbám a podobne.`}
            imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
            features={[
              "Búracie práce s vlastnou stavebnou technikou a odvozom sutín",
              "Kompletné zosilnenie statiky, podchytenie základov",
              "Sanácia vlhkosti a inštalácia izolácií u starých domov",
              "Nadstavby, prístavby a prestavby starých a sedlových striech",
              "Zatepľovanie a celkové obnovenie historickej či pôvodnej fasády"
            ]}
            stages={[
              {
                step: "01",
                title: "Technická obhliadka",
                desc: "Naši inžinieri osobne skontrolujú statiku a technický stav objektu priamo v "+city.locative+".",
              },
              {
                step: "02",
                title: "Projekt a rozpočet",
                desc: "Pripravíme štúdiu a rozpočet, pri komplikovaných rekonštrukciách zohľadňujeme aj havarijné položky.",
              },
              {
                step: "03",
                title: "Búracie práce",
                desc: "Demontáž pôvodných prvkov podľa projektu s dôkladnou evakuáciou a triedením odpadu.",
              },
              {
                step: "04",
                title: "Nová výstavba",
                desc: "Realizácia nadstavieb, prístavieb, nové inštalácie z kvalitných materiálov k predaniu.",
              },
            ]}
            equipment={[
              "Búracie roboty Husqvarna",
              "Kontajnery s nákladnými autami",
              "Laserové zameriavače na staré múry",
              "Pažiace boxy a systémové vzpery",
              "Odvlhčovacie turbíny",
            ]}
            options={[
              {
                label: "Čiastočná rekonštrukcia (Nové jadro, čiastkové podlahy, sanita, omietky)",
                premiumModifier: 1.0,
              },
              {
                label: "Kompletný upgrade (Všetky inžinierske siete, zateplenie striech a fasád, hliník)",
                premiumModifier: 1.25,
              },
              {
                label: "Prestavba na pasív/nízkoenergetiku (+ Smart technológie a TČ)",
                premiumModifier: 1.50,
              },
            ]}
            category="residential"
            serviceSlug="rekonstrukcia-rodinneho-domu"
            citySlug={city.slug}
            whyChooseUs={whyUsSection}
            ctaTitle={`Máte záujem o rekonštrukciu domu v ${city.locative}?`}
            ctaSubtitle="Spojte sa s našim tímom a dohodnite si termín technickej obhliadky na mieste."
            minSize={50}
            maxSize={300}
            stepSize={5}
            defaultSize={120}
            baseRate={950}
            customLocationTop={LocationSpecificTop}
            locationFilter={city.name}
        />
        {LocationFaq}
      </>
  );
}
