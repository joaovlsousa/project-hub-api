import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './config/env.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.get('/', () => {
  return {
    message: 'Hello world',
  }
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server running'))
