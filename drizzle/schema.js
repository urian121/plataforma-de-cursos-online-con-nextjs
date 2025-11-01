// Schema completo de Drizzle ORM para PostgreSQL
import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  boolean, 
  timestamp, 
  integer, 
  serial,
  decimal,
  smallint,
  jsonb,
  index,
  unique
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// TABLA: types_of_users
// ============================================
export const typesOfUsers = pgTable('types_of_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
});

// ============================================
// TABLA: users
// ============================================
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  typeId: integer('type_id').references(() => typesOfUsers.id, { onDelete: 'set null' }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  avatarUrl: text('avatar_url'),
  role: varchar('role', { length: 50 }).default('student'),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  bio: text('bio'),
  socialLinks: jsonb('social_links').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  roleIdx: index('idx_users_role').on(table.role),
  createdAtIdx: index('idx_users_created_at').on(table.createdAt),
}));

// ============================================
// TABLA: categories
// ============================================
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// TABLA: courses
// ============================================
export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  trailerVideoUrl: text('trailer_video_url'),
  level: varchar('level', { length: 50 }).default('beginner'),
  tags: text('tags').array(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0.00'),
  isPublished: boolean('is_published').default(false),
  totalDurationMinutes: integer('total_duration_minutes').default(0),
  totalLessons: integer('total_lessons').default(0),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
}, (table) => ({
  categoryIdx: index('idx_courses_category_id').on(table.categoryId),
  levelIdx: index('idx_courses_level').on(table.level),
  publishedIdx: index('idx_courses_is_published').on(table.isPublished),
}));

// ============================================
// TABLA: lessons
// ============================================
export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
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
}, (table) => ({
  courseIdx: index('idx_lessons_course_id').on(table.courseId),
  orderIdx: index('idx_lessons_order').on(table.courseId, table.orderIndex),
  uniqueOrder: unique('lessons_course_order_unique').on(table.courseId, table.orderIndex),
}));

// ============================================
// TABLA: enrollments
// ============================================
export const enrollments = pgTable('enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).default('active'),
  progressPercentage: integer('progress_percentage').default(0),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
}, (table) => ({
  courseIdx: index('idx_enrollments_course_id').on(table.courseId),
  userIdx: index('idx_enrollments_user_id').on(table.userId),
  uniqueEnrollment: unique('enrollments_course_user_unique').on(table.courseId, table.userId),
}));

// ============================================
// TABLA: progress
// ============================================
export const progress = pgTable('progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false),
  lastPositionSeconds: integer('last_position_seconds').default(0),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  enrollmentIdx: index('idx_progress_enrollment_id').on(table.enrollmentId),
  lessonIdx: index('idx_progress_lesson_id').on(table.lessonId),
  uniqueProgress: unique('progress_enrollment_lesson_unique').on(table.enrollmentId, table.lessonId),
}));

// ============================================
// TABLA: comments
// ============================================
export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  videoTimestampSeconds: integer('video_timestamp_seconds'),
  likesCount: integer('likes_count').default(0),
  repliesCount: integer('replies_count').default(0),
  isPinned: boolean('is_pinned').default(false),
  isInstructorReply: boolean('is_instructor_reply').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  lessonIdx: index('idx_comments_lesson_id').on(table.lessonId),
  userIdx: index('idx_comments_user_id').on(table.userId),
}));

// ============================================
// TABLA: comment_likes
// ============================================
export const commentLikes = pgTable('comment_likes', {
  id: uuid('id').defaultRandom().primaryKey(),
  commentId: uuid('comment_id').notNull().references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueLike: unique('comment_likes_comment_user_unique').on(table.commentId, table.userId),
}));

// ============================================
// TABLA: comment_replies
// ============================================
export const commentReplies = pgTable('comment_replies', {
  id: uuid('id').defaultRandom().primaryKey(),
  commentId: uuid('comment_id').notNull().references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  isInstructorReply: boolean('is_instructor_reply').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// TABLA: course_instructors
// ============================================
export const courseInstructors = pgTable('course_instructors', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).default('instructor'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueInstructor: unique('course_instructors_course_user_unique').on(table.courseId, table.userId),
}));

// ============================================
// TABLA: ratings
// ============================================
export const ratings = pgTable('ratings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  rating: smallint('rating'),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  courseIdx: index('idx_ratings_course_id').on(table.courseId),
  userIdx: index('idx_ratings_user_id').on(table.userId),
  scoreIdx: index('idx_ratings_score').on(table.rating),
  uniqueRating: unique('ratings_user_course_unique').on(table.userId, table.courseId),
}));

// ============================================
// RELACIONES (para queries con joins)
// ============================================
export const usersRelations = relations(users, ({ one, many }) => ({
  type: one(typesOfUsers, {
    fields: [users.typeId],
    references: [typesOfUsers.id],
  }),
  enrollments: many(enrollments),
  comments: many(comments),
  ratings: many(ratings),
  createdCourses: many(courses),
  instructorCourses: many(courseInstructors),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
  creator: one(users, {
    fields: [courses.createdBy],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
  instructors: many(courseInstructors),
  ratings: many(ratings),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  comments: many(comments),
  progress: many(progress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  progress: many(progress),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [progress.enrollmentId],
    references: [enrollments.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [comments.lessonId],
    references: [lessons.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  likes: many(commentLikes),
  replies: many(commentReplies),
}));