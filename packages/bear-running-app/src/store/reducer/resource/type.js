import type { Cache } from '~/service/resource/type'

export type State = {
  toFetch: { query: Object, path: string, key: string }[],
  cache: Cache,
}
