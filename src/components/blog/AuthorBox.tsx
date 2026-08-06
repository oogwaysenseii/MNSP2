import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Company byline shown under every article.
 *
 * Previously this used an Unsplash portrait — a real, identifiable person who
 * doesn't work here — presented as the article's author, plus a claim about
 * "certifikovaní inžinieri a projektanti". Replaced with the logo mark and
 * copy that only states what can be backed up.
 */
export function AuthorBox() {
  return (
    <div className="mt-12 p-6 sm:p-8 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start gap-6">
      <div className="relative w-32 h-12 shrink-0">
        <Image
          src="/mnsp-logo-mark-light.png"
          alt="MNSP | Stavby a rekonštrukcie"
          fill
          sizes="128px"
          className="object-contain object-left"
        />
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-display font-bold text-zinc-950">
            MNSP | Stavby a rekonštrukcie
          </h3>
          <p className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider mt-1">
            Stavby a rekonštrukcie
          </p>
        </div>

        <p className="text-zinc-600 text-sm leading-relaxed">
          Staviame rodinné domy na kľúč, bytové a priemyselné objekty, realizujeme
          hrubé stavby aj kompletné rekonštrukcie. Články na tomto blogu vychádzajú
          z toho, s čím sa stretávame priamo na stavbách — nie z teórie.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-xs font-bold">
          <Link
            href="/o-nas"
            className="inline-flex items-center gap-1 text-zinc-900 hover:text-amber-600 transition-colors"
          >
            O nás <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-zinc-900 hover:text-amber-600 transition-colors"
          >
            Naše realizácie <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-1 text-zinc-900 hover:text-amber-600 transition-colors"
          >
            Kontakt <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
