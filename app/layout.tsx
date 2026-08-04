import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { generateLocalBusinessSchema } from '@/src/lib/schema';
import { GoogleTagManager } from '@next/third-parties/google';


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
      <body className="antialiased text-gray-900 bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>

      <GoogleTagManager gtmId="GTM-XXXXXXX" />

    </html>
  );
}
