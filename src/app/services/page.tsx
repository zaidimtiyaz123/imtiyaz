'use client';

import { useLanguage } from '@/context/LanguageContext';
import { services } from '@/data';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="services-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                Our Services
              </Badge>
              <h1 id="services-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t('services.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('services.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="all-services-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Service Categories</h3>
                  <nav aria-label="Service categories">
                    <ul className="space-y-2" role="list">
                      {services.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`#${service.id}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                          >
                            <span className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                              {getServiceIcon(service.icon, 'w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white')}
                            </span>
                            <span className="font-medium">{service.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Card>

                <Card variant="bordered" padding="lg">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Need a Custom Solution?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Don&apos;t see exactly what you need? We build custom solutions tailored to your unique requirements.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Discuss Your Project</Link>
                  </Button>
                </Card>
              </div>
            </aside>

            <div className="lg:col-span-2 space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="bordered" padding="lg" className="group">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        {getServiceIcon(service.icon, 'w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h2 id={service.id} className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                                {service.title}
                              </h2>
                              {service.popular && <Badge variant="primary" size="sm">{t('services.popular')}</Badge>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('services.features')}</h4>
                            <ul className="space-y-2" role="list">
                              {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('services.technologies')}</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{t('services.priceRange')} </span>{service.priceRange}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{t('services.deliveryTime')} </span>{service.deliveryTime}
                          </div>
                          <Button variant="outline" size="sm" asChild className="ml-auto">
                            <Link href={`/contact?service=${service.id}`}>
                              Get Quote
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="process-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Our Process</Badge>
            <h2 id="process-heading" className="section-title">How We Deliver Excellence</h2>
            <p className="section-subtitle">A proven methodology that ensures quality, transparency, and on-time delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', description: 'Deep dive into your requirements, goals, and constraints through workshops and research.', icon: 'Search' },
              { step: '02', title: 'Planning', description: 'Detailed project roadmap, architecture design, technology selection, and timeline estimation.', icon: 'FileText' },
              { step: '03', title: 'Design', description: 'UI/UX design, prototyping, design systems, and user testing for optimal experience.', icon: 'Palette' },
              { step: '04', title: 'Development', description: 'Agile development with clean code, code reviews, CI/CD, and continuous testing.', icon: 'Code' },
              { step: '05', title: 'Testing', description: 'Comprehensive QA including unit, integration, E2E, performance, and security testing.', icon: 'Shield' },
              { step: '06', title: 'Deployment', description: 'Production deployment, monitoring setup, documentation, and knowledge transfer.', icon: 'Rocket' },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full relative">
                  <div className="absolute -top-3 -right-3 text-4xl font-heading font-bold text-primary-100 dark:text-primary-900/30">
                    {step.step}
                  </div>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      {getProcessIcon(step.icon, 'w-6 h-6 text-primary-600 dark:text-primary-400')}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
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
              Ready to Start?
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your vision to life with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function getServiceIcon(iconName: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Code: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    Smartphone: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    Server: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    ShoppingCart: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    Cloud: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    Palette: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a4 4 0 014-4h4a4 4 0 014 4" /></svg>,
    Brain: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.734-.988-2.386l-.548-.547z" /></svg>,
    Wrench: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    Search: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    FileText: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Rocket: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.484 7.015A7.001 7.001 0 003.5 12H1.5A9 9 0 1120.477 3.522a7.001 7.001 0 00-5.993 2.558 4.501 4.501 0 00-3.646 3.645 4.5 4.5 0 01-6.354 0V8.502z" /></svg>,
    Shield: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  };
  const Icon = icons[iconName] || icons.Code;
  return <Icon />;
}

function getProcessIcon(iconName: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Search: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    FileText: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Palette: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a4 4 0 014-4h4a4 4 0 014 4" /></svg>,
    Code: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    Shield: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    Rocket: () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.484 7.015A7.001 7.001 0 003.5 12H1.5A9 9 0 1120.477 3.522a7.001 7.001 0 00-5.993 2.558 4.501 4.501 0 00-3.646 3.645 4.5 4.5 0 01-6.354 0V8.502z" /></svg>,
  };
  const Icon = icons[iconName] || icons.Code;
  return <Icon />;
}