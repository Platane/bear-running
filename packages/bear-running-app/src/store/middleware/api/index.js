const handlers = [
  require('./mutation/updateUserRole'),
  require('./mutation/updateUser'),
  require('./mutation/saveRun'),
]

const genKey = () =>
  Math.random()
    .toString(16)
    .slice(2)

export const getHandler = action =>
  handlers.find(x => x.actionType === action.type)

export const middleware = store => next => action => {
  const handler = getHandler(action)

  if (handler) {
    const key = genKey()

    store.dispatch({ type: 'mutation:start', action, key })

    handler
      .exec(store, action)
      .then(res =>
        store.dispatch({ type: 'mutation:success', action, key, res })
      )
      .catch(error =>
        store.dispatch({ type: 'mutation:error', action, key, error })
      )
  } else return next(action)
}
