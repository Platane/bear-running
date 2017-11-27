export type Cache = {
  entities: { [string]: Object },
  queries: { [string]: { cursor: string, items: string[] } },
}

export type Res = Object | { items: Object, nextCursor?: String }
