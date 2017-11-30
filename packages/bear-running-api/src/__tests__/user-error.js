import test from 'tape'
import { wrap } from './util/server'
import { createAdmin, createUserManager, createUser } from './util/client'
import type { User } from 'types/User'

test('update removed user', async t => {
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

    await fetch(`/user/${res.id}`, {
      method: 'DELETE',
    })

    let error
    await fetch(`/user/${res.id}`, {
      method: 'PUT',
      body: { name: 'tim bis' },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})

test('update non to existing team', async t => {
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

    let error
    await fetch(`/user/${res.id}`, {
      method: 'PUT',
      body: { team: 'tim bis' },
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})

test('remove non existing user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    let error
    await fetch(`/user/notfound`, {
      method: 'DELETE',
    }).catch(x => (error = x))

    t.assert(error, 'should error')
  })

  t.end()
})
