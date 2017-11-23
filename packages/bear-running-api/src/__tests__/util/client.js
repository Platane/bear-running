import { createToken } from './token'
import fetch from 'node-fetch'
import { PORT } from '~/config'

const endpoint = `http://localhost:${PORT}`

export const createClient = role => () => (url, options = {}) =>
  fetch(endpoint + url, {
    ...options,
    body: options.body && JSON.stringify(options.body),
    headers: {
      Authorization: `Bearer ${createToken(role)()}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  }).then(async res => {
    if (!res.ok) throw new Error(await res.text())

    return res.json()
  })

export const createAdmin = createClient('admin')
