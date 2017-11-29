import { getPosition } from './api'

const origin = {
  lat: 48.8314408,
  lng: 2.3255684,
}

export const register = delay => fn => {
  delay = 800

  let d = Date.now()
  let k = 0
  let o = {
    lat: origin.lat + Math.random() * 0.001,
    lng: origin.lng + Math.random() * 0.001,
  }

  let loopTimeout = null

  const loop = async () => {
    const step = {
      geoloc: {
        lat: o.lat + Math.sin(k * 0.32) * (1 + k * 0.1) * 0.01,
        lng: o.lng + Math.cos(k * 0.32) * (1 + k * 0.1) * 0.01,
      },
      date: d,
    }

    fn(step)

    k++
    d += delay * 200

    clearTimeout(loopTimeout)
    loopTimeout = setTimeout(loop, delay)
  }

  loopTimeout = setTimeout(loop, 1)

  return () => clearTimeout(loopTimeout)
}
