import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getConditions } from '@/src/data/city-conditions';
import { rodinneDomyLocalAngle } from '@/src/data/service-local-angles';
import {
  TURNKEY_FEATURES,
  RENOVATION_FEATURES,
  TURNKEY_DESCRIPTION,
  RENOVATION_DESCRIPTION,
  WHY_US,
} from '@/src/data/rodinne-domy-content';
import { getSEOTags } from '@/src/lib/seo';
import {
  generateServicePageSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  DOMAIN,
} from '@/src/lib/schema';
import { Metadata } from 'next';
import { Home, Hammer, ArrowRight, ShieldCheck, HardHat, CheckCircle2, MapPin } from 'lucide-react';
import { CTA } from '@/src/components/sections/CTA';
import { Projects } from '@/src/components/sections/Projects';
import { projectsInCityForCategory } from '@/src/data/projects';
import { LocationsSection } from '@/src/components/sections/LocationsSection';

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

  // The layout appends " | MNSP" (7 chars). Long town names — Banská
  // Štiavnica, Rimavská Sobota, Žiar nad Hronom — pushed the full form past
  // the ~60 characters Google renders, so the middle segment is dropped for
  // those rather than letting the tail get truncated mid-phrase.
  const fullTitle = `Rodinné domy ${city.name} | Výstavba a rekonštrukcie`;
  const title =
    fullTitle.length + 7 > 60 ? `Rodinné domy ${city.name}` : fullTitle;
  const description = `Staviame rodinné domy na kľúč a robíme komplexné rekonštrukcie ${city.locative} a okolí. Zakladanie, hrubá stavba, rozvody, fasáda aj odovzdanie hotového diela.`;

  return getSEOTags(title, description, `/sluzby/rodinne-domy/${citySlug}`);
}

