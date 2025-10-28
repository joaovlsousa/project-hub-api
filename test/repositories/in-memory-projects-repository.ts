import type {
  ProjectsRespository,
  UpdateImageParams,
} from '@domain/application/repositories/projects-repository.ts'
import type { Project } from '@domain/enterprise/entities/project.ts'

export class InMemoryProjectsRepository implements ProjectsRespository {
  public projects: Project[] = []

  async create(project: Project): Promise<void> {
    this.projects.push(project)
  }

  async save(project: Project): Promise<void> {
    const projectIndex = this.projects.findIndex((project) =>
      project.id.equals(project.id)
    )

    if (projectIndex >= 0) {
      this.projects[projectIndex] = project
    }
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const projects = this.projects.filter(
      (project) => project.userId.toString() === userId
    )

    return projects
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = this.projects.find(
      (project) => project.id.toString() === projectId
    )

    return project ?? null
  }

  async updateImage(params: UpdateImageParams): Promise<void> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id.toString() === params.projectId
    )

    if (projectIndex >= 0) {
      this.projects[projectIndex].imageId = params.imageId
      this.projects[projectIndex].imageUrl = params.imageUrl
    }
  }

  async delete(projectId: string): Promise<void> {
    this.projects = this.projects.filter(
      (project) => project.id.toString() !== projectId
    )
  }
}
