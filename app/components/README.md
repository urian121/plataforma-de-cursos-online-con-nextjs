# 📦 Componentes del Proyecto

Esta carpeta contiene todos los componentes reutilizables de la aplicación.

---

## 📁 Estructura de Componentes

```
components/
├── Sidebar.js           - Navegación lateral izquierda (desktop)
├── MobileMenu.js        - Menú móvil overlay
├── CourseHeader.js      - Header del curso con título y controles
├── VideoPlayer.js       - Reproductor de video con controles
└── CoursePlaylist.js    - Lista de clases lateral derecha
```

---

## 🔧 Componentes Disponibles

### 1. **Sidebar** 
**Archivo:** `Sidebar.js`

Barra de navegación lateral izquierda (solo visible en desktop).

**Características:**
- Logo de la plataforma
- Navegación principal (5 opciones)
- Botón de notificaciones
- Oculto en mobile/tablet

**Uso:**
```jsx
import Sidebar from '../components/Sidebar';

<Sidebar />
```

---

### 2. **MobileMenu**
**Archivo:** `MobileMenu.js`

Menú lateral para dispositivos móviles y tablets.

**Props:**
- `isOpen` (boolean) - Controla si el menú está visible
- `onClose` (function) - Callback para cerrar el menú

**Características:**
- Overlay oscuro full-screen
- Menú de 256px de ancho
- Navegación con iconos y texto
- Botón de cierre (X)

**Uso:**
```jsx
import MobileMenu from '../components/MobileMenu';

const [showMenu, setShowMenu] = useState(false);

<MobileMenu 
  isOpen={showMenu} 
  onClose={() => setShowMenu(false)} 
/>
```

---

### 3. **CourseHeader**
**Archivo:** `CourseHeader.js`

Header principal del curso con título y controles.

**Props:**
- `courseTitle` (string) - Título del curso
- `courseSubtitle` (string) - Subtítulo del curso
- `onMenuClick` (function) - Callback para abrir menú móvil
- `onPlaylistToggle` (function) - Callback para toggle de playlist

**Características:**
- Logo responsive
- Título truncado
- Botón hamburger (mobile)
- Controles de idioma y chat
- Botón "Ver clases" / "Siguiente"

**Uso:**
```jsx
import CourseHeader from '../components/CourseHeader';

<CourseHeader 
  courseTitle="Mi Curso"
  courseSubtitle="Descripción del curso"
  onMenuClick={() => setShowMenu(true)}
  onPlaylistToggle={() => setShowPlaylist(!showPlaylist)}
/>
```

---

### 4. **VideoPlayer**
**Archivo:** `VideoPlayer.js`

Reproductor de video con controles completos y área de preguntas.

**Props:**
- `isPlaying` (boolean) - Estado de reproducción
- `onPlayPause` (function) - Callback para play/pause
- `currentTime` (number) - Tiempo actual en segundos
- `duration` (number) - Duración total en segundos
- `formatTime` (function) - Función para formatear tiempo (MM:SS)

**Características:**
- Gradiente decorativo con patrón de puntos
- Círculos decorativos animados
- Barra de progreso interactiva
- Controles completos:
  - Play/Pause
  - Retroceder/Adelantar 10s
  - Control de velocidad (1x)
  - Volumen
  - Subtítulos
  - Pantalla completa
- Input de preguntas con botón

**Uso:**
```jsx
import VideoPlayer from '../components/VideoPlayer';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

<VideoPlayer 
  isPlaying={isPlaying}
  onPlayPause={() => setIsPlaying(!isPlaying)}
  currentTime={5}
  duration={232}
  formatTime={formatTime}
/>
```

---

### 5. **CoursePlaylist**
**Archivo:** `CoursePlaylist.js`

Lista de lecciones del curso con progreso.

**Props:**
- `isVisible` (boolean) - Controla visibilidad (mobile/tablet)
- `onClose` (function) - Callback para cerrar (mobile/tablet)
- `courseProgress` (number) - Porcentaje de progreso (0-100)
- `sections` (array) - Array de secciones con lecciones

**Estructura de datos:**
```javascript
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
```

**Características:**
- Barra de progreso con gradiente
- Secciones agrupadas
- Check marks para lecciones completadas
- Thumbnails de lecciones
- Indicador de lección actual
- Scroll interno
- Overlay en mobile/tablet
- Fijo en desktop

