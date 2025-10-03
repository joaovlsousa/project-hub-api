import { BadRequestError } from '@core/errors/bad-request-error.ts'
import { ForbiddenError } from '@core/errors/forbidden-error.ts'
import { NotFoundError } from '@core/errors/not-found-error.ts'
import type { ImageFile } from '@core/types/image-file.ts'
import type { ProjectsRespository } from '../repositories/projects-repository.ts'
import type { StorageService } from '../services/storage-service.ts'

interface UploadProjectImageUseCaseRequest {
  image: ImageFile
  projectId: string
  userId: string
}

export class UploadProjectImageUseCase {
  private readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

  public constructor(
    private projectsRepository: ProjectsRespository,
    private storageService: StorageService
  ) {}

  async execute({
    image,
    projectId,
    userId,
  }: UploadProjectImageUseCaseRequest): Promise<void> {
    if (image.size > this.MAX_IMAGE_SIZE) {
      throw new BadRequestError(`Invalid image size: ${image.size}`)
    }

    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new NotFoundError('Project not found')
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError('You cannot perform this action')
    }

    if (project.imageId) {
      await this.storageService.delete(project.imageId)
    }

    const { imageId, imageUrl } = await this.storageService.upload(image)

    await this.projectsRepository.updateImage({
      imageId,
      imageUrl,
      projectId,
    })
  }
}
