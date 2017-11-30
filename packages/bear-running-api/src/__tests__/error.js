import test from 'tape'
import { wrap } from './util/server'
import fetch from 'node-fetch'
import { PORT } from '~/config'

const endpoint = `http://localhost:${PORT}`

test('look for cors on 4xx', async t => {
  await wrap(async () => {
    let error
    const res = await fetch(`${endpoint}/user/notfounduser`)

    t.assert(!res.ok, 'request should have failed')

    t.equal(res.status, 404, 'request should have failed with 404')

    t.deepEqual(
      res.headers.get('access-control-allow-origin'),
      '*',
      'cors should be set'
    )
  })

  t.end()
})
