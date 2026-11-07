'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, Users, Calendar, ArrowRight, Share2, Sparkles } from 'lucide-react';
import type { MeetingNote } from '@combo/shared-types';

const INITIAL_MEETING: MeetingNote = {
  id: 'meet-1',
  title: 'Signhify Studio Q4 Architecture & Client Onboarding',
  date: '2026-11-06',
  attendees: ['Piyush Raj Singh (Tech Lead)', 'Marcus Vance (Apex Digital)', 'Elena Rostova (Operations)'],
  summary: 'Reviewed migration plan for client apps moving to Cloudflare Pages, Workers, D1, and R2. Eliminated ongoing server and egress fees. Confirmed that every outbound content post must pass human approval.',
  decisions: [
    'Approved migration to Cloudflare D1 (5M reads/day) for client CMS and directory data.',
    'Enforced strict human approval gate on all automated outbound marketing workflows.',
    'Integrated FreeLLMAPI custom router (127.0.0.1:31415) into the multi-model gateway.'
  ],
  action_items: [
    { id: 'act-1', task: 'Deploy static export build to Cloudflare Pages edge', assignee: 'Piyush', due_date: '2026-11-08', completed: true },
    { id: 'act-2', task: 'Audit RAG golden benchmark scores (groundedness > 90%)', assignee: 'Piyush', due_date: '2026-11-08', completed: true },
    { id: 'act-3', task: 'Send staging walkthrough credentials to Marcus', assignee: 'Elena', due_date: '2026-11-09', completed: false }
  ],
  crm_synced: true,
  created_at: '2026-11-06T15:00:00Z'
};

export default function MeetingCRMPage() {
  const [meeting, setMeeting] = useState<MeetingNote>(INITIAL_MEETING);
  const [rawTranscript, setRawTranscript] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawTranscript.trim()) return;

    setIsExtracting(true);
    setTimeout(() => {
      setMeeting({
        id: `meet-${Date.now()}`,
        title: 'Extracted Strategic Briefing',
        date: new Date().toISOString().split('T')[0],
        attendees: ['Founder', 'Client Stakeholder', 'Technical Lead'],
        summary: rawTranscript.slice(0, 220) + '...',
        decisions: [
          'Confirmed $0 infrastructure deployment strategy.',
          'Approved timeline for initial beta release.'
        ],
        action_items: [
          { id: 'act-new-1', task: 'Execute D1 database migrations', assignee: 'Founder', due_date: '2026-11-10', completed: false },
          { id: 'act-new-2', task: 'Review edge latency telemetry logs', assignee: 'Tech Lead', due_date: '2026-11-11', completed: false }
        ],
        crm_synced: false,
        created_at: new Date().toISOString()
      });
      setIsExtracting(false);
      setRawTranscript('');
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #8 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          AI Meeting-to-CRM Copilot
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Turns messy call transcripts and voice notes into structured CRM records. Automatically extracts summaries, binding decisions, and action items with owners and deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Transcript */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Raw Meeting Audio / Notes</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              Structured Extraction
            </span>
          </div>

          <form onSubmit={handleExtract} className="space-y-3">
            <textarea
              rows={8}
              placeholder="Paste raw conversation transcript, audio transcription, or rough meeting bullet points here..."
              value={rawTranscript}
              onChange={e => setRawTranscript(e.target.value)}
              className="w-full p-3 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-sans leading-relaxed"
            />

            <button
              type="submit"
              disabled={isExtracting}
              className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isExtracting ? 'Extracting CRM Actions...' : 'Extract Decisions & Action Items'}
            </button>
          </form>
        </div>

        {/* Right: Structured Extraction Output */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-5">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-3">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1c1f1a] dark:text-[#e8eae3]">{meeting.title}</h2>
              <div className="text-xs font-mono text-[#7a8074]">Date: {meeting.date}</div>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
              {meeting.crm_synced ? '✓ Synced to CRM' : 'Draft Generated'}
            </span>
          </div>

          {/* Attendees */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#7a8074] uppercase">Attendees:</span>
            <div className="flex flex-wrap gap-1.5">
              {meeting.attendees.map((a, i) => (
                <span key={i} className="font-mono text-xs px-2 py-0.5 rounded bg-[#efeee6] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d]">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#7a8074] uppercase">Executive Summary:</span>
            <p className="text-xs font-sans leading-relaxed text-[#4c524a] dark:text-[#b3b8ac] p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d]">
              {meeting.summary}
            </p>
          </div>

          {/* Key Decisions */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#7a8074] uppercase">Binding Decisions:</span>
            <div className="space-y-1.5">
              {meeting.decisions.map((d, i) => (
                <div key={i} className="text-xs font-sans p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#fffef9] dark:bg-[#181b16] flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#7a8074] uppercase">Action Items & Deliverables:</span>
            <div className="space-y-1.5">
              {meeting.action_items.map((act) => (
                <div key={act.id} className="text-xs p-2.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${act.completed ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                    <span className="font-medium text-[#1c1f1a] dark:text-[#e8eae3]">{act.task}</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#7a8074]">
                    Owner: <strong>{act.assignee}</strong> • Due: {act.due_date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

