"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Calculator,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { SimpleContactForm } from "@/src/components/ui/SimpleContactForm";

type ServiceInfo = {
  id: string;
  name: string;
  basePricePerM2: number;
};

const SERVICES: ServiceInfo[] = [
  { id: "zaklady", name: "Základy a základová doska", basePricePerM2: 165 },
  { id: "murivo", name: "Murovacie práce (Hrubá stavba)", basePricePerM2: 225 },
  { id: "stropy", name: "Stropy a vence", basePricePerM2: 135 },
  { id: "strecha", name: "Strecha a krov", basePricePerM2: 200 },
  { id: "okna", name: "Okná a exteriérové dvere", basePricePerM2: 140 },
  { id: "fasada", name: "Zateplenie a fasáda", basePricePerM2: 115 },
  { id: "rozvody", name: "Rozvody (Elektro, Voda, Kúrenie)", basePricePerM2: 220 },
  { id: "omietky", name: "Vnútorné omietky a potery", basePricePerM2: 80 },
  { id: "sadrokarton", name: "Sadrokartónové stropy", basePricePerM2: 60 },
  { id: "interier", name: "Interiér (Podlahy, obklady, sanita)", basePricePerM2: 300 }
];

const STANDARDS = [
  { id: "basic", name: "Ekonomický štandard", multiplier: 0.85, desc: "Základné overené materiály so zameraním na cenu." },
  { id: "standard", name: "Zlatá stredná cesta", multiplier: 1.0, desc: "Moderné kvalitné materiály, výborný pomer cena / výkon." },
  { id: "premium", name: "Prémiové riešenia", multiplier: 1.35, desc: "Najvyššia kvalita, nadštandardné technológie (smart dom)." }
];

