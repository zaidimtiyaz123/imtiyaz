'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, 
  Users, Briefcase, Star, MessageSquare, Settings, 
  ChevronDown, ChevronUp, Download, Upload, FileText,
  ArrowRight, Check, X, AlertTriangle, Shield, Zap, Menu, Mail, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const mockServices = [
  { id: '1', title: 'Web Development', category: 'Development', status: 'active', price: '₹50,000+', projects: 125 },
  { id: '2', title: 'Mobile App Development', category: 'Development', status: 'active', price: '₹75,000+', projects: 89 },
  { id: '3', title: 'Custom Software', category: 'Development', status: 'active', price: '₹2,00,000+', projects: 45 },
  { id: '4', title: 'E-commerce Solutions', category: 'Development', status: 'active', price: '₹1,00,000+', projects: 67 },
  { id: '5', title: 'Cloud & DevOps', category: 'Infrastructure', status: 'active', price: '₹75,000+', projects: 34 },
  { id: '6', title: 'UI/UX Design', category: 'Design', status: 'active', price: '₹30,000+', projects: 78 },
];

const mockPortfolio = [
  { id: '1', title: 'FinTech Platform', category: 'FinTech', status: 'published', featured: true, client: 'FinanceFirst NBFC', date: '2024-01-15' },
  { id: '2', title: 'Healthcare Telemedicine App', category: 'Healthcare', status: 'published', featured: true, client: 'MediConnect Health', date: '2024-02-20' },
  { id: '3', title: 'E-commerce Marketplace', category: 'E-commerce', status: 'published', featured: true, client: 'CraftBazaar', date: '2024-03-10' },
  { id: '4', title: 'EdTech LMS Platform', category: 'EdTech', status: 'draft', featured: false, client: 'Apex Academy', date: '2024-04-01' },
  { id: '5', title: 'Logistics Fleet Management', category: 'Logistics', status: 'published', featured: false, client: 'SwiftLogistics', date: '2023-11-15' },
];

const mockInquiries = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@company.com', phone: '+91 98765 43210', company: 'TechCorp', service: 'Web Development', budget: '₹5,00,000 - ₹10,00,000', timeline: '3-6 months', status: 'new', date: '2024-01-15', message: 'Need a corporate website redesign...' },
  { id: '2', name: 'Priya Sharma', email: 'priya@startup.io', phone: '+91 98765 43211', company: 'HealthTech', service: 'Mobile App Development', budget: '₹10,00,000+', timeline: '6-12 months', status: 'contacted', date: '2024-01-14', message: 'Telemedicine app for doctors...' },
  { id: '3', name: 'Amit Patel', email: 'amit@ecommerce.com', phone: '+91 98765 43212', company: 'FashionHub', service: 'E-commerce Solutions', budget: '₹1,00,000 - ₹2,50,000', timeline: '1-2 months', status: 'proposal', date: '2024-01-13', message: 'Multi-vendor marketplace...' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@logistics.com', phone: '+91 98765 43213', company: 'SwiftLogistics', service: 'Custom Software', budget: '₹25,00,000+', timeline: '12+ months', status: 'negotiation', date: '2024-01-12', message: 'Fleet management system...' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@manufacturing.com', phone: '+91 98765 43214', company: 'SteelCore', service: 'Custom Software', budget: '₹50,00,000+', timeline: '12+ months', status: 'won', date: '2024-01-10', message: 'ERP system for manufacturing...' },
];

