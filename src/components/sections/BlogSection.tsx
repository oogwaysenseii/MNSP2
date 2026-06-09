"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { blogPostsData } from '@/src/data/blog';

interface BlogSectionProps {
  filterCategory?: string;
  hideFilters?: boolean;
  showSidebar?: boolean;
  title?: string;
  subtitle?: string;
  badge?: string;
  compact?: boolean;
}

export default function BlogSection({ filterCategory, hideFilters, showSidebar, title, subtitle, badge, compact }: BlogSectionProps) {
  // Collect all distinct tags from our post lists
  const allTags = ['all', ...Array.from(new Set(blogPostsData.flatMap((post) => post.tags)))];

  // If a filter category related to the service is provided, try to match it against tags
  const [selectedTag, setSelectedTag] = useState<string | 'all'>(filterCategory && allTags.includes(filterCategory) ? filterCategory : 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering filter cascade logic
  const filteredPosts = blogPostsData.filter((post) => {
    // If we are strictly filtering by a provided category on a service page:
    if (filterCategory && compact) {
      if (!post.tags.includes(filterCategory)) return false;
    } else if (filterCategory && hideFilters) {
      if (!post.tags.includes(filterCategory)) return false;
    } else {
      const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
      if (!matchesTag) return false;
    }
    
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (compact) {
    return (
      <div className="mx-auto px-6  border-t border-zinc-200 pt-16 max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-amber-500 tracking-wider uppercase block">
              {badge || "NÁŠ BLOG"}
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-950 tracking-tight">
              {title || "Zistite viac o našich postupoch"}
            </h4>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors items-center gap-1"
          >
            Všetky články <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block bg-zinc-50 overflow-hidden border border-zinc-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h5 className="font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h5>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          
          {/* TOP HEADER */}
          <div className="space-y-4 text-center">
            <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
              {badge || 'STAVEBNÝ ŽURNÁL APEX'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-950">
              {title || 'Technické postupy a stavebné správy'}
            </h2>
            <p className="text-zinc-650 text-sm max-w-xl mx-auto">
              {subtitle || 'Prečítajte si odborné materiály písané priamo našimi statikmi, inžiniermi a tými najskúsenejšími stavbyvedúcimi.'}
            </p>
          </div>

          {/* SEARCH AND TAG FILTER ROW (Only shown if no sidebar and filters are not hidden) */}
          {!hideFilters && !showSidebar && (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-zinc-150 py-6 mb-12">
              
              {/* Tag Selection Pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide capitalize cursor-pointer transition-colors ${
                      selectedTag === tag
                        ? 'bg-zinc-950 text-amber-400 font-bold'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border border-zinc-200/50'
                    }`}
                  >
                    {tag === 'all' ? ('Všetky články') : tag}
                  </button>
                ))}
              </div>

              {/* Styled Search Input */}
              <div className="relative w-full md:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder={'Hľadať v článkoch...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-950 rounded text-xs text-zinc-900 outline-none transition-all"
                />
              </div>

            </div>
          )}

          {/* MAIN CONTENT AREA WITH OPTIONAL SIDEBAR */}
          <div className={`flex flex-col ${showSidebar ? 'lg:flex-row' : ''} gap-12`}>
            
            {/* CARDS LISTING BLOCK */}
            <div className={showSidebar ? 'lg:w-2/3' : 'w-full'}>
              {filteredPosts.length === 0 ? (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-16 text-center text-zinc-500">
                  <p className="text-sm font-semibold">
                    {'Nenašli sa žiadne články zodpovedajúce zadaným slovám.'}
                  </p>
                </div>
              ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 ${!showSidebar ? 'lg:grid-cols-3' : ''} gap-8 ${hideFilters && showSidebar === false ? 'mt-12' : ''}`}>
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-xl border border-zinc-150 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <Link href={`/blog/${post.id}`} className="block h-full flex flex-col justify-between">
                        <div>
                          {/* Static banner photo */}
                          <div className="h-52 overflow-hidden bg-zinc-100">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-300"
                            />
                          </div>

                          {/* Text info and timestamps */}
                          <div className="p-6 space-y-4">
                            <div className="flex gap-4 items-center text-[10px] font-mono font-bold tracking-wider text-zinc-400">
                              <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded font-bold uppercase">{post.category}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-display font-extrabold text-zinc-950 leading-tight tracking-tight group-hover:text-amber-600 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-zinc-650 text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Footer button */}
                        <div className="p-6 pt-0 border-t border-zinc-100 mt-6 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>

                          <span className="font-mono text-[10px] font-extrabold text-zinc-950 group-hover:text-amber-600 uppercase flex items-center gap-1 cursor-pointer">
                            {'Prečítať článok'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            {showSidebar && (
              <div className="lg:w-1/3 space-y-10 lg:pl-10 lg:border-l border-zinc-150">
                
                {/* Sidebar Search */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold font-display uppercase tracking-widest text-zinc-950">
                    Vyhľadávanie
                  </h3>
                  <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder={'Hľadať v článkoch...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-950 rounded text-sm text-zinc-900 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Sidebar Tags */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold font-display uppercase tracking-widest text-zinc-950">
                    Kategórie
                  </h3>
                  <div className="flex flex-col gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-left px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                          selectedTag === tag
                            ? 'bg-zinc-950 text-white'
                            : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                        }`}
                      >
                        {tag === 'all' ? ('Všetky články') : tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar CTA */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-500/20 space-y-4">
                    <h4 className="text-sm font-bold text-amber-900">Máte projekt na diskusiu?</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Kontaktujte našich inžinierov a získajte bezplatnú konzultáciu ohľadom stavebných postupov a normatív.
                    </p>
                    <a href="/kontakt" className="inline-block mt-2 text-xs font-bold text-amber-900 uppercase tracking-widest hover:text-amber-700">
                      Kontaktovať tím &rarr;
                    </a>
                </div>
              </div>
            )}
            
          </div>

        </motion.div>

      </div>
    </div>
  );
}
