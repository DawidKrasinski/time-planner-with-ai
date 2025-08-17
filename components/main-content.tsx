"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTaskList } from "@/app/taskListProvider";

export function MainContent() {
  const { sendChatPrompt } = useTaskList();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "60px";
      const newHeight = Math.max(60, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  useEffect(() => {
    adjustHeight();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="pt-32 pb-16 px-6 flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-fjalla text-very-dark-navy mb-6 leading-tight">
            Welcome to Carbonara AI
          </h1>
          <p className="text-xl md:text-2xl text-very-dark-navy/80 font-lato font-light">
            Your Smart Time Planner
          </p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-pure-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-very-dark-navy/5 p-2">
            <textarea
              ref={textareaRef}
              id="tasks-input"
              placeholder="Type your weekly tasks or prompts here…"
              value={input}
              onChange={handleInputChange}
              className="w-full h-15 min-h-[60px] px-6 py-4 text-lg font-lato bg-transparent text-very-dark-navy placeholder:text-very-dark-navy/50 focus:outline-none border-0 resize-none overflow-hidden rounded-xl"
              rows={1}
            />
          </div>

          <Button
            onClick={() => sendChatPrompt(input)}
            size="lg"
            className="bg-very-dark-navy hover:bg-very-dark-navy/90 text-pure-white font-lato font-medium px-8 py-4 h-14 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            Plan My Time
          </Button>
        </div>
      </div>
    </main>
  );
}
