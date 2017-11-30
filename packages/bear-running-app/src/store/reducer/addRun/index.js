import type { State } from './type'

export const defaultState = {
  currentRun: null,
  status: 'not-started',
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'run:start':
      return { currentRun: { steps: [], weather: 'sunny' }, status: 'running' }

    case 'run:changeWeather':
      if (['running', 'ended'].includes(state.status)) {
        return {
          ...state,
          currentRun: { ...state.currentRun, weather: action.weather },
        }
      }

    case 'run:step':
      if (state.status == 'running')
        return {
          ...state,
          currentRun: {
            ...state.currentRun,
            steps: [...state.currentRun.steps, action.step],
          },
        }

    case 'run:end':
      if (state.status == 'running') return { ...state, status: 'ended' }

    case 'mutation:start':
      if (action.action.type === 'mutation:saveRun')
        return { ...state, status: 'saving', mutationKey: action.key }

    case 'mutation:error':
    case 'mutation:success':
      if (action.key === state.mutationKey) return defaultState
  }

  return state
}
