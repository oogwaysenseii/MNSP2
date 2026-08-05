import type { NextConfig } from 'next';

const LEGACY_CITY_REDIRECTS = [
  ['zvolen', 'zvolen'],
  ['brezno', 'brezno'],
  ['detva', 'detva'],
  ['hrinova', 'hrinova'],
  ['lucenec', 'lucenec'],
  ['krupina', 'krupina'],
  ['banska-bystrica', 'banska-bystrica'],
  ['banska-stiavnica', 'banska-stiavnica'],
  ['ziar-nad-hronom', 'ziar-nad-hronom'],
  ['rimavska-sobota', 'rimavska-sobota'],
  ['poltar', 'poltar'],
].map(([legacy, slug]) => ({
  source: `/stavebna-firma-${legacy}`,
  destination: `/lokality/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
  },

  async redirects() {
    return [
      // Legacy WordPress city landing pages — still indexed by Google,
      // currently 404. Reclaims the link equity.
      ...LEGACY_CITY_REDIRECTS,

      // Legacy portfolio entry that no longer exists.
      {
        source: '/portfolio/rekonstrukcia-bytu-zvolen',
        destination: '/portfolio',
        permanent: true,
      },

      // Old WP URLs carried a trailing slash. Next strips it by default,
      // so the sources above match both forms; this covers /sluzby/* too.
      {
        source: '/sluzby/:slug*/',
        destination: '/sluzby/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
