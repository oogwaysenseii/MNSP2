export const CITIES = [
  { slug: 'banska-bystrica', name: 'Banská Bystrica', locative: 'Banskej Bystrici', accusative: 'Banskú Bystricu', surrounding: ['Badín', 'Selce', 'Slovenská Ľupča', 'Harmanec', 'Tajov', 'Kynceľová'] },
  { slug: 'zvolen', name: 'Zvolen', locative: 'Zvolene', accusative: 'Zvolen', surrounding: ['Sliač', 'Kováčová', 'Lieskovec', 'Očová', 'Budča'] },
  { slug: 'detva', name: 'Detva', locative: 'Detve', accusative: 'Detvu', surrounding: ['Hriňová', 'Kriváň', 'Vígľaš', 'Stožok', 'Dúbravy'] },
  { slug: 'lucenec', name: 'Lučenec', locative: 'Lučenci', accusative: 'Lučenec', surrounding: ['Vidiná', 'Halič', 'Tomášovce', 'Lovinobaňa', 'Rapovce'] },
  { slug: 'krupina', name: 'Krupina', locative: 'Krupine', accusative: 'Krupinu', surrounding: ['Bzovík', 'Dudince', 'Hontianske Nemce', 'Sebechleby', 'Devičie'] },
  { slug: 'brezno', name: 'Brezno', locative: 'Brezne', accusative: 'Brezno', surrounding: ['Valaská', 'Podbrezová', 'Čierny Balog', 'Polomka', 'Beňuš'] },
  { slug: 'banska-stiavnica', name: 'Banská Štiavnica', locative: 'Banskej Štiavnici', accusative: 'Banskú Štiavnicu', surrounding: ['Štiavnické Bane', 'Banská Belá', 'Svätý Anton', 'Ilija', 'Podhorie'] },
  { slug: 'ziar-nad-hronom', name: 'Žiar nad Hronom', locative: 'Žiari nad Hronom', accusative: 'Žiar nad Hronom', surrounding: ['Lutila', 'Lovča', 'Trnavá Hora', 'Hliník nad Hronom', 'Vyhne'] },
  { slug: 'rimavska-sobota', name: 'Rimavská Sobota', locative: 'Rimavskej Sobote', accusative: 'Rimavskú Sobotu', surrounding: ['Jesenské', 'Ožďany', 'Hnúšťa', 'Tisovec', 'Bátka'] },
  { slug: 'poltar', name: 'Poltár', locative: 'Poltári', accusative: 'Poltár', surrounding: ['Kokava nad Rimavicou', 'Utekáč', 'Kalinovo', 'Málinec', 'Zlatno'] },
] as const;

export type CitySlug = typeof CITIES[number]['slug'];
export type City = typeof CITIES[number];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
