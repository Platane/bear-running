import { h, Component } from 'preact'
import { clamp } from '~/util/math'

export default C =>
  class Stateful extends Component {
    static defaultProps = {
      min: 0,
      max: 100,
    }

    state = { start: 0, end: Infinity }

    onStartChange = x =>
      this.setState({ start: clamp(this.props.min, this.props.max)(x) })

    onEndChange = x =>
      this.setState({ end: clamp(this.props.min, this.props.max)(x) })

    onSubmit = () => {
      if (this.props.onSubmit) {
        const c = clamp(this.props.min, this.props.max)

        this.props.onSubmit({
          start: c(this.state.start),
          end: c(this.state.end),
        })
      }
    }

    render(props, state) {
      const c = clamp(this.props.min, this.props.max)

      return (
        <C
          {...props}
          start={c(this.state.start)}
          end={c(this.state.end)}
          onStartChange={this.onStartChange}
          onEndChange={this.onEndChange}
          onSubmit={this.onSubmit}
        />
      )
    }
  }
