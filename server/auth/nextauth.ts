import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";
import type { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";

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
    await db.execute({
      sql: "INSERT INTO User (id, name, email, emailVerified, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [id, user.name || null, user.email, user.emailVerified?.getTime() || null, user.image || null, Date.now(), Date.now()],
    });
    return { id, name: user.name || null, email: user.email, emailVerified: user.emailVerified, image: user.image || null };
  },

  async getUser(id) {
    const result = await db.execute({ sql: "SELECT * FROM User WHERE id = ?", args: [id] });
    const row = result.rows[0] as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async getUserByEmail(email) {
    const result = await db.execute({ sql: "SELECT * FROM User WHERE email = ?", args: [email] });
    const row = result.rows[0] as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async getUserByAccount(account: { provider: string; providerAccountId: string }) {
    const acctResult = await db.execute({
      sql: "SELECT * FROM Account WHERE provider = ? AND providerAccountId = ?",
      args: [account.provider, account.providerAccountId],
    });
    const acct = acctResult.rows[0] as Record<string, unknown> | undefined;
    if (!acct) return null;
    const userResult = await db.execute({ sql: "SELECT * FROM User WHERE id = ?", args: [acct.userId as string] });
    const row = userResult.rows[0] as Record<string, unknown> | undefined;
    if (!row) return null;
    return rowToUser(row);
  },

  async linkAccount(account: AdapterAccount) {
    const id = generateId();
    await db.execute({
      sql: "INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        id, account.userId, account.type, account.provider, account.providerAccountId,
        account.refresh_token || null, account.access_token || null, account.expires_at || null, account.token_type || null,
        account.scope || null, account.id_token || null, account.session_state || null,
      ],
    });
    return { ...account, id };
  },

  async createSession(session: { sessionToken: string; userId: string; expires: Date }) {
    const id = generateId();
    await db.execute({
      sql: "INSERT INTO Session (id, sessionToken, userId, expires) VALUES (?, ?, ?, ?)",
      args: [id, session.sessionToken, session.userId, session.expires.getTime()],
    });
    return { ...session, id } as any;
  },

  async getSessionAndUser(sessionToken) {
    const sessionResult = await db.execute({ sql: "SELECT * FROM Session WHERE sessionToken = ?", args: [sessionToken] });
    const sessionRow = sessionResult.rows[0] as Record<string, unknown> | undefined;
    if (!sessionRow) return null;
    const userResult = await db.execute({ sql: "SELECT * FROM User WHERE id = ?", args: [sessionRow.userId as string] });
    const userRow = userResult.rows[0] as Record<string, unknown> | undefined;
    if (!userRow) return null;
    return {
      session: { id: sessionRow.id as string, sessionToken: sessionRow.sessionToken as string, userId: sessionRow.userId as string, expires: new Date(sessionRow.expires as number) },
      user: rowToUser(userRow),
    };
  },

  async updateSession(session) {
    await db.execute({ sql: "UPDATE Session SET expires = ? WHERE sessionToken = ?", args: [session.expires!.getTime(), session.sessionToken] });
    return session as any;
  },

  async deleteSession(sessionToken) {
    await db.execute({ sql: "DELETE FROM Session WHERE sessionToken = ?", args: [sessionToken] });
  },

  async createVerificationToken(token) {
    await db.execute({
      sql: "INSERT INTO VerificationToken (identifier, token, expires) VALUES (?, ?, ?)",
      args: [token.identifier, token.token, token.expires.getTime()],
    });
    return token;
  },

  async useVerificationToken(params: { identifier: string; token: string }) {
    const result = await db.execute({
      sql: "DELETE FROM VerificationToken WHERE identifier = ? AND token = ?",
      args: [params.identifier, params.token],
    });
    return result.rowsAffected > 0 ? { identifier: params.identifier, token: params.token, expires: new Date() } : null;
  },

  async unlinkAccount(params: { provider: string; providerAccountId: string }) {
    await db.execute({
      sql: "DELETE FROM Account WHERE provider = ? AND providerAccountId = ?",
      args: [params.provider, params.providerAccountId],
    });
  },

  async deleteUser(userId) {
    await db.execute({ sql: "DELETE FROM User WHERE id = ?", args: [userId] });
  },

  async updateUser(user) {
    await db.execute({
      sql: "UPDATE User SET name = ?, email = ?, emailVerified = ?, image = ?, updatedAt = ? WHERE id = ?",
      args: [user.name || null, user.email || null, user.emailVerified?.getTime() || null, user.image || null, Date.now(), user.id],
    });
    return user as any;
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