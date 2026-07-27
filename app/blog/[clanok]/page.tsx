import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPostsData } from '@/src/data/blog';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { DOMAIN, COMPANY_NAME } from '@/src/lib/schema';
import { ShareButtons } from '@/src/components/blog/ShareButtons';
import { BlogSidebarContact } from '@/src/components/blog/BlogSidebarContact';
import { AuthorBox } from '@/src/components/blog/AuthorBox';
import { RelatedArticles } from '@/src/components/blog/RelatedArticles';
import { RelatedServices } from '@/src/components/blog/RelatedServices';
import { BlogCTA } from '@/src/components/blog/BlogCTA';
import { extractFAQ, getWordCount, calculateReadingTime } from '@/src/lib/blogUtils';
import { autoLinkKeywords } from '@/src/lib/blogAutoLink';

interface BlogPostPageProps {
  params: Promise<{ clanok: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPostsData.find((p) => p.id === resolvedParams.clanok);
  
  if (!post) {
    return {};
  }

  return getSEOTags({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.id}`,
    imageUrl: post.imageUrl,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: 'MNSP',
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  // Sort posts by publishedAt descending to determine prev/next
  const sortedPosts = [...blogPostsData].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const postIndex = sortedPosts.findIndex((p) => p.id === resolvedParams.clanok);
  const post = sortedPosts[postIndex];

  if (!post) {
    notFound();
  }

  const nextPost = postIndex > 0 ? sortedPosts[postIndex - 1] : null;
  const prevPost = postIndex < sortedPosts.length - 1 ? sortedPosts[postIndex + 1] : null;

  const url = `${DOMAIN}/blog/${post.id}`;
  
  // Content Processing
  const rawContent = post.content;
  const linkedContent = autoLinkKeywords(rawContent);
  const wordCount = getWordCount(rawContent);
  const readTime = calculateReadingTime(rawContent);
  
  const faqs = extractFAQ(rawContent);

  const authorSchema = post.author && typeof post.author === 'object' 
    ? { "@type": "Person", "name": post.author.name, "url": post.author.url }
    : { "@type": "Organization", "name": post.author || "MNSP Odborný Tím" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt ?? post.publishedAt,
    "author": authorSchema,
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/logo.png`
      }
    },
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "isPartOf": {
      "@type": "Blog",
      "name": "MNSP Blog"
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": wordCount,
    "inLanguage": "sk-SK",
    "articleBody": rawContent,
    "about": {
      "@type": "Thing",
      "name": post.category
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Domov", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": url }
    ]
  };

  let faqJsonLd = null;
  if (faqs.length > 0) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      
      <div className="bg-white text-zinc-900 py-16 sm:py-24 border-t border-zinc-200">
        <div className="max-w-[1500px] mx-auto px-6 space-y-8">
          
          {/* BREADCRUMBS */}
          <nav className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link href="/" className="hover:text-amber-600 transition-colors">Domov</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/blog" className="hover:text-amber-600 transition-colors">Blog</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 truncate">{post.title}</span>
          </nav>

          {/* POST HEADER CONTAINER */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center text-xs font-mono font-bold tracking-wider text-zinc-400 border-b border-zinc-100 pb-4">
              <span className="text-amber-600 uppercase bg-amber-50 px-2.5 py-1 ">{post.category}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {wordCount} slov</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-zinc-500 text-lg leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* LARGE PHOTO IMMERSE */}
          <div className="relative aspect-[21/9] overflow-hidden border border-zinc-200 shadow-md">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start mt-12">
            
            {/* STICKY SIDEBAR CONTACT */}
            <div className="order-2 lg:order-1 lg:col-span-4 sticky top-32 w-full">
              <BlogSidebarContact />
            </div>

            {/* MAIN CONTENT */}
            <div className="order-1 lg:order-2 lg:col-span-8 w-full">

              {/* EDITORIAL REVIEWS CONTENT MULTI PARAGRAPHS */}
              <div className="prose max-w-none text-zinc-800 text-sm sm:text-base leading-relaxed font-sans prose-headings:font-display prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline  prose-img:shadow-sm">
                <div className="markdown-body">
                  <Markdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor-link'] } }]
                    ]}
                    components={{
                      img: ({node, ...props}) => (
                        <span className="relative block w-full aspect-video my-8 overflow-hidden bg-zinc-100 border border-zinc-200">
                          <Image 
                            src={String(props.src || '')} 
                            alt={String(props.alt || '')} 
                            fill 
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, 800px" 
                          />
                        </span>
                      )
                    }}
                  >
                    {linkedContent}
                  </Markdown>
                </div>
              </div>

              {/* SHARE BUTTONS */}
              <ShareButtons url={url} title={post.title} />

              {/* TAGS */}
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tg) => (
                  <span key={tg} className="px-3.5 py-1 bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-600 ">
                    #{tg}
                  </span>
                ))}
              </div>

              {/* AUTHOR BOX */}
              <AuthorBox />

            </div>
          </div>

          {/* RELATED SERVICES & ARTICLES */}
          <div className="pt-16">
            <RelatedServices content={rawContent} tags={post.tags} />
            <RelatedArticles currentPostId={post.id} category={post.category} tags={post.tags} allPosts={blogPostsData} />
          </div>

          {/* PREVIOUS / NEXT ARTICLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-zinc-200">
            {prevPost ? (
              <Link href={`/blog/${prevPost.id}`} className="group p-6 bg-zinc-50 border border-zinc-200  hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left">
                <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider mb-2 block flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Predchádzajúci článok
                </span>
                <h4 className="font-bold text-zinc-900 group-hover:text-amber-700 transition-colors line-clamp-2">{prevPost.title}</h4>
              </Link>
            ) : <div />}
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.id}`} className="group p-6 bg-zinc-50 border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-right">
                <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider mb-2 block flex justify-end items-center gap-1">
                  Nasledujúci článok <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <h4 className="font-bold text-zinc-900 group-hover:text-amber-700 transition-colors line-clamp-2">{nextPost.title}</h4>
              </Link>
            ) : <div />}
          </div>

          {/* CTA */}
          <BlogCTA />

        </div>
      </div>
    </>
  );
}
