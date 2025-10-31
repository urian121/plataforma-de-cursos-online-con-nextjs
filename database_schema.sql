-- ============================================
-- PLATAFORMA DE CURSOS ONLINE - SCHEMA SQL
-- PostgreSQL 14+
-- ============================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLA: users
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

COMMENT ON TABLE users IS 'Almacena información de todos los usuarios de la plataforma';
COMMENT ON COLUMN users.role IS 'student: Estudiante regular, instructor: Creador de cursos, admin: Administrador';

-- ============================================
-- TABLA: user_sessions
-- ============================================
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

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);

COMMENT ON TABLE user_sessions IS 'Gestión de sesiones activas y tokens de autenticación';

-- ============================================
-- TABLA: courses
-- ============================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  cover_image_url TEXT,
  trailer_video_url TEXT,
  level VARCHAR(50) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category VARCHAR(100),
  tags TEXT[],
  price DECIMAL(10, 2) DEFAULT 0.00,
  is_published BOOLEAN DEFAULT false,
  total_duration_minutes INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

CREATE INDEX idx_courses_created_by ON courses(created_by);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_courses_created_at ON courses(created_at DESC);
CREATE INDEX idx_courses_published_category ON courses(is_published, category, created_at DESC) WHERE is_published = true;

COMMENT ON TABLE courses IS 'Información principal de cada curso';
COMMENT ON COLUMN courses.level IS 'beginner: Principiante, intermediate: Intermedio, advanced: Avanzado';
COMMENT ON COLUMN courses.cover_image_url IS 'Imagen de portada del curso';
COMMENT ON COLUMN courses.trailer_video_url IS 'Video promocional del curso';

-- ============================================
-- TABLA: sections
-- ============================================
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, order_index)
);

CREATE INDEX idx_sections_course_id ON sections(course_id);
CREATE INDEX idx_sections_order ON sections(course_id, order_index);

COMMENT ON TABLE sections IS 'Agrupa las lecciones en secciones temáticas dentro de un curso';

-- ============================================
-- TABLA: lessons
-- ============================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_id VARCHAR(255) NOT NULL,
  video_provider VARCHAR(50) DEFAULT 'youtube' CHECK (video_provider IN ('youtube', 'vimeo', 'bunny', 'custom')),
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  resources_url TEXT,
  transcript TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(section_id, order_index)
);

CREATE INDEX idx_lessons_section_id ON lessons(section_id);
CREATE INDEX idx_lessons_order ON lessons(section_id, order_index);
CREATE INDEX idx_lessons_video_id ON lessons(video_id);

COMMENT ON TABLE lessons IS 'Cada lección individual con su video';
COMMENT ON COLUMN lessons.video_id IS 'ID del video en el proveedor (YouTube ID, Vimeo ID, etc.)';
COMMENT ON COLUMN lessons.video_provider IS 'Proveedor del video: youtube, vimeo, bunny.net, custom';
COMMENT ON COLUMN lessons.thumbnail_url IS 'Miniatura del video';
COMMENT ON COLUMN lessons.is_preview IS 'Si es una lección de preview gratuita';

-- ============================================
-- TABLA: enrollments
-- ============================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  last_accessed_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_enrollments_enrolled_at ON enrollments(enrolled_at DESC);
CREATE INDEX idx_enrollments_active ON enrollments(user_id, status, last_accessed_at DESC) WHERE status = 'active';

COMMENT ON TABLE enrollments IS 'Relación entre usuarios y cursos (inscripciones)';
COMMENT ON COLUMN enrollments.status IS 'active: Activo, completed: Completado, paused: Pausado, cancelled: Cancelado';

-- ============================================
-- TABLA: progress
-- ============================================
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(enrollment_id, lesson_id)
);

CREATE INDEX idx_progress_enrollment_id ON progress(enrollment_id);
CREATE INDEX idx_progress_lesson_id ON progress(lesson_id);
CREATE INDEX idx_progress_completed ON progress(is_completed);

