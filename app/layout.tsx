import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PhoneClickTracking } from '@/src/components/analytics/PhoneClickTracking';


import { COMPANY_NAME, DOMAIN } from '@/src/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    template: `%s | ${COMPANY_NAME}`,
    default: COMPANY_NAME,
  },
  description: 'Stavebná firma zameraná na výstavbu a rekonštrukcie budov, rodinných domov, bytových domov, komerčných budov, priemyselných objektov a občianskych stavieb.',
  openGraph: {
    title: {
      template: `%s | ${COMPANY_NAME}`,
      default: COMPANY_NAME,
    },
    description: 'Stavebná firma zameraná na výstavbu a rekonštrukcie budov, rodinných domov, bytových domov, komerčných budov, priemyselných objektov a občianskych stavieb.',
    url: DOMAIN,
    siteName: COMPANY_NAME,
    locale: 'sk_SK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: `%s | ${COMPANY_NAME}`,
      default: COMPANY_NAME,
    },
    description: 'Stavebná firma zameraná na výstavbu a rekonštrukcie budov, rodinných domov, bytových domov, komerčných budov, priemyselných objektov a občianskych stavieb.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        {/* Lighthouse flagged this as worth ~300 ms of LCP: GA4 resolves
            through analytics.google.com, and the connection was only being
            opened after gtag.js had parsed. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.google.com" />
      </head>
      <body className="antialiased text-gray-900 bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/*
          Was <GoogleTagManager gtmId="GTM-KRQHW2J" />, which loaded gtm.js
          (119 KB) purely as a wrapper around one GA4 tag and a tel: click
          trigger. Loading GA4 directly drops the container; the click trigger
          is reimplemented in PhoneClickTracking.
        */}
        <GoogleAnalytics gaId="G-B92P56D6ZG" />
        <PhoneClickTracking />

      </body>

    </html>
  );
}
