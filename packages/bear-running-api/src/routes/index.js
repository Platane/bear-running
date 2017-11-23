import user from './user'
import run from './run'

export default router => [user, run].forEach(f => f(router))
