export const requireResource = (
  path: string,
  query?: Object,
  limit: number = 1
) => ({
  type: 'resource:require',
  path,
  limit,
  query: query || {},
  key: Math.random()
    .toString(16)
    .slice(2),
})
