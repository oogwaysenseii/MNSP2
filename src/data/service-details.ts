/**
 * Long-form content for the /sluzby/[service] pages.
 *
 * Moved out of the page file — this is content, not routing.
 *
 * TODO — verify the `equipment` lists describe machinery you own or hire
 * regularly. Brand names (Peri/Doka, Hilti/Bosch) and tower/portal cranes
 * were removed because they could not be substantiated.
 */

export type ServiceDetail = {
  longDescription: string;
  partnerText: string;
  features: string[];
  materials: string[];
  equipment: string[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'rezidencne-budovy': {
    longDescription: 'Komplexná výstavba bytových domov a polyfunkčných objektov. Spoliehame sa na naše odborné skúsenosti, moderné inovatívne prístupy a bezchybnú koordináciu, čím zabezpečujeme vysokú kvalitu prevedenia a komfort budúcich obyvateľov.',
    partnerText: 'Bytové a polyfunkčné domy realizujeme pre investorov v Banskobystrickom kraji a okolí. Kladieme dôraz na komfort budúcich obyvateľov, estetiku a dodržanie technických noriem.',
    features: ['Architektonická a projektová podpora', 'Plánovanie a optimalizácia pre rozsiahlu výstavbu', 'Výstavba skeletu a hrubej stavby bytových domov', 'Kompletné vnútorné inštalácie a rozvody', 'Dokončovacie práce a sadové úpravy okolia'],
    materials: ['Vysokopevnostné betóny a armatúry', 'Certifikované tepelnoizolačné systémy', 'Fasádne materiály a obklady'],
    equipment: ['Zdvíhacia a manipulačná technika', 'Domiešavače a čerpadlá betónu', 'Nivelačné a zameriavacie systémy']
  },
  'komercna-vystavba': {
    longDescription: 'Výstavba administratívnych, obchodných a komerčných budov. Zabezpečujeme efektívne technologické postupy, ktoré garantujú dodržanie napätých termínov a excelentný reprezentatívny vzhľad.',
    partnerText: 'Komerčné objekty realizujeme pre firmy a developerov v našom regióne. Vieme prispôsobiť harmonogram tak, aby výstavba čo najmenej zasiahla do vašej prevádzky, a koordinujeme všetky profesie na stavenisku.',
    features: ['Koordinácia subdodávok na rozsiahlom stavenisku', 'Realizácia flexibilných a presklenných konštrukcií', 'Dodávka pokročilej vzduchotechniky a klimatizácie', 'Špeciálne interiérové fit-out práce na mieru', 'Striktná kontrola bezpečnosti práce a harmonogramu'],
    materials: ['Veľkoformátové sklenené panely a hliníkové profily', 'Špeciálne protipožiarne konštrukcie', 'Odolné záťažové interiérové materiály'],
    equipment: ['Manipulačná technika a zdvíhacie plošiny', 'Moderné sklenárske zdvíhacie plošiny', 'Vysokovýkonná transportná technika']
  },
  'priemyselne-objekty': {
    longDescription: 'Výstavba moderných hál, logistických centier a výrobných závodov. Využívame optimalizované inžinierske a logistické postupy na maximálne skrátenie doby výstavby a garanciu požadovanej nosnosti a prevádzkyschopnosti.',
    partnerText: 'Priemyselné objekty realizujeme so zameraním na základy, monolitické konštrukcie a podlahy — teda na tie časti haly, kde sa najviac rozhoduje o životnosti stavby. Rozsah zákazky vždy vieme dopredu posúdiť podľa našich kapacít.',
    features: ['Zhotovenie pilót a veľkorozmerných základov', 'Montáž oceľových a betónových skeletov', 'Budovanie vysoko zaťažiteľných pancierových podláh', 'Opláštenie halových systémov sendvičovými panelmi', 'Príprava konštrukcií pre montáž mostových žeriavov'],
    materials: ['Vysoko odolné priemyselné zmesi a vsypy', 'Certifikované sendvičové termo panely', 'Mohutné montované profily s antikoróznou úpravou'],
    equipment: ['Technika pre vŕtané pilóty a špeciálne zakladanie', 'Vysokozdvižné montážne plošiny', 'Laserové nivelačné stroje pre priemyselné podlahy']
  },
  'obcianske-stavby': {
    longDescription: 'Výstavba škôl, nemocníc a verejných priestranstiev s maximálnym ohľadom na celospoločenský úžitok, dlhú životnosť a prísne prevádzkové, hygienické i protipožiarne smernice.',
    partnerText: 'Pre obce a verejný sektor sme realizovali napríklad zariadenia sociálnych služieb a rekonštrukcie verejných budov. Poznáme nároky na bezbariérovosť, požiarnu bezpečnosť aj hygienické štandardy a na dokladovanie prác pri verejnom obstarávaní.',
    features: ['Komplexné spracovanie technicko-realizačnej dokumentácie', 'Aplikácia nadštandardných protipožiarnych opatrení', 'Zabezpečenie hygienických a akustických štandardov', 'Bezbariérové riešenia pre všetky komunikácie', 'Príprava auditov a bezchybné odovzdanie pre verejnú prevádzku'],
    materials: ['Ekologicky a zdravotne nezávadné stavebné zmesi', 'Akustické a protipožiarne sadrokartonové systémy', 'Špeciálne bezpečnostné zasklenia'],
    equipment: ['Presná meracia technika s certifikáciou', 'Manipulačná a čistiaca technika s nízkou hlučnosťou', 'Lokálne zabezpečovacie zariadenia']
  },
  'zakladanie-stavieb': {
    longDescription: 'Realizujeme zakladanie stavieb, základové pásy a základové dosky pre rodinné domy, bytové objekty aj komerčné budovy. Zabezpečujeme kompletné zemné práce, prípravu podložia, armovanie a betonáž základových konštrukcií s dôrazom na statickú bezpečnosť a dlhodobú životnosť stavby.',
    partnerText: 'Zakladanie stavieb patrí medzi najdôležitejšie fázy výstavby. Využívame vlastnú techniku, skúsený tím a overené technologické postupy, aby sme zabezpečili presnú realizáciu základov aj v náročných geologických podmienkach.',
    features: ['Geodetické vytýčenie a analýza podložia', 'Výkopy a úprava základovej škáry', 'Uloženie uzemnenia a prestupov inžinierskych sietí', 'Precízne zadebnenie a armovanie pásov a pätiek', 'Betonáž dosiek s následným riadnym ošetrovaním betónu'],
    materials: ['Vysoko trvanlivé betónové zmesi (vodostavebné betóny)', 'Odolné profilové oceľové armatúry', 'Hydroizolačné fólie a pásy'],
    equipment: ['Geodetické stanice a digitálne teodolity', 'Hĺbkové vibrátory na zhutnenie betónu', 'Bagre so špeciálnymi výkopovými lyžicami']
  },
  'monoliticke-konstrukcie': {
    longDescription: 'Realizujeme monolitické železobetónové konštrukcie, stropy, schodiská, oporné múry a ďalšie nosné prvky stavieb. Zabezpečujeme kompletnú realizáciu od debnenia a armovania až po betonáž a odborné ošetrovanie betónu s dôrazom na pevnosť, životnosť a presnosť prevedenia.',
    partnerText: 'Monolitické konštrukcie realizujeme pre rodinné domy, bytové budovy, komerčné objekty aj priemyselné stavby. Vďaka skúsenostiam a modernému vybaveniu dokážeme zabezpečiť kvalitné riešenia aj pri technicky náročných projektoch.',
    features: ['Návrh a rozkreslenie plánu debnenia (skladby)', 'Presné zostavenie certifikovaného systémového debnenia', 'Detailná pokládka a viazanie profilovej betonárskej výstuže', 'Plynulá betonáž s presným strojovým zhutnením', 'Profesionálne oddebnenie a následná vizuálna kontrola'],
    materials: ['Certifikované armovacie železo a sieťoviny', 'Vysoko kvalitné transportbetóny', 'Odvzdušňovacie a separačné chemické prostriedky'],
    equipment: ['Certifikované systémové debnenia', 'Výkonné stacionárne a autočerpadlá betónu', 'Výkonné plošné a ponorné vibrátory']
  },
  'murarske-prace': {
    longDescription: 'Poskytujeme profesionálne murárske práce pri výstavbe novostavieb aj rekonštrukciách. Realizujeme murovanie obvodových stien, nosných konštrukcií, priečok a technických miestností s dôrazom na statickú bezpečnosť, presnosť a energetickú efektívnosť budovy.',
    partnerText: 'Murárske práce zabezpečujeme pre súkromných investorov, developerov aj stavebné firmy. Dôraz kladieme na kvalitné materiály, precízne prevedenie a dodržiavanie technologických postupov počas celej realizácie.',
    features: ['Zakladanie prvého radu muriva nivelákom', 'Rýchle a čisté nanášanie tenkovrstvových lepidiel', 'Správne prekladanie tvaroviek pre maximálnu statiku', 'Dodatočná inštalácia potrebných nosných prekladov', 'Zameranie stien pre dodržanie ideálnej rovinnosti'],
    materials: ['Pálené brúsené tehly a pórobetónové tvárnice', 'Lepiace malty a polyuretánové murovacie peny', 'Armovacie pásy do ložnej škáry'],
    equipment: ['Presné nivelačné a laserové zameriavače', 'Špeciálne murovacie vozíky a nanášacie valce', 'Profesionálne rezačky tehál']
  },
  'tesarske-prace': {
    longDescription: 'Realizujeme tesárske práce, krovy a drevené nosné konštrukcie pre rodinné domy, bytové objekty aj komerčné stavby. Pracujeme s kvalitným konštrukčným drevom a modernými spojovacími systémami, ktoré zabezpečujú vysokú pevnosť a dlhú životnosť výslednej konštrukcie.',
    partnerText: 'Každý krov a drevenú konštrukciu realizujeme podľa projektovej dokumentácie a statických požiadaviek. Vďaka skúsenému tímu a profesionálnemu vybaveniu garantujeme presnosť, bezpečnosť a spoľahlivosť realizácie.',
    features: ['Precízne zameranie stavby a vypracovanie rezu', 'Strojové i ručné presné opracovanie masívneho reziva', 'Kompletná montáž väznicových i viazaných krovov', 'Aplikácia moderných a spriahnutých spojovacích prvkov', 'Kontrola statickej pevnosti a ošetrenie fungicídmi'],
    materials: ['Kvalitné konštrukčné drevo (KVH/BSH hranoly)', 'Vysokopevnostné skrutky a oceľové spojovníky', 'Ochranné a impregnačné nátery proti vlhkosti'],
    equipment: ['Pokosové, reťazové a kotúčové píly', 'Vysokovýkonné akumulátorové rázové uťahováky', 'Dvíhacia a transportná technika pre drevo']
  },
  'omietky': {
    longDescription: 'Realizujeme strojové a ručné omietky pre rodinné domy, bytové budovy a komerčné objekty. Kvalitne zhotovené omietky vytvárajú ideálny podklad pre ďalšie povrchové úpravy a významne ovplyvňujú vzhľad aj životnosť interiéru. Používame moderné omietkové systémy, ktoré zabezpečujú vysokú pevnosť, rovinnosť povrchov a odolnosť voči bežnému opotrebeniu.',
    partnerText: 'Omietkárske práce realizujeme s dôrazom na presnosť, kvalitu spracovania a dodržiavanie technologických postupov. Vďaka skúsenému tímu a profesionálnemu vybaveniu dokážeme zabezpečiť hladké, rovné a trvácne povrchy pripravené na maľovanie alebo ďalšie dokončovacie práce.',
    features: ['Osadenie omietnikov a presných rohovníkov', 'Strojové nanášanie optimálne rozmiešanej zmesi', 'Dôkladné stiahnutie omietky hliníkovými H-profilmi', 'Dokonalé filcovanie a finálne vyhladenie', 'Ošetrenie zrenia proti vzniku zmrašťovacích trhlín'],
    materials: ['Vápennocementové a sadrové suché zmesi', 'Sklotextilné spevňovacie sieťky do kritických rohov', 'Rohové a omietkové lišty'],
    equipment: ['Moderné automatické omietacie stroje', 'Profesionálne hladidlá, špachtle a gletovače', 'Rýchle a čisté maskovacie prostriedky']
  },
  'potery': {
    longDescription: 'Realizujeme cementové a anhydritové potery pre novostavby aj rekonštrukcie rodinných domov, bytových objektov a komerčných priestorov. Kvalitný poter vytvára dokonale rovný podklad pre podlahové krytiny a systémy podlahového vykurovania. Pri realizácii využívame moderné technológie, ktoré zabezpečujú vysokú presnosť, rýchlu aplikáciu a optimálne technické vlastnosti výslednej podlahy.',
    partnerText: 'Podlahové potery realizujeme efektívne, presne a v súlade s najvyššími stavebnými štandardmi. Vďaka modernému vybaveniu a skúsenostiam dokážeme zabezpečiť kvalitný podklad pre všetky typy podlahových krytín s dôrazom na rovinnosť a dlhodobú životnosť.',
    features: ['Vyhotovenie počiatočného laserového znivelovania plochy', 'Odborné uloženie tepelnej a kročajovej izolácie', 'Rozvedenie obvodových dilatačných pásov', 'Rýchle a neprerušované strojové čerpanie zmesi', 'Mechanické stiahnutie a hladenie plochy'],
    materials: ['Samo-nivelizačné anhydritové a cementové vylievané zmesi', 'Expandovaný či extrudovaný polystyrén (EPS/XPS)', 'Flexibilné obvodové dilatačné pásky'],
    equipment: ['Mobilné silá a dopravníky zmesi', 'Rotačné nivelačné lasere a trojnožky', 'Špeciálne gletovacie lode a zhutňovacie laty']
  },
  'obkladacske-prace': {
    longDescription: 'Poskytujeme profesionálnu pokládku obkladov, dlažieb a veľkoformátových keramických materiálov v interiéri aj exteriéri. Realizujeme kúpeľne, kuchyne, terasy, schodiská aj komerčné priestory s dôrazom na presnosť detailov, estetický vzhľad a dlhodobú životnosť výsledného riešenia.',
    partnerText: 'Obkladačské práce vykonávame s maximálnou precíznosťou a dôrazom na kvalitu spracovania. Pracujeme s modernými materiálmi a technológiami, ktoré umožňujú realizáciu malých aj veľkoformátových obkladov a dlažieb podľa najvyšších štandardov.',
    features: ['Dôkladné meranie a ideálne rozvrhnutie škárorezu', 'Aplikácia profesionálnej hydroizolácie a penetrácie', 'Spracovanie a pokládka malých aj veľkých formátov', 'Použitie vyrovnávacieho systému pre nulové výškové rozdiely', 'Presné škárovanie epoxidovými či cementovými hmotami'],
    materials: ['Vysokoflexibilné lepidlá triedy C2TES1', 'Tekuté plošné hydroizolácie a rohovníky', 'Antibakteriálne škárovacie hmoty'],
    equipment: ['Vodné píly na bezchybný a bezprašný rez', 'Elektrické prisávače pre veľkoformátový gres', 'Profesionálne nivelačné klipy a lícovacie kliešte']
  },
  'fasady': {
    longDescription: 'Realizujeme zatepľovanie budov a kompletné fasádne systémy pre rodinné domy, bytové domy aj komerčné objekty. Kvalitná fasáda znižuje tepelné straty, zvyšuje energetickú efektívnosť budovy a zároveň chráni konštrukciu pred poveternostnými vplyvmi. Používame certifikované materiály a overené technologické postupy pre dlhodobú životnosť fasád.',
    partnerText: 'Fasádne práce realizujeme s dôrazom na kvalitu prevedenia, energetickú úspornosť a estetický výsledok. Vďaka skúsenostiam a profesionálnemu vybaveniu dokážeme zabezpečiť spoľahlivé riešenia pre novostavby aj rekonštrukcie všetkých typov objektov.',
    features: ['Montáž a príprava stabilného certifikovaného lešenia', 'Dôkladné nalepenie a ukotvenie izolačných dosiek', 'Precízne zapustenie rozperných kotiev a zafrézovanie', 'Vytvorenie dokonalej výstužnej vrstvy bez nerovností', 'Rovnomerné natiahnutie dekoratívnej a umývateľnej omietky'],
    materials: ['Grafitový polystyrén alebo minerálne izolačné vaty', 'Sklotextilné sieťky a vysoko priľnavé stierky', 'Nanotechnologické silikónové omietky s hydrofobizáciou'],
    equipment: ['Certifikované stavebné tŕňové a rámové lešenia', 'Odporové a termické rezačky polystyrénu', 'Výkonná miešacia technika zmesí']
  },
  'vykopove-zemne-prace': {
    longDescription: 'Poskytujeme komplexné výkopové a zemné práce pre stavebné projekty všetkých veľkostí. Realizujeme výkopy základov, inžinierskych sietí, prípojok, drenážnych systémov, terénne úpravy aj prípravu pozemkov pre výstavbu. Moderná mechanizácia nám umožňuje efektívne pracovať aj v náročných podmienkach a obmedzených priestoroch.',
    partnerText: 'Disponujeme vlastnou stavebnou technikou a skúsenými operátormi, vďaka čomu dokážeme zabezpečiť rýchlu a presnú realizáciu zemných prác. Každý projekt realizujeme s dôrazom na bezpečnosť, efektivitu a dodržanie stanovených termínov.',
    features: ['Kontrola inžinierskych sietí pred začatím zásahu', 'Objemové presuny zemín dočasné i trvalé', 'Presné a bezpečné hĺbenie inžinierskych rýh a jám', 'Profesionálna modulácia a finálne plošné urovnanie terénu', 'Certifikované a merateľné zhutnenie vzniknutého pláňa'],
    materials: ['Geotextílie, štrky a drenážne kamenivá na obsypy', 'Certifikované zeminy slúžiace ako recykláty na zásypy', 'Udržiavacie výstužné geomreže pri svahoch'],
    equipment: ['Pásové a kolesové rýpadlá rozličných tonáží', 'Nakladače a sklápače pre masívny odvoz', 'Vibračné valce a ťažké zhutňovacie dosky']
  },
  'buracie-prace': {
    longDescription: 'Vykonávame búracie práce a riadené demolácie objektov s dôrazom na bezpečnosť, efektivitu a ochranu okolitého prostredia. Zabezpečujeme kompletný proces od prípravy stavby a odpojenia inžinierskych sietí až po odvoz a ekologickú likvidáciu stavebného odpadu. Realizujeme menšie aj rozsiahle demolačné projekty.',
    partnerText: 'Búracie práce realizujeme pomocou profesionálnej techniky a overených postupov, ktoré minimalizujú riziká a zabezpečujú plynulý priebeh prác. Našim klientom poskytujeme spoľahlivé riešenia pri rekonštrukciách, asanáciách aj príprave územia pre novú výstavbu.',
    features: ['Úvodná statická prehliadka a návrh sekvencie búrania', 'Odstavenie budovy od inžinierskych sietí', 'Postupné a riadené rozoberanie s tlmením otrasov', 'Separácia železa, dreva a recyklovateľných materiálov', 'Okamžité naloženie a transfer sute na legálne skládky'],
    materials: ['Záchytné ochranné plachty pre okolité priestory', 'Systémy vodnej hmly proti prašnosti na pracovisku', 'Špeciálne bezpečnostné kotviace laná'],
    equipment: ['Hydraulické demolačné čeľuste a drviče na bagroch', 'Výkonné pneumatické perlíky a zbíjačky', 'Kompaktné nakladače sute pre ťažký odvoz']
  },
  'jadrove-vrtanie': {
    longDescription: 'Realizujeme jadrové vŕtanie diamantovými technológiami do železobetónu, betónu, tehly aj prírodného kameňa. Vytvárame presné otvory pre vzduchotechniku, rekuperáciu, elektroinštalácie, kanalizačné potrubia a technologické prestupy bez zbytočných vibrácií a poškodenia konštrukcie.',
    partnerText: 'Jadrové vŕtanie zabezpečujeme pre stavebné firmy, developerov aj súkromných investorov. Vďaka profesionálnemu vybaveniu dokážeme realizovať otvory rôznych priemerov s vysokou presnosťou a minimálnym zásahom do okolitého prostredia.',
    features: ['Skenovanie steny pre vyhnutie sa vnútorným rozvodom', 'Stabilné kotvenie vŕtacej lišty s podtlakovým rámom', 'Rýchle vŕtanie tvrdých substrátov s vodným chladením', 'Okamžité a plné odsávanie znečistenej kalovej vody', 'Kontrola statickej integrity po vyvŕtaní hlbokých dutín'],
    materials: ['Diamantové korunky rozličných priemerov', 'Chemicky šetrné chladiace emulzie s lubrikáciou', 'Odborné tlakové uzávery pre následnú montáž'],
    equipment: ['Vysokovýkonné jadrové vŕtačky so statívmi', 'Priemyselné vysávače pre masívne odsávanie vody', 'Prenosné tlakové vodné zásobníky a detektory armatúr']
  },
  'rezanie-otvorov': {
    longDescription: 'Špecializujeme sa na rezanie otvorov do betónových, železobetónových a murovaných konštrukcií. Realizujeme stavebné otvory pre okná, dvere, technologické prestupy a rekonštrukčné zásahy s dôrazom na presnosť, bezpečnosť a zachovanie statiky objektu.',
    partnerText: 'Pri rezaní otvorov využívame diamantové píly a profesionálnu techniku, ktorá umožňuje čisté a presné rezy aj v náročných podmienkach. Každý zásah realizujeme s ohľadom na bezpečnosť a technický stav konštrukcie.',
    features: ['Dôkladné vytýčenie a podpretie stropu pred oslabením steny', 'Presná kalibrácia vodiacej koľajnice diamantovej píly', 'Fázované obojstranné pílenie hrubostenných železobetónov', 'Komplexné odsatie vyprodukovaného chladiaceho kalu', 'Šetrné vybratie a odstránenie celistvého odrezaného kvádra'],
    materials: ['Profesionálne diamantové rezné disky a laná', 'Ochranné rošty a oceľové podporné bezpečnostné vzpery', 'Krycie textílie na ochranu okolitých konštrukcií'],
    equipment: ['Automatizované stenové a lanové píly na koľajniciach', 'Vysokovýkonné hydraulické napínacie stanice', 'Zdvíhacie a manipulačné prostriedky na vybratie blokov']
  }
};
