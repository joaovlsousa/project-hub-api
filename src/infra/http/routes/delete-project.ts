import { DeleteProjectUseCase } from '@domain/application/use-cases/delete-project.ts'
import { DrizzleProjectsRepository } from '@infra/database/drizzle/repositories/drizzle-projects-respository.ts'
import { UploadthingStorageService } from '@infra/services/uploadthig-storage-service.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authMiddleware } from '../middlewares/auth-middleware.ts'

export const deleteProjectRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/projects/:projectId',
    {
      schema: {
        summary: 'Delete a project',
        tags: ['Projects'],
        params: z.object({
          projectId: z.cuid2(),
        }),
        response: {
          204: z.void(),
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
          522: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      const { projectId } = request.params
      const userId = request.getCurrentUserId()

      const deleteProjectUseCase = new DeleteProjectUseCase(
        new DrizzleProjectsRepository(),
        new UploadthingStorageService()
      )

      await deleteProjectUseCase.execute({
        projectId,
        userId,
      })

      return reply.status(204).send()
    }
  )
}
