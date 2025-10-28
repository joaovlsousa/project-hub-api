import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { errorHandler } from '@infra/http/errors/error-handler.ts'
import { authenticateWithGithubRoute } from '@infra/http/routes/authenticate-with-github.ts'
import { createProjectRoute } from '@infra/http/routes/create-project.ts'
import { findProjectsByUserIdRoute } from '@infra/http/routes/find-projects-by-user-id.ts'
import { updateProjectRoute } from '@infra/http/routes/update-project.ts'
import { uploadProjectImageRoute } from '@infra/http/routes/upload-project-image.ts'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setErrorHandler(errorHandler)
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
})
server.register(multipart)

server.register(authenticateWithGithubRoute)
server.register(createProjectRoute)
server.register(updateProjectRoute)
server.register(findProjectsByUserIdRoute)
server.register(uploadProjectImageRoute)

server
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server running'))
