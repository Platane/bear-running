import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { auth } from '~/service/auth'
import { logout } from '~/store/action/auth'

const injectState = connect(state => ({
  login: auth,
  userId: state.auth.user && state.auth.user.id,
  role: state.auth.user && state.auth.user.role,
}))

export const Header = injectState(Dumb)
