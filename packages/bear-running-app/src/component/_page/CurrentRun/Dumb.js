import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { runLength, runDuration } from '~/service/runStat'

export const CurrentRun = ({
  startRun,
  endRun,
  saveRun,
  currentRun,
  running,
}) =>
  !currentRun ? (
    <button onClick={startRun}>start</button>
  ) : (
    <div>
      <div>{`length: ${runLength(currentRun.steps)} m`}</div>
      <div>{`duration: ${runDuration(currentRun.steps)} ms`}</div>
      {running && <button onClick={endRun}>end</button>}
      {!running && <button onClick={saveRun}>save</button>}
    </div>
  )
