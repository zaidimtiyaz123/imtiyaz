import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { portfolio } from '@/data';

interface PortfolioDetailPageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const project = portfolio.find((p) => p.id === params.id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = portfolio.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="section bg-white dark:bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="primary">{project.category}</Badge>
              {project.featured && <Badge variant="warning">Featured</Badge>}
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {project.results.map((result, index) => (
                <Card key={index} variant="bordered" padding="lg" className="text-center">
                  <p className="text-3xl font-heading font-bold gradient-text mb-1">
                    {result.split(' ')[0]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.replace(result.split(' ')[0] + ' ', '')}
                  </p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Client</h2>
                <Card variant="bordered" padding="lg">
                  <div className="flex items-center gap-4 mb-4">
                    {project.clientLogo && (
                      <img src={project.clientLogo} alt={project.clientName} className="h-10 w-auto" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{project.clientName}</p>
                    </div>
                  </div>
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Visit Project
                    </a>
                  )}
                </Card>
              </div>
            </div>

            {project.testimonial && (
              <Card variant="bordered" padding="lg" className="mb-12">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(project.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                  &quot;{project.testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
                    {project.testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.testimonial.role}, {project.testimonial.company}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start a Similar Project
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
