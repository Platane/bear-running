import { getPosition } from './api'

const toStep = ({ coords }) => ({
  geoloc: { lat: coords.latitude, lng: coords.longitude },
  date: Date.now(),
})

export const register = delay => fn => {
  let loopTimeout = null

  const loop = async () => {
    const step = toStep(await getPosition())

    fn(step)

    clearTimeout(loopTimeout)
    loopTimeout = setTimeout(loop, delay)
  }

  loopTimeout = setTimeout(loop, 1)

  return () => clearTimeout(loopTimeout)
}
