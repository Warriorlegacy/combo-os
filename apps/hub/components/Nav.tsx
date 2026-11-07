'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, ShieldCheck, Sun, Moon, Database, Cpu, Sparkles, BookOpen } from 'lucide-react';

export function Nav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial color scheme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Free Stack Directory', href: '/directory' },
    { label: 'GTM Autopilot OS', href: '/gtm' },
    { label: 'RAG Eval Copilot', href: '/rag-eval' },
    { label: 'Multi-Model Gateway', href: '/models' }
  ];

  return (
    <header className="border-b border-[#dddccd] dark:border-[#31362d] bg-[#fffef9] dark:bg-[#181b16] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 font-mono font-bold tracking-tight text-base hover:opacity-80 transition-opacity">
            <span className="w-6 h-6 rounded bg-[#17603a] dark:bg-[#6fce96] text-white dark:text-[#111410] flex items-center justify-center text-xs font-mono font-bold">C</span>
            <span className="font-serif font-bold text-lg text-[#1c1f1a] dark:text-[#e8eae3]">COMBO OS</span>
          </Link>
          
          <span className="hidden md:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Cloudflare Edge $0 Stack</span>
          </span>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-2 text-sm font-sans font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm ${
                  isActive
                    ? 'bg-[#1c1f1a] text-[#fffef9] dark:bg-[#e8eae3] dark:text-[#111410] font-semibold'
                    : 'text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#efeee6] dark:hover:bg-[#1f231d]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 ml-2 rounded-md border border-[#dddccd] dark:border-[#31362d] text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#efeee6] dark:hover:bg-[#1f231d] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
