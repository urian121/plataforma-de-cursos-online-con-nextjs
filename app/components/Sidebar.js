import Link from "next/link";
import { Home, Grid3x3, BookOpen, Settings, Bell, Video } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-16 bg-[#0a0a0a] flex-col items-center py-4 gap-6">
      {/* Logo */}
      <Link
        href="/"
        className="w-10 h-10 bg-[#0ae98a] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#09d47d] transition-colors"
      >
        <div className="w-6 h-6 border-2 border-white rounded transform rotate-45"></div>
      </Link>

      {/* Navegación principal */}
      <nav className="flex flex-col gap-6 mt-8">
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <Home size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <Grid3x3 size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <BookOpen size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <Video size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <Settings size={24} />
        </button>
      </nav>

      {/* Notificaciones */}
      <div className="mt-auto flex flex-col gap-6">
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <Bell size={24} />
        </button>
      </div>
    </aside>
  );
}
