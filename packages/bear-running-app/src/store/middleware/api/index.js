const handlers = [require('./mutation/setRole')]

export const getHandler = action =>
  handlers.find(x => x.actionType === action.type)

export const middleware = store => next => action => {
  const handler = getHandler(action)

  if (handler) {
    store.dispatch({ type: 'mutation:start', action })

    handler
      .exec(store, action)
      .then(res => store.dispatch({ type: 'mutation:success', action, res }))
      .catch(error => store.dispatch({ type: 'mutation:error', action, error }))
  } else return next(action)
}
