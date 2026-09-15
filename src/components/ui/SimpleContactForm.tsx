"use client";

import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';

export function SimpleContactForm({
                                    pageName,
                                    hideCalculatorLink = false,
                                    surface = 'dark',
                                  }: {
  pageName: string;
  hideCalculatorLink?: boolean;
  /**
   * Which background the form sits on.
   *
   * On the CTA card (near-black) the fields are white with a white border by
   * design — the border just extends the fill. The calculator drops the same
   * form onto a white card, where that border would disappear and the inputs
   * would read as floating text. 'light' swaps in a visible zinc edge; nothing
   * else differs.
   */
  surface?: 'dark' | 'light';
}) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [honeypot, setHoneypot] = useState('');

  const inputClass = `w-full border ${
    surface === 'light' ? 'border-zinc-300' : 'border-white'
  } bg-white px-[18px] py-[15px] text-[15px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-[3px] focus:ring-amber-500/45`;

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
          company: honeypot,
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
      <form onSubmit={handleSubmit} className="w-full">
        {/* Honeypot — hidden from people, filled by bots. */}
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {/* The labels are visually hidden, not removed — the design shows only
            placeholders, but a placeholder is not an accessible name. */}
        <div className="space-y-3.5">
          <div>
            <label htmlFor="phone" className="sr-only">Telefónne číslo</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Vaše tel. číslo:"
                className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">E-mailová adresa</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Váš e-mail:"
                className={inputClass}
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-3.5 mt-5 ${hideCalculatorLink ? '' : 'sm:grid-cols-2'}`}>
          <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2
                bg-amber-500 px-5 py-[15px] text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
          >
            Odoslať
            <ArrowRight className="h-4 w-4" />
          </button>

          {!hideCalculatorLink && (
              <Link
                  href="/kalkulacka"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2
                    border border-zinc-700 bg-transparent px-5 py-[15px] text-sm font-medium text-white
                    transition-colors hover:border-amber-500 hover:text-amber-500"
              >
                Kalkulačka
                <Calculator className="h-4 w-4" />
              </Link>
          )}
        </div>
      </form>
  );
}
