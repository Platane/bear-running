import { connect } from 'preact-redux'
import { NetworkActivityIndicator as Dumb } from './Dumb'
import { auth } from '~/service/auth'
import { selectRequestPending } from '~/store/selector/requestPending'

const injectState = connect(state => ({
  loading: selectRequestPending(state),
}))

export const NetworkActivityIndicator = injectState(Dumb)
