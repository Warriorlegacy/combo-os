'use client';

import React, { useState } from 'react';
import { UserMinus, Send, CheckCircle2, AlertCircle, Sparkles, Clock, RefreshCw } from 'lucide-react';
import type { DeadLead, RecoveryStatus } from '@combo/shared-types';

const INITIAL_DEAD_LEADS: DeadLead[] = [
  {
    id: 'lead-1',
    company_name: 'Apex Digital Studio',
    contact_name: 'Marcus Vance',
    email: 'marcus@apexdigital.io',
    days_inactive: 48,
    intent_score: 84,
    recovery_status: 'DRAFTED',
    drafted_followup: `Hey Marcus,\n\nSaw Apex just expanded its client roster in Q4. When we spoke in September, you mentioned high AWS hosting and API costs eating 18% of margin.\n\nWe just open-sourced our $0 Cloudflare architecture that dropped client infra bills to $0/mo with sub-20ms latency. Thought you might want the benchmark breakdown. Want me to send the 3-minute deck?`,
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
    drafted_followup: `Hi Dr. Lin,\n\nFollowing up on our patient intake automation discussion. Many clinics in your network reported missing 30% of booking inquiries on evenings and weekends.\n\nWe deployed a WhatsApp appointment agent running completely on free-tier infrastructure. Would you be open to seeing a 60-second video demo?`,
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
    drafted_followup: `David, quick note on property tours—interactive 3D showrooms are generating 3x higher inquiries than photo galleries.\n\nHere is a live 60 FPS demo configured for residential floor plans running on Cloudflare Pages. Take a look: https://combo-hub.pages.dev/showroom`,
    created_at: '2026-08-09T09:00:00Z'
  }
];

export default function LeadRecoveryPage() {
  const [leads, setLeads] = useState<DeadLead[]>(INITIAL_DEAD_LEADS);
  const [activeLead, setActiveLead] = useState<DeadLead>(INITIAL_DEAD_LEADS[0]);

  const handleApprove = (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, recovery_status: 'APPROVED' } : l));
    if (activeLead.id === id) {
      setActiveLead(prev => ({ ...prev, recovery_status: 'APPROVED' }));
    }
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
          Revives stalled CRM contacts. Analyzes past conversation history, predicts re-engagement intent, and drafts contextual follow-ups with mandatory human sign-off before delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Stale Leads Pipeline */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Inactive CRM Leads</span>
            <span className="font-mono text-xs text-[#7a8074]">{leads.length} leads</span>
          </div>

          <div className="space-y-3">
            {leads.map(lead => (
              <div
                key={lead.id}
                onClick={() => setActiveLead(lead)}
                className={`p-3 rounded border text-xs cursor-pointer transition-colors ${
                  activeLead.id === lead.id
                    ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22]'
                    : 'border-[#dddccd] dark:border-[#31362d] hover:bg-[#efeee6] dark:hover:bg-[#1f231d]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{lead.contact_name}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    lead.recovery_status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
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
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
              <div>
                <span className="font-serif font-bold text-base">Personalized Outreach Draft</span>
                <div className="text-[11px] font-mono text-[#7a8074]">To: {activeLead.email}</div>
              </div>
              <span className={`font-mono text-xs px-2.5 py-1 rounded font-semibold ${
                activeLead.recovery_status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {activeLead.recovery_status}
              </span>
            </div>

            <div className="p-4 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] font-sans text-xs whitespace-pre-wrap leading-relaxed text-[#1c1f1a] dark:text-[#e8eae3]">
              {activeLead.drafted_followup || 'Generating personalized follow-up based on CRM history...'}
            </div>

            <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              <strong>Human Gate Protection:</strong> Messages are held in queue until manually reviewed. You can edit the text before triggering dispatch.
            </div>
          </div>

          <div className="pt-4 border-t border-[#dddccd] dark:border-[#31362d] flex items-center justify-between">
            <span className="text-xs font-mono text-[#7a8074]">
              CRM Sync: Ready to route via Cloudflare Worker
            </span>
            {activeLead.recovery_status !== 'APPROVED' ? (
              <button
                onClick={() => handleApprove(activeLead.id)}
                className="inline-flex items-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Approve & Dispatch Follow-Up</span>
              </button>
            ) : (
              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                ✓ Approved for Outbound Delivery
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

