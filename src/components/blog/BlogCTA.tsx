import React from 'react';
import Link from 'next/link';

export function BlogCTA() {
  return (
    <div className="bg-zinc-950 text-white rounded-xl p-8 sm:p-12 mt-16 text-center shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/10 opacity-30 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <div className="relative z-10">
        <h4 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
          Plánujete stavbu alebo rekonštrukciu?
        </h4>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Naši odborníci vám pripravia nezáväznú cenovú ponuku a pomôžu nájsť optimálne riešenie pre váš projekt. Staviame na detailoch a férovej cene.
        </p>
        <Link
          href="/kontakt"
          className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold uppercase tracking-widest rounded transition-colors cursor-pointer shadow-lg hover:shadow-amber-500/20"
        >
          Nezáväzná cenová ponuka
        </Link>
      </div>
    </div>
  );
}
