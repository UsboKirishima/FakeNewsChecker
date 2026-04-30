# Fake News Checker Project Overview

AI-powered platform using Google Gemini (free tier) to verify news article URLs via web search grounding, with real-time progress tracking, detailed analysis, user authentication, and per-user search history.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Auth**: NextAuth.js (Google & GitHub OAuth)
- **AI**: Google Gemini API (web search grounding enabled)
- **Database**: PostgreSQL (Prisma ORM)
- **UI**: shadcn/ui, Zod validation
- **Package Manager**: pnpm

## Project Structure
```
healthcare/
├── app/
│   ├── (auth)/
│   │   └── login/          # Google/GitHub login page
│   ├── (dashboard)/         # Protected routes
│   │   ├── page.tsx         # Main checker page
│   │   ├── history/         # User search history
│   │   └── api/
│   │       ├── check-news/  # Gemini analysis endpoint
│   │       └── auth/        # NextAuth route
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── features/
│   │   ├── NewsChecker/     # URL input, submit
│   │   ├── ScanAnimation/   # Loading animation
│   │   ├── ResultDisplay/   # Verdict + confidence
│   │   ├── AIChat/          # Toggleable AI comments
│   │   └── SearchHistory/   # Past searches list
├── server/
│   ├── auth/                # NextAuth config
│   ├── db/                  # Prisma schema/client
│   ├── gemini/              # API client + prompts
│   └── actions/             # Server actions (save/retrieve searches)
├── lib/                     # Types, utilities, validation schemas
└── public/                  # Static assets
```

## Core Workflow
1. **Login**: User authenticates via Google/GitHub (NextAuth session persisted)
2. **Submit URL**: Paste news article link into main checker input
3. **Processing**:
   - Scanning animation plays immediately on submit
   - Server calls Gemini API with URL, using web search grounding for real-time context
   - Gemini streams intermediate operations (e.g., "Fetching content...", "Cross-referencing sources...") if supported
4. **Results**:
   - Displays verdict (Fake/Real/Unverified) with confidence score
   - "View AI Analysis" button toggles detailed comments from Gemini
5. **Persistence**: Search (URL, verdict, AI data, timestamp) saved to DB linked to user ID
6. **History**: Users view all past searches in `/history`

## Database Schema (Prisma)
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  image         String?
  oauthProvider String    // "google" | "github"
  searches      Search[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Search {
  id          String   @id @default(cuid())
  url         String
  verdict     String   // "FAKE" | "REAL" | "UNVERIFIED"
  confidence  Float    // 0.0-1.0
  aiComments  String?
  operations  String[] // Gemini intermediate steps
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

## Key Implementation Notes
- **Gemini Integration**: Use Gemini 1.5 Flash free API, enable web search grounding via `tools: [{googleSearch: {}}]` in API requests. Stream responses to show real-time progress.
- **Scan Animation**: Tailwind CSS keyframe animations for looping scan effect during pending requests.
- **Auth**: Configure NextAuth with Google/GitHub providers, attach user ID to session via callbacks.
- **Required Env Vars**: `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `DATABASE_URL`, `NEXTAUTH_SECRET`

## Getting Started
1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env` and fill all required values
3. Run Prisma migrations: `npx prisma migrate dev`
4. Start dev server: `pnpm dev`
5. Open `http://localhost:3000`
