import type { State } from './type'

export const defaultState = []

const getContent = x => (x instanceof Error ? x.toString() : x.message || x)

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'mutation:error':
      return [
        {
          key: Math.random()
            .toString(16)
            .slice(2),
          date: Date.now(),
          type: 'error',
          content: getContent(action.error),
          data: action.error,
        },
        ...state,
      ]
  }

  return state
}
