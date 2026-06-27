import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, DOMAIN } from '@/src/lib/schema';

const title = "Stavba domu na kľúč";
const description = "Komplexná výstavba moderných rodinných domov s dôrazom na udržateľnosť a precíznosť.";

export const metadata = getSEOTags(title, description, '/sluzby/rodinne-domy/stavba-domu-na-kluc');

export default function StavbaDomuNaKlucPage() {
  const jsonLd = generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc`);

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
      imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
      features={[
        "Dlhoročné skúsenosti s výstavbou rodinných domov",
        "Kompletná realizácia, všetko vybavíme za vás",
        "Profesionálny dohľad nad každou fázou výstavby",
        "Transparentná komunikácia a férový prístup",
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
    </>
  );
}
