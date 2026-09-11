# Creator of Technology - Website

A modern, fully functional technology services website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Multi-language Support**: English & Hindi with RTL support
- **Dark/Light Mode**: System-aware theme switching
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Full Pages**:
  - Home Page with Hero, Services, Portfolio, Testimonials, Stats
  - Services Page with detailed service listings
  - Portfolio Page with filtering and case studies
  - About Page with team, values, journey
  - Contact Page with form validation and WhatsApp integration
  - Blog Page with categories and pagination
  - Client Portal with dashboard, projects, invoices, messages
  - Admin Panel with full CRUD management
- **UI Components**: Button, Input, Card, Badge, Select, Textarea
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion for smooth transitions
- **SEO Ready**: Metadata, sitemap, robots.txt, Open Graph
- **Accessibility**: WCAG 2.1 compliant, semantic HTML, ARIA labels

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
cd tirm

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── admin/             # Admin panel
│   ├── blog/              # Blog page
│   ├── client-portal/     # Client portal
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
├── context/               # React contexts (Language, Theme)
├── data/                  # Static data (services, portfolio, team)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, translations
└── types/                 # TypeScript types
```

## Customization

### Company Information

Edit `src/data/index.ts` to update:
- Company name, tagline, description
- Contact details (address, phone, email, WhatsApp)
- Social media links
- Legal information (GSTIN, CIN, PAN)

### Services

Modify the `services` array in `src/data/index.ts` to add/edit services.

### Portfolio Projects

Update the `portfolio` array in `src/data/index.ts` with your projects.

### Team Members

Edit the `teamMembers` array in `src/data/index.ts`.

### Translations

Add/modify translations in `src/lib/translations.ts`.

### Styling

Customize colors, fonts, and design tokens in `tailwind.config.js`.

## Key Integrations Ready

- **WhatsApp Business API**: Contact forms and chat integration
- **Razorpay**: Payment gateway (configure in admin settings)
- **Email Service**: Nodemailer/SendGrid ready in API routes
- **Analytics**: Google Analytics ID in settings
- **SEO**: Meta tags, sitemap, robots.txt configured

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Create `.env.local`:

```env
# Site
NEXT_PUBLIC_SITE_URL=https://creatoroftechnology.com
NEXT_PUBLIC_COMPANY_NAME=Creator of Technology

# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_id
SALES_WHATSAPP_NUMBER=919876543210

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
FROM_EMAIL=noreply@creatoroftechnology.com
SALES_EMAIL=sales@creatoroftechnology.com

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or support, contact us at hello@creatoroftechnology.com