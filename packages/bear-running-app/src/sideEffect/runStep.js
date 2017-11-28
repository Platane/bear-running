import { step } from '~/store/action/addRun'

const watchPosition = fn => {
  try {
    const watchID = navigator.geolocation.watchPosition(fn)
    return () => navigator.geolocation.clearWatch(watchID)
  } catch (err) {
    console.warn(err)
    return () => 0
  }
}

const getPosition = () =>
  new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getPosition(resolve, reject)
    } catch (err) {
      reject(err)
    }
  })

const DELAY = 5000

export const init = store => {
  let lastStep = null
  let watching = null
  let loopTimeout = null

  // called once each Xms
  const loop = () => {
    if (lastStep) store.dispatch(step(lastStep))

    clearTimeout(loopTimeout)
    loopTimeout = setTimeout(loop, DELAY)
  }

  // called with the navigator geolocation watch callback
  const updateStep = ({ coords }) =>
    (lastStep = {
      geoloc: { lat: coords.latitude, lng: coords.longitude },
      date: Date.now(),
    })

  // called on state update
  const update = () => {
    const { running } = store.getState().addRun

    if (running && !watching) {
      watching = watchPosition(updateStep)
      loopTimeout = setTimeout(loop, 10)
    }

    if (!running && watching) {
      watching()
      clearTimeout(loopTimeout)
      loopTimeout = null
      lastStep = null
      watching = null
    }
  }

  update()

  store.subscribe(update)
}
