"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  CheckCircle,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CITIES } from "@/src/data/cities";
import BlogSection from "@/src/components/sections/BlogSection";

export type SubServiceKey =
  | "zakladanie"
  | "murarske"
  | "tesarske"
  | "monoliticke"
  | "obkladacske"
  | "omietky"
  | "potery"
  | "fasady"
  | "vykopove"
  | "buracie"
  | "jadrove"
  | "rezanie";

interface SubServiceDetailProps {
  serviceId: SubServiceKey;
  serviceSlug: string;
  title: string;
  description: string;
  features: string[];
  materials: string[];
  equipment: string[];
  cityName?: string;
  cityLocative?: string;
  cityAccusative?: string;
  citySlug?: string;
  customLocationTop?: React.ReactNode;
  customFaq?: React.ReactNode;
}

export function SubServiceDetail({
  serviceId,
  serviceSlug,
  title,
  description,
  features,
  materials,
  equipment,
  cityName,
  cityLocative,
  cityAccusative,
  citySlug,
  customLocationTop,
  customFaq,
}: SubServiceDetailProps) {
  const pathname = usePathname();
  const [sizeM2, setSizeM2] = useState(150);
  const [selectedSpec, setSelectedSpec] = useState(0); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Base URL for links
  const getBreadcrumbUrl = () => {
    let url = pathname;
    if (citySlug && url.endsWith(`/${citySlug}`)) {
      url = url.substring(0, url.lastIndexOf("/"));
    }
    return url;
  };

  // Specific high-res imagery mapping
  const imageMap: Record<SubServiceKey, { url: string, descSk: string }[]> = {
    zakladanie: [
      { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80", descSk: "Základy - Hrubé práce" },
      { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", descSk: "Geodetické zameranie" },
      { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", descSk: "Výkopové práce pre základy" }
    ],
    murarske: [
      { url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80", descSk: "Murárske práce" },
      { url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80", descSk: "Presné murovanie" }
    ],
    tesarske: [
      { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", descSk: "Drevené konštrukcie" },
      { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80", descSk: "Krov a strecha" },
    ],
    monoliticke: [
      { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80", descSk: "Stropná doska" },
      { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80", descSk: "Armovanie" },
    ],
    obkladacske: [
      { url: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80", descSk: "Veľkoformátové obklady" },
      { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80", descSk: "Kúpeľňový dizajn" },
    ],
    omietky: [
      { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80", descSk: "Ručné a strojové omietky" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", descSk: "Finish stien" }
    ],
    potery: [
      { url: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80", descSk: "Liate potery" },
      { url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80", descSk: "Vyrovnanie podlahy" }
    ],
    fasady: [
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", descSk: "Zateplovacie systémy" },
      { url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80", descSk: "Finálna fasáda" }
    ],
    vykopove: [
      { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80", descSk: "Hrubé terénne úpravy" },
      { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", descSk: "Výkopy pre siete" }
    ],
    buracie: [
      { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", descSk: "Búranie stavebných prvkov" },
      { url: "https://images.unsplash.com/photo-1580983546054-07301c10d32f?auto=format&fit=crop&w=1200&q=80", descSk: "Triedenie odpadu" }
    ],
    jadrove: [
      { url: "https://images.unsplash.com/photo-1580983546054-07301c10d32f?auto=format&fit=crop&w=1200&q=80", descSk: "Jadrové vŕtanie betónu" },
      { url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80", descSk: "Diagnostika stien" }
    ],
    rezanie: [
      { url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80", descSk: "Diamantové rezanie" },
      { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80", descSk: "Pílenie panelov" }
    ],
  };

  const serviceTagMap: Record<SubServiceKey, string> = {
    zakladanie: 'Zakladanie stavieb',
    murarske: 'Hrubé stavby',
    tesarske: 'Hrubé stavby',
    monoliticke: 'Statika stavieb',
    obkladacske: 'Rekonštrukcia',
    omietky: 'Rekonštrukcia',
    potery: 'Hrubé stavby',
    fasady: 'Teplotechnika',
    vykopove: 'Zakladanie stavieb',
    buracie: 'Búracie práce',
    jadrove: 'Búracie práce',
    rezanie: 'Rekonštrukcia',
  };

  const images = imageMap[serviceId] || imageMap.zakladanie;

  // Base pricing configurations
  const baseCostMap: Record<SubServiceKey, number> = {
    zakladanie: 55, // eur per m2
    murarske: 48,
    tesarske: 62,
    monoliticke: 85,
    obkladacske: 38,
    omietky: 22,
    potery: 18,
    fasady: 45,
    vykopove: 35,
    buracie: 40,
    jadrove: 65,
    rezanie: 70,
  };

  const specLabelMap = [
    {
      sk: "Štandardný materiál (Spoľahlivé normové materiály)",
      modifier: 1.0,
    },
    {
      sk: "Prémiový stavebný štandard (Prísnejšie tolerancie, prémiové zmesi)",
      modifier: 1.25,
    },
    {
      sk: "Ekologický pasívny štandard (Extrémna izolácia, nulové emisie)",
      modifier: 1.5,
    },
  ];

  const basePricePerM2 = baseCostMap[serviceId];
  const activeSpec = specLabelMap[selectedSpec];
  const calculatedEstimatedCost = Math.round(
    sizeM2 * basePricePerM2 * activeSpec.modifier,
  );

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-24 text-zinc-900 border-t border-zinc-200">
      {/* 1. HERO SHOWCASE BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 uppercase">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Domov
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/sluzby"
            className="hover:text-amber-600 transition-colors"
          >
            Služby
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {citySlug ? (
            <>
              <Link
                href={getBreadcrumbUrl()}
                className="hover:text-amber-600 transition-colors"
              >
                {title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-800 font-bold">{cityName}</span>
            </>
          ) : (
            <span className="text-zinc-800 font-bold">{title}</span>
          )}
        </div>

        <Link
          href="/sluzby"
          className="group inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 text-xs font-mono font-bold tracking-wider text-zinc-700 hover:text-amber-600 hover:bg-white rounded transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Späť na prehľad služieb
        </Link>
      </div>

      {/* 2. SPLIT LAYOUT FOR CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT COMPONENT: CORE SPECS AND CONTENT (7/12 cols) */}
        <div className="lg:col-span-7 space-y-10 sm:space-y-12 text-left">
          <div className="space-y-4">
            <span className="text-xs font-mono bg-amber-500/10 text-amber-700 font-bold tracking-widest px-3 py-1 rounded-full uppercase inline-block">
              ŠPECIALIZOVANÉ REMESLO
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-tight">
              {title}{" "}
              {cityName ? `v lokalite ${cityName}` : ""}
            </h1>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
            
            {customLocationTop}
          </div>

          {/* Core Feature bullet list */}
          <div className="space-y-6">
            <h3 className="text-sm font-mono tracking-wider text-zinc-400 font-bold uppercase">
              Hlavné zahrnuté fázy a technológie
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-zinc-50 border border-zinc-150 p-4 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 leading-tight mb-1">
                      Bod realizácie 0{index + 1}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {feat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical material arrays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-150 rounded-xl p-6">
            <div>
              <span className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-3">
                Certifikované materiály
              </span>
              <ul className="space-y-2 text-xs font-semibold text-zinc-700">
                {materials.map((mat, mIdx) => (
                  <li key={mIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-3">
                Mechanizácia a nástroje
              </span>
              <ul className="space-y-2 text-xs font-semibold text-zinc-700">
                {equipment.map((eq, eIdx) => (
                  <li key={eIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: IMAGE HERO & PRICING ESTIMATOR (5/12 cols) */}
        <div className="lg:col-span-5 space-y-8 sticky top-28">
          {/* Beautiful Header showcase Image Slider */}
          <div className="h-64 sm:h-80 rounded-xl overflow-hidden shadow-md relative group">
            <AnimatePresence mode="wait">
              {images.length > 0 && (
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex].url}
                  alt={title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-xs p-3 rounded-lg border border-white/10 text-white text-[11px] font-mono flex items-center justify-between">
              <span className="truncate mr-4">
                {images[currentImageIndex]?.descSk}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {images.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full ${i === currentImageIndex ? 'w-4 bg-amber-500' : 'w-1.5 bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC ESTIMATE BOX */}
          <div className="bg-zinc-950 text-white border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-stone-900/10 opacity-30 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-mono text-amber-500 tracking-wider font-bold uppercase block">
                VÝPOČET ORIENTAČNEJ CENY
              </span>
              <h3 className="text-xl font-display font-extrabold text-white">
                Orientačný rozpočet na mieru
              </h3>
            </div>

            <div className="space-y-5 relative z-10">
              {/* SIZE SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 uppercase font-bold">
                    Požadovaná výmera:
                  </span>
                  <span className="text-white font-extrabold">{sizeM2} m²</span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={5}
                  value={sizeM2}
                  onChange={(e) => setSizeM2(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>10 m²</span>
                  <span>500 m²</span>
                  <span>1,000 m²</span>
                </div>
              </div>

              {/* SPEC OPTION */}
              <div className="space-y-3">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Kvalitatívny materiálový štandard
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {specLabelMap.map((opt, oIdx) => (
                    <button
                      type="button"
                      key={oIdx}
                      onClick={() => setSelectedSpec(oIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                        selectedSpec === oIdx
                          ? "bg-amber-500 border-amber-500 text-zinc-950 font-bold"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <span>{opt.sk}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ESTIMATION COST */}
              <div className="pt-4 border-t border-zinc-800 space-y-1">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                  Odhadovaná cena
                </span>

                <div className="text-center font-display text-4xl font-extrabold text-amber-500 py-1 tracking-tight">
                  €{calculatedEstimatedCost.toLocaleString("sk-SK")}
                </div>

                <span className="block text-[10px] font-mono text-zinc-500 text-center leading-normal">
                  *Generovaná cena je orientačná. Konečný rozpočet vyžaduje posúdenie staveniska a výkresovú dokumentáciu.
                </span>
              </div>

              {/* TRIGGER CONQUIRY CTA */}
              <Link
                href="/kontakt"
                className="w-full py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold tracking-widest text-xs rounded transition-all shadow-md hover:shadow-lg cursor-pointer text-center block uppercase"
              >
                Nezáväzná cenová ponuka
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {customFaq}

      <BlogSection filterCategory={serviceTagMap[serviceId]} compact={true} />

      {/* LOCATIONS SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-20 sm:mt-24 mb-20 border-t border-zinc-200 pt-16">
        <div className="bg-zinc-50 border border-zinc-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-display font-bold text-zinc-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              {citySlug ? 'Ďalšie lokality pôsobenia' : 'Hlavné oblasti pôsobenia'}
            </h2>
            {!citySlug && (
              <Link
                href="/lokality"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
              >
                Zobraziť všetky regionálne pobočky
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {CITIES.filter(c => c.slug !== citySlug).map((city) => (
              <Link
                key={city.slug}
                href={citySlug ? `${getBreadcrumbUrl()}/${city.slug}` : `/sluzby/${serviceSlug}/${city.slug}`}
                className="inline-flex items-center px-4 py-2 bg-white border border-zinc-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-colors shadow-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
