import { combineReducers } from 'redux'

import { reduce as router, defaultState as routerDefaultState } from './router'
import { reduce as auth, defaultState as authDefaultState } from './auth'

import type { State } from '../type'

export const reduce = combineReducers({
  router,
  auth,
})

export const defaultState: State = {
  router: routerDefaultState,
  auth: authDefaultState,
}
