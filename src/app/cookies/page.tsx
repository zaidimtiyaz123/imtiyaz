import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart2, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Crate Projects.',
};

export default function CookiesPage() {
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
              <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">How We Use Cookies</h2>
              <p>
                We use cookies to understand how you use our website, improve your experience, and personalize content. We may also use cookies for analytics and marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements to you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may no longer function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at hello@creatoroftechnology.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
