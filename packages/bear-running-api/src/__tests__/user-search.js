import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUserManager, createUser } from './util/client'
import type { User } from 'types/User'

test('[bootstrap] create some users', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    await fetch('/user', {
      method: 'POST',
      body: {
        name: 'lionel',
        picture: 'tim.jpg',
      },
    })

    await fetch('/user', {
      method: 'POST',
      body: {
        name: 'giorgio',
        picture: 'tim.jpg',
      },
    })

    await fetch('/user', {
      method: 'POST',
      body: {
        name: 'samuel',
        picture: 'tim.jpg',
      },
    })
  })

  t.end()
})

test('get all users by date ascending', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user?limit=2&orderBy=date_created`)

    t.pass('request ok')

    t.equal(res.items.length, 2, 'should have two items')

    t.assert(res.nextCursor, 'should have a nextCursor')

    t.pass('next request ( with cursor )')

    const res2 = await fetch(`/user?cursor=${res.nextCursor}`)

    t.pass('request ok')

    t.assert(!res2.nextCursor, 'should not have a nextCursor')

    const items = [...res.items, ...res2.items]

    t.assert(items.length >= 3, 'should have 3 items total ( at least )')

    items.forEach(user => User.assert(user))

    t.pass('every item is a User')

    t.deepEqual(
      items.map(x => x.date_created),
      items.map(x => x.date_created).sort()
    )
  })

  t.end()
})

test('get all users by name', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user?name=samuel`)

    t.pass('requests ok')

    t.assert(res.items.length >= 1, 'should have 1 items at least')

    res.items.forEach(user => user.name.toLowerCase().includes('samuel'))

    t.pass('every item respect the query')
  })

  t.end()
})
