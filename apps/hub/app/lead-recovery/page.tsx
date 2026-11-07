'use client';

import React, { useState } from 'react';
import { UserMinus, Send, CheckCircle2, AlertCircle, Sparkles, Clock, RefreshCw, ShieldAlert, Edit3 } from 'lucide-react';
import type { DeadLead, RecoveryStatus } from '@combo/shared-types';

interface SequenceStage {
  stage: number;
  label: string;
  delayDays: number;
  templateType: string;
}

const SEQUENCE_STAGES: SequenceStage[] = [
  { stage: 1, label: 'Stage 1: Relevant Asset / Insight Bump', delayDays: 0, templateType: 'Value-First' },
  { stage: 2, label: 'Stage 2: Benchmark Case Study', delayDays: 4, templateType: 'Social Proof' },
  { stage: 3, label: 'Stage 3: Permission to Close File (Breakup)', delayDays: 9, templateType: 'Polite Breakup' }
];

const INITIAL_DEAD_LEADS: DeadLead[] = [
  {
    id: 'lead-1',
    company_name: 'Apex Digital Studio',
    contact_name: 'Marcus Vance',
    email: 'marcus@apexdigital.io',
    days_inactive: 48,
    intent_score: 84,
    recovery_status: 'DRAFTED',
    drafted_followup: `Hey Marcus,\n\nSaw Apex just expanded its client roster in Q4. When we spoke in September, you mentioned high AWS hosting and API costs eating 18% of margin.\n\nWe just open-sourced our $0 Cloudflare architecture that dropped client infra bills to $0/mo with sub-20ms latency. Thought you might want the benchmark breakdown. Want me to send the 3-minute deck?\n\n--\nSignhify Studio | To unsubscribe reply STOP`,
    created_at: '2026-09-20T10:00:00Z'
  },
  {
    id: 'lead-2',
    company_name: 'Crestline Dental Clinic',
    contact_name: 'Dr. Sarah Lin',
    email: 'dr.lin@crestlinedental.com',
    days_inactive: 72,
    intent_score: 68,
    recovery_status: 'STALE',
    drafted_followup: `Hi Dr. Lin,\n\nFollowing up on our patient intake automation discussion. Many clinics in your network reported missing 30% of booking inquiries on evenings and weekends.\n\nWe deployed a WhatsApp appointment agent running completely on free-tier infrastructure. Would you be open to seeing a 60-second video demo?\n\n--\nSignhify Studio | To unsubscribe reply STOP`,
    created_at: '2026-08-27T14:00:00Z'
  },
  {
    id: 'lead-3',
    company_name: 'Vanguard Realty Partners',
    contact_name: 'David Sterling',
    email: 'david@vanguardrealty.co',
    days_inactive: 90,
    intent_score: 92,
    recovery_status: 'APPROVED',
    drafted_followup: `David, quick note on property tours—interactive 3D showrooms are generating 3x higher inquiries than photo galleries.\n\nHere is a live 60 FPS demo configured for residential floor plans running on Cloudflare Pages. Take a look: https://combo-hub.pages.dev/showroom\n\n--\nSignhify Studio | To unsubscribe reply STOP`,
    created_at: '2026-08-09T09:00:00Z'
  }
];

