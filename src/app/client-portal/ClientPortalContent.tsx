'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lock, User, Mail, Eye, LogOut, Menu, X, ChevronRight, FolderOpen, FileText, DollarSign, MessageSquare, Settings, Building2, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

interface Project {
  id: string;
  name: string;
  clientName: string;
  status: 'planning' | 'design' | 'development' | 'testing' | 'deployed' | 'maintenance';
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  budget: number;
  paidAmount: number;
  technologies: string[];
  team: string[];
  milestones: Milestone[];
}

interface Invoice {
  id: string;
  projectName: string;
  amount: number;
  status: 'paid' | 'pending';
  dueDate: string;
  paidDate?: string;
}

interface Message {
  id: string;
  sender: string;
  role: 'client' | 'team';
  content: string;
  time: string;
  read: boolean;
}

const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'E-commerce Platform Redesign',
    clientName: 'FashionHub Retail',
    status: 'development' as const,
    progress: 65,
    startDate: '2024-01-15',
    estimatedEndDate: '2024-04-30',
    budget: 1500000,
    paidAmount: 750000,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    team: ['Arjun Sharma', 'Priya Patel', 'Rohit Gupta'],
    milestones: [
      { id: 'm1', title: 'Discovery & Requirements', dueDate: '2024-01-30', completed: true, completedAt: '2024-01-28' },
      { id: 'm2', title: 'UI/UX Design', dueDate: '2024-02-15', completed: true, completedAt: '2024-02-12' },
      { id: 'm3', title: 'Frontend Development', dueDate: '2024-03-31', completed: false },
      { id: 'm4', title: 'Backend API Development', dueDate: '2024-03-31', completed: false },
      { id: 'm5', title: 'Testing & QA', dueDate: '2024-04-15', completed: false },
      { id: 'm6', title: 'Deployment & Launch', dueDate: '2024-04-30', completed: false },
    ],
  },
  {
    id: 'proj-2',
    name: 'Mobile App for Food Delivery',
    clientName: 'QuickBite Foods',
    status: 'testing' as const,
    progress: 85,
    startDate: '2023-10-01',
    estimatedEndDate: '2024-02-15',
    budget: 2200000,
    paidAmount: 1980000,
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    team: ['Karan Malhotra', 'Sneha Agarwal', 'Deepika Rao'],
    milestones: [
      { id: 'm1', title: 'Requirements & Planning', dueDate: '2023-10-15', completed: true, completedAt: '2023-10-10' },
      { id: 'm2', title: 'Design System', dueDate: '2023-11-01', completed: true, completedAt: '2023-10-28' },
      { id: 'm3', title: 'Core App Development', dueDate: '2024-01-15', completed: true, completedAt: '2024-01-10' },
      { id: 'm4', title: 'Integration Testing', dueDate: '2024-02-01', completed: true, completedAt: '2024-01-28' },
      { id: 'm5', title: 'App Store Submission', dueDate: '2024-02-15', completed: false },
    ],
  },
  {
    id: 'proj-3',
    name: 'ERP System for Manufacturing',
    clientName: 'SteelCore Industries',
    status: 'planning' as const,
    progress: 15,
    startDate: '2024-02-01',
    estimatedEndDate: '2024-10-31',
    budget: 8500000,
    paidAmount: 1700000,
    technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
    team: ['Arjun Sharma', 'Rohit Gupta', 'Priya Patel'],
    milestones: [
      { id: 'm1', title: 'Discovery Workshop', dueDate: '2024-02-15', completed: true, completedAt: '2024-02-12' },
      { id: 'm2', title: 'System Architecture', dueDate: '2024-03-15', completed: false },
      { id: 'm3', title: 'Module 1: Inventory', dueDate: '2024-05-31', completed: false },
      { id: 'm4', title: 'Module 2: Production', dueDate: '2024-07-31', completed: false },
      { id: 'm5', title: 'Module 3: Finance', dueDate: '2024-09-30', completed: false },
      { id: 'm6', title: 'UAT & Deployment', dueDate: '2024-10-31', completed: false },
    ],
  },
];

