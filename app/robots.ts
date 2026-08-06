import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/src/lib/schema';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API endpoints have nothing to index.
      disallow: ['/api/'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
