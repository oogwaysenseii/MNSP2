import { Hero } from '@/src/components/sections/Hero';
import { ServicesGrid } from '@/src/components/sections/ServicesGrid';
import { ElevatedUrbanConcept } from '@/src/components/sections/ElevatedUrbanConcept';
import { Projects } from '@/src/components/sections/Projects';
import { CTA } from '@/src/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ElevatedUrbanConcept />
      <Projects />
      <CTA />
    </>
  );
}
