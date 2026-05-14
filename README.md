# Fake News Checker

Misinformation spreads fast. A single viral headline can travel across social media, messaging apps, and news feeds before anyone has a chance to verify it. By the time the truth catches up, the damage is already done — reputations are tarnished, public opinion is swayed, and false narratives take root. Fake News Checker is a simple but powerful tool designed to help you cut through the noise and figure out what's real.

At its core, the platform does one thing: you give it a link to a news article, and it tells you whether that article is likely real, fake, or unverifiable. But the way it gets there is what makes it useful. When you submit a URL, the platform doesn't just look at the article in isolation. It reads the content, runs it through an AI analysis, and simultaneously searches the live web for corroborating or contradictory sources. It cross-references claims, checks for known misinformation patterns, and weighs the evidence before delivering a verdict.

## Features

- **AI-Powered Analysis**: Uses Google Gemini AI with web search grounding to analyze news articles
- **Structured Results**: Verdict, confidence score, claims breakdown, source reliability, and key findings
- **Interactive Chat**: Ask follow-up questions about any analyzed article
- **Search History**: Signed-in users can review past analyses
- **Public API**: Integrate fake news detection into your own applications
- **Dark Mode**: System-aware theme support

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **AI**: Google Gemini 2.5 Flash (`@google/generative-ai`)
- **Auth**: NextAuth.js v4 (Google & GitHub OAuth)
- **Database**: SQLite via better-sqlite3
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys (see Environment Variables below)

# Start the development server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI analysis |
| `NEXTAUTH_SECRET` | Yes | NextAuth.js encryption secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Yes | Application URL (`http://localhost:3000` for development) |
| `GOOGLE_CLIENT_ID` | For Google auth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For Google auth | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | For GitHub auth | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | For GitHub auth | GitHub OAuth client secret |
| `API_KEY` | No | API key for public REST API access |

## Public REST API

The platform exposes a public REST API for integrating fake news detection into external applications. The API is available at `/api/check`.

### Authentication

If the `API_KEY` environment variable is configured, all API requests must include an `x-api-key` header with the matching value. Without this header, the API returns a 401 error.

### Endpoint: `POST /api/check`

Analyze a news article URL and return a structured verdict.

**Request Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `x-api-key` | Your API key | Only if `API_KEY` is configured |

**Request Body:**

```json
{
  "url": "https://example.com/news/article"
}
```

**Response:**

```json
{
  "verdict": "REAL",
  "confidence": 0.85,
  "summary": "2-3 sentence analysis summary",
  "claims": [
    {
      "claim": "Specific claim from the article",
      "status": "supported",
      "explanation": "Why this claim is supported"
    }
  ],
  "sources": [
    {
      "name": "Source Name",
      "url": "https://source.url",
      "reliability": "high"
    }
  ],
  "keyFindings": ["Finding 1", "Finding 2"]
}
```

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `verdict` | string | `REAL`, `FAKE`, or `UNVERIFIED` |
| `confidence` | number | Score between 0 and 1 |
| `summary` | string | Plain-text analysis summary |
| `claims` | array | List of specific claims analyzed |
| `claims[].claim` | string | The extracted claim |
| `claims[].status` | string | `supported`, `contradicted`, or `unverifiable` |
| `claims[].explanation` | string | Reasoning behind the status |
| `sources` | array | Sources used in analysis |
| `sources[].name` | string | Source name |
| `sources[].url` | string | Source URL |
| `sources[].reliability` | string | `high`, `medium`, or `low` |
| `keyFindings` | array | Key finding strings |

### Examples

**curl:**
```bash
curl -X POST https://your-domain.com/api/check \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{ "url": "https://example.com/news/article" }'
```

**JavaScript:**
```javascript
fetch("https://your-domain.com/api/check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your-api-key",
  },
  body: JSON.stringify({ url: "https://example.com/news" }),
})
  .then((r) => r.json())
  .then(console.log);
```

**Python:**
```python
import requests

response = requests.post(
    "https://your-domain.com/api/check",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "your-api-key",
    },
    json={"url": "https://example.com/news"},
)
print(response.json())
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth.js handler
│   │   └── check/                 # Public REST API
│   ├── api-docs/                  # API documentation page
│   ├── auth/login/                # Login page
│   ├── dashboard/
│   │   ├── api/
│   │   │   ├── check-news/        # Dashboard analysis endpoint
│   │   │   └── chat/              # Follow-up chat endpoint
│   │   ├── history/               # Search history page
│   │   └── page.tsx               # Dashboard main page
│   ├── globals.css
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── features/
│   │   ├── Navbar/                # Main navigation
│   │   ├── NewsChecker/           # URL input + check flow
│   │   ├── ResultDisplay/         # Verdict cards, gauge, claims, sources
│   │   ├── ScanAnimation/         # Loading animation with progress
│   │   └── ThemeToggle/           # Dark/light mode toggle
│   ├── layout/
│   │   └── Navbar.tsx             # Reusable navbar component
│   └── ui/
│       └── button.tsx             # Base button component
├── lib/
│   ├── db.ts                     # Database connection
│   ├── theme-provider.tsx         # Custom theme context
│   └── types.ts                   # Shared TypeScript types
├── server/
│   ├── actions/
│   │   └── search.ts              # Database queries for searches
│   ├── auth/
│   │   └── nextauth.ts            # NextAuth configuration + adapter
│   └── gemini/
│       └── client.ts              # Gemini AI client
└── data/
    └── dev.db                     # SQLite database (auto-created)
```
