import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { portfolio } from '@/data';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'In-depth case studies showcasing our successful projects and client outcomes.',
};

export default function CaseStudiesPage() {
  const featuredCaseStudies = portfolio.filter(p => p.caseStudyUrl && p.testimonial);

  return (
    <div className="section bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4" dot>Case Studies</Badge>
          <h1 className="section-title">Deep Dives Into Our Work</h1>
          <p className="section-subtitle">
            Explore detailed case studies that showcase how we solve complex challenges and deliver measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCaseStudies.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="elevated" hover padding="none" className="h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.shortDescription}</p>
                  {project.testimonial && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        &quot;{project.testimonial.content}&quot;
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link href={project.caseStudyUrl || '#'} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
