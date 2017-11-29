import { connect } from 'preact-redux'
import { CurrentRun as Dumb } from './Dumb'
import { startRun, endRun } from '~/store/action/addRun'
import { saveRun } from '~/store/action/mutation'

const injectState = connect(({ addRun }) => addRun, {
  startRun,
  endRun,
  saveRun,
})

export const CurrentRun = injectState(Dumb)
