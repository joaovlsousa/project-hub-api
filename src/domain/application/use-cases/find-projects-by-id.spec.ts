import { makeProject } from '@test/factories/make-project.ts'
import { InMemoryProjectsRepository } from '@test/repositories/in-memory-projects-repository.ts'
import { expect, it } from 'vitest'
import { FindProjectsByIdUseCase } from './find-projects-by-id.ts'

it('should be able find a project by id', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()
  const findProjectsByIdUseCase = new FindProjectsByIdUseCase(
    inMemoryProjectsRepository
  )

  const projectDomain = makeProject()

  await inMemoryProjectsRepository.create(projectDomain)

  const { project } = await findProjectsByIdUseCase.execute({
    projectId: projectDomain.id.toString(),
  })

  expect(project).toBeTruthy()
})

it('should not be able find project by id', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()
  const findProjectsByIdUseCase = new FindProjectsByIdUseCase(
    inMemoryProjectsRepository
  )

  const { project } = await findProjectsByIdUseCase.execute({
    projectId: 'random-id',
  })

  expect(project).toBeNull()
})
