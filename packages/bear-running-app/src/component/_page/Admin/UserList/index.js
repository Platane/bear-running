import { connect } from 'preact-redux'
import { UserList as Dumb } from './Dumb'
import { updateUserRole, removeUser } from '~/store/action/mutation'
import { withResource } from '~/component/_abstract/hoc.withResource'

const injectState = connect(null, {
  updateUserRole,
  removeUser,
})

const injectData = withResource({
  getResource: () => ({ path: `user` }),
  toProps: ({ resource, loaded, haveMore }) => ({
    users: resource || [],
    loaded,
    haveMore,
  }),
})

export const UserList = injectState(injectData(Dumb))
