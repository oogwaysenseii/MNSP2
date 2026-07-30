import type { Metadata } from 'next';
import ConstructionCalculator from "@/src/components/calculator/ConstructionCalculator";
import { getSEOTags } from '@/src/lib/seo';

const seo = getSEOTags(
    "Cenová kalkulačka",
    "Vypočítajte si orientačnú cenu vašej plánovanej stavby alebo rekonštrukcie.",
    "/kalkulacka"
);

export const metadata: Metadata = seo;

export default function KalkulackaPage() {
    return (
        <main className="min-h-screen bg-white ">
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
                                Pre každú fázu výstavby, či už ide o základy, hrubú stavbu, zastrešenie alebo interiérové práce, máme definovanú základnú sadzbu za meter štvorcový úžitkovej plochy. Tieto sadzby pravidelne aktualizujeme na základe reálnych rozpočtov z našich aktuálnych projektov. Keď zadáte svoje parametre, kalkulačka spočíta náklady na všetky vybrané položky a prenásobí ich koeficientom zvoleného štandardu.
                            </p>
                            <p>
                                Výsledkom je orientačný rozpočet vo forme cenového rozpätia, ktorý vám poskytne realistickú predstavu o finančnej náročnosti vášho zámeru ešte predtým, ako investujete do detailnej projektovej dokumentácie.
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

                </div>
            </ConstructionCalculator>
        </main>
    );
}
