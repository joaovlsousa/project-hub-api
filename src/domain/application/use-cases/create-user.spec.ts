import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository.ts'
import { expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user.ts'

it('should be able create a user', async () => {
  const inMemoryUsersRepository = new InMemoryUsersRepository()
  const createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

  const { user } = await createUserUseCase.execute({
    name: 'user name',
    email: 'user@mail.com',
    username: 'username',
    avatarUrl: 'https://github.com/username.png',
  })

  expect(user).toBeTruthy()
  expect(inMemoryUsersRepository.users[0]).toEqual(user)
})
