import { API_URL } from '~/config'
import { stringify } from 'querystring'
import { selectToken } from '~/store/selector/token'

console.log('API_URL', API_URL)

const _fetch = (token, path, query = {}) =>
  fetch(`${API_URL}/${path}?${stringify(query)}`, {
    headers: { Authorization: `Bearer ${token || 'anonym'}` },
  }).then(async res => {
    if (!res.ok) throw Error(`${res.status} - ${await res.text()}`)

    return res.json()
  })

export const init = store => {
  const pending = {}

  const update = () => {
    const state = store.getState()

    const next = state.resource.toFetch.filter(x => !pending[x.key])[0]

    if (!next) return

    pending[next.key] = true

    _fetch(selectToken(state), next.path, next.query)
      .then(res => store.dispatch({ type: 'resource:fetched', ...next, res }))
      .catch(err => console.error(err))

    update()
  }

  update()

  store.subscribe(update)
}
