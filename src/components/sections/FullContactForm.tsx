"use client";

import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function FullContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: 'rodinny-dom'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log('Form submitted:', formData);
    alert('Ďakujeme za vašu správu. Budeme vás čoskoro kontaktovať.');
    setFormData({ name: '', email: '', phone: '', message: '', projectType: 'rodinny-dom' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 sm:p-10 border border-zinc-800 space-y-6  shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5  blur-3xl" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-1">
          <label htmlFor="name" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">Meno a Priezvisko *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-800  px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="Ján Novák"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="phone" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">Telefónne číslo *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-800  px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="+421 900 000 000"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-800  px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="jan.novak@example.com"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="projectType" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">Typ projektu</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-800  px-4 py-3 text-black focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="rodinny-dom">Rodinný dom na kľúč</option>
            <option value="rekonstrukcia">Hrubá stavba / Rekonštrukcia</option>
            <option value="komercna-budova">Komerčná / Priemyselná budova</option>
            <option value="ine">Špecifické stavebné práce (iné)</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-1 relative z-10">
        <label htmlFor="message" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">Detaily dopytu (Stručný popis, lokalita...)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white border border-zinc-800  px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          placeholder="Dobrý deň, mal by som záujem o nacenenie hrubej stavby rodinného domu v Košiciach..."
        />
      </div>

      <div className="space-y-1 relative z-10">
        <label htmlFor="files" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1">Prílohy (Projektová dokumentácia, pôdorys...)</label>
        <div className="relative">
          <input
            type="file"
            id="files"
            name="files"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            title="Kliknite alebo potiahnite súbory sem"
          />
          <div className="w-full bg-white border border-dashed border-zinc-700  px-4 py-6 text-center focus-within:border-amber-500 transition-colors relative z-10 flex flex-col items-center justify-center gap-2">
             <div className="p-2 bg-zinc-800  text-zinc-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
             </div>
             <span className="text-sm text-zinc-400 font-medium">Kliknite alebo potiahnite súbory sem</span>
             <span className="text-xs text-zinc-600 block ext-center">PDF, DOC, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10 pt-4 border-t border-zinc-800">
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider  border border-amber-500 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
        >
          Odoslať dopyt
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
        
        <Link 
          href="/kalkulacka"
          className="flex-[0.7] inline-flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-700  text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Konfigurátor
          <Calculator className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="relative z-10 text-center pt-2">
        <span className="text-[10px] font-mono text-zinc-500 leading-normal block">
          Odoslaním formulára súhlasíte so spracovaním osobných údajov.
        </span>
      </div>
    </form>
  );
}
