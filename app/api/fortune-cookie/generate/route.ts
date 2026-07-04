import OpenAI from "openai";
import { NextResponse } from "next/server";
import { fortuneCookieEngine } from "@/features/fortune-cookie/core/fortuneCookieEngine";
import { FORTUNE_COOKIE_SYSTEM_PROMPT } from "@/features/fortune-cookie/prompts/fortuneCookieSystemPrompt";
import type { GeneratedFortune } from "@/features/fortune-cookie/types/fortuneCookie.types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const seed = fortuneCookieEngine.generate();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: FORTUNE_COOKIE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            ...body,
            fortuneSeed: seed,
          }),
        },
      ],
      temperature: 0.82,
      max_output_tokens: 500,
    });

    const rawText = response.output_text;

    if (!rawText) {
      return NextResponse.json(
        { error: "No fortune generated." },
        { status: 500 },
      );
    }

    const fortune = JSON.parse(rawText) as Omit<GeneratedFortune, "tone">;

    return NextResponse.json({
      fortune: {
        ...fortune,
        tone: seed.tone,
      },
      seed,
    });
  } catch (error) {
    console.error("Fortune cookie generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate fortune cookie message." },
      { status: 500 },
    );
  }
}