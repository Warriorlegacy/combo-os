import './globals.css';
import { Nav } from '../components/Nav';
import type { Metadata } from 'next';

import type { Metadata, Viewport } from 'next';
export const metadata: Metadata = {
  title: 'Combo OS — Free Website Infrastructure Stack & AI Production Suite',
  description: 'Production-ready free stack platform powered by Cloudflare Pages, Workers, D1, R2, and free multi-model AI inference.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#17603a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#f7f6f1] dark:bg-[#111410] text-[#1c1f1a] dark:text-[#e8eae3]">
        <Nav />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-[#dddccd] dark:border-[#31362d] py-6 text-center text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">
          <p>Combo OS · Built for Signhify Studio by Piyush Raj Singh · 100% $0 Tech Stack · Unslop Certified</p>
        </footer>
      </body>
    </html>
  );
}

