import { getHandler } from '~/store/middleware/api'

import type { State } from './type'

export const reduce = (state: State, action): State => {
  switch (action.type) {
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
