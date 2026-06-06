import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";

export const metadata = getSEOTags("Stavba domu na kľúč", "Komplexná výstavba moderných rodinných domov s dôrazom na udržateľnosť a precíznosť.");

export default function StavbaDomuNaKlucPage() {
  return (
    <RodinneDomyServiceDetail
      title="Stavba domu na kľúč"
      breadcrumbTitle="Stavba domu na kľúč"
      fullDesc={`Staviame rodinné domy podľa požiadaviek a potrieb našich klientov. Spolupracujeme s architektmi a inžiniermi, aby výsledok zodpovedal vašim predstavám aj vysokým nárokom na kvalitu.\n\nPri výstavbe používame výhradne kvalitné a overené materiály, dbáme na dostatočnú hydroizoláciu, poctivú tepelnú izoláciu a integráciu moderných technológií.`}
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
      ctaTitle="Plánujete výstavbu rodinného domu na kľúč?"
      ctaSubtitle="Nechajte nám na seba kontakt a naši inžinieri sa s vami spoja s návrhom realizácie."
      blogFilterCategory="Pasívny dom"
      minSize={80}
      maxSize={400}
      stepSize={5}
      defaultSize={140}
      baseRate={1350} // 1350e/m2 na kluc 
    />
  );
}
