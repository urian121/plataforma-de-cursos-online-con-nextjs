import { Home, Grid3x3, BookOpen, Settings, Bell } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-16 bg-[#1a1a1a] border-r border-gray-800 flex-col items-center py-4 gap-6">
      {/* Logo */}
      <div className="w-10 h-10 bg-[#0ae98a] rounded-lg flex items-center justify-center cursor-pointer">
        <div className="w-6 h-6 border-2 border-white rounded transform rotate-45"></div>
      </div>
      
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
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
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

