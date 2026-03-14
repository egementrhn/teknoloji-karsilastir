import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CellValue {
  type: "null" | "integer" | "real" | "text" | "blob";
  value?: string | number;
  base64?: string;
}

type RawRow = CellValue[];

interface HranaResult {
  cols: { name: string; decltype: string | null }[];
  rows: RawRow[];
  affected_row_count: number;
  last_insert_rowid: string | null;
}

interface HranaResponse {
  results: Array<
    | { type: "ok"; response: { type: "execute"; result: HranaResult } }
    | { type: "ok"; response: { type: "close" } }
    | { type: "error"; error: { message: string } }
  >;
}

interface ResultSet {
  cols: { name: string }[];
  rows: unknown[][];
  rows_affected: number;
  last_insert_rowid: string | null;
}

// ─── Config ───────────────────────────────────────────────────────────────────

function getConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;

  if (!url)
    throw new Error("TURSO_DATABASE_URL environment variable is not set");
  if (!token)
    throw new Error("TURSO_AUTH_TOKEN environment variable is not set");

  // libsql:// → https://
  return { baseUrl: url.replace(/^libsql:\/\//, "https://"), token };
}

// ─── Cell decoder ─────────────────────────────────────────────────────────────

function decodeCell(cell: CellValue): string | number | null {
  if (!cell || cell.type === "null") return null;
  if (cell.type === "integer") return Number(cell.value);
  if (cell.type === "real") return cell.value as number;
  if (cell.type === "text") return cell.value as string;
  if (cell.type === "blob") return cell.base64 ?? null;
  return null;
}

// ─── HTTP pipeline ────────────────────────────────────────────────────────────

async function pipeline(
  stmts: { sql: string; args: unknown[] }[],
): Promise<ResultSet[]> {
  const { baseUrl, token } = getConfig();

  const requests = [
    ...stmts.map((stmt) => ({
      type: "execute",
      stmt: {
        sql: stmt.sql,
        args: stmt.args.map((a): CellValue => {
          if (a === null || a === undefined) return { type: "null" };
          if (typeof a === "number")
            return Number.isInteger(a)
              ? { type: "integer", value: String(a) }
              : { type: "real", value: a };
          return { type: "text", value: String(a) };
        }),
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

  // slice(0, stmts.length) drops the trailing "close" response
  return body.results.slice(0, stmts.length).map((r) => {
    if (r.type === "error")
      throw new Error(`Turso query error: ${r.error.message}`);

    const raw = (
      r as { type: "ok"; response: { type: "execute"; result: HranaResult } }
    ).response.result;
    const cols = raw.cols;

    // Drizzle sqlite-proxy expects rows as ordered value arrays, not objects
    const rows: unknown[][] = raw.rows.map((rawRow) =>
      cols.map((_, i) => decodeCell(rawRow[i])),
    );

    return {
      cols,
      rows,
      rows_affected: raw.affected_row_count,
      last_insert_rowid: raw.last_insert_rowid,
    };
  });
}

// ─── Drizzle sqlite-proxy instance ───────────────────────────────────────────

export const db = drizzle(
  async (sql: string, params: unknown[], method: string) => {
    const [result] = await pipeline([{ sql, args: params }]);

    if (method === "run") {
      return { rows: [] };
    }

    if (method === "get") {
      // single row — return flat array
      return { rows: result.rows[0] ?? [] };
    }

    // "all" | "values" — return 2-D array
    return { rows: result.rows };
  },
  { schema },
);
