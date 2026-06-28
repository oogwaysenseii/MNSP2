"use client";

import { SimpleContactForm } from '../ui/SimpleContactForm';

export interface CTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  pageName?: string;
}

export function CTA({ 
  title = "Plánujete stavbu či rekonštrukciu ?",
  subtitle = "Vypracujeme vám detailnú cenovú ponuku, vďaka ktorej získate úplný prehľad o nákladoch a platobných podmienkach pre váš projekt.",
  description = "Stačí ak nám zanecháte vaše údaje a my vás budeme kontaktovať.",
  pageName = "Neznáma stránka"
}: CTAProps) {
  return (
    <section className="bg-zinc-950 py-10 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-stone-900/10 opacity-30 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column - Text */}
          <div className="space-y-12 ">
            <div className="space-y-6">
              {/* Title with subtle gradient and modern tracking */}
              <h2 className="text-2xl  font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-zinc-400 leading-[1.15] tracking-tight whitespace-pre-wrap">
                {title}
              </h2>

              {/* Subtitle with a premium, muted champagne gold and a sleek accent border */}
              <p className="text-amber-500/90 font-medium text-base  pl-4 border-l-2 border-amber-500/30 leading-relaxed whitespace-pre-wrap transition-colors group-hover:border-amber-500/60 duration-500">
                {subtitle}
              </p>

              {/* Description with high-readability text color and generous tracking */}
              <p className="text-white text-sm  leading-relaxed tracking-wide whitespace-pre-wrap font-light opacity-90">
                {description}
              </p>
            </div>
          </div>

          {/* Right Column - Form Container */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-6 relative shadow-2xl">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none opacity-50" />
            <SimpleContactForm pageName={pageName} />
          </div>

        </div>
      </div>
    </section>
  );
}
