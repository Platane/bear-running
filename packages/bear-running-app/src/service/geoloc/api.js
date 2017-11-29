export const watchPosition = fn => {
  try {
    const watchID = navigator.geolocation.watchPosition(fn)
    return () => navigator.geolocation.clearWatch(watchID)
  } catch (err) {
    console.warn(err)
    return () => 0
  }
}

export const getPosition = () =>
  new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    } catch (err) {
      reject(err)
    }
  })
