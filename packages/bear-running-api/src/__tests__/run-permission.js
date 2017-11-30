import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUserManager, createUser } from './util/client'

let userId = 'null'
let runId = 'null'
test('[bootstrap] create a user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch('/user', {
      method: 'POST',
      body: {
        name: 'tim',
        team: 'topaze',
        picture: 'tim.jpg',
      },
    })

    userId = res.id
  })

  t.end()
})

test('[bootstrap] create a run', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/run`, {
      method: 'POST',
      body: {
        weather: 'sunny',
        steps: [{ geoloc: { lat: 0, lng: 0 }, date: 0 }],
      },
    })

    runId = res.id
  })

  t.end()
})

test('update the run as unrelated user', async t => {
  await wrap(async () => {
    const unrelatedUserId = 'fake'
    const fetch = createUser(unrelatedUserId)

    let error
    await fetch(`/user/${userId}/run/${runId}`, {
      method: 'PUT',
      body: { steps: [{ geoloc: { lat: 1, lng: 1 }, date: 1 }] },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})

test('update the run as unrelated user, forging the route', async t => {
  await wrap(async () => {
    const unrelatedUserId = 'fake'
    const fetch = createUser(unrelatedUserId)

    let error
    await fetch(`/user/${unrelatedUserId}/run/${runId}`, {
      method: 'PUT',
      body: { steps: [{ geoloc: { lat: 2, lng: 2 }, date: 2 }] },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})

test('update the run as run owner', async t => {
  await wrap(async () => {
    const fetch = createUser(userId)

    await fetch(`/user/${userId}/run/${runId}`, {
      method: 'PUT',
      body: { steps: [{ geoloc: { lat: 3, lng: 3 }, date: 3 }] },
    })

    t.pass('request ok')
  })

  t.end()
})

test('update the run as user manager', async t => {
  await wrap(async () => {
    const fetch = createUserManager()

    let error
    await fetch(`/user/${userId}/run/${runId}`, {
      method: 'PUT',
      body: { steps: [{ geoloc: { lat: 4, lng: 4 }, date: 4 }] },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})
