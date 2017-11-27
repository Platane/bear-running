import { createSelector } from 'reselect'
import { getResource } from '~/service/resource'

const cache = state => state.resource.cache

export const selectResource = (resourcePath, resourceQuery) => state =>
  getResource(cache(state), resourcePath, resourceQuery)
