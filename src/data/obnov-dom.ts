/**
 * Údaje o programe Obnov dom (Plán obnovy a odolnosti SR).
 *
 * Zdroj: https://obnovdom.sk — program spravuje Slovenská agentúra
 * životného prostredia. Sú to podmienky štátneho programu, nie naše
 * čísla: NEUPRAVOVAŤ bez overenia na oficiálnej stránke.
 *
 * Keď sa otvorí ďalšie kolo, menia sa `callOpen`, `status` a `verifiedOn`.
 */
export const OBNOV_DOM = {
  /** true = kolo je otvorené a dá sa podať žiadosť. */
  callOpen: false,

  status:
    'Prvé kolo výzvy Obnov dom mini+ sa uzavrelo 31. augusta 2026. '
    + 'Ďalšie kolo je podľa SAŽP plánované na január 2027.',

  /** Kedy sme podmienky naposledy overili. Zobrazuje sa návštevníkovi. */
  verifiedOn: '16. 9. 2026',

  /**
   * Maximálny príspevok v €, alebo null.
   * null = sumu sme neoverili → sekcia ju neuvedie. Radšej žiadne
   * číslo než nesprávne. Nasadzuje sa s null (viď vlajky v návrhu 38).
   */
  maxGrant: null as number | null,

  incomeLimit: 12990,
  incomeYear: 2024,
  completeBy: '31. 12. 2027',

  sourceUrl: 'https://obnovdom.sk/obnov-dom-mini-plus',

  /**
   * Oficiálna schéma opatrení, alebo null.
   *
   * Rozmery sú odmerané zo skutočného súboru (1267 x 741), nie z návrhu 38,
   * ktorý predpokladal 1280 x 742. Ak sa obrázok vymení, prepočítať —
   * pri nesprávnych rozmeroch si next/image vyhradí inú výšku a obsah pod
   * sekciou pri načítaní poskočí.
   *
   * null = schéma nie je k dispozícii. Sekcia potom beží v jednom stĺpci
   * a zoznam opatrení je viditeľný na všetkých šírkach, takže nechýba obsah.
   */
  diagram: { src: '/obnov-dom/opatrenia.png', width: 1267, height: 741 } as
    { src: string; width: number; height: number } | null,
} as const;

/**
 * Podporované opatrenia podľa oficiálnej schémy.
 * Hrúbky sú minimá stanovené výzvou — nie naše odporúčania.
 */
export const OBNOV_DOM_OURS = [
  { name: 'Zateplenie obvodového plášťa',              req: 'min. 150 mm' },
  { name: 'Zateplenie strešného plášťa',               req: 'min. 250 mm plochá, 200 mm šikmá strecha' },
  { name: 'Zateplenie podlahy podkrovia',              req: 'min. 260 mm' },
  { name: 'Zateplenie stropu nevykurovaného suterénu', req: 'min. 80 mm' },
  { name: 'Výmena okien a dverí',                      req: 'min. izolačné trojsklo' },
  { name: 'Výmena strešnej krytiny',                   req: 'pri súčasnom zateplení stropnej konštrukcie' },
] as const;

/** TODO: potvrdiť, ktoré z nich realizujeme — potom presunúť hore. */
export const OBNOV_DOM_OTHERS = [
  'Tepelné čerpadlo',
  'Solárne kolektory',
  'Kotol na spaľovanie peliet alebo splyňovací kotol',
  'Systém merania a regulácie vykurovania',
  'Modernizácia regulácie vykurovania',
] as const;
