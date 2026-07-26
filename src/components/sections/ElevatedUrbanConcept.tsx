"use client";

import Link from 'next/link';
import { ArrowRight, Building2, Coins } from 'lucide-react';
import Image from 'next/image';

export function ElevatedUrbanConcept() {
  return (
    <section className="bg-zinc-950 py-12 sm:py-16 relative hidden overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-stone-900/10 opacity-30 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10  blur-3xl pointer-events-none" />
      
      <div className=" mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-mono font-bold uppercase tracking-widest  border border-amber-500/20">
                <span className="w-1.5 h-1.5 bg-amber-500  animate-pulse" />
                {"ELEVATED URBAN DEVELOPEMENT"}
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white leading-tight tracking-tight">
                {"Revolučný koncept efektívneho využitia prakovacích plôch"}
              </h2>
              
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
                {"Premieňame nevyužité parkoviská na cenné obytné a komerčné priestory. Vytvárame hodnotu vo vzduchu bez zaberania novej pôdy."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 shrink-0  bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">{"Tvorba Priestoru"}</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{"Budovanie nad existujúcimi plochami."}</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 shrink-0  bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">{"Zhodnotenie Majetku"}</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{"Nové prúdy príjmov pre majiteľov."}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Link
                href="/elevated-urban-development"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                {"Viac o projekte"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <Link href="/elevated-urban-development" className="relative h-[250px] sm:h-[320px] overflow-hidden border border-zinc-800 shadow-2xl group block cursor-pointer">
             <Image 
              src="/elevated-urban-developement.webp"
              alt={"Moderná architektúra budovy"} 
              fill
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent z-10 pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 z-20 space-y-1">
               <span className="text-amber-500 text-[10px] font-mono tracking-widest font-bold uppercase shadow-sm">
                 {"Budúcnosť stavebníctva"}
               </span>
               <p className="text-white font-display font-bold text-lg">ELEVATED URBAN DEVELOPEMENT</p>
            </div>
          </Link>
          
        </div>
      </div>
    </section>
  );
}