const mockTeam = [
  { id: '1', name: 'Arjun Sharma', role: 'Founder & CEO', email: 'arjun@creatortech.com', department: 'Leadership', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: '2', name: 'Priya Patel', role: 'CTO', email: 'priya@creatortech.com', department: 'Engineering', status: 'active', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face' },
  { id: '3', name: 'Rohit Gupta', role: 'VP Engineering', email: 'rohit@creatortech.com', department: 'Engineering', status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
  { id: '4', name: 'Sneha Agarwal', role: 'Head of Design', email: 'sneha@creatortech.com', department: 'Design', status: 'active', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face' },
  { id: '5', name: 'Karan Malhotra', role: 'Head of Mobile', email: 'karan@creatortech.com', department: 'Engineering', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
];

const mockTestimonials = [
  { id: '1', name: 'Rajesh Kumar', role: 'CTO', company: 'FinanceFirst NBFC', content: 'Exceptional team that delivered our banking platform on time.', rating: 5, status: 'published', project: 'FinTech Platform' },
  { id: '2', name: 'Dr. Priya Sharma', role: 'Medical Director', company: 'MediConnect Health', content: 'Transformed how we deliver healthcare. Doctors love the platform.', rating: 5, status: 'published', project: 'Healthcare App' },
  { id: '3', name: 'Amit Patel', role: 'Founder', company: 'CraftBazaar', content: 'Empowered thousands of artisans. Scalable architecture.', rating: 5, status: 'published', project: 'E-commerce Marketplace' },
  { id: '4', name: 'Suresh Reddy', role: 'VP Engineering', company: 'TechCorp Solutions', content: 'Outstanding code quality and project management.', rating: 5, status: 'pending', project: 'Custom ERP System' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'proposal', label: 'Proposal Sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const serviceStatusOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const portfolioStatusOptions = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export default function AdminPanelContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'portfolio' | 'inquiries' | 'team' | 'testimonials' | 'settings'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: Zap },
    { id: 'services', label: t('admin.services'), icon: Briefcase },
    { id: 'portfolio', label: t('admin.portfolio'), icon: FileText },
    { id: 'inquiries', label: t('admin.inquiries'), icon: MessageSquare },
    { id: 'team', label: t('admin.team'), icon: Users },
    { id: 'testimonials', label: t('admin.testimonials'), icon: Star },
    { id: 'settings', label: t('admin.settings'), icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 -translate-x-full" style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center gap-2 text-xl font-heading font-bold text-gray-900 dark:text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">CT</span>
              </div>
              <span>Creator of Technology</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-2" aria-label="Admin navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Upload className="w-4 h-4" />
              </Button>
              <div className="hidden lg:block w-64">
                <Input placeholder="Search..." icon={<Search className="w-4 h-4" />} />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'services' && <ServicesManagementView />}
          {activeTab === 'portfolio' && <PortfolioManagementView />}
          {activeTab === 'inquiries' && <InquiriesManagementView />}
          {activeTab === 'team' && <TeamManagementView />}
          {activeTab === 'testimonials' && <TestimonialsManagementView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const stats = [
    { label: 'Total Projects', value: '542', change: '+12%', trend: 'up' },
    { label: 'Active Clients', value: '218', change: '+8%', trend: 'up' },
    { label: 'Monthly Revenue', value: '₹42.5L', change: '+15%', trend: 'up' },
    { label: 'Conversion Rate', value: '23.5%', change: '-2%', trend: 'down' },
  ];

  const recentInquiries = mockInquiries.slice(0, 5);
  const recentProjects = mockPortfolio.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#inquiries">View All <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered" padding="lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#portfolio">View All <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="bordered" padding="lg" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Last 6 months revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickAction icon={Plus} label="Add New Service" href="#services" />
            <QuickAction icon={Plus} label="Add Portfolio Project" href="#portfolio" />
            <QuickAction icon={Users} label="Add Team Member" href="#team" />
            <QuickAction icon={Star} label="Add Testimonial" href="#testimonials" />
            <QuickAction icon={FileText} label="Export Inquiries CSV" onClick={() => alert('Exporting...')} />
            <QuickAction icon={Settings} label="System Settings" href="#settings" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ServicesManagementView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<typeof mockServices[0] | null>(null);

  const filteredServices = mockServices.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || s.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={serviceStatusOptions}
            className="w-full sm:w-48"
          />
        </div>
        <Button onClick={() => { setEditingService(null); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 font-medium">Service</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Starting Price</th>
              <th className="pb-3 font-medium">Projects</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-4 font-medium text-gray-900 dark:text-white">{service.title}</td>
                <td className="py-4"><Badge variant="outline" size="sm">{service.category}</Badge></td>
                <td className="py-4"><Badge variant={service.status === 'active' ? 'success' : 'secondary'}>{service.status}</Badge></td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{service.price}</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{service.projects}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingService(service); setShowModal(true); }}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ServiceModal show={showModal} onClose={() => setShowModal(false)} service={editingService} />
    </div>
  );
}

function PortfolioManagementView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof mockPortfolio[0] | null>(null);

  const filteredProjects = mockPortfolio.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={portfolioStatusOptions}
            className="w-full sm:w-48"
          />
        </div>
        <Button onClick={() => { setEditingProject(null); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} variant="bordered" hover padding="lg">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={project.status === 'published' ? 'success' : 'secondary'} size="sm">{project.status}</Badge>
                  {project.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{project.client}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Category: {project.category}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(project.date).toLocaleDateString()}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingProject(project); setShowModal(true); }}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <PortfolioModal show={showModal} onClose={() => setShowModal(false)} project={editingProject} />
    </div>
  );
}

function InquiriesManagementView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null);

  const filteredInquiries = mockInquiries.filter(i => 
    (i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || i.status === statusFilter)
  );

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' }> = {
      new: { label: 'New', variant: 'primary' },
      contacted: { label: 'Contacted', variant: 'secondary' },
      proposal: { label: 'Proposal Sent', variant: 'warning' },
      negotiation: { label: 'Negotiation', variant: 'warning' },
      won: { label: 'Won', variant: 'success' },
      lost: { label: 'Lost', variant: 'danger' },
    };
    return configs[status] || { label: status, variant: 'default' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            className="w-full sm:w-48"
          />
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export CSV</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 font-medium">Inquiry</th>
              <th className="pb-3 font-medium">Service</th>
              <th className="pb-3 font-medium">Budget</th>
              <th className="pb-3 font-medium">Timeline</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{inquiry.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{inquiry.email}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{inquiry.company}</p>
                  </div>
                </td>
                <td className="py-4"><Badge variant="outline" size="sm">{inquiry.service}</Badge></td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{inquiry.budget}</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{inquiry.timeline}</td>
                <td className="py-4">
                  <Badge variant={getStatusConfig(inquiry.status).variant}>{getStatusConfig(inquiry.status).label}</Badge>
                </td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{new Date(inquiry.date).toLocaleDateString()}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedInquiry(inquiry)}><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InquiryDetailModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
    </div>
  );
}

