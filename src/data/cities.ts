export const CITIES = [
  { slug: 'banska-bystrica', name: 'Banská Bystrica', locative: 'Banskej Bystrici', accusative: 'Banskú Bystricu' },
  { slug: 'zvolen', name: 'Zvolen', locative: 'Zvolene', accusative: 'Zvolen' },
  { slug: 'detva', name: 'Detva', locative: 'Detve', accusative: 'Detvu' },
  { slug: 'lucenec', name: 'Lučenec', locative: 'Lučenci', accusative: 'Lučenec' },
  { slug: 'krupina', name: 'Krupina', locative: 'Krupine', accusative: 'Krupinu' },
  { slug: 'brezno', name: 'Brezno', locative: 'Brezne', accusative: 'Brezno' },
  { slug: 'banska-stiavnica', name: 'Banská Štiavnica', locative: 'Banskej Štiavnici', accusative: 'Banskú Štiavnicu' },
  { slug: 'ziar-nad-hronom', name: 'Žiar nad Hronom', locative: 'Žiari nad Hronom', accusative: 'Žiar nad Hronom' },
  { slug: 'rimavska-sobota', name: 'Rimavská Sobota', locative: 'Rimavskej Sobote', accusative: 'Rimavskú Sobotu' },
  { slug: 'poltar', name: 'Poltár', locative: 'Poltári', accusative: 'Poltár' },
] as const;

export type CitySlug = typeof CITIES[number]['slug'];
export type City = typeof CITIES[number];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
