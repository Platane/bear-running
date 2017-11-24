export type Location = {
  pathname: string,
  search: string,
}

export type Route = {
  path: string,
  key: string,
}

export type Output = {
  key: string | null,
  path: string,
  param: Object,
}
