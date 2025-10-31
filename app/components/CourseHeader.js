import { Menu, User, Trophy } from "lucide-react";

export default function CourseHeader({
  courseTitle,
  courseSubtitle,
  onMenuClick,
  courseProgress = 20,
}) {
  return (
    <header className="bg-[#0a0a0a] px-3 sm:px-6 py-3 sm:py-2">
      <div className="max-w-4xl">
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
              <h1 className="text-white text-xs sm:text-sm font-medium truncate">
                {courseTitle}
              </h1>
              <p className="text-gray-400 text-xs hidden sm:block truncate">
                {courseSubtitle}
              </p>
            </div>
          </div>

          {/* Right side - Progress Circle & Avatar */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Círculo de progreso */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <svg className="transform -rotate-90 w-full h-full">
                {/* Círculo de fondo */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke="#2a2a2a"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Círculo de progreso */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke="#0ae98a"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 20 * (1 - courseProgress / 100)
                  }`}
                  className="transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy size={14} className="text-[#0ae98a] sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Avatar */}
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors cursor-pointer">
              <User size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
