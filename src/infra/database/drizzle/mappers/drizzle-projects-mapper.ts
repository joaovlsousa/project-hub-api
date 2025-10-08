import { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import { Project } from '@domain/enterprise/entities/project.ts'
import type { projectsTable } from '../schema.ts'

type RawProject = typeof projectsTable.$inferSelect

export class DrizzleProjectsMapper {
  static toDrizzle(project: Project): RawProject {
    return {
      id: project.id.toString(),
      name: project.name,
      description: project.description,
      type: project.type,
      userId: project.userId.toString(),
      imageId: project.imageId ?? null,
      imageUrl: project.imageUrl ?? null,
      githubUrl: project.githubUrl,
      deployUrl: project.deployUrl ?? null,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt ?? null,
    }
  }

  static toDomain(raw: RawProject): Project {
    return Project.create(
      {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        userId: new UniqueEntityID(raw.userId),
        imageId: raw.imageId,
        imageUrl: raw.imageUrl,
        githubUrl: raw.githubUrl,
        deployUrl: raw.deployUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    )
  }
}
