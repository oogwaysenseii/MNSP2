import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityBySlug, CITIES } from '@/src/data/cities';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { Home, Hammer, ArrowRight, ShieldCheck, HardHat, CheckCircle2, MapPin, ChevronRight } from 'lucide-react';
import { CTA } from '@/src/components/sections/CTA';
import { Projects } from '@/src/components/sections/Projects';
import BlogSection from '@/src/components/sections/BlogSection';

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

  const title = `Rodinné domy v ${city.locative} | Výstavba a rekonštrukcie`;
  const description = `Špecializujeme sa na výstavbu rodinných domov na kľúč a komplexné rekonštrukcie v lokalite ${city.name} a okolí.`;

  return getSEOTags(title, description);
}

export default async function RodinneDomyMestoPage({ params }: PageProps) {
  const { mesto: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  return (
    <div className="bg-white text-zinc-900 pb-24">
      {/* 1. IMMERSIVE HERO WITH CATEGORY BANNER */}
      <div className="relative h-[50vh] min-h-[400px] bg-zinc-950 text-white overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt={`Stavba a rekonštrukcia rodinných domov ${city.name}`}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-950/40 to-zinc-950/70" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 space-y-4 pt-32">
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            Rodinné domy • {city.name}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            Výstavba a rekonštrukcie rodinných domov v {city.locative}
          </h1>
          <p className="max-w-2xl text-zinc-300 text-sm md:text-base leading-relaxed">
            Naša divízia rodinných domov pokrýva oblasť {city.name} a prináša výstavbu na kľúč a komplexné rekonštrukcie. 
            Využite naše lokálne znalosti, precíznosť a moderné stavebné postupy.
          </p>
        </div>
      </div>

      {/* 2. SERVICES SPLIT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-zinc-950 tracking-tight">
            Naše služby pre rodinné domy
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Pôsobíme priamo u vás v lokalite {city.name}. Či už plánujete stavbu úplne nového rodinného domu na kľúč, alebo hľadáte 
            skúseného partnera na náročnú rekonštrukciu, naše tímy sú pripravené dodať tú najvyššiu kvalitu na trhu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Service 1 */}
          <Link
            href={`/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}`}
            className="group"
          >
            <div className="bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full">
              <div className="h-64 relative overflow-hidden bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt={`Výstavba rodinných domov na kľúč ${city.name}`}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white shadow-md p-3 border border-zinc-100">
                  <Home className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-zinc-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Stavba domu na kľúč v {city.locative}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    Komplexná výstavba moderných, nízkoenergetických rodinných domov. Od základovej 
                    dosky až po odovzdanie kľúčov sa staráme o každý detail, aby ste vy nemuseli.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Kompletné inžinierske siete a základy",
                      "Hrubá stavba a murárske práce",
                      "Strechy, fasády a okná",
                      "Interiérové úpravy a odovzdanie na kľúč",
                    ].map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-zinc-700"
                      >
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

          {/* Service 2 */}
          <Link
            href={`/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`}
            className="group"
          >
            <div className="bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full">
              <div className="h-64 relative overflow-hidden bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"
                  alt={`Rekonštrukcia rodinných domov ${city.name}`}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white shadow-md p-3 border border-zinc-100">
                  <Hammer className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-zinc-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Rekonštrukcia domu v {city.locative}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    Komplexné stavebné rekonštrukcie, historické renovácie a transformácie interiérov v lokalite {city.name}. 
                    Meníme staršie nehnuteľnosti na moderné, bezpečné a energeticky efektívne domovy.
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Búracie práce a likvidácia odpadu",
                      "Nové rozvody a inštalácie (voda, elektrina)",
                      "Zateplenie a nové fasády",
                      "Moderné kúpeľne a zmeny dispozície",
                    ].map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-zinc-700"
                      >
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

      {/* 3. SEO FOCUSED CONTENT SECTION */}
      <div className="bg-zinc-100 py-20 border-y border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 tracking-tight">
              Spoľahlivý partner pre vaše bývanie v oblasti {city.name}
            </h2>
            <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
              Využívame znalosť miestnych podmienok, čím zabezpečujeme efektívny prístup k logistike, materiálom a spoľahlivému riadeniu celého projektu priamo vo vašom regióne. Či už staviate od základov alebo kompletne rekonštruujete starší dom, zabezpečujeme hladký priebeh stavebných prác, dodržanie rozpočtu a použitie kvalitných certifikovaných materiálov. Veríme, že skutočná kvalita spočíva v detailoch, ktoré na prvý pohľad nevidno: v tepelnej izolácii bez mostov, v precíznosti rozvodov a v statickej stabilite vašej stavby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-zinc-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h4 className="font-display font-bold text-zinc-900 text-lg">
                Statika a integrita na prvom mieste
              </h4>
              <p className="text-zinc-600 text-xs leading-relaxed">
                K rodinným domom pristupujeme s rovnakými statickými kritériami ako k väčším projektom. Kvalitná výstuž, správna trieda betónu a precízne tesárske práce zaisťujú dlhodobú stabilitu.
              </p>
            </div>
            <div className="bg-white p-6 border border-zinc-200 shadow-sm space-y-3">
              <HardHat className="w-8 h-8 text-amber-600" />
              <h4 className="font-display font-bold text-zinc-900 text-lg">
                Garancia termínov a kvality
              </h4>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Vieme, že dlhá výstavba znamená ďalšie náklady. Náš harmonogram prác a koordinácia subdodávok eliminujú prestoje a zabezpečujú odovzdanie diela načas a bez skrytých chýb.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. COMPLETED PAST PROJECTS IN THIS DIVISION */}
      <Projects
        defaultCategory="residential"
        hideFilters={true}
        titleSk="Realizácie rodinných domov"
        subtitleSk="Pozrite si ukážky našej poctivej práce pri výstavbe a rekonštrukcii rodinných domov."
      />

      {/* 5. BLOG SECTION */}
      <div className="border-t border-zinc-200">
        <BlogSection compact={true} filterCategory="Pasívny dom" />
      </div>

      {/* 6. LOCATIONS BLOCK */}
      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-8">
        <div className="bg-zinc-50 border border-zinc-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-display font-bold text-zinc-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              Pôsobíme aj v ďalších regiónoch
            </h2>
            <Link
              href="/lokality"
              className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
            >
              Zobraziť všetky regionálne pobočky
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {CITIES.filter(c => c.slug !== city.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/sluzby/rodinne-domy/${c.slug}`}
                className="inline-flex items-center px-4 py-2 bg-white border border-zinc-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-colors shadow-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CTA 
        title={`Plánujete stavbu alebo rekonštrukciu v lokalite ${city.name}?`}
        subtitle="Zanechajte nám na seba kontakt a my sa o všetko postaráme."
      />
    </div>
  );
}
