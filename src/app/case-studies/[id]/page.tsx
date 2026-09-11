import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { portfolio } from '@/data';

interface CaseStudyPageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = portfolio.find((p) => p.id === params.id);
  if (!project) return { title: 'Case Study Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
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

          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-12 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {project.clientName}
              </span>
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {project.technologies.slice(0, 4).join(', ')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {project.results.map((result, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
                  <p className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {result.split(' ')[0]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.replace(result.split(' ')[0] + ' ', '')}
                  </p>
                </div>
              ))}
            </div>

            {project.testimonial && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Client Feedback
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  &quot;{project.testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                    {project.testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.testimonial.role}, {project.testimonial.company}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Your Project
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
