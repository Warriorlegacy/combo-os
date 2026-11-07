'use client';

import React, { useState } from 'react';
import { MessageSquare, Phone, UserCheck, ShieldAlert, Send, Clock, User, CheckCircle2, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';
import type { WhatsAppConversation, WhatsAppLead } from '@combo/shared-types';

interface FAQEntry {
  service: string;
  price: string;
  turnaround: string;
}

const CLINIC_FAQS: FAQEntry[] = [
  { service: 'General Dental Examination & X-Ray', price: '₹500', turnaround: '30 mins' },
  { service: 'Simple Tooth Extraction', price: '₹800 - ₹1,500', turnaround: '45 mins' },
  { service: 'Root Canal Treatment (Single Sitting)', price: '₹3,500 - ₹5,000', turnaround: '60 mins' },
  { service: 'Zirconia Crown Placement', price: '₹6,000 - ₹10,000', turnaround: '2 appointments' }
];

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'webhook' | 'faqs'>('simulator');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'user', text: 'Hi, what are your clinic timings and tooth extraction price?', time: '14:20' },
    { sender: 'agent', text: 'Hello! Dr. Mehta Dental Clinic is open Monday-Saturday, 9 AM - 8 PM. Simple tooth extractions are ₹800 - ₹1,500. Would you like to schedule an appointment for today or tomorrow?', time: '14:21' }
  ]);
  const [inputText, setInputText] = useState('');
  const [handoffMode, setHandoffMode] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState<string[]>([
    '[GET /webhooks/whatsapp] Hub Challenge Verification 200 OK (mode=subscribe, verify_token=signhify_meta_secret_2026)',
    '[POST /webhooks/whatsapp] Inbound Message wamid.HBgLMTM... received',
    '[IDEMPOTENCY] Message ID wamid.HBgLMTM... recorded (status: PROCESSED)'
  ]);

  const [leads, setLeads] = useState<WhatsAppLead[]>([
    {
      id: 'wa-lead-1',
      conversation_id: 'wa-conv-1',
      name: 'Ananya Sharma',
      phone: '+91 98765 43210',
      service_requested: 'Tooth Extraction & Crown',
      budget: '₹5,000 - ₹10,000',
      preferred_time: 'Tomorrow 4:30 PM',
      status: 'NEW',
      created_at: '2026-11-07T12:00:00Z'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setInputText('');

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      if (lower.includes('human') || lower.includes('doctor') || lower.includes('#agent') || lower.includes('emergency') || lower.includes('pain') || lower.includes('lawyer')) {
        setHandoffMode(true);
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Understood. In accordance with clinic safety policy, this conversation has been flagged for human staff handoff. Dr. Mehta or our patient coordinator will respond immediately.', time: now }
        ]);
        setWebhookLogs(prev => [
          `[HANDOFF TRIGGER] Message flagged for staff escalation: "${userMsg}"`,
          ...prev
        ]);
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('slot')) {
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Great! Please provide your preferred day and time (morning 10am-1pm or evening 4pm-8pm) and patient name to confirm the appointment.', time: now }
        ]);
        setLeads(prev => [
          {
            id: `wa-lead-${Date.now()}`,
            conversation_id: 'wa-conv-new',
            name: 'New WhatsApp Inquirer',
            phone: '+91 98123 45678',
            service_requested: 'General Consultation',
            budget: '₹500 consultation fee',
            preferred_time: 'Slot Pending Confirmation',
            status: 'NEW',
            created_at: new Date().toISOString()
          },
          ...prev
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Thank you for reaching out! You can ask about our service price list, book an appointment, or type "#agent" anytime to speak directly with clinic staff.', time: now }
        ]);
      }
    }, 450);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #3 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          WhatsApp AI Sales & Support Agent
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Dedicated WhatsApp business agent for clinics, dental practices, and local services. Answers FAQs from verified price lists, qualifies budgets and time slots, and enforces human handoffs for clinical questions.
        </p>
      </div>

      {/* Hard Hand-off Guardrail Banner */}
      <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex items-start space-x-3 text-xs text-[#4c524a] dark:text-[#b3b8ac]">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#17603a] dark:text-[#6fce96]" />
        <div>
          <strong className="text-[#1c1f1a] dark:text-[#e8eae3]">Safety & Liability Gate:</strong> The agent is strictly forbidden from diagnosing conditions or providing medical advice. All emergency, surgical, legal, or payment dispute queries immediately trigger staff handoff.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-[#dddccd] dark:border-[#31362d] text-xs font-mono">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`pb-2 transition-colors ${
            activeTab === 'simulator'
              ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
              : 'text-[#7a8074]'
          }`}
        >
          Customer Chat Simulator
        </button>
        <button
          onClick={() => setActiveTab('webhook')}
          className={`pb-2 transition-colors ${
            activeTab === 'webhook'
              ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
              : 'text-[#7a8074]'
          }`}
        >
          Meta Webhook & Idempotency Logs
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`pb-2 transition-colors ${
            activeTab === 'faqs'
              ? 'border-b-2 border-[#17603a] font-bold text-[#17603a] dark:text-[#6fce96]'
              : 'text-[#7a8074]'
          }`}
        >
          Clinic Grounding Knowledge & Pricing
        </button>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: WhatsApp Web Simulator */}
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    WA
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm">Dr. Mehta Clinic Care Agent</div>
                    <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                      {handoffMode ? '● Human Staff Handoff Active' : '● Auto-Responder AI Active'}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                  Meta Webhook 200 OK
                </span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 min-h-[280px] p-4 rounded bg-[#efeee6] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] overflow-y-auto max-h-[360px]">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-xs font-sans leading-relaxed shadow-sm ${
                        m.sender === 'user'
                          ? 'bg-[#17603a] text-white rounded-br-none'
                          : 'bg-[#fffef9] dark:bg-[#181b16] text-[#1c1f1a] dark:text-[#e8eae3] border border-[#dddccd] dark:border-[#31362d] rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] font-mono text-[#7a8074] dark:text-[#828a7d] mt-1 px-1">
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type customer message (e.g., 'Book tomorrow 4pm', or '#agent')..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-[#1c1f1a] dark:text-[#e8eae3] focus:outline-none focus:ring-1 focus:ring-[#17603a]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right: Live Qualified Leads Table */}
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
              <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
                <span className="font-serif font-bold text-base">Qualified WhatsApp Enquiries</span>
                <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">{leads.length} leads logged</span>
              </div>

              <div className="space-y-3">
                {leads.map(lead => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#1c1f1a] dark:text-[#e8eae3]">{lead.name}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                        {lead.status}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#7a8074] dark:text-[#828a7d]">{lead.phone}</div>
                    <div className="text-xs text-[#1c1f1a] dark:text-[#e8eae3]">
                      <strong>Service:</strong> {lead.service_requested} · <strong>Budget:</strong> {lead.budget}
                    </div>
                    <div className="text-[11px] text-[#17603a] dark:text-[#6fce96]">
                      <strong>Preferred Slot:</strong> {lead.preferred_time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="font-bold">Zero-Dollar WhatsApp Setup Economics:</div>
              <p>Meta provides free service conversation tiers for inbound customer chats. Sold as a $350-$750 setup service + $49/mo maintenance package to local clinics and agents.</p>
            </div>
          </div>
        </div>
      ) : activeTab === 'webhook' ? (
        /* Webhook Tester */
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#17603a] dark:text-[#6fce96]" />
              <span className="font-serif font-bold text-base">Meta WhatsApp Cloud API Webhook Telemetry</span>
            </div>
            <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400">Endpoint: /api/whatsapp/webhook</span>
          </div>

          <div className="space-y-2">
            {webhookLogs.map((log, i) => (
              <div key={i} className="p-2.5 rounded bg-[#111410] text-[#6fce96] font-mono text-xs">
                {log}
              </div>
            ))}
          </div>

          <div className="text-xs text-[#7a8074] space-y-1 pt-2 font-mono">
            <div>• Verification Token: <code className="bg-[#efeee6] dark:bg-[#1f231d] px-1 py-0.5 rounded">signhify_meta_secret_2026</code></div>
            <div>• Message Idempotency: Duplicate WhatsApp message IDs rejected with HTTP 200 OK without re-triggering AI logic.</div>
          </div>
        </div>
      ) : (
        /* Clinic FAQs */
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2 font-serif font-bold text-base">
            <span>Verified Clinic Service & Price List</span>
            <span className="font-mono text-xs text-[#7a8074]">{CLINIC_FAQS.length} services</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLINIC_FAQS.map((faq, i) => (
              <div key={i} className="p-4 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] space-y-1 text-xs">
                <div className="font-bold text-sm text-[#1c1f1a] dark:text-[#e8eae3]">{faq.service}</div>
                <div className="font-serif text-base font-bold text-[#17603a] dark:text-[#6fce96]">{faq.price}</div>
                <div className="font-mono text-[#7a8074] text-[11px]">Appointment Duration: {faq.turnaround}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
