import type { MetadataRoute } from 'next';
import { DOMAIN, BRANCHES } from '@/src/lib/schema';
import { CITIES } from '@/src/data/cities';
import { SERVICES } from '@/src/data/services';
import { REDIRECTED } from '@/src/data/service-component-keys';
import { projectsData } from '@/src/data/projects';
import { blogPostsData } from '@/src/data/blog';

/**
 * The previous version returned a single entry — the homepage — while the build
 * generates 285 pages. robots.ts points crawlers here, so everything except the
 * homepage had to be discovered by crawling alone.
 *
 * Priorities are relative hints only; Google largely ignores them. They're set
 * so converting pages outrank legal boilerplate if a crawler does use them.
 */

const now = new Date();

/** Slugs handled by the dedicated /sluzby/rodinne-domy tree. */
const REDIRECTED_SLUGS = REDIRECTED as readonly string[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: DOMAIN, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${DOMAIN}/sluzby`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/lokality`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/kalkulacka`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/kontakt`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    // Branch pages — each is the website URL of a Google Business Profile.
    ...Object.values(BRANCHES).map((b) => ({
      url: `${DOMAIN}${b.pagePath}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${DOMAIN}/o-nas`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${DOMAIN}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${DOMAIN}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${DOMAIN}/ochrana-sukromia`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${DOMAIN}/obchodne-podmienky`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const rodinneDomy: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}/sluzby/rodinne-domy`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const rodinneDomyCities: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    {
      url: `${DOMAIN}/sluzby/rodinne-domy/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/sluzby/rodinne-domy/stavba-domu-na-kluc/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]);

  const serviceHubs: MetadataRoute.Sitemap = SERVICES.filter(
    (s) => !REDIRECTED_SLUGS.includes(s.slug),
  ).map((service) => ({
    url: `${DOMAIN}/sluzby/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceCities: MetadataRoute.Sitemap = SERVICES.filter(
    (s) => !REDIRECTED_SLUGS.includes(s.slug),
  ).flatMap((service) =>
    CITIES.map((city) => ({
      url: `${DOMAIN}/sluzby/${service.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  const locationPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${DOMAIN}/lokality/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${DOMAIN}/portfolio/${project.id}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  // Real publish dates — this is the one place lastModified is meaningful.
  const blogPages: MetadataRoute.Sitemap = blogPostsData.map((post) => ({
    url: `${DOMAIN}/blog/${post.id}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...rodinneDomy,
    ...serviceHubs,
    ...locationPages,
    ...portfolioPages,
    ...blogPages,
    ...rodinneDomyCities,
    ...serviceCities,
  ];
}
