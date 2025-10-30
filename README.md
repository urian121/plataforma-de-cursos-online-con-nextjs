# 🎓 Plataforma de Cursos Online - Next.js

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Responsive](https://img.shields.io/badge/Responsive-100%25-success?style=flat-square)

Una plataforma moderna y completamente responsive para visualizar cursos online con un diseño elegante y funcional.

---

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz oscura con gradientes y efectos glassmorphism
- 📱 **100% Responsive**: Adaptado perfectamente a móviles, tablets y desktop
- ⚡ **Alto Rendimiento**: Optimizado con Next.js 16 y React 19
- 🎬 **Video Player**: Reproductor personalizado con controles completos
- 📊 **Sistema de Progreso**: Tracking visual del avance en el curso
- 🎯 **UX Optimizada**: Navegación intuitiva y fluida
- 🔍 **SEO Friendly**: Metadata optimizada y estructura semántica
- ♿ **Accesible**: Cumple con estándares WCAG AA
- 🚀 **JavaScript Mínimo**: Solo lo esencial para mejor rendimiento

---

## 🖼️ Capturas de Pantalla

### 🖥️ Desktop
- Landing page con hero section y características
- Reproductor de curso con sidebar de navegación
- Lista de lecciones con progreso visual

### 📱 Mobile
- Diseño adaptativo con menús overlay
- Controles de video optimizados para touch
- Navegación hamburger menu

---

## 🛠️ Tecnologías

### Core
- **Next.js 16.0.1** - Framework de React con SSR
- **React 19.2.0** - Librería de UI
- **Tailwind CSS 4** - Framework de CSS utility-first

### Iconos
- **Lucide React** - Librería de iconos ligera y moderna (~50KB)

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **PostCSS** - Procesador de CSS

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd gestor-contenidos-nextjs

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📂 Estructura del Proyecto

```
gestor-contenidos-nextjs/
├── app/
│   ├── components/           # ✨ Componentes reutilizables
│   │   ├── Sidebar.js
│   │   ├── MobileMenu.js
│   │   ├── CourseHeader.js
│   │   ├── VideoPlayer.js
│   │   ├── CoursePlaylist.js
│   │   └── README.md
│   ├── data/                 # ✨ Datos y configuraciones
│   │   └── courseData.js
│   ├── curso/
│   │   └── page.js           # Página del reproductor (refactorizado)
│   ├── globals.css           # Estilos globales
│   ├── layout.js             # Layout principal
│   └── page.js               # Landing page
├── docs/
│   ├── ARQUITECTURA_COMPONENTES.md  # ✨ Arquitectura modular
│   ├── DISEÑO_RESPONSIVE.md         # Documentación responsive
│   ├── ESTRUCTURA_PROYECTO.md       # Arquitectura del proyecto
│   └── CHANGELOG.md                 # Registro de cambios
├── public/                   # Archivos estáticos
├── next.config.mjs           # Configuración de Next.js
└── package.json              # Dependencias
```

---

## 📱 Diseño Responsive

### Breakpoints

| Dispositivo | Ancho          | Breakpoint |
| ----------- | -------------- | ---------- |
| Mobile      | < 640px        | base       |
| Tablet      | 640px - 1023px | `sm:`      |
| Desktop     | ≥ 1024px       | `lg:`      |

### Características Responsive

#### Mobile (< 640px)
- Menú hamburger
- Sidebar overlay full-screen
- Controles de video simplificados
- Lista de clases en overlay

#### Tablet (640px - 1023px)
- Controles completos visibles
- Sidebar overlay de 384px
- Grid de 2 columnas

#### Desktop (≥ 1024px)
- Sidebars fijos (64px + 384px)
- Todos los controles visibles
- Grid de 3 columnas
- Layout completo visible

Ver documentación completa en [`docs/DISEÑO_RESPONSIVE.md`](docs/DISEÑO_RESPONSIVE.md)

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Primarios */
Primary Green: #0ae98a  /* ✨ Color principal: botones, enlaces, acentos */
Purple:        #7b68ee  /* Gradientes, acentos secundarios */
Violet:        #da70d6  /* Gradientes, acentos secundarios */

/* Backgrounds */
Dark:          #0a0a0a  /* Fondo principal */
Dark Card:     #1a1a1a  /* Cards, sidebars */

/* Decorativos */
Green Lime:    #9acd32  /* Elementos decorativos */
Green Bright:  #7cfc00  /* Elementos decorativos */
```

### Tipografía

- **Fuentes**: Geist Sans, Geist Mono
- **Tamaños**: xs (12px) → 5xl (48px)
- **Responsive**: Tamaños adaptativos por breakpoint

---

## 🎯 Páginas

### `/` - Landing Page
- Hero section con logo y título
- Call-to-action principal
- Grid de características:
  - 📚 Contenido de Calidad
  - 👥 Aprende a tu Ritmo
  - 🏆 Certificados

### `/curso` - Reproductor de Curso
- Video player con gradiente personalizado
- Controles completos:
  - ▶️ Play/Pause
  - ⏮️⏭️ Retroceder/Adelantar
  - 🔊 Control de volumen
  - ⚙️ Velocidad de reproducción
  - 📝 Subtítulos
  - ⛶ Pantalla completa
- Sidebar de navegación (izquierda)
- Lista de lecciones (derecha)
- Barra de progreso
- Input para preguntas

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Servidor de producción
npm start

# Linting
npm run lint
```

---

## 🔧 Configuración

### Next.js Config (`next.config.mjs`)

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'placehold.co' }
    ],
    unoptimized: true
  }
};
```

Permite imágenes externas para placeholders y optimización.

---

## 📊 Estructura de Datos

### Curso

```javascript
{
  title: "Título del curso",
  subtitle: "Subtítulo descriptivo",
  progress: 6, // Porcentaje
  sections: [
    {
      name: "Nombre de la sección",
      lessons: [
        {
          id: 1,
          title: "Título de la lección",
          duration: "03:52",
          completed: true,
          thumbnail: "/path/to/image"
        }
      ]
    }
  ]
}
```

---

## 🎨 Iconos con Lucide React

```javascript
import { Play, Pause, Volume2 } from 'lucide-react';

