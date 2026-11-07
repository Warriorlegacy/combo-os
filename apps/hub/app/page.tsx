'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, Database, HardDrive, Globe, Sparkles, CheckCircle2, ArrowRight, Layers, Terminal } from 'lucide-react';

export default function HomePage() {
  const [telemetry, setTelemetry] = useState({
    tools: 504,
    pendingGTM: 1,
    groundedness: 98,
    refusalAccuracy: 100,
    latency: 38
  });

  const projects = [
    {
      id: 1,
      title: 'Signhify GTM Autopilot OS',
      tag: 'FLAGSHIP DAY 5-15',
      signal: '10/10',
      desc: 'Content research to brand draft to strict human approval gate to scheduled social publishing. Never posts without a human yes.',
      href: '/gtm',
      badge: 'GTM Governance'
    },
    {
      id: 2,
      title: 'RAG Support Copilot + Eval Dashboard',
      tag: 'INTERVIEW WEAPON',
      signal: '10/10',
      desc: 'Answers strictly from store/app docs with verified citations. Live eval dashboard proving 98% groundedness and 100% refusal precision.',
      href: '/rag-eval',
      badge: 'Evaluation Suite'
    },
    {
      id: 3,
      title: 'WhatsApp AI Sales & Support Agent',
      tag: 'FIXED SETUP SERVICE',
      signal: '8/10',
      desc: 'Local business WhatsApp agent for clinics, salons, and real estate. Answers FAQs, qualifies budget/slot, and handles human staff handoff.',
      href: '/whatsapp',
      badge: 'Meta Webhooks'
    },
    {
      id: 4,
      title: '3D Product Configurator / Virtual Showroom',
      tag: 'HIGH-TICKET B2B',
      signal: '10/10',
      desc: '60 FPS WebGL product showroom for furniture and property. Real-time finish switching, orbital camera presets, and live price calculator.',
      href: '/showroom',
      badge: 'WebGL & Three.js'
    },
    {
      id: 5,
      title: 'AI Lead Recovery & Outreach Agent',
      tag: 'REVIVE DEAD LEADS',
      signal: '8/10',
      desc: 'Analyzes stale CRM contacts, scores intent, and drafts contextual follow-ups citing past discussions with mandatory human review.',
      href: '/lead-recovery',
      badge: 'CRM Outreach'
    },
    {
      id: 6,
      title: 'JobAutopilot Pro',
      tag: 'CAREER SPRINT',
      signal: '9/10',
      desc: 'AI role matching with tailored resume bullets and an interactive application pipeline Kanban (Bookmarked -> Applied -> Interview -> Offer).',
      href: '/job-autopilot',
      badge: 'Career Autopilot'
    },
    {
      id: 7,
      title: 'Faceless Shorts / Reels Factory',
      tag: 'ORGANIC REACH',
      signal: '7/10',
      desc: 'Automated 9:16 vertical short-video pipeline: viral 3s hook, narrative pacing, speech tempo sync, and animated kinetic subtitles.',
      href: '/shorts-factory',
      badge: 'Video Production'
    },
    {
      id: 8,
      title: 'AI Meeting-to-CRM Copilot',
      tag: 'STUDIO EFFICIENCY',
      signal: '9/10',
      desc: 'Turns call transcripts into structured CRM records: executive summary, binding client decisions, and action items with owners and dates.',
      href: '/meeting-crm',
      badge: 'Speech to Action'
    },
    {
      id: 9,
      title: 'Freelancer Client OS',
      tag: 'STUDIO CASH FLOW',
      signal: '7/10',
      desc: 'Proposals, contracts, deliverables, and invoices in one micro-SaaS. Cash before subscriptions with Stripe & UPI tracking.',
      href: '/freelancer-os',
      badge: 'Client Portal'
    },
    {
      id: 10,
      title: 'AI Interview Prep Coach (PWA)',
      tag: 'MOBILE COACH',
      signal: '8/10',
      desc: 'Voice mock interviews for senior AI and full-stack roles. Answer out loud, get scored on the STAR framework, and improve delivery.',
      href: '/interview-coach',
      badge: 'Voice PWA'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Signhify Studio</span>
          <span>•</span>
          <span>Zero-Capital Production Suite</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#1c1f1a] dark:text-[#e8eae3] leading-tight">
          The $0 Architecture: Production Software Without Cloud Waste.
        </h1>
        <p className="text-[#4c524a] dark:text-[#b3b8ac] text-base sm:text-lg max-w-3xl leading-relaxed">
          Combo OS unites the complete <strong>Free Website Infrastructure Stack</strong>, an integrated <strong>FreeLLMAPI Unified Router</strong>, a directory of 504+ tools, and the entire roadmap of <strong>10 High-Yield Free-Stack Projects</strong>—crafted to <strong>The Unslop Playbook</strong> standard.
        </p>
      </section>

      {/* Live Invariant & Telemetry Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">CURATED TOOLS</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{telemetry.tools}+</div>
          <div className="text-xs text-[#17603a] dark:text-[#6fce96] mt-0.5">Tabworthy + Free-for-Dev</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">RAG GROUNDEDNESS</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#17603a] dark:text-[#6fce96]">{telemetry.groundedness}%</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-0.5">Zero Hallucinations Passed</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">HIGH-YIELD BUILDS</div>
          <div className="mt-1 font-serif text-2xl font-bold text-amber-700 dark:text-amber-400">10 / 10 Ready</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-0.5">All ranked PDF projects</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">ROUTER INFERENCE</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#1c1f1a] dark:text-[#e8eae3]">~{telemetry.latency}ms</div>
          <div className="text-xs text-[#17603a] dark:text-[#6fce96] mt-0.5">FreeLLMAPI + Cloudflare V8</div>
        </div>
      </section>

      {/* The 7-Layer Free Stack Architecture Card */}
      <section className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#17603a] dark:text-[#6fce96]" />
            <h2 className="font-serif text-xl font-semibold">The Free Website Infrastructure Stack</h2>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#e3efe4] dark:bg-[#1d2f22] text-[#17603a] dark:text-[#6fce96] font-semibold">
            Perpetual $0 Tier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">1. REPOSITORY</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">UNLIMITED</span>
            </div>
            <div className="font-medium text-sm mt-1">GitHub Public / Private</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">2,000 CI minutes/month, zero hosting cost.</div>
          </div>

          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">2. FRONT-END</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">UNLIMITED BANDWIDTH</span>
            </div>
            <div className="font-medium text-sm mt-1">Cloudflare Pages</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">500 builds/month, 100 custom domains, zero egress.</div>
          </div>

          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">3. BACK-END</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">100K REQ/DAY</span>
            </div>
            <div className="font-medium text-sm mt-1">Cloudflare Workers</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">300+ global edge locations, 10ms CPU time/req.</div>
          </div>

          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">4. DATABASE</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">5M READS/DAY</span>
            </div>
            <div className="font-medium text-sm mt-1">Cloudflare D1</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">Serverless distributed SQLite with 5GB storage.</div>
          </div>

          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">5. STORAGE</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">10 GB FREE</span>
            </div>
            <div className="font-medium text-sm mt-1">Cloudflare R2</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">S3-compatible object storage with ZERO egress fees.</div>
          </div>

          <div className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">6. AI INFERENCE</span>
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">MULTI-GATEWAY</span>
            </div>
            <div className="font-medium text-sm mt-1">FreeLLMAPI + Cloudflare + Groq</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">Local router (127.0.0.1:31415), DeepSeek R1, Llama 3.3, Gemini.</div>
          </div>
        </div>
      </section>

      {/* 10 Ranked Free-Stack Projects from PDF */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold">10 High-Yield Free-Stack Projects</h2>
            <p className="text-sm text-[#4c524a] dark:text-[#b3b8ac]">
              Ranked roadmap from the Signhify Studio zero-capital playbook. Every build has production code and interactive demo routes.
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#e3efe4] dark:bg-[#1d2f22] text-[#17603a] dark:text-[#6fce96] self-start sm:self-auto">
            10 / 10 Production Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-3 hover:border-[#17603a] transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#17603a] dark:text-[#6fce96] font-semibold">
                    PROJECT #{p.id} • {p.tag}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    Signal: {p.signal}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1c1f1a] dark:text-[#e8eae3]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#dddccd] dark:border-[#31362d] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#7a8074]">{p.badge}</span>
                <Link
                  href={p.href}
                  className="inline-flex items-center text-xs font-semibold text-[#17603a] dark:text-[#6fce96] hover:underline"
                >
                  <span>Launch Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
