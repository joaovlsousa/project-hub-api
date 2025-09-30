import { Entity } from '@core/entities/entity.ts'
import type { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import type { Optional } from '@core/types/optional.ts'
import type { ProjectType } from '@core/types/project-type.ts'

interface ProjectProps {
  name: string
  description: string
  type: ProjectType
  userId: UniqueEntityID
  imageUrl?: string
  imageId?: string
  githubUrl: string
  deployUrl?: string
  createdAt: Date
  updatedAt?: Date
}

export class Project extends Entity<ProjectProps> {
  public static create(
    props: Optional<ProjectProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const project = new Project(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return project
  }
}
