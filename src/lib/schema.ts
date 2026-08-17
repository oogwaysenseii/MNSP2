export const COMPANY_NAME = 'MNSP | Stavby a rekonštrukcie';
export const DOMAIN = 'https://www.mnsp.sk';

/**
 * Brand suffix for <title> only — NOT for schema.
 *
 * The full COMPANY_NAME is 32 characters. Appended by the layout's title
 * template it pushed roughly half of all page titles past the ~60 characters
 * Google renders, so the brand was truncated away on exactly the pages where
 * it would have helped. Schema, footer and GBP keep the full legal-style name;
 * only the title tag uses the short form.
 */
export const BRAND_SHORT = 'MNSP';

/**
 * THREE real branches, each with its own Google Business Profile.
 *
 * Rules that keep this valid rather than spammy:
 *  - `name`, `streetAddress`, `zip` and `phone` must match that branch's GBP
 *    CHARACTER FOR CHARACTER. Any drift is a NAP-consistency problem.
 *  - Each branch needs its own page at `pagePath`. That page is what you set
 *    as the website URL in the corresponding GBP.
 *  - Only those branch pages emit LocalBusiness. Service and city pages emit
 *    Organization with areaServed — they are not physical locations.
 *
 * TODO before deploy — verify against the live GBPs:
 *  [ ] Zvolen street address. schema.ts previously said Janka Jesenského
 *      4773/89; the footer and contact page say Jozefa Kozáčeka 829/2.
 *      Whichever is on the GBP wins, and the other must be updated everywhere.
 *  [ ] Banská Bystrica — "Medený Hámor" has no street number.
 *  [ ] Per-branch phone numbers, if the branches have distinct lines.
 *  [ ] IČO / DIČ from the Obchodný register.
 */

export const BUSINESS = {
  legalName: 'MNSP s.r.o.', // TODO: confirm exact name in Obchodný register
  ico: '', // TODO — required on the website by §3a Obchodného zákonníka
  dic: '',
  email: 'info@mnsp.sk',
  mainPhone: '+421950699585',
} as const;

export type Branch = {
  key: string;
  /** Must match the GBP business name exactly. */
  name: string;
  streetAddress: string;
  city: string;
  zip: string;
  phone: string;
  /** Dedicated page for this branch — set as website URL in its GBP. */
  pagePath: string;
  /** Short label used in headings, e.g. "Centrála" / "Pobočka". */
  role: string;
  /** One paragraph: what this branch covers and why it's there. */
  intro: string;
  /** Districts and towns served from this branch. */
  areaServed: readonly string[];
  lat?: number;
  lng?: number;
};

export const BRANCHES: Record<string, Branch> = {
  zvolen: {
    key: 'zvolen',
    name: 'MNSP | Stavby a rekonštrukcie – Zvolen',
    streetAddress: 'Jozefa Kozáčeka 829/2', // TODO: confirm against GBP
    city: 'Zvolen',
    zip: '960 01',
    phone: '+421950699585',
    pagePath: '/kontakt/zvolen',
    role: 'Centrála',
    intro:
      'Zvolen je naším domovským mestom — sídli tu vedenie firmy, technika aj kmeňové stavebné tímy. Odtiaľto koordinujeme väčšinu zákaziek a odtiaľto vyrážame na obhliadky. Ak neviete, kam sa obrátiť, začnite tu.',
    areaServed: ['Zvolen', 'Sliač', 'Kováčová', 'Očová', 'Budča', 'Krupina', 'Banská Štiavnica', 'Žiar nad Hronom'],
  },
  hrinova: {
    key: 'hrinova',
    name: 'MNSP | Stavby a rekonštrukcie – Hriňová',
    streetAddress: 'Partizánska 1601/23',
    city: 'Hriňová',
    zip: '962 05',
    phone: '+421950699585',
    pagePath: '/kontakt/hrinova',
    role: 'Pobočka',
    intro:
      'Z Hriňovej obsluhujeme Podpoľanie a juh kraja. Je to región s lazníckym osídlením, svahovitými pozemkami a horšie dostupnými stavbami — mať tímy priamo tu znamená kratšie výjazdy a lepšiu znalosť terénu.',
    areaServed: ['Hriňová', 'Detva', 'Kriváň', 'Stožok', 'Dúbravy', 'Lučenec', 'Poltár', 'Rimavská Sobota'],
  },
  'banska-bystrica': {
    key: 'banska-bystrica',
    name: 'MNSP | Stavby a rekonštrukcie – Banská Bystrica',
    streetAddress: 'Medený Hámor', // TODO: add street number from GBP
    city: 'Banská Bystrica',
    zip: '974 01',
    phone: '+421950699585',
    pagePath: '/kontakt/banska-bystrica',
    role: 'Pobočka',
    intro:
      'Banskobystrická pobočka pokrýva krajské mesto a smer na Horehronie. Terén je tu členitý a svahovitý, čo kladie vyššie nároky na zakladanie stavieb a oporné konštrukcie.',
    areaServed: ['Banská Bystrica', 'Badín', 'Selce', 'Slovenská Ľupča', 'Brezno', 'Valaská', 'Podbrezová'],
  },
};

