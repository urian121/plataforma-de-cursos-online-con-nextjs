# 🎓 Plataforma de Cursos Online - Estilo Platzi

Edunex, Educa

Plataforma moderna de cursos online construida con **Next.js 14**, **Tailwind CSS** y **PostgreSQL**. Inspirada en Platzi, diseñada para ofrecer una experiencia de aprendizaje excepcional.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Características

### 🎯 Para Estudiantes
- ✅ Interfaz moderna y responsiva
- ✅ Reproductor de video integrado (YouTube, Vimeo, custom)
- ✅ Tracking de progreso por lección
- ✅ Sistema de comentarios y preguntas en tiempo real
- ✅ Certificados al completar cursos
- ✅ Lista de deseos y favoritos
- ✅ Búsqueda avanzada de cursos

### 👨‍🏫 Para Instructores
- ✅ Panel de creación de cursos
- ✅ Organización por secciones y lecciones
- ✅ Gestión de videos y miniaturas
- ✅ Responder comentarios de estudiantes
- ✅ Analytics de progreso de estudiantes

### 🛠️ Técnicas
- ✅ Next.js 14 con App Router
- ✅ Server Components y Client Components
- ✅ Tailwind CSS para estilos
- ✅ PostgreSQL con triggers y funciones
- ✅ Sistema de autenticación JWT
- ✅ API Routes optimizadas
- ✅ SEO optimizado
- ✅ Responsive Design (Mobile-first)

---

## 🖼️ Capturas de Pantalla

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page)

