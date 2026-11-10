'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Sun, Moon, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export function Nav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);

  useEffect(() => {
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

  const mainNavItems = [
    { label: 'Overview', href: '/' },
    { label: 'Free Stack Directory', href: '/directory' },
    { label: 'Multi-Model AI', href: '/models' },
    { label: 'ROI & Pricing', href: '/pricing' }
  ];

  const projects = [
    { id: 1, label: '1. GTM Autopilot OS', href: '/gtm', desc: 'Content research to human approval' },
    { id: 2, label: '2. RAG Eval Copilot', href: '/rag-eval', desc: 'Support with golden benchmark evals' },
    { id: 3, label: '3. WhatsApp AI Agent', href: '/whatsapp', desc: 'Local business sales & support' },
    { id: 4, label: '4. 3D WebGL Showroom', href: '/showroom', desc: '60 FPS product configurator' },
    { id: 5, label: '5. AI Lead Recovery', href: '/lead-recovery', desc: 'Revive stale CRM leads' },
    { id: 6, label: '6. JobAutopilot Pro', href: '/job-autopilot', desc: 'Tailored resume bullets & Kanban' },
    { id: 7, label: '7. Faceless Shorts Factory', href: '/shorts-factory', desc: 'Automated video reels pipeline' },
    { id: 8, label: '8. Meeting-to-CRM', href: '/meeting-crm', desc: 'Action items & decisions extractor' },
    { id: 9, label: '9. Freelancer Client OS', href: '/freelancer-os', desc: 'Invoices, proposals & contracts' },
    { id: 10, label: '10. AI Interview Coach', href: '/interview-coach', desc: 'Voice mock interviews & STAR scoring' }
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
            <span>FreeLLMAPI & Cloudflare Edge Active</span>
          </span>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-2 text-sm font-sans font-medium">
          {mainNavItems.map((item) => {
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

          {/* 10 Projects Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProjectsMenu(!showProjectsMenu)}
              className="px-3 py-1.5 rounded-md text-xs sm:text-sm flex items-center space-x-1 text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#efeee6] dark:hover:bg-[#1f231d] transition-colors"
            >
              <span>10 Flagship Projects</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showProjectsMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] shadow-lg py-2 z-50 text-xs"
                onMouseLeave={() => setShowProjectsMenu(false)}
              >
                <div className="px-3 py-1 font-mono text-[10px] text-[#7a8074] uppercase border-b border-[#dddccd] dark:border-[#31362d] mb-1">
                  High-Yield Free-Stack Roadmaps
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {projects.map((p) => (
                    <Link
                      key={p.id}
                      href={p.href}
                      onClick={() => setShowProjectsMenu(false)}
                      className="block px-3 py-2 hover:bg-[#efeee6] dark:hover:bg-[#1f231d] transition-colors"
                    >
                      <div className="font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">{p.label}</div>
                      <div className="text-[11px] text-[#7a8074] dark:text-[#828a7d]">{p.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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
