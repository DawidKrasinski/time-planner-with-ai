import OpenAI from "openai";
import { NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { Task } from "../db/entity/task";
import { task } from "@/types/task";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// tasks
// about me
// priority
export async function POST(req: Request) {
  await useDataSource();

  const { prompt } = await req.json();
  const content = `
You are an AI that creates a structured daily task list based on user requests.

Instructions:
1. Analyze the user input and determine how many distinct tasks it contains.
2. For each task, return an object with the following fields:
   - name: string (short task description)
   - startTime: string | null (ISO 8601 format, e.g. "2025-08-17T09:00:00Z")
   - endTime: string | null (ISO 8601 format) 
   - doneDate: string | null (ISO 8601 format)
   - priority: number (1 to 10, if higher the more important)

3. Today's date is ${new Date().toISOString()} — use it as reference for default dates if needed.
4. Sort the tasks by time, if the task don't have time add it time in the free space,
 make sure that your given time don't be before 6 a.m and don't end after 11 p.m,
 estimate how long it takes and add the end time,
 if you can't add all tasks in one day move it into next day but with higher priority,
 estimate the task priority.
5. Respond ONLY with valid JSON, no extra text, no comments.

Output format:
{
  "tasks": [
    {
      "name": "...",
      "startTime": "...",
      "endTime": "...",
      "doneDate": "...",
      "priority": "...",
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: content,
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  let tasks: task[] = [];
  try {
    tasks = JSON.parse(response.choices[0].message.content || "{}").tasks || [];
  } catch (err) {
    console.error("Error parsing AI response:", err);
  }

  tasks.map((element: task) => {
    const task = new Task(element.name, element.startTime, element.endTime);
    console.log(task);
    task.save();
  });

  return NextResponse.json({ tasks });
}
