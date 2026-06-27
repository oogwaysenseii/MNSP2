import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/src/types';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
  currentPostId: string;
  category: string;
  tags: string[];
  allPosts: BlogPost[];
}

export function RelatedArticles({ currentPostId, category, tags, allPosts }: RelatedArticlesProps) {
  // Find related articles based on category or tags
  let related = allPosts.filter(p => 
    p.id !== currentPostId && 
    (p.category === category || p.tags.some(t => tags.includes(t)))
  );

  // If not enough related, fallback to newest
  if (related.length < 3) {
    const others = allPosts.filter(p => p.id !== currentPostId && !related.includes(p));
    related = [...related, ...others].slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200">
      <h2 className="text-2xl font-display font-bold text-zinc-950 mb-8">Súvisiace články</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map(post => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group block">
            <div className="relative h-48 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              <Image 
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors leading-tight mb-2">
              {post.title}
            </h3>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-900 group-hover:text-amber-600 transition-colors">
              Čítať ďalej <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
