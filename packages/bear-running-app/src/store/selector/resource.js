import { createSelector } from 'reselect'
import {
  getResource,
  isResourceLoaded,
  haveMoreResource,
} from '~/service/resource'

const cache = state => state.resource.cache

export const selectResource = (resourcePath, resourceQuery, limit) => state =>
  getResource(cache(state), resourcePath, resourceQuery, limit)

export const selectResourceLoaded = (
  resourcePath,
  resourceQuery,
  limit
) => state => isResourceLoaded(cache(state), resourcePath, resourceQuery, limit)

export const selectResourceHaveMore = (
  resourcePath,
  resourceQuery,
  limit
) => state => haveMoreResource(cache(state), resourcePath, resourceQuery, limit)
