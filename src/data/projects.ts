import type { ServiceSlug } from './services-slugs';

export type ServiceCategory = 'Rodinné domy' | 'Rezidenčné budovy' | 'Komerčná výstavba' | 'Priemyselné objekty' | 'Občianske stavby';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  location: string;
  year: number;
  duration: string;
  budgetString: string;
  imageUrl: string;
  // Extended premium fields
  gallery?: { url: string; caption?: string }[];
  contentSections?: { title: string; content: string }[];
  specs?: { label: string; value: string }[];

  /**
   * Trades actually performed on this project that have their own service
   * page. Typed against ServiceSlug, so a slug that doesn't correspond to a
   * real route is a compile error rather than a dead chip.
   *
   * This is the single source for BOTH directions:
   *   - the "Rozsah realizovaných prác" section on the project page
   *   - which projects appear as proof on /sluzby/[service]
   *
   * Only list work MNSP actually did. If it isn't certain, leave it out —
   * an empty list costs nothing, a wrong one is a claim.
   */
  realizedServices?: readonly ServiceSlug[];

  /**
   * Real scope with no corresponding service page — utilities, landscaping,
   * acting as main contractor. Shown alongside, but not linked, and never
   * used for the reverse lookup.
   */
  additionalScope?: readonly string[];

  /** @deprecated Superseded by realizedServices + additionalScope. */
  services?: string[];
  challenges?: { challenge: string; solution: string }[];
  timeline?: { date: string; title: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string; company?: string };
}

/**
 * Which city slug each project counts as local proof for.
 *
 * Villages map to the town they sit next to, because that is how a client
 * reads them — a job in Stožok is meaningful evidence to someone in Detva.
 * Only add a mapping where the drive is genuinely short; stretching this
 * turns real proof into a claim that does not hold up.
 */
const PROJECT_CITY_SLUG: Record<string, string> = {
  Detva: 'detva',
  Hriňová: 'hrinova',
  Lučenec: 'lucenec',
  'Banská Bystrica': 'banska-bystrica',
  'Očová': 'zvolen', // ~10 km, uvedená v surrounding pre Zvolen
  Stožok: 'detva', // ~6 km
  Dúbravy: 'detva', // ~8 km
};

