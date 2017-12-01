import { h, Component } from 'preact'

const defaultMax = Date.now() + 1000 * 60 * 60 * 2
const defaultMin = defaultMax - 1000 * 60 * 60 * 24 * 30

export default C =>
  class Stateful extends Component {
    state = { start: defaultMin, end: defaultMax, sortingDescending: true }

    onRangeChange = range => this.setState({ ...range })

    onToggleSorting = () =>
      this.setState({ sortingDescending: !this.state.sortingDescending })

    render(props, state) {
      return (
        <C
          {...props}
          {...state}
          min={defaultMin}
          max={defaultMax}
          onRangeChange={this.onRangeChange}
          onToggleSorting={this.onToggleSorting}
        />
      )
    }
  }
