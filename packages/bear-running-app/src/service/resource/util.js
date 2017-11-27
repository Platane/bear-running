const queryToKey = query =>
  '{' +
  Object.keys(query || {})
    .filter(key => !['cursor', 'limit'].includes(key))
    .sort()
    .map(key => `${key}:${query[key]}`)
    .join(',') +
  '}'

export const resourceToKey = (resourcePath: string, resourceQuery?: Object) =>
  resourcePath + '?' + queryToKey(resourceQuery || {})

export const getEntityName = (resourcePath: string) => {
  const path = resourcePath.split('/')
  return path[((path.length - 1) >> 1) << 1]
}

export const isList = (resourcePath: string) =>
  resourcePath.split('/').length % 2 === 1
