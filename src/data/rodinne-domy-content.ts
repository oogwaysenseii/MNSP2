/**
 * Shared content for the rodinné domy hub and its 11 city variants.
 *
 * These lists previously existed twice with different wording — the hub said
 * one thing about what "na kľúč" includes, the city pages said another. Anyone
 * clicking between them saw a different scope for the same service.
 */

export const TURNKEY_FEATURES = [
  'Základy a prípojky',
  'Hrubá stavba (murárske práce, betonáže, strechy, okná a dvere ...)',
  'Kompletné rozvody (kúrenie, voda, elektrina ...)',
  'Interiér (sadrokartón, omietky, potery, inštalácie, obklady, dlažby ...)',
  'Exteriér (fasády, zámkové dlažby, ploty, prístrešky, garáže ...)',
] as const;

export const RENOVATION_FEATURES = [
  'Búracie práce a likvidácia odpadu',
  'Zmeny dispozície a statické úpravy',
  'Nové rozvody a inštalácie (kúrenie, voda, elektrina ...)',
  'Rekonštrukcia interiéru (sadrokartón, omietky, potery, inštalácie, obklady, dlažby ...)',
  'Rekonštrukcia exteriéru (fasády, zámkové dlažby, ploty, prístrešky, garáže ...)',
] as const;

export const TURNKEY_DESCRIPTION =
  'Komplexná výstavba moderných, nízkoenergetických rodinných domov. Od základovej dosky až po odovzdanie kľúčov sa staráme o každý detail, aby ste vy nemuseli.';

export const RENOVATION_DESCRIPTION =
  'Komplexné rekonštrukcie rodinných domov, renovácie historických sídiel a transformácie interiérov. Meníme staršie nehnuteľnosti na moderné, bezpečné a energeticky efektívne domovy.';

/**
 * Scope is agreed per project — this is not a list of universal guarantees.
 */
export const WHY_US = [
  'Vlastná mechanizácia a technika',
  'Koordinácia všetkých profesií',
  'Pravidelná komunikácia o postupe prác',
  'Stavbyvedúci zodpovedný za dielo',
  'Odovzdanie dokumentácie ku kolaudácii',
  'Záruka v rozsahu dohodnutom v zmluve',
] as const;

/** Selling points shown on the na-kľúč detail pages. */
export const TURNKEY_SELLING_POINTS = [
  'Dlhoročné skúsenosti s výstavbou rodinných domov',
  'Kompletná realizácia, všetko vybavíme za vás',
  'Profesionálny dohľad nad každou fázou výstavby',
  'Transparentná komunikácia a férový prístup',
] as const;

/** TODO: confirm this is machinery you own or hire regularly. */
export const EQUIPMENT = [
  'Rýpadlá a bagre',
  'Systémové lešenia',
  'Stavebné lasery a nivelačná technika',
  'Vibračné dosky',
  'Miešačky a čerpadlá zmesí',
] as const;

export const TURNKEY_FULL_DESC =
  'Staviame rodinné domy podľa požiadaviek a potrieb našich klientov. Spolupracujeme s architektmi a inžiniermi, aby výsledok zodpovedal vašim predstavám aj vysokým nárokom na kvalitu.\n\nPri výstavbe používame výhradne kvalitné a overené materiály, dbáme na dostatočnú hydroizoláciu, poctivú tepelnú izoláciu a integráciu moderných technológií.';

/** Selling points shown on the rekonštrukcia detail pages. */
export const RENOVATION_SELLING_POINTS = [
  'Dlhoročné skúsenosti s rekonštrukciami rodinných domov',
  'Kompletná realizácia, všetko vybavíme za vás',
  'Profesionálny dohľad nad každou fázou rekonštrukcie',
  'Transparentná komunikácia a férový prístup',
] as const;

/** TODO: confirm this is machinery you own or hire regularly. */
export const RENOVATION_EQUIPMENT = [
  'Diamantové jadrové vŕtačky',
  'Hydraulické podpery',
  'Búracie kladivá',
  'Stavebné skenery stien',
  'Odvlhčovače',
] as const;

