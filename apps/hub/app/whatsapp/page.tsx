'use client';

import React, { useState } from 'react';
import { MessageSquare, Phone, UserCheck, ShieldAlert, Send, Clock, User, CheckCircle2 } from 'lucide-react';
import type { WhatsAppConversation, WhatsAppLead } from '@combo/shared-types';

export default function WhatsAppPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'user', text: 'Hi, what are your clinic timings and tooth extraction price?', time: '14:20' },
    { sender: 'agent', text: 'Hello! Dr. Mehta Dental Clinic is open Monday-Saturday, 9 AM - 8 PM. Simple tooth extractions are ₹800 - ₹1,500. Would you like to schedule an appointment for today or tomorrow?', time: '14:21' }
  ]);
  const [inputText, setInputText] = useState('');
  const [handoffMode, setHandoffMode] = useState(false);
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
      if (lower.includes('human') || lower.includes('doctor') || lower.includes('#agent')) {
        setHandoffMode(true);
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Understood. I have flagged this chat for human handoff. Dr. Mehta or our lead coordinator will respond shortly.', time: now }
        ]);
      } else if (lower.includes('book') || lower.includes('appointment')) {
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Great! Please provide your full name and preferred slot (morning or evening) to confirm the appointment.', time: now }
        ]);
        setLeads(prev => [
          {
            id: `wa-lead-${Date.now()}`,
            conversation_id: 'wa-conv-new',
            name: 'New WhatsApp Inquirer',
            phone: '+91 98123 45678',
            service_requested: 'General Consultation',
            budget: '₹500 consultation fee',
            preferred_time: 'Pending Slot Confirmation',
            status: 'NEW',
            created_at: new Date().toISOString()
          },
          ...prev
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'agent', text: 'Thank you for reaching out! You can book an appointment, ask about our service price list, or type "#agent" anytime to talk directly to our clinic staff.', time: now }
        ]);
      }
    }, 500);
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
          A dedicated WhatsApp agent for clinics, real estate, and local services. Answers price questions 24/7, qualifies leads, captures bookings, and seamlessly hands off to staff with zero monthly subscription fees.
        </p>
      </div>

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

        {/* Right: Live Qualified Leads Table & Policy Config */}
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
                    <strong>Service:</strong> {lead.service_requested} • <strong>Budget:</strong> {lead.budget}
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
    </div>
  );
}

