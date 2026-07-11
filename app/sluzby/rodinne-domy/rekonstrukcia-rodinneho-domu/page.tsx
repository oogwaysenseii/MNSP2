import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, DOMAIN } from '@/src/lib/schema';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const title = "Rekonštrukcia rodinného domu | Kompletné rekonštrukcie | MNSP";
const description = "Sanácia statiky, zatepľovanie a komplexné rekonštrukcie pre staršie nehnuteľnosti.";

const seo = getSEOTags(
    title,
    description,
    '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu'
);

export const metadata: Metadata = seo;

export default function RekonstrukciaDomuPage() {
    const jsonLd = generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu`);

    const faqSection = (
        <div className="max-w-7xl mx-auto px-6 mt-16 mb-10 space-y-8">
            <div className="space-y-4 text-center">
                <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">Časté otázky</span>
                <h2 className="text-3xl font-display font-extrabold text-zinc-900">Otázky a odpovede o rekonštrukcii</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <h3 className="font-bold text-zinc-900">Ako viem, či sa dom oplatí rekonštruovať alebo radšej zbúrať?</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">Pred každou rozsiahlou rekonštrukciou odporúčame odbornú obhliadku statikom. Ak sú narušené základy, murivo je trvalo zavlhnuté a stropy vykazujú priehyby, často je ekonomickejšie dom asanovať. V opačnom prípade má rekonštrukcia veľký zmysel.</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <h3 className="font-bold text-zinc-900">Musím mať na rekonštrukciu stavebné povolenie?</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">Pokiaľ zasahujete do nosných konštrukcií (búranie nosných stien, prístavby, nadstavby, nová strecha s iným tvarom), stavebné povolenie je nevyhnutné. Pri bežných úpravách ako výmena okien, zateplenie či nové omietky postačuje ohláška.</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <h3 className="font-bold text-zinc-900">Dá sa v starom dome urobiť podlahové kúrenie?</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">Áno, vo väčšine prípadov je to možné a veľmi žiadané (najmä pri inštalácii tepelného čerpadla). Vyžaduje si to však vytrhanie pôvodných podláh, správnu tepelnú izoláciu základov a vybudovanie nových poterov.</p>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <h3 className="font-bold text-zinc-900">Zabezpečujete aj odvoz a likvidáciu stavebného odpadu?</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">Samozrejme. Súčasťou našej cenovej ponuky môže byť kompletná správa odpadového hospodárstva – od pristavenia kontajnerov až po certifikovanú likvidáciu sutiny a starých materiálov na skládkach.</p>
                </div>
            </div>
        </div>
    );

    const whyUsSection = (
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
            <div className="text-center space-y-2 mb-6">
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
                <h2 className="text-2xl font-display font-extrabold text-zinc-900">Prečo zveriť rekonštrukciu nám?</h2>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
                    Máme bohaté skúsenosti so sanáciami, poznáme materiály používané v minulosti a vieme ich správne nakombinovať s modernými technológiami.
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
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <RodinneDomyServiceDetail
                title="Rekonštrukcia rodinného domu | MNSP"
                breadcrumbTitle="Rekonštrukcia domu"
                subtitle1="Zrekonštruujte si svoj vysnívaný dom bez námahy."
                subtitle2="Projekt vám vypracujeme, dom vám zrekonštruujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
                fullDesc={`Špecializujeme sa na kvalitné rekonštrukcie starších domov a budov s dôrazom na precízne spracovanie a dlhú životnosť. Zvyšujeme životnú úroveň pôvodných domov prostredníctvom moderných technológií, energetických úspor a rešpektovania statiky pôvodnej budovy.\n\nČi už potrebujete komplexné statické spevnenie nosných stien, výmenu starých inštalácií, precízne zateplenie, alebo kompletnú premenu interiérových dispozícií na kľúč, naši remeselníci garantujú najvyššiu stavebnú presnosť.`}
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
                        premiumModifier: 2.5,
                    },
                    {
                        label: "Prémiová rekonštrukcia (Prémiové materiály, inteligentná elektroinštalácia, dizajnové riešenia)",
                        premiumModifier: 3.67,
                    },
                ]}
                category="residential"
                serviceSlug="rekonstrukcia-rodinneho-domu"
                ctaTitle="Plánujete rekonštrukciu staršieho rodinného domu?"
                ctaSubtitle="Nechajte nám na seba kontakt a posúdime stav vašej nehnuteľnosti a navrhneme optimálne riešenie."
                blogFilterCategory="Rekonštrukcia domu"
                customFaq={faqSection}
                whyChooseUs={whyUsSection}
                minSize={50}
                maxSize={300}
                stepSize={5}
                defaultSize={120}
                baseRate={300} // 950 za m2 pre rekonstrukciu (base)
            />
        </>
    );
}
