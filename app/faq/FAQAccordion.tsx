'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_GROUPS } from '@/src/data/faq';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-6 space-y-12">
      {FAQ_GROUPS.map((group, gIdx) => (
        <div key={group.category}>
          <h2 className="text-xl font-display font-bold text-zinc-900 mb-6 pb-2 border-b border-zinc-200">
            {group.category}
          </h2>
          <div className="space-y-4">
            {group.questions.map((faq, qIdx) => {
              const id = `${gIdx}-${qIdx}`;
              const isOpen = openIndex === id;

              return (
                <div key={faq.q} className="border border-zinc-200 overflow-hidden bg-zinc-50">
                  <button
                    onClick={() => toggleAccordion(id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-bold text-zinc-900 text-sm sm:text-base pr-4">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-5 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
