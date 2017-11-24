export type State = {
  user: {
    role: string,
    id: string,
  } | null,
  token: string | null,
}
