"use client";

import { Header } from "@/components/header";
import { MainContent } from "@/components/main-content";
import { useTaskList } from "./taskListProvider";

export default function HomePage() {
  const { taskList } = useTaskList();
  console.log(taskList);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0eeff] via-pure-white to-[#b2d2ff]">
      <Header />
      <MainContent />
    </div>
  );
}
