import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { compose } from '~/util/compose'

const hide = toHide => props => {
  const p = { ...props }
  for (let i in toHide) if (!toHide[i](props)) p[i] = null

  return p
}

export const hideProps = toHide => C => props => <C {...hide(toHide)(props)} />

const availableChecks = {
  user: ({ _self_role }) => 'user' === _self_role,
  admin: ({ _self_role }) => 'admin' === _self_role,
  userManager: ({ _self_role }) => 'userManager' === _self_role,
  mySelf: ({ _self_userId, userId }) => userId && _self_userId === userId,
}

const generateToHide = canAccess => {
  const toHide = {}

  Object.keys(canAccess).forEach(key => {
    const checks = canAccess[key].map(a => availableChecks[a]).filter(Boolean)

    toHide[key] = props => checks.some(fn => fn(props))
  })

  return toHide
}

export const hideFrom = canAccess =>
  compose(
    connect(state => ({
      _self_userId: state.auth.user && state.auth.user.id,
      _self_role: state.auth.user && state.auth.user.role,
    })),
    hideProps(generateToHide(canAccess))
  )
