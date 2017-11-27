import { set } from '~/util/reduxHelper'
import { removeDup } from '~/util/array'
import { getEntityName, isList, resourceToKey } from './util'
import type { Cache, Res } from './type'

export const pushToCache = (
  cache: Cache,
  resourcePath: string,
  resourceQuery?: Object,
  res: Res
): Cache => {
  const entityName = getEntityName(resourcePath)

  if (!isList(resourcePath)) {
    // one unique entity

    const id = resourcePath.split('/').slice(-1)[0]

    return set(cache, ['entities', entityName, id], res)
  } else {
    // multiple entities

    const key = resourceToKey(resourcePath, resourceQuery)

    const items = removeDup([
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
