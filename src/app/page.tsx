import { Header } from "@/src/components/main/header";
import { MainContent } from "@/src/components/main/main-content";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0eeff] via-pure-white to-[#b2d2ff]">
      <Header />
      <MainContent />
    </div>
  );
}
