import { connect } from 'preact-redux'
import { CurrentRun as Dumb } from './Dumb'
import { startRun, endRun } from '~/store/action/addRun'

const injectState = connect(({ addRun }) => addRun, {
  startRun,
  endRun,
  saveRun: () => ({ type: 'save' }),
})

export const CurrentRun = injectState(Dumb)
