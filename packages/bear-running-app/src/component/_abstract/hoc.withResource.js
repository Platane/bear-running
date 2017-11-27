import { h, Component } from 'preact'
import { selectResource } from '~/store/selector/resource'
import { requireResource } from '~/store/action/resource'

const toPropsDefault = x => x

export const withResource = options => C =>
  class WithResource extends Component {
    state = { path: null, query: null, resource: null }

    _propsUpdate(props) {
      const x = options.getResource && options.getResource(props)

      if (x && x.path !== this.state.path) {
        const resource = selectResource(x.path, x.query)(
          this.context.store.getState()
        )

        this.setState({
          path: x.path,
          query: x.query,
          resource,
        })

        if (!resource)
          this.context.store.dispatch(requireResource(x.path, x.query))
      }
    }

    _storeUpdate = () => {
      const resource = selectResource(this.state.path, this.state.query)(
        this.context.store.getState()
      )

      if (resource !== this.state.resource) this.setState({ resource })
    }

    componentDidMount() {
      this._kill = this.context.store.subscribe(this._storeUpdate)
      this._propsUpdate(this.props)
    }

    componentWillUnmount() {
      this._kill && this._kill()
    }

    componentWillReceiveProps(props) {
      this._propsUpdate(props)
    }

    render(props, state) {
      return (
        <C
          {...props}
          {...state}
          {...(options.toProps || toPropsDefault)(this.state)}
        />
      )
    }
  }
