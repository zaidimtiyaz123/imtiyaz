'use client';

import { useLanguage } from '@/context/LanguageContext';
import { teamMembers, companyInfo, stats, technologies } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle, Shield, Award, Users, Globe, Lightbulb, Heart, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: 'Customer Obsession', description: 'Every decision starts with understanding our customers\' needs and delivering exceptional value.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We continuously explore new technologies and approaches to solve complex problems creatively.' },
    { icon: Shield, title: 'Integrity', description: 'Transparent communication, honest pricing, and delivering on our promises - always.' },
    { icon: Heart, title: 'Quality Craftsmanship', description: 'Clean code, thoughtful design, and rigorous testing are non-negotiable standards.' },
    { icon: Users, title: 'Team Excellence', description: 'We invest in our people\'s growth, fostering a culture of learning and collaboration.' },
    { icon: Zap, title: 'Speed with Quality', description: 'We move fast without cutting corners, using automation and best practices to accelerate delivery.' },
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to build world-class technology solutions from India for the world.' },
    { year: '2021', title: 'First 50 Projects', description: 'Delivered 50+ projects across web, mobile, and cloud for clients globally.' },
    { year: '2022', title: 'Team Expansion', description: 'Grew to 25+ engineers, designers, and project managers. Opened second office.' },
    { year: '2023', title: '200+ Clients Milestone', description: 'Served 200+ clients across 25+ countries with 95% retention rate.' },
    { year: '2024', title: 'Enterprise Recognition', description: 'Recognized as a top development partner by Clutch, GoodFirms, and industry leaders.' },
    { year: '2025', title: '500+ Projects Delivered', description: 'Half a thousand projects completed. Expanded into AI/ML and blockchain services.' },
  ];

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="about-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                About Us
              </Badge>
              <h1 id="about-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t('about.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('about.subtitle')}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.slice(0, 4).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-1">
                      {stat.value}
                      <span className="text-gray-600 dark:text-gray-400 font-normal">{stat.suffix}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Let&apos;s Work Together
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
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
                      <Users className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">50+ Experts</h3>
                    <p className="text-gray-600 dark:text-gray-400">Engineers, designers, and strategists</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="mission-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 id="mission-heading" className="section-title">{t('about.mission')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            <div className="lg:col-span-1">
              <h2 className="section-title">{t('about.vision')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>
            <div className="lg:col-span-1">
              <h2 className="section-title">{t('about.values')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                These core values guide everything we do, from how we work with clients to how we build our team.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="bordered" hover padding="lg" className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="journey-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 id="journey-heading" className="section-title">Milestones & Achievements</h2>
            <p className="section-subtitle">Key moments that shaped our journey from startup to industry leader.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 top-4 w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 flex items-center justify-center z-10">
                    <span className="text-primary-600 dark:text-primary-400 font-heading font-bold text-xl">{milestone.year}</span>
                  </div>
                  <Card variant="bordered" padding="lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="team-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">{t('team.title')}</Badge>
            <h2 id="team-heading" className="section-title">{t('team.title')}</h2>
            <p className="section-subtitle">{t('team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" hover padding="none" className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`${member.name} on Twitter`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
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

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="tech-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Technology Expertise</Badge>
            <h2 id="tech-heading" className="section-title">Technologies We Master</h2>
            <p className="section-subtitle">We stay at the cutting edge of technology to deliver the best solutions.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
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

      <section className="section bg-primary-600 dark:bg-primary-700" aria-labelledby="cta-heading">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-white/30 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              Join Our Team
            </Badge>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Want to Build the Future with Us?
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented engineers, designers, and problem solvers to join our growing team.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/careers">
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}