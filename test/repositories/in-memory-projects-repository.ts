import type { ProjectsRespository } from '@domain/application/repositories/projects-repository.ts'
import type { Project } from '@domain/enterprise/entities/project.ts'

export class InMemoryProjectsRepository implements ProjectsRespository {
  public projects: Project[] = []

  async create(project: Project): Promise<void> {
    this.projects.push(project)
  }
}
