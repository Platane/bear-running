import { connect } from 'preact-redux'
import { UserMenu as Dumb } from './Dumb'
import { logout } from '~/store/action/auth'
import { withResource } from '~/component/_abstract/hoc.withResource'
import injectOpenState from './hoc.state'

const injectState = connect(
  state => ({
    userId: state.auth.user && state.auth.user.id,
    role: state.auth.user && state.auth.user.role,
  }),
  {
    logout,
  }
)

const injectData = withResource({
  getResource: state => state.userId && { path: `user/${state.userId}` },
  toProps: ({ resource }) => ({ user: resource }),
})

export const UserMenu = injectOpenState(injectState(injectData(Dumb)))