export default async function RodinneDomyMestoPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const conditions = getConditions(city.slug);
  if (!conditions) notFound();

  const angle = rodinneDomyLocalAngle(conditions, city.locative, city.genitive);

  // Real family-house work in this town. Drives the projects section below.
  const localProof = projectsInCityForCategory(city.slug, 'Rodinné domy');

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: 'Rodinné domy', path: '/sluzby/rodinne-domy' },
      { name: city.name, path: `/sluzby/rodinne-domy/${city.slug}` },
    ]),
    ...generateServicePageSchema(
      `Výstavba a rekonštrukcie rodinných domov ${city.locative}`,
      `Výstavba rodinných domov na kľúč a komplexné rekonštrukcie ${city.locative} a okolí.`,
      `${DOMAIN}/sluzby/rodinne-domy/${city.slug}`,
      city.name,
    ),
    generateFaqSchema(angle.faq),
  ];

  return (
    <div className="bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO */}
      <div className="relative h-[50vh] min-h-[440px] bg-zinc-950 text-white overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/rodinne-domy/rodinne-domy.webp"
            alt={`Stavba a rekonštrukcia rodinných domov ${city.locative}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%] opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-950/40 to-zinc-950/70" />
        </div>

        <div className="max-w-[1500px] relative z-10 w-full mx-auto px-6 pb-14 pt-28 space-y-4">
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            Rodinné domy • {city.name}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            Výstavba a rekonštrukcie rodinných domov {city.locative}
          </h1>
          <p className="max-w-2xl text-zinc-300 text-sm md:text-base leading-relaxed">
            Pokrývame aj oblasť {city.name} a prinášame výstavbu na kľúč a komplexné
            rekonštrukcie. Využite naše lokálne znalosti, precíznosť a moderné stavebné
            postupy.
          </p>
        </div>
      </div>

      {/* 2. TWO SERVICE CARDS */}
      <div className="max-w-[1500px] mx-auto px-6 mt-10 mb-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-zinc-950 tracking-tight">
            Naše služby pre rodinné domy
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Pôsobíme priamo u vás v okrese {city.name}. Či už plánujete stavbu úplne nového
            rodinného domu na kľúč, alebo hľadáte skúseného partnera na náročnú
            rekonštrukciu, naše tímy sú pripravené.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <Link href={`/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}`} className="group">
            <div className="bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full">
              <div className="h-64 relative overflow-hidden bg-zinc-950">
                <Image
                  src="/rodinne-domy/stavba-domu-na-kluc.webp"
                  alt={`Výstavba rodinných domov na kľúč ${city.locative}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_70%] opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white shadow-md p-3 border border-zinc-100">
                  <Home className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-zinc-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Stavba domu na kľúč {city.locative}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    {TURNKEY_DESCRIPTION}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {TURNKEY_FEATURES.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center text-xs font-mono font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-700">
                  Zistiť viac o výstavbe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`} className="group">
            <div className="bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full">
              <div className="h-64 relative overflow-hidden bg-zinc-950">
                <Image
                  src="/rodinne-domy/rekonstrukcia-rodinneho-domu.webp"
                  alt={`Rekonštrukcia rodinných domov ${city.locative}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_70%] opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white shadow-md p-3 border border-zinc-100">
                  <Hammer className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-zinc-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Rekonštrukcia domu {city.locative}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    {RENOVATION_DESCRIPTION}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {RENOVATION_FEATURES.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center text-xs font-mono font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-700">
                  Zistiť viac o rekonštrukciách
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. LOCAL CONDITIONS — genuinely differs per city */}
      <div className="bg-zinc-100 py-20 border-y border-zinc-200">
        <div className="max-w-[1500px] mx-auto px-6 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">
                Miestne podmienky
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 tracking-tight">
              Na čo si dať pozor pri stavbe {city.locative}
            </h2>
            <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
              {angle.body}
            </p>
            <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
              Či už staviate od základov alebo kompletne rekonštruujete starší dom,
              zabezpečujeme hladký priebeh stavebných prác, dodržanie rozpočtu a použitie
              kvalitných materiálov. Veríme, že skutočná kvalita spočíva v detailoch, ktoré
              na prvý pohľad nevidno: v tepelnej izolácii bez mostov, v precíznosti rozvodov
              a v statickej stabilite vašej stavby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-zinc-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="font-display font-bold text-zinc-900 text-lg">
                Statika a integrita na prvom mieste
              </h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                K rodinným domom pristupujeme s rovnakými statickými kritériami ako k väčším
                projektom. Kvalitná výstuž, správna trieda betónu a precízne tesárske práce
                zaisťujú dlhodobú stabilitu.
              </p>
            </div>
            <div className="bg-white p-6 border border-zinc-200 shadow-sm space-y-3">
              <HardHat className="w-8 h-8 text-amber-600" />
              <h3 className="font-display font-bold text-zinc-900 text-lg">
                Garancia termínov a kvality
              </h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Vieme, že dlhá výstavba znamená ďalšie náklady. Náš harmonogram prác a
                koordinácia subdodávok eliminujú prestoje a zabezpečujú odovzdanie diela
                načas a bez skrytých chýb.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PROJECTS — where we have actually built in this town, that leads.
             The unfiltered grid is the same on all 11 city pages and on the
             parent, so it only runs as the fallback. */}
      {localProof.length > 0 ? (
        <Projects
          defaultCategory="Rodinné domy"
          hideFilters={true}
          onlyIds={localProof.map((p) => p.id)}
          titleSk={`Naše realizácie ${city.locative} a v okolí`}
          subtitleSk={`Rodinné domy, ktoré sme postavili alebo zrekonštruovali v okolí ${city.genitive} — referencie z tejto lokality, nie ilustračné fotografie.`}
        />
      ) : (
        <Projects
          defaultCategory="Rodinné domy"
          hideFilters={true}
          titleSk="Realizácie rodinných domov"
          subtitleSk="Prehľad zrealizovaných a prebiehajúcich projektov výstavby a rekonštrukcií rodinných domov."
        />
      )}

      {/* 5. BLOG — identical cards on the parent and all 11 city pages. Kept on
             /sluzby/rodinne-domy, dropped here. */}

      {/* 6. WHY US + LOCATIONS */}
      <div className="max-w-[1500px] mx-auto px-6 mt-16 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
            <div className="text-center space-y-2 mb-6">
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-display font-extrabold text-zinc-900">
                Prečo si vybrať nás?
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
Stavba či rekonštrukcia rodinného domu si vyžaduje skúsenosti, odborný
                prístup a zodpovednosť. V okrese {city.name} a okolí ({city.surrounding.join(', ')})
                postavíme váš dom spoľahlivo a bez starostí.
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

          <LocationsSection serviceSlug="rodinne-domy" citySlug={city.slug} />
        </div>
      </div>

      <CTA
        title={`Plánujete stavbu alebo rekonštrukciu ${city.locative}?`}
        subtitle="Vypracujeme vám detailnú cenovú ponuku, vďaka ktorej získate úplný prehľad o nákladoch a platobných podmienkach pri stavbe rodinného domu."
        pageName={`Rodinné domy - ${city.name}`}
      />

      {/* FAQ — below the CTA, so the conversion path comes first */}
      {angle.faq.length > 0 && (
        <section className="bg-zinc-50 border-t border-zinc-200 py-20">
          <div className="max-w-[1500px] mx-auto px-6">
            <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block mb-3">
              Časté otázky
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 mb-3">
              Na čo sa pýtajú stavebníci {city.locative}
            </h2>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              Ak medzi nimi nenájdete tú svoju, zavolajte nám — odpovieme aj na tie
              nepríjemné.
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
                  <div className="pb-5 pr-8 text-zinc-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
