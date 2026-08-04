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
  services?: string[];
  challenges?: { challenge: string; solution: string }[];
  timeline?: { date: string; title: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string; company?: string };
}

export const projectsData: Project[] = [

  {
    id: 'rekonstrukcia-domovu-socialnych-sluzieb-detva',
    title: 'Zariadenie sociálnych služieb Detva',
    description: 'Výstavba 3 bytových domov vrátane inžinierskych sietí, opornej steny a podzemného parkovania pre obyvateľov.',
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
    services: [
      'Generálna dodávka stavby',
      'Zemné práce a zakladanie',
      'Monolitické konštrukcie',
      'Inžinierske siete',
      'Sadové úpravy'
    ],
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
    ],
    testimonial: {
      quote: 'Spolupráca s MNSP bola na vysokej profesionálnej úrovni. Oceňujem proaktívny prístup pri riešení technických výziev a dodržanie harmonogramu aj napriek náročným podmienkam na stavenisku.',
      author: 'Ing. arch. Peter Kováč',
      role: 'Hlavný architekt',
      company: 'Mesto Detva'
    }
  },
  {
    id: 'rekonstrukcia-novohradskeho-muzea-lucenec',
    title: 'Novohradské múzeum a galéria Lučenec',
    description: 'Realizácia základov, oporných múrov a monolitických konštrukcií pre novú rozsiahlu skladovú halu a prľahlé administratívne priestory.',
    category: 'Občianske stavby',
    location: 'Lučenec',
    year: 2025,
    duration: '6 mesiacov',
    budgetString: '€ 1.2M',
    imageUrl: '/Rekonstrukcia-novohradskeho-muzea-Lucenec.webp'
  },
  {
    id: 'rekonstrukcia-domovu-dochodcov-senior-active-hrinova-n-o',
    title: 'Zariadenie pre seniorov a domov sociálnych služieb SENIOR ACTIVE Hriňová',
    description: 'Rekonštrukcia a modernizácia kancelárskych priestorov na 3 podlažiach do prémiového štandardu s využitím moderných materiálov.',
    category: 'Občianske stavby',
    location: 'Hriňová',
    year: 2025,
    duration: '4 mesiace',
    budgetString: '€ 450 000',
    imageUrl: '/rekonstrukcia-domovu-dochodcov-senior-active-hrinova.webp'
  },
  {
    id: 'rekonstrukcia-rodinneho-domu-hrinova',
    title: 'Rekonštrukcia rodinného domu Hriňová',
    description: 'Kompletná rekonštrukcia rodinného domu. Rekonštrukcia interiéru a exteriéru.',
    category: 'Rodinné domy',
    location: 'Hriňová',
    year: 2025,
    duration: '',
    budgetString: '',
    imageUrl: '/kompletna-rekonstrukcia-domu-hrinova.webp'
  },

  {
    id: 'monoliticka-stropna-doska-stozok',
    title: 'Monolitická stropná doska Stožok',
    description: 'Debnenie a betonáž atypickej stropnej dosky.',
    category: 'Rodinné domy',
    location: 'Stožok',
    year: 2022,
    duration: '',
    budgetString: '',
    imageUrl: '/monolit-stozok/Monolit-Stozok-1536x1152.jpg'
  },

  {
    id: 'rekonstrukcia-rodinneho-domu-detva',
    title: 'Rekonštrukcia rodinného domu Detva',
    description: 'Kompletná rekonštrukcia rodinného domu v Detve.',
    category: 'Rodinné domy',
    location: 'Detva',
    year: 2023,
    duration: '',
    budgetString: '',
    imageUrl: '/rekonstrukcia-domu-detva/Rekonstrukcia-domu-detva.webp'
  },

  {
    id: 'hruba-stavba-dubravy',
    title: 'Hrubá stavba Dúbravy',
    description: 'Kompletná hrubá stavba rodinného domu a prístupovej cesty s prvkami modernej architektúry.',
    category: 'Rodinné domy',
    location: 'Dúbravy',
    year: 2023,
    duration: '',
    budgetString: '',
    imageUrl: '/hruba-stavba-dubravy/hruba-stavba-rd-dubravy.webp'
  },

  {
    id: 'rodinny-dom-banska-bystrica',
    title: 'Rodinný dom Banská Bystrica',
    description: '',
    category: 'Rodinné domy',
    location: 'Banská Bystrica  ',
    year: 2023,
    duration: '',
    budgetString: '',
    imageUrl: '/rodinny-dom-banska-bystrica-slnecne-strane.webp'
  }
];
