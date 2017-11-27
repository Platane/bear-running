import {
  pushToCache,
  isResourceLoaded,
  getResource,
  getQuery,
} from '~/service/resource'
import { set, merge } from '~/util/reduxHelper'

import type { State } from './type'

export const defaultState = {
  toFetch: [],
  cache: { entities: {}, queries: {} },
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'resource:require': {
      const { key, query, path, limit } = action

      if (!isResourceLoaded(state.cache, path, query))
        return {
          ...state,
          toFetch: [
            ...state.toFetch,
            { query: getQuery(state.cache, path, query), path, key },
          ],
        }

      break
    }

    case 'resource:fetched':
      return set(
        state,
        ['cache'],
        pushToCache(state.cache, action.path, action.query, action.res)
      )
  }

  return state
}
