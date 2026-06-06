import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";

export const metadata = getSEOTags("Rekonštrukcia rodinného domu", "Sanácia statiky, zatepľovanie a komplexné rekonštrukcie pre staršie nehnuteľnosti.");

export default function RekonstrukciaDomuPage() {
  return (
    <RodinneDomyServiceDetail
      title="Rekonštrukcia rodinného domu"
      breadcrumbTitle="Rekonštrukcia domu"
      fullDesc={`Naša divízia prémiových rekonštrukcií prináša špičkovú kvalitu do starších nehnuteľností. Zvyšujeme životnú úroveň pôvodných domov prostredníctvom moderných technológií, energetických úspor a rešpektovania statiky pôvodnej budovy.\n\nČi už potrebujete komplexné statické spevnenie nosných stien, výmenu starých inštalácií, precízne zateplenie, alebo kompletnú premenu interiérových dispozícií na kľúč, naši remeselníci garantujú najvyššiu stavebnú presnosť.`}
      imageUrl="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80"
      features={[
        "Sanácie a statické zosilňovanie pôvodných konštrukcií",
        "Búracie práce a vkladanie nových nosných oceľových prekladov",
        "Prémiové kompletné dispozičné zmeny na kľúč",
        "Dodatočné zateplenie, nové omietky a výmena zastaralých rozvodov",
        "Odstránenie vlhkosti, profesionálne injektáže a hydroizolácie",
      ]}
      stages={[
        {
          step: "01",
          title: "Zosilnenie a statika",
          desc: "Zhodnotenie stavu, dočasné podopretie stropov a overenie statiky s navrhnutím prekladov pred začaním prác.",
        },
        {
          step: "02",
          title: "Búranie a sanácia",
          desc: "Šetrné vybúranie nenosných stien, odstránenie starých podláh a omietok s profesionálnym odvozom suťového odpadu.",
        },
        {
          step: "03",
          title: "Nové rozvody a steny",
          desc: "Nové inštalácie vodovodov a elektroinštalácií, výmena kúrenia a murovanie nových deliacich priečok.",
        },
        {
          step: "04",
          title: "Finálny fit-out",
          desc: "Poliatie nových poterov, aplikácia hladkých stierok, osadenie sanity a finálna pokládka podláh a obkladov.",
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
  );
}
