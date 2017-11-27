import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { auth } from '~/service/auth'
import { logout } from '~/store/action/auth'
import { withResource } from '~/component/_abstract/hoc.withResource'

const injectState = connect(
  state => ({
    login: auth,
    userId: state.auth.user && state.auth.user.id,
  }),
  {
    logout,
  }
)

const injectData = withResource({
  getResource: state => state.userId && { path: `user/${state.userId}` },
  toProps: ({ resource }) => ({ user: resource }),
})

export const Header = injectState(injectData(Dumb))
