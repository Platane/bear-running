import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUserManager, createUser } from './util/client'
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

test('[bootstrap] create some runs', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

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

test('get all runs for a user by date descending', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/run?limit=2&orderBy=-date_start`)

    t.pass('request ok')

    t.equal(res.items.length, 2, 'should have two items')

    t.assert(res.nextCursor, 'should have a nextCursor')

    t.pass('next request ( with cursor )')

    const res2 = await fetch(`/user/${userId}/run?cursor=${res.nextCursor}`)

    t.pass('request ok')

    t.assert(!res2.nextCursor, 'should not have a nextCursor')

    const items = [...res.items, ...res2.items]

    t.equal(items.length, 3, 'should have 3 items total')

    items.forEach(run => Run.assert(run))

    t.pass('every item is a Run')

    t.deepEqual(
      items.map(x => x.steps[0].date),
      [2, 1, 0],
      'should be ordered by date descending'
    )
  })

  t.end()
})

test('get all runs for a user by date acsending', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/run?limit=2&orderBy=date_start`)

    const res2 = await fetch(`/user/${userId}/run?cursor=${res.nextCursor}`)

    t.pass('requests ok')

    const items = [...res.items, ...res2.items]

    t.deepEqual(
      items.map(x => x.steps[0].date),
      [0, 1, 2],
      'should be ordered by date ascending'
    )
  })

  t.end()
})

test('get all runs between min and max date', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(
      `/user/${userId}/run?date_start_min=0.5&date_start_max=1.5`
    )

    t.pass('requests ok')

    t.equal(res.items.length, 1, 'should return 1 item')

    t.equal(res.items[0].steps[0].date, 1, 'date should be between extrema')
  })

  t.end()
})
