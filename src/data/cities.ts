export const CITIES = [
  { slug: 'banska-bystrica', name: 'Banská Bystrica', locative: 'Banskej Bystrici', accusative: 'Banskú Bystricu', kraj: 'banskobystricky', surrounding: ['Badín', 'Selce', 'Slovenská Ľupča', 'Harmanec', 'Tajov', 'Kynceľová'] },
  { slug: 'zvolen', name: 'Zvolen', locative: 'Zvolene', accusative: 'Zvolen', kraj: 'banskobystricky', surrounding: ['Sliač', 'Kováčová', 'Lieskovec', 'Očová', 'Budča'] },
  { slug: 'detva', name: 'Detva', locative: 'Detve', accusative: 'Detvu', kraj: 'banskobystricky', surrounding: ['Hriňová', 'Kriváň', 'Vígľaš', 'Stožok', 'Dúbravy'] },
  { slug: 'lucenec', name: 'Lučenec', locative: 'Lučenci', accusative: 'Lučenec', kraj: 'banskobystricky', surrounding: ['Vidiná', 'Halič', 'Tomášovce', 'Lovinobaňa', 'Rapovce'] },
  { slug: 'krupina', name: 'Krupina', locative: 'Krupine', accusative: 'Krupinu', kraj: 'banskobystricky', surrounding: ['Bzovík', 'Dudince', 'Hontianske Nemce', 'Sebechleby', 'Devičie'] },
  { slug: 'brezno', name: 'Brezno', locative: 'Brezne', accusative: 'Brezno', kraj: 'banskobystricky', surrounding: ['Valaská', 'Podbrezová', 'Čierny Balog', 'Polomka', 'Beňuš'] },
  { slug: 'banska-stiavnica', name: 'Banská Štiavnica', locative: 'Banskej Štiavnici', accusative: 'Banskú Štiavnicu', kraj: 'banskobystricky', surrounding: ['Štiavnické Bane', 'Banská Belá', 'Svätý Anton', 'Ilija', 'Podhorie'] },
  { slug: 'ziar-nad-hronom', name: 'Žiar nad Hronom', locative: 'Žiari nad Hronom', accusative: 'Žiar nad Hronom', kraj: 'banskobystricky', surrounding: ['Lutila', 'Lovča', 'Trnavá Hora', 'Hliník nad Hronom', 'Vyhne'] },
  { slug: 'rimavska-sobota', name: 'Rimavská Sobota', locative: 'Rimavskej Sobote', accusative: 'Rimavskú Sobotu', kraj: 'banskobystricky', surrounding: ['Jesenské', 'Ožďany', 'Hnúšťa', 'Tisovec', 'Bátka'] },
  { slug: 'poltar', name: 'Poltár', locative: 'Poltári', accusative: 'Poltár', kraj: 'banskobystricky', surrounding: ['Kokava nad Rimavicou', 'Utekáč', 'Kalinovo', 'Málinec', 'Zlatno'] },
  { slug: 'bratislava', name: 'Bratislava', locative: 'Bratislave', accusative: 'Bratislavu', kraj: 'bratislavsky', surrounding: ['Pezinok', 'Senec', 'Malacky', 'Stupava'] },
  { slug: 'pezinok', name: 'Pezinok', locative: 'Pezinku', accusative: 'Pezinok', kraj: 'bratislavsky', surrounding: ['Modra', 'Svätý Jur', 'Šenkvice'] },
  { slug: 'senec', name: 'Senec', locative: 'Senci', accusative: 'Senec', kraj: 'bratislavsky', surrounding: ['Bernolákovo', 'Ivanka pri Dunaji', 'Chorvátsky Grob'] },
] as const;

export const KRAJE = [
  { slug: 'banskobystricky', name: 'Banskobystrický kraj' },
  { slug: 'bratislavsky', name: 'Bratislavský kraj' },
] as const;

export type CitySlug = typeof CITIES[number]['slug'];
export type City = typeof CITIES[number];
export type KrajSlug = typeof KRAJE[number]['slug'];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
