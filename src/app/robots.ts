import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/client-portal/', '/api/', '/_next/', '/static/'],
    },
    sitemap: 'https://creatoroftechnology.com/sitemap.xml',
    host: 'https://creatoroftechnology.com',
  };
}