import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, generateOrganizationSchema, DOMAIN } from '@/src/lib/schema';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CTA } from '@/src/components/sections/CTA';
import { CITIES } from '@/src/data/cities';
import { projectsData } from '@/src/data/projects';

export const metadata: Metadata = getSEOTags(
  'O nás',
  'Sme malá stavebná firma so sídlom vo Zvolene. Staviame rodinné domy na kľúč, bytové a priemyselné objekty aj verejné budovy — bez korporátnych rečí.',
  '/o-nas',
);

const VALUES = [
  {
    title: 'Férová cenotvorba',
    desc: 'Ponuky píšeme položkovito a transparentne. Žiadne skryté poplatky uprostred realizácie.',
  },
  {
    title: 'Osobný prístup',
    desc: 'Sme v priamom kontakte so zákazníkom. Vždy viete, s kým hovoríte.',
  },
  {
    title: 'Kvalita nad kvantitu',
    desc: 'Neberieme každú zákazku za každú cenu. Robíme len toľko, koľko vieme urobiť poriadne.',
  },
  {
    title: 'Dodržiavanie termínov',
    desc: 'Harmonogram dohodneme v zmluve. Ak sa na niečom dohodneme, tak to platí.',
  },
];

export default function Page() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'O nás', path: '/o-nas' },
    ]),
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'O nás',
      url: `${DOMAIN}/o-nas`,
      mainEntity: { '@id': `${DOMAIN}/#organization` },
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-10 text-zinc-900 border-t border-zinc-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1500px] mx-auto px-6 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <span className="text-xs font-mono bg-amber-500/10 text-amber-700 font-bold tracking-widest px-3 py-1 uppercase inline-block">
            Kto sme
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight">
            Sme malá stavebná firma s veľkými ambíciami.
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed">
            Nie sme nadnárodný korporát, ani sa na neho nehráme. Sme zohratý tím ľudí, ktorí
            majú radi stavebné remeslo a záleží im na tom, aby za nimi zostala kvalitná práca,
            nie reklamácie.
          </p>
        </div>

        {/* Real project photo — this page argues we're not a faceless firm,
            so a stock image was the wrong thing to lead with. */}
        <div className="relative h-64 sm:h-[28rem] w-full overflow-hidden border border-zinc-200">
          <Image
            src="/rodinny-dom-banska-bystrica-slnecne-strane.webp"
            alt="Rodinný dom v Banskej Bystrici počas dokončovacích prác"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-zinc-900">Naša filozofia</h2>
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              Veríme, že poctivá práca hovorí sama za seba. Na trhu je množstvo veľkých firiem,
              no my preferujeme osobný prístup. Zákazník u nás nie je len číslom v Exceli.
              Všetkým našim projektom, od rekonštrukcie rodinného domu až po zariadenie
              sociálnych služieb, venujeme rovnakú pozornosť a dôraz na detail.
            </p>
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              Rastieme organicky, vďaka odporúčaniam našich klientov. Naša ambícia nie je byť
              najväčšou firmou v regióne, ale firmou, ktorej prácu budú klienti s hrdosťou
              ukazovať svojim známym.
            </p>
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              Sídlime vo Zvolene a pôsobíme v {CITIES.length} okresoch Banskobystrického kraja.
              Na hrubú stavbu máme vlastných remeselníkov, pri špecializovaných profesiách
              spolupracujeme s ľuďmi, ktorých poznáme roky.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-zinc-900">Na čom si zakladáme</h2>
            <div className="space-y-4">
              {VALUES.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
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

        <div className="pt-8 border-t border-zinc-200">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-amber-600 transition-colors group"
            >
              Naše realizácie ({projectsData.length})
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/lokality"
              className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-amber-600 transition-colors group"
            >
              Kde pôsobíme
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/sluzby"
              className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-amber-600 transition-colors group"
            >
              Čo pre vás postavíme
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTA
          title="Rozmýšľate nad spoluprácou?"
          subtitle="Ozvite sa nám. Radi si vypočujeme vašu predstavu a otvorene vám povieme, ako vám vieme pomôcť a koľko by to orientačne stálo."
          pageName="O nás"
        />
      </div>
    </div>
  );
}
