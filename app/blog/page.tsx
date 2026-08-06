import BlogSection from '@/src/components/sections/BlogSection';
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  DOMAIN,
} from '@/src/lib/schema';
import { blogPostsData } from '@/src/data/blog';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  'Blog',
  'Praktické rady a technické postupy zo stavieb — výstavba rodinných domov, rekonštrukcie, základy, fasády a stavebné povolenia.',
  '/blog',
);

export default function BlogPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(),
      generateBreadcrumbSchema([
        { name: 'Domov', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
      ...blogPostsData.map((post) => ({
        '@type': 'BlogPosting',
        // The articles live at /blog/{id}. This previously pointed at an
        // anchor on the index, so the entities were never tied to the
        // actual article pages.
        '@id': `${DOMAIN}/blog/${post.id}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${DOMAIN}/blog/${post.id}`,
        },
        url: `${DOMAIN}/blog/${post.id}`,
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl?.startsWith('http')
          ? post.imageUrl
          : `${DOMAIN}${post.imageUrl}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        // TODO: if a specific person writes these, name them here — a real
        // byline is a stronger trust signal than an organisation.
        author: { '@id': `${DOMAIN}/#organization` },
        publisher: { '@id': `${DOMAIN}/#organization` },
      })),
    ],
  };

  return (
    <div className="bg-white pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-[1500px] mx-auto px-6 text-center">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
          Blog
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-950">
          Technické postupy a stavebné správy
        </h1>
        <p className="text-zinc-600 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          Praktické rady, technické postupy a skúsenosti zo stavieb, ktoré realizujeme.
        </p>
      </div>

      <BlogSection showSidebar hideHeader />
    </div>
  );
}
