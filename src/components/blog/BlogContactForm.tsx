'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Sidebar form on article pages.
 *
 * Replaces a version whose submit handler was `alert('… (Demo)')` — it told
 * visitors their message had been sent and delivered nothing. Posts to
 * /api/blog-contact and reports real success and failure states.
 */
export function BlogContactForm({ pageName }: { pageName: string }) {
  const [form, setForm] = useState({ phone: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/blog-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pageName }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Správu sa nepodarilo odoslať.');
      }

      setStatus('sent');
      setForm({ phone: '', email: '', message: '', company: '' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Nastala chyba. Skúste to znova.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-emerald-900">Správa odoslaná</p>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Ozveme sa vám čo najskôr, spravidla do jedného pracovného dňa.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={update}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="blog-phone" className="sr-only">
          Telefónne číslo
        </label>
        <input
          type="tel"
          id="blog-phone"
          name="blog-phone"
          autoComplete="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          placeholder="Vaše tel. číslo"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="blog-email" className="sr-only">
          E-mail
        </label>
        <input
          type="email"
          id="blog-email"
          name="blog-email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="Váš e-mail (nepovinné)"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="blog-message" className="sr-only">
          Správa
        </label>
        <textarea
          id="blog-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={update}
          placeholder="Ako vám môžeme pomôcť?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="flex items-start gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-mono font-bold text-xs uppercase tracking-wider py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === 'sending' ? (
          <>
            Odosielam <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </>
        ) : (
          <>
            Odoslať <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      <p className="text-[11px] text-zinc-400 leading-relaxed">
        Odoslaním formulára súhlasíte so spracovaním osobných údajov podľa{' '}
        <a href="/ochrana-sukromia" className="underline hover:text-amber-600">
          zásad ochrany súkromia
        </a>
        .
      </p>
    </form>
  );
}
