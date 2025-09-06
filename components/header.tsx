"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { name: "Main Page", href: "/" },
  { name: "Planer AI", href: "/planer-ai" },
  { name: "My Schedule", href: "/my-schedule" },
  { name: "Routines", href: "/routines" },
  { name: "Tasks", href: "/tasks" },
  { name: "Breaks & Buffers", href: "/breaks-buffers" },
  { name: "Stats & Reports", href: "/stats-reports" },
  { name: "History & Journal", href: "/history-journal" },
  { name: "Goals & Progress", href: "/goals-progress" },
  { name: "Settings", href: "/settings" },
  { name: "Lab / Beta", href: "/lab-beta" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pure-white/95 backdrop-blur-md border-b border-very-dark-navy/10 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-fjalla font-bold text-very-dark-navy hover:opacity-80 transition-opacity"
        >
          Time Planner AI
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="bg-transparent text-very-dark-navy hover:bg-very-dark-navy/5 rounded-xl font-lato"
            >
              Menu
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-pure-white border border-very-dark-navy/10 rounded-xl shadow-lg"
          >
            {navigationItems.map((item, index) => (
              <div key={item.name}>
                <DropdownMenuItem asChild>
                  <Link
                    href={item.href}
                    className="text-very-dark-navy hover:bg-very-dark-navy/5 rounded-lg mx-1 my-1 cursor-pointer font-lato"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
                {(index === 0 || index === 4 || index === 8) && (
                  <DropdownMenuSeparator className="bg-very-dark-navy/10" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
