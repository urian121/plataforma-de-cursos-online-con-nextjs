// Esquema base de Drizzle ORM (JS)
import { pgTable, uuid, varchar, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

// Tabla: users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  avatarUrl: text('avatar_url'),
  role: varchar('role', { length: 50 }).default('student'),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla: courses
export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  trailerVideoUrl: text('trailer_video_url'),
  level: varchar('level', { length: 50 }).default('beginner'),
  category: varchar('category', { length: 100 }),
  tags: text('tags').array(),
  price: varchar('price', { length: 50 }).default('0.00'),
  isPublished: boolean('is_published').default(false),
  totalDurationMinutes: integer('total_duration_minutes').default(0),
  totalLessons: integer('total_lessons').default(0),
  createdBy: uuid('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
});

// Tabla: sections
export const sections = pgTable('sections', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla: lessons
export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  sectionId: uuid('section_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  videoId: varchar('video_id', { length: 255 }).notNull(),
  videoProvider: varchar('video_provider', { length: 50 }).default('youtube'),
  thumbnailUrl: text('thumbnail_url'),
  durationSeconds: integer('duration_seconds'),
  orderIndex: integer('order_index').notNull(),
  isPreview: boolean('is_preview').default(false),
  resourcesUrl: text('resources_url'),
  transcript: text('transcript'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});