COMMENT ON TABLE progress IS 'Tracking detallado del progreso del estudiante en cada lección';
COMMENT ON COLUMN progress.last_position_seconds IS 'Última posición del video en segundos (para retomar)';

-- ============================================
-- TABLA: comments
-- ============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  video_timestamp_seconds INTEGER,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_instructor_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_likes ON comments(likes_count DESC);

COMMENT ON TABLE comments IS 'Comentarios y preguntas de estudiantes en las lecciones';
COMMENT ON COLUMN comments.video_timestamp_seconds IS 'Momento del video donde se hizo el comentario';
COMMENT ON COLUMN comments.is_pinned IS 'Comentario destacado por el instructor';

-- ============================================
-- TABLA: comment_likes
-- ============================================
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(comment_id, user_id)
);

CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);

COMMENT ON TABLE comment_likes IS 'Sistema de likes para comentarios';

-- ============================================
-- TABLA: comment_replies
-- ============================================
CREATE TABLE comment_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_instructor_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_replies_comment_id ON comment_replies(comment_id);
CREATE INDEX idx_replies_user_id ON comment_replies(user_id);
CREATE INDEX idx_replies_created_at ON comment_replies(created_at ASC);

COMMENT ON TABLE comment_replies IS 'Respuestas a comentarios (sistema de hilos)';

-- ============================================
-- TABLA: course_instructors
-- ============================================
CREATE TABLE course_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'instructor' CHECK (role IN ('main_instructor', 'co_instructor', 'guest')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, user_id)
);

CREATE INDEX idx_course_instructors_course_id ON course_instructors(course_id);
CREATE INDEX idx_course_instructors_user_id ON course_instructors(user_id);

COMMENT ON TABLE course_instructors IS 'Relación muchos a muchos entre cursos e instructores';

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
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

-- Función para actualizar likes_count en comentarios
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

-- Función para actualizar replies_count en comentarios
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

-- Función para calcular y actualizar progreso del curso
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
        last_accessed_at = CURRENT_TIMESTAMP,
        completed_at = CASE 
          WHEN new_progress = 100 THEN CURRENT_TIMESTAMP 
          ELSE completed_at 
        END,
        status = CASE 
          WHEN new_progress = 100 THEN 'completed'
          ELSE status
        END
    WHERE id = NEW.enrollment_id;
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_course_progress
AFTER INSERT OR UPDATE ON progress
FOR EACH ROW EXECUTE FUNCTION update_enrollment_progress();

-- ============================================
-- DATOS DE EJEMPLO (SEEDS)
-- ============================================

-- Insertar usuarios de ejemplo
-- NOTA: Usar bcrypt para hashear passwords reales
INSERT INTO users (email, password_hash, name, role, email_verified) VALUES
  ('admin@platzi.com', '$2b$10$examplehash1234567890123456', 'Admin Platzi', 'admin', true),
  ('instructor@platzi.com', '$2b$10$examplehash1234567890123456', 'María González', 'instructor', true),
  ('student@platzi.com', '$2b$10$examplehash1234567890123456', 'Carlos Pérez', 'student', true);

-- Insertar curso de ejemplo
INSERT INTO courses (title, subtitle, description, cover_image_url, level, category, tags, is_published, created_by, published_at)
VALUES (
  'Curso Completo de Marca Personal',
  'Aprende a construir tu marca personal desde cero',
  'En este curso aprenderás las mejores estrategias para construir una marca personal sólida en el mundo digital. Desde los fundamentos hasta técnicas avanzadas de monetización.',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  'beginner',
  'Marketing',
  ARRAY['marca personal', 'marketing digital', 'redes sociales'],
  true,
  (SELECT id FROM users WHERE email = 'instructor@platzi.com'),
  CURRENT_TIMESTAMP
);

