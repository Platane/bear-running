import { connect } from 'preact-redux'
import { ToastZone as Dumb } from './Dumb'
import injectToastController from './hoc.state'

const injectState = connect(({ notification }) => ({
  notification,
}))

export const ToastZone = injectState(injectToastController(Dumb))
