import type { Run } from 'types/Run'

export type State = {
  currentRun: Run | null,
  status: 'not-started' | 'running' | 'ended' | 'saving',
}
