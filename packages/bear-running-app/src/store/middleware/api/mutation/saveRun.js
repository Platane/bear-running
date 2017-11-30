import { selectToken } from '~/store/selector/token'
import { set, merge } from '~/util/reduxHelper'
import fetch from '~/service/fetch'

export const actionType = 'mutation:saveRun'

// export const optimisticUpdate = (cache, action) =>
//   set(cache, ['entities', 'user', action.userId, 'role'], action.role)

export const update = (cache, action, res) => {
  const entities = set(cache.entities, ['run', res.id], res)

  // invalid cache for queries that may involve the new run
  // much simpler that doing smart things to update the cache
  const queries = {}
  Object.keys(cache.queries)
    .filter(
      key => !key.includes(`user/${res.user_id}/run`) && !key.match(/^run/)
    )
    .forEach(key => (queries[key] = cache.queries[key]))

  return {
    ...cache,
    entities,
    queries,
  }
}

export const exec = async (store, action) => {
  const state = store.getState()

  const status = state.addRun.status
  if (status !== 'saving') return Promise.reject(new Error('run is not ended'))

  const userId = state.auth.user.id
  const run = state.addRun.currentRun
  if (!userId || !run) return Promise.reject(new Error('no run to save'))

  return fetch(selectToken(state), `user/${userId}/run`, {
    method: 'POST',
    body: run,
  })
}
