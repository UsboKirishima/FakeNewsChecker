import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock");

function parseGeminiResponse(text: string): AnalysisResult {
  try {
    const json = JSON.parse(text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
    return {
      verdict: json.verdict || "UNVERIFIED",
      confidence: json.confidence ?? 0.5,
      summary: json.summary || json.aiComments || text,
      claims: json.claims || [],
      sources: json.sources || [],
      keyFindings: json.keyFindings || [],
    };
  } catch {
    const upper = text.toUpperCase();
    let verdict: AnalysisResult["verdict"] = "UNVERIFIED";
    if (upper.includes("VERDICT: FAKE") || upper.includes("VERDICT:FAKE")) verdict = "FAKE";
    else if (upper.includes("VERDICT: REAL") || upper.includes("VERDICT:REAL")) verdict = "REAL";

    const confidenceMatch = text.match(/confidence[:\s]+(\d+(?:\.\d+)?)/i);
    const confidence = confidenceMatch ? Math.min(1, parseFloat(confidenceMatch[1]) / 100) : 0.5;

    return { verdict, confidence, summary: text, claims: [], sources: [], keyFindings: [] };
  }
}

export async function checkNews(url: string): Promise<AnalysisResult> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "mock") {
    return {
      verdict: "UNVERIFIED",
      confidence: 0.72,
      summary:
        "This article makes several claims about recent scientific developments. While some claims are supported by credible sources, key assertions lack proper citation. The publication has a mixed track record for accuracy in this topic area.",
      claims: [
        {
          claim: "A major breakthrough was announced in quantum computing research",
          status: "supported",
          explanation: "Multiple reputable science journals have reported similar findings from the same research group.",
        },
        {
          claim: "The technology will be commercially available within 6 months",
          status: "contradicted",
          explanation: "Experts quoted in the article express skepticism about this timeline. Peer reviews suggest 2-3 years minimum.",
        },
        {
          claim: "Funding came from undisclosed private investors",
          status: "unverifiable",
          explanation: "No public records or official statements confirm the funding sources mentioned.",
        },
      ],
      sources: [
        { name: "Nature Journal", url: "https://nature.com", reliability: "high" },
        { name: "TechCrunch", url: "https://techcrunch.com", reliability: "medium" },
        { name: "Unverified Blog", url: "", reliability: "low" },
      ],
      keyFindings: [
        "Core research is legitimate and peer-reviewed",
        "Commercial timeline appears exaggerated",
        "Funding sources remain unclear",
        "Article contains both accurate and misleading information",
      ],
    };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a fact-checking AI. Analyze this news article URL for accuracy and misinformation: ${url}

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "verdict": "REAL" | "FAKE" | "UNVERIFIED",
  "confidence": <number between 0 and 1>,
  "summary": "<2-3 sentence plain text summary of the analysis>",
  "claims": [
    { "claim": "<specific claim from the article>", "status": "supported" | "contradicted" | "unverifiable", "explanation": "<why>" }
  ],
  "sources": [
    { "name": "<source name>", "url": "<source url or empty string>", "reliability": "high" | "medium" | "low" }
  ],
  "keyFindings": ["<finding 1>", "<finding 2>", ...]
}

Use web search to verify claims. Be thorough and objective.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return parseGeminiResponse(response.text());
}

export async function chatAboutNews(url: string, message: string, history: { role: string; content: string }[]): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "mock") {
    return "Based on the analysis, this article contains a mix of accurate and misleading information. The core scientific claims are supported by peer-reviewed research, but the commercial timeline appears exaggerated. I recommend cross-referencing the claims with established news sources and official statements from the organizations involved.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const contextPrompt = `You are analyzing this news article: ${url}

Previous conversation:
${history.map((h) => `${h.role.toUpperCase()}: ${h.content}`).join("\n")}

Answer the user's latest question concisely and helpfully, referencing the article analysis.`;

  const result = await model.generateContent(contextPrompt + "\n\nUser: " + message);
  return (result.response).text();
}
