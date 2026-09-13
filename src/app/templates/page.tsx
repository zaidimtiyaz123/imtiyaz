'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { websiteTemplates } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check, Star, ExternalLink, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';
import Image from 'next/image';

export default function TemplatesPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(websiteTemplates.map(t => t.category)))];

  const filteredTemplates = websiteTemplates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="templates-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                Website Templates
              </Badge>
              <h1 id="templates-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Ready-to-Use Website Models
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Choose from 12+ professionally designed website templates across different industries. 
                Each template is production-ready, fully customizable, and includes all essential features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery('')} className="whitespace-nowrap">
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="categories-heading">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Template categories">
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
                {category === 'all' ? 'All Templates' : category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" hover padding="none" className="h-full overflow-hidden group relative">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <Badge variant="primary">{template.category}</Badge>
                      {template.popular && (
                        <Badge variant="warning" className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-wrap gap-2">
                        {template.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{template.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{template.shortDescription}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{template.priceRange}</span>
                      </div>
                      <Link
                        href={template.previewUrl}
                        className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 group"
                      >
                        View Demo
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400">{template.pages.length}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Pages</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400">{template.features.length}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Features</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400">{template.technologies.length}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Tech Stack</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No templates found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Need a Custom Template?
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="features-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">What&apos;s Included</Badge>
            <h2 id="features-heading" className="section-title">Every Template Comes With</h2>
            <p className="section-subtitle">Production-ready features that save you months of development time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Check, title: 'Responsive Design', description: 'Mobile-first, works perfectly on all devices' },
              { icon: Check, title: 'TypeScript & Next.js', description: 'Type-safe, modern React framework' },
              { icon: Check, title: 'Tailwind CSS', description: 'Utility-first styling, easy to customize' },
              { icon: Check, title: 'Dark Mode', description: 'Built-in dark/light theme support' },
              { icon: Check, title: 'SEO Optimized', description: 'Meta tags, sitemap, structured data' },
              { icon: Check, title: 'Accessibility', description: 'WCAG 2.1 AA compliant' },
              { icon: Check, title: 'Performance', description: 'Optimized images, lazy loading, caching' },
              { icon: Check, title: 'CMS Ready', description: 'Contentful, Sanity, or headless CMS' },
              { icon: Check, title: 'Analytics', description: 'Vercel Analytics, GA4, PostHog ready' },
              { icon: Check, title: 'Forms & Validation', description: 'React Hook Form + Zod validation' },
              { icon: Check, title: 'Animations', description: 'Framer Motion & CSS transitions' },
              { icon: Check, title: 'Documentation', description: 'Complete setup & customization guide' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
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
              Ready to Launch?
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Pick a Template & Go Live in Weeks
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Don&apos;t start from scratch. Choose a template, customize it to your brand, and launch faster.
              We&apos;ll help you deploy and customize every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/templates/corporate-enterprise">
                  View Live Demo
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}