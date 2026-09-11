'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolio } from '@/data';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ExternalLink, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(portfolio.map(p => p.category)))];

  const filteredProjects = activeCategory === 'all'
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="portfolio-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                Our Work
              </Badge>
              <h1 id="portfolio-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t('portfolio.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('portfolio.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="projects-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 id="projects-heading" className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Explore our latest work across various industries and technologies.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? t('portfolio.categories') : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" hover padding="none" className="h-full overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <Badge variant="primary">{project.category}</Badge>
                      {project.featured && (
                        <Badge variant="warning">Featured</Badge>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        {project.clientLogo && (
                          <img src={project.clientLogo} alt={project.clientName} className="h-6 w-auto opacity-80" />
                        )}
                        <span>{project.clientName}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.shortDescription}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                      ))}
                    </div>

                    {project.testimonial && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
                          &quot;{project.testimonial.content}&quot;
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={project.testimonial.avatar}
                            alt={project.testimonial.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{project.testimonial.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{project.testimonial.role}, {project.testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href={project.caseStudyUrl || '#'}
                        className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                      >
                        {t('portfolio.viewCaseStudy')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('portfolio.visitProject')}
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400">No projects found in this category.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">
                View All Case Studies
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="results-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Impact Delivered</Badge>
            <h2 id="results-heading" className="section-title">Measurable Results for Our Clients</h2>
            <p className="section-subtitle">We don&apos;t just deliver projects; we deliver business outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Revenue Growth', value: '300%', description: 'Average revenue increase for e-commerce clients' },
              { label: 'User Engagement', value: '250%', description: 'Increase in user engagement metrics' },
              { label: 'Cost Reduction', value: '40%', description: 'Operational cost savings through automation' },
              { label: 'Time to Market', value: '60%', description: 'Faster delivery with our agile process' },
            ].map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full text-center">
                  <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-2">{result.value}</div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">{result.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{result.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary-600 dark:bg-primary-700" aria-labelledby="cta-heading">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-white/30 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              Have a Project in Mind?
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Let&apos;s Create Your Success Story
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join 200+ satisfied clients who have transformed their business with our technology solutions.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}