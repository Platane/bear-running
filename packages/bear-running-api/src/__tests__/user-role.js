import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUser, createUserManager } from './util/client'
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

test('set role as simple user', async t => {
  await wrap(async () => {
    const fetch = createUser()

    let error
    await fetch(`/user/${userId}/role`, {
      method: 'PUT',
      body: { role: 'admin' },
    }).catch(x => (error = x))

    t.assert(error, 'request failed')
  })

  t.end()
})

test('set admin as userManager', async t => {
  await wrap(async () => {
    const fetch = createUserManager()

    let error
    await fetch(`/user/${userId}/role`, {
      method: 'PUT',
      body: { role: 'admin' },
    }).catch(x => (error = x))

    t.assert(error, 'request failed')
  })

  t.end()
})

test('set userManager as userManager', async t => {
  await wrap(async () => {
    const fetch = createUserManager()

    const res = await fetch(`/user/${userId}/role`, {
      method: 'PUT',
      body: { role: 'userManager' },
    })

    t.equal(res.role, 'userManager', 'user role is set')
  })

  t.end()
})

test('set admin as admin', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}/role`, {
      method: 'PUT',
      body: { role: 'admin' },
    })

    t.equal(res.role, 'admin', 'user role is set')
  })

  t.end()
})

test('degrade an admin to user as userManager', async t => {
  await wrap(async () => {
    const fetch = createUserManager()

    let error
    await fetch(`/user/${userId}/role`, {
      method: 'PUT',
      body: { role: 'user' },
    }).catch(x => (error = x))

    t.assert(error, 'request failed')
  })

  t.end()
})
