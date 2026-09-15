"use client";

import { SimpleContactForm } from '../ui/SimpleContactForm';

export interface CTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
  pageName?: string;
}

export function CTA({
  title = "Plánujete stavbu či rekonštrukciu?",
  subtitle = "Vypracujeme vám detailnú cenovú ponuku, vďaka ktorej získate úplný prehľad o nákladoch a platobných podmienkach.",
  description = "Stačí ak nám zanecháte vaše údaje a my vás budeme kontaktovať.",
  eyebrow = "Nezáväzná cenová ponuka",
  pageName = "Neznáma stránka",
}: CTAProps) {
  return (
    <section className="bg-white ">
      {/* Same padding scale as <Container>, so the card's left edge lines up
          with the projects section above it. */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col gap-7 overflow-hidden bg-zinc-950
          px-10 py-10 sm:px-10 lg:flex-row lg:items-center lg:gap-16">

          {/* Background shapes — wedge plus three slanted hairlines.
              z-[1] keeps them under both columns (z-[3]); as an absolutely
              positioned sibling that comes first in source order, the wedge
              would otherwise paint over the form. pointer-events-none stops
              the layer stealing clicks from the fields. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
            <span className="absolute inset-y-0 right-0 w-[46%]
              [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]
              bg-[linear-gradient(115deg,transparent_0%,rgba(245,158,11,0.13)_55%,rgba(245,158,11,0.03)_100%)]" />
            <span className="absolute -top-[30%] right-[34%] h-[160%] w-px rotate-[18deg] bg-white/[0.07]" />
            <span className="absolute -top-[30%] right-[28%] h-[160%] w-px rotate-[18deg] bg-amber-500/20" />
            <span className="absolute -top-[30%] right-[20%] h-[160%] w-px rotate-[18deg] bg-white/[0.07]" />
          </div>

          {/* Text */}
          <div className="relative z-[3] w-full lg:w-[57%]">
            {/* Explicit stack, not `font-mono`: --font-mono in globals.css points at
                an undefined --font-jetbrains-mono, so the whole declaration is
                invalid and font-mono silently renders as sans. */}
            <span className="block font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              {eyebrow}
            </span>

            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.08] tracking-[-0.028em]
              text-white lg:text-[38px]">
              {title}
            </h2>

            <p className="mt-5 max-w-[34rem] border-l-2 border-amber-500 pl-[18px]
              text-base font-medium leading-[1.55] text-amber-500">
              {subtitle}
            </p>

            {description && (
              <p className="mt-4 max-w-[32rem] text-[13.5px] leading-[1.6] text-zinc-400">
                {description}
              </p>
            )}
          </div>

          {/* Form */}
          <div className="relative z-[3] w-full lg:w-[43%]">
            <SimpleContactForm pageName={pageName} />
          </div>

        </div>
      </div>
    </section>
  );
}
