import {
  pushToCache,
  isResourceLoaded,
  getResource,
  getQuery,
} from '~/service/resource'
import {} from '~/service/resource/util'
import { set, merge } from '~/util/reduxHelper'
import { getHandler } from '~/store/middleware/api'

import type { State } from './type'

export const defaultState = {
  toFetch: [],
  optimisticBackups: {},
  cache: { entities: {}, queries: {} },
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

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

    case 'mutation:start': {
      const handler = getHandler(action.action)

      // the mutation can alter the state before the api return
      if (handler.optimisticUpdate) {
        // alter the state
        const cache = handler.optimisticUpdate(state.cache, action.action)

        // set up a rollback point, in case the request fails
        const optimisticBackups = {
          ...state.optimisticBackups,
          [action.key]: state.cache,
        }

        return {
          ...state,
          cache,
          optimisticBackups,
        }
      }
      break
    }

    case 'mutation:success': {
      // remove the optimisticBackups ( if exist )
      let optimisticBackups = state.optimisticBackups
      if (optimisticBackups[action.key]) {
        optimisticBackups = { ...optimisticBackups }
        delete optimisticBackups[action.key]
      }

      // alter the state
      const cache = getHandler(action.action).update(
        state.cache,
        action.action,
        action.res
      )

      return {
        ...state,
        cache,
        optimisticBackups,
      }
    }

    case 'mutation:error': {
      // rollback the cache ( if exists )
      if (state.optimisticBackups[action.key]) {
        const cache = state.optimisticBackups[action.key]

        const optimisticBackups = { ...state.optimisticBackups }
        delete optimisticBackups[action.key]

        return {
          ...state,
          cache,
          optimisticBackups,
        }
      }
      break
    }
  }

  return state
}
