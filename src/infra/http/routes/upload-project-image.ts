import { BadRequestError } from '@core/errors/bad-request-error.ts'
import type { ImageFile } from '@core/types/image-file.ts'
import { UploadProjectImageUseCase } from '@domain/application/use-cases/upload-project-image.ts'
import { DrizzleProjectsRepository } from '@infra/database/drizzle/repositories/drizzle-projects-respository.ts'
import { UploadthingStorageService } from '@infra/services/uploadthig-storage-service.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authMiddleware } from '../middlewares/auth-middleware.ts'

export const uploadProjectImageRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/projects/:projectId/upload',
    {
      schema: {
        params: z.object({
          projectId: z.cuid2(),
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
      const file = await request.file()

      if (!file) {
        throw new BadRequestError('Image is required')
      }

      const uploadProjectImageUseCase = new UploadProjectImageUseCase(
        new DrizzleProjectsRepository(),
        new UploadthingStorageService()
      )

      const imageBuffer = await file.toBuffer()

      const image: ImageFile = {
        name: file.filename,
        mimetype: file.mimetype,
        size: imageBuffer.length,
        buffer: imageBuffer,
      }

      await uploadProjectImageUseCase.execute({
        projectId,
        userId,
        image,
      })

      return reply.status(204).send()
    }
  )
}
