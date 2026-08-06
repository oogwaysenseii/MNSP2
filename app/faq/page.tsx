import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';
import { FAQ_FLAT } from '@/src/data/faq';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, generateFaqSchema } from '@/src/lib/schema';
import { CTA } from '@/src/components/sections/CTA';

// This page previously hardcoded `title: 'Často kladené otázky | STAVMAT'` —
// a different company's name — and bypassed getSEOTags entirely, so it had no
// canonical, no OG tags and no Twitter card.
export const metadata: Metadata = getSEOTags(
  'Často kladené otázky',
  'Odpovede na najčastejšie otázky o stavbe domu na kľúč, rekonštrukciách, povoleniach, termínoch, cenách a záruke.',
  '/faq',
);

export default function FAQPage() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Časté otázky', path: '/faq' },
    ]),
    generateFaqSchema(FAQ_FLAT),
  ];

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-10 text-zinc-900 border-t border-zinc-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1500px] mx-auto px-6 mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 uppercase">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Domov
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-800 font-bold">Časté otázky</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight mb-6">
          Často kladené otázky
        </h1>
        <p className="text-zinc-600 text-lg leading-relaxed max-w-3xl">
          Odpovede na to, na čo sa nás klienti pýtajú najčastejšie — priebeh výstavby
          a rekonštrukcií, povolenia, termíny, cenotvorba a záruka. Ak tú svoju otázku
          nenájdete, zavolajte nám.
        </p>
      </div>

      <FAQAccordion />

      <div className="mt-16">
        <CTA pageName="Časté otázky" />
      </div>
    </div>
  );
}
