import type { State as RouterState } from './reducer/router/type'
import type { State as AuthState } from './reducer/auth/type'
import type { State as AddRunState } from './reducer/addRun/type'

export type State = {
  router: RouterState,
  addRun: AddRunState,
  auth: AuthState,
}
