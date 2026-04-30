import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function checkNews(url: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze this URL for fake news: ${url}. Provide verdict (FAKE/REAL/UNVERIFIED), confidence score (0-1), and detailed comments. Use web search to verify.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;

  return {
    verdict: "UNVERIFIED",
    confidence: 0.5,
    aiComments: response.text(),
    operations: "",
  };
}
