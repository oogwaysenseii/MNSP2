import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { CheckCircle2 } from 'lucide-react';

export function ProjectServices({ project }: { project: Project }) {
  if (!project.services || project.services.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className=" mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8">Poskytnuté služby</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {project.services.map((service, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-amber-800  text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                {service}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
