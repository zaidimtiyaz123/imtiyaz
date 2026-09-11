'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { companyInfo } from '@/data';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { patternBgClass } from '@/lib/patterns';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app-development', label: 'Mobile App Development' },
  { value: 'custom-software', label: 'Custom Software Development' },
  { value: 'ecommerce', label: 'E-commerce Solutions' },
  { value: 'cloud-devops', label: 'Cloud & DevOps' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'other', label: 'Other / Not Sure' },
];

const budgetOptions = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-100k', label: '₹50,000 - ₹1,00,000' },
  { value: '100k-250k', label: '₹1,00,000 - ₹2,50,000' },
  { value: '250k-500k', label: '₹2,50,000 - ₹5,00,000' },
  { value: '500k-1000k', label: '₹5,00,000 - ₹10,00,000' },
  { value: '1000k+', label: '₹10,00,000+' },
  { value: 'not-sure', label: 'Not Sure / Let\'s Discuss' },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-months', label: '1-2 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: '6-12-months', label: '6-12 Months' },
  { value: '12-months+', label: '12+ Months' },
  { value: 'ongoing', label: 'Ongoing / Retainer' },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        toast.success(t('contact.form.success'));
        reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setSubmitStatus('error');
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="contact-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                Contact Us
              </Badge>
              <h1 id="contact-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t('contact.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="contact-form-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card variant="bordered" padding="lg" className="h-fit sticky top-24">
                <CardHeader>
                  <CardTitle>{t('contact.info.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('contact.info.address')}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('contact.info.whatsapp')}</h4>
                      <a
                        href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline text-sm mt-1 flex items-center gap-1"
                      >
                        {companyInfo.whatsapp}
                        <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('contact.info.phone')}</h4>
                      <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm mt-1">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('contact.info.email')}</h4>
                      <a href={`mailto:${companyInfo.email}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm mt-1">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('contact.info.hours')}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{t('contact.info.hoursValue')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle>{t('contact.form.submit')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-300">Message Sent Successfully!</h4>
                        <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={t('contact.form.name')}
                        placeholder={t('contact.form.namePlaceholder')}
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <Input
                        label={t('contact.form.email')}
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={t('contact.form.phone')}
                        type="tel"
                        placeholder={t('contact.form.phonePlaceholder')}
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <Input
                        label={t('contact.form.company')}
                        placeholder={t('contact.form.companyPlaceholder')}
                        {...register('company')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Select
                        label={t('contact.form.service')}
                        placeholder={t('contact.form.servicePlaceholder')}
                        options={serviceOptions}
                        error={errors.service?.message}
                        {...register('service')}
                      />
                      <Select
                        label={t('contact.form.budget')}
                        placeholder={t('contact.form.budgetPlaceholder')}
                        options={budgetOptions}
                        error={errors.budget?.message}
                        {...register('budget')}
                      />
                      <Select
                        label={t('contact.form.timeline')}
                        placeholder={t('contact.form.timelinePlaceholder')}
                        options={timelineOptions}
                        error={errors.timeline?.message}
                        {...register('timeline')}
                      />
                    </div>

                    <Textarea
                      label={t('contact.form.message')}
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={5}
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto gap-2"
                      loading={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t('contact.form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      By submitting this form, you agree to our <a href="/privacy" className="underline hover:text-primary-600">Privacy Policy</a> and <a href="/terms" className="underline hover:text-primary-600">Terms of Service</a>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900" aria-labelledby="whatsapp-heading">
        <div className="container-custom">
          <Card variant="bordered" padding="lg" className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{t('contact.whatsapp.title')}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('contact.whatsapp.subtitle')}</p>
              </div>
              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I\'m interested in your services. Can we discuss my project?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('contact.whatsapp.button')}</span>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Frequently Asked Questions</Badge>
            <h2 id="faq-heading" className="section-title">Quick Answers</h2>
            <p className="section-subtitle">Common questions about working with us.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What is your typical project timeline?', a: 'Project timelines vary based on scope and complexity. A simple website takes 4-6 weeks, while complex applications can take 3-6 months. We provide detailed timelines during the proposal phase.' },
              { q: 'Do you work with clients outside India?', a: 'Yes! We work with clients globally across 25+ countries including the USA, UK, Australia, UAE, and Singapore. We accommodate different time zones with flexible communication schedules.' },
              { q: 'What is your payment structure?', a: 'We typically work on a milestone-based payment structure: 25% upfront, 25% at design approval, 25% at development midpoint, and 25% on delivery. For ongoing work, we offer monthly retainers.' },
              { q: 'Do you provide post-launch support?', a: 'Absolutely! We offer 3 months of free support after launch, including bug fixes and minor adjustments. We also have flexible maintenance plans for ongoing support, updates, and feature enhancements.' },
              { q: 'Can you work with our existing team?', a: 'Yes, we frequently augment client teams or collaborate with in-house developers. We follow standard git workflows, code review processes, and documentation practices for seamless integration.' },
              { q: 'What technologies do you specialize in?', a: 'We specialize in modern web technologies: React, Next.js, TypeScript, Node.js, Python, React Native, Flutter, AWS, Docker, Kubernetes, and more. See our Services page for the full stack.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <details className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white pr-8">{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}