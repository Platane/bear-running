import { connect } from 'preact-redux'
import { User as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'
import { hideFrom } from '~/component/_abstract/hoc.hideProps'
import { updateUser, updateRun, removeRun } from '~/store/action/mutation'
import { compose } from '~/util/compose'

export const User = compose(
  // inject data fetched
  withResource({
    getResource: ({ userId }) => userId && { path: `user/${userId}` },
    toProps: ({ resource }) => ({
      user: resource,
    }),
  }),

  // inject actions
  connect(null, {
    changeTeam: (id, team) => updateUser({ team, id }),
    changeWeather: (id, weather) => updateRun({ id, weather }),
    removeRun,
  }),

  // allows changeTeam only for them
  hideFrom({
    changeTeam: ['mySelf', 'admin', 'userManager'],
    changeWeather: ['mySelf', 'admin'],
    removeRun: ['mySelf', 'admin'],
  })
)(Dumb)
