import { connect } from 'preact-redux'
import { CurrentRun as Dumb } from './Dumb'
import {
  startRun,
  endRun,
  changeCurrentRunWeather,
} from '~/store/action/addRun'
import { saveRun } from '~/store/action/mutation'

const injectState = connect(({ addRun }) => addRun, {
  startRun,
  endRun,
  saveRun,
  changeCurrentRunWeather,
})

export const CurrentRun = injectState(Dumb)
