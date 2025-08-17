import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI that creates structured daily tasks based on user requests. Respond with JSON format: { tasks: [] }",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  let tasks = [];
  try {
    tasks = JSON.parse(response.choices[0].message.content || "{}").tasks || [];
  } catch (err) {
    console.error("Error parsing AI response:", err);
  }

  return NextResponse.json({ tasks });
}
