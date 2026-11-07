// Shared TypeScript Contracts for Combo OS

export interface DirectoryTool {
  id: string;
  name: string;
  category: 'Compute' | 'Database' | 'Storage' | 'AI & ML' | 'Auth' | 'Frontend' | 'Observability' | 'Dev Tools' | 'Media';
  url: string;
  description: string;
  free_tier: string;
  commercial_ok: boolean;
  cc_required: boolean;
  featured?: boolean;
  unslop_score?: number; // 1-10 rating for craft & utility
  created_at?: string;
}

export type ApprovalStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export interface GTMTopic {
  id: string;
  title: string;
  source: string;
  score: number; // 0-100 relevance score
  status: 'NEW' | 'DRAFTED' | 'DISMISSED';
  created_at?: string;
}

export interface GTMDraft {
  id: string;
  topic_id: string;
  channel: 'linkedin' | 'x' | 'blog' | 'newsletter';
  content: string;
  citations: string[];
  approval_status: ApprovalStatus;
  approved_by?: string | null;
  approved_at?: string | null;
  rejection_reason?: string | null;
  scheduled_for?: string | null;
  created_at?: string;
}

export interface RAGDocument {
  id: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface RAGEvalBenchmark {
  id: string;
  query: string;
  expected_answer: string;
  is_out_of_domain: boolean;
  last_groundedness_score: number; // 0.0 - 1.0
  last_citation_score: number; // 0.0 - 1.0
  last_refusal_pass: boolean;
  last_latency_ms: number;
  updated_at?: string;
}

export interface RAGQueryResponse {
  answer: string;
  citations: { doc_id: string; title: string; snippet: string }[];
  confidence: number;
  refused: boolean;
  refusal_reason?: string;
  latency_ms: number;
}

export interface GatewayMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GatewayRequest {
  model?: string;
  messages: GatewayMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface GatewayResponse {
  id: string;
  provider: 'cloudflare-workers-ai' | 'groq' | 'gemini';
  model: string;
  content: string;
  prompt_tokens: number;
  completion_tokens: number;
  latency_ms: number;
  status: 'success' | 'fallback_success' | 'error';
}

export interface TelemetryLog {
  id: string;
  provider: string;
  model: string;
  latency_ms: number;
  status: string;
  created_at: string;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance';
  uptime_seconds: number;
  stack: {
    repo: 'GitHub';
    frontend: 'Cloudflare Pages';
    backend: 'Cloudflare Workers';
    database: 'Cloudflare D1';
    storage: 'Cloudflare R2';
    security: 'Cloudflare DNS';
    ai_models: string[];
  };
  metrics: {
    total_tools: number;
    gtm_pending_approvals: number;
    rag_groundedness_pct: number;
    eval_refusal_accuracy_pct: number;
  };
}

// --- Project #3: WhatsApp AI Sales & Support Agent ---
export interface WhatsAppConversation {
  id: string;
  phone_number: string;
  sender_name: string;
  last_message: string;
  status: 'ACTIVE' | 'QUALIFIED' | 'HANDOFF' | 'BOOKED';
  office_hours_only: boolean;
  updated_at: string;
}

export interface WhatsAppLead {
  id: string;
  conversation_id: string;
  name: string;
  phone: string;
  service_requested: string;
  budget: string;
  preferred_time: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED';
  created_at: string;
}

// --- Project #4: 3D Product Configurator / Virtual Showroom ---
export interface ShowroomFinish {
  id: string;
  name: string;
  colorHex: string;
  roughness: number;
  metalness: number;
  priceDelta: number;
}

export interface ShowroomProduct {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  finishes: ShowroomFinish[];
  dimensions: { width: string; height: string; depth: string };
  features: string[];
}

export interface ShowroomEnquiry {
  id: string;
  product_id: string;
  variant_finish: string;
  calculated_price: number;
  customer_name: string;
  customer_email: string;
  notes?: string;
  created_at: string;
}

// --- Project #5: AI Lead Recovery & Outreach Agent ---
export type RecoveryStatus = 'STALE' | 'DRAFTED' | 'APPROVED' | 'SENT' | 'REVIVED';

export interface DeadLead {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  days_inactive: number;
  intent_score: number;
  recovery_status: RecoveryStatus;
  drafted_followup?: string;
  created_at: string;
}

// --- Project #6: JobAutopilot Pro ---
export type ApplicationStatus = 'BOOKMARKED' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export interface JobApplication {
  id: string;
  role_title: string;
  company: string;
  match_score: number;
  status: ApplicationStatus;
  tailored_resume_bullets: string[];
  salary_range: string;
  created_at: string;
}

// --- Project #7: Faceless Shorts / Reels Factory ---
export interface VideoShort {
  id: string;
  topic: string;
  hook: string;
  script_body: string;
  call_to_action: string;
  duration_seconds: number;
  status: 'DRAFT' | 'AUDIO_READY' | 'RENDERED';
  created_at: string;
}

// --- Project #8: AI Meeting-to-CRM Copilot ---
export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  due_date: string;
  completed: boolean;
}

export interface MeetingNote {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  summary: string;
  decisions: string[];
  action_items: ActionItem[];
  crm_synced: boolean;
  created_at: string;
}

// --- Project #9: Freelancer Client OS ---
export interface FreelancerInvoice {
  id: string;
  client_name: string;
  project_title: string;
  amount_cents: number;
  currency: string;
  status: 'DRAFT' | 'SENT' | 'PAID';
  due_date: string;
  created_at: string;
}

// --- Project #10: AI Interview Prep Coach ---
export interface InterviewSession {
  id: string;
  role_target: string;
  question: string;
  user_answer_transcript: string;
  score_communication: number;
  score_technical: number;
  score_star_structure: number;
  specific_feedback: string;
  created_at: string;
}

