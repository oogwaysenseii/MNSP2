"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { projectsData, ServiceCategory, Project } from '@/src/data/projects';
import { Container } from '../ui/Container';

interface ProjectsSectionProps {
  defaultCategory?: ServiceCategory | 'all';
  hideFilters?: boolean;
  /** Slimmer filter bar: category chips only, no row labels and no location row. Used on the homepage. */
  compactFilters?: boolean;
  titleSk?: string;
  subtitleSk?: string;
  viewMode?: 'carousel' | 'grid';
  /** Suppress the built-in h2 header (caller renders its own heading). */
  hideHeader?: boolean;

  locationFilter?: string;
  /**
   * Restrict the grid to specific projects, by id. Used by city pages to show
   * real work done in that town instead of the same site-wide grid that
   * already appears on the parent service page.
   */
  onlyIds?: string[];
}


const CATEGORY_TABS = [
  'all',
  'Rodinné domy',
  'Rezidenčné budovy',
  'Komerčná výstavba',
  'Priemyselné objekty',
  'Občianske stavby',
] as const satisfies readonly (ServiceCategory | 'all')[];


/**
 * Budget and duration are optional in the project data — six of eleven entries
 * still have them empty (`TODO: doplniť`). ProjectTile drops missing values
 * along with their separator, so a tile without them keeps the same height.
 */
const EASE = 'ease-[cubic-bezier(.22,.61,.36,1)]';

