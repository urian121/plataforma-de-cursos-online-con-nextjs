# 🗄️ Estructura de Base de Datos - Plataforma de Cursos Online

## 📋 Descripción General

Base de datos PostgreSQL diseñada para una plataforma de cursos online estilo Platzi. Incluye gestión de usuarios, cursos, secciones, lecciones en video, progreso de estudiantes, comentarios y sistema de autenticación.

---

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

---

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

---

## 🔧 Triggers y Funciones

### Actualizar `updated_at` automáticamente

```sql
-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas necesarias
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_replies_updated_at BEFORE UPDATE ON comment_replies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### Actualizar contador de likes en comentarios

```sql
-- Función para actualizar likes_count
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_likes_count_trigger
AFTER INSERT OR DELETE ON comment_likes
FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();
```

---

### Actualizar contador de respuestas

```sql
-- Función para actualizar replies_count
CREATE OR REPLACE FUNCTION update_comment_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comments SET replies_count = replies_count + 1 WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comments SET replies_count = replies_count - 1 WHERE id = OLD.comment_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_replies_count_trigger
AFTER INSERT OR DELETE ON comment_replies
FOR EACH ROW EXECUTE FUNCTION update_comment_replies_count();
```

---

### Calcular progreso del curso

```sql
-- Función para actualizar progreso del curso
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  new_progress INTEGER;
BEGIN
  -- Obtener total de lecciones del curso
  SELECT COUNT(l.id) INTO total_lessons
  FROM lessons l
  JOIN sections s ON l.section_id = s.id
  JOIN enrollments e ON s.course_id = e.course_id
  WHERE e.id = NEW.enrollment_id;

  -- Obtener lecciones completadas
  SELECT COUNT(*) INTO completed_lessons
  FROM progress
  WHERE enrollment_id = NEW.enrollment_id AND is_completed = true;

  -- Calcular porcentaje
  IF total_lessons > 0 THEN
    new_progress := ROUND((completed_lessons::DECIMAL / total_lessons) * 100);
    UPDATE enrollments 
    SET progress_percentage = new_progress,
        last_accessed_at = CURRENT_TIMESTAMP
    WHERE id = NEW.enrollment_id;
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_course_progress
AFTER INSERT OR UPDATE ON progress
FOR EACH ROW EXECUTE FUNCTION update_enrollment_progress();
```

---

## 📝 Datos de Ejemplo (Seeds)

```sql
-- Insertar usuario administrador
INSERT INTO users (email, password_hash, name, role, email_verified)
VALUES 
  ('admin@platzi.com', '$2b$10$examplehash', 'Admin Platzi', 'admin', true),
  ('instructor@platzi.com', '$2b$10$examplehash', 'María González', 'instructor', true),
  ('student@platzi.com', '$2b$10$examplehash', 'Carlos Pérez', 'student', true);

-- Insertar curso de ejemplo
INSERT INTO courses (title, subtitle, description, cover_image_url, level, category, is_published, created_by, published_at)
VALUES (
  'Curso Completo de Marca Personal',
  'Aprende a construir tu marca personal desde cero',
  'En este curso aprenderás las mejores estrategias para construir una marca personal sólida...',
  'https://example.com/cover.jpg',
  'beginner',
  'Marketing',
  true,
  (SELECT id FROM users WHERE email = 'instructor@platzi.com'),
  CURRENT_TIMESTAMP
);

-- Insertar secciones
INSERT INTO sections (course_id, title, description, order_index)
VALUES 
  ((SELECT id FROM courses LIMIT 1), 'Fundamentos de Marca Personal', 'Aprende los conceptos básicos', 1),
  ((SELECT id FROM courses LIMIT 1), 'Estrategia Digital', 'Domina las redes sociales', 2),
  ((SELECT id FROM courses LIMIT 1), 'Crecimiento y Monetización', 'Haz crecer tu marca', 3);

-- Insertar lecciones
INSERT INTO lessons (section_id, title, video_id, video_provider, thumbnail_url, duration_seconds, order_index)
VALUES 
  (
    (SELECT id FROM sections WHERE order_index = 1 LIMIT 1),
    'Introducción a la Marca Personal',
    'jNQXAC9IVRw',
    'youtube',
    'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
    645,
    1
  );
