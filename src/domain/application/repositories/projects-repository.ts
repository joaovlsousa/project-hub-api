import type { Project } from '@domain/enterprise/entities/project.ts'

export interface ProjectsRespository {
  create(project: Project): Promise<void>
}
