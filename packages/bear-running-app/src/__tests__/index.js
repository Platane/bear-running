import { create } from '~/store'
import { wrap } from 'api/__tests__/util/server'
import { context } from './context'
import bootstrap from './bootstrap'
import test from 'tape'

test('create an app, check for data hydratation', async t => {
  await wrap(async () => {
    console.log(context.userId)

    t.assert(context.userId)

    const store = create()
  })

  t.end()
})
