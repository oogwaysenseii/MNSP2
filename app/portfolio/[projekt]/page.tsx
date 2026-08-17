import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSEOTags } from '@/src/lib/seo';
import { generateBreadcrumbSchema, DOMAIN } from '@/src/lib/schema';
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
import { CTA } from '@/src/components/sections/CTA';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    projekt: project.id,
  }));
}

/**
 * These pages previously exported no metadata at all, so all eight inherited
 * the root layout's — same generic title, no canonical, and og:url pointing at
 * the homepage. They are the strongest proof-of-work pages on the site.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ projekt: string }>;
}): Promise<Metadata> {
  const { projekt } = await params;
  const project = projectsData.find((p) => p.id === projekt);
  if (!project) notFound();

  const locationSuffix = project.location ? ` ${project.location}` : '';
  const title = project.title.includes(project.location ?? '')
    ? project.title
    : `${project.title}${locationSuffix}`;

  return getSEOTags({
    title,
    description: project.description,
    path: `/portfolio/${project.id}`,
    imageUrl: project.imageUrl?.startsWith('http')
      ? project.imageUrl
      : `${DOMAIN}${project.imageUrl}`,
    type: 'article',
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ projekt: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find(p => p.id === resolvedParams.projekt);

  if (!project) {
    notFound();
  }

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Portfólio', path: '/portfolio' },
      { name: project.title, path: `/portfolio/${project.id}` },
    ]),
  ];

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      {/* Same CTA as the homepage — it carries the contact form rather than
          just a link to /kontakt. `pageName` goes into the lead email, so a
          enquiry from here is attributable to the project that prompted it. */}
      <CTA pageName={`Portfólio – ${project.title}`} />
    </article>
  );
}