import { Projects } from '@/src/components/sections/Projects';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = getSEOTags(
  "Portfólio",
  "Kompletný prehľad našich stavebných realizácií a projektov.",
  "/portfolio"
);

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Projects 
        titleSk="Všetky realizované projekty" 
        subtitleSk="Kompletný prehľad našich stavebných realizácií."
        viewMode="grid" 
      />
    </div>
  );
}
