/**
 * The only service slugs that correspond to real routes under /sluzby/.
 * Keep in sync with SERVICES in ./services.ts.
 *
 * Typing priorityServices against this union means an invalid slug
 * (e.g. the old 'zaklady', 'hruba-stavba', 'zateplenie', 'strechy',
 * 'rekonstrukcia-bytu') is now a compile error rather than a broken link.
 */
export type ServiceSlug =
  | 'rodinne-domy'
  | 'rezidencne-budovy'
  | 'komercna-vystavba'
  | 'priemyselne-objekty'
  | 'obcianske-stavby'
  | 'zakladanie-stavieb'
  | 'monoliticke-konstrukcie'
  | 'murarske-prace'
  | 'tesarske-prace'
  | 'omietky'
  | 'potery'
  | 'obkladacske-prace'
  | 'fasady'
  | 'vykopove-zemne-prace'
  | 'buracie-prace'
  | 'jadrove-vrtanie'
  | 'rezanie-otvorov';
