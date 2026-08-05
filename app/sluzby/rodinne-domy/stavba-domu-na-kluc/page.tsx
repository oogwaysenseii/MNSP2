import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { TURNKEY_RATE_PER_M2, STANDARD_OPTIONS } from '@/src/data/pricing';
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema, DOMAIN } from '@/src/lib/schema';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { WHY_US, TURNKEY_SELLING_POINTS, EQUIPMENT } from "@/src/data/rodinne-domy-content";

const title = "Stavba domu na kľúč | Výstavba rodinných domov";
const description = "Realizujeme výstavbu rodinných domov na kľúč od projektu až po kolaudáciu. Rodinné domy s dôrazom na precízne remeselné spracovanie.";

const seo = getSEOTags(
    title,
    description,
    '/sluzby/rodinne-domy/stavba-domu-na-kluc'
);

export const metadata: Metadata = seo;

const FAQ = [
  {
    q: 'Ako dlho trvá stavba domu na kľúč?',
    a: 'Štandardný murovaný rodinný dom dokážeme pri plynulom financovaní postaviť do 9 – 12 mesiacov, vrátane technologických prestávok na zretie materiálov.',
  },
  {
    q: 'Čo všetko je zahrnuté v cene?',
    a: 'Cena „na kľúč“ zahŕňa kompletnú realizáciu od základov po finálne povrchy – elektroinštalácie, omietky, obklady, sanitu aj vykurovanie. Presný rozsah vždy vymedzíme v zmluve, aby ste vopred vedeli, čo v cene je a čo nie.',
  },
  {
    q: 'Je možné počas stavby meniť projekt?',
    a: 'Drobné zmeny, ako napríklad posunutie nenosnej priečky či pridanie zásuvky, vieme flexibilne riešiť. Zásadné zmeny nosných konštrukcií si však vyžadujú zmenu stavebného povolenia.',
  },
  {
    q: 'Zabezpečujete aj inžinierske siete?',
    a: 'Áno, súčasťou našej dodávky môže byť aj pripojenie pozemku na elektrinu, vodu, plyn a kanalizáciu, vrátane zemných výkopových prác a revíznych správ.',
  },
];

export default function StavbaDomuNaKlucPage() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: 'Rodinné domy', path: '/sluzby/rodinne-domy' },
      { name: 'Stavba domu na kľúč', path: '/sluzby/rodinne-domy/stavba-domu-na-kluc' },
    ]),
    generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc`),
    generateFaqSchema(FAQ),
  ];

  const faqSection = (
      <div className="max-w-[1500px] mx-auto px-6 mt-16 mb-10 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">Časté otázky</span>
          <h2 className="text-3xl font-display font-extrabold text-zinc-900">Otázky a odpovede o stavbe na kľúč</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
              <h3 className="font-bold text-zinc-900">{item.q}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
  );

  const whyUsSection = (
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
        <div className="text-center space-y-2 mb-6">
          <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
          <h2 className="text-2xl font-display font-extrabold text-zinc-900">Prečo si vybrať nás?</h2>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
            Stavba rodinného domu si vyžaduje skúsenosti, odborný prístup a zodpovednosť.
            Postavíme váš dom spoľahlivo a bez starostí.
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
  );

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd)
            }}
        />

        <RodinneDomyServiceDetail
            title="Stavba domu na kľúč"
            breadcrumbTitle="Stavba domu na kľúč"
            subtitle1="Postavte si svoj vysnívaný dom bez námahy."
            subtitle2="Projekt vám vypracujeme, dom vám postavíme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
            fullDesc={`Staviame rodinné domy podľa požiadaviek a potrieb našich klientov. Spolupracujeme s architektmi a inžiniermi, aby výsledok zodpovedal vašim predstavám aj vysokým nárokom na kvalitu.\n\nPri výstavbe používame výhradne kvalitné a overené materiály, dbáme na dostatočnú hydroizoláciu, poctivú tepelnú izoláciu a integráciu moderných technológií.`}
            imageUrl="/rodinne-domy/stavba-domu-na-kluc.webp"
            features={[...TURNKEY_SELLING_POINTS]}
            stages={[
              {
                step: "01",
                title: "Konzultácia a cenová ponuka",
                desc: "Na základe vašich požiadaviek pripravíme nezáväznú konzultáciu a cenovú ponuku na mieru.",
              },
              {
                step: "02",
                title: "Projekt a povolenia",
                desc: "Plánovanie priestoru, geologické posúdenie, architektonický návrh a vybavenie stavebného povolenia.",
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
            equipment={[...EQUIPMENT]}
            options={STANDARD_OPTIONS}
            category="Rodinné domy"
            serviceSlug="stavba-domu-na-kluc"
            ctaTitle="Plánujete výstavbu rodinného domu na kľúč?"
            ctaSubtitle="Nechajte nám na seba kontakt a naši inžinieri sa s vami spoja s návrhom realizácie."
            blogFilterCategory="Stavba domu"
            customFaq={faqSection}
            whyChooseUs={whyUsSection}
            minSize={80}
            maxSize={400}
            stepSize={5}
            defaultSize={140}
            baseRate={TURNKEY_RATE_PER_M2}
        />
      </>
  );
}
