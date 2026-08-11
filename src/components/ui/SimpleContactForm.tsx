"use client";

import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';

export function SimpleContactForm({
                                    pageName,
                                    hideCalculatorLink = false,
                                  }: {
  pageName: string;
  hideCalculatorLink?: boolean;
}) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [honeypot, setHoneypot] = useState('');

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
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
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

        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-2">
            <label
                htmlFor="phone"
                className="text-sm font-medium text-zinc-400"
            >
            </label>
            <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all "
                placeholder="Vaše tel. číslo:"
            />
          </div>

          <div className="space-y-2">
            <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-400"
            >
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-zinc-200 px-4 py-2 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all "
                placeholder="Váš e-mail:"
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 ${hideCalculatorLink ? '' : 'sm:grid-cols-2'} gap-4 mt-5`}>
          <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 text-zinc-950 font-bold text-sm hover:bg-amber-400 transition-colors cursor-pointer "
          >
            Odoslať
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          {!hideCalculatorLink && (
              <Link
                  href="/kalkulacka"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-zinc-700 text-white font-medium text-sm hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer "
              >
                Kalkulačka
                <Calculator className="w-4 h-4 ml-1" />
              </Link>
          )}
        </div>
      </form>
  );
}