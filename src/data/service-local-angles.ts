import type { CityConditions } from './city-conditions';
import { snowLoadNote, seasonNote } from './city-conditions';
import type { ServiceSlug } from './services-slugs';

/**
 * Per-service local angle. Each function receives the city's physical
 * conditions and returns copy that reflects the ACTUAL engineering
 * difference — not the city name inserted into a fixed sentence.
 *
 * `differentiates` says whether this service's method genuinely varies
 * by location. Where it's false, be honest: the page should lean on real
 * local proof (projects, logistics) rather than invented technical variation.
 */

export type LocalAngle = {
  /** 60-120 words. The technical reality of this service in this place. */
  body: string;
  /** 1-3 FAQ pairs specific to this service + these conditions. */
  faq: { q: string; a: string }[];
};

/**
 * INVARIANT: this map must agree with the `switch` in `getServiceLocalAngle`.
 * `true` means "has a dedicated per-city function"; `false` means it falls
 * through to `genericLocalAngle`.
 *
 * The two lists previously disagreed in three places — `rezidencne-budovy`
 * was flagged `true` with no function behind it (so the heading promised
 * location-specific guidance over generic travel-distance copy), while
 * `murarske-prace` and `buracie-prace` were flagged `false` despite having
 * real functions. Change one, change the other.
 */
export const SERVICE_DIFFERENTIATES: Record<ServiceSlug, boolean> = {
  'rodinne-domy': true,
  'rezidencne-budovy': true,
  'komercna-vystavba': true,
  'priemyselne-objekty': true,
  'obcianske-stavby': true,
  'zakladanie-stavieb': true,
  'monoliticke-konstrukcie': true,
  'murarske-prace': true,
  'tesarske-prace': true,
  omietky: true,
  potery: true,
  fasady: true,
  'vykopove-zemne-prace': true,
  'buracie-prace': true,

  // Genuinely identical everywhere. These lean on logistics, access and real
  // local proof instead — see `genericLocalAngle`.
  'obkladacske-prace': false,
  'jadrove-vrtanie': false,
  'rezanie-otvorov': false,
};

/* ------------------------------------------------------------------ */
/* Services whose method genuinely varies by ground, climate or access */
/* ------------------------------------------------------------------ */

export function zakladanieStavieb(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.subsoil === 'rock' && c.terrain === 'steep') {
    parts.push(
      `Zakladanie ${cityLoc} znamená prácu v skalnatom podloží na svahu. Výkop často nestačí urobiť rýpadlom — potrebné je rozpojovanie horniny a následne kaskádové základy alebo mikropiloty, ktoré prenesú zaťaženie do únosnej vrstvy. Pri väčších prevýšeniach navrhujeme oporné železobetónové steny, ktoré stabilizujú svah nad aj pod stavbou.`,
    );
  } else if (c.subsoil === 'clay') {
    parts.push(
      `Ílovité podložie ${cityLoc} má nízku priepustnosť a mení objem podľa vlhkosti. Základovú škáru preto zakladáme pod hĺbku premŕzania a dopĺňame ju drenážou a štrkovým vankúšom, ktorý zamedzí sadaniu. Bez odvedenia zrážkovej vody od základov sa na íle skôr či neskôr objavia trhliny v murive.`,
    );
  } else if (c.highWaterTable) {
    parts.push(
      `Pozemky ${cityLoc} ležia v riečnej nive, kde býva hladina spodnej vody vysoko. Pred zakladaním preto odporúčame hydrogeologické posúdenie. Spodnú stavbu izolujeme natavovanými asfaltovými pásmi alebo fóliou proti tlakovej vode a pri podpivničení počítame s bielou vaňou z vodostavebného betónu.`,
    );
  } else {
    parts.push(
      `Podložie ${cityLoc} býva pomerne stabilné, čo zakladanie zjednodušuje aj zlacňuje. Aj tak však vždy vychádzame z geologického prieskumu — únosnosť sa môže líšiť aj v rámci jednej ulice, a základ je jediná časť domu, ktorú neskôr neopravíte bez rozobratia stavby.`,
    );
  }

  const season = seasonNote(c);
  if (season) {
    parts.push(
      `Betonáž základov je mokrý proces, preto ju ${cityLoc} plánujeme mimo mrazivého obdobia — ${season}.`,
    );
  }

  const faq: { q: string; a: string }[] = [];

  if (c.subsoil === 'rock') {
    faq.push({
      q: `Predraží skalnaté podložie ${cityLoc} výkopové práce?`,
      a: 'Rozpojovanie horniny je pomalšie a nákladnejšie než výkop v zemine. Preto pred cenovou ponukou robíme obhliadku a odporúčame sondu — aby ste sumu poznali vopred, nie až po začatí prác.',
    });
  }
  if (c.highWaterTable) {
    faq.push({
      q: `Dá sa ${cityLoc} stavať s pivnicou?`,
      a: 'Áno, ale pri vyššej hladine spodnej vody je nutná izolácia proti tlakovej vode alebo biela vaňa. Riešenie navrhneme podľa výsledku hydrogeologického posúdenia pozemku.',
    });
  }
  if (faq.length === 0) {
    faq.push({
      q: `Robíte pred zakladaním ${cityLoc} geologický prieskum?`,
      a: 'Odporúčame ho pri každej stavbe. Sprostredkujeme ho a jeho výsledok premietneme do návrhu základov aj do rozpočtu.',
    });
  }

  return { body: parts.join(' '), faq };
}

export function tesarskePrace(c: CityConditions, cityLoc: string): LocalAngle {
  const snow = snowLoadNote(c);
  const parts: string[] = [];

  if (snow) {
    parts.push(
      `Krov ${cityLoc} navrhujeme s ohľadom na ${snow} — v nadmorskej výške okolo ${c.altitude} m nie je dimenzovanie strešnej konštrukcie formalitou. Väčšie prierezy krokiev, kratšie rozpätia a poctivé spoje sú tu rozdiel medzi strechou, ktorá vydrží desaťročia, a strechou, ktorá sa po pár zimách začne prehýbať.`,
    );
  } else {
    parts.push(
      `Krovy ${cityLoc} realizujeme v štandardnej snehovej oblasti, čo umožňuje subtílnejšie konštrukcie a väčšie rozpätia. Dôraz kladieme na kvalitu reziva, jeho vysušenie a na chemickú ochranu proti drevokaznému hmyzu a hubám.`,
    );
  }

  if (c.climate === 'cold-wet') {
    parts.push(
      'Vo vlhkejšej klíme je zásadné odvetranie strešného plášťa. Nedostatočná vetracia medzera vedie ku kondenzácii, plesniam v podkroví a k znehodnoteniu izolácie.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: snow
          ? `Ako dimenzujete krov na sneh ${cityLoc}?`
          : `Aké rezivo používate na krovy ${cityLoc}?`,
        a: snow
          ? 'Vychádzame zo snehovej oblasti podľa normy a z konkrétneho tvaru strechy. Návrh vždy prechádza statikom — najmä pri väčších rozpätiach a pri vikieroch.'
          : 'Používame sušené a impregnované ihličnaté rezivo. Pri pohľadových prvkoch volíme vyšší triedny výber a spoje riešime tesárskymi väzbami alebo skrytým kovaním.',
      },
    ],
  };
}

