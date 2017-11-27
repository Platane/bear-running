import { write, read } from '~/service/localStorage'
import { selectToken } from '~/store/selector/token'

export const init = store => {
  const update = () => {
    const state = store.getState()
    write('bear-running-token', selectToken(state))
    write('bear-running-user', state.auth.user)
  }

  store.dispatch({
    type: 'storage:auth:read',
    token: read('bear-running-token'),
    user: read('bear-running-user'),
  })

  update()

  store.subscribe(update)
}
