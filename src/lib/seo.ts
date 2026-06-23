import { COMPANY_NAME, DOMAIN } from './schema';
import type { Metadata } from 'next';

export function getSEOTags(title: string, description: string, path?: string): Metadata {
  const url = path ? `${DOMAIN}${path}` : DOMAIN;
  return {
    title: title, // Layout will append ` | ${COMPANY_NAME}` if we use template, but here we provide a specific title
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
  };
}
