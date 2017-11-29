import { selectToken } from '~/store/selector/token'
import { set, merge } from '~/util/reduxHelper'
import fetch from '~/service/fetch'

export const actionType = 'mutation:updateUserRole'

export const optimisticUpdate = (cache, action) =>
  set(cache, ['entities', 'user', action.userId, 'role'], action.role)

export const update = (cache, action, res) =>
  set(cache, ['entities', 'user', res.id], res)

export const exec = async (store, action) =>
  fetch(selectToken(store.getState()), `user/${action.userId}/role`, {
    method: 'PUT',
    body: { role: action.role },
  })
