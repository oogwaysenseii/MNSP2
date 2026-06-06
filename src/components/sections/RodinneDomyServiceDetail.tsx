"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
  FileText
} from "lucide-react";
import Link from "next/link";
import { CTA } from "./CTA";
import { Projects } from "./Projects";

import { ServiceCategory } from "@/src/data/projects";
import { CITIES } from "@/src/data/cities";
import { MapPin } from "lucide-react";

import BlogSection from "@/src/components/sections/BlogSection";

export interface Stage {
  step: string;
  title: string;
  desc: string;
}

export interface Option {
  label: string;
  premiumModifier: number;
}

export interface ServiceDetailProps {
  title: string;
  breadcrumbTitle: string;
  fullDesc: string;
  imageUrl: string;
  features: string[];
  stages: Stage[];
  equipment: string[];
  options: Option[];
  category: ServiceCategory;
  serviceSlug?: string;
  ctaTitle: string;
  ctaSubtitle: string;
  minSize?: number;
  maxSize?: number;
  stepSize?: number;
  defaultSize?: number;
  baseRate?: number;
  hideBlog?: boolean;
  blogFilterCategory?: string;
  customLocationTop?: React.ReactNode;
  customFaq?: React.ReactNode;
}

export function RodinneDomyServiceDetail({
  title,
  breadcrumbTitle,
  fullDesc,
  imageUrl,
  features,
  stages,
  equipment,
  options,
  category,
  ctaTitle,
  ctaSubtitle,
  minSize = 100,
  maxSize = 500,
  stepSize = 10,
  defaultSize = 150,
  baseRate = 1200,
  hideBlog = false,
  blogFilterCategory,
  serviceSlug,
  customLocationTop,
  customFaq,
}: ServiceDetailProps) {
  const [projectSize, setProjectSize] = useState(defaultSize);
  const [selectedSpecIndex, setSelectedSpecIndex] = useState(0);

  const gradeModifier = options[selectedSpecIndex]?.premiumModifier || 1.0;
  const calculatedEstimate = Math.round(projectSize * baseRate * gradeModifier);

  return (
    <div className="bg-white text-zinc-900  pt-18">
      {/* 1. IMMERSIVE HERO WITH CATEGORY BANNER */}
      <div className="relative h-[45vh] min-h-[350px] bg-zinc-950 text-white overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 pt-32">
          {/* Breadcrumbs Row */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-500 font-mono font-bold tracking-wider mb-6">
            <Link href="/" className="hover:underline hover:text-white transition-colors">
              DOMOV
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <Link href="/sluzby" className="hover:underline hover:text-white transition-colors">
              SLUŽBY
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <Link href="/sluzby/rodinne-domy" className="hover:underline hover:text-white transition-colors uppercase">
              Rodinné domy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-white uppercase line-clamp-1">{breadcrumbTitle}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            {title}
          </h1>
        </div>
      </div>

      {/* BACK NAVIGATION BUTTON FLOATING */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/sluzby/rodinne-domy"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-950 uppercase border border-zinc-200/80 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Späť na rodinné domy
        </Link>
      </div>


      {/* 2. OVERVIEW BODY GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
        {/* LEFT COLUMN: OVERVIEW & STAGES (8 COLS) */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-zinc-950">
              {title}
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {fullDesc}
            </p>
          </div>

          {customLocationTop}

          {/* CHECKMARKS FOR CAPABILITIES */}
          <div className="bg-zinc-50 p-6 sm:p-8 border border-zinc-150 space-y-6">
            <h4 className="text-xs font-mono text-zinc-500 font-bold tracking-wider uppercase mb-2">
              Hlavné benefity a vlastnosti
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-200">
               <h4 className="text-xs font-mono text-zinc-500 font-bold tracking-wider uppercase mb-6">
                  PREHĽAD NAMI POSKYTOVANÝCH STAVEBNÝCH PRÁC
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-4">
                   <h5 className="font-display font-bold text-zinc-900 border-b border-zinc-200 pb-2">Hrubá stavba</h5>
                   <ul className="space-y-2.5">
                     {["Základy", "Murivo a stropné dosky", "Strechy a krovy", "Okná a brány"].map((f, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                         <div className="w-1.5 h-1.5  bg-amber-500 mt-1.5 shrink-0" />
                         <span>{f}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div className="space-y-4">
                   <h5 className="font-display font-bold text-zinc-900 border-b border-zinc-200 pb-2">Interiér</h5>
                   <ul className="space-y-2.5">
                     {["Elektroinštalácie", "Zdravotechnika", "Omietky a potery", "Obklady a dlažby"].map((f, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                         <div className="w-1.5 h-1.5  bg-amber-500 mt-1.5 shrink-0" />
                         <span>{f}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div className="space-y-4">
                   <h5 className="font-display font-bold text-zinc-900 border-b border-zinc-200 pb-2">Exteriér</h5>
                   <ul className="space-y-2.5">
                     {["Zateplenie fasády", "Zámkové dlažby", "Ploty a prístrešky"].map((f, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                         <div className="w-1.5 h-1.5  bg-amber-500 mt-1.5 shrink-0" />
                         <span>{f}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
            </div>
          </div>

          {/* 4 STAGES PROCESS PIPELINE */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600 tracking-wider uppercase block">
                NÁŠ ŠTRUKTÚROVANÝ PROCES
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-extrabold text-zinc-900 tracking-tight">
                Zabezpečujeme proces od začiatku do konca
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stages.map((stg, iIdx) => (
                <div key={iIdx} className="bg-white border border-zinc-150/80 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center  justify-between border-b border-zinc-100 pb-3">
                    <span className="text-base font-extrabold font-display text-zinc-950">
                      {stg.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 ">
                      {stg.step}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SPECIFIC MACHINERY ENTOURAGE */}
          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <h4 className="text-xs font-mono text-zinc-500 font-bold tracking-wider uppercase">
              Vlastné strojné vybavenie a technológie
            </h4>
            <div className="flex flex-wrap gap-2">
              {equipment.map((eq) => (
                <span
                  key={eq}
                  className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-700"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CALC & QUICK INFO (4 COLS) */}
        <div className="lg:col-span-4 space-y-8">
          {/* DIVISION SPEC CALCULATOR */}
          <div className="bg-zinc-950 text-white p-6 sm:p-7 space-y-8 shadow-2xl  border border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase block font-bold">
                ROZPOČTOVÁ MATRICA
              </span>
              <h4 className="text-xl font-display font-extrabold tracking-tight text-white">
                Indikatívny odhad nákladov
              </h4>
            </div>

            {/* Slider sizing */}
            <div className="space-y-4">
              <div className="flex justify-between items-end text-sm font-mono text-zinc-300">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">
                  PLOVHA V M²
                </span>
                <span className="text-lg text-white font-bold">
                  {projectSize} m²
                </span>
              </div>
              <input
                type="range"
                min={minSize}
                max={maxSize}
                step={stepSize}
                value={projectSize}
                onChange={(e) => setProjectSize(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>{minSize} m²</span>
                <span>{maxSize} m²</span>
              </div>
            </div>

            {/* Sub Quality Levels */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Zvoľte úroveň štandardu
              </span>
              <div className="flex flex-col gap-2">
                {options.map((opt, oIdx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedSpecIndex(oIdx)}
                    className={`w-full text-left p-3 text-sm transition-all cursor-pointer -lg border ${
                      selectedSpecIndex === oIdx
                        ? "bg-amber-500 text-zinc-950 font-bold border-amber-500 shadow-md"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="leading-tight">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Output */}
            <div className="bg-zinc-900  p-5 border border-zinc-800 space-y-2">
              <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                PREDPOKLADANÁ INVESTÍCIA
              </span>
              <span className="text-3xl font-display font-extrabold text-amber-400 block">
                {calculatedEstimate.toLocaleString("sk-SK")} €*
              </span>
              <span className="block text-xs font-mono text-zinc-500 italic leading-relaxed pt-2 border-t border-zinc-800 mt-2">
                *Indikatívna cena v závislosti od konkrétnych požiadaviek, svahovitosti a výberu materiálov.
              </span>
            </div>

            <Link
              href="/kontakt"
              className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-wider text-center block cursor-pointer transition-colors  shadow-lg"
            >
              Nezáväzná cenová ponuka
            </Link>

            <Link
              href="/kalkulacka"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider text-center block cursor-pointer transition-colors  shadow-lg mt-3"
            >
              Prejsť na kalkulačku
            </Link>
          </div>

          {/* LIST OF SERVICES */}
          <div className="bg-zinc-50 p-5 border border-zinc-200 text-zinc-800 space-y-4 ">
            <h5 className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
              NAŠE SLUŽBY
            </h5>
            <div className="flex flex-col space-y-2">
              <Link
                href="/sluzby/rodinne-domy"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                Rodinné domy
              </Link>
              <Link
                href="/sluzby/rodinne-domy/stavba-domu-na-kluc"
                className="text-xs text-zinc-600 hover:text-amber-500 pl-3 border-l-2 border-zinc-200 hover:border-amber-500 transition-all font-medium"
              >
                Stavba domu na kľúč
              </Link>
              <Link
                href="/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu"
                className="text-xs text-zinc-600 hover:text-amber-500 pl-3 border-l-2 border-zinc-200 hover:border-amber-500 transition-all font-medium"
              >
                Rekonštrukcia rodinného domu
              </Link>

              <Link
                href="/sluzby"
                className="text-sm font-medium hover:text-amber-600 transition-colors mt-2 block"
              >
                Stavebné sektory
              </Link>

              <div className="p-1"></div>
              <h5 className="pb-2 text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider mb-1 mt-2 border-b border-zinc-200">
                Remeslá
              </h5>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {[
                  { name: "Monolitické konštrukcie", id: "monoliticke-konstrukcie" },
                  { name: "Murárske práce", id: "murarske-prace" },
                  { name: "Tesárske práce", id: "tesarske-prace" },
                  { name: "Omietky", id: "omietky" },
                  { name: "Potery", id: "potery" },
                  { name: "Obkladačské práce", id: "obkladacske-prace" },
                  { name: "Fasády", id: "fasady" },
                  { name: "Výkopové a zemné práce", id: "vykopove-zemne-prace" },
                  { name: "Búracie práce", id: "buracie-prace" },
                  { name: "Jadrové vŕtanie", id: "jadrove-vrtanie" },
                  { name: "Rezanie otvorov", id: "rezanie-otvorov" }
                ].map(r => (
                  <Link
                    key={r.id}
                    href={`/sluzby/${r.id}`}
                    className="text-xs text-zinc-600 hover:text-amber-600 transition-colors"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* COMPANY PRESENTATION PDF DOWNLOAD */}
          <div className="bg-zinc-50 p-6 border border-zinc-200 space-y-4 ">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600  shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-zinc-900">
                  Firemná prezentácia
                </h5>
                <span className="text-xs font-mono text-zinc-500">Stavebné portfólio (PDF, 4MB)</span>
              </div>
            </div>
            <a
              href="#"
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider text-center block transition-colors "
            >
              Stiahnuť PDF
            </a>
          </div>
        </div>
      </div>

      {/* 3. COMPLETED PAST PROJECTS IN THIS DIVISION */}
      <Projects
          defaultCategory={category}
          hideFilters={true}
          titleSk={`Relevatné realizácie z portfólia`}
          subtitleSk="Pozrite si ukážky našej odbornej práce na podobných projektoch."
      />

      {!hideBlog && (
        <BlogSection filterCategory={blogFilterCategory || "Rezidenčné"} compact={true} />
      )}

      {/* 2.6. OTHER LOCATIONS */}
      {serviceSlug && (
        <div className="max-w-7xl mx-auto px-6 mt-10 mb-10 space-y-8">
          <div className="bg-zinc-50 border border-zinc-200 p-8 ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-display font-bold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Hlavné oblasti pôsobenia
              </h2>
              <Link
                href="/lokality"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
              >
                Zobraziť všetky regionálne pobočky
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {CITIES.map((city) => {
                const getServicePath = (slug: string) => {
                  if (slug === 'stavba-domu-na-kluc' || slug === 'rekonstrukcia-rodinneho-domu') {
                    return `/sluzby/rodinne-domy/${slug}/${city.slug}`;
                  }
                  return `/sluzby/${slug}/${city.slug}`;
                };

                return (
                <Link
                  key={city.slug}
                  href={getServicePath(serviceSlug as string)}
                  className="inline-flex items-center px-4 py-2 bg-white border border-zinc-200 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-colors shadow-sm "
                >
                  {city.name}
                </Link>
              )})}
            </div>
          </div>
        </div>
      )}

      {customFaq}


       <CTA 
        title={ctaTitle}
        subtitle={ctaSubtitle}
      />
    </div>
  );
}
