import { User } from '@domain/enterprise/entities/user.ts'
import type { UsersRespository } from '../repositories/users-repository.ts'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  username: string
  avatarUrl: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  public constructor(private usersRepository: UsersRespository) {}

  async execute({
    name,
    email,
    username,
    avatarUrl,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = User.create({
      name,
      email,
      username,
      avatarUrl,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
