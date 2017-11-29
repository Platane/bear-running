import preact, { h, render } from 'preact'
import { Provider } from 'preact-redux'

preact.createElement = preact.h
preact.PropTypes = { func: {} }
preact.Children = { only: arr => (Array.isArray(arr) ? arr[0] : arr) }

const App = require('~/component/App').App
const injectGlobalCss = require('~/component/App/globalCss').default

export const init = store => {
  injectGlobalCss()

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body,
    document.body.children[0]
  )
}