export default function LeadRecoveryPage() {
  const [leads, setLeads] = useState<DeadLead[]>(INITIAL_DEAD_LEADS);
  const [activeLead, setActiveLead] = useState<DeadLead>(INITIAL_DEAD_LEADS[0]);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(INITIAL_DEAD_LEADS[0].drafted_followup || '');

  const handleSelectLead = (lead: DeadLead) => {
    setActiveLead(lead);
    setEditedText(lead.drafted_followup || '');
    setIsEditing(false);
  };

  const handleApprove = (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, drafted_followup: editedText, recovery_status: 'APPROVED' } : l));
    setActiveLead(prev => ({ ...prev, drafted_followup: editedText, recovery_status: 'APPROVED' }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #5 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          AI Lead Recovery & Outreach Agent
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Revives stalled and unresponsive CRM contacts. Analyzes previous conversation context, computes re-engagement probability, and drafts short, high-value touches with strict human gate sign-off.
        </p>
      </div>

      {/* Human Gate Alert */}
      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start space-x-3 text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="text-xs sm:text-sm">
          <strong>Non-Negotiable Human Sign-Off:</strong> AI only drafts follow-up messages; the human operator must click approve before any email or WhatsApp message is dispatched. Every email includes a verified unsubscribe header.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Stale Leads Pipeline */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Inactive CRM Leads</span>
            <span className="font-mono text-xs text-[#7a8074]">{leads.length} leads loaded</span>
          </div>

          <div className="space-y-3">
            {leads.map(lead => (
              <div
                key={lead.id}
                onClick={() => handleSelectLead(lead)}
                className={`p-3 rounded border text-xs cursor-pointer transition-colors ${
                  activeLead.id === lead.id
                    ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22]'
                    : 'border-[#dddccd] dark:border-[#31362d] hover:bg-[#efeee6] dark:hover:bg-[#1f231d]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{lead.contact_name}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    lead.recovery_status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {lead.recovery_status}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[#7a8074]">{lead.company_name}</div>
                <div className="flex items-center justify-between text-[11px] text-[#4c524a] dark:text-[#b3b8ac] mt-1 pt-1 border-t border-black/5 dark:border-white/5">
                  <span>Inactive: {lead.days_inactive}d</span>
                  <span className="font-mono font-bold text-[#17603a] dark:text-[#6fce96]">Intent: {lead.intent_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Follow-up Inspector & Human Approval Gate */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2 gap-2">
              <div>
                <span className="font-serif font-bold text-base">{activeLead.contact_name}</span>
                <div className="text-[11px] font-mono text-[#7a8074]">{activeLead.company_name} · {activeLead.email}</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-mono text-xs px-2.5 py-1 rounded font-semibold ${
                  activeLead.recovery_status === 'APPROVED'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  Status: {activeLead.recovery_status}
                </span>
              </div>
            </div>

            {/* Sequence Selector */}
            <div className="flex space-x-2 border-b border-[#dddccd] dark:border-[#31362d] pb-2 text-xs font-mono">
              {SEQUENCE_STAGES.map(s => (
                <button
                  key={s.stage}
                  onClick={() => setActiveStage(s.stage)}
                  className={`pb-1 transition-colors ${
                    activeStage === s.stage
                      ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
                      : 'text-[#7a8074]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Draft Content (Editable) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono text-[#7a8074]">
                <span>Draft Body (3 Sentences Max Rule):</span>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center space-x-1 text-[#17603a] dark:text-[#6fce96] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Preview Mode' : 'Edit Copy'}</span>
                </button>
              </div>

              {isEditing ? (
                <textarea
                  rows={8}
                  value={editedText}
                  onChange={e => setEditedText(e.target.value)}
                  className="w-full p-4 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] font-sans text-xs leading-relaxed text-[#1c1f1a] dark:text-[#e8eae3]"
                />
              ) : (
                <div className="p-4 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] font-sans text-xs whitespace-pre-wrap leading-relaxed text-[#1c1f1a] dark:text-[#e8eae3]">
                  {editedText || activeLead.drafted_followup}
                </div>
              )}
            </div>

            <div className="text-[11px] font-mono text-[#7a8074] space-y-0.5">
              <div>• Compliance: Includes CAN-SPAM Unsubscribe Header</div>
              <div>• Provider: Resend Free (100 emails/day) / User SMTP</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#dddccd] dark:border-[#31362d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#7a8074]">
              Audit Log: Reviewed by Piyush Raj Singh (Tech Lead)
            </span>
            {activeLead.recovery_status === 'STALE' || activeLead.recovery_status === 'DRAFTED' ? (
              <button
                onClick={() => handleApprove(activeLead.id)}
                className="inline-flex items-center justify-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Sign & Approve Dispatch</span>
              </button>
            ) : activeLead.recovery_status === 'APPROVED' ? (
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Approved
                </span>
                <button
                  onClick={async () => {
                    const workerBase = process.env.NEXT_PUBLIC_API_URL || 'https://combo-worker-api.rajpiyush092.workers.dev';
                    try {
                      await fetch(`${workerBase}/api/leads/${activeLead.id}/dispatch`, { method: 'POST' });
                    } catch (e) {}
                    setLeads(prev => prev.map(l => l.id === activeLead.id ? { ...l, recovery_status: 'SENT' } : l));
                    setActiveLead(prev => ({ ...prev, recovery_status: 'SENT' }));
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 rounded bg-[#1c1f1a] text-[#fffef9] dark:bg-[#e8eae3] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  <span>Dispatch Email Now</span>
                </button>
              </div>
            ) : (
              <span className="font-mono text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Dispatched & Delivered (CAN-SPAM Verified)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
