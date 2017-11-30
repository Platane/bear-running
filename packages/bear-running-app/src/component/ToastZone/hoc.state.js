import { h, Component } from 'preact'

const DELAY = 6000

export default C =>
  class Stateful extends Component {
    _killtimeout = null

    state = { closed: {} }

    close = () => this.setState({ closed: {} })

    componentWillUnmount() {
      clearTimeout(this._killtimeout)
    }

    update = () => this.forceUpdate()

    render(props, state) {
      const dateLimit = Date.now() - DELAY
      const toDisplay = this.props.notification.filter(x => x.date > dateLimit)

      if (toDisplay.length) {
        const delta =
          toDisplay[toDisplay.length - 1].date + DELAY + 100 - Date.now()

        clearTimeout(this._killtimeout)
        this._killtimeout = setTimeout(this.update, Math.max(1, delta))
      }

      return (
        <C {...props} {...state} toDisplay={toDisplay} close={this.close} />
      )
    }
  }
