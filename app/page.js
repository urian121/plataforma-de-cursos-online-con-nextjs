import Link from "next/link";
import { BookOpen, Video, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0ae98a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0ae98a]/50">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-white rounded-lg transform rotate-45"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Plataforma de <span className="text-[#0ae98a]">Cursos Online</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
            Aprende y crece con nuestros cursos especializados
          </p>
          <Link 
            href="/curso"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#0ae98a] hover:bg-[#09d47d] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#0ae98a]/30 cursor-pointer"
          >
            <Video size={20} className="sm:w-6 sm:h-6" />
            Ver Curso Demo
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-[#0ae98a]/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-[#0ae98a]" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Contenido de Calidad</h3>
            <p className="text-gray-400 text-sm">
              Cursos estructurados con material educativo de primer nivel
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-[#7b68ee]/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-[#7b68ee]" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Aprende a tu Ritmo</h3>
            <p className="text-gray-400 text-sm">
              Acceso ilimitado a todos los cursos cuando quieras
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-colors sm:col-span-2 md:col-span-1 cursor-pointer">
            <div className="w-12 h-12 bg-[#da70d6]/20 rounded-lg flex items-center justify-center mb-4">
              <Award className="text-[#da70d6]" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Certificados</h3>
            <p className="text-gray-400 text-sm">
              Obtén certificados al completar cada curso exitosamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
