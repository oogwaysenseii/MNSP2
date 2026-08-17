"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { projectsData, ServiceCategory } from '@/src/data/projects';
import { Container } from '../ui/Container';

interface ProjectsSectionProps {
  defaultCategory?: ServiceCategory | 'all';
  hideFilters?: boolean;
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


/**
 * Budget and duration are optional in the project data — five of eight entries
 * have them empty. Rendering the labels regardless left cards showing
 * "ROZPOČET" / "TRVANIE" headings with nothing under them.
 */
const CATEGORY_TABS = [
  'all',
  'Rodinné domy',
  'Rezidenčné budovy',
  'Komerčná výstavba',
  'Priemyselné objekty',
  'Občianske stavby',
] as const satisfies readonly (ServiceCategory | 'all')[];

function ProjectMeta({ budget, duration }: { budget?: string; duration?: string }) {
  const hasBudget = Boolean(budget?.trim());
  const hasDuration = Boolean(duration?.trim());
  if (!hasBudget && !hasDuration) return null;

  return (
    <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 mt-auto">
      {hasBudget && (
        <div className="space-y-1">
          <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
            ROZPOČET
          </span>
          <span className="block text-sm font-bold text-black">{budget}</span>
        </div>
      )}
      {hasDuration && (
        <div className="space-y-1">
          <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-500">
            TRVANIE
          </span>
          <span className="block text-sm font-bold text-black">{duration}</span>
        </div>
      )}
    </div>
  );
}

export function Projects({
                           defaultCategory = 'all',
                           hideFilters = false,
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
              <div className="flex flex-col gap-4 mb-10 border-b border-gray-100 pb-6 overflow-hidden">
                {/* Categories */}
                <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {CATEGORY_TABS.map((cat) => (
                      <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`shrink-0 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              selectedCategory === cat
                                  ? 'bg-black text-amber-400 font-bold'
                                  : 'bg-white hover:bg-gray-50 text-gray-600 font-semibold border border-gray-200'
                          }`}
                      >
                        {cat === 'all' ? ('Všetky realizácie') : cat}
                      </button>
                  ))}
                </div>

                {/* Locations */}
                <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0 mr-2" />
                  <button
                      onClick={() => setSelectedLoc('all')}
                      className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-full ${
                          selectedLoc === 'all'
                              ? 'bg-gray-200 text-black shadow-inner'
                              : 'bg-transparent hover:bg-gray-100 text-gray-500 border border-transparent hover:border-gray-200'
                      }`}
                  >
                    Všetky lokality
                  </button>
                  {allLocations.filter(Boolean).map((loc) => (
                      loc && <button
                          key={loc}
                          onClick={() => setSelectedLoc(loc)}
                          className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-full ${
                              selectedLoc === loc
                                  ? 'bg-gray-200 text-black shadow-inner'
                                  : 'bg-transparent hover:bg-gray-100 text-gray-500 border border-transparent hover:border-gray-200'
                          }`}
                      >
                        {loc}
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* 3. MAIN CAROUSEL OR GRID CONTAINER */}
          <div className="relative">
            {filteredProjects.length === 0 ? (
                <div className="bg-white border border-gray-200 p-16 text-center">
                  <p className="text-gray-500 text-sm font-semibold">Momentálne nemáme v tejto kategórii žiadne dokončené projekty.</p>
                </div>
            ) : viewMode === 'carousel' ? (
                <div className="space-y-10 group/carousel relative">

                  {filteredProjects.length > 3 && (
                      <>
                        <button
                            onClick={scrollLeft}
                            aria-label="Predchádzajúce projekty"
                            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-amber-500 hover:bg-amber-50 transition-all shadow-lg hidden lg:flex cursor-pointer"
                        >
                          <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                        </button>
                        <button
                            onClick={scrollRight}
                            aria-label="Ďalšie projekty"
                            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-amber-500 hover:bg-amber-50 transition-all shadow-lg hidden lg:flex cursor-pointer"
                        >
                          <ChevronRight className="w-6 h-6 mr-[-2px]" />
                        </button>
                      </>
                  )}

                  <div
                      ref={carouselRef}
                      className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {filteredProjects.map((proj) => (
                        <Link
                            key={proj.id}
                            href={`/portfolio/${proj.id}`}
                            className="w-[100%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-none bg-gray-50 border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all duration-300 flex flex-col group/item snap-start"
                        >
                          <div className="relative h-48 sm:h-56 overflow-hidden">
                            <Image
                                src={proj.imageUrl}
                                alt={proj.title}
                                fill
                                className="object-cover group-hover/item:scale-105 transition-transform duration-700 ease-out"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-3 left-3 bg-black/90 text-white text-[10px] font-mono tracking-wider font-bold uppercase px-2 py-1">
                              {proj.category}
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span className="font-semibold">{proj.location}</span>
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-1 leading-relaxed bg-zinc-50 relative z-10">
                            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-600 font-bold uppercase mb-3">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              <span>{`Rok ${proj.year}`}</span>
                            </div>
                            <h3 className="text-xl font-bold text-black tracking-tight mb-3 group-hover/item:text-amber-600 transition-colors">
                              {proj.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                              {proj.description}
                            </p>
                            <ProjectMeta budget={proj.budgetString} duration={proj.duration} />
                          </div>
                        </Link>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((proj) => (
                      <Link
                          key={proj.id}
                          href={`/portfolio/${proj.id}`}
                          className="bg-gray-50 border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all duration-300 flex flex-col group"
                      >
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <Image
                              src={proj.imageUrl}
                              alt={proj.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 left-3 bg-black/90 text-white text-[10px] font-mono tracking-wider font-bold uppercase px-2 py-1">
                            {proj.category}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span className="font-semibold">{proj.location}</span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1 leading-relaxed bg-zinc-50 relative z-10">
                          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-600 font-bold uppercase mb-3">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            <span>{`Rok ${proj.year}`}</span>
                          </div>
                          <h3 className="text-xl font-bold text-black tracking-tight mb-3 group-hover:text-amber-600 transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                            {proj.description}
                          </p>
                            <ProjectMeta budget={proj.budgetString} duration={proj.duration} />
                        </div>
                      </Link>
                  ))}
                </div>
            )}
          </div>

        </Container>
      </section>
  );
}

