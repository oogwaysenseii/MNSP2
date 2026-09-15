import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import { Container } from '../ui/Container';
import { BUILDING_SERVICES } from '@/src/data/services';

const EASE = 'ease-[cubic-bezier(.22,.61,.36,1)]';

/**
 * Explicit stack rather than `font-mono`: --font-mono in globals.css resolves
 * through an undefined --font-jetbrains-mono, which makes the whole declaration
 * invalid at computed-value time, so `font-mono` silently renders as sans.
 */
const MONO = 'font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace]';

export function ServicesGrid({ showHeader = false }: { showHeader?: boolean }) {
  return (
    <section className=" bg-white mt-5 mb-15">
      <Container className="max-w-[1500px]">


          {showHeader && (
              <div className="mt-5 mb-2 flex flex-wrap items-end justify-between gap-6">
            <span className={`block ${MONO} text-xs font-bold uppercase
              tracking-[0.2em] text-[#b45309]`}>
              Naše služby
            </span>
                  <Link href="/sluzby"
                        className="group flex items-center whitespace-nowrap text-[13px] font-bold
                uppercase tracking-[0.14em] text-[#b45309] transition-colors hover:text-zinc-950">
                      Zobraziť všetky služby
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
              </div>
          )}


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BUILDING_SERVICES.map((sluzba, i) => (
            <Link
              key={sluzba.slug}
              href={`/sluzby/${sluzba.slug}`}
              /* `translate` is listed explicitly: Tailwind v4 compiles
                 -translate-y-1 to the standalone `translate` property, not to
                 `transform`, so a transition that names only `transform` lets
                 the lift snap while the shadow fades. Same fix as Projects.tsx.
                 The resting shadow matches the hover geometry at zero alpha so
                 only the colour interpolates. */
              className={`group/tile relative block transition-[transform,translate,box-shadow] duration-500 ${EASE}
                shadow-[0_22px_52px_rgba(0,0,0,0)]
                hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(0,0,0,0.19)]
                motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
            >
              <div className="relative h-[340px] overflow-hidden bg-gray-200">
                <Image
                  src={sluzba.imageUrl!}
                  alt={sluzba.name}
                  fill
                  /* Not the tile's width — object-cover on a box taller than the
                     photo scales by HEIGHT, so the browser paints
                     340 x sourceAspect = ~510px of image width and crops it.
                     20vw asked for ~288 and got a 384x256 file upscaled 1.33x
                     into a 340px-tall box, which is what read as low-res.
                     520px lands on the 640w candidate everywhere at DPR 1. */
                  sizes="520px"
                  /* 70 is NOT in next.config's images.qualities ([75, 90]); dev
                     serves it anyway but a production build answers 400. */
                  quality={90}
                  className={`object-cover transition-transform duration-[1100ms] ${EASE}
                    group-hover/tile:scale-[1.07] motion-reduce:transition-none`}
                />

                {/* poradové číslo — tieň, lebo pás je svetlý a fotka hore môže byť tiež */}
                <span className={`absolute left-4 top-4 z-30 ${MONO} text-[11px] font-bold
                  tracking-[0.2em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]`}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* označenie špecializácie — len tam, kde featured */}
                {sluzba.featured && (
                  <span
                    className="absolute right-3.5 top-3.5 z-30 flex h-[30px] w-[30px]
                      items-center justify-center bg-[#f68c05]"
                    title="Naša špecializácia"
                  >
                    <Star className="h-3.5 w-3.5 text-zinc-950" fill="currentColor" aria-hidden="true" />
                    <span className="sr-only">Naša špecializácia</span>
                  </span>
                )}

                {/* pás — pinned to the bottom, so it grows upward over the photo.
                    min-h twice (not h): 178px at rest, 229px on hover. Both are
                    minimums, so a longer description stretches the band instead
                    of overflowing; pinning the hover state too is what stops the
                    bands drifting 209–229px apart as the highlights wrap. */}
                <div className={`absolute inset-x-0 bottom-0 z-20 flex flex-col
                  min-h-[178px] group-hover/tile:min-h-[229px]
                  transition-[min-height] duration-[450ms] ${EASE}
                  bg-zinc-50/[0.92] px-[18px] py-4
                  motion-reduce:transition-none`}>
                  <span className="mb-2.5 block h-0.5 w-[26px] flex-none bg-[#b45309]" />

                  <h3 className="flex-none text-[17px] font-extrabold leading-[1.25]
                    tracking-[-0.01em] text-zinc-950">
                    {sluzba.name}
                  </h3>

                  <p className="mt-2.5 flex-none text-[13px] leading-[1.55] text-zinc-700">
                    {sluzba.description}
                  </p>

                  {/* MUSÍ byť div — na span sa max-height neuplatní */}
                  <div className={`max-h-0 flex-none overflow-hidden opacity-0
                    transition-[max-height,opacity,margin-top] duration-[450ms] ${EASE}
                    group-hover/tile:mt-2.5 group-hover/tile:max-h-[56px] group-hover/tile:opacity-100
                    motion-reduce:transition-none`}>
                    {sluzba.highlights.map((h) => (
                      <span key={h}
                        className={`relative block pl-3.5 ${MONO} text-[10px] uppercase
                          leading-[1.8] tracking-[0.1em] text-zinc-600
                          before:absolute before:left-0 before:top-2 before:h-px before:w-2
                          before:bg-[#b45309] before:content-['']`}>
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* riadok „Zobraziť" — mt-auto ho drží pri spodku pásu */}
                  <div className="mt-auto flex flex-none items-center justify-between
                    border-t border-zinc-300 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em]
                      text-zinc-950 transition-colors group-hover/tile:text-[#b45309]">
                      Zobraziť
                    </span>
                    {/* `translate`, not `transform` — see the note on the tile above. */}
                    <ArrowRight className={`h-4 w-4 text-zinc-950
                      transition-[color,translate] duration-300 ${EASE}
                      group-hover/tile:translate-x-1 group-hover/tile:text-[#b45309]
                      motion-reduce:transition-none motion-reduce:group-hover/tile:translate-x-0`} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </Container>
    </section>
  );
}
