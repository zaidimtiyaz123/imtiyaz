import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://creatoroftechnology.com'),
  title: {
    default: 'Creator of Technology | Building Digital Futures',
    template: '%s | Creator of Technology',
  },
  description: 'Leading technology company specializing in custom software development, web applications, mobile apps, and digital transformation. 500+ projects delivered for 200+ clients worldwide.',
  keywords: ['software development', 'web development', 'mobile app development', 'custom software', 'digital transformation', 'technology company', 'India'],
  authors: [{ name: 'Creator of Technology' }],
  creator: 'Creator of Technology',
  publisher: 'Creator of Technology',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creatoroftechnology.com',
    siteName: 'Creator of Technology',
    title: 'Creator of Technology | Building Digital Futures',
    description: 'Leading technology company specializing in custom software development, web applications, mobile apps, and digital transformation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creator of Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator of Technology | Building Digital Futures',
    description: 'Leading technology company specializing in custom software development, web applications, mobile apps, and digital transformation.',
    images: ['/og-image.jpg'],
    creator: '@creatortech',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}