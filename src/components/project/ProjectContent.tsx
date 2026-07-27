import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';

export function ProjectContent({ project }: { project: Project }) {
  if (!project.contentSections || project.contentSections.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <Container className="max-w-[1500px]">
        <div className=" mx-auto space-y-16">
          {project.contentSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-zinc-900">{section.title}</h2>
              <div className="prose prose-lg prose-zinc max-w-none text-zinc-600 leading-relaxed">
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
