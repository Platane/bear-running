import { connect } from 'preact-redux'
import { UserStats as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'
import { compose } from '~/util/compose'

export const UserStats = compose(
  // inject data fetched
  withResource({
    getResource: ({ userId, start, end }) =>
      userId && {
        path: `user/${userId}/run`,
        query: {
          date_start_min: start,
          date_start_max: end,
          orberBy: '-date_start',
        },
      },
    toProps: ({ resource, loaded }) => ({
      runs: resource || [],
      loading: !loaded,
    }),
  })
)(Dumb)
