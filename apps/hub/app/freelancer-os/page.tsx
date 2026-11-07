'use client';

import React, { useState } from 'react';
import { DollarSign, FileCheck, CheckCircle2, Clock, Plus, Download, Send, Eye, Copy, Check, FileText } from 'lucide-react';
import type { FreelancerInvoice } from '@combo/shared-types';

interface ScopeTemplate {
  id: string;
  title: string;
  deliverables: string[];
  suggestedPrice: number;
}

const SCOPE_TEMPLATES: ScopeTemplate[] = [
  {
    id: 'tpl-audit',
    title: 'Cloudflare $0 Stack & AI Security Audit',
    deliverables: [
      'Evaluation of current cloud egress & API expenditure',
      'Architecture blueprint for Cloudflare Pages, Workers, D1 & R2 migration',
      'Grounded RAG & refusal threshold calibration review',
      'Executive summary deck + recorded walkthrough'
    ],
    suggestedPrice: 450
  },
  {
    id: 'tpl-mvp',
    title: 'Production MVP Build & Deployment',
    deliverables: [
      'Full Next.js 15 + Hono Worker implementation',
      'Cloudflare D1 schema migrations + D1 edge queries',
      'Automated GitHub Actions CI/CD test pipeline (70+ checks)',
      'Custom FreeLLMAPI / Groq / Gemini multi-model fallback gateway'
    ],
    suggestedPrice: 1850
  },
  {
    id: 'tpl-retainer',
    title: 'Monthly Systems & Edge Maintenance Retainer',
    deliverables: [
      'Zero-downtime schema evolution & database backups',
      'Continuous golden benchmark eval tracking (>90% groundedness)',
      'Prompt optimization & token budget guardrails',
      'Priority 4-hour SLA incident response'
    ],
    suggestedPrice: 750
  }
];

const INITIAL_INVOICES: FreelancerInvoice[] = [
  {
    id: 'inv-2026-001',
    client_name: 'Apex Digital Studio',
    project_title: 'Cloudflare Pages & Workers $0 Migration',
    amount_cents: 185000,
    currency: 'USD',
    status: 'PAID',
    due_date: '2026-11-05',
    created_at: '2026-10-28T10:00:00Z'
  },
  {
    id: 'inv-2026-002',
    client_name: 'Crestline Dental Clinic',
    project_title: 'WhatsApp AI Booking Agent Setup',
    amount_cents: 65000,
    currency: 'USD',
    status: 'SENT',
    due_date: '2026-11-15',
    created_at: '2026-11-06T14:00:00Z'
  },
  {
    id: 'inv-2026-003',
    client_name: 'Vanguard Realty Partners',
    project_title: '60 FPS 3D Showroom Configurator',
    amount_cents: 240000,
    currency: 'USD',
    status: 'SENT',
    due_date: '2026-11-20',
    created_at: '2026-11-07T08:00:00Z'
  }
];

