"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-3/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 200" width="300" height="100" role="img" aria-label="Kodemy logo">
                <text x="50" y="130" fontFamily="Inter, Roboto, Arial, sans-serif" fontWeight="700" fontSize="72" fill="#ffffff" letterSpacing="-2">
                  <tspan>&lt;</tspan><tspan fill="#0ae98a" fontSize="78">K</tspan><tspan>odemy</tspan><tspan fill="#0ae98a">/&gt;</tspan>
                </text>
              </svg>
            </Link>

            {/* Search bar - desktop */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="¿Qué quieres aprender?"
                className="bg-surface-2 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-64 lg:w-80 border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/cursos"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Cursos
              </Link>
              <Link
                href="/precios"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Precios
              </Link>
            </div>

            {/* Acceder & Registro Buttons */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all text-sm font-semibold"
            >
              Acceder
            </Link>
            <Link
              href="/registro"
              className="hidden sm:block px-4 py-2 rounded-lg bg-primary text-black hover:bg-primary/90 transition-all text-sm font-semibold"
            >
              Registrarse
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <div className="flex items-center relative">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="¿Qué quieres aprender?"
              className="bg-surface-2 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-full border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-surface-3 border-t border-white/5 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {/* Links */}
              <Link
                href="/cursos"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-base font-medium"
              >
                Cursos
              </Link>
              <Link
                href="/precios"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-base font-medium"
              >
                Precios
              </Link>

              {/* Divider */}
              <div className="border-t border-white/10 my-4"></div>

              {/* Buttons */}
              <Link
                href="/registro"
                onClick={() => setShowMobileMenu(false)}
                className="block text-center px-4 py-3 rounded-lg bg-primary text-black hover:bg-primary/90 transition-all text-base font-semibold"
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

