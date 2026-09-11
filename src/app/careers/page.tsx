import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our team and build the future with us.',
};

const openings = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Noida / Remote',
    type: 'Full-time',
    experience: '4+ years',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Noida',
    type: 'Full-time',
    experience: '2+ years',
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
  },
  {
    id: 4,
    title: 'React Native Developer',
    department: 'Mobile',
    location: 'Noida / Remote',
    type: 'Full-time',
    experience: '3+ years',
  },
];

export default function CareersPage() {
  return (
    <div className="section bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Join Us</Badge>
          <h1 className="section-title">Build the Future with Us</h1>
          <p className="section-subtitle">
            We&apos;re always looking for talented individuals who are passionate about technology and innovation.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {openings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" asChild className="whitespace-nowrap">
                    <Link href="/contact">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Don&apos;t see a perfect fit?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            We&apos;re always interested in meeting talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Send Resume
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
