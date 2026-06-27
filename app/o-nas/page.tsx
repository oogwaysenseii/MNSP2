import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = getSEOTags(
  "O nás",
  "Sme malá, no ambiciózna stavebná firma, ktorá si zakladá na kvalite a férovom prístupe.",
  "/o-nas"
);

export default function Page() {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-24 text-zinc-900 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header Section */}
        <div className="space-y-6">
          <span className="text-xs font-mono bg-amber-500/10 text-amber-700 font-bold tracking-widest px-3 py-1 rounded-full uppercase inline-block">
            KTO SME
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight">
            Sme malá stavebná firma s veľkými ambíciami.
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed max-w-3xl">
            Nie sme nadnárodný korporát, ani sa na neho nehráme. Sme zohratý tím ľudí, ktorí majú radi stavebné remeslo a záleží im na tom, aby za nimi zostala kvalitná práca, nie reklamácie.
          </p>
        </div>

        {/* Image */}
        <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md">
          <Image 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
            alt="Stavebné práce"
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 pt-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-zinc-900">
              Naša filozofia
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              Veríme, že poctivá práca hovorí sama za seba. Na trhu je množstvo veľkých firiem, no my preferujeme osobný prístup. Zákazník u nás nie je len číslom v Exceli. Všetkým našim projektom, od rekonštrukcie kúpeľne až po stavbu rodinného domu, venujeme rovnakú pozornosť a dôraz na detail.
            </p>
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              Rastieme organicky, vďaka odporúčaniam našich spokojných klientov. Naša ambícia nie je byť najväčšou firmou v regióne, ale firmou, ktorej prácu budú klienti s hrdosťou ukazovať svojim známym.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-zinc-900">
              Na čom si zakladáme
            </h2>
            <div className="space-y-4">
              {[
                { title: "Férová cenotvorba", desc: "Ponuky píšeme transparentne. Žiadne skryté poplatky uprostred realizácie." },
                { title: "Osobný prístup", desc: "Sme v priamom kontakte so zákazníkom. Vždy viete, s kým hovoríte." },
                { title: "Kvalita nad kvantitu", desc: "Neberieme každú zákazku za každú cenu. Robíme len toľko, koľko vieme urobiť stopercentne." },
                { title: "Dodržiavanie termínov", desc: "Čas je dôležitý pre nás aj pre vás. Ak sa na niečom dohodneme, tak to platí." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">{item.title}</h3>
                    <p className="text-sm text-zinc-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="pt-12 border-t border-zinc-200">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 mb-4">
              Rozmýšľate nad spoluprácou?
            </h2>
            <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
              Ozvite sa nám. Radi si vypočujeme vašu predstavu a otvorene vám povieme, ako vám vieme pomôcť a koľko by to orientačne stálo.
            </p>
            <Link 
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-zinc-950 font-bold text-sm tracking-widest uppercase hover:bg-amber-400 transition-colors shadow-lg"
            >
              Napíšte nám
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
