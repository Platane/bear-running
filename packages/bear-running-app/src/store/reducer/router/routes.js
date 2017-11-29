import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'home' },

  { path: '/currentRun', key: 'currentRun' },
  { path: '/run', key: 'myRuns' },
  { path: '/user/:userId', key: 'user' },

  { path: '/admin/user', key: 'adminUserList' },
  { path: '/admin/user/:userId', key: 'adminUser' },
  // { path: '/run/:runId', key: 'myRun' },
]
