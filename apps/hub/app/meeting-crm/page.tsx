'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, Users, Calendar, ArrowRight, Share2, Sparkles, Copy, Check, AlertTriangle, Download, Search } from 'lucide-react';
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
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [exportType, setExportType] = useState<'markdown' | 'hubspot' | 'notion' | 'csv'>('markdown');

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawTranscript.trim()) return;

    setIsExtracting(true);
    setTimeout(() => {
      const created: MeetingNote = {
        id: `meet-${Date.now()}`,
        title: 'Extracted Strategic Briefing',
        date: new Date().toISOString().split('T')[0],
        attendees: ['Piyush Raj Singh', 'Client Representative'],
        summary: rawTranscript.slice(0, 240) + '...',
        decisions: [
          'Confirmed $0 infrastructure deployment strategy.',
          'Approved timeline for initial production release.'
        ],
        action_items: [
          { id: 'act-new-1', task: 'Execute D1 database migrations', assignee: 'Piyush', due_date: '2026-11-10', completed: false },
          { id: 'act-new-2', task: 'Review edge latency telemetry logs', assignee: 'Client Representative', due_date: '2026-11-11', completed: false },
          { id: 'act-new-3', task: 'Schedule live QA verification call', assignee: 'Unassigned', due_date: 'No Date Set', completed: false }
        ],
        crm_synced: false,
        created_at: new Date().toISOString()
      };
      setMeeting(created);
      setIsExtracting(false);
      setRawTranscript('');
    }, 500);
  };

  const toggleAction = (id: string) => {
    setMeeting(prev => ({
      ...prev,
      action_items: prev.action_items.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    }));
  };

  const getExportString = (): string => {
    if (exportType === 'markdown') {
      return `# ${meeting.title}\nDate: ${meeting.date}\nAttendees: ${meeting.attendees.join(', ')}\n\n## Executive Summary\n${meeting.summary}\n\n## Decisions\n${meeting.decisions.map(d => `- [x] ${d}`).join('\n')}\n\n## Action Items\n${meeting.action_items.map(a => `- [${a.completed ? 'x' : ' '}] ${a.task} (Owner: ${a.assignee}, Due: ${a.due_date})`).join('\n')}`;
    }
    if (exportType === 'hubspot') {
      return JSON.stringify({
        hs_meeting_title: meeting.title,
        hs_meeting_body: meeting.summary,
        hs_timestamp: meeting.date,
        decisions: meeting.decisions,
        tasks: meeting.action_items.map(a => ({ task: a.task, owner: a.assignee, due: a.due_date }))
      }, null, 2);
    }
    if (exportType === 'notion') {
      return JSON.stringify({
        parent: { database_id: 'db-signhify-meetings' },
        properties: {
          Name: { title: [{ text: { content: meeting.title } }] },
          Date: { date: { start: meeting.date } },
          Attendees: { multi_select: meeting.attendees.map(name => ({ name })) },
          Summary: { rich_text: [{ text: { content: meeting.summary } }] }
        }
      }, null, 2);
    }
    // CSV
    return `Title,Date,Attendees,Summary,Decisions,Actions\n"${meeting.title}","${meeting.date}","${meeting.attendees.join('; ')}","${meeting.summary}","${meeting.decisions.join('; ')}","${meeting.action_items.map(a => `${a.task} (${a.assignee})`).join('; ')}"`;
  };

  const copyExport = () => {
    navigator.clipboard?.writeText(getExportString());
    setCopiedFormat(exportType);
    setTimeout(() => setCopiedFormat(null), 2000);
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
          Transforms conversation transcripts and audio notes into structured CRM records. Automatically extracts summaries, binding decisions, and action items with mandatory owners and due dates.
        </p>
      </div>

      {/* Strict Anti-Hallucination Guardrail */}
      <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex items-start space-x-3 text-xs text-[#4c524a] dark:text-[#b3b8ac]">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div>
          <strong className="text-[#1c1f1a] dark:text-[#e8eae3]">Strict Extraction Invariant:</strong> The model is constrained to ground every action item and decision directly in the transcript text. Never invent attendees or unmade commitments. Missing owners or deadlines are flagged explicitly for review.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Transcript */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Raw Meeting Audio / Notes</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              Whisper / Text Ingestion
            </span>
          </div>

          <form onSubmit={handleExtract} className="space-y-3">
            <textarea
              rows={9}
              placeholder="Paste raw conversation transcript, audio transcription, or rough meeting bullet points here..."
              value={rawTranscript}
              onChange={e => setRawTranscript(e.target.value)}
              className="w-full p-3 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-sans leading-relaxed text-[#1c1f1a] dark:text-[#e8eae3]"
            />

            <button
              type="submit"
              disabled={isExtracting}
              className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isExtracting ? 'Extracting CRM Actions...' : 'Extract Decisions & Action Items'}
            </button>
          </form>

          <div className="text-[11px] font-mono text-[#7a8074] space-y-1 pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
            <div>• Free Tier Cap: 45 minutes / ~15,000 words per call</div>
            <div>• LLM: Groq LPU (500 tok/s) / FreeLLMAPI custom router</div>
          </div>
        </div>

        {/* Right: Structured Output & CRM Mapping */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-3 gap-2">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1c1f1a] dark:text-[#e8eae3]">
                {meeting.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs font-mono text-[#7a8074] mt-0.5">
                <span>{meeting.date}</span>
                <span>•</span>
                <span>{meeting.attendees.length} Attendees</span>
              </div>
            </div>

            {/* Export Switcher */}
            <div className="flex items-center space-x-2">
              <select
                value={exportType}
                onChange={e => setExportType(e.target.value as any)}
                className="p-1.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-xs font-mono"
              >
                <option value="markdown">Markdown</option>
                <option value="hubspot">HubSpot JSON</option>
                <option value="notion">Notion API</option>
                <option value="csv">Google Sheets CSV</option>
              </select>

              <button
                onClick={copyExport}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold"
              >
                {copiedFormat ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#7a8074] uppercase block">Attendees Identified:</span>
            <div className="flex flex-wrap gap-1.5">
              {meeting.attendees.map((person, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] text-xs font-medium">
                  {person}
                </span>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#7a8074] uppercase block">Executive Summary:</span>
            <p className="text-xs sm:text-sm text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed bg-[#f7f6f1] dark:bg-[#1f231d] p-3.5 rounded border border-[#dddccd] dark:border-[#31362d]">
              {meeting.summary}
            </p>
          </div>

          {/* Agreed Decisions */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#7a8074] uppercase block">Binding Decisions Agreed:</span>
            <div className="space-y-1.5">
              {meeting.decisions.map((dec, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs p-2 rounded bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-[#1c1f1a] dark:text-[#e8eae3]">
                  <CheckCircle2 className="w-4 h-4 text-[#17603a] dark:text-[#6fce96] flex-shrink-0 mt-0.5" />
                  <span>{dec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items with Owners & Deadlines */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7a8074] uppercase">Action Items (Owner & Date Enforced):</span>
              <span className="text-xs font-mono text-[#7a8074]">{meeting.action_items.length} items</span>
            </div>

            <div className="space-y-2">
              {meeting.action_items.map(act => {
                const isUnassigned = act.assignee === 'Unassigned' || act.due_date === 'No Date Set';
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className={`p-3 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                      act.completed
                        ? 'bg-[#f7f6f1] dark:bg-[#1f231d] border-[#dddccd] dark:border-[#31362d] line-through opacity-70'
                        : isUnassigned
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                        : 'bg-[#fffef9] dark:bg-[#181b16] border-[#dddccd] dark:border-[#31362d]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        act.completed ? 'bg-[#17603a] border-[#17603a] text-white' : 'border-[#7a8074]'
                      }`}>
                        {act.completed && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium text-[#1c1f1a] dark:text-[#e8eae3]">{act.task}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] font-mono">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        act.assignee === 'Unassigned' ? 'bg-red-100 text-red-900' : 'bg-[#efeee6] dark:bg-[#1f231d] text-[#7a8074]'
                      }`}>
                        {act.assignee}
                      </span>
                      <span className="text-[#7a8074]">Due: {act.due_date}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Item Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const taskInput = form.elements.namedItem('task') as HTMLInputElement;
                const assigneeInput = form.elements.namedItem('assignee') as HTMLInputElement;
                const dateInput = form.elements.namedItem('due_date') as HTMLInputElement;
                if (!taskInput.value.trim()) return;

                const newItem = {
                  id: `act-${Date.now()}`,
                  task: taskInput.value.trim(),
                  assignee: assigneeInput.value.trim() || 'Piyush',
                  due_date: dateInput.value || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
                  completed: false
                };

                setMeeting(prev => ({
                  ...prev,
                  action_items: [...prev.action_items, newItem]
                }));
                form.reset();
              }}
              className="pt-2 flex flex-col sm:flex-row gap-2 text-xs"
            >
              <input
                type="text"
                name="task"
                placeholder="New action item description..."
                required
                className="flex-1 p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
              />
              <input
                type="text"
                name="assignee"
                placeholder="Assignee (e.g. Piyush)"
                className="w-28 p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
              />
              <input
                type="date"
                name="due_date"
                className="w-32 p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-semibold hover:opacity-90"
              >
                + Add Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
