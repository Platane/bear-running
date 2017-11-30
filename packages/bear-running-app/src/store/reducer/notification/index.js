import type { State } from './type'

export const defaultState = []

const getContent = x => (x instanceof Error ? x.toString() : x.message || x)

const genKey = () =>
  Math.random()
    .toString(16)
    .slice(2)

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'mutation:error':
    case 'resource:error':
      return [
        {
          key: genKey(),
          date: Date.now(),
          type: 'error',
          content: getContent(action.error),
          data: action.error,
        },
        ...state,
      ]
    case 'mutation:success':
      switch (action.action.type) {
        case 'mutation:saveRun':
          return [
            {
              key: genKey(),
              date: Date.now(),
              type: 'info',
              content: 'run saved',
              data: action.res,
            },
            ...state,
          ]
      }
  }

  return state
}
