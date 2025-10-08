import { Entity } from '@core/entities/entity.ts'
import type { UniqueEntityID } from '@core/entities/unique-entity-id.ts'
import type { Optional } from '@core/types/optional.ts'

export interface UserProps {
  name: string
  email: string
  username: string
  avatarUrl: string
  createdAt: Date
  updatedAt?: Date | null
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

  public get name(): string {
    return this.props.name
  }

  public get email(): string {
    return this.props.email
  }

  public get username(): string {
    return this.props.username
  }

  public get avatarUrl(): string {
    return this.props.avatarUrl
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }
}
