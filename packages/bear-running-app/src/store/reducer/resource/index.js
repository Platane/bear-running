import { reduce as reduce1 } from './reduceMutation'
import { reduce as reduce2 } from './reducePendingMutation'
import { reduce as reduce3 } from './reducerResourceFetcher'

import { chainReducer } from '~/util/reduxHelper'

import type { State } from './type'

export const defaultState = {
  toFetch: [],
  pendingMutations: [],
  optimisticBackups: {},
  cache: { entities: {}, queries: {} },
}

const reduceDefault = (state: State, action): State =>
  (state = state || defaultState)

export const reduce = chainReducer(reduceDefault, reduce1, reduce2, reduce3)
