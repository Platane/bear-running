import { connect } from 'preact-redux'
import { InputDateRange as Dumb } from './Dumb'
import injectState from './hoc.state'

export const InputDateRange = injectState(Dumb)
