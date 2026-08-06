import type { ServiceSlug } from './services-slugs';

export const CITIES = [
  {
    slug: 'zvolen',
    name: 'Zvolen',
    locative: 'vo Zvolene',
    accusative: 'Zvolen',
    genitive: 'Zvolena',
    kraj: 'banskobystricky',
    surrounding: ['Sliač', 'Kováčová', 'Lieskovec', 'Očová', 'Budča'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Naša centrála. Zvolenská kotlina má stabilné podložie a dobrý prístup k inžinierskym sieťam — technika aj tímy sídlia priamo tu.',
    metaDescription:
      'Stavebná firma so sídlom vo Zvolene. Staviame rodinné domy na kľúč, realizujeme hrubé stavby, rekonštrukcie, fasády a kompletné stavebné práce.',
    intro: [
      'Zvolen a jeho priľahlé obce sú domovským regiónom našej firmy. Zvolenská kotlina poskytuje vo väčšine prípadov priaznivé podmienky na zakladanie stavieb, so stabilným podložím a dobrým prístupom k inžinierskym sieťam. Keďže naša centrála aj technika sídlia priamo v tomto meste, vieme zabezpečiť pružnú logistiku, rýchly presun mechanizácie a zásobovanie materiálom bez zbytočných dopravných nákladov.',
      'Zameriavame sa tu na výstavbu rodinných domov na kľúč, od nízkoenergetických bungalovov v novovznikajúcich štvrtiach až po poschodové domy v zastavaných oblastiach. Rovnako aktívni sme aj v oblasti rekonštrukcií. Staršia zástavba v okolí Zvolena, typická pre obce od Sliača až po Očovú, si často žiada statické posúdenie pred zásahom do konštrukcií. Realizujeme výmeny striech, zateplenie fasád, stuženie starého muriva vencami a kompletnú výmenu rozvodov.',
      'S miestnymi úradmi vo Zvolene aj na menších stavebných úradoch v okolí komunikujeme pravidelne. Poznáme územné plány, obmedzenia i špecifiká pamiatkových zón, ak sa stavba nachádza v historicky citlivejšej lokalite. Našou prioritou je odbremeniť klienta od starostí s organizáciou stavby.',
    ],
    priorityServices: [
      'rodinne-domy',
      'murarske-prace',
      'fasady',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Ako rýchlo viete začať stavať vo Zvolene?',
        a: 'Keďže vo Zvolene sídlime, vieme kapacity mobilizovať pružne. Po podpise zmluvy a dodaní projektu zvyčajne začíname do niekoľkých týždňov.',
      },
      {
        q: 'Realizujete vo Zvolene aj menšie prerábky?',
        a: 'Našou špecializáciou sú komplexné rekonštrukcie a stavby na kľúč. Pre menšie úpravy nás kontaktujte a posúdime naše aktuálne kapacity.',
      },
    ],
    distanceFromOffice: 0,
  },
  {
    slug: 'banska-bystrica',
    name: 'Banská Bystrica',
    locative: 'v Banskej Bystrici',
    accusative: 'Banskú Bystricu',
    genitive: 'Banskej Bystrice',
    kraj: 'banskobystricky',
    surrounding: ['Badín', 'Selce', 'Slovenská Ľupča', 'Harmanec', 'Tajov', 'Kynceľová'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Členitý a svahovitý terén, ktorý si vyžaduje špecifický prístup k zakladaniu — mikropiloty, oporné múry a zosilnené základové pásy.',
    metaDescription:
      'Stavebná firma pre Banskú Bystricu a okolie. Zakladanie stavieb na svahovitých pozemkoch, výstavba domov na kľúč, rekonštrukcie a zateplenie fasád.',
    intro: [
      'Banská Bystrica a jej okolie, zasadené v horskom prostredí, sa vyznačujú členitým a svahovitým terénom, ktorý si už pri prvotných fázach projektu vyžaduje špecifický prístup k zakladaniu stavieb a oporným systémom. Pri výstavbe rodinných domov v podhorských obciach narážame na tvrdé skalnaté podložie alebo naopak na ílovité zosuvné pásma, ktoré podmieňujú realizáciu železobetónových pilotov, mikropilotov či zložitejších základových pásov.',
      'Realizujeme tu murované novostavby na strmých svahoch, ktoré si vyžadujú oporné múry, aj rekonštrukcie starších rodinných domov s pôvodnou kamennou podmurovkou, ktoré sú pre banskobystrický vidiek typické. Poznáme nielen lokálne geologické špecifiká, ale aj priebeh povoľovacieho procesu na stavebnom úrade v Banskej Bystrici a okolitých obciach.',
      'Starší bytový fond v širšom centre, vrátane tehlových domov a vilových štvrtí, je ideálnym priestorom pre kompletné rekonštrukcie, prístavby a nadstavby. Pri modernizácii takýchto objektov kladieme dôraz na diagnostiku vlhkosti muriva, sanáciu trhlín a zateplenie s použitím priedušných materiálov, aby si dom zachoval zdravú vnútornú klímu.',
    ],
    priorityServices: [
      'zakladanie-stavieb',
      'rodinne-domy',
      'fasady',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Ako riešite stavbu na svahovitom pozemku v okolí Banskej Bystrice?',
        a: 'Náročný terén si vyžaduje geologické posúdenie. Využívame oporné múry, železobetónové piloty a zosilnené základové pásy navrhnuté statikom.',
      },
      {
        q: 'Pomáhate so stavebným povolením na bystrickom stavebnom úrade?',
        a: 'Áno, klientom poskytujeme súčinnosť pri vybavovaní administratívy vrátane podkladov pre napojenie na inžinierske siete.',
      },
    ],
    distanceFromOffice: 20,
  },
  {
    slug: 'detva',
    name: 'Detva',
    locative: 'v Detve',
    accusative: 'Detvu',
    genitive: 'Detvy',
    kraj: 'banskobystricky',
    surrounding: ['Hriňová', 'Kriváň', 'Vígľaš', 'Stožok', 'Dúbravy'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Podpoľanie s rozptýleným osídlením na lazoch. Úzke prístupové cesty, tvrdšie podložie a dôraz na kvalitné zateplenie.',
    metaDescription:
      'Stavebná firma pre Detvu a Podpoľanie. Výstavba domov na kľúč, hrubé stavby, zateplenie a rekonštrukcie prispôsobené podhorským podmienkam.',
    intro: [
      'Podpoliansky región a okolie mesta Detva sa vyznačujú drsnejšou prírodou a typickým rozptýleným osídlením na lazoch, čo prináša rad logistických aj technologických výziev. Stretávame sa tu s úzkymi a horšie zjazdnými prístupovými cestami pre ťažkú techniku a s tvrdším skalnatým podložím, ktoré si občas vyžaduje špeciálne stroje už pri výkopových prácach.',
      'Pri realizácii stavieb v okolí Detvy kladieme dôraz na kvalitnú tepelnú izoláciu. Podpoľanie je známe dlhšími a chladnejšími zimami s množstvom zrážok, preto sú zateplenie, správna hydroizolácia a odolná strešná krytina základom pre bezproblémové užívanie domu. Naše realizácie zahŕňajú murované domy, nízkoenergetické stavby aj rekonštrukcie pôvodných gazdovstiev a hospodárskych budov, ktoré si noví majitelia menia na trvalé bývanie.',
      'Či už plánujete výstavbu na rovine v Kriváni, alebo náročnejšiu stavbu vo svahu v Hriňovej, prispôsobíme harmonogram tak, aby sme mokré procesy stihli zrealizovať pred príchodom silných mrazov.',
    ],
    priorityServices: [
      'murarske-prace',
      'rodinne-domy',
      'tesarske-prace',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Je problémom stavba na lazoch alebo ťažšie dostupnom mieste v okolí Detvy?',
        a: 'Disponujeme technikou, ktorá zvládne náročnejší terén. Vždy však robíme obhliadku prístupovej cesty pre domiešavače a nákladné vozidlá, aby sme predišli prekvapeniam.',
      },
      {
        q: 'Odporúčate v tomto regióne špeciálne zateplenie?',
        a: 'Vzhľadom na podhorské prostredie odporúčame väčšie hrúbky izolantov a zateplené základové dosky, čím sa minimalizujú tepelné mosty a klesnú náklady na kúrenie.',
      },
    ],
    distanceFromOffice: 25,
  },
  {
    slug: 'hrinova',
    name: 'Hriňová',
    locative: 'v Hriňovej',
    accusative: 'Hriňovú',
    genitive: 'Hriňovej',
    kraj: 'banskobystricky',
    surrounding: ['Detva', 'Látky', 'Klokoč', 'Stožok', 'Vígľašská Huta-Kalinka'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Laznícke osídlenie v 625 m n. m. Svahovité pozemky, plytké skalnaté podložie a kratšia stavebná sezóna.',
    metaDescription:
      'Stavebná firma pre Hriňovú a okolie Podpoľania. Rekonštrukcie rodinných domov, hrubé stavby, zateplenie a stavby na svahovitých lazníckych pozemkoch.',
    intro: [
      'Hriňová leží v srdci Podpoľania, na rozhraní Slovenského rudohoria a Veporských vrchov, a patrí k obciam s najrozsiahlejším lazníckym osídlením na Slovensku. Zástavba je roztiahnutá do kopcov v podobe desiatok osád, čo z každej stavby robí najprv logistickú úlohu a až potom stavebnú. Prístupové cesty k mnohým pozemkom sú úzke a strmé, takže dopravu betónu a materiálu plánujeme vopred a vždy si trasu preveríme obhliadkou.',
      'Pozemky sú tu prevažne svahovité, s plytkým skalnatým podložím alebo naopak s ílovitými vrstvami, ktoré potrebujú odvodnenie. Zakladanie preto riešime kaskádovými základmi, opornými múrmi a dôkladnou drenážou. Nadmorská výška a poloha v kotline znamenajú dlhšiu zimu a kratšiu stavebnú sezónu, preto mokré procesy — betonáže, omietky, potery — plánujeme do teplých mesiacov.',
      'Značná časť domov v Hriňovej a okolitých osadách pochádza zo staršieho obdobia a kombinuje kamennú podmurovku s dreveným alebo tehlovým nadstavaním. Pri ich obnove sa najčastejšie stretávame so vzlínajúcou vlhkosťou, poddimenzovanými krovmi a chýbajúcou izoláciou. Riešime to sanáciou muriva, výmenou strešnej konštrukcie a zateplením, ktoré zodpovedá tunajšej klíme.',
    ],
    priorityServices: [
      'rodinne-domy',
      'zakladanie-stavieb',
      'tesarske-prace',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Dostanete techniku aj na laznícke pozemky nad Hriňovou?',
        a: 'Vo väčšine prípadov áno, no prístupovú cestu si vždy najprv prejdeme osobne. Pri úzkych alebo strmých úsekoch volíme menšiu mechanizáciu a prispôsobíme spôsob dopravy betónu.',
      },
      {
        q: 'Oplatí sa starý laznícky dom rekonštruovať, alebo stavať nanovo?',
        a: 'Závisí to od stavu podmurovky a krovu. Po obhliadke vám otvorene povieme, či je sanácia zmysluplná, alebo bude výhodnejšia novostavba — a orientačne oceníme obe možnosti.',
      },
    ],
    distanceFromOffice: 35,
  },
  {
    slug: 'krupina',
    name: 'Krupina',
    locative: 'v Krupine',
    accusative: 'Krupinu',
    genitive: 'Krupiny',
    kraj: 'banskobystricky',
    surrounding: ['Bzovík', 'Dudince', 'Hontianske Nemce', 'Sebechleby', 'Devičie'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Krupinská planina a Hont. Nová zástavba popri obnove starých hospodárstiev a vinohradníckych domov.',
    metaDescription:
      'Stavebná firma pre Krupinu a región Hont. Výstavba rodinných domov, obnova hospodárskych usadlostí, napojenie na siete a autonómne riešenia.',
    intro: [
      'Krupinská planina a širší región Hontu majú pokojný, vidiecko-poľnohospodársky ráz. Táto krajina láka mladé rodiny hľadajúce únik z mesta, ale aj majiteľov, ktorí tu obnovujú objekty pre oddych či agroturistiku. Výstavba tu kombinuje novú zástavbu v okolí Krupiny s revitalizáciou starých hospodárstiev a vinohradníckych domov, ktoré sú pre región typické.',
      'Medzi najväčšie výzvy na Honte patrí obmedzená verejná infraštruktúra na odľahlejších pozemkoch. Riešime kompletné napojenie na inžinierske siete, a ak to nie je možné, koordinujeme autonómne riešenia pre dodávku pitnej vody i likvidáciu odpadových vôd vrátane osadenia čističiek a žúmp.',
      'Sústredíme sa na výstavbu stredne veľkých rodinných domov z pálenej tehly a pórobetónu, ktoré zapadajú do rázu krupinskej krajiny. K obnove starších objektov pristupujeme opatrne — posudzujeme vlhkosť stien, navrhujeme sanačnú omietku a dbáme na zachovanie tvaroslovia pôvodných fasád.',
    ],
    priorityServices: [
      'murarske-prace',
      'rodinne-domy',
      'omietky',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Zabezpečujete pre lokality okolo Krupiny aj studne alebo žumpy?',
        a: 'Samotné vŕtanie studní nerobíme, ale spolupracujeme so špecialistami. Dodávku a osadenie žumpy či čističky odpadových vôd štandardne zastrešujeme.',
      },
      {
        q: 'Staviate aj víkendové chalupy?',
        a: 'Áno. K chalupám a víkendovým sídlam pristupujeme s rovnakou technologickou disciplínou ako k celoročne obývaným rodinným domom.',
      },
    ],
    distanceFromOffice: 30,
  },
  {
    slug: 'banska-stiavnica',
    name: 'Banská Štiavnica',
    locative: 'v Banskej Štiavnici',
    accusative: 'Banskú Štiavnicu',
    genitive: 'Banskej Štiavnice',
    kraj: 'banskobystricky',
    surrounding: ['Štiavnické Bane', 'Banská Belá', 'Svätý Anton', 'Ilija', 'Podhorie'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Pamiatková rezervácia so strmým terénom a tvrdým podložím. Postup pri obnove konzultujeme s pamiatkovým úradom.',
    metaDescription:
      'Stavebné práce a rekonštrukcie v Banskej Štiavnici. Obnova baníckych domov v pamiatkovej rezervácii, zakladanie na strmých pozemkoch, oporné múry.',
    intro: [
      'Banská Štiavnica patrí k najkrajším, no z pohľadu stavebnej firmy k najnáročnejším lokalitám na Slovensku. Toto banské mesto a priľahlé obce sa vyznačujú kopcovitým terénom, úzkymi kľukatými uličkami a tvrdým skalnatým podložím. Doprava materiálu k stavenisku a nasadenie techniky sa tu musia plánovať s veľkou presnosťou.',
      'Ďalším faktorom je historický ráz mesta a jeho postavenie pamiatkovej rezervácie zapísanej v zozname UNESCO. Staré banícke domy, ktoré klienti kupujú za účelom obnovy, vyžadujú rešpekt k pamiatkovým podmienkam. Spolupracujeme s orgánmi pamiatkovej starostlivosti a využívame tradičné vápenné omietky, drevené prvky a pôvodné spôsoby pokrývania striech, aby si budova zachovala svoju hodnotu, no získala moderný komfort vnútri.',
      'Nové stavby v okolitých obciach ako Štiavnické Bane často bojujú s prevýšeniami na pozemku, ktoré je nutné prekonávať terasovaním, gabiónovými stenami a kaskádovými základmi.',
    ],
    priorityServices: [
      'rodinne-domy',
      'zakladanie-stavieb',
      'omietky',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Máte skúsenosti s prácou v pamiatkovej rezervácii v Banskej Štiavnici?',
        a: 'Pri realizácii v centre rešpektujeme podmienky pamiatkovej starostlivosti. Pracujeme s klasickými materiálmi a zachovávame pôvodný vizuál objektu.',
      },
      {
        q: 'Viete zakladať stavbu na strmom pozemku v štiavnických vrchoch?',
        a: 'Zakladanie v strmom skalnatom teréne robíme pravidelne. Využívame debniace systémy a železobetónové konštrukcie navrhnuté a overené statikom.',
      },
    ],
    distanceFromOffice: 35,
  },
  {
    slug: 'ziar-nad-hronom',
    name: 'Žiar nad Hronom',
    locative: 'v Žiari nad Hronom',
    accusative: 'Žiar nad Hronom',
    genitive: 'Žiaru nad Hronom',
    kraj: 'banskobystricky',
    surrounding: ['Lutila', 'Lovča', 'Trnavá Hora', 'Hliník nad Hronom', 'Vyhne'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Rovinatý a dobre prístupný terén, ktorý umožňuje rýchlejšiu a cenovo dostupnejšiu výstavbu než okolité kopcovité regióny.',
    metaDescription:
      'Stavebná firma pre Žiar nad Hronom a okolie. Staviame rodinné domy na kľúč na rovinatých pozemkoch, realizujeme zateplenie a rekonštrukcie.',
    intro: [
      'Žiarska kotlina je rozvíjajúcou sa oblasťou so silným priemyselným zázemím a záujmom o individuálnu výstavbu. V okolí Žiaru nad Hronom, v obciach ako Lutila či Lovča, vznikajú nové štvrte rodinných domov. Terén je tu pomerne prístupný a rovinatý, čo umožňuje efektívnu a cenovo prístupnejšiu výstavbu než v okolitých kopcovitých regiónoch.',
      'Zabezpečujeme kompletný stavebný servis — od výkopu základových pásov cez murárske a betonárske práce až po zhotovenie fasády a odovzdanie domu na kľúč. Výhodou regiónu je dostupnosť po rýchlostnej ceste R1 zo Zvolena, vďaka ktorej vieme obslúžiť nielen Žiar, ale aj vzdialenejšie obce ako Vyhne či Hliník nad Hronom.',
      'Významný podiel prác tu tvoria rekonštrukcie a zatepľovanie. Modernizujeme staršie domy, meníme zatepľovacie systémy a zlepšujeme energetickú bilanciu budov, čo je pri aktuálnych cenách energií pre mnohé domácnosti zásadná investícia.',
    ],
    priorityServices: [
      'rodinne-domy',
      'fasady',
      'murarske-prace',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Dodávate materiál lokálne zo Žiaru a okolia?',
        a: 'Spolupracujeme s regionálnymi dodávateľmi stavebnín na strednom Slovensku, vďaka čomu vieme znížiť dopravné náklady a zrýchliť logistiku.',
      },
      {
        q: 'Staviate v žiarskom okrese len z klasickej tehly alebo aj z iných materiálov?',
        a: 'Špecializujeme sa na murované stavby — z pálenej tehly aj z presného pórobetónu. Oba materiály tu majú tradíciu, dlhú životnosť a dobrú akustiku.',
      },
    ],
    distanceFromOffice: 40,
  },
  {
    slug: 'brezno',
    name: 'Brezno',
    locative: 'v Brezne',
    accusative: 'Brezno',
    genitive: 'Brezna',
    kraj: 'banskobystricky',
    surrounding: ['Valaská', 'Podbrezová', 'Čierny Balog', 'Polomka', 'Beňuš'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Horehronie s tuhšími zimami. Krov dimenzujeme na vysoké snehové zaťaženie a mokré procesy plánujeme do teplých mesiacov.',
    metaDescription:
      'Stavebná firma pre Brezno a Horehronie. Staviame domy dimenzované na snehové zaťaženie, so zateplením prispôsobeným dlhej horskej zime.',
    intro: [
      'Región Horehronia s centrom v Brezne má svoje klimatické špecifiká. Dlhšie zimy bohaté na zrážky vyžadujú pri stavbe domu iný prístup než v teplejších južných kotlinách. Voľba tepelnej izolácie nie je formalitou, ale nutnosťou pre zamedzenie energetickým stratám. Dimenzovanie striech na vysoké snehové zaťaženie a odolná strešná krytina hrajú v tomto podhorskom prostredí zásadnú rolu.',
      'Zameriavame sa tu na domy, ktoré odolajú drsnejšiemu počasiu pod Nízkymi Tatrami. Pri realizácii v obciach ako Čierny Balog či Polomka sa stretávame so svahovitým terénom, ktorý riešime odvodnením pozemku, opornými konštrukciami a izoláciou proti zemnej vlhkosti a radónu.',
      'Ďalším špecifikom Horehronia je kratšia stavebná sezóna. Výkopové práce, betonáže základov a hrubé stavby plánujeme do teplých mesiacov tak, aby sme sa vyhli znehodnoteniu mokrých procesov rannými mrazmi.',
    ],
    priorityServices: [
      'fasady',
      'tesarske-prace',
      'rodinne-domy',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Ako sa prispôsobujete zimnej stavebnej sezóne na Horehroní?',
        a: 'Do harmonogramu zapracúvame technologické prestávky. Betónovanie a mokré procesy na hrubej stavbe plánujeme tak, aby sme ich stihli pred príchodom mrazov.',
      },
      {
        q: 'Navrhujete aj zatepľovacie systémy odolné pre túto oblasť?',
        a: 'Áno. Navrhujeme väčšie hrúbky tepelných izolantov, okná s trojsklom a fasádne omietky so zvýšenou odolnosťou proti mrazu a riasam.',
      },
    ],
    distanceFromOffice: 65,
  },
  {
    slug: 'lucenec',
    name: 'Lučenec',
    locative: 'v Lučenci',
    accusative: 'Lučenec',
    genitive: 'Lučenca',
    kraj: 'banskobystricky',
    surrounding: ['Vidiná', 'Halič', 'Tomášovce', 'Lovinobaňa', 'Rapovce'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Rovinatý terén a ílovité podložie. Zakladanie je jednoduchšie, riešime skôr letné prehrievanie a odizolovanie starších domov.',
    metaDescription:
      'Stavebná firma pre Lučenec a Novohrad. Staviame bungalovy na rovinatých pozemkoch, obnovujeme staršie tehlové domy, realizujeme fasády a základy.',
    intro: [
      'Juhoslovenská kotlina, v ktorej leží Lučenec, poskytuje priaznivé podmienky pre výstavbu rodinných domov. Terén je tu zväčša rovinatý a podložie stabilné, čo uľahčuje a zlacňuje zakladanie stavieb v porovnaní s horskými oblasťami. Základové dosky aj hrubé stavby preto vieme realizovať v kratšom čase pri dodržaní všetkých technologických postupov.',
      'Bytová otázka v Lučenci a okolitých obciach ako Vidiná či Halič sa rieši nielen novou výstavbou, ale vo veľkej miere aj obnovou starších objektov. Juh Slovenska je plný tradičných vidieckych tehlových domov a usadlostí. Zameriavame sa na ich rekonštrukcie — od odizolovania základov, ktoré býva pri starších stavbách častým problémom, cez sanáciu krovov až po fasádne úpravy.',
      'Pri novostavbách tu najčastejšie staviame priestranné murované bungalovy, ktorým rovinaté pozemky svedčia. Keďže v Lučenci bývajú letá teplé a suché, klientom radíme aj v oblasti tieniacich systémov a skladby obvodového plášťa pre zamedzenie prehrievania interiéru.',
    ],
    priorityServices: [
      'rodinne-domy',
      'zakladanie-stavieb',
      'fasady',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Aké typy domov najčastejšie staviate v Lučenci?',
        a: 'Najčastejšie murované bungalovy, ktorým rovinatý terén regiónu svedčí a ktoré umožňujú dobré prepojenie interiéru so záhradou.',
      },
      {
        q: 'Viete zabezpečiť odstránenie a likvidáciu starej stavby?',
        a: 'Áno, v rámci kompletnej dodávky zabezpečíme aj búracie práce starého domu či hospodárskej budovy a legálnu likvidáciu odpadu na skládke.',
      },
    ],
    distanceFromOffice: 55,
  },
  {
    slug: 'poltar',
    name: 'Poltár',
    locative: 'v Poltári',
    accusative: 'Poltár',
    genitive: 'Poltára',
    kraj: 'banskobystricky',
    surrounding: ['Kokava nad Rimavicou', 'Utekáč', 'Kalinovo', 'Málinec', 'Zlatno'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Rozhranie Ipeľskej pahorkatiny a podhoria. Na odľahlejších pozemkoch vopred preverujeme možnosti napojenia na siete.',
    metaDescription:
      'Stavebná firma pre Poltár a okolie. Výstavba rodinných domov, prístavby a rekonštrukcie v obciach s obmedzenou infraštruktúrou.',
    intro: [
      'Okres Poltár leží na rozhraní Ipeľskej pahorkatiny a výbežkov Slovenského rudohoria. Južná časť okolo Kalinova je mierne zvlnená a dobre prístupná, zatiaľ čo severné obce ako Kokava nad Rimavicou, Utekáč či Málinec sa dvíhajú do podhoria a stavebné podmienky sa tam výrazne menia — strmšie pozemky, dlhšia zima, kratšia sezóna pre mokré procesy.',
      'Región má priemyselnú minulosť spätú so sklárstvom, čo sa odráža aj na zástavbe — v Utekáči a okolí nájdeme robotnícke domy a bytové objekty z obdobia fungovania skláreň, ktoré dnes prechádzajú obnovou. Pri ich rekonštrukcii sa najčastejšie stretávame s chýbajúcou hydroizoláciou spodnej stavby a s krovmi, ktoré potrebujú výmenu.',
      'Na odľahlejších pozemkoch býva verejná infraštruktúra redšia. Pred začiatkom prác preto vždy preverujeme možnosti napojenia na vodu, kanalizáciu a elektrinu, a ak napojenie nie je dostupné, koordinujeme autonómne riešenia. Prístupové cesty do podhorských obcí si prechádzame vopred, aby doprava betónu a materiálu neviazla.',
    ],
    priorityServices: [
      'rodinne-domy',
      'murarske-prace',
      'zakladanie-stavieb',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Cestujete na stavby aj do najodľahlejších obcí poltárskeho okresu?',
        a: 'Pokrývame celý okres vrátane podhorských obcí. Logistiku plánujeme vopred a prístupovú trasu si preveríme obhliadkou.',
      },
      {
        q: 'Máte na stavbu vlastných zamestnancov alebo si najímate partie?',
        a: 'Na hrubú stavbu máme jadro vlastných remeselníkov. Pri špeciálnych profesiách, ako je voda či elektrina, spolupracujeme s overenými špecialistami.',
      },
    ],
    distanceFromOffice: 70,
  },
  {
    slug: 'rimavska-sobota',
    name: 'Rimavská Sobota',
    locative: 'v Rimavskej Sobote',
    accusative: 'Rimavskú Sobotu',
    genitive: 'Rimavskej Soboty',
    kraj: 'banskobystricky',
    surrounding: ['Jesenské', 'Ožďany', 'Hnúšťa', 'Tisovec', 'Bátka'],
        /** One-line summary for the /lokality hub cards. */
    shortIntro:
      'Rimavská kotlina, jedna z najteplejších oblastí Slovenska. Pri novostavbách riešime tienenie, pri obnove gemerské „kocky“.',
    metaDescription:
      'Stavebná firma pre Rimavskú Sobotu a Gemer. Staviame bungalovy v Rimavskej kotline, rekonštruujeme staršie domy a realizujeme zateplenie fasád.',
    intro: [
      'Rimavská Sobota leží v Rimavskej kotline, jednej z najteplejších a najsuchších oblastí Slovenska. Rovinaté pozemky s dobrou únosnosťou uľahčujú zakladanie a robia výstavbu rýchlejšou a lacnejšou než v horských okresoch. Extrémne letné teploty však znamenajú, že skladbu obvodového plášťa a tienenie riešime už pri návrhu — inak sa novostavba v júli prehrieva.',
      'Na sever od okresného mesta, smerom na Hnúšťu a Tisovec, sa krajina dvíha do Slovenského rudohoria a podmienky sa menia. Tam už rátame so svahovitými pozemkami, náročnejším prístupom a inou dimenziou snehového zaťaženia strechy než v nížinnej časti okresu.',
      'Značnú časť práce tu tvorí obnova staršieho bytového fondu. Gemerské domy z druhej polovice 20. storočia — takzvané kocky — trpia zanedbanou údržbou, chýbajúcou izoláciou a poddimenzovanými krovmi. Ich rekonštrukcia u nás začína statickým posúdením a pokračuje výmenou strešnej konštrukcie, zateplením a novými vnútornými omietkami.',
    ],
    priorityServices: [
      'rodinne-domy',
      'fasady',
      'tesarske-prace',
    ] as const satisfies readonly ServiceSlug[],
    faq: [
      {
        q: 'Riešite pri novostavbách v Rimavskej Sobote aj ochranu pred letným prehrievaním?',
        a: 'Áno. V Rimavskej kotline patria letné teploty k najvyšším na Slovensku, preto so skladbou obvodového plášťa a s prípravou pre tienenie počítame už pri hrubej stavbe.',
      },
      {
        q: 'Prerábate aj staršie štvorcové domy so zlým krovom?',
        a: 'Takzvané kocky rekonštruujeme často. Proces zahŕňa statické posúdenie, výmenu strešnej konštrukcie, zateplenie i nové vnútorné omietky.',
      },
    ],
    distanceFromOffice: 85,
  },
] as const;

export const KRAJE = [{ slug: 'banskobystricky', name: 'Banskobystrický kraj' }] as const;

export type CitySlug = (typeof CITIES)[number]['slug'];
export type KrajSlug = (typeof KRAJE)[number]['slug'];

export type City = {
  slug: string;
  name: string;
  locative: string;
  accusative: string;
  genitive: string;
  kraj: string;
  surrounding: readonly string[];
  metaDescription: string;
  /** One-line summary for the /lokality hub cards. */
  shortIntro: string;
  intro: readonly string[];
  priorityServices: readonly ServiceSlug[];
  faq: readonly { q: string; a: string }[];
  distanceFromOffice: number;
};

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** Capitalises the first letter — for sentence-initial use of `locative`. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
