import { CreateProjectUseCase } from '@domain/application/use-cases/create-project.ts'
import { DrizzleProjectsRepository } from '@infra/database/drizzle/repositories/drizzle-projects-respository.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authMiddleware } from '../middlewares/auth-middleware.ts'

export const createProjectRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/projects',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().min(1),
          type: z.union([
            z.literal('frontend'),
            z.literal('backend'),
            z.literal('fullstack'),
          ]),
          githubUrl: z.httpUrl(),
          deployUrl: z.httpUrl().optional(),
        }),
        response: {
          201: z.object({
            projectId: z.cuid2(),
          }),
          400: z.object({
            message: z.string(),
          }),
          401: z.object({
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
      const createProjectUseCase = new CreateProjectUseCase(
        new DrizzleProjectsRepository()
      )

      const { name, description, type, githubUrl, deployUrl } = request.body
      const userId = request.getCurrentUserId()

      const { project } = await createProjectUseCase.execute({
        name,
        description,
        type,
        githubUrl,
        deployUrl,
        userId,
      })

      return reply.status(201).send({
        projectId: project.id.toString(),
      })
    }
  )
}
