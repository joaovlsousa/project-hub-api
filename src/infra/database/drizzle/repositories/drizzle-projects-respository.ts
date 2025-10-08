import type {
  ProjectsRespository,
  UpdateImageParams,
} from '@domain/application/repositories/projects-repository.ts'
import type { Project } from '@domain/enterprise/entities/project.ts'
import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { dbClient } from '../client.ts'
import { DrizzleProjectsMapper } from '../mappers/drizzle-projects-mapper.ts'
import { projectsTable } from '../schema.ts'

export class DrizzleProjectsRepository implements ProjectsRespository {
  private readonly db: NodePgDatabase

  constructor() {
    this.db = dbClient
  }

  async findById(projectId: string): Promise<Project | null> {
    const [raw] = await this.db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))

    if (!raw) {
      return null
    }

    return DrizzleProjectsMapper.toDomain(raw)
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const projects = await this.db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.userId, userId))

    return projects.map(DrizzleProjectsMapper.toDomain)
  }

  async updateImage({
    imageId,
    imageUrl,
    projectId,
  }: UpdateImageParams): Promise<void> {
    await this.db
      .update(projectsTable)
      .set({
        imageId,
        imageUrl,
      })
      .where(eq(projectsTable.id, projectId))
  }

  async save(project: Project): Promise<void> {
    const raw = DrizzleProjectsMapper.toDrizzle(project)

    await this.db
      .update(projectsTable)
      .set(raw)
      .where(eq(projectsTable.id, raw.id))
  }

  async create(project: Project): Promise<void> {
    const raw = DrizzleProjectsMapper.toDrizzle(project)

    await this.db.insert(projectsTable).values(raw)
  }
}
