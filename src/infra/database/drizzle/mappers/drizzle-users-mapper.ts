import { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import { User } from '@domain/enterprise/entities/user.ts'
import type { usersTable } from '../schema.ts'

type RawUser = typeof usersTable.$inferSelect

export class DrizzleUsersMapper {
  static toDrizzle(user: User): RawUser {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null,
    }
  }

  static toDomain(raw: RawUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        username: raw.username,
        avatarUrl: raw.avatarUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    )
  }
}
