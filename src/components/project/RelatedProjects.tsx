import Link from 'next/link';
import Image from 'next/image';
import { Project, projectsData } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { MapPin, Calendar } from 'lucide-react';

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'residential': return 'Rodinné domy';
    case 'renovations': return 'Rekonštrukcie';
    case 'commercial': return 'Komerčné priestory';
    case 'industrial': return 'Priemyselné stavby';
    case 'civil': return 'Inžinierske stavby';
    default: return 'Projekt';
  }
};

export function RelatedProjects({ currentProject }: { currentProject: Project }) {
  // Find related projects (same category, excluding current)
  let related = projectsData
      .filter(p => p.id !== currentProject.id && p.category === currentProject.category)
      .slice(0, 3);

  // If not enough related projects, backfill with others
  if (related.length < 3) {
    const others = projectsData
        .filter(p => p.id !== currentProject.id && p.category !== currentProject.category)
        .slice(0, 3 - related.length);
    related = [...related, ...others];
  }

  if (related.length === 0) return null;

  return (
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <Container className="max-w-[1500px]">
          <h2 className="text-3xl font-display font-bold text-zinc-900 mb-10">Ďalšie projekty</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map(proj => (
                <Link
                    key={proj.id}
                    href={`/portfolio/${proj.id}`}
                    className="bg-gray-50 border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                        src={proj.imageUrl}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-black/90 text-white text-[10px] font-mono tracking-wider font-bold uppercase px-2 py-1">
                      {getCategoryLabel(proj.category)}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span className="font-semibold">{proj.location}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 leading-relaxed bg-zinc-50 relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase mb-3">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      <span>{`Rok ${proj.year}`}</span>
                    </div>
                    <h4 className="text-xl font-bold text-black tracking-tight mb-3 group-hover:text-amber-600 transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                      {proj.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 mt-auto">
                      <div className="space-y-1">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400">
                      ROZPOČET
                    </span>
                        <span className="block text-sm font-bold text-black">{proj.budgetString || '-'}</span>
                      </div>
                      <div className="space-y-1">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400">
                      TRVANIE
                    </span>
                        <span className="block text-sm font-bold text-black">{proj.duration || '-'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
            ))}
          </div>
        </Container>
      </section>
  );
}
