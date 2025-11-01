# 🗄️ Estructura de Base de Datos - Plataforma de Cursos Online


## 🏗️ Diagrama de Relaciones

```
users (usuarios)
  ├── enrollments (inscripciones a cursos)
  │   └── progress (progreso por lección)
  ├── comments (comentarios/preguntas)
  │   ├── comment_likes (likes)
  │   └── comment_replies (respuestas)
  └── user_sessions (sesiones)

courses (cursos)
  ├── sections (secciones del curso)
  │   └── lessons (lecciones/videos)
  ├── enrollments
  └── course_instructors (instructores)
```

## 📊 Tablas y Estructura

### 1. **users** - Tabla de Usuarios

Almacena información de todos los usuarios de la plataforma.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'student', -- student, instructor, admin
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

**Niveles de Usuario:**
- `student`: Estudiante regular
- `instructor`: Instructor/Creador de cursos
- `admin`: Administrador de la plataforma

---

### 2. **user_sessions** - Sesiones de Usuario

Maneja sesiones activas y tokens de autenticación.

```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  refresh_token VARCHAR(500),
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
```

---

### 3. **courses** - Tabla de Cursos

Información principal de cada curso.

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  cover_image_url TEXT, -- Imagen de portada del curso
  trailer_video_url TEXT, -- Video promocional del curso
  level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
  category VARCHAR(100),
  tags TEXT[], -- Array de tags
  price DECIMAL(10, 2) DEFAULT 0.00,
  is_published BOOLEAN DEFAULT false,
  total_duration_minutes INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_courses_created_by ON courses(created_by);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_courses_created_at ON courses(created_at DESC);
```

**Niveles de Curso:**
- `beginner`: Principiante
- `intermediate`: Intermedio
- `advanced`: Avanzado

---

### 4. **sections** - Secciones del Curso

Agrupa las lecciones en secciones temáticas.

```sql
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL, -- Orden de la sección en el curso
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, order_index)
);

-- Índices
CREATE INDEX idx_sections_course_id ON sections(course_id);
CREATE INDEX idx_sections_order ON sections(course_id, order_index);
```

---

### 5. **lessons** - Lecciones/Videos

Cada lección individual con su video.

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_id VARCHAR(255) NOT NULL, -- ID del video (YouTube, Vimeo, etc.)
  video_provider VARCHAR(50) DEFAULT 'youtube', -- youtube, vimeo, bunny, custom
  thumbnail_url TEXT, -- Miniatura del video
  duration_seconds INTEGER, -- Duración en segundos
  order_index INTEGER NOT NULL, -- Orden de la lección en la sección
  is_preview BOOLEAN DEFAULT false, -- Si es preview gratuito
  resources_url TEXT, -- URLs de recursos adicionales (PDF, archivos)
  transcript TEXT, -- Transcripción del video
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(section_id, order_index)
);

-- Índices
CREATE INDEX idx_lessons_section_id ON lessons(section_id);
CREATE INDEX idx_lessons_order ON lessons(section_id, order_index);
CREATE INDEX idx_lessons_video_id ON lessons(video_id);
```

**Proveedores de Video Soportados:**
- `youtube`: YouTube
- `vimeo`: Vimeo
- `bunny`: Bunny.net Stream
- `custom`: URL personalizada

---

### 6. **enrollments** - Inscripciones a Cursos

Relación entre usuarios y cursos (inscripciones).

```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active', -- active, completed, paused, cancelled
  progress_percentage INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  last_accessed_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- Índices
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_enrollments_enrolled_at ON enrollments(enrolled_at DESC);
```

**Estados de Inscripción:**
- `active`: Activo
- `completed`: Completado
- `paused`: Pausado
- `cancelled`: Cancelado

---

### 7. **progress** - Progreso por Lección

Tracking detallado del progreso del estudiante en cada lección.

```sql
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  last_position_seconds INTEGER DEFAULT 0, -- Última posición del video en segundos
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(enrollment_id, lesson_id)
);

-- Índices
CREATE INDEX idx_progress_enrollment_id ON progress(enrollment_id);
CREATE INDEX idx_progress_lesson_id ON progress(lesson_id);
CREATE INDEX idx_progress_completed ON progress(is_completed);
```

---

### 8. **comments** - Comentarios y Preguntas

Comentarios/preguntas de estudiantes en las lecciones.

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  video_timestamp_seconds INTEGER, -- Momento del video donde se hizo el comentario
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false, -- Comentario destacado
  is_instructor_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_likes ON comments(likes_count DESC);
```

---

### 9. **comment_likes** - Likes en Comentarios

Sistema de likes para comentarios.

```sql
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(comment_id, user_id)
);

-- Índices
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);
```

---

### 10. **comment_replies** - Respuestas a Comentarios

Respuestas a comentarios (sistema de hilos).

```sql
CREATE TABLE comment_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_instructor_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_replies_comment_id ON comment_replies(comment_id);
CREATE INDEX idx_replies_user_id ON comment_replies(user_id);
CREATE INDEX idx_replies_created_at ON comment_replies(created_at ASC);
```

---

### 11. **course_instructors** - Instructores del Curso

Relación muchos a muchos entre cursos e instructores.

```sql
CREATE TABLE course_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'instructor', -- main_instructor, co_instructor, guest
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, user_id)
);

-- Índices
CREATE INDEX idx_course_instructors_course_id ON course_instructors(course_id);
CREATE INDEX idx_course_instructors_user_id ON course_instructors(user_id);
```


## 🔐 Seguridad

### Mejores Prácticas Implementadas:

1. **Passwords hasheados**: Usar bcrypt con salt rounds >= 10
2. **UUIDs**: Para IDs en lugar de integers secuenciales
3. **Índices**: En campos de búsqueda frecuente
4. **Cascadas**: DELETE CASCADE para integridad referencial
5. **Constraints**: UNIQUE para prevenir duplicados
6. **Roles**: Sistema de roles para autorización
7. **Timestamps**: Tracking de creación y actualización


## 🎯 Roadmap de Features Futuros

- [ ] Tabla de `certificates` (certificados)
- [ ] Tabla de `payments` (pagos y transacciones)
- [ ] Tabla de `reviews` (reseñas de cursos)
- [ ] Tabla de `notifications` (notificaciones)
- [ ] Tabla de `wishlists` (lista de deseos)
- [ ] Tabla de `coupons` (cupones de descuento)
- [ ] Full-text search con PostgreSQL
- [ ] Analytics y tracking detallado
- [ ] Sistema de insignias y gamificación


