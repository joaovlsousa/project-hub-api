import type { User } from '@domain/enterprise/entities/user.ts'

export interface UsersRespository {
  create(User: User): Promise<void>
}
