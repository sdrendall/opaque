import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import reducer from './redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(reducer, applyMiddleware(reduxPromise))

let provider = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(
    provider,
    document.querySelector('main')
)
