import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { AlertCircle, Lightbulb } from 'lucide-react';

export function ProjectChallenges({ project }: { project: Project }) {
  if (!project.challenges || project.challenges.length === 0) return null;

  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className=" mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-display font-bold text-zinc-900">Výzvy a riešenia</h2>
            <p className="text-zinc-600">Ako sme sa vysporiadali so špecifickými požiadavkami projektu.</p>
          </div>
          
          <div className="space-y-8">
            {project.challenges.map((item, idx) => (
              <div key={idx} className="bg-white  border border-zinc-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10  bg-red-50 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="font-bold text-lg text-zinc-900">Výzva</h3>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div className="p-8 bg-zinc-50/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10  bg-emerald-50 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="font-bold text-lg text-zinc-900">Riešenie</h3>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">{item.solution}</p>
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
