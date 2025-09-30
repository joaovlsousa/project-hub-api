import { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import {
  Project,
  type ProjectProps,
} from '@domain/enterprise/entities/project.ts'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueEntityID
): Project {
  const project = Project.create(
    {
      name: faker.person.fullName(),
      description: faker.lorem.sentence(2),
      githubUrl: faker.internet.url(),
      type: 'fullstack',
      userId: new UniqueEntityID('user-id'),
      ...override,
    },
    id
  )

  return project
}