export function fasady(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.heritage) {
    parts.push(
      `Fasády ${cityLoc} často podliehajú podmienkam pamiatkovej ochrany. Kontaktné zatepľovacie systémy tu nebývajú prípustné — pracujeme preto s vápennými a vápenno-cementovými omietkami, ktoré nechajú murivo dýchať, a zatepľujeme zvnútra alebo v skladbe, ktorú pamiatkari odsúhlasia.`,
    );
  } else if (c.climate === 'cold-wet') {
    parts.push(
      `Vo vlhkej a chladnej klíme ${cityLoc} sa na fasádach rýchlejšie objavujú riasy a plesne, najmä na severných stranách. Volíme preto omietky so zvýšenou odolnosťou a väčšie hrúbky izolantu — pri dlhej vykurovacej sezóne sa investícia do zateplenia vráti rýchlejšie než v teplejších okresoch.`,
    );
  } else if (c.climate === 'hot-dry') {
    parts.push(
      `${cityLoc} rieši fasáda skôr letné prehrievanie než zimné straty. Svetlejšie odtiene, difúzne otvorená skladba a príprava pre vonkajšie tienenie majú v tunajších letách väčší efekt na komfort bývania než každý ďalší centimeter polystyrénu.`,
    );
  } else {
    parts.push(
      `Fasádne systémy ${cityLoc} realizujeme ako ETICS aj ako prevetrávané. Voľba závisí od typu muriva, jeho vlhkosti a od toho, či ide o novostavbu alebo o obnovu staršieho objektu s neizolovanou podmurovkou.`,
    );
  }

  const season = seasonNote(c);
  if (season) {
    parts.push(
      `Lepenie izolantu a omietanie sú teplotne citlivé, preto fasádne práce ${cityLoc} plánujeme do vhodného obdobia — ${season}.`,
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: c.heritage
          ? `Môžem zatepliť dom v pamiatkovej zóne ${cityLoc}?`
          : `Aký izolant odporúčate ${cityLoc}?`,
        a: c.heritage
          ? 'Vonkajšie kontaktné zateplenie býva v pamiatkovej zóne obmedzené. Riešením je vnútorné zateplenie s difúzne otvorenou skladbou alebo sanačná omietka — konkrétny postup vždy konzultujeme s pamiatkovým úradom.'
          : c.climate === 'cold-wet'
            ? 'Pri dlhej vykurovacej sezóne odporúčame väčšie hrúbky a minerálnu vlnu tam, kde je požiadavka na požiarnu odolnosť či difúziu. Konkrétnu skladbu navrhneme podľa typu muriva.'
            : 'Závisí od muriva a od toho, či riešite skôr zimné straty alebo letné prehrievanie. Po obhliadke navrhneme skladbu aj hrúbku a doložíme predpokladanú úsporu.',
      },
    ],
  };
}

export function vykopoveZemnePrace(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.access === 'difficult') {
    parts.push(
      `Prístup na pozemky ${cityLoc} býva úzky a strmý${c.dispersedSettlement ? ', keďže značná časť zástavby leží na lazoch a v rozptýlených osadách' : ''}. Pred nasadením techniky preto prístupovú trasu vždy prejdeme osobne a podľa nej volíme veľkosť stroja aj spôsob dopravy materiálu.`,
    );
  } else {
    parts.push(
      `Prístup na pozemky ${cityLoc} býva bezproblémový, čo umožňuje nasadiť väčšiu mechanizáciu a skrátiť čas zemných prác. Výkopy realizujeme podľa vytýčenia geodetom a s presnou niveletou.`,
    );
  }

  if (c.subsoil === 'rock') {
    parts.push(
      'V skalnatom podloží počítame s pomalším postupom a s rozpojovaním horniny — objem a náročnosť výkopu preto oceňujeme až po obhliadke, nie od stola.',
    );
  }
  if (c.highWaterTable) {
    parts.push(
      'Pri vysokej hladine spodnej vody zabezpečujeme čerpanie a paženie výkopu, aby steny neopadávali a práce nemuseli stáť.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Dostanete techniku na môj pozemok ${cityLoc}?`,
        a:
          c.access === 'difficult'
            ? 'Vo väčšine prípadov áno, no trasu si vždy najprv prejdeme. Pri úzkych alebo strmých úsekoch volíme menšiu mechanizáciu a prispôsobíme dopravu betónu.'
            : 'Prístup tu býva dobrý, takže s nasadením techniky nebýva problém. Obhliadku aj tak robíme — kvôli sieťam, susedom a odvozu výkopku.',
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Larger building types — vary by site logistics, not by trade method  */
/* ------------------------------------------------------------------ */

/**
 * These four previously fell through to `genericLocalAngle`, which produced
 * ~40 words of travel-distance copy and left the pages ~6% unique.
 *
 * The variation written here is site-level, not trade-level: where the crane
 * stands, how deep the pad has to be cut, what a conservation zone permits.
 * That is a real difference on a real site, and it is the difference a client
 * planning a building actually asks about.
 */
export function rezidencneBudovy(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.terrain === 'steep') {
    parts.push(
      `Bytové a polyfunkčné objekty ${cityLoc} sa väčšinou stavajú na svahovitých parcelách, kde je rozhodujúce osadenie objektu a postavenie žeriavu. Zvažujúce sa pozemky riešime etapovitým výkopom a opornými stenami, podzemné podlažia sa tu často zarezávajú do svahu — čo je výhoda pre parkovanie, ale zvyšuje nároky na paženie a na hydroizoláciu prilahlej steny.`,
    );
  } else {
    parts.push(
      `Na rovinatých parcelách ${cityLoc} býva zakladanie bytových a polyfunkčných objektov priamočiare — žeriav aj čerpadlo betónu sa dajú postaviť blízko objektu, čo skracuje betonáže a šetrí náklady na mechanizáciu. Kľúčové je preto skôr zariadenie staveniska a logistika dopravy než samotné osadenie.`,
    );
  }

  if (c.highWaterTable) {
    parts.push(
      'Pri podzemných garážach rátame s vyššou hladinou spodnej vody — spodnú stavbu navrhujeme ako bielu vaňu z vodostavebného betónu alebo s izoláciou proti tlakovej vode. Pri viacpodlažnej stavbe je to položka, ktorú sa neoplatí podceniť.',
    );
  }

  if (c.heritage) {
    parts.push(
      'Časť územia spadá pod pamiatkovú ochranu, kde je regulovaná výška zástavby, tvar strechy aj riešenie uličnej fasády. Objemovú štúdiu preto odporúčame konzultovať s pamiatkovým úradom ešte pred projektom pre územné rozhodnutie.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Zabezpečujete ${cityLoc} aj hrubú stavbu bytového domu vrátane monolitov?`,
        a: 'Áno — základy, monolitické stropy, schodiská aj zvislé konštrukcie realizujeme vo vlastnej réžii. Rozsah a etapizáciu dohodneme podľa toho, čo máte pokryté projektom a inými dodávateľmi.',
      },
      {
        q:
          c.terrain === 'steep'
            ? `Ako riešite osadenie objektu na svahu ${cityLoc}?`
            : `Ako prebieha zariadenie staveniska ${cityLoc}?`,
        a:
          c.terrain === 'steep'
            ? 'Vychádzame z výškopisu a geológie. Podľa prevýšenia navrhneme kaskádové založenie alebo oporné steny a k tomu postup výkopu tak, aby bol svah stabilný počas celej stavby.'
            : 'Pred začatím prejdeme prístupovú trasu, umiestnenie žeriavu, skládky materiálu a napojenie na siete. Cieľom je, aby doprava betónu a materiálu nemusela riešiť obchádzky počas stavby.',
      },
    ],
  };
}

export function komercnaVystavba(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  parts.push(
    c.access === 'difficult'
      ? `Komerčné prevádzky ${cityLoc} sa často stavajú alebo rekonštruujú v zástavbe s obmedzeným prístupom. Harmonogram preto staviame okolo dopravy materiálu — závozy plánujeme mimo špičky a väčšie dodávky delíme, aby prevádzka v okolí nestála.`
      : `Komerčné objekty ${cityLoc} majú spravidla dobrý prístup pre techniku aj závozy, čo umožňuje plynulý harmonogram a kratšie termíny. Pri realizácii počas prevádzky delíme stavbu na etapy tak, aby predajňa či kancelária mohla fungovať ďalej.`,
  );

  if (c.heritage) {
    parts.push(
      'V pamiatkovo chránenej časti mesta je riešenie výkladov, portálov a reklamných označení viazané na súhlas pamiatkového úradu. Pri prevádzkach v historickom jadre preto rátame s dlhším povoľovacím procesom a zapracujeme ho do harmonogramu.',
    );
  }

  if (c.climate === 'hot-dry') {
    parts.push(
      'V teplejšej klíme sa pri presklených fasádach a predajných priestoroch výrazne prejavia letné tepelné zisky — tienenie a skladbu zasklenia preto riešime už v hrubej stavbe, nie dodatočne.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Viete realizovať prestavbu prevádzky ${cityLoc} počas otváracích hodín?`,
        a: 'Vo väčšine prípadov áno — prácu rozdelíme na etapy, hlučné činnosti presunieme mimo prevádzkových hodín a stavenisko oddelíme od časti prístupnej zákazníkom. Postup dohodneme vopred podľa vášho režimu.',
      },
    ],
  };
}

