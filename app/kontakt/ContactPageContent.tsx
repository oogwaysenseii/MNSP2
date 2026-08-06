"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Plus, Minus, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import FullContactForm from '@/src/components/sections/FullContactForm';
import { BRANCHES } from '@/src/lib/schema';

export default function ContactPageContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentOfficeDetails = {
    city: 'Zvolen',
    address: 'Jozefa Kozáčeka 829/2',
    coordinates: '960 01, Zvolen',
    phone: '+421 950 699 585',
    email: 'info@mnsp.sk',
    hours: 'Po - Pia • 7:00 - 18:00',
  };

  /**
   * TODO — the previous answers asserted a 25-year warranty on structural work,
   * that "all" buildings reach energy class A0, and a real-time client portal
   * showing the itemised budget. None could be verified. Rewritten to what can
   * be stood behind; restore specifics once confirmed.
   */
  const faqs = [
    {
      question: 'Ako prebieha spolupráca od prvého kontaktu po odovzdanie?',
      answer: 'Začíname obhliadkou a konzultáciou priamo na mieste. Na jej základe pripravíme cenovú ponuku s položkovým rozpisom — vidíte, čo koľko stojí, nie jedno číslo na konci. Ak sa dohodneme, podpíšeme zmluvu o dielo s harmonogramom a platobnými etapami. Počas realizácie máte prideleného stavbyvedúceho, ktorý je vaším kontaktným človekom.'
    },
    {
      question: 'Aký energetický štandard dosahujú vaše stavby?',
      answer: 'Nové rodinné domy realizujeme v súlade s aktuálnymi požiadavkami na energetickú hospodárnosť budov. Konkrétna trieda závisí od projektu — od skladby obvodového plášťa, okien a zdroja tepla. Pri návrhu vám vieme poradiť, čo sa reálne oplatí a kde sa investícia do úspor vráti, a čo je už len drahšie číslo v projekte.'
    },
    {
      question: 'Ako kontrolujete kvalitu nosných konštrukcií a betónu?',
      answer: 'Pred betonážou odoberáme kontrolné vzorky a overujeme pevnosť betónovej zmesi aj správnosť uloženia armatúry. Návrh nosných konštrukcií vždy prechádza statikom. Záruka na dielo je uvedená v zmluve a jej rozsah zodpovedá typu prác — iná je pri nosných konštrukciách a iná pri povrchových úpravách.'
    },
    {
      question: 'Môžem si počas stavby meniť materiály alebo rozsah prác?',
      answer: 'Áno. Drobné zmeny riešime priebežne, zásadné zmeny nosných konštrukcií si však vyžadujú zmenu stavebného povolenia. Každú zmenu rozsahu zapíšeme do písomného dodatku s prepočítaním nákladov, takže vopred viete, čo to znamená pre cenu aj pre termín. To, čo je v pôvodnej položkovej ponuke, sa nemení.'
    }
  ];

  return (
    <div className="bg-white text-zinc-900 py-16 sm:py-24 pt-32 sm:pt-40">
      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* TOP INTRO */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
            KONTAKTUJTE NÁS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-950">
            Dohodnite si nezáväznú konzultáciu.
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Kontaktujte nás telefonicky, e-mailom alebo prostredníctvom formulára.
          </p>
        </div>

        {/* SECTION A: DETAILED CONTROLLER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT OFFICE CONTACT DECK (5 COLS) */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase">
              1. Naša centrála
            </h2>

            {/* Selected Office Details Block */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 space-y-6">
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
                    <span className="block text-zinc-500 font-mono text-[10px]">Priama linka</span>
                    <a href={`tel:${currentOfficeDetails.phone}`} className="font-bold text-zinc-900 hover:text-amber-600 transition-colors">
                      {currentOfficeDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-500 font-mono text-[10px]">E-mail</span>
                    <a href={`mailto:${currentOfficeDetails.email}`} className="font-bold text-zinc-900 hover:text-amber-500 transition-colors">
                      {currentOfficeDetails.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-500 font-mono text-[10px]">Otváracie hodiny</span>
                    <span className="font-bold text-zinc-900">{currentOfficeDetails.hours}</span>
                  </div>
                </div>

              </div>

              {/* Availability note — the previous "Zodpovedný vedúci:" line had an
                  empty value, so it rendered a label and a pinging dot with no name. */}
              <div className="border-t border-zinc-200 pt-5 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-[11px] font-mono text-zinc-500">
                  Na dopyty odpovedáme spravidla{' '}
                  <span className="text-zinc-900 font-bold">do jedného pracovného dňa</span>
                </p>
              </div>

            </div>

            {/* Other branches */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase">
                Ďalšie pobočky
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(BRANCHES)
                  .filter((b) => b.key !== 'zvolen')
                  .map((b) => (
                    <div key={b.key} className="bg-white border border-zinc-200 p-4 text-xs">
                      <span className="block font-bold text-zinc-900 mb-1">{b.city}</span>
                      <span className="block text-zinc-500 leading-relaxed">
                        {b.streetAddress}
                        <br />
                        {b.zip} {b.city}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* RIGHT OFFICE ESTIMATIONS DOCKET (7 COLS) */}
          <div className="lg:col-span-7">
            <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase mb-8">
              2. Kontaktný formulár
            </h2>
            <FullContactForm />
          </div>

        </div>

        {/* SECTION B: DETAILED CONTRACTING FAQS SYSTEM */}
        <div className="border-t border-zinc-200 pt-20 max-w-[1500px] mx-auto space-y-12">
          
          <div className="text-center space-y-3.5">
            <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block">
              NAJČASTEJŠIE OTÁZKY BÝVANIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-neutral-950">
              Otázky o stavebnom procese a zmluvách
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Zrozumiteľné vysvetlenie dôležitých fáz stavby rodinného domu, overovania kvality a nárokov na bezpečnosť.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className=" grid grid-cols-1 gap-4 pt-4 text-left">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-zinc-50 hover:bg-neutral-50/50  border border-zinc-200 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-extrabold text-zinc-950 text-sm sm:text-base tracking-tight cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className="p-1 bg-white border border-zinc-200  text-zinc-500 shrink-0">
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
                        <div className="px-5 pb-5 pt-1 text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-200">
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
