import type { Run } from 'types/Run'

export type State = {
  currentRun: Run | null,
  running: boolean,
}
