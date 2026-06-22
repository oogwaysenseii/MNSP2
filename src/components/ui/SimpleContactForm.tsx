"use client";

import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';

export function SimpleContactForm({
                                    pageName,
                                  }: {
  pageName: string;
}) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/simple-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      alert('Ďakujeme za váš dopyt. Budeme vás čoskoro kontaktovať.');

      setFormData({
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error(error);
      alert('Nastala chyba. Skúste to znova.');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
                htmlFor="phone"
                className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1"
            >
              Telefónne číslo *
            </label>

            <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-white/10 px-4 py-3 text-black placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="+421 900 000 000"
            />
          </div>

          <div className="space-y-1">
            <label
                htmlFor="email"
                className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold ml-1"
            >
              E-mail
            </label>

            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-white/10 px-4 py-3 text-black placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="jan.novak@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            Odoslať
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <Link
              href="/kalkulacka"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-transparent border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
          >
            Rozpočtová kalkulačka
            <Calculator className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </form>
  );
}