/** Headquarters — the entity that owns the brand and the site. */
export const HQ_BRANCH_KEY = 'zvolen';

const ORG_ID = `${DOMAIN}/#organization`;
const branchId = (b: Branch) => `${DOMAIN}${b.pagePath}#localbusiness`;

function postalAddress(b: Branch) {
  return {
    '@type': 'PostalAddress',
    streetAddress: b.streetAddress,
    addressLocality: b.city,
    postalCode: b.zip,
    addressCountry: 'SK',
  };
}

function openingHours() {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  };
}

/* ------------------------------------------------------------------ */
/* Organization — site-wide, and the provider on every service page    */
/* ------------------------------------------------------------------ */

export function generateOrganizationSchema() {
  const hq = BRANCHES[HQ_BRANCH_KEY];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: COMPANY_NAME,
    legalName: BUSINESS.legalName,
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`,
    telephone: BUSINESS.mainPhone,
    email: BUSINESS.email,
    address: postalAddress(hq),
    ...(BUSINESS.ico ? { identifier: BUSINESS.ico, vatID: BUSINESS.dic } : {}),
    // Ties all three profiles to one brand.
    subOrganization: Object.values(BRANCHES).map((b) => ({ '@id': branchId(b) })),
  };
}

/* ------------------------------------------------------------------ */
/* LocalBusiness — ONLY on the three dedicated branch pages            */
/* ------------------------------------------------------------------ */

export function generateBranchSchema(branchKey: string) {
  const b = BRANCHES[branchKey];
  if (!b) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': branchId(b),
    name: b.name,
    legalName: BUSINESS.legalName,
    parentOrganization: { '@id': ORG_ID },
    url: `${DOMAIN}${b.pagePath}`,
    image: `${DOMAIN}/og-image.jpg`,
    telephone: b.phone,
    email: BUSINESS.email,
    address: postalAddress(b),
    openingHoursSpecification: openingHours(),
    ...(b.lat && b.lng
      ? { geo: { '@type': 'GeoCoordinates', latitude: b.lat, longitude: b.lng } }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Service pages — Organization as provider, town as areaServed        */
/* ------------------------------------------------------------------ */

export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  areaServed?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: { '@id': ORG_ID },
    url: serviceUrl,
    ...(areaServed ? { areaServed: { '@type': 'City', name: areaServed } } : {}),
  };
}

/**
 * Replaces the old generateServiceAndLocalBusinessSchema.
 *
 * The old version picked a branch by substring match and silently defaulted
 * to Hriňová — so pages for Lučenec, Poltár, Rimavská Sobota and five other
 * towns all claimed a Hriňová street address. A service page is not an
 * office; it emits Organization + Service + areaServed instead.
 */
export function generateServicePageSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  areaServed?: string,
) {
  return [
    generateOrganizationSchema(),
    generateServiceSchema(serviceName, serviceDescription, serviceUrl, areaServed),
  ];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_NAME,
    url: DOMAIN,
    inLanguage: 'sk-SK',
    publisher: { '@id': ORG_ID },
  };
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${DOMAIN}${item.path}`,
    })),
  };
}

export function generateFaqSchema(faq: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/**
 * Nearest branch — for "kontaktujte našu pobočku" UI on city pages.
 * Presentational only. Do NOT use this to emit a LocalBusiness address on a
 * page that is not that branch's own page.
 */
export function nearestBranchKey(citySlug: string): string {
  const NEAREST: Record<string, string> = {
    zvolen: 'zvolen',
    'banska-bystrica': 'banska-bystrica',
    brezno: 'banska-bystrica',
    'ziar-nad-hronom': 'zvolen',
    'banska-stiavnica': 'zvolen',
    krupina: 'zvolen',
    detva: 'hrinova',
    hrinova: 'hrinova',
    poltar: 'hrinova',
    lucenec: 'hrinova',
    'rimavska-sobota': 'hrinova',
  };
  return NEAREST[citySlug] ?? HQ_BRANCH_KEY;
}
