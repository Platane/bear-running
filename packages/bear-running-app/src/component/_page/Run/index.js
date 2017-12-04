import { connect } from 'preact-redux'
import { Run as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'
import { hideFrom } from '~/component/_abstract/hoc.hideProps'
import { updateRun, removeRun } from '~/store/action/mutation'
import { compose } from '~/util/compose'

export const Run = compose(
  // inject data fetched
  withResource({
    getResource: ({ userId, runId }) =>
      userId && runId && { path: `user/${userId}/run/${runId}` },
    toProps: ({ resource }) => ({
      run: resource,
    }),
  }),

  // inject actions
  connect(null, {
    changeWeather: (id, weather) => updateRun({ id, weather }),
    changeSteps: (id, steps) => updateRun({ id, steps }),
    removeRun,
  }),

  // allows changeTeam only for them
  hideFrom({
    changeWeather: ['mySelf', 'admin'],
    changeSteps: ['mySelf', 'admin'],
    removeRun: ['mySelf', 'admin'],
  })
)(Dumb)
