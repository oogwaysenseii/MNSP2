export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Stavebná firma',
    image: '',
    '@id': '',
    url: 'https://www.example.com',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Banská Bystrica',
      postalCode: '',
      addressCountry: 'SK'
    }
  };
}
