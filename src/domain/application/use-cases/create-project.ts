import { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import type { ProjectType } from '@core/types/project-type.ts'
import { Project } from '@domain/enterprise/entities/project.ts'
import type { ProjectsRespository } from '../repositories/projects-repository.ts'

interface CreateProjectUseCaseRequest {
  name: string
  description: string
  type: ProjectType
  userId: string
  githubUrl: string
  deployUrl?: string
}

interface CreateProjectUseCaseResponse {
  project: Project
}

export class CreateProjectUseCase {
  public constructor(private projectsRepository: ProjectsRespository) {}

  async execute({
    name,
    description,
    type,
    userId,
    githubUrl,
    deployUrl,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const project = Project.create({
      name,
      description,
      type,
      userId: new UniqueEntityID(userId),
      githubUrl,
      deployUrl,
    })

    await this.projectsRepository.create(project)

    return {
      project,
    }
  }
}
