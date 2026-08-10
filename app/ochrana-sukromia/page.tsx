import type { Metadata } from 'next';
import Link from 'next/link';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema } from '@/src/lib/schema';
import { BUSINESS, BRANCHES, HQ_BRANCH_KEY } from '@/src/lib/schema';
import { LegalPage, LegalSection, LegalTable } from '@/src/components/legal/LegalPage';

export const metadata: Metadata = getSEOTags(
  'Ochrana osobných údajov',
  'Informácie o spracúvaní osobných údajov podľa GDPR — aké údaje zbierame, na aký účel, ako dlho ich uchovávame, komu ich poskytujeme a aké máte práva.',
  '/ochrana-sukromia',
);

const hq = BRANCHES[HQ_BRANCH_KEY];

/**
 * TODO before publishing — this is a working document, not legal advice.
 * Have it reviewed and confirm:
 *   [ ] IČO / DIČ (BUSINESS.ico in src/lib/schema.ts)
 *   [ ] Hosting provider named in section 05
 *   [ ] Which GTM tags actually fire (analytics? ads? remarketing?)
 *   [ ] Whether a zodpovedná osoba (DPO) is appointed — usually not required
 *       for a company this size, but confirm
 *   [ ] Retention periods in section 04 against how you really work
 */
export default function Page() {
  const jsonLd = generateBreadcrumbSchema([
    { name: 'Domov', path: '/' },
    { name: 'Ochrana osobných údajov', path: '/ochrana-sukromia' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        title="Ochrana osobných údajov"
        effectiveFrom="1. januára 2026"
        intro="Tento dokument vysvetľuje, aké osobné údaje o vás spracúvame, prečo, ako dlho ich uchovávame a aké máte práva. Spracúvame ich v súlade s nariadením GDPR a zákonom č. 18/2018 Z. z. o ochrane osobných údajov."
      >
        <LegalSection number={1} title="Kto spracúva vaše údaje">
          <p>
            Prevádzkovateľom je <strong>{BUSINESS.legalName}</strong>, so sídlom{' '}
            {hq.streetAddress}, {hq.zip} {hq.city}, Slovenská republika
            {BUSINESS.ico ? `, IČO: ${BUSINESS.ico}` : ''}
            {BUSINESS.dic ? `, DIČ: ${BUSINESS.dic}` : ''}.
          </p>
          <p>
            Vo veciach ochrany osobných údajov nás kontaktujte na{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-amber-600 underline">
              {BUSINESS.email}
            </a>{' '}
            alebo telefonicky na {BUSINESS.mainPhone}.
          </p>
        </LegalSection>

        <LegalSection number={2} title="Aké údaje spracúvame">
          <p>
            Spracúvame len údaje, ktoré nám sami poskytnete, a technické údaje nevyhnutné
            na prevádzku webu.
          </p>
          <LegalTable
            head={['Zdroj', 'Údaje']}
            rows={[
              [
                'Kontaktný formulár',
                'Meno a priezvisko, telefónne číslo, e-mailová adresa, typ projektu a text vašej správy.',
              ],
              [
                'Rýchly formulár a formulár v blogu',
                'Telefónne číslo, e-mailová adresa a text správy. Meno nepožadujeme.',
              ],
              [
                'Cenová kalkulačka',
                'Zadané parametre stavby spracúvame len vo vašom prehliadači. Neodosielajú sa nám a neukladáme ich.',
              ],
              [
                'Telefonický alebo e-mailový kontakt',
                'Údaje, ktoré nám v komunikácii sami uvediete.',
              ],
              [
                'Návšteva webu',
                'IP adresa, typ prehliadača a zariadenia, navštívené stránky. Podrobnosti v časti 06.',
              ],
            ]}
          />
          <p>
            Ak nám k dopytu pošlete projektovú dokumentáciu alebo pôdorysy, môžu obsahovať
            ďalšie údaje (napríklad adresu pozemku). Spracúvame ich len na účel vypracovania
            cenovej ponuky a realizácie diela.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Prečo a na akom právnom základe">
          <LegalTable
            head={['Účel', 'Právny základ']}
            rows={[
              [
                'Vybavenie dopytu a príprava cenovej ponuky',
                'Vykonanie opatrení pred uzavretím zmluvy na vašu žiadosť — čl. 6 ods. 1 písm. b) GDPR',
              ],
              [
                'Plnenie zmluvy o dielo a komunikácia počas realizácie',
                'Plnenie zmluvy — čl. 6 ods. 1 písm. b) GDPR',
              ],
              [
                'Vedenie účtovníctva a plnenie daňových povinností',
                'Plnenie zákonnej povinnosti — čl. 6 ods. 1 písm. c) GDPR',
              ],
              [
                'Uplatnenie alebo obrana právnych nárokov, evidencia reklamácií',
                'Oprávnený záujem — čl. 6 ods. 1 písm. f) GDPR',
              ],
              [
                'Analytika návštevnosti a marketingové nástroje',
                'Súhlas — čl. 6 ods. 1 písm. a) GDPR (pozri časť 06)',
              ],
            ]}
          />
          <p>
            Poskytnutie údajov je dobrovoľné. Bez kontaktných údajov vám však nevieme
            odpovedať na dopyt ani pripraviť cenovú ponuku.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Ako dlho údaje uchovávame">
          <LegalTable
            head={['Kategória', 'Doba uchovávania']}
            rows={[
              ['Nerealizované dopyty', 'Najviac 12 mesiacov od poslednej komunikácie'],
              ['Zmluvná dokumentácia a korešpondencia k dielu', 'Po dobu trvania záruky a premlčacích lehôt'],
              ['Účtovné a daňové doklady', 'Po dobu stanovenú zákonom o účtovníctve a daňovými predpismi'],
              ['Údaje spracúvané na základe súhlasu', 'Do odvolania súhlasu'],
            ]}
          />
          <p>Po uplynutí týchto lehôt údaje bezpečne vymažeme alebo zlikvidujeme.</p>
        </LegalSection>

        <LegalSection number={5} title="Komu údaje poskytujeme">
          <p>
            Osobné údaje <strong>nepredávame</strong> a neposkytujeme tretím stranám na
            marketingové účely. V nevyhnutnom rozsahu k nim môžu mať prístup títo
            sprostredkovatelia:
          </p>
          <LegalTable
            head={['Príjemca', 'Účel', 'Umiestnenie']}
            rows={[
              ['Resend, Inc.', 'Doručovanie e-mailov z kontaktných formulárov', 'USA — na základe štandardných zmluvných doložiek'],
              ['Google Ireland Limited', 'Google Tag Manager a analytika návštevnosti', 'EÚ / USA'],
              ['Poskytovateľ hostingu', 'Prevádzka webovej stránky', 'TODO: doplniť poskytovateľa a región'],
              ['Subdodávatelia a projektanti', 'Realizácia diela, v rozsahu nevyhnutnom pre konkrétnu zákazku', 'Slovenská republika'],
              ['Účtovník, prípadne právny zástupca', 'Vedenie účtovníctva a právne služby', 'Slovenská republika'],
            ]}
          />
          <p>
            Údaje môžeme poskytnúť aj orgánom verejnej moci, ak nám to ukladá právny predpis.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Cookies a analytické nástroje">
          <p>
            Na fungovanie webu používame nevyhnutné technické cookies, ktoré si nevyžadujú
            váš súhlas.
          </p>
          <p>
            Zároveň používame <strong>Google Tag Manager</strong>, prostredníctvom ktorého
            môžu byť načítané analytické, prípadne marketingové nástroje spoločnosti Google.
            Tieto nástroje môžu ukladať cookies a spracúvať údaje o vašom správaní na webe.
          </p>
          <p className="text-zinc-500 border-l-2 border-amber-500 pl-4">
            <strong className="text-zinc-700">Poznámka k aktuálnemu stavu:</strong> na webe
            zatiaľ nie je nasadený nástroj na správu súhlasu s cookies. Do jeho nasadenia
            môžete nastavenia cookies spravovať priamo vo svojom prehliadači — blokovaním
            alebo mazaním cookies, prípadne prehliadaním v anonymnom režime. Odvolanie
            súhlasu nemá vplyv na zákonnosť spracúvania pred jeho odvolaním.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Vaše práva">
          <p>V súvislosti so spracúvaním osobných údajov máte právo:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>na prístup k údajom, ktoré o vás spracúvame,</li>
            <li>na opravu nesprávnych alebo doplnenie neúplných údajov,</li>
            <li>na vymazanie údajov, ak na ich spracúvanie už nemáme právny dôvod,</li>
            <li>na obmedzenie spracúvania,</li>
            <li>na prenosnosť údajov k inému prevádzkovateľovi,</li>
            <li>namietať proti spracúvaniu na základe oprávneného záujmu,</li>
            <li>kedykoľvek odvolať súhlas, ak je spracúvanie založené na súhlase.</li>
          </ul>
          <p>
            Svoje práva si uplatníte na{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-amber-600 underline">
              {BUSINESS.email}
            </a>
            . Odpovieme vám najneskôr do jedného mesiaca od doručenia žiadosti.
          </p>
          <p>
            Ak máte za to, že spracúvame vaše údaje nezákonne, môžete podať sťažnosť na{' '}
            <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong>,
            Hraničná 12, 820 07 Bratislava, <span className="whitespace-nowrap">dataprotection.gov.sk</span>.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Zabezpečenie a zmeny dokumentu">
          <p>
            Prijali sme primerané technické a organizačné opatrenia na ochranu údajov pred
            stratou, zneužitím a neoprávneným prístupom. Prenos údajov z formulárov prebieha
            šifrovane cez HTTPS.
          </p>
          <p>
            Tento dokument môžeme aktualizovať. Aktuálna verzia je vždy dostupná na tejto
            stránke s uvedením dátumu účinnosti. Podmienky poskytovania našich služieb
            nájdete v{' '}
            <Link href="/obchodne-podmienky" className="text-amber-600 underline">
              obchodných podmienkach
            </Link>
            .
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
