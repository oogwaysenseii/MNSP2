import { Phone, Mail, MapPin } from 'lucide-react';
import { BlogContactForm } from './BlogContactForm';
import { BUSINESS, BRANCHES, HQ_BRANCH_KEY } from '@/src/lib/schema';

const hq = BRANCHES[HQ_BRANCH_KEY];

/**
 * Sidebar on article pages.
 *
 * The previous version shipped a form whose submit handler was
 * `alert('... (Demo)')` — visitors were told their message had been sent and
 * nothing was ever delivered. It also listed a placeholder phone number
 * (+421 900 000 000) and "Bratislava, Slovensko" as the location.
 *
 * Now uses the real SimpleContactForm and pulls contact details from the
 * single source in schema.ts.
 */
export function BlogSidebarContact({ pageName = 'Blog' }: { pageName?: string }) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 p-6 shadow-sm">
      <h3 className="text-xl font-display font-extrabold text-zinc-950 mb-4">
        Potrebujete poradiť?
      </h3>
      <p className="text-sm text-zinc-600 mb-6">
        Zanechajte nám správu a ozveme sa vám čo najskôr.
      </p>

      <BlogContactForm pageName={pageName} />

      <div className="space-y-4 pt-6 mt-8 border-t border-zinc-200">
        <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
          Kontakty
        </h3>

        <a
          href={`tel:${BUSINESS.mainPhone}`}
          className="flex items-center gap-3 text-sm text-zinc-700 hover:text-amber-600 transition-colors"
        >
          <div className="w-8 h-8 bg-white border border-zinc-200 flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span>+421 950 699 585</span>
        </a>

        <a
          href={`mailto:${BUSINESS.email}`}
          className="flex items-center gap-3 text-sm text-zinc-700 hover:text-amber-600 transition-colors"
        >
          <div className="w-8 h-8 bg-white border border-zinc-200 flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span>{BUSINESS.email}</span>
        </a>

        <div className="flex items-start gap-3 text-sm text-zinc-700">
          <div className="w-8 h-8 bg-white border border-zinc-200 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <span className="leading-relaxed">
            {hq.streetAddress}
            <br />
            {hq.zip} {hq.city}
          </span>
        </div>
      </div>
    </div>
  );
}
