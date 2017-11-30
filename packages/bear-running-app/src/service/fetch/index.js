import { API_URL } from '~/config'
import { stringify } from 'querystring'
import { error } from '~/util/reporter'

export default (token?: string, path?: string, { query, method, body } = {}) =>
  fetch(`${API_URL}/${path}?${stringify(query)}`, {
    method: method || 'GET',
    body: (body && JSON.stringify(body)) || null,
    headers: {
      Authorization: `Bearer ${token || 'anonym'}`,
      'content-type': (body && 'application/json') || null,
    },
  })
    .then(async res => {
      if (!res.ok) throw Error(`${res.status} - ${await res.text()}`)

      return res.json()
    })
    .catch(err => {
      error(err)
      throw err
    })
