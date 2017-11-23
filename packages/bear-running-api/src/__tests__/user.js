import test from 'tape'
import { wrap } from './util/server'
import { createAdmin } from './util/client'
import type { User } from 'types/User'

let userId = null
test('create a user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const user = {
      name: 'tim',
      picture: 'tim.jpg',
    }

    const res = await fetch('/user', {
      method: 'POST',
      body: user,
    })

    t.pass('request ok')

    User.assert(res)

    t.pass('response is a User')

    t.equal(user.name, res.name, 'should have the name')

    userId = res.id
  })

  t.end()
})

test('get a user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}`)

    t.pass('request ok')

    User.assert(res)

    t.pass('response is a User')
  })

  t.end()
})

test('update a user', async t => {
  await wrap(async () => {
    const fetch = createAdmin()

    const res = await fetch(`/user/${userId}`, {
      method: 'PUT',
      body: { name: 'tim bis' },
    })

    t.pass('request ok')

    User.assert(res)

    t.pass('response is a User')

    t.equal(res.name, 'tim bis', 'should have the name updated')
  })

  t.end()
})