function TeamManagementView() {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<typeof mockTeam[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Team Members</h2>
        <Button onClick={() => { setEditingMember(null); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeam.map((member) => (
          <Card key={member.id} variant="bordered" hover padding="lg">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={member.avatar}
                alt={member.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{member.department}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p><Mail className="w-4 h-4 inline mr-2" />{member.email}</p>
              <p><Badge variant={member.status === 'active' ? 'success' : 'secondary'} size="sm">{member.status}</Badge></p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <Button variant="ghost" size="sm" onClick={() => { setEditingMember(member); setShowModal(true); }} className="flex-1"><Edit className="w-4 h-4 mr-2" />Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1"><Trash2 className="w-4 h-4 mr-2" />Remove</Button>
            </div>
          </Card>
        ))}
      </div>

      <TeamModal show={showModal} onClose={() => setShowModal(false)} member={editingMember} />
    </div>
  );
}

function TestimonialsManagementView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<typeof mockTestimonials[0] | null>(null);

  const filteredTestimonials = mockTestimonials.filter(t => 
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.company.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || t.status === statusFilter)
  );

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'published', label: 'Published' },
    { value: 'pending', label: 'Pending Review' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            className="w-full sm:w-48"
          />
        </div>
        <Button onClick={() => { setEditingTestimonial(null); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} variant="bordered" padding="lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>
                  <Badge variant={testimonial.status === 'published' ? 'success' : 'warning'} size="sm">{testimonial.status}</Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-2">&quot;{testimonial.content}&quot;</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.name}, {testimonial.role} at {testimonial.company}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Project: {testimonial.project}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingTestimonial(testimonial); setShowModal(true); }}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <TestimonialModal show={showModal} onClose={() => setShowModal(false)} testimonial={editingTestimonial} />
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card variant="bordered" padding="lg">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your site configuration and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingGroup title="Company Information" fields={[
            { label: 'Company Name', type: 'text', value: 'Creator of Technology' },
            { label: 'Tagline', type: 'text', value: 'Building Digital Futures' },
            { label: 'Email', type: 'email', value: 'hello@creatoroftechnology.com' },
            { label: 'Phone', type: 'tel', value: '+91 98765 43210' },
            { label: 'Address', type: 'textarea', value: 'Sector 62, Noida, Uttar Pradesh 201301, India' },
          ]} />
          <SettingGroup title="Social Links" fields={[
            { label: 'LinkedIn', type: 'url', value: 'https://linkedin.com/company/creatoroftechnology' },
            { label: 'Twitter', type: 'url', value: 'https://twitter.com/creatortech' },
            { label: 'Facebook', type: 'url', value: 'https://facebook.com/creatoroftechnology' },
            { label: 'Instagram', type: 'url', value: 'https://instagram.com/creatoroftechnology' },
            { label: 'GitHub', type: 'url', value: 'https://github.com/creatoroftechnology' },
          ]} />
          <SettingGroup title="Integrations" fields={[
            { label: 'Google Analytics ID', type: 'text', value: 'G-XXXXXXXXXX' },
            { label: 'SMTP Host', type: 'text', value: 'smtp.example.com' },
          ]} />
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingGroup({ title, fields }: { title: string; fields: { label: string; type: string; value: string }[] }) {
  return (
    <div>
      <h4 className="font-medium text-gray-900 dark:text-white mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <Input key={field.label} label={field.label} type={field.type as any} defaultValue={field.value} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, change, trend }: { label: string; value: string; change: string; trend: string }) {
  return (
    <Card variant="bordered" padding="lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
    </Card>
  );
}

function RevenueChart() {
  const data = [
    { month: 'Aug', revenue: 38 },
    { month: 'Sep', revenue: 42 },
    { month: 'Oct', revenue: 39 },
    { month: 'Nov', revenue: 45 },
    { month: 'Dec', revenue: 41 },
    { month: 'Jan', revenue: 42.5 },
  ];

  return (
    <div className="h-64 flex items-end justify-around gap-2">
      {data.map((d, i) => (
        <div key={d.month} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-primary-600 rounded-t transition-all hover:bg-primary-500"
            style={{ height: `${(d.revenue / 45) * 100}%`, minHeight: '20px' }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{d.month}</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">₹{d.revenue}L</span>
        </div>
      ))}
    </div>
  );
}

function QuickAction({ icon: Icon, label, href, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; href?: string; onClick?: () => void }) {
  if (href) {
    return (
      <Button variant="ghost" className="w-full justify-start gap-3" asChild>
        <Link href={href}>
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      </Button>
    );
  }
  return (
    <Button variant="ghost" className="w-full justify-start gap-3" onClick={onClick}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );
}

function InquiryRow({ inquiry }: { inquiry: typeof mockInquiries[0] }) {
  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' }> = {
      new: { label: 'New', variant: 'primary' },
      contacted: { label: 'Contacted', variant: 'secondary' },
      proposal: { label: 'Proposal', variant: 'warning' },
      negotiation: { label: 'Negotiation', variant: 'warning' },
      won: { label: 'Won', variant: 'success' },
      lost: { label: 'Lost', variant: 'danger' },
    };
    return configs[status] || { label: status, variant: 'default' };
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">{inquiry.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{inquiry.company} • {inquiry.service}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={getStatusConfig(inquiry.status).variant} size="sm">{getStatusConfig(inquiry.status).label}</Badge>
        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(inquiry.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: typeof mockPortfolio[0] }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={project.status === 'published' ? 'success' : 'secondary'} size="sm">{project.status}</Badge>
          {project.featured && <Badge variant="warning" size="sm">Featured</Badge>}
        </div>
        <p className="font-medium text-gray-900 dark:text-white truncate">{project.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{project.client}</p>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(project.date).toLocaleDateString()}</span>
    </div>
  );
}

function ServiceModal({ show, onClose, service }: { show: boolean; onClose: () => void; service: typeof mockServices[0] | null }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              {service ? 'Edit Service' : 'Add New Service'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <Input label="Service Title" placeholder="e.g., Web Development" defaultValue={service?.title || ''} />
            <Select
              label="Category"
              options={[
                { value: 'Development', label: 'Development' },
                { value: 'Design', label: 'Design' },
                { value: 'Infrastructure', label: 'Infrastructure' },
                { value: 'AI/ML', label: 'AI/ML' },
                { value: 'Maintenance', label: 'Maintenance' },
              ]}
              defaultValue={service?.category || 'Development'}
            />
            <Input label="Starting Price" placeholder="e.g., ₹50,000+" defaultValue={service?.price || ''} />
            <Select
              label="Status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              defaultValue={service?.status || 'active'}
            />
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">{service ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PortfolioModal({ show, onClose, project }: { show: boolean; onClose: () => void; project: typeof mockPortfolio[0] | null }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <Input label="Project Title" placeholder="e.g., FinTech Platform" defaultValue={project?.title || ''} />
            <Input label="Client Name" placeholder="e.g., FinanceFirst NBFC" defaultValue={project?.client || ''} />
            <Select
              label="Category"
              options={[
                { value: 'FinTech', label: 'FinTech' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'E-commerce', label: 'E-commerce' },
                { value: 'EdTech', label: 'EdTech' },
                { value: 'Logistics', label: 'Logistics' },
                { value: 'Real Estate', label: 'Real Estate' },
              ]}
              defaultValue={project?.category || 'FinTech'}
            />
            <Select
              label="Status"
              options={[
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
              ]}
              defaultValue={project?.status || 'draft'}
            />
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">{project ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InquiryDetailModal({ inquiry, onClose }: { inquiry: typeof mockInquiries[0] | null; onClose: () => void }) {
  if (!inquiry) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Inquiry Details</h3>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <DetailRow label="Name" value={inquiry.name} />
            <DetailRow label="Email" value={inquiry.email} />
            <DetailRow label="Phone" value={inquiry.phone} />
            <DetailRow label="Company" value={inquiry.company} />
            <DetailRow label="Service" value={inquiry.service} />
            <DetailRow label="Budget" value={inquiry.budget} />
            <DetailRow label="Timeline" value={inquiry.timeline} />
            <DetailRow label="Date" value={new Date(inquiry.date).toLocaleDateString()} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">{inquiry.message}</p>
            </div>
          </div>
          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
            <Button className="flex-1">Mark as Contacted</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TeamModal({ show, onClose, member }: { show: boolean; onClose: () => void; member: typeof mockTeam[0] | null }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              {member ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <Input label="Full Name" placeholder="John Doe" defaultValue={member?.name || ''} />
            <Input label="Email" type="email" placeholder="john@company.com" defaultValue={member?.email || ''} />
            <Input label="Role" placeholder="e.g., Senior Developer" defaultValue={member?.role || ''} />
            <Select
              label="Department"
              options={[
                { value: 'Leadership', label: 'Leadership' },
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Design', label: 'Design' },
                { value: 'Sales', label: 'Sales' },
                { value: 'Operations', label: 'Operations' },
              ]}
              defaultValue={member?.department || 'Engineering'}
            />
            <Select
              label="Status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              defaultValue={member?.status || 'active'}
            />
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">{member ? 'Update' : 'Add'}</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TestimonialModal({ show, onClose, testimonial }: { show: boolean; onClose: () => void; testimonial: typeof mockTestimonials[0] | null }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <Input label="Client Name" placeholder="John Doe" defaultValue={testimonial?.name || ''} />
            <Input label="Role" placeholder="e.g., CTO" defaultValue={testimonial?.role || ''} />
            <Input label="Company" placeholder="e.g., TechCorp" defaultValue={testimonial?.company || ''} />
            <Input label="Project" placeholder="e.g., FinTech Platform" defaultValue={testimonial?.project || ''} />
            <Input label="Rating" type="number" min="1" max="5" defaultValue={testimonial?.rating?.toString() || '5'} />
            <Textarea label="Testimonial Content" placeholder="Share your experience..." defaultValue={testimonial?.content || ''} rows={4} />
            <Select
              label="Status"
              options={[
                { value: 'published', label: 'Published' },
                { value: 'pending', label: 'Pending Review' },
              ]}
              defaultValue={testimonial?.status || 'pending'}
            />
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">{testimonial ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
  );
}