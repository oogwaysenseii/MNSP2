import { getSEOTags } from '@/src/lib/seo';
import { BUSINESS, BRANCHES, HQ_BRANCH_KEY } from '@/src/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  'Ochrana osobných údajov',
  'Informácie o spracúvaní osobných údajov podľa GDPR — aké údaje zbierame, na aký účel, ako dlho ich uchovávame a aké máte práva.',
  '/ochrana-sukromia',
);

const hq = BRANCHES[HQ_BRANCH_KEY];

/**
 * TODO before publishing — this is a working skeleton, not legal advice.
 * Have it reviewed, and fill in:
 *   [ ] IČO / DIČ (BUSINESS.ico in src/lib/schema.ts)
 *   [ ] Hosting and analytics processors (Vercel? GTM / Google Analytics?)
 *   [ ] Form submission destination (email inbox? CRM?)
 *   [ ] Actual retention periods
 *   [ ] Whether a DPO (zodpovedná osoba) is appointed
 */
export default function Page() {
  return (
    <div className="bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 prose prose-zinc">
        <h1 className="font-display font-extrabold tracking-tight">
          Ochrana osobných údajov
        </h1>
        <p className="text-sm text-zinc-500">
          Účinné od: {new Date().getFullYear()}
        </p>

        <h2>1. Prevádzkovateľ</h2>
        <p>
          {BUSINESS.legalName}, {hq.streetAddress}, {hq.zip} {hq.city}, Slovensko
          {BUSINESS.ico ? `, IČO: ${BUSINESS.ico}` : ''}
          <br />
          E-mail: {BUSINESS.email} · Telefón: {BUSINESS.mainPhone}
        </p>

        <h2>2. Aké údaje spracúvame</h2>
        <p>
          Prostredníctvom kontaktného formulára a cenovej kalkulačky zbierame meno
          a priezvisko, telefónne číslo, e-mailovú adresu, popis dopytu a lokalitu
          stavby. Formulár umožňuje priložiť aj súbory (projektová dokumentácia,
          pôdorysy, fotografie), ktoré môžu obsahovať ďalšie osobné údaje.
        </p>

        <h2>3. Účel a právny základ</h2>
        <ul>
          <li>
            <strong>Vybavenie dopytu a príprava cenovej ponuky</strong> — právnym
            základom je vykonanie opatrení pred uzavretím zmluvy na žiadosť dotknutej
            osoby (čl. 6 ods. 1 písm. b GDPR).
          </li>
          <li>
            <strong>Plnenie zmluvy</strong> pri realizácii stavebných prác
            (čl. 6 ods. 1 písm. b GDPR).
          </li>
          <li>
            <strong>Plnenie zákonných povinností</strong> — účtovných a daňových
            (čl. 6 ods. 1 písm. c GDPR).
          </li>
        </ul>

        <h2>4. Doba uchovávania</h2>
        <p>
          Údaje z nerealizovaných dopytov uchovávame najviac 12 mesiacov od
          poslednej komunikácie. Zmluvnú a účtovnú dokumentáciu uchovávame po dobu
          stanovenú zákonom o účtovníctve.
        </p>

        <h2>5. Príjemcovia</h2>
        <p>
          Osobné údaje neposkytujeme tretím stranám na marketingové účely. Prístup
          k nim môžu mať poskytovatelia hostingu a e-mailových služieb ako naši
          sprostredkovatelia, a v nevyhnutnom rozsahu subdodávatelia podieľajúci sa
          na realizácii vašej stavby.
        </p>

        <h2>6. Vaše práva</h2>
        <p>
          Máte právo na prístup k svojim údajom, na ich opravu alebo vymazanie, na
          obmedzenie spracúvania, na prenosnosť údajov a právo namietať proti
          spracúvaniu. Uplatniť ich môžete na adrese {BUSINESS.email}. Zároveň máte
          právo podať sťažnosť Úradu na ochranu osobných údajov Slovenskej republiky.
        </p>

        <h2>7. Cookies</h2>
        <p>
          Na webe používame nevyhnutné technické cookies. Analytické a marketingové
          nástroje spúšťame len na základe vášho súhlasu, ktorý môžete kedykoľvek
          odvolať v nastaveniach prehliadača.
        </p>
      </div>
    </div>
  );
}
