import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import reducer from './reducer'

export default createStore(
    reducer,
    applyMiddleware(reduxPromise)
)
