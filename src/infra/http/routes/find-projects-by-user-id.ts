import { FindProjectsByUserIdUseCase } from '@domain/application/use-cases/find-projects-by-user-id.ts'
import { DrizzleProjectsRepository } from '@infra/database/drizzle/repositories/drizzle-projects-respository.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authMiddleware } from '../middlewares/auth-middleware.ts'

export const findProjectsByUserIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/projects',
    {
      schema: {
        response: {
          200: z.object({
            projects: z.array(
              z.object({
                id: z.cuid2(),
                name: z.string(),
                description: z.string(),
                type: z.union([
                  z.literal('frontend'),
                  z.literal('backend'),
                  z.literal('fullstack'),
                ]),
                imageUrl: z.httpUrl().nullable(),
                githubUrl: z.httpUrl(),
                deployUrl: z.httpUrl().nullable(),
                createdAt: z.date(),
                updatedAt: z.date().nullable(),
              })
            ),
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
      const userId = request.getCurrentUserId()

      const findProjectsByUserIdUseCase = new FindProjectsByUserIdUseCase(
        new DrizzleProjectsRepository()
      )

      const { projects } = await findProjectsByUserIdUseCase.execute({ userId })

      return reply.status(200).send({
        projects: projects.map((project) => ({
          id: project.id.toString(),
          name: project.name,
          description: project.description,
          type: project.type,
          imageUrl: project.imageUrl ?? null,
          githubUrl: project.githubUrl,
          deployUrl: project.deployUrl ?? null,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt ?? null,
        })),
      })
    }
  )
}
