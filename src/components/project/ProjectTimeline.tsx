import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';

export function ProjectTimeline({ project }: { project: Project }) {
  if (!project.timeline || project.timeline.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className=" mx-auto">
          <h2 className="text-3xl font-display font-bold text-zinc-900 mb-12 text-center">Priebeh projektu</h2>
          
          <div className="relative ml-4 md:ml-0 md:pl-0">
            <div className="absolute w-px h-full bg-zinc-200 left-0 md:left-1/2 transform md:-translate-x-1/2"></div>
            
            {project.timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 last:mb-0 flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline dot */}
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white border-2 border-amber-500 transform md:-translate-x-1/2 mt-1.5 md:mt-0"></div>
                
                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <div className="bg-zinc-50 p-6  border border-zinc-100">
                    <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-2">{item.date}</span>
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
