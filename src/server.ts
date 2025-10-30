import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { errorHandler } from '@infra/http/errors/error-handler.ts'
import { authenticateWithGithubRoute } from '@infra/http/routes/authenticate-with-github.ts'
import { createProjectRoute } from '@infra/http/routes/create-project.ts'
import { deleteProjectRoute } from '@infra/http/routes/delete-project.ts'
import { findProjectsByUserIdRoute } from '@infra/http/routes/find-projects-by-user-id.ts'
import { updateProjectRoute } from '@infra/http/routes/update-project.ts'
import { uploadProjectImageRoute } from '@infra/http/routes/upload-project-image.ts'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setErrorHandler(errorHandler)
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
})
server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'PSoft Hub API',
      description: 'API for managing your software projects.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

if (env.NODE_ENV !== 'production') {
  server.register(ScalarApiReference, {
    routePrefix: '/docs',
  })
}

server.register(authenticateWithGithubRoute)
server.register(createProjectRoute)
server.register(updateProjectRoute)
server.register(findProjectsByUserIdRoute)
server.register(uploadProjectImageRoute)
server.register(deleteProjectRoute)

server
  .listen({
    port: env.PORT,
    host: env.HOST,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${env.PORT}`)
    console.log(`Docs available at http://localhost:${env.PORT}/docs`)
  })
