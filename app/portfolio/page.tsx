import { Projects } from '@/src/components/sections/Projects';

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
