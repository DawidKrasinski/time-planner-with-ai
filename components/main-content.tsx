"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function MainContent() {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "48px" // Always reset to minimum height first
      const newHeight = Math.max(48, textarea.scrollHeight)
      textarea.style.height = `${newHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input])

  useEffect(() => {
    // Ensure proper height on initial render
    adjustHeight()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <main className="pt-32 pb-12 px-6 flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-fjalla text-very-dark-navy mb-4">Welcome to Carbonara AI</h2>
          <p className="text-xl text-very-dark-navy/80 font-lato font-light">Your Smart Time Planner</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-light-blue/30 p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <textarea
              ref={textareaRef}
              id="tasks-input"
              placeholder="e.g., I need to finish my marketing presentation, attend 3 client meetings..."
              value={input}
              onChange={handleInputChange}
              className="w-full h-12 min-h-[48px] px-4 py-3 text-base font-lato bg-white/60 rounded-2xl focus:outline-none border-0 resize-none overflow-hidden"
              rows={1}
            />
            <Button
              size="lg"
              className="bg-very-dark-navy hover:bg-very-dark-navy/90 text-white font-lato font-medium px-6 py-3 h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Plan My Time
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
