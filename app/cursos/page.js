'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import CourseHeader from '../components/CourseHeader';
import VideoPlayer from '../components/VideoPlayer';
import CoursePlaylist from '../components/CoursePlaylist';
import { courseData } from '../data/courseData';

export default function CursoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState(courseData.sections[0]?.lessons[0]?.videoId || null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (playedSeconds) => {
    setCurrentTime(playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleLessonClick = (videoId) => {
    setCurrentVideoId(videoId);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar izquierdo - Desktop */}
      <Sidebar />

      {/* Menú móvil overlay */}
      <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)} 
      />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CourseHeader 
          courseTitle={courseData.title}
          courseSubtitle={courseData.subtitle}
          onMenuClick={() => setShowMobileMenu(true)}
          onPlaylistToggle={() => setShowPlaylist(!showPlaylist)}
        />

        <div className="flex-1 flex overflow-hidden relative">
          {/* Video player */}
          <VideoPlayer 
            videoId={currentVideoId}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />

          {/* Sidebar derecho - Lista de clases */}
          <CoursePlaylist 
            isVisible={showPlaylist}
            onClose={() => setShowPlaylist(false)}
            courseProgress={courseData.progress}
            sections={courseData.sections}
            onLessonClick={handleLessonClick}
            currentVideoId={currentVideoId}
          />
        </div>
      </main>
    </div>
  );
}
