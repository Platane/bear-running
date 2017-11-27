export type State = {
  toFetch: { query: Object, path: string, key: string }[],
  cache: {
    entities: { [string]: Object },
    queries: { [string]: { cursor: string, items: string[] } },
  },
}
