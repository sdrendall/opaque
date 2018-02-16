import friendStateHandler from './friendStates/handler'
import activeConnectionsHandler from './activeConnections/handler'
import globalMessagingHandler from './globalMessaging/handler'

const handler = [
    friendStateHandler,
    activeConnectionsHandler,
    globalMessagingHandler,
].reduce((handlerAcc, nextHandler) => Object.assign(
    handlerAcc, 
    nextHandler
), {})

const defaultState = {
    globalMessages: [],
    activeConnections: []
}

export default function reducer(state = defaultState, action) {
    return (handler.hasOwnProperty(action.type)) ? (
        handler[action.type](state, action)
    ) : (
        state
    )
}
