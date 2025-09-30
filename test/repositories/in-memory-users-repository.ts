import type { UsersRespository } from '@domain/application/repositories/users-repository.ts'
import type { User } from '@domain/enterprise/entities/user.ts'

export class InMemoryUsersRepository implements UsersRespository {
  public users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