export const projectsData: Project[] = [

  {
    id: 'rekonstrukcia-domovu-socialnych-sluzieb-detva',
    title: 'Zariadenie sociálnych služieb Detva',
    // TODO: doplniť skutočný rozsah prác na tomto projekte.
    description: 'Realizácia zariadenia sociálnych služieb vrátane inžinierskych sietí, opornej steny a spevnených plôch.',
    category: 'Občianske stavby',
    location: 'Detva',
    year: 2026,
    duration: '18 mesiacov',
    budgetString: '€ 4.5M',
    imageUrl: '/Domov-socialnych-sluzieb-Detva.webp',
    gallery: [
      { url: '/Domov-socialnych-sluzieb-Detva.webp', caption: 'Pohľad na hlavný vchod' },
      { url: '/Domov-socialnych-sluzieb-Detva.webp', caption: 'Detail fasády a obkladu' },
      { url: '/Domov-socialnych-sluzieb-Detva.webp', caption: 'Okolitá parková úprava' }
    ],
    contentSections: [
      {
        title: 'Zámer projektu',
        content: 'Cieľom projektu bolo vybudovať moderné, bezpečné a komfortné ubytovanie pre seniorov s dôrazom na bezbariérový prístup a komunitný spôsob života. Areál pozostáva z troch samostatných pavilónov prepojených presklenou chodbou.'
      },
      {
        title: 'Stavebné riešenie',
        content: 'Pri výstavbe boli použité prémiové materiály s ohľadom na energetickú udržateľnosť. Obvodové plášte sú zateplené nadštandardnou vrstvou minerálnej vlny, okná disponujú trojsklom a o vykurovanie sa starajú tepelné čerpadlá doplnené solárnymi panelmi na streche.'
      }
    ],
    specs: [
      { label: 'Zastavaná plocha', value: '1 250 m²' },
      { label: 'Úžitková plocha', value: '3 800 m²' },
      { label: 'Počet lôžok', value: '120' },
      { label: 'Energetická trieda', value: 'A0' }
    ],
    // Migrated from the free-text `services` list that used to live here.
    // 'Zemné práce a zakladanie' split into the two trades it covers; the
    // three entries with no service page moved to additionalScope.
    realizedServices: ['vykopove-zemne-prace', 'zakladanie-stavieb', 'monoliticke-konstrukcie'],
    additionalScope: ['Generálna dodávka stavby', 'Inžinierske siete', 'Sadové úpravy'],
    challenges: [
      {
        challenge: 'Náročné svahovité podložie vyžadovalo špeciálny prístup k zakladaniu stavby a vybudovanie robustných oporných múrov.',
        solution: 'Navrhli a zrealizovali sme systém mikropilót a železobetónových oporných stien, ktoré stabilizovali svah a zabezpečili trvalú bezpečnosť objektu.'
      },
      {
        challenge: 'Zabezpečenie plynulej dodávky materiálu v obytnej štvrti s úzkymi prístupovými cestami.',
        solution: 'Zaviedli sme prísny logistický plán a just-in-time dodávky s využitím menších vozidiel, čím sme minimalizovali dopady na lokálnu komunitu.'
      }
    ],
    timeline: [
      { date: 'Marec 2024', title: 'Začiatok zemných prác', description: 'Odstránenie pôvodných objektov a príprava staveniska.' },
      { date: 'Júl 2024', title: 'Dokončenie hrubej stavby', description: 'Ukončenie monolitických prác a zastrešenie objektov.' },
      { date: 'Február 2025', title: 'Fasády a interiéry', description: 'Montáž technológií, sadrokartónov a zateplenie fasády.' },
      { date: 'September 2025', title: 'Odovzdanie diela', description: 'Kolaudácia a slávnostné otvorenie zariadenia.' }
    ]
  },
  {
    id: 'rekonstrukcia-novohradskeho-muzea-lucenec',
    title: 'Novohradské múzeum a galéria Lučenec',
    // TODO: doplniť skutočný rozsah prác na tomto projekte.
    description: 'Stavebné práce pri obnove objektu Novohradského múzea a galérie vrátane základov, oporných múrov a monolitických konštrukcií.',
    // Taken from the description above, which names these explicitly.
    realizedServices: ['zakladanie-stavieb', 'monoliticke-konstrukcie'],
    category: 'Občianske stavby',
    location: 'Lučenec',
    year: 2025,
    duration: '6 mesiacov',
    budgetString: '€ 1.2M',
    imageUrl: '/Rekonstrukcia-novohradskeho-muzea-Lucenec.webp'
  },
  {
    id: 'rekonstrukcia-domovu-dochodcov-senior-active-hrinova-n-o',
    /**
     * TODO — doplniť rozsah (čísla služieb ako pri ostatných projektoch).
     * Na fotografiách je jednoznačne vidieť omietky (05); ďalej maľby,
     * kazetové podhľady a podlahové krytiny, ktoré vlastnú stránku služby
     * nemajú. Nedopĺňam sám — z fotky sa nedá zistiť, čo robil subdodávateľ.
     */
    realizedServices: [],
    title: 'Zariadenie pre seniorov a domov sociálnych služieb SENIOR ACTIVE Hriňová',
    description:
      'Rekonštrukcia a modernizácia priestorov zariadenia pre seniorov a domova sociálnych služieb — nové omietky a maľby izieb a chodieb, kazetové podhľady s novým osvetlením a podlahové krytiny. Práce prebiehali po etapách za prevádzky zariadenia.',
    category: 'Občianske stavby',
    location: 'Hriňová',
    year: 2025,
    duration: '4 mesiace',
    budgetString: '€ 450 000',
    imageUrl: '/rekonstrukcia-domovu-dochodcov-senior-active-hrinova.webp',
    // Chronologicky podľa EXIF (17. 2. – 7. 5. 2025). Všetkých 9 fotografií
    // má EXIF, poradie je teda presné.
    gallery: [
      { url: '/portfolio/senior-active-hrinova/01.webp', caption: 'Február 2025 — chodba pripravená na omietanie: zakrytie podláh, oblepenie hrán a odkryté rozvody v podhľade' },
      { url: '/portfolio/senior-active-hrinova/02.webp', caption: 'Február 2025 — nové omietky v izbách, radiátory a okná chránené fóliou počas prác' },
      { url: '/portfolio/senior-active-hrinova/03.webp', caption: 'Február 2025 — izba počas omietania, vpravo ešte pôvodný povrch steny' },
      { url: '/portfolio/senior-active-hrinova/04.webp', caption: 'Február 2025 — dokončená omietka izby s pripravenými vývodmi elektroinštalácie' },
      { url: '/portfolio/senior-active-hrinova/05.webp', caption: 'Marec 2025 — montáž rastra kazetového podhľadu a rozvodov na chodbe' },
      { url: '/portfolio/senior-active-hrinova/06.webp', caption: 'Marec 2025 — izba po maľbe a položení novej podlahovej krytiny' },
      { url: '/portfolio/senior-active-hrinova/07.webp', caption: 'Marec 2025 — dokončená izba s obnoveným vykurovaním a rozvodmi' },
      { url: '/portfolio/senior-active-hrinova/08.webp', caption: 'Marec 2025 — izba po dokončení povrchových úprav' },
      { url: '/portfolio/senior-active-hrinova/09.webp', caption: 'Máj 2025 — hotová chodba s kazetovým podhľadom, LED osvetlením a madlami, zariadenie opäť v prevádzke' },
    ],
  },
  {
    id: 'rekonstrukcia-rodinneho-domu-hrinova',
    // Rozsah podľa klienta: služby 01–10 v číslovaní ServicesGrid (poradie
    // TRADE_SERVICES v services.ts) — teda všetky remeslá okrem jadrového
    // vŕtania a rezania otvorov.
    realizedServices: [
      'zakladanie-stavieb',
      'monoliticke-konstrukcie',
      'murarske-prace',
      'tesarske-prace',
      'omietky',
      'potery',
      'obkladacske-prace',
      'fasady',
      'vykopove-zemne-prace',
      'buracie-prace',
    ],
    title: 'Rekonštrukcia rodinného domu Hriňová',
    description:
      'Kompletná rekonštrukcia staršieho rodinného domu — od vybúrania omietok a nových oceľových prekladov cez sanáciu muriva, nové rozvody, omietky a potery až po výmenu strechy, zateplenie s novou fasádou, oporné múry, terasu a dokončené interiéry.',
    category: 'Rodinné domy',
    location: 'Hriňová',
    year: 2025,
    // TODO: doplniť. Fotografie pokrývajú roky 2023 až 2025.
    duration: '',
    budgetString: '',
    imageUrl: '/kompletna-rekonstrukcia-domu-hrinova.webp',
    /**
     * 51 fotografií. Poradie je zatiaľ PROVIZÓRNE:
     *  - p01–p03 pochádzajú z Facebooku (bez EXIF), zachytávajú pôvodný stav,
     *  - p04–p29 sú zoradené presne podľa EXIF (máj 2023 – jún 2025),
     *  - p30–p51 sú exporty z Messengeru: EXIF je odstránený a všetky majú
     *    rovnaký mtime, takže dátum z nich zistiť nejde. Sú z rôznych etáp
     *    a treba ich zaradiť podľa obsahu.
     *
     * Popisy s TODO sú zámerne neutrálne — sú pravdivé, ale zatiaľ nepopisujú
     * konkrétny záber. Nekopírujte popis z inej fotografie.
     */
    gallery: [
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p01.webp', caption: 'Pôvodný stav — obnažené tehlové murivo a nové oceľové nosníky v strope' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p02.webp', caption: 'Pôvodný stav — vybúrané omietky, drážky pre elektroinštaláciu a nový preklad' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p03.webp', caption: 'Pôvodný stav — obnažené murivo pripravené na sanáciu a nové rozvody' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p30.webp', caption: 'Murovanie oporného múru z betónových tvárnic pri odkopanom svahu' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p31.webp', caption: 'Armovanie základového pásu oporného múru pozdĺž príjazdovej cesty' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p32.webp', caption: 'Odvoz sutiny a štrkový zásyp s drenážou pozdĺž nového múru' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p33.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p34.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p35.webp', caption: 'Búracie práce — odvoz sutiny rýpadlom a kolesovým dumperom' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p36.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p37.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p38.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p39.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p40.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p41.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p42.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p43.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p44.webp', caption: 'Debnenie a armovanie železobetónovej dosky terasy pri dome' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p45.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p46.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p47.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p48.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p49.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p50.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p51.webp', caption: 'Priebeh rekonštrukcie rodinného domu' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p04.webp', caption: 'Máj 2023 — vnútorné omietky a nové okná, pohľad do obytnej časti' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p05.webp', caption: 'Máj 2023 — nové dispozičné priečky a omietnuté ostenia otvorov' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p06.webp', caption: 'Máj 2023 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p07.webp', caption: 'Júl 2023 — omietnutý interiér s priznanými trámami a izoláciou podlahy pod poter' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p08.webp', caption: 'Júl 2023 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p09.webp', caption: 'Júl 2023 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p10.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p11.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p12.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p13.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p14.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p15.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p16.webp', caption: 'Október 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p17.webp', caption: 'November 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p18.webp', caption: 'November 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p19.webp', caption: 'November 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p20.webp', caption: 'November 2024 — dom po výmene strechy, zateplení a novej fasáde' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p21.webp', caption: 'November 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p22.webp', caption: 'November 2024 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p23.webp', caption: 'Jún 2025 — dokončená kúpeľňa s veľkoformátovým obkladom' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p24.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p25.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p26.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p27.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p28.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-hrinova/p29.webp', caption: 'Jún 2025 — priebeh rekonštrukcie' }, // TODO: opísať konkrétny záber
    ],
  },

  {
    id: 'monoliticka-stropna-doska-stozok',
    title: 'Monolitická stropná doska Stožok',
    description: 'Debnenie a betonáž atypickej stropnej dosky.',
    // The whole project is this one trade.
    realizedServices: ['monoliticke-konstrukcie'],
    category: 'Rodinné domy',
    location: 'Stožok',
    year: 2022,
    duration: '',
    budgetString: '',
    imageUrl: '/monolit-stozok/Monolit-Stozok-1536x1152.jpg'
  },

  {
    id: 'rekonstrukcia-rodinneho-domu-detva',
    // TODO: doplniť rozsah (čísla služieb). Na fotografiách je vidieť
    // zatepľovanie a fasádu, omietky, podlahové vykurovanie a potery —
    // potvrďte, čo z toho ste realizovali vy.
    realizedServices: [],
    title: 'Rekonštrukcia rodinného domu Detva',
    description:
      'Kompletná rekonštrukcia rodinného domu v Detve — od búracích prác a odkrytia pôvodného kamenného muriva cez nové preklady a okná, odkop po obvode so soklovou izoláciou a drenážou, zateplenie obvodového plášťa s novou fasádou, sadrokartónové podhľady a vnútorné omietky, podlahové vykurovanie s potermi až po kompletné dokončenie interiéru vrátane podláh a kuchyne na mieru.',
    category: 'Rodinné domy',
    location: 'Detva',
    // Fotografie sú z februára 2023 až augusta 2024; pôvodne uvedený rok 2023
    // ponechaný — potvrďte, ktorý rok sa má uvádzať ako rok realizácie.
    year: 2023,
    // TODO: doplniť. Fotografie pokrývajú približne 18 mesiacov.
    duration: '',
    budgetString: '',
    imageUrl: '/rekonstrukcia-domu-detva/Rekonstrukcia-domu-detva.webp',
    /**
     * Chronologicky podľa EXIF — všetkých 37 fotografií má dátum, poradie je
     * presné. Popisy bez TODO sú overené pohľadom na konkrétnu fotografiu;
     * ostatné pomenúvajú etapu, ktorá je pre daný dátum overená zo vzorky.
     */
    gallery: [
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/001.webp', caption: 'Február 2023 — pôvodný stav interiéru po vyprataní a odstránení podláh' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/002.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/003.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/004.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/005.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/006.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/007.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/008.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/009.webp', caption: 'Február 2023 — vypratanie a odstránenie pôvodných povrchov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/010.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/011.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/012.webp', caption: 'Marec 2023 — búracie práce, odkryté tehlové murivo pri pôvodnom schodisku' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/013.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/014.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/015.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/016.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/017.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/018.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/019.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/020.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/021.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/022.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/023.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/024.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/025.webp', caption: 'Marec 2023 — búracie práce a odkrývanie konštrukcií' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/026.webp', caption: 'Apríl 2023 — pohľad zo záhrady: nová krytina, rozšírené otvory a rozostavaná prístavba' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/027.webp', caption: 'Apríl 2023 — nová strešná krytina a úpravy otvorov' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/028.webp', caption: 'Júl 2023 — pôvodný dom od ulice s vybúranými okennými otvormi' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/029.webp', caption: 'Júl 2023 — pôvodný stav objektu pred ďalšou etapou' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/030.webp', caption: 'Júl 2023 — pôvodný stav objektu pred ďalšou etapou' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/031.webp', caption: 'Júl 2023 — pôvodný stav objektu pred ďalšou etapou' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/032.webp', caption: 'September 2023 — obnažené kamenné a tehlové murivo s novými prekladmi a osadeným oknom' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/033.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/034.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/035.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/036.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/037.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/038.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/039.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/040.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/041.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/042.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/043.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/044.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/045.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/046.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/047.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/048.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/049.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/050.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/051.webp', caption: 'September 2023 — obnažené murivo, nové preklady a osadzovanie okien' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/052.webp', caption: 'September 2023 — odkop po obvode, soklová XPS izolácia a nopová fólia na základoch' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/053.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/054.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/055.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/056.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/057.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/058.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/059.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/060.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/061.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/062.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/063.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/064.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/065.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/066.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/067.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/068.webp', caption: 'September 2023 — odkop po obvode, soklová izolácia a drenáž' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/069.webp', caption: 'November 2023 — kotvenie minerálnej vlny na obvodový plášť, fasáda chránená plachtou' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/070.webp', caption: 'November 2023 — zatepľovanie obvodového plášťa' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/071.webp', caption: 'November 2023 — hotová základná vrstva fasády s vytiahnutými ostenami okien' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/072.webp', caption: 'Január 2024 — zatmelené sadrokartónové podhľady a cementové omietky stien' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/073.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/074.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/075.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/076.webp', caption: 'Január 2024 — interiér pripravený na podlahy, steny po jadrovej omietke' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/077.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/078.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/079.webp', caption: 'Január 2024 — sadrokartónové podhľady a vnútorné omietky' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/080.webp', caption: 'Január 2024 — systémové dosky podlahového vykurovania položené na izolácii' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/081.webp', caption: 'Január 2024 — príprava podlahového vykurovania' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/082.webp', caption: 'Január 2024 — príprava podlahového vykurovania' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/083.webp', caption: 'Január 2024 — príprava podlahového vykurovania' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/084.webp', caption: 'Január 2024 — príprava podlahového vykurovania' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/085.webp', caption: 'Február 2024 — rozvinuté potrubie podlahového vykurovania pred betonážou poteru' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/086.webp', caption: 'Február 2024 — podlahové vykurovanie pred poterom' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/087.webp', caption: 'Február 2024 — podlahové vykurovanie pred poterom' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/088.webp', caption: 'Máj 2024 — dokončená izba s položenou podlahou a vymaľovanými stenami' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/089.webp', caption: 'Máj 2024 — dokončovacie práce a podlahy' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/090.webp', caption: 'Máj 2024 — dokončovacie práce a podlahy' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/091.webp', caption: 'Máj 2024 — dokončovacie práce a podlahy' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/092.webp', caption: 'August 2024 — dokončený denný priestor s kuchynskou linkou na mieru' },
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/093.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/094.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/095.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/096.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/097.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/098.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/099.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/100.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/101.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/102.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/103.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/104.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
      { url: '/portfolio/rekonstrukcia-rodinneho-domu-detva/105.webp', caption: 'August 2024 — dokončený interiér po rekonštrukcii' }, // TODO: opísať konkrétny záber
    ],
  },

  {
    id: 'hruba-stavba-dubravy',
    // Rozsah podľa klienta: služby 02, 03, 04, 05, 06 a 09 v číslovaní
    // ServicesGrid (poradie TRADE_SERVICES v services.ts).
    //
    // Zakladanie stavieb (01) v rozsahu zámerne NIE JE, hoci fotografie 02–05
    // zachytávajú základové pásy a dosku — tie dokumentujú priebeh stavby,
    // nie autorstvo tejto etapy.
    realizedServices: [
      'monoliticke-konstrukcie',
      'murarske-prace',
      'tesarske-prace',
      'omietky',
      'potery',
      'vykopove-zemne-prace',
    ],
    title: 'Hrubá stavba Dúbravy',
    // Ponechaná pôvodná veta o prístupovej ceste — na fotografiách nie je
    // zachytená, ale to neznamená, že nebola súčasťou diela. Zvyšok opisuje
    // to, čo je na fotografiách vidieť.
    description:
      'Kompletná hrubá stavba rodinného domu a prístupovej cesty s prvkami modernej architektúry. Realizácia od výkopu základových rýh cez murivo z pórobetónu, debnenie a betonáž vencov, väzníkový krov a strešnú krytinu až po vnútorné omietky.',
    category: 'Rodinné domy',
    location: 'Dúbravy',
    year: 2023,
    // TODO: doplniť. Fotografie pokrývajú marec/apríl až november 2023,
    // teda približne 8 mesiacov — potvrďte podľa zmluvy.
    duration: '',
    budgetString: '',
    imageUrl: '/hruba-stavba-dubravy/hruba-stavba-rd-dubravy.webp',
    /**
     * Chronologicky podľa EXIF DateTimeOriginal. Štyri fotografie prišli cez
     * Messenger, ktorý EXIF odstraňuje — tie sú zaradené podľa toho, čo je na
     * nich vidieť (01–03 pred betonážou dosky, 07 počas murovania).
     */
    gallery: [
      { url: '/portfolio/hruba-stavba-dubravy/01.webp', caption: 'Výkop základových rýh minirýpadlom na rovinatom pozemku' },
      { url: '/portfolio/hruba-stavba-dubravy/02.webp', caption: 'Vybetónované základové pásy s uloženou ležatou kanalizáciou' },
      { url: '/portfolio/hruba-stavba-dubravy/03.webp', caption: 'Základové pásy a rozvody pred betonážou základovej dosky' },
      { url: '/portfolio/hruba-stavba-dubravy/04.webp', caption: 'Apríl 2023 — hotová základová doska a navezené palety pórobetónu' },
      { url: '/portfolio/hruba-stavba-dubravy/05.webp', caption: 'Apríl 2023 — vymeriavanie a prvý rad muriva na základovej doske' },
      { url: '/portfolio/hruba-stavba-dubravy/06.webp', caption: 'Apríl 2023 — prvé rady obvodového muriva a soklová XPS izolácia' },
      { url: '/portfolio/hruba-stavba-dubravy/07.webp', caption: 'Apríl 2023 — ryha pre elektrickú prípojku pozdĺž základovej dosky' },
      { url: '/portfolio/hruba-stavba-dubravy/08.webp', caption: 'Apríl 2023 — nopová fólia, geotextília a obvodová drenáž pri základoch' },
      { url: '/portfolio/hruba-stavba-dubravy/09.webp', caption: 'Apríl 2023 — revízna šachta a zaústenie drenáže do štrkového lôžka' },
      { url: '/portfolio/hruba-stavba-dubravy/10.webp', caption: 'Apríl 2023 — murovanie obvodových stien a vnútorných priečok' },
      { url: '/portfolio/hruba-stavba-dubravy/11.webp', caption: 'Apríl 2023 — dispozícia domu čitateľná z rozostavaného muriva' },
      { url: '/portfolio/hruba-stavba-dubravy/12.webp', caption: 'Apríl 2023 — debnenie vencov a preklad nad garážovým otvorom' },
      { url: '/portfolio/hruba-stavba-dubravy/13.webp', caption: 'Apríl 2023 — debnenie stužujúceho venca po celom obvode, pohľad z interiéru' },
      { url: '/portfolio/hruba-stavba-dubravy/14.webp', caption: 'Apríl 2023 — podpery a debniace dosky pripravené na betonáž venca' },
      { url: '/portfolio/hruba-stavba-dubravy/15.webp', caption: 'Apríl 2023 — armatúra venca uložená v debnení pred betonážou' },
      { url: '/portfolio/hruba-stavba-dubravy/16.webp', caption: 'Apríl 2023 — murivo v plnej výške s pripraveným vencom' },
      { url: '/portfolio/hruba-stavba-dubravy/17.webp', caption: 'Jún 2023 — osadené priehradové väzníky krovu' },
      { url: '/portfolio/hruba-stavba-dubravy/18.webp', caption: 'Júl 2023 — krov nad hlavnou časťou objektu a prístreškom' },
      { url: '/portfolio/hruba-stavba-dubravy/19.webp', caption: 'Júl 2023 — pohľad na dokončenú konštrukciu krovu' },
      { url: '/portfolio/hruba-stavba-dubravy/20.webp', caption: 'Júl 2023 — latovanie strechy a navezená strešná krytina' },
      { url: '/portfolio/hruba-stavba-dubravy/21.webp', caption: 'August 2023 — položená krytina, osadené okná, dvere a garážová brána' },
      { url: '/portfolio/hruba-stavba-dubravy/22.webp', caption: 'August 2023 — hrubá stavba uzavretá a pripravená na vnútorné práce' },
      { url: '/portfolio/hruba-stavba-dubravy/23.webp', caption: 'November 2023 — záhradná strana so štrkovým pásom po obvode' },
      { url: '/portfolio/hruba-stavba-dubravy/24.webp', caption: 'November 2023 — chodba po dokončení vnútorných omietok' },
      { url: '/portfolio/hruba-stavba-dubravy/25.webp', caption: 'November 2023 — obytná časť s omietkami a parozábranou v podhľade' },
      { url: '/portfolio/hruba-stavba-dubravy/26.webp', caption: 'November 2023 — presklená stena do záhrady po omietnutí ostenia' },
      { url: '/portfolio/hruba-stavba-dubravy/27.webp', caption: 'November 2023 — otvorený denný priestor s pripraveným roštom podhľadu' },
      { url: '/portfolio/hruba-stavba-dubravy/28.webp', caption: 'November 2023 — prechod medzi miestnosťami po omietkach' },
      { url: '/portfolio/hruba-stavba-dubravy/29.webp', caption: 'November 2023 — izba s osadeným oknom pripravená na potery' },
    ],
  },

  {
    id: 'rodinny-dom-banska-bystrica',
    // Scope as given by the client: trades 02–09 in the ServicesGrid numbering
    // (see TRADE_SERVICES order in services.ts).
    realizedServices: [
      'monoliticke-konstrukcie',
      'murarske-prace',
      'tesarske-prace',
      'omietky',
      'potery',
      'obkladacske-prace',
      'fasady',
      'vykopove-zemne-prace',
    ],
    title: 'Rodinný dom Banská Bystrica',
    // Describes only what is visible in the photographs: a sloping plot with a
    // lower-level garage, white render with timber-effect cladding, and a
    // dry-stone retaining wall with paving around the house.
    description:
      'Realizácia rodinného domu na svahovitom pozemku so vstavanou garážou v úrovni ulice. Zahŕňala zateplenie a fasádu, vnútorné omietky a potery, obklady, oporný múr z lomového kameňa a spevnené plochy okolo domu.',
    category: 'Rodinné domy',
    location: 'Banská Bystrica',
    year: 2023,
    // TODO: doplniť. Fotografie dokumentujú priebeh od júna 2022 do júla 2023
    // (podľa EXIF), teda zhruba 14 mesiacov — potvrďte podľa zmluvy.
    duration: '',
    // TODO: doplniť, ak sa má rozpočet zverejniť.
    budgetString: '',
    imageUrl: '/rodinny-dom-banska-bystrica-slnecne-strane.webp',
    /**
     * All 28 supplied photographs, ordered by EXIF DateTimeOriginal — file
     * mtimes were unreliable (one had been re-saved years later). One file
     * carried no EXIF at all; it is placed at 20 by content, between the other
     * late-June frames it clearly belongs with.
     *
     * Every caption describes that specific frame. Do not copy a caption onto
     * another photo — the same text under two different pictures is exactly
     * the problem this gallery previously had.
     */
    gallery: [
      { url: '/portfolio/rodinny-dom-banska-bystrica/01.webp', caption: 'Jún 2022 — stav pred našimi prácami: hrubá stavba s osadenou strechou a oknami, garáž v úrovni ulice' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/02.webp', caption: 'Jún 2022 — lešenie na uličnej strane a prvé dosky zatepľovacieho systému' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/03.webp', caption: 'Jún 2022 — záhradná strana, lepenie izolantu a príprava podkladu pod fasádu' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/04.webp', caption: 'Október 2022 — debnenie Doka a armovanie železobetónového venca oporného múrika pri vstupe' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/05.webp', caption: 'Október 2022 — dokončená biela fasáda a osadené exteriérové žalúzie' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/06.webp', caption: 'Október 2022 — uličný pohľad po zateplení a finálnej omietke' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/07.webp', caption: 'Máj 2023 — záhradná strana s nopovou fóliou a obvodovou drenážou pri základoch' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/08.webp', caption: 'Máj 2023 — svahovitá horná časť pozemku pred terénnymi úpravami' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/09.webp', caption: 'Máj 2023 — odvodňovacie žľaby ACO pripravené na osadenie pozdĺž fasády' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/10.webp', caption: 'Máj 2023 — výkop ryhy pre drenáž a štrkový zásyp po obvode domu' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/11.webp', caption: 'Máj 2023 — osadený odvodňovací žľab a betónový obrubník po obvode objektu' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/12.webp', caption: 'Máj 2023 — detail drenážneho potrubia a štrkového lôžka pri základovej škáre' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/13.webp', caption: 'Máj 2023 — minirýpadlo a vibračná doska pri hutnení zásypu okolo základov' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/14.webp', caption: 'Máj 2023 — zemné práce pozdĺž obvodu a príprava podkladu pre spevnené plochy' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/15.webp', caption: 'Máj 2023 — nivelácia terénu rotačným laserom pred kladením dlažby' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/16.webp', caption: 'Jún 2023 — drevený obklad na poschodí a osadené zábradlie balkóna' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/17.webp', caption: 'Jún 2023 — betónový oporný múr a začiatok kladenia lomového kameňa' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/18.webp', caption: 'Jún 2023 — osadené prvé stupne vonkajšieho schodiska na záhradnej strane' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/19.webp', caption: 'Jún 2023 — oporný múr z lomového kameňa a modelovanie svahu pred domom' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/20.webp', caption: 'Jún 2023 — dokončený oporný múr, ukladanie vonkajšieho schodiska' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/21.webp', caption: 'Jún 2023 — uličný pohľad s dokončeným kamenným múrom a upraveným predpolím' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/22.webp', caption: 'Jún 2023 — kladenie zámkovej dlažby po obvode, vlastná technika na stavbe' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/23.webp', caption: 'Jún 2023 — dlažba okolo objektu a hrubé modelovanie terénu' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/24.webp', caption: 'Júl 2023 — hotový dom s kamenným oporným múrom, schodiskom a terasou' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/25.webp', caption: 'Júl 2023 — uličný pohľad na dokončenú realizáciu' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/26.webp', caption: 'Júl 2023 — záhradná strana s dlažbou po obvode a odvodňovacím žľabom' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/27.webp', caption: 'Júl 2023 — pohľad na terasu a dokončené spevnené plochy' },
      { url: '/portfolio/rodinny-dom-banska-bystrica/28.webp', caption: 'Júl 2023 — hotová fasáda, francúzske balkóny a spevnené plochy pri vstupe' },
    ],
  },

  {
    id: 'rekonstrukcia-interieru-ocova',
    // Rozsah podľa klienta: služby 03, 05 a 07 v číslovaní ServicesGrid
    // (poradie TRADE_SERVICES v services.ts).
    realizedServices: ['murarske-prace', 'omietky', 'obkladacske-prace'],
    title: 'Rekonštrukcia interiéru v rodinnom dome Očová',
    description:
      'Rekonštrukcia interiéru staršieho rodinného domu — nová kúpeľňa s veľkoformátovým obkladom, murovaným sprchovým kútom a závesnou sanitou, obnovené povrchy stien, nové podlahy a interiérové dvere v celom podlaží.',
    category: 'Rodinné domy',
    location: 'Očová',
    year: 2024,
    // TODO: doplniť. Fotografie pokrývajú január až máj 2024.
    duration: '',
    budgetString: '',
    imageUrl: '/portfolio/rekonstrukcia-interieru-ocova/06.webp',
    // Chronologicky podľa EXIF — všetkých 10 fotografií má dátum.
    // Každý popis je overený pohľadom na konkrétnu fotografiu.
    gallery: [
      { url: '/portfolio/rekonstrukcia-interieru-ocova/01.webp', caption: 'Január 2024 — pôvodný stav chodby s pôvodnými dverami a dlažbou' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/02.webp', caption: 'Január 2024 — pôvodná kuchyňa s odkrytou drevenou podlahou' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/03.webp', caption: 'Január 2024 — izba po odstránení podlahovej krytiny pred obnovou povrchov' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/04.webp', caption: 'Marec 2024 — obkladanie kúpeľne veľkoformátovým obkladom, pripravená podomietková nádržka' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/05.webp', caption: 'Marec 2024 — kúpeľňa počas obkladania s novým oknom a sadrokartónovým podhľadom' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/06.webp', caption: 'Máj 2024 — hotová kúpeľňa so sprchovým kútom, výklenkami a závesným WC' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/07.webp', caption: 'Máj 2024 — umývadlová zostava so zrkadlom a pohľad do chodby' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/08.webp', caption: 'Máj 2024 — obývacia izba s dreveným lamelovým obkladom steny a novou podlahou' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/09.webp', caption: 'Máj 2024 — chodba po rekonštrukcii s novými dverami a vstupom do kúpeľne' },
      { url: '/portfolio/rekonstrukcia-interieru-ocova/10.webp', caption: 'Máj 2024 — spálňa s vstavanou skriňou po dokončení' },
    ],
  }
];

