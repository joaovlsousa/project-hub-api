import { ForbiddenError } from '@core/errors/forbidden-error.ts'
import { NotFoundError } from '@core/errors/not-found-error.ts'
import type { ProjectsRespository } from '../repositories/projects-repository.ts'

interface DeleteProjectUseCaseRequest {
  userId: string
  projectId: string
}

export class DeleteProjectUseCase {
  public constructor(private projectsRepository: ProjectsRespository) {}

  async execute({
    projectId,
    userId,
  }: DeleteProjectUseCaseRequest): Promise<void> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new NotFoundError('Project not found')
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError('You cannot perform this action')
    }

    await this.projectsRepository.delete(projectId)
  }
}
