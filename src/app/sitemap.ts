import { MetadataRoute } from 'next';
import { services, portfolio } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creatoroftechnology.com';
  const currentDate = new Date();

  const staticRoutes = [
    '',
    '/services',
    '/portfolio',
    '/about',
    '/blog',
    '/contact',
    '/client-portal',
    '/careers',
    '/privacy',
    '/terms',
    '/cookies',
    '/case-studies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const portfolioRoutes = portfolio.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(project.date || currentDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes];
}