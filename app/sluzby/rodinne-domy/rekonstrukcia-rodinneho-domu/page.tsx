import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, DOMAIN } from '@/src/lib/schema';
import type { Metadata } from 'next';

const title = "Rekonštrukcia rodinného domu";
const description = "Sanácia statiky, zatepľovanie a komplexné rekonštrukcie pre staršie nehnuteľnosti.";

const seo = getSEOTags(
    title,
    description,
    '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu'
);

export const metadata: Metadata = seo;

export default function RekonstrukciaDomuPage() {
  const jsonLd = generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu`);

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
        />
      <RodinneDomyServiceDetail
      title="Rekonštrukcia rodinného domu"
      breadcrumbTitle="Rekonštrukcia domu"
      subtitle1="Zrekonštruujte si svoj vysnívaný dom bez námahy."
      subtitle2="Projekt vám vypracujeme, dom vám zrekonštruujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
      fullDesc={`Naša divízia prémiových rekonštrukcií prináša špičkovú kvalitu do starších nehnuteľností. Zvyšujeme životnú úroveň pôvodných domov prostredníctvom moderných technológií, energetických úspor a rešpektovania statiky pôvodnej budovy.\n\nČi už potrebujete komplexné statické spevnenie nosných stien, výmenu starých inštalácií, precízne zateplenie, alebo kompletnú premenu interiérových dispozícií na kľúč, naši remeselníci garantujú najvyššiu stavebnú presnosť.`}
      imageUrl="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80"
      features={[
        "Dlhoročné skúsenosti s rekonštrukciami rodinných domov",
        "Kompletná realizácia, všetko vybavíme za vás",
        "Profesionálny dohľad nad každou fázou rekonštrukcie",
        "Transparentná komunikácia a férový prístup",
      ]}
      stages={[
        {
          step: "01",
          title: "Konzultácia a obhliadka",
          desc: "Na základe obhliadky objektu a vašich požiadaviek navrhneme optimálne riešenie a pripravíme cenovú ponuku.",
        },
        {
          step: "02",
          title: "Návrh rekonštrukcie",
          desc: "Vypracujeme plán prác, navrhneme technické riešenia a pomôžeme s potrebnou dokumentáciou.",
        },
        {
          step: "03",
          title: "Realizácia rekonštrukcie",
          desc: "Zabezpečíme odborné stavebné práce vrátane búrania, úprav dispozície, výmeny rozvodov a modernizácie priestoro",
        },
        {
          step: "04",
          title: "Dokončenie a odovzdanie",
          desc: "Po ukončení všetkých prác vám odovzdáme zrekonštruovaný objekt pripravený na komfortné a bezproblémové užívanie.",
        },
      ]}
      equipment={[
        "Diamantové jadrové vŕtačky",
        "Hydraulické podpery",
        "Priemyselné búracie kladivá",
        "Stavebné skenery stien",
        "Odvlhčovače",
      ]}
      options={[
        {
          label: "Čiastočná rekonštrukcia (Interiérové omietky, potery, okná, podlahy a maľby)",
          premiumModifier: 1.0,
        },
        {
          label: "Kompletná rekonštrukcia (Nová statika, kompletná výmena rozvodov, strecha a zateplenie)",
          premiumModifier: 1.45,
        },
        {
          label: "Prémiová historická renovácia (Záchrana detailov, prírodné omietky, inteligentná elektroinštalácia)",
          premiumModifier: 1.8,
        },
      ]}
      category="residential"
      serviceSlug="rekonstrukcia-rodinneho-domu"
      ctaTitle="Plánujete rekonštrukciu staršieho rodinného domu?"
      ctaSubtitle="Nechajte nám na seba kontakt a posúdime stav vašej nehnuteľnosti a navrhneme optimálne riešenie."
      blogFilterCategory="Rekonštrukcia"
      minSize={50}
      maxSize={300}
      stepSize={5}
      defaultSize={120}
      baseRate={950} // 950 za m2 pre rekonstrukciu (base)
    />
    </>
  );
}
