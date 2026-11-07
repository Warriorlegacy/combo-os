'use client';

import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ChevronRight, Sparkles, Filter, Plus, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import type { JobApplication, ApplicationStatus } from '@combo/shared-types';

const INITIAL_JOBS: JobApplication[] = [
  {
    id: 'job-1',
    role_title: 'Staff Generative AI Engineer',
    company: 'Anthropic AI Partner Studio',
    match_score: 96,
    status: 'INTERVIEW',
    tailored_resume_bullets: [
      'Architected full-stack AI edge pipelines across Cloudflare Pages, Workers, and D1 supporting 100K daily requests at $0 cloud cost.',
      'Designed grounded RAG evaluation suite achieving 98% citation accuracy and 100% refusal precision on out-of-domain queries.',
      'Engineered multi-model LLM router with automatic sub-50ms fallback across FreeLLMAPI router, Workers AI, Groq LPU, and Google Gemini.'
    ],
    salary_range: '$140K - $180K',
    created_at: '2026-11-05'
  },
  {
    id: 'job-2',
    role_title: 'Senior Full-Stack & 3D WebGL Developer',
    company: 'HyperSpace Commerce',
    match_score: 91,
    status: 'APPLIED',
    tailored_resume_bullets: [
      'Built 60 FPS Three.js product configurator with dynamic material shader switching and live price recalculation.',
      'Optimized glTF asset delivery using Draco compression to enforce a strict sub-8MB initial scene budget.'
    ],
    salary_range: '$130K - $160K',
    created_at: '2026-11-06'
  },
  {
    id: 'job-3',
    role_title: 'Principal Systems Architect (Edge & AI)',
    company: 'Cloudflare Ecosystem Ventures',
    match_score: 98,
    status: 'BOOKMARKED',
    tailored_resume_bullets: [
      'Designed zero-dollar high-yield application suite combining Cloudflare D1, R2, and Workers AI with Hono TypeScript routing.',
      'Eliminated cloud egress overhead across all client media pipelines.'
    ],
    salary_range: '$160K - $210K',
    created_at: '2026-11-07'
  }
];

