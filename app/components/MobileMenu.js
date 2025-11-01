import Link from "next/link";
import { Home, Grid3x3, BookOpen, Settings, Bell, X } from "lucide-react";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 lg:hidden" onClick={onClose}>
      <aside
        className="w-64 h-full bg-surface-2 border-r border-gray-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={onClose}
            className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <div className="w-6 h-6 border-2 border-white rounded transform rotate-45"></div>
          </Link>
          <button onClick={onClose} className="text-white cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer">
            <Home size={20} />
            <span>Inicio</span>
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer">
            <Grid3x3 size={20} />
            <span>Explorar</span>
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer">
            <BookOpen size={20} />
            <span>Mis Cursos</span>
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer">
            <Settings size={20} />
            <span>Configuración</span>
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:bg-white/10 p-3 rounded-lg transition-colors cursor-pointer">
            <Bell size={20} />
            <span>Notificaciones</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}
