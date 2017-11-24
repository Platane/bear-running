import { combineReducers } from 'redux'

import { reduce as router, defaultState as routerDefaultState } from './router'

import type { State } from '../type'

export const reduce = combineReducers({
  router,
})

export const defaultState: State = {
  router: routerDefaultState,
}
