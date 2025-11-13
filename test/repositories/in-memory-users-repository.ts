import type { UsersRespository } from '@domain/application/repositories/users-repository.ts'
import type { User } from '@domain/enterprise/entities/user.ts'

export class InMemoryUsersRepository implements UsersRespository {
  public users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user ?? null
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === userId)

    return user ?? null
  }
}
