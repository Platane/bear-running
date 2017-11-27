import { wrap } from 'api/__tests__/util/server'
import { createAdmin } from 'api/__tests__/util/client'
import { context } from './context'
import test from 'tape'

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

    context.userId = res.id
  })

  t.end()
})

test('[bootstrap] create some runs', async t => {
  await wrap(async () => {
    const fetch = createAdmin()
    const { userId } = context

    await fetch(`/user/${userId}/run`, {
      method: 'POST',
      body: {
        steps: [{ geoloc: { lat: 0, lng: 0 }, date: 0 }],
      },
    })
    await fetch(`/user/${userId}/run`, {
      method: 'POST',
      body: {
        steps: [{ geoloc: { lat: 0, lng: 0 }, date: 1 }],
      },
    })
    await fetch(`/user/${userId}/run`, {
      method: 'POST',
      body: {
        steps: [{ geoloc: { lat: 0, lng: 0 }, date: 2 }],
      },
    })
  })

  t.end()
})