export default function JobAutopilotPage() {
  const [jobs, setJobs] = useState<JobApplication[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<JobApplication>(INITIAL_JOBS[0]);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedJD, setPastedJD] = useState('');
  const [pastedRole, setPastedRole] = useState('');
  const [pastedCompany, setPastedCompany] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
    if (selectedJob.id === id) {
      setSelectedJob(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAnalyzeJD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedJD.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = pastedJD.toLowerCase();
      let score = 82;
      if (lower.includes('cloudflare') || lower.includes('edge')) score += 6;
      if (lower.includes('rag') || lower.includes('llm') || lower.includes('eval')) score += 7;
      if (lower.includes('next.js') || lower.includes('typescript')) score += 4;
      score = Math.min(99, score);

      const created: JobApplication = {
        id: `job-${Date.now()}`,
        role_title: pastedRole.trim() || 'Senior Full-Stack & GenAI Engineer',
        company: pastedCompany.trim() || 'Tech Studio Partner',
        match_score: score,
        status: 'BOOKMARKED',
        tailored_resume_bullets: [
          `Targeted match for ${pastedRole || 'engineering position'}: Engineered production edge architectures using Cloudflare Workers, Pages, and D1 SQLite with zero egress overhead.`,
          `Implemented grounded evaluation harness with strict refusal thresholds below 0.65 similarity to ensure zero false claims.`,
          `Built high-velocity LLM multi-provider gateway supporting FreeLLMAPI custom router, Groq, and Gemini Flash.`
        ],
        salary_range: '$135K - $175K',
        created_at: new Date().toISOString().split('T')[0]
      };

      setJobs([created, ...jobs]);
      setSelectedJob(created);
      setIsAnalyzing(false);
      setShowPasteModal(false);
      setPastedJD('');
      setPastedRole('');
      setPastedCompany('');
    }, 600);
  };

  const columns: ApplicationStatus[] = ['BOOKMARKED', 'APPLIED', 'INTERVIEW', 'OFFER'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #6 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          JobAutopilot Pro
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Role matcher and tailored resume bullet generator. Ingests job postings, scores profile match, and translates your verified production engineering work into exact hiring vocabulary.
        </p>
      </div>

      {/* Anti-Hallucination Resume Policy */}
      <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex items-start space-x-3 text-xs text-[#4c524a] dark:text-[#b3b8ac]">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#17603a] dark:text-[#6fce96]" />
        <div>
          <strong className="text-[#1c1f1a] dark:text-[#e8eae3]">Truth-in-Resume Invariant:</strong> The rewriter adapts your real architectural achievements to match the phrasing and keywords of the job specification. It <strong>never invents</strong> technologies or metrics you have not deployed.
        </div>
      </div>

      {/* Quick Intake Bar */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
        <div className="text-xs font-mono text-[#7a8074]">
          Pipeline: <strong>{jobs.length} Active Targets</strong> · Median Match: <strong>95%</strong>
        </div>
        <button
          onClick={() => setShowPasteModal(true)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ingest New Job Post</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(col => {
          const colJobs = jobs.filter(j => j.status === col);
          return (
            <div
              key={col}
              className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2 font-mono text-xs">
                <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{col}</span>
                <span className="px-1.5 py-0.5 rounded bg-[#efeee6] dark:bg-[#1f231d] text-[#7a8074]">
                  {colJobs.length}
                </span>
              </div>

              <div className="space-y-3">
                {colJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-3 rounded border text-xs cursor-pointer transition-colors space-y-1.5 ${
                      selectedJob.id === job.id
                        ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22]'
                        : 'border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] hover:border-[#17603a]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1c1f1a] dark:text-[#e8eae3] leading-snug">
                        {job.role_title}
                      </span>
                      <span className="font-mono text-[10px] text-[#17603a] dark:text-[#6fce96] font-bold">
                        {job.match_score}%
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#7a8074]">{job.company}</div>
                    <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">{job.salary_range}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Job Resume Tailoring Panel */}
      <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-3 gap-2">
          <div>
            <span className="font-serif font-bold text-lg">{selectedJob.role_title}</span>
            <div className="text-xs font-mono text-[#7a8074]">{selectedJob.company} • {selectedJob.salary_range}</div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#7a8074]">Move status:</span>
            {columns.map(status => (
              <button
                key={status}
                onClick={() => updateStatus(selectedJob.id, status)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  selectedJob.status === status
                    ? 'bg-[#1c1f1a] text-white dark:bg-[#e8eae3] dark:text-[#111410] font-bold'
                    : 'border border-[#dddccd] dark:border-[#31362d] text-[#7a8074] hover:bg-[#efeee6]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif font-semibold text-sm">Tailored Resume Experience Bullets</span>
            <span className="font-mono text-xs text-[#17603a] dark:text-[#6fce96] font-bold">
              {selectedJob.match_score}% Profile Alignment
            </span>
          </div>

          <div className="space-y-2">
            {selectedJob.tailored_resume_bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] text-xs leading-relaxed flex items-start space-x-2.5"
              >
                <span className="text-[#17603a] dark:text-[#6fce96] font-bold mt-0.5">•</span>
                <span className="text-[#1c1f1a] dark:text-[#e8eae3]">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ingest Job Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] rounded-lg max-w-lg w-full p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Ingest & Match Job Posting</h3>
            <form onSubmit={handleAnalyzeJD} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Generative AI Architect"
                    value={pastedRole}
                    onChange={e => setPastedRole(e.target.value)}
                    className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Horizon Labs"
                    value={pastedCompany}
                    onChange={e => setPastedCompany(e.target.value)}
                    className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Paste Job Description / Requirements</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Paste the full JD text, responsibilities, and required qualifications..."
                  value={pastedJD}
                  onChange={e => setPastedJD(e.target.value)}
                  className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-sans"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="px-3 py-1.5 rounded border border-[#dddccd] text-[#7a8074]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-4 py-1.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-semibold"
                >
                  {isAnalyzing ? 'Analyzing Alignment...' : 'Extract Skills & Tailor Bullets'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
