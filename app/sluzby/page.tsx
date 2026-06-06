"use client";

import { motion } from 'motion/react';
import { ArrowRight, Layers, Hammer, DraftingCompass, Grid, Brush, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { sluzby } from '@/src/data/sluzby';
import { ServicesGrid } from '@/src/components/sections/ServicesGrid';

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'zakladanie-stavieb':
    case 'monoliticke-konstrukcie':
    case 'vykopove-zemne-prace':
      return <Layers className="w-5 h-5 text-amber-600" />;
    case 'murarske-prace':
    case 'buracie-prace':
      return <Hammer className="w-5 h-5 text-amber-600" />;
    case 'tesarske-prace':
    case 'jadrove-vrtanie':
      return <DraftingCompass className="w-5 h-5 text-amber-600" />;
    case 'omietky':
    case 'potery':
      return <Brush className="w-5 h-5 text-amber-600" />;
    case 'obkladacske-prace':
    case 'rezanie-otvorov':
      return <Grid className="w-5 h-5 text-amber-600" />;
    case 'fasady':
      return <Shield className="w-5 h-5 text-amber-600" />;
    default:
      return <CheckCircle className="w-5 h-5 text-amber-600" />;
  }
};

export default function SluzbyPage() {
  const mainServices = sluzby.slice(0, 5);
  const otherServices = sluzby.slice(5);

  return (
    <div className="bg-white min-h-screen text-zinc-900 pt-18">


      {/* SECTION 1: 5 KEY ARCHITECTURAL DIVISIONS */}
      <div className="bg-white border-y border-zinc-200 pt-10 mb-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-5 space-y-3">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
            Naše služby
          </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-950 tracking-tight">
              Prehľad služieb
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl">
              Naše detailné remeselné práce, realizované certifikovanými odborníkmi, kde sa kvalita stretáva so stovkami hodín skúseností.
            </p>
          </div>
        </div>
        <ServicesGrid hideAllLink={true}/>
      </div>

      {/* SECTION 2: SPECIALIZED TRADE SECTORS */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-14 space-y-3">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
            REMESLÁ
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-950 tracking-tight">
            Remeslá a špeciálne stavebné služby
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl">
            Naše detailné remeselné práce, realizované certifikovanými odborníkmi, kde sa kvalita stretáva so stovkami hodín skúseností.
          </p>
        </div>

        {/* GRID ITEMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-8">
          {otherServices.map((sub, sIdx) => {
            const tag = (sIdx + 1).toString().padStart(2, '0');
            return (
              <Link href={`/sluzby/${sub.id}`} key={sub.id} className="block group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sIdx * 0.05 }}
                  className="flex flex-col h-full justify-between  bg-zinc-50 hover:bg-white border border-zinc-150/80 p-6 hover:shadow-xl hover:border-zinc-300/80 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* ICON & NO */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 bg-white border border-zinc-200/60 shadow-sm flex items-center justify-center group-hover:bg-zinc-950 group-hover:border-zinc-950 transition-colors duration-300">
                        <div className="group-hover:text-white transition-colors">
                          {getServiceIcon(sub.id)}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-zinc-400">
                        TRADE // {tag}
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="space-y-3">
                      <h3 className="font-display font-bold text-lg text-zinc-950 group-hover:text-amber-600 transition-colors">
                        {sub.name}
                      </h3>
                      <div className="w-6 group-hover:w-12 h-[1px] bg-amber-500 transition-all duration-300" />
                      <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {sub.description}
                      </p>
                    </div>

                    {/* BULLET HIGHLIGHTS (Mocked or pulled if we had an array, here we just show 2 generic ones for illustration based on user's mockup) */}
                    <div className="mt-5 space-y-1.5 pt-4 border-t border-zinc-200">
                      <div className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                        <CheckCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">Precízna remeselná kvalita</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                        <CheckCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">Dlhoročné skúsenosti tímu</span>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM CTA LINK */}
                  <div className="mt-8 pt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-600">
                    <span className="text-[10px] font-mono tracking-tight text-zinc-400 uppercase">
                      Podrobná Špecifikácia
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 group-hover:text-amber-600 transition-colors flex items-center gap-1">
                      Otvoriť
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}