import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Building2, Coins, Leaf, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { getSEOTags } from '@/src/lib/seo';
import { generateServiceSchema, DOMAIN } from '@/src/lib/schema';

const title = 'Elevated Urban Development';
const description = 'Revolučný koncept využitia parkovacích plôch na luxusné a komerčné priestory.';

export const metadata: Metadata = getSEOTags(title, description, '/elevated-urban-development');

export default function ElevatedUrbanDevelopmentPage() {
  const jsonLd = generateServiceSchema(title, description, `${DOMAIN}/elevated-urban-development`);

  return (
    <div className="bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/10 opacity-30 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-mono font-bold uppercase tracking-widest border border-amber-500/20">
                <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
                VÍZIA BUDÚCNOSTI
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight tracking-tight">
                Elevated Urban Development
              </h1>
              
              <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-xl">
                Premieňame nevyužité parkoviská na cenné obytné a komerčné priestory. Vytvárame hodnotu vo vzduchu bez zaberania novej pôdy a prinášame revolúciu do mestskej zástavby.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  Mám záujem
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="relative h-[400px] sm:h-[500px] w-full rounded-none overflow-hidden border border-zinc-800 shadow-2xl">
              <Image 
                src="/elevated-urban-developement.webp"
                alt="Moderná architektúra budovy" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-extrabold text-zinc-950 mb-6">Prečo investovať do Elevated Urban Development?</h2>
          <p className="text-zinc-600 text-lg">Zhodnotenie majetku bez straty parkovacích kapacít.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border border-zinc-200 flex items-center justify-center text-amber-600 mb-6 rounded-full">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Zachováme parkovanie</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Konštrukcia je navrhnutá tak, aby prízemná plocha naďalej plnohodnotne slúžila pre parkovacie účely, čím nestrácate pôvodnú infraštruktúru.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border border-zinc-200 flex items-center justify-center text-amber-600 mb-6 rounded-full">
              <Coins className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Nové zdroje príjmu</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Získate komerčné či rezidenčné plochy vhodné na rýchly prenájom, čím sa váš pasívny majetok zmení na vysoko výnosné aktívum.
            </p>
          </div>

          <div className="p-8 bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border border-zinc-200 flex items-center justify-center text-amber-600 mb-6 rounded-full">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Ekologické a Udržateľné</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Nestaviame na zelenej lúke, ale efektívne využívame už zastavané mestské zóny. Pomáhame mestám rásť s rozumom a ohľadom na životné prostredie.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="bg-zinc-950 py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-6 tracking-tight">Sme pripravení spustiť váš projekt</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Radi preberieme možnosti výstavby vo vašej lokalite a vypracujeme nezáväznú analýzu realizovateľnosti a výnosnosti projektu.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
          >
            Kontaktujte nás
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
