import OpenAI from "openai";
import { NextResponse } from "next/server";
import { TAROT_READING_SYSTEM_PROMPT } from "@/features/tarot/prompts/readingSystemPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: TAROT_READING_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify(body),
        },
      ],
      temperature: 0.75,
      max_output_tokens: 1400,
    });

    const rawText = response.output_text;

    if (!rawText) {
      return NextResponse.json(
        { error: "No reading generated." },
        { status: 500 },
      );
    }

    const reading = JSON.parse(rawText);

    return NextResponse.json({ reading });
  } catch (error) {
    console.error("Tarot reading generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate tarot reading." },
      { status: 500 },
    );
  }
}