import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import {
  BRANCHES,
  BUSINESS,
  generateBranchSchema,
  generateBreadcrumbSchema,
  HQ_BRANCH_KEY,
} from '@/src/lib/schema';
import { getSEOTags } from '@/src/lib/seo';
import FullContactForm from '@/src/components/sections/FullContactForm';

interface PageProps {
  params: Promise<{ pobocka: string }>;
}

export function generateStaticParams() {
  return Object.keys(BRANCHES).map((pobocka) => ({ pobocka }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pobocka } = await params;
  const branch = BRANCHES[pobocka];
  if (!branch) notFound();

  return getSEOTags(
    `Kontakt ${branch.city}`,
    `${branch.role} MNSP v meste ${branch.city} — ${branch.streetAddress}, ${branch.zip} ${branch.city}. Telefón, e-mail a otváracie hodiny.`,
    branch.pagePath,
  );
}

/**
 * One page per branch.
 *
 * Each of the three Google Business Profiles needs its own landing page — the
 * LocalBusiness entities in schema.ts carry an `@id` of
 * `{DOMAIN}/kontakt/{key}#localbusiness`, and those references pointed at 404s
 * until now. Set this URL as the website in the matching GBP.
 */
export default async function BranchPage({ params }: PageProps) {
  const { pobocka } = await params;
  const branch = BRANCHES[pobocka];
  if (!branch) notFound();

  const others = Object.values(BRANCHES).filter((b) => b.key !== branch.key);

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Kontakt', path: '/kontakt' },
      { name: branch.city, path: branch.pagePath },
    ]),
    generateBranchSchema(branch.key),
  ].filter(Boolean);

  return (
    <div className="bg-white text-zinc-900 pt-32 sm:pt-40 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1500px] mx-auto px-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-6 uppercase">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Domov
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/kontakt" className="hover:text-amber-600 transition-colors">
            Kontakt
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-800 font-bold">{branch.city}</span>
        </nav>

        <div className="space-y-4 mb-16 max-w-3xl">
          <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
            {branch.role}
            {branch.key === HQ_BRANCH_KEY ? '' : ' MNSP'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-950">
            {branch.role} {branch.city}
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">{branch.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase">
              1. Kontaktné údaje
            </h2>

            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 space-y-6">
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-zinc-900">{branch.streetAddress}</span>
                    <span className="text-zinc-500">
                      {branch.zip} {branch.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-500 font-mono text-[10px]">Telefón</span>
                    <a
                      href={`tel:${branch.phone}`}
                      className="font-bold text-zinc-900 hover:text-amber-600 transition-colors"
                    >
                      +421 950 699 585
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-500 font-mono text-[10px]">E-mail</span>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="font-bold text-zinc-900 hover:text-amber-600 transition-colors"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-200/60 pt-4">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-500 font-mono text-[10px]">
                      Otváracie hodiny
                    </span>
                    <span className="font-bold text-zinc-900">Po – Pia • 7:00 – 18:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase">
                Odtiaľto obsluhujeme
              </h2>
              <ul className="flex flex-wrap gap-2">
                {branch.areaServed.map((place) => (
                  <li
                    key={place}
                    className="text-xs bg-zinc-50 px-3 py-1.5 text-zinc-700 border border-zinc-200"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase">
                Ďalšie pobočky
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {others.map((b) => (
                  <Link
                    key={b.key}
                    href={b.pagePath}
                    className="group bg-white border border-zinc-200 p-4 text-xs hover:border-amber-500 transition-colors"
                  >
                    <span className="flex items-center gap-2 font-bold text-zinc-900 group-hover:text-amber-600 transition-colors mb-1">
                      <Building2 className="w-3.5 h-3.5 text-amber-600" />
                      {b.city}
                    </span>
                    <span className="block text-zinc-500 leading-relaxed">
                      {b.streetAddress}
                      <br />
                      {b.zip} {b.city}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-xs font-mono text-zinc-500 font-bold tracking-widest uppercase mb-8">
              2. Napíšte nám
            </h2>
            <FullContactForm pageName={`Pobočka ${branch.city}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
