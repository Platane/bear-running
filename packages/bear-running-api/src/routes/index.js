import userCrud from './user/crud'
import userSearch from './user/search'
import runCrud from './run/crud'
import runSearch from './run/search'

export default router =>
  [userCrud, userSearch, runCrud, runSearch].forEach(f => f(router))