**Uso:**
```jsx
import CoursePlaylist from '../components/CoursePlaylist';

<CoursePlaylist 
  isVisible={showPlaylist}
  onClose={() => setShowPlaylist(false)}
  courseProgress={25}
  sections={courseData.sections}
/>
```

---

## 🎨 Estilos y Diseño

### Colores Utilizados

- **Primario:** `#0ae98a` (Verde brillante)
- **Secundarios:** `#7b68ee` (Purple), `#da70d6` (Violet)
- **Backgrounds:** `#0a0a0a`, `#1a1a1a`
- **Borders:** `gray-800`

### Responsive

Todos los componentes son 100% responsive:
- **Mobile:** `< 640px`
- **Tablet:** `640px - 1023px`
- **Desktop:** `≥ 1024px`

---

## 🔄 Flujo de Datos

```
CursoPage (page.js)
    │
    ├─── courseData (data/courseData.js)
    │
    ├─── Sidebar
    ├─── MobileMenu (isOpen, onClose)
    ├─── CourseHeader (title, subtitle, callbacks)
    ├─── VideoPlayer (playback state, callbacks)
    └─── CoursePlaylist (visibility, progress, sections)
```

---

## 📝 Convenciones

### Nombres de Archivos
- PascalCase para componentes: `MiComponente.js`
- camelCase para datos/utils: `courseData.js`

### Props
- Descriptivos y claros
- Prefijo `on` para callbacks: `onClose`, `onClick`
- Prefijo `is`/`has` para booleanos: `isOpen`, `hasError`

### Estilos
- Tailwind CSS utility-first
- Responsive classes: `sm:`, `md:`, `lg:`
- Colores consistentes con la paleta

---

## 🚀 Mejoras Futuras

### Componentes Adicionales
- [ ] `Notification` - Sistema de notificaciones
- [ ] `Modal` - Modales reutilizables
- [ ] `Tooltip` - Tooltips informativos
- [ ] `ProgressBar` - Barra de progreso standalone
- [ ] `Avatar` - Avatar de usuario
- [ ] `SearchBar` - Búsqueda de cursos
- [ ] `CourseCard` - Tarjeta de curso
- [ ] `FilterPanel` - Panel de filtros

### Optimizaciones
- [ ] Memoización de componentes pesados
- [ ] Lazy loading de componentes
- [ ] Skeleton loaders
- [ ] Error boundaries
- [ ] Tests unitarios

---

## 📦 Dependencias

Estos componentes utilizan:
- **React** (hooks: useState)
- **Next.js** (Image component)
- **Lucide React** (iconos)
- **Tailwind CSS** (estilos)

---

## 🤝 Contribuir

Al crear nuevos componentes:

1. **Ubicación:** Crear archivo en `app/components/`
2. **Formato:** PascalCase, export default
3. **Props:** Documentar props requeridos
4. **Responsive:** Asegurar adaptabilidad
5. **Cursor:** Agregar `cursor-pointer` a interactivos
6. **Colores:** Usar paleta del proyecto
7. **Documentación:** Actualizar este README

---

## 📄 Ejemplo de Nuevo Componente

```jsx
// app/components/MiComponente.js
import { IconoEjemplo } from 'lucide-react';

export default function MiComponente({ 
  titulo, 
  onClick, 
  isActivo = false 
}) {
  return (
    <div className="p-4 bg-[#1a1a1a] rounded-lg">
      <h3 className="text-white text-sm font-semibold mb-2">
        {titulo}
      </h3>
      <button 
        onClick={onClick}
        className={`
          px-4 py-2 rounded-lg cursor-pointer
          ${isActivo 
            ? 'bg-[#0ae98a] text-black' 
            : 'bg-gray-800 text-white'
          }
        `}
      >
        <IconoEjemplo size={20} />
      </button>
    </div>
  );
}
```

**Documentar en README:**
```markdown
### MiComponente
**Props:**
- `titulo` (string, required)
- `onClick` (function, required)
- `isActivo` (boolean, default: false)
```

---

**Última actualización:** Octubre 30, 2025  
**Mantenedor:** Equipo de Desarrollo

