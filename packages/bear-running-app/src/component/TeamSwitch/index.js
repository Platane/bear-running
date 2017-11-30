import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import {
  primary,
  secondary,
  black,
  grey,
  white,
} from '~/component/_abstract/palette'
import styled from 'preact-emotion'

const colors = {
  ruby: '#FF4E4F',
  opal: '#FF7B1D',
  jade: '#C8CC00',
  citrus: '#FFC628',
  topaze: '#22B2A7',
}

export class TeamSwitch extends Component {
  state = { opened: false }

  open = () => {
    this.setState({ opened: true }, () => this.select && this.select.focus())
  }

  close = () => this.setState({ opened: false })

  onChange = e => {
    this.setState(
      { opened: false },
      () => this.props.onChange && this.props.onChange(e.target.value)
    )
  }

  render() {
    return (
      <Container className={this.props.className} style={this.props.style}>
        {!this.state.opened ? (
          <Tic
            team={this.props.team}
            onClick={this.props.onChange && this.open}
            style={this.props.ticStyle}
          />
        ) : (
          <select
            ref={e => (this.select = e)}
            onBlur={this.close}
            value={this.props.team}
            onChange={this.onChange}
          >
            {Object.keys(colors).map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
`
const Tic = styled.div`
  width: 26px;
  height: 26px;
  background-color: ${props => colors[props.team] || '#ccc'};
  border-radius: 50%;
  cursor: ${props => (props.onClick ? 'cursor' : 'auto')};
`
