import { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import { ForbiddenError } from '@core/errors/forbidden-error.ts'
import { NotFoundError } from '@core/errors/not-found-error.ts'
import type { ProjectType } from '@core/types/project-type.ts'
import { Project } from '@domain/enterprise/entities/project.ts'
import type { ProjectsRespository } from '../repositories/projects-repository.ts'

interface UpdateProjectUseCaseRequest {
  projectId: string
  userId: string
  name: string
  description: string
  type: ProjectType
  githubUrl: string
  deployUrl?: string
}

interface UpdateProjectUseCaseResponse {
  project: Project
}

export class UpdateProjectUseCase {
  public constructor(private projectsRepository: ProjectsRespository) {}

  async execute({
    projectId,
    name,
    description,
    type,
    userId,
    githubUrl,
    deployUrl,
  }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new NotFoundError('Project not found')
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError('You cannot perform this action')
    }

    const projectUpdated = Project.create(
      {
        name,
        description,
        type,
        userId: new UniqueEntityID(userId),
        githubUrl,
        deployUrl,
        imageId: project.imageId,
        imageUrl: project.imageUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      project.id
    )

    await this.projectsRepository.save(projectUpdated)

    return {
      project: projectUpdated,
    }
  }
}
