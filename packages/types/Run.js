export type Step = {
  date: number,
  geoloc: {
    lat: number,
    lng: number,
  },
}

export type Run = {
  id: string,
  user_id: string,

  // date_start: number,

  steps: Step[],
}