export function priemyselneObjekty(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.terrain === 'flat') {
    parts.push(
      `Haly a skladové objekty ${cityLoc} ťažia z rovinatého terénu — pre veľkú pôdorysnú plochu to znamená menej zemných prác a jednoduchšie vytýčenie základovej škáry. Rozhodujúcou položkou tak býva únosnosť podložia pod podlahou haly, nie samotný výkop.`,
    );
  } else {
    parts.push(
      `Priemyselné objekty ${cityLoc} potrebujú veľkú rovinnú plochu, ktorú členitý terén sám neponúka. Pripravuje sa preto rozsiahlym zárezom a násypom — a práve zhutnenie násypu rozhoduje o tom, či podlaha haly neskôr nesadne. Túto fázu neurýchľujeme, pretože chybu v nej nie je možné opraviť bez rozobratia podlahy.`,
    );
  }

  if (c.subsoil === 'clay') {
    parts.push(
      'Ílovité podložie má nízku priepustnosť a mení objem podľa vlhkosti, čo je pri veľkoplošných priemyselných podlahách kritické. Skladbu preto navrhujeme so štrkovým vankúšom a drenážou a vychádzame z geotechnického posudku, nie z odhadu.',
    );
  } else if (c.highWaterTable) {
    parts.push(
      'Pri vyššej hladine spodnej vody dopĺňame pod podlahu haly drenážny systém a izoláciu, aby vlhkosť nemigrovala do konštrukcie podlahy a do skladovaného tovaru.',
    );
  }

  if (c.access === 'difficult') {
    parts.push(
      'Prístupovú trasu overujeme vopred aj kvôli nadrozmernej doprave — väzníky a oceľové konštrukcie hál sa vozia v dĺžkach, ktoré nie každá cesta v okolí zvládne.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Realizujete ${cityLoc} aj základy a podlahy priemyselných hál?`,
        a: 'Áno — zemné práce, základové pätky, základové pásy aj podkladné vrstvy pod priemyselnú podlahu. Skladbu navrhujeme podľa zaťaženia, ktoré na podlahu reálne pôjde, vrátane pojazdu manipulačnej techniky.',
      },
      {
        q: `Ako dlho trvá príprava pozemku pod halu ${cityLoc}?`,
        a:
          c.terrain === 'flat'
            ? 'Na rovine býva príprava rýchla — závisí najmä od plochy a od toho, či treba vymeniť podložie. Konkrétny termín viem povedať po obhliadke a geologickom posúdení.'
            : 'V členitom teréne je to podstatná časť stavby, pretože zárez, násyp a jeho zhutnenie sa nedajú urýchliť. Reálny harmonogram dostanete po obhliadke a zameraní.',
      },
    ],
  };
}

