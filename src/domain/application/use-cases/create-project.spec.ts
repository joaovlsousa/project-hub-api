import { InMemoryProjectsRepository } from '@test/repositories/in-memory-projects-repository.ts'
import { expect, it } from 'vitest'
import { CreateProjectUseCase } from './create-project.ts'

it('should be able create a project', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()
  const createProjectUseCase = new CreateProjectUseCase(
    inMemoryProjectsRepository
  )

  const { project } = await createProjectUseCase.execute({
    name: 'project name',
    description: 'project description',
    githubUrl: 'https://github.com',
    type: 'fullstack',
    userId: 'user-id',
  })

  expect(project).toBeTruthy()
  expect(inMemoryProjectsRepository.projects[0]).toEqual(project)
})
