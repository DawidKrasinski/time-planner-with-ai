import { WeeklySchedule } from "@/src/components/schedule/weekly-schedule";
import { Header } from "@/src/components/main/header";

export default function MySchedulePage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#f0eeff] via-pure-white to-[#b2d2ff]">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <WeeklySchedule />
      </div>
    </div>
  );
}
