'use client';

import React, { useState } from 'react';
import { DollarSign, FileCheck, CheckCircle2, Clock, Plus, Download, Send } from 'lucide-react';
import type { FreelancerInvoice } from '@combo/shared-types';

const INITIAL_INVOICES: FreelancerInvoice[] = [
  {
    id: 'inv-2026-001',
    client_name: 'Apex Digital Studio',
    project_title: 'Cloudflare Pages & Workers $0 Migration',
    amount_cents: 185000, // $1,850.00
    currency: 'USD',
    status: 'PAID',
    due_date: '2026-11-05',
    created_at: '2026-10-28T10:00:00Z'
  },
  {
    id: 'inv-2026-002',
    client_name: 'Crestline Dental Clinic',
    project_title: 'WhatsApp AI Booking Agent Setup',
    amount_cents: 65000, // $650.00
    currency: 'USD',
    status: 'SENT',
    due_date: '2026-11-15',
    created_at: '2026-11-06T14:00:00Z'
  },
  {
    id: 'inv-2026-003',
    client_name: 'Vanguard Realty Partners',
    project_title: '60 FPS 3D Showroom Configurator',
    amount_cents: 240000, // $2,400.00
    currency: 'USD',
    status: 'SENT',
    due_date: '2026-11-20',
    created_at: '2026-11-07T08:00:00Z'
  }
];

export default function FreelancerOSPage() {
  const [invoices, setInvoices] = useState<FreelancerInvoice[]>(INITIAL_INVOICES);
  const [showModal, setShowModal] = useState(false);
  const [newInv, setNewInv] = useState({ client: '', title: '', amount: '750', due: '2026-11-25' });

  const totalCollected = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.amount_cents / 100, 0);
  const totalOutstanding = invoices.filter(i => i.status === 'SENT').reduce((sum, i) => sum + i.amount_cents / 100, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FreelancerInvoice = {
      id: `inv-${Date.now()}`,
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
          Client proposals, deliverables, invoices, and payment tracking in one micro-SaaS. Designed for developer studios and GenAI consultants closing setup fees before subscriptions.
        </p>
      </div>

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
          <div className="text-xs font-mono text-[#7a8074]">ACTIONS</div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Generate New Invoice</span>
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
                    inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <div className="text-[#4c524a] dark:text-[#b3b8ac] font-medium">{inv.project_title}</div>
                <div className="font-mono text-[11px] text-[#7a8074]">Invoice ID: {inv.id} • Due: {inv.due_date}</div>
              </div>

              <div className="flex items-center space-x-4 sm:self-center">
                <span className="font-serif text-lg font-bold text-[#1c1f1a] dark:text-[#e8eae3]">
                  ${(inv.amount_cents / 100).toLocaleString()}
                </span>
                <button
                  onClick={() => alert(`Simulating PDF download for ${inv.id}`)}
                  className="p-1.5 rounded border border-[#dddccd] dark:border-[#31362d] text-[#7a8074] hover:bg-[#efeee6]"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
