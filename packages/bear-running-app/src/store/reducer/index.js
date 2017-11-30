import { combineReducers } from 'redux'

import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'
import { reduce as router, defaultState as routerDefaultState } from './router'
import { reduce as addRun, defaultState as addRunDefaultState } from './addRun'
import { reduce as auth, defaultState as authDefaultState } from './auth'
import {
  reduce as notification,
  defaultState as notificationDefaultState,
} from './notification'

import type { State } from '../type'

export const reduce = combineReducers({
  notification,
  resource,
  router,
  auth,
  addRun,
})

export const defaultState: State = {
  notification: notificationDefaultState,
  resource: resourceDefaultState,
  router: routerDefaultState,
  addRun: addRunDefaultState,
  auth: authDefaultState,
}
