export const COMPANY_NAME = "MNSP | Stavby a rekonštrukcie";
export const DOMAIN = "https://www.mnsp.sk"; // Replace with actual domain if known

export const LOCATIONS = {
  Zvolen: {
    name: "MNSP | Stavby a rekonštrukcie - Zvolen",
    address: "Janka Jesenského 4773/89",
    city: "Zvolen",
    zip: "960 01",
    phone: "0950 699 585"
  },
  Hrinova: {
    name: "MNSP | Stavby a rekonštrukcie",
    address: "Partizánska 1601/23",
    city: "Hriňová",
    zip: "962 05",
    phone: "0950 699 585"
  },
  BanskaBystrica: {
    name: "MNSP | Stavby a rekonštrukcie - Banská Bystrica",
    address: "Medený Hámor",
    city: "Banská Bystrica",
    zip: "974 01",
    phone: "0950 699 585"
  }
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`, // Assuming a generic logo URL
    telephone: '0950 699 585',
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_NAME,
    url: DOMAIN,
  };
}

export function generateLocalBusinessSchema(locationKey?: keyof typeof LOCATIONS | string) {
  let loc = LOCATIONS.Hrinova; // Default
  if (locationKey) {
      if (locationKey.toLowerCase().includes('zvolen')) loc = LOCATIONS.Zvolen;
      else if (locationKey.toLowerCase().includes('bystrica') || locationKey.toLowerCase().includes('bb')) loc = LOCATIONS.BanskaBystrica;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: loc.name,
    image: `${DOMAIN}/logo.png`,
    '@id': `${DOMAIN}/#localbusiness-${loc.city.toLowerCase().replace(/\s+/g, '-')}`,
    url: DOMAIN,
    telephone: loc.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: loc.city,
      postalCode: loc.zip,
      addressCountry: 'SK'
    }
  };
}

export function generateServiceSchema(serviceName: string, serviceDescription: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    url: serviceUrl,
  };
}

export function generateServiceAndLocalBusinessSchema(serviceName: string, serviceDescription: string, serviceUrl: string, locationKey: string) {
  const localBusiness = generateLocalBusinessSchema(locationKey);
  const service = generateServiceSchema(serviceName, serviceDescription, serviceUrl);
  return [localBusiness, service];
}
