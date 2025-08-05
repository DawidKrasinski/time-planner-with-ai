"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = [
  { name: "Planer AI", href: "/" },
  { name: "My Schedule", href: "/my-schedule", active: true },
  { name: "Routines", href: "/routines" },
  { name: "Tasks", href: "/tasks" },
  { name: "Breaks & Buffers", href: "/breaks" },
  { name: "Stats & Reports", href: "/stats" },
  { name: "History & Journal", href: "/history" },
  { name: "Goals & Progress", href: "/goals" },
  { name: "Settings", href: "/settings" },
  { name: "Lab / Beta", href: "/lab" },
]

export function ScheduleHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="text-2xl font-fjalla font-bold text-almost-black hover:opacity-80 transition-opacity">
          Carbonara AI
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-almost-black hover:bg-almost-white">
              My Schedule
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-sm">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-lato cursor-pointer hover:bg-almost-white ${
                    item.active ? "bg-very-light-blue text-almost-black font-medium" : "text-almost-black"
                  }`}
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
