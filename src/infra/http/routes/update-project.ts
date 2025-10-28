import { UpdateProjectUseCase } from '@domain/application/use-cases/update-project.ts'
import { DrizzleProjectsRepository } from '@infra/database/drizzle/repositories/drizzle-projects-respository.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authMiddleware } from '../middlewares/auth-middleware.ts'

export const updateProjectRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/projects/:projectId',
    {
      schema: {
        params: z.object({
          projectId: z.cuid2(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          type: z.union([
            z.literal('frontend'),
            z.literal('backend'),
            z.literal('fullstack'),
          ]),
          githubUrl: z.httpUrl(),
          deployUrl: z.httpUrl().optional(),
        }),
        response: {
          204: z.null(),
          400: z.object({
            message: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
          403: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      const { name, description, type, githubUrl, deployUrl } = request.body
      const { projectId } = request.params
      const userId = request.getCurrentUserId()

      const updateProjectUseCase = new UpdateProjectUseCase(
        new DrizzleProjectsRepository()
      )

      await updateProjectUseCase.execute({
        projectId,
        userId,
        name,
        description,
        type,
        githubUrl,
        deployUrl,
      })

      return reply.status(204).send()
    }
  )
}
