import { blogPostsData } from '@/src/data/blog';
import { DOMAIN, COMPANY_NAME } from '@/src/lib/schema';

export async function GET() {
  const sortedPosts = [...blogPostsData].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${COMPANY_NAME} Blog</title>
    <link>${DOMAIN}/blog</link>
    <description>Odborné články a rady pre stavby a rekonštrukcie.</description>
    <language>sk-SK</language>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml"/>
    ${sortedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${DOMAIN}/blog/${post.id}</link>
      <guid isPermaLink="true">${DOMAIN}/blog/${post.id}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author><![CDATA[${post.author && typeof post.author === 'object' ? post.author.name : post.author || "MNSP Odborný Tím"}]]></author>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
