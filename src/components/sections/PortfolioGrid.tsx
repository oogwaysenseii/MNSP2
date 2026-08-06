'use client';

import { useSearchParams } from 'next/navigation';
import { Projects } from './Projects';
import type { ServiceCategory } from '@/src/data/projects';

const CATEGORIES: readonly string[] = [
  'Rodinné domy',
  'Rezidenčné budovy',
  'Komerčná výstavba',
  'Priemyselné objekty',
  'Občianske stavby',
];

/**
 * Thin client wrapper that reads ?category= from the URL.
 *
 * The "Všetky projekty" links on carousel instances point at
 * /portfolio?category=… so the grid opens on the section the visitor came
 * from. Reading it here rather than in Projects keeps that hook off every
 * other page that renders the carousel, and reading it client-side rather
 * than via searchParams keeps /portfolio statically prerendered.
 */
export function PortfolioGrid() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('category');
  const initial: ServiceCategory | 'all' =
    raw && CATEGORIES.includes(raw) ? (raw as ServiceCategory) : 'all';

  return <Projects hideHeader viewMode="grid" defaultCategory={initial} />;
}
