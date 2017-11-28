import { getEntityName, isList, resourceToKey } from './util'
import type { Cache, Res } from './type'

export const getResource = (
  cache: Cache,
  resourcePath: String,
  resourceQuery?: Object = {}
) => {
  const { entities, queries } = cache

  const entityName = getEntityName(resourcePath)
  const c = entities[entityName] || {}

  if (!isList(resourcePath)) {
    // one unique entity

    const id = resourcePath.split('/').slice(-1)[0]

    return c[id]
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    return !queries[key] ? [] : queries[key].items.map(id => c[id])
  }
}

export const isResourceLoaded = (
  cache: Cache,
  resourcePath: String,
  resourceQuery?: Object = {},
  limit?: number = 1
) => {
  const { entities, queries } = cache

  const entityName = getEntityName(resourcePath)

  if (!isList(resourcePath)) {
    // one unique entity

    const id = resourcePath.split('/').slice(-1)[0]

    return (entities[entityName] || {})[id]
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    return queries[key]
      ? queries[key].items.length >= limit && !queries[key].nextCursor
      : false
  }
}

export const haveMoreResource = (
  cache: Cache,
  resourcePath: String,
  resourceQuery?: Object = {}
) => {
  const { entities, queries } = cache

  const entityName = getEntityName(resourcePath)

  if (!isList(resourcePath)) {
    // one unique entity

    const id = resourcePath.split('/').slice(-1)[0]

    return !(entities[entityName] || {})[id]
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    return queries[key] ? queries[key].nextCursor : true
  }
}

export const getQuery = (
  { queries }: Cache,
  resourcePath: String,
  resourceQuery?: Object = {}
) => {
  if (!isList(resourcePath)) return {}

  const key = resourceToKey(resourcePath, resourceQuery)

  return !queries[key]
    ? resourceQuery
    : { ...resourceQuery, cursor: queries[key].nextCursor }
}
