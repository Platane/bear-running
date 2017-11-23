import userCrud from './user/crud'
import runCrud from './run/crud'
import runSearch from './run/search'

export default router => [userCrud, runCrud, runSearch].forEach(f => f(router))
