import { notFound } from 'next/navigation';
import { projectsData } from '@/src/data/projects';
import { ProjectHero } from '@/src/components/project/ProjectHero';
import { ProjectOverview } from '@/src/components/project/ProjectOverview';
import { ProjectGallery } from '@/src/components/project/ProjectGallery';
import { ProjectContent } from '@/src/components/project/ProjectContent';
import { ProjectSpecs } from '@/src/components/project/ProjectSpecs';
import { ProjectServices } from '@/src/components/project/ProjectServices';
import { ProjectChallenges } from '@/src/components/project/ProjectChallenges';
import { ProjectTimeline } from '@/src/components/project/ProjectTimeline';
import { ProjectTestimonial } from '@/src/components/project/ProjectTestimonial';
import { RelatedProjects } from '@/src/components/project/RelatedProjects';
import { ProjectCTA } from '@/src/components/project/ProjectCTA';

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
    <article className="min-h-screen bg-white">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectContent project={project} />
      <ProjectSpecs project={project} />
      <ProjectServices project={project} />
      <ProjectChallenges project={project} />
      <ProjectTimeline project={project} />
      <ProjectTestimonial project={project} />
      <RelatedProjects currentProject={project} />
      <ProjectCTA />
    </article>
  );
}