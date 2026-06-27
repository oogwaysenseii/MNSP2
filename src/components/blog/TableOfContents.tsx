'use client';

import React, { useEffect, useState } from 'react';
import GithubSlugger from 'github-slugger';
import { ChevronDown, ChevronRight, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents({ content, isDesktop = false }: { content: string, isDesktop?: boolean }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(isDesktop);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const slugger = new GithubSlugger();
    const headings: TocItem[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        // Strip markdown links if any for TOC text
        const titleText = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').trim();
        const id = slugger.slug(titleText);
        headings.push({ id, title: titleText, level });
      }
    }
    setItems(headings);
  }, [content]);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      let currentActiveId = items[0]?.id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top < 100) {
          currentActiveId = item.id;
        }
      }
      setActiveId(currentActiveId || '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for fixed header if any
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-sm mb-8">
      {/* Mobile Header (Toggle) */}
      <button 
        className="w-full lg:hidden flex items-center justify-between p-4 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-zinc-900 font-display">Obsah článku</span>
        </div>
        {isOpen ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
      </button>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center gap-2 p-5 border-b border-zinc-100 bg-white">
        <List className="w-5 h-5 text-amber-600" />
        <span className="font-bold text-zinc-900 font-display text-lg">Obsah článku</span>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:!h-auto lg:!opacity-100"
          >
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} style={{ marginLeft: item.level === 3 ? '1rem' : '0' }}>
                    <a 
                      href={`#${item.id}`} 
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`block text-sm transition-colors ${
                        activeId === item.id 
                          ? 'text-amber-600 font-bold' 
                          : 'text-zinc-600 hover:text-amber-600'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
