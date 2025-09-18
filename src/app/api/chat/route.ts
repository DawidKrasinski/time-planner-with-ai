import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getDataSource } from "../../../db/data-source";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  await getDataSource();

  const { prompt } = await req.json();

  const systemPrompt = `You are an AI classifier for a time planner application.

Instructions:
1. Analyze the user input and classify it into one or more of the following categories:
   - "task": a concrete, actionable, and schedulable action (e.g., "buy groceries", "finish homework").
   - "goal": a broader, long-term objective that clearly defines an outcome beyond a single action (e.g., "reach C1 level in English", "get fit").
   - "none": use only in very rare cases when the input is impossible to classify as either a task or a goal.

2. Output rules:
   - Always return a JSON array.
   - Valid outputs are ["task"], ["goal"], ["none"], or ["task","goal"].
   - "none" must never appear together with any other element.

3. Classification guidelines:
   - Default to ["task"] unless the input very clearly describes a long-term outcome or objective.
   - Use ["task","goal"] only if the input contains both an actionable step and a clear long-term objective.
   - Use ["goal"] alone only when the input explicitly communicates a broad outcome without any immediate actionable step.
   - Goal classifications should be rare compared to tasks (approximate distribution: ~60% tasks, ~30% tasks+goals, ~10% goals).

4. Respond strictly with the array only. Do not add explanations, comments, whitespace, or any extra text.
`;

  const chatResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0,
  });

  // Safely parse AI response
  const content = chatResponse.choices[0].message?.content ?? '["none"]';
  let routes: ("task" | "goal" | "none")[];

  try {
    routes = JSON.parse(content);
  } catch {
    routes = ["none"];
  }

  let responses: any[] = [];

  for (const route of routes) {
    let path: "/api/tasks" | "/api/goals" | null = null;

    switch (route) {
      case "task":
        path = "/api/tasks";
        break;
      case "goal":
        path = "/api/goals";
        break;
      default:
        path = null;
    }

    if (!path) {
      console.error("Debug: path value:", path);
      throw new Error(`The path is probably null or undefined, path: ${path}`);
    }

    console.log("route:", route);

    const res = await fetch(process.env.BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    responses.push(await res.json());
  }

  return NextResponse.json({ responses });
}
