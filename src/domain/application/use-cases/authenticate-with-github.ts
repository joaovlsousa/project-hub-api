import { JwtService } from '@core/services/jwt-service.ts'
import { User } from '@domain/enterprise/entities/user.ts'
import type { UsersRespository } from '../repositories/users-repository.ts'
import type { OAuthService } from '../services/oauth-service.ts'

interface AuthenticateWithGithubUseCaseRequest {
  code: string
}

interface AuthenticateWithGithubUseCaseResponse {
  token: string
}

export class AuthenticateWithGithubUseCase {
  private readonly jwtService: JwtService

  constructor(
    private oAuthService: OAuthService,
    private usersRepository: UsersRespository
  ) {
    this.jwtService = new JwtService()
  }

  async execute({
    code,
  }: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
    const { name, email, username, avatarUrl } =
      await this.oAuthService.getUserData(code)

    let user = await this.usersRepository.findByEmail(email)

    if (!user) {
      user = User.create({
        name,
        email,
        username,
        avatarUrl,
      })

      await this.usersRepository.create(user)
    }

    const token = this.jwtService.sign({ sub: user.id.toString() })

    return {
      token,
    }
  }
}
