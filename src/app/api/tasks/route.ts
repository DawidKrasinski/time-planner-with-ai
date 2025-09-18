import { NextResponse } from "next/server";
import { getDataSource } from "../../../db/data-source";
import { Task } from "../../../db/entities/Task";
import OpenAI from "openai";
import { task } from "@/src/types/task";
import { Priority } from "@/src/db/entities/Priority";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    await getDataSource();
    const tasks = await Task.createQueryBuilder("task")
      .leftJoinAndSelect("task.priority", "priority")
      .orderBy("task.doneDate", "ASC")
      .addOrderBy("task.priority", "DESC")
      .addOrderBy("task.startTime", "ASC")
      .getMany();

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await getDataSource();

  const now = new Date();

  const oldTasks = await Task.createQueryBuilder("task")
    .where("task.startTime > :now", { now: now.toISOString() })
    .getMany();

  const priorities = await Priority.find();

  const { prompt } = await req.json();
  const content = `
You are an AI that manages and creates a structured daily task list based on user requests.

Instructions:

1. Analyze the user input and determine how many distinct tasks it contains. 
   For each task, decide what categories it should have:
   - Routine: the task is a routine, the user does it more than once
   - Microtask: the task can possibly be completed in less than 5 minutes
   - RegularTask: just a regular individual task
   - Immutable: the task time is fixed and cannot be changed
   * A task can belong to more than one category

2. For each task, return an object with the following fields:
   - id: string | null (use existing id for edited tasks, null for new tasks)
   - name: string (short task description)
   - startTime: string | null (ISO 8601 format, e.g., "2025-08-17T09:00:00Z")
   - endTime: string | null (ISO 8601 format)
   - doneDate: string | null (ISO 8601 format)
   - priority: one of ${JSON.stringify(priorities)}
   - categories: array of enum Categories { Routine = "routine", Microtask = "microtask", RegularTask = "regular-task", Immutable = "immutable" }

3. Today's date is ${new Date().toISOString()} — use it as reference for default dates if needed.

4. Old tasks: ${JSON.stringify(oldTasks)}  
   - Analyze existing tasks and adjust them if needed to accommodate new tasks.  
   - If a new task overlaps with a RegularTask, adjust the RegularTask time or split it into multiple tasks.  
   - Microtasks should only fill free gaps and never overwrite other tasks.  
   - Immutable tasks must never be modified.  
   - Return all tasks that were edited or newly created, including their id if applicable.  

5. Scheduling rules:
   - Sort tasks by time.  
   - If a task does not have a start time, assign it to a free time slot.  
   - Tasks must not start before 6 a.m. or end after 11 p.m.  
   - Estimate task duration based on category if not provided.  
   - If tasks cannot fit into the current day, move the excess into the next day with higher priority.  
   - Estimate or adjust task priority as needed.  

6. Respond ONLY with valid JSON, no extra text or comments.  

Example output format:
{
  "tasks": [
    {
      "id": "...",
      "name": "...",
      "startTime": "...",
      "endTime": "...",
      "doneDate": "...",
      "priority": {id: 1, name: "low", order: 1, color: "green"},
      "categories": ["routine","microtask"]
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content },
      { role: "user", content: prompt },
    ],
    temperature: 0,
  });

  const aiContent = response.choices[0].message.content?.trim() || "{}";
  let tasks: task[] = [];

  try {
    const parsed = JSON.parse(aiContent);
    tasks = parsed.tasks || [];
  } catch (err) {
    console.error("Error parsing AI response:", aiContent, err);
    tasks = [];
  }

  const savedTasks = await Promise.all(
    tasks.map(async (element: task) => {
      let taskEntity: Task;

      if (element.id) {
        taskEntity = (await Task.findOneBy({ id: element.id })) || new Task();
      } else {
        taskEntity = new Task(
          element.name,
          element.priority,
          element.startTime,
          element.endTime,
          element.categories
        );
      }

      //const isImmutable = element.categories?.includes("immutable");

      taskEntity.name = element.name;
      // if (!isImmutable) {
      //   taskEntity.startTime = element.startTime;
      //   taskEntity.endTime = element.endTime;
      // }
      taskEntity.doneDate = element.doneDate;
      taskEntity.priority = element.priority;
      taskEntity.categories = element.categories;

      await taskEntity.save();
      return taskEntity;
    })
  );

  return NextResponse.json({ tasks: savedTasks });
}
