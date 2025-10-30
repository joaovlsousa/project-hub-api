import { AuthenticateWithGithubUseCase } from '@domain/application/use-cases/authenticate-with-github.ts'
import { DrizzleUsersRepository } from '@infra/database/drizzle/repositories/drizzle-users-respository.ts'
import { GithubOAuthService } from '@infra/services/github-oauth-service.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const authenticateWithGithubRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.post(
    '/sessions/github',
    {
      schema: {
        summary: 'Authenticate user with github',
        tags: ['Auth'],
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const authenticateWithGithubUseCase = new AuthenticateWithGithubUseCase(
        new GithubOAuthService(),
        new DrizzleUsersRepository()
      )

      const { code } = request.body

      const { token } = await authenticateWithGithubUseCase.execute({
        code,
      })

      return reply.status(201).send({ token })
    }
  )
}
