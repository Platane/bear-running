import { h, Component } from 'preact'
import { Link } from '~/component/Link'
import { primary, secondary, black, white } from '~/component/_abstract/palette'
import styled, { keyframes } from 'preact-emotion'
import { lerp, proj } from '~/util/math'

const getPointerX = event =>
  event.targetTouches ? event.targetTouches[0].clientX : event.clientX

export class InputDateRange extends Component {
  state = { dragging: null }

  unlisten() {
    document.removeEventListener('mousemove', this._move)
    document.removeEventListener('touchmove', this._move)
    document.removeEventListener('mouseup', this._end)
    document.removeEventListener('touchend', this._end)
    document.removeEventListener('touchcancel', this._end)
  }

  listen() {
    this.unlisten()
    document.addEventListener('mousemove', this._move, { passive: false })
    document.addEventListener('touchmove', this._move, { passive: false })
    document.addEventListener('mouseup', this._end)
    document.addEventListener('touchend', this._end)
    document.addEventListener('touchcancel', this._end)
  }

  getX(e) {
    const { left, width } = this.container.getBoundingClientRect()
    const pointer = getPointerX(e)

    return (pointer - left) / width
  }

  _start = e => {
    const x = lerp(this.props.min, this.props.max)(this.getX(e))

    const dragging =
      Math.abs(x - this.props.start) < Math.abs(x - this.props.end)
        ? 'start'
        : 'end'

    this.setState({ dragging }, () => this._move(e))

    this.listen()
  }

  _move = e => {
    let x = lerp(this.props.min, this.props.max)(this.getX(e))

    if (this.state.dragging === 'start')
      this.props.onStartChange(Math.min(x, this.props.end))
    else this.props.onEndChange(Math.max(x, this.props.start))

    e.preventDefault()
    e.stopPropagation()
  }

  _end = e => {
    this.unlisten()
    this.props.onSubmit()
  }

  componentWillUnmout() {
    this.unlisten()
  }

  render() {
    const p = proj(this.props.min, this.props.max)

    const s = p(this.props.start)
    const e = p(this.props.end)

    return (
      <div
        style={{ padding: '16px 0' }}
        ref={e => (this.container = e)}
        onMouseDown={this._start}
        onTouchStart={this._start}
      >
        <Bar style={this.props.style} className={this.props.className}>
          <Liquid
            style={{
              transform: `translateX(${s * 100}%) scale(${e - s},1)`,
            }}
          />
          <TicWrapper style={{ transform: `translateX(${s * 100}%)` }}>
            <Tic />
          </TicWrapper>
          <TicWrapper style={{ transform: `translateX(${e * 100}%)` }}>
            <Tic />
          </TicWrapper>
        </Bar>
      </div>
    )
  }
}

const Bar = styled.div`
  height: 4px;
  background: ${black};
  border-radius: 2px;
  position: relative;
`
const TicWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`
const Liquid = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 4px;
  background-color: ${primary};
  transform-origin: left;
`
const Tic = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  position: absolute;
  top: -7px;
  left: -9px;
  background-color: ${primary};
`
