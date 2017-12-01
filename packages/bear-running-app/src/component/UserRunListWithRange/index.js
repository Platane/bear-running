import { connect } from 'preact-redux'
import { UserRunListWithRange as Dumb } from './Dumb'
import { withResource } from '~/component/_abstract/hoc.withResource'
import injectQueryState from './hoc.state'

const injectData = withResource({
  getResource: ({ userId, start, end, sortingDescending }) =>
    userId && {
      path: `user/${userId}/run`,
      query: {
        date_start_min: start,
        date_start_max: end,
        orderBy: sortingDescending ? '-date_start' : 'date_start',
      },
    },
  toProps: ({ resource, loaded, haveMore }) => ({
    runs: resource || [],
    loading: !loaded,
    loaded,
    haveMore,
  }),
})

export const UserRunListWithRange = injectQueryState(injectData(Dumb))
