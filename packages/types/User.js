export type Team = 'citrus' | 'opal' | 'jade' | 'topaze'

export type User = {
  id: string,

  picture: string,

  name: string,

  team: Team,
}
