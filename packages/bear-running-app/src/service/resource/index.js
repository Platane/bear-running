import { set, merge } from '~/util/reduxHelper'
import { removeDupId } from '~/util/array'

const queryToKey = query =>
  '{' +
  Object.keys(query || {})
    .filter(key => !['cursor', 'limit'].includes(key))
    .sort()
    .map(key => `${key}:${query[key]}`)
    .join(',') +
  '}'

const resourceToKey = (resourcePath, resourceQuery) =>
  resourcePath + '?' + queryToKey(resourceQuery)

const getEnrityName = resourcePath => {
  const path = resourcePath.split('/')
  return path[((path.length - 1) >> 1) << 1]
}

export const getResource = (cache, resourcePath, resourceQuery = {}) => {
  const { entities, queries } = cache

  const path = resourcePath.split('/')
  const entityName = getEnrityName(resourcePath)

  const c = entities[entityName] || {}

  if (path.length % 2 === 0) {
    // one unique entity

    const id = path[path.length - 1]

    return c[id]
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    return !queries[key] ? [] : queries[key].items.map(id => c[id])
  }
}

export const getQuery = (cache, resourcePath, resourceQuery = {}) => {
  const { queries } = cache

  const path = resourcePath.split('/')

  if (path.length % 2 === 0) {
    // one unique entity

    return {}
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    return !queries[key]
      ? resourceQuery
      : { ...resourceQuery, cursor: queries[key].nextCursor }
  }
}

export const pushToCache = (cache, resourcePath, resourceQuery, res) => {
  const path = resourcePath.split('/')
  const entityName = getEnrityName(resourcePath)

  if (path.length % 2 === 0) {
    // one unique entity

    const id = path[path.length - 1]

    return set(cache, ['entities', entityName, id], res)
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    const items = removeDupId([
      ...(cache.queries[key] ? cache.queries[key].items : []),
      ...res.items.map(x => x.id),
    ])

    const query = {
      items,
      nextCursor: res.nextCursor,
    }

    const newEntities = { ...cache.entities }
    const pool = (newEntities[entityName] = newEntities[entityName] || {})
    res.items.forEach(item => (pool[item.id] = item))

    return {
      entities: newEntities,
      queries: { ...cache.queries, [key]: query },
    }
  }
}
