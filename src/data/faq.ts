/**
 * Site-wide FAQ, rendered at /faq.
 *
 * Previously this lived inline in app/faq/FAQAccordion.tsx and had drifted
 * from the answers used on the service pages — the build duration said
 * "8-12 mesiacov" here and "9 – 12 mesiacov" there, and the warranty answer
 * promised a blanket "štandardná zákonná záruka" while the service pages
 * (correctly) say the scope is set in the zmluva o dielo.
 *
 * Keep answers here consistent with src/data/service-local-angles.ts and
 * src/data/rodinne-domy-content.ts.
 */

export type FaqItem = { q: string; a: string };
export type FaqGroup = { category: string; questions: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: 'Všeobecné',
    questions: [
      {
        q: 'Aké lokality obsluhujete?',
        a: 'Pôsobíme predovšetkým v Banskobystrickom kraji — vo Zvolene, Banskej Bystrici, Detve, Hriňovej a v ich širšom okolí. Pri väčších projektoch, ako je stavba rodinného domu na kľúč, sme po individuálnej dohode ochotní vycestovať aj do iných regiónov.',
      },
      {
        q: 'Aké typy stavieb realizujete?',
        a: 'Staviame rodinné domy na kľúč, bytové a polyfunkčné objekty, priemyselné haly aj občianske stavby ako zariadenia sociálnych služieb. Popri tom realizujeme aj jednotlivé remeslá — murárske práce, omietky, potery, fasády, zakladanie stavieb či jadrové vŕtanie.',
      },
      {
        q: 'Robíte aj menšie zákazky, alebo len celé stavby?',
        a: 'Robíme oboje. Časť klientov si u nás objedná kompletnú stavbu na kľúč, iní len konkrétnu prácu — vymurovať priečku, vyomietať dom, spraviť potery alebo prerezať otvor do betónu. Rozsah dohodneme podľa toho, čo potrebujete.',
      },
      {
        q: 'Poskytujete cenovú ponuku nezáväzne?',
        a: 'Áno. Po úvodnej konzultácii a obhliadke miesta realizácie vypracujeme cenovú ponuku s položkovým rozpisom. Je nezáväzná — kým nepodpíšete zmluvu o dielo, nič vás k ničomu nezaväzuje.',
      },
      {
        q: 'Aké sú vaše záručné podmienky?',
        a: 'Záruka je vždy uvedená v zmluve o dielo a jej rozsah zodpovedá typu prác — iná je pri nosných konštrukciách a iná pri povrchových úpravách. Minimálne však vždy v rozsahu, ktorý stanovujú právne predpisy Slovenskej republiky. Na materiály sa navyše vzťahuje záruka od výrobcu.',
      },
    ],
  },
  {
    category: 'Príprava, projekt a povolenia',
    questions: [
      {
        q: 'Zabezpečujete aj stavebné povolenie a projektovú dokumentáciu?',
        a: 'Áno. Projekt vám na želanie vypracujeme a povolenie stavby vybavíme za vás – od záväzných stanovísk a vyjadrení správcov sietí cez rozhodnutie o stavebnom zámere až po overenie projektu stavby. Ak máte vlastného projektanta, dodáme mu potrebné podklady.',
      },
      {
        q: 'Musím mať na rekonštrukciu stavebné povolenie?',
        a: 'Závisí od rozsahu. Podľa nového stavebného zákona sa bežná údržba, napríklad výmena okien v pôvodnom rozsahu či oprava fasády, spravidla nepovoľuje ani neohlasuje. Drobné stavby a menšie úpravy sa ohlasujú stavebnému úradu. Zásah do nosných konštrukcií – búranie nosných stien, prístavba, nadstavba či zmena tvaru strechy – si vyžaduje rozhodnutie o stavebnom zámere. Po obhliadke vám povieme, kam váš zámer patrí, a povolenie vieme vybaviť za vás.',
      },
      {
        q: 'Potrebujem pred stavbou geologický prieskum?',
        a: 'Odporúčame ho pri každej novostavbe. Únosnosť podložia sa môže líšiť aj v rámci jednej ulice a základ je jediná časť domu, ktorú neskôr neopravíte bez rozobratia stavby. Prieskum vieme sprostredkovať a jeho výsledok premietneme do návrhu základov aj do rozpočtu.',
      },
      {
        q: 'Postavíte dom aj podľa môjho vlastného projektu?',
        a: 'Áno. Ak už máte projektovú dokumentáciu, vychádzame z nej. Ak ešte nie, projekt vám vypracujeme.',
      },
      {
        q: 'Potrebujem stavebný dozor?',
        a: 'Áno, stavebný dozor je potrebný aj pri stavbe na kľúč. Dohliada na to, aby sa stavalo podľa overeného projektu, a kontroluje kvalitu a postup prác.',
      },
      {
        q: 'Pomôžete s príspevkom Obnov dom?',
        a: 'Áno. Zateplenie, výmena okien a dverí či strecha so zateplením patria medzi opatrenia podporované z programu Obnov dom. Obnovu realizujeme my a pripravíme podklady k žiadosti. Program spravuje Slovenská agentúra životného prostredia, ktorá o príspevku aj rozhoduje.',
      },
    ],
  },
  {
    category: 'Priebeh výstavby a rekonštrukcie',
    questions: [
      {
        q: 'Ako dlho trvá stavba domu na kľúč?',
        a: 'Pri murovanom rodinnom dome a plynulom financovaní rátame s 9 až 12 mesiacmi vrátane technologických prestávok na zretie materiálov. Samotná hrubá stavba býva hotová za 2 až 3 mesiace.',
      },
      {
        q: 'Postavíte aj len hrubú stavbu, alebo staviate výhradne na kľúč?',
        a: 'Oboje. Časť klientov si u nás objedná hrubú stavbu a dokončovacie práce si zabezpečí sám, iní chcú dom odovzdaný pripravený na kolaudáciu. Rozsah dohodneme v zmluve ešte pred začiatkom prác.',
      },
      {
        q: 'Dá sa stavať aj cez zimu?',
        a: 'Interiérové práce bežia celoročne. Mokré procesy — betonáže, omietky, potery, zateplenie fasády — plánujeme do teplých mesiacov, pretože potrebujú teplotu nad nulou. Technologické prestávky zahrnieme do harmonogramu vopred, nie sú prekvapením.',
      },
      {
        q: 'Ako viem, či sa dom oplatí rekonštruovať alebo radšej zbúrať?',
        a: 'Pred rozsiahlou rekonštrukciou odporúčame obhliadku statikom. Ak sú narušené základy, murivo je trvalo zavlhnuté a stropy vykazujú priehyby, býva ekonomickejšie dom asanovať. Po obhliadke vám otvorene povieme, ktorá cesta dáva zmysel.',
      },
      {
        q: 'Môžeme počas rekonštrukcie v dome bývať?',
        a: 'Pri čiastočnej rekonštrukcii sa to dá zvládnuť, práce sa však predĺžia a je to náročné na prach a hluk. Pri kompletnej rekonštrukcii so zásahom do rozvodov a dispozície odporúčame dom na čas opustiť.',
      },
      {
        q: 'Zabezpečujete odvoz a likvidáciu stavebného odpadu?',
        a: 'Áno. Pri búracích, výkopových aj rekonštrukčných prácach vieme zastrešiť kompletné nakladanie so stavebným odpadom — od pristavenia kontajnera cez triedenie až po legálnu likvidáciu na skládke.',
      },
      {
        q: 'Dostanete techniku aj na horšie dostupný pozemok?',
        a: 'Vo väčšine prípadov áno, no prístupovú cestu si vždy najprv prejdeme osobne — pri svahovitých alebo úzkych prístupoch je to nutnosť. Podľa nej volíme veľkosť mechanizácie aj spôsob dopravy betónu, aby sa to neriešilo až v deň betonáže.',
      },
      {
        q: 'Je možné počas stavby meniť projekt?',
        a: 'Drobné zmeny, ako posunutie nenosnej priečky či pridanie zásuvky, vieme riešiť flexibilne. Zásadné zmeny nosných konštrukcií si však vyžadujú konanie so stavebným úradom. Každú zmenu rozsahu riešime písomným dodatkom, aby ste vopred vedeli, čo to znamená pre cenu aj termín.',
      },
      {
        q: 'Kto na stavbe zodpovedá za priebeh prác?',
        a: 'Za každé dielo zodpovedá konkrétny stavbyvedúci, ktorý koordinuje profesie a je vaším kontaktným človekom počas celej realizácie. O postupe prác vás informujeme priebežne.',
      },
    ],
  },
  {
    category: 'Cenotvorba a platby',
    questions: [
      {
        q: 'Koľko stojí stavba rodinného domu?',
        a: 'Pri murovanom dome na kľúč v strednom štandarde orientačne približne 1 640 € za m² podlahovej plochy. Presná cena závisí od veľkosti a tvaru domu, štandardu materiálov a stavu pozemku. Orientačnú sumu si viete vypočítať v našej cenovej kalkulačke – záväznú ponuku vypracujeme po obhliadke a na základe projektu.',
      },
      {
        q: 'Koľko stojí rekonštrukcia domu?',
        a: 'Orientačne od približne 300 € za m² pri čiastočnej rekonštrukcii, približne 750 € pri kompletnej a 1 100 € pri prémiovej. Pri starom dome odporúčame rezervu 20 až 30 % na veci, ktoré sa ukážu až po odkrytí konštrukcií. Presnú cenu určíme po obhliadke.',
      },
      {
        q: 'Ako prebieha financovanie stavby?',
        a: 'Platby si spravidla rozdeľujeme do niekoľkých tranží podľa vopred dohodnutého harmonogramu a zrealizovaných etáp výstavby. Nikdy nepožadujeme platbu celej sumy vopred.',
      },
      {
        q: 'Je možné financovať stavbu hypotékou?',
        a: 'Áno. Zmluva o dielo aj priebežné súpisy prác slúžia ako podklad pre čerpanie hypotekárneho úveru — banky ich pri financovaní výstavby štandardne vyžadujú.',
      },
      {
        q: 'Môžem si dodávať vlastný materiál?',
        a: 'Áno, po vzájomnej dohode. Treba však počítať s tým, že záruka sa potom vzťahuje na naše prevedenie, nie na materiál, ktorý sme nedodali. Pri materiáloch od nás preberáme zodpovednosť za dielo ako celok.',
      },
      {
        q: 'Môže sa cena počas stavby zmeniť?',
        a: 'To, čo je v položkovej ponuke, sa nemení. Cena sa môže zmeniť len pri zmene rozsahu — napríklad keď sa pri rekonštrukcii po odkrytí konštrukcií nájde niečo, s čím sa vopred nedalo počítať. Vždy o tom vieme skôr, než to zrealizujeme.',
      },
    ],
  },
];

/** Flat list for FAQPage structured data. */
export const FAQ_FLAT: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.questions);
