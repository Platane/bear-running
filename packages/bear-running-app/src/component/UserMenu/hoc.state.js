import { h, Component } from 'preact'

export default C =>
  class Stateful extends Component {
    state = { opened: false }

    toggle = () => this.setState({ opened: !this.state.opened })

    close = () => this.setState({ opened: false })

    render(props, state) {
      return <C {...props} {...state} toggle={this.toggle} close={this.close} />
    }
  }
