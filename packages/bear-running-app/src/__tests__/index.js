import { create } from '~/store'
import { wrap } from 'api/__tests__/util/server'
import { createToken } from 'api/util/token'
import { context } from './context'
import bootstrap from './bootstrap'
import test from 'tape'
import { requireResource } from '~/store/action/resource'
import { updateUserRole } from '~/store/action/mutation'
import { selectResource } from '~/store/selector/resource'
import { selectRequestPending } from '~/store/selector/requestPending'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import { waitFor } from './util/waitFor'

test('create an app, fetch one user', async t => {
  await wrap(async () => {
    const store = create([initResourceFetcher])

    store.dispatch(requireResource(`user/${context.userId}`))
    const selectUser = selectResource(`user/${context.userId}`)
    await waitFor(store, selectUser)

    const user = selectUser(store.getState())

    t.equal(user.id, context.userId, 'should have the user')
  })

  t.end()
})

test('create an app, fetch the runs from one user', async t => {
  await wrap(async () => {
    const store = create([initResourceFetcher])

    store.dispatch(requireResource(`user/${context.userId}/run`))
    const selectRuns = selectResource(`user/${context.userId}/run`)
    await waitFor(store, state => selectRuns(state).length)

    const runs = selectRuns(store.getState())

    t.equal(runs.length, 3, 'should have 3 users')
  })

  t.end()
})

test('create an app, set user role', async t => {
  await wrap(async () => {
    const store = create([initResourceFetcher])

    store.dispatch(requireResource(`user/${context.userId}`))
    const selectUser = selectResource(`user/${context.userId}`)
    await waitFor(store, selectUser)

    // inject admin token
    store.dispatch({ type: 'storage:auth:read', token: createToken('admin')() })

    store.dispatch(updateUserRole(context.userId, 'userManager'))

    await waitFor(store, state => !selectRequestPending(state))

    t.equal(
      selectUser(store.getState()).role,
      'userManager',
      'should have set the role'
    )
  })

  t.end()
})
