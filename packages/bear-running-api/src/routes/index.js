import user from './user'

export default router => [user].forEach(f => f(router))
