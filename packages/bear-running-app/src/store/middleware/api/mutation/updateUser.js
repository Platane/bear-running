import { selectToken } from '~/store/selector/token'
import { set, merge } from '~/util/reduxHelper'
import fetch from '~/service/fetch'
import { trimProperties } from '~/util/object'

export const actionType = 'mutation:updateUser'

export const optimisticUpdate = (cache, action) =>
  merge(cache, ['entities', 'user', action.user.id], action.user)

export const update = (cache, action, res) =>
  set(cache, ['entities', 'user', res.id], res)

export const exec = async (store, action) =>
  fetch(selectToken(store.getState()), `user/${action.user.id}`, {
    method: 'PUT',
    body: trimProperties(['id'])(action.user),
  })
