import { ScheduleHeader } from "@/components/schedule-header"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { BackNavigation } from "@/components/back-navigation"

export default function MySchedulePage() {
  return (
    <div className="min-h-screen bg-white">
      <ScheduleHeader />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <BackNavigation />
        <WeeklySchedule />
      </div>
    </div>
  )
}
