'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { websiteTemplates } from '@/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check, ExternalLink, Star, ChevronLeft, ChevronRight, Code, Layout, Smartphone, Globe, Users, Shield, Zap, Palette, Database, Server, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function TemplatePreviewPage() {
  const params = useParams();
  const { t } = useLanguage();
  const templateId = params.id as string;
  const template = websiteTemplates.find(t => t.id === templateId);

  if (!template) {
    notFound();
  }

  const currentIndex = websiteTemplates.findIndex(t => t.id === templateId);
  const prevTemplate = websiteTemplates[currentIndex - 1];
  const nextTemplate = websiteTemplates[currentIndex + 1];

  const featuresByCategory = {
    'Core Features': template.features.slice(0, 5),
    'Advanced Features': template.features.slice(5),
  };

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="template-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/templates"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Back to templates"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <Badge variant="primary" className="mr-2">{template.category}</Badge>
                {template.popular && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </Badge>
                )}
              </div>
              <h1 id="template-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {template.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="gap-2" asChild>
                  <Link href={`/contact?template=${templateId}`}>
                    Get This Template
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Live Preview
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{template.priceRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  <span>{template.pages.length} Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{template.features.length} Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>{template.technologies.length} Technologies</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="preview-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start gap-2" asChild>
                      <Link href={`/contact?template=${templateId}`}>
                        <ArrowRight className="w-4 h-4" />
                        Request Quote
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        View Live Demo
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-left">
                      <Code className="w-4 h-4" />
                      View Code Structure
                    </Button>
                  </div>
                </Card>

                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Target Audience</h3>
                  <p className="text-gray-600 dark:text-gray-400">{template.targetAudience}</p>
                </Card>

                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {template.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                    ))}
                  </div>
                </Card>

                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Pages Included</h3>
                  <ul className="space-y-2" role="list">
                    {template.pages.map((page) => (
                      <li key={page} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{page}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </aside>

            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={template.image}
                    alt={`${template.name} preview`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge variant="primary" className="mb-2">{template.category}</Badge>
                    <h3 className="text-xl font-heading font-bold text-white">{template.name}</h3>
                    <p className="text-primary-100 mt-1">{template.shortDescription}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 id="preview-heading" className="section-title">Key Features</h2>
                    <p className="section-subtitle">Everything you need to launch quickly</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(featuresByCategory).map(([category, features], catIndex) => (
                    features.length > 0 && (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary-600" />
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {features.map((feature, featIndex) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: catIndex * 0.1 + featIndex * 0.05 }}
                            >
                              <Card variant="bordered" padding="md" className="flex items-start gap-3 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="section-title">Pages Structure</h2>
                <p className="section-subtitle mb-6">Complete page architecture for your website</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {template.pages.map((page, index) => (
                    <motion.div
                      key={page}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card variant="bordered" padding="md" className="flex items-center gap-3 group hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                          <Layout className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{page}</span>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="section-title">Responsive & Adaptive</h2>
                <p className="section-subtitle mb-6">Works perfectly on all devices and screen sizes</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Smartphone, label: 'Mobile', desc: '320px - 767px' },
                    { icon: Layout, label: 'Tablet', desc: '768px - 1023px' },
                    { icon: Globe, label: 'Desktop', desc: '1024px+' },
                  ].map((device) => (
                    <Card key={device.label} variant="bordered" padding="lg" className="text-center h-full">
                      <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                        {React.createElement(device.icon, { className: 'w-7 h-7 text-primary-600 dark:text-primary-400' })}
                      </div>
                      <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">{device.label}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{device.desc}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="tech-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Technology Stack</Badge>
            <h2 id="tech-heading" className="section-title">Built with Modern Technologies</h2>
            <p className="section-subtitle">We use the best tools to ensure performance, scalability, and maintainability.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {template.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card variant="bordered" padding="md" className="text-center hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">{tech}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="customization-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Customization</Badge>
            <h2 id="customization-heading" className="section-title">Make It Uniquely Yours</h2>
            <p className="section-subtitle">Every template is fully customizable to match your brand identity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: 'Brand Colors', desc: 'Complete color system with CSS variables' },
              { icon: Database, title: 'Content Management', desc: 'Headless CMS integration ready' },
              { icon: Shield, title: 'Security', desc: 'Enterprise-grade security built-in' },
              { icon: Server, title: 'Backend APIs', desc: 'REST/GraphQL API layer included' },
              { icon: Users, title: 'User Roles', desc: 'Multi-role authentication system' },
              { icon: Zap, title: 'Performance', desc: 'Optimized for Core Web Vitals' },
              { icon: Globe, title: 'Multi-language', desc: 'i18n support for global reach' },
              { icon: Mail, title: 'Email Templates', desc: 'Transactional & marketing emails' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
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
              Ready to Get Started?
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Launch Your {template.name} Website
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get a production-ready website in weeks, not months. We&apos;ll customize, deploy, and support your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link href={`/contact?template=${templateId}`}>
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/templates">
                  Browse Other Templates
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="navigation-heading">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {prevTemplate && (
              <Link
                href={prevTemplate.previewUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Previous: {prevTemplate.name}</span>
              </Link>
            )}
            <Link
              href="/templates"
              className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
              All Templates
            </Link>
            {nextTemplate && (
              <Link
                href={nextTemplate.previewUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              >
                <span className="font-medium">Next: {nextTemplate.name}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}