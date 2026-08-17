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

      // Services that no longer have per-city pages. These eleven URLs were
      // generated and submitted in the sitemap, so they may be indexed —
      // 301 to the parent service page rather than letting them 404 and
      // discard whatever authority they picked up.
      // Keep in step with NO_CITY_PAGES in src/data/service-component-keys.ts.
      {
        source: '/sluzby/zakladanie-stavieb/:mesto',
        destination: '/sluzby/zakladanie-stavieb',
        permanent: true,
      },

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