### Reproductor de Curso
![Course Player](https://via.placeholder.com/800x400?text=Course+Player)

### Panel de Estudiante
![Dashboard](https://via.placeholder.com/800x400?text=Student+Dashboard)

---

## 🏗️ Estructura del Proyecto

```
gestor-contenidos-nextjs/
├── app/
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── SchoolsFooter.js
│   │   ├── Sidebar.js
│   │   ├── CourseHeader.js
│   │   ├── VideoPlayer.js
│   │   ├── CoursePlaylist.js
│   │   └── MobileMenu.js
│   ├── cursos/            # Página del reproductor
│   │   └── page.js
│   ├── login/             # Autenticación
│   │   └── page.js
│   ├── registro/
│   │   └── page.js
│   ├── data/              # Datos estáticos
│   │   └── courseData.js
│   ├── api/               # API Routes (próximamente)
│   ├── layout.js          # Layout principal
│   ├── page.js            # Landing page
│   └── globals.css        # Estilos globales
├── public/                # Archivos estáticos
├── lib/                   # Utilidades y configuración
│   └── db.js              # Conexión a PostgreSQL
├── database_schema.sql    # Schema completo de PostgreSQL
├── DATABASE.md            # Documentación de la BD
├── INSTALACION_DB.md      # Guía de instalación
├── .env.local             # Variables de entorno
├── package.json
└── README.md
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd gestor-contenidos-nextjs
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

**Ver guía completa:** [`INSTALACION_DB.md`](INSTALACION_DB.md)

```bash
# Crear la base de datos
createdb platzi_courses

# Ejecutar el schema
psql -U postgres -d platzi_courses -f database_schema.sql
```

### 4. Configurar variables de entorno

Crear archivo `.env.local`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/platzi_courses

# JWT
JWT_SECRET=tu_secret_key_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📊 Base de Datos

### Estructura de Tablas

La plataforma utiliza PostgreSQL con 11 tablas principales:

| Tabla                | Descripción                                  |
| -------------------- | -------------------------------------------- |
| `users`              | Usuarios (estudiantes, instructores, admins) |
| `user_sessions`      | Sesiones y tokens de autenticación           |
| `courses`            | Información de cursos                        |
| `sections`           | Secciones que agrupan lecciones              |
| `lessons`            | Lecciones/videos individuales                |
| `enrollments`        | Inscripciones de estudiantes                 |
| `progress`           | Progreso por lección                         |
| `comments`           | Comentarios y preguntas                      |
| `comment_likes`      | Likes en comentarios                         |
| `comment_replies`    | Respuestas a comentarios                     |
| `course_instructors` | Relación cursos-instructores                 |

### Documentación Completa

📖 **Ver documentación completa:** [`DATABASE.md`](DATABASE.md)

### Diagrama de Relaciones

```
users
  ├── enrollments → courses
  │   └── progress → lessons
  ├── comments → lessons
  │   ├── comment_likes
  │   └── comment_replies
  └── user_sessions

courses
  ├── sections
  │   └── lessons
  └── course_instructors → users
```

---

## 🎨 Diseño y Estilos

### Paleta de Colores

```css
/* Colores principales */
--primary: #0ae98a;      /* Verde Platzi */
--background: #1e2229;   /* Gris oscuro */
--card-bg: #0a0a0a;      /* Negro para cards */
--sidebar-bg: #13161c;   /* Sidebar y navbar */
--text-primary: #ffffff;
--text-secondary: #d1d5db;
```

### Componentes Principales

#### Navbar
- Fixed top navbar con búsqueda
- Menú móvil responsive
- Links de autenticación

#### Hero
- Sección principal con gradientes
- Buscador prominente
- Call-to-action

#### VideoPlayer
- Reproductor de video integrado
- Sección de comentarios toggleable
- Tracking de progreso

#### CoursePlaylist
- Lista de lecciones con miniaturas
- Indicadores de progreso
- Navegación entre lecciones

---

## 🔧 Tecnologías

| Categoría         | Tecnología                             |
| ----------------- | -------------------------------------- |
| **Frontend**      | Next.js 14, React 18                   |
| **Estilos**       | Tailwind CSS                           |
| **Base de Datos** | PostgreSQL 14+                         |
| **Autenticación** | JWT, bcrypt                            |
| **Iconos**        | Lucide React                           |
| **Videos**        | YouTube API, Vimeo (configurable)      |
| **ORM**           | node-postgres (pg) / Prisma (opcional) |

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start

# Linting
npm run lint

# Test de base de datos
node test_db.js
```

---

## 🔐 Autenticación

### Niveles de Usuario

| Rol            | Descripción        | Permisos                                   |
| -------------- | ------------------ | ------------------------------------------ |
| **student**    | Estudiante regular | Ver cursos, comentar, hacer progreso       |
| **instructor** | Creador de cursos  | Crear/editar cursos, responder comentarios |
| **admin**      | Administrador      | Acceso total a la plataforma               |

### Flujo de Autenticación

1. Usuario se registra en `/registro`
2. Se crea usuario en tabla `users` (password hasheado con bcrypt)
3. Usuario hace login en `/login`
4. Se genera JWT token
5. Token se guarda en `user_sessions`
6. Token se incluye en headers de API requests

---

## 🌐 Deploy a Producción

### Vercel (Recomendado)

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel dashboard
```

### Base de Datos en Producción

Opciones recomendadas:
- **Supabase** (PostgreSQL managed, tier gratuito generoso)
- **Railway** (PostgreSQL managed, fácil setup)
- **Vercel Postgres** (integración nativa)
- **AWS RDS** (para producción enterprise)

**Ver guía completa:** [`INSTALACION_DB.md`](INSTALACION_DB.md#-deployment-en-producción)

---

## 📖 Guías y Documentación

| Documento                                    | Descripción                                   |
| -------------------------------------------- | --------------------------------------------- |
| [`DATABASE.md`](DATABASE.md)                 | Documentación completa de la base de datos    |
| [`INSTALACION_DB.md`](INSTALACION_DB.md)     | Guía paso a paso de instalación de PostgreSQL |
| [`database_schema.sql`](database_schema.sql) | Script SQL ejecutable                         |

---

## 🛣️ Roadmap

### Fase 1 - MVP (Actual) ✅
- [x] Landing page responsiva
- [x] Sistema de autenticación básico
- [x] Reproductor de video
- [x] Lista de lecciones
- [x] Tracking de progreso
- [x] Comentarios y preguntas

### Fase 2 - Próximas Features
- [ ] Panel de administrador
- [ ] Panel de instructor
- [ ] Sistema de pagos (Stripe/MercadoPago)
- [ ] Certificados generados automáticamente
- [ ] Notificaciones en tiempo real
- [ ] Sistema de calificaciones/reviews
- [ ] Búsqueda avanzada con filtros

### Fase 3 - Optimizaciones
- [ ] Server-side rendering optimizado
- [ ] Cache con Redis
- [ ] CDN para videos
- [ ] Progressive Web App (PWA)
- [ ] Analytics avanzado
- [ ] A/B testing

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un [issue](https://github.com/tu-usuario/tu-repo/issues) con:

- Descripción del bug
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Entorno (OS, Browser, Node version)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@example.com

---

## 🙏 Agradecimientos

- Diseño inspirado en [Platzi](https://platzi.com)
- Iconos por [Lucide](https://lucide.dev)
- Framework [Next.js](https://nextjs.org)
- Database [PostgreSQL](https://www.postgresql.org)

---

## 📞 Soporte

¿Necesitas ayuda? 

- 📧 Email: soporte@tudominio.com
- 💬 Discord: [Tu servidor](https://discord.gg/tu-server)
- 📖 Docs: [Documentación](https://docs.tudominio.com)

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella! ⭐**

Hecho con ❤️ y ☕

</div>
