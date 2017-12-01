import { h, Component } from 'preact'
import { Icon } from '~/component/Icon'
import styled from 'preact-emotion'

const weathers = ['sunny', 'cloudy', 'rainy', 'stormy', 'banana']

export class WeatherSwitch extends Component {
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
    const { color, className, style, iconStyle, weather, onChange } = this.props

    return (
      <Container className={className} style={style}>
        {!this.state.opened ? (
          <div onClick={onChange && this.open} style={{ color }}>
            {weathers.includes(weather) && 'banana' !== weather ? (
              <Icon
                shape={weather}
                onClick={onChange && this.open}
                style={iconStyle}
                color={color}
              />
            ) : (
              weather || 'null'
            )}
          </div>
        ) : (
          <select
            ref={e => (this.select = e)}
            onBlur={this.close}
            value={weather}
            onChange={this.onChange}
          >
            {weathers.map(weather => (
              <option key={weather} value={weather}>
                {weather}
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
