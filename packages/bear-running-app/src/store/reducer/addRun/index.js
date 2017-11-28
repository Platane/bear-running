import type { State } from './type'

export const defaultState = {
  currentRun: null,
  running: false,
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'run:start':
      return { currentRun: { steps: [] }, running: true }

    case 'run:step':
      return {
        ...state,
        running: true,
        currentRun: {
          ...(state.currentRun || {}),
          steps: [
            ...((state.currentRun && state.currentRun.steps) || []),
            action.step,
          ],
        },
      }

    case 'run:end':
      return { ...state, running: false }
  }

  return state
}
