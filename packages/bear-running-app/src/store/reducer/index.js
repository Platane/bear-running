import { combineReducers } from 'redux'

import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'
import { reduce as router, defaultState as routerDefaultState } from './router'
import { reduce as auth, defaultState as authDefaultState } from './auth'

import type { State } from '../type'

export const reduce = combineReducers({
  resource,
  router,
  auth,
})

export const defaultState: State = {
  resource: resourceDefaultState,
  router: routerDefaultState,
  auth: authDefaultState,
}
