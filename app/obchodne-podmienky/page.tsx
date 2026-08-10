import type { Metadata } from 'next';
import Link from 'next/link';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema } from '@/src/lib/schema';
import { BUSINESS, BRANCHES, HQ_BRANCH_KEY } from '@/src/lib/schema';
import { LegalPage, LegalSection } from '@/src/components/legal/LegalPage';

export const metadata: Metadata = getSEOTags(
  'Obchodné podmienky',
  'Podmienky poskytovania stavebných služieb — cenové ponuky, zmluva o dielo, platobné podmienky, odovzdanie diela, záruka a reklamácie.',
  '/obchodne-podmienky',
);

const hq = BRANCHES[HQ_BRANCH_KEY];

/**
 * TODO before publishing — working document, not legal advice.
 * Have it reviewed by a lawyer and confirm:
 *   [ ] IČO / DIČ / IČ DPH, zápis v Obchodnom registri (oddiel, vložka)
 *   [ ] Skutočné platobné podmienky a výška zálohových platieb (časť 05)
 *   [ ] Záručné doby podľa typu prác (časť 07)
 *   [ ] Či ste platiteľom DPH — ovplyvňuje formulácie o cenách
 */
export default function Page() {
  const jsonLd = generateBreadcrumbSchema([
    { name: 'Domov', path: '/' },
    { name: 'Obchodné podmienky', path: '/obchodne-podmienky' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        title="Obchodné podmienky"
        effectiveFrom="1. januára 2026"
        intro="Tieto podmienky upravujú vzťah medzi nami ako zhotoviteľom a vami ako objednávateľom pri poskytovaní stavebných prác a súvisiacich služieb. Konkrétne dojednania vždy stanovuje zmluva o dielo — ak sa od týchto podmienok líši, platí zmluva."
      >
        <LegalSection number={1} title="Zhotoviteľ">
          <p>
            <strong>{BUSINESS.legalName}</strong>, so sídlom {hq.streetAddress}, {hq.zip}{' '}
            {hq.city}, Slovenská republika
            {BUSINESS.ico ? `, IČO: ${BUSINESS.ico}` : ''}
            {BUSINESS.dic ? `, DIČ: ${BUSINESS.dic}` : ''}.
          </p>
          <p>
            E-mail:{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-amber-600 underline">
              {BUSINESS.email}
            </a>
            , telefón: {BUSINESS.mainPhone}.
          </p>
        </LegalSection>

        <LegalSection number={2} title="Rozsah služieb">
          <p>
            Realizujeme výstavbu a rekonštrukcie rodinných domov, bytových, priemyselných
            a občianskych stavieb, ako aj jednotlivé stavebné remeslá. Konkrétny rozsah prác
            je vždy vymedzený v cenovej ponuke a v zmluve o dielo.
          </p>
          <p>
            Práce, ktoré nie sú výslovne uvedené v ponuke, nie sú súčasťou ceny ani predmetu
            diela.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Orientačná kalkulácia na webe">
          <p>
            Výsledok{' '}
            <Link href="/kalkulacka" className="text-amber-600 underline">
              cenovej kalkulačky
            </Link>{' '}
            na tejto stránke je <strong>orientačný odhad</strong>, nie cenová ponuka ani
            návrh na uzavretie zmluvy podľa § 43a Občianskeho zákonníka. Vychádza
            z priemerných sadzieb a nezohľadňuje stav pozemku, projektovú dokumentáciu ani
            individuálne požiadavky.
          </p>
          <p>
            Zhotoviteľ nie je odhadom z kalkulačky viazaný. Záväznou je až písomná cenová
            ponuka vypracovaná po obhliadke.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Cenová ponuka a uzavretie zmluvy">
          <p>
            Na základe dopytu, obhliadky a dostupnej projektovej dokumentácie vypracujeme
            cenovú ponuku s položkovým rozpisom. Ponuka je nezáväzná a platí po dobu v nej
            uvedenú.
          </p>
          <p>
            Zmluvný vzťah vzniká podpisom <strong>zmluvy o dielo</strong>, ktorá vymedzuje
            predmet, rozsah, cenu, harmonogram, platobné podmienky a podmienky odovzdania.
            Zmeny rozsahu sa uplatňujú formou písomných dodatkov s prepočítaním ceny
            a termínu.
          </p>
          <p>
            Ak sa počas realizácie zistia skutočnosti, ktoré nebolo možné pri obhliadke
            predvídať — najmä pri rekonštrukciách po odkrytí konštrukcií — informujeme vás
            skôr, ako práce vykonáme, a dohodneme ďalší postup.
          </p>
        </LegalSection>

        <LegalSection number={5} title="Cena a platobné podmienky">
          <p>
            Cena diela je dohodnutá v zmluve o dielo. Platby prebiehajú podľa splátkového
            kalendára naviazaného na dokončenie jednotlivých etáp. Celú sumu vopred
            nepožadujeme.
          </p>
          <p>
            Podkladom pre úhradu je faktúra, prípadne súpis vykonaných prác. Pri omeškaní
            s úhradou je zhotoviteľ oprávnený prerušiť práce a uplatniť si úrok z omeškania
            v zákonnej výške.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Súčinnosť objednávateľa">
          <p>
            Objednávateľ zabezpečí prístup na stavenisko, odovzdá potrebnú dokumentáciu
            a vyjadrenia, umožní napojenie na elektrinu a vodu počas realizácie a poskytne
            súčinnosť pri kontrolných dňoch a pri preberaní jednotlivých etáp.
          </p>
          <p>
            Ak sa práce omeškajú alebo predražia z dôvodu neposkytnutia súčinnosti, o túto
            dobu sa predlžuje termín dokončenia a zhotoviteľ má nárok na náhradu
            preukázateľných nákladov.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Odovzdanie diela a záruka">
          <p>
            Dielo sa odovzdáva písomným preberacím protokolom, v ktorom sa uvedú prípadné
            vady a nedorobky spolu s termínom ich odstránenia.
          </p>
          <p>
            Záručná doba je uvedená v zmluve o dielo a jej rozsah zodpovedá povahe prác —
            iná je pri nosných konštrukciách a iná pri povrchových úpravách. V každom prípade
            však poskytujeme záruku minimálne v rozsahu, ktorý stanovujú právne predpisy
            Slovenskej republiky. Na dodané materiály sa vzťahuje záruka od ich výrobcu.
          </p>
          <p>
            Záruka sa nevzťahuje na vady spôsobené bežným opotrebením, nesprávnym užívaním
            alebo údržbou, zásahom tretej osoby, ani na materiály dodané objednávateľom.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Reklamácie">
          <p>
            Reklamáciu uplatnite bez zbytočného odkladu písomne na{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-amber-600 underline">
              {BUSINESS.email}
            </a>{' '}
            alebo na adrese sídla, s popisom vady a podľa možnosti fotodokumentáciou.
          </p>
          <p>
            Reklamáciu posúdime a o spôsobe jej vybavenia vás budeme informovať bez
            zbytočného odkladu. Ak je objednávateľom spotrebiteľ, vybavíme ju najneskôr do
            30 dní od uplatnenia.
          </p>
        </LegalSection>

        <LegalSection number={9} title="Riešenie sporov a informácia pre spotrebiteľov">
          <p>
            Vzťahy neupravené týmito podmienkami sa riadia právnym poriadkom Slovenskej
            republiky, najmä Občianskym zákonníkom a Obchodným zákonníkom. Spory riešime
            prednostne dohodou.
          </p>
          <p>
            Ak ste spotrebiteľ a nie ste spokojný so spôsobom vybavenia reklamácie, máte
            právo obrátiť sa na nás so žiadosťou o nápravu. Ak na ňu odpovieme zamietavo
            alebo neodpovieme do 30 dní, môžete podať návrh na začatie{' '}
            <strong>alternatívneho riešenia sporu</strong> podľa zákona č. 391/2015 Z. z.
          </p>
          <p>
            Príslušným subjektom je <strong>Slovenská obchodná inšpekcia</strong>, Ústredný
            inšpektorát, Odbor pre medzinárodné vzťahy a alternatívne riešenie
            spotrebiteľských sporov, Bajkalská 21/A, p. p. 29, 827 99 Bratislava 27
            (<span className="whitespace-nowrap">soi.sk</span>), prípadne iná oprávnená
            právnická osoba zapísaná v zozname vedenom Ministerstvom hospodárstva SR. Návrh
            možno podať aj cez platformu RSO na{' '}
            <span className="whitespace-nowrap">ec.europa.eu/consumers/odr</span>.
          </p>
        </LegalSection>

        <LegalSection number={10} title="Záverečné ustanovenia">
          <p>
            Spracúvanie osobných údajov upravujú{' '}
            <Link href="/ochrana-sukromia" className="text-amber-600 underline">
              zásady ochrany osobných údajov
            </Link>
            .
          </p>
          <p>
            Tieto podmienky môžeme aktualizovať. Pre už uzavreté zmluvy platí znenie účinné
            v čase ich uzavretia.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
