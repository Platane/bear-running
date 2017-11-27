import { createSelector } from 'reselect'
import { getResource, isResourceLoaded } from '~/service/resource'

const cache = state => state.resource.cache

export const selectResource = (resourcePath, resourceQuery) => state =>
  getResource(cache(state), resourcePath, resourceQuery)

export const selectResourceLoaded = (resourcePath, resourceQuery) => state =>
  isResourceLoaded(cache(state), resourcePath, resourceQuery)
