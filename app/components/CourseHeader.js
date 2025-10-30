import { Menu, Languages, MessageCircle, ChevronRight } from 'lucide-react';

export default function CourseHeader({ 
  courseTitle, 
  courseSubtitle, 
  onMenuClick, 
  onPlaylistToggle 
}) {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-white flex-shrink-0 cursor-pointer"
          >
            <Menu size={24} />
          </button>
          
          {/* Logo */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#0ae98a] rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer">
            <div className="w-5 h-5 sm:w-7 sm:h-7 border-2 border-white rounded transform rotate-45"></div>
          </div>
          
          {/* Título del curso */}
          <div className="min-w-0 flex-1">
            <h1 className="text-white text-xs sm:text-sm font-medium truncate">{courseTitle}</h1>
            <p className="text-gray-400 text-xs hidden sm:block truncate">{courseSubtitle}</p>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block cursor-pointer">
            <Languages size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block cursor-pointer">
            <MessageCircle size={20} />
          </button>
          <button 
            onClick={onPlaylistToggle}
            className="bg-[#1a1a1a] hover:bg-[#252525] text-white px-3 py-2 rounded-lg text-xs sm:text-sm border border-gray-700 transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Ver clases</span>
            <span className="sm:hidden">Lista</span>
          </button>
          <button className="hidden md:flex bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 transition-colors cursor-pointer">
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

