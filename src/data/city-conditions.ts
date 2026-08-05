/**
 * Physical attributes that genuinely change how construction work is done.
 * These drive per-city variation in service copy, so a service page in
 * Banská Štiavnica reads differently from the same service in Lučenec
 * because the actual engineering answer IS different.
 *
 * Every value here is verifiable geography — no marketing claims.
 */

export type Terrain = 'flat' | 'rolling' | 'steep';
export type Subsoil = 'rock' | 'clay' | 'gravel' | 'mixed';
export type Climate = 'hot-dry' | 'moderate' | 'cold-wet';
export type Access = 'easy' | 'moderate' | 'difficult';

export type CityConditions = {
  terrain: Terrain;
  subsoil: Subsoil;
  climate: Climate;
  access: Access;
  /** Metres above sea level, town centre. Drives snow load + season length. */
  altitude: number;
  /** Heritage protection that materially constrains work. */
  heritage: boolean;
  /** Elevated groundwater table — matters for foundations and cellars. */
  highWaterTable: boolean;
  /** Dispersed hamlet (laz) settlement — matters for access and logistics. */
  dispersedSettlement: boolean;
};

export const CITY_CONDITIONS: Record<string, CityConditions> = {
  zvolen: {
    terrain: 'flat',
    subsoil: 'gravel',
    climate: 'moderate',
    access: 'easy',
    altitude: 290,
    heritage: false,
    highWaterTable: true, // Hron / Slatina floodplain
    dispersedSettlement: false,
  },
  'banska-bystrica': {
    terrain: 'steep',
    subsoil: 'mixed',
    climate: 'moderate',
    access: 'moderate',
    altitude: 362,
    heritage: true, // mestská pamiatková rezervácia
    highWaterTable: false,
    dispersedSettlement: false,
  },
  detva: {
    terrain: 'rolling',
    subsoil: 'rock',
    climate: 'cold-wet',
    access: 'difficult',
    altitude: 400,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: true,
  },
  hrinova: {
    terrain: 'steep',
    subsoil: 'rock',
    climate: 'cold-wet',
    access: 'difficult',
    altitude: 625,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: true,
  },
  krupina: {
    terrain: 'rolling',
    subsoil: 'clay',
    climate: 'moderate',
    access: 'moderate',
    altitude: 262,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: false,
  },
  'banska-stiavnica': {
    terrain: 'steep',
    subsoil: 'rock',
    climate: 'moderate',
    access: 'difficult',
    altitude: 621,
    heritage: true, // UNESCO
    highWaterTable: false,
    dispersedSettlement: false,
  },
  'ziar-nad-hronom': {
    terrain: 'flat',
    subsoil: 'gravel',
    climate: 'moderate',
    access: 'easy',
    altitude: 250,
    heritage: false,
    highWaterTable: true, // Hron valley
    dispersedSettlement: false,
  },
  brezno: {
    terrain: 'rolling',
    subsoil: 'mixed',
    climate: 'cold-wet',
    access: 'moderate',
    altitude: 487,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: false,
  },
  lucenec: {
    terrain: 'flat',
    subsoil: 'clay',
    climate: 'hot-dry',
    access: 'easy',
    altitude: 190,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: false,
  },
  poltar: {
    terrain: 'rolling',
    subsoil: 'clay',
    climate: 'moderate',
    access: 'moderate',
    altitude: 220,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: false,
  },
  'rimavska-sobota': {
    terrain: 'flat',
    subsoil: 'clay',
    climate: 'hot-dry',
    access: 'easy',
    altitude: 210,
    heritage: false,
    highWaterTable: false,
    dispersedSettlement: false,
  },
};

export function getConditions(citySlug: string): CityConditions | undefined {
  return CITY_CONDITIONS[citySlug];
}

/** Snow load zone drives roof structure dimensioning. */
export function snowLoadNote(c: CityConditions): string | null {
  if (c.altitude >= 600) return 'vysoké snehové zaťaženie';
  if (c.altitude >= 400) return 'zvýšené snehové zaťaženie';
  return null;
}

/** Wet processes (concrete, plaster, screed) need frost-free scheduling. */
export function seasonNote(c: CityConditions): string | null {
  if (c.climate === 'cold-wet' || c.altitude >= 500) {
    return 'kratšia stavebná sezóna, mokré procesy plánujeme do teplých mesiacov';
  }
  return null;
}
