import { Entity } from '@core/entities/entity.ts'
import type { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import type { Optional } from '@core/types/optional.ts'
import type { ProjectType } from '@core/types/project-type.ts'

export interface ProjectProps {
  name: string
  description: string
  type: ProjectType
  userId: UniqueEntityID
  imageUrl?: string | null
  imageId?: string | null
  githubUrl: string
  deployUrl?: string | null
  createdAt: Date
  updatedAt?: Date | null
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

  public get userId(): UniqueEntityID {
    return this.props.userId
  }

  public get imageId(): string | undefined | null {
    return this.props.imageId
  }

  public get imageUrl(): string | undefined | null {
    return this.props.imageUrl
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }

  public set imageId(imageId: string) {
    this.props.imageId = imageId
  }

  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl
  }
}
