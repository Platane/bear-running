import koa from 'koa'
import koaRouter from 'koa-router'
import koaCors from 'koa-cors'
import { connect as createDB } from '~/service/mongo'
import initRoutes from './routes'

import { PORT } from '~/config'

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
      methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    })
  )
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', logError)

  const server = app.listen(PORT)

  console.log(`server listening on port ${PORT}`)

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