export default function FreelancerOSPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'proposals'>('invoices');
  const [invoices, setInvoices] = useState<FreelancerInvoice[]>(INITIAL_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<FreelancerInvoice | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newInv, setNewInv] = useState({ client: '', title: '', amount: '750', due: '2026-11-25' });
  const [copiedLink, setCopiedLink] = useState(false);

  const totalCollected = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.amount_cents / 100, 0);
  const totalOutstanding = invoices.filter(i => i.status === 'SENT').reduce((sum, i) => sum + i.amount_cents / 100, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FreelancerInvoice = {
      id: `inv-${Date.now().toString().slice(-6)}`,
      client_name: newInv.client,
      project_title: newInv.title,
      amount_cents: Number(newInv.amount) * 100,
      currency: 'USD',
      status: 'SENT',
      due_date: newInv.due,
      created_at: new Date().toISOString()
    };
    setInvoices([created, ...invoices]);
    setShowModal(false);
  };

  const copyPortalLink = (invId: string) => {
    const link = `https://combo-hub.pages.dev/client-portal/${invId}`;
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #9 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          Freelancer Client OS
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Proposals, milestone invoices, payment tracking, and client portal for studio engineering engagements. Close fixed-price setup fees before monthly retainers.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-[#dddccd] dark:border-[#31362d] text-xs font-mono">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-2 transition-colors ${
            activeTab === 'invoices'
              ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
              : 'text-[#7a8074]'
          }`}
        >
          Invoices & Receivables ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`pb-2 transition-colors ${
            activeTab === 'proposals'
              ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
              : 'text-[#7a8074]'
          }`}
        >
          Scope Templates & Proposals ({SCOPE_TEMPLATES.length})
        </button>
      </div>

      {activeTab === 'invoices' ? (
        <>
          {/* Cash Flow Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
              <div className="text-xs font-mono text-[#7a8074]">COLLECTED REVENUE</div>
              <div className="mt-1 font-serif text-2xl font-bold text-[#17603a] dark:text-[#6fce96]">
                ${totalCollected.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Paid via Stripe / UPI</div>
            </div>

            <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
              <div className="text-xs font-mono text-[#7a8074]">PENDING INVOICES</div>
              <div className="mt-1 font-serif text-2xl font-bold text-amber-700 dark:text-amber-400">
                ${totalOutstanding.toLocaleString()}
              </div>
              <div className="text-xs text-[#7a8074] mt-0.5">2 client invoices sent</div>
            </div>

            <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between">
              <div className="text-xs font-mono text-[#7a8074]">QUICK ACTIONS</div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Generate Client Invoice</span>
              </button>
            </div>
          </div>

          {/* Invoices List */}
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2 font-serif font-bold text-base">
              <span>Client Contracts & Invoices</span>
              <span className="font-mono text-xs text-[#7a8074]">{invoices.length} total</span>
            </div>

            <div className="space-y-3">
              {invoices.map(inv => (
                <div
                  key={inv.id}
                  className="p-4 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#1c1f1a] dark:text-[#e8eae3]">{inv.client_name}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                        inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="text-[#4c524a] dark:text-[#b3b8ac] font-medium">{inv.project_title}</div>
                    <div className="font-mono text-[11px] text-[#7a8074]">
                      Invoice ID: {inv.id} · Due: {inv.due_date} · Terms: Net-15
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:self-center">
                    <span className="font-serif text-lg font-bold text-[#1c1f1a] dark:text-[#e8eae3]">
                      ${(inv.amount_cents / 100).toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded border border-[#dddccd] dark:border-[#31362d] text-[#7a8074] hover:bg-[#efeee6] dark:hover:bg-[#181b16]"
                      title="View Printable Invoice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyPortalLink(inv.id)}
                      className="p-1.5 rounded border border-[#dddccd] dark:border-[#31362d] text-[#7a8074] hover:bg-[#efeee6] dark:hover:bg-[#181b16]"
                      title="Copy Client Portal Link"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Proposals View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCOPE_TEMPLATES.map(tpl => (
            <div key={tpl.id} className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="font-mono text-[10px] text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider font-bold">
                  Fixed Scope Package
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1c1f1a] dark:text-[#e8eae3]">
                  {tpl.title}
                </h3>
                <div className="font-serif text-2xl font-bold text-[#17603a] dark:text-[#6fce96]">
                  ${tpl.suggestedPrice.toLocaleString()}
                </div>
                <ul className="space-y-2 pt-2 border-t border-[#dddccd] dark:border-[#31362d] text-xs text-[#4c524a] dark:text-[#b3b8ac]">
                  {tpl.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setNewInv({
                    client: 'New Client Partner',
                    title: tpl.title,
                    amount: tpl.suggestedPrice.toString(),
                    due: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
                  });
                  setShowModal(true);
                }}
                className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Create Invoice From Scope
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Detail / Printable Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] rounded-lg max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-start border-b border-[#dddccd] dark:border-[#31362d] pb-3">
              <div>
                <div className="font-serif font-bold text-xl">Signhify Studio</div>
                <div className="text-xs font-mono text-[#7a8074]">INVOICE #{selectedInvoice.id}</div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-[#7a8074] hover:text-[#1c1f1a] text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#4c524a] dark:text-[#b3b8ac]">
                <div>
                  <span className="font-mono text-[#7a8074] block">BILLED TO:</span>
                  <strong>{selectedInvoice.client_name}</strong>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[#7a8074] block">DUE DATE:</span>
                  <strong>{selectedInvoice.due_date}</strong>
                </div>
              </div>

              <div className="p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] space-y-2 border border-[#dddccd] dark:border-[#31362d]">
                <div className="flex justify-between font-mono text-[10px] text-[#7a8074] uppercase">
                  <span>Deliverable Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span>{selectedInvoice.project_title}</span>
                  <span>${(selectedInvoice.amount_cents / 100).toLocaleString()}.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                <span className="font-bold text-sm">Total Due</span>
                <span className="font-serif text-xl font-bold text-[#17603a] dark:text-[#6fce96]">
                  ${(selectedInvoice.amount_cents / 100).toLocaleString()}.00
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#7a8074] space-y-1 pt-2">
                <div>Payment Methods: Stripe Card / UPI ID: signhify@upi / Wire</div>
                <div>Status: <strong className="text-emerald-700 dark:text-emerald-400">{selectedInvoice.status}</strong></div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={async () => {
                  const workerBase = process.env.NEXT_PUBLIC_API_URL || 'https://combo-worker-api.rajpiyush092.workers.dev';
                  try {
                    await fetch(`${workerBase}/api/freelancer/invoices/${selectedInvoice.id}/send`, { method: 'POST' });
                  } catch (e) {}
                  navigator.clipboard.writeText(`https://combo-hub.pages.dev/freelancer-os?inv=${selectedInvoice.id}`);
                  alert(`Invoice link generated & copied to clipboard:\nhttps://combo-hub.pages.dev/freelancer-os?inv=${selectedInvoice.id}`);
                }}
                className="px-3 py-1.5 rounded border border-[#dddccd] dark:border-[#31362d] text-[#1c1f1a] dark:text-[#e8eae3] font-semibold text-xs flex items-center space-x-1 hover:bg-[#efeee6] dark:hover:bg-[#1f231d]"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                <span>Send to Client</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-semibold text-xs flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Generate Client Invoice</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Digital"
                  value={newInv.client}
                  onChange={e => setNewInv({ ...newInv, client: e.target.value })}
                  className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Project Deliverable</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3D WebGL Configurator Setup"
                  value={newInv.title}
                  onChange={e => setNewInv({ ...newInv, title: e.target.value })}
                  className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#7a8074] uppercase mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  required
                  value={newInv.amount}
                  onChange={e => setNewInv({ ...newInv, amount: e.target.value })}
                  className="w-full p-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded border border-[#dddccd] text-[#7a8074]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-semibold"
                >
                  Create & Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
