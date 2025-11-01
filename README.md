# 🎓 Plataforma de Cursos Online - Estilo Platzi

Edunex, Educa

Plataforma moderna de cursos online construida con **Next.js 16**, **Tailwind CSS** y **PostgreSQL**. Inspirada en Platzi, diseñada para ofrecer una experiencia de aprendizaje excepcional.
Incluye gestión de usuarios, cursos, secciones, lecciones en video, progreso de estudiantes, comentarios y sistema de autenticación.


npm i drizzle-orm dotenv -E && npm i -D drizzle-kit -E 
npm install pg


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

### Niveles de Usuario

| Rol            | Descripción        | Permisos                                   |
| -------------- | ------------------ | ------------------------------------------ |
| **student**    | Estudiante regular | Ver cursos, comentar, hacer progreso       |
| **instructor** | Creador de cursos  | Crear/editar cursos, responder comentarios |
| **admin**      | Administrador      | Acceso total a la plataforma               |

### Base de Datos en Producción

Opciones recomendadas:
- **Supabase** (PostgreSQL managed, tier gratuito generoso)
- **Railway** (PostgreSQL managed, fácil setup)
- **Vercel Postgres** (integración nativa)
- **AWS RDS** (para producción enterprise)


<div align="center">
**⭐ Si te gusta este proyecto, dale una estrella! ⭐**

Hecho con ❤️ y ☕

</div>
