'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingDown, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Server, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function PricingPage() {
  // Calculator state
  const [teamSeats, setTeamSeats] = useState<number>(3);
  const [monthlyApiRequests, setMonthlyApiRequests] = useState<number>(60000);
  const [monthlyLlmCalls, setMonthlyLlmCalls] = useState<number>(5000);
  const [databaseRows, setDatabaseRows] = useState<number>(50000);

  // Quote generator state
  const [clientName, setClientName] = useState<string>('Acme Corp');
  const [selectedTier, setSelectedTier] = useState<string>('Single Flagship Turnkey ($1,250)');
  const [selectedFlagship, setSelectedFlagship] = useState<string>('WhatsApp AI Sales & Support Agent');
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  // Cost calculation
  const calculations = useMemo(() => {
    // Traditional Costs
    const vercelTeamCost = teamSeats * 20; // $20/seat/mo
    const supabaseProCost = 25; // $25 base
    const openAiCost = Math.round((monthlyLlmCalls * 0.008) * 100) / 100; // ~$0.008 avg cost
    const awsEgressCost = Math.round((monthlyApiRequests / 20000) * 1.5);
    
    const traditionalMonthly = vercelTeamCost + supabaseProCost + openAiCost + awsEgressCost;
    const traditionalAnnual = traditionalMonthly * 12;

    // Combo OS Costs (within free tier quotas)
    const comboMonthly = 0;
    const comboAnnual = 0;

    const netMonthlySavings = traditionalMonthly - comboMonthly;
    const netAnnualSavings = traditionalAnnual - comboAnnual;

    return {
      traditionalMonthly,
      traditionalAnnual,
      comboMonthly,
      comboAnnual,
      netMonthlySavings,
      netAnnualSavings,
      vercelTeamCost,
      supabaseProCost,
      openAiCost,
      awsEgressCost
    };
  }, [teamSeats, monthlyApiRequests, monthlyLlmCalls, databaseRows]);

  const generateSOWText = () => {
    return `STATEMENT OF WORK (SOW) & SERVICE AGREEMENT
-----------------------------------------------------------------
Client: ${clientName}
Prepared By: Piyush Raj Singh — Signhify Studio
Architecture: Combo OS Zero-Capital Production Infrastructure ($0 Perpetual Hosting)
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

1. ENGAGEMENT SCOPE
- Package: ${selectedTier}
- Target Flagship System: ${selectedFlagship}
- Deliverables:
  * Full deployment to client-owned Cloudflare production account (Pages + Workers + D1)
  * Multi-provider FreeLLMAPI router integration with automated zero-cost failover
  * Custom domain configuration with automated SSL and edge caching
  * Human-in-the-loop review guardrails & strict evaluation suite (98%+ groundedness)
  * Handover documentation, architecture diagram, and operational runbook

2. INFRASTRUCTURE & CLOUD BILL GUARANTEE
- Hosting Cost: $0.00 / month (Unlimited edge bandwidth on Cloudflare Pages)
- Database Cost: $0.00 / month (5,000,000 free reads/day on Cloudflare D1)
- Compute Cost: $0.00 / month (100,000 requests/day on Cloudflare Workers)
- Estimated Annual Cloud Bill Savings: $${calculations.netAnnualSavings.toLocaleString()} / year

3. COMMERCIAL TERMS
- Turnkey Setup Fee: Payable 50% on project kickoff, 50% upon verified production sign-off.
- Delivery SLA: 7 to 10 business days from credential provision.
- Optional Monthly Care Plan: $149/month (prompt drift monitoring, model updates, 99.9% uptime SLA).

Approved for Signhify Studio: Piyush Raj Singh, Founder
Accepted for Client (${clientName}): ____________________ Date: ____________`;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateSOWText());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Signhify Studio</span>
          <span>•</span>
          <span>Commercial Rate Card & Economics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#1c1f1a] dark:text-[#e8eae3]">
          Zero-Cloud-Bill ROI & Transparent Pricing.
        </h1>
        <p className="text-[#4c524a] dark:text-[#b3b8ac] text-base sm:text-lg max-w-3xl leading-relaxed">
          Why pay $500+/month in recurring Vercel, Supabase, and OpenAI bills? We build enterprise-grade software deployed directly to your own Cloudflare account for a <strong>perpetual $0 monthly infrastructure cost</strong>.
        </p>
      </section>

      {/* Interactive Cloud Savings Calculator */}
      <section className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-4 gap-2">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-[#17603a] dark:text-[#6fce96]" />
            <h2 className="font-serif text-xl font-semibold">Interactive Cloud Bill Savings Calculator</h2>
          </div>
          <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d]">
            Real-time multi-tenant simulation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#4c524a] dark:text-[#b3b8ac]">TEAM SEATS (DEVELOPER & OPERATOR)</span>
                <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{teamSeats} seats</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={20} 
                value={teamSeats}
                onChange={(e) => setTeamSeats(Number(e.target.value))}
                className="w-full accent-[#17603a] dark:accent-[#6fce96] cursor-pointer"
              />
              <div className="text-[11px] text-[#7a8074] dark:text-[#828a7d]">
                Legacy charges ~$20/seat on Vercel Pro. Combo OS has unlimited team collaborator access.
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#4c524a] dark:text-[#b3b8ac]">MONTHLY API CALLS / BACKEND HITS</span>
                <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{monthlyApiRequests.toLocaleString()} / mo</span>
              </div>
              <input 
                type="range" 
                min={10000} 
                max={3000000} 
                step={10000}
                value={monthlyApiRequests}
                onChange={(e) => setMonthlyApiRequests(Number(e.target.value))}
                className="w-full accent-[#17603a] dark:accent-[#6fce96] cursor-pointer"
              />
              <div className="text-[11px] text-[#7a8074] dark:text-[#828a7d]">
                Cloudflare Workers provides 100,000 free executions every single day (3,000,000/month).
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#4c524a] dark:text-[#b3b8ac]">AI LLM INFERENCES / COMPLETIONS</span>
                <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{monthlyLlmCalls.toLocaleString()} calls / mo</span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={100000} 
                step={1000}
                value={monthlyLlmCalls}
                onChange={(e) => setMonthlyLlmCalls(Number(e.target.value))}
                className="w-full accent-[#17603a] dark:accent-[#6fce96] cursor-pointer"
              />
              <div className="text-[11px] text-[#7a8074] dark:text-[#828a7d]">
                FreeLLMAPI & Groq/Gemini free tiers provide multi-model zero-cost inference with automated failover.
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#4c524a] dark:text-[#b3b8ac]">RELATIONAL DATABASE RECORDS</span>
                <span className="font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{databaseRows.toLocaleString()} rows</span>
              </div>
              <input 
                type="range" 
                min={5000} 
                max={500000} 
                step={5000}
                value={databaseRows}
                onChange={(e) => setDatabaseRows(Number(e.target.value))}
                className="w-full accent-[#17603a] dark:accent-[#6fce96] cursor-pointer"
              />
              <div className="text-[11px] text-[#7a8074] dark:text-[#828a7d]">
                Cloudflare D1 includes 5,000,000 reads/day and 5 GB storage with zero maintenance sleep pauses.
              </div>
            </div>
          </div>

          {/* Results Comparison Card */}
          <div className="p-6 rounded-lg bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-6">
            <div>
              <div className="font-mono text-xs uppercase text-[#7a8074] dark:text-[#828a7d] tracking-wider mb-2">
                Comparative Cost Matrix
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#dddccd] dark:border-[#31362d] text-sm">
                  <span className="text-[#4c524a] dark:text-[#b3b8ac]">Traditional Stack (Vercel + Supabase + OpenAI):</span>
                  <span className="font-mono font-semibold text-rose-700 dark:text-rose-400">
                    ${Math.round(calculations.traditionalMonthly)} / mo
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#dddccd] dark:border-[#31362d] text-sm">
                  <span className="text-[#4c524a] dark:text-[#b3b8ac]">Combo OS Zero-Capital Stack:</span>
                  <span className="font-mono font-bold text-[#17603a] dark:text-[#6fce96]">
                    $0.00 / mo
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-[#7a8074] dark:text-[#828a7d] font-mono uppercase">Net Client Savings</div>
                  <div className="text-3xl font-serif font-bold text-[#17603a] dark:text-[#6fce96] mt-0.5">
                    ${Math.round(calculations.netAnnualSavings).toLocaleString()}
                    <span className="text-sm font-sans font-normal text-[#4c524a] dark:text-[#b3b8ac]"> / year saved</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] text-xs space-y-1.5">
              <div className="font-semibold text-[#1c1f1a] dark:text-[#e8eae3] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#17603a] dark:text-[#6fce96]" />
                <span>Zero Subscription Lock-in Guarantee</span>
              </div>
              <p className="text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                You own 100% of the code, GitHub repository, and Cloudflare account. We deploy the systems directly to your credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signhify Studio Setup Rate Card */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-3">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Signhify Studio Setup Rate Card</h2>
            <p className="text-xs text-[#7a8074] dark:text-[#828a7d] mt-0.5">
              Cash before subscriptions. Done-for-you production deployment with verified SLAs.
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#e3efe4] dark:bg-[#1d2f22] text-[#17603a] dark:text-[#6fce96] font-semibold">
            Fixed Deliverables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d] uppercase tracking-wider">
                Tier 1: Single Flagship
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#1c1f1a] dark:text-[#e8eae3]">$1,250</div>
                <div className="text-xs text-[#7a8074] dark:text-[#828a7d] mt-1">One-time fixed setup fee</div>
              </div>
              <p className="text-xs text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                Full production deployment of any 1 flagship project (e.g. WhatsApp AI Agent, GTM Autopilot, or 3D Showroom).
              </p>
              <ul className="space-y-2 text-xs text-[#4c524a] dark:text-[#b3b8ac] pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Custom branded domain + SSL</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Cloudflare Pages + Workers + D1 setup</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Multi-model router with zero API bills</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>7-day delivery SLA</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedTier('Single Flagship Turnkey ($1,250)');
                document.getElementById('sow-generator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 px-3 text-xs font-mono font-semibold text-center rounded border border-[#17603a] text-[#17603a] dark:text-[#6fce96] dark:border-[#6fce96] hover:bg-[#17603a] hover:text-white dark:hover:bg-[#6fce96] dark:hover:text-[#111410] transition-colors"
            >
              Select Tier 1
            </button>
          </div>

          {/* Tier 2 */}
          <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border-2 border-[#17603a] dark:border-[#6fce96] flex flex-col justify-between space-y-6 relative shadow-sm">
            <div className="absolute -top-3 right-4 bg-[#17603a] dark:bg-[#6fce96] text-white dark:text-[#111410] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider font-semibold">
                Tier 2: Dual Flagship Suite
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#1c1f1a] dark:text-[#e8eae3]">$2,800</div>
                <div className="text-xs text-[#7a8074] dark:text-[#828a7d] mt-1">One-time fixed setup fee</div>
              </div>
              <p className="text-xs text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                Two integrated engines sharing a unified database (e.g. Lead Recovery + Meeting CRM, or GTM + Support RAG).
              </p>
              <ul className="space-y-2 text-xs text-[#4c524a] dark:text-[#b3b8ac] pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Everything in Tier 1</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Shared Cloudflare D1 unified schema</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Automated daily Cron Trigger execution</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>30 days free hypercare support</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedTier('Dual Flagship Suite ($2,800)');
                document.getElementById('sow-generator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 px-3 text-xs font-mono font-semibold text-center rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] hover:opacity-90 transition-opacity"
            >
              Select Tier 2
            </button>
          </div>

          {/* Tier 3 */}
          <div className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d] uppercase tracking-wider">
                Monthly Care Plan
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#1c1f1a] dark:text-[#e8eae3]">$149 <span className="text-sm font-sans font-normal text-[#7a8074]">/ mo</span></div>
                <div className="text-xs text-[#7a8074] dark:text-[#828a7d] mt-1">Optional continuous assurance</div>
              </div>
              <p className="text-xs text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                Ongoing peace of mind for agencies and founders who want zero downtime and proactive maintenance.
              </p>
              <ul className="space-y-2 text-xs text-[#4c524a] dark:text-[#b3b8ac] pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Prompt drift & hallucination monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>Monthly model upgrades & router tuning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>D1 database snapshots & recovery audits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17603a] dark:text-[#6fce96] flex-shrink-0" />
                  <span>24-hour priority email response</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedTier('Monthly Care Plan ($149/mo)');
                document.getElementById('sow-generator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 px-3 text-xs font-mono font-semibold text-center rounded border border-[#dddccd] dark:border-[#31362d] text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#efeee6] dark:hover:bg-[#1f231d] transition-colors"
            >
              Select Care Plan
            </button>
          </div>
        </div>
      </section>

      {/* SOW & Proposal Generator */}
      <section id="sow-generator" className="p-6 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-4 gap-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#17603a] dark:text-[#6fce96]" />
            <h2 className="font-serif text-xl font-semibold">Instant Client SOW & Statement of Work Generator</h2>
          </div>
          <button
            onClick={handleCopyQuote}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#17603a] dark:bg-[#6fce96] text-white dark:text-[#111410] text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
          >
            {copiedQuote ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedQuote ? 'Copied SOW to Clipboard' : 'Copy Formatted SOW'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#7a8074] dark:text-[#828a7d] mb-1 uppercase">
              Client Business Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-transparent text-sm text-[#1c1f1a] dark:text-[#e8eae3]"
              placeholder="e.g. Acme Marketing Studio"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#7a8074] dark:text-[#828a7d] mb-1 uppercase">
              Setup Package
            </label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-transparent text-sm text-[#1c1f1a] dark:text-[#e8eae3]"
            >
              <option value="Single Flagship Turnkey ($1,250)">Single Flagship Turnkey ($1,250)</option>
              <option value="Dual Flagship Suite ($2,800)">Dual Flagship Suite ($2,800)</option>
              <option value="Enterprise Sovereign Setup ($4,500)">Enterprise Sovereign Setup ($4,500)</option>
              <option value="Monthly Care Plan ($149/mo)">Monthly Care Plan ($149/mo)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#7a8074] dark:text-[#828a7d] mb-1 uppercase">
              Target Flagship System
            </label>
            <select
              value={selectedFlagship}
              onChange={(e) => setSelectedFlagship(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#dddccd] dark:border-[#31362d] bg-transparent text-sm text-[#1c1f1a] dark:text-[#e8eae3]"
            >
              <option value="WhatsApp AI Sales & Support Agent">3. WhatsApp AI Sales Agent</option>
              <option value="Signhify GTM Autopilot OS">1. Signhify GTM Autopilot OS</option>
              <option value="RAG Support Copilot + Eval Dashboard">2. RAG Support Copilot + Eval</option>
              <option value="3D Product Configurator / Virtual Showroom">4. 3D WebGL Showroom</option>
              <option value="AI Lead Recovery & Outreach Agent">5. AI Lead Recovery Agent</option>
              <option value="JobAutopilot Pro">6. JobAutopilot Pro</option>
              <option value="Faceless Shorts / Reels Factory">7. Faceless Shorts Factory</option>
              <option value="AI Meeting-to-CRM Copilot">8. Meeting-to-CRM Copilot</option>
              <option value="Freelancer Client OS">9. Freelancer Client OS</option>
              <option value="AI Interview Prep Coach (PWA)">10. AI Interview Coach PWA</option>
            </select>
          </div>
        </div>

        {/* Live Formatted SOW Preview */}
        <div className="p-4 rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#111410] font-mono text-xs text-[#333a30] dark:text-[#a0a89a] whitespace-pre-wrap overflow-x-auto leading-relaxed">
          {generateSOWText()}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="p-8 rounded-lg bg-[#17603a] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold">Ready to eliminate your cloud infrastructure bill?</h3>
          <p className="text-emerald-100 text-sm max-w-xl">
            Book a 20-minute technical architecture review. We audit your existing AWS/Vercel spend and outline your turnkey zero-cost Cloudflare migration roadmap.
          </p>
        </div>
        <a
          href="mailto:Rajpiyush092@gmail.com?subject=Turnkey%20Zero-Cloud-Bill%20Deployment%20Inquiry"
          className="px-6 py-3 rounded bg-white text-[#17603a] font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-colors whitespace-nowrap shadow-sm"
        >
          Book Migration Audit
        </a>
      </section>
    </div>
  );
}