export const RENOVATION_FAQ = [
  {
    q: 'Ako viem, či sa dom oplatí rekonštruovať alebo radšej zbúrať?',
    a: 'Pred každou rozsiahlou rekonštrukciou odporúčame odbornú obhliadku statikom. Ak sú narušené základy, murivo je trvalo zavlhnuté a stropy vykazujú priehyby, často je ekonomickejšie dom asanovať. V opačnom prípade má rekonštrukcia veľký zmysel.',
  },
  {
    q: 'Musím mať na rekonštrukciu stavebné povolenie?',
    a: 'Pokiaľ zasahujete do nosných konštrukcií (búranie nosných stien, prístavby, nadstavby, nová strecha s iným tvarom), stavebné povolenie je nevyhnutné. Pri bežných úpravách ako výmena okien, zateplenie či nové omietky postačuje ohláška.',
  },
  {
    q: 'Dá sa v starom dome urobiť podlahové kúrenie?',
    a: 'Áno, vo väčšine prípadov je to možné a veľmi žiadané (najmä pri inštalácii tepelného čerpadla). Vyžaduje si to však vytrhanie pôvodných podláh, správnu tepelnú izoláciu základov a vybudovanie nových poterov.',
  },
  {
    q: 'Zabezpečujete aj odvoz a likvidáciu stavebného odpadu?',
    a: 'Samozrejme. Súčasťou našej cenovej ponuky môže byť kompletná správa odpadového hospodárstva – od pristavenia kontajnerov až po likvidáciu sutiny a starých materiálov na skládkach.',
  },
] as const;

/**
 * Renovation feature list — promoted from the [mesto] page, which had the
 * better version: five renovation-specific items instead of four generic ones.
 * Now used by both the hub and the city pages.
 */
export const RENOVATION_SCOPE = [
  'Búracie práce s vlastnou stavebnou technikou a odvozom sutín',
  'Kompletné zosilnenie statiky, podchytenie základov',
  'Sanácia vlhkosti a inštalácia izolácií u starých domov',
  'Nadstavby, prístavby a prestavby starých a sedlových striech',
  'Zatepľovanie a celkové obnovenie historickej či pôvodnej fasády',
] as const;

/**
 * The "prehľad poskytovaných prác" breakdown.
 *
 * This was hardcoded inside RodinneDomyServiceDetail, so the renovation page
 * advertised "Základy / Murivo a stropné dosky / Strechy a krovy" — new-build
 * scope, on a page for people renovating an existing house. Same block on all
 * 22 location pages under both services.
 *
 * Split so each service describes the work it actually does.
 */
export type WorkGroup = { title: string; items: readonly string[] };

export const TURNKEY_WORK_GROUPS: readonly WorkGroup[] = [
  {
    title: 'Hrubá stavba',
    items: ['Základy', 'Murivo a stropné dosky', 'Strechy a krovy', 'Okná a brány'],
  },
  {
    title: 'Interiér',
    items: ['Elektroinštalácie', 'Zdravotechnika', 'Omietky a potery', 'Obklady a dlažby'],
  },
  {
    title: 'Exteriér',
    items: ['Zateplenie fasády', 'Zámkové dlažby', 'Ploty a prístrešky'],
  },
] as const;

export const RENOVATION_WORK_GROUPS: readonly WorkGroup[] = [
  {
    title: 'Búranie a statika',
    items: [
      'Búracie práce a odvoz sutiny',
      'Zosilnenie statiky, podchytenie základov',
      'Vybúranie a zväčšenie otvorov',
      'Sanácia vlhkého muriva',
    ],
  },
  {
    title: 'Rozvody a interiér',
    items: [
      'Výmena elektroinštalácie',
      'Výmena rozvodov vody a kúrenia',
      'Nové omietky a potery',
      'Obklady, dlažby a podlahy',
    ],
  },
  {
    title: 'Obvodový plášť',
    items: ['Výmena okien a dverí', 'Zateplenie a obnova fasády', 'Rekonštrukcia strechy a krovu'],
  },
] as const;

export const RENOVATION_STAGES = [
  {
    step: '01',
    title: 'Konzultácia a obhliadka',
    desc: 'Na základe obhliadky objektu a vašich požiadaviek navrhneme optimálne riešenie a pripravíme cenovú ponuku.',
  },
  {
    step: '02',
    title: 'Návrh rekonštrukcie',
    desc: 'Vypracujeme plán prác, navrhneme technické riešenia a pomôžeme s potrebnou dokumentáciou.',
  },
  {
    step: '03',
    title: 'Realizácia rekonštrukcie',
    desc: 'Zabezpečíme odborné stavebné práce vrátane búrania, úprav dispozície, výmeny rozvodov a modernizácie priestorov.',
  },
  {
    step: '04',
    title: 'Dokončenie a odovzdanie',
    desc: 'Po ukončení všetkých prác vám odovzdáme zrekonštruovaný objekt pripravený na komfortné a bezproblémové užívanie.',
  },
] as const;