-- Insertar secciones
INSERT INTO sections (course_id, title, description, order_index) VALUES
  ((SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal'), 'Fundamentos de Marca Personal', 'Aprende los conceptos básicos de marca personal', 1),
  ((SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal'), 'Estrategia Digital', 'Domina las redes sociales y el contenido digital', 2),
  ((SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal'), 'Crecimiento y Monetización', 'Haz crecer tu marca y monetízala', 3);

-- Insertar lecciones
INSERT INTO lessons (section_id, title, description, video_id, video_provider, thumbnail_url, duration_seconds, order_index, is_preview) VALUES
  (
    (SELECT id FROM sections WHERE order_index = 1 AND course_id = (SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal')),
    'Introducción a la Marca Personal',
    'Descubre qué es la marca personal y por qué es importante',
    'jNQXAC9IVRw',
    'youtube',
    'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
    645,
    1,
    true
  ),
  (
    (SELECT id FROM sections WHERE order_index = 1 AND course_id = (SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal')),
    'Definiendo tu Propuesta de Valor',
    'Aprende a identificar y comunicar tu propuesta única',
    'ScMzIvxBSi4',
    'youtube',
    'https://img.youtube.com/vi/ScMzIvxBSi4/mqdefault.jpg',
    750,
    2,
    true
  ),
  (
    (SELECT id FROM sections WHERE order_index = 1 AND course_id = (SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal')),
    'Identifica tu Audiencia Objetivo',
    'Define claramente a quién te diriges',
    'OPf0YbXqDm0',
    'youtube',
    'https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg',
    500,
    3,
    false
  );

-- Insertar inscripción de ejemplo
INSERT INTO enrollments (user_id, course_id, status)
VALUES (
  (SELECT id FROM users WHERE email = 'student@platzi.com'),
  (SELECT id FROM courses WHERE title = 'Curso Completo de Marca Personal'),
  'active'
);

-- Insertar progreso de ejemplo
INSERT INTO progress (enrollment_id, lesson_id, is_completed, completed_at)
VALUES (
  (SELECT id FROM enrollments WHERE user_id = (SELECT id FROM users WHERE email = 'student@platzi.com')),
  (SELECT id FROM lessons WHERE order_index = 1 AND section_id = (SELECT id FROM sections WHERE order_index = 1)),
  true,
  CURRENT_TIMESTAMP
);

-- Insertar comentarios de ejemplo
INSERT INTO comments (lesson_id, user_id, content, video_timestamp_seconds)
VALUES (
  (SELECT id FROM lessons WHERE order_index = 1 LIMIT 1),
  (SELECT id FROM users WHERE email = 'student@platzi.com'),
  '¡Excelente introducción! Me ayudó mucho a entender los conceptos básicos.',
  120
);

-- ============================================
-- CONSULTAS ÚTILES PREDEFINIDAS
-- ============================================

-- Vista: Cursos con estadísticas
CREATE OR REPLACE VIEW courses_with_stats AS
SELECT 
  c.id,
  c.title,
  c.subtitle,
  c.level,
  c.category,
  c.is_published,
  c.created_at,
  u.name as instructor_name,
  COUNT(DISTINCT e.id) as total_enrollments,
  COUNT(DISTINCT s.id) as total_sections,
  COUNT(DISTINCT l.id) as total_lessons,
  COALESCE(SUM(l.duration_seconds), 0) / 60 as total_duration_minutes
FROM courses c
LEFT JOIN users u ON c.created_by = u.id
LEFT JOIN sections s ON c.id = s.course_id
LEFT JOIN lessons l ON s.id = l.section_id
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, u.name;

COMMENT ON VIEW courses_with_stats IS 'Vista con cursos y sus estadísticas principales';

-- ============================================
-- PERMISOS (OPCIONAL)
-- ============================================

-- Crear roles de base de datos
-- CREATE ROLE platzi_admin WITH LOGIN PASSWORD 'secure_password';
-- CREATE ROLE platzi_app WITH LOGIN PASSWORD 'secure_password';

-- Otorgar permisos
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO platzi_admin;
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO platzi_app;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Verificación
SELECT 'Database schema created successfully!' as status;

