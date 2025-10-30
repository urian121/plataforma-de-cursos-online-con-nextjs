'use client';

import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VideoPlayer({ 
  videoId,
  isPlaying, 
  onPlayPause, 
  currentTime, 
  duration, 
  formatTime,
  onProgress,
  onDuration
}) {
  const [key, setKey] = useState(0);

  // Forzar recreación del iframe cuando cambia el video
  useEffect(() => {
    if (videoId) {
      console.log('Cambiando a video:', videoId);
      setKey(prev => prev + 1);
    }
  }, [videoId]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Video container */}
      <div className="flex-1 relative overflow-hidden bg-black">
        {videoId ? (
          <iframe
            key={key}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1`}
            title="Video del curso"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        ) : (
          // Fallback: Gradiente decorativo cuando no hay video
          <div className="absolute inset-0 bg-gradient-to-br from-[#4169e1] via-[#7b68ee] to-[#da70d6]">
            {/* Patrón de puntos */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle, #4169e1 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            
            {/* Círculos decorativos */}
            <div className="absolute top-[15%] right-[25%] w-20 h-20 sm:w-32 sm:h-32 bg-[#9acd32] rounded-full blur-3xl opacity-80"></div>
            <div className="absolute top-[25%] right-[15%] w-16 h-16 sm:w-24 sm:h-24 bg-[#7cfc00] rounded-full blur-2xl opacity-70"></div>
            
            {/* Mensaje */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Play size={64} className="mx-auto mb-4" />
                <p className="text-lg">Selecciona una lección para comenzar</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input de preguntas */}
      <div className="bg-[#1a1a1a] border-t border-gray-800 p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="¿Tienes preguntas sobre la clase?"
            className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0ae98a] transition-colors"
          />
          <button className="bg-[#0ae98a] hover:bg-[#09d47d] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0 cursor-pointer">
            Preguntar
          </button>
        </div>
      </div>
    </div>
  );
}
