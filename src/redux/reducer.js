import friendStateHandler from './friendStates/handler'
import activeConnectionsHandler from './activeConnections/handler'

const handler = [
    friendStateHandler,
    activeConnectionsHandler,
].reduce((handlerAcc, nextHandler) => Object.assign(
    handlerAcc, 
    nextHandler
), {})

export default function reducer(state = {}, action) {
    return (handler.hasOwnProperty(action.type)) ? (
        handler[action.type](state, action)
    ) : (
        state
    )
}
