import { connect } from 'preact-redux'
import { User as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'
import { updateUser } from '~/store/action/mutation'

const injectState = connect(null, {
  changeTeam: (id, team) => updateUser({ team, id }),
})

const injectData = withResource({
  getResource: ({ userId }) => userId && { path: `user/${userId}` },
  toProps: ({ resource }) => ({
    user: resource,
  }),
})

export const User = injectState(injectData(Dumb))
