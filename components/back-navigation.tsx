"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackNavigation() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-lato text-almost-black hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Planer AI
      </Link>
    </div>
  )
}
