import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { Trace as Trace_ } from '~/component/Trace'
import { Spinner } from '~/component/Spinner'
import { TeamSwitch } from '~/component/TeamSwitch'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import { forgeSteps } from '~/service/runStat'
import { runLength, runDuration } from '~/service/runStat'

import styled from 'preact-emotion'

class StepForger extends Component {
  state = { duration: 0, length: 0 }

  constructor(props) {
    super(props)
    this.state = { duration: this.props.duration, length: this.props.length }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.duration != nextProps.duration ||
      this.props.length != nextProps.length
    )
      this.setState({
        duration: nextProps.duration,
        length: nextProps.length,
      })
  }

  onSubmit = () =>
    this.props.onSubmit(forgeSteps(this.state.length, this.state.duration))

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type="text"
          value={this.state.length}
          onChange={e => this.setState({ length: e.target.value })}
        />m in
        <input
          type="text"
          value={this.state.duration}
          onChange={e => this.setState({ duration: e.target.value })}
        />ms
        <button onClick={this.onSubmit}>update</button>
      </div>
    )
  }
}

export const Run = ({
  changeSteps,
  changeWeather,
  removeRun,
  userId,
  runId,
  run,
}) => (
  <Container>
    {run && <Trace steps={run.steps} color={primary} />}
    <Center>
      {run &&
        changeSteps && (
          <StepForger
            length={runLength(run.steps)}
            duration={runDuration(run.steps)}
            onSubmit={steps => changeSteps(runId, steps)}
          />
        )}
    </Center>
  </Container>
)

const Trace = styled(Trace_)`
  width: 200px;
  height: 200px;
`
const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Center = styled.div`
  margin-top: 50px;
  max-width: 500px;
  width: 100%;
`