const mockInvoices = [
  { id: 'inv-1', projectName: 'E-commerce Platform Redesign', amount: 375000, status: 'paid', dueDate: '2024-01-20', paidDate: '2024-01-18' },
  { id: 'inv-2', projectName: 'E-commerce Platform Redesign', amount: 375000, status: 'paid', dueDate: '2024-02-20', paidDate: '2024-02-18' },
  { id: 'inv-3', projectName: 'Mobile App for Food Delivery', amount: 550000, status: 'paid', dueDate: '2023-10-15', paidDate: '2023-10-12' },
  { id: 'inv-4', projectName: 'Mobile App for Food Delivery', amount: 550000, status: 'paid', dueDate: '2023-11-15', paidDate: '2023-11-13' },
  { id: 'inv-5', projectName: 'Mobile App for Food Delivery', amount: 550000, status: 'paid', dueDate: '2023-12-15', paidDate: '2023-12-13' },
  { id: 'inv-6', projectName: 'ERP System for Manufacturing', amount: 1700000, status: 'paid', dueDate: '2024-02-10', paidDate: '2024-02-08' },
  { id: 'inv-7', projectName: 'E-commerce Platform Redesign', amount: 375000, status: 'pending', dueDate: '2024-03-20' },
  { id: 'inv-8', projectName: 'ERP System for Manufacturing', amount: 2550000, status: 'pending', dueDate: '2024-04-10' },
];

const mockMessages = [
  { id: 'msg-1', sender: 'Priya Patel (CTO)', role: 'team' as const, content: 'Hi! We\'ve completed the design phase for the homepage. Please review the Figma prototype and share your feedback by Friday.', time: '2 hours ago', read: false },
  { id: 'msg-2', sender: 'You', role: 'client' as const, content: 'Thanks for the update. I\'ll review the designs and get back to you by Thursday.', time: '1 hour ago', read: true },
  { id: 'msg-3', sender: 'Rohit Gupta (VP Engineering)', role: 'team' as const, content: 'The API development for user authentication is complete. We\'re moving on to the product catalog module next week.', time: '1 day ago', read: false },
  { id: 'msg-4', sender: 'You', role: 'client' as const, content: 'Great progress! Looking forward to seeing the catalog module.', time: '1 day ago', read: true },
];

export default function ClientPortalContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'invoices' | 'messages' | 'documents'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);

  const tabs = [
    { id: 'dashboard', label: t('clientPortal.dashboard'), icon: TrendingUp },
    { id: 'projects', label: t('clientPortal.projects'), icon: FolderOpen },
    { id: 'invoices', label: t('clientPortal.invoices'), icon: DollarSign },
    { id: 'messages', label: t('clientPortal.messages'), icon: MessageSquare },
    { id: 'documents', label: t('clientPortal.documents'), icon: FileText },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = {
      planning: 'secondary',
      design: 'primary',
      development: 'warning',
      testing: 'primary',
      deployed: 'success',
      maintenance: 'default',
    };
    return variants[status] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planning: 'Planning',
      design: 'Design',
      development: 'Development',
      testing: 'Testing',
      deployed: 'Deployed',
      maintenance: 'Maintenance',
    };
    return labels[status] || status;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/client-portal/login';
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Client Portal</p>
          </div>

          <nav className="flex-1 p-4 space-y-2" aria-label="Portal navigation">
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
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{localStorage.getItem('user_name') || 'John Doe'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{localStorage.getItem('user_email') || 'john@company.com'}</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-2 justify-start gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>{t('clientPortal.logout')}</span>
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

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Building2 className="w-4 h-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView projects={mockProjects} />
          )}
          {activeTab === 'projects' && (
            <ProjectsView projects={mockProjects} onSelectProject={setSelectedProject} />
          )}
          {activeTab === 'invoices' && (
            <InvoicesView invoices={mockInvoices} />
          )}
          {activeTab === 'messages' && (
            <MessagesView messages={mockMessages} />
          )}
          {activeTab === 'documents' && (
            <DocumentsView />
          )}
        </main>
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

