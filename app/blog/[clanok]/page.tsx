import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, BookmarkCheck } from 'lucide-react';
import { blogPostsData } from '@/src/data/blog';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ clanok: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPostsData.find((p) => p.id === resolvedParams.clanok);
  
  if (!post) {
    return {};
  }

  return getSEOTags(
    post.title,
    post.excerpt,
    `/blog/${post.id}`
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPostsData.find((p) => p.id === resolvedParams.clanok);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.imageUrl,
    "datePublished": "2024-03-15T08:00:00+01:00",
    "dateModified": "2024-03-15T08:00:00+01:00",
    "author": {
      "@type": "Person",
      "name": "Marek Nosáľ"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MNSP"
    },
    "description": post.excerpt
  };

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
        />
      <div className="bg-white text-zinc-900 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        
        {/* EXIT TO LIST OVERLAY */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-950 uppercase border border-zinc-200 px-4 py-2.5 rounded hover:bg-neutral-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {'Späť na zoznam článkov'}
        </Link>

        {/* POST HEADER CONTAINER */}
        <div className="space-y-4">
          <div className="flex gap-4 items-center text-xs font-mono font-bold tracking-wider text-zinc-400 border-b border-zinc-100 pb-4">
            <span className="text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded">{post.category}</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-zinc-500 italic text-sm sm:text-base leading-relaxed">
            "{post.excerpt}"
          </p>
        </div>

        {/* LARGE PHOTO IMMERSE */}
        <div className="aspect-[21/9] rounded-xl overflow-hidden border border-zinc-200">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* EDITORIAL REVIEWS CONTENT MULTI PARAGRAPHS */}
        <div className="prose max-w-none text-zinc-800 space-y-6 text-sm sm:text-base leading-relaxed font-sans">
          {post.content.map((pText, pIdx) => (
            <p key={pIdx}>
              {pText}
            </p>
          ))}
        </div>

        {/* FLOOR TAGS AND CITATIONS */}
        <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tg) => (
              <span key={tg} className="px-3.5 py-1 bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-600 rounded">
                #{tg}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase">
              {'OVERENÁ INŽINIERSKA ŠTÚDIA'}
            </span>
          </div>
        </div>

        {/* BOTTOM FOOTER CALL WRAPPER */}
        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 space-y-4 mt-12 text-center sm:text-left">
          <h4 className="text-sm font-bold font-display text-zinc-950">
            {'Zaujali vás naše stavebné postupy?'}
          </h4>
          <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">
            {'Náš projekčný a stavebný tím zaistí kompletné posúdenie stavby, statický prepočet a geologický prieskum podložia pre váš budúci zámis.'}
          </p>
          <Link
            href="/blog"
            className="inline-block px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            {'Vrátiť sa ku všetkým článkom'}
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
