import type { SubServiceKey } from '@/src/components/sections/SubServiceDetail';

/** Slugs handled by the dedicated /sluzby/rodinne-domy tree, not the generic route. */
export const REDIRECTED = [
  'stavba-domu-na-kluc',
  'rekonstrukcia-rodinneho-domu',
  'rodinne-domy',
] as const;

/**
 * Services that get NO per-city pages.
 *
 * Not a quality judgement — these pages were among the better-differentiated
 * ones. It is a demand judgement: nobody searches "zakladanie stavieb Poltár".
 * Foundations are specified as part of a larger project, so the parent service
 * page carries the whole intent and eleven town variants only spend crawl
 * budget and dilute it.
 *
 * Removing a slug here also removes it from generateStaticParams and from the
 * sitemap. Add a matching 301 in next.config.ts so the existing URLs hand their
 * authority to the parent instead of 404ing.
 */
export const NO_CITY_PAGES = ['zakladanie-stavieb'] as const;

export function hasCityPages(slug: string): boolean {
  return !(NO_CITY_PAGES as readonly string[]).includes(slug);
}

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
