import { notFound, redirect } from 'next/navigation';
import { getServiceBySlug, SERVICES, ServiceSlug } from '@/src/data/services';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { SubServiceDetail, SubServiceKey } from '@/src/components/sections/SubServiceDetail';
import { ShieldCheck, HardHat, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return SERVICES
    .filter(s => s.slug !== 'stavba-domu-na-kluc' && s.slug !== 'rekonstrukcia-rodinneho-domu' && s.slug !== 'rodinne-domy')
    .map((service) => ({
      service: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) return {};

  return getSEOTags(
    `${service.name} | Kvalitne a profesionálne`,
    service.description
  );
}

const serviceExtraData: Record<string, {
  longDescription: string;
  partnerText: string;
  features: string[];
  materials: string[];
  equipment: string[];
}> = {
  'rezidencne-budovy': {
    longDescription: 'Komplexná výstavba bytových domov a polyfunkčných objektov. Spoliehame sa na naše odborné skúsenosti, moderné inovatívne prístupy a bezchybnú koordináciu, čím zabezpečujeme vysokú kvalitu prevedenia a komfort budúcich obyvateľov.',
    partnerText: 'Sme stabilným partnerom pre rozsiahlu rezidenčnú výstavbu. Naše kapacity nám umožňujú spoľahlivo obslúžiť investorov po celom Slovensku. Kladieme dôraz na komfort, estetiku a prísne technické normy pre moderné bývanie.',
    features: ['Architektonická a projektová podpora', 'Plánovanie a optimalizácia pre rozsiahlu výstavbu', 'Výstavba skeletu a hrubej stavby bytových domov', 'Kompletné vnútorné inštalácie a rozvody', 'Dokončovacie práce a sadové úpravy okolia'],
    materials: ['Vysokopevnostné betóny a armatúry', 'Certifikované tepelnoizolačné systémy', 'Prémiové fasádne materiály a obklady'],
    equipment: ['Vežové žeriavy a ťažká zdvíhacia technika', 'Veľkoobjemové domiešavače a čerpadlá', 'Lokalizačné a nivelačné systémy najvyššej presnosti']
  },
  'komercna-vystavba': {
    longDescription: 'Výstavba administratívnych, obchodných a komerčných budov. Zabezpečujeme efektívne technologické postupy, ktoré garantujú dodržanie napätých termínov a excelentný reprezentatívny vzhľad.',
    partnerText: 'Sme kľúčovým partnerom pre komerčnú sféru a developerov. Orientujeme sa na nadštandardnú rentabilitu projektov vďaka rýchlej a efektívnej výstavbe. Zvládame komplexné administratívne budovy a obchodné centrá so špecifickými nárokmi.',
    features: ['Koordinácia subdodávok na rozsiahlom stavenisku', 'Realizácia flexibilných a presklenných konštrukcií', 'Dodávka pokročilej vzduchotechniky a klimatizácie', 'Špeciálne interiérové fit-out práce na mieru', 'Striktná kontrola bezpečnosti práce a harmonogramu'],
    materials: ['Veľkoformátové sklenené panely a hliníkové profily', 'Špeciálne protipožiarne konštrukcie', 'Odolné záťažové interiérové materiály'],
    equipment: ['Presné manipulačné vozíky a žeriavy', 'Moderné sklenárske zdvíhacie plošiny', 'Vysokovýkonná transportná technika']
  },
  'priemyselne-objekty': {
    longDescription: 'Výstavba moderných hál, logistických centier a výrobných závodov. Využívame optimalizované inžinierske a logistické postupy na maximálne skrátenie doby výstavby a garanciu požadovanej nosnosti a prevádzkyschopnosti.',
    partnerText: 'Sme autoritou vo výstavbe priemyselných budov. Ponúkame kapacitné zabezpečenie aj pre tie najrozsiahlejšie priemyselné a logistické parky na úrovni SR. Na prvom mieste je maximálna efektivita a odolnosť stavaných objektov.',
    features: ['Zhotovenie pilót a veľkorozmerných základov', 'Montáž oceľových a betónových skeletov', 'Budovanie vysoko zaťažiteľných pancierových podláh', 'Opláštenie halových systémov sendvičovými panelmi', 'Inštalácia ťažkých manipulačných mostových žeriavov'],
    materials: ['Vysoko odolné priemyselné zmesi a vsypy', 'Certifikované sendvičové termo panely', 'Mohutné montované profily s antikoróznou úpravou'],
    equipment: ['Technika pre vŕtané pilóty a špeciálne zakladanie', 'Vysokozdvižné montážne plošiny', 'Leaserové nivelačné stroje pre priemyselné podlahy']
  },
  'obcianske-stavby': {
    longDescription: 'Výstavba škôl, nemocníc a verejných priestranstiev s maximálnym ohľadom na celospoločenský úžitok, dlhú životnosť a prísne prevádzkové, hygienické i protipožiarne smernice.',
    partnerText: 'Sme hrdým partnerom obcí a štátnej správy pri realizácii verejných stavieb. Vnímame vysokú spoločenskú zodpovednosť a nároky na bezbariérovosť, bezpečnosť a hygienické štandardy vo verejnom sektore.',
    features: ['Komplexné spracovanie technicko-realizačnej dokumentácie', 'Aplikácia nadštandardných protipožiarnych opatrení', 'Zabezpečenie hygienických a akustických štandardov', 'Bezbariérové riešenia pre všetky komunikácie', 'Príprava auditov a bezchybné odovzdanie pre verejnú prevádzku'],
    materials: ['Ekologicky a zdravotne nezávadné stavebné zmesi', 'Akustické a protipožiarne sadrokartonové systémy', 'Špeciálne bezpečnostné zasklenia'],
    equipment: ['Presná meracia technika s certifikáciou', 'Manipulačná a čistiaca technika s nízkou hlučnosťou', 'Lokálne zabezpečovacie zariadenia']
  },
  'zakladanie-stavieb': {
    longDescription: 'Realizujeme zakladanie stavieb, základové pásy a základové dosky pre rodinné domy, bytové objekty aj komerčné budovy. Zabezpečujeme kompletné zemné práce, prípravu podložia, armovanie a betonáž základových konštrukcií s dôrazom na statickú bezpečnosť a dlhodobú životnosť stavby.',
    partnerText: 'Zakladanie stavieb patrí medzi najdôležitejšie fázy výstavby. Využívame vlastnú techniku, skúsený tím a overené technologické postupy, aby sme zabezpečili presnú realizáciu základov aj v náročných geologických podmienkach.',
    features: ['Geodetické vytýčenie a analýza podložia', 'Výkopy a úprava základovej škáry', 'Uloženie uzemnenia a prestupov inžinierskych sietí', 'Precízne zadebnenie a armovanie pásov a pätiek', 'Betonáž dosiek s následným riadnym ošetrovaním betónu'],
    materials: ['Vysoko trvanlivé betónové zmesi (vodostavebné betóny)', 'Odolné profilové oceľové armatúry', 'Vysokokvalitné hydroizolačné fólie a pásy'],
    equipment: ['Geodetické stanice a digitálne teodolity', 'Hĺbkové vibrátory na zhutnenie betónu', 'Bagre so špeciálnymi výkopovými lyžicami']
  },
  'monoliticke-konstrukcie': {
    longDescription: 'Realizujeme monolitické železobetónové konštrukcie, stropy, schodiská, oporné múry a ďalšie nosné prvky stavieb. Zabezpečujeme kompletnú realizáciu od debnenia a armovania až po betonáž a odborné ošetrovanie betónu s dôrazom na pevnosť, životnosť a presnosť prevedenia.',
    partnerText: 'Monolitické konštrukcie realizujeme pre rodinné domy, bytové budovy, komerčné objekty aj priemyselné stavby. Vďaka skúsenostiam a modernému vybaveniu dokážeme zabezpečiť kvalitné riešenia aj pri technicky náročných projektoch.',
    features: ['Návrh a rozkreslenie plánu debnenia (skladby)', 'Presné zostavenie certifikovaného systémového debnenia', 'Detailná pokládka a viazanie profilovej betonárskej výstuže', 'Plynulá betonáž s presným strojovým zhutnením', 'Profesionálne oddebnenie a následná vizuálna kontrola'],
    materials: ['Certifikované armovacie železo a sieťoviny', 'Vysoko kvalitné transportbetóny', 'Odvzdušňovacie a separačné chémiové prostriedky'],
    equipment: ['Systémové debnenia (Peri, Doka, atď.)', 'Výkonné stacionárne a autočerpadlá betónu', 'Výkonné plošné a ponorné vibrátory']
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
    materials: ['Kvalitné konštrukčné drevo (KVH/BSH hranoly)', 'Vysokopevnostné skrutky a oceľové spojovníky', 'Špičkové ochranné a impregnačné nátery proti vlhkosti'],
    equipment: ['Pokosené profesionálne reťazové a kotúčové píly', 'Vysokovýkonné akumulátorové rázové uťahováky', 'Dvíhacia a transportná technika pre drevo']
  },
  'omietky': {
    longDescription: 'Realizujeme strojové a ručné omietky pre rodinné domy, bytové budovy a komerčné objekty. Kvalitne zhotovené omietky vytvárajú ideálny podklad pre ďalšie povrchové úpravy a významne ovplyvňujú vzhľad aj životnosť interiéru. Používame moderné omietkové systémy, ktoré zabezpečujú vysokú pevnosť, rovinnosť povrchov a odolnosť voči bežnému opotrebeniu.',
    partnerText: 'Omietkarske práce realizujeme s dôrazom na presnosť, kvalitu spracovania a dodržiavanie technologických postupov. Vďaka skúsenému tímu a profesionálnemu vybaveniu dokážeme zabezpečiť hladké, rovné a trvácne povrchy pripravené na maľovanie alebo ďalšie dokončovacie práce.',
    features: ['Osadenie omietnikov a presných rohovníkov', 'Strojové nanášanie optimálne rozmiešanej zmesi', 'Dôkladné stiahnutie omietky hliníkovými H-profilmi', 'Dokonalé filcovanie a finálne vyhladenie', 'Ošetrenie zrenia proti vzniku zmrašťovacích trhlín'],
    materials: ['Vápennocementové a sadrové suché zmesi', 'Sklotextilné spevňovacie sieťky do kritických rohov', 'Vysokokvalitné rohové a omietkové lišty'],
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
    materials: ['Vysokoflexibilné lepidlá triedy C2TES1', 'Tekuté plošné hydroizolácie a rohovníky', 'Antibakteriálne prémiové škárovacie hmoty'],
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
    materials: ['Diamantové korunky rozličných priemerov najvyššej kvality', 'Chemicky šetrné chladiace emulzie s lubrikáciou', 'Odborné tlakové uzávery pre následnú montáž'],
    equipment: ['Vysokovýkonné jadrové vŕtačky so statívmi', 'Priemyselné vysávače pre masívne odsávanie vody', 'Prenosné tlakové vodné zásobníky a detektory armatúr']
  },
  'rezanie-otvorov': {
    longDescription: 'Špecializujeme sa na rezanie otvorov do betónových, železobetónových a murovaných konštrukcií. Realizujeme stavebné otvory pre okná, dvere, technologické prestupy a rekonštrukčné zásahy s dôrazom na presnosť, bezpečnosť a zachovanie statiky objektu.',
    partnerText: 'Pri rezaní otvorov využívame diamantové píly a profesionálnu techniku, ktorá umožňuje čisté a presné rezy aj v náročných podmienkach. Každý zásah realizujeme s ohľadom na bezpečnosť a technický stav konštrukcie.',
    features: ['Dôkladné vytýčenie a podpretie stropu pred oslabením steny', 'Presná kalibrácia vodiacej koľajnice diamantovej píly', 'Fázované obojstranné pílenie hrubostenných železobetónov', 'Komplexné odsatie vyprodukovaného chladiaceho kalu', 'Šetrné vybratie a odstránenie celistvého odrezaného kvádra'],
    materials: ['Profesionálne diamantové rezné disky a laná', 'Ochranné rošty a ocelové podporné bezpečnostné vzpery', 'Technické textílie pre zamedzenie poškodenia zatekania'],
    equipment: ['Automatizované stenové a lanové píly na koľajniciach', 'Vysokovýkonné hydraulické napínacie stanice', 'Portálové žeriavy a kladkostroje pre vybratie blokov betónu']
  }
};

export default async function GenericServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;

  if (serviceSlug === 'stavba-domu-na-kluc' || serviceSlug === 'rekonstrukcia-rodinneho-domu' || serviceSlug === 'rodinne-domy') {
    redirect(`/sluzby/rodinne-domy`);
  }

  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  let serviceIdForComponent: SubServiceKey;
  if (serviceSlug === 'zakladanie-stavieb') serviceIdForComponent = 'zakladanie';
  else if (serviceSlug === 'monoliticke-konstrukcie') serviceIdForComponent = 'monoliticke';
  else if (serviceSlug === 'murarske-prace') serviceIdForComponent = 'murarske';
  else if (serviceSlug === 'tesarske-prace') serviceIdForComponent = 'tesarske';
  else if (serviceSlug === 'omietky') serviceIdForComponent = 'omietky';
  else if (serviceSlug === 'potery') serviceIdForComponent = 'potery';
  else if (serviceSlug === 'obkladacske-prace') serviceIdForComponent = 'obkladacske';
  else if (serviceSlug === 'fasady') serviceIdForComponent = 'fasady';
  else if (serviceSlug === 'vykopove-zemne-prace') serviceIdForComponent = 'vykopove';
  else if (serviceSlug === 'buracie-prace') serviceIdForComponent = 'buracie';
  else if (serviceSlug === 'jadrove-vrtanie') serviceIdForComponent = 'jadrove';
  else if (serviceSlug === 'rezanie-otvorov') serviceIdForComponent = 'rezanie';
  else serviceIdForComponent = 'zakladanie';

  const extra = serviceExtraData[serviceSlug] || {
    longDescription: service.description + "\\n\\nSpoliehame sa na naše odborné skúsenosti a kvalitné stavebné postupy na zabezpečenie tých najlepších výsledkov.",
    partnerText: `Sme stabilným partnerom pre ${service.name.toLowerCase()}. Naše kapacity nám umožňujú plnohodnotne obslúžiť klientov na celom území SR. S dôrazom na bezpečnosť práce a najvyššie štandardy dodávame služby, ktoré spĺňajú najnáročnejšie požiadavky.`,
    features: [
      "Dôkladná príprava a obhliadka staveniska",
      "Zabezpečenie potrebného materiálu a techniky",
      "Odborná realizácia podľa platných technických noriem",
      "Priebežná kontrola kvality a stavebný dozor",
      "Odovzdanie kompletne ukončených prác bez nedostatkov"
    ],
    materials: [
      "Materiály prémiovej triedy",
      "Certifikované izolácie a zmesi",
      "Eko-priateľské certifikácie"
    ],
    equipment: [
      "Moderná ťažká technika",
      "Špičkové nivelačné systémy",
      "Certifikované náradie Hilti a Bosch"
    ]
  };

  const GenericSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <HardHat className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">
          Naša odbornosť
        </h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base font-medium">
          {extra.partnerText}
        </p>

        <div className="pt-4 border-t border-zinc-200/60">
          <strong className="text-sm text-zinc-900 block mb-2">
            Vybrané garancie z nášho portfólia:
          </strong>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Certifikované stavebné postupy",
              "Skúsený a kvalifikovaný personál",
              "Vlastné strojové vybavenie",
              "Dodržiavanie termínov a noriem",
            ].map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs bg-white p-3 rounded-lg border border-zinc-200 shadow-sm text-zinc-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const GenericFaq = (
    <div className="max-w-7xl mx-auto px-6 mt-16 space-y-8">
      <div className="bg-zinc-950 text-white p-8 rounded-xl relative overflow-hidden border border-zinc-800 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            Často kladené otázky k službe
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-amber-500 mb-2">
                Koľko stojí {service.name.toLowerCase()}?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Každý projekt vyhodnocujeme individuálne a cena závisí od viacerých faktorov vrátane náročnosti, veľkosti aj použitého materiálu. Radi vám vypracujeme nezáväznú cenovú ponuku. Použite náš orientačný kalkulátor vyššie pre rýchly prehľad.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-amber-500 mb-2">
                Poskytujete záruky na vaše práce?
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Áno, samozrejmosťou je plná certifikačná a legislatívna garancia v rámci SR. Na {service.name.toLowerCase()} a celkovú integritu diela poskytujeme predĺženú záruku podľa konkrétnej zmluvy o dielo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SubServiceDetail
      serviceId={serviceIdForComponent}
      serviceSlug={service.slug}
      title={service.name}
      description={extra.longDescription}
      features={extra.features}
      materials={extra.materials}
      equipment={extra.equipment}
      customLocationTop={GenericSpecificTop}
      customFaq={GenericFaq}
    />
  );
}
