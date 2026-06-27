import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

interface RelatedServicesProps {
  content: string;
  tags: string[];
}

// Map keywords to specific service URLs
const serviceMap = [
  { keywords: ['rodinn', 'dom', 'dom na kľúč', 'domu na kľúč'], url: '/sluzby/rodinne-domy/stavba-domu-na-kluc', name: 'Stavba domu na kľúč' },
  { keywords: ['rekonštrukc', 'rekonštrukcia domu'], url: '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu', name: 'Rekonštrukcia rodinného domu' },
  { keywords: ['murár', 'hrubá stavba', 'murárske práce'], url: '/sluzby/murarske', name: 'Murárske práce' },
  { keywords: ['fasád', 'zateplenie'], url: '/sluzby/fasady', name: 'Realizácia fasád' },
  { keywords: ['omietk'], url: '/sluzby/omietky', name: 'Omietky' },
  { keywords: ['poter'], url: '/sluzby/potery', name: 'Potery' },
  { keywords: ['obklad', 'dlažb', 'kúpeľn'], url: '/sluzby/obkladacske', name: 'Obkladačské práce' },
  { keywords: ['výkop', 'zemné práce'], url: '/sluzby/vykopove', name: 'Výkopové a zemné práce' },
  { keywords: ['búrac', 'búranie'], url: '/sluzby/buracie', name: 'Búracie práce' },
  { keywords: ['monolit'], url: '/sluzby/monoliticke', name: 'Monolitické konštrukcie' },
  { keywords: ['tesár', 'krov'], url: '/sluzby/tesarske', name: 'Tesárske práce' },
];

export function RelatedServices({ content, tags }: RelatedServicesProps) {
  const normalizedText = (content + ' ' + tags.join(' ')).toLowerCase();
  
  // Find matching services
  const matchedServices = serviceMap.filter(service => 
    service.keywords.some(keyword => normalizedText.includes(keyword))
  ).slice(0, 3); // Max 3 services

  if (matchedServices.length === 0) return null;

  return (
    <div className=" bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-zinc-950">Súvisiace služby</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchedServices.map((service, idx) => (
          <Link 
            key={idx} 
            href={service.url}
            className="group flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/30 rounded-lg transition-all"
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