<Play size={24} />
<Volume2 size={20} className="text-white" />
```

**Ventajas:**
- ⚡ Muy ligera (~50KB)
- 🎨 Totalmente personalizable
- 📦 Tree-shaking automático
- 🔄 Iconos SVG optimizados

---

## 🚀 Optimizaciones

### Performance
- ✅ JavaScript mínimo (solo estados UI)
- ✅ CSS utility-first con Tailwind
- ✅ Iconos SVG ligeros
- ✅ Optimización de imágenes con Next.js
- ✅ Tree-shaking automático

### SEO
- ✅ Metadata en español
- ✅ Estructura HTML semántica
- ✅ Alt texts en imágenes
- ✅ URLs descriptivas

### Accesibilidad
- ✅ Contraste WCAG AA
- ✅ Botones touch-friendly (44x44px)
- ✅ Navegación por teclado
- ✅ Focus states visibles

---

## 📚 Documentación

- 📖 [`ARQUITECTURA_COMPONENTES.md`](docs/ARQUITECTURA_COMPONENTES.md) - Arquitectura modular y componentes
- 📖 [`DISEÑO_RESPONSIVE.md`](docs/DISEÑO_RESPONSIVE.md) - Guía completa del diseño responsive
- 📖 [`ESTRUCTURA_PROYECTO.md`](docs/ESTRUCTURA_PROYECTO.md) - Arquitectura del proyecto
- 📖 [`components/README.md`](app/components/README.md) - Documentación de componentes
- 📖 [`CHANGELOG.md`](docs/CHANGELOG.md) - Registro de cambios

---

## 🔮 Roadmap

### Próximas Funcionalidades

- [ ] Backend API para datos reales
- [ ] Sistema de autenticación
- [ ] Reproducción de video real (YouTube/Vimeo)
- [ ] Guardado de progreso (localStorage/DB)
- [ ] Sistema de comentarios
- [ ] Búsqueda y filtros de cursos
- [ ] Perfil de usuario
- [ ] Certificados descargables
- [ ] Notificaciones
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🙏 Reconocimientos

- [Next.js](https://nextjs.org/) - Framework increíble
- [Tailwind CSS](https://tailwindcss.com/) - Estilos utility-first
- [Lucide Icons](https://lucide.dev/) - Iconos hermosos
- [Vercel](https://vercel.com/) - Hosting y deployment

---

## 📞 Soporte

Para preguntas o soporte, revisa la documentación en `/docs` o abre un issue.

---

**Hecho con ❤️ usando Next.js y Tailwind CSS**

