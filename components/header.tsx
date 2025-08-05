"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  "Planer AI",
  "My Schedule",
  "Routines",
  "Tasks",
  "Breaks & Buffers",
  "Stats & Reports",
  "History & Journal",
  "Goals & Progress",
  "Settings",
  "Lab / Beta",
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-light-blue/30 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-fjalla font-bold text-very-dark-navy">
            Carbonara AI
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="bg-transparent text-very-dark-navy hover:bg-very-dark-navy/10 rounded-xl"
            >
              Menu
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white/95 backdrop-blur-md border-light-blue/30 rounded-xl shadow-lg"
          >
            {menuItems.map((item, index) => (
              <div key={item}>
                <DropdownMenuItem className="text-very-dark-navy hover:bg-light-blue/20 rounded-lg mx-1 my-1 cursor-pointer">
                  {item}
                </DropdownMenuItem>
                {(index === 3 || index === 7) && (
                  <DropdownMenuSeparator className="bg-light-blue/30" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
