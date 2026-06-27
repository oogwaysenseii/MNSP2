import { COMPANY_NAME, DOMAIN } from './schema';
import type { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export function getSEOTags(
  titleOrProps: string | SEOProps,
  legacyDescription?: string,
  legacyPath?: string
): Metadata {
  let title = '';
  let description = '';
  let path = '';
  let imageUrl = `${DOMAIN}/og-image.jpg`; // Fallback default image
  let type: 'website' | 'article' = 'website';
  let publishedTime;
  let modifiedTime;
  let author;
  let keywords: string[] = [];

  if (typeof titleOrProps === 'string') {
    title = titleOrProps;
    description = legacyDescription || '';
    path = legacyPath || '';
  } else {
    title = titleOrProps.title;
    description = titleOrProps.description;
    path = titleOrProps.path || '';
    if (titleOrProps.imageUrl) imageUrl = titleOrProps.imageUrl;
    if (titleOrProps.type) type = titleOrProps.type;
    publishedTime = titleOrProps.publishedTime;
    modifiedTime = titleOrProps.modifiedTime;
    author = titleOrProps.author;
    if (titleOrProps.keywords) keywords = titleOrProps.keywords;
  }

  const url = path ? `${DOMAIN}${path}` : DOMAIN;
  
  return {
    title: title,
    description: description,
    keywords: keywords.length > 0 ? keywords.join(', ') : 'stavebná firma, stavba domu na kľúč, rekonštrukcia domu',
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: type,
      siteName: COMPANY_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
      creator: '@mnsp_stavby',
    },
  };
}
