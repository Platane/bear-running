import { connect } from 'preact-redux'
import { UserRunList as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'

const injectState = connect(null, {})

const injectData = withResource({
  getResource: ({ userId }) => userId && { path: `user/${userId}/run` },
  toProps: ({ resource, loaded, haveMore }) => ({
    runs: resource || [],
    loading: !loaded,
    loaded,
    haveMore,
  }),
})

export const UserRunList = injectState(injectData(Dumb))
