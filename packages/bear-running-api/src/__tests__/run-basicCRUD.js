import test from 'tape'
import { wrap } from './util/server'
import { createAdmin } from './util/client'
import type { User } from 'types/User'
import type { Run } from 'types/Run'

let userId = 'null'
let runId = 'null'
test('[bootstrap] create a user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch('/user', {
      method: 'POST',
      body: {
        name: 'tim',
        picture: 'tim.jpg',
      },
    })

    userId = res.id
  })

  t.end()
})

test('create a run', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const run = {
      steps: [{ geoloc: { lat: 0, lng: 0 }, date: Date.now() }],
    }

    const res = await fetch(`/user/${userId}/run`, {
      method: 'POST',
      body: run,
    })

    t.pass('request ok')

    Run.assert(res)

    t.pass('response is a Run')

    runId = res.id
  })

  t.end()
})

test('get a run', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/run/${runId}`)

    t.pass('request ok')

    Run.assert(res)

    t.pass('response is a Run')
  })

  t.end()
})

test('update a run', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/run/${runId}`, {
      method: 'PUT',
      body: { steps: [{ geoloc: { lat: 1, lng: 1 }, date: 0 }] },
    })

    t.pass('request ok')

    Run.assert(res)

    t.pass('response is a Run')

    t.equal(res.steps[0].geoloc.lat, 1, 'should have the steps updated')
  })

  t.end()
})

test('remove a run', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    await fetch(`/user/${userId}/run/${runId}`, {
      method: 'DELETE',
    })

    t.pass('request ok')

    let error = null
    await fetch(`/user/${userId}/run/${runId}`).catch(x => (error = x))

    t.assert(error, 'run is no longer retreivable')
  })

  t.end()
})
