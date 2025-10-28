import type { Project } from '@domain/enterprise/entities/project.ts'

export interface UpdateImageParams {
  projectId: string
  imageId: string
  imageUrl: string
}

export interface ProjectsRespository {
  findByUserId(userId: string): Promise<Project[]>
  findById(projectId: string): Promise<Project | null>
  updateImage(params: UpdateImageParams): Promise<void>
  save(project: Project): Promise<void>
  create(project: Project): Promise<void>
  delete(projectId: string): Promise<void>
}
