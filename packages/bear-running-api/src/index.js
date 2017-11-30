import koa from 'koa'
import koaRouter from 'koa-router'
import koaCors from 'koa-cors'
import corsError from 'koa2-cors-error'
import { connect as createDB } from '~/service/mongo'
import initRoutes from './routes'
import { createToken } from '~/util/token'

import { PORT, JWT_PRIVATE_KEY } from '~/config'

const logError = err =>
  process.env.NODE_ENV === 'test'
    ? console.error('got error:', err.message)
    : console.error(err)

export const create_ = async () => {
  const app = new koa()

  // will be available in context from all request
  app.context.db = await createDB()
  app.context.logError = logError

  const router = new koaRouter()

  initRoutes(router)

  app.use(
    koaCors({
      origin: '*',
      headers: ['Authorization', 'Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  )
  app.use(corsError())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', logError)

  const server = app.listen(PORT)

  // console.log(`server listening on port ${PORT}`)
  // console.log(`signature key : ${JWT_PRIVATE_KEY}`)
  // console.log(`admin token : ${createToken('admin')()}`)

  // kill server
  return () => {
    app.context.db.close()
    server.close()
  }
}

export const create = () =>
  create_().catch(err => {
    logError(err)
    throw err
  })
