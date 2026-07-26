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
      <section className="bg-white relative border-t border-white/5">
        <div className=" mx-auto px-6  relative z-10">
          <div className="bg-zinc-950 border border-white/10 p-8  flex flex-col lg:flex-row gap-16 lg:gap-20 items-center w-full">

            {/* Left Column - Text */}
            <div className="w-full lg:w-[60%] space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
                  {title}
                </h2>
                <p className="text-amber-500 font-medium text-lg leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              </div>
              {description && (
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
                    {description}
                  </p>
              )}
            </div>

            {/* Right Column - Form Container */}
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-6 relative shadow-2xl w-full lg:w-[40%]">
              <SimpleContactForm pageName={pageName} />
            </div>

          </div>
        </div>
      </section>
  );
}
