import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful Star Wars-themed learning assistant. Help users with questions about science, AI, history, and Star Wars facts. Be encouraging and educational.",
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Failed to generate response", { status: 500 });
  }
}
