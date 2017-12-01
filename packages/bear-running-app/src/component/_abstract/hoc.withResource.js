import { h, Component } from 'preact'
import {
  selectResource,
  selectResourceLoaded,
  selectResourceHaveMore,
} from '~/store/selector/resource'
import { requireResource } from '~/store/action/resource'
import { deepEqual } from '~/util/object'

const toPropsDefault = x => x

const batchSizeDefault = 8

export const withResource = (options = {}) => C =>
  class WithResource extends Component {
    state = { path: null, query: null, loaded: true, resource: null, limit: 0 }

    loadMore = () => {
      const limit = this.state.limit + (options.batchSize || batchSizeDefault)

      const { path, query } = this.state

      if (path) {
        const state = this.context.store.getState()
        const resource = selectResource(path, query, limit)(state)
        const loaded = selectResourceLoaded(path, query, limit)(state)
        const haveMore = selectResourceHaveMore(path, query, limit)(state)

        this.setState({
          haveMore,
          resource,
          loaded,
          limit,
        })

        this.context.store.dispatch(requireResource(path, query, limit))
      }
    }

    _propsUpdate(props) {
      const x = options.getResource && options.getResource(props)

      if (!x && this.state.path)
        this.setState({
          path: null,
          query: null,
          resource: null,
          loaded: true,
          limit: 0,
        })

      if (
        x &&
        (x.path !== this.state.path || !deepEqual(x.query, this.state.query))
      ) {
        const limit = options.batchSize || batchSizeDefault

        const state = this.context.store.getState()
        const resource = selectResource(x.path, x.query, limit)(state)
        const loaded = selectResourceLoaded(x.path, x.query, limit)(state)
        const haveMore = selectResourceHaveMore(x.path, x.query, limit)(state)

        this.setState({
          path: x.path,
          query: x.query,
          haveMore,
          resource,
          loaded,
          limit,
        })

        if (!loaded)
          this.context.store.dispatch(requireResource(x.path, x.query, limit))
      }
    }

    _storeUpdate = () => {
      const { path, query, limit } = this.state

      if (!path) return

      const state = this.context.store.getState()
      const resource = selectResource(path, query, limit)(state)
      const loaded = selectResourceLoaded(path, query, limit)(state)
      const haveMore = selectResourceHaveMore(path, query, limit)(state)

      if (
        resource !== this.state.resource ||
        loaded !== this.state.loaded ||
        haveMore !== this.state.haveMore
      )
        this.setState({ resource, loaded, haveMore })
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
          loadMore={this.loadMore}
          {...props}
          {...state}
          {...(options.toProps || toPropsDefault)(this.state)}
        />
      )
    }
  }
