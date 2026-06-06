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
    id: 'byty-raca',
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
    id: 'logisticke-centrum',
    title: 'Novohradské múzeum a galéria Lučenec',
    description: 'Realizácia základov, oporných múrov a monolitických konštrukcií pre novú rozsiahlu skladovú halu a prľahlé administratívne priestory.',
    category: 'industrial',
    location: 'Lučenec',
    year: 2025,
    duration: '6 mesiacov',
    budgetString: '€ 1.2M',
    imageUrl: '/Rekonstrukcia-novohradskeho-muzea-Lucenec.webp'
  },
  {
    id: 'kancelarie-apollo',
    title: 'Zariadenie pre seniorov a domov sociálnych služieb SENIOR ACTIVE Hriňová',
    description: 'Rekonštrukcia a modernizácia kancelárskych priestorov na 3 podlažiach do prémiového štandardu s využitím moderných materiálov.',
    category: 'commercial',
    location: 'Hriňová',
    year: 2025,
    duration: '4 mesiace',
    budgetString: '€ 450 000',
    imageUrl: '/rekonstrukcia-domovu-dochodcov-senior-active-hrinova.webp'
  },
  {
    id: 'obchvat-most',
    title: 'Rekonštrukcia rodidnného domu Hriňová',
    description: 'Dodávka a realizácia monolitických železobetónových konštrukcií a pilierov na rozostavanom úseku bratislavského obchvatu.',
    category: 'civil',
    location: 'Hriňová',
    year: 2025,
    duration: '12 mesiacov',
    budgetString: '€ 2.8M',
    imageUrl: '/kompletna-rekonstrukcia-domu-hrinova.webp'
  },

  {
    id: 'obchvat-most',
    title: 'Mostná konštrukcia D4',
    description: 'Dodávka a realizácia monolitických železobetónových konštrukcií a pilierov na rozostavanom úseku bratislavského obchvatu.',
    category: 'civil',
    location: 'Bratislava',
    year: 2022,
    duration: '12 mesiacov',
    budgetString: '€ 2.8M',
    imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'rd-zahorska',
    title: 'Rodinný dom Banská Bystrica',
    description: 'Kompletná hrubá stavba rodinného domu a prístupovej cesty s prvkami modernej architektúry a nadštandardným zateplením.',
    category: 'residential',
    location: 'Banská Bystrica  ',
    year: 2023,
    duration: '',
    budgetString: '',
    imageUrl: '/rodinny-dom-banska-bystrica-slnecne-strane.webp'
  }
];
