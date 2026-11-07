import { seedTools, seedTopics, seedDrafts, seedDocuments, seedEvalBenchmarks } from './seed-data.ts';

export interface D1PreparedStatementLike {
  bind(...params: unknown[]): D1PreparedStatementLike;
  all<T = unknown>(): Promise<{ results: T[] }>;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<{ success: boolean; meta?: unknown }>;
}

export interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
}

// In-Memory SQLite state for local tests and offline dev mode
class InMemoryDatabase implements D1DatabaseLike {
  private tools = [...seedTools];
  private topics = [...seedTopics];
  private drafts = [...seedDrafts];
  private docs = [...seedDocuments];
  private evals = [...seedEvalBenchmarks];
  private logs: Array<{ id: string; provider: string; model: string; latency_ms: number; status: string; created_at: string }> = [];

  prepare(query: string): D1PreparedStatementLike {
    const q = query.trim().toUpperCase();

    const createStatement = (boundParams: unknown[]): D1PreparedStatementLike => {
      return {
        bind: (...moreParams: unknown[]) => createStatement([...boundParams, ...moreParams]),

        all: async <T = unknown>(): Promise<{ results: T[] }> => {
          if (q.includes('FROM DIRECTORY_TOOLS')) {
            let res = [...this.tools];
            if (q.includes('WHERE')) {
              // check params
              for (const p of boundParams) {
                if (typeof p === 'string' && !p.startsWith('%') && p !== 'All') {
                  res = res.filter(t => t.category.toLowerCase() === p.toLowerCase());
                } else if (typeof p === 'string' && p.startsWith('%')) {
                  const term = p.replace(/%/g, '').toLowerCase();
                  res = res.filter(t => t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term));
                }
              }
            }
            if (q.includes('GROUP BY CATEGORY')) {
              const counts: Record<string, number> = {};
              for (const t of this.tools) {
                counts[t.category] = (counts[t.category] || 0) + 1;
              }
              const rows = Object.entries(counts).map(([category, count]) => ({ category, count }));
              return { results: rows as unknown as T[] };
            }
            return { results: res as unknown as T[] };
          }

          if (q.includes('FROM GTM_TOPICS')) {
            return { results: this.topics as unknown as T[] };
          }

          if (q.includes('FROM GTM_DRAFTS')) {
            let res = [...this.drafts];
            if (boundParams[0]) {
              const status = boundParams[0] as string;
              res = res.filter(d => d.approval_status === status);
            }
            return { results: res as unknown as T[] };
          }

          if (q.includes('FROM RAG_DOCUMENTS')) {
            return { results: this.docs as unknown as T[] };
          }

          if (q.includes('FROM RAG_EVAL_BENCHMARKS')) {
            return { results: this.evals as unknown as T[] };
          }

          if (q.includes('FROM GATEWAY_LOGS')) {
            return { results: this.logs.slice(-20) as unknown as T[] };
          }

          return { results: [] };
        },

        first: async <T = unknown>(): Promise<T | null> => {
          if (q.includes('FROM DIRECTORY_TOOLS WHERE ID =')) {
            const id = boundParams[0] as string;
            const found = this.tools.find(t => t.id === id);
            return (found as unknown as T) || null;
          }

          if (q.includes('FROM GTM_DRAFTS WHERE ID =')) {
            const id = boundParams[0] as string;
            const found = this.drafts.find(d => d.id === id);
            return (found as unknown as T) || null;
          }

          if (q.includes('COUNT(*)')) {
            if (q.includes('DIRECTORY_TOOLS')) return { count: this.tools.length } as unknown as T;
            if (q.includes('GTM_DRAFTS WHERE APPROVAL_STATUS = \'UNDER_REVIEW\'')) {
              return { count: this.drafts.filter(d => d.approval_status === 'UNDER_REVIEW').length } as unknown as T;
            }
          }

          return null;
        },

        run: async () => {
          // GTM Draft Update (Approve / Reject)
          if (q.startsWith('UPDATE GTM_DRAFTS SET APPROVAL_STATUS =')) {
            const newStatus = boundParams[0] as string;
            const approvedBy = boundParams[1] as string | null;
            const approvedAt = boundParams[2] as string | null;
            const rejectionReason = boundParams[3] as string | null;
            const id = boundParams[4] as string;

            const draft = this.drafts.find(d => d.id === id);
            if (draft) {
              draft.approval_status = newStatus as any;
              draft.approved_by = approvedBy;
              draft.approved_at = approvedAt;
              draft.rejection_reason = rejectionReason;
              return { success: true };
            }
            return { success: false };
          }

          // GTM Draft Insert
          if (q.startsWith('INSERT INTO GTM_DRAFTS')) {
            this.drafts.push({
              id: boundParams[0] as string,
              topic_id: boundParams[1] as string,
              channel: boundParams[2] as any,
              content: boundParams[3] as string,
              citations: JSON.parse(boundParams[4] as string || '[]'),
              approval_status: boundParams[5] as any || 'DRAFT',
              created_at: new Date().toISOString()
            });
            return { success: true };
          }

          // Gateway Log Insert
          if (q.startsWith('INSERT INTO GATEWAY_LOGS')) {
            this.logs.push({
              id: boundParams[0] as string,
              provider: boundParams[1] as string,
              model: boundParams[2] as string,
              latency_ms: boundParams[3] as number,
              status: boundParams[4] as string,
              created_at: new Date().toISOString()
            });
            return { success: true };
          }

          return { success: true };
        }
      };
    };

    return createStatement([]);
  }
}

let localDbInstance: InMemoryDatabase | null = null;

export function getDatabase(env?: { COMBO_DB?: D1DatabaseLike }): D1DatabaseLike {
  if (env && env.COMBO_DB) {
    return env.COMBO_DB;
  }
  if (!localDbInstance) {
    localDbInstance = new InMemoryDatabase();
  }
  return localDbInstance;
}
