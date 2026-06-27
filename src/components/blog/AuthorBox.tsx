import React from 'react';
import Image from 'next/image';

export function AuthorBox() {
  return (
    <div className="mt-12 p-6 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div className="relative w-20 h-20 shrink-0">
        <Image 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" 
          alt="MNSP Odborník"
          fill
          className="rounded-full object-cover border-2 border-amber-500"
          sizes="80px"
        />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-zinc-950">MNSP Odborný Tím</h3>
        <p className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider mb-3">Stavebná a projekčná spoločnosť</p>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Sme tím certifikovaných inžinierov, projektantov a majstrov remesla z MNSP | Stavby a rekonštrukcie. Pomáhame našim klientom budovať ich vysnívané domovy a odovzdávame dlhoročné know-how pre bezpečné a udržateľné bývanie.
        </p>
      </div>
    </div>
  );
}
