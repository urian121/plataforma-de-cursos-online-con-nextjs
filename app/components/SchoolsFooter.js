import Link from "next/link";
import {
  Box,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function SchoolsFooter() {
  return (
    <footer className="relative bg-surface-3 border-t border-white/5">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Columna 1: Logo y descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Box size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">Kodemy</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La escuela de tecnología de Latinoamérica. Aprende las habilidades
              del futuro con cursos online de programación, marketing, diseño y
              más.
            </p>
            {/* Redes sociales */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Producto</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/cursos"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/rutas"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Rutas de aprendizaje
                </Link>
              </li>
              <li>
                <Link
                  href="/certificados"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Certificados
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Kodemy para empresas
                </Link>
              </li>
              <li>
                <Link
                  href="/precios"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Comunidad */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Comunidad</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="/foro"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Foro
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/conferencias"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Conferencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Empresa */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/carreras"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/prensa"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Prensa
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/ayuda"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Centro de ayuda
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-white/5"></div>

      {/* Copyright y legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Kodemy. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terminos"
              className="text-gray-500 hover:text-primary text-sm transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className="text-gray-500 hover:text-primary text-sm transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-primary text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
