import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'home' },

  { path: '/currentRun', key: 'currentRun' },
  { path: '/run', key: 'myRuns' },
  // { path: '/run/:runId', key: 'myRun' },
]
