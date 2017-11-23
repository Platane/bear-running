import { createToken } from './token'
import fetch from 'node-fetch'
import { PORT } from '~/config'

import type { Role } from 'types/Role'

const endpoint = `http://localhost:${PORT}`

export const createClient = (role: Role) => (userId?: string) => (
  url: string,
  options: * = {}
) =>
  fetch(endpoint + url, {
    ...options,
    body: options.body && JSON.stringify(options.body),
    headers: {
      Authorization: `Bearer ${createToken(role)(userId)}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  }).then(async res => {
    if (!res.ok) throw new Error(await res.text())

    return res.json()
  })

export const createAdmin = createClient('admin')
export const createUser = createClient('user')
export const createUserManager = createClient('userManager')
