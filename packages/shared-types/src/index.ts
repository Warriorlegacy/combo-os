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
