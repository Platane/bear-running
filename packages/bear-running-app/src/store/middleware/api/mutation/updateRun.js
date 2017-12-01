import { selectToken } from '~/store/selector/token'
import { set, merge } from '~/util/reduxHelper'
import fetch from '~/service/fetch'
import { trimProperties } from '~/util/object'

export const actionType = 'mutation:updateRun'

// this is a little hacky i suppose
const getUserId = runId =>
  btoa(
    atob(runId)
      .split('/')
      .slice(0, 2)
      .join('/')
  )

export const optimisticUpdate = (cache, action) =>
  merge(cache, ['entities', 'run', action.run.id], action.run)

export const update = (cache, action, res) =>
  set(cache, ['entities', 'run', res.id], res)

export const exec = async (store, action) =>
  fetch(
    selectToken(store.getState()),
    `user/${getUserId(action.run.id)}/run/${action.run.id}`,
    {
      method: 'PUT',
      body: trimProperties(['id'])(action.run),
    }
  )
