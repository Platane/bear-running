import decode from 'jwt-decode'
import { AUTH0_AUD } from '~/config'

import type { State } from './type'

export const defaultState = {
  token: null,
  user: null,
}

const readToken = token => {
  const decoded = decode(token)

  if (decoded.exp && decoded.exp < Date.now() / 1000)
    // token expired
    return null

  return decoded[AUTH0_AUD] || {}
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'storage:auth:read':
      if (action.token) {
        const userFromToken = readToken(action.token)

        if (userFromToken) {
          const user = { ...(action.user || {}), role: userFromToken.role }

          state = {
            ...state,
            token: action.token,

            user,
          }
        }
      }

      state = { ...state }

      break

    case 'location:changed':
      if (action.location.hash.id_token)
        state = {
          ...state,
          user: {
            ...(state.user || {}),
            ...readToken(action.location.hash.id_token),
          },
        }

      if (action.location.hash.access_token)
        state = {
          ...state,
          token: action.location.hash.access_token,
          user: {
            ...(state.user || {}),
            ...readToken(action.location.hash.access_token),
          },
        }

      break

    case 'auth:logout':
      return { ...state, token: null, user: null }
  }

  return state
}