export function obcianskeStavby(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  parts.push(
    `Občianske stavby ${cityLoc} — školy, zariadenia sociálnych služieb, kultúrne a administratívne objekty — sa spravidla realizujú z verejných zdrojov, čo kladie dôraz na doloženú kvalitu, dodržanie rozpočtu a preukázateľný postup prác. Tomu prispôsobujeme aj dokumentáciu a fotodokumentáciu priebehu stavby.`,
  );

  if (c.heritage) {
    parts.push(
      'Značná časť verejných budov tu stojí v pamiatkovo chránenom území alebo je priamo národnou kultúrnou pamiatkou. Postup prác, materiály aj detaily preto podliehajú záväznému stanovisku pamiatkového úradu a rátame s tým už pri harmonograme, nie až počas realizácie.',
    );
  }

  if (c.access !== 'easy') {
    parts.push(
      'Objekty vo verejnej prevádzke navyše nie je vždy možné odstaviť naraz. Prácu preto delíme na etapy tak, aby zostala zachovaná prevádzka aj bezpečný pohyb užívateľov po stavenisku.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Máte skúsenosť s verejnými zákazkami ${cityLoc} a v okolí?`,
        a: 'Áno, realizovali sme viacero občianskych stavieb pre verejných obstarávateľov v Banskobystrickom kraji — konkrétne referencie a rozsah prác nájdete v našom portfóliu.',
      },
      {
        q: `Viete pracovať v objekte, ktorý ostáva v prevádzke?`,
        a: 'Áno. Stavbu rozdelíme na etapy, stavenisko stavebne oddelíme a hlučné práce naplánujeme na dohodnuté časy. Pri zariadeniach sociálnych služieb je to štandardná súčasť zadania.',
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Wet trades — method is standard, but scheduling genuinely varies     */
/* ------------------------------------------------------------------ */

/**
 * Plaster and screed are the same craft everywhere. What is NOT the same is
 * how long they take to dry and how much of the year you can do them in —
 * that is a function of climate and altitude, and it is the thing that
 * actually moves a client's handover date. Honest variation, no invented
 * technical difference.
 */
export function omietky(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];
  const season = seasonNote(c);

  parts.push(
    `Omietanie ${cityLoc} technologicky prebieha rovnako ako inde — rozdiel je v čase, ktorý si konštrukcia vyžiada na vyschnutie. Mokrý proces potrebuje teplotu nad 5 °C počas nanášania aj tuhnutia, takže termín omietok priamo ovplyvňuje, kedy sa dá pokračovať poterom a podlahami.`,
  );

  if (c.climate === 'hot-dry') {
    parts.push(
      `Tunajšie letá patria k najteplejším na Slovensku a to omietkam neprospieva tak, ako by sa čakalo. Priveľmi rýchle vysychanie je rovnaký problém ako mráz — omietka stratí vodu skôr, než stihne nabrať pevnosť, a povrch popraská. Preto v letných mesiacoch ${cityLoc} tienime otvory, obmedzujeme prievan a čerstvé omietky vlhčíme, prípadne prácu presúvame na skoré ráno.`,
    );
  } else if (season) {
    parts.push(
      `V nadmorskej výške okolo ${c.altitude} m je to citeľné: ${season}. Ak sa omietky nestihnú do jesene, býva rozumnejšie objekt uzavrieť, vykurovať a omietať v riadenom režime než tlačiť termín a riskovať mrazom poškodenú vrstvu.`,
    );
  } else {
    parts.push(
      `Pri ${c.altitude} m n. m. a miernejšej klíme je sezóna dostatočne dlhá na to, aby sa omietky dali realizovať od jari do neskorej jesene bez temperovania objektu. Termín tak určuje skôr postup ostatných profesií než počasie.`,
    );
  }

  if (c.climate === 'cold-wet') {
    parts.push(
      'Vo vlhkejšej klíme je dôležité vetranie počas schnutia. Bez neho vlhkosť ostáva v priestore, omietka schne nerovnomerne a na povrchu sa môžu objaviť mapy a plesne.',
    );
  }

  if (c.highWaterTable) {
    parts.push(
      'Pri objektoch v nive, kde je hladina spodnej vody vyššie, si pred omietaním overujeme vlhkosť muriva. Omietka nanesená na vlhký podklad sa odlupuje a na povrchu sa objavia výkvety solí — príčina je pritom v spodnej stavbe, nie v omietke.',
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Kedy vieme po omietkach ${cityLoc} pokračovať ďalšími prácami?`,
        a: 'Orientačne rátajte s 1 cm hrúbky za približne týždeň schnutia, pri dobrom vetraní. Presnejšie to povieme po obhliadke — závisí to od hrúbky, podkladu a od toho, či je objekt vykurovaný.',
      },
      {
        q: `Realizujete omietky ${cityLoc} aj v zime?`,
        a: 'Áno, ak je objekt uzavretý a temperovaný na stabilnú teplotu. V nevykurovanej stavbe omietky v mraze nerobíme — vrstva by nenabrala pevnosť a musela by sa odstrániť.',
      },
    ],
  };
}

export function potery(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];
  const season = seasonNote(c);

  parts.push(
    `Potery ${cityLoc} realizujeme štandardnými technológiami — rozdiel oproti iným lokalitám nie je v postupe, ale v harmonograme. Poter je posledný veľký mokrý proces pred podlahami, takže jeho schnutie určuje, kedy sa dá do domu nasťahovať.`,
  );

  if (c.climate === 'hot-dry') {
    parts.push(
      `${capitalizeFirst(cityLoc)} rátame v lete s opačným problémom, než je zima — poter vysychá zhora rýchlejšie, než stíha hydratovať. Bez zakrytia a vlhčenia v prvých dňoch sa objavia zmrašťovacie trhliny a poter stratí pevnosť v ploche, kde bude neskôr stáť nábytok.`,
    );
  } else if (season) {
    parts.push(
      `Pri ${c.altitude} m n. m. a kratšej stavebnej sezóne to znamená naplánovať poter tak, aby stihol vyschnúť pred zimou, alebo počítať s vykurovaním objektu počas schnutia. ${capitalizeFirst(season)}.`,
    );
  } else {
    parts.push(
      `Mierna klíma a nadmorská výška okolo ${c.altitude} m dávajú na schnutie poteru dostatočne dlhé okno, takže termín nasťahovania sa dá plánovať pomerne spoľahlivo — za predpokladu, že objekt je uzavretý a dá sa vetrať.`,
    );
  }

  parts.push(
    'Pred kladením podlahy vždy odporúčame odmerať zvyškovú vlhkosť poteru. Drevená podlaha alebo vinyl položené na nedosušený poter sa zdeformujú a reklamácia smeruje na podlahára, hoci príčina vznikla o dva mesiace skôr.',
  );

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Ako dlho schne poter ${cityLoc} pred kladením podlahy?`,
        a: 'Pri cementovom potere je bežné orientačné pravidlo približne týždeň na centimeter hrúbky, pri anhydritovom je to rýchlejšie. Rozhodujúca je však nameraná zvyšková vlhkosť, nie kalendár.',
      },
      {
        q: 'Robíte aj potery s podlahovým vykurovaním?',
        a: 'Áno. Pri podlahovom vykurovaní dodržiavame predpísaný nábehový a vykurovací protokol pred kladením podlahy — bez neho hrozí praskanie poteru aj poškodenie finálnej vrstvy.',
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Services whose method does NOT vary by location                     */
/* ------------------------------------------------------------------ */

/**
 * For these, do NOT invent technical variation — a reader in the trade will
 * spot it and Google will read it as spun content. Differentiate honestly on
 * logistics, response time, and real completed work.
 *
 * If you have no real project in that town for that service, this page has
 * nothing genuine to say and is the strongest candidate for noindex.
 */
export function genericLocalAngle(
  serviceName: string,
  cityLoc: string,
  distanceKm: number,
  c: CityConditions,
): LocalAngle {
  const parts: string[] = [];

  parts.push(
    `${serviceName} ${cityLoc} realizujeme rovnakým postupom a s rovnakou technikou ako inde — technológia týchto prác sa lokalitou nemení. Čo sa mení, je dostupnosť, čas príjazdu a to, do akej konštrukcie sa vŕta alebo reže.`,
  );

  parts.push(
    distanceKm === 0
      ? 'Sídlime priamo tu, takže na obhliadku aj na samotnú realizáciu sa vieme dostaviť prakticky okamžite a pri havarijných situáciách reagovať ešte v ten deň.'
      : `Z našej centrály vo Zvolene je to sem približne ${distanceKm} km, čo zvládame v rámci bežného výjazdu. Pri menších zákazkách spájame viacero adries v jednej lokalite do jedného výjazdu, aby doprava zbytočne nenavyšovala cenu.`,
  );

  if (c.access === 'difficult' || c.dispersedSettlement) {
    parts.push(
      'Časť zástavby v okolí tvoria samoty a lazy s úzkymi prístupovými cestami. Pred realizáciou si preto overíme trasu a podľa nej volíme veľkosť techniky — pri horšom prístupe pracujeme s ručne prenosnými vŕtacími a reznými zostavami, ktoré sa dostanú aj tam, kde veľký stroj neprejde.',
    );
  }

  if (c.heritage) {
    parts.push(
      'V pamiatkovo chránenej časti mesta je zásah do konštrukcie viazaný na stanovisko pamiatkového úradu. Pri historických objektoch navyše rátame s nepravidelným murivom a s klenbami, kde postup konzultujeme so statikom pred prvým rezom.',
    );
  }

  const faq: { q: string; a: string }[] = [
    {
      q: `Prídete na obhliadku ${cityLoc} aj pri menšej zákazke?`,
      a: 'Obhliadku robíme pred každou ponukou. Pri menších zákazkách vieme spojiť viacero výjazdov v rámci jednej lokality, aby sme zbytočne nenavyšovali cenu o dopravu.',
    },
  ];

  if (c.access === 'difficult' || c.dispersedSettlement) {
    faq.push({
      q: `Dostanete sa s technikou aj na samotu alebo lazy ${cityLoc}?`,
      a: 'Vo väčšine prípadov áno. Trasu si vopred prejdeme a podľa šírky a sklonu prístupu zvolíme zostavu — pri najhoršom prístupe pracujeme s prenosnou technikou a vodu aj elektrinu si vieme zabezpečiť vlastnými zdrojmi.',
    });
  }

  return { body: parts.join(' '), faq };
}

/* ------------------------------------------------------------------ */
/* Rodinné domy — hub-level local angle for /sluzby/rodinne-domy/[mesto] */
/* ------------------------------------------------------------------ */

/**
 * Replaces the previous "Využívame znalosť miestnych podmienok" sentence,
 * which asserted local knowledge without demonstrating any and read
 * identically in Zvolen and in Rimavská Sobota.
 *
 * Everything below is verifiable geography — terrain, subsoil, climate,
 * access, altitude, heritage status. No invented projects or statistics.
 */
export function rodinneDomyLocalAngle(
  c: CityConditions,
  cityLoc: string,
  cityGen: string,
): LocalAngle {
  const parts: string[] = [];

  // --- what the ground does to the foundation ---
  if (c.subsoil === 'rock' && c.terrain === 'steep') {
    parts.push(
      `Pozemky v okolí ${cityGen} bývajú svahovité a s plytkým skalnatým podložím. Pri rodinných domoch to znamená, že výkop je pomalší, časť horniny treba rozpojiť a základ sa rieši kaskádovito alebo s opornou stenou. Je to práca navyše, no urobená poriadne raz — a nie dodatočne, keď sa dom začne hýbať.`,
    );
  } else if (c.highWaterTable) {
    parts.push(
      `${capitalizeFirst(cityLoc)} a v priľahlých obciach rátame pri zakladaní s vyššou hladinou spodnej vody. Hydroizoláciu spodnej stavby preto neriešime úsporne — pri podpivničení navrhujeme skladbu odolnú proti tlakovej vode. Vlhká pivnica je chyba, ktorú nikto neopraví lacno.`,
    );
  } else if (c.subsoil === 'clay') {
    parts.push(
      `Ílovité podložie, typické pre okolie ${cityGen}, mení objem podľa vlhkosti. Základovú škáru preto ukladáme pod hĺbku premŕzania a dopĺňame drenážou a štrkovým vankúšom. Bez odvedenia vody od základov sa na íle skôr či neskôr objavia trhliny v murive.`,
    );
  } else {
    parts.push(
      `Podložie ${cityLoc} býva pomerne stabilné, čo zakladanie zjednodušuje aj zlacňuje. Aj tak vychádzame z geologického posúdenia — únosnosť sa líši aj v rámci jednej ulice a základ je jediná časť domu, ktorú neskôr neopravíte bez rozobratia stavby.`,
    );
  }

  // --- what the climate does to the envelope and the schedule ---
  const snow = snowLoadNote(c);
  const season = seasonNote(c);
  if (snow || season) {
    const bits: string[] = [];
    if (snow) bits.push(`krov dimenzujeme na ${snow}`);
    if (season) bits.push('mokré procesy plánujeme do teplých mesiacov');
    parts.push(
      `V nadmorskej výške okolo ${c.altitude} m nie je skladba obvodového plášťa ani strechy formalita — ${bits.join(' a ')}. Technologické prestávky patria do harmonogramu, nie medzi prekvapenia.`,
    );
  } else if (c.climate === 'hot-dry') {
    parts.push(
      `Letá ${cityLoc} patria k najteplejším na Slovensku, takže pri novostavbách riešime rovnako aj prehrievanie — skladbu obvodového plášťa, orientáciu presklení a prípravu pre vonkajšie tienenie. Zimné straty sú tu menší problém než júlové popoludnie.`,
    );
  }

  // --- what access does to the logistics ---
  if (c.access === 'difficult') {
    parts.push(
      c.dispersedSettlement
        ? `Zástavba je tu roztiahnutá do lazov a osád, preto prístupovú cestu k pozemku vždy prejdeme osobne ešte pred cenovou ponukou. Podľa nej volíme veľkosť techniky aj spôsob dopravy betónu.`
        : `Prístup k pozemkom býva úzky a strmý, preto trasu pre domiešavače a nákladné vozidlá overujeme vopred — aby sa neriešila až v deň betonáže.`,
    );
  }

  if (c.heritage) {
    parts.push(
      `Časť zástavby ${cityLoc} spadá pod pamiatkovú ochranu. Pri obnove takýchto domov konzultujeme postup s pamiatkovým úradom a pracujeme s tradičnými materiálmi — vápennými omietkami a pôvodným tvaroslovím fasád.`,
    );
  }

  /* ---- FAQ: 3 condition-specific + 4 general, all localised ---- */
  const faq: { q: string; a: string }[] = [];

  if (c.access === 'difficult') {
    faq.push({
      q: `Dostanete techniku na môj pozemok ${cityLoc}?`,
      a: c.dispersedSettlement
        ? 'Vo väčšine prípadov áno, no prístupovú cestu si vždy najprv prejdeme osobne — pri lazoch a odľahlejších osadách je to nutnosť. Podľa nej volíme veľkosť mechanizácie aj spôsob dopravy betónu, aby sa to neriešilo až v deň betonáže.'
        : 'Vo väčšine prípadov áno. Trasu pre domiešavače a nákladné vozidlá overujeme vopred a pri úzkych alebo strmých úsekoch volíme menšiu mechanizáciu.',
    });
  }

  if (c.subsoil === 'rock') {
    faq.push({
      q: 'Predraží skalnaté podložie výkopové a základové práce?',
      a: 'Áno, rozpojovanie horniny je pomalšie a nákladnejšie než výkop v zemine. Práve preto pred cenovou ponukou robíme obhliadku a odporúčame geologickú sondu — aby ste sumu poznali vopred a nie až po začatí prác.',
    });
  }

  if (c.highWaterTable) {
    faq.push({
      q: `Dá sa ${cityLoc} stavať s pivnicou alebo suterénom?`,
      a: 'Dá, ale pri vyššej hladine spodnej vody je nutná izolácia proti tlakovej vode, prípadne biela vaňa z vodostavebného betónu. Konkrétne riešenie navrhneme podľa hydrogeologického posúdenia vášho pozemku.',
    });
  }

  if (c.subsoil === 'clay') {
    faq.push({
      q: 'Ako riešite zakladanie na ílovitom podloží?',
      a: 'Základovú škáru ukladáme pod hĺbku premŕzania a dopĺňame ju drenážou a štrkovým vankúšom. Íl mení objem podľa vlhkosti, takže bez odvedenia zrážkovej vody od základov sa časom objavia trhliny v murive.',
    });
  }

  if (c.heritage) {
    faq.push({
      q: `Môžem zatepliť dom v pamiatkovej zóne ${cityLoc}?`,
      a: 'Vonkajšie kontaktné zateplenie býva v pamiatkovej zóne obmedzené. Riešením býva vnútorné zateplenie s difúzne otvorenou skladbou alebo sanačná omietka. Postup vždy konzultujeme s pamiatkovým úradom ešte pred podaním ohlásenia.',
    });
  }

  if (snow) {
    faq.push({
      q: 'Prispôsobujete strechu a zateplenie miestnym podmienkam?',
      a: `V nadmorskej výške okolo ${c.altitude} m dimenzujeme krov na ${snow} a volíme väčšie hrúbky tepelných izolantov. Rovnako dbáme na odvetranie strešného plášťa — bez neho kondenzuje vlhkosť a znehodnotí izoláciu.`,
    });
  }

  /* ---- general questions, phrased for this city ---- */

  faq.push({
    q: `Koľko trvá stavba rodinného domu ${cityLoc}?`,
    a: `Pri murovanom dome na kľúč a plynulom financovaní rátame s 9 až 12 mesiacmi vrátane technologických prestávok.${
      season ? ' V tomto regióne je stavebná sezóna kratšia, preto mokré procesy plánujeme do teplých mesiacov — s tým v harmonograme počítame vopred.' : ''
    }`,
  });

  faq.push({
    q: 'Postavíte aj len hrubú stavbu, alebo staviate výhradne na kľúč?',
    a: 'Oboje. Časť klientov si u nás objedná hrubú stavbu a dokončovacie práce si zabezpečí sám, iní chcú dom odovzdaný pripravený na kolaudáciu. Rozsah dohodneme v zmluve ešte pred začiatkom prác.',
  });

  faq.push({
    q: 'Pomôžete aj s projektom a stavebným povolením?',
    a: `Áno. Spolupracujeme s architektmi a projektantmi a klientom poskytujeme súčinnosť pri vybavovaní povolenia — vrátane podkladov pre napojenie na inžinierske siete. S miestnym stavebným úradom${
      c.access === 'difficult' ? ' aj s podmienkami pre horšie dostupné pozemky' : ''
    } máme skúsenosti.`,
  });

  faq.push({
    q: `Koľko stojí stavba domu ${cityLoc}?`,
    a: 'Cena závisí od veľkosti, tvaru domu, štandardu materiálov a od stavu pozemku. Orientačné rozpätie si viete vyskúšať v našej cenovej kalkulačke, záväznú ponuku však vypracujeme až po obhliadke a na základe projektovej dokumentácie.',
  });

  faq.push({
    q: 'Akú záruku na dielo poskytujete?',
    a: 'Záruka je vždy uvedená v zmluve o dielo a jej rozsah zodpovedá typu prác — iná je pri nosných konštrukciách a iná pri povrchových úpravách. Minimálne však vždy v rozsahu, ktorý stanovujú právne predpisy.',
  });

  return { body: parts.join(' '), faq };
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ------------------------------------------------------------------ */
/* Stavba na kľúč — local angle for the turnkey [mesto] pages          */
/* ------------------------------------------------------------------ */

/**
 * The turnkey city pages previously reused `rodinneDomyLocalAngle`, the same
 * function the /sluzby/rodinne-domy/[mesto] hub uses — so the hub and its own
 * child shipped an identical local paragraph and overlapped ~58%.
 *
 * A turnkey buyer is asking a different question than someone browsing the
 * hub. They have (or are choosing) a plot and want to know what it will cost
 * them in groundwork, how the utilities get there, and whether the schedule
 * holds. That is what this branches on — plot, connections, calendar — rather
 * than repeating the general foundations-and-climate story.
 */
export function stavbaNaKlucLocalAngle(
  c: CityConditions,
  cityLoc: string,
  cityGen: string,
): LocalAngle {
  const parts: string[] = [];

  // --- what a plot here costs you before the house even starts ---
  if (c.terrain === 'steep' || (c.subsoil === 'rock' && c.terrain !== 'flat')) {
    parts.push(
      `Pri dome na kľúč ${cityLoc} sa o výslednej cene rozhoduje skôr, než sa začne stavať — na pozemku. Svahovité parcely so skalnatým podložím znamenajú rozpojovanie horniny, kaskádové základy a často opornú stenu, čo sú položky, ktoré na rovine nezaplatíte vôbec. Preto pri ponuke na kľúč trváme na obhliadke pozemku a geologickom posúdení: bez nich je pevná cena len odhad, ktorý sa počas stavby zmení.`,
    );
  } else if (c.highWaterTable) {
    parts.push(
      `Pozemky ${cityLoc} ležia prevažne v nive, kde býva hladina spodnej vody vyššie. Pri dome na kľúč to má jeden veľmi konkrétny dôsledok: podpivničenie sa výrazne predraží, pretože si vyžiada izoláciu proti tlakovej vode alebo bielu vaňu. Väčšine klientov sa preto oplatí riešiť technickú miestnosť na prízemí a pivnicu vynechať — rozdiel v cene býva výraznejší, než sa čaká.`,
    );
  } else if (c.subsoil === 'clay') {
    parts.push(
      `Ílovité podložie v okolí ${cityGen} je pre stavbu na kľúč predvídateľné, ale nie zadarmo — mení objem podľa vlhkosti, takže do rozpočtu patrí drenáž, štrkový vankúš a založenie pod hĺbkou premŕzania. Sú to položky, ktoré sa v lacnejších ponukách často „stratia“ a doplatíte ich neskôr trhlinami v murive.`,
    );
  } else {
    parts.push(
      `Stavba domu na kľúč ${cityLoc} má tú výhodu, že podložie a prístup sú tu vo väčšine prípadov priaznivé — zakladanie je predvídateľné a rozpočet sa počas stavby nerozchádza s ponukou. Aj tak vychádzame z geologického posúdenia, pretože únosnosť sa líši aj v rámci jednej ulice.`,
    );
  }

  // --- utilities: the item that surprises turnkey buyers ---
  if (c.dispersedSettlement) {
    parts.push(
      `Rátajte aj s prípojkami. V lazoch a osadách býva vzdialenosť k verejnému vodovodu alebo ku kanalizácii desiatky až stovky metrov a niekde nie sú vôbec — potom je riešením vlastná studňa a žumpa alebo domáca čistička. Túto položku dávame do ponuky na kľúč od začiatku, nie ako dodatok v polovici stavby.`,
    );
  } else {
    parts.push(
      `Prípojky sú tu spravidla dostupné priamo na hranici pozemku, čo skracuje prípravu aj rozpočet. Vyjadrenia správcov sietí a podklady pre stavebný úrad vybavíme za vás — pri dome na kľúč je to súčasť dodávky, nie vaša domáca úloha.`,
    );
  }

  // --- the calendar, which is what "na kľúč" actually sells ---
  const season = seasonNote(c);
  const snow = snowLoadNote(c);
  if (season) {
    parts.push(
      `Harmonogram staviame okolo sezóny. V nadmorskej výške okolo ${c.altitude} m je stavebné obdobie kratšie${
        snow ? ` a krov dimenzujeme na ${snow}` : ''
      }, takže betonáže a mokré procesy plánujeme do teplých mesiacov a na zimu necháme práce v uzavretom objekte. Termín odovzdania, ktorý s tým nepočíta, sa nedodrží.`,
    );
  } else if (c.climate === 'hot-dry') {
    parts.push(
      `Dlhá a teplá sezóna tu dovoľuje stavať prakticky od jari do neskorej jesene, takže dom na kľúč sa dá reálne odovzdať v priebehu jedného roka. Do návrhu však patrí aj letné prehrievanie — orientácia presklení a príprava pre vonkajšie tienenie sa riešia v projekte, nie dodatočne klimatizáciou.`,
    );
  }

  if (c.heritage) {
    parts.push(
      `Ak pozemok leží v pamiatkovo chránenom území alebo v jeho ochrannom pásme, je regulovaná aj novostavba — výška, tvar strechy aj riešenie fasády. Overíme to ešte pred projektom, aby sa regulatívy nedozvedeli až v konaní.`,
    );
  }

  /* ---- FAQ ---- */
  const faq: { q: string; a: string }[] = [
    {
      q: `Je cena domu na kľúč ${cityLoc} konečná?`,
      a: 'Cena z ponuky je záväzná pre dohodnutý rozsah a štandard. Meniť ju môžu len vaše zmeny počas stavby alebo skutočnosti, ktoré sa dali zistiť až po odkrytí — napríklad iné podložie, než ukázala sonda. Preto pred ponukou robíme obhliadku a odporúčame geologické posúdenie.',
    },
  ];

  if (c.dispersedSettlement) {
    faq.push({
      q: `Čo ak na pozemku nie sú prípojky?`,
      a: 'Riešime to pravidelne. Podľa dostupnosti sietí navrhneme predĺženie prípojky, prípadne vlastnú studňu a žumpu alebo domovú čistiareň odpadových vôd. Náklad zahrnieme do ponuky vopred, aby sa neobjavil až počas stavby.',
    });
  }

  if (c.highWaterTable) {
    faq.push({
      q: `Oplatí sa ${cityLoc} podpivničenie?`,
      a: 'Pri vyššej hladine spodnej vody je pivnica podstatne drahšia, pretože si vyžiada izoláciu proti tlakovej vode alebo bielu vaňu. Ak nepotrebujete práve podzemné priestory, býva rozumnejšie rozšíriť prízemie. Konkrétne čísla porovnáme po hydrogeologickom posúdení.',
    });
  }

  faq.push({
    q: `Ako dlho trvá stavba domu na kľúč ${cityLoc}?`,
    a: season
      ? `Pri bežnom rodinnom dome rátajte orientačne s 12 až 18 mesiacmi od začatia prác. V nadmorskej výške okolo ${c.altitude} m je sezóna kratšia, preto termín závisí aj od toho, v ktorom mesiaci sa začne — harmonogram dostanete pred podpisom zmluvy, nie až počas stavby.`
      : 'Pri bežnom rodinnom dome rátajte orientačne s 12 až 18 mesiacmi od začatia prác. Sezóna je tu dostatočne dlhá, takže termín určuje najmä rozsah a naša kapacita. Harmonogram dostanete pred podpisom zmluvy.',
  });

  return { body: parts.join(' '), faq };
}

/* ------------------------------------------------------------------ */
/* Rekonštrukcia — local angle for the renovation [mesto] pages        */
/* ------------------------------------------------------------------ */

/**
 * Renovation cares about different things than a new build: the age and type
 * of the existing housing stock, damp in old masonry, heritage restrictions,
 * and whether a skip and a lorry can physically reach the house.
 */
export function rekonstrukciaLocalAngle(
  c: CityConditions,
  cityLoc: string,
  cityGen: string,
): LocalAngle {
  const parts: string[] = [];

  // --- what the local housing stock is made of ---
  if (c.heritage) {
    parts.push(
      `Značná časť domov ${cityLoc} stojí v pamiatkovo chránenom území alebo v jeho ochrannom pásme. Pri obnove takýchto objektov nejde len o stavebné riešenie — postup a materiály konzultujeme s pamiatkovým úradom ešte pred ohlásením. Používame vápenné omietky, ktoré nechajú murivo dýchať, a zachovávame pôvodné tvaroslovie fasády.`,
    );
  } else if (c.dispersedSettlement) {
    parts.push(
      `Staršie domy v okolí ${cityGen} kombinujú kamennú podmurovku s tehlovým alebo dreveným nadstavaním. Pri ich obnove sa najčastejšie stretávame so vzlínajúcou vlhkosťou, chýbajúcou izoláciou spodnej stavby a s krovom, ktorý už nespĺňa dnešné požiadavky. Sanáciu preto začíname odvlhčením muriva, nie fasádou.`,
    );
  } else {
    parts.push(
      `Bytový fond ${cityLoc} tvoria z veľkej časti domy z druhej polovice 20. storočia — murované, bez izolácie spodnej stavby a s pôvodnými rozvodmi. Pri komplexnej rekonštrukcii preto rátame s odizolovaním základov, výmenou elektriny aj vody a so statickým posúdením pred zásahom do nosných stien.`,
    );
  }

  // --- what the ground under an OLD house does to it ---
  // Without this, the seven towns that are neither heritage nor laz-settled
  // shared one identical opening paragraph.
  if (c.highWaterTable) {
    parts.push(
      `Väčšina staršej zástavby tu stojí v nive, kde je hladina spodnej vody vysoko, a to je pri obnove ten najčastejší skrytý problém. Domy z tohto obdobia nemajú funkčnú izoláciu spodnej stavby, takže vlhkosť vzlína murivom nahor — prejaví sa opadanou omietkou, výkvetmi solí a plesňou v rohoch miestností. Zatepliť takýto dom bez toho, aby sa najprv odriešilo odvlhčenie, znamená vlhkosť v stene uzavrieť. Preto začíname podrezaním alebo injektážou muriva a drenážou, až potom fasádou.`,
    );
  } else if (c.subsoil === 'clay') {
    parts.push(
      `Ílovité podložie v okolí ${cityGen} pracuje s vlhkosťou a staršie domy naň reagujú sadaním. Ak sú v murive šikmé trhliny nad otvormi alebo v rohoch, príčina býva v základoch, nie v omietke — a prekrytie novou fasádou ju o dva roky vráti. Preto pri obhliadke posudzujeme aj základovú škáru a odvedenie zrážkovej vody od domu.`,
    );
  } else if (c.subsoil === 'rock') {
    parts.push(
      `Skalnaté podložie dáva starším domom v okolí ${cityGen} stabilný základ, takže statické poruchy tu bývajú menej časté než v nivách. O to viac sa pri obnove sústredíme na obvodový plášť a na krov — teda na to, kde sa v tejto oblasti reálne stráca teplo a kde starnú konštrukcie najrýchlejšie.`,
    );
  }

  // --- climate drives the envelope priority ---
  if (c.climate === 'cold-wet' || c.altitude >= 500) {
    parts.push(
      `V nadmorskej výške okolo ${c.altitude} m sa investícia do zateplenia vracia rýchlejšie než v teplejších okresoch — vykurovacia sezóna je tu dlhšia. Pri obnove fasád volíme väčšie hrúbky izolantu a omietky odolné proti mrazu a riasam.`,
    );
  } else if (c.climate === 'hot-dry') {
    parts.push(
      `Letá ${cityLoc} patria k najteplejším na Slovensku, preto pri obnove neriešime len zimné straty. Skladba fasády, výmena okien a príprava pre tienenie majú tu na komfort bývania väčší vplyv než každý ďalší centimeter polystyrénu.`,
    );
  }

  // --- access matters more for renovation: skips, lorries, scaffolding ---
  if (c.access === 'difficult') {
    parts.push(
      `Rekonštrukcia znamená odvoz sutiny, a to je ${cityLoc} často náročnejšie než samotné búranie. Prístupovú cestu pre kontajner a nákladné auto overujeme vopred a pri úzkych úsekoch volíme menšie kontajnery s častejším odvozom.`,
    );
  } else {
    parts.push(
      `Prístup k domom býva tu bezproblémový, takže kontajner na sutinu vieme pristaviť priamo k objektu a odvoz riešiť priebežne — bez toho, aby sa odpad hromadil na pozemku počas celej rekonštrukcie.`,
    );
  }

  /* ---- FAQ ---- */
  const faq: { q: string; a: string }[] = [];

  if (c.heritage) {
    faq.push({
      q: `Môžem zatepliť dom v pamiatkovej zóne ${cityLoc}?`,
      a: 'Vonkajšie kontaktné zateplenie býva v pamiatkovej zóne obmedzené. Riešením býva vnútorné zateplenie s difúzne otvorenou skladbou alebo sanačná omietka. Postup vždy konzultujeme s pamiatkovým úradom ešte pred podaním ohlásenia.',
    });
  }

  if (c.access === 'difficult') {
    faq.push({
      q: `Dostanete kontajner a techniku k domu ${cityLoc}?`,
      a: 'Vo väčšine prípadov áno, no prístupovú cestu si vždy najprv prejdeme. Pri úzkych alebo strmých úsekoch volíme menšie kontajnery a častejší odvoz, prípadne prekládku na dostupnejšom mieste.',
    });
  }

  if (c.climate === 'cold-wet' || c.altitude >= 500) {
    faq.push({
      q: 'Kedy sa dá rekonštruovať — aj cez zimu?',
      a: `Interiérové práce bežia celoročne. Mokré procesy v exteriéri — omietky, zateplenie fasády, betonáže — plánujeme do teplých mesiacov, keďže stavebná sezóna je v tejto oblasti kratšia. Harmonogram podľa toho zostavíme hneď na začiatku.`,
    });
  }

  faq.push({
    q: 'Ako viem, či sa dom oplatí rekonštruovať alebo radšej zbúrať?',
    a: c.highWaterTable
      ? 'Pred rozsiahlou rekonštrukciou odporúčame obhliadku statikom. V tejto oblasti je rozhodujúci stav spodnej stavby — ak murivo vzlína roky a základy sú narušené, náklady na odvlhčenie a sanáciu sa môžu priblížiť cene novostavby. Po obhliadke vám otvorene povieme, ktorá cesta dáva zmysel.'
      : c.subsoil === 'clay'
        ? 'Pred rozsiahlou rekonštrukciou odporúčame obhliadku statikom. Na ílovitom podloží sa oplatí pozrieť najmä na trhliny v murive — ak ide o pokračujúce sadanie, treba najprv podchytiť základy a až potom riešiť interiér. Po obhliadke vám otvorene povieme, ktorá cesta dáva zmysel.'
        : 'Pred rozsiahlou rekonštrukciou odporúčame obhliadku statikom. Ak sú narušené základy, murivo je trvalo zavlhnuté a stropy vykazujú priehyby, býva ekonomickejšie dom asanovať. Po obhliadke vám otvorene povieme, ktorá cesta dáva zmysel.',
  });

  faq.push({
    q: 'Musím mať na rekonštrukciu stavebné povolenie?',
    a: 'Pri zásahu do nosných konštrukcií — búranie nosných stien, prístavby, nadstavby, zmena tvaru strechy — je povolenie nevyhnutné. Pri výmene okien, zateplení či nových omietkach postačuje ohláška. S podkladmi pre stavebný úrad vám pomôžeme.',
  });

  faq.push({
    q: 'Môžeme počas rekonštrukcie v dome bývať?',
    a: 'Pri čiastočnej rekonštrukcii sa to dá zvládnuť, práce sa však predĺžia a je to náročné na prach a hluk. Pri kompletnej rekonštrukcii so zásahom do rozvodov a dispozície odporúčame dom na čas opustiť.',
  });

  faq.push({
    q: `Koľko stojí rekonštrukcia domu ${cityLoc}?`,
    a: `Cena závisí od rozsahu a od toho, čo sa nájde po odkrytí konštrukcií — pri starších domoch sa vždy niečo nájde. ${
      c.highWaterTable
        ? 'V tejto lokalite býva najväčšou neznámou stav spodnej stavby, preto do rozpočtu od začiatku zahŕňame rezervu na odvlhčenie muriva.'
        : c.heritage
          ? 'V pamiatkovej zóne treba rátať aj s vyššou cenou materiálov a postupov, ktoré schváli pamiatkový úrad.'
          : c.climate === 'cold-wet' || c.altitude >= 500
            ? 'V tejto nadmorskej výške sa navyše oplatí investovať do väčších hrúbok izolácie, čo mierne dvíha cenu obvodového plášťa, no vracia sa na vykurovaní.'
            : 'Orientačné rozpätie si viete vyskúšať v kalkulačke.'
    } Záväznú ponuku vypracujeme po obhliadke a s položkovým rozpisom.`,
  });

  faq.push({
    q: 'Zabezpečujete odvoz a likvidáciu sutiny?',
    a: 'Áno. Súčasťou ponuky môže byť kompletné nakladanie so stavebným odpadom — od pristavenia kontajnerov cez triedenie až po likvidáciu na skládke.',
  });

  return { body: parts.join(' '), faq };
}

/* ------------------------------------------------------------------ */
/* Remaining branching trades                                          */
/* ------------------------------------------------------------------ */

export function monolitickeKonstrukcie(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.terrain === 'steep') {
    parts.push(
      `Monolitické konštrukcie ${cityLoc} sa najčastejšie týkajú oporných stien a kaskádových základov — svahovitý terén si ich vyžaduje takmer vždy, keď sa stavia na väčšom prevýšení. Debnenie navrhujeme podľa výšky steny a tlaku zeminy, nie podľa toho, čo je práve na sklade.`,
    );
  } else {
    parts.push(
      `Na rovinatých pozemkoch ${cityLoc} tvoria monolitické konštrukcie najmä stropné dosky, vence a schodiská. Rovný terén umožňuje jednoduchšie postavenie debnenia a plynulú betonáž bez prekládky čerpadla.`,
    );
  }

  const season = seasonNote(c);
  if (season) {
    parts.push(
      `Betón je mokrý proces, ktorý potrebuje na zretie teplotu nad nulou. V tejto oblasti preto betonáže plánujeme do teplých mesiacov a technologické prestávky zahrnieme do harmonogramu vopred.`,
    );
  }

  if (c.access === 'difficult') {
    parts.push(
      `Betón sa k stavbe musí dostať bez prerušenia — pri úzkych alebo strmých prístupových cestách ${cityLoc} preto vopred overujeme, či sa domiešavač a čerpadlo dostanú na miesto, prípadne riešime prekládku.`,
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: c.terrain === 'steep'
          ? `Realizujete oporné múry na svahovitých pozemkoch ${cityLoc}?`
          : `Aké monolitické konštrukcie najčastejšie realizujete ${cityLoc}?`,
        a: c.terrain === 'steep'
          ? 'Áno, na svahovitom teréne sú oporné železobetónové steny bežnou súčasťou stavby. Návrh výstuže aj hrúbky steny vždy prechádza statikom podľa výšky a tlaku zeminy.'
          : 'Najčastejšie stropné dosky, vence, preklady a schodiská. Pri väčších rozpätiach riešime aj prievlaky a stĺpy podľa statického návrhu.',
      },
    ],
  };
}

export function murarskePrace(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.climate === 'cold-wet' || c.altitude >= 500) {
    parts.push(
      `Pri murovaní ${cityLoc} má voľba obvodového muriva väčší dopad na budúce účty za kúrenie než v teplejších okresoch — vykurovacia sezóna je tu dlhšia. Odporúčame preto hrubšie tvarovky alebo murivo doplnené o kvalitnejšie zateplenie.`,
    );
  } else if (c.climate === 'hot-dry') {
    parts.push(
      `${capitalizeFirst(cityLoc)} sa pri obvodovom murive oplatí myslieť aj na letné prehrievanie. Materiály s vyššou akumulačnou schopnosťou udržia v dome znesiteľnú teplotu aj počas horúcich dní, ktoré tu bývajú výrazne dlhšie než na severe kraja.`,
    );
  } else {
    parts.push(
      `Murárske práce ${cityLoc} realizujeme z pálenej tehly aj z presného pórobetónu, podľa projektu a požiadaviek na tepelný odpor. Prvý rad zakladáme nivelákom — od jeho presnosti závisí rovinnosť celej stavby.`,
    );
  }

  const season = seasonNote(c);
  if (season) {
    parts.push(
      `Murovacie malty a lepidlá majú svoju minimálnu teplotu spracovania, preto hrubú stavbu ${cityLoc} plánujeme mimo mrazivého obdobia.`,
    );
  }

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Z akého materiálu murujete ${cityLoc}?`,
        a: 'Z pálenej brúsenej tehly aj z presného pórobetónu — voľba závisí od projektu, požadovaného tepelného odporu a od rozpočtu. Po obhliadke vám povieme, čo dáva v konkrétnom prípade väčší zmysel.',
      },
    ],
  };
}

export function buracieprace(c: CityConditions, cityLoc: string): LocalAngle {
  const parts: string[] = [];

  if (c.access === 'difficult') {
    parts.push(
      `Pri búracích prácach ${cityLoc} býva náročnejšie odviezť sutinu než ju vyprodukovať. Prístupovú cestu pre kontajner a nákladné auto overujeme vopred a pri úzkych úsekoch volíme menšie kontajnery s častejším odvozom.`,
    );
  } else {
    parts.push(
      `Prístup k objektom ${cityLoc} býva bezproblémový, takže kontajner na sutinu pristavíme priamo k stavbe a odvoz riešime priebežne — bez toho, aby sa odpad hromadil na pozemku.`,
    );
  }

  if (c.heritage) {
    parts.push(
      `Časť zástavby spadá pod pamiatkovú ochranu, kde búranie podlieha osobitným podmienkam. Rozsah zásahu preto konzultujeme s pamiatkovým úradom ešte pred začatím prác.`,
    );
  }

  parts.push(
    `Pred búraním vždy overíme odpojenie inžinierskych sietí a pri zásahu do nosných konštrukcií necháme postup posúdiť statikom — poradie búrania rozhoduje o tom, či zvyšok objektu ostane stabilný.`,
  );

  return {
    body: parts.join(' '),
    faq: [
      {
        q: `Zabezpečujete odvoz a likvidáciu sutiny ${cityLoc}?`,
        a: 'Áno, súčasťou ponuky býva kompletné nakladanie so stavebným odpadom — pristavenie kontajnera, triedenie recyklovateľných materiálov a legálna likvidácia na skládke.',
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Resolver used by /sluzby/[service]/[mesto]                          */
/* ------------------------------------------------------------------ */

export function getServiceLocalAngle(
  serviceSlug: string,
  serviceName: string,
  c: CityConditions,
  cityLoc: string,
  distanceKm: number,
): LocalAngle {
  switch (serviceSlug) {
    case 'zakladanie-stavieb':
      return zakladanieStavieb(c, cityLoc);
    case 'tesarske-prace':
      return tesarskePrace(c, cityLoc);
    case 'fasady':
      return fasady(c, cityLoc);
    case 'vykopove-zemne-prace':
      return vykopoveZemnePrace(c, cityLoc);
    case 'monoliticke-konstrukcie':
      return monolitickeKonstrukcie(c, cityLoc);
    case 'murarske-prace':
      return murarskePrace(c, cityLoc);
    case 'buracie-prace':
      return buracieprace(c, cityLoc);
    case 'rezidencne-budovy':
      return rezidencneBudovy(c, cityLoc);
    case 'komercna-vystavba':
      return komercnaVystavba(c, cityLoc);
    case 'priemyselne-objekty':
      return priemyselneObjekty(c, cityLoc);
    case 'obcianske-stavby':
      return obcianskeStavby(c, cityLoc);
    case 'omietky':
      return omietky(c, cityLoc);
    case 'potery':
      return potery(c, cityLoc);
    default:
      // Trades whose method genuinely doesn't vary by location — see
      // SERVICE_DIFFERENTIATES. Differentiate honestly on logistics instead
      // of inventing terrain-based technical variation.
      return genericLocalAngle(serviceName, cityLoc, distanceKm, c);
  }
}
