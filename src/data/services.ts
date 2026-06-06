export const SERVICES = [
  { slug: 'rodinne-domy', name: 'Rodinné domy', description: 'Kompletná výstavba a rekonštrukcia rodinných domov.' },
  { slug: 'stavba-domu-na-kluc', name: 'Stavba domu na kľúč', description: 'Realizácia rodinných domov na kľúč od základov po strechu.' },
  { slug: 'rekonstrukcia-rodinneho-domu', name: 'Rekonštrukcia rodinného domu', description: 'Komplexné rekonštrukcie starších domov a zatepľovanie.' },
  { slug: 'rezidencne-budovy', name: 'Rezidenčné budovy', description: 'Výstavba bytových a apartmánových domov.' },
  { slug: 'komercna-vystavba', name: 'Komerčná výstavba', description: 'Výstavba administratívnych, obchodných a komerčných budov.' },
  { slug: 'priemyselne-objekty', name: 'Priemyselné objekty', description: 'Výstavba moderných hál, logistických centier a závodov.' },
  { slug: 'obcianske-stavby', name: 'Občianske stavby', description: 'Výstavba škôl, nemocníc a verejných priestranstiev.' },
  { slug: 'zakladanie-stavieb', name: 'Zakladanie stavieb', description: 'Odborné zemné práce a betónovanie základových dosiek.' },
  { slug: 'monoliticke-konstrukcie', name: 'Monolitické konštrukcie', description: 'Železobetónové konštrukcie, stropy a oporné múry.' },
  { slug: 'murarske-prace', name: 'Murárske práce', description: 'Presné murovanie obvodových stien a priečok.' },
  { slug: 'tesarske-prace', name: 'Tesárske práce', description: 'Krovy, strechy a drevené konštrukcie.' },
  { slug: 'omietky', name: 'Omietky', description: 'Strojové a ručné omietky do interiéru i exteriéru.' },
  { slug: 'potery', name: 'Potery', description: 'Realizácia podlahových poterov najvyššej rovinnosti.' },
  { slug: 'obkladacske-prace', name: 'Obkladačské práce', description: 'Pokládka dlažieb, gresov a obkladov.' },
  { slug: 'fasady', name: 'Fasády', description: 'Zatepľovanie budov a realizácia vonkajších omietok.' },
  { slug: 'vykopove-zemne-prace', name: 'Výkopové a zemné práce', description: 'Mechanizované výkopové práce a úpravy terénov.' },
  { slug: 'buracie-prace', name: 'Búracie práce', description: 'Riadené búranie budov a likvidácia sute.' },
  { slug: 'jadrove-vrtanie', name: 'Jadrové vŕtanie', description: 'Presné jadrové vŕtanie diamantovými korunkami.' },
  { slug: 'rezanie-otvorov', name: 'Rezanie otvorov', description: 'Pílenie a rezanie otvorov pre dvere a inštalácie.' },
] as const;

export type ServiceSlug = typeof SERVICES[number]['slug'];
export type Service = typeof SERVICES[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
