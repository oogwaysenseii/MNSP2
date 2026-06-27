import React from 'react';
import Link from 'next/link';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';

export const metadata = {
  title: 'Často kladené otázky | STAVMAT',
  description: 'Odpovede na najčastejšie otázky ohľadom stavebných prác a našich služieb.',
};

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-24 text-zinc-900 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto px-6 mb-12 sm:mb-16">
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
        <p className="text-zinc-600 text-lg leading-relaxed">
          Pripravili sme pre vás odpovede na najčastejšie otázky týkajúce sa našich služieb, priebehu výstavby a cenotvorby. Ak ste nenašli odpoveď na vašu otázku, neváhajte nás kontaktovať.
        </p>
      </div>

      <FAQAccordion />

      <div className="max-w-3xl mx-auto px-6 mt-16">
        <div className="bg-zinc-50 border border-zinc-200 p-8 text-center rounded-xl">
          <MessageSquare className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-zinc-900 mb-2">
            Máte ďalšie otázky?
          </h2>
          <p className="text-zinc-600 mb-6">
            Radi s vami preberieme váš projekt osobne alebo telefonicky.
          </p>
          <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-950 text-white font-bold text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors shadow-lg">
            Kontaktujte nás
          </Link>
        </div>
      </div>
    </div>
  );
}
