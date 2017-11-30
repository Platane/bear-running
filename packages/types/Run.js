export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy'

export type Step = {
  date: number,
  geoloc: {
    lat: number,
    lng: number,
  },
}

export type Run = {
  id: string,

  weather: Weather,

  user_id: string,

  steps: Step[],
}
