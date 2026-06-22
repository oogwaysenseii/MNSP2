import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { generateLocalBusinessSchema } from '@/src/lib/schema';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Stavebná firma',
  description: 'Profesionálne stavebné služby',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateLocalBusinessSchema();

  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased text-gray-900 bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
