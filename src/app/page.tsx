'use client';

import { useLanguage } from '@/context/LanguageContext';
import { services, portfolio, testimonials, stats, companyInfo } from '@/data';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, CheckCircle, Star, Shield, Zap, Globe, Users, Award, Code, Smartphone, Server, ShoppingCart, Cloud, Palette, Brain, Wrench, MessageCircle, Phone, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: 'Enterprise Grade Security', description: 'Bank-level encryption, SOC2 compliance, and regular security audits.' },
    { icon: Zap, title: 'Lightning Fast Performance', description: 'Optimized code, CDN delivery, and edge computing for sub-second loads.' },
    { icon: Globe, title: 'Global Scalability', description: 'Architecture that scales from thousands to millions of users seamlessly.' },
    { icon: Users, title: 'Dedicated Team', description: 'Senior developers, designers, and project managers assigned to your project.' },
    { icon: Award, title: 'Quality Assurance', description: 'Automated testing, code reviews, and CI/CD pipelines for bug-free delivery.' },
    { icon: Code, title: 'Clean Code Standards', description: 'TypeScript, ESLint, Prettier, and architectural best practices enforced.' },
  ];

  const techStack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Go', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Figma', category: 'Design' },
    { name: 'Tailwind CSS', category: 'Styling' },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className={patternBgClass} />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />

        <div className="container-custom relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6" dot>
                {t('hero.badge')}
              </Badge>
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6"
              >
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/contact">
                    {t('hero.ctaPrimary')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>500+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>200+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>95% Client Retention</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden aspect-square flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                      <Code className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">Your Digital Partner</h3>
                    <p className="text-gray-600 dark:text-gray-400">Custom software solutions that drive growth</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="stats-heading">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" role="list" aria-label="Company statistics">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                role="listitem"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-2">
                  {stat.value}
                  <span className="text-gray-600 dark:text-gray-400 font-normal">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">{t('services.title')}</Badge>
            <h2 id="services-heading" className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      {getServiceIcon(service.icon, 'w-7 h-7 text-primary-600 dark:text-primary-400')}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      {service.popular && <Badge variant="primary" size="sm">{t('services.popular')}</Badge>}
                    </div>
                    <CardDescription>{service.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2" role="list">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{t('services.priceRange')} </span>{service.priceRange}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('services.deliveryTime')} {service.deliveryTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                {t('services.viewAll')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="portfolio-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">{t('portfolio.title')}</Badge>
              <h2 id="portfolio-heading" className="section-title">{t('portfolio.title')}</h2>
              <p className="section-subtitle">{t('portfolio.subtitle')}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/portfolio">
                {t('portfolio.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {portfolio.filter(p => p.featured).slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge variant="primary" className="mb-2">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                      ))}
                    </div>
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
                          <ArrowRight className="w-4 h-4 rotate-45" />
                          {t('portfolio.visitProject')}
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">{t('testimonials.title')}</Badge>
            <h2 id="testimonials-heading" className="section-title">{t('testimonials.title')}</h2>
            <p className="section-subtitle">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...testimonials, ...portfolio.filter(p => p.testimonial).slice(0, 1).map(p => p.testimonial!).filter(Boolean)].slice(0, 4).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="features-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 id="features-heading" className="section-title">Why Choose Creator of Technology?</h2>
            <p className="section-subtitle">We don&apos;t just build software; we build partnerships that last.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
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
              Ready to Start Your Project?
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link href="/contact">
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <a
                href={getWhatsAppUrl(companyInfo.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 text-white rounded-lg text-base font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="tech-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Technology Stack</Badge>
            <h2 id="tech-heading" className="section-title">Technologies We Master</h2>
            <p className="section-subtitle">We stay at the cutting edge of technology to deliver the best solutions.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card variant="bordered" padding="md" className="text-center hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">{tech.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech.category}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function getServiceIcon(iconName: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Code: () => <Code className={className} />,
    Smartphone: () => <Smartphone className={className} />,
    Server: () => <Server className={className} />,
    ShoppingCart: () => <ShoppingCart className={className} />,
    Cloud: () => <Cloud className={className} />,
    Palette: () => <Palette className={className} />,
    Brain: () => <Brain className={className} />,
    Wrench: () => <Wrench className={className} />,
  };
  const Icon = icons[iconName] || Code;
  return <Icon />;
}

function getWhatsAppUrl(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
}