function ProjectTile({ proj, index, sizes }: {
  proj: Project; index: number; sizes: string;
}) {
  // Chýbajúce hodnoty vypadnú aj s oddeľovačom — preto .filter()
  const meta = [
    proj.location,
    `Rok ${proj.year}`,
    proj.budgetString,
    proj.duration,
  ].filter((v): v is string => Boolean(v && v.trim()));

  return (
    <Link
      href={`/portfolio/${proj.id}`}
      className={`group/tile relative block transition-[transform,translate,box-shadow] duration-500 ${EASE}
        shadow-[0_22px_52px_rgba(0,0,0,0)]
        hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(0,0,0,0.19)]
        motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      <div className="relative h-[340px] lg:h-[400px] overflow-hidden bg-gray-200">
        <Image
          src={proj.imageUrl}
          alt={proj.title}
          fill
          sizes={sizes}
          quality={90}
          className={`object-cover duration-[1100ms] transition-transform ${EASE}
            group-hover/tile:scale-[1.07] motion-reduce:transition-none`}
        />

        {/* stmavenie zdola */}
        <div className="absolute inset-0 transition-opacity duration-500
          bg-[linear-gradient(to_top,rgba(0,0,0,.9)_0%,rgba(0,0,0,.5)_32%,transparent_62%)]
          group-hover/tile:opacity-[0.92]" />

        {/* poradové číslo + jantárová linka */}
        <div className="absolute top-[18px] left-5 z-20">
          <span className="block font-mono text-[11px] font-bold tracking-[0.2em] text-white/[0.78]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`mt-[7px] block h-0.5 w-[22px] bg-amber-500
            transition-[width] duration-[550ms] ${EASE} group-hover/tile:w-[54px]`} />
        </div>

        {/* text na fotke */}
        <div className="absolute bottom-5 left-[22px] right-[22px] z-20">
          <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500">
            {proj.category}
          </span>

          <h3 className="mt-[9px] text-[18px] lg:text-[clamp(17px,1.45vw,21px)] font-extrabold leading-[1.26] tracking-[-0.015em] text-white">
            {proj.title}
          </h3>

          <p className="mt-[11px] font-mono text-[10px] uppercase leading-[1.5] tracking-[0.13em] text-white/[0.74]">
            {meta.map((v, i) => (
              <span key={v}>
                {i > 0 && <span className="px-1.5 text-white/[0.34]">·</span>}
                {v}
              </span>
            ))}
          </p>

          {/* „Zobraziť" — vysunie sa pri prejdení myšou */}
          <div className={`max-h-0 overflow-hidden opacity-0
            transition-[max-height,opacity,margin-top] duration-500 ${EASE}
            group-hover/tile:mt-[13px] group-hover/tile:max-h-[34px] group-hover/tile:opacity-100`}>
            <span className="inline-flex items-center gap-[7px] border-b border-amber-500 pb-1.5
              font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              Zobraziť <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Projects({
                           defaultCategory = 'all',
                           hideFilters = false,
                           compactFilters = false,
                           titleSk = 'Realizované projekty',
                           subtitleSk = 'Prehľad zrealizovaných a prebiehajúcich projektov.',
                           viewMode = 'carousel',
                           locationFilter = 'all',
                           hideHeader = false,
                           onlyIds,
                         }: ProjectsSectionProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>(defaultCategory);
  const [selectedLoc, setSelectedLoc] = useState<string>(locationFilter);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Tailwind motion-reduce: pokrýva len CSS prechody. Nábeh dlaždíc riadi JS,
  // takže sa musí vypnúť zvlášť — inak sa pri obmedzení pohybu stále hýbe.
  const reduceMotion = useReducedMotion();
  const reveal = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = carouselRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  // Po zmene filtra vrátiť rad na začiatok a prepočítať šípky. Sleduje sa
  // priamo selectedCategory/selectedLoc — pri prepnutí medzi kategóriami s
  // rovnakým počtom projektov by sa filteredProjects.length nezmenila.
  useEffect(() => {
    const el = carouselRef.current;
    if (el) el.scrollLeft = 0;
    updateArrows();
  }, [selectedCategory, selectedLoc]);

  // useState only reads its initial value once, so keep it in sync when the
  // prop changes on a client-side navigation.
  useEffect(() => setSelectedCategory(defaultCategory), [defaultCategory]);
  useEffect(() => setSelectedLoc(locationFilter), [locationFilter]);

  // Extract unique locations from projects
  const allLocations = Array.from(
    new Set(projectsData.map((proj) => proj.location?.trim()).filter(Boolean)),
  ).sort();

  // Filter project arrays based on toggle buttons
  const filteredProjects = projectsData.filter((proj) => {
    // An explicit id list wins over the category/location toggles.
    if (onlyIds) return onlyIds.includes(proj.id);

    const projLocation = proj.location;

    // Check Category
    if (selectedCategory !== 'all' && proj.category !== selectedCategory) {
      return false;
    }

    // Check Location
    if (selectedLoc !== 'all') {
      const locLower = selectedLoc.toLowerCase();
      const projLocLower = projLocation?.toLowerCase() || '';
      // Also match slugs (e.g., 'banska-bystrica' against 'Banská Bystrica')
      const slugMatch = locLower.replace(/-/g, ' ');
      // remove diacritics for slug match
      const normalizeStr = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (projLocLower !== locLower && !normalizeStr(projLocLower).includes(normalizeStr(slugMatch))) {
        return false;
      }
    }

    return true;
  });

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getCategoryLabel = (cat: string) => {
    return cat;
  };

  return (
      <section id="portfolio-container" className="py-10 bg-white overflow-hidden">
        <Container className="max-w-[1500px]">

          {/* HEADER TOP ROW */}
          {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">{titleSk}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl text-lg">
                {subtitleSk}
              </p>
            </div>

            {viewMode === 'carousel' && (
                <Link
                    href={`/portfolio?category=${selectedCategory}`}
                    className="mt-6 md:mt-0 text-sm tracking-widest font-bold uppercase transition-colors shrink-0 text-amber-700 hover:text-black flex items-center group"
                >
                  Všetky projekty
                  <ChevronRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                </Link>
            )}
          </div>
          )}

          {/* 2. DYNAMIC INDUSTRY FILTER BAR */}
          {!hideFilters && (
              <div className="flex flex-col gap-5 mb-10 border-b border-gray-100 pb-6 overflow-hidden">
                {/* Categories */}
                <div>
                  {!compactFilters && (
                      <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 mb-2.5">
                        TYP STAVBY
                      </span>
                  )}
                  <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {CATEGORY_TABS.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`relative shrink-0 px-5 py-2.5 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-black text-amber-400 font-bold'
                                    : 'bg-white text-gray-600 font-semibold border border-gray-300 hover:border-black hover:text-black'
                            }`}
                        >
                          {selectedCategory === cat && (
                              <span
                                  aria-hidden="true"
                                  className="absolute top-0 left-0 w-0 h-0 border-t-8 border-r-8 border-t-amber-500 border-r-transparent"
                              />
                          )}
                          {cat === 'all' ? ('Všetky realizácie') : cat}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                {!compactFilters && (
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-gray-400 mb-2.5">
                    LOKALITA
                  </span>
                  <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
                    <button
                        onClick={() => setSelectedLoc('all')}
                        className={`shrink-0 px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-all cursor-pointer border ${
                            selectedLoc === 'all'
                                ? 'bg-gray-50 text-black font-bold border-black border-l-[3px] border-l-amber-500'
                                : 'bg-transparent text-gray-500 font-semibold border-gray-200 hover:border-gray-400 hover:text-gray-700'
                        }`}
                    >
                      Všetky lokality
                    </button>
                    {allLocations.filter(Boolean).map((loc) => (
                        loc && <button
                            key={loc}
                            onClick={() => setSelectedLoc(loc)}
                            className={`shrink-0 px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-all cursor-pointer border ${
                                selectedLoc === loc
                                    ? 'bg-gray-50 text-black font-bold border-black border-l-[3px] border-l-amber-500'
                                    : 'bg-transparent text-gray-500 font-semibold border-gray-200 hover:border-gray-400 hover:text-gray-700'
                            }`}
                        >
                          {loc}
                        </button>
                    ))}
                  </div>
                </div>
                )}
              </div>
          )}

          {/* 3. MAIN CAROUSEL OR GRID CONTAINER */}
          <div className="relative">
            {filteredProjects.length === 0 ? (
                <div className="bg-white border border-gray-200 p-16 text-center">
                  <p className="text-gray-500 text-sm font-semibold">Momentálne nemáme v tejto kategórii žiadne dokončené projekty.</p>
                </div>
            ) : viewMode === 'carousel' ? (
                <div className="relative">
                  <button
                    onClick={scrollLeft}
                    disabled={atStart}
                    aria-label="Predchádzajúce projekty"
                    className="absolute left-3 top-[185px] z-30 hidden h-[46px] w-[46px] cursor-pointer
                      items-center justify-center border border-gray-200 bg-white text-gray-600
                      shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-colors
                      hover:border-amber-500 hover:bg-amber-50 hover:text-black
                      disabled:pointer-events-none disabled:opacity-30 lg:flex"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={scrollRight}
                    disabled={atEnd}
                    aria-label="Ďalšie projekty"
                    className="absolute right-3 top-[185px] z-30 hidden h-[46px] w-[46px] cursor-pointer
                      items-center justify-center border border-gray-200 bg-white text-gray-600
                      shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-colors
                      hover:border-amber-500 hover:bg-amber-50 hover:text-black
                      disabled:pointer-events-none disabled:opacity-30 lg:flex"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div
                    ref={carouselRef}
                    onScroll={updateArrows}
                    className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pt-2 pb-14 -mb-10
                      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {filteredProjects.map((proj, i) => (
                      <div
                        key={proj.id}
                        className="w-[86%] flex-none snap-start sm:w-[calc(45%-12px)] lg:w-[calc(29%-14px)]"
                      >
                        <motion.div {...reveal(i)}>
                          <ProjectTile
                            proj={proj}
                            index={i}
                            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 29vw"
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((proj, i) => (
                    <motion.div key={proj.id} {...reveal(i)}>
                      <ProjectTile
                        proj={proj}
                        index={i}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </div>
            )}
          </div>

        </Container>
      </section>
  );
}

