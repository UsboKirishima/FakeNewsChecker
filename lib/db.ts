import { createClient } from "@libsql/client"

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

const statements = [
  `CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, name TEXT, email TEXT UNIQUE, emailVerified INTEGER, image TEXT, createdAt INTEGER DEFAULT (strftime('%s', 'now')), updatedAt INTEGER DEFAULT (strftime('%s', 'now')))`,
  `CREATE TABLE IF NOT EXISTS Account (id TEXT PRIMARY KEY, userId TEXT NOT NULL, type TEXT NOT NULL, provider TEXT NOT NULL, providerAccountId TEXT NOT NULL, refresh_token TEXT, access_token TEXT, expires_at INTEGER, token_type TEXT, scope TEXT, id_token TEXT, session_state TEXT, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS Session (id TEXT PRIMARY KEY, sessionToken TEXT UNIQUE NOT NULL, userId TEXT NOT NULL, expires INTEGER NOT NULL, FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS VerificationToken (identifier TEXT NOT NULL, token TEXT UNIQUE NOT NULL, expires INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS Search (id TEXT PRIMARY KEY, url TEXT NOT NULL, verdict TEXT NOT NULL, confidence REAL NOT NULL, aiComments TEXT, operations TEXT, userId TEXT NOT NULL, createdAt INTEGER DEFAULT (strftime('%s', 'now')), FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS Account_provider_providerAccountId ON Account(provider, providerAccountId)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS Session_sessionToken ON Session(sessionToken)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS VerificationToken_token ON VerificationToken(token)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS VerificationToken_identifier_token ON VerificationToken(identifier, token)`,
]

for (const sql of statements) {
  await db.execute(sql)
}

export { db }