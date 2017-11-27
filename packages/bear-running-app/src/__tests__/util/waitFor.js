export const waitFor = (store, condition: Object => any) =>
  new Promise((resolve, reject) => {
    let ended = false
    let unsubsribe

    const test = () => {
      let res

      try {
        res = condition(store.getState())
      } catch (err) {
        unsubsribe && unsubsribe()
        ended = true
        reject(err)
      }

      if (res) {
        unsubsribe && unsubsribe()
        ended = true
        resolve(res)
      }
    }

    test()

    if (ended) return

    unsubsribe = store.subscribe(test)
  })
