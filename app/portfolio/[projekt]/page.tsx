import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, MapPin, Calendar } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { projectsData } from '@/src/data/projects';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    projekt: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ projekt: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find(p => p.id === resolvedParams.projekt);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-16">
      <Container className="max-w-[1000px]">
        <Link href="/portfolio" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-amber-600 transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 mr-1 transform transition-transform group-hover:-translate-x-1" />
          Späť na portfólio
        </Link>
        
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-4 text-sm font-mono tracking-widest text-amber-600 font-bold uppercase">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Rok {project.year}</span>
            <span>|</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.location}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black flex items-center gap-4">
            {project.title}
          </h1>
        </div>
        
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 shadow-2xl">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="prose prose-lg max-w-none prose-gray">
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
            {project.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-100 bg-gray-50/50 px-8 rounded-xl">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Rozpočet</p>
              <p className="font-bold text-xl text-black">{project.budgetString}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Trvanie</p>
              <p className="font-bold text-xl text-black">{project.duration}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Kategória</p>
              <p className="font-bold text-xl text-black">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Lokalita</p>
              <p className="font-bold text-xl text-black">{project.location}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}