import type { SubServiceKey } from '@/src/components/sections/SubServiceDetail';

/** Slugs handled by the dedicated /sluzby/rodinne-domy tree, not the generic route. */
export const REDIRECTED = [
  'stavba-domu-na-kluc',
  'rekonstrukcia-rodinneho-domu',
  'rodinne-domy',
] as const;

/**
 * service slug -> SubServiceDetail content key.
 * Replaces a 13-branch if/else chain that was duplicated in two page files.
 */
export const COMPONENT_KEY: Record<string, SubServiceKey> = {
  'zakladanie-stavieb': 'zakladanie',
  'monoliticke-konstrukcie': 'monoliticke',
  'murarske-prace': 'murarske',
  'tesarske-prace': 'tesarske',
  omietky: 'omietky',
  potery: 'potery',
  'obkladacske-prace': 'obkladacske',
  fasady: 'fasady',
  'vykopove-zemne-prace': 'vykopove',
  'buracie-prace': 'buracie',
  'jadrove-vrtanie': 'jadrove',
  'rezanie-otvorov': 'rezanie',
};

export function componentKeyFor(slug: string): SubServiceKey {
  return COMPONENT_KEY[slug] ?? 'zakladanie';
}