function DashboardView({ projects }: { projects: typeof mockProjects }) {
  const activeProjects = projects.filter(p => p.status !== 'deployed' && p.status !== 'maintenance');
  const completedProjects = projects.filter(p => p.status === 'deployed' || p.status === 'maintenance');
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalPaid = projects.reduce((sum, p) => sum + p.paidAmount, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value={activeProjects.length} icon={FolderOpen} color="primary" />
        <StatCard title="Completed Projects" value={completedProjects.length} icon={CheckCircle} color="success" />
        <StatCard title="Total Budget" value={`₹${(totalBudget / 100000).toFixed(1)}L`} icon={DollarSign} color="warning" />
        <StatCard title="Amount Paid" value={`₹${(totalPaid / 100000).toFixed(1)}L`} icon={TrendingUp} color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem time="2 hours ago" description="Design review completed for E-commerce Platform" type="success" />
              <ActivityItem time="1 day ago" description="API authentication module deployed to staging" type="info" />
              <ActivityItem time="3 days ago" description="Invoice INV-007 generated for ERP System" type="warning" />
              <ActivityItem time="5 days ago" description="Mobile app submitted to App Store review" type="info" />
            </div>
          </CardContent>
        </Card>

        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
            <CardDescription>Key deadlines across active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.flatMap(p => p.milestones.filter(m => !m.completed).slice(0, 2)).slice(0, 4).map((milestone, index) => (
                <MilestoneItem key={index} milestone={milestone} projectName={mockProjects.find(p => p.milestones.includes(milestone))?.name || ''} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="bordered" padding="lg">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Progress</th>
                  <th className="pb-3 font-medium">Budget</th>
                  <th className="pb-3 font-medium">Next Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 font-medium text-gray-900 dark:text-white">{project.name}</td>
                    <td className="py-4"><Badge variant={getStatusBadge(project.status)}>{getStatusLabel(project.status)}</Badge></td>
                    <td className="py-4">
                      <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">₹{project.budget.toLocaleString()}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">
                      {project.milestones.find(m => !m.completed)?.title || 'Completed'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectsView({ projects, onSelectProject }: { projects: Project[]; onSelectProject: (p: Project) => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card key={project.id} variant="bordered" hover padding="lg" onClick={() => onSelectProject(project)} className="cursor-pointer">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Badge variant={getStatusBadge(project.status)} className="mb-2">{getStatusLabel(project.status)}</Badge>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{project.clientName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{project.progress}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Complete</div>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-primary-600 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Budget: </span>₹{project.budget.toLocaleString()}
            </div>
            <Button variant="ghost" size="sm">View Details</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function InvoicesView({ invoices }: { invoices: typeof mockInvoices }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <th className="pb-3 font-medium">Invoice</th>
            <th className="pb-3 font-medium">Project</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Due Date</th>
            <th className="pb-3 font-medium">Paid Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="py-4 font-mono text-sm text-gray-900 dark:text-white">{invoice.id}</td>
              <td className="py-4 text-gray-600 dark:text-gray-400">{invoice.projectName}</td>
              <td className="py-4 font-medium text-gray-900 dark:text-white">₹{invoice.amount.toLocaleString()}</td>
              <td className="py-4">
                <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'}>
                  {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                </Badge>
              </td>
              <td className="py-4 text-gray-600 dark:text-gray-400">{invoice.dueDate}</td>
              <td className="py-4 text-gray-600 dark:text-gray-400">{invoice.paidDate || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessagesView({ messages }: { messages: typeof mockMessages }) {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="max-w-3xl mx-auto">
      <Card variant="bordered" padding="lg">
        <CardHeader>
          <CardTitle>Project Communications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </CardContent>
        <div className="mt-6 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button size="sm">Send</Button>
        </div>
      </Card>
    </div>
  );
}

function DocumentsView() {
  const documents = [
    { name: 'Project Proposal - E-commerce Platform.pdf', size: '2.4 MB', date: '2024-01-10', project: 'E-commerce Platform Redesign' },
    { name: 'Technical Specification Document.pdf', size: '1.8 MB', date: '2024-01-15', project: 'E-commerce Platform Redesign' },
    { name: 'Design System Guidelines.pdf', size: '5.2 MB', date: '2024-02-01', project: 'E-commerce Platform Redesign' },
    { name: 'API Documentation.pdf', size: '3.1 MB', date: '2024-01-20', project: 'Mobile App for Food Delivery' },
    { name: 'Test Plan & Test Cases.xlsx', size: '890 KB', date: '2024-01-25', project: 'Mobile App for Food Delivery' },
    { name: 'Requirements Document - ERP.pdf', size: '1.2 MB', date: '2024-02-05', project: 'ERP System for Manufacturing' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card variant="bordered" padding="lg">
        <CardHeader>
          <CardTitle>Project Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentItem key={doc.name} document={doc} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
          <div>
            <Badge variant={getStatusBadge(project.status)} className="mb-2">{getStatusLabel(project.status)}</Badge>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{project.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{project.clientName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard label="Progress" value={`${project.progress}%`} icon={TrendingUp} />
            <InfoCard label="Budget" value={`₹${project.budget.toLocaleString()}`} icon={DollarSign} />
            <InfoCard label="Paid" value={`₹${project.paidAmount.toLocaleString()}`} icon={CheckCircle} color="success" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="Start Date" value={new Date(project.startDate).toLocaleDateString()} icon={Clock} />
            <InfoCard label="Est. End Date" value={new Date(project.estimatedEndDate).toLocaleDateString()} icon={Clock} />
            <InfoCard label="Technologies" value={project.technologies.join(', ')} icon={FolderOpen} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {milestone.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{milestone.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={milestone.completed ? 'success' : 'secondary'} size="sm">
                    {milestone.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h3>
            <div className="flex flex-wrap gap-2">
              {project.team.map((member) => (
                <Badge key={member} variant="outline">{member}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number | string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  const colors = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <Card variant="bordered" padding="lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

function ActivityItem({ time, description, type }: { time: string; description: string; type: 'success' | 'info' | 'warning' }) {
  const icons = { success: CheckCircle, info: AlertCircle, warning: AlertCircle };
  const colors = { success: 'text-green-500', info: 'text-blue-500', warning: 'text-yellow-500' };
  const Icon = icons[type];

  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 ${colors[type]} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-white">{description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
}

function MilestoneItem({ milestone, projectName }: { milestone: Milestone; projectName: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
        <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{milestone.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{projectName} • Due {new Date(milestone.dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isClient = message.role === 'client';

  return (
    <div className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isClient ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-2xl px-4 py-3`}>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{message.sender}</p>
        <p className="text-sm">{message.content}</p>
        <p className="text-xs opacity-70 mt-1 text-right">{message.time}</p>
      </div>
    </div>
  );
}

function DocumentItem({ document }: { document: { name: string; size: string; date: string; project: string } }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center gap-4">
        <FileText className="w-10 h-10 text-red-500 flex-shrink-0" />
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{document.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{document.project} • {document.size} • {new Date(document.date).toLocaleDateString()}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
    </div>
  );
}

function InfoCard({ label, value, icon: Icon, color = 'primary' }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; color?: string }) {
  const colors = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function getStatusBadge(status: string) {
  const variants: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = {
    planning: 'secondary',
    design: 'primary',
    development: 'warning',
    testing: 'primary',
    deployed: 'success',
    maintenance: 'default',
  };
  return variants[status] || 'default';
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    planning: 'Planning',
    design: 'Design',
    development: 'Development',
    testing: 'Testing',
    deployed: 'Deployed',
    maintenance: 'Maintenance',
  };
  return labels[status] || status;
}