import { h, Component } from 'preact'
import { selectResource, selectResourceLoaded } from '~/store/selector/resource'
import { requireResource } from '~/store/action/resource'

const toPropsDefault = x => x

export const withResource = options => C =>
  class WithResource extends Component {
    state = { path: null, query: null, resource: null }

    _propsUpdate(props) {
      const x = options.getResource && options.getResource(props)

      if (x && x.path !== this.state.path) {
        const state = this.context.store.getState()

        const resource = selectResource(x.path, x.query)(state)

        const loaded = selectResourceLoaded(x.path, x.query)(state)

        this.setState({
          path: x.path,
          query: x.query,
          resource,
          loaded,
        })

        if (!loaded)
          this.context.store.dispatch(requireResource(x.path, x.query))
      }
    }

    _storeUpdate = () => {
      const { path, query } = this.state

      const state = this.context.store.getState()

      const resource = selectResource(path, query)(state)

      const loaded = selectResourceLoaded(path, query)(state)

      if (resource !== this.state.resource || loaded !== this.state.loaded)
        this.setState({ resource, loaded })
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
