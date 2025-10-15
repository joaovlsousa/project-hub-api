import { env } from '@config/env.ts'
import { BadRequestError } from '@core/errors/bad-request-error.ts'
import type {
  GetUserDataResponse,
  OAuthService,
} from '@domain/application/services/oauth-service.ts'
import { z } from 'zod'

export class GithubOAuthService implements OAuthService {
  async getUserData(code: string): Promise<GetUserDataResponse> {
    const githubOAuthURL = new URL(
      'https://github.com/login/oauth/access_token'
    )

    githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
    githubOAuthURL.searchParams.set(
      'client_secret',
      env.GITHUB_OAUTH_CLIENT_SECRET
    )
    githubOAuthURL.searchParams.set(
      'redirect_uri',
      env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
    )
    githubOAuthURL.searchParams.set('code', code)

    const githubAccessTokenResponse = await fetch(githubOAuthURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const githubAccessTokenData = await githubAccessTokenResponse.json()

    const { access_token: githubAccessToken } = z
      .object({
        access_token: z.string(),
        token_type: z.literal('bearer'),
        scope: z.string(),
      })
      .parse(githubAccessTokenData)

    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: 'application/json',
      },
    })

    const githubUserData = await githubUserResponse.json()

    let {
      name,
      avatar_url: avatarUrl,
      email,
      login: username,
    } = z
      .object({
        avatar_url: z.url(),
        name: z.string().nullable(),
        email: z.email().nullable(),
        login: z.string(),
      })
      .parse(githubUserData)

    if (!email) {
      const githubUserEmailsResponse = await fetch(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            Accept: 'application/json',
          },
        }
      )

      const githubUserEmailsData = await githubUserEmailsResponse.json()

      const githubUserEmails = z
        .array(
          z.object({
            email: z.email(),
            primary: z.boolean(),
          })
        )
        .parse(githubUserEmailsData)

      const githubUserEmail = githubUserEmails.find((emails) => emails.primary)

      if (!githubUserEmail) {
        throw new BadRequestError(
          'Sua conta do GitHub deve ter um e-mail para autenticação.'
        )
      }

      email = githubUserEmail.email
    }

    return {
      name: name ?? 'User',
      email,
      username,
      avatarUrl,
    }
  }
}
