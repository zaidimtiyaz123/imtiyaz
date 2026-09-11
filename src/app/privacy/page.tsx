import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Shield, Eye, Cookie, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Crate Projects.',
};

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations. We do not sell or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at hello@creatoroftechnology.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at hello@creatoroftechnology.com or +91 98765 43210.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
