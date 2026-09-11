import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { services } from '@/data';

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
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
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4" dot>{service.title}</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <Card variant="bordered" padding="lg" className="text-center">
                <DollarSign className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price Range</p>
                <p className="font-heading font-bold text-gray-900 dark:text-white">{service.priceRange}</p>
              </Card>
              <Card variant="bordered" padding="lg" className="text-center">
                <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Delivery Time</p>
                <p className="font-heading font-bold text-gray-900 dark:text-white">{service.deliveryTime}</p>
              </Card>
              <Card variant="bordered" padding="lg" className="text-center">
                <CheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Popular</p>
                <p className="font-heading font-bold text-gray-900 dark:text-white">{service.popular ? 'Yes' : 'Standard'}</p>
              </Card>
            </div>

            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-2 mb-12">
              {service.technologies.map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Discuss This Service
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
