'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Github, Youtube, MapPin, Phone, Mail, MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import { companyInfo, footerSections } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (!email) return;
    
    setIsSubscribing(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Thanks for subscribing!');
        e.currentTarget.reset();
      } else {
        toast.error(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-heading font-bold text-gray-900 dark:text-white mb-6" aria-label={`${companyInfo.name} - Home`}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-base">CT</span>
              </div>
              <span>{companyInfo.name}</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('footer.newsletter')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, insights, and technology trends.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                name="email"
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                required
                className="flex-1"
                aria-label="Email address"
                disabled={isSubscribing}
              />
              <Button type="submit" className="whitespace-nowrap" loading={isSubscribing}>
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('footer.newsletterButton')}
                  </>
                ) : (
                  t('footer.newsletterButton')
                )}
              </Button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('contact.info.title')}</h4>
                <address className="not-italic space-y-3 text-gray-600 dark:text-gray-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span>{companyInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <a href={getTelUrl(companyInfo.phone)} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <a href={getMailtoUrl(companyInfo.email)} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <a href={getWhatsAppUrl(companyInfo.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {t('contact.info.whatsapp')}
                    </a>
                  </div>
                </address>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('contact.info.hours')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('contact.info.hoursValue')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {currentYear} {companyInfo.name}. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}