export default function ConstructionCalculator({ children }: { children?: React.ReactNode }) {
  // State
  const [selectedServices, setSelectedServices] = useState<string[]>(SERVICES.map(s => s.id));
  const [floors, setFloors] = useState<number>(1);
  const [hasUnderground, setHasUnderground] = useState<boolean>(false);
  const [area, setArea] = useState<number>(120);
  const [standard, setStandard] = useState<string>("standard");

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Calculation logic
  const getCalculatedItems = () => {
    const items: { name: string; cost: number; percentage: number }[] = [];
    const standardMultiplier = STANDARDS.find((s) => s.id === standard)?.multiplier || 1;
    let totalBaseCost = 0;

    SERVICES.forEach((service) => {
      if (!selectedServices.includes(service.id)) return;

      let multiplier = 1;

      if (service.id === "zaklady") {
        multiplier = 1;
        if (hasUnderground) multiplier += 1.2;
      } else if (service.id === "strecha") {
        multiplier = 1;
      } else if (service.id === "stropy" || service.id === "sadrokarton") {
        multiplier = floors;
        if (hasUnderground) multiplier += 1;
      } else {
        multiplier = floors;
        if (hasUnderground) multiplier += 0.5;
      }

      const cost = service.basePricePerM2 * multiplier * area * standardMultiplier;
      totalBaseCost += cost;
      items.push({ name: service.name, cost, percentage: 0 });
    });

    if (totalBaseCost > 0) {
      items.forEach((item) => {
        item.percentage = Math.round((item.cost / totalBaseCost) * 100);
      });
    }

    return { items, totalBaseCost };
  };

  const { items: breakdown, totalBaseCost: totalPrice } = getCalculatedItems();
  const totalCalcArea = area * (floors + (hasUnderground ? 0.8 : 0));

  const currentDate = new Date();
  const rawMonthYear = new Intl.DateTimeFormat('sk-SK', { month: 'long', year: 'numeric' }).format(currentDate);
  const currentMonthYear = rawMonthYear.charAt(0).toUpperCase() + rawMonthYear.slice(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const rangeMin = Math.round((totalPrice * 0.95) / 1000) * 1000;
  const rangeMax = Math.round((totalPrice * 1.08) / 1000) * 1000;
  const pricePerM2 = totalCalcArea > 0 ? Math.round(totalPrice / totalCalcArea) : 0;

  return (
      <div className="bg-zinc-50 py-10">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* LEFT CONTENT: Inputs */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">

              {/* 1. Zastavaná plocha & Podlažnosť */}
              <div className="space-y-8 bg-white p-6 sm:p-10  border border-zinc-200 shadow-sm">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-zinc-950 mb-1">1. Základné parametre</h3>
                  <p className="text-zinc-500 text-sm">Zadajte plochu jedného podlažia a zvoľte typ podlažnosti vášho projektu.</p>
                </div>

                {/* Area */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <label className="font-bold text-zinc-950 block">Zastavaná plocha (1 podlažie)</label>
                    <span className="text-3xl font-display font-extrabold text-zinc-950">{area} <span className="text-lg text-zinc-400">m²</span></span>
                  </div>
                  <input
                      type="range"
                      min="50"
                      max="300"
                      step="5"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-zinc-200 appearance-none cursor-pointer"
                  />
                  <div className="w-full flex justify-between text-xs font-mono text-zinc-400 font-bold">
                    <span>50 m²</span>
                    <span>300 m²</span>
                  </div>
                </div>

                {/* Floors and Underground */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <label className="font-bold text-zinc-950 block">Počet nadzemných podlaží</label>
                    <div className="flex gap-3">
                      {[1, 2, 3].map(num => (
                          <button
                              key={num}
                              onClick={() => setFloors(num)}
                              className={`flex-1 py-3 text-center  border font-semibold text-sm transition-colors cursor-pointer ${
                                  floors === num ? "bg-zinc-950 border-zinc-950 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                              }`}
                          >
                            {num} {num === 1 ? 'Podlažie' : 'Podlažia'}
                          </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="font-bold text-zinc-950 block">Podpivničenie (suterén)?</label>
                    <div className="flex gap-3">
                      <button
                          onClick={() => setHasUnderground(true)}
                          className={`flex-1 py-3 text-center  border font-semibold text-sm transition-colors cursor-pointer ${
                              hasUnderground ? "bg-zinc-950 border-zinc-950 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                          }`}
                      >
                        Áno
                      </button>
                      <button
                          onClick={() => setHasUnderground(false)}
                          className={`flex-1 py-3 text-center  border font-semibold text-sm transition-colors cursor-pointer ${
                              !hasUnderground ? "bg-zinc-950 border-zinc-950 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                          }`}
                      >
                        Nie
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Rozsah prác */}
              <div className="space-y-6 bg-white p-6 sm:p-10  border border-zinc-200 shadow-sm">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-zinc-950 mb-1">2. Čo má byť súčasťou stavby?</h3>
                  <p className="text-zinc-500 text-sm">Vyberte moduly a konštrukčné fázy, ktoré chcete naceniť.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                        <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`text-left p-4  border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                                isSelected ? "bg-zinc-950 border-zinc-950 text-white shadow-md relative overflow-hidden" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                            }`}
                        >
                          <span className="font-semibold text-sm block pr-4 relative z-10">{service.name}</span>
                          <div className={`w-5 h-5 -sm border flex items-center justify-center flex-shrink-0 relative z-10 ${isSelected ? "border-amber-500 bg-amber-500" : "border-zinc-300 bg-white"}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-zinc-950 font-bold" />}
                          </div>
                        </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Štandard materiálov */}
              <div className="space-y-6 bg-white p-6 sm:p-10  border border-zinc-200 shadow-sm">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-zinc-950 mb-1">3. Štandard materiálov</h3>
                  <p className="text-zinc-500 text-sm">Zvoľte očakávaný štandard prevedenia a kvality materiálov.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {STANDARDS.map(s => (
                      <button
                          key={s.id}
                          onClick={() => setStandard(s.id)}
                          className={`text-left p-5 text-sm sm:p-6  border transition-all cursor-pointer flex items-center justify-between group ${
                              standard === s.id ? "bg-zinc-950 border-zinc-950 text-white shadow-md" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-white"
                          }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${standard === s.id ? "text-amber-500" : "text-amber-600"}`}>
                          Variant
                        </span>
                          </div>
                          <h4 className="font-bold text-base">{s.name}</h4>
                          <p className={`text-xs mt-1 ${standard === s.id ? "text-zinc-400" : "text-zinc-500"}`}>
                            {s.desc}
                          </p>
                        </div>
                        <div className={`w-6 h-6  border-2 flex items-center justify-center flex-shrink-0 ml-4 ${standard === s.id ? "border-amber-500" : "border-zinc-300 group-hover:border-zinc-400"}`}>
                          {standard === s.id && <div className="w-2.5 h-2.5 bg-amber-500 " />}
                        </div>
                      </button>
                  ))}
                </div>
              </div>

              {/* Additional Content (like SEO) */}
              {children}
            </div>

            {/* RIGHT CONTENT: Sticky Summary */}
            <div className="lg:col-span-4 relative h-full">
              <div className="sticky top-19 space-y-4">
                <div className="bg-zinc-50 text-amber-500 shadow-2xl overflow-hidden border border-zinc-800">
                  {/* Top Banner */}
                  <div className="bg-zinc-950 px-5 py-3 flex items-center gap-3">
                    <Calculator className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Orientačný rozpočet</h3>
                  </div>

                  <div className="p-5 space-y-5">
                    <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-black block mb-2">
                      Odhadovaný rozsah nákladov:
                    </span>
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-500 tracking-tight leading-tight flex items-center gap-1.5 flex-wrap">
                        <span>{formatPrice(rangeMin)}</span>
                        <span className="text-zinc-400 font-medium px-0.5">—</span>
                        <span>{formatPrice(rangeMax)}</span>
                      </div>
                      <div className="mt-2.5 inline-flex items-center bg-amber-100 text-amber-900 font-mono font-bold px-2 py-1 text-xs">
                        ≈ {new Intl.NumberFormat('sk-SK').format(pricePerM2)} €/m²
                      </div>

                    </div>

                    {breakdown.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-zinc-200">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-black block mb-2">
                      Približné rozloženie nákladov
                    </span>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {breakdown.map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex justify-between text-[10px]">
                                    <span className="text-zinc-600 font-medium truncate pr-2" title={item.name}>{item.name}</span>
                                    <span className="font-bold text-zinc-950">{item.percentage}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-zinc-200 overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{ width: `${item.percentage}%` }}></div>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-zinc-200">
                      <div className="bg-white p-4 border border-zinc-200 shadow-sm">
                        <p className="text-xs text-zinc-950 font-bold mb-3">Získajte cenovú ponuku na mieru</p>
                        <ul className="text-[10px] text-zinc-600 mb-4 space-y-1.5 font-medium flex flex-wrap gap-x-2 gap-y-1.5">
                          <li className="flex gap-1.5 items-center"><Check className="w-3 h-3 text-amber-500"/> Celková suma</li>
                          <li className="flex gap-1.5 items-center"><Check className="w-3 h-3 text-amber-500"/> Rozpis položiek</li>
                          <li className="flex gap-1.5 items-center"><Check className="w-3 h-3 text-amber-500"/> Harmonogram</li>
                        </ul>
                        <SimpleContactForm pageName="Kalkulačka - Odhad rozpočtu" hideCalculatorLink={true} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Ceny aktualizované:
                  </span>
                      <span className="font-bold text-zinc-900" suppressHydrationWarning>{currentMonthYear}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 text-[11px] text-amber-900 leading-relaxed font-medium mt-4">
                  Zaujíma vás detailný rozpis? Kontaktujte našich inžinierov pre bezplatnú obhliadku a poradenstvo pre váš projekt.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
