import { getSEOTags } from '@/src/lib/seo';
import { BUSINESS, BRANCHES, HQ_BRANCH_KEY } from '@/src/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  'Obchodné podmienky',
  'Podmienky poskytovania stavebných služieb — cenové ponuky, uzavretie zmluvy o dielo, platobné podmienky, odovzdanie diela a záruka.',
  '/obchodne-podmienky',
);

const hq = BRANCHES[HQ_BRANCH_KEY];

/**
 * TODO before publishing — skeleton only, have a lawyer review it.
 *   [ ] IČO / DIČ / IČ DPH, zápis v Obchodnom registri (oddiel, vložka)
 *   [ ] Skutočné platobné podmienky a zálohové percentá
 *   [ ] Záručné doby podľa typu prác
 *   [ ] Reklamačný postup a lehoty
 */
export default function Page() {
  return (
    <div className="bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 prose prose-zinc">
        <h1 className="font-display font-extrabold tracking-tight">
          Obchodné podmienky
        </h1>

        <h2>1. Zhotoviteľ</h2>
        <p>
          {BUSINESS.legalName}, {hq.streetAddress}, {hq.zip} {hq.city}, Slovensko
          {BUSINESS.ico ? `, IČO: ${BUSINESS.ico}` : ''}
          {BUSINESS.dic ? `, DIČ: ${BUSINESS.dic}` : ''}
          <br />
          E-mail: {BUSINESS.email} · Telefón: {BUSINESS.mainPhone}
        </p>

        <h2>2. Cenová ponuka</h2>
        <p>
          Orientačný odhad z online kalkulačky nie je cenovou ponukou ani návrhom na
          uzavretie zmluvy. Záväznú cenovú ponuku vypracúvame až na základe obhliadky
          a projektovej dokumentácie. Ponuka je platná po dobu v nej uvedenú.
        </p>

        <h2>3. Zmluva o dielo</h2>
        <p>
          Spolupráca sa riadi písomnou zmluvou o dielo podľa Obchodného zákonníka,
          ktorá vymedzuje predmet, rozsah, cenu, harmonogram a podmienky odovzdania.
          Zmeny rozsahu sa uplatňujú formou písomných dodatkov.
        </p>

        <h2>4. Platobné podmienky</h2>
        <p>
          Platby prebiehajú podľa splátkového kalendára dohodnutého v zmluve,
          spravidla naviazaného na dokončenie jednotlivých fáz diela.
        </p>

        <h2>5. Odovzdanie diela a záruka</h2>
        <p>
          Dielo sa odovzdáva preberacím protokolom. Na vykonané práce poskytujeme
          záruku v rozsahu a dobe uvedenej v zmluve, najmenej však v rozsahu
          stanovenom právnymi predpismi Slovenskej republiky.
        </p>

        <h2>6. Reklamácie</h2>
        <p>
          Reklamáciu uplatnite písomne na {BUSINESS.email} alebo na adrese sídla.
          Reklamáciu posúdime a o spôsobe vybavenia vás budeme informovať v zákonnej
          lehote.
        </p>

        <h2>7. Riešenie sporov</h2>
        <p>
          Vzťahy neupravené týmito podmienkami sa riadia právnym poriadkom Slovenskej
          republiky. Spory sa prednostne riešia dohodou.
        </p>
      </div>
    </div>
  );
}
