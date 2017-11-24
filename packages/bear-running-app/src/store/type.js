import type { State as RouterState } from './reducer/router/type'
import type { State as AuthState } from './reducer/auth/type'

export type State = {
  router: RouterState,
  auth: AuthState,
}
