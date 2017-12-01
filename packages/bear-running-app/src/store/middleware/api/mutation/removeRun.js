import { selectToken } from '~/store/selector/token'
import fetch from '~/service/fetch'

export const actionType = 'mutation:removeRun'

// this is a little hacky i suppose
const getUserId = runId =>
  btoa(
    atob(runId)
      .split('/')
      .slice(0, 2)
      .join('/')
  )

export const update = (cache, action) => {
  const queries = {}

  Object.keys(cache.queries).forEach(
    key =>
      (queries[key] = {
        ...cache.queries[key],
        items: cache.queries[key].items.filter(x => x !== action.runId),
      })
  )

  return {
    ...cache,
    queries,
  }
}

export const optimisticUpdate = update

export const exec = async (store, action) =>
  fetch(
    selectToken(store.getState()),
    `user/${getUserId(action.runId)}/run/${action.runId}`,
    {
      method: 'DELETE',
    }
  )
