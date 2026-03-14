/**
 * Minimal Turso HTTP client using the Hrana-over-HTTP protocol.
 * Works in every environment (Node.js, Cloudflare Workers, Edge) — no native
 * dependencies, no WebSockets required.
 */

export interface Value {
  type: "null" | "integer" | "real" | "text" | "blob";
  value?: string | number;
}

export interface Stmt {
  sql: string;
  args?: (string | number | null | Value)[];
}

export interface ResultSet {
  cols: { name: string }[];
  rows: Record<string, string | number | null>[];
  rows_affected: number;
  last_insert_rowid: string | null;
}

type RawRow = (string | number | null)[];

interface HranaResponse {
  results: Array<
    | {
        type: "ok";
        response: {
          type: "execute";
          result: {
            cols: { name: string; decltype: string | null }[];
            rows: RawRow[];
            affected_row_count: number;
            last_insert_rowid: string | null;
          };
        };
      }
    | { type: "error"; error: { message: string } }
  >;
}

function getConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  if (!url)
    throw new Error("TURSO_DATABASE_URL environment variable is not set");
  if (!token)
    throw new Error("TURSO_AUTH_TOKEN environment variable is not set");

  // Convert libsql:// → https://
  const baseUrl = url.replace(/^libsql:\/\//, "https://");
  return { baseUrl, token };
}

async function pipeline(stmts: Stmt[]): Promise<ResultSet[]> {
  const { baseUrl, token } = getConfig();

  const requests = [
    ...stmts.map((stmt) => ({
      type: "execute",
      stmt: {
        sql: stmt.sql,
        args: stmt.args
          ? stmt.args.map((a): Value => {
              if (a === null) return { type: "null" };
              if (typeof a === "number")
                return Number.isInteger(a)
                  ? { type: "integer", value: String(a) }
                  : { type: "real", value: a };
              return { type: "text", value: String(a) };
            })
          : [],
        named_args: [],
        want_rows: true,
      },
    })),
    { type: "close" },
  ];

  const res = await fetch(`${baseUrl}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso HTTP error ${res.status}: ${text}`);
  }

  const body = (await res.json()) as HranaResponse;

  // Slice to stmts.length to drop the trailing "close" response
  return body.results.slice(0, stmts.length).map((r) => {
    if (r.type === "error")
      throw new Error(`Turso query error: ${r.error.message}`);

    const raw = r.response.result;
    const cols = raw.cols;

    const rows: Record<string, string | number | null>[] = raw.rows.map(
      (rawRow) => {
        const obj: Record<string, string | number | null> = {};
        cols.forEach((col, i) => {
          const cell = rawRow[i];
          obj[col.name] = cell === undefined ? null : cell;
        });
        return obj;
      },
    );

    return {
      cols,
      rows,
      rows_affected: raw.affected_row_count,
      last_insert_rowid: raw.last_insert_rowid,
    };
  });
}

// ─── Public API (mirrors @libsql/client surface used in phones.ts) ────────────

export const db = {
  /** Run a single SQL statement. */
  async execute(stmt: string | Stmt): Promise<ResultSet> {
    const s: Stmt = typeof stmt === "string" ? { sql: stmt } : stmt;
    const [result] = await pipeline([s]);
    return result;
  },

  /** Run multiple SQL statements in one round-trip. */
  async batch(stmts: (string | Stmt)[]): Promise<ResultSet[]> {
    return pipeline(stmts.map((s) => (typeof s === "string" ? { sql: s } : s)));
  },
};
