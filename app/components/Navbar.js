"use client";

import { Search, Box, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13161c]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Box size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">Platzi</span>
            </Link>

            {/* Search bar - desktop */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="¿Qué quieres aprender?"
                className="bg-[#1a1e26] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-64 lg:w-80 border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
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
                href="/empresas"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Empresas
              </Link>
              <Link
                href="/conf"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Conf
              </Link>
              <Link
                href="/precios"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Precios
              </Link>
            </div>

            {/* Acceder Button */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all text-sm font-semibold"
            >
              Acceder
            </Link>

            {/* Mobile menu button */}
            <button className="lg:hidden text-white p-2">
              <Menu size={24} />
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
              className="bg-[#1a1e26] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-full border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

