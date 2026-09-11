export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  priceRange: string;
  technologies: string[];
  deliveryTime: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  technologies: string[];
  clientName: string;
  clientLogo?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  results: string[];
  testimonial?: Testimonial;
  featured?: boolean;
  date?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  linkedin?: string;
  twitter?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';
  createdAt: string;
  updatedAt: string;
}

export interface ClientProject {
  id: string;
  name: string;
  clientName: string;
  status: 'planning' | 'design' | 'development' | 'testing' | 'deployed' | 'maintenance';
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  budget: number;
  paidAmount: number;
  technologies: string[];
  team: string[];
  milestones: Milestone[];
  documents: Document[];
  messages: Message[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'team';
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  nativeName: string;
  flag: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    github: string;
    youtube: string;
  };
  gstin?: string;
  cin?: string;
  pan?: string;
}

export interface WebsiteTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  previewUrl: string;
  features: string[];
  technologies: string[];
  pages: string[];
  targetAudience: string;
  priceRange: string;
  popular?: boolean;
  tags: string[];
}