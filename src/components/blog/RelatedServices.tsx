import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { getServiceBySlug } from '@/src/data/services';
import type { ServiceSlug } from '@/src/data/services-slugs';

interface RelatedServicesProps {
  content: string;
  tags: string[];
}

/**
 * Keyword → service. The trade entries carry a `slug` typed as ServiceSlug,
 * so the URL is built from a value the compiler has checked against the real
 * routes.
 *
 * Six of these previously hardcoded a shortened URL — '/sluzby/murarske',
 * '/sluzby/vykopove', '/sluzby/monoliticke' and so on. Those are component
 * keys, not route slugs, so every one of them 404'd from the blog articles
 * that matched their keywords.
 */
type ServiceLink =
  | { keywords: string[]; slug: ServiceSlug; name?: string }
  | { keywords: string[]; url: string; name: string };

const serviceMap: ServiceLink[] = [
  { keywords: ['rodinn', 'dom', 'dom na kľúč', 'domu na kľúč'], url: '/sluzby/rodinne-domy/stavba-domu-na-kluc', name: 'Stavba domu na kľúč' },
  { keywords: ['rekonštrukc', 'rekonštrukcia domu'], url: '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu', name: 'Rekonštrukcia rodinného domu' },
  { keywords: ['murár', 'hrubá stavba', 'murárske práce'], slug: 'murarske-prace' },
  { keywords: ['fasád', 'zateplenie'], slug: 'fasady', name: 'Realizácia fasád' },
  { keywords: ['omietk'], slug: 'omietky' },
  { keywords: ['poter'], slug: 'potery' },
  { keywords: ['obklad', 'dlažb', 'kúpeľn'], slug: 'obkladacske-prace' },
  { keywords: ['výkop', 'zemné práce'], slug: 'vykopove-zemne-prace' },
  { keywords: ['búrac', 'búranie'], slug: 'buracie-prace' },
  { keywords: ['monolit'], slug: 'monoliticke-konstrukcie' },
  { keywords: ['tesár', 'krov'], slug: 'tesarske-prace' },
];

/** Resolve a map entry to its href and label, preferring the SERVICES record. */
function resolve(entry: ServiceLink): { url: string; name: string } {
  if ('url' in entry) return { url: entry.url, name: entry.name };
  const service = getServiceBySlug(entry.slug);
  return {
    url: `/sluzby/${entry.slug}`,
    name: entry.name ?? service?.name ?? entry.slug,
  };
}

export function RelatedServices({ content, tags }: RelatedServicesProps) {
  const normalizedText = (content + ' ' + tags.join(' ')).toLowerCase();
  
  // Find matching services
  const matchedServices = serviceMap.filter(service => 
    service.keywords.some(keyword => normalizedText.includes(keyword))
  ).slice(0, 3).map(resolve); // Max 3 services

  if (matchedServices.length === 0) return null;

  return (
    <div className="mt-12 bg-white border border-zinc-200  p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10  bg-amber-50 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-zinc-950">Súvisiace služby</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchedServices.map((service, idx) => (
          <Link
            key={service.url}
            href={service.url}
            className="group flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/30  transition-all"
          >
            <span className="font-bold text-zinc-900 text-sm group-hover:text-amber-700 transition-colors">
              {service.name}
            </span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