```

---

## 🔍 Consultas Útiles

### Obtener curso completo con todas sus lecciones

```sql
SELECT 
  c.id as course_id,
  c.title as course_title,
  s.id as section_id,
  s.title as section_title,
  s.order_index as section_order,
  l.id as lesson_id,
  l.title as lesson_title,
  l.video_id,
  l.thumbnail_url,
  l.duration_seconds,
  l.order_index as lesson_order
FROM courses c
LEFT JOIN sections s ON c.id = s.course_id
LEFT JOIN lessons l ON s.id = l.section_id
WHERE c.id = 'course-uuid-here'
ORDER BY s.order_index, l.order_index;
```

---

### Obtener progreso de un estudiante en un curso

```sql
SELECT 
  e.progress_percentage,
  e.enrolled_at,
  e.last_accessed_at,
  COUNT(p.id) as total_lessons_started,
  COUNT(p.id) FILTER (WHERE p.is_completed = true) as lessons_completed,
  c.total_lessons
FROM enrollments e
JOIN courses c ON e.course_id = c.id
LEFT JOIN progress p ON e.id = p.enrollment_id
WHERE e.user_id = 'user-uuid-here' 
  AND e.course_id = 'course-uuid-here'
GROUP BY e.id, c.id;
```

---

### Obtener comentarios de una lección con respuestas

```sql
SELECT 
  c.id as comment_id,
  c.content as comment_content,
  c.likes_count,
  c.replies_count,
  c.video_timestamp_seconds,
  c.created_at,
  u.name as user_name,
  u.avatar_url,
  EXISTS(
    SELECT 1 FROM comment_likes cl 
    WHERE cl.comment_id = c.id AND cl.user_id = 'current-user-uuid'
  ) as user_has_liked
FROM comments c
JOIN users u ON c.user_id = u.id
WHERE c.lesson_id = 'lesson-uuid-here'
ORDER BY c.created_at DESC;
```

---

## 🚀 Instalación y Configuración

### 1. Crear Base de Datos

```bash
createdb platzi_courses
```

### 2. Ejecutar Script de Creación

```bash
psql -d platzi_courses -f database_schema.sql
```

### 3. Variables de Entorno

```env
DATABASE_URL=postgresql://user:password@localhost:5432/platzi_courses
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

### 4. Conexión desde Node.js (usando pg)

```javascript
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;
```

---

## 📦 Migraciones Recomendadas

Se recomienda usar **Prisma** o **Drizzle ORM** para gestionar migraciones:

```bash
# Con Prisma
npm install @prisma/client
npx prisma init
npx prisma db push

# Con Drizzle
npm install drizzle-orm pg
npm install -D drizzle-kit
```

---

## 🔐 Seguridad

### Mejores Prácticas Implementadas:

1. **Passwords hasheados**: Usar bcrypt con salt rounds >= 10
2. **UUIDs**: Para IDs en lugar de integers secuenciales
3. **Índices**: En campos de búsqueda frecuente
4. **Cascadas**: DELETE CASCADE para integridad referencial
5. **Constraints**: UNIQUE para prevenir duplicados
6. **Roles**: Sistema de roles para autorización
7. **Timestamps**: Tracking de creación y actualización

---

## 📈 Optimizaciones

### Índices Adicionales para Alto Tráfico

```sql
-- Índice compuesto para búsqueda de cursos
CREATE INDEX idx_courses_published_category ON courses(is_published, category, created_at DESC)
WHERE is_published = true;

-- Índice para búsqueda de texto completo en cursos
CREATE INDEX idx_courses_search ON courses USING GIN(to_tsvector('spanish', title || ' ' || description));

-- Índice para progreso activo
CREATE INDEX idx_enrollments_active ON enrollments(user_id, status, last_accessed_at DESC)
WHERE status = 'active';
```

---

## 📊 Backups

```bash
# Backup completo
pg_dump -U postgres platzi_courses > backup_$(date +%Y%m%d).sql

# Backup solo estructura
pg_dump -U postgres --schema-only platzi_courses > schema_backup.sql

# Restaurar backup
psql -U postgres platzi_courses < backup_20240101.sql
```

---

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

---

## 📚 Recursos

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Best Practices for PostgreSQL](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [Database Design Guidelines](https://www.postgresql.org/docs/current/ddl.html)

---

**Creado para:** Plataforma de Cursos Online estilo Platzi
**Versión:** 1.0.0
**Última actualización:** 2024

