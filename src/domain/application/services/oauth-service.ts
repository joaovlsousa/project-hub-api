export interface GetUserDataResponse {
  name: string
  email: string
  username: string
  avatarUrl: string
}

export interface OAuthService {
  getUserData(code: string): Promise<GetUserDataResponse>
}
