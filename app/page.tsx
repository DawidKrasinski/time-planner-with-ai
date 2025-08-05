import { MinimalHeader } from "@/components/minimal-header"
import { MinimalMainContent } from "@/components/minimal-main-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0eeff] via-white to-[#b2d2ff]">
      <MinimalHeader />
      <MinimalMainContent />
    </div>
  )
}
