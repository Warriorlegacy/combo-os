'use client';

import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ChevronRight, Sparkles, Filter, Plus } from 'lucide-react';
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
      'Engineered multi-model LLM router with automatic sub-50ms fallback across Workers AI, Groq LPU, and Google Gemini.'
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

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
    if (selectedJob.id === id) {
      setSelectedJob(prev => ({ ...prev, status: newStatus }));
    }
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
          Role matcher and tailored resume builder. Extracts concrete metrics from your production systems (groundedness %, edge latency) to generate interview-winning proof points.
        </p>
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
          <div className="font-serif font-semibold text-sm">Tailored Resume Experience Bullets</div>
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
    </div>
  );
}

