import { selectToken } from '~/store/selector/token'
import { set, merge } from '~/util/reduxHelper'
import fetch from '~/service/fetch'

export const actionType = 'mutation:removeUser'

export const update = (cache, action) => {
  const queries = {}

  Object.keys(cache.queries).forEach(
    key =>
      (queries[key] = {
        ...cache.queries[key],
        items: cache.queries[key].items.filter(x => x !== action.userId),
      })
  )

  return {
    ...cache,
    queries,
  }
}

export const optimisticUpdate = update

export const exec = async (store, action) =>
  fetch(selectToken(store.getState()), `user/${action.userId}`, {
    method: 'DELETE',
  })
