"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types/task";

export type TaskListProvider = {
  taskList: Task[];
  sendChatPrompt: (prompt: string) => void;
};

const TaskListContext = createContext<TaskListProvider | null>(null);

export default function TaskListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const body = await response.json();
    console.log("GET method response:", body);
    setTaskList(body);
  }

  async function sendChatPrompt(prompt: string) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("POST method response:", response);
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskListContext.Provider
        value={{
          taskList,
          sendChatPrompt,
        }}
      >
        {props.children}
      </TaskListContext.Provider>
    </div>
  );
}

export function useTaskList() {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("useToDoList must be used within a TodoListProvider");
  }
  return context;
}
