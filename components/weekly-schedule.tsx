"use client";

import { useTaskList } from "@/app/taskListProvider";
import { getTime, getDayName } from "@/lib/date";
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

export function WeeklySchedule() {
  const { taskList } = useTaskList();

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
              {taskList
                .filter((task) => getDayName(task.startTime) === day)
                .map((task, index) => (
                  <div
                    key={index}
                    className="bg-pure-white border border-gray-100 rounded-md p-3 shadow-sm"
                  >
                    <div className="text-xs font-lato text-gray-600 mb-1">
                      {getTime(task.startTime)}
                    </div>
                    <div className="text-sm font-lato text-almost-black">
                      {task.name}
                    </div>
                  </div>
                ))}

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
