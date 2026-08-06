/**
 * SINGLE SOURCE OF TRUTH for pricing shown to visitors.
 *
 * /kalkulacka and the service-detail estimators previously used unrelated
 * numbers: the calculator summed ten line items to 1640 €/m² at mid standard,
 * while the service pages used baseRate={1400} with modifiers 1.0/1.25/1.45 —
 * so the same house priced 1750 €/m² on one page and 1640 €/m² on another.
 * The code comment (`// 1350e/m2`) disagreed with both.
 *
 * Everything below is now derived from the same line items.
 */

export type PriceLine = {
  id: string;
  name: string;
  /** €/m² of floor area, at STANDARD grade, single storey. */
  basePricePerM2: number;
};

/** Full turnkey scope, as used by the /kalkulacka module picker. */
export const TURNKEY_LINES: readonly PriceLine[] = [
  { id: 'zaklady', name: 'Základy a základová doska', basePricePerM2: 165 },
  { id: 'murivo', name: 'Murovacie práce (Hrubá stavba)', basePricePerM2: 225 },
  { id: 'stropy', name: 'Stropy a vence', basePricePerM2: 135 },
  { id: 'strecha', name: 'Strecha a krov', basePricePerM2: 200 },
  { id: 'okna', name: 'Okná a exteriérové dvere', basePricePerM2: 140 },
  { id: 'fasada', name: 'Zateplenie a fasáda', basePricePerM2: 115 },
  { id: 'rozvody', name: 'Rozvody (Elektro, Voda, Kúrenie)', basePricePerM2: 220 },
  { id: 'omietky', name: 'Vnútorné omietky a potery', basePricePerM2: 80 },
  { id: 'sadrokarton', name: 'Sadrokartónové stropy', basePricePerM2: 60 },
  { id: 'interier', name: 'Interiér (Podlahy, obklady, sanita)', basePricePerM2: 300 },
] as const;

export const STANDARDS = [
  {
    id: 'basic',
    name: 'Ekonomický štandard',
    multiplier: 0.85,
    desc: 'Základné overené materiály so zameraním na cenu.',
  },
  {
    id: 'standard',
    name: 'Zlatá stredná cesta',
    multiplier: 1.0,
    desc: 'Moderné kvalitné materiály, výborný pomer cena / výkon.',
  },
  {
    id: 'premium',
    name: 'Prémiové riešenia',
    multiplier: 1.35,
    desc: 'Najvyššia kvalita, nadštandardné technológie (smart dom).',
  },
] as const;

/**
 * 1640 €/m² — full turnkey scope, single storey, mid standard.
 * Derived, not hardcoded, so adding or repricing a line updates both places.
 */
export const TURNKEY_RATE_PER_M2 = TURNKEY_LINES.reduce(
  (sum, line) => sum + line.basePricePerM2,
  0,
);

/**
 * RENOVATION — separate model.
 *
 * Renovation is not priced off the turnkey line items: scope varies far more,
 * and the /kalkulacka module picker only models new builds. These are the
 * project's original renovation figures, kept as-is.
 */
export const RENOVATION_RATE_PER_M2 = 300;

export const RENOVATION_STANDARDS = [
  {
    id: 'ciastocna',
    name: 'Čiastočná rekonštrukcia',
    multiplier: 1.0,
    desc: 'Interiérové omietky, potery, okná, podlahy a maľby',
  },
  {
    id: 'kompletna',
    name: 'Kompletná rekonštrukcia',
    multiplier: 2.5,
    desc: 'Zmeny statiky, kompletná výmena rozvodov, strecha a zateplenie',
  },
  {
    id: 'premiova',
    name: 'Prémiová rekonštrukcia',
    multiplier: 3.67,
    desc: 'Prémiové materiály, inteligentná elektroinštalácia, dizajnové riešenia',
  },
] as const;

export const RENOVATION_OPTIONS = RENOVATION_STANDARDS.map((s) => ({
  label: `${s.name} (${s.desc})`,
  premiumModifier: s.multiplier,
}));

/** Shape expected by RodinneDomyServiceDetail's `options` prop. */
export const STANDARD_OPTIONS = STANDARDS.map((s) => ({
  label: `${s.name} (${s.desc})`,
  premiumModifier: s.multiplier,
}));
