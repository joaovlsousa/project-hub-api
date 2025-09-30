import { Entity } from '@core/entities/entity.ts'
import type { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import type { Optional } from '@core/types/optional.ts'

export interface UserProps {
  name: string
  email: string
  username: string
  avatarUrl: string
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  public static create(
    props: Optional<UserProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return user
  }
}
