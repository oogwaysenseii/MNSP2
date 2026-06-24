import { Metadata } from 'next';
import Script from 'next/script';
import { Hero } from '@/src/components/sections/Hero';
import { ServicesGrid } from '@/src/components/sections/ServicesGrid';
import { ElevatedUrbanConcept } from '@/src/components/sections/ElevatedUrbanConcept';
import { Projects } from '@/src/components/sections/Projects';
import { CTA } from '@/src/components/sections/CTA';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema, DOMAIN } from '@/src/lib/schema';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
    const jsonLd = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateLocalBusinessSchema('Zvolen'),
        generateLocalBusinessSchema('Hrinova'),
        generateLocalBusinessSchema('BanskaBystrica'),
    ];

    return (
        <>
            <Script
                id="homepage-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <Hero />
            <ServicesGrid />
            <ElevatedUrbanConcept />
            <Projects />
            <CTA pageName="MNSP - Domovská stránka" />
        </>
    );
}