import type { Run, Step } from 'types/Run'

// in m
const EARTH_RADIUS = 6371000

// this approximatino is good enougth
// as long as the point are close enougth
const distance = (a, b) => {
  const u = a.lat - b.lat
  const v = a.lng - b.lng
  return Math.sqrt(u * u + v * v) / 180 * Math.PI * EARTH_RADIUS
}

export const runLength = (steps: Step[]) => {
  let sum = 0
  for (let i = 1; i < steps.length; i++)
    sum += distance(steps[i].geoloc, steps[i - 1].geoloc)

  return sum
}

export const runDuration = (steps: Step[]) =>
  steps.length <= 1 ? 0 : steps[steps.length - 1].date - steps[0].date

export const forgeSteps = (
  length: number,
  duration: number,
  start_date?: number
): Step[] => {
  start_date = +(start_date || Date.now())

  const a = { lat: 0, lng: 0 }

  const d = length * 180 / Math.PI / EARTH_RADIUS

  const b = { lat: d, lng: 0 }

  return [
    { geoloc: a, date: start_date },
    { geoloc: b, date: start_date + +duration },
  ]
}
