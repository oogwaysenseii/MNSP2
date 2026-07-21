export type ServiceCategory = 'residential' | 'renovations' | 'commercial' | 'industrial' | 'civil';

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
}

export const projectsData: Project[] = [

  {
    id: 'rekonstrukcia-domovu-socialnych-sluzieb-detva',
    title: 'Zariadenie sociálnych služieb Detva',
    description: 'Výstavba 3 bytových domov vrátane inžinierskych sietí, opornej steny a podzemného parkovania pre obyvateľov.',
    category: 'civil',
    location: 'Detva',
    year: 2026,
    duration: '18 mesiacov',
    budgetString: '€ 4.5M',
    imageUrl: '/Domov-socialnych-sluzieb-Detva.webp'
  },
  {
    id: 'rekonstrukcia-novohradskeho-muzea-lucenec',
    title: 'Novohradské múzeum a galéria Lučenec',
    description: 'Realizácia základov, oporných múrov a monolitických konštrukcií pre novú rozsiahlu skladovú halu a prľahlé administratívne priestory.',
    category: 'civil',
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
    category: 'civil',
    location: 'Hriňová',
    year: 2025,
    duration: '4 mesiace',
    budgetString: '€ 450 000',
    imageUrl: '/rekonstrukcia-domovu-dochodcov-senior-active-hrinova.webp'
  },
  {
    id: 'rekonstrukcia-rodinneho-domu-hrinova',
    title: 'Rekonštrukcia rodinného domu Hriňová',
    description: 'Kompletná rekonštrukcia rodiného domu. Rekonštrukcia interiéru a exteriéru.',
    category: 'residential',
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
    category: 'residential',
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
    category: 'residential',
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
    category: 'residential',
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
    category: 'residential',
    location: 'Banská Bystrica  ',
    year: 2023,
    duration: '',
    budgetString: '',
    imageUrl: '/rodinny-dom-banska-bystrica-slnecne-strane.webp'
  }
];
