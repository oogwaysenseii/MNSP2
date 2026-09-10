'use client';

import { useEffect, useState } from 'react';
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
 * /portfolio?category=… so the grid opens on the section the visitor came from.
 *
 * The param is read from window.location AFTER mount, deliberately. Calling
 * useSearchParams() here opts this subtree out of static prerendering — Next
 * ships the Suspense fallback in the HTML instead, which left /portfolio with
 * zero project links and ~218 words for crawlers. Starting at 'all' means the
 * full grid is in the static HTML; a deep link re-filters on hydration.
 *
 * Reading it in useState's initializer instead would desync server ('all') and
 * client (filtered) and trip a hydration mismatch, so the effect is required.
 */
export function PortfolioGrid() {
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('category');
    if (raw && CATEGORIES.includes(raw)) setCategory(raw as ServiceCategory);
  }, []);

  return <Projects hideHeader viewMode="grid" defaultCategory={category} />;
}
