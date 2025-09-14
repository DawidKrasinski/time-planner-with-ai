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
  { name: "Planer AI", href: "/" },
  { name: "My Schedule", href: "/my-schedule" },
  { name: "Tasks & Routines", href: "/tasks" },
  { name: "Stats & History", href: "/stats" },
  { name: "Goals & Progress", href: "/goals" },
  { name: "About me & Settings", href: "/settings" },
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
