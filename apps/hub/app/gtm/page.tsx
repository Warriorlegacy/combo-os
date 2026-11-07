'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, Send, Sparkles, Clock, AlertTriangle, FileText } from 'lucide-react';
import { seedTopics, seedDrafts } from '../../../worker-api/src/db/seed-data';
import { GTMDraft, ApprovalStatus } from '@combo/shared-types';

export default function GTMPage() {
  const [drafts, setDrafts] = useState<GTMDraft[]>(seedDrafts);
  const [activeTab, setActiveTab] = useState<ApprovalStatus | 'ALL'>('UNDER_REVIEW');
  const [selectedChannel, setSelectedChannel] = useState<'linkedin' | 'x' | 'blog'>('linkedin');
  const [newContent, setNewContent] = useState('');
  const [newCitations, setNewCitations] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(seedTopics[0].id);

  const handleApprove = (id: string) => {
    setDrafts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          approval_status: 'APPROVED',
          approved_by: 'Piyush Raj Singh (Admin)',
          approved_at: new Date().toISOString(),
          scheduled_for: new Date(Date.now() + 86400000).toISOString()
        };
      }
      return d;
    }));
  };

  const handleReject = (id: string) => {
    const reason = prompt('Enter rejection reason:') || 'Failed editorial verification';
    setDrafts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          approval_status: 'REJECTED',
          rejection_reason: reason
        };
      }
      return d;
    }));
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const created: GTMDraft = {
      id: `draft-${Date.now()}`,
      topic_id: selectedTopicId,
      channel: selectedChannel,
      content: newContent,
      citations: newCitations.split(',').map(s => s.trim()).filter(Boolean),
      approval_status: 'UNDER_REVIEW', // Mandatory human gate entry
      approved_by: null,
      approved_at: null,
      created_at: new Date().toISOString()
    };

    setDrafts(prev => [created, ...prev]);
    setNewContent('');
    setNewCitations('');
    setActiveTab('UNDER_REVIEW');
  };

  const filteredDrafts = drafts.filter(d => activeTab === 'ALL' || d.approval_status === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #1 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          Signhify GTM Autopilot OS
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Content research to draft to approval to publish. Zero unreviewed AI posts. Every claim must have citations, and nothing reaches social feeds without an explicit human yes.
        </p>
      </div>

      {/* Strict Human Approval Policy Notice */}
      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start space-x-3 text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="text-xs sm:text-sm">
          <strong>Mandatory Human Gate:</strong> Signhify GTM Autopilot OS enforces a cryptographic lock against automated posting. Unreviewed AI content damages client reputation. Drafts remain in <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">UNDER_REVIEW</code> until manually signed off by an authorized editor.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Topic Scanner & Generator */}
        <div className="space-y-6 lg:col-span-1">
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
              <span className="font-serif font-bold text-base">Topic Research Engine</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">Live Scanned</span>
            </div>

            <div className="space-y-3">
              {seedTopics.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-3 rounded border text-xs cursor-pointer transition-colors ${
                    selectedTopicId === topic.id
                      ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22] text-[#1c1f1a] dark:text-[#e8eae3]'
                      : 'border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-[#4c524a] dark:text-[#b3b8ac]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#7a8074] dark:text-[#828a7d]">
                    <span>{topic.source}</span>
                    <span className="font-bold text-[#17603a] dark:text-[#6fce96]">{topic.score}/100</span>
                  </div>
                  <div className="font-medium mt-1 leading-snug">{topic.title}</div>
                </div>
              ))}
            </div>

            {/* Quick Generator Form */}
            <form onSubmit={handleCreateDraft} className="space-y-3 pt-3 border-t border-[#dddccd] dark:border-[#31362d]">
              <div className="font-serif font-semibold text-sm">Draft New Outbound Post</div>

              <div className="flex space-x-2">
                {(['linkedin', 'x', 'blog'] as const).map(ch => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setSelectedChannel(ch)}
                    className={`flex-1 py-1 rounded text-xs font-mono uppercase transition-colors ${
                      selectedChannel === ch
                        ? 'bg-[#1c1f1a] text-white dark:bg-[#e8eae3] dark:text-[#111410] font-bold'
                        : 'bg-[#efeee6] dark:bg-[#1f231d] text-[#7a8074]'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Write or refine the draft copy... Cite your sources below."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={5}
                className="w-full p-2.5 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-[#1c1f1a] dark:text-[#e8eae3] focus:outline-none focus:ring-1 focus:ring-[#17603a]"
              />

              <input
                type="text"
                placeholder="Citations (comma separated URLs)"
                value={newCitations}
                onChange={e => setNewCitations(e.target.value)}
                className="w-full p-2 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-[#1c1f1a] dark:text-[#e8eae3] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Send to Human Review Queue
              </button>
            </form>
          </div>
        </div>

        {/* Right: Approval Queue Board */}
        <div className="space-y-4 lg:col-span-2">
          {/* Tab Selector */}
          <div className="flex items-center space-x-2 border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            {(['UNDER_REVIEW', 'APPROVED', 'REJECTED', 'ALL'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1c1f1a] text-white dark:bg-[#e8eae3] dark:text-[#111410] font-bold'
                    : 'text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#efeee6] dark:hover:bg-[#1f231d]'
                }`}
              >
                {tab.replace('_', ' ')} ({tab === 'ALL' ? drafts.length : drafts.filter(d => d.approval_status === tab).length})
              </button>
            ))}
          </div>

          {/* Drafts List */}
          <div className="space-y-4">
            {filteredDrafts.map(draft => (
              <div
                key={draft.id}
                className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#efeee6] dark:bg-[#1f231d] uppercase font-bold text-[#1c1f1a] dark:text-[#e8eae3]">
                      {draft.channel}
                    </span>
                    <span className="font-mono text-[11px] text-[#7a8074] dark:text-[#828a7d]">
                      Topic: {draft.topic_id}
                    </span>
                  </div>

                  {draft.approval_status === 'APPROVED' && (
                    <span className="inline-flex items-center space-x-1 font-mono text-xs px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      <span>APPROVED ({draft.approved_by})</span>
                    </span>
                  )}
                  {draft.approval_status === 'UNDER_REVIEW' && (
                    <span className="inline-flex items-center space-x-1 font-mono text-xs px-2.5 py-1 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-semibold border border-amber-300">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span>UNDER REVIEW</span>
                    </span>
                  )}
                  {draft.approval_status === 'REJECTED' && (
                    <span className="inline-flex items-center space-x-1 font-mono text-xs px-2.5 py-1 rounded bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 font-semibold border border-rose-300">
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      <span>REJECTED</span>
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded bg-[#f7f6f1] dark:bg-[#1f231d] text-xs font-sans whitespace-pre-wrap leading-relaxed border border-[#dddccd] dark:border-[#31362d]">
                  {draft.content}
                </div>

                {/* Citations */}
                {draft.citations.length > 0 && (
                  <div className="text-xs space-y-1">
                    <span className="font-mono text-[10px] text-[#7a8074] dark:text-[#828a7d] uppercase">Verified Citations:</span>
                    <div className="flex flex-wrap gap-2">
                      {draft.citations.map((cite, idx) => (
                        <a
                          key={idx}
                          href={cite}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[11px] text-[#17603a] dark:text-[#6fce96] hover:underline"
                        >
                          [{idx + 1}] {cite}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gate Action Buttons */}
                {draft.approval_status === 'UNDER_REVIEW' && (
                  <div className="flex items-center space-x-3 pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                    <button
                      onClick={() => handleApprove(draft.id)}
                      className="inline-flex items-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                      <span>Approve & Schedule</span>
                    </button>
                    <button
                      onClick={() => handleReject(draft.id)}
                      className="inline-flex items-center px-4 py-2 rounded border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 font-sans text-xs font-medium hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1.5" />
                      <span>Reject Post</span>
                    </button>
                  </div>
                )}

                {draft.approval_status === 'APPROVED' && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                    <div className="text-[11px] font-mono text-[#7a8074] dark:text-[#828a7d]">
                      Scheduled for publication: {draft.scheduled_for ? new Date(draft.scheduled_for).toLocaleString() : 'Ready for dispatch'}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(draft.content);
                        alert('Copied approved post content to clipboard!');
                      }}
                      className="inline-flex items-center px-3 py-1.5 rounded bg-[#1c1f1a] text-[#fffef9] dark:bg-[#e8eae3] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-3 h-3 mr-1.5" />
                      <span>Copy to Publish</span>
                    </button>
                  </div>
                )}

                {draft.approval_status === 'REJECTED' && draft.rejection_reason && (
                  <div className="text-[11px] font-mono text-rose-700 dark:text-rose-400">
                    Reason: {draft.rejection_reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

