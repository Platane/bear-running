import userCrud from './user/crud'
import userSearch from './user/search'
import userRole from './user/role'
import runCrud from './run/crud'
import runSearch from './run/search'

export default router =>
  [userCrud, userSearch, userRole, runCrud, runSearch].forEach(f => f(router))
