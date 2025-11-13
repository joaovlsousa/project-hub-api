import type { User } from '@domain/enterprise/entities/user.ts'

export interface UsersRespository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}
