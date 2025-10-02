import type {
  GetUserDataResponse,
  OAuthService,
} from '@domain/application/services/oauth-service.ts'

export class TestOAuthService implements OAuthService {
  async getUserData(_code: string): Promise<GetUserDataResponse> {
    return {
      name: 'user',
      email: 'user@mail.com',
      username: 'username',
      avatarUrl: 'http://github.com/username.png',
    }
  }
}
