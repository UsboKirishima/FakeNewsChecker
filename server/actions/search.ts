import { db } from "@/lib/db"
import type { SearchRecord } from "@/lib/types"

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export async function createSearch(data: {
  url: string
  verdict: string
  confidence: number
  aiComments?: string
  operations?: string
  userId: string
}) {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO Search (id, url, verdict, confidence, aiComments, operations, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(id, data.url, data.verdict, data.confidence, data.aiComments || null, data.operations || null, data.userId);
  return { id, ...data, createdAt: Date.now() };
}

export async function getHistory(userId: string) {
  const stmt = db.prepare("SELECT * FROM Search WHERE userId = ? ORDER BY createdAt DESC");
  const rows = stmt.all(userId) as SearchRecord[];
  return rows;
}

export async function getSearchById(id: string) {
  const stmt = db.prepare("SELECT * FROM Search WHERE id = ?");
  const row = stmt.get(id) as SearchRecord | undefined;
  return row || null;
}
