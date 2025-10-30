import Image from 'next/image';
import { CheckCircle2, X, Play } from 'lucide-react';

export default function CoursePlaylist({ 
  isVisible, 
  onClose, 
  courseProgress, 
  sections,
  onLessonClick,
  currentVideoId
}) {
  return (
    <aside className={`
      ${isVisible ? 'translate-x-0' : 'translate-x-full'}
      fixed lg:relative inset-y-0 right-0 z-40
      w-full sm:w-96 
      bg-[#0a0a0a] border-l border-gray-800 
      flex flex-col overflow-hidden
      transition-transform duration-300 ease-in-out
      lg:translate-x-0
    `}>
      {/* Header del progreso */}
      <div className="p-4 sm:p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-sm font-semibold">Progreso del curso</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors lg:hidden cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0ae98a] rounded-full transition-all"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
          <span className="text-white text-sm font-medium">{courseProgress}%</span>
        </div>
      </div>

      {/* Lista de clases */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {/* Header de sección */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ae98a] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} className="text-black" />
                </div>
                <h3 className="text-white text-sm font-medium">{section.name}</h3>
              </div>
            </div>

            {/* Lista de lecciones */}
            {section.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onLessonClick && onLessonClick(lesson.videoId)}
                className={`
                  w-full px-4 sm:px-6 py-3 sm:py-4 flex items-start gap-3 
                  hover:bg-[#1a1a1a] transition-colors border-b border-gray-800/50 text-left cursor-pointer
                  ${currentVideoId === lesson.videoId ? 'bg-[#1a1a1a]' : ''}
                `}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gray-800 rounded overflow-hidden relative">
                    <Image 
                      src={lesson.thumbnail} 
                      alt={lesson.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback si la imagen falla
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }}
                    />
                  </div>
                  {currentVideoId === lesson.videoId && (
                    <div className="absolute inset-0 bg-[#0ae98a]/20 rounded flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0ae98a] rounded-full flex items-center justify-center">
                        <Play size={12} className="text-black ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    {lesson.completed ? (
                      <CheckCircle2 size={18} className="text-[#0ae98a] flex-shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gray-400 text-xs">{lesson.id}</span>
                      </div>
                    )}
                          <h4 className={`text-xs sm:text-sm leading-tight ${
                            currentVideoId === lesson.videoId
                              ? 'text-[#0ae98a] font-medium' 
                              : lesson.completed 
                                ? 'text-white' 
                                : 'text-gray-400'
                          }`}>
                      {lesson.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 ml-7">
                    <span className="text-gray-500 text-xs">{lesson.duration}</span>
                    {lesson.completed && (
                      <span className="hidden sm:flex text-[#0ae98a] text-xs items-center gap-1">
                        <CheckCircle2 size={12} />
                        Clase vista
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

