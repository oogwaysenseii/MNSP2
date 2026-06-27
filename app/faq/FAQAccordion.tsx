"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    category: "Všeobecné",
    questions: [
      {
        q: "Aké lokality obsluhujete?",
        a: "Pôsobíme predovšetkým v Banskobystrickom kraji a okolí. Pri väčších projektoch, ako je stavba rodinného domu na kľúč, sme ochotní vycestovať aj do iných regiónov Slovenska po individuálnej dohode."
      },
      {
        q: "Poskytujete cenovú ponuku zdarma?",
        a: "Áno, po úvodnej konzultácii a obhliadke miesta realizácie vám vypracujeme predbežnú cenovú ponuku úplne nezáväzne a bezplatne."
      },
      {
        q: "Aké sú vaše záručné podmienky?",
        a: "Na všetky naše stavebné práce poskytujeme štandardnú zákonnú záruku. Na špecifické materiály sa vzťahuje záruka priamo od výrobcu (často predĺžená). Zakladáme si na kvalite a v prípade reklamácie reagujeme promptne."
      }
    ]
  },
  {
    category: "Priebeh výstavby a rekonštrukcie",
    questions: [
      {
        q: "Zabezpečujete aj stavebné povolenie a projektovú dokumentáciu?",
        a: "Spolupracujeme s overenými architektmi a projektantmi, takže vám vieme pomôcť s vybavením projektovej dokumentácie aj inžinieringom pre stavebné povolenie. Kompletný servis je pre nás prioritou."
      },
      {
        q: "Ako dlho trvá stavba domu na kľúč?",
        a: "Dĺžka výstavby závisí od veľkosti, zložitosti a zvolenej technológie (murovaný dom vs. drevostavba). Priemerne trvá realizácia hrubej stavby 2-3 mesiace a kompletizácia domu na kľúč celkovo 8-12 mesiacov."
      },
      {
        q: "Zabezpečujete odvoz a likvidáciu stavebného odpadu?",
        a: "Áno, pri všetkých búracích, výkopových a rekonštrukčných prácach automaticky zabezpečujeme odvoz a ekologickú likvidáciu stavebnej sutiny a odpadu na certifikované skládky."
      },
      {
        q: "Môžem si dodávať vlastný materiál?",
        a: "Áno, je to možné po vzájomnej dohode. Avšak pre zachovanie záruky na dielo ako celok odporúčame, aby sme stavebné materiály dodávali my. Máme výborné vzťahy s dodávateľmi a vieme často zabezpečiť lepšie ceny a zaručiť správnu kvalitu."
      }
    ]
  },
  {
    category: "Cenotvorba a platby",
    questions: [
      {
        q: "Ako prebieha financovanie stavby?",
        a: "Platby si spravidla rozdeľujeme do niekoľkých tranží na základe vopred dohodnutého harmonogramu a zrealizovaných etáp výstavby. Nikdy nepožadujeme platbu celej sumy vopred."
      },
      {
        q: "Je možné financovať stavbu hypotékou?",
        a: "Samozrejme. Naše zmluvy o dielo a priebežné súpisy prác sú akceptované všetkými slovenskými bankami pri čerpaní hypotekárneho úveru."
      }
    ]
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      {faqs.map((group, gIdx) => (
        <div key={gIdx}>
          <h2 className="text-xl font-display font-bold text-zinc-900 mb-6 pb-2 border-b border-zinc-200">
            {group.category}
          </h2>
          <div className="space-y-4">
            {group.questions.map((faq, qIdx) => {
              const id = `${gIdx}-${qIdx}`;
              const isOpen = openIndex === id;
              
              return (
                <div key={qIdx} className="border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                  <button
                    onClick={() => toggleAccordion(id)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-zinc-900 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-5 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
