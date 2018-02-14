import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import store from './redux/store'
import { Provider } from 'react-redux'

let provider = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(
    provider,
    document.querySelector('main')
)
