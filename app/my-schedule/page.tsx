import { WeeklySchedule } from "@/components/weekly-schedule";
import { Header } from "@/components/header";

export default function MySchedulePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <WeeklySchedule />
      </div>
    </div>
  );
}
