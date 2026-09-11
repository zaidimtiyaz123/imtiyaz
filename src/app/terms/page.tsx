import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { FileText, Scale, Gavel } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Crate Projects.',
};

export default function TermsPage() {
  return (
    <div className="section bg-white dark:bg-gray-950">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Services</h2>
              <p>
                Creator of Technology provides web development, mobile app development, custom software development, and related technology services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              <p>
                All content, features, and functionality of our services are owned by Creator of Technology and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Creator of Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
