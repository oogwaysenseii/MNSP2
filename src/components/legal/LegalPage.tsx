import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Shared shell for /ochrana-sukromia and /obchodne-podmienky.
 * Keeps both pages visually consistent with the rest of the site.
 */
export function LegalPage({
  title,
  effectiveFrom,
  intro,
  children,
}: {
  title: string;
  effectiveFrom: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-20 text-zinc-900 border-t border-zinc-200">
      <div className="max-w-[1500px] mx-auto px-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 uppercase">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Domov
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-800 font-bold">{title}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-zinc-950 mb-3">
          {title}
        </h1>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-8">
          Účinné od {effectiveFrom}
        </p>
        <p className="text-zinc-600 leading-relaxed mb-12 pb-8 border-b border-zinc-200">
          {intro}
        </p>

        <div className="space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-display font-bold text-zinc-950 flex gap-3">
        <span className="text-amber-600 font-mono text-base shrink-0">
          {String(number).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed pl-0 sm:pl-9">
        {children}
      </div>
    </section>
  );
}

export function LegalTable({
  head,
  rows,
}: {
  head: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto border border-zinc-200">
      <table className="w-full text-xs">
        <thead className="bg-zinc-50">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="text-left font-mono font-bold uppercase tracking-wider text-zinc-500 px-4 py-3 border-b border-zinc-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-100 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-zinc-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
