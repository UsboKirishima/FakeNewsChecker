import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";
import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters";

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

function rowToUser(row: Record<string, unknown>): AdapterUser {
  return {
    id: row.id as string,
    name: (row.name as string) || null,
    email: row.email as string,
    emailVerified: row.emailVerified ? new Date(row.emailVerified as number) : null,
    image: (row.image as string) || null,
  };
}

export const adapter: Adapter = {
  async createUser(user: Omit<AdapterUser, "id">) {
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO User (id, name, email, emailVerified, image, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, user.name || null, user.email, user.emailVerified?.getTime() || null, user.image || null, Date.now(), Date.now());
    return { id, name: user.name || null, email: user.email, emailVerified: user.emailVerified, image: user.image || null };
  },

  async getUser(id) {
    const stmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const row = stmt.get(id) as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async getUserByEmail(email) {
    const stmt = db.prepare("SELECT * FROM User WHERE email = ?");
    const row = stmt.get(email) as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async getUserByAccount(account: { provider: string; providerAccountId: string }) {
    const stmt = db.prepare("SELECT * FROM Account WHERE provider = ? AND providerAccountId = ?");
    const acct = stmt.get(account.provider, account.providerAccountId) as Record<string, unknown> | undefined;
    if (!acct) return null;
    const userStmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const row = userStmt.get(acct.userId as string) as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async linkAccount(account: AdapterAccount) {
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id, account.userId, account.type, account.provider, account.providerAccountId,
      account.refresh_token || null, account.access_token || null, account.expires_at || null, account.token_type || null,
      account.scope || null, account.id_token || null, account.session_state || null
    );
    return { ...account, id };
  },

  async createSession(session: { sessionToken: string; userId: string; expires: Date }) {
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO Session (id, sessionToken, userId, expires)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, session.sessionToken, session.userId, session.expires.getTime());
    return { ...session, id } as AdapterSession;
  },

  async getSessionAndUser(sessionToken) {
    const stmt = db.prepare("SELECT * FROM Session WHERE sessionToken = ?");
    const sessionRow = stmt.get(sessionToken) as Record<string, unknown> | undefined;
    if (!sessionRow) return null;
    const userStmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const userRow = userStmt.get(sessionRow.userId as string) as Record<string, unknown> | undefined;
    if (!userRow) return null;
    return {
      session: { id: sessionRow.id as string, sessionToken: sessionRow.sessionToken as string, userId: sessionRow.userId as string, expires: new Date(sessionRow.expires as number) },
      user: rowToUser(userRow),
    };
  },

  async updateSession(session) {
    const stmt = db.prepare("UPDATE Session SET expires = ? WHERE sessionToken = ?");
    stmt.run(session.expires!.getTime(), session.sessionToken);
    return session as AdapterSession;
  },

  async deleteSession(sessionToken) {
    const stmt = db.prepare("DELETE FROM Session WHERE sessionToken = ?");
    stmt.run(sessionToken);
  },

  async createVerificationToken(token) {
    const stmt = db.prepare(`
      INSERT INTO VerificationToken (identifier, token, expires)
      VALUES (?, ?, ?)
    `);
    stmt.run(token.identifier, token.token, token.expires.getTime());
    return token;
  },

  async useVerificationToken(params: { identifier: string; token: string }) {
    const stmt = db.prepare("DELETE FROM VerificationToken WHERE identifier = ? AND token = ?");
    const result = stmt.run(params.identifier, params.token);
    return result.changes > 0 ? { identifier: params.identifier, token: params.token, expires: new Date() } : null;
  },

  async unlinkAccount(params: { provider: string; providerAccountId: string }) {
    const stmt = db.prepare("DELETE FROM Account WHERE provider = ? AND providerAccountId = ?");
    stmt.run(params.provider, params.providerAccountId);
  },

  async deleteUser(userId) {
    const stmt = db.prepare("DELETE FROM User WHERE id = ?");
    stmt.run(userId);
  },

  async updateUser(user) {
    const stmt = db.prepare(`
      UPDATE User SET name = ?, email = ?, emailVerified = ?, image = ?, updatedAt = ?
      WHERE id = ?
    `);
    stmt.run(user.name || null, user.email || null, user.emailVerified?.getTime() || null, user.image || null, Date.now(), user.id);
    return user as AdapterUser;
  },
};

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
