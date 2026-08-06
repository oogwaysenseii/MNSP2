import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { Quote } from 'lucide-react';

/**
 * Renders only when a project actually has a consented testimonial.
 * The section used to carry Tailwind `hidden`, which hides it visually but
 * still ships the quote in the HTML — no good for an unverified attribution.
 */
export function ProjectTestimonial({ project }: { project: Project }) {
  if (!project.testimonial) return null;

  return (
    <section className="py-24 bg-zinc-950 text-white">
      <Container className="max-w-[1500px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Quote className="w-12 h-12 text-amber-500/50 mx-auto" />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-tight text-white">
            "{project.testimonial.quote}"
          </blockquote>
          <div className="space-y-1 pt-4">
            <div className="font-bold text-lg">{project.testimonial.author}</div>
            <div className="text-zinc-400 text-sm">
              {project.testimonial.role} {project.testimonial.company && <span>• {project.testimonial.company}</span>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
