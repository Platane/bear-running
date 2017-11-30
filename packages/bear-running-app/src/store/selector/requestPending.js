import { createSelector } from 'reselect'

const toFetch = state => state.resource.toFetch
const pendingMutations = state => state.resource.pendingMutations

export const selectRequestPending = createSelector(
  toFetch,
  pendingMutations,
  (a, b) => a.length + b.length > 0
)
