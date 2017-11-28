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
      navigator.geolocation.getCurrentPosition(resolve, reject)
    } catch (err) {
      reject(err)
    }
  })

const toStep = ({ coords }) => ({
  geoloc: { lat: coords.latitude, lng: coords.longitude },
  date: Date.now(),
})

const DELAY = 2000

export const init = store => {
  let loopTimeout = null
  let watching = false

  // called once each Xms
  const loop = async () => {
    store.dispatch(step(toStep(await getPosition())))

    clearTimeout(loopTimeout)
    loopTimeout = setTimeout(loop, DELAY)
  }

  // called on state update
  const update = () => {
    const { running } = store.getState().addRun

    if (running && !watching) {
      watching = true
      loop()
    }

    if (!running && watching) {
      clearTimeout(loopTimeout)
      loopTimeout = null
      watching = false
    }
  }

  update()

  store.subscribe(update)
}
