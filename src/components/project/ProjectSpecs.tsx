import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';

export function ProjectSpecs({ project }: { project: Project }) {
  if (!project.specs || project.specs.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className=" mx-auto">
          <h2 className="text-2xl font-display font-bold text-zinc-900 mb-8">Technické špecifikácie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between p-4 bg-zinc-50  border border-zinc-100">
                <span className="text-sm text-zinc-500 font-medium mb-1 sm:mb-0">{spec.label}</span>
                <span className="text-sm font-bold text-zinc-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
