import type { UsersRespository } from '@domain/application/repositories/users-repository.ts'
import type { User } from '@domain/enterprise/entities/user.ts'
import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { dbClient } from '../client.ts'
import { DrizzleUsersMapper } from '../mappers/drizzle-users-mapper.ts'
import { usersTable } from '../schema.ts'

export class DrizzleUsersRepository implements UsersRespository {
  private readonly db: NodePgDatabase

  constructor() {
    this.db = dbClient
  }

  async create(user: User): Promise<void> {
    const raw = DrizzleUsersMapper.toDrizzle(user)

    await this.db.insert(usersTable).values(raw)
  }

  async findByEmail(email: string): Promise<User | null> {
    const [raw] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    if (!raw) {
      return null
    }

    return DrizzleUsersMapper.toDomain(raw)
  }

  async findById(userId: string): Promise<User | null> {
    const [raw] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))

    if (!raw) {
      return null
    }

    return DrizzleUsersMapper.toDomain(raw)
  }
}
