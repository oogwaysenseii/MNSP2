import { siteMetadata } from '@/src/data/metadata';

export default function sitemap() {
  return [
    {
      url: `${siteMetadata.siteUrl}`,
      lastModified: new Date(),
    }
  ];
}
