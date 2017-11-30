import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUserManager, createUser } from './util/client'
import type { User } from 'types/User'

let userId = 'null'
test('[bootstrap] create a user', async t => {
  await wrap(async () => {
    const fetch = createUser()

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

test('update the user as unrelated user', async t => {
  await wrap(async () => {
    const fetch = createUser()

    let error
    await fetch(`/user/${userId}`, {
      method: 'PUT',
      body: { name: 'tim bis' },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})

test('update the user as same user', async t => {
  await wrap(async () => {
    const fetch = createUser(userId)

    await fetch(`/user/${userId}`, {
      method: 'PUT',
      body: { name: 'tim a' },
    })

    t.pass('request ok')
  })

  t.end()
})

test('update the user as user manager', async t => {
  await wrap(async () => {
    const fetch = createUserManager()

    await fetch(`/user/${userId}`, {
      method: 'PUT',
      body: { name: 'tim b' },
    })

    t.pass('request ok')
  })

  t.end()
})
