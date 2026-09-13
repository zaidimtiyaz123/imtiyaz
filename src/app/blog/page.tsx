'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Calendar, Clock, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { patternBgClass } from '@/lib/patterns';

const mockPosts = [
  {
    id: '1',
    title: 'Building Scalable Microservices with Node.js and Kubernetes',
    excerpt: 'Learn how to architect and deploy microservices that can handle millions of requests per day.',
    content: 'Full article content would go here...',
    category: 'Backend',
    author: 'Priya Patel',
    authorRole: 'CTO',
    date: '2024-01-15',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'React Native vs Flutter: Choosing the Right Framework in 2024',
    excerpt: 'A comprehensive comparison to help you decide between React Native and Flutter for your next mobile project.',
    content: 'Full article content would go here...',
    category: 'Mobile',
    author: 'Karan Malhotra',
    authorRole: 'Head of Mobile',
    date: '2024-01-10',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    featured: false,
  },
  {
    id: '3',
    title: 'Design Systems: Building Consistent User Experiences at Scale',
    excerpt: 'How to create and maintain a design system that scales across teams and products.',
    content: 'Full article content would go here...',
    category: 'Design',
    author: 'Sneha Agarwal',
    authorRole: 'Head of Design',
    date: '2024-01-05',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    featured: false,
  },
  {
    id: '4',
    title: 'Securing Your Cloud Infrastructure: Best Practices for 2024',
    excerpt: 'Essential security practices for protecting your cloud infrastructure against modern threats.',
    content: 'Full article content would go here...',
    category: 'Security',
    author: 'Rohit Gupta',
    authorRole: 'VP Engineering',
    date: '2024-01-02',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    featured: false,
  },
  {
    id: '5',
    title: 'AI-Powered Development: Integrating LLMs into Your Workflow',
    excerpt: 'Practical ways to leverage large language models to boost developer productivity.',
    content: 'Full article content would go here...',
    category: 'AI/ML',
    author: 'Arjun Sharma',
    authorRole: 'Founder & CEO',
    date: '2023-12-28',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    featured: false,
  },
  {
    id: '6',
    title: 'Database Optimization Techniques for High-Traffic Applications',
    excerpt: 'Advanced techniques for optimizing PostgreSQL and MongoDB performance at scale.',
    content: 'Full article content would go here...',
    category: 'Database',
    author: 'Priya Patel',
    authorRole: 'CTO',
    date: '2023-12-20',
    readTime: '14 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    featured: false,
  },
];

const categories = ['All', 'Backend', 'Mobile', 'Design', 'Security', 'AI/ML', 'Database', 'DevOps', 'Frontend'];

export default function BlogPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = activeCategory === 'All'
    ? mockPosts
    : mockPosts.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" aria-labelledby="blog-hero-heading">
        <div className={patternBgClass} />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4" dot>
                Insights & Updates
              </Badge>
              <h1 id="blog-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Latest Articles & Insights
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Expert insights on technology, development, design, and digital transformation from our team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950" aria-labelledby="blog-posts-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 id="blog-posts-heading" className="section-title">Our Latest Posts</h2>
              <p className="section-subtitle">Stay updated with the latest trends and best practices in technology.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card variant="elevated" hover padding="none" className="h-full overflow-hidden flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge variant="warning">Featured</Badge>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Badge variant="primary" className="text-xs">{post.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="flex-1 flex flex-col space-y-4">
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 flex-1">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try selecting a different category.</p>
            </div>
          )}

          <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest articles, insights, and technology updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}