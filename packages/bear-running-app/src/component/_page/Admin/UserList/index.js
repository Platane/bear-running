import { connect } from 'preact-redux'
import { UserList as Dumb } from './Dumb'
import { updateUser, updateUserRole, removeUser } from '~/store/action/mutation'
import { withResource } from '~/component/_abstract/hoc.withResource'

const injectState = connect(null, {
  updateUserRole,
  removeUser,
  updateUser,
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
