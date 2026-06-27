'use client';

import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export function BlogSidebarContact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Správa bola úspešne odoslaná! (Demo)');
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-display font-extrabold text-zinc-950 mb-4">
        Potrebujete poradiť?
      </h3>
      <p className="text-sm text-zinc-600 mb-6">
        Zanechajte nám správu a náš odborný tím sa vám ozve čo najskôr.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="sidebar-name" className="sr-only">Meno</label>
          <input 
            type="text" 
            id="sidebar-name" 
            placeholder="Vaše meno" 
            required
            className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="sidebar-email" className="sr-only">E-mail</label>
          <input 
            type="email" 
            id="sidebar-email" 
            placeholder="E-mail" 
            required
            className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="sidebar-message" className="sr-only">Správa</label>
          <textarea 
            id="sidebar-message" 
            rows={3} 
            placeholder="Ako vám môžeme pomôcť?" 
            required
            className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          Odoslať <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="space-y-4 pt-6 border-t border-zinc-200">
        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">Kontakty</h4>
        <a href="tel:+421900000000" className="flex items-center gap-3 text-sm text-zinc-700 hover:text-amber-600 transition-colors">
          <div className="w-8 h-8 bg-white border border-zinc-200 rounded-full flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span>+421 900 000 000</span>
        </a>
        <a href="mailto:info@mnsp.sk" className="flex items-center gap-3 text-sm text-zinc-700 hover:text-amber-600 transition-colors">
          <div className="w-8 h-8 bg-white border border-zinc-200 rounded-full flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span>info@mnsp.sk</span>
        </a>
        <div className="flex items-center gap-3 text-sm text-zinc-700">
          <div className="w-8 h-8 bg-white border border-zinc-200 rounded-full flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span>Bratislava, Slovensko</span>
        </div>
      </div>
    </div>
  );
}
