import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/AppContainer'
import { store } from './redux/store'

import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element is missing')
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
)
