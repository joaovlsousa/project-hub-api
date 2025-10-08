import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const projectType = pgEnum('project_type', [
  'frontend',
  'backend',
  'fullstack',
])

export const usersTable = pgTable('users', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  avatarUrl: text('avatar_url').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
})

export const projectsTable = pgTable('projects', {
  id: text().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  type: projectType().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),
  imageUrl: text('image_url'),
  imageId: text('image_id'),
  githubUrl: text('github_url').notNull(),
  deployUrl: text('deploy_url'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
})
