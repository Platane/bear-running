import { connect } from 'preact-redux'
import { UserList as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'

const injectState = connect(null, {})

const injectData = withResource({
  getResource: () => ({
    path: `user`,
  }),
  toProps: ({ resource, loaded, haveMore }) => ({
    users: resource || [],
    loading: !loaded,
    loaded,
    haveMore,
  }),
})

export const UserList = injectState(injectData(Dumb))
