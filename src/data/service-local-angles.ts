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

export const SERVICE_DIFFERENTIATES: Record<ServiceSlug, boolean> = {
  'rodinne-domy': true,
  'rezidencne-budovy': true,
  'komercna-vystavba': false,
  'priemyselne-objekty': false,
  'obcianske-stavby': false,
  'zakladanie-stavieb': true,
  'monoliticke-konstrukcie': true,
  'murarske-prace': false,
  'tesarske-prace': true,
  omietky: false,
  potery: false,
  'obkladacske-prace': false,
  fasady: true,
  'vykopove-zemne-prace': true,
  'buracie-prace': false,
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
  const reach =
    distanceKm === 0
      ? 'Sídlime priamo tu, takže na obhliadku sa vieme dostaviť prakticky okamžite.'
      : `Z našej centrály vo Zvolene je to sem približne ${distanceKm} km, čo zvládame v rámci bežného výjazdu.`;

  const access =
    c.access === 'difficult'
      ? ' Pri horšie dostupných pozemkoch si prístupovú trasu overíme vopred, aby doprava techniky a materiálu neviazla.'
      : '';

  return {
    body: `${serviceName} ${cityLoc} realizujeme rovnakým postupom a s rovnakou technikou ako inde — technológia týchto prác sa lokalitou nemení. Čo sa mení, je dostupnosť a rýchlosť reakcie. ${reach}${access}`,
    faq: [
      {
        q: `Prídete na obhliadku ${cityLoc} aj pri menšej zákazke?`,
        a: 'Obhliadku robíme pred každou ponukou. Pri menších zákazkách vieme spojiť viacero výjazdov v rámci jednej lokality, aby sme zbytočne nenavyšovali cenu o dopravu.',
      },
    ],
  };
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
    a: 'Pred rozsiahlou rekonštrukciou odporúčame obhliadku statikom. Ak sú narušené základy, murivo je trvalo zavlhnuté a stropy vykazujú priehyby, býva ekonomickejšie dom asanovať. Po obhliadke vám otvorene povieme, ktorá cesta dáva zmysel.',
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
    a: 'Cena závisí od rozsahu a od toho, čo sa nájde po odkrytí konštrukcií — pri starších domoch sa vždy niečo nájde. Orientačné rozpätie si viete vyskúšať v kalkulačke, záväznú ponuku vypracujeme po obhliadke a s položkovým rozpisom.',
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
    default:
      // Trades whose method genuinely doesn't vary by location — see
      // SERVICE_DIFFERENTIATES. Differentiate honestly on logistics instead
      // of inventing terrain-based technical variation.
      return genericLocalAngle(serviceName, cityLoc, distanceKm, c);
  }
}
