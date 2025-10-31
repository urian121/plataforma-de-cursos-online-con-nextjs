"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User, Trophy, LogOut, UserCircle, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function CourseHeader({
  courseTitle,
  courseSubtitle,
  onMenuClick,
  courseProgress = 20,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <header className="bg-[#0a0a0a] px-3 sm:px-6 py-3 sm:py-2">
      <div className="flex items-center justify-between gap-3">
        {/* Left side - con max-width */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 max-w-4xl">
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

        {/* Right side - Progress Circle & Avatar (siempre a la derecha) */}
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

          {/* Avatar con Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors cursor-pointer"
            >
              <User size={20} className="text-black" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-white text-sm font-medium">Carlos Pérez</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    student@platzi.com
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/perfil"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#252525] hover:text-white transition-colors cursor-pointer"
                  >
                    <UserCircle size={18} />
                    <span className="text-sm">Mi perfil</span>
                  </Link>

                  <Link
                    href="/configuracion"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#252525] hover:text-white transition-colors cursor-pointer"
                  >
                    <Settings size={18} />
                    <span className="text-sm">Configuración</span>
                  </Link>

                  <Link
                    href="/mis-cursos"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#252525] hover:text-white transition-colors cursor-pointer"
                  >
                    <Trophy size={18} />
                    <span className="text-sm">Mis cursos</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-2"></div>

                {/* Logout */}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Aquí irá la lógica de logout
                    console.log("Cerrando sesión...");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-[#252525] hover:text-red-300 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
