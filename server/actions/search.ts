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
  await db.execute({
    sql: "INSERT INTO Search (id, url, verdict, confidence, aiComments, operations, userId) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [id, data.url, data.verdict, data.confidence, data.aiComments || null, data.operations || null, data.userId],
  });
  return { id, ...data, createdAt: Date.now() };
}

export async function getHistory(userId: string) {
  const result = await db.execute({
    sql: "SELECT * FROM Search WHERE userId = ? ORDER BY createdAt DESC",
    args: [userId],
  });
  return result.rows as unknown as SearchRecord[];
}

export async function getSearchById(id: string) {
  const result = await db.execute({ sql: "SELECT * FROM Search WHERE id = ?", args: [id] });
  return (result.rows[0] as unknown as SearchRecord | undefined) || null;
}