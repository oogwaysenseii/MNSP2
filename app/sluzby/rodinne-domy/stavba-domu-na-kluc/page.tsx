import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, DOMAIN } from '@/src/lib/schema';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const title = "Stavba domu na kľúč | Výstavba rodinných domov";
const description = "Realizujeme výstavbu rodinných domov na kľúč od projektu až po kolaudáciu. Rodinné domy s dôrazom na precízne remeselné spracovanie.";

const seo = getSEOTags(
    title,
    description,
    '/sluzby/rodinne-domy/stavba-domu-na-kluc'
);

export const metadata: Metadata = seo;

export default function StavbaDomuNaKlucPage() {
  const jsonLd = generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc`);

  const faqSection = (
      <div className="max-w-[1500px] mx-auto px-6 mt-16 mb-10 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">Časté otázky</span>
          <h2 className="text-3xl font-display font-extrabold text-zinc-900">Otázky a odpovede o stavbe na kľúč</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">Ako dlho trvá stavba domu na kľúč?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">Štandardný murovaný rodinný dom dokážeme pri plynulom financovaní postaviť do 9 – 12 mesiacov, vrátane technologických prestávok na zretie materiálov.</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">Čo všetko je zahrnuté v cene?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">Cena "na kľúč" zahŕňa kompletnú realizáciu od základov po finálne povrchy – elektroinštalácie, omietky, obklady, sanitu aj vykurovanie. Nezostáva vám už nič, len si priniesť nábytok.</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">Je možné počas stavby meniť projekt?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">Drobné zmeny, ako napríklad posunutie nenosnej priečky či pridanie zásuvky, vieme flexibilne riešiť. Zásadné zmeny nosných konštrukcií si však vyžadujú zmenu stavebného povolenia.</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">Zabezpečujete aj inžinierske siete?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">Áno, súčasťou našej dodávky môže byť aj pripojenie pozemku na elektrinu, vodu, plyn a kanalizáciu, vrátane zemných výkopových prác a revíznych správ.</p>
          </div>
        </div>
      </div>
  );

  const whyUsSection = (
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
        <div className="text-center space-y-2 mb-6">
          <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
          <h2 className="text-2xl font-display font-extrabold text-zinc-900">Prečo zveriť stavbu domu nám?</h2>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
            Stavba domu by nemala byť stresom, ale radostným očakávaním. Poskytujeme kompletný stavebný servis pre bezstarostný priebeh vašej stavby.
          </p>
        </div>
        <ul className="text-zinc-700 text-sm font-medium leading-relaxed max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full text-left">
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Vlastná mechanizácia</span></li>
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Koordinácia všetkých profesií</span></li>
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Pravidelné reporty klientovi</span></li>
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Technický stavebný dozor</span></li>
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Odovzdanie kompletnej dokumentácie</span></li>
          <li className="flex items-start gap-2.5"><CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>Záručný servis</span></li>
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
                    label: "Ekonomický variant (Funkčné materiály, efektívne dispozičné riešenie a základný štandard vybavenia.)",
                    premiumModifier: 1.0,
                },
                {
                    label: "Zlatá stredná cesta (Kvalitné materiály, moderné technológie a vyšší komfort bývania.)",
                    premiumModifier: 1.25,
                },
                {
                    label: "Prémiový variant (Prémiové materiály, individuálne riešenia, inteligentná domácnosť a luxusné vybavenie.)",
                    premiumModifier: 1.45,
                },
            ]}
            category="residential"
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
            baseRate={1400} // 1350e/m2 na kluc
        />
      </>
  );
}
