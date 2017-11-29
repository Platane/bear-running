import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { runLength, runDuration } from '~/service/runStat'

const formatLength = x => {
  const a = Math.round(x / 10000) * 10
  const d = ((a % 1) * 10).toString()
  return `${a}.${d}`
}

const formatDate = x => new Date(x).toISOString().slice(0, 10)

const formatDuration = x => {
  const hour = Math.floor(x / (60 * 60 * 1000))
  const min = Math.floor((x / (60 * 1000)) % 60)

  let m = '' + min
  while (m.length < 2) m = '0' + m

  return `${hour}h${m}`
}

export const UserRunList = ({ runs, haveMore, loadMore }) => (
  <table>
    {runs.map(run => (
      <tr key={run.id}>
        <th> {formatDate(run.steps[0].date)}</th>
        <th> {formatLength(runLength(run.steps)) + ' km'}</th>
        <th> {formatDuration(runDuration(run.steps))}</th>
      </tr>
    ))}
    {haveMore && <button onClick={loadMore}>load more</button>}
  </table>
)
