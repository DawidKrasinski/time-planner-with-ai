"use client";

import { Plus } from "lucide-react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const sampleTasks = {
  Monday: [
    { time: "09:00", task: "Team standup meeting" },
    { time: "10:30", task: "Review marketing presentation" },
    { time: "14:00", task: "Client call - Project Alpha" },
  ],
  Tuesday: [
    { time: "09:30", task: "Design review session" },
    { time: "11:00", task: "Focus time - Development" },
  ],
  Wednesday: [
    { time: "10:00", task: "Weekly planning" },
    { time: "15:30", task: "User research interview" },
  ],
  Thursday: [
    { time: "09:00", task: "Product roadmap meeting" },
    { time: "13:00", task: "Lunch with mentor" },
    { time: "16:00", task: "Code review" },
  ],
  Friday: [
    { time: "10:00", task: "Sprint retrospective" },
    { time: "14:00", task: "Documentation update" },
  ],
  Saturday: [],
  Sunday: [{ time: "11:00", task: "Personal project work" }],
};

export function WeeklySchedule() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-fjalla text-very-dark-navy">My Schedule</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-pure-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-very-light-blue px-4 py-3 border-b border-gray-100">
              <h3 className="font-fjalla text-lg text-almost-black">{day}</h3>
            </div>

            <div className="p-4 space-y-3 min-h-[300px]">
              {sampleTasks[day as keyof typeof sampleTasks].map(
                (task, index) => (
                  <div
                    key={index}
                    className="bg-pure-white border border-gray-100 rounded-md p-3 shadow-sm"
                  >
                    <div className="text-xs font-lato text-gray-600 mb-1">
                      {task.time}
                    </div>
                    <div className="text-sm font-lato text-almost-black">
                      {task.task}
                    </div>
                  </div>
                )
              )}

              <button className="w-full border-2 border-dashed border-gray-200 rounded-md p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors group">
                <Plus className="h-5 w-5 text-gray-400 group-hover:text-gray-500 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
