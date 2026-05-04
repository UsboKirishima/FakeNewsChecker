import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";
import type { Adapter } from "next-auth/adapters";

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const adapter: Adapter = {
  async createUser(user) {
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO User (id, name, email, emailVerified, image, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, user.name || null, user.email, user.emailVerified?.getTime() || null, user.image || null, Date.now(), Date.now());
    return { id, name: user.name || null, email: user.email, emailVerified: user.emailVerified, image: user.image || null, createdAt: new Date(), updatedAt: new Date() } as any;
  },

  async getUser(id) {
    const stmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const row = stmt.get(id) as any;
    if (!row) return null;
    return { ...row, emailVerified: row.emailVerified ? new Date(row.emailVerified) : null };
  },

  async getUserByEmail(email) {
    const stmt = db.prepare("SELECT * FROM User WHERE email = ?");
    const row = stmt.get(email) as any;
    if (!row) return null;
    return { ...row, emailVerified: row.emailVerified ? new Date(row.emailVerified) : null };
  },

  async getUserByProviderAccountId(provider: string, providerAccountId: string) {
    const stmt = db.prepare("SELECT * FROM Account WHERE provider = ? AND providerAccountId = ?");
    const account = stmt.get(provider, providerAccountId) as any;
    if (!account) return null;
    const userStmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const row = userStmt.get(account.userId) as any;
    if (!row) return null;
    return { ...row, emailVerified: row.emailVerified ? new Date(row.emailVerified) : null };
  },

  async linkAccount(account) {
    const id = generateId();
    const stmt = db.prepare(`
      INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id, account.userId, account.type, account.provider, account.providerAccountId,
      account.refresh_token || null, account.access_token || null, account.expires_at || null, account.token_type || null,
      account.scope || null, account.id_token || null, account.session_state || null
    );
    return account as any;
  },

  async createSession(session) {
    const stmt = db.prepare(`
      INSERT INTO Session (id, sessionToken, userId, expires)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(session.id, session.sessionToken, session.userId, session.expires.getTime());
    return session as any;
  },

  async getSessionAndUser(sessionToken) {
    const stmt = db.prepare("SELECT * FROM Session WHERE sessionToken = ?");
    const sessionRow = stmt.get(sessionToken) as any;
    if (!sessionRow) return null;
    const userStmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const userRow = userStmt.get(sessionRow.userId) as any;
    if (!userRow) return null;
    return {
      session: { ...sessionRow, expires: new Date(sessionRow.expires) },
      user: { ...userRow, emailVerified: userRow.emailVerified ? new Date(userRow.emailVerified) : null },
    };
  },

  async updateSession(session) {
    const stmt = db.prepare("UPDATE Session SET expires = ? WHERE sessionToken = ?");
    stmt.run(session.expires!.getTime(), session.sessionToken);
    return session as any;
  },

  async deleteSession(sessionToken) {
    const stmt = db.prepare("DELETE FROM Session WHERE sessionToken = ?");
    stmt.run(sessionToken);
    return null;
  },

  async createVerificationToken(token) {
    const stmt = db.prepare(`
      INSERT INTO VerificationToken (identifier, token, expires)
      VALUES (?, ?, ?)
    `);
    stmt.run(token.identifier, token.token, token.expires.getTime());
    return token as any;
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
    return user as any;
  },
};

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
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