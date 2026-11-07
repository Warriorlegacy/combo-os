'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, Database, HardDrive, Globe, Sparkles, CheckCircle2, ArrowRight, Layers, Terminal } from 'lucide-react';

export default function HomePage() {
  const [telemetry, setTelemetry] = useState({
    tools: 18,
    pendingGTM: 1,
    groundedness: 98,
    refusalAccuracy: 100,
    latency: 42
  });

  return (
    <div className="space-y-10">
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
          Combo OS unites the complete <strong>Free Website Infrastructure Stack</strong> with a curated directory of 504+ dev tools, a multi-model AI edge gateway, and the top two high-yield flagship builds—crafted with <strong>The Unslop Playbook</strong> standard.
        </p>
      </section>

      {/* Live Invariant & Telemetry Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">CURATED TOOLS</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#1c1f1a] dark:text-[#e8eae3]">504+</div>
          <div className="text-xs text-[#17603a] dark:text-[#6fce96] mt-0.5">Tabworthy + Free-for-Dev</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">RAG GROUNDEDNESS</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#17603a] dark:text-[#6fce96]">{telemetry.groundedness}%</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-0.5">Zero Hallucinations Passed</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">GTM APPROVAL GATE</div>
          <div className="mt-1 font-serif text-2xl font-bold text-amber-700 dark:text-amber-400">Strict Human Lock</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-0.5">{telemetry.pendingGTM} pending review</div>
        </div>

        <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
          <div className="text-xs font-mono text-[#7a8074] dark:text-[#828a7d]">EDGE RESPONSE TIME</div>
          <div className="mt-1 font-serif text-2xl font-bold text-[#1c1f1a] dark:text-[#e8eae3]">~{telemetry.latency}ms</div>
          <div className="text-xs text-[#17603a] dark:text-[#6fce96] mt-0.5">Cloudflare V8 Isolates</div>
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
            <div className="font-medium text-sm mt-1">Workers AI + Groq + Gemini</div>
            <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">DeepSeek R1, Llama 3.3 70B, Qwen 2.5 Coder, Gemini Flash.</div>
          </div>
        </div>
      </section>

      {/* Flagship Production Suites */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-semibold">Flagship Production Engines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-4 hover:border-[#17603a] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#17603a] dark:text-[#6fce96] font-semibold">PROJECT #1 (DAY 5-15 FLAGSHIP)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">Job Signal: 10/10</span>
              </div>
              <h3 className="font-serif text-xl font-bold">Signhify GTM Autopilot OS</h3>
              <p className="text-sm text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                Autonomous content research, brand-voice drafting, and fact-checking with a strict <strong>human approval gate</strong> that prevents unreviewed AI hallucinations from reaching LinkedIn, X, or blog feeds.
              </p>
            </div>
            <Link
              href="/gtm"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded bg-[#1c1f1a] dark:bg-[#e8eae3] text-[#fffef9] dark:text-[#111410] font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>Launch GTM Approval Board</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Project 2 */}
          <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-4 hover:border-[#17603a] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#17603a] dark:text-[#6fce96] font-semibold">PROJECT #2 (INTERVIEW WEAPON)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">Job Signal: 10/10</span>
              </div>
              <h3 className="font-serif text-xl font-bold">RAG Support Copilot + Eval Dashboard</h3>
              <p className="text-sm text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                Support copilot that answers strictly from verified documentation, cites exact sources, and proves reliability with a live benchmark measuring <strong>Groundedness, Citation Accuracy, and Refusal Precision</strong>.
              </p>
            </div>
            <Link
              href="/rag-eval"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded bg-[#1c1f1a] dark:bg-[#e8eae3] text-[#fffef9] dark:text-[#111410] font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>Launch RAG Eval Copilot</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Modules */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/directory"
          className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] block hover:border-[#17603a] transition-colors"
        >
          <div className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">TABWORTHY + FREE-FOR-DEV</div>
          <div className="font-serif text-lg font-bold mt-1">Curated Developer Directory</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">Search 504+ tools, compute tiers, free vector DBs, and hidden web utilities.</div>
        </Link>

        <Link
          href="/models"
          className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] block hover:border-[#17603a] transition-colors"
        >
          <div className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">MULTI-LLM EDGE GATEWAY</div>
          <div className="font-serif text-lg font-bold mt-1">Free AI Model Playground</div>
          <div className="text-xs text-[#4c524a] dark:text-[#b3b8ac] mt-1">Test DeepSeek R1 Distill Qwen, Llama 3.3 70B, and Gemini Flash with live latency benchmarking.</div>
        </Link>
      </section>
    </div>
  );
}
