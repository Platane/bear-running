import { pushToCache, isResourceLoaded, getQuery } from '~/service/resource'

import type { State } from './type'

export const reduce = (state: State, action): State => {
  switch (action.type) {
    case 'resource:require': {
      const { key, query, path, limit } = action

      // the resource is already available
      const loaded = isResourceLoaded(state.cache, path, query, limit)

      // the resource is currently being fetched, will be avilable soon
      const fetching = state.toFetch.some(x => x.path === path)

      if (!loaded && !fetching)
        return {
          ...state,
          toFetch: [
            ...state.toFetch,
            { query: getQuery(state.cache, path, query), path, key },
          ],
        }

      break
    }

    case 'resource:error': {
      // remove from toFetch
      const toFetch = state.toFetch.filter(x => x.key !== action.key)

      return {
        ...state,
        toFetch,
      }
    }

    case 'resource:fetched': {
      // remove from toFetch
      const toFetch = state.toFetch.filter(x => x.key !== action.key)

      // push to cache
      const cache = pushToCache(
        state.cache,
        action.path,
        action.query,
        action.res
      )

      return {
        ...state,
        cache,
        toFetch,
      }
    }
  }

  return state
}
