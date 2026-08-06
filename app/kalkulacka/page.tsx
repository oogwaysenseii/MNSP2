import type { Metadata } from 'next';
import ConstructionCalculator from "@/src/components/calculator/ConstructionCalculator";
import { getSEOTags } from '@/src/lib/seo';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/src/lib/schema';

const seo = getSEOTags(
    "Cenová kalkulačka",
    "Vypočítajte si orientačnú cenu vašej plánovanej stavby alebo rekonštrukcie.",
    "/kalkulacka"
);

export const metadata: Metadata = seo;

export default function KalkulackaPage() {
    const jsonLd = generateBreadcrumbSchema([
        { name: 'Domov', path: '/' },
        { name: 'Cenová kalkulačka', path: '/kalkulacka' },
    ]);

    return (
        <main className="min-h-screen bg-white ">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* HEADER SECTION */}
            <div className="bg-zinc-950 text-white py-10 mt-16 sm:mt-20">
                <div className=" mx-auto text-center space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight">
                        Cenová kalkulačka
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Získajte rýchly odhad nákladov na váš projekt. Naklikajte si rozsah prác a parametre, a my vám obratom ukážeme orientačnú cenu.
                    </p>
                </div>
            </div>

            <ConstructionCalculator>
                {/* SEO CONTENT SECTION */}
                <div className="max-w-4xl mx-auto py-20 space-y-16">

                    <div className="space-y-6">
                        <h2 className="text-3xl font-display font-extrabold text-zinc-950">Ako počítame cenu vašej stavby?</h2>
                        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-4">
                            <p>
                                Výpočet ceny stavebných prác v našej kalkulačke vychádza z dlhodobých priemerných cien materiálov a prác na slovenskom trhu. Náš algoritmus zohľadňuje nielen základnú výmeru (zastavanú plochu a počet podlaží), ale aj konkrétne moduly, ktoré si zvolíte, a úroveň štandardu, v ktorom si prajete stavbu realizovať.
                            </p>
                            <p>
                                Pre každú fázu výstavby, či už ide o základy, hrubú stavbu, zastrešenie alebo interiérové práce, máme definovanú základnú sadzbu za meter štvorcový. Tieto sadzby vychádzajú z rozpočtov našich vlastných realizácií — nie sú to čísla stiahnuté z internetu. Keď zadáte svoje parametre, kalkulačka spočíta náklady na všetky vybrané položky a prenásobí ich koeficientom zvoleného štandardu.
                            </p>
                            <p>
                                Výsledkom je orientačný odhad, ktorý pre lepšiu čitateľnosť zobrazujeme ako rozpätie okolo vypočítanej sumy. Poskytne vám realistickú predstavu o finančnej náročnosti zámeru ešte predtým, ako investujete do detailnej projektovej dokumentácie. Skutočná cena je však vždy individuálna — každý projekt, pozemok aj predstava klienta sú iné.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-display font-extrabold text-zinc-950">Čo všetko ovplyvňuje výslednú cenu?</h2>
                        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-4">
                            <p>
                                Stavba rodinného domu alebo väčšia rekonštrukcia je komplexný proces, do ktorého vstupuje množstvo premenných. Aj dva dizajnovo podobné domy s rovnakou výmerou môžu mať diametrálne odlišný rozpočet. Kľúčovými faktormi sú:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Pozemok a zakladanie:</strong> Rovinatý pozemok s dobrou únosnosťou pôdy znamená lacnejšie základy. Svahovitý terén, prítomnosť spodnej vody alebo skalnaté podložie môžu náklady na zemné práce a zakladanie výrazne predražiť.</li>
                                <li><strong>Zložitosť architektúry:</strong> Jednoduchý tvar domu so sedlovou alebo pultovou strechou je vždy ekonomickejší ako členitý pôdorys, množstvo rohov, vikierov, výklenkov a zložité tvary striech.</li>
                                <li><strong>Výber materiálov:</strong> Rozdiel medzi štandardnou keramickou tehlou a prémiovými zateplenými blokmi, alebo medzi bežnou škridlou a kvalitnou hliníkovou krytinou sa môže vyšplhať na tisíce eur.</li>
                                <li><strong>Technológie a energetická náročnosť:</strong> Inštalácia tepelného čerpadla, rekuperácie, fotovoltiky či systémov inteligentnej domácnosti na začiatku zvyšuje investičné náklady, no dlhodobo šetrí prevádzkové výdavky.</li>
                                <li><strong>Rozsah presklenia:</strong> Veľkoformátové hliníkové okná a HS portály patria k najdrahším položkám na stavbe. Oproti štandardným plastovým oknám môžu rozpočet navýšiť aj o desiatky percent.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-display font-extrabold text-zinc-950">Prečo ide iba o orientačný odhad?</h2>
                        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-4">
                            <p>
                                Online kalkulačka, akokoľvek presne by bola nastavená, nedokáže nahradiť prácu skúseného rozpočtára a detailný výkaz výmer. Slúži primárne na prvotné zorientovanie sa v cenových reláciách. Skutočná cena je vysoko individuálna pre každý jeden projekt.
                            </p>
                            <p>
                                Presnú cenovú ponuku vám dokážeme vypracovať až na základe hotovej projektovej dokumentácie (ideálne v stupni pre realizáciu stavby), kde sú presne vyšpecifikované kubatúry betónu, metre štvorcové muriva, dĺžky káblov a typy povrchových úprav. Navyše, do hry vstupuje aj aktuálna situácia na trhu stavebných materiálov a lokálne špecifiká vo vašom regióne.
                            </p>
                            <p>
                                Preto po získaní prvotného odhadu odporúčame využiť kontaktný formulár v našej kalkulačke. Pošleme vám detailnejší rozpis a radi si s vami dohodneme osobné alebo online stretnutie, kde preberieme váš projekt do najmenších detailov a pripravíme na mieru šitú ponuku.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-zinc-200">
                        <h2 className="text-2xl font-display font-extrabold text-zinc-950">Pokračujte v prehliadaní</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <Link href="/sluzby" className="block p-6 bg-zinc-50 border border-zinc-200 hover:border-amber-500 transition-colors group">
                                <h3 className="font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">Naše služby &rarr;</h3>
                                <p className="text-sm text-zinc-600 mt-2">Zistite viac o tom, čo všetko pre vás vieme zrealizovať. Od hrubej stavby až po stavbu na kľúč.</p>
                            </Link>

                            <Link href="/portfolio" className="block p-6 bg-zinc-50 border border-zinc-200 hover:border-amber-500 transition-colors group">
                                <h3 className="font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">Portfólio projektov &rarr;</h3>
                                <p className="text-sm text-zinc-600 mt-2">Inšpirujte sa našimi dokončenými stavbami a rekonštrukciami.</p>
                            </Link>

                            <Link href="/lokality" className="block p-6 bg-zinc-50 border border-zinc-200 hover:border-amber-500 transition-colors group">
                                <h3 className="font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">Pôsobíme vo vašom regióne &rarr;</h3>
                                <p className="text-sm text-zinc-600 mt-2">Pozrite si mapu regiónov, kde najčastejšie staviame a poskytujeme naše služby.</p>
                            </Link>

                            <Link href="/blog" className="block p-6 bg-zinc-50 border border-zinc-200 hover:border-amber-500 transition-colors group">
                                <h3 className="font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">Odborný blog &rarr;</h3>
                                <p className="text-sm text-zinc-600 mt-2">Prečítajte si užitočné rady a tipy predtým, ako sa pustíte do samotnej výstavby.</p>
                            </Link>

                        </div>
                    </div>

                </div>
            </ConstructionCalculator>
        </main>
    );
}
