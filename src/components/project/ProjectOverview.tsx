import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';

export function ProjectOverview({ project }: { project: Project }) {
  const overviewItems = [
    { label: 'Rozpočet', value: project.budgetString },
    { label: 'Trvanie', value: project.duration },
    { label: 'Kategória', value: project.category },
    { label: 'Lokalita', value: project.location }
  ].filter(item => item.value);

  if (overviewItems.length === 0 && !project.description) return null;

  return (
    <section className="py-12 bg-white">
      <Container className="max-w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Description */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="sr-only">Prehľad projektu</h2>
            <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>
          
          {/* Metrics Card */}
          {overviewItems.length > 0 && (
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-zinc-50 border border-zinc-200  p-8 shadow-sm">
                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 font-bold mb-6">Detaily projektu</h3>
                <div className="space-y-6">
                  {overviewItems.map((item, idx) => (
                    <div key={idx} className="flex flex-col border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">{item.label}</span>
                      <span className="font-bold text-lg text-zinc-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
