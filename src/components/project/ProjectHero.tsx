import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Calendar, Tag } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Project } from '@/src/data/projects';

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="pt-32 pb-16 bg-white">
      <Container className="max-w-[1500px]">
        <Link href="/portfolio" className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-amber-600 transition-colors mb-10 group">
          <ChevronLeft className="w-4 h-4 mr-1 transform transition-transform group-hover:-translate-x-1" />
          Späť na portfólio
        </Link>
        
        <div className="mb-12 space-y-6 ">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono tracking-widest text-amber-600 font-bold uppercase">
            {project.year && (
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Rok {project.year}</span>
            )}
            {project.year && project.location && <span>|</span>}
            {project.location && (
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}</span>
            )}
            {((project.year || project.location) && project.category) && <span>|</span>}
            {project.category && (
              <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {project.category}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-zinc-950 leading-[1.1]">
            {project.title}
          </h1>
        </div>
        
        <div className="relative w-full aspect-video md:aspect-[21/9]  overflow-hidden shadow-2xl bg-zinc-100">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </Container>
    </div>
  );
}
