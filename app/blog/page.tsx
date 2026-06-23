import BlogSection from '@/src/components/sections/BlogSection';
import { generateLocalBusinessSchema } from '@/src/lib/schema';
import { blogPostsData } from '@/src/data/blog';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  "Blog",
  "Odborné články a rady zo sveta stavebníctva a rekonštrukcií.",
  "/blog"
);

export default function BlogPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      generateLocalBusinessSchema(),
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Domov",
            "item": "https://www.mnsp.sk"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.mnsp.sk/blog"
          }
        ]
      },
      ...blogPostsData.map(post => ({
        "@type": "BlogPosting",
        "@id": `https://www.mnsp.sk/blog#${post.id}`,
        "headline": post.title,
        "image": post.imageUrl,
        "datePublished": "2024-03-15T08:00:00+01:00",
        "dateModified": "2024-03-15T08:00:00+01:00",
        "author": {
          "@type": "Person",
          "name": "Marek Nosáľ"
        },
        "publisher": {
          "@id": "https://www.mnsp.sk/#organization"
        }
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BlogSection showSidebar={true} />
    </>
  );
}
