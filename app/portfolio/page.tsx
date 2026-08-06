import { PortfolioGrid } from '@/src/components/sections/PortfolioGrid';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, DOMAIN } from '@/src/lib/schema';
import { projectsData } from '@/src/data/projects';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = getSEOTags(
  'Portfólio',
  'Prehľad našich stavebných realizácií — rodinné domy, zariadenia sociálnych služieb a verejné budovy v Banskobystrickom kraji.',
  '/portfolio',
);

export default function PortfolioPage() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Portfólio', path: '/portfolio' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Realizované stavebné projekty',
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((proj, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: proj.title,
        url: `${DOMAIN}/portfolio/${proj.id}`,
      })),
    },
  ];

  return (
    <div className="bg-white pt-24 pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1500px] mx-auto px-6">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase block mb-3">
          Portfólio
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-950 tracking-tight">
          Naše realizácie
        </h1>
        <p className="text-zinc-500 mt-4 max-w-2xl text-lg leading-relaxed">
          Rodinné domy, zariadenia sociálnych služieb aj verejné budovy. Filtrujte podľa
          typu stavby alebo lokality.
        </p>
      </div>

      <Suspense fallback={null}>
        <PortfolioGrid />
      </Suspense>
    </div>
  );
}
