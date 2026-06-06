import { siteMetadata } from '../data/metadata';
import type { Metadata } from 'next';

export function getSEOTags(title: string, description: string): Metadata {
  return {
    title: `${title} | ${siteMetadata.title}`,
    description: description || siteMetadata.description,
  };
}
