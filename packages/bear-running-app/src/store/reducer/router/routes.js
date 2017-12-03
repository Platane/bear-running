import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'home' },
  { path: '/intro', key: 'intro' },

  { path: '/currentRun', key: 'currentRun' },
  { path: '/user', key: 'userList' },
  { path: '/user/:userId', key: 'user' },
  { path: '/user/:userId/run/:runId', key: 'run' },

  { path: '/admin/user', key: 'adminUserList' },
  // { path: '/run/:runId', key: 'myRun' },
]
