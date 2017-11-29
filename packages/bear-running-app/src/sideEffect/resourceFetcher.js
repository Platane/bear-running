import { selectToken } from '~/store/selector/token'
import fetch from '~/service/fetch'

export const init = store => {
  const pending = {}

  const update = () => {
    const state = store.getState()

    const next = state.resource.toFetch.filter(x => !pending[x.key])[0]

    if (!next) return

    pending[next.key] = true

    fetch(selectToken(state), next.path, { query: next.query })
      .then(res => store.dispatch({ type: 'resource:fetched', ...next, res }))
      .catch(err => store.dispatch({ type: 'resource:error', ...next, err }))

    update()
  }

  update()

  store.subscribe(update)
}
