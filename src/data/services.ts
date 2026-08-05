import type { ServiceSlug } from './services-slugs';

/**
 * SINGLE SOURCE OF TRUTH for services.
 *
 * This previously lived in two files — services.ts (used by the /sluzby/[service]
 * and [mesto] routes) and sluzby.ts (used by the /sluzby index, ServicesGrid and
 * Header). They described the same services with different wording, so edits in
 * one place never reached the other. sluzby.ts has been merged in and deleted.
 *
 * `tier: 'building'` — the five headline building types, shown as photo cards.
 * `tier: 'trade'`    — the specialist trades, shown as icon cards (no photos).
 * `tier: 'nested'`   — sub-services living under /sluzby/rodinne-domy/*.
 *
 * `imageUrl` is only meaningful for tier 'building'; trade cards never render
 * an image. The old file carried picsum.photos placeholder URLs on every trade
 * entry, which were dead data.
 */

export type ServiceTier = 'building' | 'trade' | 'nested';

export type Service = {
  slug: string;
  name: string;
  description: string;
  tier: ServiceTier;
  highlights: readonly string[];
  /** Only used by tier 'building'. TODO marks a stock photo awaiting a real one. */
  imageUrl?: string;
};

export const SERVICES: readonly Service[] = [
  // ---------- Building types (photo cards) ----------
  {
    slug: 'rodinne-domy',
    name: 'Rodinné domy',
    description: 'Kompletná výstavba a rekonštrukcie moderných rodinných domov.',
    tier: 'building',
    imageUrl: '/rodinne-domy/rodinne-domy.webp',
    highlights: ['Stavba na kľúč', 'Hrubá stavba aj rekonštrukcia'],
  },
  {
    slug: 'rezidencne-budovy',
    name: 'Rezidenčné budovy',
    description: 'Komplexná výstavba bytových domov a polyfunkčných objektov.',
    tier: 'building',
    // TODO: replace with a real project photo
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80',
    highlights: ['Bytové a polyfunkčné domy', 'Koordinácia všetkých profesií'],
  },
  {
    slug: 'komercna-vystavba',
    name: 'Komerčná výstavba',
    description:
      'Administratívne budovy, sídla firiem, prevádzky, predajne a showroomy.',
    tier: 'building',
    // TODO: replace with a real project photo
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
    highlights: ['Prevádzky a predajne', 'Realizácia počas prevádzky'],
  },
  {
    slug: 'priemyselne-objekty',
    name: 'Priemyselné objekty',
    description: 'Skladové haly, logistické centrá a výrobné závody.',
    tier: 'building',
    // TODO: replace with a real project photo
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80',
    highlights: ['Haly a sklady', 'Základy a monolitické konštrukcie'],
  },
  {
    slug: 'obcianske-stavby',
    name: 'Občianske stavby',
    description: 'Školy, zariadenia sociálnych služieb, úrady a verejné budovy.',
    tier: 'building',
    imageUrl: '/Domov-socialnych-sluzieb-Detva.webp',
    highlights: ['Zariadenia sociálnych služieb', 'Verejné obstarávanie'],
  },

  // ---------- Nested sub-services under /sluzby/rodinne-domy ----------
  {
    slug: 'stavba-domu-na-kluc',
    name: 'Stavba domu na kľúč',
    description: 'Realizácia rodinných domov na kľúč od základov po odovzdanie.',
    tier: 'nested',
    highlights: ['Od základov po kolaudáciu', 'Jeden zhotoviteľ, jedna zmluva'],
  },
  {
    slug: 'rekonstrukcia-rodinneho-domu',
    name: 'Rekonštrukcia rodinného domu',
    description: 'Komplexné rekonštrukcie starších domov, nadstavby a zateplenie.',
    tier: 'nested',
    highlights: ['Zmeny dispozície', 'Statické úpravy'],
  },

  // ---------- Trades (icon cards, no photos) ----------
  {
    slug: 'zakladanie-stavieb',
    name: 'Zakladanie stavieb',
    description:
      'Realizujeme základy stavieb, ktoré zabezpečujú stabilitu a dlhú životnosť objektu.',
    tier: 'trade',
    highlights: ['Presné vytýčenie a realizácia základov', 'Základové pásy aj dosky'],
  },
  {
    slug: 'monoliticke-konstrukcie',
    name: 'Monolitické konštrukcie',
    description:
      'Železobetónové monolitické konštrukcie pre rodinné domy, bytové aj priemyselné objekty.',
    tier: 'trade',
    highlights: ['Debnenie a armovanie', 'Stropy, vence a oporné múry'],
  },
  {
    slug: 'murarske-prace',
    name: 'Murárske práce',
    description:
      'Kompletné murárske práce od nosných múrov až po priečky a rekonštrukcie.',
    tier: 'trade',
    highlights: ['Nosné murivo aj priečky', 'Tehla, pórobetón, tvárnice'],
  },
  {
    slug: 'tesarske-prace',
    name: 'Tesárske práce',
    description:
      'Tesárske práce pre strešné konštrukcie, krovy a drevené stavebné prvky.',
    tier: 'trade',
    highlights: ['Krovy a strešné konštrukcie', 'Debnenie a drevené prvky'],
  },
  {
    slug: 'omietky',
    name: 'Omietky',
    description: 'Vnútorné aj vonkajšie omietky s dôrazom na rovný a trvácny povrch.',
    tier: 'trade',
    highlights: ['Strojové aj ručné omietanie', 'Vápenné a sanačné omietky'],
  },
  {
    slug: 'potery',
    name: 'Potery',
    description:
      'Podlahové potery ako podklad pre finálne podlahové krytiny.',
    tier: 'trade',
    highlights: ['Anhydritové aj cementové', 'Vysoká rovinnosť'],
  },
  {
    slug: 'obkladacske-prace',
    name: 'Obkladačské práce',
    description: 'Obklady a dlažby s dôrazom na detail a dlhodobú životnosť.',
    tier: 'trade',
    highlights: ['Veľkoformátové dlažby', 'Kúpeľne a interiéry'],
  },
  {
    slug: 'fasady',
    name: 'Fasády',
    description:
      'Fasádne systémy, ktoré zlepšujú vzhľad aj energetickú efektivitu budov.',
    tier: 'trade',
    highlights: ['ETICS aj prevetrávané fasády', 'Zateplenie a povrchové úpravy'],
  },
  {
    slug: 'vykopove-zemne-prace',
    name: 'Výkopové a zemné práce',
    description:
      'Zemné práce pre stavby, inžinierske siete a terénne úpravy.',
    tier: 'trade',
    highlights: ['Vlastná mechanizácia', 'Výkopy, násypy, terénne úpravy'],
  },
  {
    slug: 'buracie-prace',
    name: 'Búracie práce',
    description:
      'Bezpečné búracie práce vrátane odvozu a likvidácie stavebného odpadu.',
    tier: 'trade',
    highlights: ['Ručné aj mechanické búranie', 'Odvoz a likvidácia sute'],
  },
  {
    slug: 'jadrove-vrtanie',
    name: 'Jadrové vŕtanie',
    description:
      'Presné jadrové vŕtanie otvorov do betónu, železobetónu a muriva.',
    tier: 'trade',
    highlights: ['Rôzne priemery a hĺbky', 'Diamantové korunky'],
  },
  {
    slug: 'rezanie-otvorov',
    name: 'Rezanie otvorov',
    description:
      'Rezanie otvorov a konštrukcií v betóne, železobetóne aj murive.',
    tier: 'trade',
    highlights: ['Diamantové rezanie', 'Minimálna prašnosť a vibrácie'],
  },
] as const;

export type { ServiceSlug };

export const BUILDING_SERVICES = SERVICES.filter((s) => s.tier === 'building');
export const TRADE_SERVICES = SERVICES.filter((s) => s.tier === 'trade');

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
