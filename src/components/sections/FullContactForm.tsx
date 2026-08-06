'use client';

import { useState } from 'react';
import { ArrowRight, Calculator, Check, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  message: '',
  projectType: 'rodinny-dom',
};

/**
 * Main contact form.
 *
 * Previously styled for a dark background while sitting on white — inputs had
 * `text-white` on `bg-white`, so anything typed was invisible, and labels were
 * zinc-400 on zinc-50, well below contrast minimums.
 *
 * It also rendered a file input that was never read by handleSubmit and never
 * reached the API — visitors attached their projektová dokumentácia, saw a
 * success message, and nothing arrived. Removed until real upload storage is
 * wired in; the message field now asks people to mention documents so we can
 * request them by e-mail.
 */
export default function FullContactForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: honeypot }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Správu sa nepodarilo odoslať.');
      }

      setStatus('sent');
      setFormData(INITIAL);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Nastala chyba. Skúste to znova.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="bg-zinc-50 border border-zinc-200 p-8 sm:p-12 text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
          <Check className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-display font-extrabold text-zinc-950">
          Ďakujeme za váš dopyt
        </h3>
        <p className="text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
          Ozveme sa vám spravidla do jedného pracovného dňa. Ak máte k projektu
          dokumentáciu, pošlite nám ju v odpovedi na náš e-mail.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 cursor-pointer"
        >
          Odoslať ďalší dopyt
        </button>
      </div>
    );
  }

  const labelClass =
    'text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-bold ml-1';
  const inputClass =
    'w-full bg-white border border-zinc-300 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-50 p-8 sm:p-10 border border-zinc-200 space-y-6 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none" />

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-1">
          <label htmlFor="name" className={labelClass}>
            Meno a priezvisko *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ján Novák"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className={labelClass}>
            Telefónne číslo *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+421 900 123 456"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="jan.novak@example.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="projectType" className={labelClass}>
            Typ projektu
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="rodinny-dom">Rodinný dom na kľúč</option>
            <option value="rekonstrukcia">Hrubá stavba / Rekonštrukcia</option>
            <option value="komercna-budova">Komerčná / Priemyselná budova</option>
            <option value="ine">Špecifické stavebné práce (iné)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1 relative z-10">
        <label htmlFor="message" className={labelClass}>
          Detaily dopytu (stručný popis, lokalita...)
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Dobrý deň, mal by som záujem o nacenenie hrubej stavby rodinného domu vo Zvolene. Mám projektovú dokumentáciu..."
        />
        <p className="text-[11px] text-zinc-500 ml-1 pt-1">
          Máte projektovú dokumentáciu alebo pôdorys? Napíšte nám to a vyžiadame si ich
          e-mailom.
        </p>
      </div>

      {status === 'error' && (
        <p className="flex items-start gap-2 text-xs text-red-700 relative z-10">
          <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10 pt-4 border-t border-zinc-200">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-amber-500 hover:bg-amber-400 disabled:bg-zinc-200 disabled:border-zinc-200 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors shadow-lg cursor-pointer"
        >
          {status === 'sending' ? (
            <>
              Odosielam <Loader2 className="w-4 h-4 ml-1 animate-spin" />
            </>
          ) : (
            <>
              Odoslať dopyt <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>

        <Link
          href="/kalkulacka"
          className="flex-[0.7] inline-flex items-center justify-center gap-2 py-3.5 bg-white border border-zinc-300 text-zinc-900 font-bold text-xs uppercase tracking-wider hover:border-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
        >
          Kalkulačka
          <Calculator className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="relative z-10 text-center pt-2">
        <span className="text-[10px] font-mono text-zinc-500 leading-normal block">
          Odoslaním formulára súhlasíte so spracovaním osobných údajov podľa{' '}
          <Link href="/ochrana-sukromia" className="underline hover:text-amber-600">
            zásad ochrany súkromia
          </Link>
          .
        </span>
      </div>
    </form>
  );
}