/**
 * Real completed work in a given town — the one thing on a service × city page
 * that no competitor can copy and that no template can generate.
 *
 * Returns [] for towns where nothing has been built yet. That is the honest
 * answer, and those pages are the thin ones: if this list stays empty for a
 * town, the page there has no local proof to offer.
 */
export function projectsInCity(citySlug: string): Project[] {
  return projectsData.filter(
    (p) => PROJECT_CITY_SLUG[p.location] === citySlug,
  );
}

/** Same, narrowed to the service category the page is about. */
export function projectsInCityForCategory(
  citySlug: string,
  category: ServiceCategory,
): Project[] {
  return projectsInCity(citySlug).filter((p) => p.category === category);
}

/**
 * The reverse of `realizedServices`: every project on which this trade was
 * actually performed. This is what puts real work on a service page, and it
 * stays correct automatically — tagging a project is the only edit needed.
 */
export function projectsForService(serviceSlug: string): Project[] {
  return projectsData.filter((p) =>
    (p.realizedServices ?? []).includes(serviceSlug as ServiceSlug),
  );
}

/**
 * Proof for a service × city page.
 *
 * Strictly projects IN that town — the section is headed "Čo sme už postavili
 * {mesto} a v okolí", so anything from elsewhere would make that heading
 * false. Within the town, work of this specific trade sorts first, because
 * "we did this exact job here" is stronger evidence than "we worked here".
 *
 * Returns [] where there is nothing real to show, which is the honest answer.
 */
export function proofForServiceAndCity(
  serviceSlug: string,
  citySlug: string,
): Project[] {
  const forService = new Set(projectsForService(serviceSlug).map((p) => p.id));
  return [...projectsInCity(citySlug)].sort((a, b) => {
    const aMatch = forService.has(a.id) ? 0 : 1;
    const bMatch = forService.has(b.id) ? 0 : 1;
    return aMatch - bMatch || b.year - a.year;
  });
}
