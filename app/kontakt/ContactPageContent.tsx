"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Plus, Minus, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import FullContactForm from '@/src/components/sections/FullContactForm';

export default function ContactPageContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentOfficeDetails = {
    city: 'Zvolen',
    address: 'Jozefa Kozáčeka 829/2',
    coordinates: '960 01, Zvolens',
    phone: '+421 950 699 585',
    email: 'info@mnsp.sk',
    hours: 'Po - Pia • 7:00 - 18:00',
    manager: ''
  };

  const faqs = [
    {
      question: 'Ako funguje proces realizácie stavby na kľúč pod jednou zmluvou?',
      answer: 'Náš integrovaný model spája projekčnú prípravu s priamou stavebnou realizáciou. Nemusíte samostatne najímať architekta a následne stavebnú firmu, kde by ste bojovali s prekročením rozpočtu. Naši autorizovaní inžinieri a remeselníci spolupracujú od prvého dňa, čo urýchľuje stavebné povolenia a garantuje zmluvne dohodnutú cenu.'
    },
    {
      question: 'Spĺňajú vaše stavby slovenské a európske energetické kritériá?',
      answer: 'Áno, všetky nami realizované obytné budovy spĺňajú aktuálnu najprísnejšiu triedu energetickej hospodárnosti A0. Používame výhradne overené zatepľovacie systémy, certifikované tvárnice so skvelou akumuláciou tepla, hliníkové okná s trojsklom a inteligentné systémy núteného vetrania (rekuperácia) pre zdravé bývanie.'
    },
    {
      question: 'Aké záruky poskytujete na nosné konštrukcie a monolitický betón?',
      answer: 'Na statiku stavby, základovú dosku, železobetónové piloty a nosné steny poskytujeme nadštandardnú záruku 25 rokov. Pred každou betonážou prísne odoberáme kontrolné kocky a laboratórne overujeme pevnosť betónových zmesí a správnosť uloženia armatúry.'
    },
    {
      question: 'Môžem si počas rekonštrukcie alebo hrubej stavby meniť materiály?',
      answer: 'Určite áno. Počas celej výstavby máte prideleného stavebného dozora a prístup do klientskeho rozhrania, kde vidíte položkový rozpočet v reálnom čase. Akékoľvek zmeny materiálov, obkladov či rozloženia priečok spoločne zapíšeme a premietneme do dodatku s okamžitým prepočítaním nákladov.'
    }
  ];

  return (
    <div className="bg-white text-zinc-900 py-16 sm:py-24 pt-32 sm:pt-40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP INTRO */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
            KONTAKTUJTE NÁS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-950">
            Dohodnite si nezáväznú konzultáciu.          </h1>
          <p className="text-zinc-650 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Kontaktujte nás telefonicky, e-mailom alebo prostredníctvom formulára.          </p>
        </div>

        {/* SECTION A: DETAILED CONTROLLER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT OFFICE CONTACT DECK (5 COLS) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase">
              1. NAŠA CENTRÁLA
            </h3>

            {/* Selected Office Details Block */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-zinc-900">{currentOfficeDetails.address}</span>
                    <span className="text-zinc-500">{currentOfficeDetails.coordinates}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-400 font-mono text-[10px]">PRIAMA LINKA DOPYTU</span>
                    <a href={`tel:${currentOfficeDetails.phone}`} className="font-bold text-zinc-900 hover:text-amber-600 transition-colors">
                      {currentOfficeDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-400 font-mono text-[10px]">STAVEBNÁ KOREŠPONDENCIA</span>
                    <a href={`mailto:${currentOfficeDetails.email}`} className="font-bold text-zinc-900 hover:text-amber-500 transition-colors">
                      {currentOfficeDetails.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-400 font-mono text-[10px]">OTVÁRACÍ ČAS POBOČKY</span>
                    <span className="font-bold text-zinc-900">{currentOfficeDetails.hours}</span>
                  </div>
                </div>

              </div>

              {/* Coordinator citation */}
              <div className="border-t border-zinc-200 pt-5 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                <p className="text-[11px] font-mono text-zinc-500">
                  Zodpovedný vedúci: <span className="text-zinc-900 font-bold">{currentOfficeDetails.manager}</span>
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT OFFICE ESTIMATIONS DOCKET (7 COLS) */}
          <div className="lg:col-span-7">
            <h3 className="text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase mb-8">
              2. KONTAKTNÝ FORMULÁR
            </h3>
            <FullContactForm />
          </div>

        </div>

        {/* SECTION B: DETAILED CONTRACTING FAQS SYSTEM */}
        <div className="border-t border-zinc-200 pt-20 max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3.5">
            <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
              NAJČASTEJŠIE OTÁZKY BÝVANIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-neutral-950">
              Otázky o stavebnom procese a zmluvách
            </h2>
            <p className="text-zinc-650 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Zrozumiteľné vysvetlenie dôležitých fáz stavby rodinného domu, overovania kvality a nárokov na bezpečnosť.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="grid grid-cols-1 gap-4 pt-4 text-left">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-zinc-50 hover:bg-neutral-50/50 rounded-xl border border-zinc-200 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-extrabold text-zinc-950 text-sm sm:text-base tracking-tight cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className="p-1 bg-white border border-zinc-200 rounded text-zinc-500 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-150">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
